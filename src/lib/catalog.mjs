/** Shared, dependency-free catalog rules for Astro, the browser, Node and Workers. */
export const LOCALES = Object.freeze(['en', 'zh', 'es', 'de', 'ja', 'fr', 'ru']);

const MAX_BYTES = 1024 * 1024;
const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const BAD_TEXT = /[<>\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/;
const BAD_URL = /[\s<>\\\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/;
const LOCALIZED_FIELDS = ['name', 'summary', 'url', 'seoTitle', 'seoDescription', 'body', 'imageAlt'];
const LIMITS = { name: 200, summary: 5000, url: 2048, seoTitle: 300, seoDescription: 1000, body: 100000, imageAlt: 1000 };
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value) &&
  (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
const integer = value => Number.isSafeInteger(value);
const validId = value => typeof value === 'string' && value.length <= 100 && ID.test(value);
const own = (value, key) => Object.prototype.hasOwnProperty.call(value, key);

function safePath(value, { query = false } = {}) {
  if (typeof value !== 'string' || !value || value.length > 2048 || BAD_URL.test(value) ||
      !value.startsWith('/') || value.startsWith('//') || value.includes('#')) return false;
  if (!query && value.includes('?')) return false;
  const path = value.split('?')[0];
  // Encoded separators, nested encodings and dot segments are not canonical page paths.
  if (/%2f|%5c/i.test(path)) return false;
  let decoded;
  try { decoded = decodeURIComponent(path); } catch { return false; }
  if (decoded.includes('%') || BAD_URL.test(decoded) || decoded.includes('?') || decoded.includes('#') ||
      decoded.includes('//') || decoded.split('/').some(part => part === '.' || part === '..')) return false;
  return decoded.length > 1;
}

function safeImage(value) {
  if (typeof value !== 'string' || !value || value.length > 2048 || BAD_URL.test(value)) return false;
  if (value.startsWith('/')) return safePath(value, { query: true });
  try {
    // Inspect the supplied path before URL parsing normalizes away dot segments.
    const supplied = /^https:\/\/[^/?#]+(\/[^?#]*)?(?:\?[^#]*)?$/i.exec(value);
    if (!supplied || !safePath(supplied[1] || '/', { query: true })) return false;
    const parsed = new URL(value);
    return parsed.protocol === 'https:' && !!parsed.hostname && !parsed.username && !parsed.password &&
      !parsed.hash && safePath(parsed.pathname, { query: true });
  } catch { return false; }
}

function canonicalPath(value) {
  return decodeURIComponent(value).replace(/\/+$/, '');
}

function validDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  if (year < 1 || month < 1 || month > 12 || day < 1) return false;
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  return day <= [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

export function shanghaiDate(now = new Date()) {
  const date = now instanceof Date ? now : new Date(now);
  if (!Number.isFinite(date.getTime())) return '';
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function checkKeys(value, allowed, label, errors) {
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) errors.push(`${label}: unsupported field ${key}.`);
  }
}

function textField(value, label, maximum, errors, required = false) {
  if (typeof value !== 'string') { errors.push(`${label} must be text.`); return false; }
  if (value.length > maximum) errors.push(`${label} exceeds ${maximum} characters.`);
  if (BAD_TEXT.test(value)) errors.push(`${label} must be plain text without HTML or unsafe control characters.`);
  if (required && !value.trim()) errors.push(`${label} is required.`);
  return value.length <= maximum && !BAD_TEXT.test(value) && (!required || !!value.trim());
}

function localizedErrors(localized, label, { publishedProduct, managed, image }, errors) {
  if (!object(localized)) { errors.push(`${label} must be an object.`); return; }
  checkKeys(localized, [...LOCALIZED_FIELDS, 'published'], label, errors);
  for (const field of LOCALIZED_FIELDS) textField(localized[field], `${label}.${field}`, LIMITS[field], errors);
  if (typeof localized.published !== 'boolean') errors.push(`${label}.published must be boolean.`);
  if (typeof localized.url === 'string' && localized.url && !safePath(localized.url)) {
    errors.push(`${label}.url must be a safe root-relative product path without query or fragment.`);
  }
  if (!localized.published) return;
  if (typeof localized.name !== 'string' || !localized.name.trim()) errors.push(`${label}.name is required for a published locale.`);
  if (!safePath(localized.url)) errors.push(`${label}.url is required for a published locale.`);
  if (publishedProduct && managed) {
    if (typeof localized.summary !== 'string' || localized.summary.trim().length < 40) errors.push(`${label}.summary needs at least 40 characters to publish a managed page.`);
    if (typeof localized.body !== 'string' || localized.body.trim().length < 200) errors.push(`${label}.body needs at least 200 characters to publish a managed page.`);
    if (!safeImage(image?.src)) errors.push(`${label} needs an image URL to publish a managed page.`);
    if (typeof localized.imageAlt !== 'string' || !localized.imageAlt.trim()) errors.push(`${label}.imageAlt is required to publish a managed page.`);
  }
}

/** Validate JSON-shaped user input; validation errors are returned, never thrown. */
export function validateCatalog(catalog, { current = null } = {}) {
  const errors = [];
  try {
    if (!object(catalog)) return { valid: false, errors: ['Catalog must be an object.'] };
    let serialized;
    try { serialized = JSON.stringify(catalog); } catch { return { valid: false, errors: ['Catalog must be serializable JSON.'] }; }
    if (new TextEncoder().encode(serialized).byteLength > MAX_BYTES) return { valid: false, errors: ['Catalog exceeds the 1 MiB limit.'] };
    checkKeys(catalog, ['schemaVersion', 'categories', 'campaign', 'products'], 'Catalog', errors);
    if (catalog.schemaVersion !== 1) errors.push('schemaVersion must be 1.');
    if (!Array.isArray(catalog.categories) || catalog.categories.length < 1 || catalog.categories.length > 100) errors.push('categories must contain between 1 and 100 categories.');
    if (!Array.isArray(catalog.products) || catalog.products.length > 1000) errors.push('products must be an array with at most 1000 entries.');
    const categories = Array.isArray(catalog.categories) ? catalog.categories : [];
    const products = Array.isArray(catalog.products) ? catalog.products : [];
    const categoryIds = new Set();
    const productIds = new Set();
    const slugs = new Set();
    const routes = new Set();
    categories.forEach((category, index) => {
      const label = `categories[${index}]`;
      if (!object(category)) { errors.push(`${label} must be an object.`); return; }
      checkKeys(category, ['id', 'sortOrder', 'labels'], label, errors);
      if (!validId(category.id)) errors.push(`${label}.id must use lowercase letters, numbers and single hyphens (max 100 characters).`);
      if (categoryIds.has(category.id)) errors.push(`${label}.id is duplicated.`);
      categoryIds.add(category.id);
      if (!integer(category.sortOrder)) errors.push(`${label}.sortOrder must be a finite safe integer.`);
      if (!object(category.labels)) { errors.push(`${label}.labels must be an object.`); return; }
      checkKeys(category.labels, LOCALES, `${label}.labels`, errors);
      for (const [locale, value] of Object.entries(category.labels)) textField(value, `${label}.labels.${locale}`, 200, errors, locale === 'en');
      if (!own(category.labels, 'en')) errors.push(`${label}.labels.en is required.`);
    });
    products.forEach((product, index) => {
      const label = `products[${index}]`;
      if (!object(product)) { errors.push(`${label} must be an object.`); return; }
      checkKeys(product, ['id', 'slug', 'categoryId', 'sortOrder', 'status', 'managedPage', 'image', 'locales'], label, errors);
      if (!validId(product.id)) errors.push(`${label}.id must use lowercase letters, numbers and single hyphens (max 100 characters).`);
      if (!validId(product.slug)) errors.push(`${label}.slug must use lowercase letters, numbers and single hyphens (max 100 characters).`);
      if (productIds.has(product.id)) errors.push(`${label}.id is duplicated.`);
      if (slugs.has(product.slug)) errors.push(`${label}.slug is duplicated.`);
      productIds.add(product.id); slugs.add(product.slug);
      if (!categoryIds.has(product.categoryId)) errors.push(`${label}.categoryId must reference an existing category.`);
      if (!integer(product.sortOrder)) errors.push(`${label}.sortOrder must be a finite safe integer.`);
      if (!['draft', 'published'].includes(product.status)) errors.push(`${label}.status must be draft or published.`);
      if (typeof product.managedPage !== 'boolean') errors.push(`${label}.managedPage must be boolean.`);
      if (!object(product.image)) errors.push(`${label}.image must be an object.`);
      else {
        checkKeys(product.image, ['src', 'alt'], `${label}.image`, errors);
        textField(product.image.src, `${label}.image.src`, 2048, errors);
        textField(product.image.alt, `${label}.image.alt`, 1000, errors);
        if (typeof product.image.src === 'string' && product.image.src && !safeImage(product.image.src)) errors.push(`${label}.image.src must be a safe root-relative or HTTPS image URL.`);
      }
      if (!object(product.locales)) { errors.push(`${label}.locales must be an object.`); return; }
      checkKeys(product.locales, LOCALES, `${label}.locales`, errors);
      let publishedCount = 0;
      for (const [locale, localized] of Object.entries(product.locales)) {
        if (!LOCALES.includes(locale)) continue;
        localizedErrors(localized, `${label}.locales.${locale}`, {
          publishedProduct: product.status === 'published', managed: product.managedPage, image: product.image
        }, errors);
        if (localized?.published === true) publishedCount++;
        if (object(localized) && safePath(localized.url)) {
          const route = canonicalPath(localized.url);
          if (routes.has(route)) errors.push(`${label}.locales.${locale}.url is duplicated.`);
          routes.add(route);
        }
      }
      if (product.status === 'published' && product.managedPage === true && !publishedCount) errors.push(`${label} needs at least one published locale.`);
    });
    if (catalog.campaign !== null) {
      const campaign = catalog.campaign;
      if (!object(campaign)) errors.push('campaign must be null or an object.');
      else {
        checkKeys(campaign, ['productId', 'startsOn', 'endsOn'], 'campaign', errors);
        if (!productIds.has(campaign.productId)) errors.push('campaign.productId must reference an existing product.');
        if (!validDate(campaign.startsOn)) errors.push('campaign.startsOn must be a valid YYYY-MM-DD calendar date.');
        if (!validDate(campaign.endsOn)) errors.push('campaign.endsOn must be a valid YYYY-MM-DD calendar date.');
        if (validDate(campaign.startsOn) && validDate(campaign.endsOn) && campaign.startsOn > campaign.endsOn) errors.push('campaign.startsOn must be on or before endsOn.');
      }
    }
    if (current !== null) {
      const prior = validateCatalog(current);
      if (!prior.valid) errors.push('Current catalog is invalid; a normal save cannot replace it.');
      else {
        const nextCategories = new Set(categories.map(category => category?.id));
        const nextProducts = new Map(products.map(product => [product?.id, product]));
        const priorProducts = new Map(current.products.map(product => [product.id, product]));
        for (const category of current.categories) if (!nextCategories.has(category.id)) errors.push(`Existing category ${category.id} cannot be deleted or renamed.`);
        for (const previous of current.products) {
          const next = nextProducts.get(previous.id);
          if (!next) { errors.push(`Existing product ${previous.id} cannot be deleted or have its id changed.`); continue; }
          if (previous.status === 'published' && next.slug !== previous.slug) errors.push(`Published product ${previous.id} has an immutable slug.`);
          if (previous.status === 'published' && previous.managedPage === false && next.managedPage !== false) errors.push(`Existing published product ${previous.id} must keep managedPage false.`);
          for (const locale of LOCALES) {
            const oldLocale = previous.locales[locale];
            if (oldLocale?.published === true && next.locales?.[locale]?.url !== oldLocale.url) errors.push(`Published URL for ${previous.id}/${locale} is immutable.`);
          }
        }
        for (const product of products) if (object(product) && !priorProducts.has(product.id) && product.managedPage !== true) errors.push(`New product ${product.id} must use managedPage true.`);
      }
    }
    return { valid: errors.length === 0, errors };
  } catch {
    return { valid: false, errors: [...errors, 'Catalog contains an unsupported value.'] };
  }
}

const rankValue = value => integer(value) ? value : Number.MAX_SAFE_INTEGER;

export function getOrderedProducts(catalog, { date = shanghaiDate(), includeDrafts = false } = {}) {
  const campaign = catalog?.campaign;
  const active = object(campaign) && validDate(date) && validDate(campaign.startsOn) && validDate(campaign.endsOn) &&
    campaign.startsOn <= date && date <= campaign.endsOn;
  return (Array.isArray(catalog?.products) ? catalog.products : [])
    .map((product, index) => ({ product, index }))
    .filter(({ product }) => object(product) && (includeDrafts || product.status === 'published'))
    .sort((a, b) => {
      const front = product => active && product.status === 'published' && product.id === campaign.productId ? 0 : 1;
      return front(a.product) - front(b.product) || rankValue(a.product.sortOrder) - rankValue(b.product.sortOrder) || a.index - b.index;
    }).map(({ product }) => product);
}

export function getPublicProducts(catalog, locale = 'en', { date = shanghaiDate() } = {}) {
  if (!LOCALES.includes(locale)) return [];
  return getOrderedProducts(catalog, { date }).filter(product => product.locales?.[locale]?.published === true)
    .map(product => ({ ...product, localized: product.locales[locale] }));
}

export function getOrderedCategories(catalog) {
  return (Array.isArray(catalog?.categories) ? catalog.categories : [])
    .map((category, index) => ({ category, index })).filter(({ category }) => object(category))
    .sort((a, b) => rankValue(a.category.sortOrder) - rankValue(b.category.sortOrder) || a.index - b.index)
    .map(({ category }) => category);
}

function pathId(value) {
  if (typeof value !== 'string') return null;
  const path = value.split(/[?#]/)[0].replace(/\/+$/, '');
  const last = path.split('/').pop();
  try { return decodeURIComponent(last); } catch { return last; }
}

export function sortExistingProducts(existing, catalog, { date = shanghaiDate(), resolveId } = {}) {
  const ranks = new Map();
  getOrderedProducts(catalog, { date, includeDrafts: true }).forEach((product, index) => {
    for (const key of [product.id, product.slug]) if (typeof key === 'string' && !ranks.has(key)) ranks.set(key, index);
  });
  return (Array.isArray(existing) ? existing : []).map((item, index) => {
    let candidates;
    if (typeof resolveId === 'function') {
      try { const resolved = resolveId(item); candidates = Array.isArray(resolved) ? resolved : [resolved]; }
      catch { candidates = []; }
    } else candidates = [item?.id, item?.slug, pathId(item?.url), pathId(item?.href)];
    const match = candidates.find(candidate => ranks.has(candidate));
    return { item, index, rank: match === undefined ? Number.MAX_SAFE_INTEGER : ranks.get(match) };
  }).sort((a, b) => a.rank - b.rank || a.index - b.index).map(({ item }) => item);
}

export function getManagedPages(catalog) {
  const pages = [];
  const routes = new Set();
  for (const product of getOrderedProducts(catalog)) {
    if (product.managedPage !== true || !validId(product.id) || !validId(product.slug) || !object(product.locales)) continue;
    for (const locale of LOCALES) {
      const localized = product.locales[locale];
      if (!object(localized) || localized.published !== true) continue;
      const errors = [];
      localizedErrors(localized, locale, { publishedProduct: true, managed: true, image: product.image }, errors);
      if (errors.length || !safeImage(product.image?.src)) continue;
      const route = canonicalPath(localized.url);
      if (routes.has(route)) continue;
      routes.add(route);
      pages.push({ product, locale, localized, path: localized.url.slice(1) });
    }
  }
  return pages;
}
