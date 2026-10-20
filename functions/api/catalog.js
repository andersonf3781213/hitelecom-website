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

// 两种认证模式：Cloudflare Access（JWT + 邮箱白名单，多人企业场景）；
// 或管理密码模式（ADMIN_PASSWORD，单人轻量维护，免配 Zero Trust）。
// 两者都要求 GitHub 写入变量；都未配置时拒绝读写（安全默认）。
function configuration(env) {
  const baseRequired = ['GITHUB_OWNER', 'GITHUB_REPO', 'GITHUB_BRANCH', 'GITHUB_TOKEN'];
  if (!env || baseRequired.some(key => typeof env[key] !== 'string' || !env[key] || env[key] !== env[key].trim())) throw new ApiError(503, 'Catalog API is not configured.');
  const accessVars = ['CF_ACCESS_TEAM_DOMAIN', 'CF_ACCESS_AUD', 'ADMIN_EMAILS', 'ADMIN_ORIGIN'];
  const hasAccess = accessVars.every(key => typeof env[key] === 'string' && env[key] && env[key] === env[key].trim());
  const hasPassword = typeof env.ADMIN_PASSWORD === 'string' && env.ADMIN_PASSWORD.length >= 12 && !/[\r\n]/.test(env.ADMIN_PASSWORD);
  if (!hasAccess && !hasPassword) throw new ApiError(503, 'Catalog API is not configured.');
  const owner = env.GITHUB_OWNER;
  const repo = env.GITHUB_REPO;
  const branch = env.GITHUB_BRANCH;
  const filePath = env.CATALOG_FILE_PATH || 'src/data/product-catalog.json';
  const safeBranch = branch.length <= 255 && !/[\x00-\x20\x7f~^:?*\[\]\\]/.test(branch) && !branch.includes('..') && !branch.includes('@{') &&
    !branch.startsWith('-') && !branch.endsWith('.') && branch !== '@' && branch.split('/').every(part => part && !part.startsWith('.') && !part.endsWith('.lock'));
  if (!/^[A-Za-z0-9][A-Za-z0-9-]{0,38}$/.test(owner) || !/^[A-Za-z0-9._-]{1,100}$/.test(repo) || ['.', '..'].includes(repo) ||
    !safeBranch || typeof filePath !== 'string' || filePath.length > 512 || !filePath.split('/').every(part => /^[A-Za-z0-9._-]+$/.test(part) && part !== '.' && part !== '..') ||
    /[\r\n]/.test(env.GITHUB_TOKEN) || env.GITHUB_TOKEN.length > 4096) throw new ApiError(503, 'Catalog API is not configured.');
  // HTTP 请求头仅允许拉丁字符集；token 若混入不可见字符（如粘贴带入的 U+00A0、全角字符），
  // fetch 会在构造请求时抛异常（表现为 up_network）。前置检查直接点名变量，避免误判为网络故障。
  if (!/^[\x21-\x7e]+$/.test(env.GITHUB_TOKEN)) throw new ApiError(503,
    'GITHUB_TOKEN contains invisible or non-ASCII characters. In Cloudflare Pages environment variables, clear the value and re-type the token manually (do not paste), then retry the deployment.');
  const common = { owner, repo, branch, filePath, token: env.GITHUB_TOKEN };
  if (hasAccess) {
    let teamDomain = env.CF_ACCESS_TEAM_DOMAIN;
    if (teamDomain.startsWith('https://')) teamDomain = teamDomain.slice(8).replace(/\/$/, '');
    const adminEmails = env.ADMIN_EMAILS.split(',').map(value => value.trim().toLowerCase()).filter(Boolean);
    let origin;
    try { origin = new URL(env.ADMIN_ORIGIN); } catch { throw new ApiError(503, 'Catalog API is not configured.'); }
    if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.cloudflareaccess\.com$/i.test(teamDomain) ||
      env.CF_ACCESS_AUD.length > 256 || !/^[A-Za-z0-9_-]+$/.test(env.CF_ACCESS_AUD) ||
      !adminEmails.length || adminEmails.some(email => !/^[^\s@,]+@[^\s@,]+\.[^\s@,]+$/.test(email) || email.length > 254) ||
      origin.protocol !== 'https:' || origin.origin !== env.ADMIN_ORIGIN || origin.username || origin.password) throw new ApiError(503, 'Catalog API is not configured.');
    return { ...common, authMode: 'access', origin: env.ADMIN_ORIGIN,
      issuer: `https://${teamDomain.toLowerCase()}`, audience: env.CF_ACCESS_AUD, adminEmails };
  }
  // 密码模式：同源要求改为「Origin 必须等于 API 自身域名」（管理页与 API 同站部署）
  return { ...common, authMode: 'password', password: env.ADMIN_PASSWORD };
}

async function sha256(value) {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', utf8.encode(value)));
}

// 口令等长哈希后逐字节比较，避免时序泄露；长度不同的输入哈希后等长
async function passwordMatches(candidate, expected) {
  const a = await sha256(candidate);
  const b = await sha256(expected);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function authorizePassword(request, config) {
  const header = request.headers.get('Authorization') || '';
  const match = /^Bearer (.+)$/.exec(header);
  if (!match || !(await passwordMatches(match[1], config.password))) {
    throw new ApiError(401, 'Admin password required or invalid.');
  }
  return 'password-admin';
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
  // 诊断分类：up_http=GitHub 返回了 HTTP 错误状态（配置/权限类）；
  // up_timeout=20 秒无响应；up_network=连接失败；up_config=凭据含非法字符导致请求无法构造。
  // 永不透传 GitHub 响应正文，仅暴露类别与状态码。
  const attempt = async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20_000);
    try {
      let response;
      try {
        // Workers rejects redirect:'error' while constructing the request, before I/O.
        // Use manual and reject redirects explicitly so credentials are never forwarded.
        response = await fetchImpl(url.toString(), { method, headers: {
          Accept: 'application/vnd.github+json', Authorization: `Bearer ${config.token}`,
          'X-GitHub-Api-Version': '2026-03-10', 'User-Agent': 'Hitelecom-Catalog-Manager',
          ...(payload ? { 'Content-Type': 'application/json' } : {}),
        }, ...(payload ? { body: JSON.stringify(payload) } : {}), redirect: 'manual', signal: controller.signal });
      } catch (error) {
        const kind = error?.name === 'AbortError' ? 'up_timeout' : 'up_network';
        // Runtime messages can contain header values; log only an allowlisted type.
        const errorType = ['Error', 'TypeError', 'AbortError', 'TimeoutError', 'NetworkError'].includes(error?.name) ? error.name : 'RequestError';
        console.error(`catalog github ${method} ${kind}:`, errorType);
        throw new ApiError(502, `Repository request failed (${kind}). Retry; if it persists, check Cloudflare Function logs.`);
      }
      if (response.status >= 300 && response.status < 400) {
        throw new ApiError(502, 'Repository redirected (up_redirect). Check GITHUB_OWNER / GITHUB_REPO and the catalog path.');
      }
      if (response.status === 409 && method === 'PUT') throw new ApiError(409, 'The catalog changed. Reload and merge your draft before saving again.');
      if (!response.ok) {
        console.error(`catalog github ${method} up_http:`, response.status);
        throw new ApiError(502, method === 'PUT'
          ? `Repository rejected the save (up_http ${response.status}). Check server configuration and branch permissions.`
          : `Repository read failed (up_http ${response.status}). Check GITHUB_OWNER / GITHUB_REPO / GITHUB_BRANCH and token permissions.`);
      }
      const bytes = await readBytes(response.body, MAX_BYTES * 2 + 65_536, 502);
      try { return JSON.parse(decoder.decode(bytes)); } catch { throw new ApiError(502, 'Repository response is invalid.'); }
    } finally { clearTimeout(timer); }
  };
  // GET 失败自动重试一次；PUT 不重试（网络失败时提交可能已生效，重试会造成混乱）
  try { return await attempt(); } catch (error) {
    if (method !== 'GET' || !(error instanceof ApiError) || !/\(up_(timeout|network)\)/.test(error.message)) throw error;
    return await attempt();
  }
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
  let authHint;
  try {
    const config = configuration(env);
    if (config.authMode === 'password') authHint = 'password';
    if (!['GET', 'PUT'].includes(request.method)) return respond(405, { error: 'Method not allowed.' }, { Allow: 'GET, PUT' });
    let email;
    if (config.authMode === 'password' && !dependencies.authorize) {
      email = await authorizePassword(request, config);
    } else {
      const actor = dependencies.authorize ? await dependencies.authorize(request, config) :
        await verifyAccessRequest(request, config, { fetch: dependencies.fetch, now: dependencies.now });
      email = typeof actor === 'string' ? actor.toLowerCase() : actor?.email?.toLowerCase();
      if (!email) throw new AccessAuthError();
      if (!config.adminEmails.includes(email)) throw new AccessAuthError(403);
    }
    const fetchImpl = dependencies.fetch || globalThis.fetch;
    let payload;
    if (request.method === 'PUT') {
      const expectedOrigin = config.authMode === 'password' ? new URL(request.url).origin : config.origin;
      if (request.headers.get('Origin') !== expectedOrigin) throw new ApiError(403, 'Save requests must come from the configured admin origin.');
      if (!/^application\/json(?:\s*;\s*charset\s*=\s*(?:utf-8|"utf-8"))?\s*$/i.test(request.headers.get('Content-Type') || '')) throw new ApiError(415, 'Content-Type must be application/json.');
      const declaredLength = request.headers.get('Content-Length');
      if (declaredLength !== null && (!/^\d+$/.test(declaredLength) || Number(declaredLength) > MAX_BYTES)) throw new ApiError(413, 'Request is too large.');
      const bytes = await readBytes(request.body, MAX_BYTES);
      try { payload = JSON.parse(decoder.decode(bytes)); } catch { throw new ApiError(400, 'Request body must be valid UTF-8 JSON.'); }
      if (!payload || typeof payload !== 'object' || Array.isArray(payload) || !Object.hasOwn(payload, 'catalog') ||
        typeof payload.version !== 'string' || !SHA.test(payload.version) || Object.keys(payload).some(key => !['catalog', 'version'].includes(key))) throw new ApiError(400, 'Expected {catalog, version}.');
    }
    const current = decodeCatalog(await github(config, fetchImpl, 'GET'));
    if (request.method === 'GET') return respond(200, { ...current, mode: 'github', actor: email, auth: config.authMode });
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
    if (error instanceof ApiError || error instanceof AccessAuthError) return respond(error.status, { error: error.message, ...(error.status === 401 && authHint ? { mode: authHint } : {}), ...(error.errors ? { errors: error.errors } : {}) });
    return respond(500, { error: 'The catalog request could not be completed.' });
  }
}

export function onRequest(context) {
  // Do not pass dependency overrides from context, request data, or environment.
  return handleCatalogRequest(context.request, context.env);
}
