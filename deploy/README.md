# 部署配置说明（各平台适用性）

> 本目录与 `public/_redirects`、`public/_headers` 由 `scripts/make-redirects.mjs` 生成。
> 产品 URL 变更后重跑该脚本即可同步全部平台配置。

## 301 重定向与缓存策略，按部署平台选择

| 平台 | 301 重定向 | 缓存策略 | 需要做什么 |
| --- | --- | --- | --- |
| **Cloudflare Pages** | `_redirects`（自动生效） | `_headers`（自动生效） | 无需任何操作，两个文件已在 dist 根目录 |
| **Netlify** | `_redirects`（自动生效） | `_headers`（自动生效） | 同上，格式兼容 |
| **Nginx（阿里云 ECS 等自托管）** | `nginx-hitelecom.conf` | 同一文件内 | 将该文件 include 进 server {} 块 |
| **Apache / 虚拟主机（cPanel 等）** | `apache.htaccess` | 同一文件内 | 重命名为 `.htaccess` 放站点根目录 |
| **阿里云 OSS 静态托管** | 无法用服务器 301 | 控制台设置 | dist 内已保留 meta refresh 跳转页兜底；要真 301 需在 CDN 层（DCDN/CDN 回源规则）配置 |
| **Vercel** | `vercel.json` 的 redirects 字段 | 同左 | 暂按 Nginx 规则手工转写（本平台非推荐目标） |

## 关于 `_redirects` / `_headers`

这两个文件是 **Cloudflare Pages / Netlify 的专有约定**。部署到其他平台时它们只是
普通的静态文本文件：会被原样下载（`https://你的域名/_redirects` 能被访问到），
但**不产生任何跳转或缓存效果**，既不报错也不生效。如介意暴露，可在 Nginx 中加：

```nginx
location = /_redirects { return 404; }
location = /_headers  { return 404; }
```

## meta refresh 跳转页的角色

dist 中 `/product/show/id/{数字}.html`（共 38 个，含 `/zh/` 变体）是
meta refresh + canonical 的**软跳转兜底页**：在任何不支持服务器重写的环境
（OSS、纯静态虚拟主机）也能把老访客带到新地址。但搜索引擎按 302 类信号处理、
权重传递不完整，**正式环境务必用上表中的服务器级 301**，跳转页仅作为兜底共存，
两者不冲突（服务器 301 命中时，跳转页根本不会被执行）。
