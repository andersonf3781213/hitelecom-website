import { createServer } from 'node:http';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { constants } from 'node:fs';
import { open, lstat, readFile, realpath, rename, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { validateCatalog } from '../src/lib/catalog.mjs';

export const MAX_BODY_BYTES = 1024 * 1024;
const CATALOG_PARTS = ['src', 'data', 'product-catalog.json'];
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8', '.pdf': 'application/pdf',
};

class HttpError extends Error {
  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

function digest(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function inside(root, target) {
  const relative = path.relative(root, target);
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}

function header(req, name) {
  const value = req.headers?.[name];
  return typeof value === 'string' ? value : null;
}

function sameSecret(actual, expected) {
  if (typeof actual !== 'string') return false;
  const a = Buffer.from(actual);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function safePath(rawTarget) {
  if (typeof rawTarget !== 'string' || !rawTarget.startsWith('/') || rawTarget.startsWith('//') || rawTarget.includes('#')) {
    throw new HttpError(400, 'Invalid request path.');
  }
  const rawPath = rawTarget.split('?')[0];
  if (/[%](?:2f|5c)/i.test(rawPath) || rawPath.includes('\\')) throw new HttpError(400, 'Invalid request path.');
  let decoded;
  try { decoded = decodeURIComponent(rawPath); } catch { throw new HttpError(400, 'Invalid request path.'); }
  if (/[\u0000-\u001f\u007f%\\]/u.test(decoded) || decoded.split('/').some(part => part === '.' || part === '..')) {
    throw new HttpError(400, 'Invalid request path.');
  }
  return decoded;
}

async function readJsonBody(req) {
  const length = header(req, 'content-length');
  if (length !== null && (!/^\d+$/.test(length) || Number(length) > MAX_BODY_BYTES)) {
    throw new HttpError(/^\d+$/.test(length) ? 413 : 400, 'Invalid request body length.');
  }
  let size = 0;
  const chunks = [];
  try {
    // Keep the response writable when a streaming body exceeds the limit.
    const source = typeof req.iterator === 'function' ? req.iterator({ destroyOnReturn: false }) : req;
    for await (const chunk of source) {
      const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      size += bytes.length;
      if (size > MAX_BODY_BYTES) throw new HttpError(413, 'Request body exceeds 1 MiB.');
      chunks.push(bytes);
    }
  } catch (error) {
    req.resume?.();
    if (error instanceof HttpError) throw error;
    throw new HttpError(400, 'Unable to read request body.');
  }
  try {
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks)));
  } catch { throw new HttpError(400, 'Invalid JSON body.'); }
}

/**
 * Create a Node HTTP (req, res) handler. It never opens a listening socket.
 * The only writable path is projectRoot/src/data/product-catalog.json.
 */
export function createCatalogHandler({ projectRoot, csrfToken = randomBytes(32).toString('hex'), port = 4328 } = {}) {
  if (!projectRoot || typeof projectRoot !== 'string') throw new TypeError('projectRoot is required.');
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new TypeError('port must be an integer from 1 to 65535.');
  if (typeof csrfToken !== 'string' || csrfToken.length < 16) throw new TypeError('csrfToken must contain at least 16 characters.');
  const root = path.resolve(projectRoot);
  const catalogPath = path.join(root, ...CATALOG_PARTS);
  const distPath = path.join(root, 'dist');
  const authority = `127.0.0.1:${port}`;
  const origin = `http://${authority}`;
  let pending = Promise.resolve();

  function serialized(work) {
    const result = pending.then(work, work);
    pending = result.catch(() => {});
    return result;
  }

  async function currentCatalog() {
    const [canonicalRoot, directory, info] = await Promise.all([
      realpath(root), realpath(path.dirname(catalogPath)), lstat(catalogPath),
    ]);
    if (!inside(canonicalRoot, directory) || !info.isFile() || info.isSymbolicLink() || info.size > MAX_BODY_BYTES) throw new Error('Unavailable catalog');
    const bytes = await readFile(catalogPath);
    if (bytes.length > MAX_BODY_BYTES) throw new Error('Unavailable catalog');
    let catalog;
    try { catalog = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)); }
    catch { throw new Error('Unavailable catalog'); }
    if (!validateCatalog(catalog).valid) throw new Error('Unavailable catalog');
    return { catalog, version: digest(bytes), mode: info.mode & 0o777 };
  }

  async function replaceCatalog(catalog, mode) {
    const bytes = Buffer.from(`${JSON.stringify(catalog, null, 2)}\n`, 'utf8');
    if (bytes.length > MAX_BODY_BYTES) throw new HttpError(413, 'Formatted catalog exceeds 1 MiB.');
    const temporary = path.join(path.dirname(catalogPath), `.product-catalog.${randomBytes(16).toString('hex')}.tmp`);
    let file;
    try {
      file = await open(temporary, constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL, mode);
      await file.writeFile(bytes);
      await file.sync();
      await file.close();
      file = null;
      await rename(temporary, catalogPath);
    } finally {
      if (file) await file.close().catch(() => {});
      await unlink(temporary).catch(() => {});
    }
    return digest(bytes);
  }

  function verifyHost(req) {
    const hosts = (req.rawHeaders || []).filter((_, index) => index % 2 === 0 && String(req.rawHeaders[index]).toLowerCase() === 'host');
    if (header(req, 'host') !== authority || hosts.length > 1) throw new HttpError(403, 'Request host is not allowed.');
  }

  function verifyReadOrigin(req) {
    const supplied = header(req, 'origin');
    const fetchSite = header(req, 'sec-fetch-site');
    if ((supplied !== null && supplied !== origin) || (fetchSite !== null && fetchSite !== 'same-origin' && fetchSite !== 'none')) {
      throw new HttpError(403, 'Request origin is not allowed.');
    }
  }

  return async function catalogHandler(req, res) {
    const send = (status, body, contentType = 'application/json; charset=utf-8') => {
      const bytes = Buffer.isBuffer(body) ? body : Buffer.from(typeof body === 'string' ? body : JSON.stringify(body));
      res.writeHead(status, {
        'Content-Type': contentType, 'Content-Length': String(bytes.length),
        'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, noarchive',
        'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer',
      });
      res.end(req.method === 'HEAD' ? undefined : bytes);
    };
    try {
      verifyHost(req);
      const pathname = safePath(req.url);
      if (pathname === '/api/config') {
        if (req.method !== 'GET') throw new HttpError(405, 'Method not allowed.');
        verifyReadOrigin(req);
        send(200, { csrfToken });
        return;
      }
      if (pathname === '/api/catalog') {
        if (req.method === 'GET') {
          verifyReadOrigin(req);
          const { catalog, version } = await serialized(currentCatalog);
          send(200, { catalog, version, mode: 'local' });
          return;
        }
        if (req.method !== 'PUT') throw new HttpError(405, 'Method not allowed.');
        if (header(req, 'origin') !== origin || !sameSecret(header(req, 'x-catalog-csrf'), csrfToken)) {
          throw new HttpError(403, 'Save requires a same-origin request and valid CSRF token.');
        }
        verifyReadOrigin(req);
        if (!/^application\/json(?:\s*;[^\r\n]*)?$/i.test(header(req, 'content-type') || '') || header(req, 'content-encoding') !== null) {
          throw new HttpError(415, 'Use an uncompressed application/json request body.');
        }
        const body = await readJsonBody(req);
        if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).sort().join(',') !== 'catalog,version' || !/^[a-f0-9]{64}$/.test(body.version)) {
          throw new HttpError(400, 'Expected exactly catalog and a valid version.');
        }
        const version = await serialized(async () => {
          const current = await currentCatalog();
          if (body.version !== current.version) throw new HttpError(409, 'Catalog changed. Reload before saving again.');
          const validation = validateCatalog(body.catalog, { current: current.catalog });
          if (!validation.valid) throw new HttpError(422, 'Catalog validation failed.', validation.errors);
          return replaceCatalog(body.catalog, current.mode);
        });
        send(200, { saved: true, version, mode: 'local' });
        return;
      }
      if (pathname.startsWith('/api/')) throw new HttpError(404, 'Not found.');
      if (req.method !== 'GET' && req.method !== 'HEAD') throw new HttpError(405, 'Method not allowed.');
      if (pathname.split('/').some(part => part.startsWith('.'))) throw new HttpError(404, 'Not found.');
      let canonicalDist;
      try {
        canonicalDist = await realpath(distPath);
        if (canonicalDist !== path.join(await realpath(root), 'dist')) throw new Error('Invalid static root');
      }
      catch { throw new HttpError(503, 'Built site unavailable. Run npm run build first.'); }
      let candidate = path.join(distPath, pathname);
      if (!inside(distPath, candidate)) throw new HttpError(400, 'Invalid request path.');
      let info;
      try {
        info = await stat(candidate);
        if (info.isDirectory()) { candidate = path.join(candidate, 'index.html'); info = await stat(candidate); }
        if (!info.isFile() || !inside(canonicalDist, await realpath(candidate))) throw new HttpError(404, 'Not found.');
      } catch { throw new HttpError(404, 'Not found.'); }
      send(200, await readFile(candidate), MIME_TYPES[path.extname(candidate).toLowerCase()] || 'application/octet-stream');
    } catch (error) {
      if (error instanceof HttpError) send(error.status, { error: error.message, ...(error.errors ? { errors: error.errors } : {}) });
      else send(500, { error: 'Catalog service is unavailable. Check the source catalog and try again.' });
    }
  };
}

async function startCli() {
  const projectRoot = fileURLToPath(new URL('..', import.meta.url));
  const args = process.argv.slice(2);
  let value = process.env.CATALOG_PORT || '4328';
  if (args.length === 1 && args[0].startsWith('--port=')) value = args[0].slice(7);
  else if (args.length === 2 && args[0] === '--port') value = args[1];
  else if (args.length) throw new Error('Usage: npm run catalog:manage -- [--port 4328]');
  if (!/^\d+$/.test(value) || Number(value) < 1 || Number(value) > 65535) throw new Error('Use a port from 1 to 65535.');
  const port = Number(value);
  try { if (!(await stat(path.join(projectRoot, 'dist', 'catalog-admin', 'index.html'))).isFile()) throw new Error(); }
  catch { throw new Error('Built admin unavailable. Run npm run build first.'); }
  const server = createServer(createCatalogHandler({ projectRoot, port }));
  server.requestTimeout = 30_000;
  server.headersTimeout = 10_000;
  server.maxHeadersCount = 100;
  server.on('error', () => { console.error('Unable to start the local catalog server. Check that the port is available.'); process.exitCode = 1; });
  server.listen(port, '127.0.0.1', () => console.log(`Catalog manager: http://127.0.0.1:${port}/catalog-admin/?mode=local`));
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  startCli().catch(error => { console.error(error.message); process.exitCode = 1; });
}
