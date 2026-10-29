// Progressive enhancement only: category and product anchors work without JS.
// All visible text is authored in catalog JSON and rendered by Astro.
for (const root of document.querySelectorAll('[data-station-catalog]')) {
  if (root.dataset.stationCatalogReady==='true') continue;
  root.dataset.stationCatalogReady='true';
  const field=root.querySelector('[data-station-keyword]');
  const form=root.querySelector('[data-station-search]');
  const cards=[...root.querySelectorAll('[data-station-card]')];
  const empty=root.querySelector('[data-station-empty]');
  const reset=root.querySelector('[data-station-reset]');
  const status=root.querySelector('[data-result-count]');
  if (field && form && empty && reset && status) {
    const filter=()=>{
      const query=field.value.trim().toLocaleLowerCase(document.documentElement.lang||'en');
      let count=0;
      for(const card of cards){card.hidden=!(card.dataset.name||'').toLocaleLowerCase(document.documentElement.lang||'en').includes(query);if(!card.hidden)count++;}
      empty.hidden=count>0;
      status.textContent=status.dataset.countTemplate.replace('{count}',String(count));
    };
    field.addEventListener('input',filter);
    form.addEventListener('submit',event=>{event.preventDefault();filter();});
    reset.addEventListener('click',()=>{field.value='';filter();field.focus();});
    filter();
  }
  root.querySelector('[data-category-switch]')?.addEventListener('change',event=>{location.href=event.currentTarget.value;});
}
