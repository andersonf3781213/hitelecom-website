import { LOCALES, validateCatalog, getOrderedProducts, getOrderedCategories, shanghaiDate } from '../lib/catalog.mjs';

const LANGUAGE_NAMES = { en: 'English', zh: '中文', es: 'Español', de: 'Deutsch', ja: '日本語', fr: 'Français', ru: 'Русский' };
const STORAGE_KEY = 'hitelecom-catalog-draft-v1';
const clone = (value) => JSON.parse(JSON.stringify(value));
const byBase = (items) => items.map((item, index) => ({ item, index })).sort((a, b) => a.item.sortOrder - b.item.sortOrder || a.index - b.index).map(({ item }) => item);
const emptyLocale = () => ({ name: '', summary: '', url: '', seoTitle: '', seoDescription: '', body: '', imageAlt: '', published: false });
const messageOf = (error) => error instanceof Error ? error.message : String(error);
const slugify = (text) => text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 90).replace(/-$/, '');

/** Move a product in the full base list. Campaign and view filters never participate. */
export function moveProduct(catalog, productId, toIndex) {
  const result = clone(catalog);
  const products = byBase(result.products);
  const from = products.findIndex((product) => product.id === productId);
  if (from < 0 || !Number.isInteger(toIndex) || toIndex < 0 || toIndex >= products.length) return result;
  const [product] = products.splice(from, 1);
  products.splice(toIndex, 0, product);
  products.forEach((entry, index) => { entry.sortOrder = (index + 1) * 10; });
  return result;
}

export function setMonthlyCampaign(catalog, productId, now = new Date()) {
  const result = clone(catalog);
  const date = shanghaiDate(now);
  const [year, month] = date.split('-').map(Number);
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  result.campaign = { productId, startsOn: `${date.slice(0, 7)}-01`, endsOn: `${date.slice(0, 7)}-${String(lastDay).padStart(2, '0')}` };
  return result;
}

/** Import can update content but cannot remove existing records or rewrite published identity. */
export function preserveProtectedFields(imported, current) {
  const result = clone(imported);
  if (!result || !Array.isArray(result.products) || !Array.isArray(result.categories)) return result;
  for (const original of current.products) {
    let replacement = result.products.find((product) => product && product.id === original.id);
    if (!replacement && original.status === 'published') replacement = result.products.find((product) => product && product.slug === original.slug);
    if (!replacement) { result.products.push(clone(original)); continue; }
    if (original.status === 'published') {
      replacement.id = original.id;
      replacement.slug = original.slug;
      if (original.managedPage === false) replacement.managedPage = false;
    }
    for (const [locale, localized] of Object.entries(original.locales || {})) {
      if (localized?.published) {
        if (!replacement.locales || typeof replacement.locales !== 'object' || Array.isArray(replacement.locales)) replacement.locales = {};
        if (!replacement.locales[locale] || typeof replacement.locales[locale] !== 'object' || Array.isArray(replacement.locales[locale])) replacement.locales[locale] = clone(localized);
        replacement.locales[locale].url = localized.url;
      }
    }
  }
  for (const category of current.categories) {
    if (!result.categories.some((entry) => entry && entry.id === category.id)) result.categories.push(clone(category));
  }
  return result;
}

function makeElement(document, tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = String(text);
  return element;
}

export function initializeEditor({ root = globalThis.document?.querySelector('#catalog-app'), fetchImpl = globalThis.fetch?.bind(globalThis), storage, now = () => new Date(), confirmImpl, downloadImpl, promptImpl, sessionStorage: sessionStorageOverride, requestTimeoutMs = 30_000 } = {}) {
  if (!root || root.dataset.initialized === 'true') return null;
  root.dataset.initialized = 'true';
  const document = root.ownerDocument;
  const window = document.defaultView;
  const q = (selector) => root.querySelector(selector);
  const qa = (selector) => [...root.querySelectorAll(selector)];
  const seedNode = q('#catalog-seed') || document.querySelector('#catalog-seed');
  let seed;
  try { seed = JSON.parse(seedNode?.textContent || '{}'); } catch { q('[data-alert]').textContent = '初始目录无法读取，请检查目录 JSON。'; q('[data-alert]').hidden = false; return null; }
  const mode = root.dataset.mode !== 'demo' && window?.location.hostname === '127.0.0.1' && new URLSearchParams(window.location.search).get('mode') === 'local' ? 'local' : (root.dataset.mode || 'api');
  root.dataset.mode = mode;
  let browserStorage = storage;
  if (browserStorage === undefined) { try { browserStorage = window?.localStorage; } catch { browserStorage = null; } }
  const confirm = confirmImpl || ((text) => window.confirm(text));
  const state = { catalog: clone(seed), baseline: clone(seed), protectedCatalog: clone(seed), protectionHistory: [], version: null, backend: mode === 'local' ? 'local' : 'github', dirty: false, saving: false, connecting: false, ready: mode === 'demo', previewDate: shanghaiDate(now()), edit: null, editBaseline: null, editId: null, locale: 'en', draggedId: null, lastSaved: '', demoSavedAt: '', auto: null, feedback: null };
  const protections = () => [...state.protectionHistory, state.protectedCatalog];
  function validateWorkspace(candidate) {
    const errors = new Set();
    for (const current of [state.baseline, ...protections()]) for (const error of validateCatalog(candidate, { current }).errors) errors.add(error);
    return { valid: errors.size === 0, errors: [...errors] };
  }
  function preserveWorkspace(candidate) {
    return [state.baseline, ...protections()].reduce((result, current) => preserveProtectedFields(result, current), candidate);
  }
  function publishedProduct(id) { return protections().map(catalog => catalog.products.find(product => product.id === id)).find(product => product?.status === 'published'); }
  function publishedLocale(id, locale) { return protections().some(catalog => catalog.products.find(product => product.id === id)?.locales?.[locale]?.published === true); }
  function publicationKeys(catalog) {
    const keys = new Set();
    for (const product of catalog.products) {
      if (product.status === 'published') keys.add(`${product.id}:product`);
      for (const [locale, localized] of Object.entries(product.locales || {})) if (localized.published) keys.add(`${product.id}:${locale}`);
    }
    return keys;
  }
  function minimalProtectionHistory(next) {
    const candidates = protections().map(catalog => ({ catalog, keys: publicationKeys(catalog) }));
    const uncovered = new Set(candidates.flatMap(({ keys }) => [...keys]));
    for (const key of publicationKeys(next)) uncovered.delete(key);
    const history = [];
    while (uncovered.size) {
      candidates.sort((a, b) => [...b.keys].filter(key => uncovered.has(key)).length - [...a.keys].filter(key => uncovered.has(key)).length);
      const best = candidates.shift();
      if (!best || ![...best.keys].some(key => uncovered.has(key))) break;
      history.push(best.catalog);
      for (const key of best.keys) uncovered.delete(key);
    }
    for (let index = history.length - 1; index >= 0; index--) {
      const covered = publicationKeys(next);
      history.forEach((catalog, other) => { if (other !== index) for (const key of publicationKeys(catalog)) covered.add(key); });
      if ([...publicationKeys(history[index])].every(key => covered.has(key))) history.splice(index, 1);
    }
    return history;
  }

  function alert(text, editor = false, title = '请查看操作提示', kind = 'error') {
    const area = q(editor ? '[data-editor-alert]' : '[data-alert]');
    if (area) { area.textContent = text; area.hidden = !text; }
    const dialogArea = q('[data-editor-alert]');
    if (!editor && q('[data-product-dialog]')?.open && dialogArea) { dialogArea.textContent = text; dialogArea.hidden = !text; }
    state.feedback = text ? { title, description: text, kind } : null;
    updateSaveState();
    if (text && (editor || q('[data-product-dialog]')?.open)) {
      dialogArea?.scrollIntoView?.({ block: 'nearest' });
      dialogArea?.focus({ preventScroll: true });
    }
  }
  function setSaveState(title, description, kind = '') {
    q('[data-save-title]').textContent = title;
    q('[data-save-description]').textContent = description;
    q('[data-save-indicator]').className = `save-indicator ${kind}`;
    // 未连接（!state.ready）时保持可点：点击保存按钮会重新连接并弹出密码框（V111b）
    q('[data-action="save"]').disabled = state.saving || state.connecting || (state.ready && !state.dirty);
    q('[data-action="save"]').textContent = state.saving ? '正在保存…' : state.connecting ? '正在连接…' : !state.ready ? '连接目录 ↗' : '保存更改 ↗';
    q('[data-action="discard"]').disabled = !state.dirty || state.saving || state.connecting;
    q('.save-bar')?.setAttribute('aria-busy', String(state.saving || state.connecting));
  }
  function updateSaveState() {
    if (state.saving) return setSaveState('正在保存目录', '请稍候，当前编辑内容会保留。', 'pending');
    if (state.connecting) return setSaveState('正在连接目录', '正在读取最新目录；需要密码时会显示登录窗口。', 'pending');
    if (state.feedback) return setSaveState(state.feedback.title, state.feedback.description, state.feedback.kind);
    if (state.editBaseline && hasUncommittedEditor()) return setSaveState('编辑框中有未应用的内容', '先点击「完成编辑」，再保存或导出工作区。', 'dirty');
    if (state.dirty) return setSaveState('有未保存的更改', mode === 'demo' ? '演示内容仅保留在此浏览器，也可导出备份。' : '更改保留在当前工作区，保存后才会写入目录。', 'dirty');
    if (!state.ready) return setSaveState('目录尚未连接', '点击「连接目录」登录或重试，当前编辑内容会保留。', 'error');
    if (state.lastSaved) return setSaveState(state.lastSaved, mode === 'demo' ? '仅保存在此浏览器，不会更新网站。' : state.backend === 'local' ? '目录 JSON 已写入本地文件。重新构建后网站才会更新。' : '目录已提交 GitHub，等待网站构建。构建完成前页面不会更新。', 'saved');
    setSaveState('目录已加载', mode === 'demo' ? '浏览器演示 · 修改不会更新官网。' : '编辑完成后保存目录数据。');
  }
  function persistDemo({ baseline = state.baseline, protectedCatalog = state.protectedCatalog, protectionHistory = state.protectionHistory, savedAt = state.demoSavedAt } = {}) {
    if (mode !== 'demo') return true;
    try {
      if (!browserStorage) throw new Error('Storage unavailable');
      browserStorage.setItem(STORAGE_KEY, JSON.stringify({ catalog: state.catalog, baseline, protectedCatalog, protectionHistory, savedAt, updatedAt: now().toISOString() }));
      return true;
    } catch { alert('浏览器存储不可用，编辑内容仍保留在当前页面。请导出 JSON 备份。'); return false; }
  }
  function markDirty() { state.dirty = JSON.stringify(state.catalog) !== JSON.stringify(state.baseline); state.lastSaved = ''; state.feedback = null; persistDemo(); render(); }
  function productName(product) { return product.locales?.zh?.name || product.locales?.en?.name || product.id || '未命名产品'; }
  function categoryName(id) { const category = state.catalog.categories.find((entry) => entry.id === id); return category?.labels?.zh || category?.labels?.en || id; }
  function isFiltered() { return Boolean(q('[data-filter="search"]').value.trim() || q('[data-filter="category"]').value || q('[data-filter="status"]').value); }
  function rowButton(label, action, id, className = 'text-button') {
    const button = makeElement(document, 'button', className, label);
    button.type = 'button'; button.dataset.action = action; button.dataset.id = id;
    return button;
  }
  function renderProducts() {
    const list = q('[data-product-list]'); list.replaceChildren();
    const products = byBase(state.catalog.products);
    const search = q('[data-filter="search"]').value.trim().toLowerCase();
    const category = q('[data-filter="category"]').value;
    const status = q('[data-filter="status"]').value;
    const filtered = isFiltered(); let count = 0;
    products.forEach((product, index) => {
      const haystack = [product.id, product.slug, ...Object.values(product.locales || {}).map((locale) => locale.name)].join(' ').toLowerCase();
      if ((search && !haystack.includes(search)) || (category && product.categoryId !== category) || (status && product.status !== status)) return;
      count++;
      const row = makeElement(document, 'li', 'product-row'); row.dataset.productId = product.id;
      const controls = makeElement(document, 'div', 'order-controls');
      const handle = rowButton('⠿', 'drag', product.id, 'drag-handle'); handle.draggable = !filtered; handle.disabled = filtered; handle.title = '拖动调整基础顺序'; handle.setAttribute('aria-label', `拖动 ${productName(product)} 调整基础顺序`);
      controls.append(handle, makeElement(document, 'span', 'order-number', String(index + 1).padStart(2, '0')));
      const moveControls = makeElement(document, 'div', 'move-buttons');
      const up = rowButton('↑', 'move-up', product.id, 'move-button'); up.disabled = filtered || index === 0; up.setAttribute('aria-label', `上移 ${productName(product)}`);
      const down = rowButton('↓', 'move-down', product.id, 'move-button'); down.disabled = filtered || index === products.length - 1; down.setAttribute('aria-label', `下移 ${productName(product)}`);
      moveControls.append(up, down); controls.append(moveControls);
      const identity = makeElement(document, 'div', 'product-identity'); const title = makeElement(document, 'div', 'product-title');
      title.append(makeElement(document, 'strong', '', productName(product)), makeElement(document, 'span', `status-pill ${product.status === 'published' ? 'published' : 'draft'}`, product.status === 'published' ? '已发布' : '草稿'));
      if (state.catalog.campaign?.productId === product.id) title.append(makeElement(document, 'span', 'campaign-pill', '主推'));
      const meta = makeElement(document, 'div', 'product-meta'); meta.append(makeElement(document, 'span', '', categoryName(product.categoryId)), makeElement(document, 'span', 'meta-dot', '·'), makeElement(document, 'code', '', product.slug));
      identity.append(title, meta);
      const actions = makeElement(document, 'div', 'product-actions');
      const pin = rowButton('本月主推', 'pin', product.id); pin.disabled = product.status !== 'published'; pin.title = product.status !== 'published' ? '主推仅适用于已发布产品' : '使用上海时间本月的起止日期';
      actions.append(pin, rowButton('编辑', 'edit', product.id, 'button button-row'));
      row.append(controls, identity, actions); list.append(row);
    });
    q('[data-filter-notice]').hidden = !filtered;
    q('[data-empty]').hidden = count > 0;
    q('[data-list-summary]').textContent = filtered ? `显示 ${count} / ${products.length} 款产品` : `共 ${products.length} 款产品`;
  }
  function renderCategories() {
    const list = q('[data-category-list]'); list.replaceChildren();
    const categories = getOrderedCategories(state.catalog);
    categories.forEach((category, index) => {
      const item = makeElement(document, 'li', 'category-row'); const name = makeElement(document, 'div', 'category-name'); name.append(makeElement(document, 'strong', '', category.labels.zh || category.labels.en), makeElement(document, 'small', '', category.id));
      const count = state.catalog.products.filter((product) => product.categoryId === category.id).length;
      const actions = makeElement(document, 'div', 'category-actions');
      const up = rowButton('↑', 'category-up', category.id, 'move-button'); up.disabled = index === 0; up.setAttribute('aria-label', `上移分类 ${category.labels.en}`);
      const down = rowButton('↓', 'category-down', category.id, 'move-button'); down.disabled = index === categories.length - 1; down.setAttribute('aria-label', `下移分类 ${category.labels.en}`);
      actions.append(makeElement(document, 'span', 'category-count', count), up, down); item.append(name, actions); list.append(item);
    });
    const filter = q('[data-filter="category"]'); const selected = filter.value; filter.replaceChildren(makeElement(document, 'option', '', '全部分类')); filter.firstElementChild.value = '';
    categories.forEach((category) => { const option = makeElement(document, 'option', '', category.labels.zh || category.labels.en); option.value = category.id; filter.append(option); });
    filter.value = selected;
  }
  function renderCampaign() {
    const campaign = state.catalog.campaign;
    const product = campaign && state.catalog.products.find((entry) => entry.id === campaign.productId);
    q('[data-campaign-name]').textContent = product ? productName(product) : '尚未设置主推产品';
    const active = Boolean(campaign && state.previewDate >= campaign.startsOn && state.previewDate <= campaign.endsOn && product?.status === 'published');
    q('[data-campaign-state]').textContent = campaign ? active ? '预览日期内生效' : product?.status !== 'published' ? '产品为草稿，主推不展示' : state.previewDate < campaign.startsOn ? '预览日期尚未开始' : '预览日期已结束' : '从下方产品中选择';
    q('[data-campaign-state]').classList.toggle('is-active', active);
    for (const key of ['start', 'end']) { const input = q(`[data-campaign-${key}]`); input.value = campaign ? campaign[key === 'start' ? 'startsOn' : 'endsOn'] : ''; input.disabled = !campaign; }
    q('[data-action="clear-campaign"]').disabled = !campaign;
    const list = q('[data-preview-list]'); list.replaceChildren();
    const ordered = getOrderedProducts(state.catalog, { date: state.previewDate });
    ordered.slice(0, 4).forEach((entry, index) => { const item = makeElement(document, 'li', active && campaign.productId === entry.id ? 'preview-item featured' : 'preview-item'); item.append(makeElement(document, 'span', 'preview-number', String(index + 1).padStart(2, '0')), makeElement(document, 'span', '', productName(entry))); if (active && campaign.productId === entry.id) item.append(makeElement(document, 'span', 'preview-star', '✦')); list.append(item); });
    if (!ordered.length) list.append(makeElement(document, 'li', 'preview-empty', '暂无已发布产品'));
    if (ordered.length > 4) list.append(makeElement(document, 'li', 'preview-more', `另有 ${ordered.length - 4} 款产品`));
  }
  function render() {
    for (const key of ['all', 'published', 'draft', 'categories']) {
      const value = key === 'all' ? state.catalog.products.length : key === 'categories' ? state.catalog.categories.length : state.catalog.products.filter((product) => product.status === key).length;
      qa(`[data-count="${key}"]`).forEach((element) => { element.textContent = String(value); });
    }
    renderCategories(); renderProducts(); renderCampaign(); updateSaveState();
  }
  function showDialog(dialog) { if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', ''); }
  function closeDialog() { const dialog = q('[data-product-dialog]'); if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open'); state.edit = null; state.editBaseline = null; }
  function field(name) { return q('[data-product-form]').elements.namedItem(name); }
  const localeFields = { localeName: 'name', localeSummary: 'summary', localeUrl: 'url', localeBody: 'body', localeImageAlt: 'imageAlt', localeSeoTitle: 'seoTitle', localeSeoDescription: 'seoDescription' };
  function editorSnapshot() {
    if (!state.edit) return null;
    const product = clone(state.edit);
    const localized = product.locales[state.locale] ||= emptyLocale();
    for (const [name, key] of Object.entries(localeFields)) localized[key] = field(name).value;
    localized.published = field('localePublished').checked;
    for (const name of ['id', 'slug', 'categoryId', 'status']) product[name] = field(name).value.trim();
    product.managedPage = field('managedPage').checked;
    product.image = { src: field('imageSrc').value.trim(), alt: field('imageAlt').value.trim() };
    return product;
  }
  function hasUncommittedEditor() { return Boolean(state.edit && JSON.stringify(editorSnapshot()) !== JSON.stringify(state.editBaseline)); }
  function flushLocale() {
    if (!state.edit) return;
    const localized = state.edit.locales[state.locale] ||= emptyLocale();
    for (const [name, key] of Object.entries(localeFields)) localized[key] = field(name).value;
    localized.published = field('localePublished').checked;
  }
  function renderLocale() {
    const localized = state.edit.locales[state.locale] ||= emptyLocale();
    for (const [name, key] of Object.entries(localeFields)) field(name).value = localized[key] || '';
    field('localeName').required = !state.editId && state.locale === 'en';
    field('localePublished').checked = localized.published === true;
    const locked = publishedLocale(state.editId, state.locale);
    field('localeUrl').readOnly = locked;
    q('[data-url-hint]').textContent = locked ? '此语言已有发布地址，保存与导入均会保留。' : '填写真实地址。不会自动猜测其他语言的地址。';
    q('[data-locale-title]').textContent = LANGUAGE_NAMES[state.locale];
    qa('[data-locale]').forEach((button) => { const selected = button.dataset.locale === state.locale; button.classList.toggle('active', selected); button.setAttribute('aria-selected', String(selected)); button.tabIndex = selected ? 0 : -1; });
    q('[data-locale-panel]').setAttribute('aria-labelledby', `locale-tab-${state.locale}`);
  }
  function openEditor(id) {
    alert('', true);
    state.editId = id || null; state.locale = 'en'; state.auto = { id: !id, slug: !id, url: !id };
    state.edit = id ? clone(state.catalog.products.find((product) => product.id === id)) : { id: '', slug: '', categoryId: getOrderedCategories(state.catalog)[0]?.id || '', sortOrder: Math.max(0, ...state.catalog.products.map((product) => product.sortOrder)) + 10, status: 'draft', managedPage: true, image: { src: '', alt: '' }, locales: Object.fromEntries(LOCALES.map((locale) => [locale, emptyLocale()])) };
    if (!state.edit) return;
    const original = state.protectedCatalog.products.find((product) => product.id === id);
    const published = publishedProduct(id); const locked = Boolean(published);
    q('#editor-title').textContent = id ? '编辑产品' : '新增产品';
    for (const name of ['id', 'slug', 'status']) field(name).value = state.edit[name];
    field('id').readOnly = Boolean(original); field('slug').readOnly = locked;
    field('managedPage').checked = state.edit.managedPage === true;
    field('managedPage').disabled = locked && published.managedPage === false;
    field('imageSrc').value = state.edit.image?.src || ''; field('imageAlt').value = state.edit.image?.alt || '';
    const categories = field('categoryId'); categories.replaceChildren(); getOrderedCategories(state.catalog).forEach((category) => { const option = makeElement(document, 'option', '', category.labels.zh || category.labels.en); option.value = category.id; categories.append(option); }); categories.value = state.edit.categoryId;
    renderLocale(); state.editBaseline = editorSnapshot(); showDialog(q('[data-product-dialog]'));
  }
  function commitEditor(event) {
    event.preventDefault(); flushLocale();
    const product = clone(state.edit);
    if (!state.editId && !product.locales.en?.name?.trim()) { alert('请填写英文产品名称，然后完成编辑。', true); state.locale = 'en'; renderLocale(); field('localeName').focus(); return; }
    for (const name of ['id', 'slug', 'categoryId', 'status']) product[name] = field(name).value.trim();
    product.managedPage = field('managedPage').checked;
    product.image = { src: field('imageSrc').value.trim(), alt: field('imageAlt').value.trim() };
    const next = clone(state.catalog);
    if (state.editId) { const index = next.products.findIndex((entry) => entry.id === state.editId); if (index < 0) { alert('该产品已不在当前目录中。请复制需要保留的内容，关闭编辑后重新核对目录。', true); return; } next.products[index] = product; } else next.products.push(product);
    const validation = validateWorkspace(next);
    if (!validation.valid) { alert(validation.errors.join('\n'), true); return; }
    state.catalog = next; closeDialog(); alert(''); markDirty();
  }
  async function save() {
    if (hasUncommittedEditor()) { alert('编辑框中还有未应用的内容。请先点击「完成编辑」，再保存更改。', true, '尚未保存：请先完成编辑'); return; }
    if (!state.dirty || state.saving || !state.ready) return;
    const validation = validateWorkspace(state.catalog);
    if (!validation.valid) { alert(validation.errors.join('\n'), false, '无法保存：请修正下列问题'); return; }
    alert(''); state.saving = true; updateSaveState();
    const snapshot = clone(state.catalog);
    // Keep valid historical snapshots only when publication locks disappear from the next save.
    // A hidden product may be incomplete, so changing its status in a synthetic snapshot is unsafe.
    const protectedNext = clone(snapshot);
    const historyNext = minimalProtectionHistory(snapshot);
    try {
      if (mode === 'demo') {
        const savedAt = now().toISOString();
        if (!persistDemo({ baseline: snapshot, protectedCatalog: protectedNext, protectionHistory: historyNext, savedAt })) throw new Error('浏览器存储不可用，请导出 JSON 备份。');
        state.demoSavedAt = savedAt; state.lastSaved = '已保存到此浏览器';
      }
      else {
        if (!fetchImpl) throw new Error('当前环境无法连接保存接口。');
        const headers = { 'Content-Type': 'application/json' };
        if (mode === 'local') { const configResponse = await request('/api/config', { cache: 'no-store', credentials: 'same-origin' }); const config = await readResponse(configResponse); if (!config.csrfToken) throw new Error('无法获取本地保存凭据，请刷新后重试。'); headers['X-Catalog-CSRF'] = config.csrfToken; }
        const response = await apiFetch('/api/catalog', { method: 'PUT', headers, body: JSON.stringify({ catalog: snapshot, version: state.version }) });
        const data = await readResponse(response);
        if (data.saved !== true || typeof data.version !== 'string' || !data.version.trim()) throw new Error('保存接口没有确认成功，编辑内容已保留。');
        state.version = data.version; state.backend = data.mode || state.backend;
        state.lastSaved = state.backend === 'local' ? '已写入本地文件' : '已提交 GitHub，等待构建';
      }
      state.baseline = snapshot;
      state.protectedCatalog = protectedNext; state.protectionHistory = historyNext; state.dirty = JSON.stringify(state.catalog) !== JSON.stringify(snapshot);
    } catch (error) { state.dirty = true; state.lastSaved = ''; alert(`保存失败：${messageOf(error)}\n编辑内容已保留，可导出 JSON 备份。`, false, '保存未完成'); }
    finally { state.saving = false; render(); }
  }
  // 管理密码模式（V110）：口令仅保存在本次浏览会话（sessionStorage），
  // 随请求以 Bearer 头发送；API 返回 401 且 mode=password 时提示输入并重试一次。
  // Access 模式下浏览器在进入页面前已完成登录，不会触发此分支。
  const TOKEN_KEY = 'catalog-admin-token';
  let tokenStorage = sessionStorageOverride;
  if (tokenStorage === undefined) { try { tokenStorage = window?.sessionStorage; } catch { tokenStorage = null; } }
  let memoryToken = '';
  const getToken = () => { if (memoryToken) return memoryToken; try { return tokenStorage?.getItem(TOKEN_KEY) || ''; } catch { return ''; } };
  const setToken = (value) => { memoryToken = value || ''; try { if (memoryToken) tokenStorage?.setItem(TOKEN_KEY, memoryToken); else tokenStorage?.removeItem(TOKEN_KEY); } catch {} };
  let authPending = null;
  function requestPassword() {
    if (promptImpl) return Promise.resolve(promptImpl('请输入管理密码（仅本次浏览会话有效）'));
    if (authPending) return authPending.promise;
    const dialog = q('[data-auth-dialog]');
    if (!dialog) return Promise.reject(new Error('登录窗口缺失，请重新加载管理页。'));
    const input = q('[data-admin-password]'); input.value = '';
    const promise = new Promise(resolve => { authPending = { resolve }; });
    authPending.promise = promise;
    showDialog(dialog); input.focus();
    return promise;
  }
  function finishAuthentication(value) {
    if (!authPending) return;
    const { resolve } = authPending; authPending = null;
    const dialog = q('[data-auth-dialog]');
    q('[data-admin-password]').value = '';
    if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open');
    resolve(value);
  }
  q('[data-auth-form]')?.addEventListener('submit', event => { event.preventDefault(); const value = q('[data-admin-password]').value; if (value) finishAuthentication(value); });
  q('[data-auth-dialog]')?.addEventListener('cancel', event => { event.preventDefault(); finishAuthentication(null); });
  async function request(url, options = {}) {
    if (!fetchImpl) throw new Error('当前环境无法连接目录接口。');
    const controller = new AbortController();
    const timeout = Number.isFinite(requestTimeoutMs) && requestTimeoutMs > 0 ? requestTimeoutMs : 30_000;
    let timer;
    const expired = new Promise((_, reject) => { timer = setTimeout(() => {
      reject(new Error(options.method === 'PUT' ? '保存请求超时，结果尚未确认。请先导出备份，刷新读取目录并确认后再保存。' : '连接目录接口超时，请检查网络后重新连接。'));
      controller.abort();
    }, timeout); });
    const completed = (async () => {
      const response = await fetchImpl(url, { ...options, signal: controller.signal });
      // Keep the deadline active through body transfer, not only response headers.
      const text = await response.text();
      return new Response([204, 205, 304].includes(response.status) ? null : text, { status: response.status, statusText: response.statusText, headers: response.headers });
    })();
    try { return await Promise.race([completed, expired]); }
    finally { clearTimeout(timer); }
  }
  async function apiFetch(url, options = {}, retried = false) {
    const headers = { ...(options.headers || {}) };
    if (getToken()) headers['Authorization'] = `Bearer ${getToken()}`;
    const response = await request(url, { ...options, headers, credentials: 'same-origin' });
    if (response.status === 401) setToken('');
    if (response.status === 401 && !retried && mode === 'api') {
      let wantsPassword = false;
      try { const data = await response.clone().json(); wantsPassword = data?.mode === 'password'; } catch {}
      if (wantsPassword) {
        const password = await requestPassword();
        if (password) {
          setToken(password);
          return apiFetch(url, options, true);
        } else throw new Error('已取消登录。当前编辑内容仍保留，可点击「连接目录」重试。');
      }
    }
    return response;
  }
  async function readResponse(response) {
    let data;
    try { data = await response.json(); } catch { throw new Error('接口未返回有效 JSON，请检查服务地址或登录状态。'); }
    if (!response.ok) {
      if (response.status === 409) throw new Error('目录版本已更新（409）。请先导出当前更改，刷新取得最新版本后再合并导入。');
      throw new Error([data.error || `请求失败（${response.status}）`, ...(Array.isArray(data.errors) ? data.errors : [])].join('\n'));
    }
    return data;
  }
  function importCatalog(value) {
    const candidate = preserveWorkspace(value?.catalog || value);
    const validation = validateWorkspace(candidate);
    if (!validation.valid) { alert(`导入失败：${validation.errors.join('\n')}`); return false; }
    state.catalog = candidate; markDirty(); alert('备份已导入工作区。已发布标识、已有发布地址和现有记录已保留，请检查后保存。', false, '备份已导入工作区', 'notice'); return true;
  }
  function exportCatalog() {
    if (hasUncommittedEditor()) { alert('编辑框中还有未应用的内容。请先点击「完成编辑」，再导出 JSON 备份。', true, '暂未导出：请先完成编辑'); return false; }
    const json = `${JSON.stringify(state.catalog, null, 2)}\n`;
    const filename = `hitelecom-catalog-${shanghaiDate(now())}.json`;
    if (downloadImpl) { downloadImpl(json, filename); return; }
    const blob = new window.Blob([json], { type: 'application/json;charset=utf-8' });
    const url = window.URL.createObjectURL(blob); const link = makeElement(document, 'a'); link.href = url; link.download = filename; document.body.append(link); link.click(); link.remove(); window.setTimeout(() => window.URL.revokeObjectURL(url), 1000);
  }
  root.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]'); if (!button || button.disabled) return;
    const action = button.dataset.action; const id = button.dataset.id;
    if (action === 'add' || action === 'edit') openEditor(id);
    else if (action === 'cancel-auth') finishAuthentication(null);
    else if (action === 'close-editor') closeDialog();
    else if (action === 'save') { if (!state.ready && mode !== 'demo') void connect(); else void save(); }
    else if (action === 'discard') { if (confirm('放弃当前未保存的更改？')) { state.catalog = clone(state.baseline); state.dirty = false; state.lastSaved = mode === 'demo' && state.demoSavedAt ? '已保存到此浏览器' : ''; persistDemo(); alert(''); render(); } }
    else if (action === 'export') exportCatalog();
    else if (action === 'import') q('[data-import-file]').click();
    else if (action === 'pin') { state.catalog = setMonthlyCampaign(state.catalog, id, now()); alert(''); markDirty(); }
    else if (action === 'clear-campaign') { state.catalog.campaign = null; markDirty(); }
    else if (action === 'move-up' || action === 'move-down') { if (isFiltered()) return; const index = byBase(state.catalog.products).findIndex((product) => product.id === id); state.catalog = moveProduct(state.catalog, id, index + (action === 'move-up' ? -1 : 1)); markDirty(); const next = qa('[data-id]').find((entry) => entry.dataset.id === id && entry.dataset.action === action && !entry.disabled) || qa('[data-id]').find((entry) => entry.dataset.id === id && entry.dataset.action.startsWith('move-') && !entry.disabled); next?.focus(); }
    else if (action === 'category-up' || action === 'category-down') { const categories = getOrderedCategories(state.catalog); const from = categories.findIndex((category) => category.id === id); const to = from + (action === 'category-up' ? -1 : 1); if (to < 0 || to >= categories.length) return; const [category] = categories.splice(from, 1); categories.splice(to, 0, category); categories.forEach((entry, index) => { entry.sortOrder = (index + 1) * 10; }); markDirty(); const next = qa('[data-id]').find((entry) => entry.dataset.id === id && entry.dataset.action.startsWith('category-') && !entry.disabled); next?.focus(); }
  });
  q('[data-product-form]').addEventListener('submit', commitEditor);
  q('[data-product-form]').addEventListener('input', (event) => {
    updateSaveState();
    if (!state.edit || state.editId) return;
    const name = event.target.name;
    if (name === 'id' || name === 'slug') state.auto[name] = false;
    if (name === 'localeUrl' && state.locale === 'en') state.auto.url = false;
    if (name === 'localeName' && state.locale === 'en') {
      const base = slugify(event.target.value) || `sensor-${now().getTime().toString(36)}`;
      let generated = base, suffix = 2;
      while (state.catalog.products.some((product) => product.id === generated || product.slug === generated)) generated = `${base}-${suffix++}`;
      if (state.auto.id) field('id').value = generated;
      if (state.auto.slug) field('slug').value = generated;
    }
    if (state.auto.url && state.locale === 'en' && ['localeName', 'slug'].includes(name)) {
      field('localeUrl').value = field('slug').value ? `/product/${field('slug').value}` : '';
      state.edit.locales.en.url = field('localeUrl').value;
    }
  });
  q('[data-product-dialog]').addEventListener('cancel', () => { state.edit = null; state.editBaseline = null; });
  q('[data-product-form]').addEventListener('invalid', event => {
    const details = event.target.closest('details'); if (details) details.open = true;
    alert(`请检查输入内容：${event.target.validationMessage || event.target.name}`, true, '请修正编辑框中的输入');
  }, true);
  const tabs = q('[data-locale-tabs]');
  LOCALES.forEach((locale) => { const tab = makeElement(document, 'button', 'locale-tab', LANGUAGE_NAMES[locale]); tab.type = 'button'; tab.dataset.locale = locale; tab.id = `locale-tab-${locale}`; tab.setAttribute('role', 'tab'); tab.setAttribute('aria-controls', 'catalog-locale-content'); tabs.append(tab); });
  q('[data-locale-panel]').id = 'catalog-locale-content';
  tabs.addEventListener('click', (event) => { const tab = event.target.closest('[data-locale]'); if (!tab) return; flushLocale(); state.locale = tab.dataset.locale; renderLocale(); });
  tabs.addEventListener('keydown', (event) => { if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return; event.preventDefault(); const index = LOCALES.indexOf(state.locale); const to = event.key === 'Home' ? 0 : event.key === 'End' ? LOCALES.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + LOCALES.length) % LOCALES.length; flushLocale(); state.locale = LOCALES[to]; renderLocale(); q(`[data-locale="${state.locale}"]`).focus(); });
  qa('[data-filter]').forEach((input) => input.addEventListener(input.tagName === 'INPUT' ? 'input' : 'change', renderProducts));
  q('[data-preview-date]').value = state.previewDate;
  q('[data-preview-date]').addEventListener('change', (event) => { if (event.target.value) state.previewDate = event.target.value; renderCampaign(); });
  for (const key of ['start', 'end']) q(`[data-campaign-${key}]`).addEventListener('change', (event) => { if (!state.catalog.campaign) return; state.catalog.campaign[key === 'start' ? 'startsOn' : 'endsOn'] = event.target.value; markDirty(); });
  q('[data-category-form]').addEventListener('submit', (event) => {
    event.preventDefault(); const form = event.currentTarget;
    const category = { id: form.elements.namedItem('categoryId').value.trim(), sortOrder: Math.max(0, ...state.catalog.categories.map((entry) => entry.sortOrder)) + 10, labels: { en: form.elements.namedItem('categoryEn').value.trim(), zh: form.elements.namedItem('categoryZh').value.trim() } };
    const next = clone(state.catalog); next.categories.push(category); const validation = validateWorkspace(next);
    if (!validation.valid) { alert(validation.errors.join('\n')); return; }
    state.catalog = next; form.reset(); q('.add-category').open = false; alert(''); markDirty();
  });
  q('[data-import-file]').addEventListener('change', async (event) => { const file = event.target.files?.[0]; if (!file) return; try { if (file.size > 1024 * 1024) throw new Error('备份文件不能超过 1 MiB。'); importCatalog(JSON.parse(await file.text())); } catch (error) { alert(`导入失败：${messageOf(error)}`); } finally { event.target.value = ''; } });
  root.addEventListener('dragstart', (event) => { const handle = event.target.closest('[data-action="drag"]'); if (!handle || isFiltered()) { event.preventDefault(); return; } state.draggedId = handle.dataset.id; event.dataTransfer?.setData('text/plain', state.draggedId); if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move'; handle.closest('.product-row').classList.add('is-dragging'); });
  root.addEventListener('dragover', (event) => { const row = event.target.closest('[data-product-id]'); if (row && state.draggedId && !isFiltered()) { event.preventDefault(); row.classList.add('drop-target'); } });
  root.addEventListener('dragleave', (event) => { const row = event.target.closest('[data-product-id]'); if (row && !row.contains(event.relatedTarget)) row.classList.remove('drop-target'); });
  root.addEventListener('drop', (event) => { const row = event.target.closest('[data-product-id]'); if (!row || !state.draggedId || isFiltered()) return; event.preventDefault(); const index = byBase(state.catalog.products).findIndex((product) => product.id === row.dataset.productId); state.catalog = moveProduct(state.catalog, state.draggedId, index); state.draggedId = null; markDirty(); });
  root.addEventListener('dragend', () => { state.draggedId = null; qa('.is-dragging, .drop-target').forEach((row) => row.classList.remove('is-dragging', 'drop-target')); });
  window?.addEventListener('beforeunload', (event) => { if ((state.dirty || hasUncommittedEditor()) && mode !== 'demo') { event.preventDefault(); event.returnValue = ''; } });
  q('[data-mode-label]').textContent = mode === 'demo' ? '浏览器演示' : mode === 'local' ? '本地文件模式' : 'GitHub 保存模式';
  q('[data-mode-notice]').textContent = mode === 'demo' ? '演示工作区 · 更改仅保存在当前浏览器，可导出 JSON 备份，不会更新官网。' : mode === 'local' ? '本地文件模式 · 保存将写入目录 JSON 文件。重新构建网站后，公开页面才会更新。' : 'GitHub 保存模式 · 保存会提交目录数据，等待网站构建完成后，公开页面才会更新。';
  if (mode === 'demo') {
    try {
      const raw = browserStorage?.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw);
        const hasBaseline = Boolean(stored && Object.hasOwn(stored, 'baseline'));
        const baseline = hasBaseline ? preserveProtectedFields(stored.baseline, seed) : clone(seed);
        const protectedCatalog = hasBaseline && stored.protectedCatalog ? preserveProtectedFields(stored.protectedCatalog, seed) : clone(baseline);
        if (hasBaseline && stored.protectionHistory !== undefined && !Array.isArray(stored.protectionHistory)) throw new Error('Invalid protection history');
        const protectionHistory = hasBaseline ? (stored.protectionHistory || []).map(previous => preserveProtectedFields(previous, seed)) : [];
        const allProtections = [...protectionHistory, protectedCatalog];
        const candidate = [baseline, ...allProtections].reduce((result, current) => preserveProtectedFields(result, current), stored?.catalog || stored);
        const valid = allProtections.every(current => validateCatalog(current, { current: seed }).valid)
          && allProtections.every(current => validateCatalog(baseline, { current }).valid)
          && [baseline, ...allProtections].every(current => validateCatalog(candidate, { current }).valid);
        if (valid) {
          state.catalog = candidate; state.baseline = baseline; state.protectedCatalog = protectedCatalog; state.protectionHistory = protectionHistory;
          state.dirty = JSON.stringify(candidate) !== JSON.stringify(baseline);
          state.demoSavedAt = hasBaseline && typeof stored.savedAt === 'string' ? stored.savedAt : '';
          if (!state.dirty && state.demoSavedAt) state.lastSaved = '已保存到此浏览器';
        } else alert('浏览器中的旧草稿无法通过检查，已加载初始目录。');
      }
    } catch { alert('浏览器草稿无法读取，已加载初始目录。'); }
    render();
  } else render();
  let connectingPromise = null;
  function connect() {
    if (connectingPromise) return connectingPromise;
    state.connecting = true; state.feedback = null; updateSaveState();
    connectingPromise = (async () => {
    // Yield before work so a synchronous failure cannot leave a stale flight cached.
    await Promise.resolve();
    try {
      if (!fetchImpl) throw new Error('当前环境无法连接目录接口。');
      const response = await apiFetch('/api/catalog', { cache: 'no-store' }); const data = await readResponse(response);
      const validation = validateCatalog(data.catalog); if (!validation.valid || typeof data.version !== 'string' || !data.version.trim()) throw new Error('服务器目录或版本无效，请检查目录数据。');
      // Do not replace edits made while the initial read was in flight.
      const previousSeed = state.baseline;
      state.baseline = clone(data.catalog); state.protectedCatalog = clone(data.catalog); state.protectionHistory = []; state.version = data.version; state.backend = data.mode || state.backend; state.ready = true;
      if (data.auth === 'password') { const badge = q('[data-mode-label]'); if (badge) badge.textContent = 'GitHub 保存模式 · 密码登录'; }
      if (!state.dirty) state.catalog = clone(data.catalog);
      else { state.catalog = preserveProtectedFields(state.catalog, data.catalog); state.dirty = JSON.stringify(state.catalog) !== JSON.stringify(state.baseline); if (JSON.stringify(previousSeed) !== JSON.stringify(data.catalog)) alert('已读取服务器最新版本。当前编辑已保留，请核对后保存。', false, '目录已连接：请核对当前编辑', 'notice'); }
      render();
    } catch (error) { state.ready = false; alert(`无法读取保存接口：${messageOf(error)}\n点击底部「连接目录」重新连接；也可导出 JSON 备份。`, false, '目录接口尚未连接'); }
    finally { state.connecting = false; connectingPromise = null; updateSaveState(); }
    })();
    return connectingPromise;
  }
  const ready = mode === 'demo' ? Promise.resolve() : connect();
  return { ready, getState: () => clone(state), save, importCatalog, exportCatalog, openEditor };
}
