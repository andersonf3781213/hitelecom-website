/**
 * 官网侧目录适配封装（V109 目录管理模块接入）
 * - 既有产品：保留官网卡片字段，叠加目录名称、图片、语言发布状态与分类
 * - 产品按目录分类进入「全部」列表及对应子分类列表，按基础顺序/主推排序
 * 数据文件：src/data/product-catalog.json（后台保存即更新此文件）
 */
import catalog from '../data/product-catalog.json';
import '../styles/sensor-catalog-layout.css';
import { applyCatalogToExisting } from './catalog-adapter.mjs';
import { productSlugs } from '../data/product';
import { PRECISION_CARD_CONNECTIVITY, precisionCardRegistry, applyPrecisionCardDisplay } from './tilt-precision-cards.mjs';

// 目录分类 → 官网列表 cid（261=传感器「全部」；其余为对应子分类）
const CATEGORY_CIDS: Record<string, string[]> = {
  temperature: ['261', '263'],
  pressure: ['261', '262'],
  soil: ['261', '269'],
  'liquid-level': ['261', '268'],
  tilt: ['261', '267'],
  distance: ['261', '266'],
  vibration: ['261', '271'],
  'air-quality': ['261', '265'],
  'asset-tracking': ['261', '306'],
  'water-leak': ['261'],
};
const SENSOR_CIDS = new Set(Object.values(CATEGORY_CIDS).flat());

// 官网卡片 id 可能是数字（如 '270'）或字符串 slug；统一映射到目录产品 id
const resolveId = (p: { id?: string | number }) =>
  productSlugs[String(p.id)] ?? (typeof p.id === 'string' && p.id ? p.id : undefined);

type CatalogCardLinks = { url?: string; href?: string };

// These two pages are static Astro routes (managedPage:false). Register their
// original card templates so the generic adapter can include them without
// generating duplicate managed routes or changing the official card component.
const precisionStaticCards = precisionCardRegistry.map(card => ({
  id:card.id, name:card.name, img:card.image, conn:card.conn, searchTerms:card.searchTerms, url:card.path, href:card.path,
}));

// 三轴两款同样是静态 Astro 路由（七语均已发布，V122）：注册原始卡片模板，型号/精度仅进入搜索词，
// 卡片可见行与其它产品一致；适配器按当前语言的目录文案本地化名称与链接。
const triaxialStaticCards = [
  {
    id:'triaxial-high-precision-tilt-sensor', name:'Triaxial High-precision Tilt Sensor',
    img:'/images/products/h310-ts380c-triaxial.svg', conn:PRECISION_CARD_CONNECTIVITY,
    searchTerms:'H310-TS380C triaxial three-axis inclinometer tilt ±0.01°',
    url:'/product/triaxial-high-precision-tilt-sensor', href:'/product/triaxial-high-precision-tilt-sensor',
  },
  {
    id:'triaxial-medium-precision-tilt-sensor', name:'Triaxial Medium-precision Tilt Sensor',
    img:'/images/products/h310-ts350m-triaxial.svg', conn:PRECISION_CARD_CONNECTIVITY,
    searchTerms:'H310-TS350M triaxial three-axis inclinometer tilt ±0.1°',
    url:'/product/triaxial-medium-precision-tilt-sensor', href:'/product/triaxial-medium-precision-tilt-sensor',
  },
];


export function applyCatalog<T>(products: T[], cid: string, locale: string, existingPool: T[] = products): (T & CatalogCardLinks)[] {
  return applyCatalogToExisting(products, catalog as any, {
    locale,
    resolveId: resolveId as any,
    // 所有语言均注入静态卡片模板；适配器按当前语言的已发布目录文案本地化名称与链接（V117），
    // 未发布语言的产品由适配器按 published 状态过滤。
    existingPool: [...existingPool, ...precisionStaticCards, ...triaxialStaticCards],
    // 未映射的其它官网列表保留原有成员，不把传感器目录扩散到网关等列表。
    includeProduct: (product: any, { existing }: { existing: boolean }) => SENSOR_CIDS.has(cid)
      ? (CATEGORY_CIDS[product.categoryId] ?? ['261']).includes(cid)
      : existing,
    // 空目录图片沿用原卡片。两款精度产品最后校正标题/副行，其余字段按原逻辑保留。
    updateItem: (item: any, product: any, text: any) => applyPrecisionCardDisplay({
      ...item,
      name: text.name || item.name,
      img: product.image.src || item.img,
      url: text.url,
      href: text.url,
    }, product.id, locale),
    // 新发布产品使用官网接入字段；ProductCard 需明确消费 url/href 才能使用语言地址。
    createItem: (product: any, text: any) => ({
      id: product.id,
      img: product.image.src,
      name: text.name,
      conn: '',
      url: text.url,
      href: text.url,
    }),
  }) as (T & CatalogCardLinks)[];
}
