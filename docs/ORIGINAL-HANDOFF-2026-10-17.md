> 历史交接输入；本版接入和测试结论以根目录 README-KIMI.md 为准。

# catalog-admin 交接文档（审核与排障用）

> 交接日期：2026-10-17　仓库：`andersonf3781213/hitelecom-website`　基准提交：`af6b96f`（main 最新）
> 本文档随 `catalog-admin-源代码-2026-10-17.zip` 提供，zip 内保留仓库原始相对路径。

---

## 0. 故障现象（用户确认）与初步分析

**现象**：在管理页做出编辑后，底部保存栏显示红色指示点+「有未保存的更改」，但**点击「保存更改」按钮无任何反应**——无网络请求、无成功提示、无可见报错。（用户截图确认于 2026-10-17）

**初步分析（最可能的原因，按概率排序）**：

1. **报错提示显示在视口外（首要嫌疑）**。`src/admin/editor.mjs` 的 `save()` 在两种失败路径下只调用 `alert(...)` 把错误写进 `[data-alert]` 元素：
   - 保存前校验失败：`const validation = validateWorkspace(state.catalog); if (!validation.valid) { alert(validation.errors.join('\n')); return; }`（约第 284–286 行）——**直接 return，没有任何网络请求**，按钮保持可点，用户视角就是"点击无效"；
   - PUT 被服务器拒绝（400/409/403 等）：catch 分支 `alert(\`保存失败：...\`)`。
   问题在于 `[data-alert]` 位于 `catalog-main` **顶部**（`CatalogAdmin.astro` 中 `.mode-notice` 之后），而保存栏 `.save-bar` 固定在底部。用户滚动到页面中部点击保存时，红色错误条出现在页面顶部视口之外，看起来像什么都没发生。
   **用户自查方法**：点击保存后立即**滚动到页面最顶部**，看标题下方是否有红色错误条；或开 DevTools 的 Console/Network 观察。
2. **若按钮呈浅蓝/灰且确实不可点**：则是 `disabled` 状态——`setSaveState` 中 `disabled = state.saving || (state.ready && !state.dirty)`，即"已连接且无更改"。但截图中指示点为红色（dirty），与本分支矛盾，出现则说明 dirty 状态与 UI 不一致，需查 `markDirty`/`connect` 后 `state.dirty` 的重算逻辑（`JSON.stringify` 深比较对键序敏感）。
3. **保存时 PUT 401**：密码仅存于 sessionStorage（`catalog-admin-token`），**刷新页面或新开标签页后 token 丢失**。此时点击保存（ready=false 时先走 `connect()`）应弹出 `prompt()` 密码框；若浏览器拦截了 prompt 或用户取消，错误同样写入顶部 alert，表现为"无效"。

**修复方向建议**：把保存结果的反馈移到底部保存栏内（`[data-save-title]`/`[data-save-description]` 已有现成通道），或在 `alert()` 触发时同时 `scrollIntoView()`/`window.scrollTo(0,0)`；校验失败与网络失败都应禁用按钮期间给出 `pending` → 失败态的可见反馈。若确认是原因 1 的校验失败，还需把 `validation.errors` 的具体内容暴露给用户（目前只会显示在视口外的红条里）。

> 附 2026-10-17 实测基线（curl）：
> - `GET https://www.hitelecom.com/catalog-admin` → **200**，页面 HTML 正常输出（`data-mode="api"`）。
> - `GET https://www.hitelecom.com/api/catalog`（无凭证）→ **401** `{"error":"Admin password required or invalid.","mode":"password"}` —— 说明 Functions 已部署、环境变量已配置、当前为**密码模式**（若未配置会返回 503）。
> - `POST /api/catalog` → **405**（仅允许 GET/PUT，符合设计）。

---

## 1. 这是什么

官网（Astro 纯静态站，772 页，7 语言，Cloudflare Pages 托管）内置的**产品目录管理后台**：

- 地址：`https://www.hitelecom.com/catalog-admin`（noindex，不对搜索引擎开放）
- 功能：产品增改、7 语言内容编辑、草稿/发布状态、基础排序（拖拽/按钮）、分类管理、本月主推（campaign，按上海日期生效）、导入/导出 JSON 备份
- 保存链路：浏览器 → `PUT /api/catalog`（Cloudflare Pages Function）→ GitHub Contents API 提交 `src/data/product-catalog.json` → Cloudflare Pages 自动重新构建 → 公开页面更新

## 2. 文件地图

| 层 | 文件 | 作用 |
|---|---|---|
| 页面 | `src/pages/catalog-admin/index.astro` | 管理页入口，注入目录种子 JSON，`mode="api"` |
| 页面 | `src/components/catalog/CatalogAdmin.astro` | 管理页全部 HTML 骨架（侧边栏/列表/编辑器 dialog/保存栏） |
| 前端逻辑 | `src/admin/editor.mjs` | **核心**。状态机、渲染、校验、导入导出、保存、密码认证流程（约 460 行，无框架） |
| 共享库 | `src/lib/catalog.mjs` | 数据模型校验 `validateCatalog`、排序 `getOrderedProducts/Categories`、`shanghaiDate`、`LOCALES` |
| 共享库 | `src/lib/access-auth.mjs` | Cloudflare Access JWT 验证（第二种认证模式） |
| 共享库 | `src/lib/catalog-adapter.mjs`、`catalog-site.ts` | 目录数据 → 站点页面数据的适配 |
| 后端 | `functions/api/catalog.js` | **唯一 API**。GET 读目录 / PUT 存目录，写 GitHub |
| 后端 | `functions/_middleware.js` | 仅做备用域名 301 归一，与 catalog 无关 |
| 数据 | `src/data/product-catalog.json` | 目录数据（当前 14 产品 / 10 分类） |
| 消费方 | `src/pages/{,zh,es,de,ja,fr,ru}/product/[slug].astro`、`[...managed].astro`、`lists/cid/[cid].astro` | 公开产品页/列表页/模块生成页 |
| 消费方 | `src/components/catalog/ManagedProductPage.astro` | 「由本模块生成详情页」的模板 |
| 本地开发 | `scripts/catalog-server.mjs` | 本地静态服+保存接口（`?mode=local`，CSRF 凭据，仅 127.0.0.1） |
| 构建 | `astro.config.mjs` | 第 50 行附近：sitemap 排除 `/catalog-admin` |
| 安全头 | `public/_headers` | `/catalog-admin*`、`/api/catalog` 的 noindex/no-store 等 |
| 旧入口 | `public/admin/` | Decap CMS 遗留（config.yml/index.html），**与 catalog-admin 是两套东西**，勿混淆 |

## 3. 认证与环境变量（Cloudflare Pages → Settings → Environment variables）

两种认证模式二选一，**都未配置时 API 拒绝一切请求（503）**：

**密码模式（当前线上生效）**
- `ADMIN_PASSWORD`（≥12 字符）——管理密码
- 前端流程：API 返回 401+`mode:"password"` → 浏览器 `prompt()` 输入密码 → 存 sessionStorage（`catalog-admin-token`）→ 之后请求带 `Authorization: Bearer <密码>`，仅当次浏览会话有效

**Cloudflare Access 模式（多人企业场景，需 Zero Trust）**
- `CF_ACCESS_TEAM_DOMAIN`、`CF_ACCESS_AUD`、`ADMIN_EMAILS`（逗号分隔白名单）、`ADMIN_ORIGIN`

**两种模式都必须配置（GitHub 写入）**
- `GITHUB_OWNER`、`GITHUB_REPO`、`GITHUB_BRANCH`、`GITHUB_TOKEN`（repo contents 读写权限的 PAT）
- 可选 `CATALOG_FILE_PATH`（默认 `src/data/product-catalog.json`）

> 安全红线（既有约束，勿破坏）：GitHub token 只允许出现在 Cloudflare 服务端环境变量，禁止写入 PUBLIC_* 变量、前端 JS 或仓库提交；API 绝不把 GitHub 的响应原文透传给浏览器。

## 4. 保存请求的关键校验（`functions/api/catalog.js`）

PUT 依次校验，任何一步失败都会以对应 HTTP 状态拒绝：

1. Origin 头必须等于站点自身源（密码模式）或 `ADMIN_ORIGIN`（Access 模式）→ 否则 403
2. Content-Type 必须是 application/json → 否则 415
3. 请求体 ≤1 MiB → 否则 413
4. 必须是 `{catalog, version}`，`version` 为当前文件 sha → 不一致 409（有人改过目录，需刷新合并）
5. `validateCatalog` 通过（含「已发布产品保护」：已发布产品的 id/slug/已有语言 URL 不可改、记录不可随导入删除）
6. GitHub PUT 提交；sha 冲突 → 409；其他失败 → 502

前端对应行为（`editor.mjs`）：409 提示「先导出当前更改，刷新取最新版本后合并导入」；保存失败编辑内容保留在工作区，可重试或导出备份。

## 5. 排障清单（按此顺序定位）

在浏览器打开 `https://www.hitelecom.com/catalog-admin`，开 DevTools：

| 步骤 | 检查 | 结论分支 |
|---|---|---|
| 1 | 页面是否 200 | 404/500 → Pages 部署问题，查 Cloudflare 构建日志 |
| 2 | Console 有无 JS 报错 | 有 → 前端问题，重点看 `editor.mjs` 对应行 |
| 3 | Network 里 `GET /api/catalog` 的状态 | **503** → 环境变量缺失/格式不合规（见第 3 节校验规则，注意值不能带首尾空格、密码≥12 字符）；**401+mode:password** → 正常，应弹密码框；**401 无 mode** → Access 模式，需先过 Zero Trust 登录；**502** → GitHub 读取失败（token 失效/仓库名错/分支无权限） |
| 4 | 不弹密码框 | 检查浏览器是否拦截了 `prompt()`；JS 报错会导致流程中断 |
| 5 | 保存失败看 PUT 状态 | 403 → Origin 校验；409 → 目录被别人/上次构建改过，刷新重试；400+errors → 校验错误明细会在页面红色 alert 列出；413 → 目录超 1 MiB |
| 6 | 保存成功但公开页没更新 | 这是**设计行为**：保存只是提交 GitHub，要等 Cloudflare Pages 重新构建部署（约 3–5 分钟）。查 GitHub 仓库对应 commit 的 check-runs 里 Cloudflare Pages 是否成功 |
| 7 | 主推/日期不生效 | campaign 按上海日期；且活动到期需重新构建才更新公开页（页面脚注已注明） |

命令行快速探测：
```bash
curl -i https://www.hitelecom.com/api/catalog            # 未登录应 401+mode
curl -i -H "Authorization: Bearer <密码>" https://www.hitelecom.com/api/catalog   # 应 200 返回目录+version
```

## 6. 本地复现环境

```bash
npm ci
npx astro build                 # 需要 Node >= 22.12
node scripts/catalog-server.mjs # 本地静态+保存服务（仅 127.0.0.1）
# 浏览器访问 http://127.0.0.1:<端口>/catalog-admin?mode=local 进入本地文件模式
```
本地模式保存直接改写 `src/data/product-catalog.json`（带 CSRF 凭据），可完整复现前端全部交互而不碰 GitHub。前端核心逻辑也可在无浏览器环境单测：`initializeEditor({ root, fetchImpl, storage, now, ... })` 支持依赖注入。

## 7. 数据模型速览（`src/lib/catalog.mjs` 为权威）

```
catalog = { products: [...], categories: [...], campaign: {productId, startsOn, endsOn} | null }
product = { id, slug, categoryId, sortOrder, status: 'draft'|'published',
            managedPage: bool, image: {src, alt},
            locales: { en|zh|es|de|ja|fr|ru: { name, summary, url, body, imageAlt,
                       seoTitle, seoDescription, published } } }
category = { id, sortOrder, labels: {en, zh} }
```
- 发布模块生成详情页（managedPage）的硬门槛：名称、≥40 字符摘要、≥200 字符正文、图片与图片说明
- 已发布保护：published 产品的 id/slug 锁定；某语言已发布的 url 锁定；导入备份不能删除已有记录

## 8. 既有约束（修改时务必遵守）

1. 推送只动 `src/`、`public/`、`functions/`，绝不提交 `dist/`
2. 表单 `name` 属性保持英文（不翻译）
3. 不伪造「已发送/已提交」状态：任何保存成功提示必须以 API 确认为准（当前代码已遵守，勿回退）
4. API 响应永不透传 GitHub 原始错误体
5. `/catalog-admin` 保持 noindex/nofollow

## 9. 审核建议（给 GPT6 的切入点）

1. 先读 `functions/api/catalog.js`（服务端全量）与 `src/admin/editor.mjs`（前端全量），两者是本功能全部逻辑
2. 按第 5 节清单复现并定位到具体环节后，再针对该环节深挖
3. 改动后本地用 `?mode=local` 全流程验证（新增/编辑/排序/主推/导入导出/保存），再推送 main 由 Cloudflare 自动部署
4. 部署验证：`curl -s "https://api.github.com/repos/andersonf3781213/hitelecom-website/commits/<sha>/check-runs"` 看 Cloudflare Pages 结论
