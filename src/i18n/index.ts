/**
 * 多语言配置与路由辅助
 * - 英文（默认）挂在根路径：/、/product.html …
 * - 中文统一加 /zh 前缀：/zh.html、/zh/product.html …
 * - 全站使用 .html 文件式路径：任何静态服务器（含不做目录索引的
 *   预览网关 / OSS / 虚拟主机）都能直接访问，无需 rewrite 规则
 */

export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
};

/** html lang 属性值 */
export const htmlLang: Record<Locale, string> = {
  en: 'en',
  zh: 'zh-CN',
};

/** 将 '/product/#cate' 这类路径规范为 '/product.html#cate'（根路径保持 '/'） */
function toFileUrl(path: string): string {
  const [pathname, hash] = path.split('#');
  if (pathname === '/' || pathname === '') return hash ? `/#${hash}` : '/';
  const noTrail = pathname.replace(/\/+$/, '');
  const file = noTrail.endsWith('.html') ? noTrail : `${noTrail}.html`;
  return hash ? `${file}#${hash}` : file;
}

/**
 * 将站内路径转换为当前语言的地址
 * l('/product/', 'zh') => '/zh/product.html'
 * l('/product/', 'en') => '/product.html'
 * l('/', 'zh')        => '/zh.html'
 */
export function l(href: string, locale: Locale): string {
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href; // 外部链接原样返回
  const clean = href.startsWith('/') ? href : `/${href}`;
  if (locale === defaultLocale) return toFileUrl(clean);
  if (clean === '/') return '/zh.html';
  const [pathname, hash] = toFileUrl(clean).split('#');
  return hash ? `/zh${pathname}#${hash}` : `/zh${pathname}`;
}

/**
 * 当前页面在另一种语言下的地址（用于语言切换）。
 * pathname 为构建期实际地址（如 '/zh.html'、'/'）。
 */
export function alternateUrl(pathname: string, target: Locale): string {
  // build.format='file' 下首页的 pathname 可能是 '/index.html'，先归一化为 '/'
  const normalized = pathname.replace(/\/index\.html$/, '/');
  const noExt = normalized.replace(/\.html$/, '');
  const stripped = noExt.replace(/^\/zh(?=\/|$)/, '') || '/';
  return l(stripped === '/' ? '/' : `${stripped}/`, target);
}
