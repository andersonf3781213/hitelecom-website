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
  /** 重大编辑后的真实修改日期（可选，ISO），用于 Article JSON-LD dateModified */
  updated?: string;
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

import type { Locale as SiteLocale } from '../i18n';
type Locale = SiteLocale;

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
    date: 'Hitelecom · February 28, 2024',
    q: 'Many sensors rely on mains power or large batteries — does high energy consumption limit their operational lifespan?',
    a: 'Hitelecom sensor terminals use low-power processors, optimized power management, and configurable reporting intervals. Selected battery-powered models are designed for more than 10 years of service at a one-hour reporting interval; actual battery life depends on the model, reporting interval, network conditions, and operating temperature.',
   },
   {
    date: 'Hitelecom · April 16, 2024',
    q: 'Can electromagnetic interference (EMI) compromise sensor accuracy and signal integrity?',
    a: 'Selected models are designed and tested for EMC requirements applicable to their target environments. Ask for the relevant test report for your model.',
   },
   {
    date: 'Hitelecom · June 26, 2024',
    q: 'Can inappropriate sensor placement compromise data accuracy and sensor effectiveness?',
    a: 'Before deployment, our engineering team reviews your site conditions and works with you to determine the optimal sensor locations.',
   },
   {
    date: 'Hitelecom · August 28, 2024',
    q: 'Can measurement accuracy drift due to temperature variations, electromagnetic interference, or other environmental factors?',
    a: 'Hitelecom selects high-quality sensing elements, customizes configurations to customer requirements, and supports calibration matched to the deployment environment.',
   },
   {
    date: 'Hitelecom · October 16, 2025',
    q: 'How can devices maintain stable network connectivity for data transmission in remote or complex environments?',
    a: 'Hitelecom supports 4G Cat. 1, NB-IoT, and LoRa connectivity to fit complex sites. For data-sensitive scenarios, private deployment options keep field data flowing to your platform even from remote locations.',
   },
   {
    date: 'Hitelecom · December 12, 2025',
    q: 'IoT devices and applications require regular updates to fix vulnerabilities and add features — how is this managed remotely?',
    a: 'Supported devices can receive OTA firmware updates through Hitelecom Cloud. Update scheduling, version tracking, and rollback options depend on the device and deployment configuration.',
   },
  ],
  relatedHeading: 'Related Articles',
  crumbHome: 'Home',
  crumbNews: 'News',
  returnLabel: 'Back to News',
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
    date: '宏太 · 2024年2月28日',
    q: '许多传感器依赖外部或超大电池供电，高能耗会限制它们的使用寿命？',
    a: '宏太传感终端采用低功耗处理器、优化的电源管理与可配置上报间隔。部分电池型号按 1 小时上报间隔设计续航可超过 10 年；实际续航取决于型号、上报频率、网络状况与环境温度。',
   },
   {
    date: '宏太 · 2024年4月16日',
    q: '电磁干扰可能影响传感器的测量准确性和信号完整性？',
    a: '部分型号按目标应用场景的电磁兼容（EMC）要求设计并测试，可索取对应型号的检测报告。',
   },
   {
    date: '宏太 · 2024年6月26日',
    q: '不恰当的传感器部署位置可能影响数据的准确性和传感器的有效性？',
    a: '在部署前进行详细的现场分析，宏太工程团队会与您确定最佳的传感器位置。',
   },
   {
    date: '宏太 · 2024年8月28日',
    q: '传感器的测量数据可能因为多种因素（如温度变化、电磁干扰等）而失去精度？',
    a: '宏太选用高质量、高精度传感元件，按客户需求定制配置，并支持针对部署环境的校准。',
   },
   {
    date: '宏太 · 2025年10月16日',
    q: '在偏远或复杂环境中，维持稳定的网络连接以传输数据可能是一个挑战？',
    a: '宏太支持 4G Cat.1、NB-IoT、LoRa 等通信方式，适应复杂环境组网。针对数据敏感场景，提供私有化部署方案，保障现场数据稳定到达平台。',
   },
   {
    date: '宏太 · 2025年12月12日',
    q: '物联网设备和应用程序需要定期更新以修复漏洞、添加功能，且可能影响设备正常运行？',
    a: '支持的设备可通过宏太云平台接收 OTA 固件升级；升级计划、版本记录与回滚能力取决于具体型号与部署配置。',
   },
  ],
  relatedHeading: '您可能感兴趣的更多信息',
  crumbHome: '首页',
  crumbNews: '新闻中心',
  returnLabel: '返回列表',
  catNames: { company: '公司新闻', exh: '展会信息', ind: '行业资讯', case: '成功案例', blog: '技术博客' },
 },
 es: {
  bannerImg: 'news/banner.jpg',
  bannerSub: '',
  bannerTitle: 'CENTRO DE NOTICIAS',
  tabs: [
   { key: 'company', label: 'Noticias de la empresa', href: '/news/' },
   { key: 'exh', label: 'Ferias', href: '/news/index/cid/81' },
   { key: 'ind', label: 'Noticias de la industria', href: '/news/index/cid/80' },
   { key: 'faqs', label: 'Preguntas frecuentes', href: '/news/faqs' },
  ],
  readmore: 'Leer más',
  faqs: [
   {
    date: 'Hitelecom · 28/02/2024',
    q: 'Muchos sensores dependen de la red eléctrica o de baterías grandes: ¿el alto consumo de energía limita su vida útil?',
    a: 'Los terminales de sensores de Hitelecom utilizan procesadores de bajo consumo, gestión de energía optimizada e intervalos de reporte configurables. Algunos modelos alimentados por batería están diseñados para más de 10 años de servicio con un intervalo de reporte de una hora; la duración real de la batería depende del modelo, el intervalo de reporte, las condiciones de la red y la temperatura de operación.',
   },
   {
    date: 'Hitelecom · 16/04/2024',
    q: '¿Puede la interferencia electromagnética (EMI) comprometer la precisión del sensor y la integridad de la señal?',
    a: 'Algunos modelos están diseñados y probados según los requisitos de EMC aplicables a sus entornos de uso. Solicite el informe de pruebas correspondiente a su modelo.',
   },
   {
    date: 'Hitelecom · 26/06/2024',
    q: '¿Puede una ubicación inadecuada del sensor comprometer la precisión de los datos y la eficacia del sensor?',
    a: 'Antes de la implementación, nuestro equipo de ingeniería analiza las condiciones del sitio y determina con usted la ubicación óptima de los sensores.',
   },
   {
    date: 'Hitelecom · 28/08/2024',
    q: '¿Puede la precisión de medición derivar por variaciones de temperatura, interferencia electromagnética u otros factores ambientales?',
    a: 'Hitelecom selecciona elementos de detección de alta calidad, personaliza las configuraciones según los requisitos del cliente y admite calibración ajustada al entorno de implementación.',
   },
   {
    date: 'Hitelecom · 16/10/2025',
    q: '¿Cómo pueden los dispositivos mantener una conectividad de red estable para transmitir datos en entornos remotos o complejos?',
    a: 'Hitelecom admite conectividad 4G Cat.1, NB-IoT y LoRa para adaptarse a sitios complejos. Para escenarios sensibles con los datos, las opciones de implementación privada mantienen el flujo de datos de campo hacia su plataforma incluso desde ubicaciones remotas.',
   },
   {
    date: 'Hitelecom · 12/12/2025',
    q: 'Los dispositivos y aplicaciones IoT requieren actualizaciones periódicas para corregir vulnerabilidades y añadir funciones: ¿cómo se gestiona esto de forma remota?',
    a: 'Los dispositivos compatibles pueden recibir actualizaciones de firmware OTA a través de Hitelecom Cloud. La programación de actualizaciones, el registro de versiones y las opciones de reversión dependen del dispositivo y de la configuración de implementación.',
   },
  ],
  relatedHeading: 'Artículos relacionados',
  crumbHome: 'Inicio',
  crumbNews: 'Noticias',
  returnLabel: 'Volver a noticias',
  catNames: { company: 'Noticias de la empresa', exh: 'Ferias', ind: 'Noticias de la industria', case: 'Casos de éxito', blog: 'Blog técnico' },
 }, de: {
  bannerImg: 'news/banner.jpg',
  bannerSub: '',
  bannerTitle: 'NEWS-CENTER',
  tabs: [
   { key: 'company', label: 'Unternehmensnews', href: '/news/' },
   { key: 'exh', label: 'Messen', href: '/news/index/cid/81' },
   { key: 'ind', label: 'Branchennews', href: '/news/index/cid/80' },
   { key: 'faqs', label: 'Häufige Fragen', href: '/news/faqs' },
  ],
  readmore: 'Weiterlesen',
  faqs: [
   {
    date: 'Hitelecom · 28.02.2024',
    q: 'Viele Sensoren sind auf Netzstrom oder große Batterien angewiesen – begrenzt ein hoher Energieverbrauch ihre Lebensdauer?',
    a: 'Die Sensorterminals von Hitelecom nutzen stromsparende Prozessoren, optimiertes Energiemanagement und konfigurierbare Übertragungsintervalle. Ausgewählte batteriebetriebene Modelle sind für mehr als 10 Jahre Betrieb bei einem einstündigen Übertragungsintervall ausgelegt; die tatsächliche Batterielebensdauer hängt von Modell, Übertragungsintervall, Netzbedingungen und Betriebstemperatur ab.',
   },
   {
    date: 'Hitelecom · 16.04.2024',
    q: 'Kann elektromagnetische Störung (EMI) die Genauigkeit und Signalintegrität von Sensoren beeinträchtigen?',
    a: 'Ausgewählte Modelle sind für die EMC-Anforderungen ihrer Zielumgebungen ausgelegt und getestet. Fordern Sie den entsprechenden Prüfbericht für Ihr Modell an.',
   },
   {
    date: 'Hitelecom · 26.06.2024',
    q: 'Kann eine ungeeignete Sensorplatzierung die Datengenauigkeit und Wirksamkeit des Sensors beeinträchtigen?',
    a: 'Vor der Bereitstellung prüft unser Engineering-Team Ihre Standortbedingungen und ermittelt gemeinsam mit Ihnen die optimalen Sensorpositionen.',
   },
   {
    date: 'Hitelecom · 28.08.2024',
    q: 'Kann die Messgenauigkeit durch Temperaturschwankungen, elektromagnetische Störungen oder andere Umgebungsfaktoren driften?',
    a: 'Hitelecom wählt hochwertige Sensorelemente aus, passt Konfigurationen an Kundenanforderungen an und unterstützt die Kalibrierung abgestimmt auf die Einsatzumgebung.',
   },
   {
    date: 'Hitelecom · 16.10.2025',
    q: 'Wie können Geräte in abgelegenen oder komplexen Umgebungen eine stabile Netzverbindung für die Datenübertragung aufrechterhalten?',
    a: 'Hitelecom unterstützt 4G Cat.1, NB-IoT und LoRa für die Vernetzung in komplexen Umgebungen. Für datensensible Szenarien sorgen private Bereitstellungsoptionen dafür, dass Felddaten auch an entfernten Standorten zuverlässig Ihre Plattform erreichen.',
   },
   {
    date: 'Hitelecom · 12.12.2025',
    q: 'IoT-Geräte und -Anwendungen benötigen regelmäßige Updates, um Schwachstellen zu beheben und Funktionen hinzuzufügen – wie wird das remote gehandhabt?',
    a: 'Unterstützte Geräte können OTA-Firmware-Updates über Hitelecom Cloud erhalten. Update-Planung, Versionsverfolgung und Rollback-Optionen hängen vom Gerät und der Bereitstellungskonfiguration ab.',
   },
  ],
  relatedHeading: 'Verwandte Artikel',
  crumbHome: 'Startseite',
  crumbNews: 'News',
  returnLabel: 'Zurück zu den News',
  catNames: { company: 'Unternehmensnews', exh: 'Messen', ind: 'Branchennews', case: 'Erfolgsgeschichten', blog: 'Tech-Blog' },
 }, ja: {
  bannerImg: 'news/banner.jpg',
  bannerSub: '',
  bannerTitle: 'NEWS CENTER',
  tabs: [
   { key: 'company', label: '会社ニュース', href: '/news/' },
   { key: 'exh', label: '展示会', href: '/news/index/cid/81' },
   { key: 'ind', label: '業界ニュース', href: '/news/index/cid/80' },
   { key: 'faqs', label: 'よくあるご質問', href: '/news/faqs' },
  ],
  readmore: '続きを読む',
  faqs: [
   {
    date: 'Hitelecom · 2024年2月28日',
    q: '多くのセンサーは商用電源や大型バッテリーに依存していますが、高いエネルギー消費は稼働寿命を制限するのでしょうか？',
    a: 'Hitelecomのセンサーターミナルは、低消費電力プロセッサー、最適化された電源管理、構成可能な送信間隔を採用しています。一部のバッテリー駆動モデルは、1時間の送信間隔で10年以上の稼働を想定した設計です。実際のバッテリー寿命は、モデル、送信間隔、ネットワーク状況、動作温度によって異なります。',
   },
   {
    date: 'Hitelecom · 2024年4月16日',
    q: '電磁干渉（EMI）はセンサーの精度や信号完全性を損なう可能性がありますか？',
    a: '一部のモデルは、対象環境に適用されるEMC要件に沿って設計・試験されています。ご利用のモデルの該当試験レポートをお問い合わせください。',
   },
   {
    date: 'Hitelecom · 2024年6月26日',
    q: '不適切なセンサー配置は、データ精度やセンサーの有効性を損なう可能性がありますか？',
    a: '展開前に、当社のエンジニアリングチームが現場状況を確認し、お客様と協力して最適なセンサー位置を決定します。',
   },
   {
    date: 'Hitelecom · 2024年8月28日',
    q: '温度変化、電磁干渉、その他の環境要因により、測定精度がずれる可能性はありますか？',
    a: 'Hitelecomは高品質のセンシング素子を選定し、お客様の要件に合わせて構成をカスタマイズし、展開環境に適合したキャリブレーションをサポートします。',
   },
   {
    date: 'Hitelecom · 2025年10月16日',
    q: '遠隔地や複雑な環境で、データ伝送のための安定したネットワーク接続を維持するにはどうすればよいですか？',
    a: 'Hitelecomは4G Cat.1、NB-IoT、LoRaなどの通信方式に対応し、複雑な環境でのネットワーク構築に対応します。データに配慮が必要な場面では、プライベートデプロイにより、フィールドデータが安定的にプラットフォームに届くようにします。',
   },
   {
    date: 'Hitelecom · 2025年12月12日',
    q: 'IoTデバイスとアプリケーションは、脆弱性修正や機能追加のために定期的な更新が必要ですが、リモートではどのように管理しますか？',
    a: '対応デバイスはHitelecom Cloud経由でOTAファームウェア更新を受信できます。更新スケジュール、バージョン記録、ロールバック機能は、モデルと展開構成によって異なります。',
   },
  ],
  relatedHeading: '関連記事',
  crumbHome: 'ホーム',
  crumbNews: 'ニュース',
  returnLabel: 'ニュース一覧に戻る',
  catNames: { company: '会社ニュース', exh: '展示会', ind: '業界ニュース', case: '導入事例', blog: '技術ブログ' },
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
    details[id] = { title: f.title, date: f.date, updated: (f as { updated?: string }).updated, body: e.body, cat: f.cat, pn: f.pn, related: f.related };
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

  // 上一篇/下一篇：标题一律按 ID 从索引同步（frontmatter pn 中常有旧标题复制残留）；
  // EN 标签统一为 Previous / Next
  for (const d of Object.values(details)) {
    for (const p of d.pn ?? []) {
      const t = index[p.id]?.title;
      if (t) p.title = t;
      if (locale === 'en' && /^prev/i.test(p.label)) p.label = 'Previous';
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

const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTHS_ES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const MONTHS_DE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

/** 新闻日期显示：ISO 日期按语言习惯渲染（EN "January 1, 2025"；ES "1 de enero de 2025"），其他格式原样返回 */
export function fmtNewsDate(date: string, locale: string = 'en'): string {
  const m = date.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return date;
  if (locale === 'es') return `${+m[3]} de ${MONTHS_ES[+m[2] - 1]} de ${m[1]}`;
  if (locale === 'de') return `${+m[3]}. ${MONTHS_DE[+m[2] - 1]} ${m[1]}`;
  if (locale === 'ja') return `${m[1]}年${+m[2]}月${+m[3]}日`;
  return `${MONTHS_EN[+m[2] - 1]} ${+m[3]}, ${m[1]}`;
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
