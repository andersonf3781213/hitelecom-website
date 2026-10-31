/* V142: Solutions 频道询盘交互。
 * 不伪装"已发送"：提交仅在页面内生成询盘草稿（#enquiry-review），
 * 用户确认后通过自己的邮件客户端发送（mailto 草稿 + 复制兜底）。 */
(function () {
  var root = document.querySelector('.ht-solutions');
  if (!root) return;
  var pageName = root.dataset.name || '';
  var form = root.querySelector('form.brief');
  if (!form) return;
  var review = root.querySelector('#enquiry-review');
  var pre = review && review.querySelector('pre');
  var mailBtn = review && review.querySelector('a.btn-primary');
  var copyBtn = review && review.querySelector('button.btn-outline');
  var copied = review && review.querySelector('.copied');

  function buildBrief() {
    var lines = [];
    form.querySelectorAll('[data-brief-field]').forEach(function (label) {
      var field = form.elements[label.getAttribute('data-brief-field')];
      if (!field) return;
      var value = String(field.value || '').trim();
      lines.push(label.getAttribute('data-brief-label') + ': ' + (value || '—'));
    });
    lines.push('Source page: ' + pageName);
    lines.push('Page URL: ' + location.href);
    return lines.join('\n');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    var brief = buildBrief();
    var d = root.dataset;
    var subject = (d.emailSubject || 'Solution enquiry — {name}').replace('{name}', pageName);
    if (pre) pre.textContent = brief;
    if (mailBtn) {
      mailBtn.href =
        'mailto:' + (d.email || 'sales@hitelecom.cn') +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(brief);
    }
    if (copied) copied.textContent = '';
    if (review) {
      review.classList.add('show');
      review.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = pre ? pre.textContent : '';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () {
            if (copied) copied.textContent = copyBtn.getAttribute('data-copied') || 'Copied.';
          },
          function () {
            if (copied) copied.textContent = copyBtn.getAttribute('data-fallback') || '';
          }
        );
      } else if (copied) {
        copied.textContent = copyBtn.getAttribute('data-fallback') || '';
      }
    });
  }
})();
