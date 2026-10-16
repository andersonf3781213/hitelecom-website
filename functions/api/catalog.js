import { validateCatalog } from '../../src/lib/catalog.mjs';
import { AccessAuthError, verifyAccessRequest } from '../../src/lib/access-auth.mjs';

const MAX_BYTES = 1024 * 1024;
const SHA = /^[a-f0-9]{40}(?:[a-f0-9]{24})?$/i;
const utf8 = new TextEncoder();
const decoder = new TextDecoder('utf-8', { fatal: true });

class ApiError extends Error {
  constructor(status, message, errors) { super(message); this.status = status; this.errors = errors; }
}

function respond(status, value, additionalHeaders = {}) {
  return new Response(JSON.stringify(value), { status, headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Robots-Tag': 'noindex, nofollow, nosnippet',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
    ...additionalHeaders,
  } });
}

function configuration(env) {
  const required = ['GITHUB_OWNER', 'GITHUB_REPO', 'GITHUB_BRANCH', 'GITHUB_TOKEN', 'CF_ACCESS_TEAM_DOMAIN', 'CF_ACCESS_AUD', 'ADMIN_EMAILS', 'ADMIN_ORIGIN'];
  if (!env || required.some(key => typeof env[key] !== 'string' || !env[key] || env[key] !== env[key].trim())) throw new ApiError(503, 'Catalog API is not configured.');
  const owner = env.GITHUB_OWNER;
  const repo = env.GITHUB_REPO;
  const branch = env.GITHUB_BRANCH;
  const filePath = env.CATALOG_FILE_PATH || 'src/data/product-catalog.json';
  let teamDomain = env.CF_ACCESS_TEAM_DOMAIN;
  if (teamDomain.startsWith('https://')) teamDomain = teamDomain.slice(8).replace(/\/$/, '');
  const adminEmails = env.ADMIN_EMAILS.split(',').map(value => value.trim().toLowerCase()).filter(Boolean);
  let origin;
  try { origin = new URL(env.ADMIN_ORIGIN); } catch { throw new ApiError(503, 'Catalog API is not configured.'); }
  const safeBranch = branch.length <= 255 && !/[\x00-\x20\x7f~^:?*\[\]\\]/.test(branch) && !branch.includes('..') && !branch.includes('@{') &&
    !branch.startsWith('-') && !branch.endsWith('.') && branch !== '@' && branch.split('/').every(part => part && !part.startsWith('.') && !part.endsWith('.lock'));
  if (!/^[A-Za-z0-9][A-Za-z0-9-]{0,38}$/.test(owner) || !/^[A-Za-z0-9._-]{1,100}$/.test(repo) || ['.', '..'].includes(repo) ||
    !safeBranch || typeof filePath !== 'string' || filePath.length > 512 || !filePath.split('/').every(part => /^[A-Za-z0-9._-]+$/.test(part) && part !== '.' && part !== '..') ||
    !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.cloudflareaccess\.com$/i.test(teamDomain) ||
    env.CF_ACCESS_AUD.length > 256 || !/^[A-Za-z0-9_-]+$/.test(env.CF_ACCESS_AUD) ||
    !adminEmails.length || adminEmails.some(email => !/^[^\s@,]+@[^\s@,]+\.[^\s@,]+$/.test(email) || email.length > 254) ||
    origin.protocol !== 'https:' || origin.origin !== env.ADMIN_ORIGIN || origin.username || origin.password ||
    /[\r\n]/.test(env.GITHUB_TOKEN) || env.GITHUB_TOKEN.length > 4096) throw new ApiError(503, 'Catalog API is not configured.');
  return { owner, repo, branch, filePath, token: env.GITHUB_TOKEN, origin: env.ADMIN_ORIGIN,
    issuer: `https://${teamDomain.toLowerCase()}`, audience: env.CF_ACCESS_AUD, adminEmails };
}

async function readBytes(body, maximum, tooLargeStatus = 413) {
  if (!body) return new Uint8Array();
  const reader = body.getReader();
  const chunks = [];
  let length = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maximum) {
        await reader.cancel();
        throw new ApiError(tooLargeStatus, tooLargeStatus === 413 ? 'Request is too large.' : 'Repository response is invalid.');
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return bytes;
}

async function github(config, fetchImpl, method, payload) {
  const filePath = config.filePath.split('/').map(encodeURIComponent).join('/');
  const url = new URL(`https://api.github.com/repos/${encodeURIComponent(config.owner)}/${encodeURIComponent(config.repo)}/contents/${filePath}`);
  if (method === 'GET') url.searchParams.set('ref', config.branch);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12_000);
  try {
    const response = await fetchImpl(url.toString(), { method, headers: {
      Accept: 'application/vnd.github+json', Authorization: `Bearer ${config.token}`,
      'X-GitHub-Api-Version': '2026-03-10', 'User-Agent': 'Hitelecom-Catalog-Manager',
      ...(payload ? { 'Content-Type': 'application/json' } : {}),
    }, ...(payload ? { body: JSON.stringify(payload) } : {}), redirect: 'error', signal: controller.signal });
    // Never return GitHub's response body or error text to a browser.
    if (response.status === 409 && method === 'PUT') throw new ApiError(409, 'The catalog changed. Reload and merge your draft before saving again.');
    if (!response.ok) throw new ApiError(502, method === 'PUT' ? 'Repository rejected the save. Check server configuration and branch permissions.' : 'Could not read the catalog from the repository.');
    const bytes = await readBytes(response.body, MAX_BYTES * 2 + 65_536, 502);
    try { return JSON.parse(decoder.decode(bytes)); } catch { throw new ApiError(502, 'Repository response is invalid.'); }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(502, 'Repository is temporarily unavailable.');
  } finally { clearTimeout(timer); }
}

function base64Encode(bytes) {
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 8192) binary += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
  return btoa(binary);
}

function decodeCatalog(file) {
  try {
    if (!file || file.type !== 'file' || !SHA.test(file.sha) || file.encoding !== 'base64' || typeof file.content !== 'string' || file.size > MAX_BYTES) throw new Error();
    const content = file.content.replace(/\s/g, '');
    if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(content)) throw new Error();
    const bytes = Uint8Array.from(atob(content), value => value.charCodeAt(0));
    if (bytes.byteLength > MAX_BYTES) throw new Error();
    const catalog = JSON.parse(decoder.decode(bytes));
    if (!validateCatalog(catalog).valid) throw new Error();
    return { catalog, version: file.sha };
  } catch { throw new ApiError(502, 'Repository catalog is invalid.'); }
}

function commitUrl(value, config) {
  try {
    const url = new URL(value);
    const prefixes = [`/${config.owner}/${config.repo}/commit/`, `/${config.owner}/${config.repo}/git/commit/`].map(value => value.toLowerCase());
    const expected = prefixes.find(prefix => url.pathname.toLowerCase().startsWith(prefix));
    return url.protocol === 'https:' && url.hostname === 'github.com' && !url.port && !url.username && !url.password &&
      !url.search && !url.hash && expected && SHA.test(url.pathname.slice(expected.length)) ? url.href : undefined;
  } catch { return undefined; }
}

// Dependency injection is for programmatic tests, never an HTTP switch or env flag.
export async function handleCatalogRequest(request, env, dependencies = {}) {
  try {
    const config = configuration(env);
    if (!['GET', 'PUT'].includes(request.method)) return respond(405, { error: 'Method not allowed.' }, { Allow: 'GET, PUT' });
    const actor = dependencies.authorize ? await dependencies.authorize(request, config) :
      await verifyAccessRequest(request, config, { fetch: dependencies.fetch, now: dependencies.now });
    const email = typeof actor === 'string' ? actor.toLowerCase() : actor?.email?.toLowerCase();
    if (!email) throw new AccessAuthError();
    if (!config.adminEmails.includes(email)) throw new AccessAuthError(403);
    const fetchImpl = dependencies.fetch || globalThis.fetch;
    let payload;
    if (request.method === 'PUT') {
      if (request.headers.get('Origin') !== config.origin) throw new ApiError(403, 'Save requests must come from the configured admin origin.');
      if (!/^application\/json(?:\s*;\s*charset\s*=\s*(?:utf-8|"utf-8"))?\s*$/i.test(request.headers.get('Content-Type') || '')) throw new ApiError(415, 'Content-Type must be application/json.');
      const declaredLength = request.headers.get('Content-Length');
      if (declaredLength !== null && (!/^\d+$/.test(declaredLength) || Number(declaredLength) > MAX_BYTES)) throw new ApiError(413, 'Request is too large.');
      const bytes = await readBytes(request.body, MAX_BYTES);
      try { payload = JSON.parse(decoder.decode(bytes)); } catch { throw new ApiError(400, 'Request body must be valid UTF-8 JSON.'); }
      if (!payload || typeof payload !== 'object' || Array.isArray(payload) || !Object.hasOwn(payload, 'catalog') ||
        typeof payload.version !== 'string' || !SHA.test(payload.version) || Object.keys(payload).some(key => !['catalog', 'version'].includes(key))) throw new ApiError(400, 'Expected {catalog, version}.');
    }
    const current = decodeCatalog(await github(config, fetchImpl, 'GET'));
    if (request.method === 'GET') return respond(200, { ...current, mode: 'github', actor: email });
    if (payload.version !== current.version) throw new ApiError(409, 'The catalog changed. Reload and merge your draft before saving again.');
    const validation = validateCatalog(payload.catalog, { current: current.catalog });
    if (!validation.valid) throw new ApiError(400, 'Catalog validation failed.', validation.errors);
    const serialized = utf8.encode(`${JSON.stringify(payload.catalog, null, 2)}\n`);
    if (serialized.byteLength > MAX_BYTES) throw new ApiError(413, 'Catalog is too large.');
    const saved = await github(config, fetchImpl, 'PUT', {
      message: 'Update product catalog via protected catalog admin', content: base64Encode(serialized),
      sha: current.version, branch: config.branch,
    });
    if (!saved || !saved.content || !SHA.test(saved.content.sha)) throw new ApiError(502, 'Save response could not be verified. Reload before trying again.');
    const url = commitUrl(saved.commit?.html_url, config);
    return respond(200, { saved: true, version: saved.content.sha, mode: 'github', ...(url ? { commitUrl: url } : {}) });
  } catch (error) {
    if (error instanceof ApiError || error instanceof AccessAuthError) return respond(error.status, { error: error.message, ...(error.errors ? { errors: error.errors } : {}) });
    return respond(500, { error: 'The catalog request could not be completed.' });
  }
}

export function onRequest(context) {
  // Do not pass dependency overrides from context, request data, or environment.
  return handleCatalogRequest(context.request, context.env);
}
