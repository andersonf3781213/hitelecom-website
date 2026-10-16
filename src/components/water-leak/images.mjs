import {getImage} from 'astro:assets';
const files=import.meta.glob('../../assets/water-leak/*.{png,webp,jpg}',{eager:true,import:'default'});
const imageResults=new Map();
export function waterLeakImage(name,hero=false){
  const key=name+'|'+hero;
  if(!imageResults.has(key))imageResults.set(key,createWaterLeakImage(name,hero));
  return imageResults.get(key);
}
async function createWaterLeakImage(name,hero){
  const source=files['../../assets/water-leak/'+name];
  if(!source)throw new Error('Missing water-leak image: '+name);
  const premiumCover=name==='data-center-premium.webp';
  const widths=(hero?[480,800,992]:premiumCover?[360,720,960]:[360,720,960]).filter(w=>w<=source.width);
  if(!widths.length)widths.push(source.width);
  if(!hero&&source.width<720&&!widths.includes(source.width))widths.push(source.width);
  const outputs=await Promise.all(widths.map(width=>getImage({src:source,width,format:'webp',quality:hero?83:premiumCover?78:68})));
  return{src:outputs.at(-1).src,srcset:outputs.map((o,i)=>`${o.src} ${widths[i]}w`).join(', '),width:source.width,height:source.height};
}
