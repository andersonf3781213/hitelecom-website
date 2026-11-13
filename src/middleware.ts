import {defineMiddleware} from 'astro:middleware';
import {locales} from './i18n/config';
import {localizeHTML} from './i18n/localize';

// Runs during Astro prerendering. Visitors and crawlers receive complete translated
// HTML. No client-side language fetch, translation script or framework hydration.
export const onRequest=defineMiddleware(async (context,next)=>{
  const response=await next();
  const pathname=context.url.pathname.replace(/\/$/,'').replace(/\.html$/,'');
  const locale=locales.find(l=>pathname.startsWith(l.prefix+'/solution/'));
  const slug=locale?pathname.slice((locale.prefix+'/solution/').length):'';
  if(!locale||!/^[a-z0-9-]+$/.test(slug)||response.status!==200||!response.headers.get('content-type')?.includes('text/html'))return response;
  const html=await localizeHTML(await response.text(),locale,slug);
  const headers=new Headers(response.headers);headers.delete('content-length');
  headers.set('Content-Language',locale.lang);
  return new Response(html,{status:response.status,headers});
});
