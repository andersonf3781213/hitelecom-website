import {getImage} from 'astro:assets';
const masters=import.meta.glob('../../assets/air-quality/*.webp',{eager:true,import:'default'});
const cache=new Map();
export const sceneSizes='(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc((100vw - 72px) / 2), (max-width: 1439px) calc((100vw - 144px) / 3), 410px';
const find=(id)=>Object.entries(masters).find(([path])=>path.endsWith('/'+id+'.webp'))?.[1];
async function optimise(id,widths=[360,640,960]){
 const key=id+widths.join('-');if(cache.has(key))return cache.get(key);
 const source=find(id);if(!source)throw new Error('Missing image: '+id);
 const promise=Promise.all(widths.map(async width=>{const out=await getImage({src:source,width,format:'webp',quality:id.endsWith('-product')?82:74});return{src:out.src,width,height:Number(out.attributes.height)};})).then(variants=>({...variants[Math.min(1,variants.length-1)],srcset:variants.map(v=>`${v.src} ${v.width}w`).join(', '),variants}));cache.set(key,promise);return promise;
}
export async function getAssets(content){
 const names=[...new Set([...content.scenes.map(s=>s.id),content.focus.image])];
 return Object.fromEntries(await Promise.all(names.map(async id=>[id,await optimise(id)])));
}
export async function getHero(content){
 if(find(content.heroLocal))return {...await optimise(content.heroLocal,[400,Math.min(720,find(content.heroLocal).width)]),local:true,sizes:'(max-width: 699px) 270px, (max-width: 1023px) 40vw, 480px'};
 return {src:content.heroImage,width:640,height:640,local:false};
}
