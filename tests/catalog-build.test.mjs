import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, copyFile, writeFile, readFile, rm, readdir, lstat, symlink, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { build } from 'astro';
import { transform } from '@astrojs/compiler';

const project = fileURLToPath(new URL('../', import.meta.url));

test('actual admin page builds in an isolated Astro 7.2.6 fixture with file-format routes', { timeout: 60000 }, async t => {
  // Full repositories already have this dependency scope. The supplied subset
  // installs its reproducible test tools in tests/ to avoid changing site deps.
  const scope = path.join(project, 'node_modules');
  try { await lstat(scope); } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    await symlink(path.join(project, 'tests', 'node_modules'), scope, process.platform === 'win32' ? 'junction' : 'dir');
    t.after(() => unlink(scope));
  }
  const fixture = await mkdtemp(path.join(project, 'tests', '.admin-build-'));
  t.after(() => rm(fixture, { recursive: true, force: true }));
  const files = [
    'src/pages/catalog-admin/index.astro', 'src/components/catalog/CatalogAdmin.astro',
    'src/styles/catalog-admin.css', 'src/admin/editor.mjs', 'src/lib/catalog.mjs',
    'src/data/product-catalog.json',
  ];
  for (const file of files) {
    await mkdir(path.dirname(path.join(fixture, file)), { recursive: true });
    await copyFile(path.join(project, file), path.join(fixture, file));
  }
  await writeFile(path.join(fixture, 'package.json'), JSON.stringify({ name: 'catalog-isolated-build', type: 'module', private: true }));
  const tsconfig = JSON.parse(await readFile(path.join(project, 'tsconfig.json'), 'utf8'));
  // The isolated fixture installs dependencies in tests/, not the full-site root.
  tsconfig.extends = createRequire(import.meta.url).resolve('astro/tsconfigs/strict');
  await writeFile(path.join(fixture, 'tsconfig.json'), JSON.stringify(tsconfig));
  await writeFile(path.join(fixture, 'astro.config.mjs'), "import {defineConfig} from 'astro/config';export default defineConfig({output:'static',build:{format:'file'},cacheDir:'./.astro-cache',vite:{logLevel:'silent'}});\n");
  await build({ root: fixture, logLevel: 'silent' });
  const dist = path.join(fixture, 'dist');
  let file = 'catalog-admin.html';
  try { await readFile(path.join(dist, file)); } catch { file = 'catalog-admin/index.html'; }
  const html = await readFile(path.join(dist, file), 'utf8');
  assert.match(html, /data-auth-dialog/);
  assert.match(html, /data-editor-alert/);
  assert.match(html, /noindex,nofollow/);
  assert.match(html, /type="module"/);
  const assets = await readdir(path.join(dist, '_astro'));
  assert.ok(assets.some(name => name.endsWith('.js')), 'real client module is bundled');
  assert.ok(assets.some(name => name.endsWith('.css')), 'actual stylesheet is bundled');
  t.diagnostic(`Admin isolated Astro build output: ${file}; ${assets.length} bundled assets. This is not a full website build.`);
});

test('all changed Astro caller files are accepted by the actual Astro compiler', async () => {
  const files = ['src/components/catalog/CatalogAdmin.astro', 'src/pages/catalog-admin/index.astro',
    ...['', 'zh/', 'es/', 'de/', 'ja/', 'fr/', 'ru/'].map(locale => `src/pages/${locale}product/lists/cid/[cid].astro`)];
  for (const file of files) {
    const result = await transform(await readFile(path.join(project, file), 'utf8'), { filename: file });
    assert.ok(result.code.length, file);
    assert.equal(result.diagnostics.filter(item => item.severity === 1).length, 0, `${file}: compiler errors`);
  }
});
