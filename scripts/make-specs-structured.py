#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从 src/data/product.ts 的 specs（[名称, 值] 对）自动生成 specsStructured
（{name, value, unitText?, minValue?, maxValue?}），供 JSON-LD additionalProperty 输出。

为什么需要：unitText/minValue/maxValue 是 AI 引擎做数值比较的依据
（如「精度优于 0.01° 的倾斜传感器」「能在 -40°C 工作的压力传感器」）；
纯文本 specs 无法支撑这类查询。

规则（保守，拿不准就不加数值元数据）：
- 干净区间（"-200°C to 800°C"、"-20℃ ～ 70℃"、"0-100,000 ppb"）→ minValue/maxValue（+en 带 unitText）
- 单值带单位（"±0.005°"、"1 ppb"，可带括号备注）→ unitText
- 英文不等式（">10 Years (1-Hour Reporting)"）→ minValue + unitText
- 已有 specsStructured 的产品跳过；值文本本身一律不改动

用法：python3 scripts/make-specs-structured.py
"""
import json, re, sys

PATH = 'src/data/product.ts'
ts = open(PATH, encoding='utf-8').read()

ZH_START = ts.find('"zh": {')  # zh 数据段起点（键带引号），用于判断locale

UNITS_EN = [
    (r'us/cm|μS/cm', 'microsiemens per centimetre'),
    (r'mg/kg', 'milligram per kilogram'), (r'mg/L', 'milligram per litre'),
    (r'°C|℃', 'degree Celsius'), (r'°F', 'degree Fahrenheit'),
    (r'%RH', 'percent relative humidity'), (r'ppb', 'parts per billion'), (r'ppm', 'parts per million'),
    (r'm/s', 'metre per second'), (r'km/h', 'kilometre per hour'),
    (r'(?i:hPa)', 'hectopascal'), (r'(?i:kPa)', 'kilopascal'), (r'(?i:MPa)', 'megapascal'), (r'(?i:\bPa\b)', 'pascal'),
    (r'mAh', 'milliampere hour'), (r'mA', 'milliampere'),
    (r'mV', 'millivolt'), (r'V', 'volt'),
    (r'mm', 'millimetre'), (r'cm', 'centimetre'), (r'\bm\b', 'metre'),
    (r'MHz', 'megahertz'), (r'kHz', 'kilohertz'), (r'Hz', 'hertz'),
    (r'dBm', 'decibel-milliwatt'), (r'dB', 'decibel'), (r'lux|lx', 'lux'),
    (r'Years?', 'year'), (r'Hours?', 'hour'), (r'Days?', 'day'), (r'Minutes?', 'minute'), (r'Seconds?', 'second'),
    (r'\bkg\b', 'kilogram'), (r'\bg\b', 'gram'), (r'\bW\b', 'watt'), (r'bar', 'bar'),
    (r'°', 'degree'), (r'%', 'percent'),
]
UNITS_ZH = [
    (r'us/cm|μS/cm', '微西门子每厘米'),
    (r'mg/kg', '毫克每千克'), (r'mg/L', '毫克每升'),
    (r'°C|℃', '摄氏度'), (r'°F', '华氏度'),
    (r'%RH', '相对湿度百分比'), (r'ppb', '十亿分之一'), (r'ppm', '百万分之一'),
    (r'm/s', '米每秒'), (r'km/h', '千米每小时'),
    (r'(?i:hPa)', '百帕'), (r'(?i:kPa)', '千帕'), (r'(?i:MPa)', '兆帕'), (r'(?i:\bPa\b)', '帕'),
    (r'mAh', '毫安时'), (r'mA', '毫安'), (r'mV', '毫伏'), (r'V', '伏'),
    (r'mm', '毫米'), (r'cm', '厘米'), (r'\bm\b', '米'),
    (r'MHz', '兆赫'), (r'kHz', '千赫'), (r'Hz', '赫兹'),
    (r'dBm', '分贝毫瓦'), (r'dB', '分贝'), (r'lux|lx', '勒克斯'),
    (r'年', '年'), (r'小时', '小时'), (r'天', '天'), (r'分钟', '分钟'), (r'秒', '秒'),
    (r'°', '度'), (r'%', '百分比'),
]

NUM = r'[+-]?\d[\d,]*(?:\.\d+)?'

def num(s):
    return float(s.replace(',', '').lstrip('+'))

def detect_unit(value, zh):
    best = None
    for pat, u in (UNITS_ZH if zh else UNITS_EN):
        m = re.search(pat, value)
        if m and (best is None or m.start() < best[0] or (m.start() == best[0] and len(m.group(0)) > len(best[1]))):
            best = (m.start(), m.group(0), u)
    return best[2] if best else None

def convert(name, value, zh):
    """返回 SpecItem dict。"""
    item = {'name': name, 'value': value}
    v = value.strip()
    # 1) 干净区间：A to B / A ~ B / A～B / A到B / 0-100,000 ppb，允许尾部括号备注或"可定制"
    m = re.match(rf'^({NUM})\s*(?:°C|℃|°F|°|ppb|ppm|%RH|%|us/cm|μS/cm|mg/kg|mg/L|m/s|km/h|mm|cm|m|hPa|Hpa|kPa|KPa|kpa|MPa|Mpa|mpa|Pa|bar|dBm|dB|V|lux)?\s*(?:to|~|～|–|—|到|至|(?<=[\dA-Za-z%°])-)\s*({NUM})\s*(°C|℃|°F|°|ppb|ppm|%RH|%|us/cm|μS/cm|mg/kg|mg/L|m/s|km/h|mm|cm|m|hPa|Hpa|kPa|KPa|kpa|MPa|Mpa|mpa|Pa|bar|dBm|dB|V|lux)?\s*(\(.*\)|（.*）|可定制)?$', v)
    if m:
        a, b = num(m.group(1)), num(m.group(2))
        if a < b:
            item['minValue'], item['maxValue'] = a, b
            if not zh:  # 中文版 282 范本区间不带 unitText，保持范本风格
                u = detect_unit(v, zh)
                if u: item['unitText'] = u
            return item
    # 2) 英文不等式：>10 Years (1-Hour Reporting) / ≥5 V
    if not zh:
        m = re.match(rf'^[>≥]\s*({NUM})\s*([A-Za-z°%/]+(?:\s+[A-Za-z]+)?)\s*(\(.*\))?$', v)
        if m:
            u = detect_unit(m.group(2), zh)
            if u:
                item['minValue'] = num(m.group(1)); item['unitText'] = u
                return item
    # 3) 单值带单位（允许括号备注）：±0.005°、1 ppb、±0.5°C (Customizable...)
    m = re.match(rf'^[±+\-]?\s*{NUM}\s*[^\d\s(（].*?(\(.*\)|（.*）)?$', v)
    if m:
        # 形如 0kPa～1MPa/1.6MPa/... 的多单位选项列表，不标单位以免误导
        unit_tokens = set(t.lower().rstrip('.') for t in re.findall(r'[A-Za-z°℃%]+', re.sub(r'\d[\d,.]*', '', v)))
        multi = '/' in v and len(unit_tokens) > 1
        if not multi:
            u = detect_unit(v, zh)
            if u: item['unitText'] = u
    return item

def find_specs_blocks(s):
    """产出每个 "specs": [ ... ] 的 (起, 止(含]), 内容)。"""
    for m in re.finditer(r'"specs":\s*\[', s):
        i = m.end() - 1  # 指向 [
        depth, j = 0, i
        while j < len(s):
            c = s[j]
            if c == '[': depth += 1
            elif c == ']':
                depth -= 1
                if depth == 0: break
            elif c == '"':
                j += 1
                while j < len(s) and s[j] != '"':
                    j += 2 if s[j] == '\\' else 1
            j += 1
        yield m.start(), j, s[i:j + 1]

def parse_pairs(arr):
    return [(a.replace('\\"', '"'), b.replace('\\"', '"'))
            for a, b in re.findall(r'\[\s*"((?:[^"\\]|\\.)*)",\s*"((?:[^"\\]|\\.)*)"\s*\]', arr)]

def emit(items):
    lines = ['    "specsStructured": [']
    for k, it in enumerate(items):
        lines.append('     {')
        props = [f'"name": {json.dumps(it["name"], ensure_ascii=False)}',
                 f'"value": {json.dumps(it["value"], ensure_ascii=False)}']
        if 'unitText' in it: props.append(f'"unitText": {json.dumps(it["unitText"], ensure_ascii=False)}')
        if 'minValue' in it: props.append(f'"minValue": {json.dumps(it["minValue"])}')
        if 'maxValue' in it: props.append(f'"maxValue": {json.dumps(it["maxValue"])}')
        for q, p in enumerate(props):
            lines.append(f'      {p}{"," if q < len(props) - 1 else ""}')
        lines.append(f'     }}{"," if k < len(items) - 1 else ""}')
    lines.append('    ],')
    return '\n'.join(lines)

# 收集替换（逆序应用，避免位置漂移）
edits, skipped = [], 0
blocks = list(find_specs_blocks(ts))
for k, (st, en, arr) in enumerate(blocks):
    nxt = blocks[k + 1][0] if k + 1 < len(blocks) else len(ts)
    if '"specsStructured"' in ts[en:nxt]:
        skipped += 1
        continue
    pairs = parse_pairs(arr)
    if not pairs:
        print(f'!! 空 specs 块 @{st}', file=sys.stderr); continue
    zh = st > ZH_START
    items = [convert(n, v, zh) for n, v in pairs]
    # specs 数组的 ] 后通常紧跟逗号；插入到逗号之后，块尾自带逗号与后续属性分隔
    pos = en + 1
    if ts[pos:pos + 1] == ',':
        pos += 1
    edits.append((pos, '\n' + emit(items)))

for pos, text in sorted(edits, reverse=True):
    ts = ts[:pos + 1] + text + ts[pos + 1:]

open(PATH, 'w', encoding='utf-8').write(ts)
print(f'完成：新增 {len(edits)} 个 specsStructured 块，跳过已有 {skipped} 个')
