import { temperatureImage } from '../components/temperature/images.mjs';
import content from '../data/temperature-content.json';
export const prerender = true;
export async function GET() {
  const names=['product-hero.png',...content.groups.map(s=>s.image.name)];
  const images=await Promise.all(names.map((n,i)=>temperatureImage(n,i===0)));
  const xml=`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"><url><loc>https://www.hitelecom.com/product/temperature-sensor</loc>${images.map(i=>`<image:image><image:loc>https://www.hitelecom.com${i.src}</image:loc></image:image>`).join('')}</url></urlset>`;
  return new Response(xml,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
}
