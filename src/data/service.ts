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

export const serviceContent: Record<'en' | 'zh', ServiceContent> = {
  en: {
    bannerImg: 'service/banner.jpg',
    bannerSub: '',
    bannerTitle: 'SERVICE',
    tabs: [
      { label: 'Technical', anchor: '#page1' },
      { label: 'Software', anchor: '#page2' },
      { label: 'Documents', anchor: '#page3' },
      { label: 'After-Sales Service', anchor: '#page4' },
    ],
    techHeading: 'Deliver tailored professional solutions with strong support',
    techCards: [
      { img: 'service/tech-1.jpg', title: 'Hardware Customization', desc: 'Our professional hardware R&D team can meet your customization needs.' },
      { img: 'service/tech-2.jpg', title: 'Software Customization', desc: 'Our professional software development team can meet your customization needs.' },
      { img: 'service/tech-3.jpg', title: 'Remote Support', desc: 'We offer a comprehensive service system, providing users with a variety of service options.' },
      { img: 'service/tech-4.jpg', title: 'Telephone Support', desc: 'With experienced engineers available for phone guidance to resolve any installation issues.' },
      { img: 'service/tech-5.jpg', title: 'On-Site Support', desc: 'Experienced technical engineers who can solve any problems you may encounter on site' },
      { img: 'service/tech-6.jpg', title: 'Maintenance Support', desc: 'After-sales system with experienced engineers to resolve any post-purchase concerns.' },
    ],
    softHeading: 'Software',
    softSub1: 'Supports PC, App, Large Screen, and TV Wall Display Modes',
    softSub2: 'Hitelecom Cloud | Control Everything, Anywhere, Anytime',
    softBullets: [
      { icon: 'service/img7.png', text: 'App supports NFC for quick setup, easy maintenance.' },
      { icon: 'service/img8.png', text: 'Remote Configuration via Web/App, Eliminating Frequent On-site Visits' },
      { icon: 'service/img9.png', text: 'Customize trigger conditions and response times for email and app alert notifications.' },
      { icon: 'service/img9-2.png', text: 'Display supports customization for Digital Twin, GIS mapping, and other integrated visualization methods.' },
    ],
    softRightImg: 'service/software-right.png',
    platforms: [
      { icon: 'service/img12.png', label: 'Windows' },
      { icon: 'service/img13.png', label: 'Android' },
      { icon: 'service/img15.png', label: 'WeChat Program' },
      { icon: 'service/img17.png', label: 'iOS' },
    ],
    docsHeading: 'Document',
    docsP1: [
      { name: 'Hitelecom Profile', type: 'Brochure', file: '/downloads/company-profile.pdf', downName: 'Hitelecom-Company-Profile.pdf' },
      { name: 'Hitelecom Cloud', type: 'Scenarios', file: '/downloads/hitelecom-cloud-scenarios.pdf', downName: 'Hitelecom-Cloud-Scenarios.pdf' },
      { name: 'Temperature Sensor', type: 'Brochure', file: '/downloads/temperature-sensor.jpg', downName: 'Temperature-Sensor-Brochure.jpg' },
      { name: 'Soil Sensor', type: 'Brochure', file: '/downloads/soil-sensor.jpg', downName: 'Soil-Sensor-Brochure.jpg' },
      { name: 'Liquid Level', type: 'Brochure', file: '/downloads/liquid-level-sensor.jpg', downName: 'Liquid-Level-Sensor-Brochure.jpg' },
      { name: 'Pressure Sensor', type: 'Brochure', file: '/downloads/pressure-sensor.jpg', downName: 'Pressure-Sensor-Brochure.jpg' },
      { name: 'Water Leakage', type: 'Brochure', file: '/downloads/water-leakage-sensor.jpg', downName: 'Water-Leakage-Sensor-Brochure.jpg' },
      { name: 'Air Quality', type: 'Brochure', file: '/downloads/air-quality-sensor.jpg', downName: 'Air-Quality-Sensor-Brochure.jpg' },
    ],
    docsP2: [
      { name: 'Distance Measurement', type: 'Brochure', file: '/downloads/distance-measurement-sensor.jpg', downName: 'Distance-Measurement-Sensor-Brochure.jpg' },
      { name: 'Temperature Sensor (EX)', type: 'Brochure', file: '/downloads/temperature-sensor-ex.jpg', downName: 'Temperature-Sensor-EX-Brochure.jpg' },
      { name: 'Temp & Pressure 2 in 1 (EX)', type: 'Brochure', file: '/downloads/temp-pressure-2in1-ex.jpg', downName: 'Temp-Pressure-2in1-EX-Brochure.jpg' },
      { name: 'T&H Sensor', type: 'Datasheet', file: '/downloads/h300-temperature-humidity-sensor-datasheet.pdf', downName: 'Hitelecom-Temperature-Humidity-Sensor-Datasheet.pdf' },
      { name: 'Soil Sensor', type: 'Datasheet', file: '/downloads/h300-soil-sensor-datasheet.pdf', downName: 'Hitelecom-Soil-Sensor-Datasheet.pdf' },
      { name: 'Pressure Sensor', type: 'Datasheet', file: '/downloads/h300-pressure-sensor-datasheet.pdf', downName: 'Hitelecom-Pressure-Sensor-Datasheet.pdf' },
      { name: 'Tilt Sensor', type: 'Datasheet', file: '/downloads/h310-ts180c-tilt-sensor-datasheet.pdf', downName: 'H310-TS180C-Tilt-Sensor-Datasheet.pdf' },
      { name: 'Radar Distance', type: 'Datasheet', file: '/downloads/h310-mw012-radar-distance-sensor-datasheet.pdf', downName: 'H310-MW012-Radar-Distance-Sensor-Datasheet.pdf' },
      { name: 'Air Quality', type: 'Datasheet', file: '/downloads/h310-aq041-air-quality-sensor-datasheet.pdf', downName: 'H310-AQ041-Air-Quality-Sensor-Datasheet.pdf' },
    ],
    formHeading: 'After-Sales Service',
    formPh: { name: 'Name', phone: 'Phone', email: 'Email', message: 'Please leave your valuable feedback, and we will reply to you within 24 hours......' },
    submit: 'Submit',
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
    formPh: { name: '姓名', phone: '电话', email: '邮箱', message: '请您留下宝贵意见，我们将在24小时内给您回复......' },
    submit: '提 交',
  },
};
