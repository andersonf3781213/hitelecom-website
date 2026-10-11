import content from '../data/vibration-content.json';
import {vibrationImage} from '../components/vibration/images.mjs';
export const prerender=true;
const escape=s=>s.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]));
export async function GET(){
 const names=['product-hero.webp',...new Set(content.applications.map(a=>a.image.name))];
 const images=await Promise.all(names.map(name=>vibrationImage(name,name==='product-hero.webp')));
 const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"><url><loc>https://www.hitelecom.com/product/vibration-sensor</loc>'+images.map(img=>'<image:image><image:loc>'+escape(new URL(img.src,'https://www.hitelecom.com').href)+'</image:loc></image:image>').join('')+'</url></urlset>';
 return new Response(xml,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
}
