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
  // 无障碍 ARIA（Header/Sidebar）
  ariaHome: string;
  ariaMainNav: string;
  ariaSearch: string;
  ariaCloseSearch: string;
  ariaMenu: string;
  ariaOpenMenu: string;
  ariaCloseMenu: string;
  ariaMobileNav: string;
  quickContact: string;
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
  ariaHome: 'Hitelecom Home',
  ariaMainNav: 'Main',
  ariaSearch: 'Search',
  ariaCloseSearch: 'Close search',
  ariaMenu: 'Menu',
  ariaOpenMenu: 'Open menu',
  ariaCloseMenu: 'Close menu',
  ariaMobileNav: 'Mobile',
  quickContact: 'Quick contact',
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
  ariaHome: '宏太通信首页',
  ariaMainNav: '主导航',
  ariaSearch: '搜索',
  ariaCloseSearch: '关闭搜索',
  ariaMenu: '菜单',
  ariaOpenMenu: '打开菜单',
  ariaCloseMenu: '关闭菜单',
  ariaMobileNav: '移动端导航',
  quickContact: '快速联系',
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
  thxDesc: 'Hemos recibido su mensaje. Nuestro equipo técnico-comercial le responderá lo antes posible.',
  thxAlt: '¿Necesita una respuesta más rápida? Contáctenos directamente: ',
  thxBackHome: 'Volver al inicio',
  thxBrowse: 'Explorar productos',
  thxFailTitle: 'No se pudo completar el envío',
  thxFailDesc: 'El servicio de formulario no está disponible temporalmente. Escríbanos por correo o llámenos directamente.',
  spHeading: 'Búsqueda del sitio',
  spPlaceholder: 'Busque productos, modelos o palabras clave, p. ej. NB-IoT, suelo, temperatura…',
  spBtn: 'Buscar',
  spEmpty: 'Sin resultados. Pruebe con otra palabra clave o solicite asesoramiento para elegir el producto adecuado.',
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
  ariaHome: 'Inicio de Hitelecom',
  ariaMainNav: 'Navegación principal',
  ariaSearch: 'Buscar',
  ariaCloseSearch: 'Cerrar búsqueda',
  ariaMenu: 'Menú principal',
  ariaOpenMenu: 'Abrir menú',
  ariaCloseMenu: 'Cerrar menú',
  ariaMobileNav: 'Navegación móvil',
  quickContact: 'Contacto rápido',
};

/** 德语（译法见《EN→DE 术语表 v1》；Sie 敬称） */
const de: UiStrings = {
  searchBtn: 'Suchen',
  searchAriaLabel: 'Produkte, Lösungen und News suchen',
  callUs: 'Rufen Sie uns an',
  openChat: 'Chat öffnen',
  scanToChat: 'Scannen, um auf WeChat zu chatten',
  wechatIdLabel: 'ID',
  copied: 'Kopiert',
  backToTop: 'Nach oben',
  whatsappQrAlt: 'WhatsApp-QR-Code',
  wechatQrAlt: 'WeChat-QR-Code',
  privacyLabel: 'Datenschutzerklärung',
  scanOnWechat: 'Auf WeChat scannen',
  thxTitle: 'Vielen Dank!',
  thxDesc: 'Ihre Nachricht ist eingegangen. Unser technisch-kommerzielles Team meldet sich so schnell wie möglich bei Ihnen.',
  thxAlt: 'Sie brauchen eine schnellere Antwort? Kontaktieren Sie uns direkt: ',
  thxBackHome: 'Zur Startseite',
  thxBrowse: 'Produkte ansehen',
  thxFailTitle: 'Die Übermittlung konnte nicht abgeschlossen werden',
  thxFailDesc: 'Der Formularservice ist vorübergehend nicht verfügbar. Schreiben Sie uns bitte direkt per E-Mail oder rufen Sie uns an.',
  spHeading: 'Site-Suche',
  spPlaceholder: 'Produkte, Modelle oder Stichworte suchen, z. B. NB-IoT, Boden, Temperatur…',
  spBtn: 'Suchen',
  spEmpty: 'Keine Ergebnisse. Versuchen Sie ein anderes Stichwort oder fordern Sie Beratung zur Produktauswahl an.',
  spHint: 'Geben Sie ein Stichwort ein, um zu suchen.',
  spContact: 'Kontaktieren Sie uns',
  spSearching: 'Suche läuft…',
  spCount: (n) => `${n} Ergebnis${n === 1 ? '' : 'se'} gefunden`,
  formMsgName: 'Der Name darf nicht leer sein',
  formMsgPhone: 'Die Telefonnummer darf nicht leer sein',
  formMsgEmail: 'Die E-Mail-Adresse darf nicht leer sein',
  formMsgFail: 'Übermittlung fehlgeschlagen. Bitte versuchen Sie es erneut oder schreiben Sie direkt an sales@hitelecom.cn.',
  formLabels: ['Name', 'Telefon', 'E-Mail', 'Nachricht'],
  formLabelsPartner: ['Unternehmen', 'Name', 'Telefon', 'Position', 'E-Mail', 'Art der Zusammenarbeit', 'Nachricht'],
  mailSubjectContact: 'Website-Nachricht - ',
  mailSubjectPartner: 'Partnerbewerbung - ',
  mailSubjectService: 'After-Sales-Service - ',
  docView: 'Ansehen',
  docDownload: 'Herunterladen',
  listSidebarPh: 'Produkt-Stichwort eingeben',
  catTabsAria: 'Produktkategorie wechseln',
  ariaHome: 'Hitelecom Startseite',
  ariaMainNav: 'Hauptnavigation',
  ariaSearch: 'Suchen',
  ariaCloseSearch: 'Suche schließen',
  ariaMenu: 'Hauptmenü',
  ariaOpenMenu: 'Menü öffnen',
  ariaCloseMenu: 'Menü schließen',
  ariaMobileNav: 'Mobile Navigation',
  quickContact: 'Schnellkontakt',
};

/** 日语（译法见《EN→JA 术语表 v1》；です・ます敬体） */
const ja: UiStrings = {
  searchBtn: '検索',
  searchAriaLabel: '製品・ソリューション・ニュースを検索',
  callUs: 'お電話はこちら',
  openChat: 'チャットを開く',
  scanToChat: 'WeChatでスキャンしてチャット',
  wechatIdLabel: 'ID',
  copied: 'コピーしました',
  backToTop: 'トップへ戻る',
  whatsappQrAlt: 'WhatsApp QRコード',
  wechatQrAlt: 'WeChat QRコード',
  privacyLabel: 'プライバシーポリシー',
  scanOnWechat: 'WeChatでスキャン',
  thxTitle: 'ありがとうございます。',
  thxDesc: 'メッセージを受け付けました。当社の技術営業チームより速やかにご連絡いたします。',
  thxAlt: 'お急ぎの場合は、直接ご連絡ください： ',
  thxBackHome: 'ホームに戻る',
  thxBrowse: '製品を見る',
  thxFailTitle: '送信を完了できませんでした',
  thxFailDesc: 'フォームサービスは一時的にご利用いただけません。メールまたはお電話で直接ご連絡ください。',
  spHeading: 'サイト内検索',
  spPlaceholder: '製品・型式・キーワードで検索（例：NB-IoT、土壌、温度…）',
  spBtn: '検索',
  spEmpty: '該当する結果が見つかりませんでした。別のキーワードをお試しいただくか、製品選定についてお問い合わせください。',
  spHint: 'キーワードを入力して検索してください。',
  spContact: 'お問い合わせ',
  spSearching: '検索中…',
  spCount: (n) => `${n} 件の結果が見つかりました`,
  formMsgName: 'お名前を入力してください',
  formMsgPhone: '電話番号を入力してください',
  formMsgEmail: 'メールアドレスを入力してください',
  formMsgFail: '送信に失敗しました。再試行するか、sales@hitelecom.cn まで直接メールしてください。',
  formLabels: ['お名前', '電話番号', 'メールアドレス', 'メッセージ'],
  formLabelsPartner: ['会社名', 'お名前', '電話番号', '役職', 'メールアドレス', '提携の種類', 'メッセージ'],
  mailSubjectContact: 'ウェブサイトからのお問い合わせ - ',
  mailSubjectPartner: 'パートナー申請 - ',
  mailSubjectService: 'アフターサービス - ',
  docView: '表示',
  docDownload: 'ダウンロード',
  listSidebarPh: '製品キーワードを入力',
  catTabsAria: '製品カテゴリを切り替え',
  ariaHome: 'Hitelecom ホーム',
  ariaMainNav: 'メインナビゲーション',
  ariaSearch: '検索',
  ariaCloseSearch: '検索を閉じる',
  ariaMenu: 'メインメニュー',
  ariaOpenMenu: 'メニューを開く',
  ariaCloseMenu: 'メニューを閉じる',
  ariaMobileNav: 'モバイルナビゲーション',
  quickContact: 'クイックコンタクト',
};

export const ui: Record<Locale, UiStrings> = { en, zh, es, de, ja };
