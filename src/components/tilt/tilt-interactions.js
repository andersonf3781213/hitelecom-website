// 多语文案：根节点 data-i18n（dicts.mjs js 段），读取失败或缺键时回退英文
const I18N = (() => { try { return JSON.parse(document.querySelector('.ht-tilt')?.dataset.i18n || '{}'); } catch { return {}; } })();
const S = (key, fallback) => I18N[key] || fallback;
const FIELD_LABELS = I18N.labels || {};

const form = document.querySelector('#enquiry-form');
const application = document.querySelector('#application');
document.querySelectorAll('[data-project-scene]').forEach(link => {
  link.addEventListener('click', () => { application.value = link.dataset.projectScene; });
});
document.querySelectorAll('[data-model]').forEach(link => {
  link.addEventListener('click', () => {
    const field = document.querySelector('#requirements');
    if (!field.value.includes(link.dataset.model)) field.value = `${S('modelPrefix', 'Model of interest')}: ${link.dataset.model}\n` + field.value;
  });
});
const revealTarget = () => {
  const id = decodeURIComponent(location.hash.slice(1));
  const el = document.getElementById(id);
  if (!el) return;
  if (el.tagName === "DETAILS") el.open = true;
  let p = el.parentElement;
  while (p) { if (p.tagName === 'DETAILS') p.open = true; p = p.parentElement; }
};
window.addEventListener('hashchange', revealTarget);
revealTarget();
if (form) {
  const review = document.querySelector('#enquiry-review');
  const brief = document.querySelector('#enquiry-brief');
  const email = document.querySelector('#email-brief');
  const status = document.querySelector('#brief-status');
  const updateEmail = () => { email.href = `mailto:sales@hitelecom.cn?subject=${encodeURIComponent(S('subject', 'H Series wireless tilt sensor — project enquiry'))}&body=${encodeURIComponent(brief.value)}`; };
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    brief.value = [S('greet', 'Hello Hitelecom,'), '', S('intro', 'I would like to discuss a wireless tilt monitoring project.'), '', ...['Application','Country','Quantity','Connectivity','Requirements'].map(key=>`${FIELD_LABELS[key] || key}: ${data.get(key) || S('fallback', 'Please advise')}`), '', S('closing', 'Please advise on a suitable model, configuration, supporting datasheet and quotation.'), '', S('thanks', 'Thank you.')].join('\n');
    updateEmail(); review.hidden = false;
    status.textContent = S('ready', 'Your brief is ready. Review it and open your email app to send.');
    brief.focus({preventScroll:true}); review.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
  });
  brief.addEventListener('input', updateEmail);
  document.querySelector('#copy-brief').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(brief.value); status.textContent = S('copied', 'Project brief copied.'); }
    catch { brief.focus(); brief.select(); status.textContent = S('selected', 'Your brief is selected. Use your device’s copy command.'); }
  });
}

const mobileQuote = document.querySelector(".mobile-quote");
if (mobileQuote && "IntersectionObserver" in window) {
  let heroVisible = true, formVisible = false;
  const sync = () => mobileQuote.classList.toggle("is-visible", !heroVisible && !formVisible);
  new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; sync(); }).observe(document.querySelector(".hero"));
  new IntersectionObserver(entries => { formVisible = entries[0].isIntersecting; sync(); }).observe(document.querySelector("#enquiry"));
}

// Native details keep every contact available without client-side rendering.
const contactBar = document.querySelector('.tilt-contact-bar');
if (contactBar) {
  const items = [...contactBar.querySelectorAll('details')];
  const closeContacts = except => items.forEach(item => { if (item !== except) item.open = false; });
  items.forEach(item => {
    item.addEventListener('toggle', () => { if (item.open) closeContacts(item); });
    item.querySelector('summary').addEventListener('click', () => closeContacts(item));
  });
  document.addEventListener('click', event => { if (!contactBar.contains(event.target)) closeContacts(); });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const open = items.find(item => item.open);
    if (open && contactBar.contains(document.activeElement)) open.querySelector('summary').focus();
    closeContacts();
  });
  const copy = contactBar.querySelector('.tilt-copy-wechat');
  const status = contactBar.querySelector('.tilt-copy-status');
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(copy.dataset.copy); status.textContent = 'WeChat ID copied.'; }
    catch {
      const range = document.createRange(); range.selectNodeContents(copy);
      const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
      status.textContent = 'ID selected. Use your device’s copy command.';
    }
  });
  contactBar.querySelector('.tilt-contact-top').addEventListener('click', event => {
    event.preventDefault(); closeContacts();
    window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    document.querySelector('.skip-link')?.focus({preventScroll:true});
  });
}

const shellPanels = [...document.querySelectorAll('.shell-reference details')];
const closeShellPanels = except => shellPanels.forEach(panel => { if (panel !== except) panel.open = false; });
shellPanels.forEach(panel => {
  panel.querySelector('summary').addEventListener('click', () => closeShellPanels(panel));
});
document.addEventListener('click', event => {
  if (!shellPanels.some(panel => panel.contains(event.target))) closeShellPanels();
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const open = shellPanels.find(panel => panel.open);
  if (open?.contains(document.activeElement)) open.querySelector('summary').focus();
  closeShellPanels();
});
