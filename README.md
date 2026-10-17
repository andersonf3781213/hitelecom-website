# Hitelecom 营销官网（Astro 重构版）

基于 **Astro 7** 静态站点生成（SSG），为 B2B 营销场景重构：

- **纯静态 HTML 输出**：不依赖客户端渲染，Google 爬虫可直接读取全部内容
- **极致加载速度**：零框架 JS 运行时、图片构建期自动压缩为 WebP、首屏关键图 preload——**首屏传输约 131KB**（HTML+CSS+JS+字体+首屏图），首页整页含全部懒加载图约 3.6MB
- **大图懒加载**：首屏以下图片全部 `loading="lazy"` + `decoding="async"`，并注入宽高防止布局抖动（CLS）
- **全面 SEO**：语义化标签、meta/Open Graph/Twitter Card、canonical、hreflang 多语言互链、JSON-LD 结构化数据（Organization + WebSite 实体图 + 首页产品/方案 ItemList）、自动生成 `sitemap-index.xml`、`robots.txt`；关键词布局对标 Milesight / Dragino / RAKwireless 等头部友商
- **GEO（AI 搜索优化）**：`public/llms.txt` 站点说明书、`robots.txt` 显式放行 GPTBot / OAI-SearchBot / PerplexityBot / ClaudeBot / Bingbot 等 AI 爬虫、结构化数据 `knowsAbout` 强化实体认知
- **全端适配**：手机 / Pad / 桌面响应式，移动端全屏菜单 + 触屏滑动轮播
- **多语言**：英文 `/`（默认）、中文 `/zh.html`，导航一键切换
- **零配置部署**：全站 `.html` 文件式路径（`/zh.html`、`/product.html`），
  不依赖服务器的目录索引 / URL 重写，任何静态环境（Nginx 默认、OSS、虚拟主机）直接可访问

## 快速开始

> 环境要求：**Node.js ≥ 22.12**（Astro 7 要求），npm ≥ 9.6。

```bash
npm install        # 安装依赖
npm run dev        # 本地开发（http://localhost:4321）
npm run build      # 构建静态站点到 dist/（postbuild 钩子自动瘦身：删除未被引用的原始图片，约 60MB）
npm run preview    # 本地预览构建结果
```

`npm run build` 完成后会自动执行 `postbuild` → `scripts/prune-dist.mjs`（也可随时用 `npm run prune`
单独再跑一遍，幂等无副作用），确保产物只含被页面实际引用的资源。

### 产物体积说明（三个口径，勿混淆）

- **首屏传输 ≈ 131KB**（HTML+CSS+JS+字体+首屏图）：决定「黄金 3 秒」体验的指标
- **首页整页 ≈ 3.6MB**：含首屏以下所有懒加载图片，滚动到位才加载
- **dist 总量 ≈ 92MB**：216 页全站产物 = 43MB 按需下载的 PDF 规格书（`downloads/`，访客不点击不产生流量）
  + 42MB 全部图片的多尺寸响应式 WebP 变体（`_astro/`，每页只加载自己引用的几张）+ 约 9MB 页面与其他资源。
  部署包体积 ≠ 访客加载量，不影响打开速度

## 目录结构与日常维护

> **非技术编辑请直接看 [编辑指南.md](./编辑指南.md)**：网站自带内容管理后台 `/admin/`（Sveltia CMS），
> 新闻与「关于我们」可在浏览器里直接编辑，无需接触代码。

```
src/
├── content/               # ★ 内容集合（CMS 编辑的就是这里，每篇一个 Markdown 文件）
│   ├── news/{en,zh}/      #   新闻详情：<文章id>.md（frontmatter 含标题/日期/分类/卡片图/位次）
│   └── about/{en,zh}/     #   关于我们五板块：intro / quality / partner / joinus / contact
├── data/
│   ├── site.ts            # 联系方式、社交链接、云平台地址、备案号、默认SEO、询盘表单接口 formEndpoint
│   ├── home.ts            # 首页全部文案：轮播 / 能力项 / 产品区块 / 解决方案 / 新闻 / 页脚
│   ├── product.ts         # ★ 产品列表 + 19 个系列详情（含 GEO 字段：summary/applications/faqs…）
│   ├── solution.ts        # 解决方案
│   ├── news.ts            # 新闻静态配置（横幅/选项卡/FAQ）+ 内容集合装配器
│   └── about.ts           # 关于我们内容集合加载器
├── assets/images/         # ★ 全站图片，替换同名文件即可换图
│   ├── content/           #   新闻正文 / 关于我们插图（CMS 上传的正文图也进这里）
│   ├── news/              #   新闻卡片图（CMS 上传的卡片图也进这里）
│   └── …                  #   hero / features / sections / solutions / partners / common 等
├── components/            # 页面组件（Header / Footer / home/* 各区块）
public/
├── admin/                 # ★ Sveltia CMS 后台（index.html + config.yml）
├── fonts/                 # ★ 自托管字体（与原站同款，已子集化瘦身）
│   ├── Poppins-Medium-subset.woff2      #   英文/数字标题（8KB）
│   └── Alibaba-PuHuiTi-R-subset.woff2   #   正文+中文（555KB，含3756常用汉字）
└── images/
    ├── qr-wechat.png      # ★ 侧边栏/页脚微信二维码，同名覆盖即换
    └── qr-whatsapp.png    # ★ WhatsApp 二维码，同名覆盖即换
├── layouts/BaseLayout.astro  # 全站 SEO Head 模板
├── pages/
│   ├── index.astro        # 英文首页 /
│   └── zh/index.astro     # 中文首页 /zh/
└── i18n/index.ts          # 多语言路由工具
```

### 上新闻 / 改关于我们（推荐：后台操作）

浏览器打开 `/admin/` → 选「新闻·英文站 / 中文站」→ New → 填标题、日期、分类、卡片图、正文（可粘贴 HTML）→ 发布。
手工方式：在 `src/content/news/en/` 与 `zh/` 各加一个同名 `<id>.md`（双语用同一 id，语言切换才能互链）。

### 上产品 / 改首页文案（结构化数据）

- 产品：`src/data/product.ts`（JSON 结构，字段含义见文件内注释；`specs` 规格表会自动进入网页表格与 AI 结构化数据）
- 首页：`src/data/home.ts`；解决方案：`src/data/solution.ts`；公司信息 / 表单接口：`src/data/site.ts`
- 新闻 FAQ 手风琴：`src/data/news.ts` 的 `staticConfig.faqs`

### 换图片

- 页面图片：用同名文件覆盖 `src/assets/images/` 下对应图片，重新 `npm run build` 即可，
  构建时自动生成压缩 WebP 与多尺寸响应式版本，无需手动处理
- 二维码：覆盖 `public/images/qr-wechat.png` / `qr-whatsapp.png`（建议正方形、≥300×300）

### 字体说明

全站字体与原站一致：标题用 **Poppins**、正文与中文用 **阿里巴巴普惠体 R**。
为兼顾加载速度，两个字体都已做子集化（普惠体仅保留 3756 个最常用汉字 + 全角标点，
由 4.5MB 瘦身至约 555KB，仅中文页加载）；子集之外的生僻字会自动回退到系统中文字体，
不影响阅读。如需完整字库，将原字体文件放回 `public/fonts/` 并修改 `src/styles/global.css`
顶部的 `@font-face` 路径即可。

### 新增语言

1. `astro.config.mjs` 的 `i18n.locales` 加入新语言码（如 `'es'`）
2. `src/data/home.ts` 复制一份内容对象并翻译
3. 新建 `src/pages/es/index.astro`（参照 `zh/index.astro`）

### 部署

`npm run build` 后将 `dist/` 目录上传到任意静态托管（Nginx / OSS / Vercel / Cloudflare Pages）。
记得把 `astro.config.mjs` 里的 `site` 改为正式域名，保证 sitemap 与 canonical 正确。

**旧产品地址的 301 重定向与缓存策略按平台选择**（详见 [deploy/README.md](./deploy/README.md)）：

- Cloudflare Pages / Netlify：dist 根目录的 `_redirects`、`_headers` 自动生效，无需操作
- Nginx（阿里云 ECS 等自托管）：使用 `deploy/nginx-hitelecom.conf`
- Apache / 虚拟主机：使用 `deploy/apache.htaccess`（重命名为 `.htaccess`）
- OSS 等无服务器重写的环境：dist 已内置 meta refresh 跳转页兜底，真 301 需在 CDN 层配置

以上配置由 `node scripts/make-redirects.mjs` 统一生成，产品 URL 变更后重跑即可。
