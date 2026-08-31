import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 内容集合（P0-1 CMS 化的承载层）
 * - news：新闻详情，每篇一个 Markdown 文件，body 为原站 ueditor HTML
 *   目录按语言分：src/content/news/en/<id>.md、src/content/news/zh/<id>.md
 *   列表页的 slides/grid 位置由 frontmatter 的 slide/grid 序号派生，保持与原站 1:1
 * - about：关于我们五大板块（intro/quality/partner/joinus/contact）的 HTML 内容
 */

const pnItem = z.object({
  cls: z.string(),
  id: z.string(),
  img: z.string(),
  label: z.string(),
  title: z.string(),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    /** 原站日期格式，如 "hitelecom 2025.01.01" */
    date: z.string(),
    cat: z.enum(['company', 'exh', 'ind']),
    /** 列表卡片图（src/assets/images 下相对路径） */
    img: z.string().optional(),
    excerpt: z.string().optional(),
    /** 在分类头条轮播中的位次（从 0 开始），不在轮播则省略 */
    slide: z.number().int().optional(),
    /** 在分类网格中的位次（从 0 开始），不在网格则省略 */
    grid: z.number().int().optional(),
    /** 详情页底部 Prev/Next 卡片（与原站一致的静态配置） */
    pn: z.array(pnItem).default([]),
    /** 相关推荐 id 列表 */
    related: z.array(z.string()).default([]),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: z.object({
    section: z.enum(['intro', 'quality', 'partner', 'joinus', 'contact']),
  }),
});

/**
 * 成功案例 / 技术博客（CMS 发布，目录独立于 news，结构复用新闻体系）
 * 有任何条目时，新闻中心自动出现「Success Stories / Tech Blog」选项卡与列表页；
 * 没有条目时全站保持与原站 1:1，不产生任何空页面。
 */
const caseBlogSchema = z.object({
  title: z.string(),
  date: z.string(),
  img: z.string().optional(),
  excerpt: z.string().optional(),
  slide: z.number().int().optional(),
  grid: z.number().int().optional(),
  pn: z.array(pnItem).default([]),
  related: z.array(z.string()).default([]),
});
const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: caseBlogSchema,
});
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: caseBlogSchema,
});

/**
 * CMS 新品（src/content/products/{en,zh}/<slug>.md）
 * 文件名即 URL slug：multi-gas-detector.md → /product/multi-gas-detector.html
 * 构建期与 product.ts 的 19 个内置系列合并，自动进入列表、详情、搜索与 sitemap。
 */
const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    series: z.string(),
    tagline: z.string(),
    desc: z.string(),
    /** 列表卡片 */
    cardName: z.string(),
    cardConn: z.string(),
    cardImg: z.string(),
    /** 归入的产品列表（默认 261 IoT Sensors 总列表） */
    listCid: z.string().default('261'),
    /** 详情页首屏大图（src/assets/images 下相对路径，缺省用卡片图） */
    heroImg: z.string().optional(),
    pdf: z.string().default(''),
    crumbCat: z.string(),
    returnCid: z.string().default('261'),
    features: z.array(z.object({ icon: z.string().optional(), text: z.string() })).default([]),
    specsTitle: z.string().default('Technical Specifications'),
    specsDesc: z.string().default(''),
    specs: z.array(z.object({ name: z.string(), value: z.string() })).default([]),
    scenariosHeading: z.string().default(''),
    scenarios: z.array(z.object({ img: z.string(), label: z.string() })).default([]),
    related: z.array(z.string()).default([]),
    // ——— GEO 字段（与内置系列一致）———
    summary: z.string().optional(),
    sku: z.string().optional(),
    specsStructured: z
      .array(
        z.object({
          name: z.string(),
          value: z.string(),
          unitText: z.string().optional(),
          minValue: z.number().optional(),
          maxValue: z.number().optional(),
        }),
      )
      .optional(),
    applications: z.array(z.object({ name: z.string(), desc: z.string(), img: z.string().optional() })).optional(),
    certifications: z.array(z.string()).optional(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    dateModified: z.string().optional(),
  }),
});

export const collections = { news, about, cases, blog, products };
