/**
 * 多语言配置与路由辅助
 * - 英文（默认）挂在根路径：/、/product …
 * - 中文统一加 /zh 前缀：/zh、/zh/product …；西语统一加 /es 前缀：/es、/es/product …
 * - URL 一律为无扩展名形态：Cloudflare Pages 会把 /about.html 308 到 /about，
 *   无扩展名正是平台 canonical；构建产物仍为 .html 文件（build.format='file'），
 *   Pages 对 /about 直接 200 服务 about.html，旧 .html 链接由平台 308 兼容。
 */

export const locales = ['en', 'zh', 'es', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'EN',
  zh: 'ZH',
  es: 'ES',
  de: 'DE',
};

/** html lang 属性值 */
export const htmlLang: Record<Locale, string> = {
  en: 'en',
  zh: 'zh-CN',
  es: 'es',
  de: 'de',
};

/** 非默认语言列表（用于生成 hreflang 互链与语言切换菜单） */
export const altLocalesOf = (current: Locale): Locale[] => locales.filter((x) => x !== current);

/** 将 '/product/#cate' 这类路径规范为 '/product#cate'（根路径保持 '/'；一律去 .html 后缀） */
function toPageUrl(path: string): string {
  const [pathname, hash] = path.split('#');
  if (pathname === '/' || pathname === '') return hash ? `/#${hash}` : '/';
  const noTrail = pathname.replace(/\/+$/, '').replace(/\.html$/, '');
  return hash ? `${noTrail}#${hash}` : noTrail;
}

/**
 * 将站内路径转换为当前语言的地址
 * l('/product/', 'zh') => '/zh/product'
 * l('/product/', 'es') => '/es/product'
 * l('/product/', 'en') => '/product'
 * l('/', 'es')        => '/es'
 */
export function l(href: string, locale: Locale): string {
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href; // 外部链接原样返回
  const clean = href.startsWith('/') ? href : `/${href}`;
  if (locale === defaultLocale) return toPageUrl(clean);
  if (clean === '/') return `/${locale}`;
  const [pathname, hash] = toPageUrl(clean).split('#');
  return hash ? `/${locale}${pathname}#${hash}` : `/${locale}${pathname}`;
}

/**
 * 当前页面在另一种语言下的地址（用于语言切换与 hreflang）。
 * pathname 为构建期实际地址（如 '/zh.html'、'/'）。
 */
export function alternateUrl(pathname: string, target: Locale): string {
  // build.format='file' 下首页的 pathname 可能是 '/index.html'，先归一化为 '/'
  const normalized = pathname.replace(/\/index\.html$/, '/');
  const noExt = normalized.replace(/\.html$/, '');
  // 剥掉任意非默认语言前缀（/zh、/es），再按目标语言重新加前缀
  const stripped = noExt.replace(/^\/(zh|es|de)(?=\/|$)/, '') || '/';
  return l(stripped === '/' ? '/' : `${stripped}/`, target);
}
