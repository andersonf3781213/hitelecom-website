/** Kimi：英文保持 /service，其余六语与官网既有语言前缀一致。 */
export const locales = {
  en: {lang:'en', label:'English', code:'EN', og:'en_US'},
  zh: {lang:'zh-CN', label:'简体中文', code:'ZH', og:'zh_CN'},
  es: {lang:'es', label:'Español', code:'ES', og:'es_ES'},
  de: {lang:'de', label:'Deutsch', code:'DE', og:'de_DE'},
  ja: {lang:'ja', label:'日本語', code:'JA', og:'ja_JP'},
  fr: {lang:'fr', label:'Français', code:'FR', og:'fr_FR'},
  ru: {lang:'ru', label:'Русский', code:'RU', og:'ru_RU'}
} as const;
export type Locale = keyof typeof locales;
export const localeCodes = Object.keys(locales) as Locale[];
export const siteOrigin = 'https://www.hitelecom.com';
export const supportPath = (locale:Locale) => `${locale==='en'?'':'/'+locale}/service`;
export const homePath = (locale:Locale) => locale==='en'?'/':`/${locale}/`;
