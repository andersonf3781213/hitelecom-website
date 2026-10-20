import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { handleCatalogRequest } from '../functions/api/catalog.js';

// Every credential, repository and response in this file is a local fixture.
// These tests never call GitHub or write a repository.
const seed = JSON.parse(await readFile(new URL('../src/data/product-catalog.json', import.meta.url), 'utf8'));
const clone = value => structuredClone(value);
const ORIGIN = 'https://catalog.example';
const VERSION = 'a'.repeat(40);
const SAVED_VERSION = 'b'.repeat(40);
const PASSWORD = 'fixture-admin-password';
const env = {
  GITHUB_OWNER: 'fixture-owner', GITHUB_REPO: 'fixture-catalog', GITHUB_BRANCH: 'catalog/working',
  GITHUB_TOKEN: 'fixture-github-token', ADMIN_PASSWORD: PASSWORD,
};
const accessEnv = {
  ...env, CF_ACCESS_TEAM_DOMAIN: 'fixture-team.cloudflareaccess.com', CF_ACCESS_AUD: 'fixture-audience',
  ADMIN_EMAILS: 'admin@example.test', ADMIN_ORIGIN: ORIGIN,
};

function request(method = 'GET', { body, headers = {}, authenticated = true } = {}) {
  return new Request(`${ORIGIN}/api/catalog`, {
    method,
    headers: {
      ...(authenticated ? { Authorization: `Bearer ${PASSWORD}` } : {}),
      ...(method === 'PUT' ? { Origin: ORIGIN, 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    ...(body === undefined ? {} : { body: typeof body === 'string' || body instanceof Uint8Array ? body : JSON.stringify(body) }),
  });
}

function repositoryFile(catalog = seed, version = VERSION) {
  const bytes = Buffer.from(`${JSON.stringify(catalog, null, 2)}\n`, 'utf8');
  return { type: 'file', sha: version, size: bytes.length, encoding: 'base64', content: bytes.toString('base64') };
}

const savedResponse = () => ({
  content: { sha: SAVED_VERSION },
  commit: { html_url: `https://github.com/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/commit/${'c'.repeat(40)}` },
});

function mockGitHub({ catalog = seed, version = VERSION, read, write } = {}) {
  const calls = [];
  const fetch = async (url, options = {}) => {
    assert.equal(new URL(url).origin, 'https://api.github.com', 'no live or unexpected endpoint');
    calls.push({ url: String(url), ...options });
    if (options.method === 'GET') return read ? read(url, options) : Response.json(repositoryFile(catalog, version));
    assert.equal(options.method, 'PUT');
    return write ? write(url, options) : Response.json(savedResponse());
  };
  return { calls, fetch };
}

async function call(requestValue, mock, configuration = env) {
  const response = await handleCatalogRequest(requestValue, configuration, { fetch: mock.fetch });
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.match(response.headers.get('x-robots-tag'), /noindex/);
  return { response, data: await response.json() };
}

test('missing and wrong passwords return a password challenge before repository access', async () => {
  for (const req of [request('GET', { authenticated: false }), request('GET', { headers: { Authorization: 'Bearer incorrect' } })]) {
    const mock = mockGitHub();
    const { response, data } = await call(req, mock);
    assert.equal(response.status, 401);
    assert.equal(data.mode, 'password');
    assert.equal(mock.calls.length, 0);
  }
});

test('incomplete configuration fails closed and unsupported methods return Allow', async () => {
  const mock = mockGitHub();
  const invalid = { ...env, GITHUB_TOKEN: '' };
  assert.equal((await call(request(), mock, invalid)).response.status, 503);
  const { response } = await call(request('POST'), mock);
  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'GET, PUT');
  assert.equal(mock.calls.length, 0);
});

test('authenticated GET reads the configured branch and exposes only catalog metadata', async () => {
  const mock = mockGitHub();
  const { response, data } = await call(request(), mock);
  assert.equal(response.status, 200);
  assert.deepEqual(data.catalog, seed);
  assert.equal(data.version, VERSION);
  assert.equal(data.actor, 'password-admin');
  assert.equal(data.auth, 'password');
  assert.equal(mock.calls.length, 1);
  const upstream = mock.calls[0];
  assert.equal(new URL(upstream.url).searchParams.get('ref'), env.GITHUB_BRANCH);
  assert.equal(upstream.headers.Authorization, `Bearer ${env.GITHUB_TOKEN}`);
  assert.equal(upstream.headers['X-GitHub-Api-Version'], '2026-03-10');
  assert.equal(upstream.redirect, 'manual');
  assert.ok(upstream.signal instanceof AbortSignal);
  assert.equal(JSON.stringify(data).includes(env.GITHUB_TOKEN), false);
});

test('PUT writes the authenticated, validated UTF-8 snapshot with the current SHA and branch', async () => {
  const catalog = clone(seed);
  catalog.categories[0].labels.zh = '温度更新测试';
  const mock = mockGitHub();
  const { response, data } = await call(request('PUT', { body: { catalog, version: VERSION } }), mock);
  assert.equal(response.status, 200);
  assert.equal(data.saved, true);
  assert.equal(data.version, SAVED_VERSION);
  assert.equal(data.commitUrl, savedResponse().commit.html_url);
  assert.deepEqual(mock.calls.map(value => value.method), ['GET', 'PUT']);
  const written = JSON.parse(mock.calls[1].body);
  assert.equal(written.sha, VERSION);
  assert.equal(written.branch, env.GITHUB_BRANCH);
  assert.deepEqual(JSON.parse(Buffer.from(written.content, 'base64').toString('utf8')), catalog);
});

test('PUT rejects absent, cross-origin and opaque Origins before reading GitHub', async () => {
  for (const origin of [undefined, 'https://other.example', 'null']) {
    const mock = mockGitHub();
    const req = request('PUT', { body: { catalog: seed, version: VERSION } });
    if (origin === undefined) req.headers.delete('Origin');
    else req.headers.set('Origin', origin);
    const { response } = await call(req, mock);
    assert.equal(response.status, 403);
    assert.equal(mock.calls.length, 0);
  }
});

test('PUT rejects invalid content types, malformed UTF-8 JSON and incorrect envelopes', async () => {
  const cases = [
    { headers: { 'Content-Type': 'text/plain' }, body: '{}', status: 415 },
    { body: '{', status: 400 },
    { body: Uint8Array.from([0xff]), status: 400 },
    { body: { catalog: seed, version: VERSION, overwrite: true }, status: 400 },
    { body: { catalog: seed, version: 'not-a-sha' }, status: 400 },
  ];
  for (const { status, ...options } of cases) {
    const mock = mockGitHub();
    assert.equal((await call(request('PUT', options), mock)).response.status, status);
    assert.equal(mock.calls.length, 0);
  }
});

test('PUT enforces both declared and actual streamed request size limits', async () => {
  for (const options of [
    { headers: { 'Content-Length': String(1024 * 1024 + 1) }, body: '{}' },
    { body: new Uint8Array(1024 * 1024 + 1) },
  ]) {
    const mock = mockGitHub();
    assert.equal((await call(request('PUT', options), mock)).response.status, 413);
    assert.equal(mock.calls.length, 0);
  }
});

test('stale client SHA and concurrent upstream conflicts never claim success', async () => {
  const stale = mockGitHub();
  assert.equal((await call(request('PUT', { body: { catalog: seed, version: 'd'.repeat(40) } }), stale)).response.status, 409);
  assert.deepEqual(stale.calls.map(value => value.method), ['GET']);
  const concurrent = mockGitHub({ write: () => new Response('private upstream conflict detail', { status: 409 }) });
  const { response, data } = await call(request('PUT', { body: { catalog: seed, version: VERSION } }), concurrent);
  assert.equal(response.status, 409);
  assert.equal(JSON.stringify(data).includes('private upstream'), false);
  assert.equal(data.saved, undefined);
});

test('server independently preserves published identities and existing records', async () => {
  const previous = seed.products.find(product => product.status === 'published');
  assert.ok(previous);
  const edits = [
    catalog => { catalog.products.find(product => product.id === previous.id).id = 'replacement-id'; },
    catalog => { catalog.products.find(product => product.id === previous.id).slug = 'replacement-slug'; },
    catalog => { catalog.products = catalog.products.filter(product => product.id !== previous.id); },
    catalog => { catalog.categories.shift(); },
    catalog => {
      const product = catalog.products.find(product => product.id === previous.id);
      const locale = Object.keys(product.locales).find(locale => product.locales[locale].published);
      assert.ok(locale);
      product.locales[locale].url = '/product/replacement-url';
    },
  ];
  for (const edit of edits) {
    const catalog = clone(seed);
    edit(catalog);
    const mock = mockGitHub();
    const { response, data } = await call(request('PUT', { body: { catalog, version: VERSION } }), mock);
    assert.equal(response.status, 400);
    assert.ok(data.errors.length);
    assert.deepEqual(mock.calls.map(value => value.method), ['GET']);
  }
});

test('unpublished managed content cannot bypass publication requirements through the API', async () => {
  const catalog = clone(seed);
  const product = clone(catalog.products[0]);
  product.id = 'new-managed-product';
  product.slug = product.id;
  product.managedPage = true;
  product.status = 'published';
  for (const locale of Object.values(product.locales)) locale.published = false;
  product.locales.en.published = true;
  product.locales.en.url = '/product/new-managed-product';
  product.locales.en.body = '';
  catalog.products.push(product);
  const mock = mockGitHub();
  const { response, data } = await call(request('PUT', { body: { catalog, version: VERSION } }), mock);
  assert.equal(response.status, 400);
  assert.ok(data.errors.some(error => error.includes('body')));
  assert.deepEqual(mock.calls.map(value => value.method), ['GET']);
});

test('upstream redirects are rejected without following or disclosing the target', async () => {
  const location = `https://untrusted.example/redirect?private=${env.GITHUB_TOKEN}`;
  for (const status of [301, 302, 303, 307, 308]) {
    for (const method of ['GET', 'PUT']) {
      const redirect = () => new Response(null, { status, headers: { Location: location } });
      const mock = mockGitHub({ ...(method === 'GET' ? { read: redirect } : { write: redirect }) });
      const req = method === 'GET' ? request() : request('PUT', { body: { catalog: seed, version: VERSION } });
      const { response, data } = await call(req, mock);
      assert.equal(response.status, 502);
      assert.match(data.error, /up_redirect/);
      assert.equal(JSON.stringify(data).includes(location), false);
      assert.equal(JSON.stringify(data).includes(env.GITHUB_TOKEN), false);
      assert.deepEqual(mock.calls.map(value => value.method), method === 'GET' ? ['GET'] : ['GET', 'PUT']);
      assert.ok(mock.calls.every(value => value.redirect === 'manual'));
    }
  }
});

test('upstream HTTP errors, transport failures and malformed JSON are sanitized in responses and logs', async (t) => {
  const logs = t.mock.method(console, 'error', () => {});
  const sensitive = `private response ${env.GITHUB_TOKEN}`;
  for (const read of [
    () => new Response(sensitive, { status: 403 }),
    () => { throw new Error(sensitive); },
    () => new Response(sensitive),
  ]) {
    const { response, data } = await call(request(), mockGitHub({ read }));
    assert.equal(response.status, 502);
    assert.equal(JSON.stringify(data).includes(sensitive), false);
    assert.equal(JSON.stringify(data).includes(env.GITHUB_TOKEN), false);
  }
  assert.equal(JSON.stringify(logs.mock.calls.map(call => call.arguments)).includes(env.GITHUB_TOKEN), false);
});

test('invalid repository files and oversized repository responses fail closed', async () => {
  const invalidCatalog = clone(seed);
  invalidCatalog.schemaVersion = 2;
  const files = [
    { ...repositoryFile(), encoding: 'none' },
    { ...repositoryFile(), content: 'not-base64!' },
    { ...repositoryFile(), sha: 'invalid' },
    repositoryFile(invalidCatalog),
    { ...repositoryFile(), size: 1024 * 1024 + 1 },
  ];
  for (const file of files) {
    const { response } = await call(request(), mockGitHub({ read: () => Response.json(file) }));
    assert.equal(response.status, 502);
  }
  const { response } = await call(request(), mockGitHub({ read: () => new Response(new Uint8Array(1024 * 1024 * 2 + 65_537)) }));
  assert.equal(response.status, 502);
});

test('invalid save confirmations never claim success or expose arbitrary commit links', async () => {
  for (const value of [{}, { content: { sha: 'invalid' } }]) {
    const mock = mockGitHub({ write: () => Response.json(value) });
    const { response, data } = await call(request('PUT', { body: { catalog: seed, version: VERSION } }), mock);
    assert.equal(response.status, 502);
    assert.equal(data.saved, undefined);
  }
  for (const html_url of ['https://attacker.example/commit', 'javascript:alert(1)', `https://github.com/other/repo/commit/${VERSION}`]) {
    const mock = mockGitHub({ write: () => Response.json({ content: { sha: SAVED_VERSION }, commit: { html_url } }) });
    const { response, data } = await call(request('PUT', { body: { catalog: seed, version: VERSION } }), mock);
    assert.equal(response.status, 200);
    assert.equal(data.saved, true);
    assert.equal(data.commitUrl, undefined);
  }
});

const NOW = Date.UTC(2026, 9, 20, 12);
const keys = crypto.subtle.generateKey(
  { name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: Uint8Array.of(1, 0, 1), hash: 'SHA-256' },
  true, ['sign', 'verify'],
);
const b64url = value => Buffer.from(typeof value === 'string' ? value : JSON.stringify(value)).toString('base64url');
async function accessToken(overrides = {}) {
  const keyPair = await keys;
  const encoded = `${b64url({ alg: 'RS256', kid: 'fixture-key' })}.${b64url({
    iss: `https://${accessEnv.CF_ACCESS_TEAM_DOMAIN}`, aud: [accessEnv.CF_ACCESS_AUD],
    exp: Math.floor(NOW / 1000) + 300, email: accessEnv.ADMIN_EMAILS, ...overrides,
  })}`;
  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', keyPair.privateKey, new TextEncoder().encode(encoded));
  return `${encoded}.${Buffer.from(signature).toString('base64url')}`;
}

async function callAccess(token, method = 'GET', options = {}) {
  const repository = mockGitHub();
  const certCalls = [];
  const jwk = await crypto.subtle.exportKey('jwk', (await keys).publicKey);
  const response = await handleCatalogRequest(request(method, {
    ...options,
    headers: { 'Cf-Access-Jwt-Assertion': token, ...options.headers },
  }), accessEnv, {
    now: () => NOW,
    fetch: async (url, requestOptions) => {
      if (url === `https://${accessEnv.CF_ACCESS_TEAM_DOMAIN}/cdn-cgi/access/certs`) {
        certCalls.push(url);
        return Response.json({ keys: [{ ...jwk, kid: 'fixture-key', alg: 'RS256', use: 'sig' }] });
      }
      return repository.fetch(url, requestOptions);
    },
  });
  return { response, data: await response.json(), repository, certCalls };
}

test('Access mode requires a verified JWT even when the password is valid', async () => {
  const { response, repository, certCalls } = await callAccess('unverified');
  assert.equal(response.status, 401);
  assert.equal(repository.calls.length, 0);
  assert.equal(certCalls.length, 0);
});

test('Access JWT signature, issuer, audience, expiration and email allowlist are enforced', async () => {
  const valid = await callAccess(await accessToken());
  assert.equal(valid.response.status, 200);
  assert.equal(valid.data.actor, accessEnv.ADMIN_EMAILS);
  assert.equal(valid.data.auth, 'access');
  assert.equal(valid.certCalls.length, 1);
  assert.equal(valid.repository.calls.length, 1);
  for (const [claims, status] of [
    [{ iss: 'https://other.cloudflareaccess.com' }, 401],
    [{ aud: ['other-audience'] }, 401],
    [{ exp: Math.floor(NOW / 1000) }, 401],
    [{ email: 'other@example.test' }, 403],
  ]) {
    const result = await callAccess(await accessToken(claims));
    assert.equal(result.response.status, status);
    assert.equal(result.repository.calls.length, 0);
  }
  const token = await accessToken();
  const parts = token.split('.');
  parts[1] = b64url({ iss: `https://${accessEnv.CF_ACCESS_TEAM_DOMAIN}`, aud: accessEnv.CF_ACCESS_AUD,
    exp: Math.floor(NOW / 1000) + 300, email: 'ADMIN@example.test' });
  const tampered = await callAccess(parts.join('.'));
  assert.equal(tampered.response.status, 401);
  assert.equal(tampered.repository.calls.length, 0);
});

test('Access PUT still requires the configured Origin and normal version validation', async () => {
  const token = await accessToken();
  const rejected = await callAccess(token, 'PUT', {
    body: { catalog: seed, version: VERSION }, headers: { Origin: 'https://other.example' },
  });
  assert.equal(rejected.response.status, 403);
  assert.equal(rejected.repository.calls.length, 0);
  const saved = await callAccess(token, 'PUT', { body: { catalog: seed, version: VERSION } });
  assert.equal(saved.response.status, 200);
  assert.equal(saved.data.saved, true);
  assert.deepEqual(saved.repository.calls.map(value => value.method), ['GET', 'PUT']);
});
