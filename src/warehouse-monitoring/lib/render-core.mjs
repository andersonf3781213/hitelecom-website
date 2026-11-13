export const locales = ['en','zh','es','de','ja','fr','ru'];
export const languageTags = {en:'en',zh:'zh-CN',es:'es',de:'de',ja:'ja',fr:'fr',ru:'ru'};
export const localeNames = {en:'English',zh:'简体中文',es:'Español',de:'Deutsch',ja:'日本語',fr:'Français',ru:'Русский'};
const origin = 'https://www.hitelecom.com';
const basePath = '/solution/warehouse-monitoring';
export const route = locale => (locale === 'en' ? '' : '/'+locale)+basePath;
export const canonical = locale => origin+route(locale);
const escapeHTML = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const safeJSON = data => JSON.stringify(data).replace(/</g,'\\u003c');
const TITLE='warehouse_rack_tilt_monitoring_for_operations_ehs_hitelecom';
const DESCRIPTION='record_rack_angle_changes_between_inspections_locate_the_uprig';

/** Every translation is resolved at build time. No client-side translation or API. */
export function renderCore({locale,dict,headTemplate,bodyTemplate,faqKeys,routeMap={},preview=false}) {
 if(!locales.includes(locale))throw new Error('Unknown locale: '+locale);
 const t = key => {if(typeof dict[key]!=='string'||!dict[key])throw new Error(`Missing ${locale}:${key}`);return dict[key]};
 const replace = s => s.replace(/@@T:([^@]+)@@/g,(_,k)=>escapeHTML(t(k)));
 const current = canonical(locale), home=origin+(locale==='en'?'/':`/${locale}/`);
 let head=replace(headTemplate), body=replace(bodyTemplate).replaceAll('@@LOCALE_LABEL@@',locale.toUpperCase());
 const localizedURL = href => {
  if(!href.startsWith('/')&&!href.startsWith(origin+'/'))return href;
  const u=new URL(href,origin);
  if(u.origin!==origin)return href;
  const target=routeMap[u.pathname]?.[locale];
  if(target)u.pathname=target;
  // Untranslated destinations intentionally keep their known English URL.
  return u.href;
 };
 body=body.replace(/<(a|form)\b[^>]*>/g,tag=>{
  const l=tag.match(/data-locale="(en|zh|es|de|ja|fr|ru)"/)?.[1];
  if(l===locale)tag=tag.replace(/>$/,' aria-current="page">');
  return tag.replace(/\b(href|action)="([^"]*)"/g,(_,attr,href)=>{
   const next=l ? (preview?`Preview-${l.toUpperCase()}.html`:route(l)) : localizedURL(href.replaceAll('&amp;','&'));
   return `${attr}="${escapeHTML(next)}"`;
  });
 });
 if(['es','de','fr','ru'].includes(locale))body=body.replace(/>([+−±-]?\d+\.\d+°?)</g,(_,value)=>'>'+value.replace('.',',')+'<');
 const graph=[
  {'@type':'Organization','@id':origin+'/#organization',name:'Hitelecom',url:origin+'/'},
  {'@type':'WebPage','@id':current+'#webpage',url:current,name:t(TITLE),description:t(DESCRIPTION),inLanguage:languageTags[locale],publisher:{'@id':origin+'/#organization'},breadcrumb:{'@id':current+'#breadcrumb'}},
  {'@type':'BreadcrumbList','@id':current+'#breadcrumb',itemListElement:[
   {'@type':'ListItem',position:1,name:t('home'),item:home},
   {'@type':'ListItem',position:2,name:t('solutions'),item:origin+(locale==='en'?'':'/'+locale)+'/solution'},
   {'@type':'ListItem',position:3,name:t('page_breadcrumb'),item:current}
  ]},
  {'@type':'FAQPage','@id':current+'#warehouse-faq',isPartOf:{'@id':current+'#webpage'},inLanguage:languageTags[locale],mainEntity:faqKeys.map(f=>({'@type':'Question','@id':current+'#'+f.id,name:t(f.question),acceptedAnswer:{'@type':'Answer',text:t(f.answer)}}))}
 ];
 head+=`<meta name="robots" content="${preview?'noindex,nofollow':'index,follow,max-image-preview:large'}"><link rel="canonical" href="${current}"><meta property="og:url" content="${current}"><meta property="og:locale" content="${({en:'en_US',zh:'zh_CN',es:'es_ES',de:'de_DE',ja:'ja_JP',fr:'fr_FR',ru:'ru_RU'})[locale]}">`;
 head+=locales.map(l=>`<link rel="alternate" hreflang="${languageTags[l]}" href="${canonical(l)}">`).join('')+`<link rel="alternate" hreflang="x-default" href="${canonical('en')}">`;
 head+=`<script type="application/ld+json">${safeJSON({'@context':'https://schema.org','@graph':graph})}</script><link rel="stylesheet" href="/assets/warehouse-i18n/localization.css">`;
 body='<script id="warehouse-i18n-messages" type="application/json">'+safeJSON(Object.fromEntries(Object.entries(dict).filter(([k])=>k.startsWith('email_'))))+'</script>'+body;
 return {head,body,lang:languageTags[locale]};
}

export function sitemapXML() {
 return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'+locales.map(l=>'<url><loc>'+canonical(l)+'</loc>'+locales.map(a=>`<xhtml:link rel="alternate" hreflang="${languageTags[a]}" href="${canonical(a)}"/>`).join('')+`<xhtml:link rel="alternate" hreflang="x-default" href="${canonical('en')}"/></url>`).join('')+'</urlset>';
}
