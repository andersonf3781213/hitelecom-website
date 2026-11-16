import {parse, serialize} from 'parse5';
import {locales, localeCodes, supportPath, type Locale} from './config';

// 仅构建时运行：所有文案均进入静态 HTML，不在浏览器中替换页面语言。
// 使用精确词条匹配，避免对型号、URL、属性名或代码进行全局字符串替换。
const modules = import.meta.glob('./*.json', {eager:true, import:'default'});
export const dictionary = (locale:Locale) => modules[`./${locale}.json`] as Record<string,string>;
const normalize = (text:string) => text.replace(/\s+/g,' ').trim();
export function translate(locale:Locale, text:string):string {
  const key=normalize(text), dict=dictionary(locale);
  if (!dict) throw new Error(`Missing locale dictionary: ${locale}`);
  if (!key || !/[a-zA-Z]/.test(key)) return text;
  if (!(key in dict)) throw new Error(`Untranslated ${locale} text: ${key}`);
  return text.replace(/\S(?:[\s\S]*\S)?/,dict[key]);
}
function localLink(href:string,locale:Locale):string {
  if (!href.startsWith('https://www.hitelecom.com')) return href;
  const url=new URL(href);
  // 资源文件保留原始 URL；语言切换由 hreflang 单独处理。
  if (/^\/(?:downloads|upload|uploads|assets)\//.test(url.pathname)) return href;
  const base=url.pathname.replace(/^\/(zh|es|de|ja|fr|ru)(?=\/|$)/,'') || '/';
  // 只改官网已建立的栏目路由；不改云端、电话、邮箱或资源文件。
  if (!/^\/(?:$|product(?:\/|$)|solution(?:\/|$)|service(?:\/|$)|news(?:\/|$)|about(?:\/|$)|search(?:\/|$))/.test(base)) return href;
  return url.origin+(locale==='en'?'':'/'+locale)+base+url.search+url.hash;
}
export function localizeHtml(html:string,locale:Locale):string {
  const doc:any=parse(html,{scriptingEnabled:false});
  const attr=(n:any,k:string)=>n.attrs?.find((a:any)=>a.name===k)?.value;
  const set=(n:any,k:string,v:string)=>{const a=n.attrs?.find((a:any)=>a.name===k);if(a)a.value=v;else(n.attrs||=[]).push({name:k,value:v});};
  const remove=(n:any,k:string)=>{n.attrs=n.attrs?.filter((a:any)=>a.name!==k);};
  const jsonTranslate=(value:any):any=>typeof value==='string'?(dictionary(locale)[normalize(value)]??value):Array.isArray(value)?value.map(jsonTranslate):value&&typeof value==='object'?Object.fromEntries(Object.entries(value).map(([k,v])=>[k,jsonTranslate(v)])):value;
  const walk=(node:any,inLanguageButton=false)=>{
    if (node.nodeName==='#text') {node.value=translate(locale,node.value);return;}
    if (node.tagName==='script') {
      if (attr(node,'type')==='application/ld+json') {
        const text=node.childNodes?.find((n:any)=>n.nodeName==='#text');
        if(text)text.value=JSON.stringify(jsonTranslate(JSON.parse(text.value))).replace(/</g,'\\u003c');
      }
      return;
    }
    if (node.tagName==='style')return;
    const classes=(attr(node,'class')||'').split(' ');
    if(node.tagName==='option'&&!attr(node,'value'))set(node,'value',normalize(node.childNodes.map((n:any)=>n.value||'').join('')));
    const hreflang=attr(node,'hreflang');
    if(node.tagName==='a'&&hreflang){
      const target=localeCodes.find(l=>locales[l].lang===hreflang);
      if(target){set(node,'href',supportPath(target));set(node,'lang',locales[target].lang);if(target===locale)set(node,'aria-current','true');else remove(node,'aria-current');}
    }else if(node.tagName==='a'&&attr(node,'href'))set(node,'href',localLink(attr(node,'href'),locale));
    if(node.tagName==='form'&&attr(node,'action'))set(node,'action',localLink(attr(node,'action'),locale));
    for(const a of node.attrs||[]){
      if(['alt','aria-label','placeholder','title'].includes(a.name))a.value=translate(locale,a.value);
      if(node.tagName==='meta'&&a.name==='content'&&(attr(node,'name')==='description'||['og:title','og:description'].includes(attr(node,'property'))))a.value=translate(locale,a.value);
    }
    for(const child of node.childNodes||[])walk(child,inLanguageButton||classes.includes('lang-btn'));
    if (inLanguageButton&&node.tagName==='span')node.childNodes=[{nodeName:'#text',value:locales[locale].code,parentNode:node}];
    if(attr(node,'data-resource')!==undefined){
      const text=(n:any):string=>n.nodeName==='#text'?n.value:(n.childNodes||[]).map(text).join(' ');
      set(node,'data-search',(attr(node,'data-search')||'')+' '+normalize(text(node)));
    }
  };
  walk(doc);
  return serialize(doc);
}
