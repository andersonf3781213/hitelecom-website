/**
 * 空气质量系列页 UI 文案词典（EN，默认）。
 * SeriesPage.astro / series.js 的全部硬编码字符串集中于此；
 * 其他语言提供同形词典（见 strings.es.mjs），不改共享脚本。
 * {name}/{count}/{application} 等为占位符，渲染时替换。
 */
export default {
  // Hero
  heroQuote: 'Request a quote ↗',
  heroChoose: 'Choose measurements ↓',
  // 页内导航
  subnavAria: 'Product page sections',
  navMeasurements: 'Measurements',
  navCustom: 'Custom options',
  navApplications: 'Applications',
  navModels: 'Models',
  navFaq: 'FAQ',
  navQuote: 'Request a quote ↗',
  // 基础参数
  coreEyebrow: 'CORE MEASUREMENTS',
  // 可选参数
  customEyebrow: 'CUSTOM MEASUREMENTS',
  selectOptions: 'Select {name} options',
  yourAdditional: 'YOUR ADDITIONAL MEASUREMENTS',
  emptyOptionSummary: 'Base measurements selected. Add options as needed.',
  addToEnquiry: 'Add to my enquiry ↗',
  clearOptions: 'Clear additional options',
  // 应用场景
  appsEyebrow: 'APPLICATIONS',
  filterAria: 'Filter applications',
  allApplications: 'All applications',
  applicationCount: '{count} applications',
  galleryNote: 'Suggested measurements can be added to your selection and edited. Photos are AI-generated application illustrations.',
  measureFocus: 'MEASUREMENT FOCUS',
  installationNotes: 'Installation notes',
  addSuggested: 'Add suggested options',
  // 环境与活动
  exploreMeasurements: 'Explore the measurements ↗',
  // 安装
  installEyebrow: 'INSTALLATION',
  installTitle: 'Plan your',
  installAccent: 'installation.',
  installIntro: 'Start with the rooms, then match the sensing, power and data connection.',
  // 平台接入
  integrationEyebrow: 'REMOTE MONITORING & INTEGRATION',
  discussIntegration: 'Discuss platform integration ↗',
  pathRows: [
    ['Your measurement set', 'The channels selected for each room'],
    ['Your connection route', 'Cellular or the specified LoRa and gateway arrangement'],
    ['Your platform records', 'Device identity, units, timestamps and data interface'],
    ['Your response workflow', 'Trend review and configured alerts']
  ],
  // 型号与规格
  modelsEyebrow: 'SERIES & CONFIGURATIONS',
  ladderAria: 'H310-AQ series configurations',
  startingConfig: 'STARTING CONFIGURATION',
  seriesExtension: 'SERIES EXTENSION',
  startingSmall: '4 core measurements',
  extensionSmall: 'Project-specific sensing',
  baseConfig: 'BASE CONFIGURATION',
  specCaption: 'Selected published specifications · {name}',
  viewDatasheet: 'View {name} datasheet ↗',
  customConfig: 'CUSTOM CONFIGURATION',
  customTitle: 'Need additional',
  customAccent: 'measurements?',
  customText: 'Tell us about the space and the measurements you need. Hitelecom can help match the sensing, connectivity and installation requirements to a suitable configuration.',
  customChoices: [
    ['Air quality', 'PM1 / PM2.5 / PM10 · HCHO · TVOC'],
    ['Light & activity', 'Illuminance · PIR motion detection'],
    ['Specialist requirements', 'O₂ · Other parameters by discussion']
  ],
  getHelp: 'Get help choosing a configuration ↗',
  // FAQ
  faqEyebrow: 'ANSWERS FOR YOUR PROJECT',
  faqTitle: 'Frequently',
  faqAccent: 'asked questions.',
  faqIntro: 'Answers to help you choose measurements, plan installation and connect your data.',
  askProject: 'Ask about your project ↗',
  // 询价表单
  briefEyebrow: 'LET’S TALK ABOUT YOUR PROJECT',
  emailTeam: 'EMAIL OUR TEAM',
  contactNote: 'A room plan, site photo or platform requirement can help with the discussion.',
  yourMeasurements: 'Your measurements',
  editSelection: 'Edit selection ↑',
  coreMeasurements: 'CORE MEASUREMENTS',
  coreMeasurementsAria: 'Core measurements',
  additionalMeasurements: 'ADDITIONAL MEASUREMENTS',
  emptyFormOptions: 'Core measurements only. Add options if needed.',
  projectDetails: 'Your project details',
  projectDetailsSub: 'Share what you know. We can discuss the rest.',
  applicationLabel: 'Application',
  chooseApplication: 'Choose an application',
  anotherApplication: 'Another application',
  countryLabel: 'Country / region',
  countryPlaceholder: 'e.g. United Kingdom',
  quantityLabel: 'Approximate quantity',
  quantityPlaceholder: 'e.g. 20 sensors',
  monitorLabel: 'What would you like to monitor?',
  techDetails: 'Add technical details',
  optional: 'Optional',
  powerLabel: 'Available power / network',
  powerPlaceholder: 'Tell us what is available, if known',
  platformLabel: 'Platform / reporting needs',
  platformPlaceholder: 'e.g. Existing platform and update interval',
  reviewEnquiry: 'Review my enquiry ↗',
  reviewHelp: 'Review the details, then open your email app to send your enquiry.',
  enquiryDetails: 'Enquiry details',
  copyEnquiry: 'Copy enquiry',
  openEmail: 'Open email app ↗',
  noscriptContact: 'Contact Hitelecom with your requirements ↗',
  // 页尾带
  exploreRange: 'EXPLORE THE PRODUCT RANGE',
  viewRange: 'View the product range ↗',
  contactUs: 'Contact us ↗',
  // 页面级 JSON-LD 文案
  schema: {
    familyName: 'Hitelecom H310-AQ Indoor Air Quality Sensor Series',
    variesBy: 'Sensing configuration',
    variantDescription: 'Temperature, relative humidity, atmospheric pressure and CO₂ starting configuration.',
    breadcrumb: ['Home', 'IoT Sensors', 'Air Quality', 'Indoor Air Quality Sensor'],
    listName: 'Indoor air quality applications',
    imageCaptionSuffix: ' — AI-generated application illustration.',
    imageCredit: 'AI-generated illustration, not a customer installation.'
  },
  // series.js 运行时字符串（经 data-i18n 注入，须为纯 JSON）
  js: {
    emptyOptionSummary: 'Base measurements selected. Add options as needed.',
    emptyFormOptions: 'Core measurements only. Add options if needed.',
    applicationCountOne: '{count} applications',
    applicationCountOther: '{count} applications',
    suggestionsAdded: 'Suggestions added for {application}. Your existing options are kept; you can edit the selection above.',
    notProvided: 'To be discussed',
    noneSelected: 'None selected',
    enquiryCopied: 'Enquiry copied. You can paste it into your email.',
    enquirySelected: 'Enquiry selected. Use your device’s Copy command.',
    emailSubject: 'Indoor air quality sensor enquiry',
    emailBody: 'Hitelecom indoor air quality enquiry\n\nApplication: {application}\nCountry / region: {region}\nApproximate quantity: {points}\nBase measurements: {baseMeasurements}\nAdditional measurements: {additionalMeasurements}\nRequirements: {requirements}\nAvailable power / network: {power}\nPlatform / reporting: {platform}\n\nPlease help recommend a suitable H310-AQ configuration and provide a quotation.'
  }
};
