// Execute the actual adapter, product ID map and original list data in Node.
// astro:content is stubbed only because collection loading is outside this test.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { PRECISION_CARD_CONNECTIVITY, precisionCardRegistry, applyPrecisionCardDisplay } from '../src/lib/tilt-precision-cards.mjs';
const root=process.cwd();
const productSource=stripTypeScriptTypes((await readFile('src/data/product.ts','utf8')).replace("import { getCollection } from 'astro:content';","const getCollection = async () => [];"));
const product=await import('data:text/javascript;base64,'+Buffer.from(productSource).toString('base64'));
const catalog=JSON.parse(await readFile('src/data/product-catalog.json','utf8'));
const sourceTemplate=stripTypeScriptTypes(await readFile('src/lib/catalog-site.ts','utf8')).replace("import '../styles/tilt-precision-cards.css';",'');
async function loadApplyCatalog(records){
 let source=sourceTemplate.replace("import catalog from '../data/product-catalog.json';",'const catalog = '+JSON.stringify(records)+';');
 source=source.replace("import { productSlugs } from '../data/product';",'const productSlugs = '+JSON.stringify(product.productSlugs)+';');
 for(const module of ['catalog-adapter.mjs','tilt-precision-cards.mjs'])source=source.replace(JSON.stringify('./'+module),JSON.stringify(pathToFileURL(path.join(root,'src/lib',module)).href)).replace("'./"+module+"'",JSON.stringify(pathToFileURL(path.join(root,'src/lib',module)).href));
 return (await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'))).applyCatalog;
}
const applyCatalog=await loadApplyCatalog(catalog);
const list=product.productContent.en.lists['261'].products;
const pool=Object.values(product.productContent.en.lists).flatMap(lp=>lp.products);
const snapshot=JSON.stringify(pool);
const result=applyCatalog(list,'261','en',pool);
const id=p=>product.productSlugs[p.id]||p.id;
const ids=result.map(id);
const pressure=ids.indexOf('pressure-sensor');
assert.deepEqual(ids.slice(pressure+1,pressure+3),['tilt-medium-precision-sensor','tilt-low-precision-sensor']);
assert.equal(PRECISION_CARD_CONNECTIVITY,'NB-IoT | 4G LTE | LoRa','connectivity matches the official portfolio capitalization, order and separators');
assert.equal(precisionCardRegistry.length,2,'the original high-precision template is not duplicated as a static addition');
for(const expected of precisionCardRegistry){
 const card=result.find(p=>id(p)===expected.id);
 assert.ok(card);
 assert.equal(card.url,expected.path);assert.equal(card.href,card.url);assert.ok(card.img.startsWith('/images/products/'));
 assert.equal(card.name,expected.name,'short product title uses the original title row');
 assert.equal(card.conn,PRECISION_CARD_CONNECTIVITY,'the original connectivity row matches the other sensor cards');
 assert.equal(card.searchTerms,`${expected.accuracy} · ${expected.model}`,'accuracy and model remain searchable internal terms');
 assert.equal(Object.hasOwn(card,'precisionMeta'),false,'the obsolete visible metadata field is absent');
 assert.equal(card.conn.includes(expected.model),false,'model is not squeezed into the connectivity row');
 assert.equal(card.name.includes(expected.model),false,'model is not squeezed into the title');
 const tilt=applyCatalog(product.productContent.en.lists['267'].products,'267','en',pool);
 const tiltCard=tilt.find(p=>id(p)===expected.id);
 assert.ok(tiltCard,'new static product appears in the tilt category');
 assert.equal(tiltCard.name,expected.name);assert.equal(tiltCard.conn,PRECISION_CARD_CONNECTIVITY);assert.equal(tiltCard.searchTerms,expected.searchTerms);assert.equal(Object.hasOwn(tiltCard,'precisionMeta'),false);
 const pressureOnly=applyCatalog(product.productContent.en.lists['262'].products,'262','en',pool);
 assert.ok(!pressureOnly.some(p=>id(p)===card.id),'new tilt product does not leak into pressure-only category');
 for(const locale of ['zh','es','de','ja','fr','ru']){
  const localLists=product.productContent[locale]?.lists;
  if(!localLists?.['261'])continue;
  const localized=applyCatalog(localLists['261'].products,'261',locale,Object.values(localLists).flatMap(lp=>lp.products));
  const record=catalog.products.find(p=>p.id===expected.id);
  if(record?.locales?.[locale]?.published===true){
   // V117: six locales are published; the card must appear with the localized short name, no precision numbers or model
   const localCard=localized.find(p=>id(p)===expected.id);
   assert.ok(localCard,'published locale shows the card');
   assert.doesNotMatch(localCard.name+' '+localCard.conn,/[±°]|H310-TS/,'localized title/connectivity rows show no accuracy or model');
   assert.equal(localCard.conn,PRECISION_CARD_CONNECTIVITY);
  }else{
   assert.ok(!localized.some(p=>id(p)===card.id),'unpublished locale stays unpublished');
  }
  const injected=applyCatalog([...localLists['261'].products,card],'261',locale,[...pool,card]);
  if(record?.locales?.[locale]?.published===true){
   const injectedCard=injected.find(p=>id(p)===expected.id);
   assert.ok(injectedCard,'an English template yields the localized card for a published locale');
   assert.doesNotMatch(injectedCard.name,/[±°]|H310-TS/);
  }else{
   assert.ok(!injected.some(p=>id(p)===card.id),'an English template cannot activate an unpublished locale');
  }
 }
}
const precisionIds=new Set(precisionCardRegistry.map(p=>p.id));
const expectedTiltCards=[...precisionCardRegistry,{id:'tilt-sensor',name:'High-precision Tilt Sensor',conn:PRECISION_CARD_CONNECTIVITY,searchTerms:'0.01°'}];
const tiltDisplayIds=new Set(expectedTiltCards.map(p=>p.id));
for(const cid of ['261','267']){
 const cards=applyCatalog(product.productContent.en.lists[cid].products,cid,'en',pool);
 for(const expected of expectedTiltCards){
  const matches=cards.filter(item=>id(item)===expected.id);
  assert.equal(matches.length,1,'each high/medium/low card appears once');
  const card=matches[0];
  assert.equal(card.name,expected.name);assert.equal(card.conn,PRECISION_CARD_CONNECTIVITY);
  assert.equal(card.searchTerms,expected.searchTerms);assert.equal(Object.hasOwn(card,'precisionMeta'),false);
  assert.doesNotMatch(card.name+' '+card.conn,/[±°]|H310-TS/,'no accuracy or model is visible in the title/connectivity rows');
 }
 for(const card of cards.filter(item=>!tiltDisplayIds.has(id(item)))){
  const original=pool.find(item=>id(item)===id(card));
  assert.ok(original,'unrelated cards retain an original template');
  const record=catalog.products.find(p=>p.id===id(card));
  const text=record?.locales?.en;
  const expected=record?{...original,name:text.name||original.name,img:record.image.src||original.img,url:text.url,href:text.url}:original;
  assert.deepEqual(card,expected,'all unrelated card fields retain the existing adapter behavior');
 }
}
// A catalog published by an older installer must not overwrite the display fix.
const legacyCatalog=structuredClone(catalog);
for(const expected of expectedTiltCards)legacyCatalog.products.find(p=>p.id===expected.id).locales.en.name=`${expected.name} · ${expected.searchTerms}`;
const legacyApply=await loadApplyCatalog(legacyCatalog);
for(const cid of ['261','267']){
 const cards=legacyApply(product.productContent.en.lists[cid].products,cid,'en',pool);
 for(const expected of expectedTiltCards){
  const card=cards.find(item=>id(item)===expected.id);
  assert.equal(card.name,expected.name,'legacy long catalog names cannot return');
  assert.equal(card.conn,PRECISION_CARD_CONNECTIVITY);
  assert.equal(card.searchTerms,expected.searchTerms);
  assert.equal(Object.hasOwn(card,'precisionMeta'),false);
 }
}
const unknown={id:'tilt-custom-precision-sensor',name:'Custom tilt sensor',conn:'Custom configuration'};
assert.equal(applyPrecisionCardDisplay(unknown,unknown.id,'en'),unknown,'unknown precision models are not rewritten');
for(const expected of expectedTiltCards){
 const stale={id:expected.id,name:'Old long name',conn:'Old subtitle',precisionMeta:'Obsolete visible accuracy'};
 const normalized=applyPrecisionCardDisplay(stale,expected.id,'en');
 assert.equal(Object.hasOwn(normalized,'precisionMeta'),false,'old visible precisionMeta is stripped, not only set to undefined');
 assert.equal(stale.precisionMeta,'Obsolete visible accuracy','input card objects remain unchanged');
 assert.equal(normalized.searchTerms,expected.searchTerms);
}
for(const locale of ['en','zh','es','de','ja','fr','ru']){
 const high=applyPrecisionCardDisplay({id:'tilt-sensor',name:'Legacy high name',precisionMeta:'Legacy accuracy'},'tilt-sensor',locale);
 assert.equal(high.conn,PRECISION_CARD_CONNECTIVITY);assert.equal(high.searchTerms,'0.01°');assert.equal(Object.hasOwn(high,'precisionMeta'),false);
 assert.doesNotMatch(high.name,/[±°]|H310-TS/);
}
const unsupported={id:precisionCardRegistry[0].id,name:'Untouched locale name',conn:'Original subtitle'};
assert.equal(applyPrecisionCardDisplay(unsupported,unsupported.id,'xx'),unsupported,'unknown locales are not given an English fallback');
for(const locale of ['zh','es','de','ja','fr','ru','xx']){
 const cards=applyCatalog([], '267',locale,pool);
 if(locale==='xx'){
  assert.ok(!cards.some(card=>precisionIds.has(id(card))),'static templates do not publish unknown locales');
 }else{
  // published locales resolve through the injected templates with localized short names
  for(const expected of precisionCardRegistry){
   const card=cards.find(c=>id(c)===expected.id);
   const record=catalog.products.find(p=>p.id===expected.id);
   if(record?.locales?.[locale]?.published===true){
    assert.ok(card,'published locale resolves the static template');
    assert.doesNotMatch(card.name,/[±°]|H310-TS/);
   }else assert.ok(!card,'disabled locale stays disabled');
  }
 }
}
assert.equal(JSON.stringify(pool),snapshot,'official original product cards are not mutated');
assert.equal(result.find(p=>id(p)==='tilt-sensor').name,'High-precision Tilt Sensor');
console.log('Actual official list data + adapter: exactly one high/medium/low short-title card in 261/267, uniform NB-IoT | 4G LTE | LoRa, no visible precisionMeta, accuracy/model retained in internal searchTerms; legacy-name cleanup covered; pressure → medium → low; unrelated cards and unpublished locales unchanged.');
