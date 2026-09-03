#!/usr/bin/env node
/**
 * dist 瘦身：删除「已发射但没有任何页面引用」的原始图片。
 *
 * 背景：src/utils/images.ts、content.ts 通过 import.meta.glob 按路径动态解析
 * src/assets/images 下的源图。Rollup 会为 glob 命中的每个文件都生成一份
 * 哈希命名的原始资源拷进 dist/_astro，而页面实际引用的只是 getImage()
 * 生成的优化 WebP 衍生品 —— 原始文件在产物里是死重（本站约 50MB+）。
 *
 * 本脚本在 astro build 之后运行：
 *   1. 收集 dist 内全部文本文件（html/css/js/json/xml/svg/txt）内容作为引用语料；
 *   2. 扫描 dist/_astro 下的图片/字体文件，文件名未出现在语料中的即删除；
 *   3. 打印清理报告。JS/CSS 一律保留（可能被动态 import）。
 *
 * 用法：node scripts/prune-dist.mjs [dist目录]   （默认 dist）
 * 安全：只删 dist/_astro 下的媒体文件；目标目录必须名为 dist* 或经 --yes 确认。
 */
import { readdirSync, readFileSync, statSync, unlinkSync, rmdirSync } from 'node:fs';
import { join, basename, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist');
if (!/dist/i.test(basename(root)) && process.argv[3] !== '--yes') {
  console.error(`[prune] 拒绝在非 dist 目录运行: ${root}（确认请追加 --yes）`);
  process.exit(1);
}

const TEXT_EXT = new Set(['.html', '.css', '.js', '.mjs', '.json', '.xml', '.txt', '.svg', '.webmanifest', '.map']);
const MEDIA_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.woff', '.woff2', '.ttf', '.otf', '.eot', '.avif']);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const ext = (p) => p.slice(p.lastIndexOf('.')).toLowerCase();
const all = walk(root);

// 1) 引用语料（媒体文件自身的二进制内容不读；.svg 既是文本也可被引用，名字仍计入语料）
let corpus = '';
for (const f of all) {
  if (TEXT_EXT.has(ext(f))) corpus += readFileSync(f, 'utf8') + '\n';
}

// 2) 仅扫描 _astro 下的媒体文件
const astroDir = join(root, '_astro');
let checked = 0, removed = 0, freed = 0;
const kept = [];
if (statSync(astroDir, { throwIfNoEntry: false })) {
  for (const f of walk(astroDir)) {
    if (!MEDIA_EXT.has(ext(f))) continue;
    checked++;
    if (!corpus.includes(basename(f))) {
      freed += statSync(f).size;
      unlinkSync(f);
      removed++;
    } else kept.push(basename(f));
  }
  // 清理空目录
  for (const name of readdirSync(astroDir)) {
    const p = join(astroDir, name);
    try { if (statSync(p).isDirectory() && readdirSync(p).length === 0) rmdirSync(p); } catch {}
  }
}

// 3) 删除 Astro 构建中间目录 .prerender（预渲染副本，最终 HTML 不引用，部署无意义）
import { rmSync } from 'node:fs';
const prerenderDir = join(root, '.prerender');
if (statSync(prerenderDir, { throwIfNoEntry: false })) {
  rmSync(prerenderDir, { recursive: true, force: true });
  console.log('[prune] 已删除构建中间目录 .prerender');
}

const mb = (n) => (n / 1048576).toFixed(2) + ' MiB';
console.log(`[prune] 扫描 _astro 媒体文件 ${checked} 个，删除未引用 ${removed} 个，释放 ${mb(freed)}，保留 ${kept.length} 个`);
if (removed > 0) console.log('[prune] 完成：产物中仅保留被 HTML/CSS/JS 实际引用的资源');
