import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { LOCALES, getManagedPages, validateCatalog } from '../src/lib/catalog.mjs';

const seed = JSON.parse(fs.readFileSync(new URL('../src/data/product-catalog.json', import.meta.url), 'utf8'));
const clone = value => structuredClone(value);
const prefixFor = locale => locale === 'en' ? '/product/' : `/${locale}/product/`;

function managedCatalog() {
  return {
    schemaVersion: 1,
    categories: [{ id: 'sensors', sortOrder: 10, labels: { en: 'Sensors' } }],
    campaign: null,
    products: [{
      id: 'new-sensor', slug: 'new-sensor', categoryId: 'sensors', sortOrder: 10,
      status: 'published', managedPage: true,
      image: { src: '/images/sensor.jpg', alt: 'Sensor' },
      locales: Object.fromEntries(LOCALES.map(locale => [locale, {
        name: `Sensor ${locale}`, summary: 'A'.repeat(40), body: 'B'.repeat(200),
        url: `${prefixFor(locale)}new-sensor`, imageAlt: 'Sensor',
        seoTitle: '', seoDescription: '', published: true,
      }])),
    }],
  };
}

test('the supplied seed and an ordinary existing-product edit remain valid', () => {
  assert.deepEqual(validateCatalog(seed), { valid: true, errors: [] });
  const edited = clone(seed);
  edited.products[0].locales.en.name += ' updated';
  assert.deepEqual(validateCatalog(edited, { current: seed }), { valid: true, errors: [] });
});

test('published managed products support the actual route for all seven locales', () => {
  const catalog = managedCatalog();
  assert.deepEqual(validateCatalog(catalog), { valid: true, errors: [] });
  const pages = getManagedPages(catalog);
  assert.equal(pages.length, LOCALES.length);
  for (const page of pages) {
    // These are the exact params consumed by the seven [...managed].astro files.
    const generatedUrl = prefixFor(page.locale) + page.path.split('/').pop();
    assert.equal(page.localized.url, generatedUrl);
  }
});

test('managed publication rejects paths the locale product route cannot emit', () => {
  for (const locale of LOCALES) {
    const prefix = prefixFor(locale);
    for (const url of [
      '/somewhere/else/new-sensor',
      `${locale === 'en' ? '/zh/product/' : '/product/'}new-sensor`,
      `${prefix}nested/new-sensor`,
      prefix,
      `${prefix}new-sensor/`,
    ]) {
      const catalog = managedCatalog();
      catalog.products[0].locales[locale].url = url;
      const result = validateCatalog(catalog);
      assert.equal(result.valid, false, `${locale}: ${url}`);
      assert.ok(result.errors.some(error => error.includes(`locales.${locale}.url must use ${prefix}`)), result.errors.join('\n'));
      assert.equal(getManagedPages(catalog).some(page => page.locale === locale), false, `${locale}: invalid route must not be emitted`);
    }
  }
});

test('draft products and unpublished locales may keep a safe unfinished managed path', () => {
  const draft = managedCatalog();
  draft.products[0].status = 'draft';
  draft.products[0].locales.en.url = '/unfinished/custom/path';
  assert.equal(validateCatalog(draft).valid, true);
  assert.deepEqual(getManagedPages(draft), []);

  const hiddenLocale = managedCatalog();
  hiddenLocale.products[0].locales.en.published = false;
  hiddenLocale.products[0].locales.en.url = '/unfinished/custom/path';
  assert.equal(validateCatalog(hiddenLocale).valid, true);
  assert.equal(getManagedPages(hiddenLocale).some(page => page.locale === 'en'), false);
});

test('existing unmanaged pages keep safe legacy URL flexibility and publication locks', () => {
  const legacy = managedCatalog();
  legacy.products[0].managedPage = false;
  legacy.products[0].locales.en.url = '/legacy/show/id/123';
  assert.equal(validateCatalog(legacy).valid, true);
  assert.deepEqual(getManagedPages(legacy), []);

  const changedUrl = clone(legacy);
  changedUrl.products[0].locales.en.url = '/legacy/show/id/456';
  assert.ok(validateCatalog(changedUrl, { current: legacy }).errors.some(error => error.includes('Published URL')));
  const changedSlug = clone(legacy);
  changedSlug.products[0].slug = 'renamed-sensor';
  assert.ok(validateCatalog(changedSlug, { current: legacy }).errors.some(error => error.includes('immutable slug')));
  const changedId = clone(legacy);
  changedId.products[0].id = 'renamed-sensor';
  assert.ok(validateCatalog(changedId, { current: legacy }).errors.some(error => error.includes('id changed')));
});
