import {parse,parseFragment,serialize} from 'parse5';
import source from '../data/i18n/en.json';
import enquiryUI from './enquiry-ui.json';
import solutionTitles from './solution-titles.json';
import {locales,origin,pagePath,pageURL,type Locale} from './config';

const modules=import.meta.glob('../data/i18n/{zh,es,de,ja,fr,ru}.json',{eager:true,import:'default'}) as Record<string,Record<string,string>>;
const normalize=(v:string)=>v.trim().replace(/\s+/g,' ');
const sourceKeys=new Map(Object.entries(source).map(([k,v])=>[normalize(v),k]));
const get=(node:any,key:string)=>node.attrs?.find((a:any)=>a.name===key)?.value;
const set=(node:any,key:string,value:string)=>{
  const attr=node.attrs?.find((a:any)=>a.name===key);
  if(attr)attr.value=value;else(node.attrs??=[]).push({name:key,value});
};
const remove=(node:any,key:string)=>{node.attrs=(node.attrs||[]).filter((a:any)=>a.name!==key);};
const hasClass=(node:any,c:string)=>get(node,'class')?.split(/\s+/).includes(c);
const walk=(node:any,visit:(node:any)=>void)=>{visit(node);for(const child of node.childNodes||[])walk(child,visit);};
const textContent=(node:any):string=>node.nodeName==='#text'?node.value:(node.childNodes||[]).map(textContent).join('');
function append(parent:any,html:string){const f=parseFragment(html);for(const child of f.childNodes){child.parentNode=parent;parent.childNodes.push(child);}}
const escape=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const safeJSON=(v:unknown)=>JSON.stringify(v).replace(/</g,'\\u003c');

// A content dictionary translates rendered text nodes, attributes and JSON-LD at
// build time. This lets 01 retain its approved component layout while 02–12 keep
// their shared content model. Keys are stable hashes of the English source string.
export async function localizeHTML(input:string,locale:Locale,slug:string){
  const dictionary:Record<string,string>=locale.code==='en'?source:modules[`../data/i18n/${locale.code}.json`];
  if(!dictionary)throw new Error(`Missing translation dictionary: ${locale.code}`);
  const translate=(value:string):string=>{
    const key=sourceKeys.get(normalize(value));
    if(!key){const title=(solutionTitles as Record<string,Partial<Record<Locale['code'],string>>>)[normalize(value)]?.[locale.code];return title?value.replace(value.trim(),title):value;}
    const translated=dictionary[key];
    if(typeof translated!=='string'||!translated.trim())throw new Error(`Missing ${locale.code} translation ${key}: ${value.slice(0,100)}`);
    return value.replace(value.trim(),translated);
  };
  const localURL=(value:string)=>{
    if(!value.startsWith('/')&&!value.startsWith(origin+'/'))return value;
    const url=new URL(value,origin);
    const from=locales.find(l=>url.pathname.startsWith(l.prefix+'/solution/'));
    const targetSlug=from?url.pathname.slice((from.prefix+'/solution/').length):'';
    if(!from||!/^[a-z0-9-]+$/.test(targetSlug))return value;
    return (value.startsWith('https:')?pageURL(locale,targetSlug):pagePath(locale,targetSlug))+url.search+url.hash;
  };
  const doc:any=parse(input,{scriptingEnabled:false});
  let head:any,body:any,pageTitle='',originalTitle='';
  walk(doc,node=>{if(node.tagName==='head')head=node;if(node.tagName==='body')body=node;if(node.tagName==='title'&&node.parentNode?.tagName==='head'){originalTitle=textContent(node);pageTitle=translate(originalTitle);}});
  const translateSchema=(v:any,key=''):any=>{
    if(Array.isArray(v))return v.map(x=>translateSchema(x));
    if(v&&typeof v==='object')return Object.fromEntries(Object.entries(v).map(([k,x])=>[k,translateSchema(x,k)]));
    if(typeof v!=='string')return v;
    if(key==='inLanguage')return locale.lang;
    if(v.startsWith('https://'))return localURL(v);
    if(key==='name'&&pageTitle&&v===originalTitle.replace(' | Hitelecom',''))return pageTitle.replace(/\s*\|\s*Hitelecom$/,'');
    return translate(v);
  };
  walk(doc,node=>{
    if(node.tagName==='html')set(node,'lang',locale.lang);
    if(locale.code!=='en'&&node.tagName==='svg'&&hasClass(node.parentNode,'series-diagram')){
      const labels:any[]=[];walk(node,n=>{if(n.tagName==='text'&&get(n,'y')==='326')labels.push(n);});
      labels.forEach((label,index)=>{set(label,'x',String(680*(index+.5)/labels.length));set(label,'text-anchor','middle');});
    }
    if(node.nodeName==='#text'&&!['script','style'].includes(node.parentNode?.tagName))node.value=translate(node.value);
    for(const attr of node.attrs||[]){
      if(['alt','title','placeholder','aria-label','data-label','data-solution'].includes(attr.name))attr.value=translate(attr.value);
      if(attr.name==='href')attr.value=localURL(attr.value);
    }
    if(node.tagName==='meta'){
      const name=get(node,'name')||get(node,'property');
      if(['description','twitter:title','twitter:description','og:title','og:description','og:image:alt'].includes(name))set(node,'content',translate(get(node,'content')||''));
      if(name==='og:url')set(node,'content',pageURL(locale,slug));
    }
    if(node.tagName==='link'&&get(node,'rel')==='canonical')set(node,'href',pageURL(locale,slug));
    if(node.tagName==='script'&&get(node,'type')==='application/ld+json'){
      const data=translateSchema(JSON.parse(textContent(node)));
      const graph=data['@graph']||[data];
      for(const item of graph)if(['FAQPage','WebPage'].includes(item['@type']))item.inLanguage=locale.lang;
      node.childNodes=[{nodeName:'#text',value:safeJSON(data),parentNode:node}];
    }
    if(node.tagName==='a'&&get(node,'hreflang')){
      const target=locales.find(l=>l.lang===get(node,'hreflang'));
      if(target){set(node,'href',pagePath(target,slug));if(target.code===locale.code)set(node,'aria-current','page');else remove(node,'aria-current');}
    }
    if(hasClass(node,'lang-btn')){
      const label=node.childNodes.find((n:any)=>n.tagName==='span');
      if(label)label.childNodes=[{nodeName:'#text',value:locale.label,parentNode:label}];
    }
  });
  for(const target of locales)append(head,`<link rel="alternate" hreflang="${target.lang}" href="${pageURL(target,slug)}">`);
  append(head,`<link rel="alternate" hreflang="x-default" href="${pageURL(locales[0],slug)}"><meta property="og:locale" content="${locale.og}">`);
  for(const target of locales.filter(l=>l.code!==locale.code))append(head,`<meta property="og:locale:alternate" content="${target.og}">`);
  // Provide a return-to-English link in the original mobile language menu.
  walk(body,node=>{if(hasClass(node,'mobile-menu-foot')&&!node.childNodes.some((n:any)=>get(n,'hreflang')==='en'))append(node,`<a href="${pagePath(locales[0],slug)}" hreflang="en"${locale.code==='en'?' aria-current="page"':''}>EN <span aria-hidden="true">→</span></a>`);});
  append(body,`<script type="application/json" id="enquiry-locale">${safeJSON(enquiryUI[locale.code])}</script>`);
  append(head,`<style data-multilingual-layout>
  html:not([lang="en"]) .ht-site-shell .footer-col{min-width:0}
  html:not([lang="en"]) .ht-site-shell .footer-col :is(a,p){overflow-wrap:anywhere;hyphens:auto}
  html:not([lang="en"]) .scope-v2 :is(h1,h2,h3,p,dd,a,button,summary){overflow-wrap:anywhere}
  html:not([lang="en"]) .scope-v2 :is(.hero-copy,.hero-picture,.w17-enquiry-intro,.w17-enquiry-card,.w17-faq-heading,.w17-faq-list){min-width:0}
  html:not([lang="en"]) .w17-next-inner a{min-width:0;line-height:1.35}
  html:not([lang="en"]) .series-anchor-nav .v2-wrap{gap:22px}
  html:not([lang="en"]) .series-hero h1{font-size:clamp(39px,5vw,76px)}
  html[lang="zh-CN"] .scope-v2,html[lang="ja"] .scope-v2{font-family:Inter,"Noto Sans CJK SC","Noto Sans CJK JP","Microsoft YaHei","Hiragino Kaku Gothic ProN",system-ui,sans-serif}
  html[lang="zh-CN"] .scope-v2 :is(h1,h2,h3),html[lang="ja"] .scope-v2 :is(h1,h2,h3){letter-spacing:-.025em;line-height:1.3;word-break:normal;overflow-wrap:break-word}
  html[lang="zh-CN"] .series-eyebrow,html[lang="ja"] .series-eyebrow{letter-spacing:.08em}
  html:not([lang="en"]) .series-diagram svg text:not(.point-label){font-size:11.5px!important;font-family:Arial,"Noto Sans CJK SC","Noto Sans CJK JP",system-ui,sans-serif}
  @media(max-width:1100px){html:not([lang="en"]) .ht-site-shell .main-nav{display:none}html:not([lang="en"]) .ht-site-shell .menu-open{display:flex}}
  @media(max-width:540px){html:not([lang="en"]) .series-hero h1{font-size:39px}html:not([lang="en"]) .w17-next-inner a{font-size:19px}}
  </style>`);
  return serialize(doc);
}
