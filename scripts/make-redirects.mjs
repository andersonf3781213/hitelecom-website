/**
 * 生成各平台 301 重定向与缓存配置（单一数据源，新增产品后重跑即可）：
 *
 *   node scripts/make-redirects.mjs
 *
 * 产物：
 *   public/_redirects            —— Cloudflare Pages / Netlify 约定的真 301（自动随 dist 发布）
 *   deploy/nginx-hitelecom.conf  —— Nginx 自托管（阿里云 ECS 等）：return 301 + 缓存策略
 *   deploy/apache.htaccess       —— Apache / 虚拟主机：RewriteRule [R=301] + 缓存策略
 *   deploy/README.md             —— 各平台部署说明（_redirects/_headers 的适用范围）
 *
 * 背景：产品详情页 URL 从旧站数字地址 /product/show/id/{id}.html 改为语义
 * slug /product/{slug}.html。dist 里保留了同路径的 meta refresh 跳转页作兜底，
 * 但 Google 按 302 类信号处理、权重传递不完整；正式上线应使用服务器级 301。
 *
 * 注意：_redirects / _headers 仅在 Cloudflare Pages / Netlify 类平台生效，
 * 在 Nginx / Apache / OSS / 虚拟主机上是普通的静态文件（会被原样吐出、无任何作用），
 * 必须改用本脚本生成的对应服务器配置。
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ts = readFileSync(join(root, 'src/data/product.ts'), 'utf8');

// 抽取 productSlugs 对象字面量里的 'id': 'slug' 对
const block = ts.match(/export const productSlugs[^=]*=\s*\{([\s\S]*?)\};/);
if (!block) throw new Error('未找到 productSlugs 映射表');
const pairs = [...block[1].matchAll(/'([^']+)'\s*:\s*'([^']+)'/g)].map((m) => [m[1], m[2]]);
if (!pairs.length) throw new Error('productSlugs 为空');

const redirects = [];
// 目标地址为无扩展名形态（Pages canonical）：旧 .html 源地址 → 301 → /product/{slug}，
// 避免 301 → .html → 308 → 无扩展名 的两跳链
for (const [id, slug] of pairs) {
  redirects.push([`/product/show/id/${id}.html`, `/product/${slug}`]);
  redirects.push([`/zh/product/show/id/${id}.html`, `/zh/product/${slug}`]);
}

// ---------------------------------------------------------------- _redirects
const cfLines = [
  '# Cloudflare Pages 301 重定向（本文件由 scripts/make-redirects.mjs 生成，勿手改）',
  '# 旧数字产品地址 → 语义 slug 地址；仅 CF Pages / Netlify 生效，其他平台用 deploy/ 下的配置',
  '# 注意：iot67.com 备用域 → 主域 301 由 functions/_middleware.js 实现',
  '#       （Pages 的 _redirects 不支持按域名条件跳转，源只能是相对路径）',
  '',
];
for (const [from, to] of redirects) cfLines.push(`${from} ${to} 301`);
cfLines.push('');
writeFileSync(join(root, 'public/_redirects'), cfLines.join('\n'));

// ------------------------------------------------------------- Nginx 配置
const nginx = `# ---------------------------------------------------------------
# Hitelecom 官网 · Nginx 部署配置（由 scripts/make-redirects.mjs 生成，勿手改）
# 适用：阿里云 ECS 自托管 Nginx。用法二选一：
#   A) 将本文件内容并入你的 server {} 块；
#   B) 在 server {} 中：include /etc/nginx/conf.d/hitelecom.conf;
# 前提：root 指向 dist 解压后的目录。
# ---------------------------------------------------------------

# === 1. 旧产品地址 301（精确匹配 + return，性能最佳，与平台无关） ===
${redirects.map(([f, t]) => `location = ${f} { return 301 ${t}; }`).join('\n')}

# === 2. 缓存策略（与 public/_headers 等价） ===
# 带内容哈希的构建产物：一年长缓存 + immutable，文件名变即自动失效
location ^~ /_astro/ {
    add_header Cache-Control "public, max-age=31536000, immutable";
}
location ^~ /fonts/ {
    add_header Cache-Control "public, max-age=31536000, immutable";
}
# public 下无哈希的静态图：允许同名换图后较快生效（7 天）
location ^~ /images/ {
    add_header Cache-Control "public, max-age=604800";
}
location ^~ /assets/ {
    add_header Cache-Control "public, max-age=604800";
}
# V18 首页图片：带手动版本号、同名可换 → 7 天
#（首页 CSS/JS 已进 Astro 管线带内容哈希，由上方 /_astro/ 规则覆盖）
location ^~ /home-assets/img/ {
    expires 7d;
    add_header Cache-Control "public, max-age=604800" always;
    access_log off;
}
# 可下载资料（PDF 规格书等可能更新）：1 天
location ^~ /downloads/ {
    add_header Cache-Control "public, max-age=86400";
}
# HTML 页面：协商缓存，保证内容更新即时可见
location ~* \\.html$ {
    add_header Cache-Control "public, max-age=0, must-revalidate";
}

# === 3. gzip（文本资源压缩传输；图片/PDF 已是压缩格式，不再重复压） ===
gzip on;
gzip_types text/css application/javascript application/json image/svg+xml application/manifest+json;
gzip_min_length 1k;

# 参考 server 块（按需调整域名与证书）：
# server {
#     listen 80;
#     server_name www.hitelecom.com hitelecom.com;
#     root /var/www/hitelecom;        # ← dist 解压目录
#     index index.html;
#     include /etc/nginx/conf.d/hitelecom.conf;
#     # 无扩展名 URL 回退到 .html 文件（与 Cloudflare Pages 行为对齐）
#     location / { try_files $uri $uri.html $uri/ =404; }
# }
# 备用域 iot67.com → 主域 301（自托管时另加一个 server 块即可）：
# server { listen 80; server_name iot67.com www.iot67.com; return 301 https://www.hitelecom.com$request_uri; }
`;

// ------------------------------------------------------------ Apache 配置
const apache = `# ---------------------------------------------------------------
# Hitelecom 官网 · Apache / 虚拟主机配置（由 scripts/make-redirects.mjs 生成，勿手改）
# 用法：重命名为 .htaccess 放到 dist 解压后的站点根目录（需 AllowOverride All），
# 或并入 httpd.conf / vhost 配置。
# ---------------------------------------------------------------

RewriteEngine On

# === 0. iot67.com 备用域 → 主域 301 ===
RewriteCond %{HTTP_HOST} ^(www\.)?iot67\.com$ [NC]
RewriteRule ^(.*)$ https://www.hitelecom.com/$1 [R=301,L]

# === 1. 旧产品地址 301 ===
${redirects.map(([f, t]) => `RewriteRule ^${f.slice(1).replace(/\./g, '\\.')}$ ${t} [R=301,L]`).join('\n')}

# === 1b. 无扩展名 URL → .html 文件（与 Cloudflare Pages 行为对齐） ===
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [L]

# === 2. 缓存策略（与 public/_headers 等价，需 mod_expires + mod_headers） ===
<IfModule mod_expires.c>
    ExpiresActive On
    # 带内容哈希的构建产物：一年
    <LocationMatch "^/(_astro|fonts)/">
        ExpiresDefault "access plus 1 year"
        Header set Cache-Control "public, max-age=31536000, immutable"
    </LocationMatch>
    # public 下无哈希的静态图：7 天
    <LocationMatch "^/(images|assets|home-assets/img)/">
        ExpiresDefault "access plus 7 days"
    </LocationMatch>
    # 可下载资料：1 天
    <LocationMatch "^/downloads/">
        ExpiresDefault "access plus 1 day"
    </LocationMatch>
    # HTML：协商缓存
    <FilesMatch "\\.html$">
        ExpiresDefault "access plus 0 seconds"
        Header set Cache-Control "public, max-age=0, must-revalidate"
    </FilesMatch>
</IfModule>

# === 3. 文本压缩（需 mod_deflate） ===
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/css application/javascript application/json image/svg+xml
</IfModule>
`;

// ---------------------------------------------------------- 部署说明 README
const deployReadme = `# 部署配置说明（各平台适用性）

> 本目录与 \`public/_redirects\`、\`public/_headers\` 由 \`scripts/make-redirects.mjs\` 生成。
> 产品 URL 变更后重跑该脚本即可同步全部平台配置。

## 301 重定向与缓存策略，按部署平台选择

| 平台 | 301 重定向 | 缓存策略 | 需要做什么 |
| --- | --- | --- | --- |
| **Cloudflare Pages** | \`_redirects\`（自动生效） | \`_headers\`（自动生效） | 无需任何操作，两个文件已在 dist 根目录 |
| **Netlify** | \`_redirects\`（自动生效） | \`_headers\`（自动生效） | 同上，格式兼容 |
| **Nginx（阿里云 ECS 等自托管）** | \`nginx-hitelecom.conf\` | 同一文件内 | 将该文件 include 进 server {} 块 |
| **Apache / 虚拟主机（cPanel 等）** | \`apache.htaccess\` | 同一文件内 | 重命名为 \`.htaccess\` 放站点根目录 |
| **阿里云 OSS 静态托管** | 无法用服务器 301 | 控制台设置 | dist 内已保留 meta refresh 跳转页兜底；要真 301 需在 CDN 层（DCDN/CDN 回源规则）配置 |
| **Vercel** | \`vercel.json\` 的 redirects 字段 | 同左 | 暂按 Nginx 规则手工转写（本平台非推荐目标） |

## 关于 \`_redirects\` / \`_headers\`

这两个文件是 **Cloudflare Pages / Netlify 的专有约定**。部署到其他平台时它们只是
普通的静态文本文件：会被原样下载（\`https://你的域名/_redirects\` 能被访问到），
但**不产生任何跳转或缓存效果**，既不报错也不生效。如介意暴露，可在 Nginx 中加：

\`\`\`nginx
location = /_redirects { return 404; }
location = /_headers  { return 404; }
\`\`\`

## meta refresh 跳转页的角色

dist 中 \`/product/show/id/{数字}.html\`（共 ${redirects.length} 个，含 \`/zh/\` 变体）是
meta refresh + canonical 的**软跳转兜底页**：在任何不支持服务器重写的环境
（OSS、纯静态虚拟主机）也能把老访客带到新地址。但搜索引擎按 302 类信号处理、
权重传递不完整，**正式环境务必用上表中的服务器级 301**，跳转页仅作为兜底共存，
两者不冲突（服务器 301 命中时，跳转页根本不会被执行）。
`;

// --------------------------------------------------------------- 写文件
const deployDir = join(root, 'deploy');
mkdirSync(deployDir, { recursive: true });
writeFileSync(join(deployDir, 'nginx-hitelecom.conf'), nginx);
writeFileSync(join(deployDir, 'apache.htaccess'), apache);
writeFileSync(join(deployDir, 'README.md'), deployReadme);

console.log(`已生成 ${pairs.length * 2} 条 301（${pairs.length} 个产品 × 中英双语）：`);
console.log('  public/_redirects            （CF Pages / Netlify）');
console.log('  deploy/nginx-hitelecom.conf  （Nginx 自托管）');
console.log('  deploy/apache.htaccess       （Apache / 虚拟主机）');
console.log('  deploy/README.md             （平台适用性说明）');
