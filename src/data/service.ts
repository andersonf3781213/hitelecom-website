import type { Locale } from '../i18n';
/**
 * 支持服务页全部内容（中英双语，由 www.hitelecom.com 原站 1:1 提取）
 * 改文案只需改这里：
 * - techCards 技术支持六卡；software 软件区；docsP1/docsP2 文档下载两页卡片
 * - 文档卡 View/Down 链接与原站完全一致（Down 走原站 download.php 动态接口，
 *   静态站无法提供，href 保留原样；View 指向真实文件的链接同原站）
 * 图片路径相对 src/assets/images/，同名覆盖即可换图。
 */

export interface ServiceTechCard { img: string; title: string; desc: string }
export interface ServiceBullet { icon: string; text: string }
export interface ServicePlatform { icon: string; label: string }
/** file 为本站托管的真实文件（public/downloads/）；downName 为下载时的建议文件名 */
export interface ServiceDoc { name: string; type: string; file: string; downName: string }

export interface ServiceContent {
  bannerImg: string;
  /** HERO 区小标题（仅中文站原站有"支持服务"，英文站原站无） */
  bannerSub: string;
  bannerTitle: string;
  tabs: { label: string; anchor: string }[];
  techHeading: string;
  techCards: ServiceTechCard[];
  softHeading: string;
  softSub1: string;
  softSub2: string;
  softBullets: ServiceBullet[];
  softRightImg: string;
  platforms: ServicePlatform[];
  docsHeading: string;
  docsP1: ServiceDoc[];
  docsP2: ServiceDoc[];
  formHeading: string;
  formPh: { name: string; phone: string; email: string; message: string };
  submit: string;
}

const serviceContentBase: Record<'en' | 'zh', ServiceContent> = {
  en: {
    bannerImg: 'service/banner.jpg',
    bannerSub: '',
    bannerTitle: 'SERVICE',
    tabs: [
      { label: 'Technical Support', anchor: '#page1' },
      { label: 'Software', anchor: '#page2' },
      { label: 'Downloads', anchor: '#page3' },
      { label: 'After-Sales Service', anchor: '#page4' },
    ],
    techHeading: 'Technical Support for Every Stage of Your Deployment',
    techCards: [
      { img: 'service/tech-1.jpg', title: 'Hardware Customization', desc: 'Customize sensing, connectivity, power, interfaces, and enclosures for your application.' },
      { img: 'service/tech-2.jpg', title: 'Software Customization', desc: 'Customize firmware, dashboards, APIs, data models, and platform integrations.' },
      { img: 'service/tech-3.jpg', title: 'Remote Support', desc: 'Get remote troubleshooting, configuration guidance, and deployment support from our engineering team.' },
      { img: 'service/tech-4.jpg', title: 'Telephone Support', desc: 'Speak with an engineer for installation and troubleshooting guidance.' },
      { img: 'service/tech-5.jpg', title: 'On-Site Support', desc: 'Arrange on-site technical support when remote assistance is not sufficient.' },
      { img: 'service/tech-6.jpg', title: 'Maintenance Support', desc: 'Get repair, replacement, and technical follow-up for supported products.' },
    ],
    softHeading: 'Software',
    softSub1: 'Available on PC, mobile app, large displays, and video walls',
    softSub2: 'Hitelecom Cloud | Monitor Devices and Data from Anywhere',
    softBullets: [
      { icon: 'service/img7.png', text: 'Use NFC in the mobile app for faster setup and maintenance.' },
      { icon: 'service/img8.png', text: 'Configure supported devices remotely through the web or app, reducing site visits.' },
      { icon: 'service/img9.png', text: 'Customize trigger conditions and response times for email and app alert notifications.' },
      { icon: 'service/img9-2.png', text: 'Customize dashboards with digital-twin views, GIS maps, and other data visualizations.' },
    ],
    softRightImg: 'service/software-right.png',
    platforms: [
      { icon: 'service/img12.png', label: 'Windows' },
      { icon: 'service/img13.png', label: 'Android' },
      { icon: 'service/img15.png', label: 'WeChat Mini Program' },
      { icon: 'service/img17.png', label: 'iOS' },
    ],
    docsHeading: 'Downloads',
    docsP1: [
      { name: 'Company Profile', type: 'Brochure', file: '/downloads/company-profile.pdf', downName: 'Hitelecom-Company-Profile.pdf' },
      { name: 'Hitelecom Cloud', type: 'Scenarios', file: '/downloads/hitelecom-cloud-scenarios.pdf', downName: 'Hitelecom-Cloud-Scenarios.pdf' },
      { name: 'Temperature Sensor', type: 'Brochure', file: '/downloads/temperature-sensor.jpg', downName: 'Temperature-Sensor-Brochure.jpg' },
      { name: 'Soil Sensor', type: 'Brochure', file: '/downloads/soil-sensor.jpg', downName: 'Soil-Sensor-Brochure.jpg' },
      { name: 'Submersible Level Sensor', type: 'Brochure', file: '/downloads/liquid-level-sensor.jpg', downName: 'Liquid-Level-Sensor-Brochure.jpg' },
      { name: 'Pressure Sensor', type: 'Brochure', file: '/downloads/pressure-sensor.jpg', downName: 'Pressure-Sensor-Brochure.jpg' },
      { name: 'Water Leakage Sensor (custom project)', type: 'Brochure', file: '/downloads/water-leakage-sensor.jpg', downName: 'Water-Leakage-Sensor-Brochure.jpg' },
      { name: 'Air Quality', type: 'Brochure', file: '/downloads/air-quality-sensor.jpg', downName: 'Air-Quality-Sensor-Brochure.jpg' },
    ],
    docsP2: [
      { name: 'Radar Distance Sensor', type: 'Brochure', file: '/downloads/distance-measurement-sensor.jpg', downName: 'Distance-Measurement-Sensor-Brochure.jpg' },
      { name: 'Explosion-Proof 2-in-1 Sensor', type: 'Brochure', file: '/downloads/temperature-sensor-ex.jpg', downName: 'Temperature-Sensor-EX-Brochure.jpg' },
      { name: 'Explosion-Proof 2-in-1 Temperature and Pressure Sensor', type: 'Brochure', file: '/downloads/temp-pressure-2in1-ex.jpg', downName: 'Temp-Pressure-2in1-EX-Brochure.jpg' },
      { name: 'Temperature and Humidity Sensor', type: 'Datasheet', file: '/downloads/h300-temperature-humidity-sensor-datasheet.pdf', downName: 'Hitelecom-Temperature-Humidity-Sensor-Datasheet.pdf' },
      { name: 'Soil Sensor', type: 'Datasheet', file: '/downloads/h300-soil-sensor-datasheet.pdf', downName: 'Hitelecom-Soil-Sensor-Datasheet.pdf' },
      { name: 'Pressure Sensor', type: 'Datasheet', file: '/downloads/h300-pressure-sensor-datasheet.pdf', downName: 'Hitelecom-Pressure-Sensor-Datasheet.pdf' },
      { name: 'Tilt Sensor', type: 'Datasheet', file: '/downloads/h310-ts180c-tilt-sensor-datasheet.pdf', downName: 'H310-TS180C-Tilt-Sensor-Datasheet.pdf' },
      { name: 'Radar Distance', type: 'Datasheet', file: '/downloads/h310-mw012-radar-distance-sensor-datasheet.pdf', downName: 'H310-MW012-Radar-Distance-Sensor-Datasheet.pdf' },
      { name: 'Air Quality', type: 'Datasheet', file: '/downloads/h310-aq041-air-quality-sensor-datasheet.pdf', downName: 'H310-AQ041-Air-Quality-Sensor-Datasheet.pdf' },
    ],
    formHeading: 'After-Sales Service',
    formPh: { name: 'Name', phone: 'Phone', email: 'Email', message: 'Tell us what you need, including the product, application, quantity, and site conditions. We respond to most inquiries within one business day.' },
    submit: 'Send Support Request',
  },
  zh: {
    bannerImg: 'service/banner.jpg',
    bannerSub: '支持服务',
    bannerTitle: 'SERVICE',
    tabs: [
      { label: '技术支持', anchor: '#page1' },
      { label: '软件下载', anchor: '#page2' },
      { label: '文档下载', anchor: '#page3' },
      { label: '售后服务', anchor: '#page4' },
    ],
    techHeading: '您可以获得什么？',
    techCards: [
      { img: 'service/tech-1.jpg', title: '硬件定制', desc: '我们有专业的硬件研发团队可以满足您的定制需求' },
      { img: 'service/tech-2.jpg', title: '软件定制', desc: '我们有专业的软件研发团队可以满足您的任何定制需求' },
      { img: 'service/tech-3.jpg', title: '远程支持', desc: '我们有全面的服务体系，多种服务形式为用户提供服务' },
      { img: 'service/tech-4.jpg', title: '电话支持', desc: '我们有全面的服务体系，经验丰富的技术工程师可以电话指导解决你在安装过程中的问题' },
      { img: 'service/tech-5.jpg', title: '现场支持', desc: '我们有全面的服务体系，经验丰富的技术工程师可以解决你在现场过程中的问题' },
      { img: 'service/tech-6.jpg', title: '维修支持', desc: '我们有全面的售后体系，经验丰富的维修工程师可以解决售后烦恼' },
    ],
    softHeading: '软件下载',
    softSub1: '支持PC、APP、大屏、电视墙多种显示模式',
    softSub2: '宏太云│随时随地掌控一切',
    softBullets: [
      { icon: 'service/img7.png', text: 'APP支持NFC快速配置，方便维保' },
      { icon: 'service/img8.png', text: 'Web、App远程配置设备无需频繁跑现场' },
      { icon: 'service/img9.png', text: '自定义设置触发条件与响应时间，实现邮件及APP告警推送' },
      { icon: 'service/img9-2.png', text: '显示大屏支持定制数字孪生、GIS地图等综合显示方式' },
    ],
    softRightImg: 'service/software-right.png',
    platforms: [
      { icon: 'service/img12.png', label: 'Windows' },
      { icon: 'service/img13.png', label: 'Android' },
      { icon: 'service/img15.png', label: '微信小程序' },
      { icon: 'service/img17.png', label: 'iOS' },
    ],
    docsHeading: '文档下载',
    docsP1: [
      { name: '公司简介', type: '彩页', file: '/downloads/company-profile.pdf', downName: '宏太智慧公司简介.pdf' },
      { name: '宏太云', type: '场景', file: '/downloads/hitelecom-cloud-scenarios.pdf', downName: '宏太云场景.pdf' },
      { name: '温度传感器', type: '彩页', file: '/downloads/temperature-sensor.jpg', downName: '温度传感器彩页.jpg' },
      { name: '土壤传感器', type: '彩页', file: '/downloads/soil-sensor.jpg', downName: '土壤传感器彩页.jpg' },
      { name: '液位传感器', type: '彩页', file: '/downloads/liquid-level-sensor.jpg', downName: '液位传感器彩页.jpg' },
      { name: '压力传感器', type: '彩页', file: '/downloads/pressure-sensor.jpg', downName: '压力传感器彩页.jpg' },
      { name: '水侵传感器', type: '彩页', file: '/downloads/water-leakage-sensor.jpg', downName: '水侵传感器彩页.jpg' },
      { name: '空气质量', type: '彩页', file: '/downloads/air-quality-sensor.jpg', downName: '空气质量彩页.jpg' },
    ],
    docsP2: [
      { name: '测距传感器', type: '彩页', file: '/downloads/distance-measurement-sensor.jpg', downName: '测距传感器彩页.jpg' },
      { name: '温度防爆型', type: '彩页', file: '/downloads/temperature-sensor-ex.jpg', downName: '温度防爆型彩页.jpg' },
      { name: '防爆温压型', type: '彩页', file: '/downloads/temp-pressure-2in1-ex.jpg', downName: '防爆温压型彩页.jpg' },
      { name: '温湿度传感器', type: '规格书', file: '/downloads/h300-temperature-humidity-sensor-datasheet.pdf', downName: 'Hitelecom-温湿度传感器规格书.pdf' },
      { name: '土壤传感器', type: '规格书', file: '/downloads/h300-soil-sensor-datasheet.pdf', downName: 'Hitelecom-土壤传感器规格书.pdf' },
      { name: '压力传感器', type: '规格书', file: '/downloads/h300-pressure-sensor-datasheet.pdf', downName: 'Hitelecom-压力传感器规格书.pdf' },
      { name: '倾斜传感器', type: '规格书', file: '/downloads/h310-ts180c-tilt-sensor-datasheet.pdf', downName: 'H310-TS180C-倾斜传感器规格书.pdf' },
      { name: '雷达测距', type: '规格书', file: '/downloads/h310-mw012-radar-distance-sensor-datasheet.pdf', downName: 'H310-MW012-雷达测距传感器规格书.pdf' },
      { name: '空气质量', type: '规格书', file: '/downloads/h310-aq041-air-quality-sensor-datasheet.pdf', downName: 'H310-AQ041-空气质量传感器规格书.pdf' },
    ],
    formHeading: '售后服务',
    formPh: { name: '姓名', phone: '电话', email: '邮箱', message: '请告诉我们您的需求：产品、应用场景、数量与现场条件，我们将在一个工作日内回复。' },
    submit: '提 交',
  },
};

/** 西语版支持服务页（译法见《EN→ES 术语表 v1》） */
const es: ServiceContent = {
  bannerImg: 'service/banner.jpg',
  bannerSub: '',
  bannerTitle: 'SERVICIO',
  tabs: [
    { label: 'Soporte técnico', anchor: '#page1' },
    { label: 'Software', anchor: '#page2' },
    { label: 'Descargas', anchor: '#page3' },
    { label: 'Servicio posventa', anchor: '#page4' },
  ],
  techHeading: 'Soporte técnico para cada etapa de su implementación',
  techCards: [
    { img: 'service/tech-1.jpg', title: 'Personalización de hardware', desc: 'Personalice la detección, la conectividad, la energía, las interfaces y las carcasas para su aplicación.' },
    { img: 'service/tech-2.jpg', title: 'Personalización de software', desc: 'Personalice firmware, paneles, API, modelos de datos e integraciones de plataforma.' },
    { img: 'service/tech-3.jpg', title: 'Soporte remoto', desc: 'Obtenga resolución remota de problemas, orientación de configuración y soporte de implementación de nuestro equipo de ingeniería.' },
    { img: 'service/tech-4.jpg', title: 'Soporte telefónico', desc: 'Hable con un ingeniero para orientación de instalación y resolución de problemas.' },
    { img: 'service/tech-5.jpg', title: 'Soporte en sitio', desc: 'Solicite soporte técnico en sitio cuando la asistencia remota no sea suficiente.' },
    { img: 'service/tech-6.jpg', title: 'Soporte de mantenimiento', desc: 'Obtenga reparación, reemplazo y seguimiento técnico para los productos compatibles.' },
  ],
  softHeading: 'Software',
  softSub1: 'Disponible en PC, app móvil, pantallas grandes y videowalls',
  softSub2: 'Hitelecom Cloud | Monitoree dispositivos y datos desde cualquier lugar',
  softBullets: [
    { icon: 'service/img7.png', text: 'Use NFC en la app móvil para una configuración y un mantenimiento más rápidos.' },
    { icon: 'service/img8.png', text: 'Configure los dispositivos compatibles de forma remota desde la web o la app, reduciendo las visitas al sitio.' },
    { icon: 'service/img9.png', text: 'Personalice las condiciones de disparo y los tiempos de respuesta de las notificaciones de alerta por correo y app.' },
    { icon: 'service/img9-2.png', text: 'Personalice los paneles con vistas de gemelo digital, mapas GIS y otras visualizaciones de datos.' },
  ],
  softRightImg: 'service/software-right.png',
  platforms: [
    { icon: 'service/img12.png', label: 'Windows' },
    { icon: 'service/img13.png', label: 'Android' },
    { icon: 'service/img15.png', label: 'Miniprograma de WeChat' },
    { icon: 'service/img17.png', label: 'iOS' },
  ],
  docsHeading: 'Descargas',
  docsP1: [
    { name: 'Perfil de la empresa', type: 'Folleto', file: '/downloads/company-profile.pdf', downName: 'Hitelecom-Company-Profile.pdf' },
    { name: 'Hitelecom Cloud', type: 'Escenarios', file: '/downloads/hitelecom-cloud-scenarios.pdf', downName: 'Hitelecom-Cloud-Scenarios.pdf' },
    { name: 'Sensor de temperatura', type: 'Folleto', file: '/downloads/temperature-sensor.jpg', downName: 'Temperature-Sensor-Brochure.jpg' },
    { name: 'Sensor de suelo', type: 'Folleto', file: '/downloads/soil-sensor.jpg', downName: 'Soil-Sensor-Brochure.jpg' },
    { name: 'Sensor de nivel sumergible', type: 'Folleto', file: '/downloads/liquid-level-sensor.jpg', downName: 'Liquid-Level-Sensor-Brochure.jpg' },
    { name: 'Sensor de presión', type: 'Folleto', file: '/downloads/pressure-sensor.jpg', downName: 'Pressure-Sensor-Brochure.jpg' },
    { name: 'Sensor de fugas de agua (proyecto personalizado)', type: 'Folleto', file: '/downloads/water-leakage-sensor.jpg', downName: 'Water-Leakage-Sensor-Brochure.jpg' },
    { name: 'Calidad del aire', type: 'Folleto', file: '/downloads/air-quality-sensor.jpg', downName: 'Air-Quality-Sensor-Brochure.jpg' },
  ],
  docsP2: [
    { name: 'Sensor de distancia por radar', type: 'Folleto', file: '/downloads/distance-measurement-sensor.jpg', downName: 'Distance-Measurement-Sensor-Brochure.jpg' },
    { name: 'Sensor antideflagrante 2 en 1', type: 'Folleto', file: '/downloads/temperature-sensor-ex.jpg', downName: 'Temperature-Sensor-EX-Brochure.jpg' },
    { name: 'Sensor antideflagrante 2 en 1 de temperatura y presión', type: 'Folleto', file: '/downloads/temp-pressure-2in1-ex.jpg', downName: 'Temp-Pressure-2in1-EX-Brochure.jpg' },
    { name: 'Sensor de temperatura y humedad', type: 'Ficha técnica', file: '/downloads/h300-temperature-humidity-sensor-datasheet.pdf', downName: 'Hitelecom-Temperature-Humidity-Sensor-Datasheet.pdf' },
    { name: 'Sensor de suelo', type: 'Ficha técnica', file: '/downloads/h300-soil-sensor-datasheet.pdf', downName: 'Hitelecom-Soil-Sensor-Datasheet.pdf' },
    { name: 'Sensor de presión', type: 'Ficha técnica', file: '/downloads/h300-pressure-sensor-datasheet.pdf', downName: 'Hitelecom-Pressure-Sensor-Datasheet.pdf' },
    { name: 'Sensor de inclinación', type: 'Ficha técnica', file: '/downloads/h310-ts180c-tilt-sensor-datasheet.pdf', downName: 'H310-TS180C-Tilt-Sensor-Datasheet.pdf' },
    { name: 'Distancia por radar', type: 'Ficha técnica', file: '/downloads/h310-mw012-radar-distance-sensor-datasheet.pdf', downName: 'H310-MW012-Radar-Distance-Sensor-Datasheet.pdf' },
    { name: 'Calidad del aire', type: 'Ficha técnica', file: '/downloads/h310-aq041-air-quality-sensor-datasheet.pdf', downName: 'H310-AQ041-Air-Quality-Sensor-Datasheet.pdf' },
  ],
  formHeading: 'Servicio posventa',
  formPh: { name: 'Nombre', phone: 'Teléfono', email: 'Correo electrónico', message: 'Cuéntenos qué necesita: el producto, la aplicación, la cantidad y las condiciones del sitio. Respondemos a la mayoría de las consultas en un día hábil.' },
  submit: 'Enviar solicitud de soporte',
};

export const serviceContent: Record<Locale, ServiceContent> = { ...serviceContentBase, es };
