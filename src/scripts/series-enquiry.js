import {readEnquiryUI,buildLocalizedDraft} from './enquiry-locales.js';
// 仅准备访客的邮件草稿；不存储个人资料，不调用后台，不自动发信。
export function buildSeriesEnquiryMailto(title, values, ui) {
  if(ui)return buildLocalizedDraft(title,values,ui);
  const clean=value=>String(value??'').trim().replace(/\r\n?/g,'\n');
  const body=['Hello Hitelecom team,','','I would like to discuss '+clean(title)+'.','',
    'Name: '+clean(values.name),...(clean(values.company)?['Company: '+clean(values.company)]:[]),
    'Business email: '+clean(values.email),'','Project requirements:',clean(values.requirements),'','Best regards,',clean(values.name)]
    .join('\n').replace(/\n/g,'\r\n');
  return 'mailto:sales@hitelecom.cn?subject='+encodeURIComponent(clean(title)+' enquiry')+'&body='+encodeURIComponent(body);
}
if(typeof document!=='undefined'){
  const form=document.querySelector('[data-series-enquiry]');
  if(form){
    const status=form.querySelector('[role="status"]');
    const ui=readEnquiryUI();
    form.querySelector('fieldset').disabled=false;
    form.addEventListener('submit',event=>{
      event.preventDefault();
      for(const key of ['name','requirements']){const field=form.elements.namedItem(key);field.setCustomValidity(field.value.trim()?'':(ui?.required||'Please enter this information.'));}
      if(!form.reportValidity())return;
      const data=new FormData(form);
      status.textContent=ui?.opening||'Opening an email draft. Review it before sending.';
      window.location.assign(buildSeriesEnquiryMailto(form.dataset.solution,Object.fromEntries(data),ui));
    });
    form.addEventListener('input',event=>{event.target.setCustomValidity?.('');status.textContent='';});
  }
}
