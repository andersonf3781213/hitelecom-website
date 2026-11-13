// Keep official UI behavior and add keyboard focus management for its overlays.
const header = document.getElementById('site-header');
if (header) {
  const language = header.querySelector('.lang');
  const languageButton = language.querySelector('.lang-btn');
  new MutationObserver(() => languageButton.setAttribute('aria-expanded', String(language.classList.contains('open'))))
    .observe(language, { attributes: true, attributeFilter: ['class'] });

  const overlays = [
    { panel: document.querySelector('.search-mask'), opener: header.querySelector('.search-open'), id: 'site-search' },
    { panel: document.querySelector('.mobile-menu'), opener: header.querySelector('.menu-open'), id: 'site-mobile-menu' }
  ];
  for (const item of overlays) {
    const { panel, opener, id } = item;
    panel.id = id;
    opener.setAttribute('aria-controls', id);
    opener.setAttribute('aria-expanded', 'false');
    let wasOpen = false;
    new MutationObserver(() => {
      const open = !panel.hidden && panel.classList.contains('open');
      opener.setAttribute('aria-expanded', String(open));
      if (id === 'site-search') document.body.classList.toggle('shell-search-active', open);
      if (open && !wasOpen) panel.querySelector(id === 'site-search' ? 'input' : 'button,a')?.focus();
      if (!open && wasOpen && panel.contains(document.activeElement)) opener.focus();
      wasOpen = open;
    }).observe(panel, { attributes: true, attributeFilter: ['hidden', 'class'] });
    panel.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;
      const controls = [...panel.querySelectorAll('a[href],button,input')].filter(el => !el.disabled && el.getClientRects().length);
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  }
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    document.querySelectorAll('.ht-site-shell .qr-btn.on,.ht-site-shell .float-item.on').forEach(el => {
      el.classList.remove('on');
      (el.matches('button') ? el : el.querySelector('button'))?.setAttribute('aria-expanded', 'false');
    });
  });
}
