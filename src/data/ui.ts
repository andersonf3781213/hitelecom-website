/**
 * 组件级共享 UI 字符串（EN/ZH/ES）
 * Header 搜索、浮动联系栏、页脚、搜索页、感谢页、表单校验等
 * 分散组件共用的短文案集中于此，译法以《EN→ES 术语表 v1》为准。
 */
import type { Locale } from '../i18n';

export interface UiStrings {
  // Header 搜索遮罩
  searchBtn: string;
  searchAriaLabel: string;
  // Sidebar 浮动联系栏
  callUs: string;
  openChat: string;
  scanToChat: string;
  wechatIdLabel: string;
  copied: string;
  backToTop: string;
  whatsappQrAlt: string;
  wechatQrAlt: string;
  // Footer
  privacyLabel: string;
  scanOnWechat: string;
  // ThanksPage
  thxTitle: string;
  thxDesc: string;
  thxAlt: string;
  thxBackHome: string;
  thxBrowse: string;
  thxFailTitle: string;
  thxFailDesc: string;
  // SearchPage
  spHeading: string;
  spPlaceholder: string;
  spBtn: string;
  spEmpty: string;
  spHint: string;
  spContact: string;
  spSearching: string;
  spCount: (n: number) => string;
  // 表单（AboutContact / AboutPartner / ServiceBody 共用）
  formMsgName: string;
  formMsgPhone: string;
  formMsgEmail: string;
  formMsgFail: string;
  formLabels: [string, string, string, string]; // 姓名/电话/邮箱/留言
  /** 合作伙伴申请表 7 字段标签 */
  formLabelsPartner: string[];
  mailSubjectContact: string;
  mailSubjectPartner: string;
  mailSubjectService: string;
  // ServiceBody 文档下载
  docView: string;
  docDownload: string;
  // 产品列表侧栏 / 分类选项卡
  listSidebarPh: string;
  catTabsAria: string;
}

const en: UiStrings = {
  searchBtn: 'Search',
  searchAriaLabel: 'Search products, solutions and news',
  callUs: 'Call us',
  openChat: 'Open chat',
  scanToChat: 'Scan to chat on WeChat',
  wechatIdLabel: 'ID',
  copied: 'Copied',
  backToTop: 'Back to top',
  whatsappQrAlt: 'WhatsApp QR code',
  wechatQrAlt: 'WeChat QR code',
  privacyLabel: 'Privacy Policy',
  scanOnWechat: 'Scan on WeChat',
  thxTitle: 'Thank you!',
  thxDesc: 'Your message has been received. Our sales engineers will get back to you shortly.',
  thxAlt: 'Need a faster response? Contact us directly at ',
  thxBackHome: 'Back to Home',
  thxBrowse: 'Browse Products',
  thxFailTitle: 'Submission not completed',
  thxFailDesc: 'The form service is temporarily unavailable. Please email or call us directly.',
  spHeading: 'Site Search',
  spPlaceholder: 'Search products, models or keywords, e.g. NB-IoT, soil, temperature…',
  spBtn: 'Search',
  spEmpty: 'No results. Try another keyword, or contact us for product selection support.',
  spHint: 'Type a keyword to search.',
  spContact: 'Contact us',
  spSearching: 'Searching…',
  spCount: (n) => `${n} result${n === 1 ? '' : 's'} found`,
  formMsgName: 'Name cannot be empty',
  formMsgPhone: 'Phone cannot be empty',
  formMsgEmail: 'Email cannot be empty',
  formMsgFail: 'Submission failed. Please retry or email sales@hitelecom.cn directly.',
  formLabels: ['Name', 'Phone', 'Email', 'Message'],
  formLabelsPartner: ['Company', 'Name', 'Phone', 'Job Title', 'Email', 'Partnership Interest', 'Message'],
  mailSubjectContact: 'Website Feedback - ',
  mailSubjectPartner: 'Partner Application - ',
  mailSubjectService: 'After-Sales Service - ',
  docView: 'View',
  docDownload: 'Download',
  listSidebarPh: 'Enter product keywords',
  catTabsAria: 'Switch product category',
};

const zh: UiStrings = {
  searchBtn: '搜索',
  searchAriaLabel: '搜索产品、方案与新闻',
  callUs: '电话咨询',
  openChat: '打开对话',
  scanToChat: '微信扫码咨询',
  wechatIdLabel: '微信号',
  copied: '已复制',
  backToTop: '回到顶部',
  whatsappQrAlt: 'WhatsApp 二维码',
  wechatQrAlt: '微信二维码',
  privacyLabel: '隐私政策',
  scanOnWechat: '微信扫码咨询',
  thxTitle: '提交成功',
  thxDesc: '您的留言已收到，我们的销售工程师会尽快与您联系。',
  thxAlt: '急需协助？直接联系：',
  thxBackHome: '返回首页',
  thxBrowse: '浏览产品',
  thxFailTitle: '提交未成功',
  thxFailDesc: '表单服务暂不可用，请直接发邮件或来电联系我们。',
  spHeading: '站内搜索',
  spPlaceholder: '输入产品、型号或关键词，如 NB-IoT、土壤、温湿度…',
  spBtn: '搜索',
  spEmpty: '未找到相关内容，请更换关键词，或直接联系我们获取选型帮助。',
  spHint: '输入关键词开始搜索。',
  spContact: '联系我们',
  spSearching: '搜索中…',
  spCount: (n) => `共 ${n} 条结果`,
  formMsgName: '姓名不能为空',
  formMsgPhone: '电话不能为空',
  formMsgEmail: '邮箱不能为空',
  formMsgFail: '提交失败，请稍后再试或直接发邮件至 sales@hitelecom.cn',
  formLabels: ['姓名', '电话', '邮箱', '留言'],
  formLabelsPartner: ['公司名称', '姓名', '电话', '职位', '邮箱', '合作意向', '留言'],
  mailSubjectContact: '【在线留言】',
  mailSubjectPartner: '【合作伙伴申请】',
  mailSubjectService: '售后服务 - ',
  docView: '预览',
  docDownload: '下载',
  listSidebarPh: '输入产品关键词',
  catTabsAria: '切换产品分类',
};

/** 西语（译法见《EN→ES 术语表 v1》；usted 敬称） */
const es: UiStrings = {
  searchBtn: 'Buscar',
  searchAriaLabel: 'Buscar productos, soluciones y noticias',
  callUs: 'Llámenos',
  openChat: 'Abrir chat',
  scanToChat: 'Escanear para chatear en WeChat',
  wechatIdLabel: 'ID',
  copied: 'Copiado',
  backToTop: 'Volver arriba',
  whatsappQrAlt: 'Código QR de WhatsApp',
  wechatQrAlt: 'Código QR de WeChat',
  privacyLabel: 'Política de privacidad',
  scanOnWechat: 'Escanear en WeChat',
  thxTitle: '¡Gracias!',
  thxDesc: 'Hemos recibido su mensaje. Nuestros ingenieros de ventas le responderán a la brevedad.',
  thxAlt: '¿Necesita una respuesta más rápida? Contáctenos directamente: ',
  thxBackHome: 'Volver al inicio',
  thxBrowse: 'Explorar productos',
  thxFailTitle: 'No se pudo completar el envío',
  thxFailDesc: 'El servicio de formulario no está disponible temporalmente. Escríbanos por correo o llámenos directamente.',
  spHeading: 'Búsqueda del sitio',
  spPlaceholder: 'Busque productos, modelos o palabras clave, p. ej. NB-IoT, suelo, temperatura…',
  spBtn: 'Buscar',
  spEmpty: 'Sin resultados. Pruebe con otra palabra clave o contáctenos para asesoría de selección.',
  spHint: 'Escriba una palabra clave para buscar.',
  spContact: 'Contáctenos',
  spSearching: 'Buscando…',
  spCount: (n) => `${n} resultado${n === 1 ? '' : 's'} encontrado${n === 1 ? '' : 's'}`,
  formMsgName: 'El nombre no puede estar vacío',
  formMsgPhone: 'El teléfono no puede estar vacío',
  formMsgEmail: 'El correo electrónico no puede estar vacío',
  formMsgFail: 'Error al enviar. Inténtelo de nuevo o escriba a sales@hitelecom.cn directamente.',
  formLabels: ['Nombre', 'Teléfono', 'Correo electrónico', 'Mensaje'],
  formLabelsPartner: ['Empresa', 'Nombre', 'Teléfono', 'Cargo', 'Correo electrónico', 'Interés de colaboración', 'Mensaje'],
  mailSubjectContact: 'Mensaje del sitio web - ',
  mailSubjectPartner: 'Solicitud de asociación - ',
  mailSubjectService: 'Servicio posventa - ',
  docView: 'Ver',
  docDownload: 'Descargar',
  listSidebarPh: 'Buscar por palabra clave',
  catTabsAria: 'Cambiar categoría de producto',
};

export const ui: Record<Locale, UiStrings> = { en, zh, es };
