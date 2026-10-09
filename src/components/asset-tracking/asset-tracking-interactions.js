// All task photos and copy are real static HTML. This small enhancement moves
// the selected photo into the left desktop slot; native details remain usable
// without JavaScript, and narrow screens keep the photo with its task.
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
  link.addEventListener('click', () => { application.value = link.dataset.projectScene; });
});
document.querySelectorAll('[data-model]').forEach(link => {
  link.addEventListener('click', () => {
    const field = document.querySelector('#preferred-model');
    const option = [...field.options].find(item => item.dataset.modelId === link.dataset.model);
    if (option) field.value = option.value;
  });
});
document.querySelectorAll('[data-datasheet-request]').forEach(link => {
  link.addEventListener('click', () => {
    const field = document.querySelector('#requirements');
    const request = 'Please send the H300 (4G) and H500 (NB-IoT) model datasheets.';
    if (!field.value.includes(request)) field.value = request + '\n' + field.value;
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
  const updateEmail = () => { email.href = `mailto:sales@hitelecom.cn?subject=${encodeURIComponent('H300 / H500 asset tracker — project enquiry')}&body=${encodeURIComponent(brief.value)}`; };
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    brief.value = ['Hello Hitelecom,', '', 'I would like to discuss an H300 / H500 asset tracking project.', '', ...['Application','Country / route','Quantity','Location objective','Reporting requirements','Preferred model','Requirements'].map(key=>`${key}: ${data.get(key) || 'Please advise'}`), '', 'Please advise on a suitable model, configuration, supporting datasheet and quotation.', '', 'Thank you.'].join('\n');
    updateEmail(); review.hidden = false;
    status.textContent = 'Your brief is ready. Review it and open your email app to send.';
    brief.focus({preventScroll:true}); review.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
  });
  brief.addEventListener('input', updateEmail);
  document.querySelector('#copy-brief').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(brief.value); status.textContent = 'Project brief copied.'; }
    catch { brief.focus(); brief.select(); status.textContent = 'Your brief is selected. Use your device’s copy command.'; }
  });
}

// Native details keep every contact available without client-side rendering.
const contactBar = document.querySelector('.asset-tracking-contact-bar');
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
  const copy = contactBar.querySelector('.asset-tracking-copy-wechat');
  const status = contactBar.querySelector('.asset-tracking-copy-status');
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(copy.dataset.copy); status.textContent = 'WeChat ID copied.'; }
    catch {
      const range = document.createRange(); range.selectNodeContents(copy);
      const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
      status.textContent = 'ID selected. Use your device’s copy command.';
    }
  });
  contactBar.querySelector('.asset-tracking-contact-top').addEventListener('click', event => {
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

document.querySelectorAll('[data-positioning]').forEach(link => link.addEventListener('click', () => { document.querySelector('#location-objective').value = link.dataset.positioning; }));

// Follow the shared official header without a second scroll listener.
// The offline shell is absolute; the production Header is fixed and animated.
const assetRoot = document.getElementById('asset-tracking-content');
const sharedHeader = document.getElementById('site-header');
const assetNav = assetRoot?.querySelector('.section-nav');
if (assetRoot && sharedHeader && assetNav) {
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
    const rect = sharedHeader.getBoundingClientRect();
    const position = getComputedStyle(sharedHeader).position;
    const overlays = position === 'fixed' || position === 'sticky';
    write('--asset-header-visible', overlays ? Math.min(rect.height, Math.max(0, rect.bottom)) : 0);
    write('--asset-header-height', overlays ? rect.height : 0);
    write('--asset-subnav-height', assetNav.getBoundingClientRect().height);
    html.classList.add('ht-asset-nav-sync');
    if (active.size) schedule();
  };
  const classes = new MutationObserver(schedule);
  classes.observe(sharedHeader, {attributes:true,attributeFilter:['class']});
  classes.observe(document.body, {attributes:true,attributeFilter:['class']});
  if ('ResizeObserver' in window) {
    const sizes = new ResizeObserver(schedule);
    sizes.observe(sharedHeader); sizes.observe(assetNav);
  }
  window.addEventListener('resize', schedule, {passive:true});
  const relevant = event => event.target === sharedHeader &&
    (event.propertyName === 'transform' || event.propertyName.startsWith('padding'));
  sharedHeader.addEventListener('transitionrun', event => {
    if (relevant(event)) { active.add(event.propertyName); schedule(); }
  });
  const finish = event => {
    if (relevant(event)) { active.delete(event.propertyName); schedule(); }
  };
  sharedHeader.addEventListener('transitionend', finish);
  sharedHeader.addEventListener('transitioncancel', finish);
  sync();
}
