function init(){
 const root=document.querySelector('.aq-v2');if(!root||root.dataset.ready)return;root.dataset.ready='true';
 const cards=[...root.querySelectorAll('[data-scene-group]')],buttons=[...root.querySelectorAll('[data-filter]')],checks=[...root.querySelectorAll('.aq-option-check')],form=root.querySelector('#aq-brief-form');
 const labels=JSON.parse(root.dataset.optionLabels),base=JSON.parse(root.dataset.base),result=root.querySelector('#aq-brief-result'),clear=root.querySelector('#aq-clear-options'),status=root.querySelector('#aq-scenario-status');
 // 运行时文案随页面语言经 data-i18n 注入（词典见 strings.*.mjs），本脚本不含硬编码语言
 const m=JSON.parse(root.dataset.i18n||'{}');
 const tpl=(s,o)=>String(s||'').replace(/\{(\w+)\}/g,(_,k)=>o[k]??'');
 const selected=()=>checks.filter(c=>c.checked).map(c=>labels[c.value]);
 function selection(){const options=selected();root.querySelector('#aq-option-summary').textContent=options.join(' · ')||m.emptyOptionSummary;root.querySelector('#aq-form-options').textContent=options.join(' · ')||m.emptyFormOptions;clear.hidden=!options.length;result.hidden=true;return options;}
 function filter(group){if(!buttons.some(b=>b.dataset.filter===group))group='all';cards.forEach(c=>c.hidden=group!=='all'&&c.dataset.sceneGroup!==group);buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===group)));const n=cards.filter(c=>!c.hidden).length;root.querySelector('.aq-filter-status').textContent=tpl(n===1?m.applicationCountOne:m.applicationCountOther,{count:n});}
 function revealHash(){let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return false;}const card=cards.find(c=>c.id===id);if(card){filter(card.dataset.sceneGroup);return true;}const detail=document.getElementById(id);if(detail?.matches('.aq-faq-item'))detail.open=true;return false;}
 buttons.forEach(b=>b.addEventListener('click',()=>filter(b.dataset.filter)));if(!revealHash())filter(buttons[1]?.dataset.filter||'all');window.addEventListener('hashchange',revealHash);
 checks.forEach(c=>c.addEventListener('change',()=>{selection();status.textContent='';}));
 clear.addEventListener('click',()=>{checks.forEach(c=>c.checked=false);selection();status.textContent='';});
 form.addEventListener('input',()=>{result.hidden=true;});form.elements.namedItem('application').addEventListener('change',()=>{status.textContent='';result.hidden=true;});
 form.addEventListener('submit',event=>{event.preventDefault();root.querySelector('#aq-build-brief').click();});
 root.querySelectorAll('[data-project-scene]').forEach(a=>a.addEventListener('click',()=>{form.elements.namedItem('application').value=a.dataset.projectScene;const options=JSON.parse(a.dataset.recommend);checks.forEach(c=>{if(options.includes(c.value))c.checked=true;});selection();status.textContent=tpl(m.suggestionsAdded,{application:a.dataset.projectScene});}));
 root.querySelector('#aq-build-brief').addEventListener('click',()=>{
  const data=new FormData(form),value=n=>String(data.get(n)||'').trim()||m.notProvided,custom=selected();
  const text=tpl(m.emailBody,{application:value('application'),region:value('region'),points:value('points'),baseMeasurements:base.join(', '),additionalMeasurements:custom.join(', ')||m.noneSelected,requirements:value('requirements'),power:value('power'),platform:value('platform')});
  root.querySelector('#aq-brief-text').value=text;root.querySelector('#aq-email-brief').href=`mailto:sales@hitelecom.cn?subject=${encodeURIComponent(m.emailSubject)}&body=${encodeURIComponent(text)}`;root.querySelector('#aq-copy-status').textContent='';result.hidden=false;root.querySelector('#aq-brief-text').focus({preventScroll:true});
 });
 root.querySelector('#aq-copy-brief').addEventListener('click',async()=>{const field=root.querySelector('#aq-brief-text'),message=root.querySelector('#aq-copy-status');try{await navigator.clipboard.writeText(field.value);message.textContent=m.enquiryCopied;}catch{field.focus();field.select();message.textContent=m.enquirySelected;}});
 selection();
 const brief=root.querySelector('#project-brief');
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{document.documentElement.classList.toggle('aq-enquiry-in-view',entries.some(entry=>entry.isIntersecting));});
  observer.observe(brief);
  document.addEventListener('astro:before-swap',()=>{observer.disconnect();document.documentElement.classList.remove('aq-enquiry-in-view');},{once:true});
 }
}
init();document.addEventListener('astro:page-load',init);
