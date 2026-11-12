/**
 * 渐进增强：正文、图片、行业与FAQ已存在于静态HTML。
 * 这份脚本仅处理筛选、网络路径切换和本地询盘摘要，不承担内容渲染。
 */
for (const root of document.querySelectorAll('[data-solutions-root]')) {
  if (root.dataset.enhanced === 'true') continue;
  root.dataset.enhanced = 'true';
  const $ = (selector) => root.querySelector(selector);
  const $$ = (selector) => [...root.querySelectorAll(selector)];

  // 1. 手机导航使用原生details；关闭JS后仍可展开和跳转。
  const menu = $('.native-mobile-menu');
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { menu.open = false; }));
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu?.open) {
      menu.open = false;
      menu.querySelector('summary')?.focus();
    }
  });

  // 所有方案已在静态HTML中。原生details默认收起；脚本仅处理关闭及锚点展开。
  const scenes = $$('.scene-card');
  const revealTarget = (hash) => {
    if (!hash || hash === '#') return;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target || !root.contains(target)) return;
    if (target.id === 'enquiry') root.querySelector('.enquiry-drawer').open = true;
    let node = target;
    while (node && node !== root) { if (node.tagName === 'DETAILS') node.open = true; node = node.parentElement; }
  };
  const jumpToTarget = (hash) => { revealTarget(hash); };
  $$('a[href^="#"]').forEach(link => link.addEventListener('click', () => jumpToTarget(link.hash)));
  window.addEventListener('hashchange', () => revealTarget(location.hash));
  revealTarget(location.hash);
  $$('[data-close-scene]').forEach(button => button.addEventListener('click', () => {
    const scene = button.closest('.scene-card');
    scene.open = false;
    scene.querySelector('summary').focus({ preventScroll: true });
    scene.scrollIntoView({block:'start',behavior:'auto'});
  }));

  // 5. 本版本生成邮件草稿，不连接未知后端，也不会误报“已发送”。
  const form = $('#enquiry-form');
  const review = $('#enquiry-review');
  const message = $('#enquiry-text');
  const emailLink = $('#open-email');
  const clearReview = () => { review.hidden = true; $('#copy-status').textContent = ''; };
  $$('[data-interest]').forEach((link) => link.addEventListener('click', () => {
    $('#application').value = link.dataset.interest;
    clearReview();
  }));
  form.querySelectorAll('.form-grid input, .form-grid select, .form-grid textarea').forEach((field) => {
    field.addEventListener('input', clearReview);
    field.addEventListener('change', clearReview);
  });
  const updateEmail = () => {
    const subject = 'Hitelecom project enquiry — ' + (form.elements.application.value || 'Monitoring project');
    emailLink.href = `mailto:sales@hitelecom.cn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message.value)}`;
  };
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    message.value = `Hello Hitelecom team,\n\nI would like to discuss a monitoring project.\n\nName: ${data.get('name')}\nCompany: ${data.get('company')}\nBusiness email: ${data.get('email')}\nCountry / region: ${data.get('country') || 'To be confirmed'}\nApplication: ${data.get('application') || 'Please advise'}\n\nProject requirements:\n${data.get('requirements')}\n\nSource: Solutions homepage\n\nBest regards,\n${data.get('name')}`;
    review.hidden = false;
    updateEmail();
    review.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  });
  message.addEventListener('input', updateEmail);
  $('#copy-brief').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(message.value);
      $('#copy-status').textContent = 'Brief copied. Paste it into your email to send.';
    } catch {
      message.focus(); message.select();
      $('#copy-status').textContent = 'Select and copy the brief above, then paste it into your email.';
    }
  });
  // HTML默认禁用fieldset，避免JS缺失时浏览器原生GET提交泄露表单到URL。
  form.querySelector('fieldset').disabled = false;
  $$('[data-enhanced-only]').forEach((element) => { element.hidden = false; });

}
