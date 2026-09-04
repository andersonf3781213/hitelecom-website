#!/usr/bin/env node
/**
 * Early Hints（103）Link 预载头生成。
 *
 * 解析 dist 首页（EN 的 / 与 ZH 的 /zh.html）中的 stylesheet / preload /
 * modulepreload 标签，把可安全转为 Link 响应头的资源追加进 dist/_headers。
 * Cloudflare 会学习这些 Link 头并提前下发 103 Early Hints，让浏览器在
 * HTML 到达之前就开始下载关键 CSS / 字体（等效于控制台里的 Early Hints 开关，
 * 该开关是 zone 级设置，Pages + 外部 DNS 架构下用本文件达到同样效果）。
 *
 * 规则要点：
 *  - 带 media / imagesrcset 的图片 preload 不转换（Link 头无法表达媒体条件，
 *    强行预载会让移动端和桌面端全量下载，适得其反）；
 *  - 每个路径块都重复声明 Cache-Control：Pages 只应用「最具体」的一个路径块，
 *    不重复声明会丢掉 public/_headers 里 /*.html 的协商缓存规则；
 *  - 幂等：以标记行为界，重复运行先删除旧生成段再追加。
 *
 * 由 scripts/prune-dist.mjs 在 postbuild 阶段末尾调用（process.argv 透传 dist 目录），
 * 也可单独运行：node scripts/gen-early-hints.mjs [dist目录]
 */
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist');

const PAGES = [
  ['/', 'index.html'],
  ['/zh.html', 'zh.html'],
];

const MARK = '# ---- Early Hints Link 预载（本段由 scripts/gen-early-hints.mjs 生成，勿手改）----';

function linkHeaderFor(htmlFile) {
  const html = readFileSync(join(root, htmlFile), 'utf8');
  const items = [];
  for (const m of html.matchAll(/<link\b[^>]*>/g)) {
    const tag = m[0];
    const href = tag.match(/href="([^"]+)"/)?.[1];
    if (!href || !href.startsWith('/')) continue;
    if (/rel="stylesheet"/.test(tag)) {
      items.push(`<${href}>; rel=preload; as=style`);
    } else if (/rel="preload"/.test(tag)) {
      const as = tag.match(/as="([^"]+)"/)?.[1];
      if (as === 'font') items.push(`<${href}>; rel=preload; as=font; crossorigin`);
      else if (as === 'image' && !/media=|imagesrcset=/.test(tag)) items.push(`<${href}>; rel=preload; as=image`);
      // 带 media/imagesrcset 的图片跳过：见文件头说明
    } else if (/rel="modulepreload"/.test(tag)) {
      items.push(`<${href}>; rel=modulepreload`);
    }
  }
  return [...new Set(items)].join(', ');
}

const headersPath = join(root, '_headers');
let existing = '';
try { existing = readFileSync(headersPath, 'utf8'); } catch { /* 无既有文件则新建 */ }
const markIdx = existing.indexOf(MARK);
if (markIdx !== -1) existing = existing.slice(0, markIdx).replace(/\s+$/, '\n');

const blocks = [];
for (const [route, file] of PAGES) {
  if (!statSync(join(root, file), { throwIfNoEntry: false })) continue;
  const link = linkHeaderFor(file);
  if (!link) continue;
  blocks.push(`${route}\n  Link: ${link}\n  Cache-Control: public, max-age=0, must-revalidate`);
}

if (!blocks.length) {
  console.warn('[early-hints] 未找到可预载资源，_headers 保持不变');
} else {
  const out = existing.replace(/\s+$/, '\n\n') + MARK + '\n' + blocks.join('\n\n') + '\n';
  writeFileSync(headersPath, out);
  console.log(`[early-hints] 已为 ${blocks.map((b) => b.split('\n')[0]).join('、')} 写入 Link 预载头`);
}
