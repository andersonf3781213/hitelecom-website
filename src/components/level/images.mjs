import {getImage} from 'astro:assets';
const files=import.meta.glob('../../assets/level/*.{png,webp,jpg}',{eager:true,import:'default'});
const imageResults=new Map();
export function levelImage(name,hero=false){
  const key=name+'|'+hero;
  if(!imageResults.has(key))imageResults.set(key,createLevelImage(name,hero));
  return imageResults.get(key);
}
async function createLevelImage(name,hero){
  const source=files['../../assets/level/'+name];
  if(!source)throw new Error('Missing Liquid level image: '+name);
  const widths=(hero?[480,800]:[360,720,960]).filter(w=>w<=source.width);
  if(!widths.length)widths.push(source.width);
  const outputs=await Promise.all(widths.map(width=>getImage({src:source,width,format:'webp',quality:hero?83:58})));
  return{src:outputs.at(-1).src,srcset:outputs.map((o,i)=>`${o.src} ${widths[i]}w`).join(', '),width:source.width,height:source.height};
}
