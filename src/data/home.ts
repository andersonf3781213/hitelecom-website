/**
 * 首页内容（双语）
 * ---------------------------------------------------------------
 * 上文案 / 上产品 / 上新闻，只需要修改本文件：
 *  - hero.slides      首屏轮播（可增删，图片放 src/assets/images/hero/）
 *  - intro.features   “We are the IoT company” 六个能力项
 *  - showcase         云平台 / 网关 / 传感器 三个图文区块
 *  - solutions.items  解决方案卡片
 *  - news.items       新闻卡片（date 格式 YYYY.MM.DD）
 *  - partners.logos   合作伙伴 LOGO 墙
 * 图片路径相对于 src/assets/images/，替换同名文件即可换图。
 */

export interface HeroSlide {
  eyebrow: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  bg: string;    // 背景大图（1920×1080 建议）
  device: string; // 右侧产品图（透明底 PNG）
  deviceAlt: string;
}

export interface Feature { icon: string; title: string; desc: string }
export interface ShowcaseItem {
  title: string; desc: string; cta: string; href: string;
  image: string; imageAlt: string; reverse: boolean;
}
export interface SolutionItem { icon: string; label: string; href: string }
export interface NewsItem {
  image: string; imageAlt: string; source: string; date: string;
  title: string; excerpt: string; href: string;
}

const en = {
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/product/' },
    { label: 'Solutions', href: '/solution/' },
    { label: 'Support', href: '/service/' },
    { label: 'News', href: '/news/' },
    { label: 'About', href: '/about/' },
  ],
  langSwitch: { label: 'Chinese', href: '/zh.html' },
  showOnline: 'View Cloud Demo',
  searchPlaceholder: 'Search products, solutions, news…',

  hero: {
    slides: [
      {
        eyebrow: 'INDUSTRIAL IoT SENSORS',
        title: '10+ Years of Battery Life',
        desc: 'Low-power 4G, NB-IoT, and LoRa sensor terminals built for remote industrial monitoring.',
        cta: 'Explore Sensors',
        href: '/product/lists/cid/261#cate',
        bg: 'hero/bg-sensors.jpg',
        device: 'hero/device-sensors.png',
        deviceAlt: 'Hitelecom ultra-low power IoT sensors',
      },
      {
        eyebrow: 'IoT GATEWAYS',
        title: 'Durable & Reliable',
        desc: 'Connect LoRa sensor networks to the cloud over 4G LTE or Ethernet, with remote OTA updates.',
        cta: 'Explore Gateways',
        href: '/product/lists/cid/258#cate',
        bg: 'hero/bg-gateways.jpg',
        device: 'hero/device-gateways.png',
        deviceAlt: 'Hitelecom industrial IoT gateways',
      },
      {
        eyebrow: 'IoT CLOUD PLATFORM',
        title: 'Remote Monitoring',
        desc: 'Connect, monitor, analyze, and manage field devices from one cloud platform.',
        cta: 'Explore IoT Cloud',
        href: '/product/#cate',
        bg: 'hero/bg-cloud.jpg',
        device: 'hero/device-cloud.png',
        deviceAlt: 'Hitelecom cloud platform dashboard',
      },
    ] as HeroSlide[],
  },

  intro: {
    title: 'Industrial IoT, from Sensor to Cloud',
    subtitle:
      'Hitelecom designs and manufactures industrial IoT sensors, gateways, and cloud-connected monitoring solutions. We support 4G LTE, NB-IoT, LoRa/LoRaWAN, customer-platform integration, private deployment, and OEM/ODM development.',
    features: [
      { icon: 'features/icon-sensors.png', title: 'IoT Sensors', desc: 'Measure temperature, humidity, pressure, air quality, and other field conditions.' },
      { icon: 'features/icon-controllers.png', title: 'IoT Controllers', desc: 'Local data processing and control for connected equipment.' },
      { icon: 'features/icon-cloud.png', title: 'IoT Cloud', desc: 'Connect, monitor, configure, and maintain devices remotely.' },
      { icon: 'features/icon-gateways.png', title: 'IoT Gateways', desc: 'Connect field devices to cloud or private platforms.' },
      { icon: 'features/icon-customized.png', title: 'Custom IoT Development', desc: 'Custom hardware, firmware, enclosures, and platform integration.' },
      { icon: 'features/icon-app.png', title: 'IoT App', desc: 'Configure devices, monitor data, receive alerts, and manage supported updates remotely.' },
    ] as Feature[],
  },

  showcase: [
    {
      title: 'Cloud Platform',
      desc: 'A cloud-native IoT platform for device connectivity, remote management, data visualization, alerts, and application integration.',
      cta: 'Explore IoT Cloud',
      href: '/product/',
      image: 'sections/cloud-platform.png',
      imageAlt: 'Hitelecom cloud-native IoT platform illustration',
      reverse: false,
    },
    {
      title: 'IoT Gateways',
      desc: 'Connect sensors to the cloud with protocol conversion, data aggregation, and optional edge processing.',
      cta: 'Explore Gateways',
      href: '/product/lists/cid/258#cate',
      image: 'sections/iot-gateways.jpg',
      imageAlt: 'Hitelecom IoT gateways connect sensors to the cloud',
      reverse: true,
    },
    {
      title: 'IoT Sensors',
      desc: 'Measure temperature, humidity, pressure, vibration, motion, air quality, and other physical conditions.',
      cta: 'Explore Sensors',
      href: '/product/lists/cid/261#cate',
      image: 'sections/iot-sensors.jpg',
      imageAlt: 'Hitelecom IoT sensors for data collection',
      reverse: false,
    },
  ] as ShowcaseItem[],

  solutions: {
    title: 'Explore Our IoT Solutions',
    subtitle:
      'Monitor field conditions in real time, automate responses, and make faster operational decisions with connected sensors and cloud data.',
    items: [
      { icon: 'solutions/icon-energy.png', label: 'Industrial Monitoring', href: '/solution/show/id/58' },
      { icon: 'solutions/icon-agriculture.png', label: 'Smart Agriculture', href: '/solution/show/id/65' },
      { icon: 'solutions/icon-campus.png', label: 'Smart Water', href: '/solution/show/id/67' },
      { icon: 'solutions/icon-healthcare.png', label: 'Smart Energy', href: '/solution/show/id/59' },
      { icon: 'solutions/icon-industrial.png', label: 'Smart City', href: '/solution/show/id/57' },
      { icon: 'solutions/icon-building.png', label: 'Smart Industrial Parks', href: '/solution/show/id/60' },
    ] as SolutionItem[],
  },

  news: {
    title: 'News Center',
    subtitle:
      'Company updates, product launches, industry insights, and upcoming events from Hitelecom.',
    cta: 'View All News',
    moreHref: '/news/',
    items: [
      {
        image: 'news/news-iote-2024.png',
        imageAlt: 'Hitelecom at IOTE 2024 International IoT Expo Shenzhen',
        source: 'Hitelecom',
        date: '2024.08.28',
        title: 'Hitelecom Exhibits at IOTE Shenzhen 2024',
        excerpt:
          "The 22nd International IoT Exhibition (IOTE 2024) Shenzhen will be held from August 28th to 30th, 2024, at the Shenzhen World Exhibition & Convention Center (Bao'an). As a professional IoT product and service provider, Hitelecom will showcase its IoT industry solutions at booth 10B33 in Hall 10.",
        href: '/news/show/id/1377',
      },
      {
        image: 'news/news-pipeline.png',
        imageAlt: 'Underground utility networks investment',
        source: 'Hitelecom',
        date: '2024.03.09',
        title: 'China Plans Major Upgrades to Urban Underground Utilities',
        excerpt:
          'On March 9, 2024, during the press conference on people\u2019s livelihood at the Second Session of the 14th National People\u2019s Congress, over 100,000 kilometers of underground pipelines will be upgraded, and flood-prone areas management will be initiated in 100 cities.',
        href: '/news/show/id/1379',
      },
      {
        image: 'news/news-iso9001.jpg',
        imageAlt: 'Hitelecom ISO 9001 quality management certification',
        source: 'Hitelecom',
        date: '2023.08.28',
        title: 'Hitelecom Achieves ISO 9001 Certification',
        excerpt:
          'Hitelecom has achieved ISO 9001 quality management system certification, covering the design and manufacture of IoT sensor products.',
        href: '/news/show/id/1357',
      },
    ] as NewsItem[],
  },

  partners: {
    title: 'Partners',
    subtitle:
      'Working with technology and channel partners to deliver reliable IoT deployments worldwide.',
  },

  cta: {
    title: 'Build Your IoT Solution with Hitelecom',
    subtitle:
      'From sensors and connectivity to cloud integration and OEM/ODM development, we help turn field data into deployable solutions.',
    primary: { label: 'View Cloud Demo', href: 'http://cloud.hitelecom.com/' },
    secondary: { label: 'Discuss Your Project', href: '/about/contact' },
  },

  footer: {
    columns: [
      {
        title: 'PRODUCTS',
        links: [
          { label: 'IoT Cloud', href: '/product/' },
          { label: 'IoT App', href: '/product/app' },
          { label: 'IoT Sensors', href: '/product/lists/cid/261' },
          { label: 'IoT Gateways', href: '/product/lists/cid/258' },
          { label: 'Weather Station', href: '/product/lists/cid/257' },
          { label: 'Custom Development', href: '/product/lists/cid/256' },
        ],
      },
      {
        title: 'SOLUTIONS',
        links: [
          { label: 'Industrial IoT', href: '/solution/show/id/58' },
          { label: 'Smart Agriculture', href: '/solution/show/id/65' },
          { label: 'Smart Campus', href: '/solution/show/id/64' },
          { label: 'Smart Industrial Parks', href: '/solution/show/id/60' },
          { label: 'Smart Energy', href: '/solution/show/id/59' },
          { label: 'Smart City', href: '/solution/show/id/57' },
          { label: 'Tourism and Heritage Sites', href: '/solution/show/id/66' },
          { label: 'Smart Water', href: '/solution/show/id/67' },
        ],
      },
      {
        title: 'SUPPORT',
        links: [
          { label: 'Technical Support', href: '/service/#page1' },
          { label: 'Software', href: '/service/#page2' },
          { label: 'Downloads', href: '/service/#page3' },
          { label: 'After-Sales Service', href: '/service/#page4' },
        ],
      },
      {
        title: 'NEWS',
        links: [
          { label: 'Company News', href: '/news/' },
          { label: 'Exhibition', href: '/news/index/cid/81' },
          { label: 'Industry News', href: '/news/index/cid/80' },
          { label: 'FAQs', href: '/news/faqs' },
        ],
      },
      {
        title: 'ABOUT',
        links: [
          { label: 'Company Overview', href: '/about/' },
          { label: 'Quality & Reliability', href: '/about/quality' },
          { label: 'Partners', href: '/about/partner' },
          { label: 'Careers', href: '/about/joinus' },
          { label: 'Contact Us', href: '/about/contact' },
        ],
      },
    ],
    contactTitle: 'CONTACT',
    followTitle: 'FOLLOW US',
    copyright: '© 2018–2026 Hitelecom. All rights reserved.',
  },
};

const zh: typeof en = {
  nav: [
    { label: '首页', href: '/' },
    { label: '产品中心', href: '/product/' },
    { label: '解决方案', href: '/solution/' },
    { label: '支持服务', href: '/service/' },
    { label: '新闻中心', href: '/news/' },
    { label: '关于我们', href: '/about/' },
  ],
  langSwitch: { label: 'English', href: '/' },
  showOnline: '宏太云演示',
  searchPlaceholder: '搜索产品、方案、新闻…',

  hero: {
    slides: [
      {
        eyebrow: '宏太传感器',
        title: '低功耗，绿色节能',
        desc: '超过10年的使用寿命，IP68防护等级支持多种应用和环境',
        cta: '了解更多',
        href: '/product/lists/cid/261#cate',
        bg: 'hero/bg-sensors.jpg',
        device: 'hero/device-sensors.png',
        deviceAlt: '宏太低功耗物联网传感器',
      },
      {
        eyebrow: '宏太物联网关',
        title: '稳定传，耐用可靠',
        desc: '宏太物联网网关支持多种通信协议，易于部署，且能与各种传感器和设备无缝对接，保障数据流的稳定性',
        cta: '了解更多',
        href: '/product/lists/cid/258#cate',
        bg: 'hero/bg-gateways.jpg',
        device: 'hero/device-gateways.png',
        deviceAlt: '宏太工业物联网关',
      },
      {
        eyebrow: '宏太云平台',
        title: '设备云, 远程监控',
        desc: '设备连接、设备管理、远程监控、预测分析和实时告警与通知，利用AI进行数据分析生成直观的可视化面板',
        cta: '了解更多',
        href: '/product/#cate',
        bg: 'hero/bg-cloud.jpg',
        device: 'hero/device-cloud.png',
        deviceAlt: '宏太云平台可视化面板',
      },
    ],
  },

  intro: {
    title: '与宏太一起感知世界',
    subtitle: '以全新物联技术，赋能工业数字化转型',
    features: [
      { icon: 'features/icon-sensors.png', title: '宏太云', desc: '设备智能连接，管理和运维' },
      { icon: 'features/icon-controllers.png', title: '高速传输', desc: 'XGSPON OLT, ONU' },
      { icon: 'features/icon-cloud.png', title: '变送器', desc: 'LoRa, NB, 4G 各类终端智能体' },
      { icon: 'features/icon-gateways.png', title: '宏太APP', desc: '远程配置, 监测, 告警, 升级' },
      { icon: 'features/icon-customized.png', title: '中低速传输', desc: 'DTU, RTU, LoRa Gateway' },
      { icon: 'features/icon-app.png', title: '传感器', desc: '数据采集, 温度, 压力, 液位等' },
    ],
  },

  showcase: [
    {
      title: '宏太云平台',
      desc: '处理和分析大规模数据集，提供实时洞察，优化和决策。大规模分布式物联云平台，支持海量设备连接，管理和运维，为设备厂家，工程商提供一站式物联网解决方案，并支持私有化定制部署。',
      cta: '了解更多',
      href: '/product/',
      image: 'sections/cloud-platform.png',
      imageAlt: '宏太云原生物联网平台',
      reverse: false,
    },
    {
      title: '宏太数据传输',
      desc: '以全新物联技术，赋能工业数字化转型。宏太物联网网关支持多种通信协议，易于部署，且能与各种传感器和设备无缝对接，保障数据流的稳定性。',
      cta: '了解更多',
      href: '/product/lists/cid/258#cate',
      image: 'sections/iot-gateways.jpg',
      imageAlt: '宏太物联网关连接传感器与云平台',
      reverse: true,
    },
    {
      title: '宏太传感器',
      desc: '感知，测量，采集，来自物理世界的数据。感知终端设备采用超低功耗设计，优化电源管理电路和节能算法，以延长电池寿命，减少能源消耗，支持绿色可持续发展。',
      cta: '了解更多',
      href: '/product/lists/cid/261#cate',
      image: 'sections/iot-sensors.jpg',
      imageAlt: '宏太物联网传感器数据采集',
      reverse: false,
    },
  ],

  solutions: {
    title: '为您量身定制的解决方案',
    subtitle: '以传感 + AI驱动实时监测、控制和决策，实现智能化生产，提高效率、质量和可持续性',
    items: [
      { icon: 'solutions/icon-energy.png', label: '工业监测', href: '/solution/show/id/58' },
      { icon: 'solutions/icon-agriculture.png', label: '智慧农业', href: '/solution/show/id/65' },
      { icon: 'solutions/icon-campus.png', label: '智慧水务', href: '/solution/show/id/67' },
      { icon: 'solutions/icon-healthcare.png', label: '智慧能源', href: '/solution/show/id/59' },
      { icon: 'solutions/icon-industrial.png', label: '智慧城市', href: '/solution/show/id/57' },
      { icon: 'solutions/icon-building.png', label: '智慧园区', href: '/solution/show/id/60' },
    ],
  },

  news: {
    title: '了解宏太更多消息',
    subtitle: '以传感 + AI驱动实时监测、控制和决策，实现智能化生产，提高效率、质量和可持续性',
    cta: '了解更多',
    moreHref: '/news/',
    items: [
      {
        image: 'news/news-iote-2024.png',
        imageAlt: '宏太通信亮相IOTE 2024国际物联网展深圳站',
        source: 'hitelecom',
        date: '2024.08.28',
        title: '宏太通信亮相IOTE 2024国际物联网·深圳站',
        excerpt:
          'IOTE 2024第二十二届国际物联网展·深圳站于2024年8月28日—30日在深圳国际会展中心（宝安）开展，宏太通信作为专业的物联网产品服务商携物联网行业解决方案在10号馆10B33展位精彩亮相。',
        href: '/news/show/id/1377',
      },
      {
        image: 'news/news-pipeline.png',
        imageAlt: '地下管网新增投资4万亿元',
        source: 'hitelecom',
        date: '2024.03.09',
        title: '地下管网新增投资4万亿元',
        excerpt:
          '2024年3月9日下午，在十四届全国人大二次会议民生主题记者会上，住房和城乡建设部部长倪虹表示，2024年改造5万个老旧小区，2024年改造10万公里以上地下管网。',
        href: '/news/show/id/1379',
      },
      {
        image: 'news/news-iso9001.jpg',
        imageAlt: '宏太通信通过ISO9001质量体系认证',
        source: 'hitelecom',
        date: '2023.08.28',
        title: 'ISO9001质量体系认证',
        excerpt:
          '我司顺利通过ISO 9001质量管理体系认证。这一成就标志着我们在提供高质量产品和服务方面迈出了重要一步，进一步提升了市场竞争力和品牌声誉。',
        href: '/news/show/id/1357',
      },
    ],
  },

  partners: {
    title: '信任源于合作伙伴的认可',
    subtitle: '宏太通信为客户提供专业的物联解决方案，客户的信任是对我们的认可',
  },

  cta: {
    title: '宏太，为您创建物联网云平台',
    subtitle: '数字传感·通信传输·云计算·智慧场景·定制化等专业一站式整体解决方案',
    primary: { label: '免费试用', href: 'http://cloud.hitelecom.com/' },
    secondary: { label: '联系我们', href: '/about/contact' },
  },

  footer: {
    columns: [
      {
        title: '产品中心',
        links: [
          { label: '宏太云', href: '/product/' },
          { label: '宏太APP', href: '/product/app' },
          { label: '传感器', href: '/product/lists/cid/261' },
          { label: '网关', href: '/product/lists/cid/258' },
          { label: '气象站', href: '/product/lists/cid/257' },
          { label: '定制品', href: '/product/lists/cid/256' },
        ],
      },
      {
        title: '解决方案',
        links: [
          { label: '智慧工业', href: '/solution/show/id/58' },
          { label: '智慧农业', href: '/solution/show/id/65' },
          { label: '智慧校园', href: '/solution/show/id/64' },
          { label: '智慧园区', href: '/solution/show/id/60' },
          { label: '智慧能源', href: '/solution/show/id/59' },
          { label: '智慧城市', href: '/solution/show/id/57' },
          { label: '智慧景区', href: '/solution/show/id/66' },
          { label: '智慧水务', href: '/solution/show/id/67' },
        ],
      },
      {
        title: '支持服务',
        links: [
          { label: '技术支持', href: '/service/#page1' },
          { label: '软件下载', href: '/service/#page2' },
          { label: '文档下载', href: '/service/#page3' },
          { label: '售后服务', href: '/service/#page4' },
        ],
      },
      {
        title: '新闻中心',
        links: [
          { label: '公司新闻', href: '/news/' },
          { label: '展会信息', href: '/news/index/cid/81' },
          { label: '行业资讯', href: '/news/index/cid/80' },
          { label: '常见问题', href: '/news/faqs' },
        ],
      },
      {
        title: '关于我们',
        links: [
          { label: '企业简介', href: '/about/' },
          { label: '质量与可靠', href: '/about/quality' },
          { label: '生态伙伴', href: '/about/partner' },
          { label: '人才招聘', href: '/about/joinus' },
          { label: '联系我们', href: '/about/contact' },
        ],
      },
    ],
    contactTitle: '联系我们',
    followTitle: '关注我们',
    copyright: '版权所有 © 2018-2026 上海宏太通信技术有限公司',
  },
};

/** 合作伙伴 LOGO 墙（双语共用，替换 src/assets/images/partners/ 同名文件即可） */
export const partnerLogos = [
  { img: 'partners/logo-01.jpg', alt: 'Huawei' },
  { img: 'partners/logo-02.jpg', alt: 'China Mobile' },
  { img: 'partners/logo-03.jpg', alt: 'Alibaba Cloud' },
  { img: 'partners/logo-04.jpg', alt: 'AWS' },
  { img: 'partners/logo-05.jpg', alt: 'América Móvil' },
  { img: 'partners/logo-06.jpg', alt: 'Broadcom' },
  { img: 'partners/logo-07.jpg', alt: 'Microsoft' },
  { img: 'partners/logo-08.jpg', alt: 'Microsoft Azure' },
  { img: 'partners/logo-09.jpg', alt: 'Nordic Semiconductor' },
  { img: 'partners/logo-10.jpg', alt: 'NXP' },
  { img: 'partners/logo-11.jpg', alt: 'Sensirion' },
  { img: 'partners/logo-12.jpg', alt: 'Semtech' },
  { img: 'partners/logo-13.jpg', alt: 'STMicroelectronics' },
  { img: 'partners/logo-14.jpg', alt: 'Texas Instruments' },
  { img: 'partners/logo-15.jpg', alt: 'Analog Devices' },
  { img: 'partners/logo-16.jpg', alt: 'u-blox' },
  { img: 'partners/logo-17.jpg', alt: 'Tencent Cloud' },
  { img: 'partners/logo-18.jpg', alt: 'Quectel' },
  { img: 'partners/logo-19.jpg', alt: 'Google Cloud' },
  { img: 'partners/logo-20.jpg', alt: 'Xilinx' },
  { img: 'partners/logo-21.jpg', alt: '3M' },
];

export const homeContent = { en, zh } as const;
export type HomeContent = (typeof homeContent)['en'];
