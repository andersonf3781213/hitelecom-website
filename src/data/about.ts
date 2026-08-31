import { getEntry } from 'astro:content';

/**
 * 关于我们数据层（P0-1：242KB 单行 HTML 已拆分为 10 个 Markdown 文件）
 *
 * 每个板块一个文件：src/content/about/{en,zh}/{intro,quality,partner,joinus,contact}.md
 * body 为原站 HTML（含 <img> 等内容图，渲染前经 enhanceContentHtml 纳入图片管线）。
 * 编辑入口：/admin 后台「关于我们」集合，或直接编辑对应 .md 文件。
 */

export type AboutSection = 'intro' | 'quality' | 'partner' | 'joinus' | 'contact';
export type Locale = 'en' | 'zh';

/** 取某语言某板块的原始 HTML 内容 */
export async function getAboutSection(locale: Locale, section: AboutSection): Promise<string> {
  const entry = await getEntry('about', `${locale}/${section}`);
  if (!entry) throw new Error(`[about] 缺少内容文件: src/content/about/${locale}/${section}.md`);
  return entry.body;
}
