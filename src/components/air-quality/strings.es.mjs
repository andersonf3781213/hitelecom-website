/**
 * 空气质量系列页 UI 文案词典（ES）。
 * 译文来源：GPT6《Hitelecom-Air-Quality-Spanish-Kimi-2026-10-06.md》，
 * 经 Kimi 审核（数值零改动；datasheet 按钮补站内西语惯例 (EN) 标记）。
 * 结构须与 strings.en.mjs 完全一致。
 */
export default {
  // Hero
  heroQuote: 'Solicitar una cotización ↗',
  heroChoose: 'Elegir parámetros ↓',
  // 页内导航
  subnavAria: 'Secciones de la página del producto',
  navMeasurements: 'Parámetros',
  navCustom: 'Opciones a medida',
  navApplications: 'Aplicaciones',
  navModels: 'Modelos',
  navFaq: 'Preguntas frecuentes',
  navQuote: 'Solicitar una cotización ↗',
  // 基础参数
  coreEyebrow: 'PARÁMETROS BÁSICOS',
  // 可选参数
  customEyebrow: 'PARÁMETROS A MEDIDA',
  selectOptions: 'Seleccionar opciones de {name}',
  yourAdditional: 'SUS PARÁMETROS ADICIONALES',
  emptyOptionSummary: 'Parámetros básicos seleccionados. Añada opciones según sus necesidades.',
  addToEnquiry: 'Añadir a mi solicitud ↗',
  clearOptions: 'Borrar opciones adicionales',
  // 应用场景
  appsEyebrow: 'APLICACIONES',
  filterAria: 'Filtrar aplicaciones',
  allApplications: 'Todas las aplicaciones',
  applicationCount: '{count} aplicaciones',
  galleryNote: 'Puede añadir las mediciones sugeridas a su selección y modificarlas. Las imágenes ilustran las aplicaciones y han sido generadas con IA.',
  measureFocus: 'PARÁMETROS RECOMENDADOS',
  installationNotes: 'Recomendaciones de instalación',
  addSuggested: 'Añadir opciones sugeridas',
  // 环境与活动
  exploreMeasurements: 'Ver los parámetros ↗',
  // 安装
  installEyebrow: 'INSTALACIÓN',
  installTitle: 'Planifique su',
  installAccent: 'instalación.',
  installIntro: 'Defina primero los espacios y después adapte los sensores, la alimentación y la conexión de datos.',
  // 平台接入
  integrationEyebrow: 'MONITORIZACIÓN REMOTA E INTEGRACIÓN',
  discussIntegration: 'Consultar la integración con su plataforma ↗',
  pathRows: [
    ['Sus parámetros de medición', 'Los parámetros seleccionados para cada espacio'],
    ['Su conexión de datos', 'Conexión celular o la solución LoRa con gateway especificada'],
    ['Los registros de su plataforma', 'Identificación del dispositivo, unidades, marcas de tiempo e interfaz de datos'],
    ['Su procedimiento de respuesta', 'Análisis de tendencias y alertas configuradas']
  ],
  // 型号与规格
  modelsEyebrow: 'SERIE Y CONFIGURACIONES',
  ladderAria: 'Configuraciones de la serie H310-AQ',
  startingConfig: 'CONFIGURACIÓN INICIAL',
  seriesExtension: 'AMPLIACIÓN DE LA SERIE',
  startingSmall: '4 parámetros básicos',
  extensionSmall: 'Sensores según el proyecto',
  baseConfig: 'CONFIGURACIÓN BÁSICA',
  specCaption: 'Selección de especificaciones publicadas · {name}',
  viewDatasheet: 'Ver la ficha técnica del {name} (EN) ↗',
  customConfig: 'CONFIGURACIÓN A MEDIDA',
  customTitle: '¿Necesita parámetros',
  customAccent: 'adicionales?',
  customText: 'Cuéntenos cómo es el espacio y qué necesita medir. Hitelecom le ayudará a elegir una configuración que se ajuste a sus requisitos de medición, conectividad e instalación.',
  customChoices: [
    ['Calidad del aire', 'PM1 / PM2.5 / PM10 · HCHO · TVOC'],
    ['Iluminación y actividad', 'Iluminancia · Detección de movimiento PIR'],
    ['Requisitos específicos', 'O₂ · Otros parámetros a consultar']
  ],
  getHelp: 'Recibir ayuda para elegir una configuración ↗',
  // FAQ
  faqEyebrow: 'RESPUESTAS PARA SU PROYECTO',
  faqTitle: 'Preguntas',
  faqAccent: 'frecuentes.',
  faqIntro: 'Respuestas para elegir los parámetros, planificar la instalación y conectar sus datos.',
  askProject: 'Consultar sobre su proyecto ↗',
  // 询价表单
  briefEyebrow: 'HABLEMOS DE SU PROYECTO',
  emailTeam: 'ESCRIBA A NUESTRO EQUIPO',
  contactNote: 'Un plano del espacio, una foto de la instalación o los requisitos de su plataforma pueden ayudarnos a concretar la propuesta.',
  yourMeasurements: 'Sus parámetros',
  editSelection: 'Editar selección ↑',
  coreMeasurements: 'PARÁMETROS BÁSICOS',
  coreMeasurementsAria: 'Parámetros básicos',
  additionalMeasurements: 'PARÁMETROS ADICIONALES',
  emptyFormOptions: 'Solo se incluyen los parámetros básicos. Añada opciones si las necesita.',
  projectDetails: 'Datos de su proyecto',
  projectDetailsSub: 'Comparta la información que tenga. Podemos concretar el resto juntos.',
  applicationLabel: 'Aplicación',
  chooseApplication: 'Seleccione una aplicación',
  anotherApplication: 'Otra aplicación',
  countryLabel: 'País / región',
  countryPlaceholder: 'p. ej., Reino Unido',
  quantityLabel: 'Cantidad aproximada',
  quantityPlaceholder: 'p. ej., 20 sensores',
  monitorLabel: '¿Qué desea monitorizar?',
  techDetails: 'Añadir detalles técnicos',
  optional: 'Opcional',
  powerLabel: 'Alimentación / red disponibles',
  powerPlaceholder: 'Indique qué recursos tiene disponibles, si los conoce',
  platformLabel: 'Plataforma / requisitos de transmisión',
  platformPlaceholder: 'p. ej., plataforma actual e intervalo de actualización',
  reviewEnquiry: 'Revisar mi solicitud ↗',
  reviewHelp: 'Revise los datos y abra su aplicación de correo para enviar la solicitud.',
  enquiryDetails: 'Detalles de la solicitud',
  copyEnquiry: 'Copiar solicitud',
  openEmail: 'Abrir la aplicación de correo ↗',
  noscriptContact: 'Contactar con Hitelecom para explicar sus requisitos ↗',
  // 页尾带
  exploreRange: 'DESCUBRA LA GAMA DE PRODUCTOS',
  viewRange: 'Ver la gama de productos ↗',
  contactUs: 'Contactar ↗',
  // 页面级 JSON-LD 文案
  schema: {
    familyName: 'Serie H310-AQ de sensores de calidad del aire interior Hitelecom',
    variesBy: 'Configuración de sensores',
    variantDescription: 'Configuración inicial con temperatura, humedad relativa, presión atmosférica y CO₂.',
    breadcrumb: ['Inicio', 'Sensores IoT', 'Calidad del aire', 'Sensor de calidad del aire interior'],
    listName: 'Aplicaciones de calidad del aire interior',
    imageCaptionSuffix: ' — Ilustración de la aplicación generada con IA.',
    imageCredit: 'Ilustración generada con IA; no corresponde a una instalación de un cliente.'
  },
  // series.js 运行时字符串（经 data-i18n 注入，须为纯 JSON）
  js: {
    emptyOptionSummary: 'Parámetros básicos seleccionados. Añada opciones según sus necesidades.',
    emptyFormOptions: 'Solo se incluyen los parámetros básicos. Añada opciones si las necesita.',
    applicationCountOne: '{count} aplicación',
    applicationCountOther: '{count} aplicaciones',
    suggestionsAdded: 'Se han añadido las opciones sugeridas para {application}. Se conservan las opciones que ya había seleccionado; puede modificar la selección arriba.',
    notProvided: 'Por definir',
    noneSelected: 'Ninguno seleccionado',
    enquiryCopied: 'Solicitud copiada. Puede pegarla en su correo electrónico.',
    enquirySelected: 'Solicitud seleccionada. Utilice la función Copiar de su dispositivo.',
    emailSubject: 'Consulta sobre sensores de calidad del aire interior',
    emailBody: 'Solicitud sobre calidad del aire interior — Hitelecom\n\nAplicación: {application}\nPaís / región: {region}\nCantidad aproximada: {points}\nParámetros básicos: {baseMeasurements}\nParámetros adicionales: {additionalMeasurements}\nRequisitos: {requirements}\nAlimentación / red disponibles: {power}\nPlataforma / transmisión de datos: {platform}\n\nPor favor, recomiéndennos una configuración H310-AQ adecuada y facilítennos una cotización.'
  }
};
