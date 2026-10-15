/**
 * 空气质量系列页 UI 文案词典（ZH）。
 * 与 strings.en.mjs 同形；{name}/{count}/{application} 等为占位符，渲染时替换。
 * js 段为 series.js 运行时字符串（经 data-i18n 注入，须为纯 JSON，邮件两项不可为空）。
 */
export default {
  // Hero
  heroQuote: '获取报价 ↗',
  heroChoose: '选择监测参数 ↓',
  // 页内导航
  subnavAria: '产品栏目导航',
  navMeasurements: '基础测量',
  navCustom: '定制选项',
  navApplications: '应用场景',
  navModels: '型号与配置',
  navFaq: '常见问题',
  navQuote: '获取报价 ↗',
  // 基础参数
  coreEyebrow: '基础测量',
  // 可选参数
  customEyebrow: '定制测量',
  selectOptions: '选择{name}选项',
  yourAdditional: '您的附加测量',
  emptyOptionSummary: '已包含四项基础测量，可按需增加选项。',
  addToEnquiry: '加入询价 ↗',
  clearOptions: '清空附加选项',
  // 应用场景
  appsEyebrow: '应用场景',
  filterAria: '筛选应用场景',
  allApplications: '全部场景',
  applicationCount: '共{count}个场景',
  galleryNote: '以下图片为 AI 生成的应用场景示意。',
  measureFocus: '监测重点',
  installationNotes: '安装要点',
  addSuggested: '加入建议选项',
  // 环境与活动
  exploreMeasurements: '查看监测参数 ↗',
  // 安装
  installEyebrow: '安装规划',
  installTitle: '从房间出发，规划',
  installAccent: '安装。',
  installIntro: '先确定需要比较的房间和区域，再匹配测量参数、供电方式与数据连接。',
  // 平台接入
  integrationEyebrow: '远程监测与集成',
  discussIntegration: '讨论平台接入 ↗',
  pathRows: [
    ['您的测量组合', '为每个房间选择所需通道'],
    ['您的连接路径', '蜂窝通信，或明确的 LoRa 与接收器／网关方案'],
    ['您的平台记录', '设备标识、单位、时间戳及数据接口'],
    ['您的响应流程', '趋势分析与按配置设置的告警']
  ],
  // 型号与规格
  modelsEyebrow: '系列与配置',
  ladderAria: 'H310-AQ 系列配置',
  startingConfig: '起始配置',
  seriesExtension: '系列扩展',
  startingSmall: '四项基础测量',
  extensionSmall: '面向项目的监测配置',
  baseConfig: '基础配置',
  specCaption: '{name} 基础配置参数与选型信息',
  viewDatasheet: '查看 {name} 规格书（英文）↗',
  customConfig: '定制配置',
  customTitle: '需要更多',
  customAccent: '监测参数？',
  customText: '告诉我们空间用途和需要测量的内容。Hitelecom 可结合传感、通信和安装要求，协助选择合适的配置。',
  customChoices: [
    ['空气质量', 'PM1／PM2.5／PM10 · 甲醛 HCHO · TVOC'],
    ['光照与活动', '照度 · PIR 动作检测'],
    ['专业需求', 'O₂ · 其他参数可按项目讨论']
  ],
  getHelp: '获取配置建议 ↗',
  // FAQ
  faqEyebrow: '项目解答',
  faqTitle: '常见问题',
  faqAccent: '',
  faqIntro: '关于监测参数、安装规划和平台接入，为您的项目提供清晰解答。',
  askProject: '咨询您的项目 ↗',
  // 询价表单
  briefEyebrow: '一起讨论您的项目',
  emailTeam: '联系销售团队',
  contactNote: '如有房间平面图、现场照片或平台要求，也可以一并提供，帮助我们了解项目。',
  yourMeasurements: '您的监测参数',
  editSelection: '修改选择 ↑',
  coreMeasurements: '基础测量',
  coreMeasurementsAria: '基础测量',
  additionalMeasurements: '附加测量',
  emptyFormOptions: '当前仅包含基础测量，可按需增加选项。',
  projectDetails: '您的项目资料',
  projectDetailsSub: '先填写已知信息，其余内容可进一步讨论。',
  applicationLabel: '应用场景',
  chooseApplication: '请选择应用场景',
  anotherApplication: '其他应用',
  countryLabel: '国家／地区',
  countryPlaceholder: '例如：中国',
  quantityLabel: '预计数量',
  quantityPlaceholder: '例如：20台传感器',
  monitorLabel: '希望监测什么？',
  techDetails: '补充技术要求',
  optional: '选填',
  powerLabel: '现场供电／网络',
  powerPlaceholder: '如已确定，请说明现场可用条件',
  platformLabel: '平台／上报要求',
  platformPlaceholder: '例如：现有平台、期望的数据上报间隔',
  reviewEnquiry: '查看询价内容 ↗',
  reviewHelp: '核对内容后，打开您的邮件应用发送询价。',
  enquiryDetails: '询价内容',
  copyEnquiry: '复制询价内容',
  openEmail: '打开邮件应用 ↗',
  noscriptContact: '联系 Hitelecom，讨论您的需求 ↗',
  // 页尾带
  exploreRange: '探索产品系列',
  viewRange: '查看产品系列 ↗',
  contactUs: '联系我们 ↗',
  // 页面级 JSON-LD 文案
  schema: {
    familyName: 'Hitelecom H310-AQ 室内空气质量传感器系列',
    variesBy: '监测配置',
    variantDescription: 'CO₂、温度、相对湿度、大气压四项基础测量配置',
    breadcrumb: ['首页', '物联网传感器', '空气质量', '室内空气质量传感器'],
    listName: '室内空气质量应用场景',
    imageCaptionSuffix: ' — AI 生成的应用场景示意。',
    imageCredit: 'AI 生成的场景示意，并非真实客户安装现场。'
  },
  // series.js 运行时字符串（经 data-i18n 注入，须为纯 JSON）
  js: {
    emptyOptionSummary: '已包含四项基础测量，可按需增加选项。',
    emptyFormOptions: '当前仅包含基础测量，可按需增加选项。',
    applicationCountOne: '共{count}个场景',
    applicationCountOther: '共{count}个场景',
    suggestionsAdded: '已加入“{application}”的建议选项，并保留您已有的选择；您可以返回上方调整。',
    notProvided: '待沟通',
    noneSelected: '未选择',
    enquiryCopied: '询价内容已复制，可粘贴到邮件中。',
    enquirySelected: '询价内容已选中，请使用设备的复制功能。',
    emailSubject: '室内空气质量传感器项目询价',
    emailBody: 'Hitelecom 室内空气质量监测项目询价\n\n应用场景：{application}\n国家／地区：{region}\n预计数量：{points}\n基础测量：{baseMeasurements}\n附加测量：{additionalMeasurements}\n监测需求：{requirements}\n现场供电／网络：{power}\n平台／上报要求：{platform}\n\n请协助推荐合适的 H310-AQ 配置，并提供报价。'
  }
};
