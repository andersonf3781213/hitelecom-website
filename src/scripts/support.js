/** Progressive enhancement only: resource discovery and a local email draft. */
function initSupportPage() {
  const copyNode = document.getElementById('support-i18n');
  const messages = copyNode ? JSON.parse(copyNode.textContent) : {};
  const t = (key, vars = {}) => (messages[key] || key).replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? ''));
  const search = document.querySelector('#resource-search');
  const rows = Array.from(document.querySelectorAll('[data-resource]'));
  const filters = Array.from(document.querySelectorAll('.resource-filter'));
  const count = document.querySelector('#resource-count');
  const empty = document.querySelector('#resource-empty');
  const clear = document.querySelector('#resource-clear');
  const more = document.querySelector('#more-resources');

  if (search && rows.length && search.dataset.supportReady !== 'true') {
    search.dataset.supportReady = 'true';
    const controls = document.querySelector('.resource-tools');
    if (controls) controls.hidden = false;
    let category = 'all';
    let expanded = false;
    const normalize = (value) => String(value).normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

    function renderResources() {
      const query = normalize(search.value);
      const isFiltering = Boolean(query) || category !== 'all';
      let visible = 0;
      for (const row of rows) {
        const haystack = normalize(row.dataset.search || row.textContent || '');
        const matches = (category === 'all' || row.dataset.kind === category)
          && query.split(/\s+/).filter(Boolean).every((term) => haystack.includes(term));
        const show = matches && (isFiltering || expanded || row.dataset.featured === 'true');
        row.hidden = !show;
        if (show) visible += 1;
      }
      for (const button of filters) {
        const active = button.dataset.filter === category;
        button.setAttribute('aria-pressed', String(active));
        button.classList.toggle('active', active);
      }
      if (count) count.textContent = isFiltering
        ? t('{count} resources found', {count:visible})
        : t('Showing {count} of {total} resources', {count:visible,total:rows.length});
      if (empty) empty.hidden = visible > 0;
      if (clear) clear.hidden = !isFiltering && !expanded;
      if (more) {
        more.hidden = isFiltering || !rows.some((row) => row.dataset.featured !== 'true');
        more.textContent = expanded ? t('Show featured resources') : t('Show all resources');
        more.setAttribute('aria-expanded', String(expanded));
      }
    }

    search.addEventListener('input', renderResources);
    for (const button of filters) {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        category = ['all', 'datasheet', 'brochure'].includes(button.dataset.filter)
          ? button.dataset.filter : 'all';
        renderResources();
      });
    }
    more?.addEventListener('click', (event) => {
      event.preventDefault();
      expanded = !expanded;
      renderResources();
    });
    clear?.addEventListener('click', (event) => {
      event.preventDefault();
      search.value = '';
      category = 'all';
      expanded = false;
      renderResources();
      search.focus();
    });
    renderResources();
  }

  const form = document.querySelector('#support-form');
  const draft = document.querySelector('#support-draft');
  const review = document.querySelector('#support-review');
  const email = document.querySelector('#support-email');
  const copy = document.querySelector('#support-copy');
  const copyStatus = document.querySelector('#support-copy-status');

  if (form && draft && review && email && form.dataset.supportReady !== 'true') {
    form.dataset.supportReady = 'true';
    const submit = form.querySelector('button[type="submit"]');
    if (submit) submit.disabled = false;
    let preparedText = '';
    // In-page service links keep a working anchor when JavaScript is unavailable.
    document.querySelectorAll('a[data-support-topic]').forEach((link) => {
      link.addEventListener('click', () => {
        const topic = form.elements.namedItem('topic');
        if (!(topic instanceof HTMLSelectElement)) return;
        const next = link.getAttribute('data-support-topic');
        if (!Array.from(topic.options).some((option) => option.value === next)) return;
        topic.value = next;
        form.dispatchEvent(new Event('input', { bubbles: true }));
      });
    });
    form.addEventListener('input', () => { review.hidden = true; preparedText = ''; email.setAttribute('href', 'mailto:sales@hitelecom.cn'); });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const data = new FormData(form);
      const get = (key) => String(data.get(key) || '').trim();
      const values = {
        name: get('name'), email: get('email'), company: get('company'),
        topic: get('topic'), model: get('model'), message: get('message'),
      };
      // Whitespace-only input is not a usable support brief.
      for (const key of ['name', 'email', 'message']) {
        if (!values[key]) {
          const field = form.elements.namedItem(key);
          if (field && 'setCustomValidity' in field) {
            field.setCustomValidity(t('Please complete this field.'));
            field.reportValidity();
            field.addEventListener('input', () => field.setCustomValidity(''), { once: true });
          }
          return;
        }
      }
      preparedText = [
        t('Hitelecom support request'), '',
        `${t('Name')}: ${values.name}`, `${t('Business email')}: ${values.email}`,
        `${t('Company')}: ${values.company || t('Not provided')}`,
        `${t('Topic')}: ${form.elements.namedItem('topic').selectedOptions[0]?.textContent || t('General support')}`,
        `${t('Product / model')}: ${values.model || t('Not provided')}`,
        '', t('Description')+':', values.message,
      ].join('\n');
      draft.textContent = preparedText;
      const subject = [t('Hitelecom support'), form.elements.namedItem('topic').selectedOptions[0]?.textContent, values.model].filter(Boolean).join(' — ');
      email.setAttribute('href', `mailto:sales@hitelecom.cn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(preparedText)}`);
      review.hidden = false;
      if (copyStatus) copyStatus.textContent = t('Nothing has been sent. Review your draft before opening your email app.');
      review.setAttribute('tabindex', '-1');
      review.focus({ preventScroll: true });
      review.scrollIntoView({ behavior: 'auto', block: 'nearest' });
    });

    copy?.addEventListener('click', async (event) => {
      event.preventDefault();
      if (!preparedText) return;
      let copied = false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(preparedText);
          copied = true;
        }
      } catch { /* Local files and restricted previews may deny clipboard access. */ }
      if (!copied) {
        const helper = document.createElement('textarea');
        helper.value = preparedText;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.left = '-9999px';
        document.body.appendChild(helper);
        helper.select();
        try { copied = document.execCommand('copy'); } catch { copied = false; }
        helper.remove();
        copy.focus();
      }
      if (copyStatus) copyStatus.textContent = copied
        ? t('Draft copied. Nothing has been sent.')
        : t('Copy is unavailable here. Select and copy the draft above. Nothing has been sent.');
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSupportPage, { once: true });
} else {
  initSupportPage();
}
