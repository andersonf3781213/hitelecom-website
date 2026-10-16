/**
 * 官网侧目录适配封装（V109 目录管理模块接入）
 * - 既有产品：按 product-catalog.json 的 sortOrder/主推活动排序，卡片对象原样保留
 * - 后台新增并已发布的产品：按分类映射进入「全部」列表及对应子分类列表
 * 数据文件：src/data/product-catalog.json（后台保存即更新此文件）
 */
import catalog from '../data/product-catalog.json';
import { applyCatalogToExisting } from './catalog-adapter.mjs';
import { productSlugs } from '../data/product';

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

// 官网卡片 id 可能是数字（如 '270'）或字符串 slug；统一映射到目录产品 id
const resolveId = (p: { id?: string | number }) =>
  productSlugs[String(p.id)] ?? (typeof p.id === 'string' && p.id ? p.id : undefined);

export function applyCatalog<T>(products: T[], cid: string, locale: string): T[] {
  const scoped = {
    ...catalog,
    products: (catalog as any).products.filter(
      (p: any) => !p.managedPage || (CATEGORY_CIDS[p.categoryId] ?? ['261']).includes(cid),
    ),
  };
  return applyCatalogToExisting(products, scoped as any, {
    locale,
    resolveId: resolveId as any,
    // 新发布产品 → 官网 ProductCard 字段（img 为外链/根路径时 ProductCard 直出 <img>）
    createItem: (product: any, text: any) => ({
      id: product.id,
      img: product.image.src,
      name: text.name,
      conn: '',
    }),
  }) as T[];
}
