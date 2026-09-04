/**
 * Cloudflare Pages Functions 中间件：按 Host 301 到主域。
 *
 * 背景：Pages 的 _redirects 不支持「按域名」条件跳转（源只能是相对路径），
 * 跨域归一必须在 Functions / zone 级 Redirect Rule 做。当前 DNS 在阿里云、
 * 无 zone 控制权，故用本中间件实现，随项目构建自动部署。
 *
 * 生效前提：对应域名已作为自定义域挂到本 Pages 项目。
 *  - iot67.com / www.iot67.com  备用域 → 主域（V26 清单第 5 项）
 *  - hitelecom-website.pages.dev 平台默认域 → 主域（防重复内容；
 *    仅生产默认域，预览部署 <hash>.hitelecom-website.pages.dev 不受影响）
 */
const CANONICAL_HOST = 'www.hitelecom.com';
const REDIRECT_HOSTS = new Set([
  'iot67.com',
  'www.iot67.com',
  'hitelecom-website.pages.dev',
]);

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (REDIRECT_HOSTS.has(url.hostname)) {
    url.hostname = CANONICAL_HOST;
    url.protocol = 'https:';
    // 保留完整路径与查询串；路径中的 .html 由主站 Pages 规范化继续处理
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
