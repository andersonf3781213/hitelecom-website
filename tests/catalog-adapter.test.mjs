import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as nodeModule from 'node:module';
import test from 'node:test';
import { compileFunction } from 'node:vm';
import { applyCatalogToExisting } from '../src/lib/catalog-adapter.mjs';

const clone = value => structuredClone(value);
const originalImage = { src: '/original.jpg', width: 800, height: 800 };
const temperatureCard = { id: 270, name: 'Original temperature', img: originalImage, conn: 'NB-IoT', custom: { keep: true } };
const pressureCard = { id: '271', name: 'Original pressure', img: '/pressure.jpg', conn: '4G' };
const gatewayCard = { id: 'gateway', name: 'Gateway', img: '/gateway.jpg', extra: 'unchanged' };
const productSlugs = { 270: 'temperature-sensor', 271: 'pressure-sensor' };
const resolveId = item => productSlugs[String(item.id)] || item.id;

function product(id, categoryId, sortOrder, managedPage = false) {
  return {
    id, slug: id, categoryId, sortOrder, status: 'published', managedPage,
    image: { src: '', alt: '' },
    locales: Object.fromEntries(['en', 'zh'].map(locale => [locale, {
      name: `${locale}: ${id}`, url: `${locale === 'en' ? '' : '/zh'}/product/${id}`,
      published: true,
    }])),
  };
}

function fixtureCatalog() {
  return {
    products: [product('temperature-sensor', 'temperature', 10), product('pressure-sensor', 'pressure', 20)],
    campaign: null,
  };
}

const overlay = (item, entry, localized) => ({
  ...item, name: localized.name || item.name, img: entry.image.src || item.img,
  url: localized.url, href: localized.url,
});

test('all matched cards honor product status and the current locale publication flag', () => {
  for (const managedPage of [false, true]) {
    const catalog = fixtureCatalog();
    catalog.products[0].managedPage = managedPage;
    catalog.products[0].locales.zh.published = false;
    const existing = [temperatureCard, gatewayCard];
    assert.equal(applyCatalogToExisting(existing, catalog, { resolveId, locale: 'en' }).length, 2);
    assert.deepEqual(applyCatalogToExisting(existing, catalog, { resolveId, locale: 'zh' }), [gatewayCard]);
    delete catalog.products[0].locales.zh;
    assert.deepEqual(applyCatalogToExisting(existing, catalog, { resolveId, locale: 'zh' }), [gatewayCard]);
    catalog.products[0].status = 'draft';
    assert.deepEqual(applyCatalogToExisting(existing, catalog, { resolveId }), [gatewayCard]);
  }
});

test('explicit update mapping overlays localized content and preserves official card shape', () => {
  const catalog = fixtureCatalog();
  const before = clone(temperatureCard);
  let received;
  const options = { resolveId, locale: 'zh', updateItem: (item, entry, text) => {
    received = { item, entry, text };
    return overlay(item, entry, text);
  } };
  let [card, unknown] = applyCatalogToExisting([temperatureCard, gatewayCard], catalog, options);
  assert.equal(received.item, temperatureCard);
  assert.equal(received.entry, catalog.products[0]);
  assert.equal(received.text, catalog.products[0].locales.zh);
  assert.equal(card.id, 270);
  assert.equal(card.conn, 'NB-IoT');
  assert.equal(card.custom, temperatureCard.custom);
  assert.equal(card.img, originalImage, 'empty catalog image preserves the existing image metadata');
  assert.equal(card.name, 'zh: temperature-sensor');
  assert.equal(card.url, '/zh/product/temperature-sensor');
  assert.equal(card.href, card.url);
  assert.equal(unknown, gatewayCard);
  assert.deepEqual(temperatureCard, before, 'the input card is not mutated');

  catalog.products[0].image.src = '/updated.jpg';
  [card] = applyCatalogToExisting([temperatureCard], catalog, options);
  assert.equal(card.img, '/updated.jpg');
});

test('existing adapter consumers may omit updateItem and retain original public card objects', () => {
  const [card] = applyCatalogToExisting([temperatureCard], fixtureCatalog(), { resolveId });
  assert.equal(card, temperatureCard);
});

test('a category move removes the old member and reuses one original card in its new list', () => {
  const catalog = fixtureCatalog();
  catalog.products[0].categoryId = 'pressure';
  const pool = [temperatureCard, pressureCard, temperatureCard, pressureCard];
  const apply = (existing, category) => applyCatalogToExisting(existing, catalog, {
    resolveId, existingPool: pool, updateItem: overlay,
    includeProduct: entry => category === 'all' || entry.categoryId === category,
  });
  assert.deepEqual(apply([temperatureCard], 'temperature'), []);
  const target = apply([pressureCard], 'pressure');
  assert.deepEqual(target.map(card => card.id), [270, '271']);
  assert.equal(target[0].conn, 'NB-IoT');
  assert.equal(target[0].custom, temperatureCard.custom);
  assert.deepEqual(apply([temperatureCard, pressureCard], 'all').map(card => card.id), [270, '271']);
});

test('unmanaged additions require an original card template and do not invent missing official fields', () => {
  let called = false;
  const result = applyCatalogToExisting([], fixtureCatalog(), {
    resolveId, createItem: () => { called = true; return {}; },
  });
  assert.deepEqual(result, []);
  assert.equal(called, false);
});

test('managed additions receive their exact localized URL even when its slug differs from the id', () => {
  const catalog = fixtureCatalog();
  const entry = product('managed-id', 'temperature', 30, true);
  entry.locales.zh.url = '/zh/product/localized-page';
  catalog.products.push(entry);
  const result = applyCatalogToExisting([], catalog, {
    locale: 'zh', resolveId,
    createItem: (value, localized) => ({ id: value.id, name: localized.name, url: localized.url, href: localized.url }),
  });
  assert.deepEqual(result, [{ id: 'managed-id', name: 'zh: managed-id', url: '/zh/product/localized-page', href: '/zh/product/localized-page' }]);
});

test('campaign ordering still applies after card content overlays without mutating base order', () => {
  const catalog = fixtureCatalog();
  catalog.campaign = { productId: 'pressure-sensor', startsOn: '2026-10-01', endsOn: '2026-10-31' };
  const result = applyCatalogToExisting([temperatureCard, pressureCard], catalog, {
    resolveId, date: '2026-10-20', updateItem: overlay,
  });
  assert.deepEqual(result.map(card => card.id), ['271', 270]);
  assert.deepEqual(catalog.products.map(entry => entry.sortOrder), [10, 20]);
});

test('mapping callbacks cannot accidentally discard or change catalog identity', () => {
  assert.throws(() => applyCatalogToExisting([temperatureCard], fixtureCatalog(), { resolveId, updateItem: () => [] }), /updateItem/);
  assert.throws(() => applyCatalogToExisting([temperatureCard], fixtureCatalog(), { resolveId, updateItem: () => ({ id: 'wrong' }) }), /保留产品/);
});

// The archive omits data/product.ts. Execute the real wrapper with explicit fixture
// imports so category and official-field wiring are still exercised independently.
test('the site wrapper scopes only known sensor CIDs and keeps other original list members', {
  skip: typeof nodeModule.stripTypeScriptTypes !== 'function' && 'Node TypeScript stripping is unavailable; core adapter contracts still run',
}, () => {
  const source = fs.readFileSync(new URL('../src/lib/catalog-site.ts', import.meta.url), 'utf8');
  const js = nodeModule.stripTypeScriptTypes(source)
    .replace(/^import .*;\s*$/gm, '').replace(/^export /gm, '');
  const create = compileFunction(`${js}\nreturn applyCatalog;`, ['catalog', 'applyCatalogToExisting', 'productSlugs']);
  const catalog = fixtureCatalog();
  catalog.products[0].categoryId = 'pressure';
  const newProduct = product('managed-id', 'custom-category', 30, true);
  newProduct.image.src = '/managed.jpg';
  newProduct.locales.zh.url = '/zh/product/localized-page';
  catalog.products.push(newProduct);
  const apply = create(catalog, applyCatalogToExisting, productSlugs);
  const pool = [temperatureCard, pressureCard, gatewayCard, temperatureCard];
  assert.deepEqual(apply([temperatureCard], '263', 'zh', pool), []);
  const pressure = apply([pressureCard], '262', 'zh', pool);
  assert.deepEqual(pressure.map(card => card.id), [270, '271']);
  assert.equal(pressure[0].img, originalImage);
  assert.equal(pressure[0].conn, 'NB-IoT');
  assert.equal(pressure[0].url, '/zh/product/temperature-sensor');
  assert.deepEqual(apply([temperatureCard, pressureCard], '261', 'zh', pool).map(card => card.id), [270, '271', 'managed-id']);
  const unrelated = apply([gatewayCard, temperatureCard], 'unmapped-official-list', 'zh', pool);
  assert.deepEqual(unrelated.map(card => card.id), [270, 'gateway']);
  assert.equal(unrelated[1], gatewayCard);
  assert.deepEqual(apply([], 'unmapped-official-list', 'zh', pool), [], 'the pool must not spread sensor products into unrelated lists');
  catalog.products[0].locales.zh.published = false;
  assert.deepEqual(apply([temperatureCard], 'unmapped-official-list', 'zh', pool), []);
});

test('all seven CID callers pass the full card pool and use localized catalog URLs in ItemList', {
  skip: typeof nodeModule.stripTypeScriptTypes !== 'function' && 'Node TypeScript stripping is unavailable; core adapter contracts still run',
}, async () => {
  const locales = ['en', 'zh', 'es', 'de', 'ja', 'fr', 'ru'];
  const catalog = fixtureCatalog();
  catalog.products[0].categoryId = 'pressure';
  catalog.products.push(product('managed-id', 'pressure', 30, true));
  for (const entry of catalog.products) {
    entry.locales = Object.fromEntries(locales.map(locale => [locale, {
      name: `${locale}: ${entry.id}`, published: true,
      url: `${locale === 'en' ? '' : `/${locale}`}/product/${entry.managedPage ? 'different-localized-slug' : entry.slug}`,
    }]));
  }
  const stripImports = source => nodeModule.stripTypeScriptTypes(source)
    .replace(/^import .*;\s*$/gm, '').replace(/^export /gm, '');
  const wrapper = stripImports(fs.readFileSync(new URL('../src/lib/catalog-site.ts', import.meta.url), 'utf8'));
  const applyCatalog = compileFunction(`${wrapper}\nreturn applyCatalog;`, ['catalog', 'applyCatalogToExisting', 'productSlugs'])(catalog, applyCatalogToExisting, productSlugs);
  const definitions = {
    261: [temperatureCard, pressureCard], 263: [temperatureCard], 262: [pressureCard],
  };
  const subcats = [{ cid: '261', name: 'All' }, { cid: '263', name: 'Temperature' }, { cid: '262', name: 'Pressure' }];
  const lists = Object.fromEntries(Object.entries(definitions).map(([cid, products]) => [cid, { products, subcats, bannerImg: '/banner.jpg' }]));
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  for (const locale of locales) {
    const path = locale === 'en' ? 'product' : `${locale}/product`;
    const source = fs.readFileSync(new URL(`../src/pages/${path}/lists/cid/[cid].astro`, import.meta.url), 'utf8');
    const frontmatter = stripImports(source.split('---')[1]);
    const names = ['Astro', 'productContent', 'listParent', 'productTabs', 'listSeo', 'productPath', 'getMergedProducts', 'applyCatalog', 'optimizedSrc', 'l', 'breadcrumbLd', 'itemListLd', 'SITE_URL'];
    const run = new AsyncFunction(...names, `${frontmatter}\nreturn { adaptedLists, listLd };`);
    const result = await run(
      { params: { cid: '261' } },
      Object.fromEntries(locales.map(lang => [lang, { lists }])),
      { 261: '261', 263: '261', 262: '261' },
      Object.fromEntries(locales.map(lang => [lang, [{ key: '261', label: 'Sensors' }]])),
      Object.fromEntries(locales.map(lang => [lang, {}])),
      id => `/product/${productSlugs[String(id)] || id}`,
      async () => ({ lists }), applyCatalog, async value => value,
      (url, lang) => `${lang === 'en' ? '' : `/${lang}`}${url}`,
      value => value, items => items, 'https://www.hitelecom.com',
    );
    assert.deepEqual(result.adaptedLists['263'].products, [], `${locale}: old category must be empty`);
    assert.deepEqual(result.adaptedLists['262'].products.map(card => card.id), [270, '271', 'managed-id'], `${locale}: target needs the cross-list template`);
    const expected = `https://www.hitelecom.com${locale === 'en' ? '' : `/${locale}`}/product/different-localized-slug`;
    assert.equal(result.listLd.find(item => item.name === `${locale}: managed-id`).url, expected);
  }
});
