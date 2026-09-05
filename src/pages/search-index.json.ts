/**
 * 站内搜索索引（构建期生成）：/search-index.json
 * 覆盖：产品详情、产品卡片、新闻、解决方案；EN/ZH 分开。
 * 搜索页 /search 与 /zh/search 在浏览器端读取本文件做过滤。
 */
import type { APIRoute } from 'astro';
import { getMergedProducts, productContent, productPath } from '../data/product';
import { l, type Locale } from '../i18n';
import { getNewsContent } from '../data/news';
import { solutionIndex } from '../data/solution';

interface Entry { t: string; d: string; u: string; c: string }

/** 搜索结果分类标签（按语言） */
const catLabels: Record<Locale, { product: string; news: string; solution: string }> = {
  en: { product: 'Product', news: 'News', solution: 'Solution' },
  zh: { product: '产品', news: '新闻', solution: '解决方案' },
  es: { product: 'Producto', news: 'Noticias', solution: 'Solución' },
};

function strip(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

async function buildLocale(locale: Locale): Promise<Entry[]> {
  const out: Entry[] = [];
  const seen = new Set<string>();
  const merged = await getMergedProducts(locale);
  const p = { ...productContent[locale], details: merged.details };
  const pre = locale === 'en' ? '' : `/${locale}`;
  const cats = catLabels[locale];

  // 产品详情（优先，描述最全）
  for (const [id, det] of Object.entries(p.details)) {
    if (seen.has(id)) continue;
    seen.add(id);
    out.push({
      t: det.series,
      d: det.desc,
      u: l(productPath(id), locale),
      c: cats.product,
    });
  }
  // 列表中有名字但无详情的卡片（定制类）不收录——没有落地页

  // 新闻
  const nc = await getNewsContent(locale);
  for (const [id, item] of Object.entries(nc.index)) {
    out.push({
      t: item.title,
      d: item.excerpt || '',
      u: `${pre}/news/show/id/${id}`,
      c: cats.news,
    });
  }

  // 解决方案
  for (const c of solutionIndex[locale].cards) {
    out.push({
      t: c.title,
      d: c.desc,
      u: `${pre}/solution/show/id/${c.id}`,
      c: cats.solution,
    });
  }

  // 云平台 / APP
  out.push({ t: p.cloud.banner.title, d: strip(p.cloud.banner.desc), u: `${pre}/product`, c: cats.product });
  out.push({ t: p.app.banner.title, d: strip(p.app.banner.desc), u: `${pre}/product/app`, c: cats.product });

  return out;
}

export const GET: APIRoute = async () =>
  new Response(
    JSON.stringify({ en: await buildLocale('en'), zh: await buildLocale('zh'), es: await buildLocale('es') }),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
  );
