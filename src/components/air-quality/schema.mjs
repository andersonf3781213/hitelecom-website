import stringsEn from './strings.en.mjs';

// 页面级 JSON-LD。多语言：prefix 为语言前缀（EN 为 ''），s 为该语言 schema 文案（strings.*.mjs 的 schema 段）。
// 图片地址一律取 Astro 构建产物（hero.src / assets[id].src），不硬编码哈希。
export function makeSchema(content,hero,assets,{prefix='',inLanguage='en',s=stringsEn.schema}={}){
 const url='https://www.hitelecom.com'+prefix+'/product/'+content.slug;
 const home='https://www.hitelecom.com'+(prefix||'');
 const absolute=src=>new URL(src,'https://www.hitelecom.com').href;
 const family={'@type':'ProductGroup','@id':url+'#product',name:s.familyName,description:content.heroText,url,brand:{'@type':'Brand',name:'Hitelecom'},manufacturer:{'@id':'https://www.hitelecom.com/#organization'},image:absolute(hero.src),variesBy:s.variesBy};
 if(content.key==='indoor')family.hasVariant=[{'@type':'Product',name:'Hitelecom '+content.startingModel.name,model:content.startingModel.name,description:s.variantDescription,isVariantOf:{'@id':url+'#product'},brand:{'@type':'Brand',name:'Hitelecom'}}];
 // Organization / WebSite 节点由 BaseLayout 全局实体图输出（邮箱双轨 .com），本页不再重复。
 const [bHome,bSensors,bAir,bSelf]=s.breadcrumb;
 return {'@context':'https://schema.org','@graph':[
 {'@type':'WebPage','@id':url+'#webpage',url,name:content.title,description:content.description,inLanguage,isPartOf:{'@id':'https://www.hitelecom.com/#website'},mainEntity:{'@id':url+'#product'},breadcrumb:{'@id':url+'#breadcrumb'},hasPart:[{'@id':url+'#faq'},{'@id':url+'#applications'}],dateModified:'2026-10-06'},family,
 {'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:[[bHome,home],[bSensors,home+'/product/lists/cid/261'],[bAir,home+'/product/lists/cid/265'],[bSelf,url]].map(([name,item],i)=>({'@type':'ListItem',position:i+1,name,item}))},
 {'@type':'FAQPage','@id':url+'#faq',inLanguage,mainEntity:content.faq.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))},
 {'@type':'ItemList','@id':url+'#applications',name:s.listName,itemListElement:content.scenes.map((scene,i)=>({'@type':'ListItem',position:i+1,name:scene.title,url:url+'#'+scene.id}))},
 ...content.scenes.map(scene=>({'@type':'ImageObject','@id':url+'#image-'+scene.id,contentUrl:absolute(assets[scene.id].src),caption:scene.alt+s.imageCaptionSuffix,creditText:s.imageCredit})),
 ...(content.heroConcept?[{'@type':'ImageObject','@id':url+'#concept-image',contentUrl:absolute(hero.src),caption:'Hitelecom outdoor enclosure design preview. Final production enclosure to follow.'}]:[])
 ]};
}
