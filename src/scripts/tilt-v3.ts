/** Progressive enhancement only: all product and application content is server-rendered. */
const root = document.querySelector<HTMLElement>('[data-tilt-page]');
if (root) {
  const groups = [...root.querySelectorAll<HTMLDetailsElement>('[data-application-group]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scrollTo = (target: HTMLElement) => target.scrollIntoView({ block: 'start', behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  const selectScene = (scene: HTMLDetailsElement) => {
    const group = scene.closest<HTMLDetailsElement>('[data-application-group]');
    if (!group) return;
    group.open = true;
    group.querySelectorAll<HTMLDetailsElement>('[data-scene]').forEach(item => { item.open = item === scene; });
  };
  groups.forEach(group => {
    const groupScenes = [...group.querySelectorAll<HTMLDetailsElement>('[data-scene]')];
    group.dataset.enhanced = 'true';
    groupScenes.forEach(scene => {
      scene.querySelector<HTMLElement>(':scope > summary')?.addEventListener('click', event => {
        event.preventDefault();
        selectScene(scene);
      });
    });
  });
  const openHash = () => {
    if (!location.hash) return;
    let hash: string;
    try { hash = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const aliases: Record<string, string> = {
      'slopes-and-embankments': 'engineered-cut-slopes',
      'sea-dikes-dams-and-reservoir-slopes': 'sea-dike-facing-elements',
    };
    const target = document.getElementById(aliases[hash] || hash);
    if (!target || !root.contains(target)) return;
    if (target.matches('[data-scene]')) selectScene(target as HTMLDetailsElement);
    else if (target.matches('[data-application-group]')) (target as HTMLDetailsElement).open = true;
    // Give a closed native <details> one layout frame before moving to its content.
    requestAnimationFrame(() => scrollTo(target));
  };
  root.querySelectorAll<HTMLAnchorElement>('.tilt-app-index a').forEach(link => {
    link.addEventListener('click', () => {
      const target = document.getElementById(link.hash.slice(1));
      if (target instanceof HTMLDetailsElement) target.open = true;
    });
  });
  window.addEventListener('hashchange', openHash);
  openHash();

  const form = root.querySelector<HTMLFormElement>('[data-enquiry-form]');
  const application = root.querySelector<HTMLSelectElement>('#tilt-application');
  const status = root.querySelector<HTMLElement>('[data-enquiry-status]');
  const draftPanel = root.querySelector<HTMLElement>('[data-enquiry-draft]');
  const draft = root.querySelector<HTMLTextAreaElement>('#tilt-draft');
  const email = root.querySelector<HTMLAnchorElement>('[data-enquiry-email]');
  const updateEmail = () => {
    if (!draft || !email) return;
    email.href = `mailto:sales@hitelecom.cn?subject=${encodeURIComponent('H Series wireless tilt monitoring enquiry')}&body=${encodeURIComponent(draft.value)}`;
  };
  root.querySelectorAll<HTMLAnchorElement>('[data-enquiry-scene]').forEach(link => {
    link.addEventListener('click', () => {
      const value = link.dataset.enquiryScene;
      if (application && value && [...application.options].some(option => option.value === value)) {
        application.value = value;
        if (status) status.textContent = `Application selected: ${application.selectedOptions[0].textContent}.`;
      }
    });
  });
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity() || !draft || !draftPanel) return;
    const values = new FormData(form);
    const chosen = application?.selectedOptions[0]?.textContent || '';
    const requirement = String(values.get('requirements') || '').trim();
    draft.value = [
      'Hello Hitelecom,',
      '',
      'Please help us specify an H Series wireless tilt monitoring configuration.',
      '',
      `Application: ${chosen}`,
      `Country / region: ${String(values.get('country') || '').trim()}`,
      `Estimated quantity: ${String(values.get('quantity') || '').trim() || 'To be confirmed'}`,
      `Preferred connectivity: ${String(values.get('connectivity') || 'Please advise')}`,
      '',
      'Project requirements:',
      requirement || 'We would like to discuss measurement points, performance, installation and reporting requirements.',
      '',
      'Please advise on a suitable model, configuration and quotation.',
    ].join('\n');
    draftPanel.hidden = false;
    updateEmail();
    if (status) status.textContent = 'Your editable enquiry draft is ready. Review it below, then open your email app or copy the brief.';
    draft.focus({ preventScroll: true });
    scrollTo(draftPanel);
  });
  draft?.addEventListener('input', updateEmail);
  root.querySelector<HTMLButtonElement>('[data-enquiry-copy]')?.addEventListener('click', async () => {
    if (!draft) return;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(draft.value);
      if (status) status.textContent = 'Enquiry brief copied. Paste it into your email or project document.';
    } catch {
      draft.focus();
      draft.select();
      if (status) status.textContent = 'The brief is selected. Use your device’s copy command.';
    }
  });
}
