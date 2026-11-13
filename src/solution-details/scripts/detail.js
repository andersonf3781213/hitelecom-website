// 静态正文无需JS。此脚本只在浏览器本地准备邮件草稿，不提交或存储个人资料。
// 库区入口可展开其对应More区；原生details在关闭JS时仍可手动使用。
const reveal=(hash)=>{
  if(!hash||hash==='#')return;
  let node=document.getElementById(decodeURIComponent(hash.slice(1)));
  while(node){if(node.tagName==='DETAILS')node.open=true;node=node.parentElement;}
};
document.querySelectorAll('.scope-v2 a[href^="#"]').forEach(link=>link.addEventListener('click',()=>reveal(link.hash)));
window.addEventListener('hashchange',()=>reveal(location.hash));
reveal(location.hash);
const form=document.getElementById('detail-enquiry-form');
if(form){
  const panel=document.getElementById('brief-review');
  const message=document.getElementById('brief-text');
  const email=document.getElementById('brief-email');
  const status=document.getElementById('brief-status');
  const update=()=>{email.href=`mailto:sales@hitelecom.cn?subject=${encodeURIComponent('Project enquiry — '+form.dataset.solutionName)}&body=${encodeURIComponent(message.value)}`;};
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const data=new FormData(form);
    message.value=`Hello Hitelecom team,\n\nI would like to discuss ${form.dataset.solutionName}.\n\nName: ${data.get('name')}\nCompany: ${data.get('company')}\nBusiness email: ${data.get('email')}\nInstallation country / region: ${data.get('country')||'To be confirmed'}\n\nProject requirements:\n${data.get('requirements')}\n\nSource solution: ${form.dataset.solutionKey}\n\nBest regards,\n${data.get('name')}`;
    panel.hidden=false;status.textContent='';update();
    panel.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  });
  message.addEventListener('input',update);
  form.querySelectorAll('.enquiry-fields input,.enquiry-fields textarea').forEach(field=>field.addEventListener('input',()=>{panel.hidden=true;status.textContent='';}));
  document.getElementById('brief-copy').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(message.value);status.textContent='Brief copied. Paste it into your email to send.';}
    catch{message.focus();message.select();status.textContent='Select and copy the brief, then paste it into your email.';}
  });
  form.querySelector('fieldset').disabled=false;
}
