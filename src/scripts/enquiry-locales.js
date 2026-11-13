// The page is fully translated HTML; only validation and mail-draft UI uses JS.
export function readEnquiryUI(){
 const node=typeof document!=='undefined'&&document.getElementById('enquiry-locale');
 return node?JSON.parse(node.textContent):null;
}
export function buildLocalizedDraft(title,values,ui){
 const clean=v=>String(v??'').trim().replace(/\r\n?/g,'\n');
 const lines=[ui.hello,'',ui.intro+clean(title),'',ui.name+clean(values.name),
 ...(clean(values.company)?[ui.company+clean(values.company)]:[]),ui.email+clean(values.email),'',ui.requirements,clean(values.requirements),'',ui.regards,clean(values.name)];
 return 'mailto:sales@hitelecom.cn?subject='+encodeURIComponent(clean(title)+ui.enquiry)+'&body='+encodeURIComponent(lines.join('\r\n'));
}
