// English keeps the approved route. Other locales use explicit static prefixes.
// Change prefixes here only after agreeing redirects with the existing website.
export const origin = 'https://www.hitelecom.com';
export const locales = [
  {code:'en', lang:'en', prefix:'', label:'EN', native:'English', og:'en_US'},
  {code:'zh', lang:'zh-CN', prefix:'/zh', label:'中文', native:'简体中文', og:'zh_CN'},
  {code:'es', lang:'es', prefix:'/es', label:'ES', native:'Español', og:'es_ES'},
  {code:'de', lang:'de', prefix:'/de', label:'DE', native:'Deutsch', og:'de_DE'},
  {code:'ja', lang:'ja', prefix:'/ja', label:'日本語', native:'日本語', og:'ja_JP'},
  {code:'fr', lang:'fr', prefix:'/fr', label:'FR', native:'Français', og:'fr_FR'},
  {code:'ru', lang:'ru', prefix:'/ru', label:'RU', native:'Русский', og:'ru_RU'},
] as const;
export type Locale = typeof locales[number];
export const pagePath = (locale:Locale,slug:string) => `${locale.prefix}/solution/${slug}`;
export const pageURL = (locale:Locale,slug:string) => origin + pagePath(locale,slug);
