import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {validateCatalog} from '../src/lib/catalog.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'src/data/product-catalog.json'),'utf8'));
const result=validateCatalog(data);
if(!result.valid){console.error('目录配置未通过校验：\n'+result.errors.map(x=>' - '+x).join('\n'));process.exit(1);}
console.log(`Catalog validated: ${data.products.length} products, ${data.categories.length} categories.`);
