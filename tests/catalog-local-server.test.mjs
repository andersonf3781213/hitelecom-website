import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createCatalogHandler, hasBuiltCatalogAdmin } from '../scripts/catalog-server.mjs';

const sourcePath = new URL('../src/data/product-catalog.json', import.meta.url);
const sourceBytes = await readFile(sourcePath);
const seed = JSON.parse(sourceBytes.toString('utf8'));
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const clone = value => structuredClone(value);

// A real Node HTTP handler and real disk replacement are exercised on loopback.
// Only this temporary project's JSON is writable; no external services are used.
async function fixture(t) {
  const projectRoot = await mkdtemp(path.join(tmpdir(), 'catalog-local-test-'));
  const dataDirectory = path.join(projectRoot, 'src', 'data');
  const catalogPath = path.join(dataDirectory, 'product-catalog.json');
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(catalogPath, sourceBytes);
  await writeFile(path.join(dataDirectory, 'sentinel.txt'), 'unchanged fixture file\n');

  let handler;
  const server = createServer((req, res) => handler(req, res));
  t.after(async () => {
    await new Promise((resolve, reject) => {
      server.close(error => error ? reject(error) : resolve());
      server.closeAllConnections();
    });
    try {
      assert.deepEqual(await readFile(sourcePath), sourceBytes, 'original source catalog was never modified');
      assert.equal(await readFile(path.join(dataDirectory, 'sentinel.txt'), 'utf8'), 'unchanged fixture file\n');
      assert.deepEqual((await readdir(dataDirectory)).sort(), ['product-catalog.json', 'sentinel.txt']);
    } finally {
      await rm(projectRoot, { recursive: true, force: true });
    }
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const port = server.address().port;
  handler = createCatalogHandler({ projectRoot, port });
  const origin = `http://127.0.0.1:${port}`;

  async function read(url, options) {
    const response = await fetch(`${origin}${url}`, options);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.match(response.headers.get('x-robots-tag'), /noindex/);
    return { response, data: await response.json() };
  }
  const configuration = await read('/api/config');
  assert.equal(configuration.response.status, 200);
  assert.match(configuration.data.csrfToken, /^[a-f0-9]{64}$/);

  return {
    projectRoot, catalogPath, dataDirectory, origin, read,
    put: (catalog, version, { headers = {}, ...options } = {}) => read('/api/catalog', {
      method: 'PUT',
      headers: {
        Origin: origin, 'Content-Type': 'application/json; charset=utf-8',
        'X-Catalog-CSRF': configuration.data.csrfToken, ...headers,
      },
      body: JSON.stringify({ catalog, version }), ...options,
    }),
  };
}

test('local GET returns the copied catalog and its exact SHA-256 file version', async t => {
  const local = await fixture(t);
  const { response, data } = await local.read('/api/catalog');
  assert.equal(response.status, 200);
  assert.equal(data.mode, 'local');
  assert.match(data.version, /^[a-f0-9]{64}$/);
  assert.equal(data.version, digest(sourceBytes));
  assert.deepEqual(data.catalog, seed);
});

test('same-origin PUT with the issued CSRF token writes UTF-8 JSON only in the temporary project', async t => {
  const local = await fixture(t);
  const { data: current } = await local.read('/api/catalog');
  const catalog = clone(current.catalog);
  catalog.categories[0].labels.zh = '温度目录更新验证';
  const { response, data } = await local.put(catalog, current.version);
  assert.equal(response.status, 200);
  assert.equal(data.saved, true);
  assert.equal(data.mode, 'local');
  assert.match(data.version, /^[a-f0-9]{64}$/);
  const bytes = await readFile(local.catalogPath);
  assert.equal(data.version, digest(bytes));
  assert.notEqual(data.version, current.version);
  assert.deepEqual(JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)), catalog);
  const refreshed = await local.read('/api/catalog');
  assert.deepEqual(refreshed.data.catalog, catalog);
  assert.equal(refreshed.data.version, data.version);
});

test('stale local versions return 409 and preserve the latest saved file', async t => {
  const local = await fixture(t);
  const { data: current } = await local.read('/api/catalog');
  const first = clone(current.catalog);
  first.categories[0].labels.en = 'First editor update';
  assert.equal((await local.put(first, current.version)).response.status, 200);
  const latest = await readFile(local.catalogPath);
  const stale = clone(current.catalog);
  stale.categories[0].labels.en = 'Outdated editor update';
  const { response, data } = await local.put(stale, current.version);
  assert.equal(response.status, 409);
  assert.equal(data.saved, undefined);
  assert.deepEqual(await readFile(local.catalogPath), latest);
});

test('wrong or missing CSRF and cross-origin PUT requests return 403 without modifying the file', async t => {
  const local = await fixture(t);
  const { data: current } = await local.read('/api/catalog');
  const catalog = clone(current.catalog);
  catalog.categories[0].labels.en = 'Must never be written';
  for (const headers of [
    { 'X-Catalog-CSRF': 'incorrect-fixture-token' },
    { 'X-Catalog-CSRF': '' },
    { Origin: 'https://other.example' },
    { Origin: '' },
    { 'Sec-Fetch-Site': 'cross-site' },
  ]) {
    const { response, data } = await local.put(catalog, current.version, { headers });
    assert.equal(response.status, 403);
    assert.equal(data.saved, undefined);
    assert.deepEqual(await readFile(local.catalogPath), sourceBytes);
  }
});

test('invalid catalog models and changes to published identity return 422 without writing', async t => {
  const local = await fixture(t);
  const { data: current } = await local.read('/api/catalog');
  const published = current.catalog.products.find(product => product.status === 'published');
  assert.ok(published);
  const edits = [
    catalog => { catalog.schemaVersion = 2; },
    catalog => { catalog.products.find(product => product.id === published.id).slug = 'replacement-slug'; },
    catalog => { catalog.products = catalog.products.filter(product => product.id !== published.id); },
  ];
  for (const edit of edits) {
    const catalog = clone(current.catalog);
    edit(catalog);
    const { response, data } = await local.put(catalog, current.version);
    assert.equal(response.status, 422);
    assert.ok(data.errors.length);
    assert.equal(data.saved, undefined);
    assert.deepEqual(await readFile(local.catalogPath), sourceBytes);
  }
  // A rejected request must not poison the handler's serialized write queue.
  const valid = clone(current.catalog);
  valid.categories[0].labels.en = 'Valid update after rejection';
  assert.equal((await local.put(valid, current.version)).response.status, 200);
  assert.deepEqual(JSON.parse(await readFile(local.catalogPath, 'utf8')), valid);
});

test('a later valid save after unpublishing uses the newly returned local version', async t => {
  const local = await fixture(t);
  const { data: current } = await local.read('/api/catalog');
  const catalog = clone(current.catalog);
  const product = catalog.products.find(product => product.status === 'published');
  assert.ok(product);
  product.status = 'draft';
  const first = await local.put(catalog, current.version);
  assert.equal(first.response.status, 200);
  assert.equal(first.data.saved, true);
  product.locales.en.summary = 'Draft summary updated after the first save.';
  const second = await local.put(catalog, first.data.version);
  assert.equal(second.response.status, 200);
  assert.equal(second.data.saved, true);
  assert.notEqual(second.data.version, first.data.version);
  assert.deepEqual(JSON.parse(await readFile(local.catalogPath, 'utf8')), catalog);
});

test('file-format Astro output serves both extensionless catalog admin URLs', async t => {
  const local = await fixture(t);
  assert.equal(await hasBuiltCatalogAdmin(local.projectRoot), false, 'CLI preflight rejects absent build output');
  const dist = path.join(local.projectRoot, 'dist');
  await mkdir(dist);
  const html = '<!doctype html><title>File format catalog admin</title>';
  await writeFile(path.join(dist, 'catalog-admin.html'), html);
  assert.equal(await hasBuiltCatalogAdmin(local.projectRoot), true, 'CLI preflight accepts the file-format output');
  for (const route of ['/catalog-admin', '/catalog-admin/', '/catalog-admin/?mode=local']) {
    const response = await fetch(`${local.origin}${route}`);
    assert.equal(response.status, 200, route);
    assert.equal(response.headers.get('content-type'), 'text/html; charset=utf-8');
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.match(response.headers.get('x-robots-tag'), /noindex/);
    assert.equal(await response.text(), html);
  }
});

test('directory-format Astro output still serves both extensionless catalog admin URLs', async t => {
  const local = await fixture(t);
  const directory = path.join(local.projectRoot, 'dist', 'catalog-admin');
  await mkdir(directory, { recursive: true });
  assert.equal(await hasBuiltCatalogAdmin(local.projectRoot), false, 'CLI preflight requires an HTML file');
  const html = '<!doctype html><title>Directory format catalog admin</title>';
  await writeFile(path.join(directory, 'index.html'), html);
  assert.equal(await hasBuiltCatalogAdmin(local.projectRoot), true, 'CLI preflight accepts directory-format output');
  for (const route of ['/catalog-admin', '/catalog-admin/']) {
    const response = await fetch(`${local.origin}${route}`);
    assert.equal(response.status, 200, route);
    assert.equal(await response.text(), html);
  }
});

test('extensionless static lookup rejects encoded traversal and symlinks escaping dist', async t => {
  const local = await fixture(t);
  const dist = path.join(local.projectRoot, 'dist');
  await mkdir(dist);
  const privateFile = path.join(local.projectRoot, 'private.html');
  await writeFile(privateFile, 'private fixture content');
  await symlink(privateFile, path.join(dist, 'catalog-admin.html'));
  for (const route of ['/catalog-admin', '/catalog-admin/']) {
    const response = await fetch(`${local.origin}${route}`);
    assert.equal(response.status, 404, route);
    assert.equal((await response.text()).includes('private fixture content'), false);
  }
  for (const route of ['/catalog-admin%2f../private', '/%252e%252e/private']) {
    const response = await fetch(`${local.origin}${route}`);
    assert.equal(response.status, 400, route);
    assert.equal((await response.text()).includes('private fixture content'), false);
  }
});
