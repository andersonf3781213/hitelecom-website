/**
 * JSON-LD 结构化数据构建器（全站共用）
 * 所有页面级 schema 统一从这里生成，保证 @id 引用一致。
 */

export const SITE_URL = 'https://www.hitelecom.com';
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export interface CrumbItem {
  name: string;
  /** 末级可省略（当前页不需要自链） */
  url?: string;
}

/** BreadcrumbList：首页 > … > 当前页 */
export function breadcrumbLd(items: CrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      ...(it.url ? { item: it.url } : {}),
    })),
  };
}

export interface ListEntry {
  name: string;
  url: string;
  image?: string;
  description?: string;
}

/** ItemList：分类页产品清单 / 方案清单（GEO：列表语义化） */
export function itemListLd(entries: ListEntry[], pageUrl: string, name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${pageUrl}#list`,
    name,
    numberOfItems: entries.length,
    itemListElement: entries.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: e.name,
        url: e.url,
        ...(e.image ? { image: e.image } : {}),
        ...(e.description ? { description: e.description } : {}),
      },
    })),
  };
}
