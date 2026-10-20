import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { initializeEditor } from '../src/admin/editor.mjs';
import {
  catalogPath, createEditorFixture, deferred, response, settleUntil,
} from './helpers/catalog-editor-fixture.mjs';

const seed = JSON.parse(await readFile(catalogPath, 'utf8'));
const firstId = seed.products[0].id;
const clone = (value) => structuredClone(value);
const connected = (catalog = seed) => response({ catalog: clone(catalog), version: 'version-one', mode: 'github' });
const footerText = (fixture) => {
  const footer = fixture.q('.save-bar').cloneNode(true);
  footer.querySelectorAll('[hidden], [aria-hidden="true"]').forEach((element) => element.remove());
  return footer.textContent;
};
const product = (fixture, id = firstId) => fixture.getState().catalog.products.find((entry) => entry.id === id);

function editName(fixture, value, id = firstId) {
  fixture.openEditor(id);
  fixture.input('localeName', value);
  fixture.submit();
  assert.equal(fixture.q('[data-product-dialog]').open, false);
  assert.equal(product(fixture, id).locales.en.name, value);
}

test('locale tabs flush every localized field and commit base fields from the real product form', async (t) => {
  const fixture = await createEditorFixture(t, initializeEditor, { mode: 'demo', catalog: seed });
  fixture.openEditor(firstId);
  fixture.input('localeName', 'English retained');
  fixture.input('localeSummary', 'English summary retained');
  fixture.input('localeBody', 'English body retained');
  fixture.input('localeSeoTitle', 'English SEO retained');
  fixture.input('localeSeoDescription', 'English description retained');
  fixture.input('localeImageAlt', 'English image retained');
  fixture.input('imageSrc', '/images/retained.jpg');
  fixture.input('imageAlt', 'Default image retained');
  fixture.q('[data-locale="zh"]').click();
  fixture.input('localeName', '中文编辑保留');
  fixture.input('localeSummary', '中文摘要保留');
  fixture.q('[data-locale="en"]').click();
  assert.equal(fixture.field('localeName').value, 'English retained');
  assert.equal(fixture.field('localeSummary').value, 'English summary retained');
  fixture.submit();
  const saved = product(fixture);
  assert.equal(saved.locales.en.body, 'English body retained');
  assert.equal(saved.locales.en.seoTitle, 'English SEO retained');
  assert.equal(saved.locales.en.seoDescription, 'English description retained');
  assert.equal(saved.locales.en.imageAlt, 'English image retained');
  assert.equal(saved.locales.zh.name, '中文编辑保留');
  assert.equal(saved.locales.zh.summary, '中文摘要保留');
  assert.deepEqual(saved.image, { src: '/images/retained.jpg', alt: 'Default image retained' });
  assert.equal(fixture.getState().dirty, true);
});

test('saving invalid campaign dates makes the specific validation error visible in the fixed save bar', async (t) => {
  let puts = 0;
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    fetchImpl: async (_url, options) => {
      if (options.method === 'PUT') { puts++; return response({ saved: true, version: 'version-two' }); }
      return connected();
    },
  });
  await fixture.ready;
  fixture.click('pin', firstId);
  const start = fixture.q('[data-campaign-start]');
  start.value = '2026-11-02';
  start.dispatchEvent(new fixture.dom.window.Event('change', { bubbles: true }));
  await fixture.save();
  assert.equal(puts, 0, 'invalid workspace must never be sent');
  assert.match(footerText(fixture), /campaign\.startsOn|开始日期|起始日期/);
  assert.equal(fixture.getState().dirty, true);
  assert.equal(fixture.q('[data-action="save"]').disabled, false);
  assert.doesNotMatch(footerText(fixture), /已提交 GitHub|已写入本地文件/);
});

test('server rejection while a product dialog is open is exposed inside that dialog and the fixed save bar', async (t) => {
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    fetchImpl: async (_url, options) => options.method === 'PUT'
      ? response({ error: 'catalog denied by test server' }, 403) : connected(),
  });
  await fixture.ready;
  editName(fixture, 'First committed change');
  fixture.openEditor(firstId);
  const saving = fixture.save();
  await saving;
  const dialogAlert = fixture.q('[data-product-dialog] [data-editor-alert]');
  assert.equal(dialogAlert.hidden, false, 'the error must be in the modal top layer');
  assert.match(dialogAlert.textContent, /catalog denied by test server/);
  assert.match(footerText(fixture), /catalog denied by test server/);
  assert.equal(product(fixture).locales.en.name, 'First committed change');
  assert.equal(fixture.getState().dirty, true);
});

test('product validation errors stay beside Complete Edit and receive focus inside the modal', async (t) => {
  const fixture = await createEditorFixture(t, initializeEditor, { mode: 'demo', catalog: seed });
  fixture.openEditor();
  fixture.input('localeName', 'Incomplete published module');
  fixture.input('status', 'published');
  fixture.input('localePublished', true);
  fixture.submit();
  const error = fixture.q('[data-editor-alert]');
  assert.equal(fixture.q('[data-product-dialog]').open, true);
  assert.equal(error.hidden, false);
  assert.match(error.textContent, /summary|body|image/);
  assert.ok(error.closest('.dialog-footer'), 'validation feedback is outside the scrollable form body');
  assert.equal(fixture.document.activeElement, error);
  assert.ok(fixture.scrollCalls.some((entry) => entry.element === error));
});

test('a PUT only marks saved after saved=true and a version are both acknowledged', async (t) => {
  const acknowledgements = [
    { saved: false, version: 'ignored' },
    { saved: true },
    { version: 'ignored' },
    { saved: 'true', version: 'ignored' },
    { saved: true, version: 123 },
    { saved: true, version: 'version-two', mode: 'github' },
  ];
  let puts = 0;
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    fetchImpl: async (_url, options) => options.method === 'PUT'
      ? (puts++, response(acknowledgements.shift())) : connected(),
  });
  await fixture.ready;
  editName(fixture, 'A real change');
  for (let index = 0; index < 5; index++) {
    await fixture.save();
    assert.equal(fixture.getState().dirty, true, 'unverified acknowledgement retains dirty edits');
    assert.equal(fixture.getState().version, 'version-one');
    assert.doesNotMatch(footerText(fixture), /已提交 GitHub|已写入本地文件/);
  }
  await fixture.save();
  assert.equal(puts, 6);
  assert.equal(fixture.getState().dirty, false);
  assert.equal(fixture.getState().version, 'version-two');
  assert.match(footerText(fixture), /已提交 GitHub/);
});

test('edits committed while PUT is pending survive its response and the next PUT uses the new version', async (t) => {
  const pending = deferred();
  const requests = [];
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    fetchImpl: async (_url, options) => {
      if (options.method !== 'PUT') return connected();
      requests.push(JSON.parse(options.body));
      return requests.length === 1 ? pending.promise : response({ saved: true, version: 'version-three' });
    },
  });
  await fixture.ready;
  editName(fixture, 'First snapshot');
  const saving = fixture.save();
  assert.equal(fixture.getState().saving, true);
  await fixture.save();
  assert.equal(requests.length, 1, 'a duplicate save cannot send a second in-flight PUT');
  editName(fixture, 'Edited during pending PUT');
  pending.resolve(response({ saved: true, version: 'version-two' }));
  await saving;
  assert.equal(requests[0].catalog.products[0].locales.en.name, 'First snapshot');
  assert.equal(product(fixture).locales.en.name, 'Edited during pending PUT');
  assert.equal(fixture.getState().baseline.products[0].locales.en.name, 'First snapshot');
  assert.equal(fixture.getState().dirty, true);
  assert.match(footerText(fixture), /有未保存/);
  await fixture.save();
  assert.equal(requests[1].version, 'version-two');
  assert.equal(requests[1].catalog.products[0].locales.en.name, 'Edited during pending PUT');
  assert.equal(fixture.getState().dirty, false);
});

test('network failure leaves edits retryable and a concrete failure beside the Save button', async (t) => {
  let puts = 0;
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    fetchImpl: async (_url, options) => {
      if (options.method !== 'PUT') return connected();
      puts++;
      if (puts === 1) throw new TypeError('network deliberately unreachable');
      return response({ saved: true, version: 'version-two' });
    },
  });
  await fixture.ready;
  editName(fixture, 'Retryable name');
  await fixture.save();
  assert.equal(product(fixture).locales.en.name, 'Retryable name');
  assert.equal(fixture.getState().dirty, true);
  assert.equal(fixture.getState().saving, false);
  assert.equal(fixture.q('[data-action="save"]').disabled, false);
  assert.match(footerText(fixture), /network deliberately unreachable/);
  await fixture.save();
  assert.equal(puts, 2);
  assert.equal(fixture.getState().dirty, false);
});

test('cancelled initial authentication can be retried from the bottom button without losing committed edits', async (t) => {
  const requests = [];
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    passwords: [null, 'correct-test-password'],
    fetchImpl: async (_url, options) => {
      requests.push(options);
      return options.headers.Authorization === 'Bearer correct-test-password'
        ? connected() : response({ error: 'Admin password required or invalid.', mode: 'password' }, 401);
    },
  });
  await fixture.ready;
  assert.equal(fixture.getState().ready, false);
  assert.equal(fixture.promptCalls.length, 1);
  assert.equal(fixture.q('[data-action="save"]').disabled, false);
  editName(fixture, 'Retain through reconnect');
  fixture.click('save');
  await settleUntil(() => fixture.getState().ready);
  assert.equal(fixture.promptCalls.length, 2);
  assert.equal(requests.at(-1).headers.Authorization, 'Bearer correct-test-password');
  assert.equal(product(fixture).locales.en.name, 'Retain through reconnect');
  assert.equal(fixture.getState().dirty, true);
  assert.equal(fixture.dom.window.sessionStorage.getItem('catalog-admin-token'), 'correct-test-password');
});

test('wrong password is retried once, then a later Save click can authenticate and preserve the pending snapshot', async (t) => {
  const requests = [];
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    passwords: ['wrong-test-password', 'correct-test-password'],
    fetchImpl: async (_url, options) => {
      requests.push(options);
      const auth = options.headers.Authorization;
      if (options.method !== 'PUT') return connected();
      return auth === 'Bearer correct-test-password'
        ? response({ saved: true, version: 'version-two' })
        : response({ error: 'Admin password required or invalid.', mode: 'password' }, 401);
    },
  });
  await fixture.ready;
  editName(fixture, 'Retain through wrong password');
  await fixture.save();
  assert.equal(fixture.promptCalls.length, 1, 'one prompt per save attempt');
  assert.equal(requests.filter((entry) => entry.method === 'PUT').length, 2, 'one automatic password retry');
  assert.equal(fixture.getState().dirty, true);
  assert.match(footerText(fixture), /password|密码|401|失败/i);
  await fixture.save();
  assert.equal(fixture.promptCalls.length, 2);
  assert.equal(product(fixture).locales.en.name, 'Retain through wrong password');
  assert.equal(fixture.getState().dirty, false);
});

test('a blocked password prompt produces retryable feedback and does not break the editor', async (t) => {
  let attempts = 0;
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    promptImpl: () => {
      if (++attempts === 1) throw new Error('password prompt deliberately blocked');
      return 'correct-test-password';
    },
    fetchImpl: async (_url, options) => options.headers.Authorization === 'Bearer correct-test-password'
      ? connected() : response({ error: 'Admin password required or invalid.', mode: 'password' }, 401),
  });
  await fixture.ready;
  assert.equal(fixture.getState().ready, false);
  assert.equal(fixture.q('[data-action="save"]').disabled, false);
  assert.match(footerText(fixture), /password prompt deliberately blocked|密码.*(?:失败|阻止|拦截)/);
  editName(fixture, 'Retain after blocked prompt');
  fixture.click('save');
  await settleUntil(() => fixture.getState().ready);
  assert.equal(attempts, 2);
  assert.equal(product(fixture).locales.en.name, 'Retain after blocked prompt');
  assert.equal(fixture.getState().dirty, true);
});

test('initialization returns one connection and retains committed edits made while that GET is pending', async (t) => {
  const pending = deferred();
  let gets = 0;
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    fetchImpl: async () => { gets++; return pending.promise; },
  });
  assert.equal(initializeEditor({ root: fixture.root }), null, 'the component is initialized once');
  fixture.click('save');
  editName(fixture, 'Edit while connecting');
  const remote = clone(seed);
  remote.products[1].locales.en.name = 'A remotely updated other product';
  pending.resolve(connected(remote));
  await fixture.ready;
  assert.equal(gets, 1, 'repeated connection clicks share the initial GET');
  assert.equal(product(fixture).locales.en.name, 'Edit while connecting');
  assert.equal(fixture.getState().baseline.products[1].locales.en.name, 'A remotely updated other product');
  assert.equal(fixture.getState().dirty, true);
});

test('Save and Export explicitly block modified open-form fields and beforeunload protects those unsaved fields', async (t) => {
  let puts = 0;
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    fetchImpl: async (_url, options) => {
      if (options.method === 'PUT') { puts++; return response({ saved: true, version: 'version-two' }); }
      return connected();
    },
  });
  await fixture.ready;
  fixture.openEditor(firstId);
  fixture.input('localeName', 'Only in the open form');
  const unload = new fixture.dom.window.Event('beforeunload', { cancelable: true });
  fixture.dom.window.dispatchEvent(unload);
  assert.equal(unload.defaultPrevented, true, 'uncommitted form edits need the same navigation protection as workspace edits');
  await fixture.save();
  assert.equal(puts, 0, 'Save cannot silently omit a modified product form');
  assert.equal(fixture.q('[data-product-dialog]').open, true);
  assert.equal(fixture.field('localeName').value, 'Only in the open form');
  assert.match(fixture.q('[data-editor-alert]').textContent, /完成编辑/);
  assert.equal(fixture.q('[data-editor-alert]').hidden, false);
  fixture.exportCatalog();
  assert.equal(fixture.downloads.length, 0, 'Export cannot silently omit a modified product form');
  assert.match(fixture.q('[data-editor-alert]').textContent, /完成编辑/);
  fixture.submit();
  fixture.exportCatalog();
  assert.equal(fixture.downloads.length, 1);
  assert.equal(fixture.downloads[0].catalog.products[0].locales.en.name, 'Only in the open form');
  await fixture.save();
  assert.equal(puts, 1);
  assert.equal(fixture.getState().dirty, false);
});

test('a form edited during a pending PUT stays intact and protected after the earlier snapshot saves', async (t) => {
  const pending = deferred();
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    fetchImpl: async (_url, options) => options.method === 'PUT' ? pending.promise : connected(),
  });
  await fixture.ready;
  editName(fixture, 'Earlier committed snapshot');
  const saving = fixture.save();
  fixture.openEditor(firstId);
  fixture.input('localeName', 'Typing during the request');
  pending.resolve(response({ saved: true, version: 'version-two' }));
  await saving;
  assert.equal(fixture.field('localeName').value, 'Typing during the request');
  assert.equal(fixture.q('[data-product-dialog]').open, true);
  const unload = new fixture.dom.window.Event('beforeunload', { cancelable: true });
  fixture.dom.window.dispatchEvent(unload);
  assert.equal(unload.defaultPrevented, true);
  fixture.exportCatalog();
  assert.equal(fixture.downloads.length, 0);
  assert.match(fixture.q('[data-editor-alert]').textContent, /完成编辑/);
  fixture.submit();
  assert.equal(product(fixture).locales.en.name, 'Typing during the request');
  assert.equal(fixture.getState().dirty, true);
});

test('blocked sessionStorage still retains the password in memory for subsequent authenticated saves', async (t) => {
  const requests = [];
  const blockedStorage = {
    getItem() { throw new Error('sessionStorage blocked'); },
    setItem() { throw new Error('sessionStorage blocked'); },
    removeItem() { throw new Error('sessionStorage blocked'); },
  };
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    passwords: ['correct-test-password'],
    initialize: { sessionStorage: blockedStorage },
    fetchImpl: async (_url, options) => {
      requests.push(options);
      if (options.headers.Authorization !== 'Bearer correct-test-password') {
        return response({ error: 'Admin password required or invalid.', mode: 'password' }, 401);
      }
      return options.method === 'PUT'
        ? response({ saved: true, version: 'version-two' }) : connected();
    },
  });
  await fixture.ready;
  assert.equal(fixture.getState().ready, true);
  assert.equal(fixture.promptCalls.length, 1);
  editName(fixture, 'Save after storage was blocked');
  await fixture.save();
  assert.equal(fixture.getState().dirty, false);
  assert.equal(fixture.promptCalls.length, 1, 'memory fallback avoids prompting on every API call');
  assert.equal(requests.at(-1).headers.Authorization, 'Bearer correct-test-password');
});

test('a stalled connection times out, unlocks retry, and later reconnect retains edits', { timeout: 2_000 }, async (t) => {
  let gets = 0;
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    initialize: { requestTimeoutMs: 20 },
    fetchImpl: async () => ++gets === 1 ? new Promise(() => {}) : connected(),
  });
  editName(fixture, 'Edit before connection timeout');
  await fixture.ready;
  assert.equal(fixture.getState().ready, false);
  assert.equal(fixture.getState().connecting, false);
  assert.match(footerText(fixture), /超时|timeout/i);
  assert.equal(fixture.q('[data-action="save"]').disabled, false);
  fixture.click('save');
  await settleUntil(() => fixture.getState().ready);
  assert.equal(gets, 2);
  assert.equal(product(fixture).locales.en.name, 'Edit before connection timeout');
  assert.equal(fixture.getState().dirty, true);
});

test('the connection deadline includes a response body that starts but never finishes', { timeout: 2_000 }, async (t) => {
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    initialize: { requestTimeoutMs: 20 },
    fetchImpl: async () => new Response(new ReadableStream({
      start(controller) { controller.enqueue(new TextEncoder().encode('{"catalog":')); },
    }), { status: 200, headers: { 'Content-Type': 'application/json' } }),
  });
  await fixture.ready;
  assert.equal(fixture.getState().ready, false);
  assert.equal(fixture.getState().connecting, false);
  assert.match(footerText(fixture), /超时|timeout/i);
  assert.equal(fixture.q('[data-action="save"]').disabled, false);
});

test('a timed-out PUT preserves the pending snapshot and reports that server success is unconfirmed', { timeout: 2_000 }, async (t) => {
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    initialize: { requestTimeoutMs: 20 },
    fetchImpl: async (_url, options) => options.method === 'PUT' ? new Response(new ReadableStream({
      start(controller) { controller.enqueue(new TextEncoder().encode('{"saved":')); },
    }), { status: 200, headers: { 'Content-Type': 'application/json' } }) : connected(),
  });
  await fixture.ready;
  editName(fixture, 'Retained after uncertain server result');
  await fixture.save();
  assert.equal(fixture.getState().dirty, true);
  assert.equal(fixture.getState().saving, false);
  assert.equal(fixture.getState().version, 'version-one');
  assert.equal(product(fixture).locales.en.name, 'Retained after uncertain server result');
  assert.match(footerText(fixture), /超时/);
  assert.match(footerText(fixture), /尚未确认/);
  assert.doesNotMatch(footerText(fixture), /已提交 GitHub|已写入本地文件/);
  fixture.exportCatalog();
  assert.equal(fixture.downloads[0].catalog.products[0].locales.en.name, 'Retained after uncertain server result');
});

test('local mode fetches a CSRF token before PUT and only then reports a file save', async (t) => {
  const requests = [];
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    url: 'http://127.0.0.1/catalog-admin?mode=local',
    fetchImpl: async (url, options) => {
      requests.push({ url, options });
      if (url === '/api/config') return response({ csrfToken: 'csrf-test-token' });
      if (options.method === 'PUT') return response({ saved: true, version: 'local-version-two', mode: 'local' });
      return response({ catalog: clone(seed), version: 'local-version-one', mode: 'local' });
    },
  });
  await fixture.ready;
  assert.equal(fixture.root.dataset.mode, 'local');
  editName(fixture, 'Local file edit');
  await fixture.save();
  assert.deepEqual(requests.map(({ url, options }) => [url, options.method || 'GET']), [
    ['/api/catalog', 'GET'], ['/api/config', 'GET'], ['/api/catalog', 'PUT'],
  ]);
  assert.equal(requests[1].options.cache, 'no-store');
  assert.equal(requests[1].options.credentials, 'same-origin');
  assert.equal(requests[2].options.headers['X-Catalog-CSRF'], 'csrf-test-token');
  assert.equal(JSON.parse(requests[2].options.body).version, 'local-version-one');
  assert.equal(fixture.getState().dirty, false);
  assert.match(footerText(fixture), /已写入本地文件/);
  assert.match(footerText(fixture), /重新构建/);
});

test('missing local CSRF credentials block PUT and retain the local edit for retry', async (t) => {
  let puts = 0;
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    url: 'http://127.0.0.1/catalog-admin?mode=local',
    fetchImpl: async (url, options) => {
      if (url === '/api/config') return response({});
      if (options.method === 'PUT') { puts++; return response({ saved: true, version: 'ignored', mode: 'local' }); }
      return response({ catalog: clone(seed), version: 'local-version-one', mode: 'local' });
    },
  });
  await fixture.ready;
  editName(fixture, 'Keep without CSRF');
  await fixture.save();
  assert.equal(puts, 0);
  assert.equal(fixture.getState().dirty, true);
  assert.equal(product(fixture).locales.en.name, 'Keep without CSRF');
  assert.match(footerText(fixture), /本地保存凭据/);
  assert.doesNotMatch(footerText(fixture), /已写入本地文件/);
});

test('unpublishing and clearing a locale name does not create an invalid protection snapshot that blocks the next save', async (t) => {
  let puts = 0;
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    fetchImpl: async (_url, options) => options.method === 'PUT'
      ? response({ saved: true, version: `version-${++puts + 1}` }) : connected(),
  });
  await fixture.ready;
  fixture.openEditor(firstId);
  fixture.input('status', 'draft');
  fixture.input('localePublished', false);
  fixture.input('localeName', '');
  fixture.submit();
  assert.equal(product(fixture).status, 'draft');
  assert.equal(product(fixture).locales.en.name, '');
  await fixture.save();
  assert.equal(puts, 1);
  assert.equal(fixture.getState().dirty, false);
  fixture.openEditor(firstId);
  fixture.input('imageAlt', 'A second valid change');
  fixture.submit();
  await fixture.save();
  assert.equal(puts, 2, 'publication locks must use valid historical data');
  assert.equal(fixture.getState().dirty, false);
  assert.equal(product(fixture).image.alt, 'A second valid change');
  fixture.openEditor(firstId);
  assert.equal(fixture.field('slug').readOnly, true, 'historical published slug remains locked');
  assert.equal(fixture.field('localeUrl').readOnly, true, 'historical published URL remains locked');
});

test('the actual password dialog submits credentials, clears the password field and authenticates the connection', async (t) => {
  const requests = [];
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    usePasswordDialog: true,
    fetchImpl: async (_url, options) => {
      requests.push(options);
      return options.headers.Authorization === 'Bearer dialog-test-password'
        ? connected() : response({ error: 'Admin password required or invalid.', mode: 'password' }, 401);
    },
  });
  const dialog = fixture.q('[data-auth-dialog]');
  await settleUntil(() => dialog.open);
  const password = fixture.q('[data-admin-password]');
  assert.equal(password.type, 'password');
  assert.equal(password.autocomplete, 'current-password');
  assert.equal(fixture.document.activeElement, password);
  password.value = 'dialog-test-password';
  fixture.q('[data-auth-form]').dispatchEvent(new fixture.dom.window.Event('submit', { bubbles: true, cancelable: true }));
  await fixture.ready;
  assert.equal(dialog.open, false);
  assert.equal(password.value, '', 'credentials are cleared when the dialog closes');
  assert.equal(requests.length, 2);
  assert.equal(requests[1].headers.Authorization, 'Bearer dialog-test-password');
  assert.equal(fixture.getState().ready, true);
  assert.equal(fixture.dom.window.sessionStorage.getItem('catalog-admin-token'), 'dialog-test-password');
  assert.equal(fixture.promptCalls.length, 0, 'default UI does not depend on browser prompt');
});

test('the actual password dialog cancels cleanly, reopens on retry and preserves workspace edits', async (t) => {
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    usePasswordDialog: true,
    fetchImpl: async (_url, options) => options.headers.Authorization === 'Bearer dialog-test-password'
      ? connected() : response({ error: 'Admin password required or invalid.', mode: 'password' }, 401),
  });
  const dialog = fixture.q('[data-auth-dialog]');
  await settleUntil(() => dialog.open);
  fixture.q('[data-admin-password]').value = 'unsent-cancelled-password';
  fixture.click('cancel-auth');
  await fixture.ready;
  assert.equal(dialog.open, false);
  assert.equal(fixture.q('[data-admin-password]').value, '');
  assert.equal(fixture.getState().ready, false);
  assert.match(footerText(fixture), /取消登录/);
  editName(fixture, 'Retained across dialog cancel');
  fixture.click('save');
  await settleUntil(() => dialog.open);
  fixture.q('[data-admin-password]').value = 'dialog-test-password';
  fixture.q('[data-auth-form]').dispatchEvent(new fixture.dom.window.Event('submit', { bubbles: true, cancelable: true }));
  await settleUntil(() => fixture.getState().ready);
  assert.equal(product(fixture).locales.en.name, 'Retained across dialog cancel');
  assert.equal(fixture.getState().dirty, true);
});

test('the password dialog Escape cancel event resolves authentication and leaves reconnect available', async (t) => {
  const fixture = await createEditorFixture(t, initializeEditor, {
    catalog: seed,
    usePasswordDialog: true,
    fetchImpl: async () => response({ error: 'Admin password required or invalid.', mode: 'password' }, 401),
  });
  const dialog = fixture.q('[data-auth-dialog]');
  await settleUntil(() => dialog.open);
  const cancel = new fixture.dom.window.Event('cancel', { cancelable: true });
  dialog.dispatchEvent(cancel);
  await fixture.ready;
  assert.equal(cancel.defaultPrevented, true);
  assert.equal(dialog.open, false);
  assert.equal(fixture.getState().connecting, false);
  assert.equal(fixture.q('[data-action="save"]').disabled, false);
});
