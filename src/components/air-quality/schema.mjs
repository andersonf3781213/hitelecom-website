export function makeSchema(content,hero,assets){
 const url='https://www.hitelecom.com/product/'+content.slug;
 const absolute=s=>new URL(s,'https://www.hitelecom.com').href;
 const family={'@type':'ProductGroup','@id':url+'#product',name:content.key==='indoor'?'Hitelecom H310-AQ Indoor Air Quality Sensor Series':'Hitelecom Outdoor Air Quality and Gas Monitoring Family',description:content.heroText,url,brand:{'@type':'Brand',name:'Hitelecom'},manufacturer:{'@id':'https://www.hitelecom.com/#organization'},image:absolute(hero.src),variesBy:'Sensing configuration'};
 if(content.key==='indoor')family.hasVariant=[{'@type':'Product',name:'Hitelecom '+content.startingModel.name,model:content.startingModel.name,description:'Temperature, relative humidity, atmospheric pressure and CO₂ starting configuration.',isVariantOf:{'@id':url+'#product'},brand:{'@type':'Brand',name:'Hitelecom'}}];
 // Organization / WebSite 节点由 BaseLayout 全局实体图输出（邮箱双轨 .com），本页不再重复。
 return {'@context':'https://schema.org','@graph':[
 {'@type':'WebPage','@id':url+'#webpage',url,name:content.title,description:content.description,inLanguage:'en',isPartOf:{'@id':'https://www.hitelecom.com/#website'},mainEntity:{'@id':url+'#product'},breadcrumb:{'@id':url+'#breadcrumb'},hasPart:[{'@id':url+'#faq'},{'@id':url+'#applications'}],dateModified:'2026-10-06'},family,
 {'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:[['Home','https://www.hitelecom.com/'],['IoT Sensors','https://www.hitelecom.com/product/lists/cid/261'],['Air Quality','https://www.hitelecom.com/product/lists/cid/265'],['Indoor Air Quality Sensor',url]].map(([name,item],i)=>({'@type':'ListItem',position:i+1,name,item}))},
 {'@type':'FAQPage','@id':url+'#faq',mainEntity:content.faq.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))},
 {'@type':'ItemList','@id':url+'#applications',name:content.label+' applications',itemListElement:content.scenes.map((s,i)=>({'@type':'ListItem',position:i+1,name:s.title,url:url+'#'+s.id}))},
 ...content.scenes.map(s=>({'@type':'ImageObject','@id':url+'#image-'+s.id,contentUrl:absolute(assets[s.id].src),caption:s.alt+' — AI-generated application illustration.',creditText:'AI-generated illustration, not a customer installation.'})),
 ...(content.heroConcept?[{'@type':'ImageObject','@id':url+'#concept-image',contentUrl:absolute(hero.src),caption:'Hitelecom outdoor enclosure design preview. Final production enclosure to follow.'}]:[])
 ]};
}
