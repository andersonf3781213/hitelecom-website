// All task photos and copy are real static HTML. This small enhancement moves
// the selected photo into the left desktop slot; native details remain usable
// without JavaScript, and narrow screens keep the photo with its task.
// Locale strings are rendered into data-i18n on the page root (LOGGER_DICTS_JS_KEYS);
// T() falls back to the English source string when no translation is present.
const I18N = JSON.parse(document.querySelector('.ht-logger')?.dataset.i18n || '{}');
const T = key => Object.prototype.hasOwnProperty.call(I18N, key) ? I18N[key] : key;
const sceneViewport = window.matchMedia('(max-width: 600px)');
const applicationSceneStates = new Map();
for (const group of document.querySelectorAll('.application-group')) {
  const slot = group.querySelector('.application-media-slot');
  const fallback = slot?.querySelector('.application-category-photo');
  const tasks = [...group.querySelectorAll('.application-task')];
  if (!slot || !fallback || !tasks.length) continue;
  const records = new Map(tasks.map(task => [task.id, {
    task,
    home: task.querySelector('.task-copy'),
    figure: task.querySelector('.application-scene-photo')
  }]));
  if ([...records.values()].some(record => !record.figure || !record.home)) continue;
  const state = {group, slot, fallback, records, desired: null, current: null, generation: 0};
  applicationSceneStates.set(group, state);
  group.classList.add('application-scenes-enhanced');

  const restore = record => {
    record.home.prepend(record.figure);
    record.figure.hidden = !sceneViewport.matches;
  };
  const show = (record, generation) => {
    if (state.generation !== generation || state.desired !== record) return;
    if (sceneViewport.matches) {
      for (const item of records.values()) restore(item);
      fallback.hidden = false;
    } else {
      if (state.current && state.current !== record) restore(state.current);
      record.figure.hidden = false;
      slot.append(record.figure);
      fallback.hidden = true;
    }
    state.current = record;
    group.dataset.displayedScene = record.task.id;
    record.figure.classList.remove('scene-photo-ready');
    // Opacity animation does not affect layout; reduced-motion CSS disables it.
    record.figure.classList.add('scene-photo-ready');
  };
  const select = (record, initial = false) => {
    state.desired = record;
    const generation = ++state.generation;
    group.dataset.selectedScene = record.task.id;
    for (const item of records.values()) {
      item.task.classList.toggle('is-selected', item === record);
      if (item !== record) item.task.open = false;
    }
    const image = record.figure.querySelector('img');
    if (sceneViewport.matches || initial || (image.complete && image.naturalWidth > 0)) {
      show(record, generation);
      return;
    }
    // Keep the last displayed image while the next selected image downloads.
    // Only a real user-selected/open task is promoted from lazy loading.
    if (group.open && record.figure.hidden) image.loading = 'eager';
    const ready = () => show(record, generation);
    image.addEventListener('load', ready, {once:true});
    // A fast cached load may finish between the complete check and listener.
    if (image.complete && image.naturalWidth > 0) ready();
  };
  state.select = select;
  state.relayout = () => {
    ++state.generation;
    for (const item of records.values()) restore(item);
    state.current = null;
    fallback.hidden = false;
    select(state.desired || records.values().next().value, true);
  };
  for (const record of records.values()) {
    record.task.addEventListener('toggle', () => {
      if (record.task.open) select(record);
    });
    const image = record.figure.querySelector('img');
    image.addEventListener('error', () => {
      if (record.figure.dataset.sceneFallback === 'true') {
        // If even the category fallback fails, keep a previously valid image.
        if (state.current !== record) return;
        record.figure.hidden = true;
        fallback.hidden = false;
        return;
      }
      // Honest fallback: image alt and caption switch with the category photo.
      const fallbackImage = fallback.querySelector('img');
      record.figure.dataset.sceneFallback = 'true';
      image.alt = fallbackImage.alt;
      image.style.objectPosition = fallbackImage.style.objectPosition;
      image.width = fallbackImage.width;
      image.height = fallbackImage.height;
      record.figure.querySelector('figcaption').textContent = fallback.querySelector('figcaption').textContent;
      const candidates = fallbackImage.getAttribute('srcset');
      if (candidates) image.setAttribute('srcset', candidates); else image.removeAttribute('srcset');
      image.setAttribute('src', fallbackImage.getAttribute('src'));
      if (state.desired === record) select(record);
    });
  }
  group.addEventListener('toggle', () => {
    if (!group.open) return;
    const opened = [...records.values()].find(record => record.task.open);
    const record = opened || state.desired || records.values().next().value;
    if (!opened) record.task.open = true;
    select(record);
  });
  state.relayout();
}
sceneViewport.addEventListener('change', () => {
  for (const state of applicationSceneStates.values()) state.relayout();
});
const selectApplicationTask = task => {
  const state = applicationSceneStates.get(task.closest('.application-group'));
  const record = state?.records.get(task.id);
  if (record) state.select(record);
};

const form = document.querySelector('#enquiry-form');
const application = document.querySelector('#application');
document.querySelectorAll('[data-project-scene]').forEach(link => {
  link.addEventListener('click', () => {
    if (application && [...application.options].some(option => option.value === link.dataset.projectScene)) {
      application.value = link.dataset.projectScene;
    }
  });
});
document.querySelectorAll('[data-model]').forEach(link => {
  link.addEventListener('click', () => {
    const field = document.querySelector('#model');
    if (field && ((field.tagName === 'INPUT' && field.value === link.dataset.model) || [...(field.options || [])].some(option => option.value === link.dataset.model))) {
      field.value = link.dataset.model;
    }
  });
});
const revealTarget = () => {
  let id; try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  const el = document.getElementById(id);
  if (!el) return;
  if (el.tagName === "DETAILS") el.open = true;
  let p = el.parentElement;
  while (p) { if (p.tagName === 'DETAILS') p.open = true; p = p.parentElement; }
  if (el.classList.contains('application-task')) selectApplicationTask(el);
};
window.addEventListener('hashchange', revealTarget);
revealTarget();
if (form) {
  const review = document.querySelector('#enquiry-review');
  const brief = document.querySelector('#enquiry-brief');
  const email = document.querySelector('#email-brief');
  const status = document.querySelector('#brief-status');
  const updateEmail = () => { email.href = `mailto:sales@hitelecom.cn?subject=${encodeURIComponent(T('H100 temperature and humidity data logger — project enquiry'))}&body=${encodeURIComponent(brief.value)}`; };
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    // Select display text (locale scene title) goes into the brief; other values come from FormData under their English field names.
    const values = {Application: application?.selectedOptions?.[0]?.textContent?.trim() || data.get('Application')};
    brief.value = [T('Hello Hitelecom,'), '', T('I would like to discuss an H100 temperature and humidity recording project with a customizable collection interval and USB readout using local PC software.'), '', ...['Application','Country','Model','Quantity','Recording interval','Required recording period','Computer environment','Requirements'].map(key=>`${T(key)}: ${values[key] || data.get(key) || T('Please advise')}`), '', T('Please confirm the H100 recording configuration, supported collection interval, local PC software requirements, supporting datasheet and quotation.'), '', T('Thank you.')].join('\n');
    updateEmail(); review.hidden = false;
    status.textContent = T('Your brief is ready. Review it and open your email app to send.');
    brief.focus({preventScroll:true}); review.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
  });
  brief.addEventListener('input', updateEmail);
  document.querySelector('#copy-brief').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(brief.value); status.textContent = T('Project brief copied.'); }
    catch { brief.focus(); brief.select(); status.textContent = T('Your brief is selected. Use your device’s copy command.'); }
  });
}

// Native details keep every contact available without client-side rendering.
const contactBar = document.querySelector('.logger-contact-bar');
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
  const copy = contactBar.querySelector('.logger-copy-wechat');
  const status = contactBar.querySelector('.logger-copy-status');
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(copy.dataset.copy); status.textContent = T('WeChat ID copied.'); }
    catch {
      const range = document.createRange(); range.selectNodeContents(copy);
      const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
      status.textContent = T('ID selected. Use your device’s copy command.');
    }
  });
  contactBar.querySelector('.logger-contact-top').addEventListener('click', event => {
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

document.querySelectorAll('[data-measurement]').forEach(link => link.addEventListener('click', () => {
  const field = document.querySelector('#requirements');
  if (!field) return;
  const requirement = `${T('Recording focus:')} ${link.dataset.measurement}`;
  if (!field.value.includes(requirement)) field.value = requirement + (field.value ? '\n' + field.value : '');
}));

// Sticky section-nav offset: measure the site header's visible height at runtime
// (hide/show transitions, font and breakpoint changes) instead of hard-coding pixels.
// --logger-header-visible / --logger-header-height / --logger-nav-height are written
// from measurements; html.logger-sticky-sync is added only while this page's script runs.
function initLoggerStickyNav() {
  const page = document.getElementById('logger-content');
  const header = document.getElementById('site-header');
  const nav = page?.querySelector('.section-nav');
  if (!page || !header || !nav || page.dataset.loggerStickyReady) return;
  page.dataset.loggerStickyReady = '1';
  const html = document.documentElement;
  const running = new Set();
  const last = new Map();
  let frame = 0;
  function write(name, pixels) {
    const value = `${Math.max(0, pixels).toFixed(3)}px`;
    if (last.get(name) === value) return;
    last.set(name, value);
    html.style.setProperty(name, value);
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(sync); }
  function sync() {
    frame = 0;
    const rect = header.getBoundingClientRect();
    const position = getComputedStyle(header).position;
    const overlaysPage = position === 'fixed' || position === 'sticky';
    const visible = overlaysPage ? Math.min(rect.height, Math.max(0, rect.bottom)) : 0;
    write('--logger-header-visible', visible);
    write('--logger-header-height', overlaysPage ? rect.height : 0);
    write('--logger-nav-height', nav.getBoundingClientRect().height);
    html.classList.add('logger-sticky-sync');
    if (running.size) schedule();
  }
  const classObserver = new MutationObserver(schedule);
  classObserver.observe(header, { attributes: true, attributeFilter: ['class'] });
  classObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  let sizeObserver = null;
  if ('ResizeObserver' in window) {
    sizeObserver = new ResizeObserver(schedule);
    sizeObserver.observe(header);
    sizeObserver.observe(nav);
  }
  window.addEventListener('resize', schedule, { passive: true });
  function relevant(event) {
    return event.target === header && (event.propertyName === 'transform' || event.propertyName.startsWith('padding'));
  }
  header.addEventListener('transitionrun', event => {
    if (!relevant(event)) return;
    running.add(event.propertyName);
    schedule();
  });
  function finish(event) {
    if (!relevant(event)) return;
    running.delete(event.propertyName);
    schedule();
  }
  header.addEventListener('transitionend', finish);
  header.addEventListener('transitioncancel', finish);
  sync();
  document.addEventListener('astro:before-swap', () => {
    classObserver.disconnect();
    sizeObserver?.disconnect();
    html.classList.remove('logger-sticky-sync');
  }, { once: true });
}
initLoggerStickyNav();
document.addEventListener('astro:page-load', initLoggerStickyNav);
