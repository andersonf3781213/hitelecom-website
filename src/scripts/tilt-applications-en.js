/** Applications-only enhancement matching the observed temperature-page behavior.
 * Native details, scene-owned figures and all text remain available without JS.
 * Reference and observed interaction records: docs/temperature-applications-reference-v25.json.
 */
(() => {
  const section = document.getElementById('applications');
  if (!section || section.dataset.temperatureUiEnhanced) return;
  section.dataset.temperatureUiEnhanced = 'true';
  const phone = window.matchMedia('(max-width: 600px)');
  const states = new Map();

  function placePhoto(state) {
    const task = state.displayed;
    if (!task) return;
    const photo = state.photos.get(task);
    for (const [owner, figure] of state.photos) {
      if (owner !== task || phone.matches) owner.querySelector('.task-copy').prepend(figure);
      figure.hidden = owner !== task;
    }
    if (phone.matches) task.querySelector('.task-copy').prepend(photo);
    else state.slot.append(photo);
    state.categoryPhoto.hidden = true;
  }
  function commitPhoto(state, task, ready) {
    if (state.selected !== task) return;
    state.displayed = task;
    state.group.dataset.displayedScene = task.id;
    placePhoto(state);
    const photo = state.photos.get(task);
    photo.classList.toggle('scene-photo-ready', ready);
  }
  function selectTask(state, task, { initial = false } = {}) {
    const same = state.selected === task;
    state.selected = task;
    state.group.dataset.selectedScene = task.id;
    for (const item of state.tasks) item.classList.toggle('is-selected', item === task);
    const photo = state.photos.get(task), image = photo.querySelector('img');
    // The initial category photograph uses this same first image. Place its
    // scene-owned figure immediately, retaining native lazy loading offscreen.
    if (initial) { commitPhoto(state, task, image.complete && image.naturalWidth > 0); return; }
    if (same && state.displayed === task) { placePhoto(state); return; }
    image.loading = 'eager';
    // Keep the previous photograph until the newly selected image is ready.
    if (image.complete && image.naturalWidth > 0) commitPhoto(state, task, true);
  }

  for (const group of section.querySelectorAll('details.application-group')) {
    const tasks = [...group.querySelectorAll('details.application-task')];
    const slot = group.querySelector('.application-media-slot');
    const categoryPhoto = slot.querySelector('.application-category-photo');
    const photos = new Map(tasks.map(task => [task, task.querySelector('.application-scene-photo')]));
    const state = { group, tasks, slot, categoryPhoto, photos, selected: null, displayed: null };
    states.set(group, state);group.classList.add('application-scenes-enhanced');
    for (const task of tasks) {
      const photo = photos.get(task), image = photo.querySelector('img');
      photo.hidden = true;
      image.addEventListener('load', () => {
        photo.classList.add('scene-photo-ready');
        if (state.selected === task) commitPhoto(state, task, true);
      });
      task.querySelector(':scope > summary').addEventListener('click', () => {
        if (!task.open) {
          for (const sibling of tasks) if (sibling !== task) sibling.open = false;
          selectTask(state, task);
        }
      });
      task.addEventListener('toggle', () => {
        if (!task.open) return; // Collapsing retains the last selected photo.
        for (const sibling of tasks) if (sibling !== task) sibling.open = false;
        selectTask(state, task);
      });
    }
    const selected = tasks.find(task => task.open) || tasks[0];
    if (selected) selectTask(state, selected, { initial: true });
  }
  for (const link of section.querySelectorAll('.application-jump-nav a')) {
    link.addEventListener('click', () => {
      const group = document.getElementById(link.hash.slice(1));
      if (states.has(group)) group.open = true; // Other categories stay open.
    });
  }
  function followHash() {
    let id;try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target || !section.contains(target)) return;
    const group = target.closest('details.application-group');
    const state = states.get(group);if (!state) return;
    group.open = true;
    if (target.matches('details.application-task')) {
      for (const sibling of state.tasks) sibling.open = sibling === target;
      selectTask(state, target);
    }
  }
  window.addEventListener('hashchange', followHash);followHash();
  const onViewportChange = () => { for (const state of states.values()) placePhoto(state); };
  if (phone.addEventListener) phone.addEventListener('change', onViewportChange);
  else if (phone.addListener) phone.addListener(onViewportChange);
})();
