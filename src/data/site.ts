/**
 * 站点级信息配置
 * 修改联系方式、外链、备案号等只需改这里，全站生效。
 */

export const site = {
  name: 'Hitelecom',
  companyEn: 'Shanghai Hitelecom Communication Technology Co., Ltd.',
  companyZh: '上海宏太通信技术有限公司',

  // 联系方式（页脚 / 浮动栏 / 联系页展示共用；实际收件邮箱为 .cn）
  phone: '+86-18616602589',
  phoneHref: 'tel:+86-18616602589',
  whatsapp: 'https://wa.me/8618616602589',
  wechatId: '18616602589',
  email: 'sales@hitelecom.cn',
  // 结构化数据专用邮箱：与 SEO/GEO 关键词文档的 Organization JSON-LD 逐字一致
  emailLd: 'sales@hitelecom.com',

  // 云平台演示地址（导航栏 Show Online / CTA 免费试用）
  cloudUrl: 'http://cloud.hitelecom.com',

  /**
   * 询盘表单提交端点（静态站无后端，需第三方表单服务）：
   * 推荐 Web3Forms（免费，https://web3forms.com，用收件邮箱注册取得 Access Key）。
   * 官方提交格式：POST https://api.web3forms.com/submit，请求体携带 access_key 字段
   * （注意：不是 URL  query 参数——query 写法非官方文档格式，可能被拒）。
   * 配置后表单真实发送到邮箱并跳转感谢页；留空则回退为打开访客邮件客户端（mailto）。
   * 换 Formspree：formEndpoint 填 'https://formspree.io/f/你的ID'，formAccessKey 留空即可。
   */
  formEndpoint: 'https://api.web3forms.com/submit',
  /** Web3Forms Access Key（与 formEndpoint 配套；当前收件邮箱 sales@hitelecom.cn） */
  formAccessKey: '6cd14860-b673-4f14-af67-76ac66991e8f',

  /**
   * 高德地图 JS API Key（关于我们-联系我们页的地图）。
   * 申请：https://lbs.amap.com/ → 应用管理 → 创建「Web端(JS API)」类型 Key，免费。
   * 填入后地图自动启用；留空则联系页显示静态地址卡，不加载地图脚本、不会报错。
   */
  amapKey: '',

  // 社交媒体（页脚 Follow Us）——仅保留真实联系方式；无官方账号的平台不放占位链接（GEO sameAs 一致性要求）
  socials: [
    { name: 'WhatsApp', href: 'https://wa.me/8618616602589', icon: 'whatsapp' },
    { name: 'WeChat', href: '#wechat', icon: 'wechat' },
  ],

  // 备案信息（中国大陆站点必须保留）
  icp: '沪ICP备2023001528号-1',
  icpUrl: 'https://beian.miit.gov.cn/',

  tagline: {
    en: 'IoT Turnkey Solution Provider',
    zh: '物联网整体解决方案提供商',
    es: 'Proveedor de soluciones integrales de IoT',
    de: 'Anbieter ganzheitlicher IoT-Lösungen',
  },
} as const;

/**
 * 默认 SEO（页面可覆盖）
 * 核心词条（客户确认版）：主打户外/工业 4G + NB-IoT 传感终端；
 * LoRa/LoRaWAN 仅作部分型号与私有化部署的辅助能力，不作为核心投放词。
 * 注意：温湿度记录仪支持 NFC/USB，不得统称为 "NB-IoT data loggers"。
 */
export const defaultSeo = {
  en: {
    title:
      'Hitelecom | Industrial 4G & NB-IoT Sensors',
    description:
      'Hitelecom designs industrial 4G, NB-IoT and LoRa sensor terminals, data loggers and cloud integrations for remote monitoring, with OEM/ODM support.',
    keywords:
      'Hitelecom, industrial IoT sensors, outdoor 4G IoT sensors, NB-IoT sensors, cellular IoT sensor terminals, LoRa sensors, IoT cloud integration, industrial temperature sensors, temperature and humidity sensors, temperature and humidity data loggers, air quality sensors, TVOC sensors, wireless pressure sensors, soil moisture sensors, tilt sensors, vibration sensors, submersible level sensors, radar distance sensors, asset tracking sensors, custom gas sensors, IoT sensors manufacturer China, OEM ODM IoT sensors',
  },
  zh: {
    title:
      '宏太通信 Hitelecom - 工业物联网传感器厂家 | 户外4G/NB-IoT传感终端、记录仪、物联网云平台',
    description:
      '上海宏太通信技术有限公司（Hitelecom）设计与制造50余种工业物联网传感终端与记录仪配置，主打户外与工业4G、NB-IoT市场，部分型号支持LoRa/LoRaWAN，可接入宏太云、客户云平台或私有化部署（API/MQTT），覆盖工业监测、智慧水务、智慧城市、智慧农业，支持OEM/ODM定制。',
    keywords:
      '宏太通信,Hitelecom,工业物联网传感器,户外4G传感器,NB-IoT传感器,蜂窝物联网传感终端,工业温度传感器,温湿度传感器,温湿度记录仪,空气质量传感器,TVOC传感器,无线压力传感器,土壤水分传感器,倾角传感器,振动传感器,投入式液位传感器,雷达测距传感器,资产定位终端,定制气体传感器,物联网云平台,传感器OEM,传感器ODM',
  },
  de: {
    title:
      'Hitelecom | Industrielle 4G- & NB-IoT-Sensoren',
    description:
      'Hitelecom entwickelt industrielle 4G-, NB-IoT- und LoRa-Sensoren, Datenlogger und Cloud-Integrationen für die Fernüberwachung, mit OEM/ODM-Support.',
    keywords:
      'Hitelecom, industrielle IoT-Sensoren, 4G-IoT-Sensoren für Außenbereich, NB-IoT-Sensoren, zellulare IoT-Sensorterminals, LoRa-Sensoren, IoT-Cloud-Integration, industrielle Temperatursensoren, Temperatur- und Feuchtigkeitssensoren, Datenlogger für Temperatur und Feuchtigkeit, Luftqualitätssensoren, TVOC-Sensoren, drahtlose Drucksensoren, Bodenfeuchtesensoren, Neigungssensoren, Vibrationssensoren, Tauch-Füllstandssensoren, Radar-Abstandssensoren, Asset-Tracking-Sensoren, kundenspezifische Gassensoren, IoT-Sensoren Hersteller China, OEM ODM IoT-Sensoren',
  },
  es: {
    title:
      'Hitelecom | Sensores industriales 4G y NB-IoT',
    description:
      'Hitelecom diseña terminales de sensores industriales 4G, NB-IoT y LoRa, registradores de datos e integración con la nube para monitoreo remoto, con soporte OEM/ODM.',
    keywords:
      'Hitelecom, sensores IoT industriales, sensores IoT 4G para exteriores, sensores NB-IoT, terminales de sensores IoT celulares, sensores LoRa, integración IoT en la nube, sensores de temperatura industriales, sensores de temperatura y humedad, registradores de datos de temperatura y humedad, sensores de calidad del aire, sensores TVOC, sensores de presión inalámbricos, sensores de humedad del suelo, sensores de inclinación, sensores de vibración, sensores de nivel sumergibles, sensores de distancia por radar, sensores de rastreo de activos, sensores de gas personalizados, fabricante de sensores IoT China, sensores IoT OEM ODM',
  },
} as const;
