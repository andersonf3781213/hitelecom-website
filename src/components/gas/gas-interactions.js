// All task photos and copy are real static HTML. This small enhancement moves
// the selected photo into the left desktop slot; native details remain usable
// without JavaScript, and narrow screens keep the photo with its task.
const I18N = (() => { try { return JSON.parse(document.querySelector('.ht-gas')?.dataset.i18n || '{}'); } catch { return {}; } })();
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

const targetGases = document.querySelector('#target-gases');
document.querySelectorAll('[data-gas]').forEach(link => {
  link.addEventListener('click', () => {
    if (!targetGases) return;
    const selected = targetGases.value.split(/\s*[;,]\s*/).filter(Boolean);
    const choice = `${link.dataset.gas} — ${link.dataset.gasName}`;
    if (!selected.some(value => value === choice || value === link.dataset.gas)) selected.push(choice);
    targetGases.value = selected.join('; ');
    targetGases.focus({preventScroll:true});
  });
});

const form = document.querySelector('#enquiry-form');
const application = document.querySelector('#application');
document.querySelectorAll('[data-project-scene]').forEach(link => {
  link.addEventListener('click', () => {
    application.value = link.dataset.projectScene;
    if (targetGases && link.dataset.projectGases) {
      const selected = targetGases.value.split(/\s*;\s*/).filter(Boolean);
      for (const choice of link.dataset.projectGases.split(/\s*;\s*/).filter(Boolean)) {
        if (!selected.includes(choice)) selected.push(choice);
      }
      targetGases.value = selected.join('; ');
    }
  });
});
document.querySelectorAll('[data-model]').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('#model').value = link.dataset.model;
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
  const updateEmail = () => { email.href = `mailto:sales@hitelecom.cn?subject=${encodeURIComponent(T('H Series custom gas sensor — project enquiry'))}&body=${encodeURIComponent(brief.value)}`; };
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    brief.value = [T('Hello Hitelecom,'), '', T('I would like to discuss a custom gas monitoring project.'), '', ...['Application','Country','Model','Quantity','Target gases','Measuring range','Area classification','Installation conditions','Connectivity','Timing and platform','Requirements'].map(key=>`${T(key)}: ${data.get(key) || T('Please advise')}`), '', T('Please advise on a suitable model, configuration, supporting datasheet and quotation.'), '', T('Thank you.')].join('\n');
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
const contactBar = document.querySelector('.gas-contact-bar');
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
  const copy = contactBar.querySelector('.gas-copy-wechat');
  const status = contactBar.querySelector('.gas-copy-status');
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(copy.dataset.copy); status.textContent = T('WeChat ID copied.'); }
    catch {
      const range = document.createRange(); range.selectNodeContents(copy);
      const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
      status.textContent = T('ID selected. Use your device’s copy command.');
    }
  });
  contactBar.querySelector('.gas-contact-top').addEventListener('click', event => {
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
  const objective = T('Monitoring objective: ') + link.dataset.measurement;
  if (!field.value.split('\n').includes(objective)) field.value = objective + '\n' + field.value;
}));

// Follow the shared official header without a second scroll listener.
// The production Header is fixed and animated; keep the product subnav pinned
// just below the currently visible header and offset anchor jumps accordingly.
const gasRoot = document.getElementById('gas-content');
const gasSharedHeader = document.getElementById('site-header');
const gasNav = gasRoot?.querySelector('.section-nav');
if (gasRoot && gasSharedHeader && gasNav) {
  const html = document.documentElement;
  const active = new Set();
  const values = new Map();
  let frame = 0;
  const write = (name, number) => {
    const value = `${Math.max(0, number).toFixed(3)}px`;
    if (values.get(name) !== value) {
      values.set(name, value);
      html.style.setProperty(name, value);
    }
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(sync); };
  const sync = () => {
    frame = 0;
    const rect = gasSharedHeader.getBoundingClientRect();
    const position = getComputedStyle(gasSharedHeader).position;
    const overlays = position === 'fixed' || position === 'sticky';
    write('--gas-header-visible', overlays ? Math.min(rect.height, Math.max(0, rect.bottom)) : 0);
    write('--gas-header-height', overlays ? rect.height : 0);
    write('--gas-subnav-height', gasNav.getBoundingClientRect().height);
    html.classList.add('ht-gas-nav-sync');
    if (active.size) schedule();
  };
  const classes = new MutationObserver(schedule);
  classes.observe(gasSharedHeader, {attributes:true,attributeFilter:['class']});
  classes.observe(document.body, {attributes:true,attributeFilter:['class']});
  if ('ResizeObserver' in window) {
    const sizes = new ResizeObserver(schedule);
    sizes.observe(gasSharedHeader); sizes.observe(gasNav);
  }
  window.addEventListener('resize', schedule, {passive:true});
  const relevant = event => event.target === gasSharedHeader &&
    (event.propertyName === 'transform' || event.propertyName.startsWith('padding'));
  gasSharedHeader.addEventListener('transitionrun', event => {
    if (relevant(event)) { active.add(event.propertyName); schedule(); }
  });
  const finish = event => {
    if (relevant(event)) { active.delete(event.propertyName); schedule(); }
  };
  gasSharedHeader.addEventListener('transitionend', finish);
  gasSharedHeader.addEventListener('transitioncancel', finish);
  sync();
}
