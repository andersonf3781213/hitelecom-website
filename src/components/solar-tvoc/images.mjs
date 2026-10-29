import {getImage} from 'astro:assets';
import transparentHeroURL from '../../assets/solar-tvoc/product-main-transparent.svg?url';
const files = import.meta.glob('../../assets/solar-tvoc/*.{png,webp,jpg,jpeg}', {eager:true, import:'default'});
const imageResults = new Map();
/** Preserve the supplied image; create responsive derivatives without upscaling. */
export function gasImage(name, purpose='scene') {
  // Native outline clip preserves the original product photograph and real exterior transparency.
  if (name === 'product-main-transparent.svg') return Promise.resolve({src:transparentHeroURL,srcset:`${transparentHeroURL} 1254w`,width:1254,height:1254});
  const key = name + '|' + purpose;
  if (!imageResults.has(key)) imageResults.set(key, createImage(name, purpose));
  return imageResults.get(key);
}
async function createImage(name, purpose) {
  const source = files['../../assets/solar-tvoc/' + name];
  if (!source) throw new Error('Missing solar TVOC image: ' + name);
  const requested = purpose === 'installation' ? [640,1280,1920,2560] : purpose === 'hero' ? [420,840,1254] : [360,720,960];
  const widths = requested.filter(width => width <= source.width);
  if (!widths.length) widths.push(source.width);
  const quality = purpose === 'hero' ? 92 : purpose === 'installation' ? 88 : 76;
  const outputs = await Promise.all(widths.map(width => getImage({src:source,width,format:'webp',quality})));
  return {src:outputs.at(-1).src,srcset:outputs.map((output,index) => `${output.src} ${widths[index]}w`).join(', '),width:source.width,height:source.height};
}
