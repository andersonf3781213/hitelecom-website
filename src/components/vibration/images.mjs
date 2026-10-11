import {getImage} from 'astro:assets';
const files=import.meta.glob('../../assets/vibration/*.{png,webp,jpg,jpeg}',{eager:true,import:'default'});
const imageResults=new Map();
export function vibrationImage(name,hero=false){
  const key=name+'|'+hero;
  if(!imageResults.has(key))imageResults.set(key,createVibrationImage(name,hero));
  return imageResults.get(key);
}
async function createVibrationImage(name,hero){
  const source=files['../../assets/vibration/'+name];
  if(!source)throw new Error('Missing vibration image: '+name);
  const widths=(hero?[320,480,640,800]:[360,720,960]).filter(width=>width<=source.width);
  if(!widths.length)widths.push(source.width);
  if(hero&&!widths.includes(source.width))widths.push(source.width);
  const outputs=await Promise.all(widths.map(width=>getImage({src:source,width,format:'webp',quality:hero?86:71})));
  return {src:outputs.at(-1).src,srcset:outputs.map((output,index)=>`${output.src} ${widths[index]}w`).join(', '),width:source.width,height:source.height};
}
