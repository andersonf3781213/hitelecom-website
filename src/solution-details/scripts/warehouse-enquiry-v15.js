// 只在访客点击后，把咨询信息填入其邮件应用；本页不发送邮件或提交到服务器。
// 单独导出纯函数，便于交付时核对中文、换行和URI编码，不依赖浏览器测试发件。
export function buildWarehouseEnquiryMailto(values) {
  const clean = value => String(value ?? '').trim().replace(/\r\n?/g, '\n');
  const name = clean(values.name);
  const company = clean(values.company);
  const email = clean(values.email);
  const requirements = clean(values.requirements);
  const lines = [
    'Hello Hitelecom team,', '',
    'I would like to discuss warehouse monitoring.', '',
    `Name: ${name}`,
    ...(company ? [`Company: ${company}`] : []),
    `Business email: ${email}`, '',
    'What I would like to monitor:', requirements, '',
    'Best regards,', name
  ];
  const body = lines.join('\n').replace(/\n/g, '\r\n');
  return `mailto:sales@hitelecom.cn?subject=${encodeURIComponent('Warehouse monitoring enquiry')}&body=${encodeURIComponent(body)}`;
}

if (typeof document !== 'undefined') {
  const form = document.getElementById('warehouse-enquiry-simple');
  if (form) {
    const fieldset = form.querySelector('fieldset');
    const status = document.getElementById('warehouse-enquiry-status');
    fieldset.disabled = false;
    form.addEventListener('submit', event => {
      event.preventDefault();
      for (const name of ['name', 'requirements']) {
        const field = form.elements.namedItem(name);
        field.setCustomValidity(field.value.trim() ? '' : 'Please enter this information.');
      }
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const draft = buildWarehouseEnquiryMailto({
        name: data.get('name'), company: data.get('company'),
        email: data.get('email'), requirements: data.get('requirements')
      });
      status.textContent = 'Opening an email draft. Review it before sending.';
      window.location.assign(draft);
    });
    form.addEventListener('input', event => {
      if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
      status.textContent = '';
    });
  }
}
