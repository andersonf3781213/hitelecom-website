// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// https://astro.build/config
export default defineConfig({
  // 站点正式域名：用于生成 canonical、hreflang、sitemap 绝对地址
  site: 'https://www.hitelecom.com',

  // 多语言：默认语言英文（/），中文在 /zh/，西语在 /es/
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'es'],
    routing: {
      prefixDefaultLocale: false, // 英文首页保持在 /，与原版一致
    },
  },

  integrations: [
    // 构建完成即瘦身 dist：删除未引用媒体与 .prerender 中间目录。
    // 注册为集成钩子（而非仅靠 package.json postbuild），
    // 保证 npx astro build --outDir ... 等任意调用方式都会触发。
    {
      name: 'hite-prune-dist',
      hooks: {
        'astro:build:done': ({ dir }) => {
          const target = fileURLToPath(dir);
          try {
            execFileSync(process.execPath, ['scripts/prune-dist.mjs', target, '--yes'], { stdio: 'inherit' });
          } catch (e) {
            console.warn('[prune] 构建后清理失败（不影响产物）:', e?.message ?? e);
          }
        },
      },
    },
    // 自动生成 sitemap-index.xml，助力 Google 收录
    sitemap({
      // 旧数字产品地址仅为跳转页（noindex），不进 sitemap；
      // /legacy-assets 为构建期资源保留清单（noindex、无入口）；
      // /search（薄内容）与 /thanks（表单回执，noindex）同样不进 sitemap——
      // noindex 与 sitemap 收录是矛盾信号，二者必须一致
      filter: (page) =>
        !page.includes('/product/show/id/') &&
        !page.includes('/legacy-assets') &&
        !page.includes('/search') &&
        !page.includes('/thanks'),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', zh: 'zh-CN', es: 'es' },
      },
      // Cloudflare Pages 的 canonical 形态为无扩展名（/about.html 一律 308 → /about）：
      // sitemap 统一输出无扩展名地址，与 canonical、hreflang、内链保持一致，
      // Google 抓取零跳转
      serialize(item) {
        const fix = (href) => {
          const u = new URL(href);
          u.pathname = u.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
          return u.href;
        };
        item.url = fix(item.url);
        item.links = item.links?.map((lnk) => ({ ...lnk, url: fix(lnk.url) }));
        return item;
      },
    }),
  ],

  // 静态构建：纯 HTML 输出，不依赖客户端渲染，对 SEO 爬虫友好
  output: 'static',

  build: {
    inlineStylesheets: 'auto', // 小体积 CSS 内联，减少请求
    inlineScripts: 'never',    // JS 一律外置为共享模块文件：172 页复用同一份缓存，不再每页内联 5 段
    // 文件式路径（/zh.html、/product.html）而非目录式（/zh/）：
    // 在任意静态环境（Nginx 默认配置 / OSS / 虚拟主机 / 预览网关）都无需
    // 目录索引或重写规则即可访问，部署零配置、永不错位 404
    format: 'file',
  },

  compressHTML: true,

  // 构建缓存放到本地磁盘（FUSE 挂载上 rm -rf 偶发 ENOTEMPTY/EIO，拖垮构建）
  cacheDir: '/tmp/astro-cache',

  vite: {
    build: {
      // 默认 4KB 以下脚本被内联进每页 HTML；置 0 强制全部外置，
      // 172 页共享同一份 JS 缓存文件
      assetsInlineLimit: 0,
    },
  },
});
