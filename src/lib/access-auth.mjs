// Cloudflare Access JWT verification. No request header containing only an email
// is an authentication source; the email must be inside a verified Access JWT.
const certCache = new Map();
const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8', { fatal: true });

export class AccessAuthError extends Error {
  constructor(status = 401) {
    super(status === 503 ? 'Authentication is temporarily unavailable.' : status === 403 ? 'Access is not allowed.' : 'Authentication required.');
    this.status = status;
  }
}

function decodeBase64Url(value) {
  if (typeof value !== 'string' || !/^[A-Za-z0-9_-]+$/.test(value) || value.length % 4 === 1) throw new AccessAuthError();
  const binary = atob(value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - value.length % 4) % 4));
  return Uint8Array.from(binary, char => char.charCodeAt(0));
}

function decodeObject(value) {
  const result = JSON.parse(decoder.decode(decodeBase64Url(value)));
  if (!result || typeof result !== 'object' || Array.isArray(result)) throw new AccessAuthError();
  return result;
}

async function fetchCertificates(config, fetchImpl, now) {
  // Cache only real production fetches. Test-specific fetches never share keys.
  const canCache = fetchImpl === globalThis.fetch;
  const cached = canCache && certCache.get(config.issuer);
  if (cached && cached.expires > now) return cached.keys;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8_000);
  try {
    const response = await fetchImpl(`${config.issuer}/cdn-cgi/access/certs`, {
      headers: { Accept: 'application/json' }, redirect: 'error', signal: controller.signal,
    });
    if (!response.ok || !response.body) throw new AccessAuthError(503);
    const reader = response.body.getReader();
    const chunks = [];
    let length = 0;
    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        length += value.byteLength;
        if (length > 131_072) {
          await reader.cancel();
          throw new AccessAuthError(503);
        }
        chunks.push(value);
      }
    } finally { reader.releaseLock(); }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const jwks = JSON.parse(decoder.decode(bytes));
    if (!Array.isArray(jwks.keys) || !jwks.keys.length || jwks.keys.length > 32) throw new AccessAuthError(503);
    if (canCache) certCache.set(config.issuer, { keys: jwks.keys, expires: now + 300_000 });
    return jwks.keys;
  } catch {
    throw new AccessAuthError(503);
  } finally { clearTimeout(timer); }
}

export async function verifyAccessRequest(request, config, dependencies = {}) {
  const token = request.headers.get('Cf-Access-Jwt-Assertion');
  if (!token || token.length > 16_384) throw new AccessAuthError();
  let header;
  let claims;
  let parts;
  try {
    parts = token.split('.');
    if (parts.length !== 3) throw new AccessAuthError();
    header = decodeObject(parts[0]);
    claims = decodeObject(parts[1]);
    if (header.alg !== 'RS256' || header.crit !== undefined || header.b64 !== undefined || typeof header.kid !== 'string' || !header.kid || header.kid.length > 128) throw new AccessAuthError();
    const now = Math.floor((dependencies.now ? dependencies.now() : Date.now()) / 1000);
    const audienceMatches = typeof claims.aud === 'string' ? claims.aud === config.audience :
      Array.isArray(claims.aud) && claims.aud.every(value => typeof value === 'string') && claims.aud.includes(config.audience);
    if (claims.iss !== config.issuer || !audienceMatches || !Number.isSafeInteger(claims.exp) || claims.exp <= now ||
      (claims.nbf !== undefined && (!Number.isSafeInteger(claims.nbf) || claims.nbf > now)) ||
      typeof claims.email !== 'string' || claims.email !== claims.email.trim() || claims.email.length > 254) throw new AccessAuthError();
  } catch { throw new AccessAuthError(); }

  const fetchImpl = dependencies.fetch || globalThis.fetch;
  const cryptoImpl = dependencies.crypto || globalThis.crypto;
  const keys = await fetchCertificates(config, fetchImpl, dependencies.now ? dependencies.now() : Date.now());
  const key = keys.find(candidate => candidate && candidate.kid === header.kid && candidate.kty === 'RSA' &&
    (candidate.alg === undefined || candidate.alg === 'RS256') && (candidate.use === undefined || candidate.use === 'sig') &&
    (candidate.key_ops === undefined || Array.isArray(candidate.key_ops) && candidate.key_ops.includes('verify')));
  try {
    if (!key || decodeBase64Url(key.n).length < 256 || decodeBase64Url(key.n).length > 1024) throw new AccessAuthError();
    decodeBase64Url(key.e);
    const publicKey = await cryptoImpl.subtle.importKey('jwk', { kty: 'RSA', n: key.n, e: key.e, alg: 'RS256', ext: true },
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
    const valid = await cryptoImpl.subtle.verify('RSASSA-PKCS1-v1_5', publicKey, decodeBase64Url(parts[2]), encoder.encode(`${parts[0]}.${parts[1]}`));
    if (!valid) throw new AccessAuthError();
  } catch { throw new AccessAuthError(); }
  const email = claims.email.toLowerCase();
  if (!config.adminEmails.includes(email)) throw new AccessAuthError(403);
  return { email };
}
