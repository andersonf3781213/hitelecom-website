import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, copyFile, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { createServer } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';

// Run the actual server module under Cloudflare's runtime. No fetch dependency
// override is supplied: native fetch goes to an in-process GitHub fixture via
// globalOutbound. The fixture has no public-network capability or real secrets.
const project = fileURLToPath(new URL('../', import.meta.url));
const { default:workerd } = createRequire(import.meta.url)('workerd');
const seed = JSON.parse(await readFile(path.join(project, 'src/data/product-catalog.json'), 'utf8'));
const VERSION = 'a'.repeat(40);
const SAVED_VERSION = 'b'.repeat(40);
let fixture, child, origin, runtimeLog = '';

before(async () => {
  fixture = await mkdtemp(path.join(tmpdir(), 'catalog-worker-runtime-'));
  for (const file of ['functions/api/catalog.js', 'src/lib/catalog.mjs', 'src/lib/access-auth.mjs']) {
    await mkdir(path.dirname(path.join(fixture, file)), { recursive: true });
    await copyFile(path.join(project, file), path.join(fixture, file));
  }
  const constants = `const seed = ${JSON.stringify(seed)};\nconst VERSION = '${VERSION}';\nconst SAVED_VERSION = '${SAVED_VERSION}';\n`;
  await writeFile(path.join(fixture, 'entry.mjs'), `
import { handleCatalogRequest } from './functions/api/catalog.js';
${constants}
const PASSWORD = 'fixture-admin-password';
const CONFIG = { GITHUB_OWNER:'fixture-owner', GITHUB_REPO:'fixture-catalog', GITHUB_BRANCH:'catalog/working', GITHUB_TOKEN:'fixture-github-token', ADMIN_PASSWORD:PASSWORD };
export default { async fetch(request, env) {
  const action = new URL(request.url).pathname;
  if (action === '/health') return new Response('ready');
  if (action === '/probe') {
    const result = [];
    for (const redirect of ['error', 'manual']) {
      for (const operation of ['Request', 'fetch']) {
        try {
          if (operation === 'Request') {
            const value = new Request('https://fixture.invalid/no-redirect', { redirect });
            result.push({ redirect, operation, ok:true, value:value.redirect });
          } else {
            const response = await globalThis.fetch('data:text/plain,fixture-ok', { redirect });
            result.push({ redirect, operation, ok:true, status:response.status, text:await response.text() });
          }
        } catch (error) { result.push({ redirect, operation, ok:false, name:error.name, message:error.message }); }
      }
    }
    return Response.json(result);
  }
  const scenario = action === '/redirect-put' ? 'redirect-put' : action === '/redirect-get' ? 'redirect-get' : 'normal';
  await env.MOCK.fetch('https://fixture-control/reset?mode=' + scenario);
  const catalog = JSON.parse(JSON.stringify(seed));
  catalog.categories[0].labels.zh = '运行时保存测试';
  const method = action.endsWith('put') ? 'PUT' : 'GET';
  const response = await handleCatalogRequest(new Request('https://catalog.example/api/catalog', {
    method, headers:{ Authorization:'Bearer ' + PASSWORD, ...(method === 'PUT' ? { Origin:'https://catalog.example', 'Content-Type':'application/json' } : {}) },
    ...(method === 'PUT' ? { body:JSON.stringify({ catalog, version:VERSION }) } : {})
  }), CONFIG);
  const stats = await (await env.MOCK.fetch('https://fixture-control/stats')).json();
  return Response.json({ status:response.status, headers:Object.fromEntries(response.headers), data:await response.json(), stats });
}};
`);
  await writeFile(path.join(fixture, 'github-mock.mjs'), `
${constants}
let mode = 'normal', calls = [], writes = [];
export default { async fetch(request) {
  const url = new URL(request.url);
  if (url.hostname === 'fixture-control') {
    if (url.pathname === '/reset') { mode = url.searchParams.get('mode'); calls = []; writes = []; return new Response('reset'); }
    return Response.json({ calls, writes });
  }
  calls.push({ url:url.href, method:request.method, authorization:request.headers.get('Authorization'), userAgent:request.headers.get('User-Agent') });
  if (url.origin !== 'https://api.github.com' || url.pathname !== '/repos/fixture-owner/fixture-catalog/contents/src/data/product-catalog.json') return new Response('unexpected destination', {status:599});
  if (request.headers.get('Authorization') !== 'Bearer fixture-github-token') return new Response('fixture authentication failed', {status:401});
  if (mode === 'redirect-get' || (mode === 'redirect-put' && request.method === 'PUT')) return new Response(null, {status:302, headers:{Location:'https://redirect-fixture.invalid/token-must-not-arrive'}});
  if (request.method === 'GET') {
    if (url.searchParams.get('ref') !== 'catalog/working') return new Response('wrong branch', {status:404});
    const bytes = new TextEncoder().encode(JSON.stringify(seed));
    const binary = Array.from(bytes, byte => String.fromCharCode(byte)).join('');
    return Response.json({type:'file', sha:VERSION, size:bytes.length, encoding:'base64', content:btoa(binary)});
  }
  if (request.method === 'PUT') {
    const body = await request.json();
    const bytes = Uint8Array.from(atob(body.content), character => character.charCodeAt(0));
    writes.push({ sha:body.sha, branch:body.branch, catalog:JSON.parse(new TextDecoder().decode(bytes)) });
    return Response.json({content:{sha:SAVED_VERSION}, commit:{html_url:'https://github.com/fixture-owner/fixture-catalog/commit/' + 'c'.repeat(40)}});
  }
  return new Response('unexpected method', {status:405});
}};
`);
  const reservation = createServer();
  reservation.listen(0, '127.0.0.1');
  await once(reservation, 'listening');
  const port = reservation.address().port;
  await new Promise(resolve => reservation.close(resolve));
  origin = `http://127.0.0.1:${port}`;
  await writeFile(path.join(fixture, 'config.capnp'), `
using Workerd = import "/workerd/workerd.capnp";
const config :Workerd.Config = (
  services = [
    (name="main", worker=(
      compatibilityDate="2026-07-28",
      modules=[
        (name="entry.mjs", esModule=embed "entry.mjs"),
        (name="functions/api/catalog.js", esModule=embed "functions/api/catalog.js"),
        (name="src/lib/catalog.mjs", esModule=embed "src/lib/catalog.mjs"),
        (name="src/lib/access-auth.mjs", esModule=embed "src/lib/access-auth.mjs")
      ],
      globalOutbound="github-mock",
      bindings=[(name="MOCK", service="github-mock")]
    )),
    (name="github-mock", worker=(compatibilityDate="2026-07-28", modules=[(name="github-mock.mjs", esModule=embed "github-mock.mjs")], globalOutbound="no-network")),
    (name="no-network", network=(allow=[]))
  ],
  sockets=[(name="http", address="127.0.0.1:${port}", http=(), service="main")]
);
`);
  child = spawn(workerd, ['serve', path.join(fixture, 'config.capnp')], { stdio:['ignore', 'pipe', 'pipe'] });
  child.stdout.on('data', bytes => { runtimeLog += bytes; });
  child.stderr.on('data', bytes => { runtimeLog += bytes; });
  let spawnError;
  child.on('error', error => { spawnError = error; });
  const deadline = Date.now() + 10000;
  while (Date.now() < deadline) {
    if (spawnError) throw spawnError;
    if (child.exitCode !== null) throw new Error(`workerd exited: ${runtimeLog}`);
    try {
      const response = await fetch(`${origin}/health`, { signal:AbortSignal.timeout(500) });
      if (response.ok && await response.text() === 'ready') return;
    } catch {}
    await delay(50);
  }
  throw new Error(`workerd did not become ready: ${runtimeLog}`);
}, { timeout:15000 });

after(async () => {
  if (child && child.exitCode === null) {
    const stopped = once(child, 'exit');
    child.kill('SIGTERM');
    const timer = setTimeout(() => child.kill('SIGKILL'), 2000);
    try { await stopped; } finally { clearTimeout(timer); }
  }
  if (fixture) await rm(fixture, { recursive:true, force:true });
});

async function run(action) {
  const response = await fetch(`${origin}/${action}`, { signal:AbortSignal.timeout(5000) });
  assert.equal(response.status, 200, `runtime wrapper failed: ${runtimeLog}`);
  return response.json();
}

test('workerd reproduces redirect:error failure before I/O and accepts manual', async () => {
  const result = await run('probe');
  for (const operation of ['Request', 'fetch']) {
    const failure = result.find(item => item.redirect === 'error' && item.operation === operation);
    assert.equal(failure.ok, false);
    assert.equal(failure.name, 'TypeError');
    assert.match(failure.message, /Invalid redirect value/);
    const success = result.find(item => item.redirect === 'manual' && item.operation === operation);
    assert.equal(success.ok, true);
    if (operation === 'fetch') { assert.equal(success.status, 200); assert.equal(success.text, 'fixture-ok'); }
  }
});

test('actual catalog API GET uses native workerd fetch and reads controlled GitHub contents', async () => {
  const result = await run('get');
  assert.equal(result.status, 200);
  assert.deepEqual(result.data.catalog, seed);
  assert.equal(result.data.version, VERSION);
  assert.equal(result.headers['cache-control'], 'no-store');
  assert.equal(result.stats.calls.length, 1);
  assert.equal(result.stats.calls[0].authorization, 'Bearer fixture-github-token');
  assert.equal(result.stats.calls[0].userAgent, 'Hitelecom-Catalog-Manager');
  assert.equal(result.stats.writes.length, 0);
});

test('actual catalog API PUT verifies and writes a UTF-8 snapshot through native workerd fetch', async () => {
  const result = await run('put');
  assert.equal(result.status, 200);
  assert.equal(result.data.saved, true);
  assert.equal(result.data.version, SAVED_VERSION);
  assert.deepEqual(result.stats.calls.map(call => call.method), ['GET', 'PUT']);
  assert.equal(result.stats.writes.length, 1);
  const saved = structuredClone(seed);
  saved.categories[0].labels.zh = '运行时保存测试';
  assert.deepEqual(result.stats.writes[0], { sha:VERSION, branch:'catalog/working', catalog:saved });
});

test('actual catalog API rejects a GitHub 302 without following or leaking Authorization', async () => {
  const result = await run('redirect-get');
  assert.equal(result.status, 502);
  assert.match(result.data.error, /up_redirect/);
  assert.equal(result.stats.calls.length, 1, 'redirect is neither followed nor retried');
  assert.equal(new URL(result.stats.calls[0].url).hostname, 'api.github.com');
  assert.equal(result.stats.writes.length, 0);
  assert.equal(JSON.stringify(result.data).includes('fixture-github-token'), false);
});

test('actual catalog API PUT refuses an upstream 302 without retry or a false save acknowledgement', async () => {
  const result = await run('redirect-put');
  assert.equal(result.status, 502);
  assert.match(result.data.error, /up_redirect/);
  assert.notEqual(result.data.saved, true);
  assert.deepEqual(result.stats.calls.map(call => call.method), ['GET', 'PUT']);
  assert.ok(result.stats.calls.every(call => new URL(call.url).hostname === 'api.github.com'));
  assert.equal(result.stats.writes.length, 0);
  assert.equal(JSON.stringify(result.data).includes('fixture-github-token'), false);
});
