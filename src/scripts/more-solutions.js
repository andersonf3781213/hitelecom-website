// 原生 details 负责主要开关；本脚本只增强内容末尾的收起操作。
for (const disclosure of document.querySelectorAll('.more-solutions')) {
  if (disclosure.dataset.moreReady === 'true') continue;
  disclosure.dataset.moreReady = 'true';
  const toggle = disclosure.querySelector('.more-solutions-toggle');
  const close = disclosure.querySelector('[data-more-close]');
  if (!toggle || !close) continue;
  close.hidden = false;
  close.addEventListener('click', () => {
    disclosure.open = false;
    toggle.focus({ preventScroll: true });
    // 收起会大幅改变布局高度，等两帧布局稳定后再测量并滚动，
    // 确保顶部入口回到视口内（预留固定页头高度）。
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const headerOffset = 96;
        const rect = toggle.getBoundingClientRect();
        if (rect.top < headerOffset || rect.bottom > window.innerHeight) {
          const top = toggle.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
        }
      });
    });
  });
}
