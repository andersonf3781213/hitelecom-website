/** Remove the v2 precision/model row; retain model search as private metadata.
 * Recognises the original or our v1/v2/v3 expressions, rejects ambiguous source,
 * and validates every change before writing the real ProductCard component.
 */
import {readFile,writeFile,readdir} from 'node:fs/promises';
import path from 'node:path';
const args=process.argv.slice(2);
const option=flag=>{const i=args.indexOf(flag);return i<0?undefined:args[i+1];};
const root=path.resolve(option('--root')||process.cwd());
async function findCards(dir){
 const found=[];
 for(const entry of await readdir(dir,{withFileTypes:true})){
  if(entry.name.startsWith('.')||entry.name==='node_modules')continue;
  const file=path.join(dir,entry.name);
  if(entry.isDirectory())found.push(...await findCards(file));
  else if(entry.name==='ProductCard.astro')found.push(file);
 }
 return found;
}
const files=option('--file')?[path.resolve(root,option('--file'))]:await findCards(path.join(root,'src'));
if(files.length!==1)throw new Error(`Expected one ProductCard.astro, found ${files.length}. Use --file to select the real component.`);
const file=files[0],source=await readFile(file,'utf8');
const attributes=[...source.matchAll(/data-name=\{([^{}]+)\}/g)];
if(attributes.length!==1)throw new Error('Expected one simple data-name expression. No source was changed.');
const attribute=attributes[0],expr=attribute[1].trim();
const original=expr.match(/^([A-Za-z_$][\w$]*)\.name\.toLowerCase\(\)$/);
const combined=expr.match(/^\[([A-Za-z_$][\w$]*)\.name,\s*\1\.conn(?:,\s*\1\.(?:precisionMeta|searchTerms))?\]\.filter\(Boolean\)\.join\((['"]) \2\)\.toLowerCase\(\)$/);
const variable=original?.[1]||combined?.[1];
let meta,search,name;
if(variable){
 meta=`${variable}.precisionMeta`;name=`${variable}.name`;
 search=`[${variable}.name, ${variable}.conn, ${variable}.searchTerms].filter(Boolean).join(' ').toLowerCase()`;
}else if((expr==='name.toLowerCase()'||expr==="[name, conn].filter(Boolean).join(' ').toLowerCase()"||expr==="[name, conn, Astro.props.precisionMeta].filter(Boolean).join(' ').toLowerCase()"||expr==="[name, conn, Astro.props.searchTerms].filter(Boolean).join(' ').toLowerCase()")&&/\{[^{}]*\bname\b[^{}]*\bconn\b[^{}]*\}\s*=\s*Astro\.props/s.test(source)){
 meta='Astro.props.precisionMeta';name='name';
 search="[name, conn, Astro.props.searchTerms].filter(Boolean).join(' ').toLowerCase()";
}else throw new Error(`Unsupported data-name expression: ${expr}. No source was changed.`);
let updated=source.replace(attribute[0],`data-name={${search}}`);
const marker='data-precision-card-meta';
const snippet=`{${meta} && <div class="tilt-precision-card-meta" ${marker}>{${meta}}</div>}`;
const headings=[...updated.matchAll(/<div\b(?=[^>]*\bclass=["'][^"']*\bpro_2_mid_right_1_mid_2_1\b)[^>]*>[\s\S]*?<\/div>/g)];
const titleBody=headings.length===1?headings[0][0].replace(/^<div\b[^>]*>/,'').replace(/<\/div>$/,'').trim():null;
if(titleBody!==`{${name}}`)throw new Error('Expected one simple original product-title div. No source was changed.');
if(source.includes(marker)){
 const afterTitle=updated.slice(headings[0].index+headings[0][0].length).trimStart();
 if(!afterTitle.startsWith(snippet)||source.split(marker).length!==2)throw new Error('Existing precision metadata markup differs; merge it manually. No source was changed.');
 updated=updated.replace(snippet,'');
}
if(!args.includes('--check')&&updated!==source)await writeFile(file,updated);
console.log(`${updated===source?'Already complete':args.includes('--check')?'Ready to patch':'Patched'} ProductCard name/connectivity with private model search: ${path.relative(root,file)}`);
