import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro:assets';

/**
 * 内容 HTML 图片增强器（P0-3：把 Markdown / 数据文件里裸露的 <img> 纳入 Astro 图片管线）
 *
 * 背景：新闻正文、关于我们等板块的 HTML 字符串中含 <img src="/images/...">，
 * 直接 set:html 输出会绕过压缩/WebP/宽高注入，造成 CLS 与加载浪费。
 *
 * 用法：所有 /images/about/*、/images/news-body/* 的源文件已迁移至
 * src/assets/images/content/ 下对应子目录。本模块在构建时：
 *   1. <img>：替换 src 为优化后的 WebP，注入 width/height（消除 CLS）、
 *      loading="lazy"、decoding="async"，缺失的 alt 用兜底文案补齐；
 *   2. style 背景 url(/images/...)：同样替换为优化后的 WebP 地址；
 *   3. 清晰度优先：内容图按原宽输出（上限 1600px），quality 90，不做激进压缩。
 */

const assets = import.meta.glob<ImageMetadata>(
  '/src/assets/images/content/**/*.{jpeg,jpg,png,gif,webp}',
  { eager: true, import: 'default' },
);

/** "/images/about/xxx.webp" → ImageMetadata */
const byPublicPath = new Map<string, ImageMetadata>();
for (const [file, meta] of Object.entries(assets)) {
  byPublicPath.set(file.replace('/src/assets/images/content/', '/images/'), meta);
}

/** 单张图优化并缓存（多页引用同一图时只处理一次） */
const cache = new Map<string, Promise<{ src: string; width: number; height: number }>>();
function optimize(publicPath: string, maxWidth: number) {
  const meta = byPublicPath.get(publicPath);
  if (!meta) return null;
  const width = Math.min(meta.width, maxWidth);
  const key = `${publicPath}@${width}`;
  if (!cache.has(key)) {
    cache.set(
      key,
      getImage({ src: meta, width, format: 'webp', quality: 90 }).then((r) => ({
        src: r.src,
        width: r.attributes.width as number,
        height: r.attributes.height as number,
      })),
    );
  }
  return cache.get(key)!;
}

/** 解析标签属性（内容 HTML 均为双引号写法） */
function getAttr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i'));
  return m ? m[1] : null;
}

/**
 * 增强一段内容 HTML：返回图片全部走优化管线后的新字符串。
 * @param html 原始 HTML（含 /images/... 引用）
 * @param altFallback 缺失 alt 时的兜底文案（建议传板块名，如 "About Hitelecom"）
 */
export async function enhanceContentHtml(html: string, altFallback = 'Hitelecom'): Promise<string> {
  // —— 1. <img> 标签 ——
  const imgTags = [...html.matchAll(/<img\b[^>]*>/gi)];
  const replacements = await Promise.all(
    imgTags.map(async (m) => {
      const tag = m[0];
      const src = getAttr(tag, 'src');
      const opt = src ? optimize(src, 1600) : null;
      if (!src || !opt) return { tag, out: tag };
      const o = await opt;
      const alt = getAttr(tag, 'alt') ?? altFallback;
      const title = getAttr(tag, 'title');
      const cls = getAttr(tag, 'class');
      const style = getAttr(tag, 'style');
      return {
        tag,
        out:
          `<img src="${o.src}" width="${o.width}" height="${o.height}"` +
          ` alt="${alt.replace(/"/g, '&quot;')}"` +
          (title ? ` title="${title.replace(/"/g, '&quot;')}"` : '') +
          (cls ? ` class="${cls}"` : '') +
          (style ? ` style="${style.replace(/"/g, '&quot;')}"` : '') +
          ` loading="lazy" decoding="async" />`,
      };
    }),
  );
  let out = html;
  for (const r of replacements) out = out.replace(r.tag, r.out);

  // —— 2. style 背景 url(/images/...)（如关于我们首屏横幅，按 1920 宽处理）——
  const urls = [...out.matchAll(/url\(\s*['"]?(\/images\/[^)'"]+)['"]?\s*\)/g)];
  for (const m of urls) {
    const opt = await optimize(m[1], 1920);
    if (opt) out = out.replace(m[0], `url(${(await opt).src})`);
  }

  // —— 3. 图片型 H1 注入真实文字（SEO/无障碍）——
  // 原站 About 各页 H1 只有一张标题图；在图前补视觉上隐藏的文字（取自 alt），
  // 既保持 1:1 外观，又让 H1 有真实文本可被搜索引擎与读屏器读取。
  out = out.replace(/<h1([^>]*)>\s*(<img\b[^>]*\/?>)\s*<\/h1>/gi, (m, attrs, imgTag) => {
    const alt = getAttr(imgTag, 'alt');
    if (!alt || !alt.trim()) return m;
    return `<h1${attrs}><span class="sr-only">${alt.replace(/"/g, '&quot;')}</span>${imgTag}</h1>`;
  });
  return out;
}

/** 单张内容图的优化地址（供 preload 等场景与正文增强结果保持一致） */
export async function contentImageSrc(publicPath: string, maxWidth = 1920): Promise<string | null> {
  const opt = optimize(publicPath, maxWidth);
  return opt ? (await opt).src : null;
}

/**
 * 正文归一化：兼容 CMS 编辑器产出。
 * 存量正文为原站 ueditor HTML（含标签），原样返回；
 * 后台新写的内容若是 Markdown 图片语法或纯文本段落，这里转成 HTML：
 *   ![alt](/images/news-body/x.webp) → <img …>（随后由 enhanceContentHtml 接管优化）
 *   全文无标签时按空行分段包 <p>。
 */
export function normalizeBody(body: string): string {
  let out = body.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1" />');
  if (!/<[a-z][\s\S]*>/i.test(out)) {
    out = out
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => `<p>${p.replace(/\n/g, '<br />')}</p>`)
      .join('\n');
  }
  return out;
}
