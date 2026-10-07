import { getImage } from 'astro:assets';
const files = import.meta.glob('../../assets/tilt/*.webp', { eager: true, import: 'default' });
export async function tiltImage(name, hero = false) {
  const src = files['../../assets/tilt/' + name];
  if (!src) throw new Error('Missing tilt image: ' + name);
  const featured = ['warehouse-racking.webp','industrial-moulding-machine.webp'].includes(name);
  const widths = hero ? [360, 627] : featured ? [360, 720, 1080] : [360, 720];
  const outputs = await Promise.all(widths.map(width => getImage({src, width, format: 'webp', quality: hero ? 82 : 67})));
  return { src: outputs.at(-1).src, srcset: outputs.map((o,i) => `${o.src} ${widths[i]}w`).join(', '), width: src.width, height: src.height };
}
