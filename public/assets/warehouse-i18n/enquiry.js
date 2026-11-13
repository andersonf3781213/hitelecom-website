(()=>{
 const messages=JSON.parse(document.getElementById('warehouse-i18n-messages').textContent);
 const form=document.getElementById('warehouse-enquiry-simple');
 if(!form)return;
 const status=document.getElementById('warehouse-enquiry-status');
 form.querySelector('fieldset').disabled=false;
 form.addEventListener('submit',event=>{
  event.preventDefault();
  for(const key of ['name','requirements']){
   const field=form.elements.namedItem(key);
   field.setCustomValidity(field.value.trim()?'':messages.email_required);
  }
  if(!form.reportValidity())return;
  const data=new FormData(form), value=key=>String(data.get(key)||'').trim().replace(/\r\n?/g,'\n');
  const lines=[messages.email_greeting,'',messages.email_intro,'',messages.email_name+': '+value('name'),
   ...(value('company')?[messages.email_company+': '+value('company')]:[]),
   messages.email_email+': '+value('email'),'',messages.email_requirements,value('requirements'),'',messages.email_closing,value('name')];
  status.textContent=messages.email_status;
  window.location.assign('mailto:sales@hitelecom.cn?subject='+encodeURIComponent(messages.email_subject)+'&body='+encodeURIComponent(lines.join('\r\n')));
 });
 form.addEventListener('input',event=>{event.target.setCustomValidity?.('');status.textContent=''});
 const openHash=hash=>{
  if(!hash||hash==='#')return;
  let target;try{target=document.getElementById(decodeURIComponent(hash.slice(1)))}catch{return}
  while(target){if(target.tagName==='DETAILS')target.open=true;target=target.parentElement}
 };
 document.querySelectorAll('.scope-v2 a[href^="#"]').forEach(a=>a.addEventListener('click',()=>openHash(a.hash)));
 window.addEventListener('hashchange',()=>openHash(location.hash));openHash(location.hash);
})();
