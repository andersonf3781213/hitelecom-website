#!/usr/bin/env python3
"""
产品规格书（Datasheet）PDF 生成器
=================================
按公司官方规格书版式（参照 H310-TS180C / H310-AQ041 / H310-MW012 上传件），
从 src/data/product.ts 已发布的真实产品数据生成英文版 datasheet PDF，
输出到 public/downloads/<slug>-datasheet.pdf，并自动回写 product.ts 的 pdf 字段。

数据来源原则：只使用官网已发布的信息（系列名、卖点、简介、特性、规格表、
应用场景、产品图），不虚构任何参数。

依赖：pip install playwright qrcode && playwright install chromium；本机需有 node。
用法：python3 scripts/make-datasheets.py            # 生成全部缺失的
      python3 scripts/make-datasheets.py 270 275    # 只生成指定 id
"""
import json
import os
import re
import subprocess
import sys
import tempfile

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_ROOT = os.path.join(APP, 'src', 'assets', 'images')
OUT_DIR = os.path.join(APP, 'public', 'downloads')

CONTACT = ('Tel: +86 18616602589&nbsp;&nbsp;/&nbsp;&nbsp;Web: http://www.hitelecom.com<br/>'
           'Email: Justin.Li@hitelecom.cn&nbsp;&nbsp;/&nbsp;&nbsp;Add: 2nd Floor, Building 1, '
           'No. 116 Cheyang Road, Songjiang District, Shanghai')

CSS = """
@page { size: A4; margin: 0; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #33383f; }
.page { width: 210mm; min-height: 296mm; page-break-after: always; position: relative; padding-bottom: 26mm; background: #fff; }
.page:last-child { page-break-after: auto; }
.brandbar { padding: 10mm 14mm 0; font-size: 15pt; font-weight: 700; color: #1b6ec2; font-style: italic; }
.brandbar sup { font-size: 8pt; }
.band { margin-top: 6mm; padding: 14mm 14mm; background: linear-gradient(120deg, #35a9e1 0%, #1b6ec2 60%, #155a9c 100%); color: #fff; display: flex; align-items: center; gap: 10mm; }
.eyebrow { font-size: 9pt; letter-spacing: .18em; opacity: .85; margin-bottom: 4mm; }
h1 { font-size: 27pt; line-height: 1.15; letter-spacing: .01em; }
.subtitle { margin-top: 4mm; font-size: 10.5pt; opacity: .92; }
.band img { width: 62mm; max-height: 62mm; object-fit: contain; margin-left: auto; filter: drop-shadow(0 6px 14px rgba(0,0,0,.25)); }
.body { padding: 10mm 14mm 0; }
h2 { font-size: 13pt; color: #1b6ec2; letter-spacing: .06em; margin: 8mm 0 4mm; }
h2::after { content: ''; display: block; width: 14mm; height: 1.1mm; background: #7db343; margin-top: 1.6mm; }
.indicators { display: flex; gap: 4mm; }
.ind { flex: 1; border: 1px solid #e3e9f0; border-radius: 2mm; padding: 4mm 2mm; text-align: center; }
.ind .v { font-size: 10pt; font-weight: 700; color: #1b6ec2; line-height: 1.3; }
.ind .k { font-size: 7.5pt; color: #8a94a0; margin-top: 1.5mm; }
.desc { font-size: 9.5pt; line-height: 1.75; color: #4a525b; text-align: justify; }
.featgrid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4mm; }
.feat { border: 1px solid #e3e9f0; border-radius: 2mm; padding: 4mm; min-height: 30mm; }
.feat img { width: 8mm; height: 8mm; object-fit: contain; margin-bottom: 2mm; }
.feat p { font-size: 8.5pt; line-height: 1.55; color: #4a525b; }
.appgrid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 3.5mm; }
.app { position: relative; border-radius: 1.5mm; overflow: hidden; height: 30mm; background: #eef3f8; }
.app img { width: 100%; height: 100%; object-fit: cover; }
.app span { position: absolute; left: 0; right: 0; bottom: 0; background: rgba(27,110,194,.88); color: #fff; font-size: 7pt; padding: 1.6mm 2mm; text-align: center; }
table { width: 100%; border-collapse: collapse; font-size: 8.8pt; }
th { background: #1b6ec2; color: #fff; text-align: left; padding: 2.6mm 3mm; font-size: 9pt; }
td { border: 1px solid #dde5ec; padding: 2.2mm 3mm; vertical-align: top; }
tr:nth-child(even) td { background: #f5f9fc; }
td.k { width: 34%; font-weight: 600; color: #1b6ec2; }
.note { font-size: 7.5pt; color: #98a1ab; margin-top: 3mm; }
.footbar { position: absolute; left: 0; right: 0; bottom: 0; background: linear-gradient(90deg, #1b6ec2, #155a9c); color: #fff; font-size: 8pt; line-height: 1.6; padding: 4mm 14mm; display: flex; align-items: center; gap: 6mm; }
.footbar img { width: 14mm; height: 14mm; background: #fff; padding: 1mm; border-radius: 1mm; }
"""

def esc(s):
    return (s or '').replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def img_uri(rel):
    """读取本地图片并转为 data URI（Chromium set_content 下 file:// 子资源会被拦截）"""
    p = os.path.join(IMG_ROOT, rel or '')
    if not rel or not os.path.exists(p):
        return None
    import base64, mimetypes
    mime = mimetypes.guess_type(p)[0] or 'image/png'
    return f'data:{mime};base64,' + base64.b64encode(open(p, 'rb').read()).decode()

def pick_indicators(specs, limit=5):
    skip = {'product models', 'installation'}
    out = []
    for name, value in specs:
        if name.strip().lower() in skip or len(value) > 44:
            continue
        out.append((name, value))
        if len(out) == limit:
            break
    return out

def render(pid, d, qr_uri):
    title = re.sub(r'^H\s*SERIES\s*·\s*', '', d['series'], flags=re.I).strip().upper()
    models = next((v for k, v in d['specs'] if k.strip().lower() == 'product models'), '')
    eyebrow = ('MODELS: ' + ' / '.join(x.strip() for x in re.split(r'[/,]', models) if x.strip())) if models else 'H SERIES'
    hero = img_uri(d.get('hero'))
    inds = ''.join(f'<div class="ind"><div class="v">{esc(v)}</div><div class="k">{esc(k)}</div></div>'
                   for k, v in pick_indicators(d['specs']))
    feats = []
    for f in (d.get('features') or [])[:6]:
        ic = img_uri(f.get('icon'))
        feats.append('<div class="feat">' + (f'<img src="{ic}"/>' if ic else '') + f'<p>{esc(f["text"])}</p></div>')
    apps = []
    for s in (d.get('scenarios') or [])[:8]:
        im = img_uri(s.get('img'))
        apps.append('<div class="app">' + (f'<img src="{im}"/>' if im else '') + f'<span>{esc(s["label"])}</span></div>')
    rows = ''.join(f'<tr><td class="k">{esc(k)}</td><td>{esc(v)}</td></tr>' for k, v in d['specs'])
    qr = f'<img src="{qr_uri}"/>' if qr_uri else ''
    foot = f'<div class="footbar">{qr}<div>{CONTACT}</div></div>'
    return f"""<!DOCTYPE html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>
<section class="page">
  <div class="brandbar">Hitelecom<sup>®</sup></div>
  <div class="band"><div><div class="eyebrow">{esc(eyebrow)}</div><h1>{esc(title)}</h1>
    <div class="subtitle">{esc(d.get('tagline',''))}</div></div>
    {f'<img class="hero-img" src="{hero}"/>' if hero else ''}</div>
  <div class="body">
    <h2>KEY INDICATORS</h2><div class="indicators">{inds}</div>
    <h2>OVERVIEW</h2><p class="desc">{esc(d.get('desc',''))}</p>
    <h2>FEATURES</h2><div class="featgrid">{''.join(feats)}</div>
  </div>{foot}
</section>
<section class="page">
  <div class="body">
    <h2>APPLICATIONS</h2><div class="appgrid">{''.join(apps)}</div>
    <h2>SPECIFICATIONS</h2>
    <table><tr><th>Item</th><th>Description</th></tr>{rows}</table>
    <p class="note">Specifications may vary by configuration. Hitelecom supports OEM/ODM customization — contact us for variants, certificates and the latest revision.</p>
  </div>{foot}
</section>
</body></html>"""

def extract_data(ids):
    """用 node 从 product.ts 提取数据（复用 ts 内的真实结构与 slug 映射）"""
    js = r"""
const fs=require('fs');
globalThis.getCollection=async()=>[];
const src=fs.readFileSync(process.argv[2],'utf8');
function extractObj(anchor){const a=src.indexOf(anchor);const s=src.indexOf('{',a);
let depth=0;for(let i=s;i<src.length;i++){const c=src[i];if(c=='{')depth++;else if(c=='}'){depth--;if(!depth)return src.slice(s,i+1);}}}
const pc=eval('('+extractObj('export const productContent')+')');
const slugs=eval('('+extractObj('export const productSlugs')+')');
const want=process.argv[3]?process.argv[3].split(','):null;
const out={};
for(const [id,d] of Object.entries(pc.en.details)){
  if(want && !want.includes(id)) continue;
  if(!want && d.pdf) continue;           // 默认只处理缺 PDF 的
  out[id]={slug:slugs[id]||id,series:d.series,tagline:d.tagline,desc:d.desc,
           features:d.features,specs:d.specs,scenarios:d.scenarios,hero:d.heroImg};
}
console.log(JSON.stringify(out));
"""
    with tempfile.NamedTemporaryFile('w', suffix='.cjs', delete=False) as f:
        f.write(js)
        helper = f.name
    r = subprocess.run(['node', helper, os.path.join(APP, 'src', 'data', 'product.ts'),
                        ','.join(ids) if ids else ''], capture_output=True, text=True)
    os.unlink(helper)
    if r.returncode != 0:
        sys.exit('node 数据提取失败：' + r.stderr)
    return json.loads(r.stdout)

def make_qr():
    try:
        import base64, io, qrcode
        buf = io.BytesIO()
        qrcode.make('http://www.hitelecom.com').save(buf, format='PNG')
        return 'data:image/png;base64,' + base64.b64encode(buf.getvalue()).decode()
    except Exception:
        return None

def main():
    ids = sys.argv[1:]
    data = extract_data(ids)
    if not data:
        print('没有需要生成的产品（全部已有 pdf 字段）')
        return
    os.makedirs(OUT_DIR, exist_ok=True)
    qr = make_qr()
    from playwright.sync_api import sync_playwright
    with sync_playwright() as pw:
        br = pw.chromium.launch()
        pg = br.new_page()
        for pid, d in data.items():
            html = render(pid, d, qr)
            pg.set_content(html, wait_until='load')
            out = os.path.join(OUT_DIR, f"{d['slug']}-datasheet.pdf")
            pg.pdf(path=out, format='A4', print_background=True, prefer_css_page_size=True)
            print('generated', out)
        br.close()
    # 回写 product.ts 的 pdf 字段（每种语言各一处）。
    # 安全约束：只在 id 详情块的平衡大括号范围内替换；块内已有非空 pdf 则跳过。
    ts_path = os.path.join(APP, 'src', 'data', 'product.ts')
    ts = open(ts_path).read()
    written = 0
    for pid, d in data.items():
        # 按位置倒序处理：前面的写入不会使后面的匹配位置失效
        matches = sorted(re.finditer(r'("' + re.escape(pid) + r'":\s*\{)', ts),
                         key=lambda m: m.start(), reverse=True)
        for m in matches:
            # 找该块的平衡闭括号
            depth = 0
            end = None
            for i in range(m.end() - 1, len(ts)):
                c = ts[i]
                if c == '{':
                    depth += 1
                elif c == '}':
                    depth -= 1
                    if depth == 0:
                        end = i
                        break
            if end is None:
                continue
            block = ts[m.end() - 1:end]
            pm = re.search(r'"pdf":\s*"([^"]*)"', block)
            if not pm or pm.group(1):
                continue  # 块内无 pdf 字段或已填写 → 不动
            abs_pos = m.end() - 1 + pm.start()
            ts = (ts[:abs_pos] + f'"pdf": "/downloads/{d["slug"]}-datasheet.pdf"'
                  + ts[abs_pos + pm.end() - pm.start():])
            written += 1
    open(ts_path, 'w').write(ts)
    print(f'已回写 product.ts：{written} 处 pdf 字段（{len(data)} 个产品 × 双语）')

if __name__ == '__main__':
    main()
