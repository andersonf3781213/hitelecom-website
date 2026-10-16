import {getPublicProducts,sortExistingProducts} from './catalog.mjs';

function candidates(item){
  return [item?.id,item?.slug,item?.url,item?.href].filter(value=>typeof value==='string').map(value=>value.replace(/[?#].*$/,'').replace(/\/$/,'').split('/').at(-1));
}

/** Integrate with the official site's existing card data without replacing it.
 * createItem is wired once by Kimi to the official ProductCard's real shape.
 */
export function applyCatalogToExisting(existing,catalog,{locale='en',date,resolveId,createItem}={}){
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
  const present=new Set(existing.map(identify).filter(Boolean));
  const kept=existing.filter(item=>{
    const product=byId.get(identify(item));
    return !product||(product.status==='published'&&
      (product.managedPage!==true||product.locales?.[locale]?.published===true));
  });
  const additions=getPublicProducts(catalog,locale,{date}).filter(product=>product.managedPage&&!present.has(product.id));
  if(additions.length&&typeof createItem!=='function')throw new Error('新增产品已发布：请在官网接入 applyCatalogToExisting 的 createItem 映射。参见 README-KIMI.md。');
  const added=additions.map(product=>{
    const item=createItem(product,product.localized);
    if(!item||typeof item!=='object'||Array.isArray(item))throw new Error('createItem 必须返回官网 ProductCard 所需的产品对象。');
    if(identify(item)!==product.id)throw new Error(`createItem 需要保留产品 id 或 slug：${product.id}`);
    return item;
  });
  return sortExistingProducts([...kept,...added],catalog,{date,resolveId:identify});
}
