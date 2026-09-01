/**
 * 生成 public/_redirects（Cloudflare Pages 真 301，10 分钟即可生效于边缘节点）。
 *
 * 背景：产品详情页 URL 从旧站数字地址 /product/show/id/{id}.html 改为语义
 * slug /product/{slug}.html。跳转页（meta refresh）只是软跳转兜底，
 * Google 按 302 类信号处理、权重传递不完整；_redirects 才是服务器级 301。
 *
 * 本脚本从 src/data/product.ts 的 productSlugs 映射表自动派生规则，
 * 新增产品时重跑即可，无需手改：node scripts/make-redirects.mjs
 *
 * 注意：_redirects 是 Cloudflare Pages / Netlify 约定文件；若部署到 Nginx
 * 等自托管环境，请按相同映射在服务器配置 301（跳转页仍可兜底）。
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ts = readFileSync(join(root, 'src/data/product.ts'), 'utf8');

// 抽取 productSlugs 对象字面量里的 'id': 'slug' 对
const block = ts.match(/export const productSlugs[^=]*=\s*\{([\s\S]*?)\};/);
if (!block) throw new Error('未找到 productSlugs 映射表');
const pairs = [...block[1].matchAll(/'([^']+)'\s*:\s*'([^']+)'/g)].map((m) => [m[1], m[2]]);
if (!pairs.length) throw new Error('productSlugs 为空');

const lines = [
  '# Cloudflare Pages 301 重定向（本文件由 scripts/make-redirects.mjs 生成，勿手改）',
  '# 旧数字产品地址 → 语义 slug 地址；meta refresh 跳转页保留作非 CF 环境兜底',
  '',
];
for (const [id, slug] of pairs) {
  lines.push(`/product/show/id/${id}.html /product/${slug}.html 301`);
  lines.push(`/zh/product/show/id/${id}.html /zh/product/${slug}.html 301`);
}
lines.push('');

const out = join(root, 'public/_redirects');
writeFileSync(out, lines.join('\n'));
console.log(`已生成 ${out}：${pairs.length * 2} 条 301（${pairs.length} 个产品 × 中英双语）`);
