/** Merge only the two English precision entries; preserve existing catalog records. */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { validateCatalog } from '../src/lib/catalog.mjs';
const args=process.argv.slice(2);
const rootIndex=args.indexOf('--root');
const root=path.resolve(rootIndex>=0?args[rootIndex+1]:process.cwd());
const file=path.join(root,'src/data/product-catalog.json');
const catalog=JSON.parse(await readFile(file,'utf8'));
const before=JSON.stringify(catalog);
const entries=[
 {id:'tilt-medium-precision-sensor',model:'H310-TS150M',accuracy:'±0.1°',grade:'Medium',sortOrder:31,image:'tilt-medium-precision-0-1.svg',summary:'H310-TS150M medium-precision tilt sensor with ±0.1° accuracy for local inclination trends and equipment orientation. Specify installation and reporting around your site.'},
 {id:'tilt-low-precision-sensor',model:'H310-TS100L',accuracy:'±1°',grade:'Low',sortOrder:32,image:'tilt-low-precision-1.svg',summary:'H310-TS100L low-precision tilt sensor with ±1° accuracy for economical multi-point inclination records on fixed assets such as outdoor light poles, warehouse racks and automated-storage structures.'},
];
const locales=['en','zh','es','de','ja','fr','ru'];
for(const entry of entries){
 const url='/product/'+entry.id;
 const name=`${entry.grade}-precision Tilt Sensor · ${entry.accuracy} · ${entry.model}`;
 let product=catalog.products.find(p=>p.id===entry.id);
 if(product && (product.slug!==entry.id || product.managedPage===true || product.locales.en?.url!==url))throw new Error(`Existing record needs manual merge: ${entry.id}`);
 if(!product){
  const texts=Object.fromEntries(locales.map(locale=>[locale,{name:'',summary:'',url:'',seoTitle:'',seoDescription:'',body:'',imageAlt:'',published:false}]));
  product={id:entry.id,slug:entry.id,categoryId:'tilt',sortOrder:entry.sortOrder,status:'published',managedPage:false,image:{src:'',alt:''},locales:texts};
  catalog.products.push(product);
 }
 Object.assign(product,{categoryId:'tilt',sortOrder:entry.sortOrder,status:'published',managedPage:false});
 product.image={src:'/images/products/'+entry.image,alt:`Hitelecom ${entry.model} ${entry.grade.toLowerCase()}-precision tilt sensor`};
 Object.assign(product.locales.en,{name,summary:entry.summary,url,seoTitle:`${entry.model} ${entry.accuracy} Tilt Sensor | Hitelecom`,seoDescription:entry.summary,imageAlt:product.image.alt,published:true});
}
const high=catalog.products.find(p=>p.id==='tilt-sensor');
if(high?.locales?.en)high.locales.en.name='High-precision Tilt Sensor · 0.01°';
const validation=validateCatalog(catalog);
if(!validation.valid)throw new Error(validation.errors.join('\n'));
const ordered=[...catalog.products].sort((a,b)=>a.sortOrder-b.sortOrder).map(p=>p.id);
const pressure=ordered.indexOf('pressure-sensor');
if(ordered[pressure+1]!==entries[0].id||ordered[pressure+2]!==entries[1].id)throw new Error('Review ordering: pressure must be followed by medium then low tilt.');
if(!args.includes('--check') && JSON.stringify(catalog)!==before)await writeFile(file,JSON.stringify(catalog,null,2)+'\n');
console.log(`${args.includes('--check')?'Validated':'Merged'} ${catalog.products.length} products; pressure → medium ±0.1° → low ±1°. Existing campaign retained.`);
