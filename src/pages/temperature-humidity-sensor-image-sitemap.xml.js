import content from '../data/thl-content.json';
import { climateImage } from '../components/thl/images.mjs';
export const prerender = true;
const escape = s => s.replace(/[<>&"']/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]));
export async function GET() {
  const names = [...new Set(['product-hero.webp', ...content.groups.map(g => g.image.name), ...content.applications.map(a => (a.image || content.groups.find(g => g.id === a.group).image).name)])];
  const images = await Promise.all(names.map((name, i) => climateImage(name, i === 0)));
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"><url><loc>https://www.hitelecom.com/product/temperature-humidity-sensor</loc>' + images.map(img => '<image:image><image:loc>' + escape(new URL(img.src, 'https://www.hitelecom.com').href) + '</image:loc></image:image>').join('') + '</url></urlset>';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
