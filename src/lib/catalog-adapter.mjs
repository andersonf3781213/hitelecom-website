import {getPublicProducts,sortExistingProducts} from './catalog.mjs';

function candidates(item){
  return [item?.id,item?.slug,item?.url,item?.href].filter(value=>typeof value==='string').map(value=>value.replace(/[?#].*$/,'').replace(/\/$/,'').split('/').at(-1));
}

/** Integrate catalog content without guessing the official site's card shape.
 * updateItem preserves the site's existing fields; createItem maps new managed pages.
 * A full existingPool lets a category move reuse the original card in its new list.
 */
export function applyCatalogToExisting(existing,catalog,{locale='en',date,resolveId,createItem,updateItem,includeProduct=()=>true,existingPool=[]}={}){
  const byId=new Map(catalog.products.map(product=>[product.id,product]));
  const bySlug=new Map(catalog.products.map(product=>[product.slug,product]));
  const identify=item=>{
    const explicit=resolveId?.(item);
    if(typeof explicit==='string')return byId.get(explicit)?.id||bySlug.get(explicit)?.id||explicit;
    for(const candidate of candidates(item)){
      const product=byId.get(candidate)||bySlug.get(candidate);
      if(product)return product.id;
    }
    return undefined;
  };
  const checkItem=(item,product,kind)=>{
    if(!item||typeof item!=='object'||Array.isArray(item))throw new Error(`${kind} 必须返回官网 ProductCard 所需的产品对象。`);
    if(identify(item)!==product.id)throw new Error(`${kind} 需要保留产品 id 或 slug：${product.id}`);
    return item;
  };
  const update=(item,product)=>typeof updateItem==='function'
    ?checkItem(updateItem(item,product,product.locales[locale]),product,'updateItem'):item;
  const present=new Set(existing.map(identify).filter(Boolean));
  const kept=existing.flatMap(item=>{
    const product=byId.get(identify(item));
    if(!product)return [item];
    if(product.status!=='published'||product.locales?.[locale]?.published!==true||!includeProduct(product,{existing:true}))return [];
    return [update(item,product)];
  });
  const templates=new Map();
  for(const item of existingPool){
    const id=identify(item);
    if(id&&!templates.has(id))templates.set(id,item);
  }
  const additions=getPublicProducts(catalog,locale,{date}).filter(product=>
    !present.has(product.id)&&includeProduct(product,{existing:false})&&(product.managedPage||templates.has(product.id)));
  const added=additions.map(product=>{
    if(templates.has(product.id))return update(templates.get(product.id),product);
    if(typeof createItem!=='function')throw new Error('新增产品已发布：请在官网接入 applyCatalogToExisting 的 createItem 映射。参见 README-KIMI.md。');
    return checkItem(createItem(product,product.localized),product,'createItem');
  });
  return sortExistingProducts([...kept,...added],catalog,{date,resolveId:identify});
}
