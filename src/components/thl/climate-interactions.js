// V58 i18n 引导：组件根节点 data-i18n 注入本语言 JS 文案（EN 为 {} → T() 回退英文，行为不变）
const I18N = (() => { try { return JSON.parse(document.querySelector('.ht-thl').dataset.i18n || '{}'); } catch { return {}; } })();
const T = (key) => I18N[key] || key;
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
    const field = document.querySelector('#requirements');
    if (!field.value.includes(link.dataset.model)) field.value = `${T('Model of interest:')} ${link.dataset.model}\n` + field.value;
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
  const updateEmail = () => { email.href = `mailto:sales@hitelecom.cn?subject=${encodeURIComponent(T('H Series temperature, humidity and light sensor — project enquiry'))}&body=${encodeURIComponent(brief.value)}`; };
  // GPT6 五语言包 §4：选择框输出显示文字（本语言），内部 name 保持英文
  const FIELD_NAMES = ['Application','Country','Quantity','Measurement channels','Room / installation type','Monitoring targets','Connectivity','Requirements'];
  const readField = name => {
    const control = form.elements.namedItem(name);
    if (!control) return '';
    return control.tagName === 'SELECT'
      ? (control.value ? control.selectedOptions[0]?.textContent.trim() || '' : '')
      : control.value.trim();
  };
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    brief.value = [T('Hello Hitelecom,'), '', T('I would like to discuss a temperature, humidity and light monitoring project.'), '', ...FIELD_NAMES.map(name => `${T(name)}: ${readField(name) || T('Please advise')}`), '', T('Please advise on a suitable model, configuration, supporting datasheet and quotation.'), '', T('Thank you.')].join('\n');
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
const contactBar = document.querySelector('.climate-contact-bar');
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
  const copy = contactBar.querySelector('.climate-copy-wechat');
  const status = contactBar.querySelector('.climate-copy-status');
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(copy.dataset.copy); status.textContent = T('WeChat ID copied.'); }
    catch {
      const range = document.createRange(); range.selectNodeContents(copy);
      const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
      status.textContent = T('ID selected. Use your device’s copy command.');
    }
  });
  contactBar.querySelector('.climate-contact-top').addEventListener('click', event => {
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


// GPT6 五语言包 §4：语义键 → 固定 EN value（替换原先按英文标题正则判断）
const measurementValue = {
  temperature: 'Temperature & relative humidity',
  humidity: 'Temperature & relative humidity',
  light: 'Temperature, relative humidity & light',
  custom: 'Custom sensors / project-specific sensing'
};
document.querySelectorAll('[data-measurement]').forEach(link => link.addEventListener('click', () => {
  const field = document.querySelector('#measurement-type');
  if (!field) return;
  const value = measurementValue[link.dataset.measurement];
  if (value) field.value = value;
}));

/* V88 上滚导航遮挡修复（复用空气质量页机制，Kimi 审核 §7）：
   栏目导航 .section-nav 的 sticky top 跟随主 Header 实际可见下沿；
   --thl-header-visible / --thl-header-height / --thl-nav-height 实测写入；
   html.thl-sticky-sync 仅在本页脚本运行后添加，不影响其他产品页；
   astro:before-swap 时清理观察器与 html 类。 */
function initThlStickyNav() {
  const page = document.getElementById('thl-content');
  const header = document.getElementById('site-header');
  const nav = page?.querySelector('.section-nav');
  if (!page || !header || !nav || page.dataset.thlStickyReady) return;
  page.dataset.thlStickyReady = '1';
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
    write('--thl-header-visible', visible);
    write('--thl-header-height', overlaysPage ? rect.height : 0);
    write('--thl-nav-height', nav.getBoundingClientRect().height);
    html.classList.add('thl-sticky-sync');
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
    html.classList.remove('thl-sticky-sync');
  }, { once: true });
}
initThlStickyNav();
document.addEventListener('astro:page-load', initThlStickyNav);
