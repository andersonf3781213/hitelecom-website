import { getCollection } from 'astro:content';

/**
 * 新闻中心数据层（P0-1：正文已迁移至内容集合，可在 /admin 后台编辑）
 *
 * - 每篇新闻一个 Markdown 文件：src/content/news/{en,zh}/<id>.md
 *   frontmatter 携带 title/date/cat/img/excerpt/slide/grid/pn/related，body 为原站 ueditor HTML
 * - 本文件只保留：类型定义、静态配置（横幅/选项卡/FAQ/文案）、集合装配器
 * - 列表 slides/grid 由 frontmatter 的 slide/grid 序号派生，与原站 1:1
 *
 * 新增一篇新闻：在 /admin 后台发布，或手工在 src/content/news/en/ 与 zh/ 各加一个同名 .md。
 */

export interface NewsListItem { id: string; img: string; date: string; title: string; excerpt: string }
export type NewsCat = 'company' | 'exh' | 'ind' | 'case' | 'blog';
export interface NewsCategory { slides: NewsListItem[]; grid: NewsListItem[] }
export interface FaqItem { date: string; q: string; a: string }
export interface NewsPn { cls: string; id: string; img: string; label: string; title: string }
export interface NewsDetail {
  title: string; date: string; body: string;
  cat: NewsCat;
  pn: NewsPn[]; related: string[];
}

export interface NewsContent {
  bannerImg: string;
  bannerSub: string;   // 中文站原站 HERO 小字"新闻中心"，英文站为空
  bannerTitle: string;
  tabs: { key: NewsCat | 'faqs'; label: string; href: string }[];
  readmore: string;
  categories: Record<NewsCat, NewsCategory>;
  faqs: FaqItem[];
  details: Record<string, NewsDetail>;
  /** 全站条目索引（详情页"相关推荐"按 id 取卡片） */
  index: Record<string, NewsListItem>;
  relatedHeading: string;
  crumbHome: string; crumbNews: string; returnLabel: string;
  catNames: Record<NewsCat, string>;
}

type Locale = 'en' | 'zh';

/** 静态配置（不随文章变动的板块文案与 FAQ） */
const staticConfig: Record<Locale, Pick<NewsContent,
  'bannerImg' | 'bannerSub' | 'bannerTitle' | 'tabs' | 'readmore' | 'faqs' |
  'relatedHeading' | 'crumbHome' | 'crumbNews' | 'returnLabel' | 'catNames'>> = {
 en: {
  bannerImg: 'news/banner.jpg',
  bannerSub: '',
  bannerTitle: 'NEWS CENTER',
  tabs: [
   { key: 'company', label: 'Company News', href: '/news/' },
   { key: 'exh', label: 'Exhibition', href: '/news/index/cid/81' },
   { key: 'ind', label: 'Industry News', href: '/news/index/cid/80' },
   { key: 'faqs', label: 'FAQs', href: '/news/faqs' },
  ],
  readmore: 'Read More',
  faqs: [
   {
    date: 'hitelecom 2024.02.28',
    q: 'Many sensors rely on mains power or large batteries — does high energy consumption limit their operational lifespan?',
    a: 'Hitelecom adopts ultra-low-power design and power-saving technologies, combined with edge computing, enabling most of our sensors to achieve over 10 years of operational longevity (depending on communication upload frequency), while significantly reducing maintenance costs and simplifying deployment in locations without mains power.',
   },
   {
    date: 'hitelecom 2024.04.16',
    q: 'Can electromagnetic interference (EMI) compromise sensor accuracy and signal integrity?',
    a: 'Hitelecom sensors feature EMC (Electromagnetic Compatibility) design, incorporating comprehensive anti-interference technology to enhance resistance to external disruptions and minimize electromagnetic interference with the environment. This ensures highly reliable data acquisition and stable communication, even in electrically noisy industrial environments.',
   },
   {
    date: 'hitelecom 2024.06.26',
    q: 'Can inappropriate sensor placement compromise data accuracy and sensor effectiveness?',
    a: 'Before deployment, a detailed on-site analysis will be conducted, and the Hitelecom engineering team will work with you to determine the optimal sensors location.',
   },
   {
    date: 'hitelecom 2024.08.28',
    q: 'Can measurement accuracy drift due to temperature variations, electromagnetic interference, or other environmental factors?',
    a: 'Hitelecom selects high-quality, high-precision sensors, customizes them according to specific customer requirements, and implements appropriate calibration in the sensor deployment environment.',
   },
   {
    date: 'hitelecom 2025.10.16',
    q: 'How can devices maintain stable network connectivity for data transmission in remote or complex environments?',
    a: 'Hitelecom supports multiple communication protocols (Cat.1, NB-IoT, LoRa) to meet the mixed networking needs in complex environments. For data-sensitive scenarios, we offer private deployment solutions and further enhance connection stability and reliability through multi-network redundancy and automatic failover, ensuring field data reaches the platform even from remote sites.',
   },
   {
    date: 'hitelecom 2025.12.12',
    q: 'IoT devices and applications require regular updates to fix vulnerabilities and add features — how is this managed remotely?',
    a: 'Hitelecom Cloud Platform features remote OTA capabilities, compatible with both iOS and Android devices, offering regular updates to establish a reliable remote device management and update protocol. Emphasizing secure and stable updates, it includes a robust version-management and rollback mechanism, so every update remains traceable and recoverable across large device fleets.',
   },
  ],
  relatedHeading: 'More information you may be interested in',
  crumbHome: 'Home',
  crumbNews: 'News',
  returnLabel: 'Return',
  catNames: { company: 'Company News', exh: 'Exhibition', ind: 'Industry News', case: 'Success Stories', blog: 'Tech Blog' },
 },
 zh: {
  bannerImg: 'news/banner.jpg',
  bannerSub: '新闻中心',
  bannerTitle: 'NEWS CENTER',
  tabs: [
   { key: 'company', label: '公司新闻', href: '/news/' },
   { key: 'exh', label: '展会信息', href: '/news/index/cid/81' },
   { key: 'ind', label: '行业资讯', href: '/news/index/cid/80' },
   { key: 'faqs', label: '常见问题', href: '/news/faqs' },
  ],
  readmore: 'Read More',
  faqs: [
   {
    date: 'hitelecom 2024.02.28',
    q: '许多传感器依赖外部或超大电池供电，高能耗会限制它们的使用寿命？',
    a: '宏太采用超低功耗和电源节能技术，结合边缘计算，我们的大部分传感器可实现超过10年的持久运行(视通信上传频率决定)，同时显著提高能效。',
   },
   {
    date: 'hitelecom 2024.04.16',
    q: '电磁干扰可能影响传感器的测量准确性和信号完整性？',
    a: '宏太传感器采用电磁兼容（EMC）设计，通过综合抗干扰技术，优化外部干扰的抵抗能力及减少了对环境的电磁干扰，确保了高度稳定与可靠的性能表现，满足严格的商业应用标准。',
   },
   {
    date: 'hitelecom 2024.06.26',
    q: '不恰当的传感器部署位置可能影响数据的准确性和传感器的有效性？',
    a: '在部署前进行详细的现场分析，宏太工程团队会与您确定最佳的传感器位置。',
   },
   {
    date: 'hitelecom 2024.08.28',
    q: '传感器的测量数据可能因为多种因素（如温度变化、电磁干扰等）而失去精度？',
    a: '宏太选择高质量高精度的传感器，根据客户的具体需求进行定制，并在传感器部署环境中实施适当的校准。',
   },
   {
    date: 'hitelecom 2025.10.16',
    q: '在偏远或复杂环境中，维持稳定的网络连接以传输数据可能是一个挑战？',
    a: '宏太支持多通信协议（Cat.1, NB-IoT, LoRa），适应复杂环境下的混合组网需求。针对数据敏感场景，我们提供私有化部署方案，并通过设计网络冗余机制，显著提升连接稳定性与可靠性，确保业务连续性。',
   },
   {
    date: 'hitelecom 2025.12.12',
    q: '物联网设备和应用程序需要定期更新以修复漏洞、添加功能，且可能影响设备正常运行？',
    a: '宏太云平台实现远程OTA功能，同时兼容iOS和Android设备，并定期推送更新，确立了一套可靠的远程设备管理与更新流程。此流程强调更新的安全性与稳定性，且配备回滚功能，以便在更新不成功时迅速恢复系统稳定。',
   },
  ],
  relatedHeading: '您可能感兴趣的更多信息',
  crumbHome: '首页',
  crumbNews: '新闻中心',
  returnLabel: '返回列表',
  catNames: { company: '公司新闻', exh: '展会信息', ind: '行业资讯', case: '成功案例', blog: '技术博客' },
 },
};

/** 从内容集合装配完整的 NewsContent（构建期调用，结果已按原站位次排序） */
export async function getNewsContent(locale: Locale): Promise<NewsContent> {
  const entries = await getCollection('news', ({ id }) => id.startsWith(locale + '/'));

  const details: Record<string, NewsDetail> = {};
  const index: Record<string, NewsListItem> = {};
  const slides: Record<string, (NewsListItem & { pos: number })[]> = { company: [], exh: [], ind: [], case: [], blog: [] };
  const grid: Record<string, (NewsListItem & { pos: number })[]> = { company: [], exh: [], ind: [], case: [], blog: [] };

  for (const e of entries) {
    // Astro 5 的 entry.id 含扩展名（en/1345.md），URL 需去掉 .md
    const id = e.id.split('/')[1].replace(/\.md$/, '');
    const f = e.data;
    details[id] = { title: f.title, date: f.date, body: e.body, cat: f.cat, pn: f.pn, related: f.related };
    // CMS 上传的卡片图保存为 "/images/news/xx.png"，归一化为 Img 组件的相对路径 "news/xx.png"
    const cardImg = (f.img ?? '').replace(/^\/images\//, '');
    const card: NewsListItem = {
      id,
      img: cardImg,
      date: f.date,
      title: f.title,
      excerpt: f.excerpt ?? '',
    };
    index[id] = card;
    if (f.slide !== undefined) slides[f.cat].push({ ...card, pos: f.slide });
    if (f.grid !== undefined) grid[f.cat].push({ ...card, pos: f.grid });
  }

  // 成功案例 / 技术博客（独立目录，复用新闻装配；有条目才出现对应选项卡）
  for (const [coll, cat] of [['cases', 'case'], ['blog', 'blog']] as const) {
    const extra = await getCollection(coll, ({ id }) => id.startsWith(locale + '/'));
    for (const e of extra) {
      const id = e.id.split('/')[1].replace(/\.md$/, '');
      const f = e.data;
      details[id] = { title: f.title, date: f.date, body: e.body, cat, pn: f.pn, related: f.related };
      const card: NewsListItem = { id, img: (f.img ?? '').replace(/^\/images\//, ''), date: f.date, title: f.title, excerpt: f.excerpt ?? '' };
      index[id] = card;
      if (f.slide !== undefined) slides[cat].push({ ...card, pos: f.slide });
      if (f.grid !== undefined) grid[cat].push({ ...card, pos: f.grid });
    }
  }

  const byPos = (a: { pos: number }, b: { pos: number }) => a.pos - b.pos;
  const strip = (list: (NewsListItem & { pos: number })[]): NewsListItem[] =>
    list.sort(byPos).map(({ pos: _pos, ...c }) => c);

  const categories: Record<NewsCat, NewsCategory> = {
    company: { slides: strip(slides.company), grid: strip(grid.company) },
    exh: { slides: strip(slides.exh), grid: strip(grid.exh) },
    ind: { slides: strip(slides.ind), grid: strip(grid.ind) },
    case: { slides: strip(slides.case), grid: strip(grid.case) },
    blog: { slides: strip(slides.blog), grid: strip(grid.blog) },
  };
  // 有内容才出现的选项卡（插在 FAQs 之前），无内容时与原站完全一致
  const tabs = [...staticConfig[locale].tabs];
  const faqIdx = tabs.findIndex((t) => t.key === 'faqs');
  const extra: { key: NewsCat | 'faqs'; label: string; href: string }[] = [];
  if (categories.case.slides.length || categories.case.grid.length)
    extra.push({ key: 'case', label: staticConfig[locale].catNames.case, href: '/news/index/cid/case' });
  if (categories.blog.slides.length || categories.blog.grid.length)
    extra.push({ key: 'blog', label: staticConfig[locale].catNames.blog, href: '/news/index/cid/blog' });
  tabs.splice(faqIdx === -1 ? tabs.length : faqIdx, 0, ...extra);

  return {
    ...staticConfig[locale],
    tabs,
    categories,
    details,
    index,
  };
}

/** 某语言下全部新闻 id（供 getStaticPaths） */
export async function getNewsIds(locale: Locale): Promise<string[]> {
  const ids: string[] = [];
  for (const coll of ['news', 'cases', 'blog'] as const) {
    const entries = await getCollection(coll, ({ id }) => id.startsWith(locale + '/'));
    ids.push(...entries.map((e) => e.id.split('/')[1].replace(/\.md$/, '')));
  }
  return ids;
}

/** 成功案例/技术博客列表页仅在对应语言有内容时生成（供 [cat].astro getStaticPaths） */
export async function getExtraNewsCats(locale: Locale): Promise<('case' | 'blog')[]> {
  const out: ('case' | 'blog')[] = [];
  for (const [coll, cat] of [['cases', 'case'], ['blog', 'blog']] as const) {
    const entries = await getCollection(coll, ({ id }) => id.startsWith(locale + '/'));
    if (entries.length) out.push(cat);
  }
  return out;
}
