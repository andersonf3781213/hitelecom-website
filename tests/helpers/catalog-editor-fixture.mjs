import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const projectRoot = new URL('../../', import.meta.url);

/**
 * The actual component is the fixture. Only its three build-time substitutions
 * are rendered here; future Astro expressions must be handled explicitly.
 * This is deliberately not a replacement Astro build or a copy of its markup.
 */
export async function renderCatalogComponent({ catalog, mode = 'api' }) {
  const component = await readFile(new URL('src/components/catalog/CatalogAdmin.astro', projectRoot), 'utf8');
  assert.match(component, /^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  let html = component.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  assert.equal((html.match(/data-mode=\{mode\}/g) || []).length, 1, 'render the component mode');
  html = html.replace('data-mode={mode}', `data-mode="${mode}"`);
  const seed = JSON.stringify(catalog).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  assert.equal((html.match(/set:html=\{seed\}/g) || []).length, 1, 'render the component seed');
  html = html.replace(/<script([^>]*?)\sset:html=\{seed\}><\/script>/, `<script$1>${seed}</script>`);
  assert.match(html, /<script>\s*import \{ initializeEditor \}/);
  html = html.replace(/<script>\s*import \{ initializeEditor \}[\s\S]*?<\/script>\s*$/, '');
  assert.doesNotMatch(html, /\{(?:mode|seed)\}|set:html=|Astro\./, 'fixture must not silently retain Astro expressions');
  return html;
}

export async function createEditorFixture(t, initializeEditor, options = {}) {
  const catalog = structuredClone(options.catalog || JSON.parse(await readFile(new URL('src/data/product-catalog.json', projectRoot), 'utf8')));
  const dom = new JSDOM(await renderCatalogComponent({ catalog, mode: options.mode || 'api' }), {
    url: options.url || 'https://catalog.test/catalog-admin',
    pretendToBeVisual: true,
  });
  t.after(() => dom.window.close());
  const document = dom.window.document;
  const root = document.querySelector('#catalog-app');
  const q = (selector) => root.querySelector(selector);
  const form = q('[data-product-form]');
  const field = (name) => form.elements.namedItem(name);
  const input = (name, value) => {
    const element = field(name);
    if (element.type === 'checkbox') element.checked = value;
    else element.value = value;
    element.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
    return element;
  };
  const submit = () => form.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
  const click = (action, id) => {
    const button = q(`[data-action="${action}"]${id ? `[data-id="${id}"]` : ''}`);
    assert.ok(button, `the actual component renders ${action}`);
    button.click();
  };
  const scrollCalls = [];
  dom.window.HTMLElement.prototype.scrollIntoView = function (settings) { scrollCalls.push({ element: this, settings }); };
  const downloads = [];
  const promptCalls = [];
  const promptImpl = (message) => {
    promptCalls.push(message);
    if (options.promptImpl) return options.promptImpl(message);
    return options.passwords?.shift() ?? null;
  };
  const api = initializeEditor({
    root,
    fetchImpl: options.fetchImpl,
    storage: options.storage,
    now: () => new Date('2026-10-20T04:00:00.000Z'),
    confirmImpl: () => true,
    downloadImpl: (json, filename) => downloads.push({ catalog: JSON.parse(json), filename }),
    ...(options.usePasswordDialog ? {} : { promptImpl }),
    ...(options.initialize || {}),
  });
  assert.ok(api, 'editor initializes against the actual component');
  return { ...api, dom, root, document, catalog, q, field, input, submit, click, scrollCalls, downloads, promptCalls };
}

export const response = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { 'Content-Type': 'application/json' },
});

export function deferred() {
  let resolve, reject;
  const promise = new Promise((resolvePromise, rejectPromise) => { resolve = resolvePromise; reject = rejectPromise; });
  return { promise, resolve, reject };
}

export async function settleUntil(check, message = 'asynchronous editor operation completes') {
  for (let count = 0; count < 50; count++) {
    if (check()) return;
    await new Promise((resolve) => setImmediate(resolve));
  }
  assert.ok(check(), message);
}

export const catalogPath = fileURLToPath(new URL('src/data/product-catalog.json', projectRoot));
