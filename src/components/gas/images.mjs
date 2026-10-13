import {getImage} from 'astro:assets';
const files=import.meta.glob('../../assets/gas/*.{png,webp,jpg}',{eager:true,import:'default'});
const imageResults=new Map();
export function gasImage(name,hero=false){
  const key=name+'|'+hero;
  if(!imageResults.has(key))imageResults.set(key,createGasImage(name,hero));
  return imageResults.get(key);
}
async function createGasImage(name,hero){
  const source=files['../../assets/gas/'+name];
  if(!source)throw new Error('Missing Custom gas image: '+name);
  const widths=[360,720,960].filter(w=>w<=source.width);
  if(!widths.length)widths.push(source.width);
  const outputs=await Promise.all(widths.map(width=>getImage({src:source,width,format:'webp',quality:58})));
  return{src:outputs.at(-1).src,srcset:outputs.map((o,i)=>`${o.src} ${widths[i]}w`).join(', '),width:source.width,height:source.height};
}
