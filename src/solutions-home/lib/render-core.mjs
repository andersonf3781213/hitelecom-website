export const locales = ['en','zh','es','de','ja','fr','ru'];
export const languageTags = {en:'en',zh:'zh-CN',es:'es',de:'de',ja:'ja',fr:'fr',ru:'ru'};
export const localeNames = {en:'English',zh:'简体中文',es:'Español',de:'Deutsch',ja:'日本語',fr:'Français',ru:'Русский'};
export const route = (locale) => locale === 'en' ? '/solution' : `/${locale}/solution`;
export const canonical = (locale) => 'https://www.hitelecom.com'+route(locale);
const escapeHTML = (s) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const safeJSON = (x) => JSON.stringify(x).replace(/</g,'\\u003c');

/** Build-time localization only: the browser receives complete translated HTML. */
export function renderCore({locale,dict,headTemplate,bodyTemplate,schemaTemplate,faqKeys,preview=false}) {
  if(!locales.includes(locale)) throw new Error('Unknown locale: '+locale);
  const t=(key)=>{if(typeof dict[key]!=='string'||!dict[key])throw new Error(`Missing ${locale}:${key}`);return dict[key]};
  const replace=(s,escaped=true)=>s.replace(/@@T:([^@]+)@@/g,(_,key)=>escaped?escapeHTML(t(key)):t(key));
  const current=canonical(locale);
  let head=replace(headTemplate).replaceAll('@@CANONICAL@@',current).replaceAll('@@ROBOTS@@',preview?'noindex,nofollow':'index,follow,max-image-preview:large');
  let body=replace(bodyTemplate).replaceAll('@@LOCALE_LABEL@@',locale.toUpperCase());
  const changeURL=(href)=>{
    if(!href.startsWith('https://www.hitelecom.com/'))return href;
    let u=new URL(href); if(u.pathname.startsWith('/assets/'))return href;
    u.pathname=(locale==='en'?'':'/'+locale)+u.pathname;
    return u.href;
  };
  body=body.replace(/<(a|form)\b[^>]*>/g,tag=>tag.replace(/\b(href|action)="([^"]*)"/g,(whole,attr,href)=>{
    const lang=tag.match(/data-locale="(en|zh|es|de|ja|fr|ru)"/);
    let next=lang ? (preview?`./Preview-${lang[1].toUpperCase()}.html`:canonical(lang[1])) : changeURL(href.replaceAll('&amp;','&'));
    return `${attr}="${escapeHTML(next)}"`;
  }));
  const walk=(x)=>{
    if(typeof x==='string')return replace(x,false).replaceAll('https://www.hitelecom.com/solution',current);
    if(Array.isArray(x))return x.map(walk);
    if(x&&typeof x==='object')return Object.fromEntries(Object.entries(x).map(([k,v])=>[k,k==='inLanguage'?languageTags[locale]:walk(v)]));
    return x;
  };
  const schema=walk(schemaTemplate);
  const crumbs=schema['@graph'].find(x=>x['@type']==='BreadcrumbList');
  if(crumbs)crumbs.itemListElement[0].item='https://www.hitelecom.com'+(locale==='en'?'/':`/${locale}/`);
  schema['@graph'].push({'@type':'FAQPage','@id':current+'#project-essentials',inLanguage:languageTags[locale],mainEntity:faqKeys.map(f=>({'@type':'Question',name:t(f.question),acceptedAnswer:{'@type':'Answer',text:t(f.answer)}}))});
  head+=locales.map(l=>`<link rel="alternate" hreflang="${languageTags[l]}" href="${canonical(l)}">`).join('')+`<link rel="alternate" hreflang="x-default" href="${canonical('en')}"><meta property="og:locale" content="${({en:'en_US',zh:'zh_CN',es:'es_ES',de:'de_DE',ja:'ja_JP',fr:'fr_FR',ru:'ru_RU'})[locale]}"><script type="application/ld+json">${safeJSON(schema)}</script>`;
  const messages=Object.fromEntries(Object.entries(dict).filter(([k])=>k.startsWith('email_')||k.startsWith('copy_')));
  body=`<script id="ht-solutions-messages" type="application/json">${safeJSON(messages)}</script>`+body;
  if(locale==='zh') body=body.replaceAll('HITELECOM CLOUD','宏太云');
  return {head,body,lang:languageTags[locale]};
}

export function sitemapXML(){
 return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'+locales.map(l=>'<url><loc>'+canonical(l)+'</loc>'+locales.map(a=>`<xhtml:link rel="alternate" hreflang="${languageTags[a]}" href="${canonical(a)}"/>`).join('')+`<xhtml:link rel="alternate" hreflang="x-default" href="${canonical('en')}"/></url>`).join('')+'</urlset>';
}
