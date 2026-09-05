import { getCollection } from 'astro:content';
import type { Locale } from '../i18n';

/**
 * 产品中心全部内容（中英双语，由 www.hitelecom.com 原站 1:1 提取）
 * 上产品 / 改文案只需改这里：
 * - tabs：顶部六大分类签；lists：各列表页（banner 图、子分类、产品卡）
 * - details：产品详情页（系列标题、卖点、特性、规格表、应用场景、相关推荐）
 * - cloud / app：IoT Cloud 与 IoT App 两个专页
 * 图片路径相对 src/assets/images/，同名覆盖即可换图。
 */

export interface ProductCard { id: string; name: string; conn: string; img: string }
export interface SubCat { cid: string; name: string; on?: boolean }
export interface ListPage { bannerImg: string; subcats: SubCat[]; products: ProductCard[] }
export interface DetailFeature { icon: string; text: string }
export interface ScenarioSlide { img: string; label: string }
/** 规格项（GEO 结构化）：支持单位与数值区间，便于 AI 做数值比较 */
export interface SpecItem {
  name: string;
  value: string;
  unitText?: string;
  minValue?: number;
  maxValue?: number;
}
/** 应用领域：每个领域一句话说明「测什么、解决什么问题」（GEO 主战场） */
export interface Application {
  name: string;
  desc: string;
  img?: string;
}
export interface DetailFaq { q: string; a: string }
export interface DetailPage {
  id: string; series: string; tagline: string; desc: string; heroImg: string;
  pdf: string; crumbCat: string; returnCid: string;
  features: DetailFeature[]; specsTitle: string; specsDesc: string;
  specs: [string, string][]; scenariosHeading: string;
  scenarios: ScenarioSlide[]; related: string[];
  // ——— GEO 新增（可选，逐系列迁移；渲染优先于旧字段）———
  summary?: string;              // 40–60 词直答式摘要
  sku?: string;                  // 型号，如 "H200/H300/H500"
  specsStructured?: SpecItem[];  // 结构化规格（优先于 specs）
  applications?: Application[];  // 应用领域（正文独立成节 + 进 additionalProperty）
  certifications?: string[];     // 仅产品级认证/防护等级（如 IP68、CE、RED）；ISO 9001 等体系认证属组织层级，勿放这里
  faqs?: DetailFaq[];            // 3–5 条，正文必须真实可见
  dateModified?: string;         // "2026-08-30"
  body?: string;                 // CMS 新品正文（Markdown/HTML，渲染为 Overview 附加节）
}
export interface CloudPage {
  banner: { title: string; subtitle: string; desc: string; images: string[] };
  intro: { heading: string; paras: string[]; cards: { img: string; title: string; desc: string }[] };
  features: { heading: string; items: { img: string; text: string }[] };
  architecture: { heading: string; img: string };
  core: { heading: string; subtitle: string; items: { img: string; title: string; desc: string }[] };
  scenarios: {
    heading: string;
    tabs: { icons: string[]; label: string }[];
    bgs: string[];
    slides: { img: string; title: string; desc: string }[];
  };
  cta: { title: string; subtitle: string; primary: string; secondary: string };
}
export interface AppPage {
  banner: { title: string; subtitle: string; desc: string; images: string[] };
  platforms: { heading: string; items: { img: string; name: string }[] };
  features: { heading: string; subtitle: string; items: { img: string; title: string; desc: string }[] };
  app3: { heading: string; subtitle: string; items: { img: string; label: string }[] };
}
export interface ProductTab { key: string; label: string; href: string }

export const productTabs: Record<Locale, ProductTab[]> = {
 "en": [
  {
   "key": "cloud",
   "label": "IoT Cloud",
   "href": "/product/"
  },
  {
   "key": "app",
   "label": "IoT App",
   "href": "/product/app"
  },
  {
   "key": "261",
   "label": "IoT Sensors",
   "href": "/product/lists/cid/261"
  },
  {
   "key": "258",
   "label": "IoT Gateways",
   "href": "/product/lists/cid/258"
  },
  {
   "key": "257",
   "label": "Weather Station",
   "href": "/product/lists/cid/257"
  },
  {
   "key": "256",
   "label": "Custom Development",
   "href": "/product/lists/cid/256"
  }
 ],
 "zh": [
  {
   "key": "cloud",
   "label": "宏太云",
   "href": "/product/"
  },
  {
   "key": "app",
   "label": "宏太APP",
   "href": "/product/app"
  },
  {
   "key": "261",
   "label": "传感器",
   "href": "/product/lists/cid/261"
  },
  {
   "key": "258",
   "label": "网关",
   "href": "/product/lists/cid/258"
  },
  {
   "key": "257",
   "label": "气象站",
   "href": "/product/lists/cid/257"
  },
  {
   "key": "256",
   "label": "定制品",
   "href": "/product/lists/cid/256"
  }
 ],
 "es": [
  {
   "key": "cloud",
   "label": "Nube IoT",
   "href": "/product/"
  },
  {
   "key": "app",
   "label": "App IoT",
   "href": "/product/app"
  },
  {
   "key": "261",
   "label": "Sensores IoT",
   "href": "/product/lists/cid/261"
  },
  {
   "key": "258",
   "label": "Gateways IoT",
   "href": "/product/lists/cid/258"
  },
  {
   "key": "257",
   "label": "Estación meteorológica",
   "href": "/product/lists/cid/257"
  },
  {
   "key": "256",
   "label": "Desarrollo personalizado",
   "href": "/product/lists/cid/256"
  }
 ],
 "de": [
  {
   "key": "cloud",
   "label": "IoT-Cloud",
   "href": "/product/"
  },
  {
   "key": "app",
   "label": "IoT-App",
   "href": "/product/app"
  },
  {
   "key": "261",
   "label": "IoT-Sensoren",
   "href": "/product/lists/cid/261"
  },
  {
   "key": "258",
   "label": "IoT-Gateways",
   "href": "/product/lists/cid/258"
  },
  {
   "key": "257",
   "label": "Wetterstation",
   "href": "/product/lists/cid/257"
  },
  {
   "key": "256",
   "label": "Kundenspezifische Entwicklung",
   "href": "/product/lists/cid/256"
  }
 ],
 "ja": [
  {
   "key": "cloud",
   "label": "IoTクラウド",
   "href": "/product/"
  },
  {
   "key": "app",
   "label": "IoTアプリ",
   "href": "/product/app"
  },
  {
   "key": "261",
   "label": "IoTセンサー",
   "href": "/product/lists/cid/261"
  },
  {
   "key": "258",
   "label": "IoTゲートウェイ",
   "href": "/product/lists/cid/258"
  },
  {
   "key": "257",
   "label": "気象ステーション",
   "href": "/product/lists/cid/257"
  },
  {
   "key": "256",
   "label": "カスタム開発",
   "href": "/product/lists/cid/256"
  }
 ]
};

/** 子分类 cid → 顶部分类 key */
export const listParent: Record<string, string> = {
 "262": "261",
 "263": "261",
 "265": "261",
 "266": "261",
 "267": "261",
 "268": "261",
 "269": "261",
 "271": "261",
 "272": "258",
 "273": "258",
 "274": "257",
 "275": "257",
 "278": "256",
 "279": "256",
 "306": "261",
 "261": "261",
 "258": "258",
 "257": "257",
 "256": "256"
};

const productContentBase ={
 "en": {
  "cloud": {
   "banner": {
    "title": "Hitelecom Cloud",
    "subtitle": "A Secure and Reliable IoT Platform",
    "desc": "Hitelecom IoT Cloud is an intelligent data integration platform that provides device connectivity, remote monitoring, and big data analytics, enabling enterprises to optimize operations and make smart decisions.",
    "images": [
     "product/cloud/banner-1.png",
     "product/cloud/banner-2.png",
     "product/cloud/banner-3.png",
     "product/cloud/banner-4.png"
    ]
   },
   "intro": {
    "heading": "Connect Field Devices to the Cloud",
    "paras": [
     "Hitelecom provides an integrated solution spanning IoT sensors, gateways, controllers, and cloud software, so field data moves from the device to your dashboard with fewer integration steps.",
     "Ultra-low-power device design reduces energy consumption across the product lifecycle, supporting long-term, sustainable deployments."
    ],
    "cards": [
     {
      "img": "product/cloud/deploy-1.png",
      "title": "Public Cloud",
      "desc": "Connect and manage devices quickly with monitoring, alerts, analytics, and remote maintenance on Hitelecom Cloud."
     },
     {
      "img": "product/cloud/deploy-2.png",
      "title": "Private Cloud",
      "desc": "Deploy the platform on customer-controlled infrastructure for data isolation, access control, and local operations."
     },
     {
      "img": "product/cloud/deploy-3.png",
      "title": "Hybrid Cloud",
      "desc": "Keep sensitive workloads on private infrastructure while using the public cloud for selected services and scalable workloads."
     },
     {
      "img": "product/cloud/deploy-4.png",
      "title": "Edge Cloud",
      "desc": "Process data locally, run basic control logic, and keep selected functions available when cloud connectivity is limited."
     }
    ]
   },
   "features": {
    "heading": "Hitelecom IoT Cloud Features",
    "items": [
     {
      "img": "product/cloud/feature-1.png",
      "text": "End-to-End IoT Solution"
     },
     {
      "img": "product/cloud/feature-2.png",
      "text": "Large-Scale Device Connectivity"
     },
     {
      "img": "product/cloud/feature-3.png",
      "text": "Highly Reliable Distributed Architecture"
     },
     {
      "img": "product/cloud/feature-4.png",
      "text": "Low-Latency Processing"
     },
     {
      "img": "product/cloud/feature-5.png",
      "text": "Multi-Protocol Support"
     },
     {
      "img": "product/cloud/feature-6.png",
      "text": "Visual Operations and Maintenance"
     },
     {
      "img": "product/cloud/feature-7.png",
      "text": "HiLink Device Protocol"
     },
     {
      "img": "product/cloud/feature-8.png",
      "text": "Custom Hardware and Software Development"
     }
    ]
   },
   "architecture": {
    "heading": "Platform Architecture",
    "img": "product/cloud/architecture.gif"
   },
   "core": {
    "heading": "Core Functions",
    "subtitle": "Accelerate your IoT business through efficient connectivity and precise management",
    "items": [
     {
      "img": "product/cloud/core-1.jpg",
      "title": "Device Connectivity",
      "desc": "Connect sensors, controllers, gateways, and edge devices through MQTT, HTTP, TCP, CoAP, AMQP, or the HiLink protocol, subject to device support."
     },
     {
      "img": "product/cloud/core-2.jpg",
      "title": "Device Management",
      "desc": "View live device status, monitor connection quality, and analyze alarms.\n\nStore-and-forward with retry keeps data flowing when network conditions are unstable.\n\nSee device distribution and location data on a map view.\n\nManage remote OTA firmware updates and batch operations for supported devices."
     },
     {
      "img": "product/cloud/core-3.jpg",
      "title": "Alarm Rules",
      "desc": "Configure flexible alarm rules with trigger conditions and attribute calculations for continuous device monitoring.\n\nDetect conditions such as high temperature, abnormal pressure, or rapid flow to support timely decisions.\n\nAlarms clear automatically when the triggering condition returns to normal, reducing manual follow-up.\n\nDeploy alarm configurations in batch and receive alarm reports from connected terminals."
     },
     {
      "img": "product/cloud/core-4.jpg",
      "title": "Data Visualization",
      "desc": "Build dashboards for desktop, mobile, and large-display layouts, connected live to device data sources.\n\nView dashboards on video walls, PCs, tablets, and phones with real-time refresh.\n\nAlarms appear in near real time, and configuration commands can be issued from the dashboard, subject to device connectivity.\n\nOptional GIS and digital-twin views can display device location, status, and movement history."
     },
     {
      "img": "product/cloud/core-5.jpg",
      "title": "Open API",
      "desc": "Open APIs for integration with third-party devices and controllers.\n\nUse APIs or MQTT to send device data to customer data centers or platforms.\n\nCloud-to-cloud integration can consolidate supported third-party data in Hitelecom Cloud."
     },
     {
      "img": "product/cloud/core-6.webp",
      "title": "Rule-Based Automation",
      "desc": "Link devices with scene rules: for example, turn on cooling when temperature rises above a configured threshold, or trigger supported irrigation controllers when soil moisture falls below the configured threshold.\n\nCombined with Hitelecom's ultra-low-power IoT terminals, rule-based automation reduces routine manual intervention."
     }
    ]
   },
   "scenarios": {
    "heading": "Application Scenarios",
    "tabs": [
     {
      "icons": [
       "product/cloud/scen-icon-1a.png",
       "product/cloud/scen-icon-1b.png"
      ],
      "label": "Industrial IoT"
     },
     {
      "icons": [
       "product/cloud/scen-icon-2a.png",
       "product/cloud/scen-icon-2b.png"
      ],
      "label": "Smart Energy"
     },
     {
      "icons": [
       "product/cloud/scen-icon-3a.png",
       "product/cloud/scen-icon-3b.png"
      ],
      "label": "Smart Campus"
     },
     {
      "icons": [
       "product/cloud/scen-icon-4a.png",
       "product/cloud/scen-icon-4b.png"
      ],
      "label": "Smart Agriculture"
     }
    ],
    "bgs": [
     "product/cloud/scen-bg-1.jpg",
     "product/cloud/scen-bg-2.jpg",
     "product/cloud/scen-bg-3.png",
     "product/cloud/scen-bg-4.png"
    ],
    "slides": [
     {
      "img": "product/cloud/scen-bg-1.jpg",
      "title": "Industrial IoT",
      "desc": "Connect devices, systems, and teams to streamline production processes and improve resource utilization. Hitelecom sensor terminals provide real-time monitoring of equipment status, supporting condition-based maintenance and rapid fault response."
     },
     {
      "img": "product/cloud/scen-bg-2.jpg",
      "title": "Smart Energy",
      "desc": "Hitelecom sensor terminals support energy management through real-time monitoring, data acquisition, and remote control. The data supports energy analysis and condition-based maintenance while reducing routine manual work. Hitelecom Cloud can integrate with existing energy systems through supported APIs and protocols, helping enterprises track operating costs and sustainability metrics."
     },
     {
      "img": "product/cloud/scen-bg-3.png",
      "title": "Smart Campus",
      "desc": "IoT in smart campuses connects devices and shares data across facilities. Hitelecom sensor terminals provide real-time monitoring of the campus environment, safety conditions, and energy use, giving administrators a continuous operational picture."
     },
     {
      "img": "product/cloud/scen-bg-4.png",
      "title": "Smart Agriculture",
      "desc": "Hitelecom smart IoT devices monitor soil moisture, temperature, and light in real time, providing data that supports irrigation and fertilization decisions and can reduce routine field labor. Integrated with weather stations and supported irrigation controllers, they connect field sensing to automated farm management."
     }
    ]
   },
   "cta": {
    "title": "Experience Hitelecom IoT Cloud",
    "subtitle": "A straightforward platform for connecting, monitoring, and managing supported IoT devices.",
    "primary": "View Cloud Demo",
    "secondary": "Discuss Your Project"
   }
  },
  "app": {
   "banner": {
    "title": "Hitelecom App",
    "subtitle": "Remote Monitoring for Your Business — Anywhere",
    "desc": "The Hitelecom app is a simple, convenient remote monitoring tool. Access and manage your connected devices from anywhere on your mobile device.",
    "images": [
     "product/cloud/banner-1.png",
     "product/cloud/banner-2.png",
     "product/cloud/banner-3.png",
     "product/app/banner-4.png"
    ]
   },
   "platforms": {
    "heading": "Available Across Platforms",
    "items": [
     {
      "img": "product/app/platform-1.png",
      "name": "Windows"
     },
     {
      "img": "product/app/platform-2.png",
      "name": "iOS"
     },
     {
      "img": "product/app/platform-3.png",
      "name": "Android"
     },
     {
      "img": "product/app/platform-4.png",
      "name": "WeChat Mini Program"
     }
    ]
   },
   "features": {
    "heading": "Product Features",
    "subtitle": "Register devices, configure sensors, manage user access, and monitor live data from one application.",
    "items": [
     {
      "img": "product/app/feature-1.png",
      "title": "Activate Device",
      "desc": "Use the Hitelecom app to activate and wake NFC-enabled devices, speeding up deployment and on-site configuration."
     },
     {
      "img": "product/app/feature-2.png",
      "title": "Device Connectivity",
      "desc": "Connect activated devices to Hitelecom Cloud and configure alarms, tasks, reporting intervals, and schedules to match each deployment."
     },
     {
      "img": "product/app/feature-3.png",
      "title": "Device Assignment",
      "desc": "Create and manage users, roles, departments, and permissions through a role-based access model."
     },
     {
      "img": "product/app/feature-4.png",
      "title": "Custom App Interface",
      "desc": "Customize app components and interfaces for customer workflows and branding requirements."
     },
     {
      "img": "product/app/feature-5.png",
      "title": "Data Dashboards",
      "desc": "View current readings, trends, and downloadable reports in one interface."
     },
     {
      "img": "product/app/feature-6.png",
      "title": "Map Data Components",
      "desc": "View device locations and status on interactive maps to support field operations and asset management."
     },
     {
      "img": "product/app/feature-7.png",
      "title": "Alarm Management",
      "desc": "Real-time device status monitoring with alerts pushed to the app helps teams respond more quickly to supported alerts and keep equipment running."
     },
     {
      "img": "product/app/feature-8.png",
      "title": "Multilingual Support",
      "desc": "The standard interface supports Chinese and English. Additional interface languages are available through custom development."
     }
    ]
   },
   "app3": {
    "heading": "Application Scenarios",
    "subtitle": "Use connected field data to monitor operations, respond to alerts, and improve decisions across industries.",
    "items": [
     {
      "img": "product/app/scen-0bbcd0.jpg",
      "label": "Smart Agriculture"
     },
     {
      "img": "product/app/scen-214abe.jpg",
      "label": "Environmental Monitoring"
     },
     {
      "img": "product/app/scen-f607f3.jpg",
      "label": "Industrial IoT"
     },
     {
      "img": "product/app/scen-7d03dc.jpg",
      "label": "Smart Campus"
     },
     {
      "img": "product/app/scen-4f4630.jpg",
      "label": "Smart City"
     },
     {
      "img": "product/app/scen-83dd3b.jpg",
      "label": "Smart Water"
     },
     {
      "img": "product/app/scen-1c2289.jpg",
      "label": "Smart Energy"
     },
     {
      "img": "product/app/scen-67bc5a.jpg",
      "label": "Asset Tracking"
     }
    ]
   }
  },
  "lists": {
   "261": {
    "bannerImg": "product/list/banner-261.jpg",
    "subcats": [
     {
      "cid": "261",
      "name": "All",
      "on": true
     },
     {
      "cid": "263",
      "name": "Temperature",
      "on": false
     },
     {
      "cid": "262",
      "name": "Pressure",
      "on": false
     },
     {
      "cid": "269",
      "name": "Soil",
      "on": false
     },
     {
      "cid": "268",
      "name": "Liquid Level",
      "on": false
     },
     {
      "cid": "267",
      "name": "Tilt Monitoring",
      "on": false
     },
     {
      "cid": "266",
      "name": "Radar Distance",
      "on": false
     },
     {
      "cid": "271",
      "name": "Vibration Monitoring",
      "on": false
     },
     {
      "cid": "265",
      "name": "Air Quality",
      "on": false
     },
     {
      "cid": "306",
      "name": "Asset Tracking",
      "on": false
     }
    ],
    "products": [
     {
      "id": "270",
      "img": "product/products/270.png",
      "name": "Temperature Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa"
     },
     {
      "id": "274",
      "img": "product/products/274.png",
      "name": "Pressure Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa"
     },
     {
      "id": "280",
      "img": "product/products/280.png",
      "name": "Soil Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa"
     },
     {
      "id": "281",
      "img": "product/products/281.png",
      "name": "Submersible Level Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa"
     },
     {
      "id": "282",
      "img": "product/products/282.png",
      "name": "Tilt Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa"
     },
     {
      "id": "283",
      "img": "product/products/283.png",
      "name": "Radar Distance Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa"
     },
     {
      "id": "284",
      "img": "product/products/284.png",
      "name": "Vibration Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa"
     },
     {
      "id": "285",
      "img": "product/products/285.png",
      "name": "Air Quality Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa"
     },
     {
      "id": 301,
      "name": "Temperature and Humidity Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa",
      "img": "product/products/301.png"
     },
     {
      "id": 302,
      "name": "Temperature and Humidity Data Logger",
      "conn": "NFC | USB",
      "img": "product/products/302.png"
     },
     {
      "id": 303,
      "name": "TVOC Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa",
      "img": "product/products/303.png"
     },
     {
      "id": 304,
      "name": "Asset Tracking Sensor",
      "conn": "GPS | BeiDou | 4G LTE",
      "img": "product/products/304.png"
     },
     {
      "id": 305,
      "name": "Custom Gas Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa",
      "img": "product/products/305.png"
     }
    ]
   },
   "258": {
    "bannerImg": "product/list/banner-258.jpg",
    "subcats": [
     {
      "cid": "258",
      "name": "All",
      "on": true
     },
     {
      "cid": "272",
      "name": "Indoor Gateway",
      "on": false
     },
     {
      "cid": "273",
      "name": "Outdoor Gateway",
      "on": false
     }
    ],
    "products": [
     {
      "id": "276",
      "img": "product/products/276.png",
      "name": "Indoor Gateway",
      "conn": "LoRa | 4G LTE | Ethernet"
     },
     {
      "id": "275",
      "img": "product/products/275.png",
      "name": "Outdoor Gateway",
      "conn": "LoRa | 4G LTE | Ethernet"
     }
    ]
   },
   "257": {
    "bannerImg": "product/list/banner-257.jpg",
    "subcats": [
     {
      "cid": "257",
      "name": "All",
      "on": true
     },
     {
      "cid": "275",
      "name": "6-Parameter",
      "on": false
     },
     {
      "cid": "274",
      "name": "12-Parameter",
      "on": false
     }
    ],
    "products": [
     {
      "id": "278",
      "img": "product/products/278.png",
      "name": "Weather Station",
      "conn": "Multi-Parameter | Real-Time | Easy Deployment"
     },
     {
      "id": "277",
      "img": "product/products/277.png",
      "name": "Hydrology",
      "conn": "Real-Time | Multi-Parameter | Millimeter-Level"
     }
    ]
   },
   "256": {
    "bannerImg": "product/list/banner-256.jpg",
    "subcats": [
     {
      "cid": "256",
      "name": "All",
      "on": true
     },
     {
      "cid": "278",
      "name": "Software",
      "on": false
     },
     {
      "cid": "279",
      "name": "Hardware",
      "on": false
     }
    ],
    "products": [
     {
      "id": "",
      "img": "product/products/custom-1.png",
      "name": "Digital Twin",
      "conn": "Custom dashboards and dynamic data visualization"
     },
     {
      "id": "",
      "img": "product/products/custom-2.png",
      "name": "GIS Dashboard",
      "conn": "Custom maps and multidimensional data visualization"
     },
     {
      "id": "",
      "img": "product/products/custom-3.png",
      "name": "Embedded Software",
      "conn": "Embedded software tailored to specific application needs"
     },
     {
      "id": "",
      "img": "product/products/custom-4.png",
      "name": "Hardware Customization",
      "conn": "Custom sensors, controllers, actuators, and other connected devices"
     },
     {
      "id": "287",
      "img": "product/products/287.png",
      "name": "IoT Accessories",
      "conn": "Signal Coupling | 2.4 GHz | 5.8 GHz"
     },
     {
      "id": "286",
      "img": "product/products/286.png",
      "name": "Explosion-Proof 2-in-1 Sensor",
      "conn": "Temperature | Pressure | 4G Communication"
     }
    ]
   },
   "262": {
    "bannerImg": "product/list/banner-261.jpg",
    "subcats": [
     {
      "cid": "261",
      "name": "All",
      "on": false
     },
     {
      "cid": "263",
      "name": "Temperature",
      "on": false
     },
     {
      "cid": "262",
      "name": "Pressure",
      "on": true
     },
     {
      "cid": "269",
      "name": "Soil",
      "on": false
     },
     {
      "cid": "268",
      "name": "Liquid Level",
      "on": false
     },
     {
      "cid": "267",
      "name": "Tilt Monitoring",
      "on": false
     },
     {
      "cid": "266",
      "name": "Radar Distance",
      "on": false
     },
     {
      "cid": "271",
      "name": "Vibration Monitoring",
      "on": false
     },
     {
      "cid": "265",
      "name": "Air Quality",
      "on": false
     },
     {
      "cid": "306",
      "name": "Asset Tracking",
      "on": false
     }
    ],
    "products": [
     {
      "id": "274",
      "img": "product/products/274.png",
      "name": "Pressure Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa"
     }
    ]
   },
   "263": {
    "bannerImg": "product/list/banner-261.jpg",
    "subcats": [
     {
      "cid": "261",
      "name": "All",
      "on": false
     },
     {
      "cid": "263",
      "name": "Temperature",
      "on": true
     },
     {
      "cid": "262",
      "name": "Pressure",
      "on": false
     },
     {
      "cid": "269",
      "name": "Soil",
      "on": false
     },
     {
      "cid": "268",
      "name": "Liquid Level",
      "on": false
     },
     {
      "cid": "267",
      "name": "Tilt Monitoring",
      "on": false
     },
     {
      "cid": "266",
      "name": "Radar Distance",
      "on": false
     },
     {
      "cid": "271",
      "name": "Vibration Monitoring",
      "on": false
     },
     {
      "cid": "265",
      "name": "Air Quality",
      "on": false
     },
     {
      "cid": "306",
      "name": "Asset Tracking",
      "on": false
     }
    ],
    "products": [
     {
      "id": "270",
      "img": "product/products/270.png",
      "name": "Temperature Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa"
     },
     {
      "id": 301,
      "name": "Temperature and Humidity Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa",
      "img": "product/products/301.png"
     },
     {
      "id": 302,
      "name": "Temperature and Humidity Data Logger",
      "conn": "NFC | USB",
      "img": "product/products/302.png"
     }
    ]
   },
   "265": {
    "bannerImg": "product/list/banner-261.jpg",
    "subcats": [
     {
      "cid": "261",
      "name": "All",
      "on": false
     },
     {
      "cid": "263",
      "name": "Temperature",
      "on": false
     },
     {
      "cid": "262",
      "name": "Pressure",
      "on": false
     },
     {
      "cid": "269",
      "name": "Soil",
      "on": false
     },
     {
      "cid": "268",
      "name": "Liquid Level",
      "on": false
     },
     {
      "cid": "267",
      "name": "Tilt Monitoring",
      "on": false
     },
     {
      "cid": "266",
      "name": "Radar Distance",
      "on": false
     },
     {
      "cid": "271",
      "name": "Vibration Monitoring",
      "on": false
     },
     {
      "cid": "265",
      "name": "Air Quality",
      "on": true
     },
     {
      "cid": "306",
      "name": "Asset Tracking",
      "on": false
     }
    ],
    "products": [
     {
      "id": "285",
      "img": "product/products/285.png",
      "name": "Air Quality Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa"
     },
     {
      "id": 303,
      "name": "TVOC Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa",
      "img": "product/products/303.png"
     },
     {
      "id": 305,
      "name": "Custom Gas Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa",
      "img": "product/products/305.png"
     }
    ]
   },
   "266": {
    "bannerImg": "product/list/banner-261.jpg",
    "subcats": [
     {
      "cid": "261",
      "name": "All",
      "on": false
     },
     {
      "cid": "263",
      "name": "Temperature",
      "on": false
     },
     {
      "cid": "262",
      "name": "Pressure",
      "on": false
     },
     {
      "cid": "269",
      "name": "Soil",
      "on": false
     },
     {
      "cid": "268",
      "name": "Liquid Level",
      "on": false
     },
     {
      "cid": "267",
      "name": "Tilt Monitoring",
      "on": false
     },
     {
      "cid": "266",
      "name": "Radar Distance",
      "on": true
     },
     {
      "cid": "271",
      "name": "Vibration Monitoring",
      "on": false
     },
     {
      "cid": "265",
      "name": "Air Quality",
      "on": false
     },
     {
      "cid": "306",
      "name": "Asset Tracking",
      "on": false
     }
    ],
    "products": [
     {
      "id": "283",
      "img": "product/products/283.png",
      "name": "Radar Distance Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa"
     }
    ]
   },
   "267": {
    "bannerImg": "product/list/banner-261.jpg",
    "subcats": [
     {
      "cid": "261",
      "name": "All",
      "on": false
     },
     {
      "cid": "263",
      "name": "Temperature",
      "on": false
     },
     {
      "cid": "262",
      "name": "Pressure",
      "on": false
     },
     {
      "cid": "269",
      "name": "Soil",
      "on": false
     },
     {
      "cid": "268",
      "name": "Liquid Level",
      "on": false
     },
     {
      "cid": "267",
      "name": "Tilt Monitoring",
      "on": true
     },
     {
      "cid": "266",
      "name": "Radar Distance",
      "on": false
     },
     {
      "cid": "271",
      "name": "Vibration Monitoring",
      "on": false
     },
     {
      "cid": "265",
      "name": "Air Quality",
      "on": false
     },
     {
      "cid": "306",
      "name": "Asset Tracking",
      "on": false
     }
    ],
    "products": [
     {
      "id": "282",
      "img": "product/products/282.png",
      "name": "Tilt Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa"
     }
    ]
   },
   "268": {
    "bannerImg": "product/list/banner-261.jpg",
    "subcats": [
     {
      "cid": "261",
      "name": "All",
      "on": false
     },
     {
      "cid": "263",
      "name": "Temperature",
      "on": false
     },
     {
      "cid": "262",
      "name": "Pressure",
      "on": false
     },
     {
      "cid": "269",
      "name": "Soil",
      "on": false
     },
     {
      "cid": "268",
      "name": "Liquid Level",
      "on": true
     },
     {
      "cid": "267",
      "name": "Tilt Monitoring",
      "on": false
     },
     {
      "cid": "266",
      "name": "Radar Distance",
      "on": false
     },
     {
      "cid": "271",
      "name": "Vibration Monitoring",
      "on": false
     },
     {
      "cid": "265",
      "name": "Air Quality",
      "on": false
     },
     {
      "cid": "306",
      "name": "Asset Tracking",
      "on": false
     }
    ],
    "products": [
     {
      "id": "281",
      "img": "product/products/281.png",
      "name": "Submersible Level Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa"
     }
    ]
   },
   "269": {
    "bannerImg": "product/list/banner-261.jpg",
    "subcats": [
     {
      "cid": "261",
      "name": "All",
      "on": false
     },
     {
      "cid": "263",
      "name": "Temperature",
      "on": false
     },
     {
      "cid": "262",
      "name": "Pressure",
      "on": false
     },
     {
      "cid": "269",
      "name": "Soil",
      "on": true
     },
     {
      "cid": "268",
      "name": "Liquid Level",
      "on": false
     },
     {
      "cid": "267",
      "name": "Tilt Monitoring",
      "on": false
     },
     {
      "cid": "266",
      "name": "Radar Distance",
      "on": false
     },
     {
      "cid": "271",
      "name": "Vibration Monitoring",
      "on": false
     },
     {
      "cid": "265",
      "name": "Air Quality",
      "on": false
     },
     {
      "cid": "306",
      "name": "Asset Tracking",
      "on": false
     }
    ],
    "products": [
     {
      "id": "280",
      "img": "product/products/280.png",
      "name": "Soil Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa"
     }
    ]
   },
   "271": {
    "bannerImg": "product/list/banner-261.jpg",
    "subcats": [
     {
      "cid": "261",
      "name": "All",
      "on": false
     },
     {
      "cid": "263",
      "name": "Temperature",
      "on": false
     },
     {
      "cid": "262",
      "name": "Pressure",
      "on": false
     },
     {
      "cid": "269",
      "name": "Soil",
      "on": false
     },
     {
      "cid": "268",
      "name": "Liquid Level",
      "on": false
     },
     {
      "cid": "267",
      "name": "Tilt Monitoring",
      "on": false
     },
     {
      "cid": "266",
      "name": "Radar Distance",
      "on": false
     },
     {
      "cid": "271",
      "name": "Vibration Monitoring",
      "on": true
     },
     {
      "cid": "265",
      "name": "Air Quality",
      "on": false
     },
     {
      "cid": "306",
      "name": "Asset Tracking",
      "on": false
     }
    ],
    "products": [
     {
      "id": "284",
      "img": "product/products/284.png",
      "name": "Vibration Sensor",
      "conn": "NB-IoT | 4G LTE | LoRa"
     }
    ]
   },
   "272": {
    "bannerImg": "product/list/banner-258.jpg",
    "subcats": [
     {
      "cid": "258",
      "name": "All",
      "on": false
     },
     {
      "cid": "272",
      "name": "Indoor Gateway",
      "on": true
     },
     {
      "cid": "273",
      "name": "Outdoor Gateway",
      "on": false
     }
    ],
    "products": [
     {
      "id": "276",
      "img": "product/products/276.png",
      "name": "Indoor Gateway",
      "conn": "LoRa | 4G LTE | Ethernet"
     }
    ]
   },
   "273": {
    "bannerImg": "product/list/banner-258.jpg",
    "subcats": [
     {
      "cid": "258",
      "name": "All",
      "on": false
     },
     {
      "cid": "272",
      "name": "Indoor Gateway",
      "on": false
     },
     {
      "cid": "273",
      "name": "Outdoor Gateway",
      "on": true
     }
    ],
    "products": [
     {
      "id": "275",
      "img": "product/products/275.png",
      "name": "Outdoor Gateway",
      "conn": "LoRa | 4G LTE | Ethernet"
     }
    ]
   },
   "274": {
    "bannerImg": "product/list/banner-257.jpg",
    "subcats": [
     {
      "cid": "257",
      "name": "All",
      "on": false
     },
     {
      "cid": "275",
      "name": "6-Parameter",
      "on": false
     },
     {
      "cid": "274",
      "name": "12-Parameter",
      "on": true
     }
    ],
    "products": [
     {
      "id": "277",
      "img": "product/products/277.png",
      "name": "Hydrology",
      "conn": "Real-Time | Multi-Parameter | Millimeter-Level"
     }
    ]
   },
   "275": {
    "bannerImg": "product/list/banner-257.jpg",
    "subcats": [
     {
      "cid": "257",
      "name": "All",
      "on": false
     },
     {
      "cid": "275",
      "name": "6-Parameter",
      "on": true
     },
     {
      "cid": "274",
      "name": "12-Parameter",
      "on": false
     }
    ],
    "products": [
     {
      "id": "278",
      "img": "product/products/278.png",
      "name": "Weather Station",
      "conn": "Multi-Parameter | Real-Time | Easy Deployment"
     }
    ]
   },
   "278": {
    "bannerImg": "product/list/banner-256.jpg",
    "subcats": [
     {
      "cid": "256",
      "name": "All",
      "on": false
     },
     {
      "cid": "278",
      "name": "Software",
      "on": true
     },
     {
      "cid": "279",
      "name": "Hardware",
      "on": false
     }
    ],
    "products": [
     {
      "id": "",
      "img": "product/products/custom-1.png",
      "name": "Digital Twin",
      "conn": "Custom dashboards and dynamic data visualization"
     },
     {
      "id": "",
      "img": "product/products/custom-2.png",
      "name": "GIS Dashboard",
      "conn": "Custom maps and multidimensional data visualization"
     },
     {
      "id": "",
      "img": "product/products/custom-3.png",
      "name": "Embedded Software",
      "conn": "Embedded software tailored to specific application needs"
     }
    ]
   },
   "279": {
    "bannerImg": "product/list/banner-256.jpg",
    "subcats": [
     {
      "cid": "256",
      "name": "All",
      "on": false
     },
     {
      "cid": "278",
      "name": "Software",
      "on": false
     },
     {
      "cid": "279",
      "name": "Hardware",
      "on": true
     }
    ],
    "products": [
     {
      "id": "",
      "img": "product/products/custom-4.png",
      "name": "Hardware Customization",
      "conn": "Custom sensors, controllers, actuators, and other connected devices"
     },
     {
      "id": "287",
      "img": "product/products/287.png",
      "name": "IoT Accessories",
      "conn": "Signal Coupling | 2.4 GHz | 5.8 GHz"
     },
     {
      "id": "286",
      "img": "product/products/286.png",
      "name": "Explosion-Proof 2-in-1 Sensor",
      "conn": "Temperature | Pressure | 4G Communication"
     }
    ]
   },
   "306": {
    "bannerImg": "product/list/banner-261.jpg",
    "subcats": [
     {
      "cid": "261",
      "name": "All",
      "on": false
     },
     {
      "cid": "263",
      "name": "Temperature",
      "on": false
     },
     {
      "cid": "262",
      "name": "Pressure",
      "on": false
     },
     {
      "cid": "269",
      "name": "Soil",
      "on": false
     },
     {
      "cid": "268",
      "name": "Liquid Level",
      "on": false
     },
     {
      "cid": "267",
      "name": "Tilt Monitoring",
      "on": false
     },
     {
      "cid": "266",
      "name": "Radar Distance",
      "on": false
     },
     {
      "cid": "271",
      "name": "Vibration Monitoring",
      "on": false
     },
     {
      "cid": "265",
      "name": "Air Quality",
      "on": false
     },
     {
      "cid": "306",
      "name": "Asset Tracking",
      "on": true
     }
    ],
    "products": [
     {
      "id": 304,
      "name": "Asset Tracking Sensor",
      "conn": "GPS | BeiDou | 4G LTE",
      "img": "product/products/304.png"
     }
    ]
   }
  },
  "details": {
   "270": {
    "series": "H Series · Temperature Sensor",
    "tagline": "Precision | Range | Ultra-Low Power",
    "desc": "Hitelecom's temperature sensors offer remote monitoring, alerting, and high-precision measurement, delivering timely and reliable temperature data across diverse applications",
    "heroImg": "product/details/270-hero.png",
    "pdf": "/downloads/temperature-sensor-datasheet.pdf",
     "crumbCat": "Temperature",
    "returnCid": "263",
    "features": [
     {
      "icon": "product/details/270-f1.png",
      "text": "Accuracy: ±0.5°C (customizable to ±0.1°C)"
     },
     {
      "icon": "product/details/270-f2.png",
      "text": "IP68-Rated Enclosure"
     },
     {
      "icon": "product/details/270-f3.png",
      "text": "Wide Range: -200°C to +800°C"
     },
     {
      "icon": "product/details/270-f4.png",
      "text": "Supports NFC activation and local device configuration."
     },
     {
      "icon": "product/details/270-f5.png",
      "text": "Low-Power Design for Long-Term Operation"
     },
     {
      "icon": "product/details/270-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/270-f7.png",
      "text": "Remote Temperature Monitoring"
     },
     {
      "icon": "product/details/270-f8.png",
      "text": "Configurable Threshold Alerts"
     }
    ],
    "specsTitle": "Technical Specifications",
    "specsDesc": "Micro-power processors and algorithmic optimization give the sensor a design life of up to 10 years at a one-hour reporting interval under specified test conditions, reducing routine maintenance.",
    "specs": [
     [
      "Product Models",
      "H200/H300/H500"
     ],
     [
      "Measuring Range",
      "-200°C to 800°C"
     ],
     [
      "Accuracy",
      "±0.5°C (customizable to ±0.1°C)"
     ],
     [
      "Protocol",
      "MQTT"
     ],
     [
      "Connection",
      "Three-wire"
     ],
     [
      "Frequency Bands",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "Battery Life",
      "Designed for more than 10 years of battery life at a one-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval."
     ],
     [
      "Installation",
      "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     ]
    ],

    "specsStructured": [
     {
      "name": "Product Models",
      "value": "H200/H300/H500"
     },
     {
      "name": "Measuring Range",
      "value": "-200°C to 800°C",
      "unitText": "degree Celsius",
      "minValue": -200.0,
      "maxValue": 800.0
     },
     {
      "name": "Accuracy",
      "value": "±0.5°C (customizable to ±0.1°C)",
      "unitText": "degree Celsius"
     },
     {
      "name": "Protocol",
      "value": "MQTT"
     },
     {
      "name": "Connection",
      "value": "Three-wire"
     },
     {
      "name": "Frequency Bands",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "Battery Life",
      "value": "Designed for more than 10 years of battery life at a one-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval.",
      "unitText": "year",
      "minValue": 10.0
     },
     {
      "name": "Installation",
      "value": "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     }
    ],    "certImgs": [],
    "scenariosHeading": "Application Scenarios",
    "scenarios": [
     {
      "img": "product/details/270-scen1.jpg",
      "label": "Smart Energy"
     },
     {
      "img": "product/details/270-scen2.jpg",
      "label": "Smart Agriculture"
     },
     {
      "img": "product/details/270-scen3.jpg",
      "label": "Data center"
     },
     {
      "img": "product/details/270-scen4.jpg",
      "label": "Pharmaceutical and Healthcare Storage"
     },
     {
      "img": "product/details/270-scen5.jpg",
      "label": "Food processing"
     },
     {
      "img": "product/details/270-scen6.jpg",
      "label": "Smart Manufacturing"
     },
     {
      "img": "product/details/270-scen7.jpg",
      "label": "Amusement park"
     }
    ],
    "related": [
     "274",
     "280",
     "281",
     "282",
     "283",
     "284",
     "285",
     "276",
     "275"
    ],
    "summary": "The Hitelecom H Series temperature sensor is a wireless industrial temperature sensor for remote monitoring from -200°C to 800°C. It delivers ±0.5°C accuracy (customizable to ±0.1°C), is designed for more than 10 years of battery life at hourly reporting under specified test conditions, and uploads readings over 4G or NB-IoT to Hitelecom Cloud or private platforms via MQTT.",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "Data centers and server rooms",
      "desc": "Tracks rack inlet and room temperature, helping operators identify conditions that may lead to thermal shutdown.",
      "img": "product/details/270-scen3.jpg"
     },
     {
      "name": "Cold storage and food processing",
      "desc": "Keeps chillers, freezers and processing lines within safe temperature bands to support HACCP monitoring.",
      "img": "product/details/270-scen5.jpg"
     },
     {
      "name": "Medical and laboratory monitoring",
      "desc": "Watches refrigerators, incubators and clean rooms holding vaccines, blood and reagents.",
      "img": "product/details/270-scen4.jpg"
     },
     {
      "name": "Greenhouse and livestock climate",
      "desc": "Monitors house temperature for crop yield and animal welfare in smart agriculture.",
      "img": "product/details/270-scen2.jpg"
     },
     {
      "name": "Industrial process monitoring",
      "desc": "Measures pipeline, boiler and equipment surface temperature on production lines.",
      "img": "product/details/270-scen6.jpg"
     },
     {
      "name": "Energy facilities",
      "desc": "Monitors transformers, battery rooms and substation cabinets for overheating risks.",
      "img": "product/details/270-scen1.jpg"
     },
     {
      "name": "Public venues",
      "desc": "Watches indoor climate in amusement parks and other high-traffic public buildings.",
      "img": "product/details/270-scen7.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "What is the measuring range of the H Series temperature sensor?",
      "a": "Standard range is -200°C to 800°C with ±0.5°C accuracy; ±0.1°C accuracy is available on request. The three-wire probe connection keeps readings stable in electrically noisy plants."
     },
     {
      "q": "How long does the battery last?",
      "a": "The transmitter is designed for more than 10 years of battery life at a one-hour reporting interval — actual life varies with network conditions, temperature, and reporting frequency. The transmitter is fully battery-powered; only the probe cable is required — no mains or signal cable is needed at the installation point."
     },
     {
      "q": "How does the sensor report data?",
      "a": "It transmits over 4G or NB-IoT using MQTT to Hitelecom Cloud, a customer cloud, or a private deployment, and pushes alerts when temperature crosses configured thresholds."
     },
     {
      "q": "Can the sensor be customized for our application?",
      "a": "Yes. Probe type, probe length, cable length, reporting interval, and enclosure can be customized under Hitelecom's OEM/ODM program. Contact sales with your working conditions."
     }
    ],
    "dateModified": "2026-09-02"
   },
   "274": {
    "series": "H Series · Pressure Sensor",
    "tagline": "Remote | Low-Power | Impact-Resistant",
    "desc": "Hitelecom's pressure sensors deliver continuous precision measurement with accurate cloud reporting of critical pressure data for complex industrial applications",
    "heroImg": "product/details/274-hero.png",
    "pdf": "/downloads/h300-pressure-sensor-datasheet.pdf",
     "crumbCat": "Pressure",
    "returnCid": "262",
    "features": [
     {
      "icon": "product/details/274-f1.png",
      "text": "±0.5% FS (High-Precision Customization)"
     },
     {
      "icon": "product/details/274-f2.png",
      "text": "IP68-Rated Enclosure"
     },
     {
      "icon": "product/details/274-f3.png",
      "text": "Supports remote OTA firmware updates."
     },
     {
      "icon": "product/details/274-f4.png",
      "text": "Supports NFC activation and local device configuration."
     },
     {
      "icon": "product/details/274-f5.png",
      "text": "Low-Power Design for Long-Term Operation"
     },
     {
      "icon": "product/details/274-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/274-f7.png",
      "text": "Remote Pressure Monitoring"
     },
     {
      "icon": "product/details/274-f8.png",
      "text": "Configurable Threshold Alerts"
     }
    ],
    "specsTitle": "Technical Specifications",
    "specsDesc": "Integrated communication and sensing technologies with embedded energy-saving algorithms give the pressure sensor an extended service life and high measurement stability, supporting the reliability of the wider monitoring system.",
    "specs": [
     [
      "Product Models",
      "H200/H300/H500"
     ],
     [
      "Measuring Range",
      "0–1, 1.6, 3.5, 7, 10, or 20 MPa"
     ],
     [
      "Overload",
      "≤ 2× full-scale pressure"
     ],
     [
      "Stability",
      "±0.2% FS/year"
     ],
     [
      "Protocol",
      "MQTT"
     ],
     [
      "Operating Temperature",
      "-20°C to +80°C"
     ],
     [
      "Storage Temperature",
      "-20°C to +85°C"
     ],
     [
      "Battery Life",
      "Designed for more than 10 years of battery life at a one-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval."
     ],
     [
      "Installation",
      "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     ]
    ],

    "specsStructured": [
     {
      "name": "Product Models",
      "value": "H200/H300/H500"
     },
     {
      "name": "Measuring Range",
      "value": "0–1, 1.6, 3.5, 7, 10, or 20 MPa"
     },
     {
      "name": "Overload",
      "value": "≤ 2× full-scale pressure"
     },
     {
      "name": "Stability",
      "value": "±0.2% FS/year"
     },
     {
      "name": "Protocol",
      "value": "MQTT"
     },
     {
      "name": "Operating Temperature",
      "value": "-20°C to +80°C",
      "unitText": "degree Celsius",
      "minValue": -20.0,
      "maxValue": 80.0
     },
     {
      "name": "Storage Temperature",
      "value": "-20°C to +85°C",
      "unitText": "degree Celsius",
      "minValue": -20.0,
      "maxValue": 85.0
     },
     {
      "name": "Battery Life",
      "value": "Designed for more than 10 years of battery life at a one-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval.",
      "unitText": "year",
      "minValue": 10.0
     },
     {
      "name": "Installation",
      "value": "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     }
    ],    "certImgs": [],
    "scenariosHeading": "Application Scenarios",
    "scenarios": [
     {
      "img": "product/details/274-scen1.jpg",
      "label": "Chemical industry"
     },
     {
      "img": "product/details/274-scen2.jpg",
      "label": "Semiconductor industry"
     },
     {
      "img": "product/details/274-scen3.jpg",
      "label": "Smart building"
     },
     {
      "img": "product/details/274-scen4.jpg",
      "label": "Smart Manufacturing"
     },
     {
      "img": "product/details/274-scen5.jpg",
      "label": "Scientific Research"
     },
     {
      "img": "product/details/274-scen6.jpg",
      "label": "Smart Agriculture"
     },
     {
      "img": "product/details/274-scen7.jpg",
      "label": "Tower monitoring"
     },
     {
      "img": "product/details/274-scen8.jpg",
      "label": "Geological exploration"
     }
    ],
    "related": [
     "270",
     "280",
     "281",
     "282",
     "283",
     "284",
     "285",
     "276",
     "275"
    ],
    "summary": "The Hitelecom H Series pressure sensor is a wireless industrial pressure transmitter for pipelines, pumps and tanks. Available full-scale ranges are 1, 1.6, 3.5, 7, 10, and 20 MPa with ±0.2% FS/year stability and 2× full-scale overload tolerance, reporting over 4G or NB-IoT. The battery is designed for more than 10 years of life at a one-hour reporting interval under specified test conditions.",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "Water supply and pump stations",
      "desc": "Monitors pipeline pressure to catch bursts, leaks and pump faults early.",
      "img": "product/details/281-scen1.jpg"
     },
     {
      "name": "Chemical plants",
      "desc": "Tracks process line pressure where wired transmitters are costly to retrofit.",
      "img": "product/details/274-scen1.jpg"
     },
     {
      "name": "Building water systems",
      "desc": "Watches booster pump and riser pressure in high-rise secondary water supply.",
      "img": "product/details/274-scen3.jpg"
     },
     {
      "name": "Semiconductor fabs",
      "desc": "Monitors specialty gas and utility lines with stable, repeatable readings.",
      "img": "product/details/274-scen2.jpg"
     },
     {
      "name": "Industrial hydraulics",
      "desc": "Follows hydraulic press and equipment pressure curves to support condition-based maintenance.",
      "img": "product/details/274-scen4.jpg"
     },
     {
      "name": "Tank and vessel monitoring",
      "desc": "Combines head pressure with level for inventory and safety control.",
      "img": "product/details/287-scen3.jpg"
     },
     {
      "name": "Geological and exploration sites",
      "desc": "Battery-powered pressure logging at remote boreholes without cabling.",
      "img": "product/details/274-scen8.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "What pressure ranges are available?",
      "a": "Standard ranges are 0-1 MPa, 1.6 MPa, 3.5 MPa, 7 MPa, 10 MPa and 20 MPa. The sensor tolerates 2× full-scale overload and has long-term stability of ±0.2% FS/year (a separate metric from measurement accuracy)."
     },
     {
      "q": "Can it measure both gas and liquid pressure?",
      "a": "The standard version suits common gas and liquid media compatible with the process connection; for corrosive or special media, contact Hitelecom to confirm wetted materials."
     },
     {
      "q": "How does it report readings?",
      "a": "It sends readings over 4G or NB-IoT via MQTT to Hitelecom Cloud, a customer cloud, or a private platform, with configurable thresholds and alerts."
     },
     {
      "q": "What power does it need on site?",
      "a": "None. The internal battery is designed for more than 10 years of life at a one-hour reporting interval under specified test conditions — actual life varies with network coverage, temperature, and reporting frequency — so the transmitter can be mounted where cabling is impractical."
     }
    ],
    "dateModified": "2026-09-02"
   },
   "280": {
    "series": "H Series · Soil Sensor",
    "tagline": "Low Power | Precision | Multi-parameter",
    "desc": "Hitelecom's soil sensor integrates multi-parameter monitoring, scheduled data sync, and precision measurement, supporting comprehensive soil quality assessment and continuous monitoring for diverse agricultural applications",
    "heroImg": "product/details/280-hero.png",
    "pdf": "/downloads/h300-soil-sensor-datasheet.pdf",
     "crumbCat": "Soil",
    "returnCid": "269",
    "features": [
     {
      "icon": "product/details/280-f1.png",
      "text": "Monitoring key nutrients such as nitrogen, phosphorus, and potassium"
     },
     {
      "icon": "product/details/280-f2.png",
      "text": "IP68-Rated Enclosure"
     },
     {
      "icon": "product/details/280-f3.png",
      "text": "Soil moisture monitoring for irrigation management"
     },
     {
      "icon": "product/details/280-f4.png",
      "text": "Supports NFC activation and local device configuration."
     },
     {
      "icon": "product/details/280-f5.png",
      "text": "Supports remote OTA firmware updates."
     },
     {
      "icon": "product/details/280-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/280-f7.png",
      "text": "Remote Soil Monitoring"
     },
     {
      "icon": "product/details/280-f8.png",
      "text": "Configurable Threshold Alerts"
     }
    ],
    "specsTitle": "Technical Specifications",
    "specsDesc": "Leveraging advanced intelligent algorithms and continuous data logging, coupled with its adaptability in extreme conditions, it continuously tracks and precisely analyzes soil conditions, effectively addressing complex agricultural challenges and enhancing irrigation, fertilization, and yield-management decisions.",
    "specs": [
     [
      "Product Models",
      "H200/H300/H500"
     ],
     [
      "Conductivity",
      "0–1,000 µS/cm (±3%)"
     ],
     [
      "pH",
      "0–14 (0.01 resolution)"
     ],
     [
      "Soil Moisture",
      "0–100% (±3%; not suitable for permafrost layers)"
     ],
     [
      "NPK",
      "0–1,999 mg/kg (±2% FS)"
     ],
     [
      "Protocol",
      "MQTT"
     ],
     [
      "Frequency Bands",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "Battery Life",
      "Designed for more than 10 years of battery life at a one-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval."
     ],
     [
      "Installation",
      "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     ]
    ],

    "specsStructured": [
     {
      "name": "Product Models",
      "value": "H200/H300/H500"
     },
     {
      "name": "Conductivity",
      "value": "0–1,000 µS/cm (±3%)",
      "unitText": "microsiemens per centimetre",
      "minValue": 0.0,
      "maxValue": 1000.0
     },
     {
      "name": "pH",
      "value": "0–14 (0.01 resolution)"
     },
     {
      "name": "Soil Moisture",
      "value": "0–100% (±3%; not suitable for permafrost layers)",
      "unitText": "percent",
      "minValue": 0.0,
      "maxValue": 100.0
     },
     {
      "name": "NPK",
      "value": "0–1,999 mg/kg (±2% FS)",
      "unitText": "milligram per kilogram",
      "minValue": 0.0,
      "maxValue": 1999.0
     },
     {
      "name": "Protocol",
      "value": "MQTT"
     },
     {
      "name": "Frequency Bands",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "Battery Life",
      "value": "Designed for more than 10 years of battery life at a one-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval.",
      "unitText": "year",
      "minValue": 10.0
     },
     {
      "name": "Installation",
      "value": "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     }
    ],    "certImgs": [],
    "scenariosHeading": "Application Scenarios",
    "scenarios": [
     {
      "img": "product/details/280-scen1.jpg",
      "label": "Farmland"
     },
     {
      "img": "product/details/280-scen2.jpg",
      "label": "Greenhouse"
     },
     {
      "img": "product/details/280-scen3.jpg",
      "label": "Urban parks"
     },
     {
      "img": "product/details/280-scen4.jpg",
      "label": "Soil pollution"
     },
     {
      "img": "product/details/280-scen5.jpg",
      "label": "Forest health"
     },
     {
      "img": "product/details/280-scen6.jpg",
      "label": "Laboratory"
     }
    ],
    "related": [
     "270",
     "274",
     "281",
     "282",
     "283",
     "284",
     "285",
     "276",
     "275"
    ],
    "summary": "The Hitelecom H Series soil sensor is a multi-parameter wireless probe for agriculture and land monitoring. One device measures soil moisture, temperature, conductivity (EC), pH and NPK nutrients, reports over 4G or NB-IoT, and is designed for more than 10 years of battery life at a one-hour reporting interval under specified test conditions, with an IP68 enclosure designed for long-term burial.",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "Farmland irrigation scheduling",
      "desc": "Soil moisture trends tell growers exactly when and how much to irrigate, cutting water waste.",
      "img": "product/details/280-scen1.jpg"
     },
     {
      "name": "Greenhouse fertigation",
      "desc": "EC and NPK readings guide fertilizer dosing so nutrients stay in the root zone, not in runoff.",
      "img": "product/details/280-scen2.jpg"
     },
     {
      "name": "Urban parks and landscaping",
      "desc": "Monitors lawn and tree-pit soil moisture for municipal greening maintenance crews.",
      "img": "product/details/280-scen3.jpg"
     },
     {
      "name": "Soil pollution and remediation tracking",
      "desc": "Continuous pH and EC logging flags contamination plumes and verifies remediation progress.",
      "img": "product/details/280-scen4.jpg"
     },
     {
      "name": "Forest and grassland health",
      "desc": "Long-term buried probes track soil drought stress ahead of visible canopy decline.",
      "img": "product/details/280-scen5.jpg"
     },
     {
      "name": "Research and field trials",
      "desc": "Multi-parameter time series support agronomy research and variety trials.",
      "img": "product/details/280-scen6.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "Which soil parameters does the H Series measure?",
      "a": "Soil moisture (0–100%, ±3%), temperature, conductivity (0–1,000 µS/cm, ±3%), pH (0–14, 0.01 resolution) and NPK nutrients (0–1,999 mg/kg, ±2% FS) — all in a single probe."
     },
     {
      "q": "Can the probe stay buried outdoors year-round?",
      "a": "Yes. The IP68 enclosure is designed for long-term burial, and the battery is designed for more than 10 years of life at a one-hour reporting interval under specified test conditions, which reduces routine maintenance between seasons."
     },
     {
      "q": "How is soil data transmitted?",
      "a": "Over 4G or NB-IoT with MQTT uplink to Hitelecom Cloud or a private platform; thresholds on any parameter trigger alerts."
     },
     {
      "q": "Is it suitable for alkaline or saline soils?",
      "a": "The EC channel covers 0–1,000 µS/cm. For saline soils or special media, confirm the required EC range with Hitelecom."
     }
    ],
    "dateModified": "2026-09-02"
   },
   "281": {
    "series": "H Series · Submersible Level Sensor",
    "tagline": "Precision | Range | Ultra-Low Power",
    "desc": "Hitelecom's level sensor provides precise monitoring, timely feedback, and high stability, delivering accurate and continuous liquid level data across various industrial settings.",
    "heroImg": "product/details/281-hero.png",
    "pdf": "/downloads/liquid-level-sensor-datasheet.pdf",
    "crumbCat": "Liquid Level",
    "returnCid": "268",
    "features": [
     {
      "icon": "product/details/281-f1.png",
      "text": "±0.5% FS (High-Precision Customization)"
     },
     {
      "icon": "product/details/281-f2.png",
      "text": "IP68-Rated Enclosure"
     },
     {
      "icon": "product/details/281-f3.png",
      "text": "Wide Range: 0–200 m (Customizable)"
     },
     {
      "icon": "product/details/281-f4.png",
      "text": "Supports NFC activation and local device configuration."
     },
     {
      "icon": "product/details/281-f5.png",
      "text": "Supports remote OTA firmware updates."
     },
     {
      "icon": "product/details/281-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/281-f7.png",
      "text": "Remote Level Monitoring"
     },
     {
      "icon": "product/details/281-f8.png",
      "text": "Configurable Threshold Alerts"
     }
    ],
    "specsTitle": "Technical Specifications",
    "specsDesc": "Integrated sensing technology, real-time communication, and an energy-efficient design support accurate, continuous liquid-level data across industrial applications from water treatment to chemical production lines.",
    "specs": [
     [
      "Product Models",
      "H200/H300/H500"
     ],
     [
      "Range",
      "0–200 m (Customizable)"
     ],
     [
      "Accuracy",
      "±0.5% FS (Higher Precision Customizable)"
     ],
     [
      "Stability",
      "±0.2% FS/year"
     ],
     [
      "Protocol",
      "MQTT"
     ],
     [
      "Operating Temperature",
      "-20°C to +70°C"
     ],
     [
      "Storage Temperature",
      "-20°C to +80°C"
     ],
     [
      "Battery Life",
      "Designed for more than 10 years of battery life at a one-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval."
     ],
     [
      "Installation",
      "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     ]
    ],

    "specsStructured": [
     {
      "name": "Product Models",
      "value": "H200/H300/H500"
     },
     {
      "name": "Range",
      "value": "0–200 m (Customizable)"
     },
     {
      "name": "Accuracy",
      "value": "±0.5% FS (Higher Precision Customizable)",
      "unitText": "percent"
     },
     {
      "name": "Stability",
      "value": "±0.2% FS/year"
     },
     {
      "name": "Protocol",
      "value": "MQTT"
     },
     {
      "name": "Operating Temperature",
      "value": "-20°C to +70°C",
      "unitText": "degree Celsius",
      "minValue": -20.0,
      "maxValue": 70.0
     },
     {
      "name": "Storage Temperature",
      "value": "-20°C to +80°C",
      "unitText": "degree Celsius",
      "minValue": -20.0,
      "maxValue": 80.0
     },
     {
      "name": "Battery Life",
      "value": "Designed for more than 10 years of battery life at a one-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval.",
      "unitText": "year",
      "minValue": 10.0
     },
     {
      "name": "Installation",
      "value": "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     }
    ],    "certImgs": [],
    "scenariosHeading": "Application Scenarios",
    "scenarios": [
     {
      "img": "product/details/281-scen1.jpg",
      "label": "Water supply and drainage"
     },
     {
      "img": "product/details/281-scen2.jpg",
      "label": "Marine and Shipboard Applications"
     },
     {
      "img": "product/details/281-scen3.jpg",
      "label": "Hydrological Monitoring"
     },
     {
      "img": "product/details/281-scen4.jpg",
      "label": "Metallurgy"
     },
     {
      "img": "product/details/281-scen5.jpg",
      "label": "Medical Wastewater"
     },
     {
      "img": "product/details/281-scen6.jpg",
      "label": "Power plant"
     },
     {
      "img": "product/details/281-scen7.jpg",
      "label": "Mining"
     },
     {
      "img": "product/details/281-scen8.jpg",
      "label": "Smart Energy"
     }
    ],
    "related": [
     "270",
     "274",
     "280",
     "282",
     "283",
     "284",
     "285",
     "276",
     "275"
    ],
    "summary": "The Hitelecom H Series level sensor is a wireless liquid-level transmitter for reservoirs, rivers, tanks and wells. It covers 0–200 m (customizable) at ±0.5% FS accuracy with ±0.2% FS/year stability, is designed for more than 10 years of battery life at a one-hour reporting interval under specified test conditions, and reports over 4G or NB-IoT.",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "Reservoirs and dams",
      "desc": "Continuous water-level logging for flood control and dispatch decisions.",
      "img": "solution/67-scen-0.jpg"
     },
     {
      "name": "River and hydrological stations",
      "desc": "Remote stage monitoring along rivers and channels without mains power.",
      "img": "product/details/281-scen3.jpg"
     },
     {
      "name": "Water supply and drainage",
      "desc": "Tank, clear-well and network reservoir levels for utility operation.",
      "img": "product/details/281-scen1.jpg"
     },
     {
      "name": "Industrial tanks",
      "desc": "Inventory level in power-plant and metallurgy process tanks.",
      "img": "product/details/287-scen3.jpg"
     },
     {
      "name": "Mine water management",
      "desc": "Watches sump and shaft water levels for mine safety.",
      "img": "product/details/281-scen7.jpg"
     },
     {
      "name": "Marine and ship applications",
      "desc": "Ballast and bilge level monitoring with battery-powered simplicity.",
      "img": "product/details/281-scen2.jpg"
     },
     {
      "name": "Medical wastewater",
      "desc": "Tracks collection-tank levels at hospital wastewater stations.",
      "img": "product/details/281-scen5.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "What level range does the H Series cover?",
      "a": "0-200 m as standard, customizable beyond that. Accuracy is ±0.5% FS with ±0.2% FS per year stability for long-term unattended monitoring."
     },
     {
      "q": "How is the sensor powered at remote sites?",
      "a": "By internal battery — designed for more than 10 years of life at a one-hour reporting interval under specified test conditions — so in suitable deployments reservoirs and river stations may not need a solar panel or cabling."
     },
     {
      "q": "How do we get the level data?",
      "a": "The transmitter reports over 4G or NB-IoT via MQTT to Hitelecom Cloud or your own platform, with high and low level alarms."
     },
     {
      "q": "Can it be customized for our tank or well?",
      "a": "Yes. Range, probe cable length and mounting can be adapted to the installation; share your drawings or site photos with Hitelecom sales for a matching configuration."
     }
    ],
    "dateModified": "2026-09-02"
   },
   "282": {
    "series": "H Series · Tilt Sensor",
    "tagline": "Precision | Multi-Axis | Ultra-Low Power",
    "desc": "Hitelecom's tilt sensor integrates ultra-high precision sensing elements, featuring remote monitoring, real-time alerts, and high-precision measurement for accurate and timely tilt data across complex industrial applications",
    "heroImg": "product/details/282-hero.png",
    "pdf": "/downloads/h310-ts180c-tilt-sensor-datasheet.pdf",
     "crumbCat": "Tilt Monitoring",
    "returnCid": "267",
    "features": [
     {
      "icon": "product/details/282-f1.png",
      "text": "Accuracy: ±0.005° (customizable)"
     },
     {
      "icon": "product/details/282-f2.png",
      "text": "IP68-Rated Enclosure"
     },
     {
      "icon": "product/details/282-f3.png",
      "text": "Resolution: 0.001°"
     },
     {
      "icon": "product/details/282-f4.png",
      "text": "Supports NFC activation and local device configuration."
     },
     {
      "icon": "product/details/282-f5.png",
      "text": "Supports remote OTA firmware updates."
     },
     {
      "icon": "product/details/282-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/282-f7.png",
      "text": "Remote Angle Monitoring"
     },
     {
      "icon": "product/details/282-f8.png",
      "text": "Configurable Threshold Alerts"
     }
    ],
    "specsTitle": "Technical Specifications",
    "specsDesc": "High-sensitivity sensing elements, real-time data synchronization, and a robust, durable design support precise and reliable tilt monitoring. Designed for up to 10 years of operation at a one-hour reporting interval under specified test conditions, reducing routine maintenance.",
    "specs": [
     [
      "Product Models",
      "H200/H300/H500"
     ],
     [
      "Range",
      "X-Axis · Y-Axis (Customizable to Three Axes)"
     ],
     [
      "Accuracy",
      "±0.005° (Customizable)"
     ],
     [
      "Resolution",
      "0.001°"
     ],
     [
      "Protocol",
      "MQTT"
     ],
     [
      "Operating Temperature",
      "-20°C to +70°C"
     ],
     [
      "Storage Temperature",
      "-20°C to +80°C"
     ],
     [
      "Battery Life",
      "Designed for more than 10 years of battery life at a one-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval."
     ],
     [
      "Installation",
      "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     ]
    ],
    "certImgs": [],
    "scenariosHeading": "Application Scenarios",
    "scenarios": [
     {
      "img": "product/details/282-scen1.jpg",
      "label": "Bridge Tilt and Deformation"
     },
     {
      "img": "product/details/282-scen2.jpg",
      "label": "Warehouse Racking"
     },
     {
      "img": "product/details/282-scen3.jpg",
      "label": "Tower tilt"
     },
     {
      "img": "product/details/282-scen4.jpg",
      "label": "At-Risk Buildings"
     },
     {
      "img": "product/details/282-scen5.jpg",
      "label": "Solar tracking system"
     },
     {
      "img": "product/details/282-scen6.jpg",
      "label": "Energy Infrastructure Tilt Monitoring"
     },
     {
      "img": "product/details/282-scen7.jpg",
      "label": "Building tilt"
     },
     {
      "img": "product/details/282-scen8.jpg",
      "label": "Amusement-Ride and Park-Structure Monitoring"
     }
    ],
    "related": [
     "270",
     "274",
     "280",
     "281",
     "283",
     "284",
     "285",
     "276",
     "275"
    ],
    "summary": "The Hitelecom H Series tilt sensor is a wireless IoT inclinometer for structural health monitoring. It measures X- and Y-axis tilt (three-axis optional) at ±0.005° accuracy and 0.001° resolution, is designed for more than 10 years of battery life at hourly reporting under specified test conditions, and carries an IP68 rating for long-term outdoor deployment. Connectivity options are 4G, NB-IoT and LoRa.",
    "sku": "H200/H300/H500",
    "specsStructured": [
     {
      "name": "Product Models",
      "value": "H200 / H300 / H500"
     },
     {
      "name": "Measurement Axes",
      "value": "X-Axis · Y-Axis (customizable to three axes)"
     },
     {
      "name": "Accuracy",
      "value": "±0.005°",
      "unitText": "degree"
     },
     {
      "name": "Resolution",
      "value": "0.001°",
      "unitText": "degree"
     },
     {
      "name": "Protocol",
      "value": "MQTT"
     },
     {
      "name": "Wireless",
      "value": "4G / NB-IoT / LoRa"
     },
     {
      "name": "Operating Temperature",
      "value": "-20°C to 70°C",
      "unitText": "degree Celsius",
      "minValue": -20,
      "maxValue": 70
     },
     {
      "name": "Storage Temperature",
      "value": "-20°C to 80°C",
      "unitText": "degree Celsius",
      "minValue": -20,
      "maxValue": 80
     },
     {
      "name": "Battery Life",
      "value": "Designed for more than 10 years of battery life at a one-hour reporting interval under specified test conditions"
     },
     {
      "name": "Ingress Protection",
      "value": "IP68"
     },
     {
      "name": "Installation",
      "value": "Mounting lugs · Pole clamp · Slotted mount"
     },
     {
      "name": "Configuration",
      "value": "NFC activation; OTA firmware upgrade"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "applications": [
     {
      "name": "Slope stability monitoring",
      "desc": "Supports earlier identification of abnormal slope movement on highways, open-pit mines, and cut embankments.",
      "img": "product/details/281-scen7.jpg"
     },
     {
      "name": "Railway infrastructure",
      "desc": "Monitors track bed settlement, retaining walls and catenary mast inclination along railway lines."
     },
     {
      "name": "Tunnel monitoring",
      "desc": "Tracks lining convergence and segment rotation during and after tunnel construction."
     },
     {
      "name": "Bridge deformation",
      "desc": "Measures pier tilt, girder rotation and bearing displacement for bridge health monitoring.",
      "img": "product/details/282-scen1.jpg"
     },
     {
      "name": "Metro and subway structures",
      "desc": "Monitors station box deflection and shield tunnel deformation near adjacent excavation works."
     },
     {
      "name": "Construction sites and temporary structures",
      "desc": "Watches scaffolding, tower cranes, formwork and site sheds for unsafe inclination."
     },
     {
      "name": "Sea dikes and dams",
      "desc": "Continuous inclination monitoring of embankment dams, sea walls and reservoir slopes.",
      "img": "solution/67-scen-0.jpg"
     },
     {
      "name": "Heritage buildings and ancient pagodas",
      "desc": "Non-invasive tilt tracking for protected historic structures where drilling is not permitted.",
      "img": "product/details/282-scen4.jpg"
     },
     {
      "name": "Tree tilt monitoring",
      "desc": "Detects root failure and lean progression in urban trees ahead of typhoon season.",
      "img": "product/details/280-scen3.jpg"
     },
     {
      "name": "Street light poles",
      "desc": "Flags pole inclination from vehicle impact or foundation loosening across municipal lighting assets."
     },
     {
      "name": "Transmission towers",
      "desc": "Monitors foundation settlement and tower inclination on power transmission lines.",
      "img": "product/details/282-scen3.jpg"
     },
     {
      "name": "Telecom towers",
      "desc": "Tracks mast verticality and guyed-tower alignment for communication infrastructure."
     },
     {
      "name": "Warehouse racking",
      "desc": "Detects rack upright deflection from forklift impact, supporting earlier intervention before damage escalates.",
      "img": "product/details/282-scen2.jpg"
     }
    ],
    "faqs": [
     {
      "q": "What structures can the H Series tilt sensor monitor?",
      "a": "The H Series tilt sensor is deployed on slopes and embankments, railway infrastructure, tunnels, bridges, metro structures, construction sites and temporary works, sea dikes and dams, heritage buildings and ancient pagodas, urban trees, street light poles, transmission towers, telecom towers, and warehouse racking. Its IP68 rating and long battery life suit it to long-term outdoor installation; battery life depends on reporting interval, network coverage, and site conditions."
     },
     {
      "q": "How accurate is the H Series tilt sensor?",
      "a": "Standard accuracy is ±0.005° with 0.001° resolution on the X and Y axes. A three-axis configuration is available on request, and accuracy can be customized for applications requiring tighter tolerance."
     },
     {
      "q": "How long does the battery last?",
      "a": "Designed for more than 10 years at a one-hour reporting interval under specified test conditions. Battery life scales with reporting frequency; more frequent reporting shortens service life. Most configurations run on battery without mains power or a solar panel — confirm power options for your configuration."
     },
     {
      "q": "Which wireless technology should I choose — 4G, NB-IoT or LoRa?",
      "a": "Choose 4G where cellular coverage is reliable and higher data rates or firmware updates over the air are needed. NB-IoT may suit indoor or underground sites such as tunnels and basements where the local operator provides adequate coverage. Choose LoRa when deploying a dense cluster of sensors on one site with a private gateway and no per-device SIM cost."
     },
     {
      "q": "Can it be installed on heritage structures without drilling?",
      "a": "Yes. The sensor supports mounting lugs, a pole clamp, or a slotted mount. For protected structures, clamp and adhesive mounting avoid penetrating the fabric of the building. Contact Hitelecom for site-specific mounting guidance."
     }
    ],
    "dateModified": "2026-09-02"
   },
   "283": {
    "series": "H Series · Radar Distance Sensor",
    "tagline": "Low Power | Precision | Millimeter-Level",
    "desc": "Hitelecom's distance sensors feature millimeter-level precision, scheduled data collection, and high immunity to interference, delivering accurate distance measurements and timely cloud updates across complex environments",
    "heroImg": "product/details/283-hero.png",
    "pdf": "/downloads/h310-mw012-radar-distance-sensor-datasheet.pdf",
     "crumbCat": "Radar Distance",
    "returnCid": "266",
    "features": [
     {
      "icon": "product/details/283-f1.png",
      "text": "Accuracy: ±1 mm (Customizable)"
     },
     {
      "icon": "product/details/283-f2.png",
      "text": "IP68-Rated Enclosure"
     },
     {
      "icon": "product/details/283-f3.png",
      "text": "Wide Range: 0.3–50 m (Customizable)"
     },
     {
      "icon": "product/details/283-f4.png",
      "text": "Supports NFC activation and local device configuration."
     },
     {
      "icon": "product/details/283-f5.png",
      "text": "Supports remote OTA firmware updates."
     },
     {
      "icon": "product/details/283-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/283-f7.png",
      "text": "Remote Distance Monitoring"
     },
     {
      "icon": "product/details/283-f8.png",
      "text": "Configurable Threshold Alerts"
     }
    ],
    "specsTitle": "Technical Specifications",
    "specsDesc": "High-precision radar distance measurement, advanced low-power processors, and optimized embedded algorithms give the sensor a design life of up to 10 years at a one-hour reporting interval under specified test conditions, reducing routine maintenance.",
    "specs": [
     [
      "Product Models",
      "H200/H300/H500"
     ],
     [
      "Range",
      "0.3–50 m (Customizable)"
     ],
     [
      "Accuracy",
      "±1 mm (Customizable)"
     ],
     [
      "Resolution",
      "1 mm"
     ],
     [
      "Protocol",
      "MQTT"
     ],
     [
      "Operating Temperature",
      "-20°C to +70°C"
     ],
     [
      "Storage Temperature",
      "-20°C to +80°C"
     ],
     [
      "Battery Life",
      "Designed for more than 10 years of battery life at a one-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval."
     ],
     [
      "Installation",
      "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     ]
    ],

    "specsStructured": [
     {
      "name": "Product Models",
      "value": "H200/H300/H500"
     },
     {
      "name": "Range",
      "value": "0.3–50 m (Customizable)",
      "minValue": 0.3,
      "maxValue": 50.0
     },
     {
      "name": "Accuracy",
      "value": "±1 mm (Customizable)",
      "unitText": "millimetre"
     },
     {
      "name": "Resolution",
      "value": "1 mm",
      "unitText": "millimetre"
     },
     {
      "name": "Protocol",
      "value": "MQTT"
     },
     {
      "name": "Operating Temperature",
      "value": "-20°C to +70°C",
      "unitText": "degree Celsius",
      "minValue": -20.0,
      "maxValue": 70.0
     },
     {
      "name": "Storage Temperature",
      "value": "-20°C to +80°C",
      "unitText": "degree Celsius",
      "minValue": -20.0,
      "maxValue": 80.0
     },
     {
      "name": "Battery Life",
      "value": "Designed for more than 10 years of battery life at a one-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval.",
      "unitText": "year",
      "minValue": 10.0
     },
     {
      "name": "Installation",
      "value": "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     }
    ],    "certImgs": [],
    "scenariosHeading": "Application Scenarios",
    "scenarios": [
     {
      "img": "product/details/283-scen1.jpg",
      "label": "Manhole Cover"
     },
     {
      "img": "product/details/283-scen2.jpg",
      "label": "Grain silo height"
     },
     {
      "img": "product/details/283-scen3.jpg",
      "label": "Coal mine"
     },
     {
      "img": "product/details/283-scen4.jpg",
      "label": "Water Plant"
     },
     {
      "img": "product/details/283-scen5.jpg",
      "label": "Chemical Plant"
     },
     {
      "img": "product/details/283-scen6.jpg",
      "label": "Smart Manufacturing"
     },
     {
      "img": "product/details/283-scen7.jpg",
      "label": "Smart building"
     },
     {
      "img": "product/details/283-scen8.jpg",
      "label": "Smart Energy"
     }
    ],
    "related": [
     "270",
     "274",
     "280",
     "281",
     "282",
     "284",
     "285",
     "276",
     "275"
    ],
    "summary": "The Hitelecom H Series ranging sensor is a wireless radar distance sensor with millimeter-level precision. It measures 0.3–50 m at ±1 mm accuracy and 1 mm resolution, resists interference in harsh industrial sites, and reports over 4G or NB-IoT, with a battery designed for more than 10 years of life at a one-hour reporting interval under specified test conditions.",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "Manhole cover monitoring",
      "desc": "Detects cover displacement and abnormal distance readings for municipal safety.",
      "img": "product/details/283-scen1.jpg"
     },
     {
      "name": "Grain silo level",
      "desc": "Measures material surface distance to compute fill level in grain silos.",
      "img": "product/details/283-scen2.jpg"
     },
     {
      "name": "Coal mine bunkers",
      "desc": "Monitors coal bunker fill height in dusty, humid underground conditions.",
      "img": "product/details/283-scen3.jpg"
     },
     {
      "name": "Water and wastewater plants",
      "desc": "Open-channel and tank distance measurement for level control.",
      "img": "product/details/283-scen4.jpg"
     },
     {
      "name": "Chemical plant inventory",
      "desc": "Non-contact distance measurement over corrosive or sealed tanks.",
      "img": "product/details/283-scen5.jpg"
     },
     {
      "name": "Smart building and logistics",
      "desc": "Occupancy, dock and pallet-position distance sensing in facilities.",
      "img": "product/details/283-scen7.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "What distance range and accuracy does it offer?",
      "a": "It offers a 0.3–50 m measuring range (customizable) with ±1 mm accuracy and 1 mm resolution — suitable for level-by-distance and displacement monitoring."
     },
     {
      "q": "Does dust or humidity affect the measurement?",
      "a": "The radar-based measurement is designed to maintain measurement performance in dusty or humid sites such as coal bunkers and manholes; the IP68 enclosure protects the device itself."
     },
     {
      "q": "How is it powered and connected?",
      "a": "It uses an internal battery designed for more than 10 years of life at a one-hour reporting interval under specified test conditions, with 4G or NB-IoT uplink via MQTT to Hitelecom Cloud or private platforms."
     },
     {
      "q": "Can the range be extended beyond 50 m?",
      "a": "Yes, range and mounting are customizable. Tell Hitelecom your target distance and medium for a configuration proposal."
     }
    ],
    "dateModified": "2026-09-02"
   },
   "284": {
    "series": "H Series · Vibration Sensor",
    "tagline": "Precision | Range | Ultra-Low Power",
    "desc": "Hitelecom vibration sensors monitor and analyze mechanical equipment vibration in Industry 4.0 environments, providing data that supports equipment health management and condition-based maintenance to help reduce unplanned downtime.",
    "heroImg": "product/details/284-hero.png",
    "pdf": "/downloads/vibration-sensor-datasheet.pdf",
    "crumbCat": "Vibration Monitoring",
    "returnCid": "271",
    "features": [
     {
      "icon": "product/details/284-f1.png",
      "text": "Vibration Velocity: 0–100 mm/s (Customizable)"
     },
     {
      "icon": "product/details/284-f2.png",
      "text": "IP68-Rated Enclosure"
     },
     {
      "icon": "product/details/284-f3.png",
      "text": "Displacement Amplitu0–1,000 µm (Customizable)"
     },
     {
      "icon": "product/details/284-f4.png",
      "text": "Supports NFC activation and local device configuration."
     },
     {
      "icon": "product/details/284-f5.png",
      "text": "Supports remote OTA firmware updates."
     },
     {
      "icon": "product/details/284-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/284-f7.png",
      "text": "Remote Vibration Monitoring"
     },
     {
      "icon": "product/details/284-f8.png",
      "text": "Configurable Threshold Alerts"
     }
    ],
    "specsTitle": "Technical Specifications",
    "specsDesc": "Low-power processors and algorithm optimization give the sensor a design life of up to 10 years at a one-hour reporting interval under specified test conditions, with minimal energy use in each measurement cycle.",
    "specs": [
     [
      "Product Models",
      "H200/H300/H500"
     ],
     [
      "Vibration Velocity",
      "0–100 mm/s (Customizable)"
     ],
     [
      "Displacement Amplitude",
      "0–1,000 µm (Customizable)"
     ],
     [
      "Accuracy",
      "±1% at 80 Hz (Calibration)"
     ],
     [
      "Protocol",
      "MQTT"
     ],
     [
      "Operating Temperature",
      "-20°C to +70°C"
     ],
     [
      "Storage Temperature",
      "-20°C to +80°C"
     ],
     [
      "Battery Life",
      "Designed for more than 10 years of battery life at a one-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval."
     ],
     [
      "Installation",
      "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     ]
    ],

    "specsStructured": [
     {
      "name": "Product Models",
      "value": "H200/H300/H500"
     },
     {
      "name": "Vibration Velocity",
      "value": "0–100 mm/s (Customizable)"
     },
     {
      "name": "Displacement Amplitude",
      "value": "0–1,000 µm (Customizable)"
     },
     {
      "name": "Accuracy",
      "value": "±1% at 80 Hz (Calibration)",
      "unitText": "percent"
     },
     {
      "name": "Protocol",
      "value": "MQTT"
     },
     {
      "name": "Operating Temperature",
      "value": "-20°C to +70°C",
      "unitText": "degree Celsius",
      "minValue": -20.0,
      "maxValue": 70.0
     },
     {
      "name": "Storage Temperature",
      "value": "-20°C to +80°C",
      "unitText": "degree Celsius",
      "minValue": -20.0,
      "maxValue": 80.0
     },
     {
      "name": "Battery Life",
      "value": "Designed for more than 10 years of battery life at a one-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval.",
      "unitText": "year",
      "minValue": 10.0
     },
     {
      "name": "Installation",
      "value": "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     }
    ],    "certImgs": [],
    "scenariosHeading": "Application Scenarios",
    "scenarios": [
     {
      "img": "product/details/284-scen1.jpg",
      "label": "Semiconductor"
     },
     {
      "img": "product/details/284-scen2.jpg",
      "label": "Industrial Equipment"
     },
     {
      "img": "product/details/284-scen3.jpg",
      "label": "Harbor"
     },
     {
      "img": "product/details/284-scen4.jpg",
      "label": "Smart Energy"
     },
     {
      "img": "product/details/284-scen5.jpg",
      "label": "Smart building"
     },
     {
      "img": "product/details/284-scen6.jpg",
      "label": "Logistics and Transportation"
     }
    ],
    "related": [
     "270",
     "274",
     "280",
     "281",
     "282",
     "283",
     "285",
     "276",
     "275"
    ],
    "summary": "The Hitelecom H Series vibration sensor is a wireless monitor for rotating machinery and structural vibration in Industry 4.0. It measures vibration velocity from 0 to 100 mm/s and displacement amplitude 0–1,000 µm (customizable) at ±1% accuracy (calibrated at 80 Hz), reports over 4G or NB-IoT, and is designed for more than 10 years of battery life at a one-hour reporting interval under specified test conditions.",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "Industrial rotating equipment",
      "desc": "Pumps, fans, motors, and compressors get continuous vibration trending that supports condition-based maintenance.",
      "img": "product/details/284-scen2.jpg"
     },
     {
      "name": "Semiconductor facilities",
      "desc": "Monitors vibration-sensitive process tools and clean-room equipment.",
      "img": "product/details/284-scen1.jpg"
     },
     {
      "name": "Harbor and port machinery",
      "desc": "Tracks crane and conveyor vibration for safe port operation.",
      "img": "product/details/284-scen3.jpg"
     },
     {
      "name": "Building and structural health",
      "desc": "Watches structural response of buildings near construction or heavy traffic.",
      "img": "product/details/284-scen5.jpg"
     },
     {
      "name": "Energy installations",
      "desc": "Monitors turbines, generators and transformers for abnormal vibration signatures.",
      "img": "product/details/284-scen4.jpg"
     },
     {
      "name": "Logistics and transportation",
      "desc": "Shock and vibration recording for sensitive goods in transit.",
      "img": "product/details/284-scen6.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "What vibration quantities does it measure?",
      "a": "Vibration velocity 0–100 mm/s and displacement amplitude 0–1,000 µm, both customizable, with ±1% accuracy calibrated at 80 Hz."
     },
     {
      "q": "How does it support condition-based maintenance?",
      "a": "Continuous intensity and amplitude trends can help identify signs of bearing wear, imbalance, and misalignment early, so maintenance can be scheduled by condition rather than calendar."
     },
     {
      "q": "How is the sensor installed and powered?",
      "a": "Magnetic base, threaded, adhesive, or bracket mounting varies by model — confirm the mounting accessory for your configuration. The sensor is battery-powered and requires no signal or power cabling; it is designed for more than 10 years of life at a one-hour reporting interval under specified test conditions."
     },
     {
      "q": "Which data platform does it connect to?",
      "a": "It reports over 4G or NB-IoT via MQTT to Hitelecom Cloud or a customer platform, with threshold alarms for abnormal vibration."
     }
    ],
    "dateModified": "2026-09-02"
   },
   "285": {
    "series": "H Series · Air Quality Sensor",
    "tagline": "6-in-1 | Precision | Energy-Efficient",
    "desc": "Hitelecom's 6-in-1 air quality sensor monitors CO₂, PM2.5, TVOC, temperature, humidity, and air pressure, with optional NO₂, SO₂, NH₃, and O₃ channels. Data reports to the cloud over 4G or NB-IoT, and the low-maintenance design supports long-term urban and industrial environmental monitoring.",
    "heroImg": "product/details/285-hero.png",
    "pdf": "/downloads/h310-aq041-air-quality-sensor-datasheet.pdf",
     "crumbCat": "Air Quality",
    "returnCid": "265",
    "features": [
     {
      "icon": "product/details/285-f1.png",
      "text": "Monitors CO₂, PM2.5, TVOC, Temperature, Humidity, and Air Pressure"
     },
     {
      "icon": "product/details/285-f2.png",
      "text": "IP68-Rated Enclosure"
     },
     {
      "icon": "product/details/285-f3.png",
      "text": "Optional NO₂, SO₂, NH₃, and O₃ Channels (by Configuration)"
     },
     {
      "icon": "product/details/285-f4.png",
      "text": "Supports NFC activation and local device configuration."
     },
     {
      "icon": "product/details/285-f5.png",
      "text": "Supports remote OTA firmware updates."
     },
     {
      "icon": "product/details/285-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/285-f7.png",
      "text": "Remote Air Monitoring"
     },
     {
      "icon": "product/details/285-f8.png",
      "text": "Configurable Threshold Alerts"
     }
    ],
    "specsTitle": "Technical Specifications",
    "specsDesc": "Low-power processors and algorithm optimization enable simultaneous collection of multiple air-quality channels. The battery is designed for more than 10 years of life at a four-hour reporting interval under specified test conditions; actual life varies by sensing configuration, network coverage, and environment.",
    "specs": [
     [
      "Product Models",
      "H200/H300/H500"
     ],
     [
      "CO₂",
      "400–5,000 ppm"
     ],
     [
      "PM2.5 / TVOC",
      "Included (ranges by configuration)"
     ],
     [
      "Optional Gas Channels",
      "NO₂, SO₂, NH₃, O₃ (by configuration)"
     ],
     [
      "Temperature Measurement Range",
      "-40°C to +85°C (±0.2°C)"
     ],
     [
      "Humidity",
      "0–100% RH"
     ],
     [
      "Air Pressure",
      "30–120 kPa (±0.1 kPa)"
     ],
     [
      "Protocol",
      "MQTT"
     ],
     [
      "Frequency Bands",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "Battery Life",
      "Designed for more than 10 years of battery life at a four-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval."
     ],
     [
      "Installation",
      "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     ]
    ],

    "specsStructured": [
     {
      "name": "Product Models",
      "value": "H200/H300/H500"
     },
     {
      "name": "CO₂",
      "value": "400–5,000 ppm",
      "unitText": "parts per million",
      "minValue": 400.0,
      "maxValue": 5000.0
     },
     {
      "name": "PM2.5 / TVOC",
      "value": "Included (ranges by configuration)"
     },
     {
      "name": "Optional Gas Channels",
      "value": "NO₂, SO₂, NH₃, O₃ (by configuration)"
     },
     {
      "name": "Temperature Measurement Range",
      "value": "-40°C to +85°C (±0.2°C)",
      "unitText": "degree",
      "minValue": -40.0,
      "maxValue": 85.0
     },
     {
      "name": "Humidity",
      "value": "0–100% RH",
      "unitText": "percent",
      "minValue": 0.0,
      "maxValue": 100.0
     },
     {
      "name": "Air Pressure",
      "value": "30–120 kPa (±0.1 kPa)",
      "unitText": "kilopascal",
      "minValue": 30.0,
      "maxValue": 120.0
     },
     {
      "name": "Protocol",
      "value": "MQTT"
     },
     {
      "name": "Frequency Bands",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "Battery Life",
      "value": "Designed for more than 10 years of battery life at a four-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval.",
      "unitText": "year",
      "minValue": 10.0
     },
     {
      "name": "Installation",
      "value": "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     }
    ],    "certImgs": [],
    "scenariosHeading": "Application Scenarios",
    "scenarios": [
     {
      "img": "product/details/285-scen1.jpg",
      "label": "Office environment"
     },
     {
      "img": "product/details/285-scen2.jpg",
      "label": "Smart city"
     },
     {
      "img": "product/details/285-scen3.jpg",
      "label": "Hospital"
     },
     {
      "img": "product/details/285-scen4.jpg",
      "label": "Smart transportation"
     },
     {
      "img": "product/details/285-scen5.jpg",
      "label": "Residential environment"
     },
     {
      "img": "product/details/285-scen6.jpg",
      "label": "Data center"
     },
     {
      "img": "product/details/285-scen7.jpg",
      "label": "Smart Manufacturing"
     },
     {
      "img": "product/details/285-scen8.jpg",
      "label": "Smart Agriculture"
     }
    ],
    "related": [
     "270",
     "274",
     "280",
     "281",
     "282",
     "283",
     "284",
     "276",
     "275"
    ],
    "summary": "The Hitelecom H Series air quality sensor is a 6-in-1 wireless monitor for urban and industrial environments. It tracks CO₂ (400–5,000 ppm), PM2.5, TVOC, temperature (-40°C to +85°C, ±0.2°C), humidity (0–100% RH), and air pressure (30–120 kPa), with optional NO₂, SO₂, NH₃, and O₃ channels, reporting over 4G or NB-IoT.",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "Smart city air monitoring",
      "desc": "Grid-deployed micro stations track urban air quality trends block by block.",
      "img": "product/details/285-scen2.jpg"
     },
     {
      "name": "Office and school buildings",
      "desc": "CO₂ and humidity readings can inform ventilation decisions when integrated with a supported control system.",
      "img": "product/details/285-scen1.jpg"
     },
     {
      "name": "Hospitals",
      "desc": "Watches ward and clinic air conditions where vulnerable people gather.",
      "img": "product/details/285-scen3.jpg"
     },
     {
      "name": "Data centers",
      "desc": "Combines temperature, humidity and pressure for environmental compliance logging.",
      "img": "product/details/285-scen6.jpg"
     },
     {
      "name": "Industrial parks",
      "desc": "Fence-line monitoring of park air to spot abnormal emissions early.",
      "img": "product/details/285-scen7.jpg"
     },
     {
      "name": "Transportation hubs",
      "desc": "Air quality visibility in stations, tunnels and parking structures.",
      "img": "product/details/285-scen4.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "Which parameters does the 6-in-1 sensor measure?",
      "a": "CO₂ (400–5,000 ppm), PM2.5, TVOC, temperature (-40°C to +85°C, ±0.2°C), humidity (0–100% RH), and air pressure (30–120 kPa, ±0.1 kPa), with optional NO₂, SO₂, NH₃, and O₃ channels by configuration."
     },
     {
      "q": "How long can it run unattended?",
      "a": "Selected configurations are designed for 10+ years of battery life at a four-hour reporting interval under specified test conditions; actual life varies with sensing configuration, network coverage, and environment. The IP68 enclosure supports outdoor installation."
     },
     {
      "q": "How is air quality data delivered?",
      "a": "Wirelessly over 4G or NB-IoT using MQTT to Hitelecom Cloud or your platform, with threshold alerts on each channel."
     },
     {
      "q": "Can channels be customized for our site?",
      "a": "Yes. The 6-in-1 configuration is modular — tell Hitelecom which gases or particles you need and a matching channel set will be proposed."
     }
    ],
    "dateModified": "2026-09-02"
   },
   "275": {
    "series": "H68 Series · Outdoor Gateway",
    "tagline": "IP68 | High Capacity | Wide Coverage",
    "desc": "The H68 Series gateway features an IP68-rated, dust-tight and waterproof enclosure designed for long-term outdoor service in complex industrial environments. It supports plug-and-play deployment, and a power-loss alarm can be sent when backup power and backhaul remain available.",
    "heroImg": "product/details/275-hero.png",
    "pdf": "/downloads/outdoor-4g-gateway-h68-datasheet.pdf",
    "crumbCat": "Outdoor Gateway",
    "returnCid": "273",
    "features": [
     {
      "icon": "product/details/275-f1.png",
      "text": "Communication Range up to 10 km (Open Area)"
     },
     {
      "icon": "product/details/275-f2.png",
      "text": "IP68 Waterproof and Dustproof Rating"
     },
     {
      "icon": "product/details/275-f3.png",
      "text": "Industrial 8-Channel Full-Duplex Gateway"
     },
     {
      "icon": "product/details/275-f4.png",
      "text": "Supports local deployment for data control and reliability"
     },
     {
      "icon": "product/details/275-f5.png",
      "text": "Integrated Power Amplification and Low-Noise Amplifier Circuit"
     },
     {
      "icon": "product/details/275-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/275-f7.png",
      "text": "Large-Capacity Networking, Remote Control and Data Acquisition"
     },
     {
      "icon": "product/details/275-f8.png",
      "text": "Can send a power-loss alert when backup power and backhaul remain available"
     }
    ],
    "specsTitle": "Technical Specifications",
    "specsDesc": "The H68 series supports long-distance transmission up to 10 kilometers, reaching up to 2 kilometers within urban areas. It integrates 4G LTE, Ethernet, and Wi-Fi connectivity options to support reliable, continuous data transmission.",
    "specs": [
     [
      "Product Models",
      "H68"
     ],
     [
      "Frequency Bands",
      "CN470/EU868/IN865/RU864/US915/AU915"
     ],
     [
      "Distance",
      "Up to 10 km (open area)"
     ],
     [
      "Transmit Power",
      "20–27 dBm"
     ],
     [
      "Sensitivity",
      "−140 dBm at 0.292 kbps"
     ],
     [
      "Antenna",
      "External Fiberglass Antenna"
     ],
     [
      "4G band",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "Protocol",
      "MQTT"
     ],
     [
      "Operating Temperature",
      "−40°C to +85°C"
     ],
     [
      "Storage Temperature",
      "−40°C to +85°C"
     ],
     [
      "Installation",
      "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     ]
    ],

    "specsStructured": [
     {
      "name": "Product Models",
      "value": "H68"
     },
     {
      "name": "Frequency Bands",
      "value": "CN470/EU868/IN865/RU864/US915/AU915"
     },
     {
      "name": "Distance",
      "value": "Up to 10 km (open area)"
     },
     {
      "name": "Transmit Power",
      "value": "20–27 dBm",
      "unitText": "decibel-milliwatt",
      "minValue": 20.0,
      "maxValue": 27.0
     },
     {
      "name": "Sensitivity",
      "value": "−140 dBm at 0.292 kbps",
      "unitText": "decibel-milliwatt"
     },
     {
      "name": "Antenna",
      "value": "External Fiberglass Antenna"
     },
     {
      "name": "4G band",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "Protocol",
      "value": "MQTT"
     },
     {
      "name": "Operating Temperature",
      "value": "−40°C to +85°C",
      "unitText": "degree",
      "minValue": -40.0,
      "maxValue": 85.0
     },
     {
      "name": "Storage Temperature",
      "value": "−40°C to +85°C",
      "unitText": "degree",
      "minValue": -40.0,
      "maxValue": 85.0
     },
     {
      "name": "Installation",
      "value": "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     }
    ],    "certImgs": [],
    "scenariosHeading": "Application Scenarios",
    "scenarios": [
     {
      "img": "product/details/275-scen1.jpg",
      "label": "Renewable Energy"
     },
     {
      "img": "product/details/275-scen2.jpg",
      "label": "Smart Industrial Parks"
     },
     {
      "img": "product/details/275-scen3.jpg",
      "label": "Smart Water"
     },
     {
      "img": "product/details/275-scen4.jpg",
      "label": "Industrial Automation"
     },
     {
      "img": "product/details/275-scen5.jpg",
      "label": "Environmental monitoring"
     },
     {
      "img": "product/details/275-scen6.jpg",
      "label": "Smart city"
     },
     {
      "img": "product/details/275-scen7.jpg",
      "label": "Intelligent transportation"
     },
     {
      "img": "product/details/275-scen8.jpg",
      "label": "Logistics and Supply Chain"
     }
    ],
    "related": [
     "270",
     "274",
     "280",
     "281",
     "282",
     "283",
     "284",
     "285",
     "276"
    ],
    "summary": "The Hitelecom H68 outdoor gateway is an industrial LoRa gateway for wide-area sensor networks: up to 10 km coverage, -140 dBm sensitivity, 20-27 dBm transmit power and regional bands including CN470, EU868, US915 and AU915. The IP68 enclosure is designed for long-term outdoor service, with 4G backhaul and MQTT uplink.",
    "sku": "H68",
    "applications": [
     {
      "name": "Smart parks and campuses",
      "desc": "One rooftop gateway can collect data from many sensors across a site.",
      "img": "product/details/275-scen2.jpg"
     },
     {
      "name": "Smart water networks",
      "desc": "Aggregates meter and level sensor traffic across a service area.",
      "img": "product/details/275-scen3.jpg"
     },
     {
      "name": "New energy sites",
      "desc": "Covers solar farms and wind sites with long-range sensor backhaul.",
      "img": "product/details/275-scen1.jpg"
     },
     {
      "name": "Industrial automation",
      "desc": "Plant-wide sensor collection without per-sensor SIM cards.",
      "img": "product/details/275-scen4.jpg"
     },
     {
      "name": "Environmental monitoring",
      "desc": "River, air and noise sensor networks over wide rural areas.",
      "img": "product/details/275-scen5.jpg"
     },
     {
      "name": "Smart city lighting and assets",
      "desc": "City-block-scale coverage for municipal sensor networks.",
      "img": "product/details/275-scen6.jpg"
     },
     {
      "name": "Logistics yards",
      "desc": "Yard-wide tracking and condition sensors through a single gateway.",
      "img": "product/details/275-scen8.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "What coverage does the H68 outdoor gateway provide?",
      "a": "Up to 10 km in open conditions with -140 dBm sensitivity and 20-27 dBm transmit power. Real coverage depends on terrain and antenna height — Hitelecom can estimate it from your site plan."
     },
     {
      "q": "Which frequency bands are supported?",
      "a": "CN470, EU868, IN865, RU864, US915 and AU915 — covering deployments in China, Europe, India, Russia, North America, and Australia."
     },
     {
      "q": "How does the gateway backhaul data?",
      "a": "Over 4G cellular (LTE-TDD B34/B38/B39/B40/B41, LTE-FDD B1/B3/B5/B8) with MQTT uplink to Hitelecom Cloud or a private platform."
     },
     {
      "q": "Is the H68 suitable for long-term outdoor installation?",
      "a": "Yes. The IP68 enclosure is dust-tight and waterproof, and the industrial design targets long-term outdoor service."
     }
    ],
    "dateModified": "2026-09-02"
   },
   "276": {
    "series": "H66 Series · Indoor Gateway",
    "tagline": "Industrial | Long-Range | Full-Duplex",
    "desc": "The H66 series gateway features a durable design for stable operation in variable industrial environments. It supports plug-and-play deployment, and a power-loss alarm can be sent when backup power and backhaul remain available.",
    "heroImg": "product/details/276-hero.png",
    "pdf": "/downloads/indoor-gateway-h66-datasheet.pdf",
    "crumbCat": "Indoor Gateway",
    "returnCid": "272",
    "features": [
     {
      "icon": "product/details/276-f1.png",
      "text": "Communication Range up to 5 km (Open Area)"
     },
     {
      "icon": "product/details/276-f2.png",
      "text": "IP67 Waterproof and Dustproof Rating"
     },
     {
      "icon": "product/details/276-f3.png",
      "text": "Industrial 8-Channel Full-Duplex Gateway"
     },
     {
      "icon": "product/details/276-f4.png",
      "text": "Supports local deployment for data control and reliability"
     },
     {
      "icon": "product/details/276-f5.png",
      "text": "Integrated Power Amplification and Low-Noise Amplifier Circuit"
     },
     {
      "icon": "product/details/276-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/276-f7.png",
      "text": "Large-Capacity Networking, Remote Control and Data Acquisition"
     },
     {
      "icon": "product/details/276-f8.png",
      "text": "Can send a power-loss alert when backup power and backhaul remain available"
     }
    ],
    "specsTitle": "Technical Specifications",
    "specsDesc": "H66 Series Industrial Multi-Channel Wireless Gateway supports multiple protocols, offers 8-channel full-duplex, edge computing, withstands harsh conditions, and enables real-time data processing and remote management.",
    "specs": [
     [
      "Product Models",
      "H66"
     ],
     [
      "Frequency Bands",
      "CN470/EU868/IN865/RU864/US915/AU915"
     ],
     [
      "Distance",
      "Up to 5 km (open area)"
     ],
     [
      "Transmit Power",
      "20–27 dBm"
     ],
     [
      "Sensitivity",
      "−140 dBm at 0.292 kbps"
     ],
     [
      "Antenna",
      "External Fiberglass Antenna"
     ],
     [
      "4G band",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "Protocol",
      "MQTT"
     ],
     [
      "Operating Temperature",
      "-20°C to +70°C"
     ],
     [
      "Storage Temperature",
      "-20°C to +80°C"
     ],
     [
      "Installation",
      "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     ]
    ],

    "specsStructured": [
     {
      "name": "Product Models",
      "value": "H66"
     },
     {
      "name": "Frequency Bands",
      "value": "CN470/EU868/IN865/RU864/US915/AU915"
     },
     {
      "name": "Distance",
      "value": "Up to 5 km (open area)"
     },
     {
      "name": "Transmit Power",
      "value": "20–27 dBm",
      "unitText": "decibel-milliwatt",
      "minValue": 20.0,
      "maxValue": 27.0
     },
     {
      "name": "Sensitivity",
      "value": "−140 dBm at 0.292 kbps",
      "unitText": "decibel-milliwatt"
     },
     {
      "name": "Antenna",
      "value": "External Fiberglass Antenna"
     },
     {
      "name": "4G band",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "Protocol",
      "value": "MQTT"
     },
     {
      "name": "Operating Temperature",
      "value": "-20°C to +70°C",
      "unitText": "degree Celsius",
      "minValue": -20.0,
      "maxValue": 70.0
     },
     {
      "name": "Storage Temperature",
      "value": "-20°C to +80°C",
      "unitText": "degree Celsius",
      "minValue": -20.0,
      "maxValue": 80.0
     },
     {
      "name": "Installation",
      "value": "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     }
    ],    "certImgs": [],
    "scenariosHeading": "Application Scenarios",
    "scenarios": [
     {
      "img": "product/details/276-scen1.jpg",
      "label": "Building Management"
     },
     {
      "img": "product/details/276-scen2.jpg",
      "label": "Energy management"
     },
     {
      "img": "product/details/276-scen3.jpg",
      "label": "Logistics"
     },
     {
      "img": "product/details/276-scen4.jpg",
      "label": "Industrial"
     },
     {
      "img": "product/details/276-scen5.jpg",
      "label": "Smart city"
     },
     {
      "img": "product/details/276-scen6.jpg",
      "label": "Water management"
     },
     {
      "img": "product/details/276-scen7.jpg",
      "label": "Intelligent transportation"
     }
    ],
    "related": [
     "270",
     "274",
     "280",
     "281",
     "282",
     "283",
     "284",
     "285",
     "275"
    ],
    "summary": "The Hitelecom H66 indoor gateway is an industrial full-duplex LoRa gateway for in-building sensor networks: up to 5 km range, -140 dBm sensitivity, regional bands from CN470 to US915, plug-and-play setup with a power-loss alert, 4G backhaul and MQTT uplink.",
    "sku": "H66",
    "applications": [
     {
      "name": "Building management",
      "desc": "Collects HVAC, metering and environment sensors across floors from a comms room.",
      "img": "product/details/276-scen1.jpg"
     },
     {
      "name": "Energy management",
      "desc": "Aggregates sub-metering sensor traffic for factory and building energy audits.",
      "img": "product/details/276-scen2.jpg"
     },
     {
      "name": "Logistics and warehousing",
      "desc": "In-warehouse sensor collection for temperature, door and asset beacons.",
      "img": "product/details/276-scen3.jpg"
     },
     {
      "name": "Industrial facilities",
      "desc": "Shop-floor sensor networks without running data cables.",
      "img": "product/details/276-scen4.jpg"
     },
     {
      "name": "Water management",
      "desc": "Pump-room and tank-level sensor aggregation inside utility buildings.",
      "img": "product/details/276-scen6.jpg"
     },
     {
      "name": "Transportation facilities",
      "desc": "Sensor collection inside stations, tunnels and depots.",
      "img": "product/details/276-scen7.jpg"
     }
    ],
    "certifications": [
     "IP67"
    ],
    "faqs": [
     {
      "q": "What is the difference between the H66 and the H68?",
      "a": "The H66 is the indoor model: plug-and-play with a power-loss alert, up to 5 km range and an IP67 enclosure. The H68 is the outdoor model with up to 10 km range, IP68, and a design for long-term outdoor service."
     },
     {
      "q": "Which frequency bands does it support?",
      "a": "CN470, EU868, IN865, RU864, US915 and AU915, matching regional LoRa band plans."
     },
     {
      "q": "What happens if the power fails?",
      "a": "If backup power and the 4G backhaul remain available, the gateway can send a power-loss alert."
     },
     {
      "q": "How many sensors can one gateway serve?",
      "a": "A full-duplex industrial gateway can serve large sensor fleets; actual capacity depends on reporting interval, payload, and network conditions — share your device count and Hitelecom will size the network."
     }
    ],
    "dateModified": "2026-09-02"
   },
   "277": {
    "series": "H Series · Hydrology",
    "tagline": "Solar | Modular | 2–12 Channels",
    "desc": "Integrates 2 to 12 modular sensor channels for environmental data collection — the channel set (level, flow, water quality, weather, or air-quality sensors) is configured per project — with real-time transmission to the Hitelecom Cloud platform. Users can access hydrological and environmental data from anywhere via the internet, supporting remote monitoring and analysis.",
    "heroImg": "product/details/277-hero.png",
    "pdf": "/downloads/hydrology-monitoring-station-datasheet.pdf",
    "crumbCat": "12-Parameter",
    "returnCid": "274",
    "features": [
     {
      "icon": "product/details/277-f1.png",
      "text": "Monitoring with 2-12 Sensor Channels"
     },
     {
      "icon": "product/details/277-f2.png",
      "text": "IP65 Waterproof and Dustproof Rating"
     },
     {
      "icon": "product/details/277-f3.png",
      "text": "2–12 Configurable Sensor Channels"
     },
     {
      "icon": "product/details/277-f4.png",
      "text": "Supports NFC activation and local device configuration."
     },
     {
      "icon": "product/details/277-f5.png",
      "text": "Supports remote OTA firmware updates."
     },
     {
      "icon": "product/details/277-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/277-f7.png",
      "text": "Remote Data Access: Monitor from Anywhere"
     },
     {
      "icon": "product/details/277-f8.png",
      "text": "Configurable Threshold Alerts"
     }
    ],
    "specsTitle": "Technical Specifications",
    "specsDesc": "Monitoring a range of hydrological data, including but not limited to water level, flow rate, water quality, temperature and humidity, wind speed and direction, atmospheric pressure, rainfall, PM2.5/10, CO₂, etc., to provide insight into water levels and air pollution trends and their sources, delivering reliable data support for environmental protection and urban water management.",
    "specs": [
     [
      "Product Models",
      "H700"
     ],
     [
      "Measuring Range",
      "Customizable"
     ],
     [
      "Accuracy",
      "Customizable"
     ],
     [
      "Protocol",
      "MQTT"
     ],
     [
      "Scope",
      "Urban · Rural · Plains · Mountainous Areas"
     ],
     [
      "Frequency Bands",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "Power Supply",
      "Solar Power · Grid Electricity"
     ],
     [
      "Installation",
      "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     ]
    ],

    "specsStructured": [
     {
      "name": "Product Models",
      "value": "H700"
     },
     {
      "name": "Measuring Range",
      "value": "Customizable"
     },
     {
      "name": "Accuracy",
      "value": "Customizable"
     },
     {
      "name": "Protocol",
      "value": "MQTT"
     },
     {
      "name": "Scope",
      "value": "Urban · Rural · Plains · Mountainous Areas"
     },
     {
      "name": "Frequency Bands",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "Power Supply",
      "value": "Solar Power · Grid Electricity"
     },
     {
      "name": "Installation",
      "value": "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     }
    ],    "certImgs": [],
    "scenariosHeading": "Application Scenarios",
    "scenarios": [
     {
      "img": "product/details/277-scen1.jpg",
      "label": "Smart Agriculture"
     },
     {
      "img": "product/details/277-scen2.jpg",
      "label": "Environmental monitoring"
     },
     {
      "img": "product/details/277-scen3.jpg",
      "label": "Urban management"
     },
     {
      "img": "product/details/277-scen4.jpg",
      "label": "Smart Campus"
     },
     {
      "img": "product/details/277-scen5.jpg",
      "label": "Power Utilities"
     },
     {
      "img": "product/details/277-scen6.jpg",
      "label": "Ocean and Coastal Monitoring"
     },
     {
      "img": "product/details/277-scen7.jpg",
      "label": "Emergency Management"
     },
     {
      "img": "product/details/277-scen8.jpg",
      "label": "Transportation and Shipping"
     }
    ],
    "related": [
     "270",
     "274",
     "280",
     "281",
     "282",
     "283",
     "284",
     "285",
     "276"
    ],
    "summary": "The Hitelecom H700 hydrology station is a modular, solar-powered monitoring terminal that integrates 2 to 12 sensor channels for water and environmental data. It transmits in real time to Hitelecom Cloud over 4G, can be deployed in urban and rural areas, including plains and mountainous terrain, and can be installed using mounting lugs, a pole clamp, or a slotted mount.",
    "sku": "H700",
    "applications": [
     {
      "name": "River and stream monitoring",
      "desc": "Water level, rainfall and flow-related channels for hydrological networks."
     },
     {
      "name": "Reservoir and lake management",
      "desc": "Multi-parameter hydrology logging for dispatch and safety.",
      "img": "solution/67-scen-0.jpg"
     },
     {
      "name": "Urban waterlogging watch",
      "desc": "Rainfall plus level monitoring at flood-prone urban points.",
      "img": "product/details/277-scen3.jpg"
     },
     {
      "name": "Smart agriculture",
      "desc": "Irrigation district water and weather channels in one station.",
      "img": "product/details/277-scen1.jpg"
     },
     {
      "name": "Environmental monitoring",
      "desc": "Water quality and meteorological channels for watershed programs."
     },
     {
      "name": "Mountain torrent warning",
      "desc": "Remote solar stations in mountainous catchments feed early-warning systems.",
      "img": "product/details/277-scen2.jpg"
     },
     {
      "name": "Coastal and estuary sites",
      "desc": "Tide and weather channels for coastal management.",
      "img": "product/details/277-scen6.jpg"
     },
     {
      "name": "Emergency management",
      "desc": "Rapidly deployed stations supply data during flood seasons.",
      "img": "product/details/277-scen7.jpg"
     }
    ],
    "certifications": [
     "IP65"
    ],
    "faqs": [
     {
      "q": "What can the H700 hydrology station measure?",
      "a": "It integrates 2 to 12 sensor channels per site — typical configurations combine water level, rainfall, flow-related and meteorological sensors. Channels are selected per project."
     },
     {
      "q": "How is the station powered?",
      "a": "The station can use solar or grid power, supporting both remote and urban installations."
     },
     {
      "q": "How does data reach the platform?",
      "a": "In real time over 4G with MQTT uplink to Hitelecom Cloud; users read and export data from the web platform or app."
     },
     {
      "q": "Where can it be deployed?",
      "a": "Urban, rural, plains and mountainous areas; mounting lugs, pole-clamp, and slotted-mount options adapt to poles, walls, and rails."
     }
    ],
    "dateModified": "2026-09-02"
   },
   "278": {
    "series": "H Series · Weather Station",
    "tagline": "Modular | Solar-Powered | All-Weather",
    "desc": "Integrates 2-12 sensors for environmental data collection, enabling real-time transmission to the Hitelecom Cloud Platform. Allows remote monitoring and analysis of meteorological data from anywhere via the internet.",
    "heroImg": "product/details/278-hero.png",
    "pdf": "/downloads/weather-station-datasheet.pdf",
    "crumbCat": "6-Parameter",
    "returnCid": "275",
    "features": [
     {
      "icon": "product/details/278-f1.png",
      "text": "Monitoring with 2-12 Sensor Channels"
     },
     {
      "icon": "product/details/278-f2.png",
      "text": "IP65 Waterproof and Dustproof Rating"
     },
     {
      "icon": "product/details/278-f3.png",
      "text": "Configurable Sensor Channels and Power Options"
     },
     {
      "icon": "product/details/278-f4.png",
      "text": "Supports NFC activation and local device configuration."
     },
     {
      "icon": "product/details/278-f5.png",
      "text": "Supports remote OTA firmware updates."
     },
     {
      "icon": "product/details/278-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/278-f7.png",
      "text": "Remote Data Access: Monitor from Anywhere"
     },
     {
      "icon": "product/details/278-f8.png",
      "text": "Configurable Threshold Alerts"
     }
    ],
    "specsTitle": "Technical Specifications",
    "specsDesc": "Monitors meteorological parameters including temperature, humidity, wind speed and direction, atmospheric pressure, rainfall, PM2.5/PM10, CO₂, SO₂, and solar radiation (channels by configuration), supporting analysis of environmental trends for environmental protection and urban planning applications.",
    "specs": [
     [
      "Product Models",
      "H600"
     ],
     [
      "Measuring Range",
      "Customizable"
     ],
     [
      "Accuracy",
      "Customizable"
     ],
     [
      "Protocol",
      "MQTT"
     ],
     [
      "Scope",
      "Urban · Rural · Plains · Mountainous Areas"
     ],
     [
      "Frequency Bands",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "Power Supply",
      "Solar Power · Grid Electricity"
     ],
     [
      "Installation",
      "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     ]
    ],

    "specsStructured": [
     {
      "name": "Product Models",
      "value": "H600"
     },
     {
      "name": "Measuring Range",
      "value": "Customizable"
     },
     {
      "name": "Accuracy",
      "value": "Customizable"
     },
     {
      "name": "Protocol",
      "value": "MQTT"
     },
     {
      "name": "Scope",
      "value": "Urban · Rural · Plains · Mountainous Areas"
     },
     {
      "name": "Frequency Bands",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "Power Supply",
      "value": "Solar Power · Grid Electricity"
     },
     {
      "name": "Installation",
      "value": "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     }
    ],    "certImgs": [],
    "scenariosHeading": "Application Scenarios",
    "scenarios": [
     {
      "img": "product/details/278-scen1.jpg",
      "label": "Smart Agriculture"
     },
     {
      "img": "product/details/278-scen2.jpg",
      "label": "Environmental"
     },
     {
      "img": "product/details/278-scen3.jpg",
      "label": "Ocean and Coastal"
     },
     {
      "img": "product/details/278-scen4.jpg",
      "label": "Smart Campus"
     },
     {
      "img": "product/details/278-scen5.jpg",
      "label": "Urban management"
     },
     {
      "img": "product/details/278-scen6.jpg",
      "label": "Emergency Management"
     },
     {
      "img": "product/details/278-scen7.jpg",
      "label": "Transportation and Shipping"
     }
    ],
    "related": [
     "270",
     "274",
     "280",
     "281",
     "282",
     "283",
     "284",
     "285",
     "276"
    ],
    "summary": "The Hitelecom H600 weather station is a modular, solar-powered agrometeorological terminal configured with 2–12 sensor channels for air temperature, humidity, rainfall, wind, barometric pressure, and solar radiation. It reports in real time over 4G to Hitelecom Cloud for farms, campuses, cities and coastal sites.",
    "sku": "H600",
    "applications": [
     {
      "name": "Smart agriculture",
      "desc": "Field weather drives irrigation, spraying windows and disease-warning models.",
      "img": "product/details/278-scen1.jpg"
     },
     {
      "name": "Environmental monitoring",
      "desc": "Long-term climate series for watershed and ecological programs.",
      "img": "product/details/278-scen2.jpg"
     },
     {
      "name": "Smart campuses and schools",
      "desc": "Campus weather for teaching, safety and facility management.",
      "img": "product/details/278-scen4.jpg"
     },
     {
      "name": "Urban management",
      "desc": "Microclimate monitoring for city services and heat-island studies.",
      "img": "product/details/278-scen5.jpg"
     },
     {
      "name": "Coastal and marine sites",
      "desc": "Wind and pressure channels for coastal operation safety.",
      "img": "product/details/278-scen3.jpg"
     },
     {
      "name": "Transportation and shipping",
      "desc": "Local weather at ports, airports and highway sections.",
      "img": "product/details/278-scen7.jpg"
     },
     {
      "name": "Emergency management",
      "desc": "Deployable stations feed decision systems during severe weather.",
      "img": "product/details/278-scen6.jpg"
     }
    ],
    "certifications": [
     "IP65"
    ],
    "faqs": [
     {
      "q": "Which weather parameters does the H600 measure?",
      "a": "The station integrates 2 to 12 channels — typically air temperature and humidity, rainfall, wind speed and direction, barometric pressure and solar radiation. The channel set is configured per project."
     },
     {
      "q": "How is the station powered and connected?",
      "a": "Solar power or grid electricity, with real-time 4G uplink via MQTT to Hitelecom Cloud for remote reading and analysis."
     },
     {
      "q": "Can it work in remote areas without infrastructure?",
      "a": "Yes. Solar power and cellular backhaul can reduce the need for power and data cabling; the station can be installed using mounting lugs, a pole clamp, or a slotted mount."
     },
     {
      "q": "How does it differ from the H700 hydrology station?",
      "a": "The H600 is configured for meteorological channels (wind, rain, radiation), while the H700 is configured for hydrological channels (water level, flow-related). Both share the same modular platform."
     }
    ],
    "dateModified": "2026-09-02"
   },
   "286": {
    "series": "H Series · Explosion-Proof Temperature and Pressure Sensor",
    "tagline": "Reliability | Industrial | Low Power",
    "desc": "Hitelecom's 2-in-1 sensor combines temperature and pressure monitoring in a single device designed for atmospheres where flammable gas or dust may be present, which can reduce device count and installation complexity in hazardous areas.",
    "heroImg": "product/details/286-hero.png",
    "pdf": "/downloads/explosion-proof-temperature-pressure-sensor-datasheet.pdf",
    "crumbCat": "Hardware",
    "returnCid": "279",
    "features": [
     {
      "icon": "product/details/286-f1.png",
      "text": "Accuracy: ±0.5°C (customizable to ±0.1°C)"
     },
     {
      "icon": "product/details/286-f2.png",
      "text": "IP68-Rated Enclosure"
     },
     {
      "icon": "product/details/286-f3.png",
      "text": "±0.5% FS (High-Precision Customization)"
     },
     {
      "icon": "product/details/286-f4.png",
      "text": "Supports NFC activation and local device configuration."
     },
     {
      "icon": "product/details/286-f5.png",
      "text": "Supports remote OTA firmware updates."
     },
     {
      "icon": "product/details/286-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/286-f7.png",
      "text": "Remote Monitoring"
     },
     {
      "icon": "product/details/286-f8.png",
      "text": "Configurable Threshold Alerts"
     }
    ],
    "specsTitle": "Technical Specifications",
    "specsDesc": "Integrated communication and sensing technologies with embedded energy-saving algorithms give the transmitter an extended service life and high measurement stability, supporting the reliability of the wider monitoring system.",
    "specs": [
     [
      "Product Models",
      "H200/H300/H500"
     ],
     [
      "Measuring Range",
      "0–1, 1.6, 3.5, 7, 10, or 20 MPa"
     ],
     [
      "Pressure Accuracy",
      "±0.5% FS"
     ],
     [
      "Measured Temperature",
      "-200°C to +800°C"
     ],
     [
      "Temperature Accuracy",
      "±0.5°C (customizable to ±0.1°C)"
     ],
     [
      "Protocol",
      "MQTT"
     ],
     [
      "Frequency Bands",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "Installation",
      "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     ],
     [
      "Hazardous-Area Certification",
      "Certificate and marking confirmed per target market and zone — request before ordering"
     ],
     [
      "Operating Temperature",
      "-40°C to +125°C"
     ],
     [
      "Storage Temperature",
      "-40°C to +125°C"
     ]
    ],

    "specsStructured": [
     {
      "name": "Product Models",
      "value": "H200/H300/H500"
     },
     {
      "name": "Measuring Range",
      "value": "0–1, 1.6, 3.5, 7, 10, or 20 MPa"
     },
     {
      "name": "Pressure Accuracy",
      "value": "±0.5% FS",
      "unitText": "percent"
     },
     {
      "name": "Measured Temperature",
      "value": "-200°C to +800°C",
      "unitText": "degree Celsius",
      "minValue": -200.0,
      "maxValue": 800.0
     },
     {
      "name": "Temperature Accuracy",
      "value": "±0.5°C (customizable to ±0.1°C)",
      "unitText": "degree Celsius"
     },
     {
      "name": "Protocol",
      "value": "MQTT"
     },
     {
      "name": "Frequency Bands",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "Installation",
      "value": "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     },
     {
      "name": "Hazardous-Area Certification",
      "value": "Certificate and marking confirmed per target market and zone — request before ordering"
     },
     {
      "name": "Operating Temperature",
      "value": "-40°C to +125°C",
      "unitText": "degree",
      "minValue": -40.0,
      "maxValue": 125.0
     },
     {
      "name": "Storage Temperature",
      "value": "-40°C to +125°C",
      "unitText": "degree",
      "minValue": -40.0,
      "maxValue": 125.0
     }
    ],    "certImgs": [],
    "scenariosHeading": "Application Scenarios",
    "scenarios": [
     {
      "img": "product/details/286-scen1.jpg",
      "label": "Petrochemicals"
     },
     {
      "img": "product/details/286-scen2.jpg",
      "label": "Mining"
     },
     {
      "img": "product/details/286-scen3.jpg",
      "label": "Chemical Plant"
     }
    ],
    "related": [
     "287"
    ],
    "summary": "The Hitelecom H Series 2-in-1 transmitter combines temperature and pressure monitoring in one device designed for environments where flammable gas or dust may be present. Available full-scale pressure ranges are 1, 1.6, 3.5, 7, 10, and 20 MPa at ±0.5% FS, temperature spans -200°C to 800°C, and data reports over 4G or NB-IoT. The applicable explosion-proof certificate must be confirmed for the target market and zone before ordering.",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "Petrochemical plants",
      "desc": "One device watches both process temperature and pressure in hazardous areas.",
      "img": "product/details/286-scen3.jpg"
     },
     {
      "name": "Oil and gas extraction",
      "desc": "Wellhead and gathering-line monitoring without cabling in explosive atmospheres.",
      "img": "product/details/286-scen1.jpg"
     },
     {
      "name": "Mining operations",
      "desc": "Temperature and pressure trending in gas-risk underground areas.",
      "img": "product/details/286-scen2.jpg"
     },
     {
      "name": "Chemical storage parks",
      "desc": "Dual-parameter monitoring of storage and transfer equipment.",
      "img": "product/details/283-scen5.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "Why a 2-in-1 temperature and pressure transmitter?",
      "a": "One device combines two measurements in a single instrument, which may reduce installation points, cabling, and maintenance in hazardous areas while keeping both variables on the same reporting schedule."
     },
     {
      "q": "What are the measuring ranges?",
      "a": "Pressure: 0-1 MPa, 1.6, 3.5, 7, 10 or 20 MPa at ±0.5% FS. Temperature: -200°C to 800°C at ±0.5°C, customizable to ±0.1°C."
     },
     {
      "q": "Is it certified for explosive atmospheres?",
      "a": "The device is designed for atmospheres where flammable gas or dust may be present. Suitability depends on the certified configuration required for the target market, zone, gas or dust group, and temperature class — request the applicable certificate from Hitelecom before specifying the product."
     },
     {
      "q": "How does it transmit data?",
      "a": "Over 4G or NB-IoT with MQTT uplink to Hitelecom Cloud or private deployment, with threshold alarms on both channels."
     }
    ],
    "dateModified": "2026-09-02"
   },
   "287": {
    "series": "H Series · Coupling Isolator",
    "tagline": "Reliability | Safety | Hazardous-Area Design",
    "desc": "In oil and gas extraction, chemical plants, and mining, flammable gases, vapors, or dust may be present, and wireless equipment in such areas requires purpose-built design. The H100 is a high-frequency signal-coupling device for these industrial installations. Suitability for a hazardous area depends on the certified configuration required for the target market, zone, gas or dust group, and temperature class — request the applicable certificate before specifying the product.",
    "heroImg": "product/details/287-hero.png",
    "pdf": "/downloads/coupling-isolator-h100-datasheet.pdf",
    "crumbCat": "Hardware",
    "returnCid": "279",
    "features": [
     {
      "icon": "product/details/287-f1.png",
      "text": "High-Frequency, Low-Attenuation Signal Coupling"
     },
     {
      "icon": "product/details/287-f2.png",
      "text": "IP68-Rated Enclosure"
     },
     {
      "icon": "product/details/287-f3.png",
      "text": "Supports 2.4 GHz / 5.8 GHz High-Frequency Links"
     },
     {
      "icon": "product/details/287-f4.png",
      "text": "Designed for Hazardous-Area Signal Coupling"
     },
     {
      "icon": "product/details/287-f5.png",
      "text": "Low Energy Consumption Technology, Reducing Energy Output"
     },
     {
      "icon": "product/details/287-f6.png",
      "text": "High immunity to electromagnetic interference"
     }
    ],
    "specsTitle": "Technical Specifications",
    "specsDesc": "The H100 is a wireless signal-coupling device intended for hazardous-area installations, supporting 2.4 GHz and 5.8 GHz frequencies with a low-power design and high interference resistance, suitable for harsh industrial environments. The applicable certificate must be confirmed for the target market and zone before ordering.",
    "specs": [
     [
      "Product Models",
      "H100"
     ],
     [
      "Signal Bands",
      "2.4 GHz / 5.8 GHz"
     ],
     [
      "Hazardous-Area Use",
      "Hazardous-area coupling design; the applicable certificate must be confirmed for the target market and zone before ordering"
     ],
     [
      "Operating Temperature",
      "-40°C to +125°C"
     ],
     [
      "Storage Temperature",
      "-40°C to +125°C"
     ],
     [
      "Installation",
      "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     ]
    ],

    "specsStructured": [
     {
      "name": "Product Models",
      "value": "H100"
     },
     {
      "name": "Signal Bands",
      "value": "2.4 GHz / 5.8 GHz"
     },
     {
      "name": "Hazardous-Area Use",
      "value": "Hazardous-area coupling design; the applicable certificate must be confirmed for the target market and zone before ordering"
     },
     {
      "name": "Operating Temperature",
      "value": "-40°C to +125°C",
      "unitText": "degree",
      "minValue": -40.0,
      "maxValue": 125.0
     },
     {
      "name": "Storage Temperature",
      "value": "-40°C to +125°C",
      "unitText": "degree",
      "minValue": -40.0,
      "maxValue": 125.0
     },
     {
      "name": "Installation",
      "value": "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     }
    ],    "certImgs": [],
    "scenariosHeading": "Application Scenarios",
    "scenarios": [
     {
      "img": "product/details/287-scen1.jpg",
      "label": "Petrochemicals"
     },
     {
      "img": "product/details/287-scen2.jpg",
      "label": "Mining"
     },
     {
      "img": "product/details/287-scen3.jpg",
      "label": "Chemical"
     }
    ],
    "related": [
     "286"
    ],
    "summary": "The Hitelecom H100 coupling isolator is a high-frequency signal coupler that lets wireless 2.4 GHz / 5.8 GHz sensor signals cross hazardous-area boundaries in oil and gas, chemical, and mining sites. Suitability for a hazardous area depends on the certified configuration required for the target market, zone, gas or dust group, and temperature class — request the applicable certificate before specifying the product. It works from -40°C to +125°C and installs using mounting lugs, a pole clamp, or a slotted mount.",
    "sku": "H100",
    "applications": [
     {
      "name": "Oil and gas extraction",
      "desc": "Couples wireless sensor signals out of wellhead hazardous zones.",
      "img": "product/details/287-scen1.jpg"
     },
     {
      "name": "Chemical plants",
      "desc": "Bridges wireless links between hazardous and safe areas without penetrating barriers.",
      "img": "product/details/287-scen3.jpg"
     },
     {
      "name": "Mining",
      "desc": "Signal coupling path for underground wireless sensor networks in hazardous areas.",
      "img": "product/details/287-scen2.jpg"
     },
     {
      "name": "Tank farms and terminals",
      "desc": "Safe signal coupling across dike and zone boundaries.",
      "img": "product/details/283-scen5.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "What problem does the coupling isolator solve?",
      "a": "Standard wireless links should not cross hazardous-area boundaries without certified isolation. The H100 couples 2.4 GHz / 5.8 GHz sensor signals across the boundary, so battery-powered wireless sensors can serve hazardous areas without additional conduit penetrations — subject to the certified configuration for the target market and zone."
     },
     {
      "q": "Which standards does it comply with?",
      "a": "That depends on the certified configuration for your target market, zone, gas or dust group, and temperature class. Share your requirements and Hitelecom will provide the applicable certificate details before delivery."
     },
     {
      "q": "What environments can it handle?",
      "a": "Operating and storage temperature both span -40°C to +125°C, with an IP68 enclosure for outdoor and underground sites."
     },
     {
      "q": "How is it installed?",
      "a": "Mounting lugs, a pole clamp, or a slotted mount — the same accessory family as other H Series field devices."
     }
    ],
    "dateModified": "2026-09-02"
   },
   "301": {
    "series": "H Series · Temperature and Humidity Sensor",
    "tagline": "Precision | Climate | Ultra-Low Power",
    "desc": "Hitelecom's temperature and humidity sensors deliver high-precision climate monitoring with remote alerting, giving clean rooms, cabinets, museums, and production lines continuous climate records and threshold alarms around the clock",
    "heroImg": "product/details/301-hero.png",
    "pdf": "/downloads/h300-temperature-humidity-sensor-datasheet.pdf",
     "crumbCat": "Temperature",
    "returnCid": "263",
    "features": [
     {
      "icon": "product/details/270-f1.png",
      "text": "Accuracy: ±0.2°C / ±2% RH (Typical)"
     },
     {
      "icon": "product/details/270-f2-ip65.png",
      "text": "IP65-Rated Enclosure"
     },
     {
      "icon": "product/details/270-f3.png",
      "text": "Range: 0–100% RH, -20°C to +80°C"
     },
     {
      "icon": "product/details/270-f4.png",
      "text": "Supports NFC activation and local device configuration."
     },
     {
      "icon": "product/details/270-f5.png",
      "text": "Low-Power Design for Long-Term Operation"
     },
     {
      "icon": "product/details/270-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/270-f7.png",
      "text": "Remote Climate Monitoring"
     },
     {
      "icon": "product/details/270-f8.png",
      "text": "Configurable Threshold Alerts"
     }
    ],
    "specsTitle": "Technical Specifications",
    "specsDesc": "Micro-power processors and algorithmic optimization give the sensor a design life of up to 10 years at a one-hour reporting interval under specified test conditions, reducing routine maintenance.",
    "specs": [
     [
      "Product Models",
      "H200/H300/H500"
     ],
     [
      "Measuring Range",
      "Humidity 0–100% RH, Temperature -20°C to +80°C"
     ],
     [
      "Accuracy",
      "±0.2°C / ±2% RH (Typical)"
     ],
     [
      "Protocol",
      "MQTT"
     ],
     [
      "Probe",
      "Slotted sintered probe, cable-mounted"
     ],
     [
      "Frequency Bands",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "Battery Life",
      "Designed for more than 10 years of battery life at a one-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval."
     ],
     [
      "Installation",
      "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     ]
    ],

    "specsStructured": [
     {
      "name": "Product Models",
      "value": "H200/H300/H500"
     },
     {
      "name": "Measuring Range",
      "value": "Humidity 0–100% RH, Temperature -20°C to +80°C"
     },
     {
      "name": "Accuracy",
      "value": "±0.2°C / ±2% RH (Typical)"
     },
     {
      "name": "Protocol",
      "value": "MQTT"
     },
     {
      "name": "Probe",
      "value": "Slotted sintered probe, cable-mounted"
     },
     {
      "name": "Frequency Bands",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "Battery Life",
      "value": "Designed for more than 10 years of battery life at a one-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval.",
      "unitText": "year",
      "minValue": 10.0
     },
     {
      "name": "Installation",
      "value": "Mounting lugs, pole clamp, or slotted mount (varies by configuration)"
     }
    ],    "certImgs": [],
    "scenariosHeading": "Application Scenarios",
    "scenarios": [
     {
      "img": "product/details/270-scen3.jpg",
      "label": "Data center"
     },
     {
      "img": "product/details/270-scen4.jpg",
      "label": "Pharmaceutical and Healthcare Storage"
     },
     {
      "img": "product/details/270-scen5.jpg",
      "label": "Food processing"
     },
     {
      "img": "product/details/270-scen2.jpg",
      "label": "Smart Agriculture"
     },
     {
      "img": "product/details/285-scen1.jpg",
      "label": "Office environment"
     },
     {
      "img": "product/details/285-scen7.jpg",
      "label": "Smart Manufacturing"
     },
     {
      "img": "product/details/285-scen3.jpg",
      "label": "Hospital"
     }
    ],
    "related": [
     "302",
     "270",
     "274",
     "280",
     "281",
     "282",
     "283",
     "284",
     "285"
    ],
    "summary": "The Hitelecom H Series temperature & humidity sensor is a wireless climate monitor for clean rooms, electrical cabinets, museums and production lines. Its slotted sintered probe measures 0–100% RH and −20°C to +80°C, with typical accuracies of ±2% RH and ±0.2°C, with a battery designed for more than 10 years of life at a one-hour reporting interval under specified test conditions, and 4G/NB-IoT cloud reporting.",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "Data centers and server rooms",
      "desc": "Tracks temperature and humidity at rack level to keep IT equipment within ASHRAE envelopes.",
      "img": "product/details/270-scen3.jpg"
     },
     {
      "name": "Medical and pharmaceutical storage",
      "desc": "Monitors pharmacies, cold storage and wards where humidity affects drug stability.",
      "img": "product/details/270-scen4.jpg"
     },
     {
      "name": "Museums and archives",
      "desc": "Provides continuous climate records that support conservation decisions for paper, textiles, and relics."
     },
     {
      "name": "Food processing and storage",
      "desc": "Tracks humidity in processing halls and warehouses, alerting staff to conditions that can lead to mold and condensation.",
      "img": "product/details/270-scen5.jpg"
     },
     {
      "name": "Electrical cabinets and enclosures",
      "desc": "Cable-mounted probe reaches inside cabinets to warn of condensation before corrosion starts.",
      "img": "product/details/285-scen7.jpg"
     },
     {
      "name": "Greenhouses",
      "desc": "Combines temperature and humidity trends for ventilation and irrigation decisions.",
      "img": "product/details/270-scen2.jpg"
     },
     {
      "name": "Offices and hospitals",
      "desc": "Keeps indoor air comfort and hygiene within target ranges in public buildings.",
      "img": "product/details/285-scen1.jpg"
     }
    ],
    "certifications": [
     "IP65"
    ],
    "faqs": [
     {
      "q": "What are the measuring range and accuracy?",
      "a": "It measures 0–100% RH and −20°C to +80°C, with typical accuracies of ±2% RH and ±0.2°C. The slotted sintered probe is cable-mounted, so it can be placed inside cabinets and ducts."
     },
     {
      "q": "Does it support threshold alarms?",
      "a": "Yes. High and low thresholds for both temperature and humidity are configured remotely, and the sensor pushes alerts through the cloud platform when limits are crossed."
     },
     {
      "q": "How long does the battery last?",
      "a": "The selected battery configuration is designed for 10+ years at a one-hour reporting interval under specified test conditions; actual life varies with network coverage, temperature, and reporting frequency. No mains wiring is needed at the installation point."
     },
     {
      "q": "Which wireless networks are supported?",
      "a": "4G and NB-IoT with MQTT uplink to Hitelecom Cloud, a customer cloud, or private deployment. LoRa is available for multi-sensor sites with a private gateway."
     }
    ],
    "dateModified": "2026-09-02"
   },
   "302": {
    "series": "H Series · Temperature and Humidity Data Logger",
    "tagline": "NFC Setup | USB Export | High-Capacity Logging",
    "desc": "Hitelecom's temperature and humidity data loggers store up to 80,000 readings with NFC configuration and one-click USB export, producing timestamped records that support audits in cold chain, pharmaceutical and food logistics.",
    "heroImg": "product/details/302-hero.png",
    "pdf": "/downloads/temperature-humidity-data-logger-datasheet.pdf",
    "crumbCat": "Temperature",
    "returnCid": "263",
    "features": [
     {
      "icon": "product/details/270-f1.png",
      "text": "Accuracy: ±0.2°C / ±2% RH (Typical)"
     },
     {
      "icon": "product/details/270-f2-ip65.png",
      "text": "IP65-Rated Enclosure"
     },
     {
      "icon": "product/details/270-f3.png",
      "text": "80,000 Readings Onboard Storage"
     },
     {
      "icon": "product/details/270-f4.png",
      "text": "NFC Tap-to-Configure, USB One-Click Export"
     },
     {
      "icon": "product/details/270-f5.png",
      "text": "Low-Power Design for Long-Term Operation"
     },
     {
      "icon": "product/details/270-f6.png",
      "text": "Standalone Logging via NFC & USB, No Gateway Needed"
     },
     {
      "icon": "product/details/270-f7.png",
      "text": "Timestamped Record for Every Reading"
     },
     {
      "icon": "product/details/270-f9.png",
      "text": "Free PC Software: Curve Analysis and PDF/CSV Export"
     }
    ],
    "specsTitle": "Technical Specifications",
    "specsDesc": "A micro-power design with NFC configuration and one-click USB export; the replaceable battery supports multi-year logging between battery changes.",
    "specs": [
     [
      "Product Models",
      "H200L/H300L"
     ],
     [
      "Storage Capacity",
      "80,000 Readings"
     ],
     [
      "Accuracy",
      "±0.2°C / ±2% RH (Typical)"
     ],
     [
      "Configuration",
      "NFC (Android/iOS App)"
     ],
     [
      "Data Export",
      "USB, PDF/CSV Report"
     ],
     [
      "Battery Life",
      "Multi-Year (Replaceable Battery)"
     ],
     [
      "Protection",
      "IP65"
     ],
     [
      "Installation",
      "Standalone · Hanging · Adhesive"
     ]
    ],

    "specsStructured": [
     {
      "name": "Product Models",
      "value": "H200L/H300L"
     },
     {
      "name": "Storage Capacity",
      "value": "80,000 Readings"
     },
     {
      "name": "Accuracy",
      "value": "±0.2°C / ±2% RH (Typical)"
     },
     {
      "name": "Configuration",
      "value": "NFC (Android/iOS App)"
     },
     {
      "name": "Data Export",
      "value": "USB, PDF/CSV Report"
     },
     {
      "name": "Battery Life",
      "value": "Multi-Year (Replaceable Battery)"
     },
     {
      "name": "Protection",
      "value": "IP65"
     },
     {
      "name": "Installation",
      "value": "Standalone · Hanging · Adhesive"
     }
    ],    "certImgs": [],
    "scenariosHeading": "Application Scenarios",
    "scenarios": [
     {
      "img": "product/details/285-scen4.jpg",
      "label": "Cold chain transport"
     },
     {
      "img": "product/details/270-scen5.jpg",
      "label": "Food processing"
     },
     {
      "img": "product/details/270-scen4.jpg",
      "label": "Pharmaceutical and Healthcare Storage"
     },
     {
      "img": "product/details/285-scen3.jpg",
      "label": "Hospital"
     },
     {
      "img": "product/details/285-scen7.jpg",
      "label": "Smart Manufacturing"
     },
     {
      "img": "product/details/285-scen6.jpg",
      "label": "Data center"
     }
    ],
    "related": [
     "301",
     "270",
     "285",
     "274",
     "280",
     "281",
     "282",
     "283"
    ],
    "summary": "The Hitelecom H Series temperature & humidity data logger stores up to 80,000 readings with ±0.2°C and ±2% RH typical accuracy. NFC configuration using a compatible Android or iOS device, one-click USB export of PDF/CSV reports, free PC software for charting and data analysis and a replaceable multi-year battery provide records that support audits for cold chain, pharmaceutical and food logistics.",
    "sku": "H200L/H300L",
    "applications": [
     {
      "name": "Cold chain transport",
      "desc": "Trip-level temperature records for refrigerated trucks, reefer containers and last-mile boxes.",
      "img": "product/details/285-scen4.jpg"
     },
     {
      "name": "Pharmaceutical distribution",
      "desc": "Audit-ready PDF/CSV evidence for vaccine, insulin and biologics shipments.",
      "img": "product/details/270-scen4.jpg"
     },
     {
      "name": "Food processing and storage",
      "desc": "HACCP-friendly logging in processing halls, cold stores and display cabinets.",
      "img": "product/details/270-scen5.jpg"
     },
     {
      "name": "Hospitals and laboratories",
      "desc": "Fridge, freezer and incubator logging for compliance checks.",
      "img": "product/details/285-scen3.jpg"
     },
     {
      "name": "Warehousing",
      "desc": "Long-term ambient logging in bonded and general warehouses.",
      "img": "product/details/276-scen3.jpg"
     },
     {
      "name": "Data centers and archives",
      "desc": "Placement logging for rooms where wireless uplink is not required.",
      "img": "product/details/285-scen6.jpg"
     }
    ],
    "certifications": [
     "IP65"
    ],
    "faqs": [
     {
      "q": "How do I configure the logger and read the data?",
      "a": "Tap the logger with an NFC-enabled phone to start, stop, and configure it — confirm iOS NFC support for your phone model with Hitelecom. After the trip, plug it into USB to export PDF/CSV reports, or open the files in the free PC software for curve analysis."
     },
     {
      "q": "How many readings can it store?",
      "a": "Up to 80,000 readings. At a five-minute interval, that covers roughly nine months of continuous logging."
     },
     {
      "q": "Is the battery replaceable?",
      "a": "Yes. The logger uses a replaceable battery with multi-year life, so the same logger can be reused for multiple trips over several years."
     },
     {
      "q": "Does it upload data over the air?",
      "a": "No — this is a standalone data logger: data stays on the logger until you export it via USB or read it via NFC, which suits cross-border shipments and audited deliveries where a live uplink is unnecessary."
     }
    ],
    "dateModified": "2026-09-02"
   },
   "303": {
    "series": "H Series · TVOC Sensor",
    "tagline": "VOC Monitoring | Fixed-Mount | Ultra-Low Power",
    "desc": "Hitelecom's TVOC sensors track total volatile organic compounds from 0 to 100,000 ppb at 1 ppb resolution, supporting monitoring in paint shops, chemical storage, and laboratories with remote alarms",
    "heroImg": "product/details/303-hero.png",
    "pdf": "/downloads/tvoc-sensor-datasheet.pdf",
    "crumbCat": "Air Quality",
    "returnCid": "265",
    "features": [
     {
      "icon": "product/details/270-f1.png",
      "text": "Resolution: 1 ppb"
     },
     {
      "icon": "product/details/270-f2.png",
      "text": "IP68-Rated Enclosure, Customizable"
     },
     {
      "icon": "product/details/270-f3.png",
      "text": "Wide Range: 0-100,000 ppb"
     },
     {
      "icon": "product/details/270-f4.png",
      "text": "Supports NFC activation and local device configuration."
     },
     {
      "icon": "product/details/270-f5.png",
      "text": "Low-Power Design for Long-Term Operation"
     },
     {
      "icon": "product/details/270-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/270-f7.png",
      "text": "Remote VOC Monitoring"
     },
     {
      "icon": "product/details/270-f8.png",
      "text": "Configurable Threshold Alerts"
     }
    ],
    "specsTitle": "Technical Specifications",
    "specsDesc": "Micro-power processors and algorithmic optimization give the sensor a design life of up to 10 years at a one-hour reporting interval under specified test conditions, reducing routine maintenance.",
    "specs": [
     [
      "Product Models",
      "H200/H300/H500"
     ],
     [
      "Measuring Range",
      "0-100,000 ppb"
     ],
     [
      "Resolution",
      "1 ppb"
     ],
     [
      "Protocol",
      "MQTT"
     ],
     [
      "Sensing Principle",
      "Electrochemical or PID (by configuration)"
     ],
     [
      "Frequency Bands",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "Battery Life",
      "Designed for more than 10 years of battery life at a one-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval."
     ],
     [
      "Installation",
      "Ear Mount · Duct Mount"
     ]
    ],

    "specsStructured": [
     {
      "name": "Product Models",
      "value": "H200/H300/H500"
     },
     {
      "name": "Measuring Range",
      "value": "0-100,000 ppb",
      "unitText": "parts per billion",
      "minValue": 0.0,
      "maxValue": 100000.0
     },
     {
      "name": "Resolution",
      "value": "1 ppb",
      "unitText": "parts per billion"
     },
     {
      "name": "Protocol",
      "value": "MQTT"
     },
     {
      "name": "Sensing Principle",
      "value": "Electrochemical or PID (by configuration)"
     },
     {
      "name": "Frequency Bands",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "Battery Life",
      "value": "Designed for more than 10 years of battery life at a one-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval.",
      "unitText": "year",
      "minValue": 10.0
     },
     {
      "name": "Installation",
      "value": "Ear Mount · Duct Mount"
     }
    ],    "certImgs": [],
    "scenariosHeading": "Application Scenarios",
    "scenarios": [
     {
      "img": "product/details/285-scen7.jpg",
      "label": "Smart Manufacturing"
     },
     {
      "img": "product/details/283-scen5.jpg",
      "label": "Chemical Plant"
     },
     {
      "img": "product/details/285-scen1.jpg",
      "label": "Office environment"
     },
     {
      "img": "product/details/285-scen3.jpg",
      "label": "Hospital"
     },
     {
      "img": "product/details/285-scen5.jpg",
      "label": "Residential environment"
     },
     {
      "img": "product/details/283-scen7.jpg",
      "label": "Smart building"
     }
    ],
    "related": [
     "305",
     "285",
     "301",
     "302",
     "270",
     "274",
     "284",
     "283"
    ],
    "summary": "The Hitelecom H Series TVOC sensor is a wireless monitor for total volatile organic compounds from 0 to 100,000 ppb at 1 ppb resolution. The sensing technology is selected for the target compounds and must be confirmed during ordering, with remote alarms and a battery designed for more than 10 years at a one-hour reporting interval under specified test conditions, supporting continuous monitoring in paint shops, chemical storage, and laboratories.",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "Paint shops and coating lines",
      "desc": "Continuous TVOC tracking where solvents evaporate during spraying and curing.",
      "img": "product/details/283-scen6.jpg"
     },
     {
      "name": "Chemical storage areas",
      "desc": "Early warning of vapor build-up around drums, tanks and cabinets.",
      "img": "product/details/283-scen5.jpg"
     },
     {
      "name": "Laboratories",
      "desc": "Fume-hood and room TVOC monitoring for researcher safety.",
      "img": "product/details/274-scen5.jpg"
     },
     {
      "name": "Printing and packaging plants",
      "desc": "Solvent vapor monitoring near presses and laminators.",
      "img": "product/details/285-scen7.jpg"
     },
     {
      "name": "Indoor air quality programs",
      "desc": "TVOC as the headline indicator for building health audits.",
      "img": "product/details/285-scen1.jpg"
     },
     {
      "name": "Wastewater and refuse facilities",
      "desc": "Odor-related VOC trend monitoring at treatment plants.",
      "img": "product/details/283-scen4.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "What range and resolution does the TVOC sensor offer?",
      "a": "0-100,000 ppb measuring range with 1 ppb resolution. Sensing principle is electrochemical or PID, selected per target gas mix."
     },
     {
      "q": "Can it alarm when TVOC rises abnormally?",
      "a": "Yes. Thresholds are configured remotely and the sensor pushes alarms through the cloud platform, so teams can respond promptly when a configured threshold is exceeded."
     },
     {
      "q": "What is the protection rating?",
      "a": "The standard enclosure is rated for demanding industrial sites, and IP68 is available as a customization for permanently exposed outdoor points. Tell Hitelecom your installation environment."
     },
     {
      "q": "How is it powered and connected?",
      "a": "It uses an internal battery designed for more than 10 years of life at a one-hour reporting interval under specified test conditions, uploading over 4G or NB-IoT via MQTT to Hitelecom Cloud or private platforms."
     }
    ],
    "dateModified": "2026-09-02"
   },
   "304": {
    "series": "H Series · Asset Tracking Sensor",
    "tagline": "Positioning | Multi-Year Battery | Rugged",
    "desc": "Hitelecom's asset tracking sensors combine GPS and BeiDou positioning with multi-year battery life, keeping pallets, tools and returnable crates visible across sites with geofence alerts",
    "heroImg": "product/details/304-hero.png",
    "pdf": "/downloads/asset-tracking-sensor-datasheet.pdf",
    "crumbCat": "Asset Tracking",
    "returnCid": "306",
    "features": [
     {
      "icon": "product/details/270-f1.png",
      "text": "GPS + BeiDou Dual-Mode Positioning"
     },
     {
      "icon": "product/details/270-f2-ip67.png",
      "text": "IP67 Protection Rating"
     },
     {
      "icon": "product/details/270-f3.png",
      "text": "LBS Fallback Where Cellular Coverage Is Available"
     },
     {
      "icon": "product/details/270-f4.png",
      "text": "Supports NFC activation and local device configuration."
     },
     {
      "icon": "product/details/270-f5.png",
      "text": "Low-Power Design for Long-Term Operation"
     },
     {
      "icon": "product/details/270-f6.png",
      "text": "4G / NB-IoT Position Reporting"
     },
     {
      "icon": "product/details/270-f7.png",
      "text": "Cloud Map & Location History"
     },
     {
      "icon": "product/details/270-f8.png",
      "text": "Geofence & Movement Alerts"
     }
    ],
    "specsTitle": "Technical Specifications",
    "specsDesc": "A micro-power design and configurable reporting intervals support multi-year battery operation; actual life depends on positioning mode, reporting interval, and network coverage.",
    "specs": [
     [
      "Product Model",
      "H200T"
     ],
     [
      "Positioning",
      "GPS / BeiDou / LBS"
     ],
     [
      "Communication",
      "4G / NB-IoT"
     ],
     [
      "Protocol",
      "MQTT"
     ],
     [
      "Battery Life",
      "Multi-Year (by Reporting Interval)"
     ],
     [
      "Protection",
      "IP67"
     ],
     [
      "Installation",
      "Magnet · Screw · Strap"
     ],
     [
      "Operating Temperature",
      "-20°C to +70°C"
     ]
    ],

    "specsStructured": [
     {
      "name": "Product Model",
      "value": "H200T"
     },
     {
      "name": "Positioning",
      "value": "GPS / BeiDou / LBS"
     },
     {
      "name": "Communication",
      "value": "4G / NB-IoT"
     },
     {
      "name": "Protocol",
      "value": "MQTT"
     },
     {
      "name": "Battery Life",
      "value": "Multi-Year (by Reporting Interval)"
     },
     {
      "name": "Protection",
      "value": "IP67"
     },
     {
      "name": "Installation",
      "value": "Magnet · Screw · Strap"
     },
     {
      "name": "Operating Temperature",
      "value": "-20°C to +70°C",
      "unitText": "degree Celsius",
      "minValue": -20.0,
      "maxValue": 70.0
     }
    ],    "certImgs": [],
    "scenariosHeading": "Application Scenarios",
    "scenarios": [
     {
      "img": "product/details/285-scen4.jpg",
      "label": "Smart transportation"
     },
     {
      "img": "product/details/285-scen7.jpg",
      "label": "Smart Manufacturing"
     },
     {
      "img": "product/details/285-scen2.jpg",
      "label": "Smart city"
     },
     {
      "img": "product/details/283-scen8.jpg",
      "label": "Smart Energy"
     },
     {
      "img": "product/details/283-scen4.jpg",
      "label": "Water Plant"
     },
     {
      "img": "product/details/283-scen7.jpg",
      "label": "Smart building"
     }
    ],
    "related": [
     "301",
     "302",
     "303",
     "305",
     "270",
     "274",
     "280",
     "285"
    ],
    "summary": "The Hitelecom H Series asset tracking sensor combines GPS and BeiDou positioning (LBS fallback where satellite signal is weak, subject to network availability) with 4G or NB-IoT uplink. The tracker reports location and geofence events over 4G or NB-IoT, combining a multi-year battery, an IP67 enclosure, and magnet, screw, or strap mounting to keep pallets, tools and returnable crates visible across sites.",
    "sku": "H200T",
    "applications": [
     {
      "name": "Pallet and crate pooling",
      "desc": "Returnable transport items stay visible across suppliers, plants and warehouses.",
      "img": "product/details/276-scen3.jpg"
     },
     {
      "name": "Tool and equipment tracking",
      "desc": "Find shared tools and portable equipment across large sites.",
      "img": "product/details/285-scen7.jpg"
     },
     {
      "name": "Logistics fleets",
      "desc": "Position and geofence alerts for trailers, containers and dollies.",
      "img": "product/details/285-scen4.jpg"
     },
     {
      "name": "Construction sites",
      "desc": "Track generators, compressors and attachments across changing job sites."
     },
     {
      "name": "Utilities and municipal assets",
      "desc": "Watches mobile pumps, valves and service equipment in the field.",
      "img": "product/details/283-scen4.jpg"
     },
     {
      "name": "Rental equipment",
      "desc": "Locate rented machines and detect unauthorized movement.",
      "img": "product/details/284-scen2.jpg"
     }
    ],
    "certifications": [
     "IP67"
    ],
    "faqs": [
     {
      "q": "How does the tracker position assets?",
      "a": "Outdoors it uses GPS or BeiDou satellite positioning; indoors or in urban canyons, LBS cell positioning can provide an approximate fallback location, subject to network availability."
     },
     {
      "q": "What is the battery life?",
      "a": "Multi-year, scaled by reporting interval — fewer position updates per day means longer service. The exact profile is configured per deployment."
     },
     {
      "q": "How is it attached to assets?",
      "a": "Three options: magnet for steel surfaces, screws for permanent mounting, or straps for pallets and irregularly shaped assets. IP67 protects against rain and dust."
     },
     {
      "q": "Can it alert when an asset leaves a site?",
      "a": "Yes. Geofences are drawn on the platform, and the tracker pushes an alert when an asset crosses a boundary."
     }
    ],
    "dateModified": "2026-09-02"
   },
   "305": {
    "series": "H Series · Custom Gas Sensor",
    "tagline": "100+ Gases | Fixed or Ducted | OEM/ODM",
    "desc": "Pick the gas — Hitelecom builds the terminal around it. Custom gas sensors can be configured for more than 100 gases including CO, H₂S, NH₃, O₃, and CH₄, in fixed or ducted enclosures for industrial monitoring. Range, accuracy, sensing principle, and battery life depend on the selected gas and configuration.",
    "heroImg": "product/details/305-hero.png",
    "pdf": "/downloads/custom-gas-sensor-datasheet.pdf",
    "crumbCat": "Air Quality",
    "returnCid": "265",
    "features": [
     {
      "icon": "product/details/270-f1.png",
      "text": "Electrochemical / NDIR / PID Principles"
     },
     {
      "icon": "product/details/270-f2.png",
      "text": "IP68-Rated Enclosure, Customizable"
     },
     {
      "icon": "product/details/270-f3.png",
      "text": "100+ Gases: CO, H₂S, NH₃, O₃, CH₄, and More"
     },
     {
      "icon": "product/details/270-f4.png",
      "text": "Supports NFC activation and local device configuration."
     },
     {
      "icon": "product/details/270-f5.png",
      "text": "Low-Power Design for Long-Term Operation"
     },
     {
      "icon": "product/details/270-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/270-f7.png",
      "text": "Remote Gas Monitoring"
     },
     {
      "icon": "product/details/270-f8.png",
      "text": "Configurable Threshold Alerts"
     }
    ],
    "specsTitle": "Technical Specifications",
    "specsDesc": "Custom gas terminals combine micro-power processors with sensing principles matched to the target gas. Range, accuracy, and battery life depend on the selected gas, principle, and reporting interval — confirm per configuration.",
    "specs": [
     [
      "Product Models",
      "H200/H300/H500"
     ],
     [
      "Target Gases",
      "100+ Configurable Target Gases"
     ],
     [
      "Measuring Range",
      "Per Gas (Customized)"
     ],
     [
      "Protocol",
      "MQTT"
     ],
     [
      "Sensing Principle",
      "Electrochemical / NDIR / PID"
     ],
     [
      "Frequency Bands",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "Battery Life",
      "Designed for more than 10 years of battery life at a one-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval."
     ],
     [
      "Installation",
      "Fixed · Ducted"
     ]
    ],

    "specsStructured": [
     {
      "name": "Product Models",
      "value": "H200/H300/H500"
     },
     {
      "name": "Target Gases",
      "value": "100+ Configurable Target Gases"
     },
     {
      "name": "Measuring Range",
      "value": "Per Gas (Customized)"
     },
     {
      "name": "Protocol",
      "value": "MQTT"
     },
     {
      "name": "Sensing Principle",
      "value": "Electrochemical / NDIR / PID"
     },
     {
      "name": "Frequency Bands",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "Battery Life",
      "value": "Designed for more than 10 years of battery life at a one-hour reporting interval under the specified test conditions. Actual battery life varies by model, sensing configuration, network coverage, retransmissions, operating temperature, sampling rate, and reporting interval.",
      "unitText": "year",
      "minValue": 10.0
     },
     {
      "name": "Installation",
      "value": "Fixed · Ducted"
     }
    ],    "certImgs": [],
    "scenariosHeading": "Application Scenarios",
    "scenarios": [
     {
      "img": "product/details/283-scen3.jpg",
      "label": "Coal mine"
     },
     {
      "img": "product/details/283-scen5.jpg",
      "label": "Chemical Plant"
     },
     {
      "img": "product/details/283-scen4.jpg",
      "label": "Water Plant"
     },
     {
      "img": "product/details/285-scen7.jpg",
      "label": "Smart Manufacturing"
     },
     {
      "img": "product/details/283-scen1.jpg",
      "label": "Manhole Cover"
     },
     {
      "img": "product/details/285-scen1.jpg",
      "label": "Office environment"
     }
    ],
    "related": [
     "303",
     "285",
     "274",
     "270",
     "301",
     "280",
     "284",
     "283"
    ],
    "summary": "Pick the gas — Hitelecom builds the terminal around it. The H Series custom gas sensor supports 100+ gases including CO, H₂S, NH₃, O₃ and CH₄, with electrochemical, NDIR or PID principles, fixed or ducted enclosures, 4G or NB-IoT uplink; battery life depends on the sensing principle and reporting frequency (designed for more than 10 years at a one-hour interval in typical configurations).",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "Coal mines",
      "desc": "CH₄ and CO monitoring underground where wired gas systems are hard to extend.",
      "img": "product/details/283-scen3.jpg"
     },
     {
      "name": "Chemical plants",
      "desc": "Point monitoring of process-specific gases along production and storage areas.",
      "img": "product/details/283-scen5.jpg"
     },
     {
      "name": "Water and wastewater plants",
      "desc": "H₂S detection in wet wells, screens and sludge rooms.",
      "img": "product/details/283-scen4.jpg"
     },
     {
      "name": "Cold storage and refrigeration",
      "desc": "NH₃ leak detection for ammonia refrigeration plants.",
      "img": "product/details/270-scen5.jpg"
     },
     {
      "name": "Manholes and confined spaces",
      "desc": "Pre-entry and continuous gas checks in municipal confined spaces.",
      "img": "product/details/283-scen1.jpg"
     },
     {
      "name": "Semiconductor and labs",
      "desc": "Specialty gas leak monitoring tailored to the exact gas in use.",
      "img": "product/details/274-scen2.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "Which gases can be detected?",
      "a": "More than 100 target gases, including CO, H₂S, NH₃, O₃, CH₄, Cl₂, and VOCs. The sensing technology — electrochemical, NDIR, or PID — and measuring range are selected for the target gas."
     },
     {
      "q": "How do I order a custom gas sensor?",
      "a": "Tell Hitelecom the target gas, expected range, installation style (fixed or ducted) and site conditions; engineering confirms the configuration and lead time under the OEM/ODM program."
     },
     {
      "q": "Can the enclosure handle outdoor installation?",
      "a": "Yes. Fixed and ducted enclosures cover most sites, and IP68 protection is available as a customization for permanently exposed locations."
     },
     {
      "q": "How does it report alarms?",
      "a": "Wirelessly over 4G or NB-IoT via MQTT to Hitelecom Cloud or a private platform, with remotely configured alarm thresholds."
     }
    ],
    "dateModified": "2026-09-02"
   }
  }
 },
 "zh": {
  "cloud": {
   "banner": {
    "title": "宏太云",
    "subtitle": "开启设备云上数字化",
    "desc": "宏太云平台是一种集数据采集、分析和管理于一体的智能化平台，提供设备互联、远程监控和大数据分析功能，助力企业实现高效运维与智能决策。",
    "images": [
     "product/cloud/banner-1.png",
     "product/cloud/banner-2.png",
     "product/cloud/banner-3.png",
     "product/app/banner-4.png"
    ]
   },
   "intro": {
    "heading": "绿色可持续物联网 将无处不在",
    "paras": [
     "IDC预测，到2030年全球物联网设备将达200亿，年复合增长率为18%。智能设备每10分钟生成一条数据，每天将产生超100条记录，日产数据量会有2万亿的数据生成，IoT将占全球数据总量90% AIoT技术将重塑物理世界，宏太将顺应这一发展趋势推出系列低功耗智能终端，精细设计实现每0.001W能耗节约，旨在助力行业降本增效，同时为地球的绿色环保事业添砖加瓦。",
     ""
    ],
    "cards": [
     {
      "img": "product/cloud/deploy-1.png",
      "title": "公有云",
      "desc": "宏太公有云提供设备快速上云，管理，实时监测，分析预判，故障报警等，端云一体完整方案助力传统企业数字化升级。"
     },
     {
      "img": "product/cloud/deploy-2.png",
      "title": "私有云",
      "desc": "将定制的私有云部署在自己的服务器上，保证高敏感数据的全私密性，也可以位于客户现场的数据中心，专人进行软硬件维护和管理。"
     },
     {
      "img": "product/cloud/deploy-3.png",
      "title": "混合云",
      "desc": "对敏感数据或资产进行私有云架构部署在本地，对常规或普通业务部署在成本更低的公有云上。"
     },
     {
      "img": "product/cloud/deploy-4.png",
      "title": "边缘云",
      "desc": "局部决策、边缘计算能力、业务控制简单、方便易用的可视化交互界面、切实解决客户实际运维和管理难题。"
     }
    ]
   },
   "features": {
    "heading": "平台特性",
    "items": [
     {
      "img": "product/cloud/feature-1.png",
      "text": "端云整体解决方案"
     },
     {
      "img": "product/cloud/feature-2.png",
      "text": "海量级接入"
     },
     {
      "img": "product/cloud/feature-3.png",
      "text": "高可靠分布集群"
     },
     {
      "img": "product/cloud/feature-4.png",
      "text": "毫秒级响应高性能"
     },
     {
      "img": "product/cloud/feature-5.png",
      "text": "多协议适配"
     },
     {
      "img": "product/cloud/feature-6.png",
      "text": "可视化易运维"
     },
     {
      "img": "product/cloud/feature-7.png",
      "text": "HiLink协议"
     },
     {
      "img": "product/cloud/feature-8.png",
      "text": "软硬件一体定制开发"
     }
    ]
   },
   "architecture": {
    "heading": "平台架构",
    "img": "product/cloud/architecture.gif"
   },
   "core": {
    "heading": "核心功能",
    "subtitle": "通过高效的连接和精准管理，拓展或加速您的物联网业务",
    "items": [
     {
      "img": "product/cloud/core-1.jpg",
      "title": "设备接入",
      "desc": "将所有的设备集成到一个平台进行管理\n支持MQTT, HTTP, TCP，CoAP，AMQP传输协议以及定制HiLink协议，\n满足各类传感器，终端控制器，边缘计算设备，网关等系统接入轻松上云"
     },
     {
      "img": "product/cloud/core-2.jpg",
      "title": "设备管理",
      "desc": "支持设备实时在线感知，质量监测，远程控制诊断，预测维护，告警统计分析\n\n支持设备在网络不稳定时，暂存及心跳检测后的握手重发云端指令识别\n\n支持设备地图位置模式，能够实时查看设备的分布和地理位置数据\n\n支持海量数据查询功能，使用函数或运算逻辑来查找和定位符合条件的设备\n\n支持设备远程OTA, 固件升级，远程批量操作，方便运维节省人力"
     },
     {
      "img": "product/cloud/core-3.jpg",
      "title": "告警规则",
      "desc": "宏太云灵活强大的告警机制，支持多触发条件多属性运算，实时监测设备运行状态。\n\n温度过高，压力过大，流速过快等异常让您精准感知实时决策。合理设置告警数据时长和重复次数，减小误报和抖动频率\n\n当心跳匹配，握手成功设备恢复正常，告警自动解除减少人为干预提高科学管理水平\n\n支持告警配置批量下放，告警规则的批量设置，远程接收终端告警信息"
     },
     {
      "img": "product/cloud/core-4.jpg",
      "title": "数据可视化",
      "desc": "快速搭建客户所需的大小屏，实时与设备数据源对接\n\n大屏 · PC · Pad · Phone 多端查看，全域感知设备数据实时刷新，\n告警数据实时上报，配置命令实时下发\n\n支持GIS地图或数字孪生(功能定制)，实时位置和运动轨迹信息展示\n并做到人过留迹、物过数据可查并支持视频模式"
     },
     {
      "img": "product/cloud/core-5.jpg",
      "title": "开放API",
      "desc": "开放API，支持第三方终端设备和控制器无缝对接\n\n支持透过MQTT方式，把终端设备的实时数据推送至客户数据中心或云平台\n\n支持云云对接，把客户使用的第三方平台的数据接入宏太云，满足一朵云管理所有设备"
     },
     {
      "img": "product/cloud/core-6.webp",
      "title": "智能联动",
      "desc": "支持设备场景联动：温度过高时打开降温设备或空调，\n土壤湿度低于设定门限时自动打开灌溉装置，形成智能联动。\n结合宏太超低功耗智能终端，减少日常人工干预。"
     }
    ]
   },
   "scenarios": {
    "heading": "场景与方案",
    "tabs": [
     {
      "icons": [
       "product/cloud/scen-icon-1a.png",
       "product/cloud/scen-icon-1b.png"
      ],
      "label": "工业物联"
     },
     {
      "icons": [
       "product/cloud/scen-icon-2a.png",
       "product/cloud/scen-icon-2b.png"
      ],
      "label": "智慧能源"
     },
     {
      "icons": [
       "product/cloud/scen-icon-3a.png",
       "product/cloud/scen-icon-3b.png"
      ],
      "label": "智慧校园"
     },
     {
      "icons": [
       "product/cloud/scen-icon-4a.png",
       "product/cloud/scen-icon-4b.png"
      ],
      "label": "智慧农业"
     }
    ],
    "bgs": [
     "product/cloud/scen-bg-1.jpg",
     "product/cloud/scen-bg-2.jpg",
     "product/cloud/scen-bg-3.png",
     "product/cloud/scen-bg-4.png"
    ],
    "slides": [
     {
      "img": "product/cloud/scen-bg-1.jpg",
      "title": "工业物联",
      "desc": "实现设备、系统和人员之间的高效互联与数据交互，从而优化生产流程，提高生产效率和资源利用率。宏太系列感知终端能够实时监测设备运行状态，提前预测故障，降低停机率，减少能源消耗和生产成本，从而全面推动向智能化和数字化转型。"
     },
     {
      "img": "product/cloud/scen-bg-2.jpg",
      "title": "智慧能源",
      "desc": "为实现能源生产、传输、分配及使用的高效管理与优化，宏太系列感知终端通过实时监测、数据采集及远程控制功能，有效降低能耗并实现故障预测，从而减少人工干预与维护成本。助力整合分布式能源资源，推动智慧能源的可持续发展与整体效率的全面提升。"
     },
     {
      "img": "product/cloud/scen-bg-3.png",
      "title": "智慧校园",
      "desc": "智慧校园使用物联网可实现设备互联与数据共享，提升校园管理和资源利用率。通过宏太系列感知终端，可实时监控校园环境、安全设施和能耗情况，优化教学、优化能源利用，为师生提供更便捷、高效、安全的校园环境，促进教育质量和管理水平的全面提升。"
     },
     {
      "img": "product/cloud/scen-bg-4.png",
      "title": "智慧农业",
      "desc": "宏太系列智能终端精准感知环境数据，实时监测土壤湿度、温度、光照等参数，实现精准灌溉、施肥和病虫害防治，有效降低人力成本。气象站功能助力天气预测，优化灌溉计划，提高作物产量与质量，减少资源浪费。物联网技术不仅支持数据追溯，增强农产品市场竞争力同时推动农业现代化发展。"
     }
    ]
   },
   "cta": {
    "title": "立即体验 宏太云",
    "subtitle": "轻松开启，探索更多功能，体验云上全托管服务",
    "primary": "免费试用",
    "secondary": "联系我们"
   }
  },
  "app": {
   "banner": {
    "title": "宏太APP",
    "subtitle": "随时随地轻松监控您的业务",
    "desc": "宏太APP连接和管理自研或第三方物联终端，功能多样包括设备注册、配置、远程控制、状态监测等、大幅提升效率和便捷性。",
    "images": [
     "product/cloud/banner-1.png",
     "product/cloud/banner-2.png",
     "product/cloud/banner-3.png",
     "product/app/banner-4.png"
    ]
   },
   "platforms": {
    "heading": "多种形态 全面支持",
    "items": [
     {
      "img": "product/app/platform-1.png",
      "name": "Windows"
     },
     {
      "img": "product/app/platform-2.png",
      "name": "iOS"
     },
     {
      "img": "product/app/platform-3.png",
      "name": "Android"
     },
     {
      "img": "product/app/platform-4.png",
      "name": "微信小程序"
     }
    ]
   },
   "features": {
    "heading": "产品功能",
    "subtitle": "宏太物联终端设备注册、传感器配置、设备添加、设备删除及实时监控数据显示。",
    "items": [
     {
      "img": "product/app/feature-zh-1.png",
      "title": "激活设备",
      "desc": "利用Hitelecom配置工具，通过NFC模式高效激活和唤醒物联网设备为设备快速部署提供可靠和用户友好的界面。"
     },
     {
      "img": "product/app/feature-zh-2.png",
      "title": "设备连网",
      "desc": "将唤醒后的设备接入宏太云，配置告警门限，任务策略，上报间隔时间，时间段，频次等特定函数。满足不同客户不同场景的需求。"
     },
     {
      "img": "product/app/feature-zh-3.png",
      "title": "设备分配",
      "desc": "强大的系统级用户管理模式，对用户，角色，部门和岗位进行分级创建和管理，为不同的角色分配灵活权限，保障设备数据安全。"
     },
     {
      "img": "product/app/feature-zh-4.png",
      "title": "界面自定义",
      "desc": "根据客户的实际需求自定义应用程序组件，灵活调整并定制用户界面，以实现更加专业和个性化的用户体验。"
     },
     {
      "img": "product/app/feature-zh-5.png",
      "title": "数据组件",
      "desc": "APP的数据组件设计灵活便捷，通过直观的图表和报告，用户可以轻松观察到数据的即时变化。"
     },
     {
      "img": "product/app/feature-zh-6.png",
      "title": "地图组件",
      "desc": "提供可视化的地理数据地图，使用户能够方便且实时地追踪设备的位置信息，增强监控管理效率和业务决策支持。"
     },
     {
      "img": "product/app/feature-zh-7.png",
      "title": "告警管理",
      "desc": "设备状态在线监控，通过APP推送实时告警信息，确保及时响应与处理，维持设备正常运作，保障业务连续性。"
     },
     {
      "img": "product/app/feature-zh-8.png",
      "title": "国际语言",
      "desc": "提供中英双语言支持，确保海外客户获得无障碍的服务体验。针对其他语种支持定制化方案，以满足全球客户的多样化需求。"
     }
    ]
   },
   "app3": {
    "heading": "应用场景",
    "subtitle": "预计未来全球将有80%的数据由物联网产生，无论是传统还是新兴行业，企业都将借助这些有价值的数据来驱动业务并实现降本增效。",
    "items": [
     {
      "img": "product/app/scen-0bbcd0.jpg",
      "label": "智慧农业 Smart Agriculture"
     },
     {
      "img": "product/app/scen-214abe.jpg",
      "label": "环境检测 Environmental Monitoring"
     },
     {
      "img": "product/app/scen-f607f3.jpg",
      "label": "工业物联网 Industrial IoT"
     },
     {
      "img": "product/app/scen-7d03dc.jpg",
      "label": "智慧校园 Smart Campus"
     },
     {
      "img": "product/app/scen-4f4630.jpg",
      "label": "智慧城市 Smart City"
     },
     {
      "img": "product/app/scen-83dd3b.jpg",
      "label": "水文水利 Smart Water"
     },
     {
      "img": "product/app/scen-1c2289.jpg",
      "label": "智慧电力 Smart Energy"
     },
     {
      "img": "product/app/scen-67bc5a.jpg",
      "label": "资产追踪 Asset Tracking"
     }
    ]
   }
  },
  "lists": {
   "261": {
    "bannerImg": "product/list/banner-zh-1.jpg",
    "subcats": [
     {
      "cid": "261",
      "name": "全部",
      "on": true
     },
     {
      "cid": "263",
      "name": "温度监测",
      "on": false
     },
     {
      "cid": "262",
      "name": "压力监测",
      "on": false
     },
     {
      "cid": "269",
      "name": "土壤监测",
      "on": false
     },
     {
      "cid": "268",
      "name": "液位监测",
      "on": false
     },
     {
      "cid": "267",
      "name": "倾斜监测",
      "on": false
     },
     {
      "cid": "266",
      "name": "距离监测",
      "on": false
     },
     {
      "cid": "271",
      "name": "振动监测",
      "on": false
     },
     {
      "cid": "265",
      "name": "空气质量",
      "on": false
     },
     {
      "cid": "306",
      "name": "资产定位",
      "on": false
     }
    ],
    "products": [
     {
      "id": "270",
      "img": "product/products/270.png",
      "name": "温度传感器",
      "conn": "NB-IoT | 4G LTE | LoRa"
     },
     {
      "id": "274",
      "img": "product/products/274.png",
      "name": "压力传感器",
      "conn": "NB-IoT | 4G LTE | LoRa"
     },
     {
      "id": "280",
      "img": "product/products/280.png",
      "name": "土壤传感器",
      "conn": "NB-IoT | 4G LTE | LoRa"
     },
     {
      "id": "281",
      "img": "product/products/281.png",
      "name": "液位传感器",
      "conn": "NB-IoT | 4G LTE | LoRa"
     },
     {
      "id": "282",
      "img": "product/products/282.png",
      "name": "倾斜传感器",
      "conn": "NB-IoT | 4G LTE | LoRa"
     },
     {
      "id": "283",
      "img": "product/products/283.png",
      "name": "高精度测距",
      "conn": "NB-IoT | 4G LTE | LoRa"
     },
     {
      "id": "284",
      "img": "product/products/284.png",
      "name": "振动传感器",
      "conn": "NB-IoT | 4G LTE | LoRa"
     },
     {
      "id": "285",
      "img": "product/products/285.png",
      "name": "空气质量",
      "conn": "NB-IoT | 4G LTE | LoRa"
     },
     {
      "id": 301,
      "name": "温湿度传感器",
      "conn": "NB-IoT | 4G LTE | LoRa",
      "img": "product/products/301.png"
     },
     {
      "id": 302,
      "name": "温湿度记录仪",
      "conn": "NFC | USB",
      "img": "product/products/302.png"
     },
     {
      "id": 303,
      "name": "TVOC传感器",
      "conn": "NB-IoT | 4G LTE | LoRa",
      "img": "product/products/303.png"
     },
     {
      "id": 304,
      "name": "资产定位终端",
      "conn": "GPS | 北斗 | 4G LTE",
      "img": "product/products/304.png"
     },
     {
      "id": 305,
      "name": "定制气体传感器",
      "conn": "NB-IoT | 4G LTE | LoRa",
      "img": "product/products/305.png"
     }
    ]
   },
   "258": {
    "bannerImg": "product/list/banner-zh-4.jpg",
    "subcats": [
     {
      "cid": "258",
      "name": "全部",
      "on": true
     },
     {
      "cid": "272",
      "name": "室内",
      "on": false
     },
     {
      "cid": "273",
      "name": "室外",
      "on": false
     }
    ],
    "products": [
     {
      "id": "276",
      "img": "product/products/276.png",
      "name": "室内",
      "conn": "LoRa | 4G LTE | Ethernet"
     },
     {
      "id": "275",
      "img": "product/products/275.png",
      "name": "户外",
      "conn": "LoRa | 4G LTE | Ethernet"
     }
    ]
   },
   "257": {
    "bannerImg": "product/list/banner-zh-3.jpg",
    "subcats": [
     {
      "cid": "257",
      "name": "全部",
      "on": true
     },
     {
      "cid": "275",
      "name": "气象",
      "on": false
     },
     {
      "cid": "274",
      "name": "水文",
      "on": false
     }
    ],
    "products": [
     {
      "id": "278",
      "img": "product/products/278.png",
      "name": "气象",
      "conn": "多参数 | 实时传 | 易部署"
     },
     {
      "id": "277",
      "img": "product/products/277.png",
      "name": "水文",
      "conn": "多参数 | 实时传 | 易部署"
     }
    ]
   },
   "256": {
    "bannerImg": "product/list/banner-zh-2.png",
    "subcats": [
     {
      "cid": "256",
      "name": "全部",
      "on": true
     },
     {
      "cid": "278",
      "name": "软件",
      "on": false
     },
     {
      "cid": "279",
      "name": "硬件",
      "on": false
     }
    ],
    "products": [
     {
      "id": "",
      "img": "product/products/custom-1.png",
      "name": "数字大屏",
      "conn": "定制数字孪生和地理信息系统全面、动态和多维的数据展示"
     },
     {
      "id": "",
      "img": "product/products/custom-2.png",
      "name": "云平台定制",
      "conn": "定制平台常用于指挥中心、监控室、数据中心等场景"
     },
     {
      "id": "",
      "img": "product/products/custom-3.png",
      "name": "嵌入式软件",
      "conn": "满足特定应用需求的各类传感器、控制器嵌入式软体开发"
     },
     {
      "id": "",
      "img": "product/products/custom-4.png",
      "name": "硬件定制",
      "conn": "满足特定应用需求的各类传感器、控制器硬件或智能终端开发"
     },
     {
      "id": "287",
      "img": "product/products/287.png",
      "name": "防爆隔离器",
      "conn": "防爆 | 2.4 GHz | 5.8 GHz"
     },
     {
      "id": "286",
      "img": "product/products/286.png",
      "name": "防爆温压",
      "conn": "防爆 | 4G通信 | 温压一体"
     }
    ]
   },
   "262": {
    "bannerImg": "product/list/banner-zh-1.jpg",
    "subcats": [
     {
      "cid": "261",
      "name": "全部",
      "on": false
     },
     {
      "cid": "263",
      "name": "温度监测",
      "on": false
     },
     {
      "cid": "262",
      "name": "压力监测",
      "on": true
     },
     {
      "cid": "269",
      "name": "土壤监测",
      "on": false
     },
     {
      "cid": "268",
      "name": "液位监测",
      "on": false
     },
     {
      "cid": "267",
      "name": "倾斜监测",
      "on": false
     },
     {
      "cid": "266",
      "name": "距离监测",
      "on": false
     },
     {
      "cid": "271",
      "name": "振动监测",
      "on": false
     },
     {
      "cid": "265",
      "name": "空气质量",
      "on": false
     },
     {
      "cid": "306",
      "name": "资产定位",
      "on": false
     }
    ],
    "products": [
     {
      "id": "274",
      "img": "product/products/274.png",
      "name": "压力传感器",
      "conn": "NB-IoT | 4G LTE | LoRa"
     }
    ]
   },
   "263": {
    "bannerImg": "product/list/banner-zh-1.jpg",
    "subcats": [
     {
      "cid": "261",
      "name": "全部",
      "on": false
     },
     {
      "cid": "263",
      "name": "温度监测",
      "on": true
     },
     {
      "cid": "262",
      "name": "压力监测",
      "on": false
     },
     {
      "cid": "269",
      "name": "土壤监测",
      "on": false
     },
     {
      "cid": "268",
      "name": "液位监测",
      "on": false
     },
     {
      "cid": "267",
      "name": "倾斜监测",
      "on": false
     },
     {
      "cid": "266",
      "name": "距离监测",
      "on": false
     },
     {
      "cid": "271",
      "name": "振动监测",
      "on": false
     },
     {
      "cid": "265",
      "name": "空气质量",
      "on": false
     },
     {
      "cid": "306",
      "name": "资产定位",
      "on": false
     }
    ],
    "products": [
     {
      "id": "270",
      "img": "product/products/270.png",
      "name": "温度传感器",
      "conn": "NB-IoT | 4G LTE | LoRa"
     },
     {
      "id": 301,
      "name": "温湿度传感器",
      "conn": "NB-IoT | 4G LTE | LoRa",
      "img": "product/products/301.png"
     },
     {
      "id": 302,
      "name": "温湿度记录仪",
      "conn": "NFC | USB",
      "img": "product/products/302.png"
     }
    ]
   },
   "265": {
    "bannerImg": "product/list/banner-zh-1.jpg",
    "subcats": [
     {
      "cid": "261",
      "name": "全部",
      "on": false
     },
     {
      "cid": "263",
      "name": "温度监测",
      "on": false
     },
     {
      "cid": "262",
      "name": "压力监测",
      "on": false
     },
     {
      "cid": "269",
      "name": "土壤监测",
      "on": false
     },
     {
      "cid": "268",
      "name": "液位监测",
      "on": false
     },
     {
      "cid": "267",
      "name": "倾斜监测",
      "on": false
     },
     {
      "cid": "266",
      "name": "距离监测",
      "on": false
     },
     {
      "cid": "271",
      "name": "振动监测",
      "on": false
     },
     {
      "cid": "265",
      "name": "空气质量",
      "on": true
     },
     {
      "cid": "306",
      "name": "资产定位",
      "on": false
     }
    ],
    "products": [
     {
      "id": "285",
      "img": "product/products/285.png",
      "name": "空气质量",
      "conn": "NB-IoT | 4G LTE | LoRa"
     },
     {
      "id": 303,
      "name": "TVOC传感器",
      "conn": "NB-IoT | 4G LTE | LoRa",
      "img": "product/products/303.png"
     },
     {
      "id": 305,
      "name": "定制气体传感器",
      "conn": "NB-IoT | 4G LTE | LoRa",
      "img": "product/products/305.png"
     }
    ]
   },
   "266": {
    "bannerImg": "product/list/banner-zh-1.jpg",
    "subcats": [
     {
      "cid": "261",
      "name": "全部",
      "on": false
     },
     {
      "cid": "263",
      "name": "温度监测",
      "on": false
     },
     {
      "cid": "262",
      "name": "压力监测",
      "on": false
     },
     {
      "cid": "269",
      "name": "土壤监测",
      "on": false
     },
     {
      "cid": "268",
      "name": "液位监测",
      "on": false
     },
     {
      "cid": "267",
      "name": "倾斜监测",
      "on": false
     },
     {
      "cid": "266",
      "name": "距离监测",
      "on": true
     },
     {
      "cid": "271",
      "name": "振动监测",
      "on": false
     },
     {
      "cid": "265",
      "name": "空气质量",
      "on": false
     },
     {
      "cid": "306",
      "name": "资产定位",
      "on": false
     }
    ],
    "products": [
     {
      "id": "283",
      "img": "product/products/283.png",
      "name": "高精度测距",
      "conn": "NB-IoT | 4G LTE | LoRa"
     }
    ]
   },
   "267": {
    "bannerImg": "product/list/banner-zh-1.jpg",
    "subcats": [
     {
      "cid": "261",
      "name": "全部",
      "on": false
     },
     {
      "cid": "263",
      "name": "温度监测",
      "on": false
     },
     {
      "cid": "262",
      "name": "压力监测",
      "on": false
     },
     {
      "cid": "269",
      "name": "土壤监测",
      "on": false
     },
     {
      "cid": "268",
      "name": "液位监测",
      "on": false
     },
     {
      "cid": "267",
      "name": "倾斜监测",
      "on": true
     },
     {
      "cid": "266",
      "name": "距离监测",
      "on": false
     },
     {
      "cid": "271",
      "name": "振动监测",
      "on": false
     },
     {
      "cid": "265",
      "name": "空气质量",
      "on": false
     },
     {
      "cid": "306",
      "name": "资产定位",
      "on": false
     }
    ],
    "products": [
     {
      "id": "282",
      "img": "product/products/282.png",
      "name": "倾斜传感器",
      "conn": "NB-IoT | 4G LTE | LoRa"
     }
    ]
   },
   "268": {
    "bannerImg": "product/list/banner-zh-1.jpg",
    "subcats": [
     {
      "cid": "261",
      "name": "全部",
      "on": false
     },
     {
      "cid": "263",
      "name": "温度监测",
      "on": false
     },
     {
      "cid": "262",
      "name": "压力监测",
      "on": false
     },
     {
      "cid": "269",
      "name": "土壤监测",
      "on": false
     },
     {
      "cid": "268",
      "name": "液位监测",
      "on": true
     },
     {
      "cid": "267",
      "name": "倾斜监测",
      "on": false
     },
     {
      "cid": "266",
      "name": "距离监测",
      "on": false
     },
     {
      "cid": "271",
      "name": "振动监测",
      "on": false
     },
     {
      "cid": "265",
      "name": "空气质量",
      "on": false
     },
     {
      "cid": "306",
      "name": "资产定位",
      "on": false
     }
    ],
    "products": [
     {
      "id": "281",
      "img": "product/products/281.png",
      "name": "液位传感器",
      "conn": "NB-IoT | 4G LTE | LoRa"
     }
    ]
   },
   "269": {
    "bannerImg": "product/list/banner-zh-1.jpg",
    "subcats": [
     {
      "cid": "261",
      "name": "全部",
      "on": false
     },
     {
      "cid": "263",
      "name": "温度监测",
      "on": false
     },
     {
      "cid": "262",
      "name": "压力监测",
      "on": false
     },
     {
      "cid": "269",
      "name": "土壤监测",
      "on": true
     },
     {
      "cid": "268",
      "name": "液位监测",
      "on": false
     },
     {
      "cid": "267",
      "name": "倾斜监测",
      "on": false
     },
     {
      "cid": "266",
      "name": "距离监测",
      "on": false
     },
     {
      "cid": "271",
      "name": "振动监测",
      "on": false
     },
     {
      "cid": "265",
      "name": "空气质量",
      "on": false
     },
     {
      "cid": "306",
      "name": "资产定位",
      "on": false
     }
    ],
    "products": [
     {
      "id": "280",
      "img": "product/products/280.png",
      "name": "土壤传感器",
      "conn": "NB-IoT | 4G LTE | LoRa"
     }
    ]
   },
   "271": {
    "bannerImg": "product/list/banner-zh-1.jpg",
    "subcats": [
     {
      "cid": "261",
      "name": "全部",
      "on": false
     },
     {
      "cid": "263",
      "name": "温度监测",
      "on": false
     },
     {
      "cid": "262",
      "name": "压力监测",
      "on": false
     },
     {
      "cid": "269",
      "name": "土壤监测",
      "on": false
     },
     {
      "cid": "268",
      "name": "液位监测",
      "on": false
     },
     {
      "cid": "267",
      "name": "倾斜监测",
      "on": false
     },
     {
      "cid": "266",
      "name": "距离监测",
      "on": false
     },
     {
      "cid": "271",
      "name": "振动监测",
      "on": true
     },
     {
      "cid": "265",
      "name": "空气质量",
      "on": false
     },
     {
      "cid": "306",
      "name": "资产定位",
      "on": false
     }
    ],
    "products": [
     {
      "id": "284",
      "img": "product/products/284.png",
      "name": "振动传感器",
      "conn": "NB-IoT | 4G LTE | LoRa"
     }
    ]
   },
   "272": {
    "bannerImg": "product/list/banner-zh-4.jpg",
    "subcats": [
     {
      "cid": "258",
      "name": "全部",
      "on": false
     },
     {
      "cid": "272",
      "name": "室内",
      "on": true
     },
     {
      "cid": "273",
      "name": "室外",
      "on": false
     }
    ],
    "products": [
     {
      "id": "276",
      "img": "product/products/276.png",
      "name": "室内",
      "conn": "LoRa | 4G LTE | Ethernet"
     }
    ]
   },
   "273": {
    "bannerImg": "product/list/banner-zh-4.jpg",
    "subcats": [
     {
      "cid": "258",
      "name": "全部",
      "on": false
     },
     {
      "cid": "272",
      "name": "室内",
      "on": false
     },
     {
      "cid": "273",
      "name": "室外",
      "on": true
     }
    ],
    "products": [
     {
      "id": "275",
      "img": "product/products/275.png",
      "name": "户外",
      "conn": "LoRa | 4G LTE | Ethernet"
     }
    ]
   },
   "274": {
    "bannerImg": "product/list/banner-zh-3.jpg",
    "subcats": [
     {
      "cid": "257",
      "name": "全部",
      "on": false
     },
     {
      "cid": "275",
      "name": "气象",
      "on": false
     },
     {
      "cid": "274",
      "name": "水文",
      "on": true
     }
    ],
    "products": [
     {
      "id": "277",
      "img": "product/products/277.png",
      "name": "水文",
      "conn": "多参数 | 实时传 | 易部署"
     }
    ]
   },
   "275": {
    "bannerImg": "product/list/banner-zh-3.jpg",
    "subcats": [
     {
      "cid": "257",
      "name": "全部",
      "on": false
     },
     {
      "cid": "275",
      "name": "气象",
      "on": true
     },
     {
      "cid": "274",
      "name": "水文",
      "on": false
     }
    ],
    "products": [
     {
      "id": "278",
      "img": "product/products/278.png",
      "name": "气象",
      "conn": "多参数 | 实时传 | 易部署"
     }
    ]
   },
   "278": {
    "bannerImg": "product/list/banner-zh-2.png",
    "subcats": [
     {
      "cid": "256",
      "name": "全部",
      "on": false
     },
     {
      "cid": "278",
      "name": "软件",
      "on": true
     },
     {
      "cid": "279",
      "name": "硬件",
      "on": false
     }
    ],
    "products": [
     {
      "id": "",
      "img": "product/products/custom-1.png",
      "name": "数字大屏",
      "conn": "定制数字孪生和地理信息系统全面、动态和多维的数据展示"
     },
     {
      "id": "",
      "img": "product/products/custom-2.png",
      "name": "云平台定制",
      "conn": "定制平台常用于指挥中心、监控室、数据中心等场景"
     },
     {
      "id": "",
      "img": "product/products/custom-3.png",
      "name": "嵌入式软件",
      "conn": "满足特定应用需求的各类传感器、控制器嵌入式软体开发"
     }
    ]
   },
   "279": {
    "bannerImg": "product/list/banner-zh-2.png",
    "subcats": [
     {
      "cid": "256",
      "name": "全部",
      "on": false
     },
     {
      "cid": "278",
      "name": "软件",
      "on": false
     },
     {
      "cid": "279",
      "name": "硬件",
      "on": true
     }
    ],
    "products": [
     {
      "id": "",
      "img": "product/products/custom-4.png",
      "name": "硬件定制",
      "conn": "满足特定应用需求的各类传感器、控制器硬件或智能终端开发"
     },
     {
      "id": "287",
      "img": "product/products/287.png",
      "name": "防爆隔离器",
      "conn": "防爆 | 2.4 GHz | 5.8 GHz"
     },
     {
      "id": "286",
      "img": "product/products/286.png",
      "name": "防爆温压",
      "conn": "防爆 | 4G通信 | 温压一体"
     }
    ]
   },
   "306": {
    "bannerImg": "product/list/banner-zh-1.jpg",
    "subcats": [
     {
      "cid": "261",
      "name": "全部",
      "on": false
     },
     {
      "cid": "263",
      "name": "温度监测",
      "on": false
     },
     {
      "cid": "262",
      "name": "压力监测",
      "on": false
     },
     {
      "cid": "269",
      "name": "土壤监测",
      "on": false
     },
     {
      "cid": "268",
      "name": "液位监测",
      "on": false
     },
     {
      "cid": "267",
      "name": "倾斜监测",
      "on": false
     },
     {
      "cid": "266",
      "name": "距离监测",
      "on": false
     },
     {
      "cid": "271",
      "name": "振动监测",
      "on": false
     },
     {
      "cid": "265",
      "name": "空气质量",
      "on": false
     },
     {
      "cid": "306",
      "name": "资产定位",
      "on": true
     }
    ],
    "products": [
     {
      "id": 304,
      "name": "资产定位终端",
      "conn": "GPS | 北斗 | 4G LTE",
      "img": "product/products/304.png"
     }
    ]
   }
  },
  "details": {
   "270": {
    "series": "H系列 · 温度传感器",
    "tagline": "高精度 | 宽量程 | 超低功耗",
    "desc": "宏太温度传感器具备远程监测、告警预警及高精度测量，确保温度数据的及时性与可靠性，适应多种应用场景。",
    "heroImg": "product/details/270-hero.png",
    "pdf": "/downloads/temperature-sensor-datasheet.pdf",
     "crumbCat": "温度监测",
    "returnCid": "263",
    "features": [
     {
      "icon": "product/details/270-f1.png",
      "text": "精度±0.5°C （±0.1°C支持定制）"
     },
     {
      "icon": "product/details/270-f2.png",
      "text": "IP68高防护等级"
     },
     {
      "icon": "product/details/270-f3.png",
      "text": "宽量程-200°C ~ +800°C"
     },
     {
      "icon": "product/details/270-f4.png",
      "text": "支持NFC 激活添加维护设备"
     },
     {
      "icon": "product/details/270-f5.png",
      "text": "低能耗技术，长时间运行而无需频繁更换电池"
     },
     {
      "icon": "product/details/270-f6.png",
      "text": "支持多种无线通讯技术4G / NB / LoRa"
     },
     {
      "icon": "product/details/270-f7.png",
      "text": "远程读取温度数据在任何地点进行监控"
     },
     {
      "icon": "product/details/270-f8.png",
      "text": "智能报警，超预设范围时自动发送警报到指定的用户"
     }
    ],
    "specsTitle": "技术参数",
    "specsDesc": "持续创新，采用微功耗处理器与算法优化，实现物联传感器长达10年的稳定运行，减少维护成本。",
    "specs": [
     [
      "产品型号",
      "H200/H300/H500"
     ],
     [
      "测量范围",
      "-200°C到800°C可定制"
     ],
     [
      "测量精度",
      "±0.5°C（0.1°C可定制）"
     ],
     [
      "通讯协议",
      "MQTT"
     ],
     [
      "接线方式",
      "三线制"
     ],
     [
      "工作频段",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "电池寿命",
      "按1小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     ],
     [
      "安装方式",
      "挂耳·抱杆·卡槽"
     ]
    ],

    "specsStructured": [
     {
      "name": "产品型号",
      "value": "H200/H300/H500"
     },
     {
      "name": "测量范围",
      "value": "-200°C到800°C可定制",
      "minValue": -200.0,
      "maxValue": 800.0
     },
     {
      "name": "测量精度",
      "value": "±0.5°C（0.1°C可定制）",
      "unitText": "摄氏度"
     },
     {
      "name": "通讯协议",
      "value": "MQTT"
     },
     {
      "name": "接线方式",
      "value": "三线制"
     },
     {
      "name": "工作频段",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "电池寿命",
      "value": "按1小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     },
     {
      "name": "安装方式",
      "value": "挂耳·抱杆·卡槽"
     }
    ],    "certImgs": [],
    "scenariosHeading": "应用行业",
    "scenarios": [
     {
      "img": "product/details/270-scen1.jpg",
      "label": "智慧能源"
     },
     {
      "img": "product/details/270-scen2.jpg",
      "label": "智慧农业"
     },
     {
      "img": "product/details/270-scen3.jpg",
      "label": "数据中心"
     },
     {
      "img": "product/details/270-scen4.jpg",
      "label": "医疗监测"
     },
     {
      "img": "product/details/270-scen5.jpg",
      "label": "食品加工"
     },
     {
      "img": "product/details/270-scen6.jpg",
      "label": "智慧工业"
     },
     {
      "img": "product/details/270-scen7.jpg",
      "label": "游乐场"
     }
    ],
    "related": [
     "274",
     "280",
     "281",
     "282",
     "283",
     "284",
     "285",
     "276",
     "275"
    ],
    "summary": "宏太 H 系列温度传感器是一款无线工业测温终端，量程覆盖 -200℃ 至 800℃，标准精度 ±0.5℃（可定制 ±0.1℃），1 小时上报周期下电池续航超 10 年，通过 4G / NB-IoT 经 MQTT 上报至宏太云或客户私有平台。",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "数据中心与机房",
      "desc": "跟踪机柜进风与室温，防止过热宕机。",
      "img": "product/details/270-scen3.jpg"
     },
     {
      "name": "冷库与食品加工",
      "desc": "让冷库、速冻与加工线保持在安全温度区间，满足 HACCP 要求。",
      "img": "product/details/270-scen5.jpg"
     },
     {
      "name": "医药与实验室",
      "desc": "看守存放疫苗、血液与试剂的冰箱、培养箱和洁净室。",
      "img": "product/details/270-scen4.jpg"
     },
     {
      "name": "大棚与畜禽养殖",
      "desc": "监测棚室温度，服务作物产量与动物福利。",
      "img": "product/details/270-scen2.jpg"
     },
     {
      "name": "工业过程监测",
      "desc": "测量产线管路、锅炉与设备表面温度。",
      "img": "product/details/270-scen6.jpg"
     },
     {
      "name": "能源设施",
      "desc": "监测变压器、电池室与变电站机柜的过温风险。",
      "img": "product/details/270-scen1.jpg"
     },
     {
      "name": "公共场馆",
      "desc": "监测游乐园等人流密集场所的室内温度。",
      "img": "product/details/270-scen7.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "这款温度传感器的量程和精度是多少？",
      "a": "标准量程 -200℃ 至 800℃，精度 ±0.5℃；如有更高要求可定制 ±0.1℃。三线制探头接线在强电磁干扰的工厂环境下也能保持读数稳定。"
     },
     {
      "q": "电池能用多久？",
      "a": "1 小时上报周期下电池续航超 10 年，全程电池供电，现场无需布线。"
     },
     {
      "q": "数据怎么上报？",
      "a": "通过 4G 或 NB-IoT 以 MQTT 协议上报至宏太云、客户云平台或私有化部署；温度越限时自动推送告警。"
     },
     {
      "q": "可以按我们的工况定制吗？",
      "a": "可以。精度、探头杆长与线缆、上报周期和外壳均支持 OEM/ODM 定制，欢迎提供工况参数联系销售评估。"
     }
    ],
    "dateModified": "2026-08-30"
   },
   "274": {
    "series": "H系列 · 压力传感器",
    "tagline": "抗冲击 | 低功耗 | 远程监控",
    "desc": "宏太压力传感器以其持续的精准测量能力，确保关键压力数据的精准上报云平台，适用于各种复杂工业应用环境。",
    "heroImg": "product/details/274-hero.png",
    "pdf": "/downloads/h300-pressure-sensor-datasheet.pdf",
     "crumbCat": "压力监测",
    "returnCid": "262",
    "features": [
     {
      "icon": "product/details/274-f1.png",
      "text": "±0.5% FS（高精度定制）"
     },
     {
      "icon": "product/details/274-f2.png",
      "text": "IP68防水防尘适用于恶劣环境"
     },
     {
      "icon": "product/details/274-f3.png",
      "text": "支持OTA，远程升级"
     },
     {
      "icon": "product/details/274-f4.png",
      "text": "支持NFC 激活添加维护设备"
     },
     {
      "icon": "product/details/274-f5.png",
      "text": "低能耗技术，长时间运行而无需频繁更换电池"
     },
     {
      "icon": "product/details/274-f6.png",
      "text": "支持多种无线通讯技术4G / NB / LoRa"
     },
     {
      "icon": "product/details/274-f7.png",
      "text": "远程读取压力数据在任何地点进行监控"
     },
     {
      "icon": "product/details/274-f8.png",
      "text": "智能报警，超预设范围时自动发送警报到指定的用户"
     }
    ],
    "specsTitle": "技术参数",
    "specsDesc": "通过集成通信和传感技术及嵌入式节能算法，确保压力传感器不仅具备超长使用寿命，还能维持高度的测量稳定性，从而增强整个监测系统的可靠性。",
    "specs": [
     [
      "产品型号",
      "H200/H300/H500"
     ],
     [
      "量程",
      "0–1 / 1.6 / 3.5 / 7 / 10 / 20 MPa"
     ],
     [
      "过载",
      "≤ 2 倍满量程压力"
     ],
     [
      "稳定性",
      "±0.2% FS/ 年"
     ],
     [
      "通信协议",
      "MQTT"
     ],
     [
      "工作温度",
      "-20℃～ 80℃"
     ],
     [
      "贮存温度",
      "-20℃～ 85℃"
     ],
     [
      "电池寿命",
      "按1小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     ],
     [
      "安装方式",
      "挂耳·抱杆·卡槽"
     ]
    ],

    "specsStructured": [
     {
      "name": "产品型号",
      "value": "H200/H300/H500"
     },
     {
      "name": "量程",
      "value": "0–1 / 1.6 / 3.5 / 7 / 10 / 20 MPa"
     },
     {
      "name": "过载",
      "value": "≤ 2 倍满量程压力"
     },
     {
      "name": "稳定性",
      "value": "±0.2% FS/ 年",
      "unitText": "百分比"
     },
     {
      "name": "通信协议",
      "value": "MQTT"
     },
     {
      "name": "工作温度",
      "value": "-20℃～ 80℃",
      "minValue": -20.0,
      "maxValue": 80.0
     },
     {
      "name": "贮存温度",
      "value": "-20℃～ 85℃",
      "minValue": -20.0,
      "maxValue": 85.0
     },
     {
      "name": "电池寿命",
      "value": "按1小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     },
     {
      "name": "安装方式",
      "value": "挂耳·抱杆·卡槽"
     }
    ],    "certImgs": [],
    "scenariosHeading": "应用行业",
    "scenarios": [
     {
      "img": "product/details/274-scen1.jpg",
      "label": "化工行业"
     },
     {
      "img": "product/details/274-scen2.jpg",
      "label": "半导体行业"
     },
     {
      "img": "product/details/274-scen3.jpg",
      "label": "智慧楼宇"
     },
     {
      "img": "product/details/274-scen4.jpg",
      "label": "智慧工业"
     },
     {
      "img": "product/details/274-scen5.jpg",
      "label": "科学实验"
     },
     {
      "img": "product/details/274-scen6.jpg",
      "label": "智慧农业"
     },
     {
      "img": "product/details/274-scen7.jpg",
      "label": "铁塔监测"
     },
     {
      "img": "product/details/274-scen8.jpg",
      "label": "地质勘查"
     }
    ],
    "related": [
     "270",
     "280",
     "281",
     "282",
     "283",
     "284",
     "285",
     "276",
     "275"
    ],
    "summary": "宏太 H 系列压力传感器是面向管路、泵站与储罐的无线压力变送终端：量程 0-1MPa 至 20MPa 多档可选，年稳定性 ±0.2% FS，抗 2 倍过载，4G / NB-IoT 上报，电池续航超 10 年。",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "供水与泵站",
      "desc": "监测管网压力，尽早发现爆管、渗漏与水泵故障。",
      "img": "product/details/281-scen1.jpg"
     },
     {
      "name": "化工园区",
      "desc": "在改造成本高的场合替代有线变送器，跟踪工艺管线压力。",
      "img": "product/details/274-scen1.jpg"
     },
     {
      "name": "楼宇二次供水",
      "desc": "监测高层增压泵与立管压力。",
      "img": "product/details/274-scen3.jpg"
     },
     {
      "name": "半导体工厂",
      "desc": "以稳定低漂移读数监测特气与动力管线。",
      "img": "product/details/274-scen2.jpg"
     },
     {
      "name": "工业液压",
      "desc": "跟踪液压机与设备压力曲线，服务预测性维护。",
      "img": "product/details/274-scen4.jpg"
     },
     {
      "name": "储罐容器",
      "desc": "压位结合，服务库存与安全控制。",
      "img": "product/details/287-scen3.jpg"
     },
     {
      "name": "地质勘探",
      "desc": "电池供电的远程钻孔压力记录，无需布线。",
      "img": "product/details/274-scen8.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "有哪些量程可选？",
      "a": "标准量程 0-1MPa、1.6MPa、3.5MPa、7MPa、10MPa、20MPa 多档；可承受 2 倍满量程过载，年稳定性 ±0.2% FS。"
     },
     {
      "q": "气体和液体都能测吗？",
      "a": "标准款适用于与过程接头兼容的常见气液介质；腐蚀性或特殊介质请联系宏太确认接液材质。"
     },
     {
      "q": "读数怎么上报？",
      "a": "经 4G 或 NB-IoT 以 MQTT 无线上报至宏太云、客户云或私有化部署，支持阈值配置与告警。"
     },
     {
      "q": "现场需要什么供电？",
      "a": "不需要。内置电池在 1 小时上报周期下可用超 10 年，变送器可安装在布线困难的点位。"
     }
    ],
    "dateModified": "2026-08-30"
   },
   "280": {
    "series": "H系列 · 土壤传感器",
    "tagline": "多参数 | 精准测 | 超低功耗",
    "desc": "宏太土壤传感器，集成多参数监测、定时数据同步及精确测量技术，确保土壤质量的全面评估与持续监控，适用于各类农业需求。",
    "heroImg": "product/details/280-hero.png",
    "pdf": "/downloads/h300-soil-sensor-datasheet.pdf",
     "crumbCat": "土壤监测",
    "returnCid": "269",
    "features": [
     {
      "icon": "product/details/280-f1.png",
      "text": "监测氮、磷、钾等关键营养元素"
     },
     {
      "icon": "product/details/280-f2.png",
      "text": "IP68高防护等级"
     },
     {
      "icon": "product/details/280-f3.png",
      "text": "监测土壤水分含量，灌溉管理"
     },
     {
      "icon": "product/details/280-f4.png",
      "text": "支持NFC 激活添加维护设备"
     },
     {
      "icon": "product/details/280-f5.png",
      "text": "支持OTA，远程升级"
     },
     {
      "icon": "product/details/280-f6.png",
      "text": "支持多种无线通讯技术4G / NB / LoRa"
     },
     {
      "icon": "product/details/280-f7.png",
      "text": "远程读取土壤数据在任何地点进行监控"
     },
     {
      "icon": "product/details/280-f8.png",
      "text": "智能报警，超预设范围时自动发送警报到指定的用户"
     }
    ],
    "specsTitle": "技术参数",
    "specsDesc": "采用先进的智能算法优化和持续数据记录功能，加上其在极端环境下的适应能力，持续跟踪和精确分析土壤状况，有效应对复杂的农业挑战，提升农作物产出效率。",
    "specs": [
     [
      "产品型号",
      "H200/H300/H500"
     ],
     [
      "电导率",
      "0–1,000 µS/cm（±3%）"
     ],
     [
      "pH",
      "0–14 pH（0.01 pH 分辨率）"
     ],
     [
      "土壤水分",
      "0–100%（±3%，不适宜冻土层）"
     ],
     [
      "NPK",
      "0–1,999 mg/kg（±2% FS）"
     ],
     [
      "通讯协议",
      "MQTT"
     ],
     [
      "工作频段",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "电池寿命",
      "按1小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     ],
     [
      "安装方式",
      "挂耳·抱杆·卡槽"
     ]
    ],

    "specsStructured": [
     {
      "name": "产品型号",
      "value": "H200/H300/H500"
     },
     {
      "name": "电导率",
      "value": "0–1,000 µS/cm（±3%）",
      "minValue": 0.0,
      "maxValue": 1000.0
     },
     {
      "name": "pH",
      "value": "0–14 pH（0.01 pH 分辨率）"
     },
     {
      "name": "土壤水分",
      "value": "0–100%（±3%，不适宜冻土层）",
      "minValue": 0.0,
      "maxValue": 100.0
     },
     {
      "name": "NPK",
      "value": "0–1,999 mg/kg（±2% FS）",
      "minValue": 0.0,
      "maxValue": 1999.0
     },
     {
      "name": "通讯协议",
      "value": "MQTT"
     },
     {
      "name": "工作频段",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "电池寿命",
      "value": "按1小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     },
     {
      "name": "安装方式",
      "value": "挂耳·抱杆·卡槽"
     }
    ],    "certImgs": [],
    "scenariosHeading": "应用行业",
    "scenarios": [
     {
      "img": "product/details/280-scen1.jpg",
      "label": "农田"
     },
     {
      "img": "product/details/280-scen2.jpg",
      "label": "温室"
     },
     {
      "img": "product/details/280-scen3.jpg",
      "label": "城市公园"
     },
     {
      "img": "product/details/280-scen4.jpg",
      "label": "土壤污染"
     },
     {
      "img": "product/details/280-scen5.jpg",
      "label": "森林健康"
     },
     {
      "img": "product/details/280-scen6.jpg",
      "label": "实验室"
     }
    ],
    "related": [
     "270",
     "274",
     "281",
     "282",
     "283",
     "284",
     "285",
     "276",
     "275"
    ],
    "summary": "宏太 H 系列土壤传感器是一支多参数无线探头：单台设备同步测量土壤水分、温度、电导率（EC）、pH 与氮磷钾（NPK）养分，经 4G / NB-IoT 上报，IP68 防护可长期埋地，电池续航超 10 年。",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "农田灌溉调度",
      "desc": "土壤水分趋势指导何时灌、灌多少，减少水资源浪费。",
      "img": "product/details/280-scen1.jpg"
     },
     {
      "name": "大棚水肥一体化",
      "desc": "EC 与 NPK 读数指导施肥量，让养分留在根区而不是流失。",
      "img": "product/details/280-scen2.jpg"
     },
     {
      "name": "城市园林",
      "desc": "监测草坪与树坑土壤墒情，服务市政绿化养护。",
      "img": "product/details/280-scen3.jpg"
     },
     {
      "name": "土壤污染与修复跟踪",
      "desc": "连续 pH 与电导率记录标记污染扩散并验证修复进度。",
      "img": "product/details/280-scen4.jpg"
     },
     {
      "name": "林草健康",
      "desc": "长期埋设探头在树冠可见衰退前捕捉土壤干旱胁迫。",
      "img": "product/details/280-scen5.jpg"
     },
     {
      "name": "科研与田间试验",
      "desc": "多参数时间序列支撑农艺研究与品种试验。",
      "img": "product/details/280-scen6.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "H 系列土壤传感器能测哪些参数？",
      "a": "土壤水分（0-100%，±3%）、温度、电导率（0-1000µS/cm，±3%）、pH（0-14）与氮磷钾养分（0-1999mg/kg，±2% F.S），单支探头一次测全。"
     },
     {
      "q": "探头可以常年埋在户外吗？",
      "a": "可以。IP68 外壳为长期埋地设计，1 小时上报周期下电池续航超 10 年，季与季之间无需维护。"
     },
     {
      "q": "数据怎么传输？",
      "a": "经 4G 或 NB-IoT 以 MQTT 上报至宏太云或私有平台；任一参数越限即触发告警。"
     },
     {
      "q": "盐碱地能用吗？",
      "a": "电导率量程 0-1000µS/cm 覆盖大多数农田；高盐碱土壤或特殊介质请联系宏太定制量程。"
     }
    ],
    "dateModified": "2026-08-30"
   },
   "281": {
    "series": "H系列 · 液位传感器",
    "tagline": "高精度 | 宽量程 | 超低功耗",
    "desc": "宏太液位传感器具备精确监测、定时反馈及高稳定性，确保液位数据的准确性与连续性，适应多种工业环境。",
    "heroImg": "product/details/281-hero.png",
    "pdf": "/downloads/liquid-level-sensor-datasheet.pdf",
    "crumbCat": "液位监测",
    "returnCid": "268",
    "features": [
     {
      "icon": "product/details/281-f1.png",
      "text": "±0.5% FS（高精度定制）"
     },
     {
      "icon": "product/details/281-f2.png",
      "text": "IP68高防护等级"
     },
     {
      "icon": "product/details/281-f3.png",
      "text": "宽量程 0–200 m（可定制）"
     },
     {
      "icon": "product/details/281-f4.png",
      "text": "支持NFC 激活添加维护设备"
     },
     {
      "icon": "product/details/281-f5.png",
      "text": "支持OTA，远程升级"
     },
     {
      "icon": "product/details/281-f6.png",
      "text": "支持多种无线通讯技术4G / NB / LoRa"
     },
     {
      "icon": "product/details/281-f7.png",
      "text": "远程读取液位数据在任何地点进行监控"
     },
     {
      "icon": "product/details/281-f8.png",
      "text": "智能报警，超预设范围时自动发送警报到指定的用户"
     }
    ],
    "specsTitle": "技术参数",
    "specsDesc": "通过其整合感知技术、即时通信功能和节能设计，保证液位数据的准确性和连续性，使其能够适应从水处理设施到化工生产线的多种工业应用场景。",
    "specs": [
     [
      "产品型号",
      "H200/H300/H500"
     ],
     [
      "量程",
      "0–200 m（支持定制）"
     ],
     [
      "精度",
      "±0.5% FS（更高精度定制）"
     ],
     [
      "稳定性",
      "±0.2% FS/ 年"
     ],
     [
      "通信协议",
      "MQTT"
     ],
     [
      "工作温度",
      "-20℃～ 70℃"
     ],
     [
      "贮存温度",
      "-20℃～ 80℃"
     ],
     [
      "电池寿命",
      "按1小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     ],
     [
      "安装方式",
      "挂耳·抱杆·卡槽"
     ]
    ],

    "specsStructured": [
     {
      "name": "产品型号",
      "value": "H200/H300/H500"
     },
     {
      "name": "量程",
      "value": "0–200 m（支持定制）",
      "minValue": 0.0,
      "maxValue": 200.0
     },
     {
      "name": "精度",
      "value": "±0.5% FS（更高精度定制）",
      "unitText": "百分比"
     },
     {
      "name": "稳定性",
      "value": "±0.2% FS/ 年",
      "unitText": "百分比"
     },
     {
      "name": "通信协议",
      "value": "MQTT"
     },
     {
      "name": "工作温度",
      "value": "-20℃～ 70℃",
      "minValue": -20.0,
      "maxValue": 70.0
     },
     {
      "name": "贮存温度",
      "value": "-20℃～ 80℃",
      "minValue": -20.0,
      "maxValue": 80.0
     },
     {
      "name": "电池寿命",
      "value": "按1小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     },
     {
      "name": "安装方式",
      "value": "挂耳·抱杆·卡槽"
     }
    ],    "certImgs": [],
    "scenariosHeading": "应用行业",
    "scenarios": [
     {
      "img": "product/details/281-scen1.jpg",
      "label": "城市供排水"
     },
     {
      "img": "product/details/281-scen2.jpg",
      "label": "海洋和船舶"
     },
     {
      "img": "product/details/281-scen3.jpg",
      "label": "水文"
     },
     {
      "img": "product/details/281-scen4.jpg",
      "label": "冶金"
     },
     {
      "img": "product/details/281-scen5.jpg",
      "label": "医疗废水"
     },
     {
      "img": "product/details/281-scen6.jpg",
      "label": "电厂"
     },
     {
      "img": "product/details/281-scen7.jpg",
      "label": "矿山"
     },
     {
      "img": "product/details/281-scen8.jpg",
      "label": "智慧能源"
     }
    ],
    "related": [
     "270",
     "274",
     "280",
     "282",
     "283",
     "284",
     "285",
     "276",
     "275"
    ],
    "summary": "宏太 H 系列液位传感器是面向水库、河道、储罐与井道的无线液位变送终端：量程 0-200 米可定制，精度 ±0.5% FS，年稳定性 ±0.2% FS，电池续航超 10 年，经 4G / NB-IoT 上报液位数据。",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "水库与大坝",
      "desc": "连续水位记录，服务防汛调度决策。",
      "img": "solution/67-scen-0.jpg"
     },
     {
      "name": "河道水文站",
      "desc": "无市电的远程河道水位监测。",
      "img": "product/details/281-scen3.jpg"
     },
     {
      "name": "供排水系统",
      "desc": "水塔、清水池与管网水库液位，服务水务运营。",
      "img": "product/details/281-scen1.jpg"
     },
     {
      "name": "工业储罐",
      "desc": "电厂、冶金工艺罐的库存液位。",
      "img": "product/details/287-scen3.jpg"
     },
     {
      "name": "矿山涌水管理",
      "desc": "监测水仓与井下水位，服务矿山安全。",
      "img": "product/details/281-scen7.jpg"
     },
     {
      "name": "船舶与海洋",
      "desc": "压载舱与舱底液位监测，电池供电免布线。",
      "img": "product/details/281-scen2.jpg"
     },
     {
      "name": "医疗废水",
      "desc": "跟踪医院废水站集水池液位。",
      "img": "product/details/281-scen5.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "H 系列液位传感器的量程是多少？",
      "a": "标准 0-200 米，超出可定制；精度 ±0.5% FS，年稳定性 ±0.2% FS，适合长期无人值守监测。"
     },
     {
      "q": "偏远站点怎么供电？",
      "a": "内置电池供电——1 小时上报周期下续航超 10 年，水库与河道站点无需太阳能板或电缆。"
     },
     {
      "q": "液位数据怎么获取？",
      "a": "经 4G 或 NB-IoT 以 MQTT 上报至宏太云或客户自有平台，支持高低液位报警。"
     },
     {
      "q": "能按我们的罐体或井道定制吗？",
      "a": "可以。量程、探头缆长与安装方式均可按现场适配；提供图纸或现场照片给宏太销售即可匹配配置。"
     }
    ],
    "dateModified": "2026-08-30"
   },
   "282": {
    "series": "H系列 · 倾斜传感器",
    "tagline": "高精度 | 多轴测 | 超低功耗",
    "desc": "宏太倾斜传感器整合超高精度传感器、具备远程监测、实时警报及高精度测量，确保倾斜数据的准确性和及时性，适应各种复杂工业应用场景。",
    "heroImg": "product/details/282-hero.png",
    "pdf": "/downloads/h310-ts180c-tilt-sensor-datasheet.pdf",
     "crumbCat": "倾斜监测",
    "returnCid": "267",
    "features": [
     {
      "icon": "product/details/282-f1.png",
      "text": "精度±0.005°（支持定制）"
     },
     {
      "icon": "product/details/282-f2.png",
      "text": "IP68高防护等级"
     },
     {
      "icon": "product/details/282-f3.png",
      "text": "分辨率 0.001°"
     },
     {
      "icon": "product/details/282-f4.png",
      "text": "支持NFC 激活添加维护设备"
     },
     {
      "icon": "product/details/282-f5.png",
      "text": "支持OTA, 远程升级"
     },
     {
      "icon": "product/details/282-f6.png",
      "text": "支持多种无线通讯技术4G / NB / LoRa"
     },
     {
      "icon": "product/details/282-f7.png",
      "text": "远程读取角度数据在任何地点进行监控"
     },
     {
      "icon": "product/details/282-f8.png",
      "text": "智能报警，超预设范围时自动发送警报到指定的用户"
     }
    ],
    "specsTitle": "技术参数",
    "specsDesc": "采用高灵敏度传感器、实时数据同步及坚固耐用结构，确保倾角监测的精准无误和持久性。优化设计实现长达10年的稳定运行，显著减少维护成本。",
    "specs": [
     [
      "产品型号",
      "H200/H300/H500"
     ],
     [
      "测量范围",
      "X轴·Y轴（三轴定制）"
     ],
     [
      "精度",
      "±0.005°（支持定制）"
     ],
     [
      "分辨率",
      "0.001°"
     ],
     [
      "通信协议",
      "MQTT"
     ],
     [
      "工作温度",
      "-20℃～ 70℃"
     ],
     [
      "贮存温度",
      "-20℃～ 80℃"
     ],
     [
      "电池寿命",
      "按1小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     ],
     [
      "安装方式",
      "挂耳·抱杆·卡槽"
     ]
    ],
    "certImgs": [],
    "scenariosHeading": "应用行业",
    "scenarios": [
     {
      "img": "product/details/282-scen1.jpg",
      "label": "桥梁倾斜和形变"
     },
     {
      "img": "product/details/282-scen2.jpg",
      "label": "存储货架"
     },
     {
      "img": "product/details/282-scen3.jpg",
      "label": "塔架倾斜"
     },
     {
      "img": "product/details/282-scen4.jpg",
      "label": "危房监测"
     },
     {
      "img": "product/details/282-scen5.jpg",
      "label": "太阳能跟踪"
     },
     {
      "img": "product/details/282-scen6.jpg",
      "label": "风力塔倾斜"
     },
     {
      "img": "product/details/282-scen7.jpg",
      "label": "楼宇倾斜"
     },
     {
      "img": "product/details/282-scen8.jpg",
      "label": "游乐场倾斜"
     }
    ],
    "related": [
     "270",
     "274",
     "280",
     "281",
     "283",
     "284",
     "285",
     "276",
     "275"
    ],
    "summary": "宏太 H 系列倾斜传感器是面向结构健康监测的无线物联网倾角仪：X/Y 双轴测量（可选三轴），精度 ±0.005°、分辨率 0.001°，1 小时上报周期下电池续航超 10 年，IP68 防护等级适合长期户外无人值守部署，支持 4G、NB-IoT、LoRa 三种无线通信方式。",
    "sku": "H200/H300/H500",
    "specsStructured": [
     {
      "name": "产品型号",
      "value": "H200 / H300 / H500"
     },
     {
      "name": "测量轴向",
      "value": "X轴 · Y轴（可定制三轴）"
     },
     {
      "name": "精度",
      "value": "±0.005°",
      "unitText": "度"
     },
     {
      "name": "分辨率",
      "value": "0.001°",
      "unitText": "度"
     },
     {
      "name": "通信协议",
      "value": "MQTT"
     },
     {
      "name": "无线通信",
      "value": "4G / NB-IoT / LoRa"
     },
     {
      "name": "工作温度",
      "value": "-20℃ ～ 70℃",
      "minValue": -20,
      "maxValue": 70
     },
     {
      "name": "贮存温度",
      "value": "-20℃ ～ 80℃",
      "minValue": -20,
      "maxValue": 80
     },
     {
      "name": "电池寿命",
      "value": "＞10 年（1 小时上报周期）"
     },
     {
      "name": "防护等级",
      "value": "IP68"
     },
     {
      "name": "安装方式",
      "value": "挂耳 · 抱杆 · 卡槽"
     },
     {
      "name": "配置方式",
      "value": "NFC 激活；OTA 远程固件升级"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "applications": [
     {
      "name": "边坡稳定性监测",
      "desc": "在公路边坡、露天矿山和路堑堤坝失稳前，捕捉早期位移征兆。",
      "img": "product/details/281-scen7.jpg"
     },
     {
      "name": "铁路基础设施",
      "desc": "监测铁路沿线轨床沉降、挡土墙与接触网支柱的倾斜变化。"
     },
     {
      "name": "隧道监测",
      "desc": "施工期与运营期持续跟踪衬砌收敛和管片转动。"
     },
     {
      "name": "桥梁变形监测",
      "desc": "测量桥墩倾斜、主梁转角与支座位移，服务桥梁健康监测。",
      "img": "product/details/282-scen1.jpg"
     },
     {
      "name": "地铁与地下结构",
      "desc": "监测邻近基坑开挖引起的车站箱体挠度与盾构隧道变形。"
     },
     {
      "name": "工地与临时结构",
      "desc": "看守脚手架、塔吊、模板支撑与临时板房的不安全倾斜。"
     },
     {
      "name": "海堤与水坝",
      "desc": "对堤坝、海塘和水库边坡进行连续倾斜监测。",
      "img": "solution/67-scen-0.jpg"
     },
     {
      "name": "古建筑与古塔",
      "desc": "为禁止钻孔的文物保护建筑提供无损倾斜跟踪。",
      "img": "product/details/282-scen4.jpg"
     },
     {
      "name": "树木倾斜监测",
      "desc": "台风季前发现城市树木根系失效与倾斜发展趋势。",
      "img": "product/details/280-scen3.jpg"
     },
     {
      "name": "路灯杆监测",
      "desc": "发现车辆撞击或基础松动导致的市政灯杆倾斜。"
     },
     {
      "name": "输电塔监测",
      "desc": "监测输电线路铁塔的基础沉降与塔身倾斜。",
      "img": "product/details/282-scen3.jpg"
     },
     {
      "name": "通信塔监测",
      "desc": "跟踪通信桅杆垂直度与拉线塔对准状态。"
     },
     {
      "name": "仓储货架监测",
      "desc": "在叉车撞击导致垮塌前，检测货架立柱的挠度变形。",
      "img": "product/details/282-scen2.jpg"
     }
    ],
    "faqs": [
     {
      "q": "倾斜传感器可以监测哪些结构？",
      "a": "H 系列倾斜传感器可部署于边坡堤坝、铁路设施、隧道、桥梁、地铁结构、工地临时设施、海堤水坝、古建筑与古塔、城市树木、路灯杆、输电塔、通信塔和仓储货架等 13 类场景。IP68 防护与 10 年电池寿命，适合长期无人值守的户外安装。"
     },
     {
      "q": "这款倾斜传感器的精度是多少？",
      "a": "标准精度 ±0.005°、分辨率 0.001°，覆盖 X/Y 双轴；如需三轴配置或更高精度，可按项目需求定制。"
     },
     {
      "q": "电池能用多久？",
      "a": "在 1 小时上报周期下电池续航超过 10 年；上报越频繁，续航相应缩短。现场无需市电或太阳能板。"
     },
     {
      "q": "4G、NB-IoT、LoRa 三种通信方式怎么选？",
      "a": "蜂窝覆盖良好、需要远程固件升级的场合选 4G；隧道、地下室等对信号穿透要求高的场景选 NB-IoT；同一场地密集部署且有私有网关、不希望承担每台设备 SIM 卡费用时选 LoRa。"
     },
     {
      "q": "古建筑不允许钻孔，传感器怎么安装？",
      "a": "支持挂耳、抱杆、卡槽三种安装方式；保护建筑可采用抱箍或胶粘安装，不破坏建筑本体。具体安装方案可联系宏太获取现场指导。"
     }
    ],
    "dateModified": "2026-08-30"
   },
   "283": {
    "series": "H系列 · 高精度测距",
    "tagline": "精准 | 毫米级 | 超低功耗",
    "desc": "宏太测距传感器具备毫米级精确测量、定时数据采集及强大抗干扰性，确保测距数据的精确性并及时上云，适用于各种复杂环境。",
    "heroImg": "product/details/283-hero.png",
    "pdf": "/downloads/h310-mw012-radar-distance-sensor-datasheet.pdf",
     "crumbCat": "距离监测",
    "returnCid": "266",
    "features": [
     {
      "icon": "product/details/283-f1.png",
      "text": "精度 ±1 mm（支持定制）"
     },
     {
      "icon": "product/details/283-f2.png",
      "text": "IP68高防护等级"
     },
     {
      "icon": "product/details/283-f3.png",
      "text": "宽量程 0.3–50 m（可定制）"
     },
     {
      "icon": "product/details/283-f4.png",
      "text": "支持NFC 激活添加维护设备"
     },
     {
      "icon": "product/details/283-f5.png",
      "text": "支持OTA，远程升级"
     },
     {
      "icon": "product/details/283-f6.png",
      "text": "支持多种无线通讯技术4G / NB / LoRa"
     },
     {
      "icon": "product/details/283-f7.png",
      "text": "远程读取距离数据在任何地点进行监控"
     },
     {
      "icon": "product/details/283-f8.png",
      "text": "智能报警，超预设范围时自动发送警报到指定的用户"
     }
    ],
    "specsTitle": "技术参数",
    "specsDesc": "创新驱动，雷达高精度测距传感器结合先进的微功耗处理器和嵌入式算法优化，实现长达10年的持久稳定运行，显著降低维护成本。",
    "specs": [
     [
      "产品型号",
      "H200/H300/H500"
     ],
     [
      "测量范围",
      "0.3–50 m（支持定制）"
     ],
     [
      "精度",
      "±1 mm（支持定制）"
     ],
     [
      "分辨率",
      "1 mm"
     ],
     [
      "通信协议",
      "MQTT"
     ],
     [
      "工作温度",
      "-20℃～ 70℃"
     ],
     [
      "贮存温度",
      "-20℃～ 80℃"
     ],
     [
      "电池寿命",
      "按1小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     ],
     [
      "安装方式",
      "挂耳·抱杆·卡槽"
     ]
    ],

    "specsStructured": [
     {
      "name": "产品型号",
      "value": "H200/H300/H500"
     },
     {
      "name": "测量范围",
      "value": "0.3–50 m（支持定制）",
      "minValue": 0.3,
      "maxValue": 50.0
     },
     {
      "name": "精度",
      "value": "±1 mm（支持定制）",
      "unitText": "毫米"
     },
     {
      "name": "分辨率",
      "value": "1 mm",
      "unitText": "毫米"
     },
     {
      "name": "通信协议",
      "value": "MQTT"
     },
     {
      "name": "工作温度",
      "value": "-20℃～ 70℃",
      "minValue": -20.0,
      "maxValue": 70.0
     },
     {
      "name": "贮存温度",
      "value": "-20℃～ 80℃",
      "minValue": -20.0,
      "maxValue": 80.0
     },
     {
      "name": "电池寿命",
      "value": "按1小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     },
     {
      "name": "安装方式",
      "value": "挂耳·抱杆·卡槽"
     }
    ],    "certImgs": [],
    "scenariosHeading": "应用行业",
    "scenarios": [
     {
      "img": "product/details/283-scen1.jpg",
      "label": "智慧井盖"
     },
     {
      "img": "product/details/283-scen2.jpg",
      "label": "粮仓高度"
     },
     {
      "img": "product/details/283-scen3.jpg",
      "label": "煤矿行业"
     },
     {
      "img": "product/details/283-scen4.jpg",
      "label": "智慧水厂"
     },
     {
      "img": "product/details/283-scen5.jpg",
      "label": "化工行业"
     },
     {
      "img": "product/details/283-scen6.jpg",
      "label": "智慧工业"
     },
     {
      "img": "product/details/283-scen7.jpg",
      "label": "智慧建筑"
     },
     {
      "img": "product/details/283-scen8.jpg",
      "label": "智慧能源"
     }
    ],
    "related": [
     "270",
     "274",
     "280",
     "281",
     "282",
     "284",
     "285",
     "276",
     "275"
    ],
    "summary": "宏太 H 系列测距传感器是毫米级精度的无线雷达测距终端：量程 0.3–50 米，精度 ±1 mm、分辨率 1 mm，抗干扰能力强，适应复杂工业现场，4G / NB-IoT 上报，按1小时上报间隔设计续航超10年。",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "井盖监测",
      "desc": "检测井盖位移与井内深度变化，服务市政安全。",
      "img": "product/details/283-scen1.jpg"
     },
     {
      "name": "粮仓料位",
      "desc": "测量粮面距离换算料位，掌握库存。",
      "img": "product/details/283-scen2.jpg"
     },
     {
      "name": "煤矿煤仓",
      "desc": "在粉尘潮湿的井下环境监测煤仓装填高度。",
      "img": "product/details/283-scen3.jpg"
     },
     {
      "name": "水厂与污水厂",
      "desc": "明渠与水池的距离测量，服务液位控制。",
      "img": "product/details/283-scen4.jpg"
     },
     {
      "name": "化工罐区",
      "desc": "对腐蚀性或密闭罐体做非接触式测距。",
      "img": "product/details/283-scen5.jpg"
     },
     {
      "name": "楼宇与物流",
      "desc": "场景占位、月台与托盘位置的测距感知。",
      "img": "product/details/283-scen7.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "量程和精度是多少？",
      "a": "量程 0.3–50 米（可定制），精度 ±1 mm、分辨率 1 mm，适合以距离换算料位与位移监测。"
     },
     {
      "q": "粉尘、潮湿会影响测量吗？",
      "a": "雷达测量本身针对粉尘潮湿现场做了抗干扰设计，IP68 外壳保护整机，煤仓、井下等环境均可稳定工作。"
     },
     {
      "q": "怎么供电和联网？",
      "a": "内置电池 1 小时上报可用 10 年以上，经 4G 或 NB-IoT 以 MQTT 接入宏太云或私有平台。"
     },
     {
      "q": "量程能超过 50 米吗？",
      "a": "可以，量程与安装方式支持定制；提供目标距离与介质信息，宏太将给出配置建议。"
     }
    ],
    "dateModified": "2026-08-30"
   },
   "284": {
    "series": "H系列 · 振动传感器",
    "tagline": "高精度 | 宽量程 | 超低功耗",
    "desc": "宏太振动传感器专为监测和分析机械设备振动而设计，是工业4.0环境中关键的组成部分。以预防故障并提高运行效率，为设备健康管理和维护提供强大技术支持。",
    "heroImg": "product/details/284-hero.png",
    "pdf": "/downloads/vibration-sensor-datasheet.pdf",
    "crumbCat": "振动监测",
    "returnCid": "271",
    "features": [
     {
      "icon": "product/details/284-f1.png",
      "text": "振动速度 0–100 mm/s（可定制）"
     },
     {
      "icon": "product/details/284-f2.png",
      "text": "IP68高防护等级"
     },
     {
      "icon": "product/details/284-f3.png",
      "text": "振幅 0–1,000 µm（可定制）"
     },
     {
      "icon": "product/details/284-f4.png",
      "text": "支持NFC 激活添加维护设备"
     },
     {
      "icon": "product/details/284-f5.png",
      "text": "支持OTA，远程升级"
     },
     {
      "icon": "product/details/284-f6.png",
      "text": "支持多种无线通讯技术4G / NB / LoRa"
     },
     {
      "icon": "product/details/284-f7.png",
      "text": "远程读取振动数据在任何地点进行监控"
     },
     {
      "icon": "product/details/284-f8.png",
      "text": "智能报警，超预设范围时自动发送警报到指定的用户"
     }
    ],
    "specsTitle": "技术参数",
    "specsDesc": "微功耗处理器和算法优化，确保传感器在每次极低能耗使用下保持10年长时间稳定运行，有效减少能源消耗及维护成本。",
    "specs": [
     [
      "产品型号",
      "H200/H300/H500"
     ],
     [
      "烈度",
      "0–100 mm/s (支持定制)"
     ],
     [
      "位移幅值",
      "0–1,000 µm（支持定制）"
     ],
     [
      "精度",
      "±1%（80 Hz 标定）"
     ],
     [
      "通信协议",
      "MQTT"
     ],
     [
      "工作温度",
      "-20℃～ 70℃"
     ],
     [
      "贮存温度",
      "-20℃～ 80℃"
     ],
     [
      "电池寿命",
      "按1小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     ],
     [
      "安装方式",
      "挂耳·抱杆·卡槽"
     ]
    ],

    "specsStructured": [
     {
      "name": "产品型号",
      "value": "H200/H300/H500"
     },
     {
      "name": "烈度",
      "value": "0–100 mm/s (支持定制)"
     },
     {
      "name": "位移幅值",
      "value": "0–1,000 µm（支持定制）"
     },
     {
      "name": "精度",
      "value": "±1%（80 Hz 标定）",
      "unitText": "百分比"
     },
     {
      "name": "通信协议",
      "value": "MQTT"
     },
     {
      "name": "工作温度",
      "value": "-20℃～ 70℃",
      "minValue": -20.0,
      "maxValue": 70.0
     },
     {
      "name": "贮存温度",
      "value": "-20℃～ 80℃",
      "minValue": -20.0,
      "maxValue": 80.0
     },
     {
      "name": "电池寿命",
      "value": "按1小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     },
     {
      "name": "安装方式",
      "value": "挂耳·抱杆·卡槽"
     }
    ],    "certImgs": [],
    "scenariosHeading": "应用行业",
    "scenarios": [
     {
      "img": "product/details/284-scen1.jpg",
      "label": "半导体设备"
     },
     {
      "img": "product/details/284-scen2.jpg",
      "label": "工业设备"
     },
     {
      "img": "product/details/284-scen3.jpg",
      "label": "船舶港口"
     },
     {
      "img": "product/details/284-scen4.jpg",
      "label": "智慧能源"
     },
     {
      "img": "product/details/284-scen5.jpg",
      "label": "智慧建筑"
     },
     {
      "img": "product/details/284-scen6.jpg",
      "label": "物流和运输"
     }
    ],
    "related": [
     "270",
     "274",
     "280",
     "281",
     "282",
     "283",
     "285",
     "276",
     "275"
    ],
    "summary": "宏太 H 系列振动传感器是面向工业 4.0 旋转设备与结构振动的无线监测终端：振动速度 0–100 mm/s、位移幅值 0–1,000 µm 可定制，精度 ±1%（80 Hz 标定），4G / NB-IoT 上报，电池续航超 10 年。",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "工业旋转设备",
      "desc": "为泵、风机、电机与压缩机提供连续振动趋势，服务预测性维护。",
      "img": "product/details/284-scen2.jpg"
     },
     {
      "name": "半导体设施",
      "desc": "监测对振动敏感的工艺设备与洁净室装置。",
      "img": "product/details/284-scen1.jpg"
     },
     {
      "name": "港口机械",
      "desc": "跟踪吊机与输送设备振动，保障港口作业安全。",
      "img": "product/details/284-scen3.jpg"
     },
     {
      "name": "建筑结构健康",
      "desc": "监测邻近施工或重载交通下建筑的结构响应。",
      "img": "product/details/284-scen5.jpg"
     },
     {
      "name": "能源装置",
      "desc": "监测汽轮机、发电机与变压器的异常振动特征。",
      "img": "product/details/284-scen4.jpg"
     },
     {
      "name": "物流运输",
      "desc": "为运输中的敏感货物记录冲击与振动。",
      "img": "product/details/284-scen6.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "能测哪些振动量？",
      "a": "振动速度 0–100 mm/s、位移幅值 0–1,000 µm（均可定制），精度 ±1%（80 Hz 标定）。"
     },
     {
      "q": "对预测性维护有什么帮助？",
      "a": "连续振动速度与位移幅值趋势可提前暴露轴承磨损、不平衡与不对中等早期迹象，让维护按状态而非日历安排。"
     },
     {
      "q": "怎么安装、怎么供电？",
      "a": "挂耳、抱杆或卡槽安装，纯电池供电，1 小时上报周期下续航超 10 年，无需信号与电源线缆。"
     },
     {
      "q": "接入哪个数据平台？",
      "a": "经 4G 或 NB-IoT 以 MQTT 上报至宏太云或客户平台，支持振动越限告警。"
     }
    ],
    "dateModified": "2026-08-30"
   },
   "285": {
    "series": "H系列 · 空气质量",
    "tagline": "精准 | 节能 | 六合一",
    "desc": "宏太空气质量传感器能够检测和分析多种空气污染物，定时数据上报云平台，结合低能耗和易维护特性，被广泛应用在城市的每个角落保障环境与健康。",
    "heroImg": "product/details/285-hero.png",
    "pdf": "/downloads/h310-aq041-air-quality-sensor-datasheet.pdf",
     "crumbCat": "空气质量",
    "returnCid": "265",
    "features": [
     {
      "icon": "product/details/285-f1.png",
      "text": "监测温度、湿度、CO₂、VOCs、大气压关键指示"
     },
     {
      "icon": "product/details/285-f2.png",
      "text": "IP68高防护等级"
     },
     {
      "icon": "product/details/285-f3.png",
      "text": "定制监测PM2.5、NO₂、SO₂、NH₃、O₃浓度水平"
     },
     {
      "icon": "product/details/285-f4.png",
      "text": "支持NFC 激活添加维护设备"
     },
     {
      "icon": "product/details/285-f5.png",
      "text": "支持OTA，远程升级"
     },
     {
      "icon": "product/details/285-f6.png",
      "text": "支持多种无线通讯技术4G / NB / LoRa"
     },
     {
      "icon": "product/details/285-f7.png",
      "text": "远程读取空气数据在任何地点进行监控"
     },
     {
      "icon": "product/details/285-f8.png",
      "text": "智能报警，超预设范围时自动发送警报到指定的用户"
     }
    ],
    "specsTitle": "技术参数",
    "specsDesc": "创新节能技术，采用先进的微功耗处理器与算法优化，实现多种空气污染物同时采集，单节电池10年长寿命显著降低维护成本低碳环保。",
    "specs": [
     [
      "产品型号",
      "H200/H300/H500"
     ],
     [
      "CO₂",
      "400–5,000 ppm"
     ],
     [
      "附加通道",
      "PM2.5、TVOC；可选 NO₂、SO₂、NH₃、O₃（按配置）"
     ],
     [
      "温度",
      "-40℃ 至 +85℃（±0.2℃）"
     ],
     [
      "湿度",
      "0–100% RH（±1%）"
     ],
     [
      "大气压",
      "30–120 kPa（±0.1 kPa）"
     ],
     [
      "通讯协议",
      "MQTT"
     ],
     [
      "工作频段",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "电池寿命",
      "按4小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     ],
     [
      "安装方式",
      "挂耳·抱杆·卡槽"
     ]
    ],

    "specsStructured": [
     {
      "name": "产品型号",
      "value": "H200/H300/H500"
     },
     {
      "name": "CO₂",
      "value": "400–5,000 ppm",
      "minValue": 400.0,
      "maxValue": 5000.0
     },
     {
      "name": "附加通道",
      "value": "PM2.5、TVOC；可选 NO₂、SO₂、NH₃、O₃（按配置）"
     },
     {
      "name": "温度",
      "value": "-40℃ 至 +85℃（±0.2℃）",
      "minValue": -40.0,
      "maxValue": 85.0
     },
     {
      "name": "湿度",
      "value": "0–100% RH（±1%）",
      "minValue": 0.0,
      "maxValue": 100.0
     },
     {
      "name": "大气压",
      "value": "30–120 kPa（±0.1 kPa）",
      "minValue": 30.0,
      "maxValue": 120.0
     },
     {
      "name": "通讯协议",
      "value": "MQTT"
     },
     {
      "name": "工作频段",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "电池寿命",
      "value": "按4小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     },
     {
      "name": "安装方式",
      "value": "挂耳·抱杆·卡槽"
     }
    ],    "certImgs": [],
    "scenariosHeading": "应用行业",
    "scenarios": [
     {
      "img": "product/details/285-scen1.jpg",
      "label": "办公环境"
     },
     {
      "img": "product/details/285-scen2.jpg",
      "label": "智慧城市"
     },
     {
      "img": "product/details/285-scen3.jpg",
      "label": "医院"
     },
     {
      "img": "product/details/285-scen4.jpg",
      "label": "智慧交通"
     },
     {
      "img": "product/details/285-scen5.jpg",
      "label": "住宅环境"
     },
     {
      "img": "product/details/285-scen6.jpg",
      "label": "数据中心"
     },
     {
      "img": "product/details/285-scen7.jpg",
      "label": "智慧工业"
     },
     {
      "img": "product/details/285-scen8.jpg",
      "label": "智慧农业"
     }
    ],
    "related": [
     "270",
     "274",
     "280",
     "281",
     "282",
     "283",
     "284",
     "276",
     "275"
    ],
    "summary": "宏太 H 系列空气质量传感器是 6 合 1 无线监测终端，面向城市与工业环境：监测 CO₂（400–5,000 ppm）、PM2.5、TVOC、温度、湿度与气压六类参数，可选配 NO₂、SO₂、NH₃、O₃ 通道，4G / NB-IoT 上报，电池多年续航。",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "城市空气监测",
      "desc": "网格化布点微站，逐街区跟踪城市空气质量趋势。",
      "img": "product/details/285-scen2.jpg"
     },
     {
      "name": "办公与校园",
      "desc": "CO₂ 与湿度读数联动通风，保障室内空气健康。",
      "img": "product/details/285-scen1.jpg"
     },
     {
      "name": "医院",
      "desc": "监测人群脆弱区域的空气状况。",
      "img": "product/details/285-scen3.jpg"
     },
     {
      "name": "数据中心",
      "desc": "温湿度与气压组合，满足环境合规记录。",
      "img": "product/details/285-scen6.jpg"
     },
     {
      "name": "工业园区",
      "desc": "园区厂界空气监测，尽早发现异常排放。",
      "img": "product/details/285-scen7.jpg"
     },
     {
      "name": "交通枢纽",
      "desc": "车站、隧道与停车场的空气质量可视。",
      "img": "product/details/285-scen4.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "6 合 1 具体测哪些参数？",
      "a": "CO₂（400–5,000 ppm）、PM2.5、TVOC、温度（-40℃ 至 +85℃，±0.2℃）、湿度（0–100%，±1%）、气压（30–120 kPa，±0.1 kPa），可选配 NO₂、SO₂、NH₃、O₃ 通道。"
     },
     {
      "q": "能无人值守运行多久？",
      "a": "4 小时上报周期下电池续航超 10 年，IP68 外壳适合户外安装。"
     },
     {
      "q": "数据怎么送达？",
      "a": "经 4G 或 NB-IoT 以 MQTT 上报至宏太云或客户平台，各通道支持阈值告警。"
     },
     {
      "q": "通道可以按现场需求定制吗？",
      "a": "可以。6 合 1 为模块化配置，告知需要监测的气体或颗粒物种类，宏太将提供对应通道组合。"
     }
    ],
    "dateModified": "2026-08-30"
   },
   "275": {
    "series": "H68系列 · 户外网关",
    "tagline": "大容量 | 广覆盖 | IP68",
    "desc": "H68系列网关采用IP68防水防尘外壳，面向长期户外运行设计，适应复杂工业环境；支持即插即用，断电时立即上报告警通知运维。超远传输、强穿透力和低丢包率，为远程数据采集提供稳定可靠保障。",
    "heroImg": "product/details/275-hero.png",
    "pdf": "/downloads/outdoor-4g-gateway-h68-datasheet.pdf",
    "crumbCat": "室外",
    "returnCid": "273",
    "features": [
     {
      "icon": "product/details/275-f1.png",
      "text": "通信距离可达10公里（空旷）"
     },
     {
      "icon": "product/details/275-f2.png",
      "text": "IP68防水防尘等级"
     },
     {
      "icon": "product/details/275-f3.png",
      "text": "硬件全双工，工业级8通道"
     },
     {
      "icon": "product/details/275-f4.png",
      "text": "支持本地部署，确保数据的高度安全性和可靠性"
     },
     {
      "icon": "product/details/275-f5.png",
      "text": "内置功率放大和低噪放大电路"
     },
     {
      "icon": "product/details/275-f6.png",
      "text": "支持多种无线通讯技术以太网 / 4G / NB / LoRa"
     },
     {
      "icon": "product/details/275-f7.png",
      "text": "大容量组网，远程控制与采集"
     },
     {
      "icon": "product/details/275-f8.png",
      "text": "支持断电智能报警，保障关键业务连续性和数据安全"
     }
    ],
    "specsTitle": "技术参数",
    "specsDesc": "H68系列支持10公里长距离传输，城市区域内可达2公里，集成4G LTE、以太网、Wi-Fi等多协议确保数据传输的高可靠性和连续性。",
    "specs": [
     [
      "产品型号",
      "H68"
     ],
     [
      "工作频段",
      "多频段选择：CN470/EU868/IN865/RU864/US915/AU915"
     ],
     [
      "传输距离",
      "可达10公里（空旷）"
     ],
     [
      "发射功率",
      "20–27 dBm"
     ],
     [
      "接收灵敏度",
      "−140 dBm at 0.292 kbps"
     ],
     [
      "天线",
      "外置玻璃钢天线"
     ],
     [
      "4G频段",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "通讯协议",
      "MQTT"
     ],
     [
      "工作温度",
      "−40°C to +85°C"
     ],
     [
      "存储温度",
      "−40°C to +85°C"
     ],
     [
      "安装方式",
      "挂耳·抱杆·卡槽"
     ]
    ],

    "specsStructured": [
     {
      "name": "产品型号",
      "value": "H68"
     },
     {
      "name": "工作频段",
      "value": "多频段选择：CN470/EU868/IN865/RU864/US915/AU915"
     },
     {
      "name": "传输距离",
      "value": "可达10公里（空旷）"
     },
     {
      "name": "发射功率",
      "value": "20–27 dBm",
      "minValue": 20.0,
      "maxValue": 27.0
     },
     {
      "name": "接收灵敏度",
      "value": "−140 dBm at 0.292 kbps",
      "unitText": "分贝毫瓦"
     },
     {
      "name": "天线",
      "value": "外置玻璃钢天线"
     },
     {
      "name": "4G频段",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "通讯协议",
      "value": "MQTT"
     },
     {
      "name": "工作温度",
      "value": "−40°C to +85°C",
      "minValue": -40.0,
      "maxValue": 85.0
     },
     {
      "name": "存储温度",
      "value": "−40°C to +85°C",
      "minValue": -40.0,
      "maxValue": 85.0
     },
     {
      "name": "安装方式",
      "value": "挂耳·抱杆·卡槽"
     }
    ],    "certImgs": [],
    "scenariosHeading": "应用行业",
    "scenarios": [
     {
      "img": "product/details/275-scen1.jpg",
      "label": "能源管理"
     },
     {
      "img": "product/details/275-scen2.jpg",
      "label": "建筑管理"
     },
     {
      "img": "product/details/275-scen3.jpg",
      "label": "水务管理"
     },
     {
      "img": "product/details/275-scen4.jpg",
      "label": "工业自动化"
     },
     {
      "img": "product/details/275-scen5.jpg",
      "label": "环境监测"
     },
     {
      "img": "product/details/275-scen6.jpg",
      "label": "智慧城市"
     },
     {
      "img": "product/details/275-scen7.jpg",
      "label": "智能交通"
     },
     {
      "img": "product/details/275-scen8.jpg",
      "label": "物流与供应链"
     }
    ],
    "related": [
     "270",
     "274",
     "280",
     "281",
     "282",
     "283",
     "284",
     "285",
     "276"
    ],
    "summary": "宏太 H68 户外网关是面向广域传感网络的工业级 LoRa 网关：覆盖半径可达 10 公里，灵敏度 -140dBm，发射功率 20-27dBm，支持 CN470 / EU868 / US915 / AU915 等区域频段；IP68 外壳面向长期户外服役设计，4G 回传、MQTT 上联。",
    "sku": "H68",
    "applications": [
     {
      "name": "智慧园区",
      "desc": "一面楼顶网关可汇聚园区大量传感器。",
      "img": "product/details/275-scen2.jpg"
     },
     {
      "name": "智慧水务",
      "desc": "汇聚服务区内的表计与液位传感器流量。",
      "img": "product/details/275-scen3.jpg"
     },
     {
      "name": "新能源场站",
      "desc": "为光伏与风电场提供长距离传感回传。",
      "img": "product/details/275-scen1.jpg"
     },
     {
      "name": "工业自动化",
      "desc": "全厂传感器汇聚，无需为每只传感器配 SIM 卡。",
      "img": "product/details/275-scen4.jpg"
     },
     {
      "name": "环境监测",
      "desc": "覆盖广域农村的河道、空气与噪声传感网络。",
      "img": "product/details/275-scen5.jpg"
     },
     {
      "name": "智慧城市",
      "desc": "街区级覆盖，服务市政传感网络。",
      "img": "product/details/275-scen6.jpg"
     },
     {
      "name": "物流场站",
      "desc": "单网关覆盖整场追踪与状态传感。",
      "img": "product/details/275-scen8.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "H68 户外网关的覆盖范围多大？",
      "a": "开阔条件可达 10 公里，灵敏度 -140dBm、发射功率 20-27dBm；实际覆盖受地形与天线高度影响，可提供现场图纸由宏太评估。"
     },
     {
      "q": "支持哪些频段？",
      "a": "CN470、EU868、IN865、RU864、US915、AU915，覆盖中国、欧洲、印度、俄罗斯、北美与澳洲部署。"
     },
     {
      "q": "网关怎么回传数据？",
      "a": "经 4G 蜂窝（LTE-TDD B34/B38/B39/B40/B41，LTE-FDD B1/B3/B5/B8）以 MQTT 上联至宏太云或私有平台。"
     },
     {
      "q": "真的能常年户外使用吗？",
      "a": "可以。IP68 外壳防尘防水，工业设计面向长期户外服役。"
     }
    ],
    "dateModified": "2026-08-30"
   },
   "276": {
    "series": "H66系列 · 室内网关",
    "tagline": "远距离 | 全双工 | 工业级",
    "desc": "H66系列网关设计耐用，可在多变的工业环境下稳定工作。支持即插即用，并支持断电告警：市电中断时立即上报告警，通知运维人员。",
    "heroImg": "product/details/276-hero.png",
    "pdf": "/downloads/indoor-gateway-h66-datasheet.pdf",
    "crumbCat": "室内",
    "returnCid": "272",
    "features": [
     {
      "icon": "product/details/276-f1.png",
      "text": "通信距离可达5公里（空旷）"
     },
     {
      "icon": "product/details/276-f2.png",
      "text": "IP67防水防尘等级"
     },
     {
      "icon": "product/details/276-f3.png",
      "text": "硬件全双工，工业级8通道"
     },
     {
      "icon": "product/details/276-f4.png",
      "text": "支持本地部署，确保数据的高度安全性和可靠性"
     },
     {
      "icon": "product/details/276-f5.png",
      "text": "内置功率放大和低噪放大电路"
     },
     {
      "icon": "product/details/276-f6.png",
      "text": "支持多种无线通讯技术以太网 / 4G / NB / LoRa"
     },
     {
      "icon": "product/details/276-f7.png",
      "text": "大容量组网，远程控制与采集"
     },
     {
      "icon": "product/details/276-f8.png",
      "text": "支持断电智能报警，保障关键业务连续性和数据安全"
     }
    ],
    "specsTitle": "技术参数",
    "specsDesc": "H66系列工业级多通道无线网关支持多协议，支持8通道全双工，边缘计算，适应恶劣环境，实时数据处理和远程管理。",
    "specs": [
     [
      "产品型号",
      "H66"
     ],
     [
      "工作频段",
      "多频段选择：CN470/EU868/IN865/RU864/US915/AU915"
     ],
     [
      "传输距离",
      "可达5公里（空旷）"
     ],
     [
      "发射功率",
      "20–27 dBm"
     ],
     [
      "接收灵敏度",
      "−140 dBm at 0.292 kbps"
     ],
     [
      "天线",
      "外置玻璃钢天线"
     ],
     [
      "4G频段",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "通讯协议",
      "MQTT"
     ],
     [
      "工作温度",
      "-20℃～ 70℃"
     ],
     [
      "存储温度",
      "-20℃～ 80℃"
     ],
     [
      "安装方式",
      "挂耳·抱杆·卡槽"
     ]
    ],

    "specsStructured": [
     {
      "name": "产品型号",
      "value": "H66"
     },
     {
      "name": "工作频段",
      "value": "多频段选择：CN470/EU868/IN865/RU864/US915/AU915"
     },
     {
      "name": "传输距离",
      "value": "可达5公里（空旷）"
     },
     {
      "name": "发射功率",
      "value": "20–27 dBm",
      "minValue": 20.0,
      "maxValue": 27.0
     },
     {
      "name": "接收灵敏度",
      "value": "−140 dBm at 0.292 kbps",
      "unitText": "分贝毫瓦"
     },
     {
      "name": "天线",
      "value": "外置玻璃钢天线"
     },
     {
      "name": "4G频段",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "通讯协议",
      "value": "MQTT"
     },
     {
      "name": "工作温度",
      "value": "-20℃～ 70℃",
      "minValue": -20.0,
      "maxValue": 70.0
     },
     {
      "name": "存储温度",
      "value": "-20℃～ 80℃",
      "minValue": -20.0,
      "maxValue": 80.0
     },
     {
      "name": "安装方式",
      "value": "挂耳·抱杆·卡槽"
     }
    ],    "certImgs": [],
    "scenariosHeading": "应用行业",
    "scenarios": [
     {
      "img": "product/details/276-scen1.jpg",
      "label": "建筑管理"
     },
     {
      "img": "product/details/276-scen2.jpg",
      "label": "能源管理"
     },
     {
      "img": "product/details/276-scen3.jpg",
      "label": "物流与供应链"
     },
     {
      "img": "product/details/276-scen4.jpg",
      "label": "工业自动化"
     },
     {
      "img": "product/details/276-scen5.jpg",
      "label": "智慧城市"
     },
     {
      "img": "product/details/276-scen6.jpg",
      "label": "水务管理"
     },
     {
      "img": "product/details/276-scen7.jpg",
      "label": "智能交通"
     }
    ],
    "related": [
     "270",
     "274",
     "280",
     "281",
     "282",
     "283",
     "284",
     "285",
     "275"
    ],
    "summary": "宏太 H66 室内网关是面向楼内传感网络的工业级全双工 LoRa 网关：覆盖可达 5 公里，灵敏度 -140dBm，支持 CN470 至 US915 区域频段；即插即用，带断电报警，4G 回传、MQTT 上联。",
    "sku": "H66",
    "applications": [
     {
      "name": "楼宇管理",
      "desc": "从弱电间汇聚全楼层的暖通、计量与环境传感器。",
      "img": "product/details/276-scen1.jpg"
     },
     {
      "name": "能源管理",
      "desc": "汇聚分项计量传感流量，服务工厂与楼宇能耗审计。",
      "img": "product/details/276-scen2.jpg"
     },
     {
      "name": "仓储物流",
      "desc": "库内温度、门磁与资产信标的传感汇聚。",
      "img": "product/details/276-scen3.jpg"
     },
     {
      "name": "工业现场",
      "desc": "车间传感网络免布数据线。",
      "img": "product/details/276-scen4.jpg"
     },
     {
      "name": "水务管理",
      "desc": "泵房与水箱液位传感器在站房内汇聚。",
      "img": "product/details/276-scen6.jpg"
     },
     {
      "name": "交通设施",
      "desc": "车站、隧道与车辆段内部的传感汇聚。",
      "img": "product/details/276-scen7.jpg"
     }
    ],
    "certifications": [
     "IP67"
    ],
    "faqs": [
     {
      "q": "H66 与 H68 有什么区别？",
      "a": "H66 是室内款：即插即用、带断电报警，空旷覆盖可达 5 公里，IP67 外壳；H68 是户外款，空旷覆盖可达 10 公里，IP68，面向长期户外服役设计。"
     },
     {
      "q": "支持哪些频段？",
      "a": "CN470、EU868、IN865、RU864、US915、AU915，对应各区域 LoRa 频段规划。"
     },
     {
      "q": "断电了怎么办？",
      "a": "网关会经 4G 回传通道上报告警，运维团队第一时间得知传感网络离线。"
     },
     {
      "q": "一台网关能接多少传感器？",
      "a": "全双工工业网关可服务单站大规模传感器网络；实际容量取决于上报周期、负载与网络条件，告知设备数量宏太将做网络规划。"
     }
    ],
    "dateModified": "2026-08-30"
   },
   "277": {
    "series": "H系列 · 水文站",
    "tagline": "全天候 | 太阳能 | 模块化",
    "desc": "集成2~12路传感器收集环境数据，实时传输到宏太云平台，并允许用户从任何地方通过互联网访问气象数据，实现远程监测和分析",
    "heroImg": "product/details/277-hero.png",
    "pdf": "/downloads/hydrology-monitoring-station-datasheet.pdf",
    "crumbCat": "水文",
    "returnCid": "274",
    "features": [
     {
      "icon": "product/details/277-f1.png",
      "text": "2~12路传感器同时监测"
     },
     {
      "icon": "product/details/277-f2.png",
      "text": "IP65防护等级"
     },
     {
      "icon": "product/details/277-f3.png",
      "text": "量程, 参数, 使用寿命定制"
     },
     {
      "icon": "product/details/277-f4.png",
      "text": "支持NFC 激活添加维护设备"
     },
     {
      "icon": "product/details/277-f5.png",
      "text": "支持OTA，远程升级"
     },
     {
      "icon": "product/details/277-f6.png",
      "text": "支持多种无线通讯技术 4G / NB / LoRa"
     },
     {
      "icon": "product/details/277-f7.png",
      "text": "远程读取温度数据 在任何地点进行监控"
     },
     {
      "icon": "product/details/277-f8.png",
      "text": "智能报警，超预设范围时 自动发送警报到指定的用户"
     }
    ],
    "specsTitle": "技术参数",
    "specsDesc": "能够监测多种水文数据，包括但不限于水位高度、流速、水质、温湿度、风速、风向、气压、降雨量、PM2.5/10、CO₂等，了解水位数据及空气污染趋势和源头，为环境保护和城市运维提供数据",
    "specs": [
     [
      "产品型号",
      "H700"
     ],
     [
      "测量范围",
      "范围支持定制"
     ],
     [
      "测量精度",
      "精度支持定制"
     ],
     [
      "通讯协议",
      "MQTT"
     ],
     [
      "部署范围",
      "城市·农村·平原·山区"
     ],
     [
      "工作频段",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "供电方式",
      "太阳能·市电"
     ],
     [
      "安装方式",
      "挂耳·抱杆·卡槽"
     ]
    ],

    "specsStructured": [
     {
      "name": "产品型号",
      "value": "H700"
     },
     {
      "name": "测量范围",
      "value": "范围支持定制"
     },
     {
      "name": "测量精度",
      "value": "精度支持定制"
     },
     {
      "name": "通讯协议",
      "value": "MQTT"
     },
     {
      "name": "部署范围",
      "value": "城市·农村·平原·山区"
     },
     {
      "name": "工作频段",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "供电方式",
      "value": "太阳能·市电"
     },
     {
      "name": "安装方式",
      "value": "挂耳·抱杆·卡槽"
     }
    ],    "certImgs": [],
    "scenariosHeading": "应用行业",
    "scenarios": [
     {
      "img": "product/details/277-scen1.jpg",
      "label": "智慧农业"
     },
     {
      "img": "product/details/277-scen2.jpg",
      "label": "环境监测"
     },
     {
      "img": "product/details/277-scen3.jpg",
      "label": "城市管理"
     },
     {
      "img": "product/details/277-scen4.jpg",
      "label": "智慧校园"
     },
     {
      "img": "product/details/277-scen5.jpg",
      "label": "电力事业"
     },
     {
      "img": "product/details/277-scen6.jpg",
      "label": "海洋和海岸监测"
     },
     {
      "img": "product/details/277-scen7.jpg",
      "label": "应急管理"
     },
     {
      "img": "product/details/277-scen8.jpg",
      "label": "交通航运"
     }
    ],
    "related": [
     "270",
     "274",
     "280",
     "281",
     "282",
     "283",
     "284",
     "285",
     "276"
    ],
    "summary": "宏太 H700 水文站是模块化、太阳能供电的监测终端：集成 2 至 12 路传感器通道采集水文与环境数据，经 4G 实时传输至宏太云，适应城市、乡村、平原与山区站点，支持挂耳、抱杆与卡槽安装。",
    "sku": "H700",
    "applications": [
     {
      "name": "河道监测",
      "desc": "水位、雨量及相关水力通道，服务水文站网。"
     },
     {
      "name": "水库湖泊管理",
      "desc": "多参数水文记录，服务调度与安全。",
      "img": "solution/67-scen-0.jpg"
     },
     {
      "name": "城市内涝监视",
      "desc": "易涝点的雨量加液位组合监测。",
      "img": "product/details/277-scen3.jpg"
     },
     {
      "name": "智慧农业",
      "desc": "灌区水文与气象通道一体采集。",
      "img": "product/details/277-scen1.jpg"
     },
     {
      "name": "环境监测",
      "desc": "水质与气象通道服务流域治理项目。"
     },
     {
      "name": "山洪预警",
      "desc": "山区集水区的太阳能远程站点接入预警系统。",
      "img": "product/details/277-scen2.jpg"
     },
     {
      "name": "沿海与河口",
      "desc": "潮位与气象通道服务海岸管理。",
      "img": "product/details/277-scen6.jpg"
     },
     {
      "name": "应急管理",
      "desc": "汛期快速部署站点补齐数据。",
      "img": "product/details/277-scen7.jpg"
     }
    ],
    "certifications": [
     "IP65"
    ],
    "faqs": [
     {
      "q": "H700 水文站能测哪些量？",
      "a": "单站集成 2 至 12 路传感器通道——典型配置组合水位、雨量、水力相关与气象传感器，按项目选配。"
     },
     {
      "q": "站点怎么供电？",
      "a": "太阳能或市电两种方案，偏远山区与城市站点都能覆盖。"
     },
     {
      "q": "数据怎么到平台？",
      "a": "经 4G 以 MQTT 实时上联宏太云，用户在网页平台或 App 查看与导出。"
     },
     {
      "q": "能部署在哪些地方？",
      "a": "城市、乡村、平原与山区均可；挂耳、抱杆与卡槽安装适配立杆、墙面与滑轨。"
     }
    ],
    "dateModified": "2026-08-30"
   },
   "278": {
    "series": "H系列 · 气象站",
    "tagline": "全天候 | 太阳能 | 模块化",
    "desc": "集成2~12路传感器收集环境数据，实时传输到宏太云平台，并允许用户从任何地方通过互联网访问气象数据，实现远程监测和分析",
    "heroImg": "product/details/278-hero.png",
    "pdf": "/downloads/weather-station-datasheet.pdf",
    "crumbCat": "气象",
    "returnCid": "275",
    "features": [
     {
      "icon": "product/details/278-f1.png",
      "text": "2~12路传感器同时监测"
     },
     {
      "icon": "product/details/278-f2.png",
      "text": "IP65防护等级"
     },
     {
      "icon": "product/details/278-f3.png",
      "text": "量程, 参数, 使用寿命定制"
     },
     {
      "icon": "product/details/278-f4.png",
      "text": "支持NFC 激活添加维护设备"
     },
     {
      "icon": "product/details/278-f5.png",
      "text": "支持OTA，远程升级"
     },
     {
      "icon": "product/details/278-f6.png",
      "text": "支持多种无线通讯技术4G / NB / LoRa"
     },
     {
      "icon": "product/details/278-f7.png",
      "text": "远程读取温度数据在任何地点进行监控"
     },
     {
      "icon": "product/details/278-f8.png",
      "text": "智能报警，超预设范围时自动发送警报到指定的用户"
     }
    ],
    "specsTitle": "技术参数",
    "specsDesc": "能够监测多种气象参数，包括但不限于温度、湿度、风速、风向、气压、降雨量、PM2.5/10、CO₂、SO₂、太阳辐射等，了解污染趋势和源头，为环境保护和城市规划提供数据支持",
    "specs": [
     [
      "产品型号",
      "H600"
     ],
     [
      "测量范围",
      "Customizable"
     ],
     [
      "测量精度",
      "精度支持定制"
     ],
     [
      "通讯协议",
      "MQTT"
     ],
     [
      "部署范围",
      "城市·农村·平原·山区"
     ],
     [
      "工作频段",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "供电方式",
      "太阳能·市电"
     ],
     [
      "安装方式",
      "挂耳·抱杆·卡槽"
     ]
    ],

    "specsStructured": [
     {
      "name": "产品型号",
      "value": "H600"
     },
     {
      "name": "测量范围",
      "value": "Customizable"
     },
     {
      "name": "测量精度",
      "value": "精度支持定制"
     },
     {
      "name": "通讯协议",
      "value": "MQTT"
     },
     {
      "name": "部署范围",
      "value": "城市·农村·平原·山区"
     },
     {
      "name": "工作频段",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "供电方式",
      "value": "太阳能·市电"
     },
     {
      "name": "安装方式",
      "value": "挂耳·抱杆·卡槽"
     }
    ],    "certImgs": [],
    "scenariosHeading": "应用行业",
    "scenarios": [
     {
      "img": "product/details/278-scen1.jpg",
      "label": "智慧农业"
     },
     {
      "img": "product/details/278-scen2.jpg",
      "label": "环境监测"
     },
     {
      "img": "product/details/278-scen3.jpg",
      "label": "海洋和海岸监测"
     },
     {
      "img": "product/details/278-scen4.jpg",
      "label": "智慧校园"
     },
     {
      "img": "product/details/278-scen5.jpg",
      "label": "城市管理"
     },
     {
      "img": "product/details/278-scen6.jpg",
      "label": "应急管理"
     },
     {
      "img": "product/details/278-scen7.jpg",
      "label": "交通航运"
     }
    ],
    "related": [
     "270",
     "274",
     "280",
     "281",
     "282",
     "283",
     "284",
     "285",
     "276"
    ],
    "summary": "宏太 H600 气象站是模块化、太阳能供电的农业气象终端：集成 2 至 12 路传感器，覆盖温湿度、雨量、风向风速、气压与辐射等通道，经 4G 实时上报宏太云，服务农场、校园、城市与沿海站点。",
    "sku": "H600",
    "applications": [
     {
      "name": "智慧农业",
      "desc": "田间气象驱动灌溉、施药窗口与病害预警模型。",
      "img": "product/details/278-scen1.jpg"
     },
     {
      "name": "环境监测",
      "desc": "长期气候序列服务流域与生态项目。",
      "img": "product/details/278-scen2.jpg"
     },
     {
      "name": "智慧校园",
      "desc": "校园气象服务教学、安全与设施管理。",
      "img": "product/details/278-scen4.jpg"
     },
     {
      "name": "城市管理",
      "desc": "微气候监测服务市政与热岛研究。",
      "img": "product/details/278-scen5.jpg"
     },
     {
      "name": "沿海与海洋",
      "desc": "风与气压通道保障沿海作业安全。",
      "img": "product/details/278-scen3.jpg"
     },
     {
      "name": "交通运输",
      "desc": "港口、机场与公路路段的本地气象。",
      "img": "product/details/278-scen7.jpg"
     },
     {
      "name": "应急管理",
      "desc": "可部署站点在强对流天气期为决策系统供数。",
      "img": "product/details/278-scen6.jpg"
     }
    ],
    "certifications": [
     "IP65"
    ],
    "faqs": [
     {
      "q": "H600 气象站能测哪些气象要素？",
      "a": "集成 2 至 12 路通道——通常包括空气温湿度、雨量、风速风向、气压与太阳辐射，按项目配置。"
     },
     {
      "q": "怎么供电、怎么联网？",
      "a": "太阳能或市电供电，经 4G 以 MQTT 实时上联宏太云，远程读取与分析。"
     },
     {
      "q": "无基础设施的偏远地区能用吗？",
      "a": "可以。太阳能加 4G 蜂窝意味着无需挖沟拉线；挂耳、抱杆与卡槽三种安装方式。"
     },
     {
      "q": "和 H700 水文站有什么区别？",
      "a": "H600 面向气象通道（风、雨、辐射），H700 面向水文通道（水位、水力相关）；两者共用同一模块化平台。"
     }
    ],
    "dateModified": "2026-08-30"
   },
   "286": {
    "series": "H系列 · 防爆温压传感器",
    "tagline": "低功耗 | 高可靠 | 工业级",
    "desc": "宏太物联温压防爆设备应用于监控和控制易燃、易爆环境中的温度和压力的场合，减少设备数量及安装复杂性，能够在极端条件下安全、可靠地工作。",
    "heroImg": "product/details/286-hero.png",
    "pdf": "/downloads/explosion-proof-temperature-pressure-sensor-datasheet.pdf",
    "crumbCat": "硬件",
    "returnCid": "279",
    "features": [
     {
      "icon": "product/details/286-f1.png",
      "text": "精度±0.5°C（±0.1°C定制）"
     },
     {
      "icon": "product/details/286-f2.png",
      "text": "IP68高防护等级"
     },
     {
      "icon": "product/details/286-f3.png",
      "text": "±0.5% FS（高精度定制）"
     },
     {
      "icon": "product/details/286-f4.png",
      "text": "支持NFC 激活添加维护设备"
     },
     {
      "icon": "product/details/286-f5.png",
      "text": "支持OTA，远程升级"
     },
     {
      "icon": "product/details/286-f6.png",
      "text": "支持多种无线通讯技术4G / NB / LoRa"
     },
     {
      "icon": "product/details/286-f7.png",
      "text": "远程读取温度数据在任何地点进行监控"
     },
     {
      "icon": "product/details/286-f8.png",
      "text": "智能报警，超预设范围时自动发送警报到指定的用户"
     }
    ],
    "specsTitle": "技术参数",
    "specsDesc": "通过集成通信和传感技术及嵌入式节能算法，确保温度和压力传感器不仅具备超长使用寿命，还能维持高度的测量稳定性，从而增强整个监测系统的可靠性。",
    "specs": [
     [
      "产品型号",
      "H200/H300/H500"
     ],
     [
      "压力范围",
      "0–1 / 1.6 / 3.5 / 7 / 10 / 20 MPa"
     ],
     [
      "压力精度",
      "±0.5% FS"
     ],
     [
      "温度范围",
      "-200°C到800°C可定制"
     ],
     [
      "温度精度",
      "测量精度±0.5°C（0.1°C可定制）"
     ],
     [
      "通讯协议",
      "MQTT"
     ],
     [
      "工作频段",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "安装方式",
      "挂耳·抱杆·卡槽"
     ],
     [
      "工作温度",
      "-40℃ 至 +125℃"
     ],
     [
      "存储温度",
      "-40℃ 至 +125℃"
     ]
    ],

    "specsStructured": [
     {
      "name": "产品型号",
      "value": "H200/H300/H500"
     },
     {
      "name": "压力范围",
      "value": "0–1 / 1.6 / 3.5 / 7 / 10 / 20 MPa"
     },
     {
      "name": "压力精度",
      "value": "±0.5% FS",
      "unitText": "百分比"
     },
     {
      "name": "温度范围",
      "value": "-200°C到800°C可定制",
      "minValue": -200.0,
      "maxValue": 800.0
     },
     {
      "name": "温度精度",
      "value": "测量精度±0.5°C（0.1°C可定制）"
     },
     {
      "name": "通讯协议",
      "value": "MQTT"
     },
     {
      "name": "工作频段",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "安装方式",
      "value": "挂耳·抱杆·卡槽"
     },
     {
      "name": "工作温度",
      "value": "-40℃ 至 +125℃",
      "minValue": -40.0,
      "maxValue": 125.0
     },
     {
      "name": "存储温度",
      "value": "-40℃ 至 +125℃",
      "minValue": -40.0,
      "maxValue": 125.0
     }
    ],    "certImgs": [],
    "scenariosHeading": "应用行业",
    "scenarios": [
     {
      "img": "product/details/286-scen1.jpg",
      "label": "石油石化"
     },
     {
      "img": "product/details/286-scen2.jpg",
      "label": "矿业"
     },
     {
      "img": "product/details/286-scen3.jpg",
      "label": "化工厂"
     }
    ],
    "related": [
     "287"
    ],
    "summary": "宏太 H 系列防爆温压一体变送器为易燃易爆环境将温度与压力监测合二为一：压力量程 0-1MPa 至 20MPa（±0.5% FS），温度 -200℃ 至 800℃，数据经 4G / NB-IoT 上报，减少现场设备数量与布线。",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "石油化工",
      "desc": "单台设备在防爆区内同时看守工艺温度与压力。",
      "img": "product/details/286-scen3.jpg"
     },
     {
      "name": "油气开采",
      "desc": "井口与集输管线的无布线温压监测。",
      "img": "product/details/286-scen1.jpg"
     },
     {
      "name": "矿山作业",
      "desc": "瓦斯风险井下区域的温压趋势监测。",
      "img": "product/details/286-scen2.jpg"
     },
     {
      "name": "化工仓储",
      "desc": "储运设备的双参数监测。",
      "img": "product/details/283-scen5.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "为什么选温压二合一？",
      "a": "一台防爆设备替代两台仪表，在危险区域减半安装点、布线与维护量，同时让两个参数保持同一上报节奏。"
     },
     {
      "q": "量程是多少？",
      "a": "压力 0-1MPa / 1.6 / 3.5 / 7 / 10 / 20MPa（±0.5% FS）；温度 -200℃ 至 800℃（±0.5℃，可定制 ±0.1℃）。"
     },
     {
      "q": "有防爆认证吗？",
      "a": "产品面向易燃易爆环境设计；请告知防爆分区与气体组别，宏太在下单前确认匹配的防爆配置。"
     },
     {
      "q": "数据怎么传输？",
      "a": "经 4G 或 NB-IoT 以 MQTT 上报至宏太云或私有化部署，温度压力双通道均支持阈值告警。"
     }
    ],
    "dateModified": "2026-08-30"
   },
   "287": {
    "series": "H系列 · 耦合隔离器",
    "tagline": "安全传输 | 高可靠 | 防爆定制",
    "desc": "在防爆领域中，无线高频信号的应用日益增多，如石油和天然气开采、化工工厂、矿业等。这些环境中存在易燃气体、蒸汽或粉尘，可能导致爆炸。使用宏太防爆款定制设备确保不会触发任何潜在的点火源，同时提供可靠低衰减的数据传输。",
    "heroImg": "product/details/287-hero.png",
    "pdf": "/downloads/coupling-isolator-h100-datasheet.pdf",
    "crumbCat": "硬件",
    "returnCid": "279",
    "features": [
     {
      "icon": "product/details/287-f1.png",
      "text": "高频低衰减，按客户要求定制"
     },
     {
      "icon": "product/details/287-f2.png",
      "text": "IP68高防护等级"
     },
     {
      "icon": "product/details/287-f3.png",
      "text": "支持 2.4 GHz / 5.8 GHz 高频传输"
     },
     {
      "icon": "product/details/287-f4.png",
      "text": "符合国际防爆认证标准"
     },
     {
      "icon": "product/details/287-f5.png",
      "text": "低能耗技术，减少能量输出"
     },
     {
      "icon": "product/details/287-f6.png",
      "text": "具备良好的抗干扰能力"
     }
    ],
    "specsTitle": "技术参数",
    "specsDesc": "本产品设计为符合相关标准的防爆无线通信设备，支持2.4 GHz和5.8 GHz频段，具备低功耗设计、高抗干扰能力及安全加密功能，适用于恶劣的工业环境。",
    "specs": [
     [
      "产品型号",
      "H100"
     ],
     [
      "信号频段",
      "2.4 GHz / 5.8 GHz"
     ],
     [
      "防爆用途",
      "防爆耦合设计；认证组合按目标市场与防爆分区确认"
     ],
     [
      "工作温度",
      "-40℃ 至 +125℃"
     ],
     [
      "存储温度",
      "-40℃ 至 +125℃"
     ],
     [
      "安装方式",
      "挂耳·抱杆·卡槽"
     ]
    ],

    "specsStructured": [
     {
      "name": "产品型号",
      "value": "H100"
     },
     {
      "name": "信号频段",
      "value": "2.4 GHz / 5.8 GHz"
     },
     {
      "name": "防爆用途",
      "value": "防爆耦合设计；认证组合按目标市场与防爆分区确认"
     },
     {
      "name": "工作温度",
      "value": "-40℃ 至 +125℃",
      "minValue": -40.0,
      "maxValue": 125.0
     },
     {
      "name": "存储温度",
      "value": "-40℃ 至 +125℃",
      "minValue": -40.0,
      "maxValue": 125.0
     },
     {
      "name": "安装方式",
      "value": "挂耳·抱杆·卡槽"
     }
    ],    "certImgs": [],
    "scenariosHeading": "应用行业",
    "scenarios": [
     {
      "img": "product/details/287-scen1.jpg",
      "label": "石油石化"
     },
     {
      "img": "product/details/287-scen2.jpg",
      "label": "矿业"
     },
     {
      "img": "product/details/287-scen3.jpg",
      "label": "化工厂"
     }
    ],
    "related": [
     "286"
    ],
    "summary": "宏太 H100 耦合隔离器是防爆信号耦合装置，让无线高频传感信号安全穿越油气、化工与矿山的危险区边界：防爆耦合设计面向危险区应用，认证组合按目标市场与防爆分区确认；工作温度 -40℃ 至 +125℃，支持挂耳、抱杆与卡槽安装。",
    "sku": "H100",
    "applications": [
     {
      "name": "油气开采",
      "desc": "把无线传感信号安全耦合出井口危险区。",
      "img": "product/details/287-scen1.jpg"
     },
     {
      "name": "化工装置",
      "desc": "在不穿透防爆隔断的前提下桥接危险区与安全区的无线链路。",
      "img": "product/details/287-scen3.jpg"
     },
     {
      "name": "矿山井下",
      "desc": "为井下无线传感网络提供防爆信号通道。",
      "img": "product/details/287-scen2.jpg"
     },
     {
      "name": "罐区与码头",
      "desc": "跨越防火堤与防爆分区的安全信号耦合。",
      "img": "product/details/283-scen5.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "耦合隔离器解决什么问题？",
      "a": "常规无线链路不应在未经认证隔离的情况下穿越防爆边界。H100 将 2.4 GHz / 5.8 GHz 传感信号耦合穿越边界，让电池供电的无线传感器服务危险区。"
     },
     {
      "q": "符合哪些标准？",
      "a": "认证组合按目标市场与防爆分区确认——告知宏太具体需求，发货前确认适用证书。"
     },
     {
      "q": "适应什么环境？",
      "a": "工作与贮存温度均为 -40℃ 至 +125℃，IP68 外壳适应户外与井下现场。"
     },
     {
      "q": "怎么安装？",
      "a": "挂耳、抱杆或卡槽安装，与 H 系列其他现场设备共用配件体系。"
     }
    ],
    "dateModified": "2026-08-30"
   },
   "301": {
    "series": "H系列 · 温湿度传感器",
    "tagline": "高精度 | 环境监测 | 超低功耗",
    "desc": "宏太通信温湿度传感器提供高精度环境温湿度监测与远程告警，保障洁净室、机柜、博物馆与生产产线环境全天候处于安全区间",
    "heroImg": "product/details/301-hero.png",
    "pdf": "/downloads/h300-temperature-humidity-sensor-datasheet.pdf",
     "crumbCat": "温度监测",
    "returnCid": "263",
    "features": [
     {
      "icon": "product/details/270-f1.png",
      "text": "精度：±0.2°C / ±2% RH（典型值）"
     },
     {
      "icon": "product/details/270-f2-ip65.png",
      "text": "IP65 高防护等级"
     },
     {
      "icon": "product/details/270-f3.png",
      "text": "量程：0–100% RH，-20°C～+80°C"
     },
     {
      "icon": "product/details/270-f4.png",
      "text": "支持 NFC 激活、添加与维护设备"
     },
     {
      "icon": "product/details/270-f5.png",
      "text": "节能技术，持久续航"
     },
     {
      "icon": "product/details/270-f6.png",
      "text": "支持多种无线技术：4G、NB-IoT、LoRa"
     },
     {
      "icon": "product/details/270-f7.png",
      "text": "远程温湿度监测：随时随地查看数据"
     },
     {
      "icon": "product/details/270-f8.png",
      "text": "智能告警：超阈值自动通知用户"
     }
    ],
    "specsTitle": "技术参数",
    "specsDesc": "持续创新，采用微功耗处理器与算法优化，实现物联传感器长达10年的稳定运行，减少维护成本。",
    "specs": [
     [
      "产品型号",
      "H200/H300/H500"
     ],
     [
      "测量范围",
      "湿度 0–100% RH，温度 -20°C～+80°C"
     ],
     [
      "测量精度",
      "±0.2°C / ±2% RH（典型值）"
     ],
     [
      "通讯协议",
      "MQTT"
     ],
     [
      "探头形式",
      "开槽烧结探头，线缆分体安装"
     ],
     [
      "工作频段",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "电池寿命",
      "按1小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     ],
     [
      "安装方式",
      "挂耳·抱杆·卡槽"
     ]
    ],

    "specsStructured": [
     {
      "name": "产品型号",
      "value": "H200/H300/H500"
     },
     {
      "name": "测量范围",
      "value": "湿度 0–100% RH，温度 -20°C～+80°C"
     },
     {
      "name": "测量精度",
      "value": "±0.2°C / ±2% RH（典型值）"
     },
     {
      "name": "通讯协议",
      "value": "MQTT"
     },
     {
      "name": "探头形式",
      "value": "开槽烧结探头，线缆分体安装"
     },
     {
      "name": "工作频段",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "电池寿命",
      "value": "按1小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     },
     {
      "name": "安装方式",
      "value": "挂耳·抱杆·卡槽"
     }
    ],    "certImgs": [],
    "scenariosHeading": "应用行业",
    "scenarios": [
     {
      "img": "product/details/270-scen3.jpg",
      "label": "数据中心"
     },
     {
      "img": "product/details/270-scen4.jpg",
      "label": "医疗监测"
     },
     {
      "img": "product/details/270-scen5.jpg",
      "label": "食品加工"
     },
     {
      "img": "product/details/270-scen2.jpg",
      "label": "智慧农业"
     },
     {
      "img": "product/details/285-scen1.jpg",
      "label": "办公环境"
     },
     {
      "img": "product/details/285-scen7.jpg",
      "label": "智慧工业"
     },
     {
      "img": "product/details/285-scen3.jpg",
      "label": "医院"
     }
    ],
    "related": [
     "302",
     "270",
     "274",
     "280",
     "281",
     "282",
     "283",
     "284",
     "285"
    ],
    "summary": "宏太 H 系列温湿度传感器是面向洁净室、电气柜、博物馆与产线的无线气候监测终端：开槽烧结探头测量 0–100% RH 与 -20℃ 至 +80℃，典型精度 ±0.2℃ / ±2% RH，电池续航超 10 年，支持 4G / NB-IoT 云端上报。",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "数据中心与机房",
      "desc": "机柜级温湿度跟踪，让 IT 设备保持在安全运行区间。",
      "img": "product/details/270-scen3.jpg"
     },
     {
      "name": "医药仓储",
      "desc": "监测药房、冷库与病房——湿度直接影响药品稳定性。",
      "img": "product/details/270-scen4.jpg"
     },
     {
      "name": "博物馆与档案馆",
      "desc": "连续记录气候，防止纸质、织物与文物受潮结露。"
     },
     {
      "name": "食品加工与仓储",
      "desc": "监控加工车间与库房湿度，防霉防结露。",
      "img": "product/details/270-scen5.jpg"
     },
     {
      "name": "电气柜与箱变",
      "desc": "线缆式探头伸入柜内，在凝露腐蚀发生前预警。",
      "img": "product/details/285-scen7.jpg"
     },
     {
      "name": "农业大棚",
      "desc": "温湿度趋势联动通风与灌溉决策。",
      "img": "product/details/270-scen2.jpg"
     },
     {
      "name": "办公楼与医院",
      "desc": "让公共建筑的室内舒适度与卫生指标达标。",
      "img": "product/details/285-scen1.jpg"
     }
    ],
    "certifications": [
     "IP65"
    ],
    "faqs": [
     {
      "q": "量程和精度是多少？",
      "a": "湿度 0–100% RH、温度 -20℃ 至 +80℃，典型精度 ±0.2℃ / ±2% RH。开槽烧结探头采用线缆安装，可伸入柜体与风道内部。"
     },
     {
      "q": "支持越限报警吗？",
      "a": "支持。温湿度上下限均可远程配置，越限时通过云平台推送告警。"
     },
     {
      "q": "电池能用多久？",
      "a": "1 小时上报周期下超 10 年，安装点无需市电布线。"
     },
     {
      "q": "支持哪些无线网络？",
      "a": "4G 与 NB-IoT，经 MQTT 上行至宏太云、客户云或私有化部署；多传感器密集部署的场合可选 LoRa 加私有网关。"
     }
    ],
    "dateModified": "2026-08-30"
   },
   "302": {
    "series": "H系列 · 温湿度记录仪",
    "tagline": "可审计 | NFC | USB导出",
    "desc": "宏太通信温湿度记录仪支持 NFC 贴近配置与 USB 一键导出，机内存储 80,000 条读数，为冷链、医药与食品物流提供可审计的温湿度记录",
    "heroImg": "product/details/302-hero.png",
    "pdf": "/downloads/temperature-humidity-data-logger-datasheet.pdf",
    "crumbCat": "温度监测",
    "returnCid": "263",
    "features": [
     {
      "icon": "product/details/270-f1.png",
      "text": "精度：±0.2°C / ±2% RH（典型值）"
     },
     {
      "icon": "product/details/270-f2-ip65.png",
      "text": "IP65 高防护等级"
     },
     {
      "icon": "product/details/270-f3.png",
      "text": "80,000 条读数机内存储"
     },
     {
      "icon": "product/details/270-f4.png",
      "text": "NFC 贴近配置，USB 一键导出"
     },
     {
      "icon": "product/details/270-f5.png",
      "text": "节能技术，持久续航"
     },
     {
      "icon": "product/details/270-f6.png",
      "text": "独立记录：NFC/USB，无需网关"
     },
     {
      "icon": "product/details/270-f7.png",
      "text": "每条读数均带时间戳"
     },
     {
      "icon": "product/details/270-f9.png",
      "text": "免费本地软件：曲线分析与 PDF/CSV 导出"
     }
    ],
    "specsTitle": "技术参数",
    "specsDesc": "持续创新，采用微功耗处理器与算法优化，实现物联传感器长达10年的稳定运行，减少维护成本。",
    "specs": [
     [
      "产品型号",
      "H200L/H300L"
     ],
     [
      "存储容量",
      "80,000 条读数"
     ],
     [
      "测量精度",
      "±0.2°C / ±2% RH（典型值）"
     ],
     [
      "配置方式",
      "NFC（Android/iOS App）"
     ],
     [
      "数据导出",
      "USB，PDF/CSV 报告"
     ],
     [
      "电池寿命",
      "多年续航（可更换电池）"
     ],
     [
      "防护等级",
      "IP65"
     ],
     [
      "安装方式",
      "独立摆放·悬挂·背胶"
     ]
    ],

    "specsStructured": [
     {
      "name": "产品型号",
      "value": "H200L/H300L"
     },
     {
      "name": "存储容量",
      "value": "80,000 条读数"
     },
     {
      "name": "测量精度",
      "value": "±0.2°C / ±2% RH（典型值）"
     },
     {
      "name": "配置方式",
      "value": "NFC（Android/iOS App）"
     },
     {
      "name": "数据导出",
      "value": "USB，PDF/CSV 报告"
     },
     {
      "name": "电池寿命",
      "value": "多年续航（可更换电池）"
     },
     {
      "name": "防护等级",
      "value": "IP65"
     },
     {
      "name": "安装方式",
      "value": "独立摆放·悬挂·背胶"
     }
    ],    "certImgs": [],
    "scenariosHeading": "应用行业",
    "scenarios": [
     {
      "img": "product/details/285-scen4.jpg",
      "label": "冷链运输"
     },
     {
      "img": "product/details/270-scen5.jpg",
      "label": "食品加工"
     },
     {
      "img": "product/details/270-scen4.jpg",
      "label": "医疗监测"
     },
     {
      "img": "product/details/285-scen3.jpg",
      "label": "医院"
     },
     {
      "img": "product/details/285-scen7.jpg",
      "label": "智慧工业"
     },
     {
      "img": "product/details/285-scen6.jpg",
      "label": "数据中心"
     }
    ],
    "related": [
     "301",
     "270",
     "285",
     "274",
     "280",
     "281",
     "282",
     "283"
    ],
    "summary": "宏太 H 系列温湿度记录仪可存储 8 万条读数，典型精度 ±0.2℃ / ±2% RH；NFC 手机碰一碰配置（Android/iOS），USB 一键导出 PDF/CSV 报告，配套免费本地曲线分析软件，电池可换、多年续航，满足冷链、医药与食品物流的审计留痕要求。",
    "sku": "H200L/H300L",
    "applications": [
     {
      "name": "冷链运输",
      "desc": "为冷藏车、冷藏集装箱与末端保温箱提供行程级温度记录。",
      "img": "product/details/285-scen4.jpg"
     },
     {
      "name": "医药流通",
      "desc": "为疫苗、胰岛素与生物制品运输提供可审计的 PDF/CSV 凭证。",
      "img": "product/details/270-scen4.jpg"
     },
     {
      "name": "食品加工与仓储",
      "desc": "契合 HACCP 的加工车间、冷库与陈列柜记录。",
      "img": "product/details/270-scen5.jpg"
     },
     {
      "name": "医院与实验室",
      "desc": "冰箱、冷柜与培养箱的合规记录。",
      "img": "product/details/285-scen3.jpg"
     },
     {
      "name": "仓储物流",
      "desc": "保税仓与普通仓库的长期环境记录。",
      "img": "product/details/276-scen3.jpg"
     },
     {
      "name": "机房与档案库房",
      "desc": "无需无线上联场合的就地记录。",
      "img": "product/details/285-scen6.jpg"
     }
    ],
    "certifications": [
     "IP65"
    ],
    "faqs": [
     {
      "q": "记录仪怎么配置、怎么取数？",
      "a": "用支持 NFC 的 Android 或 iOS 手机碰一碰即可启动、停止与配置；行程结束插 USB 一键导出 PDF/CSV 报告，也可用免费本地软件做曲线分析。"
     },
     {
      "q": "能存多少条数据？",
      "a": "最多 8 万条读数。按 5 分钟间隔计算，可连续记录约 9 个月。"
     },
     {
      "q": "电池能换吗？",
      "a": "可以。记录仪采用可更换电池，多年续航，同一台设备可反复执行多年运输任务。"
     },
     {
      "q": "数据会无线上传吗？",
      "a": "不会。这是一款本地记录设备：数据保存在记录仪内，通过 USB 导出或 NFC 读取，适合不需要实时上联的跨境运输与审计交付场景。"
     }
    ],
    "dateModified": "2026-08-30"
   },
   "303": {
    "series": "H系列 · TVOC传感器",
    "tagline": "VOC监测 | 固定安装 | 超低功耗",
    "desc": "宏太通信 TVOC 传感器监测总挥发性有机物，量程 0-100,000 ppb、分辨率 1 ppb，为喷漆房、化学品仓库与实验室提供远程告警",
    "heroImg": "product/details/303-hero.png",
    "pdf": "/downloads/tvoc-sensor-datasheet.pdf",
    "crumbCat": "空气质量",
    "returnCid": "265",
    "features": [
     {
      "icon": "product/details/270-f1.png",
      "text": "分辨率：1 ppb"
     },
     {
      "icon": "product/details/270-f2.png",
      "text": "IP68 防护等级，支持定制"
     },
     {
      "icon": "product/details/270-f3.png",
      "text": "量程：0-100,000 ppb"
     },
     {
      "icon": "product/details/270-f4.png",
      "text": "支持 NFC 激活、添加与维护设备"
     },
     {
      "icon": "product/details/270-f5.png",
      "text": "节能技术，持久续航"
     },
     {
      "icon": "product/details/270-f6.png",
      "text": "支持多种无线技术：4G、NB-IoT、LoRa"
     },
     {
      "icon": "product/details/270-f7.png",
      "text": "远程 VOC 监测：随时随地查看数据"
     },
     {
      "icon": "product/details/270-f8.png",
      "text": "智能告警：超阈值自动通知用户"
     }
    ],
    "specsTitle": "技术参数",
    "specsDesc": "持续创新，采用微功耗处理器与算法优化，实现物联传感器长达10年的稳定运行，减少维护成本。",
    "specs": [
     [
      "产品型号",
      "H200/H300/H500"
     ],
     [
      "测量范围",
      "0-100,000 ppb"
     ],
     [
      "分辨率",
      "1 ppb"
     ],
     [
      "通讯协议",
      "MQTT"
     ],
     [
      "检测原理",
      "电化学 / PID（按气体选型）"
     ],
     [
      "工作频段",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "电池寿命",
      "按1小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     ],
     [
      "安装方式",
      "挂耳·管道安装"
     ]
    ],

    "specsStructured": [
     {
      "name": "产品型号",
      "value": "H200/H300/H500"
     },
     {
      "name": "测量范围",
      "value": "0-100,000 ppb",
      "minValue": 0.0,
      "maxValue": 100000.0
     },
     {
      "name": "分辨率",
      "value": "1 ppb",
      "unitText": "十亿分之一"
     },
     {
      "name": "通讯协议",
      "value": "MQTT"
     },
     {
      "name": "检测原理",
      "value": "电化学 / PID（按气体选型）"
     },
     {
      "name": "工作频段",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "电池寿命",
      "value": "按1小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     },
     {
      "name": "安装方式",
      "value": "挂耳·管道安装"
     }
    ],    "certImgs": [],
    "scenariosHeading": "应用行业",
    "scenarios": [
     {
      "img": "product/details/285-scen7.jpg",
      "label": "智慧工业"
     },
     {
      "img": "product/details/283-scen5.jpg",
      "label": "化工行业"
     },
     {
      "img": "product/details/285-scen1.jpg",
      "label": "办公环境"
     },
     {
      "img": "product/details/285-scen3.jpg",
      "label": "医院"
     },
     {
      "img": "product/details/285-scen5.jpg",
      "label": "住宅环境"
     },
     {
      "img": "product/details/283-scen7.jpg",
      "label": "智慧建筑"
     }
    ],
    "related": [
     "305",
     "285",
     "301",
     "302",
     "270",
     "274",
     "284",
     "283"
    ],
    "summary": "宏太 H 系列 TVOC 传感器是总挥发性有机物的无线监测终端：量程 0-100000ppb、分辨率 1ppb，按气体选配电化学或 PID 原理，支持远程告警，电池续航超 10 年，支持喷漆房、化学品仓与实验室的安全监测。",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "喷漆房与涂装线",
      "desc": "在喷涂与固化溶剂挥发区域连续跟踪 TVOC。",
      "img": "product/details/283-scen6.jpg"
     },
     {
      "name": "化学品仓储",
      "desc": "对桶装、罐区与储存柜周边蒸气积聚做早期预警。",
      "img": "product/details/283-scen5.jpg"
     },
     {
      "name": "实验室",
      "desc": "通风橱与室内 TVOC 监测，保障实验人员安全。",
      "img": "product/details/274-scen5.jpg"
     },
     {
      "name": "印刷包装厂",
      "desc": "印刷机与复合机周边的溶剂蒸气监测。",
      "img": "product/details/285-scen7.jpg"
     },
     {
      "name": "室内空气质量项目",
      "desc": "TVOC 作为楼宇健康审计的核心指标。",
      "img": "product/details/285-scen1.jpg"
     },
     {
      "name": "污水与固废设施",
      "desc": "处理厂区异味相关 VOC 趋势监测。",
      "img": "product/details/283-scen4.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "TVOC 量程与分辨率是多少？",
      "a": "量程 0-100000ppb，分辨率 1ppb；按目标气体组分选配电化学或 PID 检测原理。"
     },
     {
      "q": "浓度异常时能报警吗？",
      "a": "可以。阈值远程配置，越限时经云平台推送告警，在浓度积聚前启动现场处置流程。"
     },
     {
      "q": "防护等级是多少？",
      "a": "标准外壳满足工业现场要求；长期暴露的户外点位可定制 IP68，告知安装环境即可。"
     },
     {
      "q": "怎么供电联网？",
      "a": "内置电池 1 小时上报续航超 10 年，经 4G 或 NB-IoT 以 MQTT 接入宏太云或私有平台。"
     }
    ],
    "dateModified": "2026-08-30"
   },
   "304": {
    "series": "H系列 · 资产定位终端",
    "tagline": "定位追踪 | 多年续航 | 坚固耐用",
    "desc": "宏太通信资产定位终端融合 GPS 与北斗双模定位，多年电池续航，让托盘、工具与周转箱在跨园区流转中全程可视，并支持电子围栏告警",
    "heroImg": "product/details/304-hero.png",
    "pdf": "/downloads/asset-tracking-sensor-datasheet.pdf",
    "crumbCat": "资产定位",
    "returnCid": "306",
    "features": [
     {
      "icon": "product/details/270-f1.png",
      "text": "GPS + 北斗双模定位"
     },
     {
      "icon": "product/details/270-f2-ip67.png",
      "text": "IP67 高防护等级"
     },
     {
      "icon": "product/details/270-f3.png",
      "text": "LBS 室内辅助定位"
     },
     {
      "icon": "product/details/270-f4.png",
      "text": "支持 NFC 激活、添加与维护设备"
     },
     {
      "icon": "product/details/270-f5.png",
      "text": "节能技术，持久续航"
     },
     {
      "icon": "product/details/270-f6.png",
      "text": "4G / NB-IoT 位置上报"
     },
     {
      "icon": "product/details/270-f7.png",
      "text": "云端地图与历史轨迹回放"
     },
     {
      "icon": "product/details/270-f8.png",
      "text": "电子围栏与移动告警"
     }
    ],
    "specsTitle": "技术参数",
    "specsDesc": "持续创新，采用微功耗处理器与算法优化，实现物联传感器长达10年的稳定运行，减少维护成本。",
    "specs": [
     [
      "产品型号",
      "H200T"
     ],
     [
      "定位方式",
      "GPS / 北斗 / LBS"
     ],
     [
      "通讯方式",
      "4G / NB-IoT"
     ],
     [
      "通讯协议",
      "MQTT"
     ],
     [
      "电池寿命",
      "多年续航（按上报周期）"
     ],
     [
      "防护等级",
      "IP67"
     ],
     [
      "安装方式",
      "磁吸·螺丝·扎带"
     ],
     [
      "工作温度",
      "-20°C～+70°C"
     ]
    ],

    "specsStructured": [
     {
      "name": "产品型号",
      "value": "H200T"
     },
     {
      "name": "定位方式",
      "value": "GPS / 北斗 / LBS"
     },
     {
      "name": "通讯方式",
      "value": "4G / NB-IoT"
     },
     {
      "name": "通讯协议",
      "value": "MQTT"
     },
     {
      "name": "电池寿命",
      "value": "多年续航（按上报周期）"
     },
     {
      "name": "防护等级",
      "value": "IP67"
     },
     {
      "name": "安装方式",
      "value": "磁吸·螺丝·扎带"
     },
     {
      "name": "工作温度",
      "value": "-20°C～+70°C",
      "minValue": -20.0,
      "maxValue": 70.0
     }
    ],    "certImgs": [],
    "scenariosHeading": "应用行业",
    "scenarios": [
     {
      "img": "product/details/285-scen4.jpg",
      "label": "智慧交通"
     },
     {
      "img": "product/details/285-scen7.jpg",
      "label": "智慧工业"
     },
     {
      "img": "product/details/285-scen2.jpg",
      "label": "智慧城市"
     },
     {
      "img": "product/details/283-scen8.jpg",
      "label": "智慧能源"
     },
     {
      "img": "product/details/283-scen4.jpg",
      "label": "智慧水厂"
     },
     {
      "img": "product/details/283-scen7.jpg",
      "label": "智慧建筑"
     }
    ],
    "related": [
     "301",
     "302",
     "303",
     "305",
     "270",
     "274",
     "280",
     "285"
    ],
    "summary": "宏太 H 系列资产定位传感器融合 GPS / 北斗 / LBS 定位与 4G / NB-IoT 上联：多年电池续航、IP67 外壳、磁吸 / 螺丝 / 扎带三种安装方式，让托盘、工装与周转箱跨场地可视，并支持电子围栏越界告警。",
    "sku": "H200T",
    "applications": [
     {
      "name": "托盘与周转箱循环",
      "desc": "可循环运输器具在供应商、工厂与仓库之间全程可视。",
      "img": "product/details/276-scen3.jpg"
     },
     {
      "name": "工装与设备追踪",
      "desc": "在大型厂区内快速找到共享工装与便携设备。",
      "img": "product/details/285-scen7.jpg"
     },
     {
      "name": "物流车队",
      "desc": "挂车、集装箱与牵引器具的位置与围栏告警。",
      "img": "product/details/285-scen4.jpg"
     },
     {
      "name": "建筑工地",
      "desc": "跟踪流动性大的发电机、空压机与附具。"
     },
     {
      "name": "市政与公用资产",
      "desc": "看守野外作业的移动水泵、阀门与检修设备。",
      "img": "product/details/283-scen4.jpg"
     },
     {
      "name": "租赁设备",
      "desc": "定位出租机械并发现未经授权的移动。",
      "img": "product/details/284-scen2.jpg"
     }
    ],
    "certifications": [
     "IP67"
    ],
    "faqs": [
     {
      "q": "定位原理是什么？",
      "a": "室外使用 GPS 或北斗卫星定位；室内或城市峡谷环境自动回退到 LBS 基站定位，资产全程可追。"
     },
     {
      "q": "电池能用多久？",
      "a": "多年续航，与上报频率相关——每天定位次数越少，用得越久；具体按部署方案配置。"
     },
     {
      "q": "怎么固定到资产上？",
      "a": "三种方式：钢结构用磁吸、长期固定用螺丝、托盘与异形件用扎带。IP67 外壳防雨防尘。"
     },
     {
      "q": "资产离开场地能报警吗？",
      "a": "可以。在平台上绘制电子围栏，资产越界即刻推送告警。"
     }
    ],
    "dateModified": "2026-08-30"
   },
   "305": {
    "series": "H系列 · 定制气体传感器",
    "tagline": "100+气体 | 固定/管道 | OEM/ODM",
    "desc": "选定气体，我们为您定制终端。宏太通信定制气体传感器支持 CO、H₂S、NH₃、O₃、CH₄ 等 100 余种气体，提供固定式与管道式结构，守护工业安全",
    "heroImg": "product/details/305-hero.png",
    "pdf": "/downloads/custom-gas-sensor-datasheet.pdf",
    "crumbCat": "空气质量",
    "returnCid": "265",
    "features": [
     {
      "icon": "product/details/270-f1.png",
      "text": "电化学 / NDIR / PID 检测原理"
     },
     {
      "icon": "product/details/270-f2.png",
      "text": "IP68 防护等级，支持定制"
     },
     {
      "icon": "product/details/270-f3.png",
      "text": "100+ 气体：CO、H₂S、NH₃、O₃、CH₄…"
     },
     {
      "icon": "product/details/270-f4.png",
      "text": "支持 NFC 激活、添加与维护设备"
     },
     {
      "icon": "product/details/270-f5.png",
      "text": "节能技术，持久续航"
     },
     {
      "icon": "product/details/270-f6.png",
      "text": "支持多种无线技术：4G、NB-IoT、LoRa"
     },
     {
      "icon": "product/details/270-f7.png",
      "text": "远程气体监测：随时随地查看数据"
     },
     {
      "icon": "product/details/270-f8.png",
      "text": "智能告警：超阈值自动通知用户"
     }
    ],
    "specsTitle": "技术参数",
    "specsDesc": "持续创新，采用微功耗处理器与算法优化，实现物联传感器长达10年的稳定运行，减少维护成本。",
    "specs": [
     [
      "产品型号",
      "H200/H300/H500"
     ],
     [
      "目标气体",
      "100+ 种气体可定制"
     ],
     [
      "测量范围",
      "按气体定制"
     ],
     [
      "通讯协议",
      "MQTT"
     ],
     [
      "检测原理",
      "电化学 / NDIR / PID"
     ],
     [
      "工作频段",
      "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     ],
     [
      "电池寿命",
      "按1小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     ],
     [
      "安装方式",
      "固定式·管道式"
     ]
    ],

    "specsStructured": [
     {
      "name": "产品型号",
      "value": "H200/H300/H500"
     },
     {
      "name": "目标气体",
      "value": "100+ 种气体可定制"
     },
     {
      "name": "测量范围",
      "value": "按气体定制"
     },
     {
      "name": "通讯协议",
      "value": "MQTT"
     },
     {
      "name": "检测原理",
      "value": "电化学 / NDIR / PID"
     },
     {
      "name": "工作频段",
      "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
     },
     {
      "name": "电池寿命",
      "value": "按1小时上报间隔设计续航超10年，实际受网络、温度、配置与上报频率影响"
     },
     {
      "name": "安装方式",
      "value": "固定式·管道式"
     }
    ],    "certImgs": [],
    "scenariosHeading": "应用行业",
    "scenarios": [
     {
      "img": "product/details/283-scen3.jpg",
      "label": "煤矿行业"
     },
     {
      "img": "product/details/283-scen5.jpg",
      "label": "化工行业"
     },
     {
      "img": "product/details/283-scen4.jpg",
      "label": "智慧水厂"
     },
     {
      "img": "product/details/285-scen7.jpg",
      "label": "智慧工业"
     },
     {
      "img": "product/details/283-scen1.jpg",
      "label": "智慧井盖"
     },
     {
      "img": "product/details/285-scen1.jpg",
      "label": "办公环境"
     }
    ],
    "related": [
     "303",
     "285",
     "274",
     "270",
     "301",
     "280",
     "284",
     "283"
    ],
    "summary": "选定气体，宏太围绕它构建终端：H 系列定制气体传感器支持 CO、H₂S、NH₃、O₃、CH₄ 等 100 余种气体，电化学 / NDIR / PID 原理按需选配，固定式或管道式外壳，4G / NB-IoT 上联，电池续航超 10 年。",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "煤矿井下",
      "desc": "在有线瓦斯系统难以延伸的点位监测 CH₄ 与 CO。",
      "img": "product/details/283-scen3.jpg"
     },
     {
      "name": "化工园区",
      "desc": "针对生产与储存区域的特征气体做点式监测。",
      "img": "product/details/283-scen5.jpg"
     },
     {
      "name": "水厂与污水厂",
      "desc": "进水泵房、格栅间与污泥间的 H₂S 检测。",
      "img": "product/details/283-scen4.jpg"
     },
     {
      "name": "冷库与制冷",
      "desc": "氨制冷机房的 NH₃ 泄漏检测。",
      "img": "product/details/270-scen5.jpg"
     },
     {
      "name": "窨井与受限空间",
      "desc": "市政受限空间的进入前与连续气体检测。",
      "img": "product/details/283-scen1.jpg"
     },
     {
      "name": "半导体与实验室",
      "desc": "按在用气体定制的特种气体泄漏监测。",
      "img": "product/details/274-scen2.jpg"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "可以检测哪些气体？",
      "a": "覆盖 CO、H₂S、NH₃、O₃、CH₄、Cl₂ 及 VOCs 等 100 余种气体；量程与原理（电化学 / NDIR / PID）按目标气体匹配。"
     },
     {
      "q": "定制气体传感器怎么下单？",
      "a": "告知目标气体、预期量程、安装方式（固定式或管道式）与现场条件，宏太工程团队按 OEM/ODM 流程确认配置与交期。"
     },
     {
      "q": "外壳能适应户外安装吗？",
      "a": "可以。固定式与管道式外壳覆盖多数现场；长期暴露点位可定制 IP68 防护。"
     },
     {
      "q": "报警怎么上报？",
      "a": "经 4G 或 NB-IoT 以 MQTT 无线上报至宏太云或私有平台，告警阈值远程配置。"
     }
    ],
    "dateModified": "2026-08-30"
   }
  }
 }
};

/**
 * 产品语义化 URL（19 个系列）：数字 id → 专业英文 slug
 * 新详情页地址 /product/<slug>.html（中文 /zh/product/<slug>.html）；
 * 旧数字地址 /product/show/id/<id>.html 保留为跳转页，外部旧链接与已收录地址不死链。
 * 新增产品时在下面加一行即可，站内所有链接自动跟随。
 */
// ES 占位：阶段 2 批次 4 翻译 product.ts 前，先复用英文内容保证构建通过
// ES 内容：阶段 2 批次 4 完成（译法见《EN→ES 术语表 v1》）
export const productContent = { ...productContentBase, de: {
 "cloud": {
  "banner": {
   "title": "Hitelecom Cloud",
   "subtitle": "Eine sichere und zuverlässige IoT-Plattform",
   "desc": "Hitelecom Cloud ist eine intelligente Datenintegrationsplattform, die Geräteanbindung, Fernüberwachung und erweiterte Datenanalysen bietet und es Unternehmen ermöglicht, Abläufe zu optimieren und fundierte Entscheidungen zu treffen.",
   "images": [
    "product/cloud/banner-1.png",
    "product/cloud/banner-2.png",
    "product/cloud/banner-3.png",
    "product/cloud/banner-4.png"
   ]
  },
  "intro": {
   "heading": "Feldgeräte mit der Cloud verbinden",
   "paras": [
    "Hitelecom bietet eine integrierte Lösung aus IoT-Sensoren, Gateways, Controllern und Cloud-Software, damit Felddaten mit weniger Integrationsschritten vom Gerät auf Ihr Dashboard gelangen.",
    "Das Ultra-Low-Power-Design der Geräte senkt den Energieverbrauch über den gesamten Produktlebenszyklus und unterstützt langfristige, nachhaltige Bereitstellungen."
   ],
   "cards": [
    {
     "img": "product/cloud/deploy-1.png",
     "title": "Öffentliche Cloud",
     "desc": "Verbinden und verwalten Sie Geräte schnell mit Überwachung, Alarmen, Analysen und Fernwartung auf Hitelecom Cloud."
    },
    {
     "img": "product/cloud/deploy-2.png",
     "title": "Private Cloud",
     "desc": "Stellen Sie die Plattform auf kundenkontrollierter Infrastruktur bereit – für Datenisolation, Zugriffskontrolle und lokale Abläufe."
    },
    {
     "img": "product/cloud/deploy-3.png",
     "title": "Hybride Cloud",
     "desc": "Behalten Sie sensible Workloads auf privater Infrastruktur, während Sie die öffentliche Cloud für ausgewählte Dienste und skalierbare Workloads nutzen."
    },
    {
     "img": "product/cloud/deploy-4.png",
     "title": "Edge-Cloud",
     "desc": "Verarbeiten Sie Daten lokal, führen Sie grundlegende Steuerungslogik aus und halten Sie ausgewählte Funktionen verfügbar, wenn die Cloud-Verbindung eingeschränkt ist."
    }
   ]
  },
  "features": {
   "heading": "Funktionen der Hitelecom Cloud",
   "items": [
    {
     "img": "product/cloud/feature-1.png",
     "text": "Durchgängige IoT-Lösung"
    },
    {
     "img": "product/cloud/feature-2.png",
     "text": "Geräteanbindung in großem Maßstab"
    },
    {
     "img": "product/cloud/feature-3.png",
     "text": "Hochverfügbare verteilte Architektur"
    },
    {
     "img": "product/cloud/feature-4.png",
     "text": "Verarbeitung mit geringer Latenz"
    },
    {
     "img": "product/cloud/feature-5.png",
     "text": "Multi-Protokoll-Support"
    },
    {
     "img": "product/cloud/feature-6.png",
     "text": "Visueller Betrieb und Wartung"
    },
    {
     "img": "product/cloud/feature-7.png",
     "text": "HiLink-Geräteprotokoll"
    },
    {
     "img": "product/cloud/feature-8.png",
     "text": "Kundenspezifische Hardware- und Softwareentwicklung"
    }
   ]
  },
  "architecture": {
   "heading": "Plattformarchitektur",
   "img": "product/cloud/architecture.gif"
  },
  "core": {
   "heading": "Kernfunktionen",
   "subtitle": "Beschleunigen Sie Ihr IoT-Geschäft durch effiziente Konnektivität und präzise Verwaltung",
   "items": [
    {
     "img": "product/cloud/core-1.jpg",
     "title": "Geräteanbindung",
     "desc": "Verbinden Sie Sensoren, Controller, Gateways und Edge-Geräte über MQTT, HTTP, TCP, CoAP, AMQP oder das HiLink-Protokoll, je nach Geräteunterstützung."
    },
    {
     "img": "product/cloud/core-2.jpg",
     "title": "Geräteverwaltung",
     "desc": "Sehen Sie den Live-Gerätestatus, überwachen Sie die Verbindungsqualität und analysieren Sie Alarme.\n\nStore-and-Forward mit Wiederholung hält den Datenfluss bei instabilen Netzbedingungen aufrecht.\n\nSehen Sie die Geräteverteilung und Standortdaten in einer Kartenansicht.\n\nVerwalten Sie remote OTA-Firmware-Updates und Stapeloperationen für unterstützte Geräte."
    },
    {
     "img": "product/cloud/core-3.jpg",
     "title": "Alarmregeln",
     "desc": "Konfigurieren Sie flexible Alarmregeln mit Auslösebedingungen und Attributberechnungen für die kontinuierliche Geräteüberwachung.\n\nErkennen Sie Bedingungen wie hohe Temperatur, anormalen Druck oder schnellen Durchfluss zur Unterstützung zeitnaher Entscheidungen.\n\nAlarme werden automatisch aufgehoben, wenn die auslösende Bedingung wieder normal ist, was manuelle Nachverfolgung reduziert.\n\nStellen Sie Alarmkonfigurationen stapelweise bereit und empfangen Sie Alarmberichte von verbundenen Terminals."
    },
    {
     "img": "product/cloud/core-4.jpg",
     "title": "Datenvisualisierung",
     "desc": "Erstellen Sie Dashboards für Desktop-, Mobil- und Großformat-Layouts, live mit Gerätedatenquellen verbunden.\n\nSehen Sie Dashboards auf Videowänden, PCs, Tablets und Telefonen mit Echtzeit-Aktualisierung.\n\nAlarme erscheinen nahezu in Echtzeit, und Konfigurationsbefehle können vom Dashboard ausgegeben werden, je nach Gerätekonnektivität.\n\nOptionale GIS- und Digital-Zwilling-Ansichten können Gerätestandort, -status und Bewegungsverlauf anzeigen."
    },
    {
     "img": "product/cloud/core-5.jpg",
     "title": "Offene APIs",
     "desc": "Offene APIs zur Integration von Drittgeräten und -controllern.\n\nNutzen Sie APIs oder MQTT, um Gerätedaten an Kunden-Rechenzentren oder -Plattformen zu senden.\n\nDie Cloud-zu-Cloud-Integration kann unterstützte Drittdaten in Hitelecom Cloud konsolidieren."
    },
    {
     "img": "product/cloud/core-6.webp",
     "title": "Regelbasierte Automatisierung",
     "desc": "Verknüpfen Sie Geräte mit Szenenregeln: Schalten Sie etwa die Kühlung ein, wenn die Temperatur einen konfigurierten Schwellenwert überschreitet, oder lösen Sie unterstützte Bewässerungscontroller aus, wenn die Bodenfeuchte unter den konfigurierten Schwellenwert fällt.\n\nIn Kombination mit den Ultra-Low-Power-IoT-Terminals von Hitelecom reduziert die regelbasierte Automatisierung routinemäßige manuelle Eingriffe."
    }
   ]
  },
  "scenarios": {
   "heading": "Anwendungsszenarien",
   "tabs": [
    {
     "icons": [
      "product/cloud/scen-icon-1a.png",
      "product/cloud/scen-icon-1b.png"
     ],
     "label": "Industrielles IoT"
    },
    {
     "icons": [
      "product/cloud/scen-icon-2a.png",
      "product/cloud/scen-icon-2b.png"
     ],
     "label": "Intelligente Energie"
    },
    {
     "icons": [
      "product/cloud/scen-icon-3a.png",
      "product/cloud/scen-icon-3b.png"
     ],
     "label": "Intelligenter Campus"
    },
    {
     "icons": [
      "product/cloud/scen-icon-4a.png",
      "product/cloud/scen-icon-4b.png"
     ],
     "label": "Intelligente Landwirtschaft"
    }
   ],
   "bgs": [
    "product/cloud/scen-bg-1.jpg",
    "product/cloud/scen-bg-2.jpg",
    "product/cloud/scen-bg-3.png",
    "product/cloud/scen-bg-4.png"
   ],
   "slides": [
    {
     "img": "product/cloud/scen-bg-1.jpg",
     "title": "Industrielles IoT",
     "desc": "Verbinden Sie Geräte, Systeme und Teams, um Produktionsprozesse zu straffen und die Ressourcennutzung zu verbessern. Die Sensorterminals von Hitelecom bieten Echtzeitüberwachung des Anlagenstatus und unterstützen zustandsbasierte Wartung und schnelle Fehlerreaktion."
    },
    {
     "img": "product/cloud/scen-bg-2.jpg",
     "title": "Intelligente Energie",
     "desc": "Die Sensorterminals von Hitelecom unterstützen das Energiemanagement durch Echtzeitüberwachung, Datenerfassung und Fernsteuerung. Die Daten unterstützen Energieanalysen und zustandsbasierte Wartung und reduzieren routinegemäße manuelle Arbeit. Hitelecom Cloud kann über unterstützte APIs und Protokolle in bestehende Energiesysteme integriert werden und hilft Unternehmen, Betriebskosten und Nachhaltigkeitskennzahlen zu verfolgen."
    },
    {
     "img": "product/cloud/scen-bg-3.png",
     "title": "Intelligenter Campus",
     "desc": "IoT in intelligenten Campus verbindet Geräte und teilt Daten über Einrichtungen hinweg. Die Sensorterminals von Hitelecom bieten Echtzeitüberwachung von Campus-Umgebung, Sicherheitsbedingungen und Energieverbrauch und geben Administratoren ein kontinuierliches Betriebsbild."
    },
    {
     "img": "product/cloud/scen-bg-4.png",
     "title": "Intelligente Landwirtschaft",
     "desc": "Die intelligenten IoT-Geräte von Hitelecom überwachen Bodenfeuchte, Temperatur und Licht in Echtzeit und liefern Daten zur Unterstützung von Bewässerungs- und Düngungsentscheidungen, wodurch routinemäßige Feldarbeit reduziert werden kann. Integriert mit Wetterstationen und unterstützten Bewässerungscontrollern verbinden sie die Feldsensorik mit der automatisierten Hofverwaltung."
    }
   ]
  },
  "cta": {
   "title": "Erleben Sie Hitelecom Cloud",
   "subtitle": "Eine unkomplizierte Plattform zum Verbinden, Überwachen und Verwalten unterstützter IoT-Geräte.",
   "primary": "Cloud-Demo ansehen",
   "secondary": "Mit einem Spezialisten sprechen"
  }
 },
 "app": {
  "banner": {
   "title": "Hitelecom App",
   "subtitle": "Fernüberwachung für Ihr Unternehmen – von überall",
   "desc": "Die Hitelecom App ist ein einfaches, praktisches Fernüberwachungswerkzeug. Greifen Sie von überall über Ihr Mobilgerät auf Ihre vernetzten Geräte zu und verwalten Sie sie.",
   "images": [
    "product/cloud/banner-1.png",
    "product/cloud/banner-2.png",
    "product/cloud/banner-3.png",
    "product/app/banner-4.png"
   ]
  },
  "platforms": {
   "heading": "Auf allen Plattformen verfügbar",
   "items": [
    {
     "img": "product/app/platform-1.png",
     "name": "Windows"
    },
    {
     "img": "product/app/platform-2.png",
     "name": "iOS"
    },
    {
     "img": "product/app/platform-3.png",
     "name": "Android"
    },
    {
     "img": "product/app/platform-4.png",
     "name": "WeChat-Mini-Programm"
    }
   ]
  },
  "features": {
   "heading": "Produktmerkmale",
   "subtitle": "Registrieren Sie Geräte, konfigurieren Sie Sensoren, verwalten Sie Benutzerzugriffe und überwachen Sie Live-Daten aus einer einzigen Anwendung.",
   "items": [
    {
     "img": "product/app/feature-1.png",
     "title": "Geräteaktivierung",
     "desc": "Nutzen Sie die Hitelecom App, um NFC-fähige Geräte zu aktivieren oder zu reaktivieren und so die Bereitstellung und Konfiguration in situ zu beschleunigen."
    },
    {
     "img": "product/app/feature-2.png",
     "title": "Geräteanbindung",
     "desc": "Verbinden Sie aktivierte Geräte mit Hitelecom Cloud und konfigurieren Sie Alarme, Aufgaben, Übertragungsintervalle und Zeitpläne passend zu jeder Bereitstellung."
    },
    {
     "img": "product/app/feature-3.png",
     "title": "Gerätezuweisung",
     "desc": "Erstellen und verwalten Sie Benutzer, Rollen, Abteilungen und Berechtigungen über ein rollenbasiertes Zugriffsmodell."
    },
    {
     "img": "product/app/feature-4.png",
     "title": "Kundenspezifische App-Oberfläche",
     "desc": "Passen Sie App-Komponenten und -Oberflächen an die Arbeitsabläufe und Branding-Anforderungen des Kunden an."
    },
    {
     "img": "product/app/feature-5.png",
     "title": "Daten-Dashboards",
     "desc": "Sehen Sie aktuelle Messwerte, Trends und herunterladbare Berichte in einer Oberfläche."
    },
    {
     "img": "product/app/feature-6.png",
     "title": "Datenvisualisierung auf Karten",
     "desc": "Sehen Sie Gerätestandorte und -status auf interaktiven Karten zur Unterstützung von Feldeinsätzen und Asset-Management."
    },
    {
     "img": "product/app/feature-7.png",
     "title": "Alarmverwaltung",
     "desc": "Die Echtzeitüberwachung des Gerätestatus mit in die App gepushten Alarmen hilft Teams, schneller auf aktivierte Alarme zu reagieren und die Anlagen am Laufen zu halten."
    },
    {
     "img": "product/app/feature-8.png",
     "title": "Mehrsprachiger Support",
     "desc": "Die Standardoberfläche unterstützt Chinesisch und Englisch. Weitere Oberflächensprachen sind über kundenspezifische Entwicklung verfügbar."
    }
   ]
  },
  "app3": {
   "heading": "Anwendungsszenarien",
   "subtitle": "Nutzen Sie vernetzte Felddaten, um Abläufe zu überwachen, auf Alarme zu reagieren und Entscheidungen branchenübergreifend zu verbessern.",
   "items": [
    {
     "img": "product/app/scen-0bbcd0.jpg",
     "label": "Intelligente Landwirtschaft"
    },
    {
     "img": "product/app/scen-214abe.jpg",
     "label": "Umweltüberwachung"
    },
    {
     "img": "product/app/scen-f607f3.jpg",
     "label": "Industrielles IoT"
    },
    {
     "img": "product/app/scen-7d03dc.jpg",
     "label": "Intelligenter Campus"
    },
    {
     "img": "product/app/scen-4f4630.jpg",
     "label": "Intelligente Stadt"
    },
    {
     "img": "product/app/scen-83dd3b.jpg",
     "label": "Intelligentes Wassermanagement"
    },
    {
     "img": "product/app/scen-1c2289.jpg",
     "label": "Intelligente Energie"
    },
    {
     "img": "product/app/scen-67bc5a.jpg",
     "label": "Asset-Tracking"
    }
   ]
  }
 },
 "lists": {
  "261": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "Alle",
     "on": true
    },
    {
     "cid": "263",
     "name": "Temperatur",
     "on": false
    },
    {
     "cid": "262",
     "name": "Druck",
     "on": false
    },
    {
     "cid": "269",
     "name": "Boden",
     "on": false
    },
    {
     "cid": "268",
     "name": "Füllstand",
     "on": false
    },
    {
     "cid": "267",
     "name": "Neigungsüberwachung",
     "on": false
    },
    {
     "cid": "266",
     "name": "Radar-Abstand",
     "on": false
    },
    {
     "cid": "271",
     "name": "Vibrationsüberwachung",
     "on": false
    },
    {
     "cid": "265",
     "name": "Luftqualität",
     "on": false
    },
    {
     "cid": "306",
     "name": "Asset-Tracking",
     "on": false
    }
   ],
   "products": [
    {
     "id": "270",
     "img": "product/products/270.png",
     "name": "Temperatursensor",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "274",
     "img": "product/products/274.png",
     "name": "Drucksensor",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "280",
     "img": "product/products/280.png",
     "name": "Bodensensor",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "281",
     "img": "product/products/281.png",
     "name": "Tauch-Füllstandssensor",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "282",
     "img": "product/products/282.png",
     "name": "Neigungssensor",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "283",
     "img": "product/products/283.png",
     "name": "Radar-Abstandssensor",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "284",
     "img": "product/products/284.png",
     "name": "Vibrationssensor",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "285",
     "img": "product/products/285.png",
     "name": "Luftqualitätssensor",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": 301,
     "name": "Temperatur- und Feuchtigkeitssensor",
     "conn": "NB-IoT | 4G LTE | LoRa",
     "img": "product/products/301.png"
    },
    {
     "id": 302,
     "name": "Datenlogger für Temperatur und Feuchtigkeit",
     "conn": "NFC | USB",
     "img": "product/products/302.png"
    },
    {
     "id": 303,
     "name": "TVOC-Sensor",
     "conn": "NB-IoT | 4G LTE | LoRa",
     "img": "product/products/303.png"
    },
    {
     "id": 304,
     "name": "Asset-Tracking-Sensor",
     "conn": "GPS | BeiDou | 4G LTE",
     "img": "product/products/304.png"
    },
    {
     "id": 305,
     "name": "Kundenspezifischer Gassensor",
     "conn": "NB-IoT | 4G LTE | LoRa",
     "img": "product/products/305.png"
    }
   ]
  },
  "258": {
   "bannerImg": "product/list/banner-258.jpg",
   "subcats": [
    {
     "cid": "258",
     "name": "Alle",
     "on": true
    },
    {
     "cid": "272",
     "name": "Gateway für Innenräume",
     "on": false
    },
    {
     "cid": "273",
     "name": "Gateway für Außenbereich",
     "on": false
    }
   ],
   "products": [
    {
     "id": "276",
     "img": "product/products/276.png",
     "name": "Gateway für Innenräume",
     "conn": "LoRa | 4G LTE | Ethernet"
    },
    {
     "id": "275",
     "img": "product/products/275.png",
     "name": "Gateway für Außenbereich",
     "conn": "LoRa | 4G LTE | Ethernet"
    }
   ]
  },
  "257": {
   "bannerImg": "product/list/banner-257.jpg",
   "subcats": [
    {
     "cid": "257",
     "name": "Alle",
     "on": true
    },
    {
     "cid": "275",
     "name": "6 Parameter",
     "on": false
    },
    {
     "cid": "274",
     "name": "12 Parameter",
     "on": false
    }
   ],
   "products": [
    {
     "id": "278",
     "img": "product/products/278.png",
     "name": "Wetterstation",
     "conn": "Multiparameter | Echtzeit | Einfache Bereitstellung"
    },
    {
     "id": "277",
     "img": "product/products/277.png",
     "name": "Hydrologie-Station",
     "conn": "Echtzeit | Multiparameter | Millimeterbereich"
    }
   ]
  },
  "256": {
   "bannerImg": "product/list/banner-256.jpg",
   "subcats": [
    {
     "cid": "256",
     "name": "Alle",
     "on": true
    },
    {
     "cid": "278",
     "name": "Software",
     "on": false
    },
    {
     "cid": "279",
     "name": "Hardware",
     "on": false
    }
   ],
   "products": [
    {
     "id": "",
     "img": "product/products/custom-1.png",
     "name": "Digitaler Zwilling",
     "conn": "Kundenspezifische Dashboards und dynamische Datenvisualisierung"
    },
    {
     "id": "",
     "img": "product/products/custom-2.png",
     "name": "GIS-Dashboard",
     "conn": "Kundenspezifische Karten und mehrdimensionale Datenvisualisierung"
    },
    {
     "id": "",
     "img": "product/products/custom-3.png",
     "name": "Eingebettete Software",
     "conn": "Eingebettete Software, zugeschnitten auf konkrete Anwendungsanforderungen"
    },
    {
     "id": "",
     "img": "product/products/custom-4.png",
     "name": "Hardware-Anpassung",
     "conn": "Kundenspezifische Sensoren, Controller, Aktoren und andere vernetzte Geräte"
    },
    {
     "id": "287",
     "img": "product/products/287.png",
     "name": "IoT-Zubehör",
     "conn": "Signal Coupling | 2.4 GHz | 5.8 GHz"
    },
    {
     "id": "286",
     "img": "product/products/286.png",
     "name": "2-in-1-Sensor für Gefahrenbereiche",
     "conn": "Temperatur | Druck | 4G-Kommunikation"
    }
   ]
  },
  "262": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "Alle",
     "on": false
    },
    {
     "cid": "263",
     "name": "Temperatur",
     "on": false
    },
    {
     "cid": "262",
     "name": "Druck",
     "on": true
    },
    {
     "cid": "269",
     "name": "Boden",
     "on": false
    },
    {
     "cid": "268",
     "name": "Füllstand",
     "on": false
    },
    {
     "cid": "267",
     "name": "Neigungsüberwachung",
     "on": false
    },
    {
     "cid": "266",
     "name": "Radar-Abstand",
     "on": false
    },
    {
     "cid": "271",
     "name": "Vibrationsüberwachung",
     "on": false
    },
    {
     "cid": "265",
     "name": "Luftqualität",
     "on": false
    },
    {
     "cid": "306",
     "name": "Asset-Tracking",
     "on": false
    }
   ],
   "products": [
    {
     "id": "274",
     "img": "product/products/274.png",
     "name": "Drucksensor",
     "conn": "NB-IoT | 4G LTE | LoRa"
    }
   ]
  },
  "263": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "Alle",
     "on": false
    },
    {
     "cid": "263",
     "name": "Temperatur",
     "on": true
    },
    {
     "cid": "262",
     "name": "Druck",
     "on": false
    },
    {
     "cid": "269",
     "name": "Boden",
     "on": false
    },
    {
     "cid": "268",
     "name": "Füllstand",
     "on": false
    },
    {
     "cid": "267",
     "name": "Neigungsüberwachung",
     "on": false
    },
    {
     "cid": "266",
     "name": "Radar-Abstand",
     "on": false
    },
    {
     "cid": "271",
     "name": "Vibrationsüberwachung",
     "on": false
    },
    {
     "cid": "265",
     "name": "Luftqualität",
     "on": false
    },
    {
     "cid": "306",
     "name": "Asset-Tracking",
     "on": false
    }
   ],
   "products": [
    {
     "id": "270",
     "img": "product/products/270.png",
     "name": "Temperatursensor",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": 301,
     "name": "Temperatur- und Feuchtigkeitssensor",
     "conn": "NB-IoT | 4G LTE | LoRa",
     "img": "product/products/301.png"
    },
    {
     "id": 302,
     "name": "Datenlogger für Temperatur und Feuchtigkeit",
     "conn": "NFC | USB",
     "img": "product/products/302.png"
    }
   ]
  },
  "265": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "Alle",
     "on": false
    },
    {
     "cid": "263",
     "name": "Temperatur",
     "on": false
    },
    {
     "cid": "262",
     "name": "Druck",
     "on": false
    },
    {
     "cid": "269",
     "name": "Boden",
     "on": false
    },
    {
     "cid": "268",
     "name": "Füllstand",
     "on": false
    },
    {
     "cid": "267",
     "name": "Neigungsüberwachung",
     "on": false
    },
    {
     "cid": "266",
     "name": "Radar-Abstand",
     "on": false
    },
    {
     "cid": "271",
     "name": "Vibrationsüberwachung",
     "on": false
    },
    {
     "cid": "265",
     "name": "Luftqualität",
     "on": true
    },
    {
     "cid": "306",
     "name": "Asset-Tracking",
     "on": false
    }
   ],
   "products": [
    {
     "id": "285",
     "img": "product/products/285.png",
     "name": "Luftqualitätssensor",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": 303,
     "name": "TVOC-Sensor",
     "conn": "NB-IoT | 4G LTE | LoRa",
     "img": "product/products/303.png"
    },
    {
     "id": 305,
     "name": "Kundenspezifischer Gassensor",
     "conn": "NB-IoT | 4G LTE | LoRa",
     "img": "product/products/305.png"
    }
   ]
  },
  "266": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "Alle",
     "on": false
    },
    {
     "cid": "263",
     "name": "Temperatur",
     "on": false
    },
    {
     "cid": "262",
     "name": "Druck",
     "on": false
    },
    {
     "cid": "269",
     "name": "Boden",
     "on": false
    },
    {
     "cid": "268",
     "name": "Füllstand",
     "on": false
    },
    {
     "cid": "267",
     "name": "Neigungsüberwachung",
     "on": false
    },
    {
     "cid": "266",
     "name": "Radar-Abstand",
     "on": true
    },
    {
     "cid": "271",
     "name": "Vibrationsüberwachung",
     "on": false
    },
    {
     "cid": "265",
     "name": "Luftqualität",
     "on": false
    },
    {
     "cid": "306",
     "name": "Asset-Tracking",
     "on": false
    }
   ],
   "products": [
    {
     "id": "283",
     "img": "product/products/283.png",
     "name": "Radar-Abstandssensor",
     "conn": "NB-IoT | 4G LTE | LoRa"
    }
   ]
  },
  "267": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "Alle",
     "on": false
    },
    {
     "cid": "263",
     "name": "Temperatur",
     "on": false
    },
    {
     "cid": "262",
     "name": "Druck",
     "on": false
    },
    {
     "cid": "269",
     "name": "Boden",
     "on": false
    },
    {
     "cid": "268",
     "name": "Füllstand",
     "on": false
    },
    {
     "cid": "267",
     "name": "Neigungsüberwachung",
     "on": true
    },
    {
     "cid": "266",
     "name": "Radar-Abstand",
     "on": false
    },
    {
     "cid": "271",
     "name": "Vibrationsüberwachung",
     "on": false
    },
    {
     "cid": "265",
     "name": "Luftqualität",
     "on": false
    },
    {
     "cid": "306",
     "name": "Asset-Tracking",
     "on": false
    }
   ],
   "products": [
    {
     "id": "282",
     "img": "product/products/282.png",
     "name": "Neigungssensor",
     "conn": "NB-IoT | 4G LTE | LoRa"
    }
   ]
  },
  "268": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "Alle",
     "on": false
    },
    {
     "cid": "263",
     "name": "Temperatur",
     "on": false
    },
    {
     "cid": "262",
     "name": "Druck",
     "on": false
    },
    {
     "cid": "269",
     "name": "Boden",
     "on": false
    },
    {
     "cid": "268",
     "name": "Füllstand",
     "on": true
    },
    {
     "cid": "267",
     "name": "Neigungsüberwachung",
     "on": false
    },
    {
     "cid": "266",
     "name": "Radar-Abstand",
     "on": false
    },
    {
     "cid": "271",
     "name": "Vibrationsüberwachung",
     "on": false
    },
    {
     "cid": "265",
     "name": "Luftqualität",
     "on": false
    },
    {
     "cid": "306",
     "name": "Asset-Tracking",
     "on": false
    }
   ],
   "products": [
    {
     "id": "281",
     "img": "product/products/281.png",
     "name": "Tauch-Füllstandssensor",
     "conn": "NB-IoT | 4G LTE | LoRa"
    }
   ]
  },
  "269": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "Alle",
     "on": false
    },
    {
     "cid": "263",
     "name": "Temperatur",
     "on": false
    },
    {
     "cid": "262",
     "name": "Druck",
     "on": false
    },
    {
     "cid": "269",
     "name": "Boden",
     "on": true
    },
    {
     "cid": "268",
     "name": "Füllstand",
     "on": false
    },
    {
     "cid": "267",
     "name": "Neigungsüberwachung",
     "on": false
    },
    {
     "cid": "266",
     "name": "Radar-Abstand",
     "on": false
    },
    {
     "cid": "271",
     "name": "Vibrationsüberwachung",
     "on": false
    },
    {
     "cid": "265",
     "name": "Luftqualität",
     "on": false
    },
    {
     "cid": "306",
     "name": "Asset-Tracking",
     "on": false
    }
   ],
   "products": [
    {
     "id": "280",
     "img": "product/products/280.png",
     "name": "Bodensensor",
     "conn": "NB-IoT | 4G LTE | LoRa"
    }
   ]
  },
  "271": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "Alle",
     "on": false
    },
    {
     "cid": "263",
     "name": "Temperatur",
     "on": false
    },
    {
     "cid": "262",
     "name": "Druck",
     "on": false
    },
    {
     "cid": "269",
     "name": "Boden",
     "on": false
    },
    {
     "cid": "268",
     "name": "Füllstand",
     "on": false
    },
    {
     "cid": "267",
     "name": "Neigungsüberwachung",
     "on": false
    },
    {
     "cid": "266",
     "name": "Radar-Abstand",
     "on": false
    },
    {
     "cid": "271",
     "name": "Vibrationsüberwachung",
     "on": true
    },
    {
     "cid": "265",
     "name": "Luftqualität",
     "on": false
    },
    {
     "cid": "306",
     "name": "Asset-Tracking",
     "on": false
    }
   ],
   "products": [
    {
     "id": "284",
     "img": "product/products/284.png",
     "name": "Vibrationssensor",
     "conn": "NB-IoT | 4G LTE | LoRa"
    }
   ]
  },
  "272": {
   "bannerImg": "product/list/banner-258.jpg",
   "subcats": [
    {
     "cid": "258",
     "name": "Alle",
     "on": false
    },
    {
     "cid": "272",
     "name": "Gateway für Innenräume",
     "on": true
    },
    {
     "cid": "273",
     "name": "Gateway für Außenbereich",
     "on": false
    }
   ],
   "products": [
    {
     "id": "276",
     "img": "product/products/276.png",
     "name": "Gateway für Innenräume",
     "conn": "LoRa | 4G LTE | Ethernet"
    }
   ]
  },
  "273": {
   "bannerImg": "product/list/banner-258.jpg",
   "subcats": [
    {
     "cid": "258",
     "name": "Alle",
     "on": false
    },
    {
     "cid": "272",
     "name": "Gateway für Innenräume",
     "on": false
    },
    {
     "cid": "273",
     "name": "Gateway für Außenbereich",
     "on": true
    }
   ],
   "products": [
    {
     "id": "275",
     "img": "product/products/275.png",
     "name": "Gateway für Außenbereich",
     "conn": "LoRa | 4G LTE | Ethernet"
    }
   ]
  },
  "274": {
   "bannerImg": "product/list/banner-257.jpg",
   "subcats": [
    {
     "cid": "257",
     "name": "Alle",
     "on": false
    },
    {
     "cid": "275",
     "name": "6 Parameter",
     "on": false
    },
    {
     "cid": "274",
     "name": "12 Parameter",
     "on": true
    }
   ],
   "products": [
    {
     "id": "277",
     "img": "product/products/277.png",
     "name": "Hydrologie-Station",
     "conn": "Echtzeit | Multiparameter | Millimeterbereich"
    }
   ]
  },
  "275": {
   "bannerImg": "product/list/banner-257.jpg",
   "subcats": [
    {
     "cid": "257",
     "name": "Alle",
     "on": false
    },
    {
     "cid": "275",
     "name": "6 Parameter",
     "on": true
    },
    {
     "cid": "274",
     "name": "12 Parameter",
     "on": false
    }
   ],
   "products": [
    {
     "id": "278",
     "img": "product/products/278.png",
     "name": "Wetterstation",
     "conn": "Multiparameter | Echtzeit | Einfache Bereitstellung"
    }
   ]
  },
  "278": {
   "bannerImg": "product/list/banner-256.jpg",
   "subcats": [
    {
     "cid": "256",
     "name": "Alle",
     "on": false
    },
    {
     "cid": "278",
     "name": "Software",
     "on": true
    },
    {
     "cid": "279",
     "name": "Hardware",
     "on": false
    }
   ],
   "products": [
    {
     "id": "",
     "img": "product/products/custom-1.png",
     "name": "Digitaler Zwilling",
     "conn": "Kundenspezifische Dashboards und dynamische Datenvisualisierung"
    },
    {
     "id": "",
     "img": "product/products/custom-2.png",
     "name": "GIS-Dashboard",
     "conn": "Kundenspezifische Karten und mehrdimensionale Datenvisualisierung"
    },
    {
     "id": "",
     "img": "product/products/custom-3.png",
     "name": "Eingebettete Software",
     "conn": "Eingebettete Software, zugeschnitten auf konkrete Anwendungsanforderungen"
    }
   ]
  },
  "279": {
   "bannerImg": "product/list/banner-256.jpg",
   "subcats": [
    {
     "cid": "256",
     "name": "Alle",
     "on": false
    },
    {
     "cid": "278",
     "name": "Software",
     "on": false
    },
    {
     "cid": "279",
     "name": "Hardware",
     "on": true
    }
   ],
   "products": [
    {
     "id": "",
     "img": "product/products/custom-4.png",
     "name": "Hardware-Anpassung",
     "conn": "Kundenspezifische Sensoren, Controller, Aktoren und andere vernetzte Geräte"
    },
    {
     "id": "287",
     "img": "product/products/287.png",
     "name": "IoT-Zubehör",
     "conn": "Signal Coupling | 2.4 GHz | 5.8 GHz"
    },
    {
     "id": "286",
     "img": "product/products/286.png",
     "name": "2-in-1-Sensor für Gefahrenbereiche",
     "conn": "Temperatur | Druck | 4G-Kommunikation"
    }
   ]
  },
  "306": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "Alle",
     "on": false
    },
    {
     "cid": "263",
     "name": "Temperatur",
     "on": false
    },
    {
     "cid": "262",
     "name": "Druck",
     "on": false
    },
    {
     "cid": "269",
     "name": "Boden",
     "on": false
    },
    {
     "cid": "268",
     "name": "Füllstand",
     "on": false
    },
    {
     "cid": "267",
     "name": "Neigungsüberwachung",
     "on": false
    },
    {
     "cid": "266",
     "name": "Radar-Abstand",
     "on": false
    },
    {
     "cid": "271",
     "name": "Vibrationsüberwachung",
     "on": false
    },
    {
     "cid": "265",
     "name": "Luftqualität",
     "on": false
    },
    {
     "cid": "306",
     "name": "Asset-Tracking",
     "on": true
    }
   ],
   "products": [
    {
     "id": 304,
     "name": "Asset-Tracking-Sensor",
     "conn": "GPS | BeiDou | 4G LTE",
     "img": "product/products/304.png"
    }
   ]
  }
 },
 "details": {
  "270": {
   "series": "H-Serie · Temperatursensor",
   "tagline": "Präzision | Messbereich | Extrem niedriger Stromverbrauch",
   "desc": "Die Temperatursensoren von Hitelecom bieten Fernüberwachung, Alarmierung und hochpräzise Messung und liefern zeitnahe und zuverlässige Temperaturdaten für vielfältige Anwendungen",
   "heroImg": "product/details/270-hero.png",
   "pdf": "/downloads/temperature-sensor-datasheet.pdf",
   "crumbCat": "Temperatur",
   "returnCid": "263",
   "features": [
    {
     "icon": "product/details/270-f1.png",
     "text": "Genauigkeit: ±0,5 °C (konfigurierbar bis ±0,1 °C)"
    },
    {
     "icon": "product/details/270-f2.png",
     "text": "Gehäuse der Schutzart IP68"
    },
    {
     "icon": "product/details/270-f3.png",
     "text": "Großer Messbereich: −200 °C bis +800 °C"
    },
    {
     "icon": "product/details/270-f4.png",
     "text": "Unterstützt NFC-Aktivierung und lokale Gerätekonfiguration."
    },
    {
     "icon": "product/details/270-f5.png",
     "text": "Design mit niedrigem Stromverbrauch für den Langzeitbetrieb"
    },
    {
     "icon": "product/details/270-f6.png",
     "text": "Funkoptionen: 4G LTE, NB-IoT und LoRa."
    },
    {
     "icon": "product/details/270-f7.png",
     "text": "Fernüberwachung der Temperatur"
    },
    {
     "icon": "product/details/270-f8.png",
     "text": "Konfigurierbare Schwellenwert-Alarme"
    }
   ],
   "specsTitle": "Technische Spezifikationen",
   "specsDesc": "Mikroleistungsprozessoren und algorithmische Optimierung verleihen dem Sensor eine Auslegungslebensdauer von bis zu 10 Jahren bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen, wodurch die Routinewartung reduziert wird.",
   "specs": [
    [
     "Produktmodelle",
     "H200/H300/H500"
    ],
    [
     "Messbereich",
     "−200 °C bis 800 °C"
    ],
    [
     "Genauigkeit",
     "±0,5 °C (konfigurierbar bis ±0,1 °C)"
    ],
    [
     "Protokoll",
     "MQTT"
    ],
    [
     "Anschluss",
     "Dreileiter"
    ],
    [
     "Frequenzbänder",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Batterielebensdauer",
     "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall."
    ],
    [
     "Montage",
     "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Produktmodelle",
     "value": "H200/H300/H500"
    },
    {
     "name": "Messbereich",
     "value": "−200 °C bis 800 °C",
     "unitText": "Grad Celsius",
     "minValue": -200.0,
     "maxValue": 800.0
    },
    {
     "name": "Genauigkeit",
     "value": "±0,5 °C (konfigurierbar bis ±0,1 °C)",
     "unitText": "Grad Celsius"
    },
    {
     "name": "Protokoll",
     "value": "MQTT"
    },
    {
     "name": "Anschluss",
     "value": "Dreileiter"
    },
    {
     "name": "Frequenzbänder",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Batterielebensdauer",
     "value": "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall.",
     "unitText": "Jahr",
     "minValue": 10.0
    },
    {
     "name": "Montage",
     "value": "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Anwendungsszenarien",
   "scenarios": [
    {
     "img": "product/details/270-scen1.jpg",
     "label": "Intelligente Energie"
    },
    {
     "img": "product/details/270-scen2.jpg",
     "label": "Intelligente Landwirtschaft"
    },
    {
     "img": "product/details/270-scen3.jpg",
     "label": "Rechenzentrum"
    },
    {
     "img": "product/details/270-scen4.jpg",
     "label": "Pharma- und Gesundheitslagerung"
    },
    {
     "img": "product/details/270-scen5.jpg",
     "label": "Lebensmittelverarbeitung"
    },
    {
     "img": "product/details/270-scen6.jpg",
     "label": "Intelligente Fertigung"
    },
    {
     "img": "product/details/270-scen7.jpg",
     "label": "Freizeitpark"
    }
   ],
   "related": [
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285",
    "276",
    "275"
   ],
   "summary": "Der Temperatursensor der H-Serie von Hitelecom ist ein drahtloser industrieller Temperatursensor für die Fernüberwachung von −200 °C bis 800 °C. Er bietet eine Genauigkeit von ±0,5 °C (konfigurierbar bis ±0,1 °C), ist für mehr als 10 Jahre Batterielebensdauer bei stündlicher Übertragung unter den angegebenen Prüfbedingungen ausgelegt und überträgt die Messwerte über 4G oder NB-IoT via MQTT an Hitelecom Cloud oder private Plattformen.",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Rechenzentren und Serverräume",
     "desc": "Verfolgt die Ansaug- und Raumtemperatur der Racks und hilft Betreibern, Bedingungen zu erkennen, die zu einem thermischen Abschalten führen können.",
     "img": "product/details/270-scen3.jpg"
    },
    {
     "name": "Kühllagerung und Lebensmittelverarbeitung",
     "desc": "Hält Kühler, Gefrierschränke und Verarbeitungslinien innerhalb sicherer Temperaturbänder zur Unterstützung der HACCP-Überwachung.",
     "img": "product/details/270-scen5.jpg"
    },
    {
     "name": "Überwachung in Medizin und Laboren",
     "desc": "Überwacht Kühlschränke, Inkubatoren und Reinräume mit Impfstoffen, Blut und Reagenzien.",
     "img": "product/details/270-scen4.jpg"
    },
    {
     "name": "Klima in Gewächshäusern und Tierhaltung",
     "desc": "Überwacht die Stalltemperatur für Ernteertrag und Tierwohl in der intelligenten Landwirtschaft.",
     "img": "product/details/270-scen2.jpg"
    },
    {
     "name": "Überwachung industrieller Prozesse",
     "desc": "Misst die Oberflächentemperatur von Rohrleitungen, Kesseln und Anlagen an Produktionslinien.",
     "img": "product/details/270-scen6.jpg"
    },
    {
     "name": "Energieanlagen",
     "desc": "Überwacht Transformatoren, Batterieräume und Umspannwerks-Schränke auf Überhitzungsrisiken.",
     "img": "product/details/270-scen1.jpg"
    },
    {
     "name": "Öffentliche Einrichtungen",
     "desc": "Überwacht das Innenklima in Freizeitparks und anderen stark frequentierten öffentlichen Gebäuden.",
     "img": "product/details/270-scen7.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "Wie groß ist der Messbereich des Temperatursensors der H-Serie?",
     "a": "Der Standardbereich beträgt −200 °C bis 800 °C bei einer Genauigkeit von ±0,5 °C; eine Genauigkeit von ±0,1 °C ist auf Anfrage erhältlich. Der Dreileiter-Sondenanschluss hält die Messwerte in elektrisch störanfälligen Anlagen stabil."
    },
    {
     "q": "Wie lange hält die Batterie?",
     "a": "Der Messumformer ist für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall ausgelegt – die tatsächliche Lebensdauer variiert je nach Netzbedingungen, Temperatur und Übertragungshäufigkeit. Der Messumformer wird vollständig von der Batterie gespeist; nur das Sondenkabel ist erforderlich – am Installationspunkt werden weder Netz- noch Signalkabel benötigt."
    },
    {
     "q": "Wie überträgt der Sensor die Daten?",
     "a": "Er überträgt über 4G oder NB-IoT via MQTT an Hitelecom Cloud, eine Kundencloud oder eine private Bereitstellung und pusht Alarme, wenn die Temperatur konfigurierte Schwellenwerte überschreitet."
    },
    {
     "q": "Kann der Sensor für unsere Anwendung angepasst werden?",
     "a": "Ja. Sondentyp, Sondenlänge, Kabellänge, Übertragungsintervall und Gehäuse können im Rahmen des OEM/ODM-Programms von Hitelecom angepasst werden. Kontaktieren Sie den Vertrieb mit Ihren Einsatzbedingungen."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "274": {
   "series": "H-Serie · Drucksensor",
   "tagline": "Remote | Niedriger Stromverbrauch | Stoßfest",
   "desc": "Die Drucksensoren von Hitelecom bieten kontinuierliche Präzisionsmessung mit genauer Cloud-Übertragung kritischer Druckdaten für komplexe industrielle Anwendungen",
   "heroImg": "product/details/274-hero.png",
   "pdf": "/downloads/h300-pressure-sensor-datasheet.pdf",
   "crumbCat": "Druck",
   "returnCid": "262",
   "features": [
    {
     "icon": "product/details/274-f1.png",
     "text": "±0,5 % FS (Hochpräzisions-Konfiguration)"
    },
    {
     "icon": "product/details/274-f2.png",
     "text": "Gehäuse der Schutzart IP68"
    },
    {
     "icon": "product/details/274-f3.png",
     "text": "Unterstützt remote OTA-Firmware-Updates."
    },
    {
     "icon": "product/details/274-f4.png",
     "text": "Unterstützt NFC-Aktivierung und lokale Gerätekonfiguration."
    },
    {
     "icon": "product/details/274-f5.png",
     "text": "Design mit niedrigem Stromverbrauch für den Langzeitbetrieb"
    },
    {
     "icon": "product/details/274-f6.png",
     "text": "Funkoptionen: 4G LTE, NB-IoT und LoRa."
    },
    {
     "icon": "product/details/274-f7.png",
     "text": "Fernüberwachung des Drucks"
    },
    {
     "icon": "product/details/274-f8.png",
     "text": "Konfigurierbare Schwellenwert-Alarme"
    }
   ],
   "specsTitle": "Technische Spezifikationen",
   "specsDesc": "Integrierte Kommunikations- und Sensortechnologien mit eingebetteten Energiesparalgorithmen verleihen dem Drucksensor eine verlängerte Lebensdauer und hohe Messstabilität und unterstützen die Zuverlässigkeit des gesamten Überwachungssystems.",
   "specs": [
    [
     "Produktmodelle",
     "H200/H300/H500"
    ],
    [
     "Messbereich",
     "0–1; 1,6; 3,5; 7; 10 oder 20 MPa"
    ],
    [
     "Überlast",
     "≤ 2× Messbereichsdruck"
    ],
    [
     "Stabilität",
     "±0,2 % FS/Jahr"
    ],
    [
     "Protokoll",
     "MQTT"
    ],
    [
     "Betriebstemperatur",
     "−20 °C bis +80 °C"
    ],
    [
     "Lagertemperatur",
     "−20 °C bis +85 °C"
    ],
    [
     "Batterielebensdauer",
     "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall."
    ],
    [
     "Montage",
     "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Produktmodelle",
     "value": "H200/H300/H500"
    },
    {
     "name": "Messbereich",
     "value": "0–1; 1,6; 3,5; 7; 10 oder 20 MPa"
    },
    {
     "name": "Überlast",
     "value": "≤ 2× Messbereichsdruck"
    },
    {
     "name": "Stabilität",
     "value": "±0,2 % FS/Jahr"
    },
    {
     "name": "Protokoll",
     "value": "MQTT"
    },
    {
     "name": "Betriebstemperatur",
     "value": "−20 °C bis +80 °C",
     "unitText": "Grad Celsius",
     "minValue": -20.0,
     "maxValue": 80.0
    },
    {
     "name": "Lagertemperatur",
     "value": "−20 °C bis +85 °C",
     "unitText": "Grad Celsius",
     "minValue": -20.0,
     "maxValue": 85.0
    },
    {
     "name": "Batterielebensdauer",
     "value": "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall.",
     "unitText": "Jahr",
     "minValue": 10.0
    },
    {
     "name": "Montage",
     "value": "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Anwendungsszenarien",
   "scenarios": [
    {
     "img": "product/details/274-scen1.jpg",
     "label": "Chemieindustrie"
    },
    {
     "img": "product/details/274-scen2.jpg",
     "label": "Halbleiterindustrie"
    },
    {
     "img": "product/details/274-scen3.jpg",
     "label": "Intelligentes Gebäude"
    },
    {
     "img": "product/details/274-scen4.jpg",
     "label": "Intelligente Fertigung"
    },
    {
     "img": "product/details/274-scen5.jpg",
     "label": "Wissenschaftliche Forschung"
    },
    {
     "img": "product/details/274-scen6.jpg",
     "label": "Intelligente Landwirtschaft"
    },
    {
     "img": "product/details/274-scen7.jpg",
     "label": "Türmeüberwachung"
    },
    {
     "img": "product/details/274-scen8.jpg",
     "label": "Geologische Exploration"
    }
   ],
   "related": [
    "270",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285",
    "276",
    "275"
   ],
   "summary": "Der Drucksensor der H-Serie von Hitelecom ist ein drahtloser industrieller Druckmessumformer für Rohrleitungen, Pumpen und Tanks. Verfügbare Messbereiche sind 1, 1,6, 3,5, 7, 10 und 20 MPa bei einer Stabilität von ±0,2 % FS/Jahr und einer Überlasttoleranz von 2× dem Messbereich, mit Übertragung über 4G oder NB-IoT. Die Batterie ist für mehr als 10 Jahre Lebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen ausgelegt.",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Wasserversorgung und Pumpstationen",
     "desc": "Überwacht den Rohrleitungsdruck, um Rohrbrüche, Leckagen und Pumpenfehler frühzeitig zu erkennen.",
     "img": "product/details/281-scen1.jpg"
    },
    {
     "name": "Chemieanlagen",
     "desc": "Verfolgt den Druck von Prozessleitungen, wo kabelgebundene Messumformer teuer nachzurüsten sind.",
     "img": "product/details/274-scen1.jpg"
    },
    {
     "name": "Gebäudewassersysteme",
     "desc": "Überwacht den Druck von Druckerhöhungspumpen und Steigleitungen in der Sekundärwasserversorgung von Hochhäusern.",
     "img": "product/details/274-scen3.jpg"
    },
    {
     "name": "Halbleiterfabriken",
     "desc": "Überwacht Spezialgas- und Versorgungsleitungen mit stabilen, reproduzierbaren Messwerten.",
     "img": "product/details/274-scen2.jpg"
    },
    {
     "name": "Industriehydraulik",
     "desc": "Verfolgt die Druckkurven von Hydraulikpressen und -anlagen zur Unterstützung der zustandsbasierten Wartung.",
     "img": "product/details/274-scen4.jpg"
    },
    {
     "name": "Tank- und Behälterüberwachung",
     "desc": "Kombiniert statischen Druck mit dem Füllstand für Bestands- und Sicherheitskontrolle.",
     "img": "product/details/287-scen3.jpg"
    },
    {
     "name": "Geologie- und Explorationsstandorte",
     "desc": "Batteriebetriebene Druckaufzeichnung an entlegenen Bohrlöchern ohne Verkabelung.",
     "img": "product/details/274-scen8.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "Welche Druckmessbereiche sind verfügbar?",
     "a": "Die Standardbereiche sind 0–1 MPa, 1,6 MPa, 3,5 MPa, 7 MPa, 10 MPa und 20 MPa. Der Sensor verträgt eine Überlast von 2× dem Messbereich und hat eine Langzeitstabilität von ±0,2 % FS/Jahr (eine von der Messgenauigkeit getrennte Kennzahl)."
    },
    {
     "q": "Kann er sowohl Gas- als auch Flüssigkeitsdruck messen?",
     "a": "Die Standardversion eignet sich für gängige Gas- und Flüssigkeitsmedien, die mit dem Prozessanschluss kompatibel sind; bei korrosiven oder speziellen Medien kontaktieren Sie Hitelecom zur Bestätigung der medienberührten Werkstoffe."
    },
    {
     "q": "Wie überträgt er die Messwerte?",
     "a": "Er sendet die Messwerte über 4G oder NB-IoT via MQTT an Hitelecom Cloud, eine Kundencloud oder eine private Plattform, mit konfigurierbaren Schwellenwerten und Alarmen."
    },
    {
     "q": "Welche Stromversorgung benötigt er am Standort?",
     "a": "Keine. Die interne Batterie ist für mehr als 10 Jahre Lebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen ausgelegt – die tatsächliche Lebensdauer variiert je nach Netzabdeckung, Temperatur und Übertragungshäufigkeit –, sodass der Messumformer dort montiert werden kann, wo Verkabelung unpraktisch ist."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "280": {
   "series": "H-Serie · Bodensensor",
   "tagline": "Niedriger Stromverbrauch | Präzision | Multiparameter",
   "desc": "Der Bodensensor von Hitelecom integriert Multiparameter-Überwachung, geplante Datensynchronisation und Präzisionsmessung und unterstützt die umfassende Bodenqualitätsbewertung und kontinuierliche Überwachung für vielfältige landwirtschaftliche Anwendungen",
   "heroImg": "product/details/280-hero.png",
   "pdf": "/downloads/h300-soil-sensor-datasheet.pdf",
   "crumbCat": "Boden",
   "returnCid": "269",
   "features": [
    {
     "icon": "product/details/280-f1.png",
     "text": "Überwachung wichtiger Nährstoffe wie Stickstoff, Phosphor und Kalium"
    },
    {
     "icon": "product/details/280-f2.png",
     "text": "Gehäuse der Schutzart IP68"
    },
    {
     "icon": "product/details/280-f3.png",
     "text": "Überwachung der Bodenfeuchte für die Bewässerungssteuerung"
    },
    {
     "icon": "product/details/280-f4.png",
     "text": "Unterstützt NFC-Aktivierung und lokale Gerätekonfiguration."
    },
    {
     "icon": "product/details/280-f5.png",
     "text": "Unterstützt remote OTA-Firmware-Updates."
    },
    {
     "icon": "product/details/280-f6.png",
     "text": "Funkoptionen: 4G LTE, NB-IoT und LoRa."
    },
    {
     "icon": "product/details/280-f7.png",
     "text": "Fernüberwachung des Bodens"
    },
    {
     "icon": "product/details/280-f8.png",
     "text": "Konfigurierbare Schwellenwert-Alarme"
    }
   ],
   "specsTitle": "Technische Spezifikationen",
   "specsDesc": "Mit fortschrittlichen intelligenten Algorithmen und kontinuierlicher Datenaufzeichnung sowie seiner Anpassungsfähigkeit unter extremen Bedingungen verfolgt und analysiert er die Bodenbedingungen kontinuierlich und präzise, geht komplexe landwirtschaftliche Herausforderungen wirksam an und verbessert Bewässerungs-, Düngungs- und Ertragsmanagement-Entscheidungen.",
   "specs": [
    [
     "Produktmodelle",
     "H200/H300/H500"
    ],
    [
     "Leitfähigkeit",
     "0–1 000 µS/cm (±3 %)"
    ],
    [
     "pH",
     "0–14 (Auflösung 0,01)"
    ],
    [
     "Bodenfeuchte",
     "0–100 % (±3 %; nicht geeignet für Permafrostschichten)"
    ],
    [
     "NPK",
     "0–1 999 mg/kg (±2 % FS)"
    ],
    [
     "Protokoll",
     "MQTT"
    ],
    [
     "Frequenzbänder",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Batterielebensdauer",
     "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall."
    ],
    [
     "Montage",
     "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Produktmodelle",
     "value": "H200/H300/H500"
    },
    {
     "name": "Leitfähigkeit",
     "value": "0–1 000 µS/cm (±3 %)",
     "unitText": "Mikrosiemens pro Zentimeter",
     "minValue": 0.0,
     "maxValue": 1000.0
    },
    {
     "name": "pH",
     "value": "0–14 (Auflösung 0,01)"
    },
    {
     "name": "Bodenfeuchte",
     "value": "0–100 % (±3 %; nicht geeignet für Permafrostschichten)",
     "unitText": "Prozent",
     "minValue": 0.0,
     "maxValue": 100.0
    },
    {
     "name": "NPK",
     "value": "0–1 999 mg/kg (±2 % FS)",
     "unitText": "Milligramm pro Kilogramm",
     "minValue": 0.0,
     "maxValue": 1999.0
    },
    {
     "name": "Protokoll",
     "value": "MQTT"
    },
    {
     "name": "Frequenzbänder",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Batterielebensdauer",
     "value": "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall.",
     "unitText": "Jahr",
     "minValue": 10.0
    },
    {
     "name": "Montage",
     "value": "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Anwendungsszenarien",
   "scenarios": [
    {
     "img": "product/details/280-scen1.jpg",
     "label": "Ackerland"
    },
    {
     "img": "product/details/280-scen2.jpg",
     "label": "Gewächshaus"
    },
    {
     "img": "product/details/280-scen3.jpg",
     "label": "Stadtparks"
    },
    {
     "img": "product/details/280-scen4.jpg",
     "label": "Bodenverschmutzung"
    },
    {
     "img": "product/details/280-scen5.jpg",
     "label": "Waldgesundheit"
    },
    {
     "img": "product/details/280-scen6.jpg",
     "label": "Labor"
    }
   ],
   "related": [
    "270",
    "274",
    "281",
    "282",
    "283",
    "284",
    "285",
    "276",
    "275"
   ],
   "summary": "Der Bodensensor der H-Serie von Hitelecom ist eine drahtlose Multiparameter-Sonde für Landwirtschaft und Landüberwachung. Ein Gerät misst Bodenfeuchte, -temperatur, -leitfähigkeit (EC), pH-Wert und NPK-Nährstoffe, überträgt über 4G oder NB-IoT und ist für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen ausgelegt, mit einem IP68-Gehäuse für die langfristige Vergrabung.",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Bewässerungsplanung für Ackerland",
     "desc": "Bodenfeuchtetrends zeigen Landwirten genau, wann und wie viel bewässert werden soll, und reduzieren den Wasserverbrauch.",
     "img": "product/details/280-scen1.jpg"
    },
    {
     "name": "Fertigation in Gewächshäusern",
     "desc": "EC- und NPK-Messwerte steuern die Düngerdosierung, damit die Nährstoffe in der Wurzelzone bleiben und nicht im Abfluss.",
     "img": "product/details/280-scen2.jpg"
    },
    {
     "name": "Stadtparks und Grünanlagen",
     "desc": "Überwacht die Bodenfeuchte von Rasen und Baumscheiben für kommunale Grünpflegeteams.",
     "img": "product/details/280-scen3.jpg"
    },
    {
     "name": "Verfolgung von Bodenverschmutzung und -sanierung",
     "desc": "Die kontinuierliche pH- und EC-Aufzeichnung kennzeichnet Kontaminationsfahnen und verifiziert den Sanierungsfortschritt.",
     "img": "product/details/280-scen4.jpg"
    },
    {
     "name": "Gesundheit von Wald- und Grasland",
     "desc": "Langfristig vergrabene Sonden verfolgen den Trockenstress des Bodens, bevor der sichtbare Kronenrückgang einsetzt.",
     "img": "product/details/280-scen5.jpg"
    },
    {
     "name": "Forschung und Feldversuche",
     "desc": "Multiparameter-Zeitreihen unterstützen agronomische Forschung und Sortenversuche.",
     "img": "product/details/280-scen6.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "Welche Bodenparameter misst die H-Serie?",
     "a": "Bodenfeuchte (0–100 %, ±3 %), Temperatur, Leitfähigkeit (0–1 000 µS/cm, ±3 %), pH-Wert (0–14, Auflösung 0,01) und NPK-Nährstoffe (0–1 999 mg/kg, ±2 % FS) – alles in einer einzigen Sonde."
    },
    {
     "q": "Kann die Sonde das ganze Jahr über im Außenbereich vergraben bleiben?",
     "a": "Ja. Das IP68-Gehäuse ist für die langfristige Vergrabung ausgelegt, und die Batterie ist für mehr als 10 Jahre Lebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen ausgelegt, was die Routinewartung zwischen den Saisonzeiten reduziert."
    },
    {
     "q": "Wie werden die Bodendaten übertragen?",
     "a": "Über 4G oder NB-IoT mit MQTT-Uplink an Hitelecom Cloud oder eine private Plattform; Schwellenwerte an jedem Parameter lösen Alarme aus."
    },
    {
     "q": "Eignet er sich für alkalische oder salzige Böden?",
     "a": "Der EC-Kanal deckt 0–1 000 µS/cm ab. Bei salzigen Böden oder speziellen Medien bestätigen Sie den erforderlichen EC-Bereich mit Hitelecom."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "281": {
   "series": "H-Serie · Tauch-Füllstandssensor",
   "tagline": "Präzision | Messbereich | Extrem niedriger Stromverbrauch",
   "desc": "Der Füllstandssensor von Hitelecom bietet präzise Überwachung, zeitnahe Rückmeldung und hohe Stabilität und liefert genaue und kontinuierliche Füllstandsdaten in verschiedenen industriellen Umgebungen.",
   "heroImg": "product/details/281-hero.png",
   "pdf": "/downloads/liquid-level-sensor-datasheet.pdf",
   "crumbCat": "Füllstand",
   "returnCid": "268",
   "features": [
    {
     "icon": "product/details/281-f1.png",
     "text": "±0,5 % FS (Hochpräzisions-Konfiguration)"
    },
    {
     "icon": "product/details/281-f2.png",
     "text": "Gehäuse der Schutzart IP68"
    },
    {
     "icon": "product/details/281-f3.png",
     "text": "Großer Messbereich: 0–200 m (konfigurierbar)"
    },
    {
     "icon": "product/details/281-f4.png",
     "text": "Unterstützt NFC-Aktivierung und lokale Gerätekonfiguration."
    },
    {
     "icon": "product/details/281-f5.png",
     "text": "Unterstützt remote OTA-Firmware-Updates."
    },
    {
     "icon": "product/details/281-f6.png",
     "text": "Funkoptionen: 4G LTE, NB-IoT und LoRa."
    },
    {
     "icon": "product/details/281-f7.png",
     "text": "Fernüberwachung des Füllstands"
    },
    {
     "icon": "product/details/281-f8.png",
     "text": "Konfigurierbare Schwellenwert-Alarme"
    }
   ],
   "specsTitle": "Technische Spezifikationen",
   "specsDesc": "Die integrierte Sensortechnologie, Echtzeitkommunikation und das energieeffiziente Design unterstützen genaue, kontinuierliche Füllstandsdaten in industriellen Anwendungen von der Wasseraufbereitung bis zu chemischen Produktionslinien.",
   "specs": [
    [
     "Produktmodelle",
     "H200/H300/H500"
    ],
    [
     "Messbereich",
     "0–200 m (konfigurierbar)"
    ],
    [
     "Genauigkeit",
     "±0,5 % FS (höhere Präzision konfigurierbar)"
    ],
    [
     "Stabilität",
     "±0,2 % FS/Jahr"
    ],
    [
     "Protokoll",
     "MQTT"
    ],
    [
     "Betriebstemperatur",
     "−20 °C bis +70 °C"
    ],
    [
     "Lagertemperatur",
     "−20 °C bis +80 °C"
    ],
    [
     "Batterielebensdauer",
     "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall."
    ],
    [
     "Montage",
     "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Produktmodelle",
     "value": "H200/H300/H500"
    },
    {
     "name": "Messbereich",
     "value": "0–200 m (konfigurierbar)"
    },
    {
     "name": "Genauigkeit",
     "value": "±0,5 % FS (höhere Präzision konfigurierbar)",
     "unitText": "Prozent"
    },
    {
     "name": "Stabilität",
     "value": "±0,2 % FS/Jahr"
    },
    {
     "name": "Protokoll",
     "value": "MQTT"
    },
    {
     "name": "Betriebstemperatur",
     "value": "−20 °C bis +70 °C",
     "unitText": "Grad Celsius",
     "minValue": -20.0,
     "maxValue": 70.0
    },
    {
     "name": "Lagertemperatur",
     "value": "−20 °C bis +80 °C",
     "unitText": "Grad Celsius",
     "minValue": -20.0,
     "maxValue": 80.0
    },
    {
     "name": "Batterielebensdauer",
     "value": "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall.",
     "unitText": "Jahr",
     "minValue": 10.0
    },
    {
     "name": "Montage",
     "value": "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Anwendungsszenarien",
   "scenarios": [
    {
     "img": "product/details/281-scen1.jpg",
     "label": "Wasserversorgung und -entwässerung"
    },
    {
     "img": "product/details/281-scen2.jpg",
     "label": "Marine- und Bordanwendungen"
    },
    {
     "img": "product/details/281-scen3.jpg",
     "label": "Hydrologische Überwachung"
    },
    {
     "img": "product/details/281-scen4.jpg",
     "label": "Metallurgie"
    },
    {
     "img": "product/details/281-scen5.jpg",
     "label": "Krankenhausabwasser"
    },
    {
     "img": "product/details/281-scen6.jpg",
     "label": "Kraftwerk"
    },
    {
     "img": "product/details/281-scen7.jpg",
     "label": "Bergbau"
    },
    {
     "img": "product/details/281-scen8.jpg",
     "label": "Intelligente Energie"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "282",
    "283",
    "284",
    "285",
    "276",
    "275"
   ],
   "summary": "Der Füllstandssensor der H-Serie von Hitelecom ist ein drahtloser Flüssigkeitsstand-Messumformer für Reservoirs, Flüsse, Tanks und Brunnen. Er deckt 0–200 m ab (konfigurierbar) bei einer Genauigkeit von ±0,5 % FS und einer Stabilität von ±0,2 % FS/Jahr, ist für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen ausgelegt und überträgt über 4G oder NB-IoT.",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Reservoire und Staudämme",
     "desc": "Kontinuierliche Wasserstandsaufzeichnung für Hochwasserschutz und Einsatzentscheidungen.",
     "img": "solution/67-scen-0.jpg"
    },
    {
     "name": "Fluss- und hydrologische Stationen",
     "desc": "Remote-Pegelüberwachung entlang von Flüssen und Kanälen ohne Netzstrom.",
     "img": "product/details/281-scen3.jpg"
    },
    {
     "name": "Wasserversorgung und -entwässerung",
     "desc": "Tank-, Klarwasserbehälter- und Netzreservoir-Pegel für den Versorgerbetrieb.",
     "img": "product/details/281-scen1.jpg"
    },
    {
     "name": "Industrietanks",
     "desc": "Bestandsfüllstand in Prozesstanks von Kraftwerken und Metallurgie.",
     "img": "product/details/287-scen3.jpg"
    },
    {
     "name": "Grubenwassermanagement",
     "desc": "Überwacht die Wasserpegel in Sumpfen und Schächten für die Bergwerksicherheit.",
     "img": "product/details/281-scen7.jpg"
    },
    {
     "name": "Marine- und Schiffsanwendungen",
     "desc": "Ballast- und Bilgenpegel-Überwachung mit batteriebetriebener Einfachheit.",
     "img": "product/details/281-scen2.jpg"
    },
    {
     "name": "Medizinisches Abwasser",
     "desc": "Verfolgt die Pegel der Sammeltanks an Krankenhaus-Abwasserstationen.",
     "img": "product/details/281-scen5.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "Welchen Füllstandsbereich deckt die H-Serie ab?",
     "a": "0–200 m serienmäßig, darüber hinaus konfigurierbar. Die Genauigkeit beträgt ±0,5 % FS bei einer Stabilität von ±0,2 % FS pro Jahr für die langfristige unbeaufsichtigte Überwachung."
    },
    {
     "q": "Wie wird der Sensor an entfernten Standorten gespeist?",
     "a": "Durch eine interne Batterie – ausgelegt für mehr als 10 Jahre Lebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen –, sodass Reservoirs und Flussstationen in geeigneten Bereitstellungen möglicherweise kein Solarpanel und keine Verkabelung benötigen."
    },
    {
     "q": "Wie erhalten wir die Füllstandsdaten?",
     "a": "Der Messumformer überträgt über 4G oder NB-IoT via MQTT an Hitelecom Cloud oder Ihre eigene Plattform, mit Alarmen für hohe und niedrige Füllstände."
    },
    {
     "q": "Kann er für unseren Tank oder Brunnen angepasst werden?",
     "a": "Ja. Messbereich, Sondenkabellänge und Montage können an die Installation angepasst werden; teilen Sie Ihre Zeichnungen oder Standortfotos mit dem Hitelecom-Vertrieb für eine passende Konfiguration."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "282": {
   "series": "H-Serie · Neigungssensor",
   "tagline": "Präzision | Mehrachsig | Extrem niedriger Stromverbrauch",
   "desc": "Der Neigungssensor von Hitelecom integriert Sensorelemente mit ultrahoher Präzision und bietet Fernüberwachung, Echtzeit-Alarme und hochpräzise Messung für genaue und zeitnahe Neigungsdaten in komplexen industriellen Anwendungen",
   "heroImg": "product/details/282-hero.png",
   "pdf": "/downloads/h310-ts180c-tilt-sensor-datasheet.pdf",
   "crumbCat": "Neigungsüberwachung",
   "returnCid": "267",
   "features": [
    {
     "icon": "product/details/282-f1.png",
     "text": "Genauigkeit: ±0,005° (konfigurierbar)"
    },
    {
     "icon": "product/details/282-f2.png",
     "text": "Gehäuse der Schutzart IP68"
    },
    {
     "icon": "product/details/282-f3.png",
     "text": "Auflösung: 0,001°"
    },
    {
     "icon": "product/details/282-f4.png",
     "text": "Unterstützt NFC-Aktivierung und lokale Gerätekonfiguration."
    },
    {
     "icon": "product/details/282-f5.png",
     "text": "Unterstützt remote OTA-Firmware-Updates."
    },
    {
     "icon": "product/details/282-f6.png",
     "text": "Funkoptionen: 4G LTE, NB-IoT und LoRa."
    },
    {
     "icon": "product/details/282-f7.png",
     "text": "Fernüberwachung des Neigungswinkels"
    },
    {
     "icon": "product/details/282-f8.png",
     "text": "Konfigurierbare Schwellenwert-Alarme"
    }
   ],
   "specsTitle": "Technische Spezifikationen",
   "specsDesc": "Hochempfindliche Sensorelemente, Echtzeit-Datensynchronisation und ein robustes, langlebiges Design unterstützen eine präzise und zuverlässige Neigungsüberwachung. Ausgelegt für bis zu 10 Jahre Betrieb bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen, mit reduzierter Routinewartung.",
   "specs": [
    [
     "Produktmodelle",
     "H200/H300/H500"
    ],
    [
     "Messbereich",
     "X-Achse · Y-Achse (konfigurierbar auf drei Achsen)"
    ],
    [
     "Genauigkeit",
     "±0,005° (konfigurierbar)"
    ],
    [
     "Auflösung",
     "0.001°"
    ],
    [
     "Protokoll",
     "MQTT"
    ],
    [
     "Betriebstemperatur",
     "−20 °C bis +70 °C"
    ],
    [
     "Lagertemperatur",
     "−20 °C bis +80 °C"
    ],
    [
     "Batterielebensdauer",
     "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall."
    ],
    [
     "Montage",
     "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    ]
   ],
   "certImgs": [],
   "scenariosHeading": "Anwendungsszenarien",
   "scenarios": [
    {
     "img": "product/details/282-scen1.jpg",
     "label": "Brückenneigung und -verformung"
    },
    {
     "img": "product/details/282-scen2.jpg",
     "label": "Lagerregale"
    },
    {
     "img": "product/details/282-scen3.jpg",
     "label": "Turmneigung"
    },
    {
     "img": "product/details/282-scen4.jpg",
     "label": "Gefährdete Gebäude"
    },
    {
     "img": "product/details/282-scen5.jpg",
     "label": "Solar-Nachführsystem"
    },
    {
     "img": "product/details/282-scen6.jpg",
     "label": "Neigungsüberwachung der Energieinfrastruktur"
    },
    {
     "img": "product/details/282-scen7.jpg",
     "label": "Gebäudeneigung"
    },
    {
     "img": "product/details/282-scen8.jpg",
     "label": "Überwachung von Fahrgeschäften und Parkbauwerken"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "283",
    "284",
    "285",
    "276",
    "275"
   ],
   "summary": "Der Neigungssensor der H-Serie von Hitelecom ist ein drahtloser IoT-Neigungsmesser (Inklinometer) für die Bauwerksüberwachung. Er misst die Neigung auf der X- und Y-Achse (drei Achsen optional) mit einer Genauigkeit von ±0,005° und einer Auflösung von 0,001°, ist für mehr als 10 Jahre Batterielebensdauer bei stündlicher Übertragung unter den angegebenen Prüfbedingungen ausgelegt und trägt die Schutzart IP68 für die langfristige Bereitstellung im Außenbereich. Die Konnektivitätsoptionen sind 4G, NB-IoT und LoRa.",
   "sku": "H200/H300/H500",
   "specsStructured": [
    {
     "name": "Produktmodelle",
     "value": "H200 / H300 / H500"
    },
    {
     "name": "Messachsen",
     "value": "X-Achse · Y-Achse (konfigurierbar auf drei Achsen)"
    },
    {
     "name": "Genauigkeit",
     "value": "±0.005°",
     "unitText": "Grad"
    },
    {
     "name": "Auflösung",
     "value": "0.001°",
     "unitText": "Grad"
    },
    {
     "name": "Protokoll",
     "value": "MQTT"
    },
    {
     "name": "Funk",
     "value": "4G / NB-IoT / LoRa"
    },
    {
     "name": "Betriebstemperatur",
     "value": "−20 °C bis 70 °C",
     "unitText": "Grad Celsius",
     "minValue": -20,
     "maxValue": 70
    },
    {
     "name": "Lagertemperatur",
     "value": "−20 °C bis 80 °C",
     "unitText": "Grad Celsius",
     "minValue": -20,
     "maxValue": 80
    },
    {
     "name": "Batterielebensdauer",
     "value": "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen"
    },
    {
     "name": "Schutzart",
     "value": "IP68"
    },
    {
     "name": "Montage",
     "value": "Montagelaschen · Mastschelle · Schlitzmontage"
    },
    {
     "name": "Konfiguration",
     "value": "NFC-Aktivierung; OTA-Firmware-Upgrade"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "applications": [
    {
     "name": "Böschungsstabilitätsüberwachung",
     "desc": "Unterstützt die frühere Erkennung anormaler Böschungsbewegungen an Autobahnen, Tagebauen und Einschnittsdämmen.",
     "img": "product/details/281-scen7.jpg"
    },
    {
     "name": "Eisenbahninfrastruktur",
     "desc": "Überwacht die Setzung des Gleisbetts, Stützmauern und die Neigung von Oberleitungsmasten entlang der Eisenbahnlinien."
    },
    {
     "name": "Tunnelüberwachung",
     "desc": "Verfolgt die Auskleidungskonvergenz und Segmentrotation während und nach dem Tunnelbau."
    },
    {
     "name": "Brückenverformung",
     "desc": "Misst Pfeilerneigung, Trägerrotation und Lagerverschiebung für die Brückenüberwachung.",
     "img": "product/details/282-scen1.jpg"
    },
    {
     "name": "U-Bahn- und Untergrundbauwerke",
     "desc": "Überwacht die Durchbiegung von Stationskörpern und die Verformung von Schildvortriebstunneln in der Nähe benachbarter Aushubarbeiten."
    },
    {
     "name": "Baustellen und Provisorien",
     "desc": "Überwacht Gerüste, Turmkräne, Schalungen und Baustellenhütten auf unsichere Neigung."
    },
    {
     "name": "Seekedeiche und Staudämme",
     "desc": "Kontinuierliche Neigungsüberwachung von Dämmen, Seekedeichen und Reservoirböschungen.",
     "img": "solution/67-scen-0.jpg"
    },
    {
     "name": "Historische Gebäude und alte Pagoden",
     "desc": "Nicht-invasive Neigungsverfolgung für geschützte historische Bauwerke, bei denen Bohren nicht erlaubt ist.",
     "img": "product/details/282-scen4.jpg"
    },
    {
     "name": "Neigungsüberwachung von Bäumen",
     "desc": "Erkennt Wurzelversagen und zunehmende Neigung bei Stadtbäumen vor der Taifunsaison.",
     "img": "product/details/280-scen3.jpg"
    },
    {
     "name": "Straßenlaternenmasten",
     "desc": "Kennzeichnet die Neigung von Masten durch Fahrzeuganprall oder Fundamentlockerung bei kommunalen Beleuchtungsanlagen."
    },
    {
     "name": "Übertragungstürme",
     "desc": "Überwacht Fundamentsetzung und Turmneigung an Stromübertragungsleitungen.",
     "img": "product/details/282-scen3.jpg"
    },
    {
     "name": "Telekomtürme",
     "desc": "Verfolgt die Vertikalität von Masten und die Ausrichtung abgespannter Türme für die Kommunikationsinfrastruktur."
    },
    {
     "name": "Lagerregale",
     "desc": "Erkennt die Durchbiegung von Regalstützen durch Stapleranprall und unterstützt ein früheres Eingreifen, bevor der Schaden eskaliert.",
     "img": "product/details/282-scen2.jpg"
    }
   ],
   "faqs": [
    {
     "q": "Welche Bauwerke kann der Neigungssensor der H-Serie überwachen?",
     "a": "Der Neigungssensor der H-Serie wird an Böschungen und Deichen, an der Eisenbahninfrastruktur, in Tunneln, an Brücken, U-Bahn-Bauwerken, Baustellen und Provisorien, an Seekedeichen und Staudämmen, an historischen Gebäuden und alten Pagoden, an Stadtbäumen, Straßenlaternenmasten, Übertragungstürmen, Telekomtürmen und Lagerregalen eingesetzt. Seine Schutzart IP68 und die lange Batterielebensdauer eignen ihn für die langfristige Installation im Außenbereich; die Batterielebensdauer hängt vom Übertragungsintervall, der Netzabdeckung und den Standortbedingungen ab."
    },
    {
     "q": "Wie genau ist der Neigungssensor der H-Serie?",
     "a": "Die Standardgenauigkeit beträgt ±0,005° bei einer Auflösung von 0,001° auf der X- und Y-Achse. Eine Dreiachsen-Konfiguration ist auf Anfrage verfügbar, und die Genauigkeit kann für Anwendungen mit engeren Toleranzen angepasst werden."
    },
    {
     "q": "Wie lange hält die Batterie?",
     "a": "Ausgelegt für mehr als 10 Jahre bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die Batterielebensdauer skaliert mit der Übertragungshäufigkeit; häufigere Übertragung verkürzt die Lebensdauer. Die meisten Konfigurationen laufen mit Batterie ohne Netzstrom oder Solarpanel – bestätigen Sie die Stromversorgungsoptionen für Ihre Konfiguration."
    },
    {
     "q": "Welche Funktechnologie sollte ich wählen – 4G, NB-IoT oder LoRa?",
     "a": "Wählen Sie 4G, wo die Mobilfunkabdeckung zuverlässig ist und höhere Datenraten oder Over-the-Air-Firmware-Updates benötigt werden. NB-IoT kann für Innen- oder Untergrundstandorte wie Tunnel und Keller geeignet sein, wo der lokale Betreiber eine ausreichende Abdeckung bietet. Wählen Sie LoRa, wenn Sie eine dichte Gruppe von Sensoren an einem Standort mit einem privaten Gateway und ohne SIM-Kosten pro Gerät bereitstellen."
    },
    {
     "q": "Kann er an denkmalgeschützten Bauwerken ohne Bohren installiert werden?",
     "a": "Ja. Der Sensor unterstützt Montagelaschen, eine Schelle für Masten oder eine Schlitzmontage. Bei geschützten Bauwerken vermeiden Schellen- und Klebemontage das Eindringen in die Bausubstanz. Kontaktieren Sie Hitelecom für eine standortspezifische Montageanleitung."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "283": {
   "series": "H-Serie · Radar-Abstandssensor",
   "tagline": "Niedriger Stromverbrauch | Präzision | Millimeterbereich",
   "desc": "Die Abstandssensoren von Hitelecom bieten Präzision im Millimeterbereich, geplante Datenerfassung und hohe Störfestigkeit und liefern genaue Abstandsmessungen und zeitnahe Cloud-Updates in komplexen Umgebungen",
   "heroImg": "product/details/283-hero.png",
   "pdf": "/downloads/h310-mw012-radar-distance-sensor-datasheet.pdf",
   "crumbCat": "Radar-Abstand",
   "returnCid": "266",
   "features": [
    {
     "icon": "product/details/283-f1.png",
     "text": "Genauigkeit: ±1 mm (konfigurierbar)"
    },
    {
     "icon": "product/details/283-f2.png",
     "text": "Gehäuse der Schutzart IP68"
    },
    {
     "icon": "product/details/283-f3.png",
     "text": "Großer Messbereich: 0,3–50 m (konfigurierbar)"
    },
    {
     "icon": "product/details/283-f4.png",
     "text": "Unterstützt NFC-Aktivierung und lokale Gerätekonfiguration."
    },
    {
     "icon": "product/details/283-f5.png",
     "text": "Unterstützt remote OTA-Firmware-Updates."
    },
    {
     "icon": "product/details/283-f6.png",
     "text": "Funkoptionen: 4G LTE, NB-IoT und LoRa."
    },
    {
     "icon": "product/details/283-f7.png",
     "text": "Fernüberwachung des Abstands"
    },
    {
     "icon": "product/details/283-f8.png",
     "text": "Konfigurierbare Schwellenwert-Alarme"
    }
   ],
   "specsTitle": "Technische Spezifikationen",
   "specsDesc": "Die hochpräzise Radar-Abstandsmessung, fortschrittliche stromsparende Prozessoren und optimierte eingebettete Algorithmen verleihen dem Sensor eine Auslegungslebensdauer von bis zu 10 Jahren bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen, wodurch die Routinewartung reduziert wird.",
   "specs": [
    [
     "Produktmodelle",
     "H200/H300/H500"
    ],
    [
     "Messbereich",
     "0,3–50 m (konfigurierbar)"
    ],
    [
     "Genauigkeit",
     "±1 mm (konfigurierbar)"
    ],
    [
     "Auflösung",
     "1 mm"
    ],
    [
     "Protokoll",
     "MQTT"
    ],
    [
     "Betriebstemperatur",
     "−20 °C bis +70 °C"
    ],
    [
     "Lagertemperatur",
     "−20 °C bis +80 °C"
    ],
    [
     "Batterielebensdauer",
     "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall."
    ],
    [
     "Montage",
     "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Produktmodelle",
     "value": "H200/H300/H500"
    },
    {
     "name": "Messbereich",
     "value": "0,3–50 m (konfigurierbar)",
     "minValue": 0.3,
     "maxValue": 50.0
    },
    {
     "name": "Genauigkeit",
     "value": "±1 mm (konfigurierbar)",
     "unitText": "Millimeter"
    },
    {
     "name": "Auflösung",
     "value": "1 mm",
     "unitText": "Millimeter"
    },
    {
     "name": "Protokoll",
     "value": "MQTT"
    },
    {
     "name": "Betriebstemperatur",
     "value": "−20 °C bis +70 °C",
     "unitText": "Grad Celsius",
     "minValue": -20.0,
     "maxValue": 70.0
    },
    {
     "name": "Lagertemperatur",
     "value": "−20 °C bis +80 °C",
     "unitText": "Grad Celsius",
     "minValue": -20.0,
     "maxValue": 80.0
    },
    {
     "name": "Batterielebensdauer",
     "value": "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall.",
     "unitText": "Jahr",
     "minValue": 10.0
    },
    {
     "name": "Montage",
     "value": "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Anwendungsszenarien",
   "scenarios": [
    {
     "img": "product/details/283-scen1.jpg",
     "label": "Kanaldeckel"
    },
    {
     "img": "product/details/283-scen2.jpg",
     "label": "Füllhöhe in Getreidesilos"
    },
    {
     "img": "product/details/283-scen3.jpg",
     "label": "Kohlebergwerk"
    },
    {
     "img": "product/details/283-scen4.jpg",
     "label": "Wasserwerk"
    },
    {
     "img": "product/details/283-scen5.jpg",
     "label": "Chemieanlage"
    },
    {
     "img": "product/details/283-scen6.jpg",
     "label": "Intelligente Fertigung"
    },
    {
     "img": "product/details/283-scen7.jpg",
     "label": "Intelligentes Gebäude"
    },
    {
     "img": "product/details/283-scen8.jpg",
     "label": "Intelligente Energie"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "284",
    "285",
    "276",
    "275"
   ],
   "summary": "Der Abstandssensor der H-Serie von Hitelecom ist ein drahtloser Radar-Abstandssensor mit Präzision im Millimeterbereich. Er misst 0,3–50 m bei einer Genauigkeit von ±1 mm und einer Auflösung von 1 mm, widersteht Störungen an rauen Industriestandorten und überträgt über 4G oder NB-IoT, mit einer Batterie, die für mehr als 10 Jahre Lebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen ausgelegt ist.",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Kanaldeckelüberwachung",
     "desc": "Erkennt Deckelverschiebungen und anomale Abstandsmesswerte für die kommunale Sicherheit.",
     "img": "product/details/283-scen1.jpg"
    },
    {
     "name": "Füllstand in Getreidesilos",
     "desc": "Misst den Abstand zur Materialoberfläche zur Berechnung des Füllstands in Getreidesilos.",
     "img": "product/details/283-scen2.jpg"
    },
    {
     "name": "Kohlenbunker in Bergwerken",
     "desc": "Überwacht die Füllhöhe von Kohlenbunkern unter staubigen, feuchten Untergrundbedingungen.",
     "img": "product/details/283-scen3.jpg"
    },
    {
     "name": "Wasser- und Abwasseranlagen",
     "desc": "Abstandsmessung in offenen Kanälen und Tanks zur Füllstandsregelung.",
     "img": "product/details/283-scen4.jpg"
    },
    {
     "name": "Chemieanlagen-Bestand",
     "desc": "Berührungslose Abstandsmessung über korrosiven oder verschlossenen Tanks.",
     "img": "product/details/283-scen5.jpg"
    },
    {
     "name": "Intelligente Gebäude und Logistik",
     "desc": "Belegung, Dock- und Palettenpositions-Abstandssensorik in Anlagen.",
     "img": "product/details/283-scen7.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "Welchen Abstandsbereich und welche Genauigkeit bietet er?",
     "a": "Er bietet einen Messbereich von 0,3–50 m (konfigurierbar) bei einer Genauigkeit von ±1 mm und einer Auflösung von 1 mm – geeignet für die Füllstandsüberwachung über den Abstand und die Verschiebungsüberwachung."
    },
    {
     "q": "Beeinträchtigen Staub oder Feuchtigkeit die Messung?",
     "a": "Die radarbasierte Messung ist darauf ausgelegt, die Messleistung an staubigen oder feuchten Standorten wie Kohlenbunkern und Kontrollschächten aufrechtzuerhalten; das IP68-Gehäuse schützt das Gerät selbst."
    },
    {
     "q": "Wie wird er gespeist und verbunden?",
     "a": "Er nutzt eine interne Batterie, die für mehr als 10 Jahre Lebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen ausgelegt ist, mit 4G- oder NB-IoT-Uplink via MQTT zu Hitelecom Cloud oder privaten Plattformen."
    },
    {
     "q": "Kann der Messbereich über 50 m hinaus erweitert werden?",
     "a": "Ja, Messbereich und Montage sind konfigurierbar. Nennen Sie Hitelecom Ihren Zielabstand und Ihr Medium für einen Konfigurationsvorschlag."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "284": {
   "series": "H-Serie · Vibrationssensor",
   "tagline": "Präzision | Messbereich | Extrem niedriger Stromverbrauch",
   "desc": "Die Vibrationssensoren von Hitelecom überwachen und analysieren die Vibration von Maschinenequipment in Industrie-4.0-Umgebungen und liefern Daten, die das Anlagenzustandsmanagement und die zustandsbasierte Wartung unterstützen, um ungeplante Ausfallzeiten zu reduzieren.",
   "heroImg": "product/details/284-hero.png",
   "pdf": "/downloads/vibration-sensor-datasheet.pdf",
   "crumbCat": "Vibrationsüberwachung",
   "returnCid": "271",
   "features": [
    {
     "icon": "product/details/284-f1.png",
     "text": "Vibrationsgeschwindigkeit: 0–100 mm/s (konfigurierbar)"
    },
    {
     "icon": "product/details/284-f2.png",
     "text": "Gehäuse der Schutzart IP68"
    },
    {
     "icon": "product/details/284-f3.png",
     "text": "Verschiebungsamplitu0–1 000 µm (konfigurierbar)"
    },
    {
     "icon": "product/details/284-f4.png",
     "text": "Unterstützt NFC-Aktivierung und lokale Gerätekonfiguration."
    },
    {
     "icon": "product/details/284-f5.png",
     "text": "Unterstützt remote OTA-Firmware-Updates."
    },
    {
     "icon": "product/details/284-f6.png",
     "text": "Funkoptionen: 4G LTE, NB-IoT und LoRa."
    },
    {
     "icon": "product/details/284-f7.png",
     "text": "Fernüberwachung der Vibration"
    },
    {
     "icon": "product/details/284-f8.png",
     "text": "Konfigurierbare Schwellenwert-Alarme"
    }
   ],
   "specsTitle": "Technische Spezifikationen",
   "specsDesc": "Stromsparende Prozessoren und Algorithmusoptimierung verleihen dem Sensor eine Auslegungslebensdauer von bis zu 10 Jahren bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen, mit minimalem Energieverbrauch pro Messzyklus.",
   "specs": [
    [
     "Produktmodelle",
     "H200/H300/H500"
    ],
    [
     "Vibrationsgeschwindigkeit",
     "0–100 mm/s (konfigurierbar)"
    ],
    [
     "Verschiebungsamplitude",
     "0–1 000 µm (konfigurierbar)"
    ],
    [
     "Genauigkeit",
     "±1 % bei 80 Hz (Kalibrierung)"
    ],
    [
     "Protokoll",
     "MQTT"
    ],
    [
     "Betriebstemperatur",
     "−20 °C bis +70 °C"
    ],
    [
     "Lagertemperatur",
     "−20 °C bis +80 °C"
    ],
    [
     "Batterielebensdauer",
     "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall."
    ],
    [
     "Montage",
     "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Produktmodelle",
     "value": "H200/H300/H500"
    },
    {
     "name": "Vibrationsgeschwindigkeit",
     "value": "0–100 mm/s (konfigurierbar)"
    },
    {
     "name": "Verschiebungsamplitude",
     "value": "0–1 000 µm (konfigurierbar)"
    },
    {
     "name": "Genauigkeit",
     "value": "±1 % bei 80 Hz (Kalibrierung)",
     "unitText": "Prozent"
    },
    {
     "name": "Protokoll",
     "value": "MQTT"
    },
    {
     "name": "Betriebstemperatur",
     "value": "−20 °C bis +70 °C",
     "unitText": "Grad Celsius",
     "minValue": -20.0,
     "maxValue": 70.0
    },
    {
     "name": "Lagertemperatur",
     "value": "−20 °C bis +80 °C",
     "unitText": "Grad Celsius",
     "minValue": -20.0,
     "maxValue": 80.0
    },
    {
     "name": "Batterielebensdauer",
     "value": "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall.",
     "unitText": "Jahr",
     "minValue": 10.0
    },
    {
     "name": "Montage",
     "value": "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Anwendungsszenarien",
   "scenarios": [
    {
     "img": "product/details/284-scen1.jpg",
     "label": "Halbleiter"
    },
    {
     "img": "product/details/284-scen2.jpg",
     "label": "Industriegeräte"
    },
    {
     "img": "product/details/284-scen3.jpg",
     "label": "Hafen"
    },
    {
     "img": "product/details/284-scen4.jpg",
     "label": "Intelligente Energie"
    },
    {
     "img": "product/details/284-scen5.jpg",
     "label": "Intelligentes Gebäude"
    },
    {
     "img": "product/details/284-scen6.jpg",
     "label": "Logistik und Transport"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "285",
    "276",
    "275"
   ],
   "summary": "Der Vibrationssensor der H-Serie von Hitelecom ist ein drahtloser Monitor für rotierende Maschinen und Bauwerksvibration in der Industrie 4.0. Er misst die Vibrationsgeschwindigkeit von 0 bis 100 mm/s und die Verschiebungsamplitude von 0–1 000 µm (konfigurierbar) bei einer Genauigkeit von ±1 % (kalibriert bei 80 Hz), überträgt über 4G oder NB-IoT und ist für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen ausgelegt.",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Rotierende Industrieanlagen",
     "desc": "Pumpen, Lüfter, Motoren und Kompressoren erhalten ein kontinuierliches Vibrationstrending, das die zustandsbasierte Wartung unterstützt.",
     "img": "product/details/284-scen2.jpg"
    },
    {
     "name": "Halbleiteranlagen",
     "desc": "Überwacht vibrationsempfindliche Prozesswerkzeuge und Reinraumausrüstung.",
     "img": "product/details/284-scen1.jpg"
    },
    {
     "name": "Hafen- und Hafenmaschinen",
     "desc": "Verfolgt Kran- und Förderbandvibration für den sicheren Hafenbetrieb.",
     "img": "product/details/284-scen3.jpg"
    },
    {
     "name": "Gebäude- und Bauwerkszustand",
     "desc": "Überwacht die strukturelle Reaktion von Gebäuden in der Nähe von Bauarbeiten oder schwerem Verkehr.",
     "img": "product/details/284-scen5.jpg"
    },
    {
     "name": "Energieanlagen",
     "desc": "Überwacht Turbinen, Generatoren und Transformatoren auf anomale Vibrationsmuster.",
     "img": "product/details/284-scen4.jpg"
    },
    {
     "name": "Logistik und Transport",
     "desc": "Stoß- und Vibrationsaufzeichnung für empfindliche Güter während des Transports.",
     "img": "product/details/284-scen6.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "Welche Vibrationsgrößen misst er?",
     "a": "Vibrationsgeschwindigkeit 0–100 mm/s und Verschiebungsamplitude 0–1 000 µm, beide konfigurierbar, bei einer Genauigkeit von ±1 %, kalibriert bei 80 Hz."
    },
    {
     "q": "Wie unterstützt er die zustandsbasierte Wartung?",
     "a": "Kontinuierliche Intensitäts- und Amplitudentrends können helfen, Anzeichen von Lagerverschleiß, Unwucht und Fehlausrichtung frühzeitig zu erkennen, sodass die Wartung zustandsbasiert statt kalenderbasiert geplant werden kann."
    },
    {
     "q": "Wie wird der Sensor montiert und gespeist?",
     "a": "Die Montage mit Magnetfuß, Gewinde, Kleber oder Halterung variiert je nach Modell – bestätigen Sie das Montagezubehör für Ihre Konfiguration. Der Sensor ist batteriebetrieben und benötigt keine Signal- oder Stromverkabelung; er ist für mehr als 10 Jahre Lebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen ausgelegt."
    },
    {
     "q": "Mit welcher Datenplattform verbindet er sich?",
     "a": "Er überträgt über 4G oder NB-IoT via MQTT an Hitelecom Cloud oder eine Kundenplattform, mit Schwellenwert-Alarmen bei anormaler Vibration."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "285": {
   "series": "H-Serie · Luftqualitätssensor",
   "tagline": "6-in-1 | Präzision | Energieeffizient",
   "desc": "Der 6-in-1-Luftqualitätssensor von Hitelecom misst CO₂, PM2.5, TVOC, Temperatur, Feuchtigkeit und Luftdruck, mit optionalen NO₂-, SO₂-, NH₃- und O₃-Kanälen. Die Daten werden über 4G oder NB-IoT an die Cloud übertragen, und das wartungsarme Design unterstützt die langfristige städtische und industrielle Umweltüberwachung.",
   "heroImg": "product/details/285-hero.png",
   "pdf": "/downloads/h310-aq041-air-quality-sensor-datasheet.pdf",
   "crumbCat": "Luftqualität",
   "returnCid": "265",
   "features": [
    {
     "icon": "product/details/285-f1.png",
     "text": "Misst CO₂, PM2.5, TVOC, Temperatur, Feuchtigkeit und Luftdruck"
    },
    {
     "icon": "product/details/285-f2.png",
     "text": "Gehäuse der Schutzart IP68"
    },
    {
     "icon": "product/details/285-f3.png",
     "text": "Optionale NO₂-, SO₂-, NH₃- und O₃-Kanäle (je nach Konfiguration)"
    },
    {
     "icon": "product/details/285-f4.png",
     "text": "Unterstützt NFC-Aktivierung und lokale Gerätekonfiguration."
    },
    {
     "icon": "product/details/285-f5.png",
     "text": "Unterstützt remote OTA-Firmware-Updates."
    },
    {
     "icon": "product/details/285-f6.png",
     "text": "Funkoptionen: 4G LTE, NB-IoT und LoRa."
    },
    {
     "icon": "product/details/285-f7.png",
     "text": "Fernüberwachung der Luft"
    },
    {
     "icon": "product/details/285-f8.png",
     "text": "Konfigurierbare Schwellenwert-Alarme"
    }
   ],
   "specsTitle": "Technische Spezifikationen",
   "specsDesc": "Stromsparende Prozessoren und Algorithmusoptimierung ermöglichen die gleichzeitige Erfassung mehrerer Luftqualitätskanäle. Die Batterie ist für mehr als 10 Jahre Lebensdauer bei einem vierstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen ausgelegt; die tatsächliche Lebensdauer variiert je nach Sensorkonfiguration, Netzabdeckung und Umgebung.",
   "specs": [
    [
     "Produktmodelle",
     "H200/H300/H500"
    ],
    [
     "CO₂",
     "400–5 000 ppm"
    ],
    [
     "PM2.5 / TVOC",
     "Inbegriffen (Bereiche je nach Konfiguration)"
    ],
    [
     "Optionale Gaskanäle",
     "NO₂, SO₂, NH₃, O₃ (je nach Konfiguration)"
    ],
    [
     "Temperaturmessbereich",
     "−40 °C bis +85 °C (±0,2 °C)"
    ],
    [
     "Feuchtigkeit",
     "0–100 % RH"
    ],
    [
     "Luftdruck",
     "30–120 kPa (±0,1 kPa)"
    ],
    [
     "Protokoll",
     "MQTT"
    ],
    [
     "Frequenzbänder",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Batterielebensdauer",
     "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem vierstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall."
    ],
    [
     "Montage",
     "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Produktmodelle",
     "value": "H200/H300/H500"
    },
    {
     "name": "CO₂",
     "value": "400–5 000 ppm",
     "unitText": "Teile pro Million",
     "minValue": 400.0,
     "maxValue": 5000.0
    },
    {
     "name": "PM2.5 / TVOC",
     "value": "Inbegriffen (Bereiche je nach Konfiguration)"
    },
    {
     "name": "Optionale Gaskanäle",
     "value": "NO₂, SO₂, NH₃, O₃ (je nach Konfiguration)"
    },
    {
     "name": "Temperaturmessbereich",
     "value": "−40 °C bis +85 °C (±0,2 °C)",
     "unitText": "Grad",
     "minValue": -40.0,
     "maxValue": 85.0
    },
    {
     "name": "Feuchtigkeit",
     "value": "0–100 % RH",
     "unitText": "Prozent",
     "minValue": 0.0,
     "maxValue": 100.0
    },
    {
     "name": "Luftdruck",
     "value": "30–120 kPa (±0,1 kPa)",
     "unitText": "Kilopascal",
     "minValue": 30.0,
     "maxValue": 120.0
    },
    {
     "name": "Protokoll",
     "value": "MQTT"
    },
    {
     "name": "Frequenzbänder",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Batterielebensdauer",
     "value": "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem vierstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall.",
     "unitText": "Jahr",
     "minValue": 10.0
    },
    {
     "name": "Montage",
     "value": "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Anwendungsszenarien",
   "scenarios": [
    {
     "img": "product/details/285-scen1.jpg",
     "label": "Büroumgebung"
    },
    {
     "img": "product/details/285-scen2.jpg",
     "label": "Intelligente Stadt"
    },
    {
     "img": "product/details/285-scen3.jpg",
     "label": "Krankenhaus"
    },
    {
     "img": "product/details/285-scen4.jpg",
     "label": "Intelligenter Transport"
    },
    {
     "img": "product/details/285-scen5.jpg",
     "label": "Wohnumgebung"
    },
    {
     "img": "product/details/285-scen6.jpg",
     "label": "Rechenzentrum"
    },
    {
     "img": "product/details/285-scen7.jpg",
     "label": "Intelligente Fertigung"
    },
    {
     "img": "product/details/285-scen8.jpg",
     "label": "Intelligente Landwirtschaft"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "276",
    "275"
   ],
   "summary": "Der Luftqualitätssensor der H-Serie von Hitelecom ist ein drahtloser 6-in-1-Monitor für städtische und industrielle Umgebungen. Er verfolgt CO₂ (400–5 000 ppm), PM2.5, TVOC, Temperatur (−40 °C bis +85 °C, ±0,2 °C), Feuchtigkeit (0–100 % RH) und Luftdruck (30–120 kPa), mit optionalen NO₂-, SO₂-, NH₃- und O₃-Kanälen, und überträgt über 4G oder NB-IoT.",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Luftüberwachung in intelligenten Städten",
     "desc": "Rasterförmig bereitgestellte Mikrostationen verfolgen die städtischen Luftqualitätstrends Block für Block.",
     "img": "product/details/285-scen2.jpg"
    },
    {
     "name": "Büro- und Schulgebäude",
     "desc": "CO₂- und Feuchtigkeitsmesswerte können Lüftungsentscheidungen untermauern, wenn sie mit einem unterstützten Steuerungssystem integriert werden.",
     "img": "product/details/285-scen1.jpg"
    },
    {
     "name": "Krankenhäuser",
     "desc": "Überwacht die Luftbedingungen in Stationen und Kliniken, wo sich gefährdete Personen aufhalten.",
     "img": "product/details/285-scen3.jpg"
    },
    {
     "name": "Rechenzentren",
     "desc": "Kombiniert Temperatur, Feuchtigkeit und Druck für die Aufzeichnung der Umweltkonformität.",
     "img": "product/details/285-scen6.jpg"
    },
    {
     "name": "Industrieparks",
     "desc": "Perimeter-Überwachung der Parkluft zur frühzeitigen Erkennung anormaler Emissionen.",
     "img": "product/details/285-scen7.jpg"
    },
    {
     "name": "Verkehrsknotenpunkte",
     "desc": "Luftqualitätstransparenz in Bahnhöfen, Tunneln und Parkhäusern.",
     "img": "product/details/285-scen4.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "Welche Parameter misst der 6-in-1-Sensor?",
     "a": "CO₂ (400–5 000 ppm), PM2.5, TVOC, Temperatur (−40 °C bis +85 °C, ±0,2 °C), Feuchtigkeit (0–100 % RH) und Luftdruck (30–120 kPa, ±0,1 kPa), mit optionalen NO₂-, SO₂-, NH₃- und O₃-Kanälen je nach Konfiguration."
    },
    {
     "q": "Wie lange kann er unbeaufsichtigt laufen?",
     "a": "Ausgewählte Konfigurationen sind für mehr als 10 Jahre Batterielebensdauer bei einem vierstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen ausgelegt; die tatsächliche Lebensdauer variiert je nach Sensorkonfiguration, Netzabdeckung und Umgebung. Das IP68-Gehäuse unterstützt die Installation im Außenbereich."
    },
    {
     "q": "Wie werden die Luftqualitätsdaten geliefert?",
     "a": "Drahtlos über 4G oder NB-IoT via MQTT an Hitelecom Cloud oder Ihre Plattform, mit Schwellenwert-Alarmen auf jedem Kanal."
    },
    {
     "q": "Können die Kanäle für unseren Standort angepasst werden?",
     "a": "Ja. Die 6-in-1-Konfiguration ist modular – nennen Sie Hitelecom, welche Gase oder Partikel Sie benötigen, und ein passender Kanalsatz wird vorgeschlagen."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "275": {
   "series": "H68-Serie · Gateway für Außenbereich",
   "tagline": "IP68 | Hohe Kapazität | Breite Abdeckung",
   "desc": "Das Gateway der H68-Serie verfügt über ein IP68-zertifiziertes, staubdichtes und wasserdichtes Gehäuse, das für den langfristigen Außeneinsatz in komplexen Industrieumgebungen ausgelegt ist. Es unterstützt die Plug-and-play-Bereitstellung, und ein Stromausfall-Alarm kann gesendet werden, wenn Notstrom und Backhaul verfügbar bleiben.",
   "heroImg": "product/details/275-hero.png",
   "pdf": "/downloads/outdoor-4g-gateway-h68-datasheet.pdf",
   "crumbCat": "Gateway für Außenbereich",
   "returnCid": "273",
   "features": [
    {
     "icon": "product/details/275-f1.png",
     "text": "Kommunikationsreichweite bis zu 10 km (freies Feld)"
    },
    {
     "icon": "product/details/275-f2.png",
     "text": "Schutzart IP68, wasserdicht und staubdicht"
    },
    {
     "icon": "product/details/275-f3.png",
     "text": "Industrielles 8-Kanal-Vollduplex-Gateway"
    },
    {
     "icon": "product/details/275-f4.png",
     "text": "Ermöglicht die lokale Bereitstellung für Datenkontrolle und Zuverlässigkeit"
    },
    {
     "icon": "product/details/275-f5.png",
     "text": "Integrierte Leistungsverstärker- und rauscharme Verstärkerschaltung"
    },
    {
     "icon": "product/details/275-f6.png",
     "text": "Funkoptionen: 4G LTE, NB-IoT und LoRa."
    },
    {
     "icon": "product/details/275-f7.png",
     "text": "Netzwerk mit großer Kapazität, Fernsteuerung und Datenerfassung"
    },
    {
     "icon": "product/details/275-f8.png",
     "text": "Kann einen Stromausfall-Alarm senden, wenn Notstrom und Backhaul verfügbar bleiben"
    }
   ],
   "specsTitle": "Technische Spezifikationen",
   "specsDesc": "Die H68-Serie unterstützt Langstreckenübertragung bis zu 10 Kilometer und erreicht bis zu 2 Kilometer in städtischen Gebieten. Sie integriert die Konnektivitätsoptionen 4G LTE, Ethernet und Wi-Fi für eine zuverlässige, kontinuierliche Datenübertragung.",
   "specs": [
    [
     "Produktmodelle",
     "H68"
    ],
    [
     "Frequenzbänder",
     "CN470/EU868/IN865/RU864/US915/AU915"
    ],
    [
     "Abstand",
     "Bis zu 10 km (freies Feld)"
    ],
    [
     "Sendeleistung",
     "20–27 dBm"
    ],
    [
     "Empfindlichkeit",
     "−140 dBm bei 0,292 kbps"
    ],
    [
     "Antenne",
     "Externe Glasfaserantenne"
    ],
    [
     "4G-Band",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Protokoll",
     "MQTT"
    ],
    [
     "Betriebstemperatur",
     "−40 °C bis +85 °C"
    ],
    [
     "Lagertemperatur",
     "−40 °C bis +85 °C"
    ],
    [
     "Montage",
     "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Produktmodelle",
     "value": "H68"
    },
    {
     "name": "Frequenzbänder",
     "value": "CN470/EU868/IN865/RU864/US915/AU915"
    },
    {
     "name": "Abstand",
     "value": "Bis zu 10 km (freies Feld)"
    },
    {
     "name": "Sendeleistung",
     "value": "20–27 dBm",
     "unitText": "Dezibel-Milliwatt",
     "minValue": 20.0,
     "maxValue": 27.0
    },
    {
     "name": "Empfindlichkeit",
     "value": "−140 dBm bei 0,292 kbps",
     "unitText": "Dezibel-Milliwatt"
    },
    {
     "name": "Antenne",
     "value": "Externe Glasfaserantenne"
    },
    {
     "name": "4G-Band",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Protokoll",
     "value": "MQTT"
    },
    {
     "name": "Betriebstemperatur",
     "value": "−40 °C bis +85 °C",
     "unitText": "Grad",
     "minValue": -40.0,
     "maxValue": 85.0
    },
    {
     "name": "Lagertemperatur",
     "value": "−40 °C bis +85 °C",
     "unitText": "Grad",
     "minValue": -40.0,
     "maxValue": 85.0
    },
    {
     "name": "Montage",
     "value": "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Anwendungsszenarien",
   "scenarios": [
    {
     "img": "product/details/275-scen1.jpg",
     "label": "Erneuerbare Energien"
    },
    {
     "img": "product/details/275-scen2.jpg",
     "label": "Intelligente Industrieparks"
    },
    {
     "img": "product/details/275-scen3.jpg",
     "label": "Intelligentes Wassermanagement"
    },
    {
     "img": "product/details/275-scen4.jpg",
     "label": "Industrieautomatisierung"
    },
    {
     "img": "product/details/275-scen5.jpg",
     "label": "Umweltüberwachung"
    },
    {
     "img": "product/details/275-scen6.jpg",
     "label": "Intelligente Stadt"
    },
    {
     "img": "product/details/275-scen7.jpg",
     "label": "Intelligenter Transport"
    },
    {
     "img": "product/details/275-scen8.jpg",
     "label": "Logistik und Lieferkette"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285",
    "276"
   ],
   "summary": "Das Hitelecom-Außen-Gateway H68 ist ein industrielles LoRa-Gateway für großflächige Sensornetze: bis zu 10 km Abdeckung, −140 dBm Empfindlichkeit, 20–27 dBm Sendeleistung und regionale Bänder einschließlich CN470, EU868, US915 und AU915. Das IP68-Gehäuse ist für den langfristigen Außeneinsatz ausgelegt, mit 4G-Backhaul und MQTT-Uplink.",
   "sku": "H68",
   "applications": [
    {
     "name": "Intelligente Parks und Campus",
     "desc": "Ein Dach-Gateway kann Daten von vielen Sensoren über einen Standort hinweg sammeln.",
     "img": "product/details/275-scen2.jpg"
    },
    {
     "name": "Intelligente Wassernetze",
     "desc": "Aggregiert Zähler- und Füllstandssensorverkehr über ein Versorgungsgebiet.",
     "img": "product/details/275-scen3.jpg"
    },
    {
     "name": "Standorte erneuerbarer Energien",
     "desc": "Deckt Solarparks und Windstandorte mit langreichweitigem Sensor-Backhaul ab.",
     "img": "product/details/275-scen1.jpg"
    },
    {
     "name": "Industrieautomatisierung",
     "desc": "Werkweite Sensorerfassung ohne SIM-Karte pro Sensor.",
     "img": "product/details/275-scen4.jpg"
    },
    {
     "name": "Umweltüberwachung",
     "desc": "Fluss-, Luft- und Lärmsensornetze über weite ländliche Gebiete.",
     "img": "product/details/275-scen5.jpg"
    },
    {
     "name": "Beleuchtung und Anlagen einer intelligenten Stadt",
     "desc": "Abdeckung auf Stadtblock-Ebene für kommunale Sensornetze.",
     "img": "product/details/275-scen6.jpg"
    },
    {
     "name": "Logistikhöfe",
     "desc": "Hofweite Verfolgungs- und Zustandssensoren über ein einziges Gateway.",
     "img": "product/details/275-scen8.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "Welche Abdeckung bietet das Außen-Gateway H68?",
     "a": "Bis zu 10 km unter freien Bedingungen mit −140 dBm Empfindlichkeit und 20–27 dBm Sendeleistung. Die reale Abdeckung hängt von Gelände und Antennenhöhe ab – Hitelecom kann sie anhand Ihres Standortplans schätzen."
    },
    {
     "q": "Welche Frequenzbänder werden unterstützt?",
     "a": "CN470, EU868, IN865, RU864, US915 und AU915 – für Bereitstellungen in China, Europa, Indien, Russland, Nordamerika und Australien."
    },
    {
     "q": "Wie überträgt das Gateway die Daten ins Backend?",
     "a": "Über 4G-Mobilfunk (LTE-TDD B34/B38/B39/B40/B41, LTE-FDD B1/B3/B5/B8) mit MQTT-Uplink an Hitelecom Cloud oder eine private Plattform."
    },
    {
     "q": "Eignet sich das H68 für die langfristige Installation im Außenbereich?",
     "a": "Ja. Das IP68-Gehäuse ist staubdicht und wasserdicht, und das Industriedesign zielt auf den langfristigen Außeneinsatz ab."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "276": {
   "series": "H66-Serie · Gateway für Innenräume",
   "tagline": "Industriell | Große Reichweite | Vollduplex",
   "desc": "Das Gateway der H66-Serie bietet ein langlebiges Design für den stabilen Betrieb in wechselnden Industrieumgebungen. Es unterstützt die Plug-and-play-Bereitstellung, und ein Stromausfall-Alarm kann gesendet werden, wenn Notstrom und Backhaul verfügbar bleiben.",
   "heroImg": "product/details/276-hero.png",
   "pdf": "/downloads/indoor-gateway-h66-datasheet.pdf",
   "crumbCat": "Gateway für Innenräume",
   "returnCid": "272",
   "features": [
    {
     "icon": "product/details/276-f1.png",
     "text": "Kommunikationsreichweite bis zu 5 km (freies Feld)"
    },
    {
     "icon": "product/details/276-f2.png",
     "text": "Schutzart IP67, wasserdicht und staubdicht"
    },
    {
     "icon": "product/details/276-f3.png",
     "text": "Industrielles 8-Kanal-Vollduplex-Gateway"
    },
    {
     "icon": "product/details/276-f4.png",
     "text": "Ermöglicht die lokale Bereitstellung für Datenkontrolle und Zuverlässigkeit"
    },
    {
     "icon": "product/details/276-f5.png",
     "text": "Integrierte Leistungsverstärker- und rauscharme Verstärkerschaltung"
    },
    {
     "icon": "product/details/276-f6.png",
     "text": "Funkoptionen: 4G LTE, NB-IoT und LoRa."
    },
    {
     "icon": "product/details/276-f7.png",
     "text": "Netzwerk mit großer Kapazität, Fernsteuerung und Datenerfassung"
    },
    {
     "icon": "product/details/276-f8.png",
     "text": "Kann einen Stromausfall-Alarm senden, wenn Notstrom und Backhaul verfügbar bleiben"
    }
   ],
   "specsTitle": "Technische Spezifikationen",
   "specsDesc": "Das industrielle Mehrkanal-Funkgateway der H66-Serie unterstützt mehrere Protokolle, bietet 8-Kanal-Vollduplex und Edge-Computing, widersteht rauen Bedingungen und ermöglicht Echtzeit-Datenverarbeitung und Fernverwaltung.",
   "specs": [
    [
     "Produktmodelle",
     "H66"
    ],
    [
     "Frequenzbänder",
     "CN470/EU868/IN865/RU864/US915/AU915"
    ],
    [
     "Abstand",
     "Bis zu 5 km (freies Feld)"
    ],
    [
     "Sendeleistung",
     "20–27 dBm"
    ],
    [
     "Empfindlichkeit",
     "−140 dBm bei 0,292 kbps"
    ],
    [
     "Antenne",
     "Externe Glasfaserantenne"
    ],
    [
     "4G-Band",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Protokoll",
     "MQTT"
    ],
    [
     "Betriebstemperatur",
     "−20 °C bis +70 °C"
    ],
    [
     "Lagertemperatur",
     "−20 °C bis +80 °C"
    ],
    [
     "Montage",
     "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Produktmodelle",
     "value": "H66"
    },
    {
     "name": "Frequenzbänder",
     "value": "CN470/EU868/IN865/RU864/US915/AU915"
    },
    {
     "name": "Abstand",
     "value": "Bis zu 5 km (freies Feld)"
    },
    {
     "name": "Sendeleistung",
     "value": "20–27 dBm",
     "unitText": "Dezibel-Milliwatt",
     "minValue": 20.0,
     "maxValue": 27.0
    },
    {
     "name": "Empfindlichkeit",
     "value": "−140 dBm bei 0,292 kbps",
     "unitText": "Dezibel-Milliwatt"
    },
    {
     "name": "Antenne",
     "value": "Externe Glasfaserantenne"
    },
    {
     "name": "4G-Band",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Protokoll",
     "value": "MQTT"
    },
    {
     "name": "Betriebstemperatur",
     "value": "−20 °C bis +70 °C",
     "unitText": "Grad Celsius",
     "minValue": -20.0,
     "maxValue": 70.0
    },
    {
     "name": "Lagertemperatur",
     "value": "−20 °C bis +80 °C",
     "unitText": "Grad Celsius",
     "minValue": -20.0,
     "maxValue": 80.0
    },
    {
     "name": "Montage",
     "value": "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Anwendungsszenarien",
   "scenarios": [
    {
     "img": "product/details/276-scen1.jpg",
     "label": "Gebäudemanagement"
    },
    {
     "img": "product/details/276-scen2.jpg",
     "label": "Energiemanagement"
    },
    {
     "img": "product/details/276-scen3.jpg",
     "label": "Logistik"
    },
    {
     "img": "product/details/276-scen4.jpg",
     "label": "Industriell"
    },
    {
     "img": "product/details/276-scen5.jpg",
     "label": "Intelligente Stadt"
    },
    {
     "img": "product/details/276-scen6.jpg",
     "label": "Wassermanagement"
    },
    {
     "img": "product/details/276-scen7.jpg",
     "label": "Intelligenter Transport"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285",
    "275"
   ],
   "summary": "Das Hitelecom-Innen-Gateway H66 ist ein industrielles Vollduplex-LoRa-Gateway für Sensornetze in Gebäuden: bis zu 5 km Reichweite, −140 dBm Empfindlichkeit, regionale Bänder von CN470 bis US915, Plug-and-play-Einrichtung mit Stromausfall-Alarm, 4G-Backhaul und MQTT-Uplink.",
   "sku": "H66",
   "applications": [
    {
     "name": "Gebäudemanagement",
     "desc": "Sammelt HVAC-, Mess- und Umgebungssensoren über die Etagen hinweg von einem Kommunikationsraum aus.",
     "img": "product/details/276-scen1.jpg"
    },
    {
     "name": "Energiemanagement",
     "desc": "Aggregiert den Submetering-Sensorverkehr für Energieaudits von Fabriken und Gebäuden.",
     "img": "product/details/276-scen2.jpg"
    },
    {
     "name": "Logistik und Lagerhaltung",
     "desc": "Sensorerfassung im Lager für Temperatur, Tür- und Asset-Beacons.",
     "img": "product/details/276-scen3.jpg"
    },
    {
     "name": "Industrieanlagen",
     "desc": "Fertigungshallen-Sensornetze ohne Datenkabelverlegung.",
     "img": "product/details/276-scen4.jpg"
    },
    {
     "name": "Wassermanagement",
     "desc": "Aggregation von Pumpenraum- und Tankfüllstandssensoren in Versorgungsgebäuden.",
     "img": "product/details/276-scen6.jpg"
    },
    {
     "name": "Transportanlagen",
     "desc": "Sensorerfassung in Bahnhöfen, Tunneln und Depots.",
     "img": "product/details/276-scen7.jpg"
    }
   ],
   "certifications": [
    "IP67"
   ],
   "faqs": [
    {
     "q": "Was ist der Unterschied zwischen dem H66 und dem H68?",
     "a": "Das H66 ist das Modell für Innenräume: Plug-and-play mit Stromausfall-Alarm, bis zu 5 km Reichweite und einem IP67-Gehäuse. Das H68 ist das Modell für den Außenbereich mit bis zu 10 km Reichweite, IP68 und einem Design für den langfristigen Außeneinsatz."
    },
    {
     "q": "Welche Frequenzbänder unterstützt es?",
     "a": "CN470, EU868, IN865, RU864, US915 und AU915, passend zu den regionalen LoRa-Bandplänen."
    },
    {
     "q": "Was passiert bei einem Stromausfall?",
     "a": "Wenn Notstrom und das 4G-Backhaul verfügbar bleiben, kann das Gateway einen Stromausfall-Alarm senden."
    },
    {
     "q": "Wie viele Sensoren kann ein Gateway bedienen?",
     "a": "Ein industrielles Vollduplex-Gateway kann große Sensorflotten bedienen; die tatsächliche Kapazität hängt vom Übertragungsintervall, der Nutzlast und den Netzbedingungen ab – teilen Sie Ihre Geräteanzahl mit, und Hitelecom wird das Netz dimensionieren."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "277": {
   "series": "H-Serie · Hydrologie-Station",
   "tagline": "Solar | Modular | 2–12 Kanäle",
   "desc": "Integriert 2 bis 12 modulare Sensorkanäle für die Umgebungsdatenerfassung – der Kanalsatz (Pegel-, Durchfluss-, Wasserqualitäts-, Wetter- oder Luftqualitätssensoren) wird pro Projekt konfiguriert –, mit Echtzeitübertragung an die Hitelecom-Cloud-Plattform. Benutzer können über das Internet von überall auf hydrologische und Umgebungsdaten zugreifen, was Fernüberwachung und -analyse unterstützt.",
   "heroImg": "product/details/277-hero.png",
   "pdf": "/downloads/hydrology-monitoring-station-datasheet.pdf",
   "crumbCat": "12 Parameter",
   "returnCid": "274",
   "features": [
    {
     "icon": "product/details/277-f1.png",
     "text": "Überwachung mit 2–12 Sensorkanälen"
    },
    {
     "icon": "product/details/277-f2.png",
     "text": "Schutzart IP65, wasserdicht und staubdicht"
    },
    {
     "icon": "product/details/277-f3.png",
     "text": "2–12 konfigurierbare Sensorkanäle"
    },
    {
     "icon": "product/details/277-f4.png",
     "text": "Unterstützt NFC-Aktivierung und lokale Gerätekonfiguration."
    },
    {
     "icon": "product/details/277-f5.png",
     "text": "Unterstützt remote OTA-Firmware-Updates."
    },
    {
     "icon": "product/details/277-f6.png",
     "text": "Funkoptionen: 4G LTE, NB-IoT und LoRa."
    },
    {
     "icon": "product/details/277-f7.png",
     "text": "Remote-Datenzugriff: Überwachen Sie von überall"
    },
    {
     "icon": "product/details/277-f8.png",
     "text": "Konfigurierbare Schwellenwert-Alarme"
    }
   ],
   "specsTitle": "Technische Spezifikationen",
   "specsDesc": "Überwacht eine Reihe hydrologischer Daten, darunter unter anderem Wasserstand, Durchfluss, Wasserqualität, Temperatur und Feuchtigkeit, Windgeschwindigkeit und -richtung, Luftdruck, Niederschlag, PM2.5/10 und CO₂, um Einblicke in Wasserstände sowie Luftverschmutzungstrends und deren Quellen zu geben und zuverlässige Daten für den Umweltschutz und das städtische Wassermanagement zu liefern.",
   "specs": [
    [
     "Produktmodelle",
     "H700"
    ],
    [
     "Messbereich",
     "Konfigurierbar"
    ],
    [
     "Genauigkeit",
     "Konfigurierbar"
    ],
    [
     "Protokoll",
     "MQTT"
    ],
    [
     "Geltungsbereich",
     "Städtische · Ländliche · Ebenen · Berggebiete"
    ],
    [
     "Frequenzbänder",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Stromversorgung",
     "Solarstrom · Netzstrom"
    ],
    [
     "Montage",
     "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Produktmodelle",
     "value": "H700"
    },
    {
     "name": "Messbereich",
     "value": "Konfigurierbar"
    },
    {
     "name": "Genauigkeit",
     "value": "Konfigurierbar"
    },
    {
     "name": "Protokoll",
     "value": "MQTT"
    },
    {
     "name": "Geltungsbereich",
     "value": "Städtische · Ländliche · Ebenen · Berggebiete"
    },
    {
     "name": "Frequenzbänder",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Stromversorgung",
     "value": "Solarstrom · Netzstrom"
    },
    {
     "name": "Montage",
     "value": "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Anwendungsszenarien",
   "scenarios": [
    {
     "img": "product/details/277-scen1.jpg",
     "label": "Intelligente Landwirtschaft"
    },
    {
     "img": "product/details/277-scen2.jpg",
     "label": "Umweltüberwachung"
    },
    {
     "img": "product/details/277-scen3.jpg",
     "label": "Stadtverwaltung"
    },
    {
     "img": "product/details/277-scen4.jpg",
     "label": "Intelligenter Campus"
    },
    {
     "img": "product/details/277-scen5.jpg",
     "label": "Energieversorger"
    },
    {
     "img": "product/details/277-scen6.jpg",
     "label": "Meeres- und Küstenüberwachung"
    },
    {
     "img": "product/details/277-scen7.jpg",
     "label": "Notfallmanagement"
    },
    {
     "img": "product/details/277-scen8.jpg",
     "label": "Transport und Versand"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285",
    "276"
   ],
   "summary": "Die Hitelecom-Hydrologie-Station H700 ist ein modulares, solarbetriebenes Überwachungsterminal, das 2 bis 12 Sensorkanäle für Wasser- und Umgebungsdaten integriert. Es überträgt in Echtzeit über 4G an Hitelecom Cloud, kann in städtischen und ländlichen Gebieten einschließlich Ebenen und Berggelände bereitgestellt werden und lässt sich mit Montagelaschen, einer Mastschelle oder einer Schlitzmontage installieren.",
   "sku": "H700",
   "applications": [
    {
     "name": "Fluss- und Bachüberwachung",
     "desc": "Wasserstand-, Niederschlags- und durchflussbezogene Kanäle für hydrologische Netze."
    },
    {
     "name": "Reservoir- und Seeverwaltung",
     "desc": "Multiparameter-Hydrologieaufzeichnung für Einsatz und Sicherheit.",
     "img": "solution/67-scen-0.jpg"
    },
    {
     "name": "Überwachung städtischer Überschwemmungen",
     "desc": "Niederschlags- plus Pegelüberwachung an überschwemmungsgefährdeten städtischen Punkten.",
     "img": "product/details/277-scen3.jpg"
    },
    {
     "name": "Intelligente Landwirtschaft",
     "desc": "Wasser- und Wetterkanäle des Bewässerungsbezirks in einer Station.",
     "img": "product/details/277-scen1.jpg"
    },
    {
     "name": "Umweltüberwachung",
     "desc": "Wasserqualitäts- und meteorologische Kanäle für Wassereinzugsprogramme."
    },
    {
     "name": "Warnung vor Sturzfluten",
     "desc": "Entlegene Solarstationen in Bergwassereinzugsgebieten speisen Frühwarnsysteme.",
     "img": "product/details/277-scen2.jpg"
    },
    {
     "name": "Küsten- und Flussmündungsstandorte",
     "desc": "Gezeiten- und Wetterkanäle für das Küstenmanagement.",
     "img": "product/details/277-scen6.jpg"
    },
    {
     "name": "Notfallmanagement",
     "desc": "Schnell bereitgestellte Stationen liefern Daten während der Hochwassersaison.",
     "img": "product/details/277-scen7.jpg"
    }
   ],
   "certifications": [
    "IP65"
   ],
   "faqs": [
    {
     "q": "Was kann die Hydrologie-Station H700 messen?",
     "a": "Es integriert 2 bis 12 Sensorkanäle pro Standort – typische Konfigurationen kombinieren Sensoren für Wasserstand, Niederschlag, Durchfluss und Meteorologie. Die Kanäle werden pro Projekt ausgewählt."
    },
    {
     "q": "Wie wird die Station gespeist?",
     "a": "Die Station kann Solar- oder Netzstrom nutzen und unterstützt sowohl entlegene als auch städtische Installationen."
    },
    {
     "q": "Wie gelangen die Daten zur Plattform?",
     "a": "In Echtzeit über 4G mit MQTT-Uplink an Hitelecom Cloud; Benutzer lesen und exportieren die Daten über die Webplattform oder die App."
    },
    {
     "q": "Wo kann sie bereitgestellt werden?",
     "a": "Städtische, ländliche, Ebenen- und Berggebiete; die Montagelaschen-, Mastschellen- und Schlitzmontage-Optionen passen an Masten, Wände und Schienen."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "278": {
   "series": "H-Serie · Wetterstation",
   "tagline": "Modular | Solarbetrieben | Für jedes Wetter",
   "desc": "Integriert 2–12 Sensoren für die Umgebungsdatenerfassung und ermöglicht die Echtzeitübertragung an die Hitelecom-Cloud-Plattform. Ermöglicht die Fernüberwachung und -analyse meteorologischer Daten von überall über das Internet.",
   "heroImg": "product/details/278-hero.png",
   "pdf": "/downloads/weather-station-datasheet.pdf",
   "crumbCat": "6 Parameter",
   "returnCid": "275",
   "features": [
    {
     "icon": "product/details/278-f1.png",
     "text": "Überwachung mit 2–12 Sensorkanälen"
    },
    {
     "icon": "product/details/278-f2.png",
     "text": "Schutzart IP65, wasserdicht und staubdicht"
    },
    {
     "icon": "product/details/278-f3.png",
     "text": "Konfigurierbare Sensorkanäle und Stromversorgungsoptionen"
    },
    {
     "icon": "product/details/278-f4.png",
     "text": "Unterstützt NFC-Aktivierung und lokale Gerätekonfiguration."
    },
    {
     "icon": "product/details/278-f5.png",
     "text": "Unterstützt remote OTA-Firmware-Updates."
    },
    {
     "icon": "product/details/278-f6.png",
     "text": "Funkoptionen: 4G LTE, NB-IoT und LoRa."
    },
    {
     "icon": "product/details/278-f7.png",
     "text": "Remote-Datenzugriff: Überwachen Sie von überall"
    },
    {
     "icon": "product/details/278-f8.png",
     "text": "Konfigurierbare Schwellenwert-Alarme"
    }
   ],
   "specsTitle": "Technische Spezifikationen",
   "specsDesc": "Überwacht meteorologische Parameter wie Temperatur, Feuchtigkeit, Windgeschwindigkeit und -richtung, Luftdruck, Niederschlag, PM2.5/PM10, CO₂, SO₂ und Sonneneinstrahlung (Kanäle je nach Konfiguration) und unterstützt die Analyse von Umwelttrends für Umweltschutz- und Stadtplanungsanwendungen.",
   "specs": [
    [
     "Produktmodelle",
     "H600"
    ],
    [
     "Messbereich",
     "Konfigurierbar"
    ],
    [
     "Genauigkeit",
     "Konfigurierbar"
    ],
    [
     "Protokoll",
     "MQTT"
    ],
    [
     "Geltungsbereich",
     "Städtische · Ländliche · Ebenen · Berggebiete"
    ],
    [
     "Frequenzbänder",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Stromversorgung",
     "Solarstrom · Netzstrom"
    ],
    [
     "Montage",
     "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Produktmodelle",
     "value": "H600"
    },
    {
     "name": "Messbereich",
     "value": "Konfigurierbar"
    },
    {
     "name": "Genauigkeit",
     "value": "Konfigurierbar"
    },
    {
     "name": "Protokoll",
     "value": "MQTT"
    },
    {
     "name": "Geltungsbereich",
     "value": "Städtische · Ländliche · Ebenen · Berggebiete"
    },
    {
     "name": "Frequenzbänder",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Stromversorgung",
     "value": "Solarstrom · Netzstrom"
    },
    {
     "name": "Montage",
     "value": "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Anwendungsszenarien",
   "scenarios": [
    {
     "img": "product/details/278-scen1.jpg",
     "label": "Intelligente Landwirtschaft"
    },
    {
     "img": "product/details/278-scen2.jpg",
     "label": "Umwelt"
    },
    {
     "img": "product/details/278-scen3.jpg",
     "label": "Meer und Küste"
    },
    {
     "img": "product/details/278-scen4.jpg",
     "label": "Intelligenter Campus"
    },
    {
     "img": "product/details/278-scen5.jpg",
     "label": "Stadtverwaltung"
    },
    {
     "img": "product/details/278-scen6.jpg",
     "label": "Notfallmanagement"
    },
    {
     "img": "product/details/278-scen7.jpg",
     "label": "Transport und Versand"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285",
    "276"
   ],
   "summary": "Die Hitelecom-Wetterstation H600 ist ein modulares, solarbetriebenes agrometeorologisches Terminal, das mit 2–12 Sensorkanälen für Lufttemperatur, Feuchtigkeit, Niederschlag, Wind, Luftdruck und Sonneneinstrahlung konfiguriert wird. Es überträgt in Echtzeit über 4G an Hitelecom Cloud für Bauernhöfe, Campus, Städte und Küstenstandorte.",
   "sku": "H600",
   "applications": [
    {
     "name": "Intelligente Landwirtschaft",
     "desc": "Das Feldwetter steuert Bewässerung, Spritzfenster und Krankheitswarnmodelle.",
     "img": "product/details/278-scen1.jpg"
    },
    {
     "name": "Umweltüberwachung",
     "desc": "Langfristige Klimareihen für Wassereinzugs- und Ökologieprogramme.",
     "img": "product/details/278-scen2.jpg"
    },
    {
     "name": "Intelligente Campus und Schulen",
     "desc": "Campuswetter für Lehre, Sicherheit und Anlagenmanagement.",
     "img": "product/details/278-scen4.jpg"
    },
    {
     "name": "Stadtverwaltung",
     "desc": "Mikroklima-Überwachung für städtische Dienste und Wärmeinsel-Studien.",
     "img": "product/details/278-scen5.jpg"
    },
    {
     "name": "Küsten- und Meeresstandorte",
     "desc": "Wind- und Druckkanäle für die Sicherheit des Küstenbetriebs.",
     "img": "product/details/278-scen3.jpg"
    },
    {
     "name": "Transport und Versand",
     "desc": "Lokales Wetter an Häfen, Flughäfen und Autobahnabschnitten.",
     "img": "product/details/278-scen7.jpg"
    },
    {
     "name": "Notfallmanagement",
     "desc": "Bereitstellbare Stationen speisen Entscheidungssysteme bei Unwettern.",
     "img": "product/details/278-scen6.jpg"
    }
   ],
   "certifications": [
    "IP65"
   ],
   "faqs": [
    {
     "q": "Welche Wetterparameter misst das H600?",
     "a": "Die Station integriert 2 bis 12 Kanäle – typischerweise Lufttemperatur und -feuchtigkeit, Niederschlag, Windgeschwindigkeit und -richtung, Luftdruck sowie Sonneneinstrahlung. Der Kanalsatz wird pro Projekt konfiguriert."
    },
    {
     "q": "Wie wird die Station gespeist und verbunden?",
     "a": "Solarstrom oder Netzstrom, mit Echtzeit-4G-Uplink via MQTT an Hitelecom Cloud für das Ablesen und die Analyse aus der Ferne."
    },
    {
     "q": "Kann sie in entlegenen Gebieten ohne Infrastruktur arbeiten?",
     "a": "Ja. Solarstrom und Mobilfunk-Backhaul können den Bedarf an Strom- und Datenverkabelung reduzieren; die Station kann mit Montagelaschen, einer Mastschelle oder einer Schlitzmontage installiert werden."
    },
    {
     "q": "Worin unterscheidet es sich von der Hydrologie-Station H700?",
     "a": "Das H600 ist für meteorologische Kanäle (Wind, Regen, Strahlung) konfiguriert, während das H700 für hydrologische Kanäle (Wasserstand, durchflussbezogen) konfiguriert ist. Beide teilen dieselbe modulare Plattform."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "286": {
   "series": "H-Serie · Temperatur- und Drucksensor für Gefahrenbereiche",
   "tagline": "Zuverlässigkeit | Industriell | Niedriger Stromverbrauch",
   "desc": "Der 2-in-1-Sensor von Hitelecom kombiniert die Temperatur- und Drucküberwachung in einem einzigen Gerät, das für Atmosphären ausgelegt ist, in denen entflammbares Gas oder Staub vorhanden sein kann, was die Geräteanzahl und die Installationskomplexität in Gefahrenbereichen reduzieren kann.",
   "heroImg": "product/details/286-hero.png",
   "pdf": "/downloads/explosion-proof-temperature-pressure-sensor-datasheet.pdf",
   "crumbCat": "Hardware",
   "returnCid": "279",
   "features": [
    {
     "icon": "product/details/286-f1.png",
     "text": "Genauigkeit: ±0,5 °C (konfigurierbar bis ±0,1 °C)"
    },
    {
     "icon": "product/details/286-f2.png",
     "text": "Gehäuse der Schutzart IP68"
    },
    {
     "icon": "product/details/286-f3.png",
     "text": "±0,5 % FS (Hochpräzisions-Konfiguration)"
    },
    {
     "icon": "product/details/286-f4.png",
     "text": "Unterstützt NFC-Aktivierung und lokale Gerätekonfiguration."
    },
    {
     "icon": "product/details/286-f5.png",
     "text": "Unterstützt remote OTA-Firmware-Updates."
    },
    {
     "icon": "product/details/286-f6.png",
     "text": "Funkoptionen: 4G LTE, NB-IoT und LoRa."
    },
    {
     "icon": "product/details/286-f7.png",
     "text": "Fernüberwachung"
    },
    {
     "icon": "product/details/286-f8.png",
     "text": "Konfigurierbare Schwellenwert-Alarme"
    }
   ],
   "specsTitle": "Technische Spezifikationen",
   "specsDesc": "Integrierte Kommunikations- und Sensortechnologien mit eingebetteten Energiesparalgorithmen verleihen dem Messumformer eine verlängerte Lebensdauer und hohe Messstabilität und unterstützen die Zuverlässigkeit des gesamten Überwachungssystems.",
   "specs": [
    [
     "Produktmodelle",
     "H200/H300/H500"
    ],
    [
     "Messbereich",
     "0–1; 1,6; 3,5; 7; 10 oder 20 MPa"
    ],
    [
     "Druckgenauigkeit",
     "±0.5% FS"
    ],
    [
     "Gemessene Temperatur",
     "−200 °C bis +800 °C"
    ],
    [
     "Temperaturgenauigkeit",
     "±0,5 °C (konfigurierbar bis ±0,1 °C)"
    ],
    [
     "Protokoll",
     "MQTT"
    ],
    [
     "Frequenzbänder",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Montage",
     "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    ],
    [
     "Zertifizierung für Gefahrenbereiche",
     "Zertifikat und Kennzeichnung werden je nach Zielmarkt und Zone bestätigt – vor der Bestellung anfordern"
    ],
    [
     "Betriebstemperatur",
     "−40 °C bis +125 °C"
    ],
    [
     "Lagertemperatur",
     "−40 °C bis +125 °C"
    ]
   ],
   "specsStructured": [
    {
     "name": "Produktmodelle",
     "value": "H200/H300/H500"
    },
    {
     "name": "Messbereich",
     "value": "0–1; 1,6; 3,5; 7; 10 oder 20 MPa"
    },
    {
     "name": "Druckgenauigkeit",
     "value": "±0.5% FS",
     "unitText": "Prozent"
    },
    {
     "name": "Gemessene Temperatur",
     "value": "−200 °C bis +800 °C",
     "unitText": "Grad Celsius",
     "minValue": -200.0,
     "maxValue": 800.0
    },
    {
     "name": "Temperaturgenauigkeit",
     "value": "±0,5 °C (konfigurierbar bis ±0,1 °C)",
     "unitText": "Grad Celsius"
    },
    {
     "name": "Protokoll",
     "value": "MQTT"
    },
    {
     "name": "Frequenzbänder",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Montage",
     "value": "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    },
    {
     "name": "Zertifizierung für Gefahrenbereiche",
     "value": "Zertifikat und Kennzeichnung werden je nach Zielmarkt und Zone bestätigt – vor der Bestellung anfordern"
    },
    {
     "name": "Betriebstemperatur",
     "value": "−40 °C bis +125 °C",
     "unitText": "Grad",
     "minValue": -40.0,
     "maxValue": 125.0
    },
    {
     "name": "Lagertemperatur",
     "value": "−40 °C bis +125 °C",
     "unitText": "Grad",
     "minValue": -40.0,
     "maxValue": 125.0
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Anwendungsszenarien",
   "scenarios": [
    {
     "img": "product/details/286-scen1.jpg",
     "label": "Petrochemie"
    },
    {
     "img": "product/details/286-scen2.jpg",
     "label": "Bergbau"
    },
    {
     "img": "product/details/286-scen3.jpg",
     "label": "Chemieanlage"
    }
   ],
   "related": [
    "287"
   ],
   "summary": "Der 2-in-1-Messumformer der H-Serie von Hitelecom kombiniert die Temperatur- und Drucküberwachung in einem Gerät, das für Umgebungen ausgelegt ist, in denen entflammbares Gas oder Staub vorhanden sein kann. Die verfügbaren Druckmessbereiche sind 1, 1,6, 3,5, 7, 10 und 20 MPa bei ±0,5 % FS, die Temperatur reicht von −200 °C bis 800 °C, und die Daten werden über 4G oder NB-IoT übertragen. Das geltende Explosionsschutzzertifikat muss für den Zielmarkt und die Zone vor der Bestellung bestätigt werden.",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Petrochemische Anlagen",
     "desc": "Ein Gerät überwacht sowohl die Prozesstemperatur als auch den Prozessdruck in Gefahrenbereichen.",
     "img": "product/details/286-scen3.jpg"
    },
    {
     "name": "Öl- und Gasförderung",
     "desc": "Bohrlochkopf- und Sammelleitungsüberwachung ohne Verkabelung in explosionsfähigen Atmosphären.",
     "img": "product/details/286-scen1.jpg"
    },
    {
     "name": "Bergbaubetriebe",
     "desc": "Temperatur- und Drucktrending in gasgefährdeten Untergrundbereichen.",
     "img": "product/details/286-scen2.jpg"
    },
    {
     "name": "Chemikalienlagerparks",
     "desc": "Zweiparameter-Überwachung von Lager- und Transferanlagen.",
     "img": "product/details/283-scen5.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "Warum ein 2-in-1-Temperatur- und Druckmessumformer?",
     "a": "Ein Gerät kombiniert zwei Messungen in einem einzigen Instrument, was Installationspunkte, Verkabelung und Wartung in Gefahrenbereichen reduzieren kann, während beide Variablen im selben Übertragungszeitplan bleiben."
    },
    {
     "q": "Wie groß sind die Messbereiche?",
     "a": "Druck: 0–1 MPa, 1,6, 3,5, 7, 10 oder 20 MPa bei ±0,5 % FS. Temperatur: −200 °C bis 800 °C bei ±0,5 °C, konfigurierbar bis ±0,1 °C."
    },
    {
     "q": "Ist er für explosionsfähige Atmosphären zertifiziert?",
     "a": "Das Gerät ist für Atmosphären ausgelegt, in denen entflammbares Gas oder Staub vorhanden sein kann. Die Eignung hängt von der zertifizierten Konfiguration für den Zielmarkt, die Zone, die Gas- oder Staubgruppe und die Temperaturklasse ab – fordern Sie das geltende Zertifikat bei Hitelecom an, bevor Sie das Produkt spezifizieren."
    },
    {
     "q": "Wie überträgt sie die Daten?",
     "a": "Über 4G oder NB-IoT mit MQTT-Uplink an Hitelecom Cloud oder eine private Bereitstellung, mit Schwellenwert-Alarmen auf beiden Kanälen."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "287": {
   "series": "H-Serie · Kopplungsisolator",
   "tagline": "Zuverlässigkeit | Sicherheit | Design für Gefahrenbereiche",
   "desc": "Bei der Öl- und Gasförderung, in Chemieanlagen und im Bergbau können entflammbare Gase, Dämpfe oder Stäube vorhanden sein, und Funkgeräte in solchen Bereichen erfordern ein spezielles Design. Der H100 ist ein Hochfrequenz-Signalkoppler für diese industriellen Installationen. Die Eignung für einen Gefahrenbereich hängt von der zertifizierten Konfiguration für den Zielmarkt, die Zone, die Gas- oder Staubgruppe und die Temperaturklasse ab – fordern Sie das geltende Zertifikat an, bevor Sie das Produkt spezifizieren.",
   "heroImg": "product/details/287-hero.png",
   "pdf": "/downloads/coupling-isolator-h100-datasheet.pdf",
   "crumbCat": "Hardware",
   "returnCid": "279",
   "features": [
    {
     "icon": "product/details/287-f1.png",
     "text": "Hochfrequente Signalkopplung mit geringer Dämpfung"
    },
    {
     "icon": "product/details/287-f2.png",
     "text": "Gehäuse der Schutzart IP68"
    },
    {
     "icon": "product/details/287-f3.png",
     "text": "Unterstützt Hochfrequenzverbindungen von 2,4 GHz / 5,8 GHz"
    },
    {
     "icon": "product/details/287-f4.png",
     "text": "Für die Signalkopplung in Gefahrenbereichen ausgelegt"
    },
    {
     "icon": "product/details/287-f5.png",
     "text": "Technologie mit niedrigem Energieverbrauch zur Senkung des Energieverbrauchs"
    },
    {
     "icon": "product/details/287-f6.png",
     "text": "Hohe Immunität gegen elektromagnetische Störungen"
    }
   ],
   "specsTitle": "Technische Spezifikationen",
   "specsDesc": "Der H100 ist ein drahtloses Signalkopplungsgerät für Installationen in Gefahrenbereichen, das die Frequenzen 2,4 GHz und 5,8 GHz unterstützt – mit einem Design mit niedrigem Stromverbrauch und hoher Störfestigkeit, geeignet für raue Industrieumgebungen. Das geltende Zertifikat muss für den Zielmarkt und die Zone vor der Bestellung bestätigt werden.",
   "specs": [
    [
     "Produktmodelle",
     "H100"
    ],
    [
     "Signalbänder",
     "2.4 GHz / 5.8 GHz"
    ],
    [
     "Einsatz in Gefahrenbereichen",
     "Kopplungsdesign für Gefahrenbereiche; das geltende Zertifikat muss für den Zielmarkt und die Zone vor der Bestellung bestätigt werden"
    ],
    [
     "Betriebstemperatur",
     "−40 °C bis +125 °C"
    ],
    [
     "Lagertemperatur",
     "−40 °C bis +125 °C"
    ],
    [
     "Montage",
     "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Produktmodelle",
     "value": "H100"
    },
    {
     "name": "Signalbänder",
     "value": "2.4 GHz / 5.8 GHz"
    },
    {
     "name": "Einsatz in Gefahrenbereichen",
     "value": "Kopplungsdesign für Gefahrenbereiche; das geltende Zertifikat muss für den Zielmarkt und die Zone vor der Bestellung bestätigt werden"
    },
    {
     "name": "Betriebstemperatur",
     "value": "−40 °C bis +125 °C",
     "unitText": "Grad",
     "minValue": -40.0,
     "maxValue": 125.0
    },
    {
     "name": "Lagertemperatur",
     "value": "−40 °C bis +125 °C",
     "unitText": "Grad",
     "minValue": -40.0,
     "maxValue": 125.0
    },
    {
     "name": "Montage",
     "value": "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Anwendungsszenarien",
   "scenarios": [
    {
     "img": "product/details/287-scen1.jpg",
     "label": "Petrochemie"
    },
    {
     "img": "product/details/287-scen2.jpg",
     "label": "Bergbau"
    },
    {
     "img": "product/details/287-scen3.jpg",
     "label": "Chemie"
    }
   ],
   "related": [
    "286"
   ],
   "summary": "Der Hitelecom-Kopplungsisolator H100 ist ein Hochfrequenz-Signalkoppler, der drahtlose Sensorsignale von 2,4 GHz / 5,8 GHz über die Grenzen von Gefahrenbereichen an Öl- und Gas-, Chemie- und Bergbaustandorten überträgt. Die Eignung für einen Gefahrenbereich hängt von der zertifizierten Konfiguration für den Zielmarkt, die Zone, die Gas- oder Staubgruppe und die Temperaturklasse ab – fordern Sie das geltende Zertifikat an, bevor Sie das Produkt spezifizieren. Es arbeitet von −40 °C bis +125 °C und wird mit Montagelaschen, einer Schelle für Masten oder einer Schlitzmontage installiert.",
   "sku": "H100",
   "applications": [
    {
     "name": "Öl- und Gasförderung",
     "desc": "Koppelt Funksensorsignale aus den Gefahrenzonen von Bohrlochköpfen aus.",
     "img": "product/details/287-scen1.jpg"
    },
    {
     "name": "Chemieanlagen",
     "desc": "Überbrückt Funkverbindungen zwischen Gefahren- und sicheren Bereichen ohne Durchdringung von Barrieren.",
     "img": "product/details/287-scen3.jpg"
    },
    {
     "name": "Bergbau",
     "desc": "Signalkopplungspfad für unterirdische Funksensornetze in Gefahrenbereichen.",
     "img": "product/details/287-scen2.jpg"
    },
    {
     "name": "Tanklager und Terminals",
     "desc": "Sichere Signalkopplung zwischen Zonen und über Deiche hinweg, vorbehaltlich der zertifizierten Konfiguration.",
     "img": "product/details/283-scen5.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "Welches Problem löst der Kopplungsisolator?",
     "a": "Drahtlose Standardverbindungen sollten die Grenzen von Gefahrenbereichen nicht ohne zertifizierte Isolierung überschreiten. Der H100 koppelt Sensorsignale von 2,4 GHz / 5,8 GHz über die Grenze hinweg, sodass batteriebetriebene Funksensoren Gefahrenbereiche ohne zusätzliche Leitungsdurchführungen abdecken können – vorbehaltlich der zertifizierten Konfiguration für den Zielmarkt und die Zone."
    },
    {
     "q": "Welchen Normen entspricht er?",
     "a": "Das hängt von der zertifizierten Konfiguration für Ihren Zielmarkt, die Zone, die Gas- oder Staubgruppe und die Temperaturklasse ab. Teilen Sie Ihre Anforderungen mit, und Hitelecom liefert die Details des geltenden Zertifikats vor der Lieferung."
    },
    {
     "q": "Welche Umgebungen kann es bewältigen?",
     "a": "Betriebs- und Lagertemperatur reichen beide von −40 °C bis +125 °C, mit einem IP68-Gehäuse für Außen- und Untergrundstandorte."
    },
    {
     "q": "Wie wird er montiert?",
     "a": "Montagelaschen, eine Mastschelle oder eine Schlitzmontage – dieselbe Zubehörfamilie wie bei anderen Feldgeräten der H-Serie."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "301": {
   "series": "H-Serie · Temperatur- und Feuchtigkeitssensor",
   "tagline": "Präzision | Umgebungsüberwachung | Extrem niedriger Stromverbrauch",
   "desc": "Die Temperatur- und Feuchtigkeitssensoren von Hitelecom bieten hochpräzise Umgebungsüberwachung mit Remote-Alarmierung und liefern Reinräumen, Schränken, Museen und Produktionslinien rund um die Uhr kontinuierliche Umgebungsaufzeichnungen und Schwellenwert-Alarme",
   "heroImg": "product/details/301-hero.png",
   "pdf": "/downloads/h300-temperature-humidity-sensor-datasheet.pdf",
   "crumbCat": "Temperatur",
   "returnCid": "263",
   "features": [
    {
     "icon": "product/details/270-f1.png",
     "text": "Genauigkeit: ±0,2 °C / ±2 % RH (typisch)"
    },
    {
     "icon": "product/details/270-f2-ip65.png",
     "text": "Gehäuse der Schutzart IP65"
    },
    {
     "icon": "product/details/270-f3.png",
     "text": "Messbereich: 0–100 % RH, −20 °C bis +80 °C"
    },
    {
     "icon": "product/details/270-f4.png",
     "text": "Unterstützt NFC-Aktivierung und lokale Gerätekonfiguration."
    },
    {
     "icon": "product/details/270-f5.png",
     "text": "Design mit niedrigem Stromverbrauch für den Langzeitbetrieb"
    },
    {
     "icon": "product/details/270-f6.png",
     "text": "Funkoptionen: 4G LTE, NB-IoT und LoRa."
    },
    {
     "icon": "product/details/270-f7.png",
     "text": "Fernüberwachung der Umgebungsbedingungen"
    },
    {
     "icon": "product/details/270-f8.png",
     "text": "Konfigurierbare Schwellenwert-Alarme"
    }
   ],
   "specsTitle": "Technische Spezifikationen",
   "specsDesc": "Mikroleistungsprozessoren und algorithmische Optimierung verleihen dem Sensor eine Auslegungslebensdauer von bis zu 10 Jahren bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen, wodurch die Routinewartung reduziert wird.",
   "specs": [
    [
     "Produktmodelle",
     "H200/H300/H500"
    ],
    [
     "Messbereich",
     "Feuchtigkeit 0–100 % RH, Temperatur −20 °C bis +80 °C"
    ],
    [
     "Genauigkeit",
     "±0,2 °C / ±2 % RH (typisch)"
    ],
    [
     "Protokoll",
     "MQTT"
    ],
    [
     "Sonde",
     "Geschlitzte Sintersonde, kabelmontiert"
    ],
    [
     "Frequenzbänder",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Batterielebensdauer",
     "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall."
    ],
    [
     "Montage",
     "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Produktmodelle",
     "value": "H200/H300/H500"
    },
    {
     "name": "Messbereich",
     "value": "Feuchtigkeit 0–100 % RH, Temperatur −20 °C bis +80 °C"
    },
    {
     "name": "Genauigkeit",
     "value": "±0,2 °C / ±2 % RH (typisch)"
    },
    {
     "name": "Protokoll",
     "value": "MQTT"
    },
    {
     "name": "Sonde",
     "value": "Geschlitzte Sintersonde, kabelmontiert"
    },
    {
     "name": "Frequenzbänder",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Batterielebensdauer",
     "value": "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall.",
     "unitText": "Jahr",
     "minValue": 10.0
    },
    {
     "name": "Montage",
     "value": "Montagelaschen, Mastschelle oder Schlitzmontage (je nach Konfiguration)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Anwendungsszenarien",
   "scenarios": [
    {
     "img": "product/details/270-scen3.jpg",
     "label": "Rechenzentrum"
    },
    {
     "img": "product/details/270-scen4.jpg",
     "label": "Pharma- und Gesundheitslagerung"
    },
    {
     "img": "product/details/270-scen5.jpg",
     "label": "Lebensmittelverarbeitung"
    },
    {
     "img": "product/details/270-scen2.jpg",
     "label": "Intelligente Landwirtschaft"
    },
    {
     "img": "product/details/285-scen1.jpg",
     "label": "Büroumgebung"
    },
    {
     "img": "product/details/285-scen7.jpg",
     "label": "Intelligente Fertigung"
    },
    {
     "img": "product/details/285-scen3.jpg",
     "label": "Krankenhaus"
    }
   ],
   "related": [
    "302",
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285"
   ],
   "summary": "Der Temperatur- und Feuchtigkeitssensor der H-Serie von Hitelecom ist ein drahtloser Umgebungsmonitor für Reinräume, Schaltschränke, Museen und Produktionslinien. Seine geschlitzte Sintersonde misst 0–100 % RH und −20 °C bis +80 °C, bei typischen Genauigkeiten von ±2 % RH und ±0,2 °C, mit einer Batterie, die für mehr als 10 Jahre Lebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen ausgelegt ist, und 4G/NB-IoT-Cloud-Übertragung.",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Rechenzentren und Serverräume",
     "desc": "Verfolgt Temperatur und Feuchtigkeit auf Rack-Ebene, um IT-Geräte innerhalb der ASHRAE-Grenzen zu halten.",
     "img": "product/details/270-scen3.jpg"
    },
    {
     "name": "Medizinische und pharmazeutische Lagerung",
     "desc": "Überwacht Apotheken, Kühlhäuser und Stationen, wo Feuchtigkeit die Arzneimittelstabilität beeinflusst.",
     "img": "product/details/270-scen4.jpg"
    },
    {
     "name": "Museen und Archive",
     "desc": "Liefert kontinuierliche Klimaaufzeichnungen zur Unterstützung von Konservierungsentscheidungen für Papier, Textilien und Relikte."
    },
    {
     "name": "Lebensmittelverarbeitung und -lagerung",
     "desc": "Verfolgt die Feuchtigkeit in Produktionshallen und Lagerhäusern und alarmiert das Personal vor Bedingungen, die zu Schimmel und Kondensation führen können.",
     "img": "product/details/270-scen5.jpg"
    },
    {
     "name": "Schaltschränke und -gehäuse",
     "desc": "Die kabelmontierte Sonde reicht in Schränke hinein, um vor Kondensation zu warnen, bevor Korrosion beginnt.",
     "img": "product/details/285-scen7.jpg"
    },
    {
     "name": "Gewächshäuser",
     "desc": "Kombiniert Temperatur- und Feuchtigkeitstrends für Lüftungs- und Bewässerungsentscheidungen.",
     "img": "product/details/270-scen2.jpg"
    },
    {
     "name": "Büros und Krankenhäuser",
     "desc": "Hält Komfort und Hygiene der Raumluft in öffentlichen Gebäuden innerhalb der Zielbereiche.",
     "img": "product/details/285-scen1.jpg"
    }
   ],
   "certifications": [
    "IP65"
   ],
   "faqs": [
    {
     "q": "Wie groß sind Messbereich und Genauigkeit?",
     "a": "Er misst 0–100 % RH und −20 °C bis +80 °C, bei typischen Genauigkeiten von ±2 % RH und ±0,2 °C. Die geschlitzte Sintersonde ist kabelmontiert und kann daher in Schränken und Kanälen platziert werden."
    },
    {
     "q": "Unterstützt er Schwellenwert-Alarme?",
     "a": "Ja. Hohe und niedrige Schwellenwerte für Temperatur und Feuchtigkeit werden remote konfiguriert, und der Sensor pusht Alarme über die Cloud-Plattform, wenn die Grenzwerte überschritten werden."
    },
    {
     "q": "Wie lange hält die Batterie?",
     "a": "Die gewählte Batteriekonfiguration ist für mehr als 10 Jahre bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen ausgelegt; die tatsächliche Lebensdauer variiert je nach Netzabdeckung, Temperatur und Übertragungshäufigkeit. Am Installationspunkt ist keine Netzverkabelung erforderlich."
    },
    {
     "q": "Welche Funknetze werden unterstützt?",
     "a": "4G und NB-IoT mit MQTT-Uplink an Hitelecom Cloud, eine Kundencloud oder eine private Bereitstellung. LoRa ist für Standorte mit mehreren Sensoren über ein privates Gateway verfügbar."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "302": {
   "series": "H-Serie · Datenlogger für Temperatur und Feuchtigkeit",
   "tagline": "NFC-Einrichtung | USB-Export | Aufzeichnung mit hoher Kapazität",
   "desc": "Die Datenlogger für Temperatur und Feuchtigkeit von Hitelecom speichern bis zu 80 000 Messwerte, mit NFC-Konfiguration und USB-Ein-Klick-Export, und erstellen Aufzeichnungen mit Zeitstempel, die Audits in der Kühlketten-, Pharma- und Lebensmittellogistik unterstützen.",
   "heroImg": "product/details/302-hero.png",
   "pdf": "/downloads/temperature-humidity-data-logger-datasheet.pdf",
   "crumbCat": "Temperatur",
   "returnCid": "263",
   "features": [
    {
     "icon": "product/details/270-f1.png",
     "text": "Genauigkeit: ±0,2 °C / ±2 % RH (typisch)"
    },
    {
     "icon": "product/details/270-f2-ip65.png",
     "text": "Gehäuse der Schutzart IP65"
    },
    {
     "icon": "product/details/270-f3.png",
     "text": "Interner Speicher für 80 000 Messwerte"
    },
    {
     "icon": "product/details/270-f4.png",
     "text": "NFC-Tippen zum Konfigurieren, USB-Ein-Klick-Export"
    },
    {
     "icon": "product/details/270-f5.png",
     "text": "Design mit niedrigem Stromverbrauch für den Langzeitbetrieb"
    },
    {
     "icon": "product/details/270-f6.png",
     "text": "Autarke Aufzeichnung über NFC und USB; kein Gateway erforderlich"
    },
    {
     "icon": "product/details/270-f7.png",
     "text": "Aufzeichnung mit Zeitstempel für jeden Messwert"
    },
    {
     "icon": "product/details/270-f9.png",
     "text": "Kostenlose PC-Software: Kurvenanalyse und PDF/CSV-Export"
    }
   ],
   "specsTitle": "Technische Spezifikationen",
   "specsDesc": "Ein Mikroleistungsdesign mit NFC-Konfiguration und USB-Ein-Klick-Export; die austauschbare Batterie unterstützt mehrjährige Aufzeichnung zwischen Batteriewechseln.",
   "specs": [
    [
     "Produktmodelle",
     "H200L/H300L"
    ],
    [
     "Speicherkapazität",
     "80 000 Messwerte"
    ],
    [
     "Genauigkeit",
     "±0,2 °C / ±2 % RH (typisch)"
    ],
    [
     "Konfiguration",
     "NFC (Android-/iOS-App)"
    ],
    [
     "Datenexport",
     "USB, PDF/CSV-Bericht"
    ],
    [
     "Batterielebensdauer",
     "Mehrjährig (austauschbare Batterie)"
    ],
    [
     "Schutz",
     "IP65"
    ],
    [
     "Montage",
     "Tischgerät · Hängend · Klebend"
    ]
   ],
   "specsStructured": [
    {
     "name": "Produktmodelle",
     "value": "H200L/H300L"
    },
    {
     "name": "Speicherkapazität",
     "value": "80 000 Messwerte"
    },
    {
     "name": "Genauigkeit",
     "value": "±0,2 °C / ±2 % RH (typisch)"
    },
    {
     "name": "Konfiguration",
     "value": "NFC (Android-/iOS-App)"
    },
    {
     "name": "Datenexport",
     "value": "USB, PDF/CSV-Bericht"
    },
    {
     "name": "Batterielebensdauer",
     "value": "Mehrjährig (austauschbare Batterie)"
    },
    {
     "name": "Schutz",
     "value": "IP65"
    },
    {
     "name": "Montage",
     "value": "Tischgerät · Hängend · Klebend"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Anwendungsszenarien",
   "scenarios": [
    {
     "img": "product/details/285-scen4.jpg",
     "label": "Kühlkettentransport"
    },
    {
     "img": "product/details/270-scen5.jpg",
     "label": "Lebensmittelverarbeitung"
    },
    {
     "img": "product/details/270-scen4.jpg",
     "label": "Pharma- und Gesundheitslagerung"
    },
    {
     "img": "product/details/285-scen3.jpg",
     "label": "Krankenhaus"
    },
    {
     "img": "product/details/285-scen7.jpg",
     "label": "Intelligente Fertigung"
    },
    {
     "img": "product/details/285-scen6.jpg",
     "label": "Rechenzentrum"
    }
   ],
   "related": [
    "301",
    "270",
    "285",
    "274",
    "280",
    "281",
    "282",
    "283"
   ],
   "summary": "Der Datenlogger für Temperatur und Feuchtigkeit der H-Serie von Hitelecom speichert bis zu 80 000 Messwerte bei einer typischen Genauigkeit von ±0,2 °C und ±2 % RH. Die NFC-Konfiguration mit einem kompatiblen Android- oder iOS-Gerät, der USB-Ein-Klick-Export von PDF/CSV-Berichten, die kostenlose PC-Software für Diagramme und Datenanalyse und eine austauschbare Mehrjahresbatterie liefern Aufzeichnungen, die Audits für Kühlketten-, Pharma- und Lebensmittellogistik unterstützen.",
   "sku": "H200L/H300L",
   "applications": [
    {
     "name": "Kühlkettentransport",
     "desc": "Temperaturaufzeichnungen auf Transportebene für Kühl-Lkw, Reefer-Container und Last-Mile-Boxen.",
     "img": "product/details/285-scen4.jpg"
    },
    {
     "name": "Pharmazeutische Distribution",
     "desc": "Auditfähige PDF/CSV-Nachweise für Impfstoff-, Insulin- und Biologika-Sendungen.",
     "img": "product/details/270-scen4.jpg"
    },
    {
     "name": "Lebensmittelverarbeitung und -lagerung",
     "desc": "HACCP-freundliche Aufzeichnung in Produktionshallen, Kühlhäusern und Verkaufsvitrinen.",
     "img": "product/details/270-scen5.jpg"
    },
    {
     "name": "Krankenhäuser und Labore",
     "desc": "Aufzeichnung von Kühlschrank, Gefrierschrank und Inkubator für Konformitätsprüfungen.",
     "img": "product/details/285-scen3.jpg"
    },
    {
     "name": "Lagerhaltung",
     "desc": "Langfristige Umgebungsaufzeichnung in Zoll- und allgemeinen Lagerhäusern.",
     "img": "product/details/276-scen3.jpg"
    },
    {
     "name": "Rechenzentren und Archive",
     "desc": "Aufzeichnung in Räumen, in denen kein Funk-Uplink erforderlich ist.",
     "img": "product/details/285-scen6.jpg"
    }
   ],
   "certifications": [
    "IP65"
   ],
   "faqs": [
    {
     "q": "Wie konfiguriere ich den Logger und lese die Daten aus?",
     "a": "Tippen Sie den Logger mit einem NFC-fähigen Telefon an, um ihn zu starten, zu stoppen und zu konfigurieren – bestätigen Sie die iOS-NFC-Unterstützung für Ihr Telefonmodell mit Hitelecom. Stecken Sie ihn nach dem Transport an USB, um PDF/CSV-Berichte zu exportieren, oder öffnen Sie die Dateien in der kostenlosen PC-Software zur Kurvenanalyse."
    },
    {
     "q": "Wie viele Messwerte kann er speichern?",
     "a": "Bis zu 80 000 Messwerte. Bei einem Fünf-Minuten-Intervall deckt das etwa neun Monate kontinuierlicher Aufzeichnung ab."
    },
    {
     "q": "Ist die Batterie austauschbar?",
     "a": "Ja. Der Logger nutzt eine austauschbare Batterie mit mehrjähriger Lebensdauer, sodass derselbe Logger über mehrere Jahre für mehrere Transporte wiederverwendet werden kann."
    },
    {
     "q": "Lädt er Daten drahtlos hoch?",
     "a": "Nein – dies ist ein autarker Datenlogger: Die Daten bleiben auf dem Logger, bis Sie sie über USB exportieren oder per NFC auslesen, was für grenzüberschreitende Sendungen und auditierte Lieferungen geeignet ist, bei denen kein Live-Uplink nötig ist."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "303": {
   "series": "H-Serie · TVOC-Sensor",
   "tagline": "VOC-Überwachung | Festmontage | Extrem niedriger Stromverbrauch",
   "desc": "Die TVOC-Sensoren von Hitelecom verfolgen flüchtige organische Gesamtverbindungen von 0 bis 100 000 ppb bei einer Auflösung von 1 ppb und unterstützen die Überwachung in Lackierereien, Chemikalienlagern und Laboren mit Remote-Alarmen",
   "heroImg": "product/details/303-hero.png",
   "pdf": "/downloads/tvoc-sensor-datasheet.pdf",
   "crumbCat": "Luftqualität",
   "returnCid": "265",
   "features": [
    {
     "icon": "product/details/270-f1.png",
     "text": "Auflösung: 1 ppb"
    },
    {
     "icon": "product/details/270-f2.png",
     "text": "Gehäuse der Schutzart IP68, konfigurierbar"
    },
    {
     "icon": "product/details/270-f3.png",
     "text": "Großer Messbereich: 0–100 000 ppb"
    },
    {
     "icon": "product/details/270-f4.png",
     "text": "Unterstützt NFC-Aktivierung und lokale Gerätekonfiguration."
    },
    {
     "icon": "product/details/270-f5.png",
     "text": "Design mit niedrigem Stromverbrauch für den Langzeitbetrieb"
    },
    {
     "icon": "product/details/270-f6.png",
     "text": "Funkoptionen: 4G LTE, NB-IoT und LoRa."
    },
    {
     "icon": "product/details/270-f7.png",
     "text": "Fernüberwachung der VOC"
    },
    {
     "icon": "product/details/270-f8.png",
     "text": "Konfigurierbare Schwellenwert-Alarme"
    }
   ],
   "specsTitle": "Technische Spezifikationen",
   "specsDesc": "Mikroleistungsprozessoren und algorithmische Optimierung verleihen dem Sensor eine Auslegungslebensdauer von bis zu 10 Jahren bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen, wodurch die Routinewartung reduziert wird.",
   "specs": [
    [
     "Produktmodelle",
     "H200/H300/H500"
    ],
    [
     "Messbereich",
     "0-100,000 ppb"
    ],
    [
     "Auflösung",
     "1 ppb"
    ],
    [
     "Protokoll",
     "MQTT"
    ],
    [
     "Messprinzip",
     "Elektrochemisch oder PID (je nach Konfiguration)"
    ],
    [
     "Frequenzbänder",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Batterielebensdauer",
     "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall."
    ],
    [
     "Montage",
     "Ohrenmontage · Kanalmontage"
    ]
   ],
   "specsStructured": [
    {
     "name": "Produktmodelle",
     "value": "H200/H300/H500"
    },
    {
     "name": "Messbereich",
     "value": "0-100,000 ppb",
     "unitText": "Teile pro Milliarde",
     "minValue": 0.0,
     "maxValue": 100000.0
    },
    {
     "name": "Auflösung",
     "value": "1 ppb",
     "unitText": "Teile pro Milliarde"
    },
    {
     "name": "Protokoll",
     "value": "MQTT"
    },
    {
     "name": "Messprinzip",
     "value": "Elektrochemisch oder PID (je nach Konfiguration)"
    },
    {
     "name": "Frequenzbänder",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Batterielebensdauer",
     "value": "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall.",
     "unitText": "Jahr",
     "minValue": 10.0
    },
    {
     "name": "Montage",
     "value": "Ohrenmontage · Kanalmontage"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Anwendungsszenarien",
   "scenarios": [
    {
     "img": "product/details/285-scen7.jpg",
     "label": "Intelligente Fertigung"
    },
    {
     "img": "product/details/283-scen5.jpg",
     "label": "Chemieanlage"
    },
    {
     "img": "product/details/285-scen1.jpg",
     "label": "Büroumgebung"
    },
    {
     "img": "product/details/285-scen3.jpg",
     "label": "Krankenhaus"
    },
    {
     "img": "product/details/285-scen5.jpg",
     "label": "Wohnumgebung"
    },
    {
     "img": "product/details/283-scen7.jpg",
     "label": "Intelligentes Gebäude"
    }
   ],
   "related": [
    "305",
    "285",
    "301",
    "302",
    "270",
    "274",
    "284",
    "283"
   ],
   "summary": "Der TVOC-Sensor der H-Serie von Hitelecom ist ein drahtloser Monitor für flüchtige organische Gesamtverbindungen von 0 bis 100 000 ppb bei einer Auflösung von 1 ppb. Die Sensortechnologie wird für die Zielverbindungen ausgewählt und muss bei der Bestellung bestätigt werden; mit Remote-Alarmen und einer Batterie, die für mehr als 10 Jahre bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen ausgelegt ist, unterstützt er die kontinuierliche Überwachung in Lackierereien, Chemikalienlagern und Laboren.",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Lackierereien und Beschichtungslinien",
     "desc": "Kontinuierliche TVOC-Verfolgung, wo Lösungsmittel beim Sprühen und Aushärten verdampfen.",
     "img": "product/details/283-scen6.jpg"
    },
    {
     "name": "Chemikalienlagerbereiche",
     "desc": "Frühwarnung vor Dampfansammlung um Fässer, Tanks und Schränke.",
     "img": "product/details/283-scen5.jpg"
    },
    {
     "name": "Labore",
     "desc": "TVOC-Überwachung von Abzügen und Räumen für die Forschersicherheit.",
     "img": "product/details/274-scen5.jpg"
    },
    {
     "name": "Druck- und Verpackungsanlagen",
     "desc": "Lösungsmitteldampf-Überwachung in der Nähe von Pressen und Laminiermaschinen.",
     "img": "product/details/285-scen7.jpg"
    },
    {
     "name": "Programme zur Raumluftqualität",
     "desc": "TVOC als Leitindikator für Gebäudegesundheitsaudits.",
     "img": "product/details/285-scen1.jpg"
    },
    {
     "name": "Abwasser- und Abfallanlagen",
     "desc": "Überwachung geruchsbezogener VOC-Trends an Aufbereitungsanlagen.",
     "img": "product/details/283-scen4.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "Welchen Messbereich und welche Auflösung bietet der TVOC-Sensor?",
     "a": "Messbereich 0–100 000 ppb bei einer Auflösung von 1 ppb. Das Messprinzip ist elektrochemisch oder PID, ausgewählt je nach Zielgasmischung."
    },
    {
     "q": "Kann er alarmieren, wenn der TVOC anormal ansteigt?",
     "a": "Ja. Die Schwellenwerte werden remote konfiguriert, und der Sensor pusht Alarme über die Cloud-Plattform, sodass Teams umgehend reagieren können, wenn ein konfigurierter Schwellenwert überschritten wird."
    },
    {
     "q": "Wie groß ist die Schutzart?",
     "a": "Das Standardgehäuse ist für anspruchsvolle Industriestandorte ausgelegt, und IP68 ist als Konfiguration für dauerhaft exponierte Außenpunkte verfügbar. Nennen Sie Hitelecom Ihre Installationsumgebung."
    },
    {
     "q": "Wie wird er gespeist und verbunden?",
     "a": "Er nutzt eine interne Batterie, die für mehr als 10 Jahre Lebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen ausgelegt ist, und lädt über 4G oder NB-IoT via MQTT zu Hitelecom Cloud oder privaten Plattformen hoch."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "304": {
   "series": "H-Serie · Asset-Tracking-Sensor",
   "tagline": "Ortung | Mehrjährige Batterie | Robust",
   "desc": "Die Asset-Tracking-Sensoren von Hitelecom kombinieren GPS- und BeiDou-Ortung mit mehrjähriger Batterielebensdauer und halten Paletten, Werkzeuge und Mehrwegbehälter über Standorte hinweg mit Geofence-Alarmen sichtbar",
   "heroImg": "product/details/304-hero.png",
   "pdf": "/downloads/asset-tracking-sensor-datasheet.pdf",
   "crumbCat": "Asset-Tracking",
   "returnCid": "306",
   "features": [
    {
     "icon": "product/details/270-f1.png",
     "text": "GPS + BeiDou Dual-Mode-Ortung"
    },
    {
     "icon": "product/details/270-f2-ip67.png",
     "text": "Schutzart IP67"
    },
    {
     "icon": "product/details/270-f3.png",
     "text": "LBS-Fallback, wo Mobilfunkabdeckung verfügbar ist"
    },
    {
     "icon": "product/details/270-f4.png",
     "text": "Unterstützt NFC-Aktivierung und lokale Gerätekonfiguration."
    },
    {
     "icon": "product/details/270-f5.png",
     "text": "Design mit niedrigem Stromverbrauch für den Langzeitbetrieb"
    },
    {
     "icon": "product/details/270-f6.png",
     "text": "Positionsübertragung über 4G oder NB-IoT"
    },
    {
     "icon": "product/details/270-f7.png",
     "text": "Cloud-Karte und Standortverlauf"
    },
    {
     "icon": "product/details/270-f8.png",
     "text": "Geofence- und Bewegungsalarme"
    }
   ],
   "specsTitle": "Technische Spezifikationen",
   "specsDesc": "Ein Mikroleistungsdesign und konfigurierbare Übertragungsintervalle unterstützen den mehrjährigen Batteriebetrieb; die tatsächliche Lebensdauer hängt vom Ortungsmodus, dem Übertragungsintervall und der Netzabdeckung ab.",
   "specs": [
    [
     "Produktmodell",
     "H200T"
    ],
    [
     "Ortung",
     "GPS / BeiDou / LBS"
    ],
    [
     "Kommunikation",
     "4G / NB-IoT"
    ],
    [
     "Protokoll",
     "MQTT"
    ],
    [
     "Batterielebensdauer",
     "Mehrjährig (je nach Übertragungsintervall)"
    ],
    [
     "Schutz",
     "IP67"
    ],
    [
     "Montage",
     "Magnet · Schraube · Band"
    ],
    [
     "Betriebstemperatur",
     "−20 °C bis +70 °C"
    ]
   ],
   "specsStructured": [
    {
     "name": "Produktmodell",
     "value": "H200T"
    },
    {
     "name": "Ortung",
     "value": "GPS / BeiDou / LBS"
    },
    {
     "name": "Kommunikation",
     "value": "4G / NB-IoT"
    },
    {
     "name": "Protokoll",
     "value": "MQTT"
    },
    {
     "name": "Batterielebensdauer",
     "value": "Mehrjährig (je nach Übertragungsintervall)"
    },
    {
     "name": "Schutz",
     "value": "IP67"
    },
    {
     "name": "Montage",
     "value": "Magnet · Schraube · Band"
    },
    {
     "name": "Betriebstemperatur",
     "value": "−20 °C bis +70 °C",
     "unitText": "Grad Celsius",
     "minValue": -20.0,
     "maxValue": 70.0
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Anwendungsszenarien",
   "scenarios": [
    {
     "img": "product/details/285-scen4.jpg",
     "label": "Intelligenter Transport"
    },
    {
     "img": "product/details/285-scen7.jpg",
     "label": "Intelligente Fertigung"
    },
    {
     "img": "product/details/285-scen2.jpg",
     "label": "Intelligente Stadt"
    },
    {
     "img": "product/details/283-scen8.jpg",
     "label": "Intelligente Energie"
    },
    {
     "img": "product/details/283-scen4.jpg",
     "label": "Wasserwerk"
    },
    {
     "img": "product/details/283-scen7.jpg",
     "label": "Intelligentes Gebäude"
    }
   ],
   "related": [
    "301",
    "302",
    "303",
    "305",
    "270",
    "274",
    "280",
    "285"
   ],
   "summary": "Der Asset-Tracking-Sensor der H-Serie von Hitelecom kombiniert GPS- und BeiDou-Ortung (LBS-Fallback bei schwachem Satellitensignal, vorbehaltlich der Netzverfügbarkeit) mit 4G- oder NB-IoT-Uplink. Der Tracker überträgt Standort- und Geofence-Ereignisse über 4G oder NB-IoT und kombiniert eine Mehrjahresbatterie, ein IP67-Gehäuse sowie Magnet-, Schrauben- oder Bandmontage, um Paletten, Werkzeuge und Mehrwegbehälter über Standorte hinweg sichtbar zu halten.",
   "sku": "H200T",
   "applications": [
    {
     "name": "Paletten- und Behälter-Pooling",
     "desc": "Mehrweg-Transportmittel bleiben über Lieferanten, Werke und Lagerhäuser hinweg sichtbar.",
     "img": "product/details/276-scen3.jpg"
    },
    {
     "name": "Verfolgung von Werkzeugen und Geräten",
     "desc": "Finden Sie gemeinsam genutzte Werkzeuge und tragbare Geräte über große Standorte hinweg.",
     "img": "product/details/285-scen7.jpg"
    },
    {
     "name": "Logistikflotten",
     "desc": "Positions- und Geofence-Alarme für Anhänger, Container und Rollwagen.",
     "img": "product/details/285-scen4.jpg"
    },
    {
     "name": "Baustellen",
     "desc": "Verfolgen Sie Generatoren, Kompressoren und Anbaugeräte über wechselnde Baustellen hinweg."
    },
    {
     "name": "Versorgungs- und kommunale Anlagen",
     "desc": "Überwacht mobile Pumpen, Ventile und Servicegeräte im Feld.",
     "img": "product/details/283-scen4.jpg"
    },
    {
     "name": "Mietgeräte",
     "desc": "Orten Sie Mietmaschinen und erkennen Sie unbefugte Bewegungen.",
     "img": "product/details/284-scen2.jpg"
    }
   ],
   "certifications": [
    "IP67"
   ],
   "faqs": [
    {
     "q": "Wie ortet der Tracker die Assets?",
     "a": "Im Außenbereich nutzt er die GPS- oder BeiDou-Satellitenortung; in Innenräumen oder in urbanen Schluchten kann die LBS-Zellortung einen ungefähren Ersatzstandort liefern, vorbehaltlich der Netzverfügbarkeit."
    },
    {
     "q": "Wie groß ist die Batterielebensdauer?",
     "a": "Mehrere Jahre, skaliert nach Übertragungsintervall – weniger Positionsaktualisierungen pro Tag bedeuten längeren Betrieb. Das genaue Profil wird pro Bereitstellung konfiguriert."
    },
    {
     "q": "Wie wird er an den Assets befestigt?",
     "a": "Drei Optionen: Magnet für Stahlflächen, Schrauben für die permanente Montage oder Bänder für Paletten und unregelmäßig geformte Assets. IP67 schützt gegen Regen und Staub."
    },
    {
     "q": "Kann er alarmieren, wenn ein Asset einen Standort verlässt?",
     "a": "Ja. Geofences werden auf der Plattform gezeichnet, und der Tracker pusht einen Alarm, wenn ein Asset eine Grenze überschreitet."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "305": {
   "series": "H-Serie · Kundenspezifischer Gassensor",
   "tagline": "Über 100 Gase | Fest oder kanalisiert | OEM/ODM",
   "desc": "Nennen Sie das Gas – Hitelecom baut das Terminal darum herum. Kundenspezifische Gassensoren können für mehr als 100 Gase konfiguriert werden, darunter CO, H₂S, NH₃, O₃ und CH₄, in festen oder kanalisierten Gehäusen für die industrielle Überwachung. Messbereich, Genauigkeit, Messprinzip und Batterielebensdauer hängen vom gewählten Gas und der Konfiguration ab.",
   "heroImg": "product/details/305-hero.png",
   "pdf": "/downloads/custom-gas-sensor-datasheet.pdf",
   "crumbCat": "Luftqualität",
   "returnCid": "265",
   "features": [
    {
     "icon": "product/details/270-f1.png",
     "text": "Elektrochemische / NDIR- / PID-Prinzipien"
    },
    {
     "icon": "product/details/270-f2.png",
     "text": "Gehäuse der Schutzart IP68, konfigurierbar"
    },
    {
     "icon": "product/details/270-f3.png",
     "text": "Über 100 Gase: CO, H₂S, NH₃, O₃, CH₄ und mehr"
    },
    {
     "icon": "product/details/270-f4.png",
     "text": "Unterstützt NFC-Aktivierung und lokale Gerätekonfiguration."
    },
    {
     "icon": "product/details/270-f5.png",
     "text": "Design mit niedrigem Stromverbrauch für den Langzeitbetrieb"
    },
    {
     "icon": "product/details/270-f6.png",
     "text": "Funkoptionen: 4G LTE, NB-IoT und LoRa."
    },
    {
     "icon": "product/details/270-f7.png",
     "text": "Fernüberwachung der Gase"
    },
    {
     "icon": "product/details/270-f8.png",
     "text": "Konfigurierbare Schwellenwert-Alarme"
    }
   ],
   "specsTitle": "Technische Spezifikationen",
   "specsDesc": "Kundenspezifische Gasterminals kombinieren Mikroleistungsprozessoren mit auf das Zielgas abgestimmten Messprinzipien. Messbereich, Genauigkeit und Batterielebensdauer hängen vom gewählten Gas, Prinzip und Übertragungsintervall ab – je nach Konfiguration zu bestätigen.",
   "specs": [
    [
     "Produktmodelle",
     "H200/H300/H500"
    ],
    [
     "Zielgase",
     "Über 100 konfigurierbare Zielgase"
    ],
    [
     "Messbereich",
     "Je nach Gas (konfiguriert)"
    ],
    [
     "Protokoll",
     "MQTT"
    ],
    [
     "Messprinzip",
     "Elektrochemisch / NDIR / PID"
    ],
    [
     "Frequenzbänder",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Batterielebensdauer",
     "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall."
    ],
    [
     "Montage",
     "Fest · Kanalisiert"
    ]
   ],
   "specsStructured": [
    {
     "name": "Produktmodelle",
     "value": "H200/H300/H500"
    },
    {
     "name": "Zielgase",
     "value": "Über 100 konfigurierbare Zielgase"
    },
    {
     "name": "Messbereich",
     "value": "Je nach Gas (konfiguriert)"
    },
    {
     "name": "Protokoll",
     "value": "MQTT"
    },
    {
     "name": "Messprinzip",
     "value": "Elektrochemisch / NDIR / PID"
    },
    {
     "name": "Frequenzbänder",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Batterielebensdauer",
     "value": "Ausgelegt für mehr als 10 Jahre Batterielebensdauer bei einem einstündigen Übertragungsintervall unter den angegebenen Prüfbedingungen. Die tatsächliche Batterielebensdauer variiert je nach Modell, Sensorkonfiguration, Netzabdeckung, Wiederholungen, Betriebstemperatur, Abtastrate und Übertragungsintervall.",
     "unitText": "Jahr",
     "minValue": 10.0
    },
    {
     "name": "Montage",
     "value": "Fest · Kanalisiert"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Anwendungsszenarien",
   "scenarios": [
    {
     "img": "product/details/283-scen3.jpg",
     "label": "Kohlebergwerk"
    },
    {
     "img": "product/details/283-scen5.jpg",
     "label": "Chemieanlage"
    },
    {
     "img": "product/details/283-scen4.jpg",
     "label": "Wasserwerk"
    },
    {
     "img": "product/details/285-scen7.jpg",
     "label": "Intelligente Fertigung"
    },
    {
     "img": "product/details/283-scen1.jpg",
     "label": "Kanaldeckel"
    },
    {
     "img": "product/details/285-scen1.jpg",
     "label": "Büroumgebung"
    }
   ],
   "related": [
    "303",
    "285",
    "274",
    "270",
    "301",
    "280",
    "284",
    "283"
   ],
   "summary": "Nennen Sie das Gas – Hitelecom baut das Terminal darum herum. Der kundenspezifische Gassensor der H-Serie unterstützt über 100 Gase, darunter CO, H₂S, NH₃, O₃ und CH₄, mit elektrochemischen, NDIR- oder PID-Prinzipien, festen oder kanalisierten Gehäusen und 4G- oder NB-IoT-Uplink; die Batterielebensdauer hängt vom Messprinzip und der Übertragungshäufigkeit ab (ausgelegt für mehr als 10 Jahre bei einem einstündigen Intervall in typischen Konfigurationen).",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Kohlebergwerke",
     "desc": "CH₄- und CO-Überwachung im Untergrund, wo kabelgebundene Gassysteme schwer zu erweitern sind.",
     "img": "product/details/283-scen3.jpg"
    },
    {
     "name": "Chemieanlagen",
     "desc": "Punktuelle Überwachung prozessspezifischer Gase in Produktions- und Lagerbereichen.",
     "img": "product/details/283-scen5.jpg"
    },
    {
     "name": "Wasser- und Abwasseranlagen",
     "desc": "H₂S-Detektion in Nassgruben, Rechen und Schlammbäumen.",
     "img": "product/details/283-scen4.jpg"
    },
    {
     "name": "Kühllagerung und Kälte",
     "desc": "NH₃-Leckdetektion für Ammoniak-Kühlanlagen.",
     "img": "product/details/270-scen5.jpg"
    },
    {
     "name": "Kontrollschächte und enge Räume",
     "desc": "Gasprüfungen vor dem Betreten und kontinuierlich in kommunalen engen Räumen.",
     "img": "product/details/283-scen1.jpg"
    },
    {
     "name": "Halbleiter und Labore",
     "desc": "Lecküberwachung für Spezialgase, zugeschnitten auf das genau verwendete Gas.",
     "img": "product/details/274-scen2.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "Welche Gase können detektiert werden?",
     "a": "Mehr als 100 Zielgase, darunter CO, H₂S, NH₃, O₃, CH₄, Cl₂ und VOC. Die Sensortechnologie – elektrochemisch, NDIR oder PID – und der Messbereich werden für das Zielgas ausgewählt."
    },
    {
     "q": "Wie bestelle ich einen kundenspezifischen Gassensor?",
     "a": "Nennen Sie Hitelecom das Zielgas, den erwarteten Messbereich, die Installationsart (fest oder kanalisiert) und die Standortbedingungen; das Engineering bestätigt die Konfiguration und die Lieferzeit im Rahmen des OEM/ODM-Programms."
    },
    {
     "q": "Kann das Gehäuse die Installation im Außenbereich bewältigen?",
     "a": "Ja. Feste und kanalisierte Gehäuse decken die meisten Standorte ab, und der Schutz IP68 ist als Konfiguration für dauerhaft exponierte Stellen verfügbar."
    },
    {
     "q": "Wie meldet sie Alarme?",
     "a": "Drahtlos über 4G oder NB-IoT via MQTT an Hitelecom Cloud oder eine private Plattform, mit remote konfigurierten Alarmschwellen."
    }
   ],
   "dateModified": "2026-09-02"
  }
 }
}, ja: {
 "cloud": {
  "banner": {
   "title": "Hitelecom Cloud",
   "subtitle": "安全で信頼性の高いIoTプラットフォーム",
   "desc": "Hitelecom Cloudは、デバイス接続、遠隔モニタリング、高度なデータ分析を提供するインテリジェントなデータ統合プラットフォームで、企業がオペレーションを最適化し、的確な意思決定を行えるようにします。",
   "images": [
    "product/cloud/banner-1.png",
    "product/cloud/banner-2.png",
    "product/cloud/banner-3.png",
    "product/cloud/banner-4.png"
   ]
  },
  "intro": {
   "heading": "フィールドデバイスをクラウドに接続",
   "paras": [
    "Hitelecomは、IoTセンサー、ゲートウェイ、コントローラー、クラウドソフトウェアにわたる統合ソリューションを提供し、フィールドデータがより少ない統合ステップでデバイスからダッシュボードに届きます。",
    "超低消費電力のデバイス設計は、製品ライフサイクル全体でエネルギー消費を削減し、長期的で持続可能な展開をサポートします。"
   ],
   "cards": [
    {
     "img": "product/cloud/deploy-1.png",
     "title": "パブリッククラウド",
     "desc": "Hitelecom Cloudでモニタリング、アラート、分析、リモート保守を用いて、デバイスを迅速に接続・管理します。"
    },
    {
     "img": "product/cloud/deploy-2.png",
     "title": "プライベートクラウド",
     "desc": "データ分離、アクセス制御、ローカル運用のために、お客様管理のインフラにプラットフォームを展開します。"
    },
    {
     "img": "product/cloud/deploy-3.png",
     "title": "ハイブリッドクラウド",
     "desc": "機密性の高いワークロードはプライベートインフラに保持し、選択されたサービスとスケーラブルなワークロードにはパブリッククラウドを使用します。"
    },
    {
     "img": "product/cloud/deploy-4.png",
     "title": "エッジクラウド",
     "desc": "データをローカルで処理し、基本的な制御ロジックを実行し、クラウド接続が限られる場合でも選択された機能を利用可能に保ちます。"
    }
   ]
  },
  "features": {
   "heading": "Hitelecom Cloudの機能",
   "items": [
    {
     "img": "product/cloud/feature-1.png",
     "text": "エンドツーエンドのIoTソリューション"
    },
    {
     "img": "product/cloud/feature-2.png",
     "text": "大規模デバイス接続"
    },
    {
     "img": "product/cloud/feature-3.png",
     "text": "高可用性の分散アーキテクチャ"
    },
    {
     "img": "product/cloud/feature-4.png",
     "text": "低遅延処理"
    },
    {
     "img": "product/cloud/feature-5.png",
     "text": "マルチプロトコル対応"
    },
    {
     "img": "product/cloud/feature-6.png",
     "text": "視覚的な運用と保守"
    },
    {
     "img": "product/cloud/feature-7.png",
     "text": "HiLinkデバイスプロトコル"
    },
    {
     "img": "product/cloud/feature-8.png",
     "text": "カスタムハードウェアおよびソフトウェア開発"
    }
   ]
  },
  "architecture": {
   "heading": "プラットフォームアーキテクチャ",
   "img": "product/cloud/architecture.gif"
  },
  "core": {
   "heading": "コア機能",
   "subtitle": "効率的なコネクティビティと精密な管理でIoTビジネスを加速します",
   "items": [
    {
     "img": "product/cloud/core-1.jpg",
     "title": "デバイス接続",
     "desc": "デバイスサポートに応じて、MQTT、HTTP、TCP、CoAP、AMQP、HiLinkプロトコルでセンサー、コントローラー、ゲートウェイ、エッジデバイスを接続します。"
    },
    {
     "img": "product/cloud/core-2.jpg",
     "title": "デバイス管理",
     "desc": "ライブのデバイス状態を確認し、接続品質を監視し、アラームを分析します。\n\nストア＆フォワードと再試行により、ネットワーク状況が不安定でもデータの流れを維持します。\n\nマップビューでデバイスの分布と位置データを確認します。\n\n対応デバイスのリモートOTAファームウェア更新とバッチ操作を管理します。"
    },
    {
     "img": "product/cloud/core-3.jpg",
     "title": "アラームルール",
     "desc": "トリガー条件と属性計算を含む柔軟なアラームルールを設定し、継続的なデバイスモニタリングを行います。\n\n高温、異常圧力、急速な流量などの状況を検出し、タイムリーな意思決定をサポートします。\n\nトリガー条件が正常に戻るとアラームは自動的に解除され、手動のフォローアップを削減します。\n\nアラーム構成をバッチで展開し、接続されたターミナルからアラームレポートを受信します。"
    },
    {
     "img": "product/cloud/core-4.jpg",
     "title": "データ可視化",
     "desc": "デスクトップ、モバイル、大型ディスプレイレイアウトのダッシュボードを構築し、デバイスデータソースにライブ接続します。\n\nビデオウォール、PC、タブレット、フォンでリアルタイム更新のダッシュボードを表示します。\n\nアラームはほぼリアルタイムで表示され、デバイス接続に応じてダッシュボードから設定コマンドを発行できます。\n\nオプションのGISおよびデジタルツインビューで、デバイスの位置、状態、移動履歴を表示できます。"
    },
    {
     "img": "product/cloud/core-5.jpg",
     "title": "オープンAPI",
     "desc": "サードパーティのデバイスおよびコントローラーとの統合のためのオープンAPI。\n\nAPIまたはMQTTを使用して、デバイスデータをお客様のデータセンターやプラットフォームに送信します。\n\nクラウド間統合により、対応するサードパーティデータをHitelecom Cloudに集約できます。"
    },
    {
     "img": "product/cloud/core-6.webp",
     "title": "ルールベースの自動化",
     "desc": "シーンルールでデバイスを連携します：例えば、温度が設定済みしきい値を超えると冷却をオンにする、土壌水分が設定済みしきい値を下回ると対応灌漑コントローラーを起動します。\n\nHitelecomの超低消費電力IoTターミナルと組み合わせることで、ルールベースの自動化が日常的な手動介入を削減します。"
    }
   ]
  },
  "scenarios": {
   "heading": "適用シーン",
   "tabs": [
    {
     "icons": [
      "product/cloud/scen-icon-1a.png",
      "product/cloud/scen-icon-1b.png"
     ],
     "label": "産業用IoT"
    },
    {
     "icons": [
      "product/cloud/scen-icon-2a.png",
      "product/cloud/scen-icon-2b.png"
     ],
     "label": "スマートエネルギー"
    },
    {
     "icons": [
      "product/cloud/scen-icon-3a.png",
      "product/cloud/scen-icon-3b.png"
     ],
     "label": "スマートキャンパス"
    },
    {
     "icons": [
      "product/cloud/scen-icon-4a.png",
      "product/cloud/scen-icon-4b.png"
     ],
     "label": "スマート農業"
    }
   ],
   "bgs": [
    "product/cloud/scen-bg-1.jpg",
    "product/cloud/scen-bg-2.jpg",
    "product/cloud/scen-bg-3.png",
    "product/cloud/scen-bg-4.png"
   ],
   "slides": [
    {
     "img": "product/cloud/scen-bg-1.jpg",
     "title": "産業用IoT",
     "desc": "デバイス、システム、チームを接続して生産プロセスを合理化し、資源利用率を向上させます。Hitelecomのセンサーターミナルは設備状態のリアルタイムモニタリングを提供し、状態基準保全と迅速な故障対応をサポートします。"
    },
    {
     "img": "product/cloud/scen-bg-2.jpg",
     "title": "スマートエネルギー",
     "desc": "Hitelecomのセンサーターミナルは、リアルタイムモニタリング、データ収集、リモート制御でエネルギー管理をサポートします。そのデータはエネルギー分析と状態基準保全をサポートし、日常的手動作業を削減します。Hitelecom Cloudは、対応APIとプロトコルを通じて既存のエネルギーシステムと統合でき、企業が運用コストと持続可能性指標を追跡するのに役立ちます。"
    },
    {
     "img": "product/cloud/scen-bg-3.png",
     "title": "スマートキャンパス",
     "desc": "スマートキャンパスのIoTは、デバイスを接続し、施設間でデータを共有します。Hitelecomのセンサーターミナルは、キャンパス環境、安全状況、エネルギー使用のリアルタイムモニタリングを提供し、管理者に継続的な運用状況を示します。"
    },
    {
     "img": "product/cloud/scen-bg-4.png",
     "title": "スマート農業",
     "desc": "HitelecomのスマートIoTデバイスは、土壌水分、温度、光をリアルタイムで監視し、灌漑と施肥の意思決定をサポートするデータを提供し、日常的な圃場作業を削減できます。気象ステーションおよび対応灌漑コントローラーと統合され、フィールドセンシングを自動化された農場管理に接続します。"
    }
   ]
  },
  "cta": {
   "title": "Hitelecom Cloudを体験",
   "subtitle": "対応IoTデバイスの接続・監視・管理のための使いやすいプラットフォームです。",
   "primary": "クラウドデモを見る",
   "secondary": "プロジェクトについてご相談ください"
  }
 },
 "app": {
  "banner": {
   "title": "Hitelecomアプリ",
   "subtitle": "どこからでも — 貴社の遠隔モニタリング",
   "desc": "Hitelecomアプリは、シンプルで便利な遠隔モニタリングツールです。モバイルデバイスからどこからでも接続デバイスにアクセスし、管理できます。",
   "images": [
    "product/cloud/banner-1.png",
    "product/cloud/banner-2.png",
    "product/cloud/banner-3.png",
    "product/app/banner-4.png"
   ]
  },
  "platforms": {
   "heading": "すべてのプラットフォームで利用可能",
   "items": [
    {
     "img": "product/app/platform-1.png",
     "name": "Windows"
    },
    {
     "img": "product/app/platform-2.png",
     "name": "iOS"
    },
    {
     "img": "product/app/platform-3.png",
     "name": "Android"
    },
    {
     "img": "product/app/platform-4.png",
     "name": "WeChatミニプログラム"
    }
   ]
  },
  "features": {
   "heading": "製品機能",
   "subtitle": "デバイスを登録し、センサーを設定し、ユーザーアクセスを管理し、1つのアプリケーションからライブデータを監視します。",
   "items": [
    {
     "img": "product/app/feature-1.png",
     "title": "デバイスアクティベーション",
     "desc": "Hitelecomアプリを使用してNFC対応デバイスをアクティベートまたは再アクティベートし、展開と現場での設定を高速化します。"
    },
    {
     "img": "product/app/feature-2.png",
     "title": "デバイス接続",
     "desc": "アクティベートされたデバイスをHitelecom Cloudに接続し、各展開に合わせてアラーム、タスク、送信間隔、スケジュールを設定します。"
    },
    {
     "img": "product/app/feature-3.png",
     "title": "デバイス割り当て",
     "desc": "ロールベースのアクセスモデルを通じて、ユーザー、ロール、部門、権限を作成・管理します。"
    },
    {
     "img": "product/app/feature-4.png",
     "title": "カスタムアプリインターフェース",
     "desc": "お客様のワークフローとブランディング要件に合わせてアプリのコンポーネントとインターフェースをカスタマイズします。"
    },
    {
     "img": "product/app/feature-5.png",
     "title": "データダッシュボード",
     "desc": "現在の読取値、トレンド、ダウンロード可能なレポートを1つのインターフェースで確認します。"
    },
    {
     "img": "product/app/feature-6.png",
     "title": "マップ上のデータ可視化",
     "desc": "インタラクティブなマップでデバイスの位置と状態を確認し、フィールドオペレーションと資産管理をサポートします。"
    },
    {
     "img": "product/app/feature-7.png",
     "title": "アラーム管理",
     "desc": "リアルタイムのデバイス状態モニタリングとアプリへのプッシュアラートにより、チームは有効なアラートにより迅速に対応し、設備の稼働を維持できます。"
    },
    {
     "img": "product/app/feature-8.png",
     "title": "多言語サポート",
     "desc": "標準インターフェースは中国語と英語に対応しています。追加のインターフェース言語はカスタム開発でご利用いただけます。"
    }
   ]
  },
  "app3": {
   "heading": "適用シーン",
   "subtitle": "接続されたフィールドデータを使用して、業界全体でオペレーションを監視し、アラートに対応し、意思決定を改善します。",
   "items": [
    {
     "img": "product/app/scen-0bbcd0.jpg",
     "label": "スマート農業"
    },
    {
     "img": "product/app/scen-214abe.jpg",
     "label": "環境モニタリング"
    },
    {
     "img": "product/app/scen-f607f3.jpg",
     "label": "産業用IoT"
    },
    {
     "img": "product/app/scen-7d03dc.jpg",
     "label": "スマートキャンパス"
    },
    {
     "img": "product/app/scen-4f4630.jpg",
     "label": "スマートシティ"
    },
    {
     "img": "product/app/scen-83dd3b.jpg",
     "label": "スマート水管理"
    },
    {
     "img": "product/app/scen-1c2289.jpg",
     "label": "スマートエネルギー"
    },
    {
     "img": "product/app/scen-67bc5a.jpg",
     "label": "資産追跡"
    }
   ]
  }
 },
 "lists": {
  "261": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "すべて",
     "on": true
    },
    {
     "cid": "263",
     "name": "温度",
     "on": false
    },
    {
     "cid": "262",
     "name": "圧力",
     "on": false
    },
    {
     "cid": "269",
     "name": "土壌",
     "on": false
    },
    {
     "cid": "268",
     "name": "レベル",
     "on": false
    },
    {
     "cid": "267",
     "name": "傾斜モニタリング",
     "on": false
    },
    {
     "cid": "266",
     "name": "レーダー距離",
     "on": false
    },
    {
     "cid": "271",
     "name": "振動モニタリング",
     "on": false
    },
    {
     "cid": "265",
     "name": "空気質",
     "on": false
    },
    {
     "cid": "306",
     "name": "資産追跡",
     "on": false
    }
   ],
   "products": [
    {
     "id": "270",
     "img": "product/products/270.png",
     "name": "温度センサー",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "274",
     "img": "product/products/274.png",
     "name": "圧力センサー",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "280",
     "img": "product/products/280.png",
     "name": "土壌センサー",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "281",
     "img": "product/products/281.png",
     "name": "投入式レベルセンサー",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "282",
     "img": "product/products/282.png",
     "name": "傾斜センサー",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "283",
     "img": "product/products/283.png",
     "name": "レーダー距離センサー",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "284",
     "img": "product/products/284.png",
     "name": "振動センサー",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "285",
     "img": "product/products/285.png",
     "name": "空気質センサー",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": 301,
     "name": "温度・湿度センサー",
     "conn": "NB-IoT | 4G LTE | LoRa",
     "img": "product/products/301.png"
    },
    {
     "id": 302,
     "name": "温度・湿度データロガー",
     "conn": "NFC | USB",
     "img": "product/products/302.png"
    },
    {
     "id": 303,
     "name": "TVOCセンサー",
     "conn": "NB-IoT | 4G LTE | LoRa",
     "img": "product/products/303.png"
    },
    {
     "id": 304,
     "name": "資産追跡センサー",
     "conn": "GPS | BeiDou | 4G LTE",
     "img": "product/products/304.png"
    },
    {
     "id": 305,
     "name": "カスタムガスセンサー",
     "conn": "NB-IoT | 4G LTE | LoRa",
     "img": "product/products/305.png"
    }
   ]
  },
  "258": {
   "bannerImg": "product/list/banner-258.jpg",
   "subcats": [
    {
     "cid": "258",
     "name": "すべて",
     "on": true
    },
    {
     "cid": "272",
     "name": "屋内向けゲートウェイ",
     "on": false
    },
    {
     "cid": "273",
     "name": "屋外向けゲートウェイ",
     "on": false
    }
   ],
   "products": [
    {
     "id": "276",
     "img": "product/products/276.png",
     "name": "屋内向けゲートウェイ",
     "conn": "LoRa | 4G LTE | Ethernet"
    },
    {
     "id": "275",
     "img": "product/products/275.png",
     "name": "屋外向けゲートウェイ",
     "conn": "LoRa | 4G LTE | Ethernet"
    }
   ]
  },
  "257": {
   "bannerImg": "product/list/banner-257.jpg",
   "subcats": [
    {
     "cid": "257",
     "name": "すべて",
     "on": true
    },
    {
     "cid": "275",
     "name": "6パラメーター",
     "on": false
    },
    {
     "cid": "274",
     "name": "12パラメーター",
     "on": false
    }
   ],
   "products": [
    {
     "id": "278",
     "img": "product/products/278.png",
     "name": "気象ステーション",
     "conn": "マルチパラメーター | リアルタイム | 簡単展開"
    },
    {
     "id": "277",
     "img": "product/products/277.png",
     "name": "水文ステーション",
     "conn": "リアルタイム | マルチパラメーター | ミリメートル級"
    }
   ]
  },
  "256": {
   "bannerImg": "product/list/banner-256.jpg",
   "subcats": [
    {
     "cid": "256",
     "name": "すべて",
     "on": true
    },
    {
     "cid": "278",
     "name": "ソフトウェア",
     "on": false
    },
    {
     "cid": "279",
     "name": "ハードウェア",
     "on": false
    }
   ],
   "products": [
    {
     "id": "",
     "img": "product/products/custom-1.png",
     "name": "デジタルツイン",
     "conn": "カスタムダッシュボードと動的データ可視化"
    },
    {
     "id": "",
     "img": "product/products/custom-2.png",
     "name": "GISダッシュボード",
     "conn": "カスタムマップと多次元データ可視化"
    },
    {
     "id": "",
     "img": "product/products/custom-3.png",
     "name": "組込みソフトウェア",
     "conn": "特定の用途要件に合わせた組込みソフトウェア"
    },
    {
     "id": "",
     "img": "product/products/custom-4.png",
     "name": "ハードウェアカスタマイズ",
     "conn": "カスタムセンサー、コントローラー、アクチュエーター、その他の接続デバイス"
    },
    {
     "id": "287",
     "img": "product/products/287.png",
     "name": "IoTアクセサリー",
     "conn": "信号結合 | 2.4 GHz | 5.8 GHz"
    },
    {
     "id": "286",
     "img": "product/products/286.png",
     "name": "危険区域向け2-in-1センサー",
     "conn": "温度 | 圧力 | 4G通信"
    }
   ]
  },
  "262": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "すべて",
     "on": false
    },
    {
     "cid": "263",
     "name": "温度",
     "on": false
    },
    {
     "cid": "262",
     "name": "圧力",
     "on": true
    },
    {
     "cid": "269",
     "name": "土壌",
     "on": false
    },
    {
     "cid": "268",
     "name": "レベル",
     "on": false
    },
    {
     "cid": "267",
     "name": "傾斜モニタリング",
     "on": false
    },
    {
     "cid": "266",
     "name": "レーダー距離",
     "on": false
    },
    {
     "cid": "271",
     "name": "振動モニタリング",
     "on": false
    },
    {
     "cid": "265",
     "name": "空気質",
     "on": false
    },
    {
     "cid": "306",
     "name": "資産追跡",
     "on": false
    }
   ],
   "products": [
    {
     "id": "274",
     "img": "product/products/274.png",
     "name": "圧力センサー",
     "conn": "NB-IoT | 4G LTE | LoRa"
    }
   ]
  },
  "263": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "すべて",
     "on": false
    },
    {
     "cid": "263",
     "name": "温度",
     "on": true
    },
    {
     "cid": "262",
     "name": "圧力",
     "on": false
    },
    {
     "cid": "269",
     "name": "土壌",
     "on": false
    },
    {
     "cid": "268",
     "name": "レベル",
     "on": false
    },
    {
     "cid": "267",
     "name": "傾斜モニタリング",
     "on": false
    },
    {
     "cid": "266",
     "name": "レーダー距離",
     "on": false
    },
    {
     "cid": "271",
     "name": "振動モニタリング",
     "on": false
    },
    {
     "cid": "265",
     "name": "空気質",
     "on": false
    },
    {
     "cid": "306",
     "name": "資産追跡",
     "on": false
    }
   ],
   "products": [
    {
     "id": "270",
     "img": "product/products/270.png",
     "name": "温度センサー",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": 301,
     "name": "温度・湿度センサー",
     "conn": "NB-IoT | 4G LTE | LoRa",
     "img": "product/products/301.png"
    },
    {
     "id": 302,
     "name": "温度・湿度データロガー",
     "conn": "NFC | USB",
     "img": "product/products/302.png"
    }
   ]
  },
  "265": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "すべて",
     "on": false
    },
    {
     "cid": "263",
     "name": "温度",
     "on": false
    },
    {
     "cid": "262",
     "name": "圧力",
     "on": false
    },
    {
     "cid": "269",
     "name": "土壌",
     "on": false
    },
    {
     "cid": "268",
     "name": "レベル",
     "on": false
    },
    {
     "cid": "267",
     "name": "傾斜モニタリング",
     "on": false
    },
    {
     "cid": "266",
     "name": "レーダー距離",
     "on": false
    },
    {
     "cid": "271",
     "name": "振動モニタリング",
     "on": false
    },
    {
     "cid": "265",
     "name": "空気質",
     "on": true
    },
    {
     "cid": "306",
     "name": "資産追跡",
     "on": false
    }
   ],
   "products": [
    {
     "id": "285",
     "img": "product/products/285.png",
     "name": "空気質センサー",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": 303,
     "name": "TVOCセンサー",
     "conn": "NB-IoT | 4G LTE | LoRa",
     "img": "product/products/303.png"
    },
    {
     "id": 305,
     "name": "カスタムガスセンサー",
     "conn": "NB-IoT | 4G LTE | LoRa",
     "img": "product/products/305.png"
    }
   ]
  },
  "266": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "すべて",
     "on": false
    },
    {
     "cid": "263",
     "name": "温度",
     "on": false
    },
    {
     "cid": "262",
     "name": "圧力",
     "on": false
    },
    {
     "cid": "269",
     "name": "土壌",
     "on": false
    },
    {
     "cid": "268",
     "name": "レベル",
     "on": false
    },
    {
     "cid": "267",
     "name": "傾斜モニタリング",
     "on": false
    },
    {
     "cid": "266",
     "name": "レーダー距離",
     "on": true
    },
    {
     "cid": "271",
     "name": "振動モニタリング",
     "on": false
    },
    {
     "cid": "265",
     "name": "空気質",
     "on": false
    },
    {
     "cid": "306",
     "name": "資産追跡",
     "on": false
    }
   ],
   "products": [
    {
     "id": "283",
     "img": "product/products/283.png",
     "name": "レーダー距離センサー",
     "conn": "NB-IoT | 4G LTE | LoRa"
    }
   ]
  },
  "267": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "すべて",
     "on": false
    },
    {
     "cid": "263",
     "name": "温度",
     "on": false
    },
    {
     "cid": "262",
     "name": "圧力",
     "on": false
    },
    {
     "cid": "269",
     "name": "土壌",
     "on": false
    },
    {
     "cid": "268",
     "name": "レベル",
     "on": false
    },
    {
     "cid": "267",
     "name": "傾斜モニタリング",
     "on": true
    },
    {
     "cid": "266",
     "name": "レーダー距離",
     "on": false
    },
    {
     "cid": "271",
     "name": "振動モニタリング",
     "on": false
    },
    {
     "cid": "265",
     "name": "空気質",
     "on": false
    },
    {
     "cid": "306",
     "name": "資産追跡",
     "on": false
    }
   ],
   "products": [
    {
     "id": "282",
     "img": "product/products/282.png",
     "name": "傾斜センサー",
     "conn": "NB-IoT | 4G LTE | LoRa"
    }
   ]
  },
  "268": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "すべて",
     "on": false
    },
    {
     "cid": "263",
     "name": "温度",
     "on": false
    },
    {
     "cid": "262",
     "name": "圧力",
     "on": false
    },
    {
     "cid": "269",
     "name": "土壌",
     "on": false
    },
    {
     "cid": "268",
     "name": "レベル",
     "on": true
    },
    {
     "cid": "267",
     "name": "傾斜モニタリング",
     "on": false
    },
    {
     "cid": "266",
     "name": "レーダー距離",
     "on": false
    },
    {
     "cid": "271",
     "name": "振動モニタリング",
     "on": false
    },
    {
     "cid": "265",
     "name": "空気質",
     "on": false
    },
    {
     "cid": "306",
     "name": "資産追跡",
     "on": false
    }
   ],
   "products": [
    {
     "id": "281",
     "img": "product/products/281.png",
     "name": "投入式レベルセンサー",
     "conn": "NB-IoT | 4G LTE | LoRa"
    }
   ]
  },
  "269": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "すべて",
     "on": false
    },
    {
     "cid": "263",
     "name": "温度",
     "on": false
    },
    {
     "cid": "262",
     "name": "圧力",
     "on": false
    },
    {
     "cid": "269",
     "name": "土壌",
     "on": true
    },
    {
     "cid": "268",
     "name": "レベル",
     "on": false
    },
    {
     "cid": "267",
     "name": "傾斜モニタリング",
     "on": false
    },
    {
     "cid": "266",
     "name": "レーダー距離",
     "on": false
    },
    {
     "cid": "271",
     "name": "振動モニタリング",
     "on": false
    },
    {
     "cid": "265",
     "name": "空気質",
     "on": false
    },
    {
     "cid": "306",
     "name": "資産追跡",
     "on": false
    }
   ],
   "products": [
    {
     "id": "280",
     "img": "product/products/280.png",
     "name": "土壌センサー",
     "conn": "NB-IoT | 4G LTE | LoRa"
    }
   ]
  },
  "271": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "すべて",
     "on": false
    },
    {
     "cid": "263",
     "name": "温度",
     "on": false
    },
    {
     "cid": "262",
     "name": "圧力",
     "on": false
    },
    {
     "cid": "269",
     "name": "土壌",
     "on": false
    },
    {
     "cid": "268",
     "name": "レベル",
     "on": false
    },
    {
     "cid": "267",
     "name": "傾斜モニタリング",
     "on": false
    },
    {
     "cid": "266",
     "name": "レーダー距離",
     "on": false
    },
    {
     "cid": "271",
     "name": "振動モニタリング",
     "on": true
    },
    {
     "cid": "265",
     "name": "空気質",
     "on": false
    },
    {
     "cid": "306",
     "name": "資産追跡",
     "on": false
    }
   ],
   "products": [
    {
     "id": "284",
     "img": "product/products/284.png",
     "name": "振動センサー",
     "conn": "NB-IoT | 4G LTE | LoRa"
    }
   ]
  },
  "272": {
   "bannerImg": "product/list/banner-258.jpg",
   "subcats": [
    {
     "cid": "258",
     "name": "すべて",
     "on": false
    },
    {
     "cid": "272",
     "name": "屋内向けゲートウェイ",
     "on": true
    },
    {
     "cid": "273",
     "name": "屋外向けゲートウェイ",
     "on": false
    }
   ],
   "products": [
    {
     "id": "276",
     "img": "product/products/276.png",
     "name": "屋内向けゲートウェイ",
     "conn": "LoRa | 4G LTE | Ethernet"
    }
   ]
  },
  "273": {
   "bannerImg": "product/list/banner-258.jpg",
   "subcats": [
    {
     "cid": "258",
     "name": "すべて",
     "on": false
    },
    {
     "cid": "272",
     "name": "屋内向けゲートウェイ",
     "on": false
    },
    {
     "cid": "273",
     "name": "屋外向けゲートウェイ",
     "on": true
    }
   ],
   "products": [
    {
     "id": "275",
     "img": "product/products/275.png",
     "name": "屋外向けゲートウェイ",
     "conn": "LoRa | 4G LTE | Ethernet"
    }
   ]
  },
  "274": {
   "bannerImg": "product/list/banner-257.jpg",
   "subcats": [
    {
     "cid": "257",
     "name": "すべて",
     "on": false
    },
    {
     "cid": "275",
     "name": "6パラメーター",
     "on": false
    },
    {
     "cid": "274",
     "name": "12パラメーター",
     "on": true
    }
   ],
   "products": [
    {
     "id": "277",
     "img": "product/products/277.png",
     "name": "水文ステーション",
     "conn": "リアルタイム | マルチパラメーター | ミリメートル級"
    }
   ]
  },
  "275": {
   "bannerImg": "product/list/banner-257.jpg",
   "subcats": [
    {
     "cid": "257",
     "name": "すべて",
     "on": false
    },
    {
     "cid": "275",
     "name": "6パラメーター",
     "on": true
    },
    {
     "cid": "274",
     "name": "12パラメーター",
     "on": false
    }
   ],
   "products": [
    {
     "id": "278",
     "img": "product/products/278.png",
     "name": "気象ステーション",
     "conn": "マルチパラメーター | リアルタイム | 簡単展開"
    }
   ]
  },
  "278": {
   "bannerImg": "product/list/banner-256.jpg",
   "subcats": [
    {
     "cid": "256",
     "name": "すべて",
     "on": false
    },
    {
     "cid": "278",
     "name": "ソフトウェア",
     "on": true
    },
    {
     "cid": "279",
     "name": "ハードウェア",
     "on": false
    }
   ],
   "products": [
    {
     "id": "",
     "img": "product/products/custom-1.png",
     "name": "デジタルツイン",
     "conn": "カスタムダッシュボードと動的データ可視化"
    },
    {
     "id": "",
     "img": "product/products/custom-2.png",
     "name": "GISダッシュボード",
     "conn": "カスタムマップと多次元データ可視化"
    },
    {
     "id": "",
     "img": "product/products/custom-3.png",
     "name": "組込みソフトウェア",
     "conn": "特定の用途要件に合わせた組込みソフトウェア"
    }
   ]
  },
  "279": {
   "bannerImg": "product/list/banner-256.jpg",
   "subcats": [
    {
     "cid": "256",
     "name": "すべて",
     "on": false
    },
    {
     "cid": "278",
     "name": "ソフトウェア",
     "on": false
    },
    {
     "cid": "279",
     "name": "ハードウェア",
     "on": true
    }
   ],
   "products": [
    {
     "id": "",
     "img": "product/products/custom-4.png",
     "name": "ハードウェアカスタマイズ",
     "conn": "カスタムセンサー、コントローラー、アクチュエーター、その他の接続デバイス"
    },
    {
     "id": "287",
     "img": "product/products/287.png",
     "name": "IoTアクセサリー",
     "conn": "信号結合 | 2.4 GHz | 5.8 GHz"
    },
    {
     "id": "286",
     "img": "product/products/286.png",
     "name": "危険区域向け2-in-1センサー",
     "conn": "温度 | 圧力 | 4G通信"
    }
   ]
  },
  "306": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "すべて",
     "on": false
    },
    {
     "cid": "263",
     "name": "温度",
     "on": false
    },
    {
     "cid": "262",
     "name": "圧力",
     "on": false
    },
    {
     "cid": "269",
     "name": "土壌",
     "on": false
    },
    {
     "cid": "268",
     "name": "レベル",
     "on": false
    },
    {
     "cid": "267",
     "name": "傾斜モニタリング",
     "on": false
    },
    {
     "cid": "266",
     "name": "レーダー距離",
     "on": false
    },
    {
     "cid": "271",
     "name": "振動モニタリング",
     "on": false
    },
    {
     "cid": "265",
     "name": "空気質",
     "on": false
    },
    {
     "cid": "306",
     "name": "資産追跡",
     "on": true
    }
   ],
   "products": [
    {
     "id": 304,
     "name": "資産追跡センサー",
     "conn": "GPS | BeiDou | 4G LTE",
     "img": "product/products/304.png"
    }
   ]
  }
 },
 "details": {
  "270": {
   "series": "Hシリーズ · 温度センサー",
   "tagline": "精度 | 測定範囲 | 超低消費電力",
   "desc": "Hitelecomの温度センサーは、遠隔モニタリング、アラート、高精度測定を提供し、多様な用途でタイムリーで信頼性の高い温度データを提供します。",
   "heroImg": "product/details/270-hero.png",
   "pdf": "/downloads/temperature-sensor-datasheet.pdf",
   "crumbCat": "温度",
   "returnCid": "263",
   "features": [
    {
     "icon": "product/details/270-f1.png",
     "text": "精度：±0.5 °C（±0.1 °Cまでカスタマイズ可能）"
    },
    {
     "icon": "product/details/270-f2.png",
     "text": "IP68防護等級筐体"
    },
    {
     "icon": "product/details/270-f3.png",
     "text": "広測定範囲：−200 °C〜+800 °C"
    },
    {
     "icon": "product/details/270-f4.png",
     "text": "NFCアクティベーションとローカルデバイス設定に対応します。"
    },
    {
     "icon": "product/details/270-f5.png",
     "text": "長期運用向け低消費電力設計"
    },
    {
     "icon": "product/details/270-f6.png",
     "text": "無線オプション：4G LTE、NB-IoT、LoRa。"
    },
    {
     "icon": "product/details/270-f7.png",
     "text": "遠隔温度モニタリング"
    },
    {
     "icon": "product/details/270-f8.png",
     "text": "構成可能なしきい値アラート"
    }
   ],
   "specsTitle": "技術仕様",
   "specsDesc": "マイクロパワープロセッサーとアルゴリズム最適化により、規定の試験条件下で1時間の送信間隔で最長10年の設計寿命を実現し、定期保守を削減します。",
   "specs": [
    [
     "製品モデル",
     "H200/H300/H500"
    ],
    [
     "測定範囲",
     "−200 °C〜800 °C"
    ],
    [
     "精度",
     "±0.5 °C（±0.1 °Cまでカスタマイズ可能）"
    ],
    [
     "プロトコル",
     "MQTT"
    ],
    [
     "接続",
     "3線式"
    ],
    [
     "周波数帯",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "バッテリー寿命",
     "規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。"
    ],
    [
     "取付",
     "取付耳、ポールクランプ、スロットマウント（構成による）"
    ]
   ],
   "specsStructured": [
    {
     "name": "製品モデル",
     "value": "H200/H300/H500"
    },
    {
     "name": "測定範囲",
     "value": "−200 °C〜800 °C",
     "unitText": "摂氏度",
     "minValue": -200.0,
     "maxValue": 800.0
    },
    {
     "name": "精度",
     "value": "±0.5 °C（±0.1 °Cまでカスタマイズ可能）",
     "unitText": "摂氏度"
    },
    {
     "name": "プロトコル",
     "value": "MQTT"
    },
    {
     "name": "接続",
     "value": "3線式"
    },
    {
     "name": "周波数帯",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "バッテリー寿命",
     "value": "規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。",
     "unitText": "年",
     "minValue": 10.0
    },
    {
     "name": "取付",
     "value": "取付耳、ポールクランプ、スロットマウント（構成による）"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "適用シーン",
   "scenarios": [
    {
     "img": "product/details/270-scen1.jpg",
     "label": "スマートエネルギー"
    },
    {
     "img": "product/details/270-scen2.jpg",
     "label": "スマート農業"
    },
    {
     "img": "product/details/270-scen3.jpg",
     "label": "データセンター"
    },
    {
     "img": "product/details/270-scen4.jpg",
     "label": "医薬品およびヘルスケア保管"
    },
    {
     "img": "product/details/270-scen5.jpg",
     "label": "食品加工"
    },
    {
     "img": "product/details/270-scen6.jpg",
     "label": "スマート製造"
    },
    {
     "img": "product/details/270-scen7.jpg",
     "label": "遊園地"
    }
   ],
   "related": [
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285",
    "276",
    "275"
   ],
   "summary": "HitelecomのHシリーズ温度センサーは、−200 °C〜800 °Cの遠隔モニタリング用ワイヤレス産業用温度センサーです。±0.5 °Cの精度（±0.1 °Cまでカスタマイズ可能）を提供し、規定の試験条件下で毎時送信で10年以上のバッテリー寿命を想定した設計で、4GまたはNB-IoT経由でMQTTによりHitelecom Cloudまたはプライベートプラットフォームに読取値をアップロードします。",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "データセンターとサーバールーム",
     "desc": "ラックの吸気口と室温を追跡し、オペレーターが熱シャットダウンにつながる可能性のある状況を特定するのを支援します。",
     "img": "product/details/270-scen3.jpg"
    },
    {
     "name": "冷蔵保管と食品加工",
     "desc": "チラー、冷凍庫、加工ラインを安全な温度帯に保ち、HACCPモニタリングをサポートします。",
     "img": "product/details/270-scen5.jpg"
    },
    {
     "name": "医療および実験室のモニタリング",
     "desc": "ワクチン、血液、試薬を保管する冷蔵庫、インキュベーター、クリーンルームを監視します。",
     "img": "product/details/270-scen4.jpg"
    },
    {
     "name": "温室と畜産の環境",
     "desc": "スマート農業での作物収量と動物福祉のためにハウス温度を監視します。",
     "img": "product/details/270-scen2.jpg"
    },
    {
     "name": "産業プロセスのモニタリング",
     "desc": "生産ラインのパイプライン、ボイラー、設備の表面温度を測定します。",
     "img": "product/details/270-scen6.jpg"
    },
    {
     "name": "エネルギー施設",
     "desc": "変圧器、バッテリー室、変電所キャビネットの過熱リスクを監視します。",
     "img": "product/details/270-scen1.jpg"
    },
    {
     "name": "公共施設",
     "desc": "遊園地やその他の人通りの多い公共建物の室内環境を監視します。",
     "img": "product/details/270-scen7.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "Hシリーズ温度センサーの測定範囲はどのくらいですか？",
     "a": "標準範囲は−200 °C〜800 °Cで精度±0.5 °Cです。±0.1 °Cの精度はご要望に応じてご提供可能です。3線式プローブ接続により、電気ノイズの多いプラントでも読取値が安定します。"
    },
    {
     "q": "バッテリーはどのくらい持ちますか？",
     "a": "送信機は1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です — 実際の寿命はネットワーク状況、温度、送信頻度によって異なります。送信機は完全にバッテリー駆動で、プローブケーブルのみ必要です — 設置場所に主電源や信号ケーブルは不要です。"
    },
    {
     "q": "センサーはどのようにデータを送信しますか？",
     "a": "4GまたはNB-IoT経由でMQTTを使用してHitelecom Cloud、お客様のクラウド、またはプライベートデプロイに送信し、温度が設定済みしきい値を超えるとアラートをプッシュします。"
    },
    {
     "q": "センサーは当社の用途に合わせてカスタマイズできますか？",
     "a": "はい。プローブタイプ、プローブ長、ケーブル長、送信間隔、筐体は、HitelecomのOEM/ODMプログラムでカスタマイズ可能です。動作条件を営業にお知らせください。"
    }
   ],
   "dateModified": "2026-09-02"
  },
  "274": {
   "series": "Hシリーズ · 圧力センサー",
   "tagline": "リモート | 低消費電力 | 耐衝撃",
   "desc": "Hitelecomの圧力センサーは、継続的な精密測定と重要な圧力データの正確なクラウド送信を提供し、複雑な産業用途に対応します。",
   "heroImg": "product/details/274-hero.png",
   "pdf": "/downloads/h300-pressure-sensor-datasheet.pdf",
   "crumbCat": "圧力",
   "returnCid": "262",
   "features": [
    {
     "icon": "product/details/274-f1.png",
     "text": "±0.5 % FS（高精度カスタマイズ）"
    },
    {
     "icon": "product/details/274-f2.png",
     "text": "IP68防護等級筐体"
    },
    {
     "icon": "product/details/274-f3.png",
     "text": "リモートOTAファームウェア更新に対応します。"
    },
    {
     "icon": "product/details/274-f4.png",
     "text": "NFCアクティベーションとローカルデバイス設定に対応します。"
    },
    {
     "icon": "product/details/274-f5.png",
     "text": "長期運用向け低消費電力設計"
    },
    {
     "icon": "product/details/274-f6.png",
     "text": "無線オプション：4G LTE、NB-IoT、LoRa。"
    },
    {
     "icon": "product/details/274-f7.png",
     "text": "遠隔圧力モニタリング"
    },
    {
     "icon": "product/details/274-f8.png",
     "text": "構成可能なしきい値アラート"
    }
   ],
   "specsTitle": "技術仕様",
   "specsDesc": "組込み省エネアルゴリズムを備えた統合通信・センシング技術により、圧力センサーは延長された耐用年数と高い測定安定性を実現し、より広範なモニタリングシステムの信頼性を支えます。",
   "specs": [
    [
     "製品モデル",
     "H200/H300/H500"
    ],
    [
     "測定範囲",
     "0–1、1.6、3.5、7、10、20 MPa"
    ],
    [
     "過負荷",
     "フルスケール圧力の2倍以下"
    ],
    [
     "安定性",
     "±0.2 % FS/年"
    ],
    [
     "プロトコル",
     "MQTT"
    ],
    [
     "動作温度",
     "−20 °C〜+80 °C"
    ],
    [
     "保管温度",
     "−20 °C〜+85 °C"
    ],
    [
     "バッテリー寿命",
     "規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。"
    ],
    [
     "取付",
     "取付耳、ポールクランプ、スロットマウント（構成による）"
    ]
   ],
   "specsStructured": [
    {
     "name": "製品モデル",
     "value": "H200/H300/H500"
    },
    {
     "name": "測定範囲",
     "value": "0–1、1.6、3.5、7、10、20 MPa"
    },
    {
     "name": "過負荷",
     "value": "フルスケール圧力の2倍以下"
    },
    {
     "name": "安定性",
     "value": "±0.2 % FS/年"
    },
    {
     "name": "プロトコル",
     "value": "MQTT"
    },
    {
     "name": "動作温度",
     "value": "−20 °C〜+80 °C",
     "unitText": "摂氏度",
     "minValue": -20.0,
     "maxValue": 80.0
    },
    {
     "name": "保管温度",
     "value": "−20 °C〜+85 °C",
     "unitText": "摂氏度",
     "minValue": -20.0,
     "maxValue": 85.0
    },
    {
     "name": "バッテリー寿命",
     "value": "規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。",
     "unitText": "年",
     "minValue": 10.0
    },
    {
     "name": "取付",
     "value": "取付耳、ポールクランプ、スロットマウント（構成による）"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "適用シーン",
   "scenarios": [
    {
     "img": "product/details/274-scen1.jpg",
     "label": "化学工業"
    },
    {
     "img": "product/details/274-scen2.jpg",
     "label": "半導体産業"
    },
    {
     "img": "product/details/274-scen3.jpg",
     "label": "スマートビル"
    },
    {
     "img": "product/details/274-scen4.jpg",
     "label": "スマート製造"
    },
    {
     "img": "product/details/274-scen5.jpg",
     "label": "科学研究"
    },
    {
     "img": "product/details/274-scen6.jpg",
     "label": "スマート農業"
    },
    {
     "img": "product/details/274-scen7.jpg",
     "label": "タワーモニタリング"
    },
    {
     "img": "product/details/274-scen8.jpg",
     "label": "地質探査"
    }
   ],
   "related": [
    "270",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285",
    "276",
    "275"
   ],
   "summary": "HitelecomのHシリーズ圧力センサーは、パイプライン、ポンプ、タンク向けのワイヤレス産業用圧力送信機です。利用可能なフルスケール範囲は1、1.6、3.5、7、10、20 MPaで、±0.2 % FS/年の安定性と2×フルスケール過負荷耐性を持ち、4GまたはNB-IoT経由で送信します。バッテリーは規定の試験条件下で1時間の送信間隔で10年以上の寿命を想定した設計です。",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "給水およびポンプ場",
     "desc": "パイプライン圧力を監視し、破裂、漏洩、ポンプ故障を早期に検出します。",
     "img": "product/details/281-scen1.jpg"
    },
    {
     "name": "化学プラント",
     "desc": "有線送信機の改修が高コストなプロセスラインの圧力を追跡します。",
     "img": "product/details/274-scen1.jpg"
    },
    {
     "name": "ビル給水システム",
     "desc": "高層の二次給水におけるブースターポンプと立管の圧力を監視します。",
     "img": "product/details/274-scen3.jpg"
    },
    {
     "name": "半導体工場",
     "desc": "特殊ガスおよびユーティリティラインを安定した再現性のある読取値で監視します。",
     "img": "product/details/274-scen2.jpg"
    },
    {
     "name": "産業用油圧",
     "desc": "油圧プレスおよび設備の圧力曲線を追跡し、状態基準保全をサポートします。",
     "img": "product/details/274-scen4.jpg"
    },
    {
     "name": "タンクおよび容器のモニタリング",
     "desc": "在庫および安全制御のためにヘッド圧力とレベルを組み合わせます。",
     "img": "product/details/287-scen3.jpg"
    },
    {
     "name": "地質・探査サイト",
     "desc": "ケーブル配線なしで遠隔ボアホールでのバッテリー駆動圧力記録。",
     "img": "product/details/274-scen8.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "どのような圧力範囲が利用可能ですか？",
     "a": "標準範囲は0-1 MPa、1.6 MPa、3.5 MPa、7 MPa、10 MPa、20 MPaです。センサーは2×フルスケール過負荷に耐え、長期安定性は±0.2 % FS/年です（測定精度とは別の指標）。"
    },
    {
     "q": "ガスと液体の両方の圧力を測定できますか？",
     "a": "標準版は、プロセス接続と互換性のある一般的なガスおよび液体媒体に適しています。腐食性または特殊な媒体については、接触部材料の確認のためHitelecomにお問い合わせください。"
    },
    {
     "q": "どのように読取値を送信しますか？",
     "a": "4GまたはNB-IoT経由でMQTTによりHitelecom Cloud、お客様のクラウド、またはプライベートプラットフォームに読取値を送信します。しきい値とアラートは構成可能です。"
    },
    {
     "q": "現場でどのような電源が必要ですか？",
     "a": "不要です。内蔵バッテリーは規定の試験条件下で1時間の送信間隔で10年以上の寿命を想定した設計です — 実際の寿命はネットワークカバレッジ、温度、送信頻度によって異なります — そのため、ケーブル配線が困難な場所にも送信機を設置できます。"
    }
   ],
   "dateModified": "2026-09-02"
  },
  "280": {
   "series": "Hシリーズ · 土壌センサー",
   "tagline": "低消費電力 | 精度 | マルチパラメータ",
   "desc": "Hitelecomの土壌センサーは、マルチパラメータモニタリング、スケジュールされたデータ同期、精密測定を統合し、多様な農業用途の包括的な土壌品質評価と継続的モニタリングをサポートします。",
   "heroImg": "product/details/280-hero.png",
   "pdf": "/downloads/h300-soil-sensor-datasheet.pdf",
   "crumbCat": "土壌",
   "returnCid": "269",
   "features": [
    {
     "icon": "product/details/280-f1.png",
     "text": "窒素・リン・カリウムなどの主要養分をモニタリング"
    },
    {
     "icon": "product/details/280-f2.png",
     "text": "IP68防護等級筐体"
    },
    {
     "icon": "product/details/280-f3.png",
     "text": "灌漑管理のための土壌水分モニタリング"
    },
    {
     "icon": "product/details/280-f4.png",
     "text": "NFCアクティベーションとローカルデバイス設定に対応します。"
    },
    {
     "icon": "product/details/280-f5.png",
     "text": "リモートOTAファームウェア更新に対応します。"
    },
    {
     "icon": "product/details/280-f6.png",
     "text": "無線オプション：4G LTE、NB-IoT、LoRa。"
    },
    {
     "icon": "product/details/280-f7.png",
     "text": "遠隔土壌モニタリング"
    },
    {
     "icon": "product/details/280-f8.png",
     "text": "構成可能なしきい値アラート"
    }
   ],
   "specsTitle": "技術仕様",
   "specsDesc": "先進的なインテリジェントアルゴリズムと継続的なデータ記録、および極端な条件での適応性を活用し、土壌状況を継続的に追跡・精密分析し、複雑な農業課題に効果的に対処し、灌漑・施肥・収量管理の意思決定を強化します。",
   "specs": [
    [
     "製品モデル",
     "H200/H300/H500"
    ],
    [
     "伝導率",
     "0〜1,000 µS/cm（±3 %）"
    ],
    [
     "pH",
     "0〜14（分解能0.01）"
    ],
    [
     "土壌水分",
     "0〜100 %（±3 %；永久凍土層には不適）"
    ],
    [
     "NPK",
     "0〜1,999 mg/kg（±2 % FS）"
    ],
    [
     "プロトコル",
     "MQTT"
    ],
    [
     "周波数帯",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "バッテリー寿命",
     "規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。"
    ],
    [
     "取付",
     "取付耳、ポールクランプ、スロットマウント（構成による）"
    ]
   ],
   "specsStructured": [
    {
     "name": "製品モデル",
     "value": "H200/H300/H500"
    },
    {
     "name": "伝導率",
     "value": "0〜1,000 µS/cm（±3 %）",
     "unitText": "マイクロジーメンス毎センチメートル",
     "minValue": 0.0,
     "maxValue": 1000.0
    },
    {
     "name": "pH",
     "value": "0〜14（分解能0.01）"
    },
    {
     "name": "土壌水分",
     "value": "0〜100 %（±3 %；永久凍土層には不適）",
     "unitText": "パーセント",
     "minValue": 0.0,
     "maxValue": 100.0
    },
    {
     "name": "NPK",
     "value": "0〜1,999 mg/kg（±2 % FS）",
     "unitText": "ミリグラム毎キログラム",
     "minValue": 0.0,
     "maxValue": 1999.0
    },
    {
     "name": "プロトコル",
     "value": "MQTT"
    },
    {
     "name": "周波数帯",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "バッテリー寿命",
     "value": "規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。",
     "unitText": "年",
     "minValue": 10.0
    },
    {
     "name": "取付",
     "value": "取付耳、ポールクランプ、スロットマウント（構成による）"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "適用シーン",
   "scenarios": [
    {
     "img": "product/details/280-scen1.jpg",
     "label": "農地"
    },
    {
     "img": "product/details/280-scen2.jpg",
     "label": "温室"
    },
    {
     "img": "product/details/280-scen3.jpg",
     "label": "都市公園"
    },
    {
     "img": "product/details/280-scen4.jpg",
     "label": "土壌汚染"
    },
    {
     "img": "product/details/280-scen5.jpg",
     "label": "森林健全性"
    },
    {
     "img": "product/details/280-scen6.jpg",
     "label": "実験室"
    }
   ],
   "related": [
    "270",
    "274",
    "281",
    "282",
    "283",
    "284",
    "285",
    "276",
    "275"
   ],
   "summary": "HitelecomのHシリーズ土壌センサーは、農業・土地モニタリング用のマルチパラメータワイヤレスプローブです。1台のデバイスで土壌水分、温度、伝導率（EC）、pH、NPK養分を測定し、4GまたはNB-IoT経由で送信します。規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計で、長期埋設向けのIP68筐体を備えています。",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "農地の灌漑スケジューリング",
     "desc": "土壌水分の傾向は、栽培者に正確な灌漑のタイミングと量を示し、水の浪費を削減します。",
     "img": "product/details/280-scen1.jpg"
    },
    {
     "name": "温室のフェルティゲーション",
     "desc": "ECおよびNPKの読取値が施肥量を導き、養分が流出ではなく根圏に留まるようにします。",
     "img": "product/details/280-scen2.jpg"
    },
    {
     "name": "都市公園と造園",
     "desc": "市の緑化管理チーム向けに芝生と樹木ピットの土壌水分を監視します。",
     "img": "product/details/280-scen3.jpg"
    },
    {
     "name": "土壌汚染と修復の追跡",
     "desc": "継続的なpHおよびEC記録が汚染プルームを検出し、修復進捗を検証します。",
     "img": "product/details/280-scen4.jpg"
    },
    {
     "name": "森林と草原の健全性",
     "desc": "長期埋設プローブが、目に見える樹冠の衰退に先立って土壌干ばつストレスを追跡します。",
     "img": "product/details/280-scen5.jpg"
    },
    {
     "name": "研究およびフィールド試験",
     "desc": "マルチパラメーター時系列が農学研究と品種試験をサポートします。",
     "img": "product/details/280-scen6.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "Hシリーズはどのような土壌パラメーターを測定しますか？",
     "a": "土壌水分（0〜100 %、±3 %）、温度、伝導率（0〜1,000 µS/cm、±3 %）、pH（0〜14、分解能0.01）、NPK養分（0〜1,999 mg/kg、±2 % FS）— すべて1つのプローブで。"
    },
    {
     "q": "プローブは年間を通じて屋外に埋設したままにできますか？",
     "a": "はい。IP68筐体は長期埋設向けに設計されており、バッテリーは規定の試験条件下で1時間の送信間隔で10年以上の寿命を想定した設計で、季節間の定期保守を削減します。"
    },
    {
     "q": "土壌データはどのように送信されますか？",
     "a": "4GまたはNB-IoT経由でMQTTアップリンクによりHitelecom Cloudまたはプライベートプラットフォームに接続します。任意のパラメーターのしきい値でアラートが発動します。"
    },
    {
     "q": "アルカリ性または塩性土壌に適していますか？",
     "a": "ECチャンネルは0〜1,000 µS/cmをカバーしています。塩性土壌または特殊媒体については、必要なEC範囲をHitelecomにご確認ください。"
    }
   ],
   "dateModified": "2026-09-02"
  },
  "281": {
   "series": "Hシリーズ · 投入式レベルセンサー",
   "tagline": "精度 | 測定範囲 | 超低消費電力",
   "desc": "Hitelecomのレベルセンサーは、精密なモニタリング、タイムリーなフィードバック、高い安定性を提供し、さまざまな産業環境で正確かつ継続的な液位データを提供します。",
   "heroImg": "product/details/281-hero.png",
   "pdf": "/downloads/liquid-level-sensor-datasheet.pdf",
   "crumbCat": "レベル",
   "returnCid": "268",
   "features": [
    {
     "icon": "product/details/281-f1.png",
     "text": "±0.5 % FS（高精度カスタマイズ）"
    },
    {
     "icon": "product/details/281-f2.png",
     "text": "IP68防護等級筐体"
    },
    {
     "icon": "product/details/281-f3.png",
     "text": "広測定範囲：0〜200 m（カスタマイズ可能）"
    },
    {
     "icon": "product/details/281-f4.png",
     "text": "NFCアクティベーションとローカルデバイス設定に対応します。"
    },
    {
     "icon": "product/details/281-f5.png",
     "text": "リモートOTAファームウェア更新に対応します。"
    },
    {
     "icon": "product/details/281-f6.png",
     "text": "無線オプション：4G LTE、NB-IoT、LoRa。"
    },
    {
     "icon": "product/details/281-f7.png",
     "text": "遠隔レベルモニタリング"
    },
    {
     "icon": "product/details/281-f8.png",
     "text": "構成可能なしきい値アラート"
    }
   ],
   "specsTitle": "技術仕様",
   "specsDesc": "統合センシング技術、リアルタイム通信、省エネ設計が、水処理から化学生産ラインまでの産業用途で正確かつ継続的な液位データを支えます。",
   "specs": [
    [
     "製品モデル",
     "H200/H300/H500"
    ],
    [
     "測定範囲",
     "0〜200 m（カスタマイズ可能）"
    ],
    [
     "精度",
     "±0.5 % FS（より高精度のカスタマイズ可能）"
    ],
    [
     "安定性",
     "±0.2 % FS/年"
    ],
    [
     "プロトコル",
     "MQTT"
    ],
    [
     "動作温度",
     "−20 °C〜+70 °C"
    ],
    [
     "保管温度",
     "−20 °C〜+80 °C"
    ],
    [
     "バッテリー寿命",
     "規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。"
    ],
    [
     "取付",
     "取付耳、ポールクランプ、スロットマウント（構成による）"
    ]
   ],
   "specsStructured": [
    {
     "name": "製品モデル",
     "value": "H200/H300/H500"
    },
    {
     "name": "測定範囲",
     "value": "0〜200 m（カスタマイズ可能）"
    },
    {
     "name": "精度",
     "value": "±0.5 % FS（より高精度のカスタマイズ可能）",
     "unitText": "パーセント"
    },
    {
     "name": "安定性",
     "value": "±0.2 % FS/年"
    },
    {
     "name": "プロトコル",
     "value": "MQTT"
    },
    {
     "name": "動作温度",
     "value": "−20 °C〜+70 °C",
     "unitText": "摂氏度",
     "minValue": -20.0,
     "maxValue": 70.0
    },
    {
     "name": "保管温度",
     "value": "−20 °C〜+80 °C",
     "unitText": "摂氏度",
     "minValue": -20.0,
     "maxValue": 80.0
    },
    {
     "name": "バッテリー寿命",
     "value": "規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。",
     "unitText": "年",
     "minValue": 10.0
    },
    {
     "name": "取付",
     "value": "取付耳、ポールクランプ、スロットマウント（構成による）"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "適用シーン",
   "scenarios": [
    {
     "img": "product/details/281-scen1.jpg",
     "label": "給水と排水"
    },
    {
     "img": "product/details/281-scen2.jpg",
     "label": "海洋および船上用途"
    },
    {
     "img": "product/details/281-scen3.jpg",
     "label": "水文モニタリング"
    },
    {
     "img": "product/details/281-scen4.jpg",
     "label": "冶金"
    },
    {
     "img": "product/details/281-scen5.jpg",
     "label": "病院排水"
    },
    {
     "img": "product/details/281-scen6.jpg",
     "label": "発電所"
    },
    {
     "img": "product/details/281-scen7.jpg",
     "label": "鉱業"
    },
    {
     "img": "product/details/281-scen8.jpg",
     "label": "スマートエネルギー"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "282",
    "283",
    "284",
    "285",
    "276",
    "275"
   ],
   "summary": "HitelecomのHシリーズレベルセンサーは、貯水池、河川、タンク、井戸向けのワイヤレス液位送信機です。0〜200 m（カスタマイズ可能）をカバーし、精度±0.5 % FS、安定性±0.2 % FS/年で、規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計で、4GまたはNB-IoT経由で送信します。",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "貯水池とダム",
     "desc": "洪水制御と派遣判断のための継続的な水位記録。",
     "img": "solution/67-scen-0.jpg"
    },
    {
     "name": "河川および水文ステーション",
     "desc": "主電源なしで河川および水路沿いの遠隔水位モニタリング。",
     "img": "product/details/281-scen3.jpg"
    },
    {
     "name": "給水と排水",
     "desc": "公益運用向けのタンク、清水井戸、ネットワーク貯水池のレベル。",
     "img": "product/details/281-scen1.jpg"
    },
    {
     "name": "産業用タンク",
     "desc": "発電所および冶金プロセスタンクの在庫レベル。",
     "img": "product/details/287-scen3.jpg"
    },
    {
     "name": "鉱山の水管理",
     "desc": "鉱山安全のためにサンプおよび立坑の水位を監視します。",
     "img": "product/details/281-scen7.jpg"
    },
    {
     "name": "海洋および船舶の用途",
     "desc": "バッテリー駆動の簡便さによるバラストおよびビルジレベルのモニタリング。",
     "img": "product/details/281-scen2.jpg"
    },
    {
     "name": "医療排水",
     "desc": "病院排水ステーションの集水タンクレベルを追跡します。",
     "img": "product/details/281-scen5.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "Hシリーズはどのくらいのレベル範囲をカバーしますか？",
     "a": "標準で0〜200 m、それ以上もカスタマイズ可能です。精度は±0.5 % FSで、年間安定性±0.2 % FSで長期無人監視に対応します。"
    },
    {
     "q": "遠隔地ではセンサーはどのように給電されますか？",
     "a": "内蔵バッテリーで — 規定の試験条件下で1時間の送信間隔で10年以上の寿命を想定した設計で — 適切な展開では、貯水池や河川ステーションにソーラーパネルやケーブル配線が不要な場合があります。"
    },
    {
     "q": "レベルデータはどのように取得しますか？",
     "a": "送信機は4GまたはNB-IoT経由でMQTTによりHitelecom Cloudまたはお客様のプラットフォームに送信し、高低レベルアラームを備えています。"
    },
    {
     "q": "当社のタンクや井戸に合わせてカスタマイズできますか？",
     "a": "はい。範囲、プローブケーブル長、取り付けは設置に合わせて適応可能です。図面または現場写真をHitelecom営業と共有して、適合する構成をご確認ください。"
    }
   ],
   "dateModified": "2026-09-02"
  },
  "282": {
   "series": "Hシリーズ · 傾斜センサー",
   "tagline": "精度 | 多軸 | 超低消費電力",
   "desc": "Hitelecomの傾斜センサーは超高精度センシング素子を統合し、遠隔モニタリング、リアルタイムアラート、高精度測定を特徴とし、複雑な産業用途で正確かつタイムリーな傾斜データを提供します。",
   "heroImg": "product/details/282-hero.png",
   "pdf": "/downloads/h310-ts180c-tilt-sensor-datasheet.pdf",
   "crumbCat": "傾斜モニタリング",
   "returnCid": "267",
   "features": [
    {
     "icon": "product/details/282-f1.png",
     "text": "精度：±0.005°（カスタマイズ可能）"
    },
    {
     "icon": "product/details/282-f2.png",
     "text": "IP68防護等級筐体"
    },
    {
     "icon": "product/details/282-f3.png",
     "text": "分解能：0.001°"
    },
    {
     "icon": "product/details/282-f4.png",
     "text": "NFCアクティベーションとローカルデバイス設定に対応します。"
    },
    {
     "icon": "product/details/282-f5.png",
     "text": "リモートOTAファームウェア更新に対応します。"
    },
    {
     "icon": "product/details/282-f6.png",
     "text": "無線オプション：4G LTE、NB-IoT、LoRa。"
    },
    {
     "icon": "product/details/282-f7.png",
     "text": "遠隔傾斜モニタリング"
    },
    {
     "icon": "product/details/282-f8.png",
     "text": "構成可能なしきい値アラート"
    }
   ],
   "specsTitle": "技術仕様",
   "specsDesc": "高感度センシング素子、リアルタイムデータ同期、堅牢で耐久性のある設計が、精密で信頼性の高い傾斜モニタリングを支えます。規定の試験条件下で1時間の送信間隔で最長10年の動作を想定し、定期保守を削減します。",
   "specs": [
    [
     "製品モデル",
     "H200/H300/H500"
    ],
    [
     "測定範囲",
     "X軸 · Y軸（3軸までカスタマイズ可能）"
    ],
    [
     "精度",
     "±0.005°（カスタマイズ可能）"
    ],
    [
     "分解能",
     "0.001°"
    ],
    [
     "プロトコル",
     "MQTT"
    ],
    [
     "動作温度",
     "−20 °C〜+70 °C"
    ],
    [
     "保管温度",
     "−20 °C〜+80 °C"
    ],
    [
     "バッテリー寿命",
     "規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。"
    ],
    [
     "取付",
     "取付耳、ポールクランプ、スロットマウント（構成による）"
    ]
   ],
   "certImgs": [],
   "scenariosHeading": "適用シーン",
   "scenarios": [
    {
     "img": "product/details/282-scen1.jpg",
     "label": "橋梁の傾斜と変形"
    },
    {
     "img": "product/details/282-scen2.jpg",
     "label": "倉庫ラック"
    },
    {
     "img": "product/details/282-scen3.jpg",
     "label": "タワー傾斜"
    },
    {
     "img": "product/details/282-scen4.jpg",
     "label": "リスクのある建物"
    },
    {
     "img": "product/details/282-scen5.jpg",
     "label": "太陽追跡システム"
    },
    {
     "img": "product/details/282-scen6.jpg",
     "label": "エネルギーインフラの傾斜モニタリング"
    },
    {
     "img": "product/details/282-scen7.jpg",
     "label": "建物の傾斜"
    },
    {
     "img": "product/details/282-scen8.jpg",
     "label": "遊具および公園構造物のモニタリング"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "283",
    "284",
    "285",
    "276",
    "275"
   ],
   "summary": "HitelecomのHシリーズ傾斜センサーは、構造物健全性モニタリング用のワイヤレスIoT傾斜計です。X軸・Y軸の傾斜（3軸オプション）を精度±0.005°・分解能0.001°で測定し、規定の試験条件下で毎時送信で10年以上のバッテリー寿命を想定した設計で、長期屋外展開向けのIP68等級を備えています。コネクティビティは4G、NB-IoT、LoRaです。",
   "sku": "H200/H300/H500",
   "specsStructured": [
    {
     "name": "製品モデル",
     "value": "H200 / H300 / H500"
    },
    {
     "name": "測定軸",
     "value": "X軸 · Y軸（3軸までカスタマイズ可能）"
    },
    {
     "name": "精度",
     "value": "±0.005°",
     "unitText": "度"
    },
    {
     "name": "分解能",
     "value": "0.001°",
     "unitText": "度"
    },
    {
     "name": "プロトコル",
     "value": "MQTT"
    },
    {
     "name": "ワイヤレス",
     "value": "4G / NB-IoT / LoRa"
    },
    {
     "name": "動作温度",
     "value": "−20 °C〜70 °C",
     "unitText": "摂氏度",
     "minValue": -20,
     "maxValue": 70
    },
    {
     "name": "保管温度",
     "value": "−20 °C〜80 °C",
     "unitText": "摂氏度",
     "minValue": -20,
     "maxValue": 80
    },
    {
     "name": "バッテリー寿命",
     "value": "規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。"
    },
    {
     "name": "防護等級",
     "value": "IP68"
    },
    {
     "name": "取付",
     "value": "取付耳 · ポールクランプ · スロットマウント"
    },
    {
     "name": "構成",
     "value": "NFCアクティベーション；OTAファームウェアアップグレード"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "applications": [
    {
     "name": "斜面安定性モニタリング",
     "desc": "高速道路、露天掘り鉱山、切土堤防での異常な斜面移動の早期特定を支援します。",
     "img": "product/details/281-scen7.jpg"
    },
    {
     "name": "鉄道インフラ",
     "desc": "鉄道路線沿いの軌道盤沈下、擁壁、架線柱の傾斜を監視します。"
    },
    {
     "name": "トンネルモニタリング",
     "desc": "トンネル建設中および建設後のライニング収束とセグメント回転を追跡します。"
    },
    {
     "name": "橋梁変形",
     "desc": "橋脚傾斜、桁回転、支承変位を測定し、橋梁健全性モニタリングを行います。",
     "img": "product/details/282-scen1.jpg"
    },
    {
     "name": "地下鉄構造物",
     "desc": "隣接する掘削工事の近くで、ステーションボックスのたわみとシールドトンネルの変形を監視します。"
    },
    {
     "name": "建設現場と仮設構造物",
     "desc": "足場、タワークレーン、型枠、現場小屋の安全でない傾斜を監視します。"
    },
    {
     "name": "防潮堤とダム",
     "desc": "堤防ダム、海堤、貯水池斜面の継続的な傾斜モニタリング。",
     "img": "solution/67-scen-0.jpg"
    },
    {
     "name": "歴史的建造物と古塔",
     "desc": "穿孔が許可されない保護歴史的構造物の非侵襲的傾斜追跡。",
     "img": "product/details/282-scen4.jpg"
    },
    {
     "name": "樹木の傾斜モニタリング",
     "desc": "台風シーズン前に都市樹木の根の障害と傾斜の進行を検出します。",
     "img": "product/details/280-scen3.jpg"
    },
    {
     "name": "街路灯ポール",
     "desc": "車両衝撃や基礎緩みによるポール傾斜を、市の照明資産全体で検出します。"
    },
    {
     "name": "送電塔",
     "desc": "送電線の基礎沈下と塔の傾斜を監視します。",
     "img": "product/details/282-scen3.jpg"
    },
    {
     "name": "通信塔",
     "desc": "通信インフラのマスト鉛直度と支線塔のアライメントを追跡します。"
    },
    {
     "name": "倉庫ラック",
     "desc": "フォークリフト衝撃によるラック柱のたわみを検出し、損傷が拡大する前の早期介入を支援します。",
     "img": "product/details/282-scen2.jpg"
    }
   ],
   "faqs": [
    {
     "q": "Hシリーズ傾斜センサーはどのような構造物を監視できますか？",
     "a": "Hシリーズ傾斜センサーは、斜面・堤防、鉄道インフラ、トンネル、橋梁、地下鉄構造物、建設現場・仮設物、防潮堤・ダム、歴史的建造物・古塔、都市樹木、街路灯ポール、送電塔、通信塔、倉庫ラックに展開されます。IP68等級と長いバッテリー寿命は長期屋外設置に適しています。バッテリー寿命は送信間隔、ネットワークカバレッジ、現場条件によって異なります。"
    },
    {
     "q": "Hシリーズ傾斜センサーの精度はどのくらいですか？",
     "a": "標準精度は±0.005°、X軸・Y軸で分解能0.001°です。3軸構成はご要望に応じてご用意でき、より厳しい公差を必要とする用途向けに精度をカスタマイズできます。"
    },
    {
     "q": "バッテリーはどのくらい持ちますか？",
     "a": "規定の試験条件下で1時間の送信間隔で10年以上を想定した設計です。バッテリー寿命は送信頻度に比例し、より頻繁な送信は寿命を縮めます。ほとんどの構成は主電源やソーラーパネルなしでバッテリーで動作します — ご構成の電源オプションをご確認ください。"
    },
    {
     "q": "どの無線技術を選ぶべきですか — 4G、NB-IoT、それともLoRa？",
     "a": "セルラーカバレッジが信頼でき、より高いデータレートやOTAファームウェア更新が必要な場合は4Gをお選びください。NB-IoTは、トンネルや地下室など、地域のオペレーターが十分なカバレッジを提供する屋内または地下サイトに適しています。1つのサイトにセンサーを高密度に展開し、プライベートゲートウェイを使用し、デバイスごとのSIM費用がない場合はLoRaをお選びください。"
    },
    {
     "q": "文化遺産の構造物に穿孔なしで設置できますか？",
     "a": "はい。センサーは取付耳、ポールクランプ、スロットマウントに対応します。保護構造物では、クランプおよび粘着取付で建物の躯体への穿孔を回避できます。現場固有の取付ガイダンスはHitelecomにお問い合わせください。"
    }
   ],
   "dateModified": "2026-09-02"
  },
  "283": {
   "series": "Hシリーズ · レーダー距離センサー",
   "tagline": "低消費電力 | 精度 | ミリメートル級",
   "desc": "Hitelecomの距離センサーは、ミリメートル級精度、スケジュールされたデータ収集、高い耐干渉性を特徴とし、複雑な環境で正確な距離測定とタイムリーなクラウド更新を提供します。",
   "heroImg": "product/details/283-hero.png",
   "pdf": "/downloads/h310-mw012-radar-distance-sensor-datasheet.pdf",
   "crumbCat": "レーダー距離",
   "returnCid": "266",
   "features": [
    {
     "icon": "product/details/283-f1.png",
     "text": "精度：±1 mm（カスタマイズ可能）"
    },
    {
     "icon": "product/details/283-f2.png",
     "text": "IP68防護等級筐体"
    },
    {
     "icon": "product/details/283-f3.png",
     "text": "広測定範囲：0.3〜50 m（カスタマイズ可能）"
    },
    {
     "icon": "product/details/283-f4.png",
     "text": "NFCアクティベーションとローカルデバイス設定に対応します。"
    },
    {
     "icon": "product/details/283-f5.png",
     "text": "リモートOTAファームウェア更新に対応します。"
    },
    {
     "icon": "product/details/283-f6.png",
     "text": "無線オプション：4G LTE、NB-IoT、LoRa。"
    },
    {
     "icon": "product/details/283-f7.png",
     "text": "遠隔距離モニタリング"
    },
    {
     "icon": "product/details/283-f8.png",
     "text": "構成可能なしきい値アラート"
    }
   ],
   "specsTitle": "技術仕様",
   "specsDesc": "高精度レーダー距離測定、先進的な低消費電力プロセッサー、最適化された組込みアルゴリズムにより、規定の試験条件下で1時間の送信間隔で最長10年の設計寿命を実現し、定期保守を削減します。",
   "specs": [
    [
     "製品モデル",
     "H200/H300/H500"
    ],
    [
     "測定範囲",
     "0.3〜50 m（カスタマイズ可能）"
    ],
    [
     "精度",
     "±1 mm（カスタマイズ可能）"
    ],
    [
     "分解能",
     "1 mm"
    ],
    [
     "プロトコル",
     "MQTT"
    ],
    [
     "動作温度",
     "−20 °C〜+70 °C"
    ],
    [
     "保管温度",
     "−20 °C〜+80 °C"
    ],
    [
     "バッテリー寿命",
     "規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。"
    ],
    [
     "取付",
     "取付耳、ポールクランプ、スロットマウント（構成による）"
    ]
   ],
   "specsStructured": [
    {
     "name": "製品モデル",
     "value": "H200/H300/H500"
    },
    {
     "name": "測定範囲",
     "value": "0.3〜50 m（カスタマイズ可能）",
     "minValue": 0.3,
     "maxValue": 50.0
    },
    {
     "name": "精度",
     "value": "±1 mm（カスタマイズ可能）",
     "unitText": "ミリメートル"
    },
    {
     "name": "分解能",
     "value": "1 mm",
     "unitText": "ミリメートル"
    },
    {
     "name": "プロトコル",
     "value": "MQTT"
    },
    {
     "name": "動作温度",
     "value": "−20 °C〜+70 °C",
     "unitText": "摂氏度",
     "minValue": -20.0,
     "maxValue": 70.0
    },
    {
     "name": "保管温度",
     "value": "−20 °C〜+80 °C",
     "unitText": "摂氏度",
     "minValue": -20.0,
     "maxValue": 80.0
    },
    {
     "name": "バッテリー寿命",
     "value": "規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。",
     "unitText": "年",
     "minValue": 10.0
    },
    {
     "name": "取付",
     "value": "取付耳、ポールクランプ、スロットマウント（構成による）"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "適用シーン",
   "scenarios": [
    {
     "img": "product/details/283-scen1.jpg",
     "label": "マンホールカバー"
    },
    {
     "img": "product/details/283-scen2.jpg",
     "label": "穀物サイロの高さ"
    },
    {
     "img": "product/details/283-scen3.jpg",
     "label": "炭鉱"
    },
    {
     "img": "product/details/283-scen4.jpg",
     "label": "浄水場"
    },
    {
     "img": "product/details/283-scen5.jpg",
     "label": "化学プラント"
    },
    {
     "img": "product/details/283-scen6.jpg",
     "label": "スマート製造"
    },
    {
     "img": "product/details/283-scen7.jpg",
     "label": "スマートビル"
    },
    {
     "img": "product/details/283-scen8.jpg",
     "label": "スマートエネルギー"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "284",
    "285",
    "276",
    "275"
   ],
   "summary": "HitelecomのHシリーズ測距センサーは、ミリメートル級精度のワイヤレスレーダー距離センサーです。0.3〜50 mを精度±1 mm・分解能1 mmで測定し、過酷な産業サイトでの干渉に耐え、4GまたはNB-IoT経由で報告します。規定の試験条件下で1時間の送信間隔で10年以上の寿命を想定したバッテリーを備えています。",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "マンホールカバーのモニタリング",
     "desc": "市の安全のためにカバーの変位と異常な距離読取値を検出します。",
     "img": "product/details/283-scen1.jpg"
    },
    {
     "name": "穀物サイロのレベル",
     "desc": "穀物サイロの充填レベルを計算するために材料表面距離を測定します。",
     "img": "product/details/283-scen2.jpg"
    },
    {
     "name": "炭鉱バンカー",
     "desc": "粉塵・高湿の地下条件での石炭バンカーの充填高を監視します。",
     "img": "product/details/283-scen3.jpg"
    },
    {
     "name": "給水および排水プラント",
     "desc": "レベル制御のための開放水路およびタンク距離測定。",
     "img": "product/details/283-scen4.jpg"
    },
    {
     "name": "化学プラントの在庫",
     "desc": "腐食性または密封タンク上の非接触距離測定。",
     "img": "product/details/283-scen5.jpg"
    },
    {
     "name": "スマートビルおよび物流",
     "desc": "施設内の占有、ドック、パレット位置の距離センシング。",
     "img": "product/details/283-scen7.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "どのような距離範囲と精度を提供しますか？",
     "a": "0.3〜50 mの測定範囲（カスタマイズ可能）、精度±1 mm、分解能1 mmを提供し — 距離によるレベル測定と変位モニタリングに適しています。"
    },
    {
     "q": "粉塵や湿度は測定に影響しますか？",
     "a": "レーダーベースの測定は、石炭バンカーやマンホールなどの粉塵・高湿サイトでも測定性能を維持するよう設計されています。IP68筐体がデバイス自体を保護します。"
    },
    {
     "q": "どのように給電・接続されますか？",
     "a": "内蔵バッテリーを使用し、規定の試験条件下で1時間の送信間隔で10年以上の寿命を想定した設計で、4GまたはNB-IoTアップリンクでMQTTによりHitelecom Cloudまたはプライベートプラットフォームに接続します。"
    },
    {
     "q": "測定範囲は50 mを超えて延長できますか？",
     "a": "はい、範囲と取付はカスタマイズ可能です。対象距離と媒体をHitelecomにお知らせいただければ、構成案をご提案します。"
    }
   ],
   "dateModified": "2026-09-02"
  },
  "284": {
   "series": "Hシリーズ · 振動センサー",
   "tagline": "精度 | 測定範囲 | 超低消費電力",
   "desc": "Hitelecomの振動センサーは、インダストリー4.0環境で機械設備の振動を監視・分析し、設備健全性管理と状態基準保全を支えるデータを提供し、予定外のダウンタイム削減に貢献します。",
   "heroImg": "product/details/284-hero.png",
   "pdf": "/downloads/vibration-sensor-datasheet.pdf",
   "crumbCat": "振動モニタリング",
   "returnCid": "271",
   "features": [
    {
     "icon": "product/details/284-f1.png",
     "text": "振動速度：0〜100 mm/s（カスタマイズ可能）"
    },
    {
     "icon": "product/details/284-f2.png",
     "text": "IP68防護等級筐体"
    },
    {
     "icon": "product/details/284-f3.png",
     "text": "変位振幅 0〜1,000 µm（カスタマイズ可能）"
    },
    {
     "icon": "product/details/284-f4.png",
     "text": "NFCアクティベーションとローカルデバイス設定に対応します。"
    },
    {
     "icon": "product/details/284-f5.png",
     "text": "リモートOTAファームウェア更新に対応します。"
    },
    {
     "icon": "product/details/284-f6.png",
     "text": "無線オプション：4G LTE、NB-IoT、LoRa。"
    },
    {
     "icon": "product/details/284-f7.png",
     "text": "遠隔振動モニタリング"
    },
    {
     "icon": "product/details/284-f8.png",
     "text": "構成可能なしきい値アラート"
    }
   ],
   "specsTitle": "技術仕様",
   "specsDesc": "低消費電力プロセッサーとアルゴリズム最適化により、規定の試験条件下で1時間の送信間隔で最長10年の設計寿命を実現し、各測定サイクルでのエネルギー使用を最小化します。",
   "specs": [
    [
     "製品モデル",
     "H200/H300/H500"
    ],
    [
     "振動速度",
     "0〜100 mm/s（カスタマイズ可能）"
    ],
    [
     "変位振幅",
     "0〜1,000 µm（カスタマイズ可能）"
    ],
    [
     "精度",
     "±1 %（80 Hzキャリブレーション）"
    ],
    [
     "プロトコル",
     "MQTT"
    ],
    [
     "動作温度",
     "−20 °C〜+70 °C"
    ],
    [
     "保管温度",
     "−20 °C〜+80 °C"
    ],
    [
     "バッテリー寿命",
     "規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。"
    ],
    [
     "取付",
     "取付耳、ポールクランプ、スロットマウント（構成による）"
    ]
   ],
   "specsStructured": [
    {
     "name": "製品モデル",
     "value": "H200/H300/H500"
    },
    {
     "name": "振動速度",
     "value": "0〜100 mm/s（カスタマイズ可能）"
    },
    {
     "name": "変位振幅",
     "value": "0〜1,000 µm（カスタマイズ可能）"
    },
    {
     "name": "精度",
     "value": "±1 %（80 Hzキャリブレーション）",
     "unitText": "パーセント"
    },
    {
     "name": "プロトコル",
     "value": "MQTT"
    },
    {
     "name": "動作温度",
     "value": "−20 °C〜+70 °C",
     "unitText": "摂氏度",
     "minValue": -20.0,
     "maxValue": 70.0
    },
    {
     "name": "保管温度",
     "value": "−20 °C〜+80 °C",
     "unitText": "摂氏度",
     "minValue": -20.0,
     "maxValue": 80.0
    },
    {
     "name": "バッテリー寿命",
     "value": "規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。",
     "unitText": "年",
     "minValue": 10.0
    },
    {
     "name": "取付",
     "value": "取付耳、ポールクランプ、スロットマウント（構成による）"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "適用シーン",
   "scenarios": [
    {
     "img": "product/details/284-scen1.jpg",
     "label": "半導体"
    },
    {
     "img": "product/details/284-scen2.jpg",
     "label": "産業機器"
    },
    {
     "img": "product/details/284-scen3.jpg",
     "label": "港"
    },
    {
     "img": "product/details/284-scen4.jpg",
     "label": "スマートエネルギー"
    },
    {
     "img": "product/details/284-scen5.jpg",
     "label": "スマートビル"
    },
    {
     "img": "product/details/284-scen6.jpg",
     "label": "物流と輸送"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "285",
    "276",
    "275"
   ],
   "summary": "HitelecomのHシリーズ振動センサーは、インダストリー4.0における回転機械と構造振動のワイヤレスモニターです。振動速度0〜100 mm/sと変位振幅0〜1,000 µm（カスタマイズ可能）を精度±1 %（80 Hzでキャリブレーション）で測定し、4GまたはNB-IoT経由で送信します。規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "産業用回転機器",
     "desc": "ポンプ、ファン、モーター、コンプレッサーは、状態基準保全をサポートする継続的な振動トレンドを取得します。",
     "img": "product/details/284-scen2.jpg"
    },
    {
     "name": "半導体施設",
     "desc": "振動に敏感なプロセスツールとクリーンルーム機器を監視します。",
     "img": "product/details/284-scen1.jpg"
    },
    {
     "name": "港湾および港の機械",
     "desc": "安全な港湾運営のためにクレーンおよびコンベヤーの振動を追跡します。",
     "img": "product/details/284-scen3.jpg"
    },
    {
     "name": "建物と構造物の健全性",
     "desc": "建設工事や重量交通の近くの建物の構造応答を監視します。",
     "img": "product/details/284-scen5.jpg"
    },
    {
     "name": "エネルギー設備",
     "desc": "タービン、発電機、変圧器の異常な振動パターンを監視します。",
     "img": "product/details/284-scen4.jpg"
    },
    {
     "name": "物流と輸送",
     "desc": "輸送中の敏感な貨物の衝撃および振動記録。",
     "img": "product/details/284-scen6.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "どのような振動量を測定しますか？",
     "a": "振動速度0〜100 mm/sと変位振幅0〜1,000 µm（いずれもカスタマイズ可能）、精度±1 %（80 Hzでキャリブレーション）。"
    },
    {
     "q": "状態基準保全をどのようにサポートしますか？",
     "a": "継続的な強度・振幅のトレンドは、軸受摩耗、アンバランス、ミスアライメントの兆候を早期に特定するのに役立ち、保全をカレンダーではなく状態に基づいて計画できます。"
    },
    {
     "q": "センサーはどのように設置・給電されますか？",
     "a": "マグネットベース、ネジ止め、粘着、ブラケット取付はモデルによって異なります — ご構成に合わせた取付アクセサリーをご確認ください。センサーはバッテリー駆動で信号・電源ケーブル配線は不要です。規定の試験条件下で1時間の送信間隔で10年以上の寿命を想定した設計です。"
    },
    {
     "q": "どのデータプラットフォームに接続しますか？",
     "a": "4GまたはNB-IoT経由でMQTTによりHitelecom Cloudまたはお客様のプラットフォームに送信し、異常振動のしきい値アラームを備えています。"
    }
   ],
   "dateModified": "2026-09-02"
  },
  "285": {
   "series": "Hシリーズ · 空気質センサー",
   "tagline": "6-in-1 | 精度 | 省エネ",
   "desc": "Hitelecomの6-in-1空気質センサーは、CO₂、PM2.5、TVOC、温度、湿度、気圧を測定し、オプションのNO₂、SO₂、NH₃、O₃チャンネルを備えます。データは4GまたはNB-IoT経由でクラウドに送信され、低保守設計が長期的な都市・産業環境モニタリングをサポートします。",
   "heroImg": "product/details/285-hero.png",
   "pdf": "/downloads/h310-aq041-air-quality-sensor-datasheet.pdf",
   "crumbCat": "空気質",
   "returnCid": "265",
   "features": [
    {
     "icon": "product/details/285-f1.png",
     "text": "CO₂、PM2.5、TVOC、温度、湿度、気圧を測定"
    },
    {
     "icon": "product/details/285-f2.png",
     "text": "IP68防護等級筐体"
    },
    {
     "icon": "product/details/285-f3.png",
     "text": "オプションのNO₂、SO₂、NH₃、O₃チャンネル（構成による）"
    },
    {
     "icon": "product/details/285-f4.png",
     "text": "NFCアクティベーションとローカルデバイス設定に対応します。"
    },
    {
     "icon": "product/details/285-f5.png",
     "text": "リモートOTAファームウェア更新に対応します。"
    },
    {
     "icon": "product/details/285-f6.png",
     "text": "無線オプション：4G LTE、NB-IoT、LoRa。"
    },
    {
     "icon": "product/details/285-f7.png",
     "text": "遠隔空気モニタリング"
    },
    {
     "icon": "product/details/285-f8.png",
     "text": "構成可能なしきい値アラート"
    }
   ],
   "specsTitle": "技術仕様",
   "specsDesc": "低消費電力プロセッサーとアルゴリズム最適化により、複数の空気質チャンネルを同時収集できます。バッテリーは規定の試験条件下で4時間の送信間隔で10年以上の寿命を想定した設計です。実際の寿命はセンシング構成、ネットワークカバレッジ、環境によって異なります。",
   "specs": [
    [
     "製品モデル",
     "H200/H300/H500"
    ],
    [
     "CO₂",
     "400〜5,000 ppm"
    ],
    [
     "PM2.5 / TVOC",
     "付属（範囲は構成による）"
    ],
    [
     "オプションガスチャンネル",
     "NO₂、SO₂、NH₃、O₃（構成による）"
    ],
    [
     "温度測定範囲",
     "−40 °C〜+85 °C（±0.2 °C）"
    ],
    [
     "湿度",
     "0〜100 % RH"
    ],
    [
     "気圧",
     "30〜120 kPa（±0.1 kPa）"
    ],
    [
     "プロトコル",
     "MQTT"
    ],
    [
     "周波数帯",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "バッテリー寿命",
     "規定の試験条件下で4時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。"
    ],
    [
     "取付",
     "取付耳、ポールクランプ、スロットマウント（構成による）"
    ]
   ],
   "specsStructured": [
    {
     "name": "製品モデル",
     "value": "H200/H300/H500"
    },
    {
     "name": "CO₂",
     "value": "400〜5,000 ppm",
     "unitText": "100万分の1",
     "minValue": 400.0,
     "maxValue": 5000.0
    },
    {
     "name": "PM2.5 / TVOC",
     "value": "付属（範囲は構成による）"
    },
    {
     "name": "オプションガスチャンネル",
     "value": "NO₂、SO₂、NH₃、O₃（構成による）"
    },
    {
     "name": "温度測定範囲",
     "value": "−40 °C〜+85 °C（±0.2 °C）",
     "unitText": "度",
     "minValue": -40.0,
     "maxValue": 85.0
    },
    {
     "name": "湿度",
     "value": "0〜100 % RH",
     "unitText": "パーセント",
     "minValue": 0.0,
     "maxValue": 100.0
    },
    {
     "name": "気圧",
     "value": "30〜120 kPa（±0.1 kPa）",
     "unitText": "キロパスカル",
     "minValue": 30.0,
     "maxValue": 120.0
    },
    {
     "name": "プロトコル",
     "value": "MQTT"
    },
    {
     "name": "周波数帯",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "バッテリー寿命",
     "value": "規定の試験条件下で4時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。",
     "unitText": "年",
     "minValue": 10.0
    },
    {
     "name": "取付",
     "value": "取付耳、ポールクランプ、スロットマウント（構成による）"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "適用シーン",
   "scenarios": [
    {
     "img": "product/details/285-scen1.jpg",
     "label": "オフィス環境"
    },
    {
     "img": "product/details/285-scen2.jpg",
     "label": "スマートシティ"
    },
    {
     "img": "product/details/285-scen3.jpg",
     "label": "病院"
    },
    {
     "img": "product/details/285-scen4.jpg",
     "label": "スマート交通"
    },
    {
     "img": "product/details/285-scen5.jpg",
     "label": "住宅環境"
    },
    {
     "img": "product/details/285-scen6.jpg",
     "label": "データセンター"
    },
    {
     "img": "product/details/285-scen7.jpg",
     "label": "スマート製造"
    },
    {
     "img": "product/details/285-scen8.jpg",
     "label": "スマート農業"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "276",
    "275"
   ],
   "summary": "HitelecomのHシリーズ空気質センサーは、都市および産業環境向けの6-in-1ワイヤレスモニターです。CO₂（400〜5,000 ppm）、PM2.5、TVOC、温度（−40 °C〜+85 °C、±0.2 °C）、湿度（0〜100 % RH）、気圧（30〜120 kPa）を追跡し、オプションのNO₂、SO₂、NH₃、O₃チャンネルを備え、4GまたはNB-IoT経由で送信します。",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "スマートシティの大気モニタリング",
     "desc": "グリッド展開されたマイクロステーションがブロックごとに都市の空気質動向を追跡します。",
     "img": "product/details/285-scen2.jpg"
    },
    {
     "name": "オフィスおよび学校の建物",
     "desc": "CO₂および湿度の読取値は、対応制御システムと統合された場合、換気の意思決定に活用できます。",
     "img": "product/details/285-scen1.jpg"
    },
    {
     "name": "病院",
     "desc": "弱者が集まる病棟や診療所の空気状況を監視します。",
     "img": "product/details/285-scen3.jpg"
    },
    {
     "name": "データセンター",
     "desc": "温度、湿度、圧力を組み合わせて環境コンプライアンス記録を行います。",
     "img": "product/details/285-scen6.jpg"
    },
    {
     "name": "工業団地",
     "desc": "異常な排出を早期に検出するための公園空気の境界モニタリング。",
     "img": "product/details/285-scen7.jpg"
    },
    {
     "name": "輸送ハブ",
     "desc": "駅、トンネル、駐車場構造物での空気質の可視性。",
     "img": "product/details/285-scen4.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "6-in-1センサーはどのパラメーターを測定しますか？",
     "a": "CO₂（400〜5,000 ppm）、PM2.5、TVOC、温度（−40 °C〜+85 °C、±0.2 °C）、湿度（0〜100 % RH）、気圧（30〜120 kPa、±0.1 kPa）、オプションでNO₂、SO₂、NH₃、O₃チャンネル（構成による）。"
    },
    {
     "q": "無人でどのくらい動作できますか？",
     "a": "選択された構成は、規定の試験条件下で4時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際の寿命はセンシング構成、ネットワークカバレッジ、環境によって異なります。IP68筐体は屋外設置に対応します。"
    },
    {
     "q": "空気質データはどのように提供されますか？",
     "a": "4GまたはNB-IoT経由でMQTTを使用してHitelecom Cloudまたはお客様のプラットフォームにワイヤレス送信し、各チャンネルでしきい値アラートを備えます。"
    },
    {
     "q": "当社のサイトに合わせてチャンネルをカスタマイズできますか？",
     "a": "はい。6-in-1構成はモジュラー式です — 必要なガスや粒子をHitelecomにお知らせいただければ、適合するチャンネルセットをご提案します。"
    }
   ],
   "dateModified": "2026-09-02"
  },
  "275": {
   "series": "H68シリーズ · 屋外向けゲートウェイ",
   "tagline": "IP68 | 大容量 | 広範囲カバー",
   "desc": "H68シリーズゲートウェイは、複雑な産業環境での長期屋外運用向けに設計されたIP68等級の防塵・防水筐体を特徴としています。プラグアンドプレイ展開に対応し、バックアップ電源とバックホールが利用可能な場合は停電アラームを送信できます。",
   "heroImg": "product/details/275-hero.png",
   "pdf": "/downloads/outdoor-4g-gateway-h68-datasheet.pdf",
   "crumbCat": "屋外向けゲートウェイ",
   "returnCid": "273",
   "features": [
    {
     "icon": "product/details/275-f1.png",
     "text": "通信距離 最長10 km（開放地）"
    },
    {
     "icon": "product/details/275-f2.png",
     "text": "IP68防水・防塵等級"
    },
    {
     "icon": "product/details/275-f3.png",
     "text": "産業用8チャンネル全二重ゲートウェイ"
    },
    {
     "icon": "product/details/275-f4.png",
     "text": "データ管理と信頼性のためのローカルデプロイに対応"
    },
    {
     "icon": "product/details/275-f5.png",
     "text": "統合電力増幅および低ノイズ増幅回路"
    },
    {
     "icon": "product/details/275-f6.png",
     "text": "無線オプション：4G LTE、NB-IoT、LoRa。"
    },
    {
     "icon": "product/details/275-f7.png",
     "text": "大容量ネットワーキング、リモート制御、データ収集"
    },
    {
     "icon": "product/details/275-f8.png",
     "text": "バックアップ電源とバックホールが利用可能な場合、停電アラートを送信できます"
    }
   ],
   "specsTitle": "技術仕様",
   "specsDesc": "H68シリーズは最長10キロメートルの長距離送信に対応し、都市部内で最長2キロメートルに達します。4G LTE、Ethernet、Wi-Fiのコネクティビティオプションを統合し、信頼性の高い継続的なデータ送信をサポートします。",
   "specs": [
    [
     "製品モデル",
     "H68"
    ],
    [
     "周波数帯",
     "CN470/EU868/IN865/RU864/US915/AU915"
    ],
    [
     "距離",
     "最長10 km（開放地）"
    ],
    [
     "送信出力",
     "20–27 dBm"
    ],
    [
     "感度",
     "−140 dBm（0.292 kbps時）"
    ],
    [
     "アンテナ",
     "外部グラスファイバーアンテナ"
    ],
    [
     "4Gバンド",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "プロトコル",
     "MQTT"
    ],
    [
     "動作温度",
     "−40 °C〜+85 °C"
    ],
    [
     "保管温度",
     "−40 °C〜+85 °C"
    ],
    [
     "取付",
     "取付耳、ポールクランプ、スロットマウント（構成による）"
    ]
   ],
   "specsStructured": [
    {
     "name": "製品モデル",
     "value": "H68"
    },
    {
     "name": "周波数帯",
     "value": "CN470/EU868/IN865/RU864/US915/AU915"
    },
    {
     "name": "距離",
     "value": "最長10 km（開放地）"
    },
    {
     "name": "送信出力",
     "value": "20–27 dBm",
     "unitText": "デシベル-ミリワット",
     "minValue": 20.0,
     "maxValue": 27.0
    },
    {
     "name": "感度",
     "value": "−140 dBm（0.292 kbps時）",
     "unitText": "デシベル-ミリワット"
    },
    {
     "name": "アンテナ",
     "value": "外部グラスファイバーアンテナ"
    },
    {
     "name": "4Gバンド",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "プロトコル",
     "value": "MQTT"
    },
    {
     "name": "動作温度",
     "value": "−40 °C〜+85 °C",
     "unitText": "度",
     "minValue": -40.0,
     "maxValue": 85.0
    },
    {
     "name": "保管温度",
     "value": "−40 °C〜+85 °C",
     "unitText": "度",
     "minValue": -40.0,
     "maxValue": 85.0
    },
    {
     "name": "取付",
     "value": "取付耳、ポールクランプ、スロットマウント（構成による）"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "適用シーン",
   "scenarios": [
    {
     "img": "product/details/275-scen1.jpg",
     "label": "再生可能エネルギー"
    },
    {
     "img": "product/details/275-scen2.jpg",
     "label": "スマート工業団地"
    },
    {
     "img": "product/details/275-scen3.jpg",
     "label": "スマート水管理"
    },
    {
     "img": "product/details/275-scen4.jpg",
     "label": "産業オートメーション"
    },
    {
     "img": "product/details/275-scen5.jpg",
     "label": "環境モニタリング"
    },
    {
     "img": "product/details/275-scen6.jpg",
     "label": "スマートシティ"
    },
    {
     "img": "product/details/275-scen7.jpg",
     "label": "インテリジェント交通"
    },
    {
     "img": "product/details/275-scen8.jpg",
     "label": "物流およびサプライチェーン"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285",
    "276"
   ],
   "summary": "HitelecomのH68屋外向けゲートウェイは、広域センサーネットワーク向けの産業用LoRaゲートウェイです。最長10 kmのカバレッジ、−140 dBm感度、20-27 dBm送信出力、CN470、EU868、US915、AU915を含む地域バンドに対応。IP68筐体は長期屋外運用向けに設計され、4GバックホールとMQTTアップリンクを備えています。",
   "sku": "H68",
   "applications": [
    {
     "name": "スマートパークおよびキャンパス",
     "desc": "1つの屋上ゲートウェイがサイト全体の多くのセンサーからデータを収集できます。",
     "img": "product/details/275-scen2.jpg"
    },
    {
     "name": "スマート水ネットワーク",
     "desc": "サービスエリア全体でメーターおよびレベルセンサーのトラフィックを集約します。",
     "img": "product/details/275-scen3.jpg"
    },
    {
     "name": "再生可能エネルギーサイト",
     "desc": "長距離センサーバックホールでソーラーファームと風力サイトをカバーします。",
     "img": "product/details/275-scen1.jpg"
    },
    {
     "name": "産業オートメーション",
     "desc": "センサーごとのSIMカードなしでの工場全体のセンサー収集。",
     "img": "product/details/275-scen4.jpg"
    },
    {
     "name": "環境モニタリング",
     "desc": "広い農村地域の河川、空気、騒音センサーネットワーク。",
     "img": "product/details/275-scen5.jpg"
    },
    {
     "name": "スマートシティの照明と資産",
     "desc": "市のセンサーネットワーク向けの街区スケールのカバレッジ。",
     "img": "product/details/275-scen6.jpg"
    },
    {
     "name": "物流ヤード",
     "desc": "単一のゲートウェイを通じたヤード全体の追跡および状態センサー。",
     "img": "product/details/275-scen8.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "H68屋外向けゲートウェイはどのくらいのカバレッジを提供しますか？",
     "a": "開放条件で最長10 km、感度−140 dBm、送信出力20-27 dBm。実際のカバレッジは地形とアンテナ高によって異なります — Hitelecomがお客様のサイト平面図から推定できます。"
    },
    {
     "q": "どの周波数帯がサポートされていますか？",
     "a": "CN470、EU868、IN865、RU864、US915、AU915 — 中国、ヨーロッパ、インド、ロシア、北米、オーストラリアでの展開をカバー。"
    },
    {
     "q": "ゲートウェイはどのようにデータをバックホールしますか？",
     "a": "Over 4G cellular (LTE-TDD B34/B38/B39/B40/B41, LTE-FDD B1/B3/B5/B8) with MQTT uplink to Hitelecom Cloud or a private platform."
    },
    {
     "q": "H68は長期屋外設置に適していますか？",
     "a": "はい。IP68筐体は防塵・防水で、産業デザインは長期屋外運用を対象としています。"
    }
   ],
   "dateModified": "2026-09-02"
  },
  "276": {
   "series": "H66シリーズ · 屋内向けゲートウェイ",
   "tagline": "産業用 | 長距離 | 全二重",
   "desc": "H66シリーズゲートウェイは、変動する産業環境での安定動作を実現する堅牢な設計を特徴としています。プラグアンドプレイ展開に対応し、バックアップ電源とバックホールが利用可能な場合は停電アラームを送信できます。",
   "heroImg": "product/details/276-hero.png",
   "pdf": "/downloads/indoor-gateway-h66-datasheet.pdf",
   "crumbCat": "屋内向けゲートウェイ",
   "returnCid": "272",
   "features": [
    {
     "icon": "product/details/276-f1.png",
     "text": "通信距離 最長5 km（開放地）"
    },
    {
     "icon": "product/details/276-f2.png",
     "text": "IP67防水・防塵等級"
    },
    {
     "icon": "product/details/276-f3.png",
     "text": "産業用8チャンネル全二重ゲートウェイ"
    },
    {
     "icon": "product/details/276-f4.png",
     "text": "データ管理と信頼性のためのローカルデプロイに対応"
    },
    {
     "icon": "product/details/276-f5.png",
     "text": "統合電力増幅および低ノイズ増幅回路"
    },
    {
     "icon": "product/details/276-f6.png",
     "text": "無線オプション：4G LTE、NB-IoT、LoRa。"
    },
    {
     "icon": "product/details/276-f7.png",
     "text": "大容量ネットワーキング、リモート制御、データ収集"
    },
    {
     "icon": "product/details/276-f8.png",
     "text": "バックアップ電源とバックホールが利用可能な場合、停電アラートを送信できます"
    }
   ],
   "specsTitle": "技術仕様",
   "specsDesc": "H66シリーズ産業用マルチチャンネルワイヤレスゲートウェイは、複数プロトコルに対応し、8チャンネル全二重、エッジコンピューティングを提供し、過酷な条件に耐え、リアルタイムデータ処理とリモート管理を可能にします。",
   "specs": [
    [
     "製品モデル",
     "H66"
    ],
    [
     "周波数帯",
     "CN470/EU868/IN865/RU864/US915/AU915"
    ],
    [
     "距離",
     "最長5 km（開放地）"
    ],
    [
     "送信出力",
     "20–27 dBm"
    ],
    [
     "感度",
     "−140 dBm（0.292 kbps時）"
    ],
    [
     "アンテナ",
     "外部グラスファイバーアンテナ"
    ],
    [
     "4Gバンド",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "プロトコル",
     "MQTT"
    ],
    [
     "動作温度",
     "−20 °C〜+70 °C"
    ],
    [
     "保管温度",
     "−20 °C〜+80 °C"
    ],
    [
     "取付",
     "取付耳、ポールクランプ、スロットマウント（構成による）"
    ]
   ],
   "specsStructured": [
    {
     "name": "製品モデル",
     "value": "H66"
    },
    {
     "name": "周波数帯",
     "value": "CN470/EU868/IN865/RU864/US915/AU915"
    },
    {
     "name": "距離",
     "value": "最長5 km（開放地）"
    },
    {
     "name": "送信出力",
     "value": "20–27 dBm",
     "unitText": "デシベル-ミリワット",
     "minValue": 20.0,
     "maxValue": 27.0
    },
    {
     "name": "感度",
     "value": "−140 dBm（0.292 kbps時）",
     "unitText": "デシベル-ミリワット"
    },
    {
     "name": "アンテナ",
     "value": "外部グラスファイバーアンテナ"
    },
    {
     "name": "4Gバンド",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "プロトコル",
     "value": "MQTT"
    },
    {
     "name": "動作温度",
     "value": "−20 °C〜+70 °C",
     "unitText": "摂氏度",
     "minValue": -20.0,
     "maxValue": 70.0
    },
    {
     "name": "保管温度",
     "value": "−20 °C〜+80 °C",
     "unitText": "摂氏度",
     "minValue": -20.0,
     "maxValue": 80.0
    },
    {
     "name": "取付",
     "value": "取付耳、ポールクランプ、スロットマウント（構成による）"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "適用シーン",
   "scenarios": [
    {
     "img": "product/details/276-scen1.jpg",
     "label": "ビル管理"
    },
    {
     "img": "product/details/276-scen2.jpg",
     "label": "エネルギー管理"
    },
    {
     "img": "product/details/276-scen3.jpg",
     "label": "物流"
    },
    {
     "img": "product/details/276-scen4.jpg",
     "label": "産業"
    },
    {
     "img": "product/details/276-scen5.jpg",
     "label": "スマートシティ"
    },
    {
     "img": "product/details/276-scen6.jpg",
     "label": "水管理"
    },
    {
     "img": "product/details/276-scen7.jpg",
     "label": "インテリジェント交通"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285",
    "275"
   ],
   "summary": "HitelecomのH66屋内向けゲートウェイは、建物内センサーネットワーク向けの産業用全二重LoRaゲートウェイです。最長5 kmの範囲、−140 dBm感度、CN470からUS915までの地域バンド、停電アラート付きプラグアンドプレイ設定、4GバックホールとMQTTアップリンクを備えています。",
   "sku": "H66",
   "applications": [
    {
     "name": "ビル管理",
     "desc": "通信室からフロア全体のHVAC、計量、環境センサーを収集します。",
     "img": "product/details/276-scen1.jpg"
    },
    {
     "name": "エネルギー管理",
     "desc": "工場およびビルのエネルギー監査のためにサブメータリングセンサーのトラフィックを集約します。",
     "img": "product/details/276-scen2.jpg"
    },
    {
     "name": "物流と倉庫",
     "desc": "倉庫内の温度、ドア、資産ビーコンのセンサー収集。",
     "img": "product/details/276-scen3.jpg"
    },
    {
     "name": "産業施設",
     "desc": "データケーブル配線なしのショップフロアセンサーネットワーク。",
     "img": "product/details/276-scen4.jpg"
    },
    {
     "name": "水管理",
     "desc": "公益ビル内のポンプ室およびタンクレベルセンサーの集約。",
     "img": "product/details/276-scen6.jpg"
    },
    {
     "name": "輸送施設",
     "desc": "駅、トンネル、車庫内のセンサー収集。",
     "img": "product/details/276-scen7.jpg"
    }
   ],
   "certifications": [
    "IP67"
   ],
   "faqs": [
    {
     "q": "H66とH68の違いは何ですか？",
     "a": "H66は屋内向けモデルです。プラグアンドプレイで停電アラート付き、最長5 kmの範囲、IP67筐体を備えています。H68は屋外向けモデルで、最長10 kmの範囲、IP68、長期屋外運用向けの設計を備えています。"
    },
    {
     "q": "どの周波数帯に対応していますか？",
     "a": "CN470、EU868、IN865、RU864、US915、AU915 — 各地域のLoRaバンドプランに適合。"
    },
    {
     "q": "停電時はどうなりますか？",
     "a": "バックアップ電源と4Gバックホールが利用可能な場合、ゲートウェイは停電アラートを送信できます。"
    },
    {
     "q": "1つのゲートウェイは何台のセンサーに対応できますか？",
     "a": "全二重産業用ゲートウェイは大規模なセンサーフリートに対応できます。実際の容量は送信間隔、ペイロード、ネットワーク状況によって異なります — デバイス数をお知らせいただければ、Hitelecomがネットワークをサイジングします。"
    }
   ],
   "dateModified": "2026-09-02"
  },
  "277": {
   "series": "Hシリーズ · 水文ステーション",
   "tagline": "ソーラー | モジュラー | 2〜12チャンネル",
   "desc": "2〜12のモジュラーセンサーチャンネルを統合し、環境データを収集します — チャンネルセット（レベル、流量、水質、気象、空気質センサー）はプロジェクトごとに構成されます — Hitelecom Cloudプラットフォームへのリアルタイム送信で。ユーザーはインターネット経由でどこからでも水文・環境データにアクセスでき、リモートモニタリングと分析をサポートします。",
   "heroImg": "product/details/277-hero.png",
   "pdf": "/downloads/hydrology-monitoring-station-datasheet.pdf",
   "crumbCat": "12パラメーター",
   "returnCid": "274",
   "features": [
    {
     "icon": "product/details/277-f1.png",
     "text": "2〜12センサーチャンネルでのモニタリング"
    },
    {
     "icon": "product/details/277-f2.png",
     "text": "IP65防水・防塵等級"
    },
    {
     "icon": "product/details/277-f3.png",
     "text": "2〜12の構成可能なセンサーチャンネル"
    },
    {
     "icon": "product/details/277-f4.png",
     "text": "NFCアクティベーションとローカルデバイス設定に対応します。"
    },
    {
     "icon": "product/details/277-f5.png",
     "text": "リモートOTAファームウェア更新に対応します。"
    },
    {
     "icon": "product/details/277-f6.png",
     "text": "無線オプション：4G LTE、NB-IoT、LoRa。"
    },
    {
     "icon": "product/details/277-f7.png",
     "text": "リモートデータアクセス：どこからでもモニタリング"
    },
    {
     "icon": "product/details/277-f8.png",
     "text": "構成可能なしきい値アラート"
    }
   ],
   "specsTitle": "技術仕様",
   "specsDesc": "水位、流量、水質、温湿度、風速・風向、気圧、雨量、PM2.5/10、CO₂などを含む（ただしこれらに限定されない）水文データを監視し、水位や大気汚染の傾向とその発生源への洞察を提供し、環境保護と都市水管理のための信頼性の高いデータサポートを提供します。",
   "specs": [
    [
     "製品モデル",
     "H700"
    ],
    [
     "測定範囲",
     "カスタマイズ可能"
    ],
    [
     "精度",
     "カスタマイズ可能"
    ],
    [
     "プロトコル",
     "MQTT"
    ],
    [
     "適用範囲",
     "都市 · 農村 · 平野 · 山間部"
    ],
    [
     "周波数帯",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "電源",
     "ソーラー電源 · 系統電源"
    ],
    [
     "取付",
     "取付耳、ポールクランプ、スロットマウント（構成による）"
    ]
   ],
   "specsStructured": [
    {
     "name": "製品モデル",
     "value": "H700"
    },
    {
     "name": "測定範囲",
     "value": "カスタマイズ可能"
    },
    {
     "name": "精度",
     "value": "カスタマイズ可能"
    },
    {
     "name": "プロトコル",
     "value": "MQTT"
    },
    {
     "name": "適用範囲",
     "value": "都市 · 農村 · 平野 · 山間部"
    },
    {
     "name": "周波数帯",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "電源",
     "value": "ソーラー電源 · 系統電源"
    },
    {
     "name": "取付",
     "value": "取付耳、ポールクランプ、スロットマウント（構成による）"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "適用シーン",
   "scenarios": [
    {
     "img": "product/details/277-scen1.jpg",
     "label": "スマート農業"
    },
    {
     "img": "product/details/277-scen2.jpg",
     "label": "環境モニタリング"
    },
    {
     "img": "product/details/277-scen3.jpg",
     "label": "都市管理"
    },
    {
     "img": "product/details/277-scen4.jpg",
     "label": "スマートキャンパス"
    },
    {
     "img": "product/details/277-scen5.jpg",
     "label": "電力ユーティリティ"
    },
    {
     "img": "product/details/277-scen6.jpg",
     "label": "海洋および沿岸モニタリング"
    },
    {
     "img": "product/details/277-scen7.jpg",
     "label": "緊急事態管理"
    },
    {
     "img": "product/details/277-scen8.jpg",
     "label": "輸送と出荷"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285",
    "276"
   ],
   "summary": "HitelecomのH700水文ステーションは、モジュラー式のソーラー駆動モニタリングターミナルで、水および環境データ用に2〜12のセンサーチャンネルを統合します。4G経由でHitelecom Cloudにリアルタイム送信し、平野や山間地を含む都市・農村地域に展開でき、取付耳、ポールクランプ、スロットマウントで設置できます。",
   "sku": "H700",
   "applications": [
    {
     "name": "河川と小川のモニタリング",
     "desc": "水文ネットワーク向けの水位、雨量、流量関連チャンネル。"
    },
    {
     "name": "貯水池と湖の管理",
     "desc": "派遣および安全のためのマルチパラメーター水文記録。",
     "img": "solution/67-scen-0.jpg"
    },
    {
     "name": "都市浸水の監視",
     "desc": "洪水多発都市ポイントでの雨量および水位モニタリング。",
     "img": "product/details/277-scen3.jpg"
    },
    {
     "name": "スマート農業",
     "desc": "1つのステーションに灌漑地区の水および気象チャンネル。",
     "img": "product/details/277-scen1.jpg"
    },
    {
     "name": "環境モニタリング",
     "desc": "流域プログラム向けの水質および気象チャンネル。"
    },
    {
     "name": "土石流警報",
     "desc": "山間集水域の遠隔ソーラーステーションが早期警告システムに供給します。",
     "img": "product/details/277-scen2.jpg"
    },
    {
     "name": "沿岸および河口サイト",
     "desc": "沿岸管理のための潮位および気象チャンネル。",
     "img": "product/details/277-scen6.jpg"
    },
    {
     "name": "緊急事態管理",
     "desc": "迅速に展開されるステーションが洪水期間中にデータを供給します。",
     "img": "product/details/277-scen7.jpg"
    }
   ],
   "certifications": [
    "IP65"
   ],
   "faqs": [
    {
     "q": "H700水文ステーションは何を測定できますか？",
     "a": "サイトごとに2〜12のセンサーチャンネルを統合します — 典型的な構成は水位、雨量、流量関連、気象センサーを組み合わせます。チャンネルはプロジェクトごとに選択されます。"
    },
    {
     "q": "ステーションはどのように給電されますか？",
     "a": "ステーションはソーラーまたは系統電源を使用でき、遠隔地と都市部の両方の設置に対応します。"
    },
    {
     "q": "データはどのようにプラットフォームに届きますか？",
     "a": "MQTTアップリンクにより4G経由でリアルタイムにHitelecom Cloudへ。ユーザーはWebプラットフォームまたはアプリからデータを読み出し・エクスポートします。"
    },
    {
     "q": "どこに展開できますか？",
     "a": "都市、農村、平野、山間部；取付耳、ポールクランプ、スロットマウントのオプションで、ポール、壁、レールに適応します。"
    }
   ],
   "dateModified": "2026-09-02"
  },
  "278": {
   "series": "Hシリーズ · 気象ステーション",
   "tagline": "モジュラー | ソーラー駆動 | 全天候",
   "desc": "2〜12のセンサーを統合して環境データを収集し、Hitelecom Cloudプラットフォームへのリアルタイム送信を可能にします。インターネット経由でどこからでも気象データのリモートモニタリングと分析が可能です。",
   "heroImg": "product/details/278-hero.png",
   "pdf": "/downloads/weather-station-datasheet.pdf",
   "crumbCat": "6パラメーター",
   "returnCid": "275",
   "features": [
    {
     "icon": "product/details/278-f1.png",
     "text": "2〜12センサーチャンネルでのモニタリング"
    },
    {
     "icon": "product/details/278-f2.png",
     "text": "IP65防水・防塵等級"
    },
    {
     "icon": "product/details/278-f3.png",
     "text": "構成可能なセンサーチャンネルと電源オプション"
    },
    {
     "icon": "product/details/278-f4.png",
     "text": "NFCアクティベーションとローカルデバイス設定に対応します。"
    },
    {
     "icon": "product/details/278-f5.png",
     "text": "リモートOTAファームウェア更新に対応します。"
    },
    {
     "icon": "product/details/278-f6.png",
     "text": "無線オプション：4G LTE、NB-IoT、LoRa。"
    },
    {
     "icon": "product/details/278-f7.png",
     "text": "リモートデータアクセス：どこからでもモニタリング"
    },
    {
     "icon": "product/details/278-f8.png",
     "text": "構成可能なしきい値アラート"
    }
   ],
   "specsTitle": "技術仕様",
   "specsDesc": "温度、湿度、風速・風向、気圧、雨量、PM2.5/PM10、CO₂、SO₂、日射量を含む気象パラメーター（チャンネルは構成による）を監視し、環境保護と都市計画の用途のための環境動向分析をサポートします。",
   "specs": [
    [
     "製品モデル",
     "H600"
    ],
    [
     "測定範囲",
     "カスタマイズ可能"
    ],
    [
     "精度",
     "カスタマイズ可能"
    ],
    [
     "プロトコル",
     "MQTT"
    ],
    [
     "適用範囲",
     "都市 · 農村 · 平野 · 山間部"
    ],
    [
     "周波数帯",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "電源",
     "ソーラー電源 · 系統電源"
    ],
    [
     "取付",
     "取付耳、ポールクランプ、スロットマウント（構成による）"
    ]
   ],
   "specsStructured": [
    {
     "name": "製品モデル",
     "value": "H600"
    },
    {
     "name": "測定範囲",
     "value": "カスタマイズ可能"
    },
    {
     "name": "精度",
     "value": "カスタマイズ可能"
    },
    {
     "name": "プロトコル",
     "value": "MQTT"
    },
    {
     "name": "適用範囲",
     "value": "都市 · 農村 · 平野 · 山間部"
    },
    {
     "name": "周波数帯",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "電源",
     "value": "ソーラー電源 · 系統電源"
    },
    {
     "name": "取付",
     "value": "取付耳、ポールクランプ、スロットマウント（構成による）"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "適用シーン",
   "scenarios": [
    {
     "img": "product/details/278-scen1.jpg",
     "label": "スマート農業"
    },
    {
     "img": "product/details/278-scen2.jpg",
     "label": "環境"
    },
    {
     "img": "product/details/278-scen3.jpg",
     "label": "海洋および沿岸"
    },
    {
     "img": "product/details/278-scen4.jpg",
     "label": "スマートキャンパス"
    },
    {
     "img": "product/details/278-scen5.jpg",
     "label": "都市管理"
    },
    {
     "img": "product/details/278-scen6.jpg",
     "label": "緊急事態管理"
    },
    {
     "img": "product/details/278-scen7.jpg",
     "label": "輸送と出荷"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285",
    "276"
   ],
   "summary": "HitelecomのH600気象ステーションは、モジュラー式のソーラー駆動農業気象ターミナルで、気温・湿度、雨量、風、気圧、日射量の2〜12センサーチャンネルで構成されます。農場、キャンパス、都市、沿岸サイト向けに4G経由でリアルタイムにHitelecom Cloudに送信します。",
   "sku": "H600",
   "applications": [
    {
     "name": "スマート農業",
     "desc": "フィールドの気象が灌漑、散布ウィンドウ、疾病警告モデルを駆動します。",
     "img": "product/details/278-scen1.jpg"
    },
    {
     "name": "環境モニタリング",
     "desc": "流域および生態プログラム向けの長期気候系列。",
     "img": "product/details/278-scen2.jpg"
    },
    {
     "name": "スマートキャンパスおよび学校",
     "desc": "教育、安全、施設管理のためのキャンパス気象。",
     "img": "product/details/278-scen4.jpg"
    },
    {
     "name": "都市管理",
     "desc": "都市サービスおよびヒートアイランド研究のためのミクロ気候モニタリング。",
     "img": "product/details/278-scen5.jpg"
    },
    {
     "name": "沿岸および海洋サイト",
     "desc": "沿岸運用の安全のための風および圧力チャンネル。",
     "img": "product/details/278-scen3.jpg"
    },
    {
     "name": "輸送と出荷",
     "desc": "港湾、空港、高速道路区間の局地気象。",
     "img": "product/details/278-scen7.jpg"
    },
    {
     "name": "緊急事態管理",
     "desc": "展開可能なステーションが悪天候時に意思決定システムに供給します。",
     "img": "product/details/278-scen6.jpg"
    }
   ],
   "certifications": [
    "IP65"
   ],
   "faqs": [
    {
     "q": "H600はどの気象パラメーターを測定しますか？",
     "a": "ステーションは2〜12のチャンネルを統合します — 典型的には気温・湿度、雨量、風速・風向、気圧、日射量。チャンネルセットはプロジェクトごとに構成されます。"
    },
    {
     "q": "ステーションはどのように給電・接続されますか？",
     "a": "ソーラーまたは系統電源で、リモートでの読取と分析のためにMQTT経由でHitelecom Cloudへのリアルタイム4Gアップリンク。"
    },
    {
     "q": "インフラのない遠隔地でも動作できますか？",
     "a": "はい。ソーラー電源とセルラーバックホールは電源・データケーブル配線の必要性を削減できます。ステーションは取付耳、ポールクランプ、スロットマウントで設置できます。"
    },
    {
     "q": "H700水文ステーションとの違いは何ですか？",
     "a": "H600は気象チャンネル（風、雨、放射）向けに構成され、H700は水文チャンネル（水位、流量関連）向けに構成されます。両者は同じモジュラープラットフォームを共有しています。"
    }
   ],
   "dateModified": "2026-09-02"
  },
  "286": {
   "series": "Hシリーズ · 危険区域向け温度・圧力センサー",
   "tagline": "信頼性 | 産業用 | 低消費電力",
   "desc": "Hitelecomの2-in-1センサーは、可燃性ガスや粉塵が存在する可能性のある雰囲気向けに設計された単一デバイスで温度と圧力のモニタリングを組み合わせ、危険区域でのデバイス数と設置の複雑さを削減できます。",
   "heroImg": "product/details/286-hero.png",
   "pdf": "/downloads/explosion-proof-temperature-pressure-sensor-datasheet.pdf",
   "crumbCat": "ハードウェア",
   "returnCid": "279",
   "features": [
    {
     "icon": "product/details/286-f1.png",
     "text": "精度：±0.5 °C（±0.1 °Cまでカスタマイズ可能）"
    },
    {
     "icon": "product/details/286-f2.png",
     "text": "IP68防護等級筐体"
    },
    {
     "icon": "product/details/286-f3.png",
     "text": "±0.5 % FS（高精度カスタマイズ）"
    },
    {
     "icon": "product/details/286-f4.png",
     "text": "NFCアクティベーションとローカルデバイス設定に対応します。"
    },
    {
     "icon": "product/details/286-f5.png",
     "text": "リモートOTAファームウェア更新に対応します。"
    },
    {
     "icon": "product/details/286-f6.png",
     "text": "無線オプション：4G LTE、NB-IoT、LoRa。"
    },
    {
     "icon": "product/details/286-f7.png",
     "text": "遠隔モニタリング"
    },
    {
     "icon": "product/details/286-f8.png",
     "text": "構成可能なしきい値アラート"
    }
   ],
   "specsTitle": "技術仕様",
   "specsDesc": "組込み省エネアルゴリズムを備えた統合通信・センシング技術により、送信機は延長された耐用年数と高い測定安定性を実現し、より広範なモニタリングシステムの信頼性を支えます。",
   "specs": [
    [
     "製品モデル",
     "H200/H300/H500"
    ],
    [
     "測定範囲",
     "0–1、1.6、3.5、7、10、20 MPa"
    ],
    [
     "圧力精度",
     "±0.5% FS"
    ],
    [
     "測定温度",
     "−200 °C〜+800 °C"
    ],
    [
     "温度精度",
     "±0.5 °C（±0.1 °Cまでカスタマイズ可能）"
    ],
    [
     "プロトコル",
     "MQTT"
    ],
    [
     "周波数帯",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "取付",
     "取付耳、ポールクランプ、スロットマウント（構成による）"
    ],
    [
     "危険区域認証",
     "証明書とマーキングは対象市場とゾーンごとに確認 — ご注文前にご請求ください"
    ],
    [
     "動作温度",
     "−40 °C〜+125 °C"
    ],
    [
     "保管温度",
     "−40 °C〜+125 °C"
    ]
   ],
   "specsStructured": [
    {
     "name": "製品モデル",
     "value": "H200/H300/H500"
    },
    {
     "name": "測定範囲",
     "value": "0–1、1.6、3.5、7、10、20 MPa"
    },
    {
     "name": "圧力精度",
     "value": "±0.5% FS",
     "unitText": "パーセント"
    },
    {
     "name": "測定温度",
     "value": "−200 °C〜+800 °C",
     "unitText": "摂氏度",
     "minValue": -200.0,
     "maxValue": 800.0
    },
    {
     "name": "温度精度",
     "value": "±0.5 °C（±0.1 °Cまでカスタマイズ可能）",
     "unitText": "摂氏度"
    },
    {
     "name": "プロトコル",
     "value": "MQTT"
    },
    {
     "name": "周波数帯",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "取付",
     "value": "取付耳、ポールクランプ、スロットマウント（構成による）"
    },
    {
     "name": "危険区域認証",
     "value": "証明書とマーキングは対象市場とゾーンごとに確認 — ご注文前にご請求ください"
    },
    {
     "name": "動作温度",
     "value": "−40 °C〜+125 °C",
     "unitText": "度",
     "minValue": -40.0,
     "maxValue": 125.0
    },
    {
     "name": "保管温度",
     "value": "−40 °C〜+125 °C",
     "unitText": "度",
     "minValue": -40.0,
     "maxValue": 125.0
    }
   ],
   "certImgs": [],
   "scenariosHeading": "適用シーン",
   "scenarios": [
    {
     "img": "product/details/286-scen1.jpg",
     "label": "石油化学"
    },
    {
     "img": "product/details/286-scen2.jpg",
     "label": "鉱業"
    },
    {
     "img": "product/details/286-scen3.jpg",
     "label": "化学プラント"
    }
   ],
   "related": [
    "287"
   ],
   "summary": "HitelecomのHシリーズ2-in-1送信機は、可燃性ガスや粉塵が存在する可能性のある環境向けに設計された1台のデバイスで温度と圧力のモニタリングを組み合わせています。利用可能なフルスケール圧力範囲は1、1.6、3.5、7、10、20 MPaで±0.5 % FS、温度は−200 °C〜800 °Cで、データは4GまたはNB-IoT経由で報告されます。該当する防爆証明書は、ご注文前に対象市場とゾーンについて確認する必要があります。",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "石油化学プラント",
     "desc": "1台のデバイスが危険区域でプロセス温度と圧力の両方を監視します。",
     "img": "product/details/286-scen3.jpg"
    },
    {
     "name": "石油・ガス採掘",
     "desc": "爆発性雰囲気でのケーブル配線なしの井戸元および集油管モニタリング。",
     "img": "product/details/286-scen1.jpg"
    },
    {
     "name": "鉱業操業",
     "desc": "ガスリスクのある地下区域での温度および圧力のトレンド。",
     "img": "product/details/286-scen2.jpg"
    },
    {
     "name": "化学品貯蔵パーク",
     "desc": "貯蔵・移送設備の2パラメータモニタリング。",
     "img": "product/details/283-scen5.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "なぜ2-in-1の温度・圧力送信機なのですか？",
     "a": "1台のデバイスが1つの計器で2つの測定を組み合わせ、危険区域での設置ポイント、ケーブル配線、保守を削減し、両方の変数を同じ送信スケジュールに保ちます。"
    },
    {
     "q": "測定範囲はどのくらいですか？",
     "a": "圧力：0-1 MPa、1.6、3.5、7、10、20 MPaで±0.5 % FS。温度：−200 °C〜800 °Cで±0.5 °C、±0.1 °Cまでカスタマイズ可能。"
    },
    {
     "q": "爆発性雰囲気向けの認証はありますか？",
     "a": "このデバイスは、可燃性ガスや粉塵が存在する可能性のある雰囲気向けに設計されています。適合性は、対象市場、ゾーン、ガスまたは粉塵グループ、温度クラスに必要な認証済み構成によって異なります — 製品を仕様化する前にHitelecomに該当証明書をご請求ください。"
    },
    {
     "q": "どのようにデータを送信しますか？",
     "a": "4GまたはNB-IoT経由でMQTTアップリンクによりHitelecom Cloudまたはプライベートデプロイに接続し、両チャンネルでしきい値アラームを備えます。"
    }
   ],
   "dateModified": "2026-09-02"
  },
  "287": {
   "series": "Hシリーズ · カップリングアイソレーター",
   "tagline": "信頼性 | 安全性 | 危険区域向け設計",
   "desc": "石油・ガス採掘、化学プラント、鉱業では、可燃性ガス、蒸気、粉塵が存在する場合があり、そのような区域の無線機器には専用設計が必要です。H100はこれらの産業設備向けの高周波信号結合デバイスです。危険区域への適合性は、対象市場、ゾーン、ガスまたは粉塵グループ、温度クラスに必要な認証済み構成によって異なります — 製品を仕様化する前に該当証明書をご請求ください。",
   "heroImg": "product/details/287-hero.png",
   "pdf": "/downloads/coupling-isolator-h100-datasheet.pdf",
   "crumbCat": "ハードウェア",
   "returnCid": "279",
   "features": [
    {
     "icon": "product/details/287-f1.png",
     "text": "高周波・低減衰の信号結合"
    },
    {
     "icon": "product/details/287-f2.png",
     "text": "IP68防護等級筐体"
    },
    {
     "icon": "product/details/287-f3.png",
     "text": "2.4 GHz / 5.8 GHz高周波リンクに対応"
    },
    {
     "icon": "product/details/287-f4.png",
     "text": "危険区域の信号結合用に設計"
    },
    {
     "icon": "product/details/287-f5.png",
     "text": "低エネルギー消費技術でエネルギー消費を削減"
    },
    {
     "icon": "product/details/287-f6.png",
     "text": "高い電磁干渉耐性"
    }
   ],
   "specsTitle": "技術仕様",
   "specsDesc": "H100は、危険区域への設置を目的としたワイヤレス信号結合デバイスで、2.4 GHzおよび5.8 GHz周波数に対応し、低消費電力設計と高い耐干渉性を備え、過酷な産業環境に適しています。該当証明書はご注文前に対象市場とゾーンについて確認する必要があります。",
   "specs": [
    [
     "製品モデル",
     "H100"
    ],
    [
     "信号バンド",
     "2.4 GHz / 5.8 GHz"
    ],
    [
     "危険区域での使用",
     "危険区域結合設計；該当証明書はご注文前に対象市場とゾーンについて確認する必要があります"
    ],
    [
     "動作温度",
     "−40 °C〜+125 °C"
    ],
    [
     "保管温度",
     "−40 °C〜+125 °C"
    ],
    [
     "取付",
     "取付耳、ポールクランプ、スロットマウント（構成による）"
    ]
   ],
   "specsStructured": [
    {
     "name": "製品モデル",
     "value": "H100"
    },
    {
     "name": "信号バンド",
     "value": "2.4 GHz / 5.8 GHz"
    },
    {
     "name": "危険区域での使用",
     "value": "危険区域結合設計；該当証明書はご注文前に対象市場とゾーンについて確認する必要があります"
    },
    {
     "name": "動作温度",
     "value": "−40 °C〜+125 °C",
     "unitText": "度",
     "minValue": -40.0,
     "maxValue": 125.0
    },
    {
     "name": "保管温度",
     "value": "−40 °C〜+125 °C",
     "unitText": "度",
     "minValue": -40.0,
     "maxValue": 125.0
    },
    {
     "name": "取付",
     "value": "取付耳、ポールクランプ、スロットマウント（構成による）"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "適用シーン",
   "scenarios": [
    {
     "img": "product/details/287-scen1.jpg",
     "label": "石油化学"
    },
    {
     "img": "product/details/287-scen2.jpg",
     "label": "鉱業"
    },
    {
     "img": "product/details/287-scen3.jpg",
     "label": "化学"
    }
   ],
   "related": [
    "286"
   ],
   "summary": "HitelecomのH100カップリングアイソレーターは、石油・ガス、化学、鉱業サイトで、2.4 GHz / 5.8 GHzのワイヤレスセンサー信号を危険区域境界を越えて通す高周波信号カプラーです。危険区域への適合性は、対象市場、ゾーン、ガスまたは粉塵グループ、温度クラスに必要な認証済み構成によって異なります — 製品を仕様化する前に該当証明書をご請求ください。−40 °C〜+125 °Cで動作し、取付耳、ポールクランプ、スロットマウントで設置します。",
   "sku": "H100",
   "applications": [
    {
     "name": "石油・ガス採掘",
     "desc": "井戸元の危険ゾーンからワイヤレスセンサー信号を結合します。",
     "img": "product/details/287-scen1.jpg"
    },
    {
     "name": "化学プラント",
     "desc": "バリアを貫通せずに、危険区域と安全区域間のワイヤレスリンクを橋渡しします。",
     "img": "product/details/287-scen3.jpg"
    },
    {
     "name": "鉱業",
     "desc": "危険区域の地下ワイヤレスセンサーネットワーク向けの信号結合パス。",
     "img": "product/details/287-scen2.jpg"
    },
    {
     "name": "タンクファームとターミナル",
     "desc": "ゾーン境界および堤防を越える安全な信号結合（認証済み構成に準拠）。",
     "img": "product/details/283-scen5.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "カップリングアイソレーターはどの問題を解決しますか？",
     "a": "標準的なワイヤレスリンクは、認証済みの絶縁なしに危険区域境界を越えるべきではありません。H100は2.4 GHz / 5.8 GHzのセンサー信号を境界を越えて結合し、バッテリー駆動のワイヤレスセンサーが追加のコンジット貫通なしに危険区域に対応できます — 対象市場とゾーンの認証済み構成に準拠します。"
    },
    {
     "q": "どの規格に準拠していますか？",
     "a": "それは、対象市場、ゾーン、ガスまたは粉塵グループ、温度クラスの認証済み構成によって異なります。お客様の要件をお知らせいただければ、Hitelecomが納入前に該当証明書の詳細を提供します。"
    },
    {
     "q": "どのような環境に対応できますか？",
     "a": "動作・保管温度はともに−40 °C〜+125 °Cで、屋外および地下サイト向けのIP68筐体を備えています。"
    },
    {
     "q": "どのように設置しますか？",
     "a": "取付耳、ポールクランプ、スロットマウント — 他のHシリーズフィールドデバイスと同じアクセサリーファミリー。"
    }
   ],
   "dateModified": "2026-09-02"
  },
  "301": {
   "series": "Hシリーズ · 温度・湿度センサー",
   "tagline": "精度 | 環境モニタリング | 超低消費電力",
   "desc": "Hitelecomの温度・湿度センサーは、リモートアラート付きの高精度環境モニタリングを提供し、クリーンルーム、キャビネット、博物館、生産ラインに24時間体制の継続的な環境記録としきい値アラームを提供します。",
   "heroImg": "product/details/301-hero.png",
   "pdf": "/downloads/h300-temperature-humidity-sensor-datasheet.pdf",
   "crumbCat": "温度",
   "returnCid": "263",
   "features": [
    {
     "icon": "product/details/270-f1.png",
     "text": "精度：±0.2 °C / ±2 % RH（典型）"
    },
    {
     "icon": "product/details/270-f2-ip65.png",
     "text": "IP65防護等級筐体"
    },
    {
     "icon": "product/details/270-f3.png",
     "text": "測定範囲：0〜100 % RH、−20 °C〜+80 °C"
    },
    {
     "icon": "product/details/270-f4.png",
     "text": "NFCアクティベーションとローカルデバイス設定に対応します。"
    },
    {
     "icon": "product/details/270-f5.png",
     "text": "長期運用向け低消費電力設計"
    },
    {
     "icon": "product/details/270-f6.png",
     "text": "無線オプション：4G LTE、NB-IoT、LoRa。"
    },
    {
     "icon": "product/details/270-f7.png",
     "text": "遠隔環境モニタリング"
    },
    {
     "icon": "product/details/270-f8.png",
     "text": "構成可能なしきい値アラート"
    }
   ],
   "specsTitle": "技術仕様",
   "specsDesc": "マイクロパワープロセッサーとアルゴリズム最適化により、規定の試験条件下で1時間の送信間隔で最長10年の設計寿命を実現し、定期保守を削減します。",
   "specs": [
    [
     "製品モデル",
     "H200/H300/H500"
    ],
    [
     "測定範囲",
     "湿度0〜100 % RH、温度−20 °C〜+80 °C"
    ],
    [
     "精度",
     "±0.2 °C / ±2 % RH（典型）"
    ],
    [
     "プロトコル",
     "MQTT"
    ],
    [
     "プローブ",
     "スロット付き焼結プローブ、ケーブル取付式"
    ],
    [
     "周波数帯",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "バッテリー寿命",
     "規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。"
    ],
    [
     "取付",
     "取付耳、ポールクランプ、スロットマウント（構成による）"
    ]
   ],
   "specsStructured": [
    {
     "name": "製品モデル",
     "value": "H200/H300/H500"
    },
    {
     "name": "測定範囲",
     "value": "湿度0〜100 % RH、温度−20 °C〜+80 °C"
    },
    {
     "name": "精度",
     "value": "±0.2 °C / ±2 % RH（典型）"
    },
    {
     "name": "プロトコル",
     "value": "MQTT"
    },
    {
     "name": "プローブ",
     "value": "スロット付き焼結プローブ、ケーブル取付式"
    },
    {
     "name": "周波数帯",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "バッテリー寿命",
     "value": "規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。",
     "unitText": "年",
     "minValue": 10.0
    },
    {
     "name": "取付",
     "value": "取付耳、ポールクランプ、スロットマウント（構成による）"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "適用シーン",
   "scenarios": [
    {
     "img": "product/details/270-scen3.jpg",
     "label": "データセンター"
    },
    {
     "img": "product/details/270-scen4.jpg",
     "label": "医薬品およびヘルスケア保管"
    },
    {
     "img": "product/details/270-scen5.jpg",
     "label": "食品加工"
    },
    {
     "img": "product/details/270-scen2.jpg",
     "label": "スマート農業"
    },
    {
     "img": "product/details/285-scen1.jpg",
     "label": "オフィス環境"
    },
    {
     "img": "product/details/285-scen7.jpg",
     "label": "スマート製造"
    },
    {
     "img": "product/details/285-scen3.jpg",
     "label": "病院"
    }
   ],
   "related": [
    "302",
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285"
   ],
   "summary": "HitelecomのHシリーズ温度・湿度センサーは、クリーンルーム、電気キャビネット、博物館、生産ライン向けのワイヤレス環境モニターです。そのスロット付き焼結プローブは0〜100 % RHおよび−20 °C〜+80 °Cを測定し、典型精度は±2 % RHおよび±0.2 °Cで、規定の試験条件下で1時間の送信間隔で10年以上の寿命を想定したバッテリーと、4G/NB-IoTクラウド送信を備えています。",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "データセンターとサーバールーム",
     "desc": "ラックレベルで温度と湿度を追跡し、IT機器をASHRAEの範囲内に保ちます。",
     "img": "product/details/270-scen3.jpg"
    },
    {
     "name": "医療および医薬品保管",
     "desc": "湿度が薬剤安定性に影響する薬局、冷蔵庫、病棟を監視します。",
     "img": "product/details/270-scen4.jpg"
    },
    {
     "name": "博物館と書庫",
     "desc": "紙、織物、遺物の保存判断をサポートする継続的な気候記録を提供します。"
    },
    {
     "name": "食品加工と貯蔵",
     "desc": "生産ホールと倉庫の湿度を追跡し、カビや結露につながる可能性のある状況をスタッフに警告します。",
     "img": "product/details/270-scen5.jpg"
    },
    {
     "name": "電気キャビネットおよび筐体",
     "desc": "ケーブル取付式プローブはキャビネット内に届き、腐食が始まる前に結露を警告します。",
     "img": "product/details/285-scen7.jpg"
    },
    {
     "name": "温室",
     "desc": "温度と湿度の傾向を組み合わせ、換気と灌漑の意思決定に活用します。",
     "img": "product/details/270-scen2.jpg"
    },
    {
     "name": "オフィスと病院",
     "desc": "公共建物の室内空気の快適性と衛生を目標範囲内に保ちます。",
     "img": "product/details/285-scen1.jpg"
    }
   ],
   "certifications": [
    "IP65"
   ],
   "faqs": [
    {
     "q": "測定範囲と精度はどのくらいですか？",
     "a": "0〜100 % RHおよび−20 °C〜+80 °Cを測定し、典型精度は±2 % RHおよび±0.2 °Cです。スロット付き焼結プローブはケーブル取付式で、キャビネットやダクト内に配置できます。"
    },
    {
     "q": "しきい値アラームに対応していますか？",
     "a": "はい。温度と湿度の高低しきい値はリモートで設定され、限界を超えるとセンサーはクラウドプラットフォーム経由でアラートをプッシュします。"
    },
    {
     "q": "バッテリーはどのくらい持ちますか？",
     "a": "選択されたバッテリー構成は、規定の試験条件下で1時間の送信間隔で10年以上を想定した設計です。実際の寿命はネットワークカバレッジ、温度、送信頻度によって異なります。設置ポイントでの主電源配線は不要です。"
    },
    {
     "q": "どの無線ネットワークがサポートされていますか？",
     "a": "4GおよびNB-IoTでMQTTアップリンクによりHitelecom Cloud、お客様のクラウド、またはプライベートデプロイに接続します。LoRaはプライベートゲートウェイを持つマルチセンサーサイトで利用可能です。"
    }
   ],
   "dateModified": "2026-09-02"
  },
  "302": {
   "series": "Hシリーズ · 温度・湿度データロガー",
   "tagline": "NFC設定 | USBエクスポート | 大容量記録",
   "desc": "Hitelecomの温度・湿度データロガーは、NFC設定とワンクリックUSBエクスポートで最大80,000読数を保存し、コールドチェーン、医薬品、食品物流の監査をサポートするタイムスタンプ付き記録を生成します。",
   "heroImg": "product/details/302-hero.png",
   "pdf": "/downloads/temperature-humidity-data-logger-datasheet.pdf",
   "crumbCat": "温度",
   "returnCid": "263",
   "features": [
    {
     "icon": "product/details/270-f1.png",
     "text": "精度：±0.2 °C / ±2 % RH（典型）"
    },
    {
     "icon": "product/details/270-f2-ip65.png",
     "text": "IP65防護等級筐体"
    },
    {
     "icon": "product/details/270-f3.png",
     "text": "内蔵メモリーに80,000読数"
    },
    {
     "icon": "product/details/270-f4.png",
     "text": "NFCタップで設定、USBワンクリックエクスポート"
    },
    {
     "icon": "product/details/270-f5.png",
     "text": "長期運用向け低消費電力設計"
    },
    {
     "icon": "product/details/270-f6.png",
     "text": "NFCとUSBによるスタンドアロン記録、ゲートウェイ不要"
    },
    {
     "icon": "product/details/270-f7.png",
     "text": "すべての読数にタイムスタンプ付き記録"
    },
    {
     "icon": "product/details/270-f9.png",
     "text": "無料PCソフトウェア：曲線分析とPDF/CSVエクスポート"
    }
   ],
   "specsTitle": "技術仕様",
   "specsDesc": "NFC設定とワンクリックUSBエクスポートを備えたマイクロパワー設計。交換可能なバッテリーはバッテリー交換間の複数年記録をサポートします。",
   "specs": [
    [
     "製品モデル",
     "H200L/H300L"
    ],
    [
     "保存容量",
     "80,000読数"
    ],
    [
     "精度",
     "±0.2 °C / ±2 % RH（典型）"
    ],
    [
     "構成",
     "NFC（Android/iOSアプリ）"
    ],
    [
     "データエクスポート",
     "USB、PDF/CSVレポート"
    ],
    [
     "バッテリー寿命",
     "複数年（交換可能バッテリー）"
    ],
    [
     "保護",
     "IP65"
    ],
    [
     "取付",
     "卓上 · 吊り下げ · 粘着"
    ]
   ],
   "specsStructured": [
    {
     "name": "製品モデル",
     "value": "H200L/H300L"
    },
    {
     "name": "保存容量",
     "value": "80,000読数"
    },
    {
     "name": "精度",
     "value": "±0.2 °C / ±2 % RH（典型）"
    },
    {
     "name": "構成",
     "value": "NFC（Android/iOSアプリ）"
    },
    {
     "name": "データエクスポート",
     "value": "USB、PDF/CSVレポート"
    },
    {
     "name": "バッテリー寿命",
     "value": "複数年（交換可能バッテリー）"
    },
    {
     "name": "保護",
     "value": "IP65"
    },
    {
     "name": "取付",
     "value": "卓上 · 吊り下げ · 粘着"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "適用シーン",
   "scenarios": [
    {
     "img": "product/details/285-scen4.jpg",
     "label": "コールドチェーン輸送"
    },
    {
     "img": "product/details/270-scen5.jpg",
     "label": "食品加工"
    },
    {
     "img": "product/details/270-scen4.jpg",
     "label": "医薬品およびヘルスケア保管"
    },
    {
     "img": "product/details/285-scen3.jpg",
     "label": "病院"
    },
    {
     "img": "product/details/285-scen7.jpg",
     "label": "スマート製造"
    },
    {
     "img": "product/details/285-scen6.jpg",
     "label": "データセンター"
    }
   ],
   "related": [
    "301",
    "270",
    "285",
    "274",
    "280",
    "281",
    "282",
    "283"
   ],
   "summary": "HitelecomのHシリーズ温度・湿度データロガーは、典型精度±0.2 °Cおよび±2 % RHで最大80,000読数を保存します。対応するAndroidまたはiOSデバイスでのNFC設定、PDF/CSVレポートのUSBワンクリックエクスポート、グラフ作成とデータ分析用の無料PCソフトウェア、交換可能な複数年バッテリーが、コールドチェーン、医薬品、食品物流の監査をサポートする記録を提供します。",
   "sku": "H200L/H300L",
   "applications": [
    {
     "name": "コールドチェーン輸送",
     "desc": "冷蔵トラック、リーファーコンテナ、ラストマイルボックスの輸送単位の温度記録。",
     "img": "product/details/285-scen4.jpg"
    },
    {
     "name": "医薬品流通",
     "desc": "ワクチン、インスリン、バイオ医薬品の出荷向けの監査対応PDF/CSV証跡。",
     "img": "product/details/270-scen4.jpg"
    },
    {
     "name": "食品加工と貯蔵",
     "desc": "加工ホール、冷蔵庫、陳列キャビネットでのHACCP対応記録。",
     "img": "product/details/270-scen5.jpg"
    },
    {
     "name": "病院と実験室",
     "desc": "コンプライアンスチェックのための冷蔵庫、冷凍庫、インキュベーター記録。",
     "img": "product/details/285-scen3.jpg"
    },
    {
     "name": "倉庫業",
     "desc": "保税および一般倉庫での長期環境記録。",
     "img": "product/details/276-scen3.jpg"
    },
    {
     "name": "データセンターと書庫",
     "desc": "ワイヤレスアップリンクが不要な部屋の配置記録。",
     "img": "product/details/285-scen6.jpg"
    }
   ],
   "certifications": [
    "IP65"
   ],
   "faqs": [
    {
     "q": "ロガーはどのように設定し、データを読み出しますか？",
     "a": "NFC対応フォンでロガーにタップして起動・停止・設定します — お使いのフォンモデルのiOS NFC対応はHitelecomにご確認ください。輸送後はUSBに接続してPDF/CSVレポートをエクスポートするか、無料PCソフトウェアでファイルを開いて曲線分析を行います。"
    },
    {
     "q": "何読数を保存できますか？",
     "a": "最大80,000読数。5分間隔で約9か月の連続記録をカバーします。"
    },
    {
     "q": "バッテリーは交換可能ですか？",
     "a": "はい。ロガーは複数年寿命の交換可能なバッテリーを使用し、同じロガーを数年にわたり複数回の輸送で再利用できます。"
    },
    {
     "q": "無線でデータをアップロードしますか？",
     "a": "いいえ — これはスタンドアロンのデータロガーです。データはUSBでエクスポートするかNFCで読み出すまでロガーに残り、ライブアップリンクが不要な越境出荷や監査付き納入に適しています。"
    }
   ],
   "dateModified": "2026-09-02"
  },
  "303": {
   "series": "Hシリーズ · TVOCセンサー",
   "tagline": "VOCモニタリング | 固定式 | 超低消費電力",
   "desc": "HitelecomのTVOCセンサーは、0〜100,000 ppbの総揮発性有機化合物を1 ppb分解能で追跡し、塗装工場、化学品倉庫、実験室でのモニタリングをリモートアラームでサポートします。",
   "heroImg": "product/details/303-hero.png",
   "pdf": "/downloads/tvoc-sensor-datasheet.pdf",
   "crumbCat": "空気質",
   "returnCid": "265",
   "features": [
    {
     "icon": "product/details/270-f1.png",
     "text": "分解能：1 ppb"
    },
    {
     "icon": "product/details/270-f2.png",
     "text": "IP68防護等級筐体、カスタマイズ可能"
    },
    {
     "icon": "product/details/270-f3.png",
     "text": "広測定範囲：0〜100,000 ppb"
    },
    {
     "icon": "product/details/270-f4.png",
     "text": "NFCアクティベーションとローカルデバイス設定に対応します。"
    },
    {
     "icon": "product/details/270-f5.png",
     "text": "長期運用向け低消費電力設計"
    },
    {
     "icon": "product/details/270-f6.png",
     "text": "無線オプション：4G LTE、NB-IoT、LoRa。"
    },
    {
     "icon": "product/details/270-f7.png",
     "text": "遠隔VOCモニタリング"
    },
    {
     "icon": "product/details/270-f8.png",
     "text": "構成可能なしきい値アラート"
    }
   ],
   "specsTitle": "技術仕様",
   "specsDesc": "マイクロパワープロセッサーとアルゴリズム最適化により、規定の試験条件下で1時間の送信間隔で最長10年の設計寿命を実現し、定期保守を削減します。",
   "specs": [
    [
     "製品モデル",
     "H200/H300/H500"
    ],
    [
     "測定範囲",
     "0-100,000 ppb"
    ],
    [
     "分解能",
     "1 ppb"
    ],
    [
     "プロトコル",
     "MQTT"
    ],
    [
     "センシング原理",
     "電気化学式またはPID（構成による）"
    ],
    [
     "周波数帯",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "バッテリー寿命",
     "規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。"
    ],
    [
     "取付",
     "耳付け · ダクト取付"
    ]
   ],
   "specsStructured": [
    {
     "name": "製品モデル",
     "value": "H200/H300/H500"
    },
    {
     "name": "測定範囲",
     "value": "0-100,000 ppb",
     "unitText": "10億分の1",
     "minValue": 0.0,
     "maxValue": 100000.0
    },
    {
     "name": "分解能",
     "value": "1 ppb",
     "unitText": "10億分の1"
    },
    {
     "name": "プロトコル",
     "value": "MQTT"
    },
    {
     "name": "センシング原理",
     "value": "電気化学式またはPID（構成による）"
    },
    {
     "name": "周波数帯",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "バッテリー寿命",
     "value": "規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。",
     "unitText": "年",
     "minValue": 10.0
    },
    {
     "name": "取付",
     "value": "耳付け · ダクト取付"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "適用シーン",
   "scenarios": [
    {
     "img": "product/details/285-scen7.jpg",
     "label": "スマート製造"
    },
    {
     "img": "product/details/283-scen5.jpg",
     "label": "化学プラント"
    },
    {
     "img": "product/details/285-scen1.jpg",
     "label": "オフィス環境"
    },
    {
     "img": "product/details/285-scen3.jpg",
     "label": "病院"
    },
    {
     "img": "product/details/285-scen5.jpg",
     "label": "住宅環境"
    },
    {
     "img": "product/details/283-scen7.jpg",
     "label": "スマートビル"
    }
   ],
   "related": [
    "305",
    "285",
    "301",
    "302",
    "270",
    "274",
    "284",
    "283"
   ],
   "summary": "HitelecomのHシリーズTVOCセンサーは、0〜100,000 ppbの総揮発性有機化合物を1 ppb分解能で測定するワイヤレスモニターです。センシング技術は対象化合物に合わせて選択され、ご注文時に確認が必要です。リモートアラームと、規定の試験条件下で1時間の送信間隔で10年以上を想定したバッテリーを備え、塗装工場、化学品倉庫、実験室での継続的モニタリングをサポートします。",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "塗装工場とコーティングライン",
     "desc": "スプレーおよび硬化中に溶剤が蒸発する場所での継続的なTVOC追跡。",
     "img": "product/details/283-scen6.jpg"
    },
    {
     "name": "化学品貯蔵エリア",
     "desc": "ドラム、タンク、キャビネット周辺の蒸気蓄積の早期警告。",
     "img": "product/details/283-scen5.jpg"
    },
    {
     "name": "実験室",
     "desc": "研究者の安全のためのフュームフードおよび室内TVOCモニタリング。",
     "img": "product/details/274-scen5.jpg"
    },
    {
     "name": "印刷および包装工場",
     "desc": "プレス機およびラミネーター近くの溶剤蒸気モニタリング。",
     "img": "product/details/285-scen7.jpg"
    },
    {
     "name": "室内空気質プログラム",
     "desc": "ビル健康監査の主要指標としてのTVOC。",
     "img": "product/details/285-scen1.jpg"
    },
    {
     "name": "排水および廃棄物施設",
     "desc": "処理プラントでの臭気関連VOC動向モニタリング。",
     "img": "product/details/283-scen4.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "TVOCセンサーはどのような範囲と分解能を提供しますか？",
     "a": "測定範囲0〜100,000 ppb、分解能1 ppb。センシング原理は対象ガス混合に応じて電気化学式またはPIDを選択します。"
    },
    {
     "q": "TVOCが異常に上昇するとアラームを出せますか？",
     "a": "はい。しきい値はリモートで設定され、センサーはクラウドプラットフォーム経由でアラームをプッシュするため、設定済みしきい値を超えた際にチームは速やかに対応できます。"
    },
    {
     "q": "防護等級はどのくらいですか？",
     "a": "標準筐体は要求の厳しい産業サイト向けで、IP68は恒久的に露出した屋外ポイント向けのカスタマイズとしてご利用いただけます。設置環境をHitelecomにお知らせください。"
    },
    {
     "q": "どのように給電・接続されますか？",
     "a": "内蔵バッテリーを使用し、規定の試験条件下で1時間の送信間隔で10年以上の寿命を想定した設計で、4GまたはNB-IoT経由でMQTTによりHitelecom Cloudまたはプライベートプラットフォームにアップロードします。"
    }
   ],
   "dateModified": "2026-09-02"
  },
  "304": {
   "series": "Hシリーズ · 資産追跡センサー",
   "tagline": "測位 | 複数年バッテリー | 堅牢",
   "desc": "Hitelecomの資産追跡センサーは、GPSとBeiDou測位を複数年のバッテリー寿命と組み合わせ、ジオフェンスアラートでパレット、工具、返却可能な容器をサイト間で可視化します。",
   "heroImg": "product/details/304-hero.png",
   "pdf": "/downloads/asset-tracking-sensor-datasheet.pdf",
   "crumbCat": "資産追跡",
   "returnCid": "306",
   "features": [
    {
     "icon": "product/details/270-f1.png",
     "text": "GPS + BeiDou デュアルモード測位"
    },
    {
     "icon": "product/details/270-f2-ip67.png",
     "text": "IP67防護等級"
    },
    {
     "icon": "product/details/270-f3.png",
     "text": "セルラーカバレッジが利用可能な場所でのLBSフォールバック"
    },
    {
     "icon": "product/details/270-f4.png",
     "text": "NFCアクティベーションとローカルデバイス設定に対応します。"
    },
    {
     "icon": "product/details/270-f5.png",
     "text": "長期運用向け低消費電力設計"
    },
    {
     "icon": "product/details/270-f6.png",
     "text": "4GまたはNB-IoTによる位置情報送信"
    },
    {
     "icon": "product/details/270-f7.png",
     "text": "クラウドマップ＆位置履歴"
    },
    {
     "icon": "product/details/270-f8.png",
     "text": "ジオフェンス＆移動アラート"
    }
   ],
   "specsTitle": "技術仕様",
   "specsDesc": "マイクロパワー設計と構成可能な送信間隔が複数年のバッテリー動作をサポートします。実際の寿命は測位モード、送信間隔、ネットワークカバレッジによって異なります。",
   "specs": [
    [
     "製品モデル",
     "H200T"
    ],
    [
     "測位",
     "GPS / BeiDou / LBS"
    ],
    [
     "通信",
     "4G / NB-IoT"
    ],
    [
     "プロトコル",
     "MQTT"
    ],
    [
     "バッテリー寿命",
     "複数年（送信間隔による）"
    ],
    [
     "保護",
     "IP67"
    ],
    [
     "取付",
     "マグネット · ネジ · ストラップ"
    ],
    [
     "動作温度",
     "−20 °C〜+70 °C"
    ]
   ],
   "specsStructured": [
    {
     "name": "製品モデル",
     "value": "H200T"
    },
    {
     "name": "測位",
     "value": "GPS / BeiDou / LBS"
    },
    {
     "name": "通信",
     "value": "4G / NB-IoT"
    },
    {
     "name": "プロトコル",
     "value": "MQTT"
    },
    {
     "name": "バッテリー寿命",
     "value": "複数年（送信間隔による）"
    },
    {
     "name": "保護",
     "value": "IP67"
    },
    {
     "name": "取付",
     "value": "マグネット · ネジ · ストラップ"
    },
    {
     "name": "動作温度",
     "value": "−20 °C〜+70 °C",
     "unitText": "摂氏度",
     "minValue": -20.0,
     "maxValue": 70.0
    }
   ],
   "certImgs": [],
   "scenariosHeading": "適用シーン",
   "scenarios": [
    {
     "img": "product/details/285-scen4.jpg",
     "label": "スマート交通"
    },
    {
     "img": "product/details/285-scen7.jpg",
     "label": "スマート製造"
    },
    {
     "img": "product/details/285-scen2.jpg",
     "label": "スマートシティ"
    },
    {
     "img": "product/details/283-scen8.jpg",
     "label": "スマートエネルギー"
    },
    {
     "img": "product/details/283-scen4.jpg",
     "label": "浄水場"
    },
    {
     "img": "product/details/283-scen7.jpg",
     "label": "スマートビル"
    }
   ],
   "related": [
    "301",
    "302",
    "303",
    "305",
    "270",
    "274",
    "280",
    "285"
   ],
   "summary": "HitelecomのHシリーズ資産追跡センサーは、GPSとBeiDou測位（衛星信号が弱い場所ではLBSフォールバック、ネットワーク利用可能性に準拠）を4GまたはNB-IoTアップリンクと組み合わせています。トラッカーは4GまたはNB-IoT経由で位置とジオフェンスイベントを報告し、複数年バッテリー、IP67筐体、マグネット・ネジ・ストラップ取付を組み合わせ、パレット、工具、返却可能な容器をサイト間で可視化します。",
   "sku": "H200T",
   "applications": [
    {
     "name": "パレットと容器のプーリング",
     "desc": "返却可能な輸送品がサプライヤー、工場、倉庫間で可視化されたままになります。",
     "img": "product/details/276-scen3.jpg"
    },
    {
     "name": "工具および機器の追跡",
     "desc": "大規模サイトで共有工具および携帯機器を検索します。",
     "img": "product/details/285-scen7.jpg"
    },
    {
     "name": "物流フリート",
     "desc": "トレーラー、コンテナ、ドーリーの位置およびジオフェンスアラート。",
     "img": "product/details/285-scen4.jpg"
    },
    {
     "name": "建設現場",
     "desc": "変化する作業現場で発電機、コンプレッサー、アタッチメントを追跡します。"
    },
    {
     "name": "公益事業および市有資産",
     "desc": "フィールドの移動ポンプ、バルブ、サービス機器を監視します。",
     "img": "product/details/283-scen4.jpg"
    },
    {
     "name": "レンタル機器",
     "desc": "レンタル機械を特定し、無許可の移動を検出します。",
     "img": "product/details/284-scen2.jpg"
    }
   ],
   "certifications": [
    "IP67"
   ],
   "faqs": [
    {
     "q": "トラッカーはどのように資産を測位しますか？",
     "a": "屋外ではGPSまたはBeiDou衛星測位を使用し、屋内や都市の峡谷ではLBSセル測位がおおよそのフォールバック位置を提供できます（ネットワーク利用可能性に準拠）。"
    },
    {
     "q": "バッテリー寿命はどのくらいですか？",
     "a": "複数年、送信間隔でスケーリング — 1日あたりの位置更新が少ないほど長い稼働になります。正確なプロファイルは展開ごとに構成されます。"
    },
    {
     "q": "資産にはどのように取り付けますか？",
     "a": "3つのオプション：鋼面用マグネット、永久取付用ネジ、パレット・不規則形状資産用ストラップ。IP67が雨とほこりから保護します。"
    },
    {
     "q": "資産がサイトを離れるとアラートを出せますか？",
     "a": "はい。ジオフェンスはプラットフォーム上で描画され、資産が境界を越えるとトラッカーがアラートをプッシュします。"
    }
   ],
   "dateModified": "2026-09-02"
  },
  "305": {
   "series": "Hシリーズ · カスタムガスセンサー",
   "tagline": "100種類以上のガス | 固定式またはダクト式 | OEM/ODM",
   "desc": "対象ガスをお知らせください — Hitelecomがそれに合わせてターミナルを構築します。カスタムガスセンサーは、CO、H₂S、NH₃、O₃、CH₄を含む100種類以上のガスに対応し、産業モニタリング向けの固定式またはダクト式筐体で構成できます。範囲、精度、センシング原理、バッテリー寿命は選択されたガスと構成によって異なります。",
   "heroImg": "product/details/305-hero.png",
   "pdf": "/downloads/custom-gas-sensor-datasheet.pdf",
   "crumbCat": "空気質",
   "returnCid": "265",
   "features": [
    {
     "icon": "product/details/270-f1.png",
     "text": "電気化学式 / NDIR / PID 原理"
    },
    {
     "icon": "product/details/270-f2.png",
     "text": "IP68防護等級筐体、カスタマイズ可能"
    },
    {
     "icon": "product/details/270-f3.png",
     "text": "100種類以上のガス：CO、H₂S、NH₃、O₃、CH₄など"
    },
    {
     "icon": "product/details/270-f4.png",
     "text": "NFCアクティベーションとローカルデバイス設定に対応します。"
    },
    {
     "icon": "product/details/270-f5.png",
     "text": "長期運用向け低消費電力設計"
    },
    {
     "icon": "product/details/270-f6.png",
     "text": "無線オプション：4G LTE、NB-IoT、LoRa。"
    },
    {
     "icon": "product/details/270-f7.png",
     "text": "遠隔ガスモニタリング"
    },
    {
     "icon": "product/details/270-f8.png",
     "text": "構成可能なしきい値アラート"
    }
   ],
   "specsTitle": "技術仕様",
   "specsDesc": "カスタムガスターミナルは、対象ガスに合わせたセンシング原理とマイクロパワープロセッサーを組み合わせます。範囲、精度、バッテリー寿命は選択されたガス、原理、送信間隔によって異なります — 構成ごとにご確認ください。",
   "specs": [
    [
     "製品モデル",
     "H200/H300/H500"
    ],
    [
     "対象ガス",
     "100種類以上の構成可能な対象ガス"
    ],
    [
     "測定範囲",
     "ガスごとに（カスタマイズ）"
    ],
    [
     "プロトコル",
     "MQTT"
    ],
    [
     "センシング原理",
     "電気化学式 / NDIR / PID"
    ],
    [
     "周波数帯",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "バッテリー寿命",
     "規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。"
    ],
    [
     "取付",
     "固定式 · ダクト式"
    ]
   ],
   "specsStructured": [
    {
     "name": "製品モデル",
     "value": "H200/H300/H500"
    },
    {
     "name": "対象ガス",
     "value": "100種類以上の構成可能な対象ガス"
    },
    {
     "name": "測定範囲",
     "value": "ガスごとに（カスタマイズ）"
    },
    {
     "name": "プロトコル",
     "value": "MQTT"
    },
    {
     "name": "センシング原理",
     "value": "電気化学式 / NDIR / PID"
    },
    {
     "name": "周波数帯",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "バッテリー寿命",
     "value": "規定の試験条件下で1時間の送信間隔で10年以上のバッテリー寿命を想定した設計です。実際のバッテリー寿命は、モデル、センシング構成、ネットワークカバレッジ、再送、動作温度、サンプリングレート、送信間隔によって異なります。",
     "unitText": "年",
     "minValue": 10.0
    },
    {
     "name": "取付",
     "value": "固定式 · ダクト式"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "適用シーン",
   "scenarios": [
    {
     "img": "product/details/283-scen3.jpg",
     "label": "炭鉱"
    },
    {
     "img": "product/details/283-scen5.jpg",
     "label": "化学プラント"
    },
    {
     "img": "product/details/283-scen4.jpg",
     "label": "浄水場"
    },
    {
     "img": "product/details/285-scen7.jpg",
     "label": "スマート製造"
    },
    {
     "img": "product/details/283-scen1.jpg",
     "label": "マンホールカバー"
    },
    {
     "img": "product/details/285-scen1.jpg",
     "label": "オフィス環境"
    }
   ],
   "related": [
    "303",
    "285",
    "274",
    "270",
    "301",
    "280",
    "284",
    "283"
   ],
   "summary": "対象ガスをお知らせください — Hitelecomがそれに合わせてターミナルを構築します。Hシリーズのカスタムガスセンサーは、CO、H₂S、NH₃、O₃、CH₄を含む100種類以上のガスに対応し、電気化学式、NDIR、PID原理、固定式またはダクト式筐体、4GまたはNB-IoTアップリンクを備えます。バッテリー寿命はセンシング原理と送信頻度によって異なります（典型的な構成で1時間間隔で10年以上を想定した設計）。",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "炭鉱",
     "desc": "有線ガスシステムの拡張が困難な地下でのCH₄およびCOモニタリング。",
     "img": "product/details/283-scen3.jpg"
    },
    {
     "name": "化学プラント",
     "desc": "生産および貯蔵エリアでのプロセス固有ガスのポイント監視。",
     "img": "product/details/283-scen5.jpg"
    },
    {
     "name": "給水および排水プラント",
     "desc": "湿井、スクリーン、汚泥室でのH₂S検出。",
     "img": "product/details/283-scen4.jpg"
    },
    {
     "name": "冷蔵保管と冷凍",
     "desc": "アンモニア冷凍プラント向けのNH₃漏洩検出。",
     "img": "product/details/270-scen5.jpg"
    },
    {
     "name": "マンホールと閉所",
     "desc": "市の閉所での進入前および継続的なガスチェック。",
     "img": "product/details/283-scen1.jpg"
    },
    {
     "name": "半導体と実験室",
     "desc": "使用中の特定ガスに合わせた特殊ガス漏洩モニタリング。",
     "img": "product/details/274-scen2.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "どのガスを検出できますか？",
     "a": "CO、H₂S、NH₃、O₃、CH₄、Cl₂、VOCを含む100種類以上の対象ガス。センシング技術（電気化学式、NDIR、PID）と測定範囲は対象ガスに合わせて選択されます。"
    },
    {
     "q": "カスタムガスセンサーはどのように注文しますか？",
     "a": "対象ガス、予想範囲、設置様式（固定式またはダクト式）、現場条件をHitelecomにお知らせください。エンジニアリングがOEM/ODMプログラムの下で構成とリードタイムを確認します。"
    },
    {
     "q": "筐体は屋外設置に対応できますか？",
     "a": "はい。固定式およびダクト式筐体はほとんどのサイトをカバーし、IP68保護は恒久的に露出した場所向けのカスタマイズとしてご利用いただけます。"
    },
    {
     "q": "どのようにアラームを報告しますか？",
     "a": "4GまたはNB-IoT経由でMQTTによりHitelecom Cloudまたはプライベートプラットフォームにワイヤレス送信し、リモートでアラームしきい値を設定します。"
    }
   ],
   "dateModified": "2026-09-02"
  }
 }
}, es: {
 "cloud": {
  "banner": {
   "title": "Hitelecom Cloud",
   "subtitle": "Una plataforma IoT segura y confiable",
   "desc": "Hitelecom Cloud es una plataforma inteligente de integración de datos que proporciona conectividad de dispositivos, monitoreo remoto y análisis avanzado de datos, permitiendo a las empresas optimizar sus operaciones y tomar decisiones inteligentes.",
   "images": [
    "product/cloud/banner-1.png",
    "product/cloud/banner-2.png",
    "product/cloud/banner-3.png",
    "product/cloud/banner-4.png"
   ]
  },
  "intro": {
   "heading": "Conecte los dispositivos de campo a la nube",
   "paras": [
    "Hitelecom ofrece una solución integrada que abarca sensores IoT, gateways, controladores y software en la nube, para que los datos de campo lleguen del dispositivo a su panel con menos pasos de integración.",
    "El diseño de dispositivos de consumo ultrabajo reduce el consumo de energía durante todo el ciclo de vida del producto, apoyando despliegues sostenibles a largo plazo."
   ],
   "cards": [
    {
     "img": "product/cloud/deploy-1.png",
     "title": "Nube pública",
     "desc": "Conecte y gestione dispositivos rápidamente con monitoreo, alertas, análisis y mantenimiento remoto en Hitelecom Cloud."
    },
    {
     "img": "product/cloud/deploy-2.png",
     "title": "Nube privada",
     "desc": "Implemente la plataforma en infraestructura controlada por el cliente para aislamiento de datos, control de acceso y operaciones locales."
    },
    {
     "img": "product/cloud/deploy-3.png",
     "title": "Nube híbrida",
     "desc": "Mantenga las cargas de trabajo sensibles en infraestructura privada mientras usa la nube pública para servicios seleccionados y cargas escalables."
    },
    {
     "img": "product/cloud/deploy-4.png",
     "title": "Nube de borde",
     "desc": "Procese datos localmente, ejecute lógica de control básica y mantenga funciones seleccionadas disponibles cuando la conectividad a la nube sea limitada."
    }
   ]
  },
  "features": {
   "heading": "Funciones de Hitelecom Cloud",
   "items": [
    {
     "img": "product/cloud/feature-1.png",
     "text": "Solución IoT integral"
    },
    {
     "img": "product/cloud/feature-2.png",
     "text": "Conectividad de dispositivos a gran escala"
    },
    {
     "img": "product/cloud/feature-3.png",
     "text": "Arquitectura distribuida altamente confiable"
    },
    {
     "img": "product/cloud/feature-4.png",
     "text": "Procesamiento de baja latencia"
    },
    {
     "img": "product/cloud/feature-5.png",
     "text": "Soporte multiprotocolo"
    },
    {
     "img": "product/cloud/feature-6.png",
     "text": "Operación y mantenimiento visuales"
    },
    {
     "img": "product/cloud/feature-7.png",
     "text": "Protocolo de dispositivos HiLink"
    },
    {
     "img": "product/cloud/feature-8.png",
     "text": "Desarrollo personalizado de hardware y software"
    }
   ]
  },
  "architecture": {
   "heading": "Arquitectura de la plataforma",
   "img": "product/cloud/architecture.gif"
  },
  "core": {
   "heading": "Funciones principales",
   "subtitle": "Acelere su negocio IoT con una conectividad eficiente y una gestión precisa",
   "items": [
    {
     "img": "product/cloud/core-1.jpg",
     "title": "Conectividad de dispositivos",
     "desc": "Conecte sensores, controladores, gateways y dispositivos de borde mediante MQTT, HTTP, TCP, CoAP, AMQP o el protocolo HiLink, según el soporte del dispositivo."
    },
    {
     "img": "product/cloud/core-2.jpg",
     "title": "Gestión de dispositivos",
     "desc": "Vea el estado de los dispositivos en vivo, monitoree la calidad de la conexión y analice las alarmas.\n\nEl almacenamiento y reenvío con reintento mantiene el flujo de datos cuando las condiciones de la red son inestables.\n\nVea la distribución de los dispositivos y los datos de ubicación en una vista de mapa.\n\nGestione actualizaciones remotas de firmware OTA y operaciones por lotes para los dispositivos compatibles."
    },
    {
     "img": "product/cloud/core-3.jpg",
     "title": "Reglas de alarma",
     "desc": "Configure reglas de alarma flexibles con condiciones de activación y cálculos de atributos para el monitoreo continuo de dispositivos.\n\nDetecte condiciones como temperatura alta, presión anómala o caudal rápido para respaldar decisiones oportunas.\n\nLas alarmas se desactivan automáticamente cuando la condición de disparo vuelve a la normalidad, reduciendo el seguimiento manual.\n\nImplemente configuraciones de alarma por lotes y reciba informes de alarmas de los terminales conectados."
    },
    {
     "img": "product/cloud/core-4.jpg",
     "title": "Visualización de datos",
     "desc": "Cree paneles para diseños de escritorio, móviles y pantallas grandes, conectados en vivo a las fuentes de datos de los dispositivos.\n\nVea los paneles en murales de vídeo (videowalls), PC, tabletas y teléfonos con actualización en tiempo real.\n\nLas alarmas aparecen casi en tiempo real, y los comandos de configuración pueden emitirse desde el panel, según la conectividad del dispositivo.\n\nLas vistas opcionales de GIS y gemelo digital pueden mostrar la ubicación, el estado y el historial de movimiento de los dispositivos."
    },
    {
     "img": "product/cloud/core-5.jpg",
     "title": "API abierta",
     "desc": "APIs abiertas para la integración con dispositivos y controladores de terceros.\n\nUse API o MQTT para enviar los datos de los dispositivos a centros de datos o plataformas del cliente.\n\nLa integración nube a nube puede consolidar datos de terceros compatibles en Hitelecom Cloud."
    },
    {
     "img": "product/cloud/core-6.webp",
     "title": "Automatización basada en reglas",
     "desc": "Vincule dispositivos con reglas de escena: por ejemplo, encienda la refrigeración cuando la temperatura supere un umbral configurado, o active los controladores de riego compatibles cuando la humedad del suelo caiga por debajo del umbral configurado.\n\nCombinada con los terminales IoT de consumo ultrabajo de Hitelecom, la automatización basada en reglas reduce la intervención manual rutinaria."
    }
   ]
  },
  "scenarios": {
   "heading": "Escenarios de aplicación",
   "tabs": [
    {
     "icons": [
      "product/cloud/scen-icon-1a.png",
      "product/cloud/scen-icon-1b.png"
     ],
     "label": "IoT industrial"
    },
    {
     "icons": [
      "product/cloud/scen-icon-2a.png",
      "product/cloud/scen-icon-2b.png"
     ],
     "label": "Energía inteligente"
    },
    {
     "icons": [
      "product/cloud/scen-icon-3a.png",
      "product/cloud/scen-icon-3b.png"
     ],
     "label": "Campus inteligente"
    },
    {
     "icons": [
      "product/cloud/scen-icon-4a.png",
      "product/cloud/scen-icon-4b.png"
     ],
     "label": "Agricultura inteligente"
    }
   ],
   "bgs": [
    "product/cloud/scen-bg-1.jpg",
    "product/cloud/scen-bg-2.jpg",
    "product/cloud/scen-bg-3.png",
    "product/cloud/scen-bg-4.png"
   ],
   "slides": [
    {
     "img": "product/cloud/scen-bg-1.jpg",
     "title": "IoT industrial",
     "desc": "Conecte dispositivos, sistemas y equipos para agilizar los procesos de producción y mejorar el aprovechamiento de los recursos. Los terminales de sensores de Hitelecom proporcionan monitoreo en tiempo real del estado de los equipos, apoyando el mantenimiento basado en el estado y la respuesta rápida ante fallos."
    },
    {
     "img": "product/cloud/scen-bg-2.jpg",
     "title": "Energía inteligente",
     "desc": "Los terminales de sensores de Hitelecom apoyan la gestión de la energía mediante monitoreo en tiempo real, adquisición de datos y control remoto. Los datos respaldan el análisis energético y el mantenimiento basado en el estado, reduciendo el trabajo manual rutinario. Hitelecom Cloud puede integrarse con los sistemas de energía existentes mediante API y protocolos compatibles, ayudando a las empresas a seguir los costos operativos y las métricas de sostenibilidad."
    },
    {
     "img": "product/cloud/scen-bg-3.png",
     "title": "Campus inteligente",
     "desc": "El IoT en los campus inteligentes conecta dispositivos y comparte datos entre instalaciones. Los terminales de sensores de Hitelecom proporcionan monitoreo en tiempo real del entorno del campus, las condiciones de seguridad y el consumo de energía, ofreciendo a los administradores una imagen operativa continua."
    },
    {
     "img": "product/cloud/scen-bg-4.png",
     "title": "Agricultura inteligente",
     "desc": "Los dispositivos IoT inteligentes de Hitelecom monitorean la humedad del suelo, la temperatura y la luz en tiempo real, proporcionando datos que respaldan las decisiones de riego y fertilización y pueden reducir el trabajo de campo rutinario. Integrados con estaciones meteorológicas y controladores de riego compatibles, conectan la detección de campo con la gestión agrícola automatizada."
    }
   ]
  },
  "cta": {
   "title": "Conozca Hitelecom IoT Cloud",
   "subtitle": "Una plataforma sencilla para conectar, monitorear y gestionar los dispositivos IoT compatibles.",
   "primary": "Ver demo en la nube",
   "secondary": "Hablemos de su proyecto"
  }
 },
 "app": {
  "banner": {
   "title": "Hitelecom App",
   "subtitle": "Monitoreo remoto para su negocio, desde cualquier lugar",
   "desc": "La app de Hitelecom es una herramienta de monitoreo remoto simple y práctica. Acceda a sus dispositivos conectados y gestiónelos desde cualquier lugar con su dispositivo móvil.",
   "images": [
    "product/cloud/banner-1.png",
    "product/cloud/banner-2.png",
    "product/cloud/banner-3.png",
    "product/app/banner-4.png"
   ]
  },
  "platforms": {
   "heading": "Disponible en todas las plataformas",
   "items": [
    {
     "img": "product/app/platform-1.png",
     "name": "Windows"
    },
    {
     "img": "product/app/platform-2.png",
     "name": "iOS"
    },
    {
     "img": "product/app/platform-3.png",
     "name": "Android"
    },
    {
     "img": "product/app/platform-4.png",
     "name": "Miniprograma de WeChat"
    }
   ]
  },
  "features": {
   "heading": "Características del producto",
   "subtitle": "Registre dispositivos, configure sensores, gestione el acceso de usuarios y monitoree datos en vivo desde una sola aplicación.",
   "items": [
    {
     "img": "product/app/feature-1.png",
     "title": "Activación de dispositivos",
     "desc": "Use la app de Hitelecom para activar o reactivar los dispositivos con NFC, acelerando el despliegue y la configuración in situ."
    },
    {
     "img": "product/app/feature-2.png",
     "title": "Conectividad de dispositivos",
     "desc": "Conecte los dispositivos activados a Hitelecom Cloud y configure alarmas, tareas, intervalos de transmisión y horarios según cada implementación."
    },
    {
     "img": "product/app/feature-3.png",
     "title": "Asignación de dispositivos",
     "desc": "Cree y gestione usuarios, roles, departamentos y permisos mediante un modelo de acceso basado en roles."
    },
    {
     "img": "product/app/feature-4.png",
     "title": "Interfaz de app personalizada",
     "desc": "Personalice los componentes y las interfaces de la app según los flujos de trabajo y los requisitos de marca del cliente."
    },
    {
     "img": "product/app/feature-5.png",
     "title": "Paneles de datos",
     "desc": "Vea las lecturas actuales, las tendencias y los informes descargables en una sola interfaz."
    },
    {
     "img": "product/app/feature-6.png",
     "title": "Visualización de datos en mapas",
     "desc": "Vea la ubicación y el estado de los dispositivos en mapas interactivos para apoyar las operaciones de campo y la gestión de activos."
    },
    {
     "img": "product/app/feature-7.png",
     "title": "Gestión de alarmas",
     "desc": "El monitoreo del estado de los dispositivos en tiempo real, con alertas enviadas a la app, ayuda a los equipos a responder más rápido a las alertas activadas y a mantener los equipos en funcionamiento."
    },
    {
     "img": "product/app/feature-8.png",
     "title": "Soporte multilingüe",
     "desc": "La interfaz estándar admite chino e inglés. Hay más idiomas de interfaz disponibles mediante desarrollo personalizado."
    }
   ]
  },
  "app3": {
   "heading": "Escenarios de aplicación",
   "subtitle": "Use los datos de campo conectados para monitorear operaciones, responder a alertas y mejorar las decisiones en todas las industrias.",
   "items": [
    {
     "img": "product/app/scen-0bbcd0.jpg",
     "label": "Agricultura inteligente"
    },
    {
     "img": "product/app/scen-214abe.jpg",
     "label": "Monitoreo ambiental"
    },
    {
     "img": "product/app/scen-f607f3.jpg",
     "label": "IoT industrial"
    },
    {
     "img": "product/app/scen-7d03dc.jpg",
     "label": "Campus inteligente"
    },
    {
     "img": "product/app/scen-4f4630.jpg",
     "label": "Ciudad inteligente"
    },
    {
     "img": "product/app/scen-83dd3b.jpg",
     "label": "Agua inteligente"
    },
    {
     "img": "product/app/scen-1c2289.jpg",
     "label": "Energía inteligente"
    },
    {
     "img": "product/app/scen-67bc5a.jpg",
     "label": "Rastreo de activos"
    }
   ]
  }
 },
 "lists": {
  "261": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "Todos",
     "on": true
    },
    {
     "cid": "263",
     "name": "Temperatura",
     "on": false
    },
    {
     "cid": "262",
     "name": "Presión",
     "on": false
    },
    {
     "cid": "269",
     "name": "Suelo",
     "on": false
    },
    {
     "cid": "268",
     "name": "Nivel de líquido",
     "on": false
    },
    {
     "cid": "267",
     "name": "Monitoreo de inclinación",
     "on": false
    },
    {
     "cid": "266",
     "name": "Distancia por radar",
     "on": false
    },
    {
     "cid": "271",
     "name": "Monitoreo de vibración",
     "on": false
    },
    {
     "cid": "265",
     "name": "Calidad del aire",
     "on": false
    },
    {
     "cid": "306",
     "name": "Rastreo de activos",
     "on": false
    }
   ],
   "products": [
    {
     "id": "270",
     "img": "product/products/270.png",
     "name": "Sensor de temperatura",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "274",
     "img": "product/products/274.png",
     "name": "Sensor de presión",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "280",
     "img": "product/products/280.png",
     "name": "Sensor de suelo",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "281",
     "img": "product/products/281.png",
     "name": "Sensor de nivel sumergible",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "282",
     "img": "product/products/282.png",
     "name": "Sensor de inclinación",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "283",
     "img": "product/products/283.png",
     "name": "Sensor de distancia por radar",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "284",
     "img": "product/products/284.png",
     "name": "Sensor de vibración",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": "285",
     "img": "product/products/285.png",
     "name": "Sensor de calidad del aire",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": 301,
     "name": "Sensor de temperatura y humedad",
     "conn": "NB-IoT | 4G LTE | LoRa",
     "img": "product/products/301.png"
    },
    {
     "id": 302,
     "name": "Registrador de datos de temperatura y humedad",
     "conn": "NFC | USB",
     "img": "product/products/302.png"
    },
    {
     "id": 303,
     "name": "Sensor de TVOC",
     "conn": "NB-IoT | 4G LTE | LoRa",
     "img": "product/products/303.png"
    },
    {
     "id": 304,
     "name": "Sensor de rastreo de activos",
     "conn": "GPS | BeiDou | 4G LTE",
     "img": "product/products/304.png"
    },
    {
     "id": 305,
     "name": "Sensor de gas personalizado",
     "conn": "NB-IoT | 4G LTE | LoRa",
     "img": "product/products/305.png"
    }
   ]
  },
  "258": {
   "bannerImg": "product/list/banner-258.jpg",
   "subcats": [
    {
     "cid": "258",
     "name": "Todos",
     "on": true
    },
    {
     "cid": "272",
     "name": "Gateway de interior",
     "on": false
    },
    {
     "cid": "273",
     "name": "Gateway de exterior",
     "on": false
    }
   ],
   "products": [
    {
     "id": "276",
     "img": "product/products/276.png",
     "name": "Gateway de interior",
     "conn": "LoRa | 4G LTE | Ethernet"
    },
    {
     "id": "275",
     "img": "product/products/275.png",
     "name": "Gateway de exterior",
     "conn": "LoRa | 4G LTE | Ethernet"
    }
   ]
  },
  "257": {
   "bannerImg": "product/list/banner-257.jpg",
   "subcats": [
    {
     "cid": "257",
     "name": "Todos",
     "on": true
    },
    {
     "cid": "275",
     "name": "6 parámetros",
     "on": false
    },
    {
     "cid": "274",
     "name": "12 parámetros",
     "on": false
    }
   ],
   "products": [
    {
     "id": "278",
     "img": "product/products/278.png",
     "name": "Estación meteorológica",
     "conn": "Multiparámetro | Tiempo real | Fácil implementación"
    },
    {
     "id": "277",
     "img": "product/products/277.png",
     "name": "Estación hidrológica",
     "conn": "Tiempo real | Multiparámetro | Nivel milimétrico"
    }
   ]
  },
  "256": {
   "bannerImg": "product/list/banner-256.jpg",
   "subcats": [
    {
     "cid": "256",
     "name": "Todos",
     "on": true
    },
    {
     "cid": "278",
     "name": "Software",
     "on": false
    },
    {
     "cid": "279",
     "name": "Hardware",
     "on": false
    }
   ],
   "products": [
    {
     "id": "",
     "img": "product/products/custom-1.png",
     "name": "Gemelo digital",
     "conn": "Paneles personalizados y visualización dinámica de datos"
    },
    {
     "id": "",
     "img": "product/products/custom-2.png",
     "name": "Panel GIS",
     "conn": "Mapas personalizados y visualización multidimensional de datos"
    },
    {
     "id": "",
     "img": "product/products/custom-3.png",
     "name": "Software embebido",
     "conn": "Software embebido adaptado a las necesidades específicas de la aplicación"
    },
    {
     "id": "",
     "img": "product/products/custom-4.png",
     "name": "Personalización de hardware",
     "conn": "Sensores, controladores, actuadores y otros dispositivos conectados personalizados"
    },
    {
     "id": "287",
     "img": "product/products/287.png",
     "name": "Accesorios IoT",
     "conn": "Signal Coupling | 2,4 GHz | 5,8 GHz"
    },
    {
     "id": "286",
     "img": "product/products/286.png",
     "name": "Sensor 2 en 1 para áreas peligrosas",
     "conn": "Temperatura | Presión | Comunicación 4G"
    }
   ]
  },
  "262": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "Todos",
     "on": false
    },
    {
     "cid": "263",
     "name": "Temperatura",
     "on": false
    },
    {
     "cid": "262",
     "name": "Presión",
     "on": true
    },
    {
     "cid": "269",
     "name": "Suelo",
     "on": false
    },
    {
     "cid": "268",
     "name": "Nivel de líquido",
     "on": false
    },
    {
     "cid": "267",
     "name": "Monitoreo de inclinación",
     "on": false
    },
    {
     "cid": "266",
     "name": "Distancia por radar",
     "on": false
    },
    {
     "cid": "271",
     "name": "Monitoreo de vibración",
     "on": false
    },
    {
     "cid": "265",
     "name": "Calidad del aire",
     "on": false
    },
    {
     "cid": "306",
     "name": "Rastreo de activos",
     "on": false
    }
   ],
   "products": [
    {
     "id": "274",
     "img": "product/products/274.png",
     "name": "Sensor de presión",
     "conn": "NB-IoT | 4G LTE | LoRa"
    }
   ]
  },
  "263": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "Todos",
     "on": false
    },
    {
     "cid": "263",
     "name": "Temperatura",
     "on": true
    },
    {
     "cid": "262",
     "name": "Presión",
     "on": false
    },
    {
     "cid": "269",
     "name": "Suelo",
     "on": false
    },
    {
     "cid": "268",
     "name": "Nivel de líquido",
     "on": false
    },
    {
     "cid": "267",
     "name": "Monitoreo de inclinación",
     "on": false
    },
    {
     "cid": "266",
     "name": "Distancia por radar",
     "on": false
    },
    {
     "cid": "271",
     "name": "Monitoreo de vibración",
     "on": false
    },
    {
     "cid": "265",
     "name": "Calidad del aire",
     "on": false
    },
    {
     "cid": "306",
     "name": "Rastreo de activos",
     "on": false
    }
   ],
   "products": [
    {
     "id": "270",
     "img": "product/products/270.png",
     "name": "Sensor de temperatura",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": 301,
     "name": "Sensor de temperatura y humedad",
     "conn": "NB-IoT | 4G LTE | LoRa",
     "img": "product/products/301.png"
    },
    {
     "id": 302,
     "name": "Registrador de datos de temperatura y humedad",
     "conn": "NFC | USB",
     "img": "product/products/302.png"
    }
   ]
  },
  "265": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "Todos",
     "on": false
    },
    {
     "cid": "263",
     "name": "Temperatura",
     "on": false
    },
    {
     "cid": "262",
     "name": "Presión",
     "on": false
    },
    {
     "cid": "269",
     "name": "Suelo",
     "on": false
    },
    {
     "cid": "268",
     "name": "Nivel de líquido",
     "on": false
    },
    {
     "cid": "267",
     "name": "Monitoreo de inclinación",
     "on": false
    },
    {
     "cid": "266",
     "name": "Distancia por radar",
     "on": false
    },
    {
     "cid": "271",
     "name": "Monitoreo de vibración",
     "on": false
    },
    {
     "cid": "265",
     "name": "Calidad del aire",
     "on": true
    },
    {
     "cid": "306",
     "name": "Rastreo de activos",
     "on": false
    }
   ],
   "products": [
    {
     "id": "285",
     "img": "product/products/285.png",
     "name": "Sensor de calidad del aire",
     "conn": "NB-IoT | 4G LTE | LoRa"
    },
    {
     "id": 303,
     "name": "Sensor de TVOC",
     "conn": "NB-IoT | 4G LTE | LoRa",
     "img": "product/products/303.png"
    },
    {
     "id": 305,
     "name": "Sensor de gas personalizado",
     "conn": "NB-IoT | 4G LTE | LoRa",
     "img": "product/products/305.png"
    }
   ]
  },
  "266": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "Todos",
     "on": false
    },
    {
     "cid": "263",
     "name": "Temperatura",
     "on": false
    },
    {
     "cid": "262",
     "name": "Presión",
     "on": false
    },
    {
     "cid": "269",
     "name": "Suelo",
     "on": false
    },
    {
     "cid": "268",
     "name": "Nivel de líquido",
     "on": false
    },
    {
     "cid": "267",
     "name": "Monitoreo de inclinación",
     "on": false
    },
    {
     "cid": "266",
     "name": "Distancia por radar",
     "on": true
    },
    {
     "cid": "271",
     "name": "Monitoreo de vibración",
     "on": false
    },
    {
     "cid": "265",
     "name": "Calidad del aire",
     "on": false
    },
    {
     "cid": "306",
     "name": "Rastreo de activos",
     "on": false
    }
   ],
   "products": [
    {
     "id": "283",
     "img": "product/products/283.png",
     "name": "Sensor de distancia por radar",
     "conn": "NB-IoT | 4G LTE | LoRa"
    }
   ]
  },
  "267": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "Todos",
     "on": false
    },
    {
     "cid": "263",
     "name": "Temperatura",
     "on": false
    },
    {
     "cid": "262",
     "name": "Presión",
     "on": false
    },
    {
     "cid": "269",
     "name": "Suelo",
     "on": false
    },
    {
     "cid": "268",
     "name": "Nivel de líquido",
     "on": false
    },
    {
     "cid": "267",
     "name": "Monitoreo de inclinación",
     "on": true
    },
    {
     "cid": "266",
     "name": "Distancia por radar",
     "on": false
    },
    {
     "cid": "271",
     "name": "Monitoreo de vibración",
     "on": false
    },
    {
     "cid": "265",
     "name": "Calidad del aire",
     "on": false
    },
    {
     "cid": "306",
     "name": "Rastreo de activos",
     "on": false
    }
   ],
   "products": [
    {
     "id": "282",
     "img": "product/products/282.png",
     "name": "Sensor de inclinación",
     "conn": "NB-IoT | 4G LTE | LoRa"
    }
   ]
  },
  "268": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "Todos",
     "on": false
    },
    {
     "cid": "263",
     "name": "Temperatura",
     "on": false
    },
    {
     "cid": "262",
     "name": "Presión",
     "on": false
    },
    {
     "cid": "269",
     "name": "Suelo",
     "on": false
    },
    {
     "cid": "268",
     "name": "Nivel de líquido",
     "on": true
    },
    {
     "cid": "267",
     "name": "Monitoreo de inclinación",
     "on": false
    },
    {
     "cid": "266",
     "name": "Distancia por radar",
     "on": false
    },
    {
     "cid": "271",
     "name": "Monitoreo de vibración",
     "on": false
    },
    {
     "cid": "265",
     "name": "Calidad del aire",
     "on": false
    },
    {
     "cid": "306",
     "name": "Rastreo de activos",
     "on": false
    }
   ],
   "products": [
    {
     "id": "281",
     "img": "product/products/281.png",
     "name": "Sensor de nivel sumergible",
     "conn": "NB-IoT | 4G LTE | LoRa"
    }
   ]
  },
  "269": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "Todos",
     "on": false
    },
    {
     "cid": "263",
     "name": "Temperatura",
     "on": false
    },
    {
     "cid": "262",
     "name": "Presión",
     "on": false
    },
    {
     "cid": "269",
     "name": "Suelo",
     "on": true
    },
    {
     "cid": "268",
     "name": "Nivel de líquido",
     "on": false
    },
    {
     "cid": "267",
     "name": "Monitoreo de inclinación",
     "on": false
    },
    {
     "cid": "266",
     "name": "Distancia por radar",
     "on": false
    },
    {
     "cid": "271",
     "name": "Monitoreo de vibración",
     "on": false
    },
    {
     "cid": "265",
     "name": "Calidad del aire",
     "on": false
    },
    {
     "cid": "306",
     "name": "Rastreo de activos",
     "on": false
    }
   ],
   "products": [
    {
     "id": "280",
     "img": "product/products/280.png",
     "name": "Sensor de suelo",
     "conn": "NB-IoT | 4G LTE | LoRa"
    }
   ]
  },
  "271": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "Todos",
     "on": false
    },
    {
     "cid": "263",
     "name": "Temperatura",
     "on": false
    },
    {
     "cid": "262",
     "name": "Presión",
     "on": false
    },
    {
     "cid": "269",
     "name": "Suelo",
     "on": false
    },
    {
     "cid": "268",
     "name": "Nivel de líquido",
     "on": false
    },
    {
     "cid": "267",
     "name": "Monitoreo de inclinación",
     "on": false
    },
    {
     "cid": "266",
     "name": "Distancia por radar",
     "on": false
    },
    {
     "cid": "271",
     "name": "Monitoreo de vibración",
     "on": true
    },
    {
     "cid": "265",
     "name": "Calidad del aire",
     "on": false
    },
    {
     "cid": "306",
     "name": "Rastreo de activos",
     "on": false
    }
   ],
   "products": [
    {
     "id": "284",
     "img": "product/products/284.png",
     "name": "Sensor de vibración",
     "conn": "NB-IoT | 4G LTE | LoRa"
    }
   ]
  },
  "272": {
   "bannerImg": "product/list/banner-258.jpg",
   "subcats": [
    {
     "cid": "258",
     "name": "Todos",
     "on": false
    },
    {
     "cid": "272",
     "name": "Gateway de interior",
     "on": true
    },
    {
     "cid": "273",
     "name": "Gateway de exterior",
     "on": false
    }
   ],
   "products": [
    {
     "id": "276",
     "img": "product/products/276.png",
     "name": "Gateway de interior",
     "conn": "LoRa | 4G LTE | Ethernet"
    }
   ]
  },
  "273": {
   "bannerImg": "product/list/banner-258.jpg",
   "subcats": [
    {
     "cid": "258",
     "name": "Todos",
     "on": false
    },
    {
     "cid": "272",
     "name": "Gateway de interior",
     "on": false
    },
    {
     "cid": "273",
     "name": "Gateway de exterior",
     "on": true
    }
   ],
   "products": [
    {
     "id": "275",
     "img": "product/products/275.png",
     "name": "Gateway de exterior",
     "conn": "LoRa | 4G LTE | Ethernet"
    }
   ]
  },
  "274": {
   "bannerImg": "product/list/banner-257.jpg",
   "subcats": [
    {
     "cid": "257",
     "name": "Todos",
     "on": false
    },
    {
     "cid": "275",
     "name": "6 parámetros",
     "on": false
    },
    {
     "cid": "274",
     "name": "12 parámetros",
     "on": true
    }
   ],
   "products": [
    {
     "id": "277",
     "img": "product/products/277.png",
     "name": "Estación hidrológica",
     "conn": "Tiempo real | Multiparámetro | Nivel milimétrico"
    }
   ]
  },
  "275": {
   "bannerImg": "product/list/banner-257.jpg",
   "subcats": [
    {
     "cid": "257",
     "name": "Todos",
     "on": false
    },
    {
     "cid": "275",
     "name": "6 parámetros",
     "on": true
    },
    {
     "cid": "274",
     "name": "12 parámetros",
     "on": false
    }
   ],
   "products": [
    {
     "id": "278",
     "img": "product/products/278.png",
     "name": "Estación meteorológica",
     "conn": "Multiparámetro | Tiempo real | Fácil implementación"
    }
   ]
  },
  "278": {
   "bannerImg": "product/list/banner-256.jpg",
   "subcats": [
    {
     "cid": "256",
     "name": "Todos",
     "on": false
    },
    {
     "cid": "278",
     "name": "Software",
     "on": true
    },
    {
     "cid": "279",
     "name": "Hardware",
     "on": false
    }
   ],
   "products": [
    {
     "id": "",
     "img": "product/products/custom-1.png",
     "name": "Gemelo digital",
     "conn": "Paneles personalizados y visualización dinámica de datos"
    },
    {
     "id": "",
     "img": "product/products/custom-2.png",
     "name": "Panel GIS",
     "conn": "Mapas personalizados y visualización multidimensional de datos"
    },
    {
     "id": "",
     "img": "product/products/custom-3.png",
     "name": "Software embebido",
     "conn": "Software embebido adaptado a las necesidades específicas de la aplicación"
    }
   ]
  },
  "279": {
   "bannerImg": "product/list/banner-256.jpg",
   "subcats": [
    {
     "cid": "256",
     "name": "Todos",
     "on": false
    },
    {
     "cid": "278",
     "name": "Software",
     "on": false
    },
    {
     "cid": "279",
     "name": "Hardware",
     "on": true
    }
   ],
   "products": [
    {
     "id": "",
     "img": "product/products/custom-4.png",
     "name": "Personalización de hardware",
     "conn": "Sensores, controladores, actuadores y otros dispositivos conectados personalizados"
    },
    {
     "id": "287",
     "img": "product/products/287.png",
     "name": "Accesorios IoT",
     "conn": "Signal Coupling | 2,4 GHz | 5,8 GHz"
    },
    {
     "id": "286",
     "img": "product/products/286.png",
     "name": "Sensor 2 en 1 para áreas peligrosas",
     "conn": "Temperatura | Presión | Comunicación 4G"
    }
   ]
  },
  "306": {
   "bannerImg": "product/list/banner-261.jpg",
   "subcats": [
    {
     "cid": "261",
     "name": "Todos",
     "on": false
    },
    {
     "cid": "263",
     "name": "Temperatura",
     "on": false
    },
    {
     "cid": "262",
     "name": "Presión",
     "on": false
    },
    {
     "cid": "269",
     "name": "Suelo",
     "on": false
    },
    {
     "cid": "268",
     "name": "Nivel de líquido",
     "on": false
    },
    {
     "cid": "267",
     "name": "Monitoreo de inclinación",
     "on": false
    },
    {
     "cid": "266",
     "name": "Distancia por radar",
     "on": false
    },
    {
     "cid": "271",
     "name": "Monitoreo de vibración",
     "on": false
    },
    {
     "cid": "265",
     "name": "Calidad del aire",
     "on": false
    },
    {
     "cid": "306",
     "name": "Rastreo de activos",
     "on": true
    }
   ],
   "products": [
    {
     "id": 304,
     "name": "Sensor de rastreo de activos",
     "conn": "GPS | BeiDou | 4G LTE",
     "img": "product/products/304.png"
    }
   ]
  }
 },
 "details": {
  "270": {
   "series": "Serie H · Sensor de temperatura",
   "tagline": "Precisión | Rango | Consumo ultrabajo",
   "desc": "Los sensores de temperatura de Hitelecom ofrecen monitoreo remoto, alertas y medición de alta precisión, entregando datos de temperatura oportunos y confiables en diversas aplicaciones",
   "heroImg": "product/details/270-hero.png",
   "pdf": "/downloads/temperature-sensor-datasheet.pdf",
   "crumbCat": "Temperatura",
   "returnCid": "263",
   "features": [
    {
     "icon": "product/details/270-f1.png",
     "text": "Precisión: ±0,5 °C (configurable hasta ±0,1 °C)"
    },
    {
     "icon": "product/details/270-f2.png",
     "text": "Carcasa con clasificación IP68"
    },
    {
     "icon": "product/details/270-f3.png",
     "text": "Amplio rango: -200 °C a +800 °C"
    },
    {
     "icon": "product/details/270-f4.png",
     "text": "Admite activación por NFC y configuración local del dispositivo."
    },
    {
     "icon": "product/details/270-f5.png",
     "text": "Diseño de bajo consumo para operación a largo plazo"
    },
    {
     "icon": "product/details/270-f6.png",
     "text": "Opciones inalámbricas: 4G LTE, NB-IoT y LoRa."
    },
    {
     "icon": "product/details/270-f7.png",
     "text": "Monitoreo remoto de temperatura"
    },
    {
     "icon": "product/details/270-f8.png",
     "text": "Alertas por umbral configurables"
    }
   ],
   "specsTitle": "Especificaciones técnicas",
   "specsDesc": "Los procesadores de microconsumo y la optimización algorítmica otorgan al sensor una vida útil de diseño de hasta 10 años con un intervalo de transmisión de una hora en condiciones de prueba especificadas, reduciendo el mantenimiento rutinario.",
   "specs": [
    [
     "Modelos de producto",
     "H200/H300/H500"
    ],
    [
     "Rango de medición",
     "−200 °C a 800 °C"
    ],
    [
     "Precisión",
     "±0,5 °C (customizable to ±0,1 °C)"
    ],
    [
     "Protocolo",
     "MQTT"
    ],
    [
     "Conexión",
     "Tres hilos"
    ],
    [
     "Bandas de frecuencia",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Duración de la batería",
     "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión."
    ],
    [
     "Instalación",
     "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Modelos de producto",
     "value": "H200/H300/H500"
    },
    {
     "name": "Rango de medición",
     "value": "−200 °C a 800 °C",
     "unitText": "grado Celsius",
     "minValue": -200.0,
     "maxValue": 800.0
    },
    {
     "name": "Precisión",
     "value": "±0,5 °C (customizable to ±0,1 °C)",
     "unitText": "grado Celsius"
    },
    {
     "name": "Protocolo",
     "value": "MQTT"
    },
    {
     "name": "Conexión",
     "value": "Tres hilos"
    },
    {
     "name": "Bandas de frecuencia",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Duración de la batería",
     "value": "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión.",
     "unitText": "año",
     "minValue": 10.0
    },
    {
     "name": "Instalación",
     "value": "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Escenarios de aplicación",
   "scenarios": [
    {
     "img": "product/details/270-scen1.jpg",
     "label": "Energía inteligente"
    },
    {
     "img": "product/details/270-scen2.jpg",
     "label": "Agricultura inteligente"
    },
    {
     "img": "product/details/270-scen3.jpg",
     "label": "Centro de datos"
    },
    {
     "img": "product/details/270-scen4.jpg",
     "label": "Almacenamiento farmacéutico y sanitario"
    },
    {
     "img": "product/details/270-scen5.jpg",
     "label": "Procesamiento de alimentos"
    },
    {
     "img": "product/details/270-scen6.jpg",
     "label": "Fabricación inteligente"
    },
    {
     "img": "product/details/270-scen7.jpg",
     "label": "Parque de atracciones"
    }
   ],
   "related": [
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285",
    "276",
    "275"
   ],
   "summary": "El sensor de temperatura de la Serie H de Hitelecom es un sensor de temperatura industrial inalámbrico para monitoreo remoto de -200 °C a 800 °C. Ofrece una precisión de ±0,5 °C (configurable hasta ±0,1 °C), está diseñado para más de 10 años de duración de la batería con reportes cada hora en condiciones de prueba especificadas, y transmite las lecturas por 4G o NB-IoT a Hitelecom Cloud o a plataformas privadas mediante MQTT.",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Centros de datos y salas de servidores",
     "desc": "Sigue la temperatura de entrada de los racks y de la sala, ayudando a los operadores a identificar condiciones que pueden provocar un apagado térmico.",
     "img": "product/details/270-scen3.jpg"
    },
    {
     "name": "Almacenamiento en frío y procesamiento de alimentos",
     "desc": "Mantiene las cámaras de refrigeración, los congeladores y las líneas de procesamiento dentro de bandas de temperatura seguras para apoyar el monitoreo HACCP.",
     "img": "product/details/270-scen5.jpg"
    },
    {
     "name": "Monitoreo médico y de laboratorios",
     "desc": "Vigila refrigeradores, incubadoras y salas limpias que almacenan vacunas, sangre y reactivos.",
     "img": "product/details/270-scen4.jpg"
    },
    {
     "name": "Clima de invernaderos y ganadería",
     "desc": "Monitorea la temperatura de las naves para el rendimiento de los cultivos y el bienestar animal en la agricultura inteligente.",
     "img": "product/details/270-scen2.jpg"
    },
    {
     "name": "Monitoreo de procesos industriales",
     "desc": "Mide la temperatura superficial de tuberías, calderas y equipos en las líneas de producción.",
     "img": "product/details/270-scen6.jpg"
    },
    {
     "name": "Instalaciones de energía",
     "desc": "Monitorea transformadores, salas de baterías y gabinetes de subestaciones para detectar riesgos de sobrecalentamiento.",
     "img": "product/details/270-scen1.jpg"
    },
    {
     "name": "Espacios públicos",
     "desc": "Vigila el clima interior en parques de atracciones y otros edificios públicos de alto tránsito.",
     "img": "product/details/270-scen7.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "¿Cuál es el rango de medición del sensor de temperatura de la Serie H?",
     "a": "El rango estándar es de -200 °C a 800 °C con una precisión de ±0,5 °C; la precisión de ±0,1 °C está disponible bajo pedido. La conexión de sonda de tres hilos mantiene las lecturas estables en plantas con ruido eléctrico."
    },
    {
     "q": "¿Cuánto dura la batería?",
     "a": "El transmisor está diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora; la vida real varía con las condiciones de la red, la temperatura y la frecuencia de transmisión. El transmisor funciona completamente a batería; solo se requiere el cable de la sonda: no se necesita cable de red eléctrica ni de señal en el punto de instalación."
    },
    {
     "q": "¿Cómo transmite los datos el sensor?",
     "a": "Transmite por 4G o NB-IoT mediante MQTT a Hitelecom Cloud, a la nube del cliente o a una implementación privada, y envía alertas cuando la temperatura supera los umbrales configurados."
    },
    {
     "q": "¿Puede personalizarse el sensor para nuestra aplicación?",
     "a": "Sí. El tipo de sonda, la longitud de la sonda, la longitud del cable, el intervalo de transmisión y la carcasa pueden personalizarse dentro del programa OEM/ODM de Hitelecom. Contacte a ventas con sus condiciones de trabajo."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "274": {
   "series": "Serie H · Sensor de presión",
   "tagline": "Remoto | Bajo consumo | Resistente a impactos",
   "desc": "Los sensores de presión de Hitelecom ofrecen medición continua de precisión con reporte exacto a la nube de datos de presión críticos para aplicaciones industriales complejas",
   "heroImg": "product/details/274-hero.png",
   "pdf": "/downloads/h300-pressure-sensor-datasheet.pdf",
   "crumbCat": "Presión",
   "returnCid": "262",
   "features": [
    {
     "icon": "product/details/274-f1.png",
     "text": "±0,5% FS (personalización de alta precisión)"
    },
    {
     "icon": "product/details/274-f2.png",
     "text": "Carcasa con clasificación IP68"
    },
    {
     "icon": "product/details/274-f3.png",
     "text": "Admite actualizaciones remotas de firmware OTA."
    },
    {
     "icon": "product/details/274-f4.png",
     "text": "Admite activación por NFC y configuración local del dispositivo."
    },
    {
     "icon": "product/details/274-f5.png",
     "text": "Diseño de bajo consumo para operación a largo plazo"
    },
    {
     "icon": "product/details/274-f6.png",
     "text": "Opciones inalámbricas: 4G LTE, NB-IoT y LoRa."
    },
    {
     "icon": "product/details/274-f7.png",
     "text": "Monitoreo remoto de presión"
    },
    {
     "icon": "product/details/274-f8.png",
     "text": "Alertas por umbral configurables"
    }
   ],
   "specsTitle": "Especificaciones técnicas",
   "specsDesc": "Las tecnologías integradas de comunicación y detección, con algoritmos embebidos de ahorro de energía, otorgan al sensor de presión una vida útil prolongada y una alta estabilidad de medición, respaldando la confiabilidad de todo el sistema de monitoreo.",
   "specs": [
    [
     "Modelos de producto",
     "H200/H300/H500"
    ],
    [
     "Rango de medición",
     "0–1, 1,6, 3,5, 7, 10, or 20 MPa"
    ],
    [
     "Sobrecarga",
     "≤ 2× full-scale pressure"
    ],
    [
     "Estabilidad",
     "±0,2% FS/year"
    ],
    [
     "Protocolo",
     "MQTT"
    ],
    [
     "Temperatura de operación",
     "−20 °C a +80 °C"
    ],
    [
     "Temperatura de almacenamiento",
     "−20 °C a +85 °C"
    ],
    [
     "Duración de la batería",
     "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión."
    ],
    [
     "Instalación",
     "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Modelos de producto",
     "value": "H200/H300/H500"
    },
    {
     "name": "Rango de medición",
     "value": "0–1, 1,6, 3,5, 7, 10, or 20 MPa"
    },
    {
     "name": "Sobrecarga",
     "value": "≤ 2× full-scale pressure"
    },
    {
     "name": "Estabilidad",
     "value": "±0,2% FS/year"
    },
    {
     "name": "Protocolo",
     "value": "MQTT"
    },
    {
     "name": "Temperatura de operación",
     "value": "−20 °C a +80 °C",
     "unitText": "grado Celsius",
     "minValue": -20.0,
     "maxValue": 80.0
    },
    {
     "name": "Temperatura de almacenamiento",
     "value": "−20 °C a +85 °C",
     "unitText": "grado Celsius",
     "minValue": -20.0,
     "maxValue": 85.0
    },
    {
     "name": "Duración de la batería",
     "value": "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión.",
     "unitText": "año",
     "minValue": 10.0
    },
    {
     "name": "Instalación",
     "value": "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Escenarios de aplicación",
   "scenarios": [
    {
     "img": "product/details/274-scen1.jpg",
     "label": "Industria química"
    },
    {
     "img": "product/details/274-scen2.jpg",
     "label": "Industria de semiconductores"
    },
    {
     "img": "product/details/274-scen3.jpg",
     "label": "Edificio inteligente"
    },
    {
     "img": "product/details/274-scen4.jpg",
     "label": "Fabricación inteligente"
    },
    {
     "img": "product/details/274-scen5.jpg",
     "label": "Investigación científica"
    },
    {
     "img": "product/details/274-scen6.jpg",
     "label": "Agricultura inteligente"
    },
    {
     "img": "product/details/274-scen7.jpg",
     "label": "Monitoreo de torres"
    },
    {
     "img": "product/details/274-scen8.jpg",
     "label": "Exploración geológica"
    }
   ],
   "related": [
    "270",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285",
    "276",
    "275"
   ],
   "summary": "El sensor de presión de la Serie H de Hitelecom es un transmisor de presión industrial inalámbrico para tuberías, bombas y tanques. Los rangos de escala completa disponibles son 1, 1,6, 3,5, 7, 10 y 20 MPa con una estabilidad de ±0,2% FS/año y tolerancia a sobrecarga de 2× la escala completa, reportando por 4G o NB-IoT. La batería está diseñada para más de 10 años de vida con un intervalo de transmisión de una hora en condiciones de prueba especificadas.",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Estaciones de suministro de agua y bombeo",
     "desc": "Monitorea la presión de las tuberías para detectar tempranamente roturas, fugas y fallos de bombas.",
     "img": "product/details/281-scen1.jpg"
    },
    {
     "name": "Plantas químicas",
     "desc": "Sigue la presión de las líneas de proceso donde los transmisores cableados son costosos de modernizar.",
     "img": "product/details/274-scen1.jpg"
    },
    {
     "name": "Sistemas de agua de edificios",
     "desc": "Vigila la presión de bombas de refuerzo y columnas montantes en el suministro de agua secundario de edificios altos.",
     "img": "product/details/274-scen3.jpg"
    },
    {
     "name": "Fábricas de semiconductores",
     "desc": "Monitorea las líneas de gases especiales y de servicios con lecturas estables y repetibles.",
     "img": "product/details/274-scen2.jpg"
    },
    {
     "name": "Hidráulica industrial",
     "desc": "Sigue las curvas de presión de prensas hidráulicas y equipos para apoyar el mantenimiento basado en el estado.",
     "img": "product/details/274-scen4.jpg"
    },
    {
     "name": "Monitoreo de tanques y recipientes",
     "desc": "Combina la presión de columna con el nivel para el control de inventario y seguridad.",
     "img": "product/details/287-scen3.jpg"
    },
    {
     "name": "Sitios geológicos y de exploración",
     "desc": "Registro de presión alimentado por batería en sondeos remotos sin cableado.",
     "img": "product/details/274-scen8.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "¿Qué rangos de presión están disponibles?",
     "a": "Los rangos estándar son 0-1 MPa, 1,6 MPa, 3,5 MPa, 7 MPa, 10 MPa y 20 MPa. El sensor tolera una sobrecarga de 2× la escala completa y tiene una estabilidad a largo plazo de ±0,2% FS/año (una métrica distinta de la precisión de medición)."
    },
    {
     "q": "¿Puede medir presión tanto de gas como de líquido?",
     "a": "La versión estándar es adecuada para medios comunes de gas y líquido compatibles con la conexión de proceso; para medios corrosivos o especiales, contacte a Hitelecom para confirmar los materiales en contacto con el medio."
    },
    {
     "q": "¿Cómo transmite las lecturas?",
     "a": "Envía las lecturas por 4G o NB-IoT mediante MQTT a Hitelecom Cloud, a la nube del cliente o a una plataforma privada, con umbrales y alertas configurables."
    },
    {
     "q": "¿Qué energía necesita en el sitio?",
     "a": "Ninguna. La batería interna está diseñada para más de 10 años de vida con un intervalo de transmisión de una hora en condiciones de prueba especificadas —la vida real varía con la cobertura de red, la temperatura y la frecuencia de transmisión—, por lo que el transmisor puede montarse donde el cableado no es práctico."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "280": {
   "series": "Serie H · Sensor de suelo",
   "tagline": "Bajo consumo | Precisión | Multiparámetro",
   "desc": "El sensor de suelo de Hitelecom integra monitoreo multiparámetro, sincronización programada de datos y medición de precisión, apoyando la evaluación integral de la calidad del suelo y el monitoreo continuo para diversas aplicaciones agrícolas",
   "heroImg": "product/details/280-hero.png",
   "pdf": "/downloads/h300-soil-sensor-datasheet.pdf",
   "crumbCat": "Suelo",
   "returnCid": "269",
   "features": [
    {
     "icon": "product/details/280-f1.png",
     "text": "Monitoreo de nutrientes clave como nitrógeno, fósforo y potasio"
    },
    {
     "icon": "product/details/280-f2.png",
     "text": "Carcasa con clasificación IP68"
    },
    {
     "icon": "product/details/280-f3.png",
     "text": "Monitoreo de la humedad del suelo para la gestión del riego"
    },
    {
     "icon": "product/details/280-f4.png",
     "text": "Admite activación por NFC y configuración local del dispositivo."
    },
    {
     "icon": "product/details/280-f5.png",
     "text": "Admite actualizaciones remotas de firmware OTA."
    },
    {
     "icon": "product/details/280-f6.png",
     "text": "Opciones inalámbricas: 4G LTE, NB-IoT y LoRa."
    },
    {
     "icon": "product/details/280-f7.png",
     "text": "Monitoreo remoto del suelo"
    },
    {
     "icon": "product/details/280-f8.png",
     "text": "Alertas por umbral configurables"
    }
   ],
   "specsTitle": "Especificaciones técnicas",
   "specsDesc": "Aprovechando algoritmos inteligentes avanzados y el registro continuo de datos, junto con su adaptabilidad en condiciones extremas, rastrea y analiza con precisión las condiciones del suelo de forma continua, abordando eficazmente los desafíos agrícolas complejos y mejorando las decisiones de riego, fertilización y gestión del rendimiento.",
   "specs": [
    [
     "Modelos de producto",
     "H200/H300/H500"
    ],
    [
     "Conductividad",
     "0–1 000 µS/cm (±3%)"
    ],
    [
     "pH",
     "0–14 (0,01 resolution)"
    ],
    [
     "Humedad del suelo",
     "0–100 % (±3 %; no apto para capas de permafrost)"
    ],
    [
     "NPK",
     "0–1 999 mg/kg (±2% FS)"
    ],
    [
     "Protocolo",
     "MQTT"
    ],
    [
     "Bandas de frecuencia",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Duración de la batería",
     "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión."
    ],
    [
     "Instalación",
     "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Modelos de producto",
     "value": "H200/H300/H500"
    },
    {
     "name": "Conductividad",
     "value": "0–1 000 µS/cm (±3%)",
     "unitText": "microsiemens por centímetro",
     "minValue": 0.0,
     "maxValue": 1000.0
    },
    {
     "name": "pH",
     "value": "0–14 (0,01 resolution)"
    },
    {
     "name": "Humedad del suelo",
     "value": "0–100 % (±3 %; no apto para capas de permafrost)",
     "unitText": "porcentaje",
     "minValue": 0.0,
     "maxValue": 100.0
    },
    {
     "name": "NPK",
     "value": "0–1 999 mg/kg (±2% FS)",
     "unitText": "miligramo por kilogramo",
     "minValue": 0.0,
     "maxValue": 1999.0
    },
    {
     "name": "Protocolo",
     "value": "MQTT"
    },
    {
     "name": "Bandas de frecuencia",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Duración de la batería",
     "value": "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión.",
     "unitText": "año",
     "minValue": 10.0
    },
    {
     "name": "Instalación",
     "value": "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Escenarios de aplicación",
   "scenarios": [
    {
     "img": "product/details/280-scen1.jpg",
     "label": "Tierras agrícolas"
    },
    {
     "img": "product/details/280-scen2.jpg",
     "label": "Invernadero"
    },
    {
     "img": "product/details/280-scen3.jpg",
     "label": "Parques urbanos"
    },
    {
     "img": "product/details/280-scen4.jpg",
     "label": "Contaminación del suelo"
    },
    {
     "img": "product/details/280-scen5.jpg",
     "label": "Salud forestal"
    },
    {
     "img": "product/details/280-scen6.jpg",
     "label": "Laboratorio"
    }
   ],
   "related": [
    "270",
    "274",
    "281",
    "282",
    "283",
    "284",
    "285",
    "276",
    "275"
   ],
   "summary": "El sensor de suelo de la Serie H de Hitelecom es una sonda inalámbrica multiparámetro para la agricultura y el monitoreo de la tierra. Un solo dispositivo mide la humedad del suelo, la temperatura, la conductividad (CE), el pH y los nutrientes NPK, transmite por 4G o NB-IoT y está diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en condiciones de prueba especificadas, con una carcasa IP68 diseñada para enterramiento a largo plazo.",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Programación del riego agrícola",
     "desc": "Las tendencias de humedad del suelo indican a los agricultores exactamente cuándo y cuánto regar, reduciendo el desperdicio de agua.",
     "img": "product/details/280-scen1.jpg"
    },
    {
     "name": "Fertirriego en invernaderos",
     "desc": "Las lecturas de CE y NPK guían la dosificación de fertilizantes para que los nutrientes permanezcan en la zona de raíces y no en la escorrentía.",
     "img": "product/details/280-scen2.jpg"
    },
    {
     "name": "Parques urbanos y jardinería",
     "desc": "Monitorea la humedad del suelo de céspedes y fosas de árboles para los equipos municipales de mantenimiento de zonas verdes.",
     "img": "product/details/280-scen3.jpg"
    },
    {
     "name": "Seguimiento de la contaminación y la remediación del suelo",
     "desc": "El registro continuo de pH y CE señala las plumas de contaminación y verifica el avance de la remediación.",
     "img": "product/details/280-scen4.jpg"
    },
    {
     "name": "Salud de bosques y pastizales",
     "desc": "Las sondas enterradas a largo plazo rastrean el estrés hídrico del suelo antes de que la cubierta vegetal muestre un declive visible.",
     "img": "product/details/280-scen5.jpg"
    },
    {
     "name": "Investigación y ensayos de campo",
     "desc": "Las series temporales multiparámetro apoyan la investigación agronómica y los ensayos de variedades.",
     "img": "product/details/280-scen6.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "¿Qué parámetros del suelo mide la Serie H?",
     "a": "Humedad del suelo (0–100%, ±3%), temperatura, conductividad (0–1 000 µS/cm, ±3%), pH (0–14, resolución de 0,01) y nutrientes NPK (0–1 999 mg/kg, ±2% FS): todo en una sola sonda."
    },
    {
     "q": "¿Puede la sonda permanecer enterrada en exteriores todo el año?",
     "a": "Sí. La carcasa IP68 está diseñada para el enterramiento a largo plazo, y la batería está diseñada para más de 10 años de vida con un intervalo de transmisión de una hora en condiciones de prueba especificadas, lo que reduce el mantenimiento rutinario entre temporadas."
    },
    {
     "q": "¿Cómo se transmiten los datos del suelo?",
     "a": "Por 4G o NB-IoT con enlace ascendente MQTT a Hitelecom Cloud o a una plataforma privada; los umbrales de cualquier parámetro activan alertas."
    },
    {
     "q": "¿Es adecuado para suelos alcalinos o salinos?",
     "a": "El canal de CE cubre 0–1 000 µS/cm. Para suelos salinos o medios especiales, confirme el rango de CE requerido con Hitelecom."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "281": {
   "series": "Serie H · Sensor de nivel sumergible",
   "tagline": "Precisión | Rango | Consumo ultrabajo",
   "desc": "El sensor de nivel de Hitelecom proporciona monitoreo preciso, retroalimentación oportuna y alta estabilidad, entregando datos de nivel de líquido exactos y continuos en diversos entornos industriales.",
   "heroImg": "product/details/281-hero.png",
   "pdf": "/downloads/liquid-level-sensor-datasheet.pdf",
   "crumbCat": "Nivel de líquido",
   "returnCid": "268",
   "features": [
    {
     "icon": "product/details/281-f1.png",
     "text": "±0,5% FS (personalización de alta precisión)"
    },
    {
     "icon": "product/details/281-f2.png",
     "text": "Carcasa con clasificación IP68"
    },
    {
     "icon": "product/details/281-f3.png",
     "text": "Amplio rango: 0–200 m (configurable)"
    },
    {
     "icon": "product/details/281-f4.png",
     "text": "Admite activación por NFC y configuración local del dispositivo."
    },
    {
     "icon": "product/details/281-f5.png",
     "text": "Admite actualizaciones remotas de firmware OTA."
    },
    {
     "icon": "product/details/281-f6.png",
     "text": "Opciones inalámbricas: 4G LTE, NB-IoT y LoRa."
    },
    {
     "icon": "product/details/281-f7.png",
     "text": "Monitoreo remoto de nivel"
    },
    {
     "icon": "product/details/281-f8.png",
     "text": "Alertas por umbral configurables"
    }
   ],
   "specsTitle": "Especificaciones técnicas",
   "specsDesc": "La tecnología de detección integrada, la comunicación en tiempo real y un diseño energéticamente eficiente respaldan datos de nivel de líquido exactos y continuos en aplicaciones industriales, desde el tratamiento de agua hasta las líneas de producción química.",
   "specs": [
    [
     "Modelos de producto",
     "H200/H300/H500"
    ],
    [
     "Rango",
     "0–200 m (Configurable)"
    ],
    [
     "Precisión",
     "±0,5% FS (mayor precisión configurable)"
    ],
    [
     "Estabilidad",
     "±0,2% FS/year"
    ],
    [
     "Protocolo",
     "MQTT"
    ],
    [
     "Temperatura de operación",
     "−20 °C a +70 °C"
    ],
    [
     "Temperatura de almacenamiento",
     "−20 °C a +80 °C"
    ],
    [
     "Duración de la batería",
     "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión."
    ],
    [
     "Instalación",
     "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Modelos de producto",
     "value": "H200/H300/H500"
    },
    {
     "name": "Rango",
     "value": "0–200 m (Configurable)"
    },
    {
     "name": "Precisión",
     "value": "±0,5% FS (mayor precisión configurable)",
     "unitText": "porcentaje"
    },
    {
     "name": "Estabilidad",
     "value": "±0,2% FS/year"
    },
    {
     "name": "Protocolo",
     "value": "MQTT"
    },
    {
     "name": "Temperatura de operación",
     "value": "−20 °C a +70 °C",
     "unitText": "grado Celsius",
     "minValue": -20.0,
     "maxValue": 70.0
    },
    {
     "name": "Temperatura de almacenamiento",
     "value": "−20 °C a +80 °C",
     "unitText": "grado Celsius",
     "minValue": -20.0,
     "maxValue": 80.0
    },
    {
     "name": "Duración de la batería",
     "value": "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión.",
     "unitText": "año",
     "minValue": 10.0
    },
    {
     "name": "Instalación",
     "value": "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Escenarios de aplicación",
   "scenarios": [
    {
     "img": "product/details/281-scen1.jpg",
     "label": "Suministro y drenaje de agua"
    },
    {
     "img": "product/details/281-scen2.jpg",
     "label": "Aplicaciones marinas y a bordo"
    },
    {
     "img": "product/details/281-scen3.jpg",
     "label": "Monitoreo hidrológico"
    },
    {
     "img": "product/details/281-scen4.jpg",
     "label": "Metalurgia"
    },
    {
     "img": "product/details/281-scen5.jpg",
     "label": "Aguas residuales hospitalarias"
    },
    {
     "img": "product/details/281-scen6.jpg",
     "label": "Planta de energía"
    },
    {
     "img": "product/details/281-scen7.jpg",
     "label": "Minería"
    },
    {
     "img": "product/details/281-scen8.jpg",
     "label": "Energía inteligente"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "282",
    "283",
    "284",
    "285",
    "276",
    "275"
   ],
   "summary": "El sensor de nivel de la Serie H de Hitelecom es un transmisor de nivel de líquido inalámbrico para embalses, ríos, tanques y pozos. Cubre 0–200 m (configurable) con una precisión de ±0,5% FS y una estabilidad de ±0,2% FS/año, está diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en condiciones de prueba especificadas, y transmite por 4G o NB-IoT.",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Embalses y presas",
     "desc": "Registro continuo del nivel del agua para el control de inundaciones y las decisiones de despacho.",
     "img": "solution/67-scen-0.jpg"
    },
    {
     "name": "Estaciones fluviales e hidrológicas",
     "desc": "Monitoreo remoto del nivel a lo largo de ríos y canales sin energía de red.",
     "img": "product/details/281-scen3.jpg"
    },
    {
     "name": "Suministro y drenaje de agua",
     "desc": "Niveles de tanques, pozos de agua clara y reservorios de red para la operación de servicios.",
     "img": "product/details/281-scen1.jpg"
    },
    {
     "name": "Tanques industriales",
     "desc": "Nivel de inventario en tanques de proceso de plantas de energía y metalurgia.",
     "img": "product/details/287-scen3.jpg"
    },
    {
     "name": "Gestión del agua en minas",
     "desc": "Vigila los niveles de agua en sumideros y pozos para la seguridad minera.",
     "img": "product/details/281-scen7.jpg"
    },
    {
     "name": "Aplicaciones marinas y navales",
     "desc": "Monitoreo del nivel de lastre y de sentina con la simplicidad de la alimentación por batería.",
     "img": "product/details/281-scen2.jpg"
    },
    {
     "name": "Aguas residuales hospitalarias",
     "desc": "Sigue los niveles de los tanques de recolección en las estaciones de aguas residuales de hospitales.",
     "img": "product/details/281-scen5.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "¿Qué rango de nivel cubre la Serie H?",
     "a": "0-200 m de serie, configurable más allá de eso. La precisión es de ±0,5% FS con una estabilidad de ±0,2% FS por año para el monitoreo sin supervisión a largo plazo."
    },
    {
     "q": "¿Cómo se alimenta el sensor en sitios remotos?",
     "a": "Con batería interna —diseñada para más de 10 años de vida con un intervalo de transmisión de una hora en condiciones de prueba especificadas—, de modo que en las implementaciones adecuadas los embalses y las estaciones fluviales pueden no necesitar panel solar ni cableado."
    },
    {
     "q": "¿Cómo obtenemos los datos de nivel?",
     "a": "El transmisor transmite por 4G o NB-IoT mediante MQTT a Hitelecom Cloud o a su propia plataforma, con alarmas de nivel alto y bajo."
    },
    {
     "q": "¿Puede personalizarse para nuestro tanque o pozo?",
     "a": "Sí. El rango, la longitud del cable de la sonda y el montaje pueden adaptarse a la instalación; comparta sus planos o fotos del sitio con el equipo de ventas de Hitelecom para una configuración adecuada."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "282": {
   "series": "Serie H · Sensor de inclinación",
   "tagline": "Precisión | Multieje | Consumo ultrabajo",
   "desc": "El sensor de inclinación de Hitelecom integra elementos de detección de ultra alta precisión, con monitoreo remoto, alertas en tiempo real y medición de alta precisión para datos de inclinación exactos y oportunos en aplicaciones industriales complejas",
   "heroImg": "product/details/282-hero.png",
   "pdf": "/downloads/h310-ts180c-tilt-sensor-datasheet.pdf",
   "crumbCat": "Monitoreo de inclinación",
   "returnCid": "267",
   "features": [
    {
     "icon": "product/details/282-f1.png",
     "text": "Precisión: ±0,005° (configurable)"
    },
    {
     "icon": "product/details/282-f2.png",
     "text": "Carcasa con clasificación IP68"
    },
    {
     "icon": "product/details/282-f3.png",
     "text": "Resolución: 0,001°"
    },
    {
     "icon": "product/details/282-f4.png",
     "text": "Admite activación por NFC y configuración local del dispositivo."
    },
    {
     "icon": "product/details/282-f5.png",
     "text": "Admite actualizaciones remotas de firmware OTA."
    },
    {
     "icon": "product/details/282-f6.png",
     "text": "Opciones inalámbricas: 4G LTE, NB-IoT y LoRa."
    },
    {
     "icon": "product/details/282-f7.png",
     "text": "Monitoreo remoto de ángulo"
    },
    {
     "icon": "product/details/282-f8.png",
     "text": "Alertas por umbral configurables"
    }
   ],
   "specsTitle": "Especificaciones técnicas",
   "specsDesc": "Los elementos de detección de alta sensibilidad, la sincronización de datos en tiempo real y un diseño robusto y duradero respaldan un monitoreo de inclinación preciso y confiable. Diseñado para hasta 10 años de operación con un intervalo de transmisión de una hora en condiciones de prueba especificadas, reduciendo el mantenimiento rutinario.",
   "specs": [
    [
     "Modelos de producto",
     "H200/H300/H500"
    ],
    [
     "Rango",
     "Eje X · Eje Y (personalizable a tres ejes)"
    ],
    [
     "Precisión",
     "±0,005° (configurable)"
    ],
    [
     "Resolución",
     "0,001°"
    ],
    [
     "Protocolo",
     "MQTT"
    ],
    [
     "Temperatura de operación",
     "−20 °C a +70 °C"
    ],
    [
     "Temperatura de almacenamiento",
     "−20 °C a +80 °C"
    ],
    [
     "Duración de la batería",
     "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión."
    ],
    [
     "Instalación",
     "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    ]
   ],
   "certImgs": [],
   "scenariosHeading": "Escenarios de aplicación",
   "scenarios": [
    {
     "img": "product/details/282-scen1.jpg",
     "label": "Inclinación y deformación de puentes"
    },
    {
     "img": "product/details/282-scen2.jpg",
     "label": "Estanterías de almacén"
    },
    {
     "img": "product/details/282-scen3.jpg",
     "label": "Inclinación de torres"
    },
    {
     "img": "product/details/282-scen4.jpg",
     "label": "Edificios en riesgo"
    },
    {
     "img": "product/details/282-scen5.jpg",
     "label": "Sistema de seguimiento solar"
    },
    {
     "img": "product/details/282-scen6.jpg",
     "label": "Monitoreo de inclinación de infraestructura energética"
    },
    {
     "img": "product/details/282-scen7.jpg",
     "label": "Inclinación de edificios"
    },
    {
     "img": "product/details/282-scen8.jpg",
     "label": "Monitoreo de atracciones y estructuras de parques"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "283",
    "284",
    "285",
    "276",
    "275"
   ],
   "summary": "El sensor de inclinación Serie H de Hitelecom es un inclinómetro IoT inalámbrico para el monitoreo de la integridad estructural. Mide la inclinación en los ejes X e Y (tres ejes opcional) con una precisión de ±0,005° y una resolución de 0,001°, está diseñado para más de 10 años de duración de la batería con reportes cada hora en condiciones de prueba especificadas, y cuenta con clasificación IP68 para implementación en exteriores a largo plazo. Las opciones de conectividad son 4G, NB-IoT y LoRa.",
   "sku": "H200/H300/H500",
   "specsStructured": [
    {
     "name": "Modelos de producto",
     "value": "H200 / H300 / H500"
    },
    {
     "name": "Ejes de medición",
     "value": "Eje X · Eje Y (personalizable a tres ejes)"
    },
    {
     "name": "Precisión",
     "value": "±0,005°",
     "unitText": "grado"
    },
    {
     "name": "Resolución",
     "value": "0,001°",
     "unitText": "grado"
    },
    {
     "name": "Protocolo",
     "value": "MQTT"
    },
    {
     "name": "Inalámbrico",
     "value": "4G / NB-IoT / LoRa"
    },
    {
     "name": "Temperatura de operación",
     "value": "−20 °C a 70 °C",
     "unitText": "grado Celsius",
     "minValue": -20,
     "maxValue": 70
    },
    {
     "name": "Temperatura de almacenamiento",
     "value": "−20 °C a 80 °C",
     "unitText": "grado Celsius",
     "minValue": -20,
     "maxValue": 80
    },
    {
     "name": "Duración de la batería",
     "value": "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en condiciones de prueba especificadas"
    },
    {
     "name": "Grado de protección",
     "value": "IP68"
    },
    {
     "name": "Instalación",
     "value": "Mounting lugs · Pole clamp · Slotted mount"
    },
    {
     "name": "Configuración",
     "value": "Activación NFC; actualización de firmware OTA"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "applications": [
    {
     "name": "Monitoreo de estabilidad de taludes",
     "desc": "Apoya la identificación temprana de movimientos anómalos de taludes en carreteras, minas a cielo abierto y terraplenes de corte.",
     "img": "product/details/281-scen7.jpg"
    },
    {
     "name": "Infraestructura ferroviaria",
     "desc": "Monitorea el asentamiento del lecho de vía, los muros de contención y la inclinación de los postes de catenaria a lo largo de las líneas ferroviarias."
    },
    {
     "name": "Monitoreo de túneles",
     "desc": "Sigue la convergencia del revestimiento y la rotación de segmentos durante y después de la construcción del túnel."
    },
    {
     "name": "Deformación de puentes",
     "desc": "Mide la inclinación de pilas, la rotación de vigas y el desplazamiento de apoyos para el monitoreo de salud de puentes.",
     "img": "product/details/282-scen1.jpg"
    },
    {
     "name": "Estructuras de metro y subterráneas",
     "desc": "Monitorea la deflexión de las cajas de estación y la deformación de túneles de escudo cerca de obras de excavación adyacentes."
    },
    {
     "name": "Sitios de construcción y estructuras temporales",
     "desc": "Vigila andamios, grúas torre, encofrados y casetas de obra para detectar inclinaciones inseguras."
    },
    {
     "name": "Diques marinos y presas",
     "desc": "Monitoreo continuo de la inclinación de presas de tierra, diques marinos y taludes de embalses.",
     "img": "solution/67-scen-0.jpg"
    },
    {
     "name": "Edificios patrimoniales y pagodas antiguas",
     "desc": "Seguimiento de inclinación no invasivo para estructuras históricas protegidas donde no se permite perforar.",
     "img": "product/details/282-scen4.jpg"
    },
    {
     "name": "Monitoreo de inclinación de árboles",
     "desc": "Detecta el fallo de raíces y la progresión de la inclinación en árboles urbanos antes de la temporada de tifones.",
     "img": "product/details/280-scen3.jpg"
    },
    {
     "name": "Postes de alumbrado público",
     "desc": "Señala la inclinación de postes por impacto de vehículos o aflojamiento de cimientos en los activos de alumbrado municipal."
    },
    {
     "name": "Torres de transmisión",
     "desc": "Monitorea el asentamiento de cimientos y la inclinación de torres en las líneas de transmisión eléctrica.",
     "img": "product/details/282-scen3.jpg"
    },
    {
     "name": "Torres de telecomunicaciones",
     "desc": "Sigue la verticalidad de mástiles y la alineación de torres arriostradas para la infraestructura de comunicaciones."
    },
    {
     "name": "Estanterías de almacén",
     "desc": "Detecta la deflexión de los montantes de las estanterías por impacto de montacargas, permitiendo una intervención más temprana antes de que el daño se agrave.",
     "img": "product/details/282-scen2.jpg"
    }
   ],
   "faqs": [
    {
     "q": "¿Qué estructuras puede monitorear el sensor de inclinación de la Serie H?",
     "a": "El sensor de inclinación de la Serie H se implementa en taludes y terraplenes, infraestructura ferroviaria, túneles, puentes, estructuras de metro, sitios de construcción y obras temporales, diques marinos y presas, edificios patrimoniales y pagodas antiguas, árboles urbanos, postes de alumbrado, torres de transmisión, torres de telecomunicaciones y estanterías de almacén. Su clasificación IP68 y su larga duración de batería lo hacen adecuado para la instalación prolongada en exteriores; la duración de la batería depende del intervalo de transmisión, la cobertura de red y las condiciones del sitio."
    },
    {
     "q": "¿Qué precisión tiene el sensor de inclinación de la Serie H?",
     "a": "La precisión estándar es de ±0,005° con una resolución de 0,001° en los ejes X e Y. Hay una configuración de tres ejes disponible bajo pedido, y la precisión puede personalizarse para aplicaciones que requieran una tolerancia más estricta."
    },
    {
     "q": "¿Cuánto dura la batería?",
     "a": "Diseñado para más de 10 años con un intervalo de transmisión de una hora en condiciones de prueba especificadas. La duración de la batería varía con la frecuencia de transmisión; un reporte más frecuente acorta la vida útil. La mayoría de las configuraciones funcionan con batería sin red eléctrica ni panel solar; confirme las opciones de alimentación para su configuración."
    },
    {
     "q": "¿Qué tecnología inalámbrica debo elegir: 4G, NB-IoT o LoRa?",
     "a": "Elija 4G donde la cobertura celular sea confiable y se necesiten tasas de datos más altas o actualizaciones de firmware por aire. NB-IoT puede ser adecuado para sitios interiores o subterráneos como túneles y sótanos donde el operador local ofrezca cobertura adecuada. Elija LoRa cuando implemente un grupo denso de sensores en un mismo sitio con un gateway privado y sin costo de SIM por dispositivo."
    },
    {
     "q": "¿Puede instalarse en estructuras patrimoniales sin perforar?",
     "a": "Sí. El sensor admite orejetas de montaje, abrazadera de poste o montaje ranurado. Para estructuras protegidas, el montaje con abrazadera o adhesivo evita perforar la estructura o el material original del edificio. Contacte a Hitelecom para obtener orientación de montaje específica del sitio."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "283": {
   "series": "Serie H · Sensor de distancia por radar",
   "tagline": "Bajo consumo | Precisión | Nivel milimétrico",
   "desc": "Los sensores de distancia de Hitelecom ofrecen precisión de nivel milimétrico, recolección programada de datos y alta inmunidad a las interferencias, entregando mediciones de distancia exactas y actualizaciones oportunas a la nube en entornos complejos",
   "heroImg": "product/details/283-hero.png",
   "pdf": "/downloads/h310-mw012-radar-distance-sensor-datasheet.pdf",
   "crumbCat": "Distancia por radar",
   "returnCid": "266",
   "features": [
    {
     "icon": "product/details/283-f1.png",
     "text": "Precisión: ±1 mm (configurable)"
    },
    {
     "icon": "product/details/283-f2.png",
     "text": "Carcasa con clasificación IP68"
    },
    {
     "icon": "product/details/283-f3.png",
     "text": "Amplio rango: 0,3–50 m (configurable)"
    },
    {
     "icon": "product/details/283-f4.png",
     "text": "Admite activación por NFC y configuración local del dispositivo."
    },
    {
     "icon": "product/details/283-f5.png",
     "text": "Admite actualizaciones remotas de firmware OTA."
    },
    {
     "icon": "product/details/283-f6.png",
     "text": "Opciones inalámbricas: 4G LTE, NB-IoT y LoRa."
    },
    {
     "icon": "product/details/283-f7.png",
     "text": "Monitoreo remoto de distancia"
    },
    {
     "icon": "product/details/283-f8.png",
     "text": "Alertas por umbral configurables"
    }
   ],
   "specsTitle": "Especificaciones técnicas",
   "specsDesc": "La medición de distancia por radar de alta precisión, los procesadores avanzados de bajo consumo y los algoritmos embebidos optimizados otorgan al sensor una vida útil de diseño de hasta 10 años con un intervalo de transmisión de una hora en condiciones de prueba especificadas, reduciendo el mantenimiento rutinario.",
   "specs": [
    [
     "Modelos de producto",
     "H200/H300/H500"
    ],
    [
     "Rango",
     "0,3–50 m (Configurable)"
    ],
    [
     "Precisión",
     "±1 mm (configurable)"
    ],
    [
     "Resolución",
     "1 mm"
    ],
    [
     "Protocolo",
     "MQTT"
    ],
    [
     "Temperatura de operación",
     "−20 °C a +70 °C"
    ],
    [
     "Temperatura de almacenamiento",
     "−20 °C a +80 °C"
    ],
    [
     "Duración de la batería",
     "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión."
    ],
    [
     "Instalación",
     "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Modelos de producto",
     "value": "H200/H300/H500"
    },
    {
     "name": "Rango",
     "value": "0,3–50 m (Configurable)",
     "minValue": 0.3,
     "maxValue": 50.0
    },
    {
     "name": "Precisión",
     "value": "±1 mm (configurable)",
     "unitText": "milímetro"
    },
    {
     "name": "Resolución",
     "value": "1 mm",
     "unitText": "milímetro"
    },
    {
     "name": "Protocolo",
     "value": "MQTT"
    },
    {
     "name": "Temperatura de operación",
     "value": "−20 °C a +70 °C",
     "unitText": "grado Celsius",
     "minValue": -20.0,
     "maxValue": 70.0
    },
    {
     "name": "Temperatura de almacenamiento",
     "value": "−20 °C a +80 °C",
     "unitText": "grado Celsius",
     "minValue": -20.0,
     "maxValue": 80.0
    },
    {
     "name": "Duración de la batería",
     "value": "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión.",
     "unitText": "año",
     "minValue": 10.0
    },
    {
     "name": "Instalación",
     "value": "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Escenarios de aplicación",
   "scenarios": [
    {
     "img": "product/details/283-scen1.jpg",
     "label": "Tapa de alcantarilla"
    },
    {
     "img": "product/details/283-scen2.jpg",
     "label": "Altura de silos de granos"
    },
    {
     "img": "product/details/283-scen3.jpg",
     "label": "Mina de carbón"
    },
    {
     "img": "product/details/283-scen4.jpg",
     "label": "Planta de agua"
    },
    {
     "img": "product/details/283-scen5.jpg",
     "label": "Planta química"
    },
    {
     "img": "product/details/283-scen6.jpg",
     "label": "Fabricación inteligente"
    },
    {
     "img": "product/details/283-scen7.jpg",
     "label": "Edificio inteligente"
    },
    {
     "img": "product/details/283-scen8.jpg",
     "label": "Energía inteligente"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "284",
    "285",
    "276",
    "275"
   ],
   "summary": "El sensor de distancia de la Serie H de Hitelecom es un sensor de distancia por radar inalámbrico con precisión de nivel milimétrico. Mide de 0,3 a 50 m con una precisión de ±1 mm y una resolución de 1 mm, resiste las interferencias en sitios industriales exigentes y transmite por 4G o NB-IoT, con una batería diseñada para más de 10 años de vida con un intervalo de transmisión de una hora en condiciones de prueba especificadas.",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Monitoreo de tapas de alcantarilla",
     "desc": "Detecta el desplazamiento de tapas y las lecturas anómalas de distancia para la seguridad municipal.",
     "img": "product/details/283-scen1.jpg"
    },
    {
     "name": "Nivel en silos de granos",
     "desc": "Mide la distancia a la superficie del material para calcular el nivel de llenado en silos de granos.",
     "img": "product/details/283-scen2.jpg"
    },
    {
     "name": "Tolvas de minas de carbón",
     "desc": "Monitorea la altura de llenado de las tolvas de carbón en condiciones subterráneas polvorientas y húmedas.",
     "img": "product/details/283-scen3.jpg"
    },
    {
     "name": "Plantas de agua y aguas residuales",
     "desc": "Medición de distancia en canales abiertos y tanques para el control de nivel.",
     "img": "product/details/283-scen4.jpg"
    },
    {
     "name": "Inventario de plantas químicas",
     "desc": "Medición de distancia sin contacto sobre tanques corrosivos o sellados.",
     "img": "product/details/283-scen5.jpg"
    },
    {
     "name": "Edificios inteligentes y logística",
     "desc": "Detección de distancia de ocupación, muelles y posición de pallets en las instalaciones.",
     "img": "product/details/283-scen7.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "¿Qué rango de distancia y precisión ofrece?",
     "a": "Ofrece un rango de medición de 0,3–50 m (configurable) con una precisión de ±1 mm y una resolución de 1 mm, adecuado para el monitoreo de nivel por distancia y de desplazamiento."
    },
    {
     "q": "¿El polvo o la humedad afectan la medición?",
     "a": "La medición basada en radar está diseñada para mantener el rendimiento de la medición en sitios polvorientos o húmedos como las tolvas de carbón y los pozos de registro; la carcasa IP68 protege el propio dispositivo."
    },
    {
     "q": "¿Cómo se alimenta y se conecta?",
     "a": "Utiliza una batería interna diseñada para más de 10 años de vida con un intervalo de transmisión de una hora en condiciones de prueba especificadas, con enlace ascendente 4G o NB-IoT mediante MQTT a Hitelecom Cloud o a plataformas privadas."
    },
    {
     "q": "¿Puede ampliarse el rango más allá de 50 m?",
     "a": "Sí, el rango y el montaje son configurables. Indique a Hitelecom su distancia objetivo y el medio para una propuesta de configuración."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "284": {
   "series": "Serie H · Sensor de vibración",
   "tagline": "Precisión | Rango | Consumo ultrabajo",
   "desc": "Los sensores de vibración de Hitelecom monitorean y analizan la vibración de equipos mecánicos en entornos de Industria 4,0, proporcionando datos que respaldan la gestión de la salud de los equipos y el mantenimiento basado en el estado para ayudar a reducir el tiempo de inactividad no planificado.",
   "heroImg": "product/details/284-hero.png",
   "pdf": "/downloads/vibration-sensor-datasheet.pdf",
   "crumbCat": "Monitoreo de vibración",
   "returnCid": "271",
   "features": [
    {
     "icon": "product/details/284-f1.png",
     "text": "Velocidad de vibración: 0–100 mm/s (configurable)"
    },
    {
     "icon": "product/details/284-f2.png",
     "text": "Carcasa con clasificación IP68"
    },
    {
     "icon": "product/details/284-f3.png",
     "text": "Amplitud de desplazamiento: 0–1 000 µm (configurable)"
    },
    {
     "icon": "product/details/284-f4.png",
     "text": "Admite activación por NFC y configuración local del dispositivo."
    },
    {
     "icon": "product/details/284-f5.png",
     "text": "Admite actualizaciones remotas de firmware OTA."
    },
    {
     "icon": "product/details/284-f6.png",
     "text": "Opciones inalámbricas: 4G LTE, NB-IoT y LoRa."
    },
    {
     "icon": "product/details/284-f7.png",
     "text": "Monitoreo remoto de vibración"
    },
    {
     "icon": "product/details/284-f8.png",
     "text": "Alertas por umbral configurables"
    }
   ],
   "specsTitle": "Especificaciones técnicas",
   "specsDesc": "Los procesadores de bajo consumo y la optimización algorítmica otorgan al sensor una vida útil de diseño de hasta 10 años con un intervalo de transmisión de una hora en condiciones de prueba especificadas, con un consumo mínimo de energía en cada ciclo de medición.",
   "specs": [
    [
     "Modelos de producto",
     "H200/H300/H500"
    ],
    [
     "Velocidad de vibración",
     "0–100 mm/s (Configurable)"
    ],
    [
     "Amplitud de desplazamiento",
     "0–1 000 µm (Configurable)"
    ],
    [
     "Precisión",
     "±1% a 80 Hz (calibración)"
    ],
    [
     "Protocolo",
     "MQTT"
    ],
    [
     "Temperatura de operación",
     "−20 °C a +70 °C"
    ],
    [
     "Temperatura de almacenamiento",
     "−20 °C a +80 °C"
    ],
    [
     "Duración de la batería",
     "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión."
    ],
    [
     "Instalación",
     "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Modelos de producto",
     "value": "H200/H300/H500"
    },
    {
     "name": "Velocidad de vibración",
     "value": "0–100 mm/s (Configurable)"
    },
    {
     "name": "Amplitud de desplazamiento",
     "value": "0–1 000 µm (Configurable)"
    },
    {
     "name": "Precisión",
     "value": "±1% a 80 Hz (calibración)",
     "unitText": "porcentaje"
    },
    {
     "name": "Protocolo",
     "value": "MQTT"
    },
    {
     "name": "Temperatura de operación",
     "value": "−20 °C a +70 °C",
     "unitText": "grado Celsius",
     "minValue": -20.0,
     "maxValue": 70.0
    },
    {
     "name": "Temperatura de almacenamiento",
     "value": "−20 °C a +80 °C",
     "unitText": "grado Celsius",
     "minValue": -20.0,
     "maxValue": 80.0
    },
    {
     "name": "Duración de la batería",
     "value": "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión.",
     "unitText": "año",
     "minValue": 10.0
    },
    {
     "name": "Instalación",
     "value": "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Escenarios de aplicación",
   "scenarios": [
    {
     "img": "product/details/284-scen1.jpg",
     "label": "Semiconductor"
    },
    {
     "img": "product/details/284-scen2.jpg",
     "label": "Equipos industriales"
    },
    {
     "img": "product/details/284-scen3.jpg",
     "label": "Puerto"
    },
    {
     "img": "product/details/284-scen4.jpg",
     "label": "Energía inteligente"
    },
    {
     "img": "product/details/284-scen5.jpg",
     "label": "Edificio inteligente"
    },
    {
     "img": "product/details/284-scen6.jpg",
     "label": "Logística y transporte"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "285",
    "276",
    "275"
   ],
   "summary": "El sensor de vibración de la Serie H de Hitelecom es un monitor inalámbrico para maquinaria rotativa y vibración estructural en la Industria 4,0. Mide la velocidad de vibración de 0 a 100 mm/s y la amplitud de desplazamiento de 0–1 000 µm (configurable) con una precisión de ±1% (calibrado a 80 Hz), transmite por 4G o NB-IoT y está diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en condiciones de prueba especificadas.",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Equipos rotativos industriales",
     "desc": "Las bombas, los ventiladores, los motores y los compresores reciben un seguimiento continuo de la vibración que apoya el mantenimiento basado en el estado.",
     "img": "product/details/284-scen2.jpg"
    },
    {
     "name": "Instalaciones de semiconductores",
     "desc": "Monitorea herramientas de proceso sensibles a las vibraciones y equipos de salas limpias.",
     "img": "product/details/284-scen1.jpg"
    },
    {
     "name": "Maquinaria portuaria y de dársenas",
     "desc": "Sigue la vibración de grúas y transportadores para una operación portuaria segura.",
     "img": "product/details/284-scen3.jpg"
    },
    {
     "name": "Salud de edificios y estructuras",
     "desc": "Vigila la respuesta estructural de los edificios cercanos a obras o tráfico pesado.",
     "img": "product/details/284-scen5.jpg"
    },
    {
     "name": "Instalaciones de energía",
     "desc": "Monitorea turbinas, generadores y transformadores para detectar firmas de vibración anómalas.",
     "img": "product/details/284-scen4.jpg"
    },
    {
     "name": "Logística y transporte",
     "desc": "Registro de impactos y vibraciones durante el transporte de mercancías sensibles.",
     "img": "product/details/284-scen6.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "¿Qué magnitudes de vibración mide?",
     "a": "Velocidad de vibración de 0–100 mm/s y amplitud de desplazamiento de 0–1 000 µm, ambos configurables, con una precisión de ±1% calibrada a 80 Hz."
    },
    {
     "q": "¿Cómo apoya el mantenimiento basado en el estado?",
     "a": "Las tendencias continuas de intensidad y amplitud pueden ayudar a identificar tempranamente signos de desgaste de rodamientos, desequilibrio y desalineación, de modo que el mantenimiento pueda programarse por condición y no por calendario."
    },
    {
     "q": "¿Cómo se instala y se alimenta el sensor?",
     "a": "El montaje con base magnética, roscado, adhesivo o soporte varía según el modelo; confirme el accesorio de montaje para su configuración. El sensor funciona con batería y no requiere cableado de señal ni de energía; está diseñado para más de 10 años de vida con un intervalo de transmisión de una hora en condiciones de prueba especificadas."
    },
    {
     "q": "¿A qué plataforma de datos se conecta?",
     "a": "Reporta por 4G o NB-IoT mediante MQTT a Hitelecom Cloud o a la plataforma del cliente, con alarmas por umbral para la vibración anómala."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "285": {
   "series": "Serie H · Sensor de calidad del aire",
   "tagline": "6 en 1 | Precisión | Bajo consumo",
   "desc": "El sensor de calidad del aire 6 en 1 de Hitelecom monitorea CO₂, PM2,5, TVOC, temperatura, humedad y presión atmosférica, con canales opcionales de NO₂, SO₂, NH₃ y O₃. Los datos se transmiten a la nube por 4G o NB-IoT, y el diseño de bajo mantenimiento apoya el monitoreo ambiental urbano e industrial a largo plazo.",
   "heroImg": "product/details/285-hero.png",
   "pdf": "/downloads/h310-aq041-air-quality-sensor-datasheet.pdf",
   "crumbCat": "Calidad del aire",
   "returnCid": "265",
   "features": [
    {
     "icon": "product/details/285-f1.png",
     "text": "Mide CO₂, PM2,5, TVOC, temperatura, humedad y presión atmosférica"
    },
    {
     "icon": "product/details/285-f2.png",
     "text": "Carcasa con clasificación IP68"
    },
    {
     "icon": "product/details/285-f3.png",
     "text": "Canales opcionales de NO₂, SO₂, NH₃ y O₃ (según configuración)"
    },
    {
     "icon": "product/details/285-f4.png",
     "text": "Admite activación por NFC y configuración local del dispositivo."
    },
    {
     "icon": "product/details/285-f5.png",
     "text": "Admite actualizaciones remotas de firmware OTA."
    },
    {
     "icon": "product/details/285-f6.png",
     "text": "Opciones inalámbricas: 4G LTE, NB-IoT y LoRa."
    },
    {
     "icon": "product/details/285-f7.png",
     "text": "Monitoreo remoto del aire"
    },
    {
     "icon": "product/details/285-f8.png",
     "text": "Alertas por umbral configurables"
    }
   ],
   "specsTitle": "Especificaciones técnicas",
   "specsDesc": "Los procesadores de bajo consumo y la optimización algorítmica permiten la recolección simultánea de múltiples canales de calidad del aire. La batería está diseñada para más de 10 años de vida con un intervalo de transmisión de cuatro horas en condiciones de prueba especificadas; la vida real varía según la configuración de detección, la cobertura de red y el entorno.",
   "specs": [
    [
     "Modelos de producto",
     "H200/H300/H500"
    ],
    [
     "CO₂",
     "400–5 000 ppm"
    ],
    [
     "PM2.5 / TVOC",
     "Incluida (rangos según configuración)"
    ],
    [
     "Canales de gas opcionales",
     "NO₂, SO₂, NH₃, O₃ (según configuración)"
    ],
    [
     "Rango de medición de temperatura",
     "−40 °C a +85 °C (±0,2 °C)"
    ],
    [
     "Humedad",
     "0–100% RH"
    ],
    [
     "Presión atmosférica",
     "30–120 kPa (±0,1 kPa)"
    ],
    [
     "Protocolo",
     "MQTT"
    ],
    [
     "Bandas de frecuencia",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Duración de la batería",
     "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de cuatro horas en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión."
    ],
    [
     "Instalación",
     "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Modelos de producto",
     "value": "H200/H300/H500"
    },
    {
     "name": "CO₂",
     "value": "400–5 000 ppm",
     "unitText": "partes por millón",
     "minValue": 400.0,
     "maxValue": 5000.0
    },
    {
     "name": "PM2.5 / TVOC",
     "value": "Incluida (rangos según configuración)"
    },
    {
     "name": "Canales de gas opcionales",
     "value": "NO₂, SO₂, NH₃, O₃ (según configuración)"
    },
    {
     "name": "Rango de medición de temperatura",
     "value": "−40 °C a +85 °C (±0,2 °C)",
     "unitText": "grado",
     "minValue": -40.0,
     "maxValue": 85.0
    },
    {
     "name": "Humedad",
     "value": "0–100% RH",
     "unitText": "porcentaje",
     "minValue": 0.0,
     "maxValue": 100.0
    },
    {
     "name": "Presión atmosférica",
     "value": "30–120 kPa (±0,1 kPa)",
     "unitText": "kilopascal",
     "minValue": 30.0,
     "maxValue": 120.0
    },
    {
     "name": "Protocolo",
     "value": "MQTT"
    },
    {
     "name": "Bandas de frecuencia",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Duración de la batería",
     "value": "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de cuatro horas en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión.",
     "unitText": "año",
     "minValue": 10.0
    },
    {
     "name": "Instalación",
     "value": "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Escenarios de aplicación",
   "scenarios": [
    {
     "img": "product/details/285-scen1.jpg",
     "label": "Entorno de oficina"
    },
    {
     "img": "product/details/285-scen2.jpg",
     "label": "Ciudad inteligente"
    },
    {
     "img": "product/details/285-scen3.jpg",
     "label": "Hospital"
    },
    {
     "img": "product/details/285-scen4.jpg",
     "label": "Smart transportation"
    },
    {
     "img": "product/details/285-scen5.jpg",
     "label": "Entorno residencial"
    },
    {
     "img": "product/details/285-scen6.jpg",
     "label": "Centro de datos"
    },
    {
     "img": "product/details/285-scen7.jpg",
     "label": "Fabricación inteligente"
    },
    {
     "img": "product/details/285-scen8.jpg",
     "label": "Agricultura inteligente"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "276",
    "275"
   ],
   "summary": "El sensor de calidad del aire de la Serie H de Hitelecom es un monitor inalámbrico 6 en 1 para entornos urbanos e industriales. Sigue el CO₂ (400–5 000 ppm), el PM2,5, el TVOC, la temperatura (-40 °C a +85 °C, ±0,2 °C), la humedad (0–100% HR) y la presión atmosférica (30–120 kPa), con canales opcionales de NO₂, SO₂, NH₃ y O₃, reportando por 4G o NB-IoT.",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Monitoreo del aire en ciudades inteligentes",
     "desc": "Las microestaciones desplegadas en cuadrícula siguen las tendencias de la calidad del aire urbano manzana a manzana.",
     "img": "product/details/285-scen2.jpg"
    },
    {
     "name": "Edificios de oficinas y escuelas",
     "desc": "Las lecturas de CO₂ y humedad pueden fundamentar las decisiones de ventilación cuando se integran con un sistema de control compatible.",
     "img": "product/details/285-scen1.jpg"
    },
    {
     "name": "Hospitales",
     "desc": "Vigila las condiciones del aire en salas y clínicas donde se reúnen personas vulnerables.",
     "img": "product/details/285-scen3.jpg"
    },
    {
     "name": "Centros de datos",
     "desc": "Combina temperatura, humedad y presión para el registro de cumplimiento ambiental.",
     "img": "product/details/285-scen6.jpg"
    },
    {
     "name": "Parques industriales",
     "desc": "Monitoreo perimetral del aire del parque para detectar tempranamente emisiones anómalas.",
     "img": "product/details/285-scen7.jpg"
    },
    {
     "name": "Centros de transporte",
     "desc": "Visibilidad de la calidad del aire en estaciones, túneles y estacionamientos.",
     "img": "product/details/285-scen4.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "¿Qué parámetros mide el sensor 6 en 1?",
     "a": "CO₂ (400–5 000 ppm), PM2,5, TVOC, temperatura (-40 °C a +85 °C, ±0,2 °C), humedad (0–100% HR) y presión atmosférica (30–120 kPa, ±0,1 kPa), con canales opcionales de NO₂, SO₂, NH₃ y O₃ según configuración."
    },
    {
     "q": "¿Cuánto tiempo puede funcionar sin supervisión?",
     "a": "Algunas configuraciones están diseñadas para más de 10 años de duración de la batería con un intervalo de transmisión de cuatro horas en condiciones de prueba especificadas; la vida real varía con la configuración de detección, la cobertura de red y el entorno. La carcasa IP68 admite la instalación en exteriores."
    },
    {
     "q": "¿Cómo se entregan los datos de calidad del aire?",
     "a": "De forma inalámbrica por 4G o NB-IoT mediante MQTT a Hitelecom Cloud o a su plataforma, con alertas por umbral en cada canal."
    },
    {
     "q": "¿Pueden personalizarse los canales para nuestro sitio?",
     "a": "Sí. La configuración 6 en 1 es modular: indique a Hitelecom qué gases o partículas necesita y se le propondrá un conjunto de canales adecuado."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "275": {
   "series": "Serie H68 · Gateway de exterior",
   "tagline": "IP68 | Alta capacidad | Amplia cobertura",
   "desc": "El gateway de la Serie H68 cuenta con una carcasa con clasificación IP68, hermética al polvo e impermeable, diseñada para el servicio prolongado en exteriores en entornos industriales complejos. Admite implementación plug-and-play, y puede enviarse una alarma de corte de energía cuando la energía de respaldo y el backhaul siguen disponibles.",
   "heroImg": "product/details/275-hero.png",
   "pdf": "/downloads/outdoor-4g-gateway-h68-datasheet.pdf",
   "crumbCat": "Gateway de exterior",
   "returnCid": "273",
   "features": [
    {
     "icon": "product/details/275-f1.png",
     "text": "Alcance de comunicación de hasta 10 km (área abierta)"
    },
    {
     "icon": "product/details/275-f2.png",
     "text": "Clasificación IP68 de impermeabilidad y resistencia al polvo"
    },
    {
     "icon": "product/details/275-f3.png",
     "text": "Gateway industrial full-duplex de 8 canales"
    },
    {
     "icon": "product/details/275-f4.png",
     "text": "Permite el despliegue local para el control y la confiabilidad de los datos"
    },
    {
     "icon": "product/details/275-f5.png",
     "text": "Circuito integrado de amplificación de potencia y amplificador de bajo ruido"
    },
    {
     "icon": "product/details/275-f6.png",
     "text": "Opciones inalámbricas: 4G LTE, NB-IoT y LoRa."
    },
    {
     "icon": "product/details/275-f7.png",
     "text": "Redes de gran capacidad, control remoto y adquisición de datos"
    },
    {
     "icon": "product/details/275-f8.png",
     "text": "Puede enviar una alerta de corte de energía cuando la energía de respaldo y el backhaul siguen disponibles"
    }
   ],
   "specsTitle": "Especificaciones técnicas",
   "specsDesc": "La serie H68 admite transmisión de larga distancia de hasta 10 kilómetros, alcanzando hasta 2 kilómetros en zonas urbanas. Integra opciones de conectividad 4G LTE, Ethernet y Wi-Fi para una transmisión de datos confiable y continua.",
   "specs": [
    [
     "Modelos de producto",
     "H68"
    ],
    [
     "Bandas de frecuencia",
     "CN470/EU868/IN865/RU864/US915/AU915"
    ],
    [
     "Distancia",
     "Hasta 10 km (área abierta)"
    ],
    [
     "Potencia de transmisión",
     "20–27 dBm"
    ],
    [
     "Sensibilidad",
     "−140 dBm at 0 292 kbps"
    ],
    [
     "Antena",
     "Antena externa de fibra de vidrio"
    ],
    [
     "Banda 4G",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Protocolo",
     "MQTT"
    ],
    [
     "Temperatura de operación",
     "de −40 °C a +85 °C"
    ],
    [
     "Temperatura de almacenamiento",
     "de −40 °C a +85 °C"
    ],
    [
     "Instalación",
     "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Modelos de producto",
     "value": "H68"
    },
    {
     "name": "Bandas de frecuencia",
     "value": "CN470/EU868/IN865/RU864/US915/AU915"
    },
    {
     "name": "Distancia",
     "value": "Hasta 10 km (área abierta)"
    },
    {
     "name": "Potencia de transmisión",
     "value": "20–27 dBm",
     "unitText": "decibelios-miliwatio",
     "minValue": 20.0,
     "maxValue": 27.0
    },
    {
     "name": "Sensibilidad",
     "value": "−140 dBm at 0 292 kbps",
     "unitText": "decibelios-miliwatio"
    },
    {
     "name": "Antena",
     "value": "Antena externa de fibra de vidrio"
    },
    {
     "name": "Banda 4G",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Protocolo",
     "value": "MQTT"
    },
    {
     "name": "Temperatura de operación",
     "value": "−40 °C a +85 °C",
     "unitText": "grado",
     "minValue": -40.0,
     "maxValue": 85.0
    },
    {
     "name": "Temperatura de almacenamiento",
     "value": "−40 °C a +85 °C",
     "unitText": "grado",
     "minValue": -40.0,
     "maxValue": 85.0
    },
    {
     "name": "Instalación",
     "value": "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Escenarios de aplicación",
   "scenarios": [
    {
     "img": "product/details/275-scen1.jpg",
     "label": "Energías renovables"
    },
    {
     "img": "product/details/275-scen2.jpg",
     "label": "Smart Industrial Parks"
    },
    {
     "img": "product/details/275-scen3.jpg",
     "label": "Agua inteligente"
    },
    {
     "img": "product/details/275-scen4.jpg",
     "label": "Automatización industrial"
    },
    {
     "img": "product/details/275-scen5.jpg",
     "label": "Monitoreo ambiental"
    },
    {
     "img": "product/details/275-scen6.jpg",
     "label": "Ciudad inteligente"
    },
    {
     "img": "product/details/275-scen7.jpg",
     "label": "Transporte inteligente"
    },
    {
     "img": "product/details/275-scen8.jpg",
     "label": "Logística y cadena de suministro"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285",
    "276"
   ],
   "summary": "El gateway de exterior Hitelecom H68 es un gateway LoRa industrial para redes de sensores de amplia área: hasta 10 km de cobertura, sensibilidad de -140 dBm, potencia de transmisión de 20-27 dBm y bandas regionales como CN470, EU868, US915 y AU915. La carcasa IP68 está diseñada para el servicio prolongado en exteriores, con backhaul 4G y enlace ascendente MQTT.",
   "sku": "H68",
   "applications": [
    {
     "name": "Parques y campus inteligentes",
     "desc": "Un gateway en la azotea puede recopilar datos de numerosos sensores en todo un sitio.",
     "img": "product/details/275-scen2.jpg"
    },
    {
     "name": "Redes de agua inteligentes",
     "desc": "Agrega el tráfico de medidores y sensores de nivel en toda un área de servicio.",
     "img": "product/details/275-scen3.jpg"
    },
    {
     "name": "Sitios de energías renovables",
     "desc": "Cubre parques solares y sitios eólicos con backhaul de sensores de largo alcance.",
     "img": "product/details/275-scen1.jpg"
    },
    {
     "name": "Automatización industrial",
     "desc": "Recopilación de datos de sensores en toda la planta sin una tarjeta SIM por sensor.",
     "img": "product/details/275-scen4.jpg"
    },
    {
     "name": "Monitoreo ambiental",
     "desc": "Redes de sensores de ríos, aire y ruido en amplias zonas rurales.",
     "img": "product/details/275-scen5.jpg"
    },
    {
     "name": "Alumbrado y activos de una ciudad inteligente",
     "desc": "Cobertura a escala de manzana para las redes de sensores municipales.",
     "img": "product/details/275-scen6.jpg"
    },
    {
     "name": "Patios logísticos",
     "desc": "Rastreo en todo el patio y sensores de condición a través de un solo gateway.",
     "img": "product/details/275-scen8.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "¿Qué cobertura ofrece el gateway de exterior H68?",
     "a": "Hasta 10 km en condiciones abiertas con una sensibilidad de -140 dBm y una potencia de transmisión de 20-27 dBm. La cobertura real depende del terreno y de la altura de la antena; Hitelecom puede estimarla a partir de su plano del sitio."
    },
    {
     "q": "¿Qué bandas de frecuencia se admiten?",
     "a": "CN470, EU868, IN865, RU864, US915 y AU915: cubren implementaciones en China, Europa, India, Rusia, Norteamérica y Australia."
    },
    {
     "q": "¿Cómo envía el gateway los datos al backend?",
     "a": "Por 4G celular (LTE-TDD B34/B38/B39/B40/B41, LTE-FDD B1/B3/B5/B8) con enlace ascendente MQTT a Hitelecom Cloud o a una plataforma privada."
    },
    {
     "q": "¿Es el H68 adecuado para la instalación prolongada en exteriores?",
     "a": "Sí. La carcasa IP68 es hermética al polvo e impermeable, y el diseño industrial apunta al servicio prolongado en exteriores."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "276": {
   "series": "Serie H66 · Gateway de interior",
   "tagline": "Industrial | Largo alcance | Dúplex completo",
   "desc": "El gateway de la serie H66 presenta un diseño duradero para una operación estable en entornos industriales variables. Admite implementación plug-and-play, y puede enviarse una alarma de corte de energía cuando la energía de respaldo y el backhaul siguen disponibles.",
   "heroImg": "product/details/276-hero.png",
   "pdf": "/downloads/indoor-gateway-h66-datasheet.pdf",
   "crumbCat": "Gateway de interior",
   "returnCid": "272",
   "features": [
    {
     "icon": "product/details/276-f1.png",
     "text": "Alcance de comunicación de hasta 5 km (área abierta)"
    },
    {
     "icon": "product/details/276-f2.png",
     "text": "Clasificación IP67 de impermeabilidad y resistencia al polvo"
    },
    {
     "icon": "product/details/276-f3.png",
     "text": "Gateway industrial full-duplex de 8 canales"
    },
    {
     "icon": "product/details/276-f4.png",
     "text": "Permite el despliegue local para el control y la confiabilidad de los datos"
    },
    {
     "icon": "product/details/276-f5.png",
     "text": "Circuito integrado de amplificación de potencia y amplificador de bajo ruido"
    },
    {
     "icon": "product/details/276-f6.png",
     "text": "Opciones inalámbricas: 4G LTE, NB-IoT y LoRa."
    },
    {
     "icon": "product/details/276-f7.png",
     "text": "Redes de gran capacidad, control remoto y adquisición de datos"
    },
    {
     "icon": "product/details/276-f8.png",
     "text": "Puede enviar una alerta de corte de energía cuando la energía de respaldo y el backhaul siguen disponibles"
    }
   ],
   "specsTitle": "Especificaciones técnicas",
   "specsDesc": "El gateway inalámbrico industrial multicanal de la Serie H66 admite múltiples protocolos, ofrece full-duplex de 8 canales y computación de borde, soporta condiciones exigentes y permite el procesamiento de datos en tiempo real y la gestión remota.",
   "specs": [
    [
     "Modelos de producto",
     "H66"
    ],
    [
     "Bandas de frecuencia",
     "CN470/EU868/IN865/RU864/US915/AU915"
    ],
    [
     "Distancia",
     "Hasta 5 km (área abierta)"
    ],
    [
     "Potencia de transmisión",
     "20–27 dBm"
    ],
    [
     "Sensibilidad",
     "−140 dBm at 0 292 kbps"
    ],
    [
     "Antena",
     "Antena externa de fibra de vidrio"
    ],
    [
     "Banda 4G",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Protocolo",
     "MQTT"
    ],
    [
     "Temperatura de operación",
     "−20 °C a +70 °C"
    ],
    [
     "Temperatura de almacenamiento",
     "−20 °C a +80 °C"
    ],
    [
     "Instalación",
     "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Modelos de producto",
     "value": "H66"
    },
    {
     "name": "Bandas de frecuencia",
     "value": "CN470/EU868/IN865/RU864/US915/AU915"
    },
    {
     "name": "Distancia",
     "value": "Hasta 5 km (área abierta)"
    },
    {
     "name": "Potencia de transmisión",
     "value": "20–27 dBm",
     "unitText": "decibelios-miliwatio",
     "minValue": 20.0,
     "maxValue": 27.0
    },
    {
     "name": "Sensibilidad",
     "value": "−140 dBm at 0 292 kbps",
     "unitText": "decibelios-miliwatio"
    },
    {
     "name": "Antena",
     "value": "Antena externa de fibra de vidrio"
    },
    {
     "name": "Banda 4G",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Protocolo",
     "value": "MQTT"
    },
    {
     "name": "Temperatura de operación",
     "value": "−20 °C a +70 °C",
     "unitText": "grado Celsius",
     "minValue": -20.0,
     "maxValue": 70.0
    },
    {
     "name": "Temperatura de almacenamiento",
     "value": "−20 °C a +80 °C",
     "unitText": "grado Celsius",
     "minValue": -20.0,
     "maxValue": 80.0
    },
    {
     "name": "Instalación",
     "value": "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Escenarios de aplicación",
   "scenarios": [
    {
     "img": "product/details/276-scen1.jpg",
     "label": "Gestión de edificios"
    },
    {
     "img": "product/details/276-scen2.jpg",
     "label": "Gestión de la energía"
    },
    {
     "img": "product/details/276-scen3.jpg",
     "label": "Logística"
    },
    {
     "img": "product/details/276-scen4.jpg",
     "label": "Industrial"
    },
    {
     "img": "product/details/276-scen5.jpg",
     "label": "Ciudad inteligente"
    },
    {
     "img": "product/details/276-scen6.jpg",
     "label": "Gestión del agua"
    },
    {
     "img": "product/details/276-scen7.jpg",
     "label": "Transporte inteligente"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285",
    "275"
   ],
   "summary": "El gateway de interior Hitelecom H66 es un gateway LoRa industrial full-duplex para redes de sensores en edificios: hasta 5 km de alcance, sensibilidad de -140 dBm, bandas regionales de CN470 a US915, configuración plug-and-play con alerta de corte de energía, backhaul 4G y enlace ascendente MQTT.",
   "sku": "H66",
   "applications": [
    {
     "name": "Gestión de edificios",
     "desc": "Recopila los sensores de HVAC, medición y ambiente de todos los pisos desde un cuarto de comunicaciones.",
     "img": "product/details/276-scen1.jpg"
    },
    {
     "name": "Gestión de la energía",
     "desc": "Agrega el tráfico de sensores de submedición para las auditorías energéticas de fábricas y edificios.",
     "img": "product/details/276-scen2.jpg"
    },
    {
     "name": "Logística y almacenamiento",
     "desc": "Recolección de sensores dentro del almacén para temperatura, puertas y beacons de activos.",
     "img": "product/details/276-scen3.jpg"
    },
    {
     "name": "Instalaciones industriales",
     "desc": "Redes de sensores en planta sin cableado de datos.",
     "img": "product/details/276-scen4.jpg"
    },
    {
     "name": "Gestión del agua",
     "desc": "Agregación de sensores de salas de bombas y de nivel de tanques en edificios de servicios.",
     "img": "product/details/276-scen6.jpg"
    },
    {
     "name": "Instalaciones de transporte",
     "desc": "Recopilación de datos de sensores dentro de estaciones, túneles y depósitos.",
     "img": "product/details/276-scen7.jpg"
    }
   ],
   "certifications": [
    "IP67"
   ],
   "faqs": [
    {
     "q": "¿Cuál es la diferencia entre el H66 y el H68?",
     "a": "El H66 es el modelo de interior: plug-and-play con alerta de corte de energía, hasta 5 km de alcance y carcasa IP67. El H68 es el modelo de exterior, con hasta 10 km de alcance, IP68 y un diseño para el servicio prolongado en exteriores."
    },
    {
     "q": "¿Qué bandas de frecuencia admite?",
     "a": "CN470, EU868, IN865, RU864, US915 y AU915, conforme a los planes regionales de bandas LoRa."
    },
    {
     "q": "¿Qué ocurre si falla la energía?",
     "a": "Si la energía de respaldo y el backhaul 4G siguen disponibles, el gateway puede enviar una alerta de corte de energía."
    },
    {
     "q": "¿Cuántos sensores puede atender un gateway?",
     "a": "Un gateway industrial full-duplex puede atender grandes flotas de sensores; la capacidad real depende del intervalo de transmisión, la carga útil y las condiciones de la red; comparta su cantidad de dispositivos y Hitelecom dimensionará la red."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "277": {
   "series": "Serie H · Estación hidrológica",
   "tagline": "Solar | Modular | 2–12 canales",
   "desc": "Integra de 2 a 12 canales de sensores modulares para la recolección de datos ambientales —el conjunto de canales (nivel, caudal, calidad del agua, meteorología o sensores de calidad del aire) se configura por proyecto— con transmisión en tiempo real a la plataforma Hitelecom Cloud. Los usuarios pueden acceder a los datos hidrológicos y ambientales desde cualquier lugar por internet, lo que apoya el monitoreo y el análisis remotos.",
   "heroImg": "product/details/277-hero.png",
   "pdf": "/downloads/hydrology-monitoring-station-datasheet.pdf",
   "crumbCat": "12 parámetros",
   "returnCid": "274",
   "features": [
    {
     "icon": "product/details/277-f1.png",
     "text": "Monitoreo con 2–12 canales de sensores"
    },
    {
     "icon": "product/details/277-f2.png",
     "text": "Clasificación IP65 de impermeabilidad y resistencia al polvo"
    },
    {
     "icon": "product/details/277-f3.png",
     "text": "2–12 canales de sensores configurables"
    },
    {
     "icon": "product/details/277-f4.png",
     "text": "Admite activación por NFC y configuración local del dispositivo."
    },
    {
     "icon": "product/details/277-f5.png",
     "text": "Admite actualizaciones remotas de firmware OTA."
    },
    {
     "icon": "product/details/277-f6.png",
     "text": "Opciones inalámbricas: 4G LTE, NB-IoT y LoRa."
    },
    {
     "icon": "product/details/277-f7.png",
     "text": "Acceso remoto a los datos: monitoree desde cualquier lugar"
    },
    {
     "icon": "product/details/277-f8.png",
     "text": "Alertas por umbral configurables"
    }
   ],
   "specsTitle": "Especificaciones técnicas",
   "specsDesc": "Monitorea una variedad de datos hidrológicos, incluidos, entre otros, el nivel del agua, el caudal, la calidad del agua, la temperatura y la humedad, la velocidad y dirección del viento, la presión atmosférica, la lluvia, PM2,5/10 y CO₂, para dar visibilidad a los niveles de agua y a las tendencias y fuentes de la contaminación del aire, brindando un soporte de datos confiable para la protección ambiental y la gestión urbana del agua.",
   "specs": [
    [
     "Modelos de producto",
     "H700"
    ],
    [
     "Rango de medición",
     "Configurable"
    ],
    [
     "Precisión",
     "Configurable"
    ],
    [
     "Protocolo",
     "MQTT"
    ],
    [
     "Alcance",
     "Zonas urbanas · Rurales · Llanuras · Montañosas"
    ],
    [
     "Bandas de frecuencia",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Fuente de alimentación",
     "Energía solar · Red eléctrica"
    ],
    [
     "Instalación",
     "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Modelos de producto",
     "value": "H700"
    },
    {
     "name": "Rango de medición",
     "value": "Configurable"
    },
    {
     "name": "Precisión",
     "value": "Configurable"
    },
    {
     "name": "Protocolo",
     "value": "MQTT"
    },
    {
     "name": "Alcance",
     "value": "Zonas urbanas · Rurales · Llanuras · Montañosas"
    },
    {
     "name": "Bandas de frecuencia",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Fuente de alimentación",
     "value": "Energía solar · Red eléctrica"
    },
    {
     "name": "Instalación",
     "value": "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Escenarios de aplicación",
   "scenarios": [
    {
     "img": "product/details/277-scen1.jpg",
     "label": "Agricultura inteligente"
    },
    {
     "img": "product/details/277-scen2.jpg",
     "label": "Monitoreo ambiental"
    },
    {
     "img": "product/details/277-scen3.jpg",
     "label": "Gestión urbana"
    },
    {
     "img": "product/details/277-scen4.jpg",
     "label": "Campus inteligente"
    },
    {
     "img": "product/details/277-scen5.jpg",
     "label": "Servicios de energía"
    },
    {
     "img": "product/details/277-scen6.jpg",
     "label": "Monitoreo oceánico y costero"
    },
    {
     "img": "product/details/277-scen7.jpg",
     "label": "Gestión de emergencias"
    },
    {
     "img": "product/details/277-scen8.jpg",
     "label": "Transporte y envíos"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285",
    "276"
   ],
   "summary": "La estación hidrológica Hitelecom H700 es un terminal de monitoreo modular alimentado por energía solar que integra de 2 a 12 canales de sensores para datos del agua y ambientales. Transmite en tiempo real a Hitelecom Cloud por 4G, puede implementarse en zonas urbanas y rurales, incluidas llanuras y terrenos montañosos, y puede instalarse con orejetas de montaje, abrazadera de poste o montaje ranurado.",
   "sku": "H700",
   "applications": [
    {
     "name": "Monitoreo de ríos y arroyos",
     "desc": "Canales de nivel de agua, lluvia y relacionados con el caudal para redes hidrológicas."
    },
    {
     "name": "Gestión de embalses y lagos",
     "desc": "Registro multiparamétrico para la gestión operativa y la seguridad hidrológica.",
     "img": "solution/67-scen-0.jpg"
    },
    {
     "name": "Vigilancia de anegamientos urbanos",
     "desc": "Monitoreo de lluvia y nivel en puntos urbanos propensos a inundaciones.",
     "img": "product/details/277-scen3.jpg"
    },
    {
     "name": "Agricultura inteligente",
     "desc": "Canales de agua y meteorología del distrito de riego en una sola estación.",
     "img": "product/details/277-scen1.jpg"
    },
    {
     "name": "Monitoreo ambiental",
     "desc": "Canales de calidad del agua y meteorológicos para programas de cuencas."
    },
    {
     "name": "Alerta de crecidas torrenciales",
     "desc": "Las estaciones solares remotas en cuencas montañosas alimentan los sistemas de alerta temprana.",
     "img": "product/details/277-scen2.jpg"
    },
    {
     "name": "Sitios costeros y estuarios",
     "desc": "Canales de mareas y meteorología para la gestión costera.",
     "img": "product/details/277-scen6.jpg"
    },
    {
     "name": "Gestión de emergencias",
     "desc": "Las estaciones de despliegue rápido suministran datos durante las temporadas de inundaciones.",
     "img": "product/details/277-scen7.jpg"
    }
   ],
   "certifications": [
    "IP65"
   ],
   "faqs": [
    {
     "q": "¿Qué puede medir la estación hidrológica H700?",
     "a": "Integra de 2 a 12 canales de sensores por sitio; las configuraciones típicas combinan sensores de nivel de agua, lluvia, relacionados con el caudal y meteorológicos. Los canales se seleccionan por proyecto."
    },
    {
     "q": "¿Cómo se alimenta la estación?",
     "a": "La estación puede usar energía solar o de red, admitiendo tanto instalaciones remotas como urbanas."
    },
    {
     "q": "¿Cómo llegan los datos a la plataforma?",
     "a": "En tiempo real por 4G con enlace ascendente MQTT a Hitelecom Cloud; los usuarios leen y exportan los datos desde la plataforma web o la app."
    },
    {
     "q": "¿Dónde puede implementarse?",
     "a": "Zonas urbanas, rurales, llanuras y montañosas; las opciones de orejetas de montaje, abrazadera de poste y montaje ranurado se adaptan a postes, paredes y rieles."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "278": {
   "series": "Serie H · Estación meteorológica",
   "tagline": "Modular | Alimentación solar | Para todo tipo de clima",
   "desc": "Integra de 2 a 12 sensores para la recolección de datos ambientales, permitiendo la transmisión en tiempo real a la plataforma Hitelecom Cloud. Permite el monitoreo y el análisis remotos de los datos meteorológicos desde cualquier lugar por internet.",
   "heroImg": "product/details/278-hero.png",
   "pdf": "/downloads/weather-station-datasheet.pdf",
   "crumbCat": "6 parámetros",
   "returnCid": "275",
   "features": [
    {
     "icon": "product/details/278-f1.png",
     "text": "Monitoreo con 2–12 canales de sensores"
    },
    {
     "icon": "product/details/278-f2.png",
     "text": "Clasificación IP65 de impermeabilidad y resistencia al polvo"
    },
    {
     "icon": "product/details/278-f3.png",
     "text": "Canales de sensores y opciones de alimentación configurables"
    },
    {
     "icon": "product/details/278-f4.png",
     "text": "Admite activación por NFC y configuración local del dispositivo."
    },
    {
     "icon": "product/details/278-f5.png",
     "text": "Admite actualizaciones remotas de firmware OTA."
    },
    {
     "icon": "product/details/278-f6.png",
     "text": "Opciones inalámbricas: 4G LTE, NB-IoT y LoRa."
    },
    {
     "icon": "product/details/278-f7.png",
     "text": "Acceso remoto a los datos: monitoree desde cualquier lugar"
    },
    {
     "icon": "product/details/278-f8.png",
     "text": "Alertas por umbral configurables"
    }
   ],
   "specsTitle": "Especificaciones técnicas",
   "specsDesc": "Monitorea parámetros meteorológicos, incluidos temperatura, humedad, velocidad y dirección del viento, presión atmosférica, lluvia, PM2,5/PM10, CO₂, SO₂ y radiación solar (canales según configuración), apoyando el análisis de tendencias ambientales para aplicaciones de protección ambiental y planificación urbana.",
   "specs": [
    [
     "Modelos de producto",
     "H600"
    ],
    [
     "Rango de medición",
     "Configurable"
    ],
    [
     "Precisión",
     "Configurable"
    ],
    [
     "Protocolo",
     "MQTT"
    ],
    [
     "Alcance",
     "Zonas urbanas · Rurales · Llanuras · Montañosas"
    ],
    [
     "Bandas de frecuencia",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Fuente de alimentación",
     "Energía solar · Red eléctrica"
    ],
    [
     "Instalación",
     "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Modelos de producto",
     "value": "H600"
    },
    {
     "name": "Rango de medición",
     "value": "Configurable"
    },
    {
     "name": "Precisión",
     "value": "Configurable"
    },
    {
     "name": "Protocolo",
     "value": "MQTT"
    },
    {
     "name": "Alcance",
     "value": "Zonas urbanas · Rurales · Llanuras · Montañosas"
    },
    {
     "name": "Bandas de frecuencia",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Fuente de alimentación",
     "value": "Energía solar · Red eléctrica"
    },
    {
     "name": "Instalación",
     "value": "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Escenarios de aplicación",
   "scenarios": [
    {
     "img": "product/details/278-scen1.jpg",
     "label": "Agricultura inteligente"
    },
    {
     "img": "product/details/278-scen2.jpg",
     "label": "Ambiental"
    },
    {
     "img": "product/details/278-scen3.jpg",
     "label": "Oceánico y costero"
    },
    {
     "img": "product/details/278-scen4.jpg",
     "label": "Campus inteligente"
    },
    {
     "img": "product/details/278-scen5.jpg",
     "label": "Gestión urbana"
    },
    {
     "img": "product/details/278-scen6.jpg",
     "label": "Gestión de emergencias"
    },
    {
     "img": "product/details/278-scen7.jpg",
     "label": "Transporte y envíos"
    }
   ],
   "related": [
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285",
    "276"
   ],
   "summary": "La estación meteorológica Hitelecom H600 es un terminal agrometeorológico modular alimentado por energía solar, configurado con 2 a 12 canales de sensores para temperatura del aire, humedad, lluvia, viento, presión barométrica y radiación solar. Reporta en tiempo real por 4G a Hitelecom Cloud para fincas, campus, ciudades y sitios costeros.",
   "sku": "H600",
   "applications": [
    {
     "name": "Agricultura inteligente",
     "desc": "La meteorología de campo alimenta los modelos de riego, ventanas de pulverización y alerta de enfermedades.",
     "img": "product/details/278-scen1.jpg"
    },
    {
     "name": "Monitoreo ambiental",
     "desc": "Series climáticas de largo plazo para programas de cuencas y ecológicos.",
     "img": "product/details/278-scen2.jpg"
    },
    {
     "name": "Campus y escuelas inteligentes",
     "desc": "Meteorología del campus para la enseñanza, la seguridad y la gestión de instalaciones.",
     "img": "product/details/278-scen4.jpg"
    },
    {
     "name": "Gestión urbana",
     "desc": "Monitoreo del microclima para los servicios municipales y los estudios de isla de calor.",
     "img": "product/details/278-scen5.jpg"
    },
    {
     "name": "Sitios costeros y marinos",
     "desc": "Canales de viento y presión para la seguridad de las operaciones costeras.",
     "img": "product/details/278-scen3.jpg"
    },
    {
     "name": "Transporte y envíos",
     "desc": "Meteorología local en puertos, aeropuertos y tramos de carretera.",
     "img": "product/details/278-scen7.jpg"
    },
    {
     "name": "Gestión de emergencias",
     "desc": "Las estaciones desplegables alimentan los sistemas de decisión durante el clima severo.",
     "img": "product/details/278-scen6.jpg"
    }
   ],
   "certifications": [
    "IP65"
   ],
   "faqs": [
    {
     "q": "¿Qué parámetros meteorológicos mide el H600?",
     "a": "La estación integra de 2 a 12 canales: típicamente temperatura y humedad del aire, lluvia, velocidad y dirección del viento, presión barométrica y radiación solar. El conjunto de canales se configura por proyecto."
    },
    {
     "q": "¿Cómo se alimenta y se conecta la estación?",
     "a": "Energía solar o electricidad de red, con enlace ascendente 4G en tiempo real mediante MQTT a Hitelecom Cloud para la lectura y el análisis remotos."
    },
    {
     "q": "¿Puede funcionar en zonas remotas sin infraestructura?",
     "a": "Sí. La energía solar y el backhaul celular pueden reducir la necesidad de cableado de energía y datos; la estación puede instalarse con orejetas de montaje, abrazadera de poste o montaje ranurado."
    },
    {
     "q": "¿En qué se diferencia de la estación hidrológica H700?",
     "a": "El H600 se configura para canales meteorológicos (viento, lluvia, radiación), mientras que el H700 se configura para canales hidrológicos (nivel de agua, relacionados con el caudal). Ambos comparten la misma plataforma modular."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "286": {
   "series": "Serie H · Sensor de temperatura y presión para áreas peligrosas",
   "tagline": "Confiabilidad | Industrial | Bajo consumo",
   "desc": "El sensor 2 en 1 de Hitelecom combina el monitoreo de temperatura y presión en un solo dispositivo diseñado para atmósferas donde puede haber gas o polvo inflamable, lo que puede reducir la cantidad de dispositivos y la complejidad de la instalación en áreas peligrosas.",
   "heroImg": "product/details/286-hero.png",
   "pdf": "/downloads/explosion-proof-temperature-pressure-sensor-datasheet.pdf",
   "crumbCat": "Hardware",
   "returnCid": "279",
   "features": [
    {
     "icon": "product/details/286-f1.png",
     "text": "Precisión: ±0,5 °C (configurable hasta ±0,1 °C)"
    },
    {
     "icon": "product/details/286-f2.png",
     "text": "Carcasa con clasificación IP68"
    },
    {
     "icon": "product/details/286-f3.png",
     "text": "±0,5% FS (personalización de alta precisión)"
    },
    {
     "icon": "product/details/286-f4.png",
     "text": "Admite activación por NFC y configuración local del dispositivo."
    },
    {
     "icon": "product/details/286-f5.png",
     "text": "Admite actualizaciones remotas de firmware OTA."
    },
    {
     "icon": "product/details/286-f6.png",
     "text": "Opciones inalámbricas: 4G LTE, NB-IoT y LoRa."
    },
    {
     "icon": "product/details/286-f7.png",
     "text": "Monitoreo remoto"
    },
    {
     "icon": "product/details/286-f8.png",
     "text": "Alertas por umbral configurables"
    }
   ],
   "specsTitle": "Especificaciones técnicas",
   "specsDesc": "Las tecnologías integradas de comunicación y detección, con algoritmos embebidos de ahorro de energía, otorgan al transmisor una vida útil prolongada y una alta estabilidad de medición, respaldando la confiabilidad de todo el sistema de monitoreo.",
   "specs": [
    [
     "Modelos de producto",
     "H200/H300/H500"
    ],
    [
     "Rango de medición",
     "0–1, 1,6, 3,5, 7, 10, or 20 MPa"
    ],
    [
     "Precisión de presión",
     "±0,5% FS"
    ],
    [
     "Temperatura medida",
     "−200 °C a +800 °C"
    ],
    [
     "Precisión de temperatura",
     "±0,5 °C (customizable to ±0,1 °C)"
    ],
    [
     "Protocolo",
     "MQTT"
    ],
    [
     "Bandas de frecuencia",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Instalación",
     "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    ],
    [
     "Certificación para áreas peligrosas",
     "Certificado y marcado confirmados según el mercado objetivo y la zona; solicítelo antes de realizar el pedido"
    ],
    [
     "Temperatura de operación",
     "−40 °C a +125 °C"
    ],
    [
     "Temperatura de almacenamiento",
     "−40 °C a +125 °C"
    ]
   ],
   "specsStructured": [
    {
     "name": "Modelos de producto",
     "value": "H200/H300/H500"
    },
    {
     "name": "Rango de medición",
     "value": "0–1, 1,6, 3,5, 7, 10, or 20 MPa"
    },
    {
     "name": "Precisión de presión",
     "value": "±0,5% FS",
     "unitText": "porcentaje"
    },
    {
     "name": "Temperatura medida",
     "value": "−200 °C a +800 °C",
     "unitText": "grado Celsius",
     "minValue": -200.0,
     "maxValue": 800.0
    },
    {
     "name": "Precisión de temperatura",
     "value": "±0,5 °C (customizable to ±0,1 °C)",
     "unitText": "grado Celsius"
    },
    {
     "name": "Protocolo",
     "value": "MQTT"
    },
    {
     "name": "Bandas de frecuencia",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Instalación",
     "value": "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    },
    {
     "name": "Certificación para áreas peligrosas",
     "value": "Certificado y marcado confirmados según el mercado objetivo y la zona; solicítelo antes de realizar el pedido"
    },
    {
     "name": "Temperatura de operación",
     "value": "−40 °C a +125 °C",
     "unitText": "grado",
     "minValue": -40.0,
     "maxValue": 125.0
    },
    {
     "name": "Temperatura de almacenamiento",
     "value": "−40 °C a +125 °C",
     "unitText": "grado",
     "minValue": -40.0,
     "maxValue": 125.0
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Escenarios de aplicación",
   "scenarios": [
    {
     "img": "product/details/286-scen1.jpg",
     "label": "Petrochemicals"
    },
    {
     "img": "product/details/286-scen2.jpg",
     "label": "Minería"
    },
    {
     "img": "product/details/286-scen3.jpg",
     "label": "Planta química"
    }
   ],
   "related": [
    "287"
   ],
   "summary": "El transmisor 2 en 1 de la Serie H de Hitelecom combina el monitoreo de temperatura y presión en un solo dispositivo diseñado para entornos donde puede haber gas o polvo inflamable. Los rangos de presión de escala completa disponibles son 1, 1,6, 3,5, 7, 10 y 20 MPa con ±0,5% FS, la temperatura abarca de -200 °C a 800 °C, y los datos se transmiten por 4G o NB-IoT. El certificado para áreas peligrosas aplicable debe confirmarse para el mercado objetivo y la zona antes de realizar el pedido.",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Petrochemical plants",
     "desc": "Un solo dispositivo vigila tanto la temperatura como la presión de proceso en áreas peligrosas.",
     "img": "product/details/286-scen3.jpg"
    },
    {
     "name": "Extracción de petróleo y gas",
     "desc": "Monitoreo de bocas de pozo y líneas de recolección sin cableado en atmósferas explosivas.",
     "img": "product/details/286-scen1.jpg"
    },
    {
     "name": "Operaciones mineras",
     "desc": "Tendencias de temperatura y presión en áreas subterráneas con riesgo de gas.",
     "img": "product/details/286-scen2.jpg"
    },
    {
     "name": "Parques de almacenamiento de químicos",
     "desc": "Monitoreo de doble parámetro de equipos de almacenamiento y transferencia.",
     "img": "product/details/283-scen5.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "¿Por qué un transmisor 2 en 1 de temperatura y presión?",
     "a": "Un solo dispositivo combina dos mediciones en un único instrumento, lo que puede reducir los puntos de instalación, el cableado y el mantenimiento en áreas peligrosas, manteniendo ambas variables en el mismo cronograma de transmisión."
    },
    {
     "q": "¿Cuáles son los rangos de medición?",
     "a": "Presión: 0-1 MPa, 1,6, 3,5, 7, 10 o 20 MPa con ±0,5% FS. Temperatura: -200 °C a 800 °C con ±0,5 °C, configurable hasta ±0,1 °C."
    },
    {
     "q": "¿Está certificado para atmósferas explosivas?",
     "a": "El dispositivo está diseñado para atmósferas donde puede haber gas o polvo inflamable. La idoneidad depende de la configuración certificada requerida para el mercado objetivo, la zona, el grupo de gases o polvos y la clase de temperatura; solicite el certificado aplicable a Hitelecom antes de especificar el producto."
    },
    {
     "q": "¿Cómo transmite los datos?",
     "a": "Por 4G o NB-IoT con enlace ascendente MQTT a Hitelecom Cloud o a una implementación privada, con alarmas por umbral en ambos canales."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "287": {
   "series": "Serie H · Aislador de acoplamiento",
   "tagline": "Confiabilidad | Seguridad | Diseño para áreas peligrosas",
   "desc": "En la extracción de petróleo y gas, las plantas químicas y la minería puede haber gases, vapores o polvo inflamables, y los equipos inalámbricos en tales áreas requieren un diseño específico. El H100 es un dispositivo de acoplamiento de señal de alta frecuencia para estas instalaciones industriales. La idoneidad para un área peligrosa depende de la configuración certificada requerida para el mercado objetivo, la zona, el grupo de gases o polvos y la clase de temperatura: solicite el certificado aplicable antes de especificar el producto.",
   "heroImg": "product/details/287-hero.png",
   "pdf": "/downloads/coupling-isolator-h100-datasheet.pdf",
   "crumbCat": "Hardware",
   "returnCid": "279",
   "features": [
    {
     "icon": "product/details/287-f1.png",
     "text": "Acoplamiento de señal de alta frecuencia y baja atenuación"
    },
    {
     "icon": "product/details/287-f2.png",
     "text": "Carcasa con clasificación IP68"
    },
    {
     "icon": "product/details/287-f3.png",
     "text": "Supports 2,4 GHz / 5,8 GHz High-Frequency Links"
    },
    {
     "icon": "product/details/287-f4.png",
     "text": "Diseñado para el acoplamiento de señal en áreas peligrosas"
    },
    {
     "icon": "product/details/287-f5.png",
     "text": "Tecnología de bajo consumo de energía que reduce el consumo energético"
    },
    {
     "icon": "product/details/287-f6.png",
     "text": "Alta inmunidad a la interferencia electromagnética"
    }
   ],
   "specsTitle": "Especificaciones técnicas",
   "specsDesc": "El H100 es un dispositivo de acoplamiento de señal inalámbrica destinado a instalaciones en áreas peligrosas, compatible con las frecuencias de 2,4 GHz y 5,8 GHz, con un diseño de bajo consumo y alta resistencia a las interferencias, adecuado para entornos industriales exigentes. El certificado aplicable debe confirmarse para el mercado objetivo y la zona antes de realizar el pedido.",
   "specs": [
    [
     "Modelos de producto",
     "H100"
    ],
    [
     "Bandas de señal",
     "2,4 GHz / 5,8 GHz"
    ],
    [
     "Uso en áreas peligrosas",
     "Diseño de acoplamiento para áreas peligrosas; el certificado aplicable debe confirmarse para el mercado objetivo y la zona antes de realizar el pedido"
    ],
    [
     "Temperatura de operación",
     "−40 °C a +125 °C"
    ],
    [
     "Temperatura de almacenamiento",
     "−40 °C a +125 °C"
    ],
    [
     "Instalación",
     "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Modelos de producto",
     "value": "H100"
    },
    {
     "name": "Bandas de señal",
     "value": "2,4 GHz / 5,8 GHz"
    },
    {
     "name": "Uso en áreas peligrosas",
     "value": "Diseño de acoplamiento para áreas peligrosas; el certificado aplicable debe confirmarse para el mercado objetivo y la zona antes de realizar el pedido"
    },
    {
     "name": "Temperatura de operación",
     "value": "−40 °C a +125 °C",
     "unitText": "grado",
     "minValue": -40.0,
     "maxValue": 125.0
    },
    {
     "name": "Temperatura de almacenamiento",
     "value": "−40 °C a +125 °C",
     "unitText": "grado",
     "minValue": -40.0,
     "maxValue": 125.0
    },
    {
     "name": "Instalación",
     "value": "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Escenarios de aplicación",
   "scenarios": [
    {
     "img": "product/details/287-scen1.jpg",
     "label": "Petrochemicals"
    },
    {
     "img": "product/details/287-scen2.jpg",
     "label": "Minería"
    },
    {
     "img": "product/details/287-scen3.jpg",
     "label": "Química"
    }
   ],
   "related": [
    "286"
   ],
   "summary": "El aislador de acoplamiento Hitelecom H100 es un acoplador de señal de alta frecuencia que permite que las señales de sensores inalámbricos de 2,4 GHz / 5,8 GHz crucen los límites de áreas peligrosas en sitios de petróleo y gas, químicos y mineros. La idoneidad para un área peligrosa depende de la configuración certificada requerida para el mercado objetivo, la zona, el grupo de gases o polvos y la clase de temperatura: solicite el certificado aplicable antes de especificar el producto. Funciona de -40 °C a +125 °C y se instala con orejetas de montaje, abrazadera de poste o montaje ranurado.",
   "sku": "H100",
   "applications": [
    {
     "name": "Extracción de petróleo y gas",
     "desc": "Acopla las señales de los sensores inalámbricos fuera de las zonas peligrosas de las bocas de pozo.",
     "img": "product/details/287-scen1.jpg"
    },
    {
     "name": "Plantas químicas",
     "desc": "Une los enlaces inalámbricos entre áreas peligrosas y seguras sin atravesar las barreras.",
     "img": "product/details/287-scen3.jpg"
    },
    {
     "name": "Minería",
     "desc": "Ruta de acoplamiento de señal para redes de sensores inalámbricos subterráneos en áreas peligrosas.",
     "img": "product/details/287-scen2.jpg"
    },
    {
     "name": "Parques de tanques y terminales",
     "desc": "Acoplamiento de señal entre zonas y a través de diques de contención, sujeto a la configuración certificada.",
     "img": "product/details/283-scen5.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "¿Qué problema resuelve el aislador de acoplamiento?",
     "a": "Los enlaces inalámbricos estándar no deben cruzar los límites de las áreas peligrosas sin aislamiento certificado. El H100 acopla las señales de los sensores de 2,4 GHz / 5,8 GHz a través del límite, de modo que los sensores inalámbricos alimentados por batería puedan servir en áreas peligrosas sin penetraciones de conducto adicionales, sujeto a la configuración certificada para el mercado objetivo y la zona."
    },
    {
     "q": "¿Con qué normas cumple?",
     "a": "Eso depende de la configuración certificada para su mercado objetivo, zona, grupo de gases o polvos y clase de temperatura. Comparta sus requisitos y Hitelecom le proporcionará los detalles del certificado aplicable antes de la entrega."
    },
    {
     "q": "¿Qué entornos puede soportar?",
     "a": "La temperatura de operación y de almacenamiento abarcan de -40 °C a +125 °C, con una carcasa IP68 para sitios en exteriores y subterráneos."
    },
    {
     "q": "¿Cómo se instala?",
     "a": "Orejetas de montaje, abrazadera de poste o montaje ranurado: la misma familia de accesorios que otros dispositivos de campo de la Serie H."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "301": {
   "series": "Serie H · Sensor de temperatura y humedad",
   "tagline": "Precisión | Monitoreo ambiental | Consumo ultrabajo",
   "desc": "Los sensores de temperatura y humedad de Hitelecom ofrecen monitoreo climático de alta precisión con alertas remotas, brindando a salas limpias, gabinetes, museos y líneas de producción registros climáticos continuos y alarmas por umbral las 24 horas",
   "heroImg": "product/details/301-hero.png",
   "pdf": "/downloads/h300-temperature-humidity-sensor-datasheet.pdf",
   "crumbCat": "Temperatura",
   "returnCid": "263",
   "features": [
    {
     "icon": "product/details/270-f1.png",
     "text": "Precisión: ±0,2 °C / ±2% HR (típica)"
    },
    {
     "icon": "product/details/270-f2-ip65.png",
     "text": "Carcasa con clasificación IP65"
    },
    {
     "icon": "product/details/270-f3.png",
     "text": "Rango: 0–100% HR, -20 °C a +80 °C"
    },
    {
     "icon": "product/details/270-f4.png",
     "text": "Admite activación por NFC y configuración local del dispositivo."
    },
    {
     "icon": "product/details/270-f5.png",
     "text": "Diseño de bajo consumo para operación a largo plazo"
    },
    {
     "icon": "product/details/270-f6.png",
     "text": "Opciones inalámbricas: 4G LTE, NB-IoT y LoRa."
    },
    {
     "icon": "product/details/270-f7.png",
     "text": "Monitoreo remoto del clima"
    },
    {
     "icon": "product/details/270-f8.png",
     "text": "Alertas por umbral configurables"
    }
   ],
   "specsTitle": "Especificaciones técnicas",
   "specsDesc": "Los procesadores de microconsumo y la optimización algorítmica otorgan al sensor una vida útil de diseño de hasta 10 años con un intervalo de transmisión de una hora en condiciones de prueba especificadas, reduciendo el mantenimiento rutinario.",
   "specs": [
    [
     "Modelos de producto",
     "H200/H300/H500"
    ],
    [
     "Rango de medición",
     "Humedad 0–100% HR, temperatura -20 °C a +80 °C"
    ],
    [
     "Precisión",
     "±0,2 °C / ±2% HR (típico)"
    ],
    [
     "Protocolo",
     "MQTT"
    ],
    [
     "Sonda",
     "Slotted sintered probe, cable-mounted"
    ],
    [
     "Bandas de frecuencia",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Duración de la batería",
     "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión."
    ],
    [
     "Instalación",
     "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    ]
   ],
   "specsStructured": [
    {
     "name": "Modelos de producto",
     "value": "H200/H300/H500"
    },
    {
     "name": "Rango de medición",
     "value": "Humedad 0–100% HR, temperatura -20 °C a +80 °C"
    },
    {
     "name": "Precisión",
     "value": "±0,2 °C / ±2% HR (típico)"
    },
    {
     "name": "Protocolo",
     "value": "MQTT"
    },
    {
     "name": "Sonda",
     "value": "Slotted sintered probe, cable-mounted"
    },
    {
     "name": "Bandas de frecuencia",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Duración de la batería",
     "value": "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión.",
     "unitText": "año",
     "minValue": 10.0
    },
    {
     "name": "Instalación",
     "value": "Orejetas de montaje, abrazadera de poste o montaje ranurado (varía según la configuración)"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Escenarios de aplicación",
   "scenarios": [
    {
     "img": "product/details/270-scen3.jpg",
     "label": "Centro de datos"
    },
    {
     "img": "product/details/270-scen4.jpg",
     "label": "Almacenamiento farmacéutico y sanitario"
    },
    {
     "img": "product/details/270-scen5.jpg",
     "label": "Procesamiento de alimentos"
    },
    {
     "img": "product/details/270-scen2.jpg",
     "label": "Agricultura inteligente"
    },
    {
     "img": "product/details/285-scen1.jpg",
     "label": "Entorno de oficina"
    },
    {
     "img": "product/details/285-scen7.jpg",
     "label": "Fabricación inteligente"
    },
    {
     "img": "product/details/285-scen3.jpg",
     "label": "Hospital"
    }
   ],
   "related": [
    "302",
    "270",
    "274",
    "280",
    "281",
    "282",
    "283",
    "284",
    "285"
   ],
   "summary": "El sensor de temperatura y humedad de la Serie H de Hitelecom es un sensor ambiental inalámbrico para salas limpias, gabinetes eléctricos, museos y líneas de producción. Su sonda sinterizada ranurada mide 0–100% HR y −20 °C a +80 °C, con precisiones típicas de ±2% HR y ±0,2 °C, con una batería diseñada para más de 10 años de vida con un intervalo de transmisión de una hora en condiciones de prueba especificadas, y reporte a la nube por 4G/NB-IoT.",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Centros de datos y salas de servidores",
     "desc": "Sigue la temperatura y la humedad a nivel de rack para mantener los equipos de TI dentro de los límites de ASHRAE.",
     "img": "product/details/270-scen3.jpg"
    },
    {
     "name": "Almacenamiento médico y farmacéutico",
     "desc": "Monitorea farmacias, cámaras de frío y salas donde la humedad afecta la estabilidad de los medicamentos.",
     "img": "product/details/270-scen4.jpg"
    },
    {
     "name": "Museos y archivos",
     "desc": "Proporciona registros climáticos continuos que respaldan las decisiones de conservación de papel, textiles y reliquias."
    },
    {
     "name": "Procesamiento y almacenamiento de alimentos",
     "desc": "Sigue la humedad en naves de procesamiento y almacenes, alertando al personal sobre condiciones que pueden provocar moho y condensación.",
     "img": "product/details/270-scen5.jpg"
    },
    {
     "name": "Gabinetes y carcasas eléctricas",
     "desc": "La sonda montada en cable llega al interior de los gabinetes para advertir sobre la condensación antes de que comience la corrosión.",
     "img": "product/details/285-scen7.jpg"
    },
    {
     "name": "Invernaderos",
     "desc": "Combina las tendencias de temperatura y humedad para las decisiones de ventilación y riego.",
     "img": "product/details/270-scen2.jpg"
    },
    {
     "name": "Oficinas y hospitales",
     "desc": "Mantiene el confort y la higiene del aire interior dentro de los rangos objetivo en edificios públicos.",
     "img": "product/details/285-scen1.jpg"
    }
   ],
   "certifications": [
    "IP65"
   ],
   "faqs": [
    {
     "q": "¿Cuáles son el rango de medición y la precisión?",
     "a": "Mide 0–100% HR y −20 °C a +80 °C, con precisiones típicas de ±2% HR y ±0,2 °C. La sonda sinterizada ranurada va montada en cable, por lo que puede colocarse dentro de gabinetes y conductos."
    },
    {
     "q": "¿Admite alarmas por umbral?",
     "a": "Sí. Los umbrales altos y bajos de temperatura y humedad se configuran de forma remota, y el sensor envía alertas a través de la plataforma en la nube cuando se superan los límites."
    },
    {
     "q": "¿Cuánto dura la batería?",
     "a": "La configuración de batería seleccionada está diseñada para más de 10 años con un intervalo de transmisión de una hora en condiciones de prueba especificadas; la vida real varía con la cobertura de red, la temperatura y la frecuencia de transmisión. No se necesita cableado de red eléctrica en el punto de instalación."
    },
    {
     "q": "¿Qué redes inalámbricas se admiten?",
     "a": "4G y NB-IoT con enlace ascendente MQTT a Hitelecom Cloud, a la nube del cliente o a una implementación privada. LoRa está disponible para sitios con múltiples sensores mediante un gateway privado."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "302": {
   "series": "Serie H · Registrador de datos de temperatura y humedad",
   "tagline": "Configuración NFC | Exportación USB | Registro de alta capacidad",
   "desc": "Los registradores de datos de temperatura y humedad de Hitelecom almacenan hasta 80 000 lecturas con configuración por NFC y exportación por USB con un solo clic, produciendo registros con marca de tiempo que respaldan las auditorías en la logística de cadena de frío, farmacéutica y de alimentos.",
   "heroImg": "product/details/302-hero.png",
   "pdf": "/downloads/temperature-humidity-data-logger-datasheet.pdf",
   "crumbCat": "Temperatura",
   "returnCid": "263",
   "features": [
    {
     "icon": "product/details/270-f1.png",
     "text": "Precisión: ±0,2 °C / ±2% HR (típica)"
    },
    {
     "icon": "product/details/270-f2-ip65.png",
     "text": "Carcasa con clasificación IP65"
    },
    {
     "icon": "product/details/270-f3.png",
     "text": "80 000 Readings Onboard Storage"
    },
    {
     "icon": "product/details/270-f4.png",
     "text": "Configuración con un toque NFC, exportación por USB con un solo clic"
    },
    {
     "icon": "product/details/270-f5.png",
     "text": "Diseño de bajo consumo para operación a largo plazo"
    },
    {
     "icon": "product/details/270-f6.png",
     "text": "Registro autónomo con NFC y USB; no requiere gateway"
    },
    {
     "icon": "product/details/270-f7.png",
     "text": "Registro con marca de tiempo para cada lectura"
    },
    {
     "icon": "product/details/270-f9.png",
     "text": "Software de PC gratuito: análisis de curvas y exportación PDF/CSV"
    }
   ],
   "specsTitle": "Especificaciones técnicas",
   "specsDesc": "Un diseño de microconsumo con configuración por NFC y exportación por USB con un solo clic; la batería reemplazable admite años de registro entre cambios de batería.",
   "specs": [
    [
     "Modelos de producto",
     "H200L/H300L"
    ],
    [
     "Capacidad de almacenamiento",
     "80 000 Readings"
    ],
    [
     "Precisión",
     "±0,2 °C / ±2% HR (típico)"
    ],
    [
     "Configuración",
     "NFC (app Android/iOS)"
    ],
    [
     "Exportación de datos",
     "USB, informe PDF/CSV"
    ],
    [
     "Duración de la batería",
     "Batería reemplazable de varios años"
    ],
    [
     "Protección",
     "IP65"
    ],
    [
     "Instalación",
     "Sobremesa · Colgante · Adhesivo"
    ]
   ],
   "specsStructured": [
    {
     "name": "Modelos de producto",
     "value": "H200L/H300L"
    },
    {
     "name": "Capacidad de almacenamiento",
     "value": "80 000 Readings"
    },
    {
     "name": "Precisión",
     "value": "±0,2 °C / ±2% HR (típico)"
    },
    {
     "name": "Configuración",
     "value": "NFC (app Android/iOS)"
    },
    {
     "name": "Exportación de datos",
     "value": "USB, informe PDF/CSV"
    },
    {
     "name": "Duración de la batería",
     "value": "Batería reemplazable de varios años"
    },
    {
     "name": "Protección",
     "value": "IP65"
    },
    {
     "name": "Instalación",
     "value": "Sobremesa · Colgante · Adhesivo"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Escenarios de aplicación",
   "scenarios": [
    {
     "img": "product/details/285-scen4.jpg",
     "label": "Transporte en cadena de frío"
    },
    {
     "img": "product/details/270-scen5.jpg",
     "label": "Procesamiento de alimentos"
    },
    {
     "img": "product/details/270-scen4.jpg",
     "label": "Almacenamiento farmacéutico y sanitario"
    },
    {
     "img": "product/details/285-scen3.jpg",
     "label": "Hospital"
    },
    {
     "img": "product/details/285-scen7.jpg",
     "label": "Fabricación inteligente"
    },
    {
     "img": "product/details/285-scen6.jpg",
     "label": "Centro de datos"
    }
   ],
   "related": [
    "301",
    "270",
    "285",
    "274",
    "280",
    "281",
    "282",
    "283"
   ],
   "summary": "El registrador de datos de temperatura y humedad de la Serie H de Hitelecom almacena hasta 80 000 lecturas con una precisión típica de ±0,2 °C y ±2% HR. La configuración por NFC con un dispositivo Android o iOS compatible, la exportación por USB con un solo clic de informes PDF/CSV, el software de PC gratuito para gráficos y análisis de datos y una batería reemplazable de varios años proporcionan registros que respaldan las auditorías de la logística de cadena de frío, farmacéutica y de alimentos.",
   "sku": "H200L/H300L",
   "applications": [
    {
     "name": "Transporte en cadena de frío",
     "desc": "Registros de temperatura a nivel de viaje para camiones refrigerados, contenedores refrigerados y cajas de última milla.",
     "img": "product/details/285-scen4.jpg"
    },
    {
     "name": "Distribución farmacéutica",
     "desc": "Evidencia PDF/CSV lista para auditoría en envíos de vacunas, insulina y productos biológicos.",
     "img": "product/details/270-scen4.jpg"
    },
    {
     "name": "Procesamiento y almacenamiento de alimentos",
     "desc": "Registro compatible con HACCP en naves de procesamiento, cámaras de frío y vitrinas de exhibición.",
     "img": "product/details/270-scen5.jpg"
    },
    {
     "name": "Hospitales y laboratorios",
     "desc": "Registro de refrigeradores, congeladores e incubadoras para las verificaciones de cumplimiento.",
     "img": "product/details/285-scen3.jpg"
    },
    {
     "name": "Almacenamiento",
     "desc": "Registro ambiental a largo plazo en almacenes aduaneros y generales.",
     "img": "product/details/276-scen3.jpg"
    },
    {
     "name": "Centros de datos y archivos",
     "desc": "Registro ambiental en salas, cámaras y contenedores donde no se requiere enlace inalámbrico.",
     "img": "product/details/285-scen6.jpg"
    }
   ],
   "certifications": [
    "IP65"
   ],
   "faqs": [
    {
     "q": "¿Cómo configuro el registrador y leo los datos?",
     "a": "Toque el registrador con un teléfono con NFC para iniciarlo, detenerlo y configurarlo; confirme con Hitelecom la compatibilidad NFC de iOS para su modelo de teléfono. Después del viaje, conéctelo por USB para exportar los informes PDF/CSV, o abra los archivos en el software gratuito de PC para el análisis de curvas."
    },
    {
     "q": "¿Cuántas lecturas puede almacenar?",
     "a": "Hasta 80 000 lecturas. Con un intervalo de cinco minutos, eso cubre aproximadamente nueve meses de registro continuo."
    },
    {
     "q": "¿La batería es reemplazable?",
     "a": "Sí. El registrador usa una batería reemplazable con una vida de varios años, de modo que el mismo registrador puede reutilizarse en múltiples viajes durante varios años."
    },
    {
     "q": "¿Sube los datos por vía inalámbrica?",
     "a": "No: es un registrador de datos autónomo; los datos permanecen en el registrador hasta que usted los exporte por USB o los lea por NFC, lo que es adecuado para envíos transfronterizos y entregas auditadas donde no se necesita un enlace en vivo."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "303": {
   "series": "Serie H · Sensor de TVOC",
   "tagline": "Monitoreo de COV | Montaje fijo | Consumo ultrabajo",
   "desc": "Los sensores de TVOC de Hitelecom rastrean los compuestos orgánicos volátiles totales de 0 a 100 000 ppb con resolución de 1 ppb, apoyando el monitoreo en talleres de pintura, almacenes de químicos y laboratorios con alarmas remotas",
   "heroImg": "product/details/303-hero.png",
   "pdf": "/downloads/tvoc-sensor-datasheet.pdf",
   "crumbCat": "Calidad del aire",
   "returnCid": "265",
   "features": [
    {
     "icon": "product/details/270-f1.png",
     "text": "Resolución: 1 ppb"
    },
    {
     "icon": "product/details/270-f2.png",
     "text": "Carcasa con clasificación IP68, personalizable"
    },
    {
     "icon": "product/details/270-f3.png",
     "text": "Amplio rango: 0-100 000 ppb"
    },
    {
     "icon": "product/details/270-f4.png",
     "text": "Admite activación por NFC y configuración local del dispositivo."
    },
    {
     "icon": "product/details/270-f5.png",
     "text": "Diseño de bajo consumo para operación a largo plazo"
    },
    {
     "icon": "product/details/270-f6.png",
     "text": "Opciones inalámbricas: 4G LTE, NB-IoT y LoRa."
    },
    {
     "icon": "product/details/270-f7.png",
     "text": "Monitoreo remoto de COV"
    },
    {
     "icon": "product/details/270-f8.png",
     "text": "Alertas por umbral configurables"
    }
   ],
   "specsTitle": "Especificaciones técnicas",
   "specsDesc": "Los procesadores de microconsumo y la optimización algorítmica otorgan al sensor una vida útil de diseño de hasta 10 años con un intervalo de transmisión de una hora en condiciones de prueba especificadas, reduciendo el mantenimiento rutinario.",
   "specs": [
    [
     "Modelos de producto",
     "H200/H300/H500"
    ],
    [
     "Rango de medición",
     "0-100 000 ppb"
    ],
    [
     "Resolución",
     "1 ppb"
    ],
    [
     "Protocolo",
     "MQTT"
    ],
    [
     "Principio de medición",
     "Electroquímico o PID (según configuración)"
    ],
    [
     "Bandas de frecuencia",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Duración de la batería",
     "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión."
    ],
    [
     "Instalación",
     "Montaje con orejeta · Montaje en conducto"
    ]
   ],
   "specsStructured": [
    {
     "name": "Modelos de producto",
     "value": "H200/H300/H500"
    },
    {
     "name": "Rango de medición",
     "value": "0-100 000 ppb",
     "unitText": "partes por mil millones",
     "minValue": 0.0,
     "maxValue": 100000.0
    },
    {
     "name": "Resolución",
     "value": "1 ppb",
     "unitText": "partes por mil millones"
    },
    {
     "name": "Protocolo",
     "value": "MQTT"
    },
    {
     "name": "Principio de medición",
     "value": "Electroquímico o PID (según configuración)"
    },
    {
     "name": "Bandas de frecuencia",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Duración de la batería",
     "value": "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión.",
     "unitText": "año",
     "minValue": 10.0
    },
    {
     "name": "Instalación",
     "value": "Montaje con orejeta · Montaje en conducto"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Escenarios de aplicación",
   "scenarios": [
    {
     "img": "product/details/285-scen7.jpg",
     "label": "Fabricación inteligente"
    },
    {
     "img": "product/details/283-scen5.jpg",
     "label": "Planta química"
    },
    {
     "img": "product/details/285-scen1.jpg",
     "label": "Entorno de oficina"
    },
    {
     "img": "product/details/285-scen3.jpg",
     "label": "Hospital"
    },
    {
     "img": "product/details/285-scen5.jpg",
     "label": "Entorno residencial"
    },
    {
     "img": "product/details/283-scen7.jpg",
     "label": "Edificio inteligente"
    }
   ],
   "related": [
    "305",
    "285",
    "301",
    "302",
    "270",
    "274",
    "284",
    "283"
   ],
   "summary": "El sensor de TVOC de la Serie H de Hitelecom es un monitor inalámbrico de compuestos orgánicos volátiles totales de 0 a 100 000 ppb con resolución de 1 ppb. La tecnología de detección se selecciona según los compuestos objetivo y debe confirmarse al realizar el pedido, con alarmas remotas y una batería diseñada para más de 10 años con un intervalo de transmisión de una hora en condiciones de prueba especificadas, lo que apoya el monitoreo continuo en talleres de pintura, almacenes de químicos y laboratorios.",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Talleres de pintura y líneas de recubrimiento",
     "desc": "Seguimiento continuo de TVOC donde los disolventes se evaporan durante la pulverización y el curado.",
     "img": "product/details/283-scen6.jpg"
    },
    {
     "name": "Zonas de almacenamiento de químicos",
     "desc": "Alerta temprana de acumulación de vapores alrededor de bidones, tanques y gabinetes.",
     "img": "product/details/283-scen5.jpg"
    },
    {
     "name": "Laboratorios",
     "desc": "Monitoreo de TVOC en campanas extractoras y salas para la seguridad de los investigadores.",
     "img": "product/details/274-scen5.jpg"
    },
    {
     "name": "Plantas de impresión y embalaje",
     "desc": "Monitoreo de vapores de disolventes cerca de prensas y laminadoras.",
     "img": "product/details/285-scen7.jpg"
    },
    {
     "name": "Programas de calidad del aire interior",
     "desc": "El TVOC como indicador principal en las auditorías de salud de edificios.",
     "img": "product/details/285-scen1.jpg"
    },
    {
     "name": "Instalaciones de aguas residuales y residuos",
     "desc": "Monitoreo de tendencias de COV relacionados con olores en plantas de tratamiento.",
     "img": "product/details/283-scen4.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "¿Qué rango y resolución ofrece el sensor de TVOC?",
     "a": "Rango de medición de 0-100 000 ppb con resolución de 1 ppb. El principio de detección es electroquímico o PID, seleccionado según la mezcla de gases objetivo."
    },
    {
     "q": "¿Puede emitir una alarma cuando el TVOC sube de forma anómala?",
     "a": "Sí. Los umbrales se configuran de forma remota y el sensor envía alarmas a través de la plataforma en la nube, de modo que los equipos puedan responder con prontitud cuando se supera un umbral configurado."
    },
    {
     "q": "¿Cuál es el grado de protección?",
     "a": "La carcasa estándar está clasificada para sitios industriales exigentes, y la IP68 está disponible como personalización para puntos de exterior permanentemente expuestos. Indique a Hitelecom su entorno de instalación."
    },
    {
     "q": "¿Cómo se alimenta y se conecta?",
     "a": "Utiliza una batería interna diseñada para más de 10 años de vida con un intervalo de transmisión de una hora en condiciones de prueba especificadas, transmitiendo los datos por 4G o NB-IoT mediante MQTT a Hitelecom Cloud o a plataformas privadas."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "304": {
   "series": "Serie H · Sensor de rastreo de activos",
   "tagline": "Posicionamiento | Batería de larga duración | Diseño robusto",
   "desc": "Los sensores de rastreo de activos de Hitelecom combinan el posicionamiento GPS y BeiDou con una duración de batería de varios años, manteniendo visibles pallets, herramientas y cajas retornables entre sitios con alertas de geocerca",
   "heroImg": "product/details/304-hero.png",
   "pdf": "/downloads/asset-tracking-sensor-datasheet.pdf",
   "crumbCat": "Rastreo de activos",
   "returnCid": "306",
   "features": [
    {
     "icon": "product/details/270-f1.png",
     "text": "Posicionamiento en modo dual GPS + BeiDou"
    },
    {
     "icon": "product/details/270-f2-ip67.png",
     "text": "Clasificación de protección IP67"
    },
    {
     "icon": "product/details/270-f3.png",
     "text": "Respaldo LBS donde hay cobertura celular"
    },
    {
     "icon": "product/details/270-f4.png",
     "text": "Admite activación por NFC y configuración local del dispositivo."
    },
    {
     "icon": "product/details/270-f5.png",
     "text": "Diseño de bajo consumo para operación a largo plazo"
    },
    {
     "icon": "product/details/270-f6.png",
     "text": "Transmisión de posición por 4G o NB-IoT"
    },
    {
     "icon": "product/details/270-f7.png",
     "text": "Mapa en la nube e historial de ubicaciones"
    },
    {
     "icon": "product/details/270-f8.png",
     "text": "Alertas de geocerca y de movimiento"
    }
   ],
   "specsTitle": "Especificaciones técnicas",
   "specsDesc": "Un diseño de microconsumo e intervalos de transmisión configurables permiten una operación con batería de varios años; la vida real depende del modo de posicionamiento, el intervalo de transmisión y la cobertura de red.",
   "specs": [
    [
     "Modelo de producto",
     "H200T"
    ],
    [
     "Posicionamiento",
     "GPS / BeiDou / LBS"
    ],
    [
     "Comunicación",
     "4G / NB-IoT"
    ],
    [
     "Protocolo",
     "MQTT"
    ],
    [
     "Duración de la batería",
     "Varios años (según el intervalo de transmisión)"
    ],
    [
     "Protección",
     "IP67"
    ],
    [
     "Instalación",
     "Magnet · Screw · Strap"
    ],
    [
     "Temperatura de operación",
     "−20 °C a +70 °C"
    ]
   ],
   "specsStructured": [
    {
     "name": "Modelo de producto",
     "value": "H200T"
    },
    {
     "name": "Posicionamiento",
     "value": "GPS / BeiDou / LBS"
    },
    {
     "name": "Comunicación",
     "value": "4G / NB-IoT"
    },
    {
     "name": "Protocolo",
     "value": "MQTT"
    },
    {
     "name": "Duración de la batería",
     "value": "Varios años (según el intervalo de transmisión)"
    },
    {
     "name": "Protección",
     "value": "IP67"
    },
    {
     "name": "Instalación",
     "value": "Magnet · Screw · Strap"
    },
    {
     "name": "Temperatura de operación",
     "value": "−20 °C a +70 °C",
     "unitText": "grado Celsius",
     "minValue": -20.0,
     "maxValue": 70.0
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Escenarios de aplicación",
   "scenarios": [
    {
     "img": "product/details/285-scen4.jpg",
     "label": "Smart transportation"
    },
    {
     "img": "product/details/285-scen7.jpg",
     "label": "Fabricación inteligente"
    },
    {
     "img": "product/details/285-scen2.jpg",
     "label": "Ciudad inteligente"
    },
    {
     "img": "product/details/283-scen8.jpg",
     "label": "Energía inteligente"
    },
    {
     "img": "product/details/283-scen4.jpg",
     "label": "Planta de agua"
    },
    {
     "img": "product/details/283-scen7.jpg",
     "label": "Edificio inteligente"
    }
   ],
   "related": [
    "301",
    "302",
    "303",
    "305",
    "270",
    "274",
    "280",
    "285"
   ],
   "summary": "El sensor de rastreo de activos de la Serie H de Hitelecom combina el posicionamiento GPS y BeiDou (con respaldo LBS donde la señal satelital es débil, sujeto a la disponibilidad de la red) con enlace ascendente 4G o NB-IoT. El rastreador transmite la ubicación y los eventos de geocerca por 4G o NB-IoT, combinando una batería de varios años, una carcasa IP67 y montaje con imán, tornillos o correas para mantener visibles pallets, herramientas y cajas retornables entre sitios.",
   "sku": "H200T",
   "applications": [
    {
     "name": "Gestión de pallets y cajas retornables",
     "desc": "Los artículos de transporte retornables permanecen visibles entre proveedores, plantas y almacenes.",
     "img": "product/details/276-scen3.jpg"
    },
    {
     "name": "Rastreo de herramientas y equipos",
     "desc": "Encuentre herramientas compartidas y equipos portátiles en sitios grandes.",
     "img": "product/details/285-scen7.jpg"
    },
    {
     "name": "Flotas logísticas",
     "desc": "Alertas de posición y de geocerca para remolques, contenedores y plataformas rodantes.",
     "img": "product/details/285-scen4.jpg"
    },
    {
     "name": "Sitios de construcción",
     "desc": "Rastree generadores, compresores y accesorios entre sitios de trabajo cambiantes."
    },
    {
     "name": "Servicios públicos y activos municipales",
     "desc": "Vigila bombas, válvulas y equipos de servicio móviles en el campo.",
     "img": "product/details/283-scen4.jpg"
    },
    {
     "name": "Equipos de alquiler",
     "desc": "Localice máquinas alquiladas y detecte movimientos no autorizados.",
     "img": "product/details/284-scen2.jpg"
    }
   ],
   "certifications": [
    "IP67"
   ],
   "faqs": [
    {
     "q": "¿Cómo posiciona el rastreador los activos?",
     "a": "En exteriores utiliza posicionamiento por satélite GPS o BeiDou; en interiores o en cañones urbanos, el posicionamiento celular LBS puede proporcionar una ubicación aproximada de respaldo, sujeta a la disponibilidad de la red."
    },
    {
     "q": "¿Cuál es la duración de la batería?",
     "a": "Varios años, según el intervalo de transmisión: menos actualizaciones de posición por día significan una vida útil más larga. El perfil exacto se configura según la implementación."
    },
    {
     "q": "¿Cómo se fija a los activos?",
     "a": "Tres opciones: imán para superficies de acero, tornillos para montaje permanente o correas para pallets y activos de forma irregular. La clasificación IP67 protege contra la lluvia y el polvo."
    },
    {
     "q": "¿Puede alertar cuando un activo sale de un sitio?",
     "a": "Sí. Las geocercas se dibujan en la plataforma, y el rastreador envía una alerta cuando un activo cruza un límite."
    }
   ],
   "dateModified": "2026-09-02"
  },
  "305": {
   "series": "Serie H · Sensor de gas personalizado",
   "tagline": "100+ Gases | Fixed or Ducted | OEM/ODM",
   "desc": "Elija el gas: Hitelecom construye el terminal a su alrededor. Los sensores de gas personalizados pueden configurarse para más de 100 gases, incluidos CO, H₂S, NH₃, O₃ y CH₄, en carcasas fijas o para conducto para el monitoreo industrial. El rango, la precisión, el principio de detección y la duración de la batería dependen del gas y de la configuración seleccionados.",
   "heroImg": "product/details/305-hero.png",
   "pdf": "/downloads/custom-gas-sensor-datasheet.pdf",
   "crumbCat": "Calidad del aire",
   "returnCid": "265",
   "features": [
    {
     "icon": "product/details/270-f1.png",
     "text": "Principios electroquímico / NDIR / PID"
    },
    {
     "icon": "product/details/270-f2.png",
     "text": "Carcasa con clasificación IP68, personalizable"
    },
    {
     "icon": "product/details/270-f3.png",
     "text": "Más de 100 gases: CO, H₂S, NH₃, O₃, CH₄ y más"
    },
    {
     "icon": "product/details/270-f4.png",
     "text": "Admite activación por NFC y configuración local del dispositivo."
    },
    {
     "icon": "product/details/270-f5.png",
     "text": "Diseño de bajo consumo para operación a largo plazo"
    },
    {
     "icon": "product/details/270-f6.png",
     "text": "Opciones inalámbricas: 4G LTE, NB-IoT y LoRa."
    },
    {
     "icon": "product/details/270-f7.png",
     "text": "Monitoreo remoto de gases"
    },
    {
     "icon": "product/details/270-f8.png",
     "text": "Alertas por umbral configurables"
    }
   ],
   "specsTitle": "Especificaciones técnicas",
   "specsDesc": "Los terminales de gas personalizados combinan procesadores de microconsumo con principios de detección adaptados al gas objetivo. El rango, la precisión y la duración de la batería dependen del gas, el principio y el intervalo de transmisión seleccionados; confirme según la configuración.",
   "specs": [
    [
     "Modelos de producto",
     "H200/H300/H500"
    ],
    [
     "Gases objetivo",
     "100+ Configurable Target Gases"
    ],
    [
     "Rango de medición",
     "Per Gas (Customized)"
    ],
    [
     "Protocolo",
     "MQTT"
    ],
    [
     "Principio de medición",
     "Electroquímico / NDIR / PID"
    ],
    [
     "Bandas de frecuencia",
     "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    ],
    [
     "Duración de la batería",
     "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión."
    ],
    [
     "Instalación",
     "Fijo · En conducto"
    ]
   ],
   "specsStructured": [
    {
     "name": "Modelos de producto",
     "value": "H200/H300/H500"
    },
    {
     "name": "Gases objetivo",
     "value": "100+ Configurable Target Gases"
    },
    {
     "name": "Rango de medición",
     "value": "Per Gas (Customized)"
    },
    {
     "name": "Protocolo",
     "value": "MQTT"
    },
    {
     "name": "Principio de medición",
     "value": "Electroquímico / NDIR / PID"
    },
    {
     "name": "Bandas de frecuencia",
     "value": "LTE-TDD: B34/B38/B39/B40/B41; LTE-FDD: B1/B3/B5/B8"
    },
    {
     "name": "Duración de la batería",
     "value": "Diseñado para más de 10 años de duración de la batería con un intervalo de transmisión de una hora en las condiciones de prueba especificadas. La duración real de la batería varía según el modelo, la configuración de detección, la cobertura de red, las retransmisiones, la temperatura de operación, la frecuencia de muestreo y el intervalo de transmisión.",
     "unitText": "año",
     "minValue": 10.0
    },
    {
     "name": "Instalación",
     "value": "Fijo · En conducto"
    }
   ],
   "certImgs": [],
   "scenariosHeading": "Escenarios de aplicación",
   "scenarios": [
    {
     "img": "product/details/283-scen3.jpg",
     "label": "Mina de carbón"
    },
    {
     "img": "product/details/283-scen5.jpg",
     "label": "Planta química"
    },
    {
     "img": "product/details/283-scen4.jpg",
     "label": "Planta de agua"
    },
    {
     "img": "product/details/285-scen7.jpg",
     "label": "Fabricación inteligente"
    },
    {
     "img": "product/details/283-scen1.jpg",
     "label": "Tapa de alcantarilla"
    },
    {
     "img": "product/details/285-scen1.jpg",
     "label": "Entorno de oficina"
    }
   ],
   "related": [
    "303",
    "285",
    "274",
    "270",
    "301",
    "280",
    "284",
    "283"
   ],
   "summary": "Elija el gas: Hitelecom construye el terminal a su alrededor. El sensor de gas personalizado de la Serie H admite más de 100 gases, incluidos CO, H₂S, NH₃, O₃ y CH₄, con principios electroquímicos, NDIR o PID, carcasas fijas o para conducto y enlace ascendente 4G o NB-IoT; la duración de la batería depende del principio de detección y de la frecuencia de transmisión (diseñado para más de 10 años con un intervalo de una hora en las configuraciones típicas).",
   "sku": "H200/H300/H500",
   "applications": [
    {
     "name": "Minas de carbón",
     "desc": "Monitoreo de CH₄ y CO en subsuelo, donde los sistemas de gas cableados son difíciles de ampliar.",
     "img": "product/details/283-scen3.jpg"
    },
    {
     "name": "Plantas químicas",
     "desc": "Monitoreo puntual de gases específicos de proceso en áreas de producción y almacenamiento.",
     "img": "product/details/283-scen5.jpg"
    },
    {
     "name": "Plantas de agua y aguas residuales",
     "desc": "Detección de H₂S en pozos húmedos, rejillas y salas de lodos.",
     "img": "product/details/283-scen4.jpg"
    },
    {
     "name": "Almacenamiento en frío y refrigeración",
     "desc": "Detección de fugas de NH₃ para plantas de refrigeración por amoníaco.",
     "img": "product/details/270-scen5.jpg"
    },
    {
     "name": "Registros y espacios confinados",
     "desc": "Verificaciones de gas previas al ingreso y continuas en espacios confinados municipales.",
     "img": "product/details/283-scen1.jpg"
    },
    {
     "name": "Semiconductores y laboratorios",
     "desc": "Monitoreo de fugas de gases especiales adaptado al gas exacto en uso.",
     "img": "product/details/274-scen2.jpg"
    }
   ],
   "certifications": [
    "IP68"
   ],
   "faqs": [
    {
     "q": "¿Qué gases pueden detectarse?",
     "a": "Más de 100 gases objetivo, incluidos CO, H₂S, NH₃, O₃, CH₄, Cl₂ y COV. La tecnología de detección —electroquímica, NDIR o PID— y el rango de medición se seleccionan según el gas objetivo."
    },
    {
     "q": "¿Cómo pido un sensor de gas personalizado?",
     "a": "Indique a Hitelecom el gas objetivo, el rango esperado, el estilo de instalación (fijo o en conducto) y las condiciones del sitio; ingeniería confirmará la configuración y el plazo de entrega dentro del programa OEM/ODM."
    },
    {
     "q": "¿Puede la carcasa soportar la instalación en exteriores?",
     "a": "Sí. Las carcasas fijas y para conducto cubren la mayoría de los sitios, y la protección IP68 está disponible como personalización para ubicaciones permanentemente expuestas."
    },
    {
     "q": "¿Cómo transmite las alarmas?",
     "a": "De forma inalámbrica por 4G o NB-IoT mediante MQTT a Hitelecom Cloud o a una plataforma privada, con umbrales de alarma configurados de forma remota."
    }
   ],
   "dateModified": "2026-09-02"
  }
 }
} };

export const productSlugs: Record<string, string> = {
  '270': 'temperature-sensor',
  '274': 'pressure-sensor',
  '275': 'outdoor-4g-gateway-h68',
  '276': 'indoor-gateway-h66',
  '277': 'hydrology-monitoring-station',
  '278': 'weather-station',
  '280': 'soil-moisture-sensor',
  '281': 'liquid-level-sensor',
  '282': 'tilt-sensor',
  '283': 'radar-distance-sensor',
  '284': 'vibration-sensor',
  '285': 'air-quality-sensor',
  '286': 'explosion-proof-temperature-pressure-sensor',
  '287': 'coupling-isolator-h100',
  '301': 'temperature-humidity-sensor',
  '302': 'temperature-humidity-data-logger',
  '303': 'tvoc-sensor',
  '304': 'asset-tracking-sensor',
  '305': 'custom-gas-sensor',
};
export const productIdsBySlug: Record<string, string> = Object.fromEntries(
  Object.entries(productSlugs).map(([id, slug]) => [slug, id]),
);
/** 产品详情页站内路径（不带 .html，交给 l() 统一处理）；无 slug 时回退旧数字地址 */
export const productPath = (id: string): string =>
  productSlugs[id]
    ? `/product/${productSlugs[id]}`
    : /^\d+$/.test(id)
      ? `/product/show/id/${id}` // 无 slug 的数字 id（兜底，正常不会走到）
      : `/product/${id}`;        // CMS 新品：id 即 slug

/**
 * 逐页 SEO/GEO 修正映射（依据客户确认的核心词条文档）
 * 可见文案保持与原站 1:1（含原站拼写习惯），meta title/description 使用
 * 正确的关键词写法：主打户外 4G + NB-IoT 传感终端，LoRa/LoRaWAN 仅作部分
 * 型号/私有化部署的辅助能力；NFC/USB 记录仪不表述为 NB-IoT 记录仪。
 */
export interface PageSeo { title: string; desc: string }

const listSeoBase: Record<'en' | 'zh', Record<string, PageSeo>> = {
  en: {
    '261': {
      title: 'Industrial IoT Sensors | 4G, NB-IoT & LoRa | Hitelecom',
      desc: 'Explore Hitelecom sensors for temperature, pressure, level, tilt, vibration and air quality, with model-specific 4G, NB-IoT and LoRa options.',
    },
    '263': {
      title: 'Industrial Temperature Sensors | 4G & NB-IoT | Hitelecom',
      desc: 'Wireless temperature sensors from -200°C to +800°C with ±0.5°C accuracy (±0.1°C optional), 4G/NB-IoT reporting and long battery life at hourly reporting.',
    },
    '262': {
      title: 'Wireless Pressure Sensors | 4G & NB-IoT | Hitelecom',
      desc: 'Wireless pressure sensors for pipelines, pumps and tanks, with ranges up to 20 MPa, ±0.5% FS accuracy and 4G/NB-IoT reporting to Hitelecom Cloud.',
    },
    '269': {
      title: 'Soil Moisture & NPK Sensors | 4G & NB-IoT | Hitelecom',
      desc: 'Multi-parameter soil sensors for moisture, temperature, EC, pH and NPK, with an IP68 enclosure designed for burial and 4G/NB-IoT reporting for irrigation.',
    },
    '268': {
      title: 'Submersible Level Sensors | Up to 200 m | Hitelecom',
      desc: 'Submersible level sensors with a 0–200 m range for rivers, reservoirs and tanks, with 4G/NB-IoT reporting, threshold alerts and Hitelecom Cloud integration.',
    },
    '267': {
      title: 'High-Precision Tilt Sensors | 4G & NB-IoT | Hitelecom',
      desc: 'Wireless tilt sensors (inclinometers) for structural health monitoring of buildings, bridges and towers, with remote alerts and 4G/NB-IoT connectivity.',
    },
    '266': {
      title: 'Radar Distance Sensors | 4G & NB-IoT | Hitelecom',
      desc: 'Radar distance sensors with a 0.3–50 m range and ±1 mm accuracy for silos, bunkers and manholes, with high interference immunity and 4G/NB-IoT uplink.',
    },
    '271': {
      title: 'Industrial Vibration Sensors | 4G & NB-IoT | Hitelecom',
      desc: 'Wireless vibration sensors for rotating machinery, measuring vibration velocity and displacement amplitude at ±1% accuracy to support predictive maintenance.',
    },
    '265': {
      title: 'Air Quality & TVOC Sensors | 4G & NB-IoT | Hitelecom',
      desc: '6-in-1 air quality sensors for CO₂, PM2.5, TVOC, temperature, humidity and air pressure, plus TVOC and custom gas terminals with 4G/NB-IoT reporting.',
    },
    '258': {
      title: 'Industrial IoT Gateways | 4G, NB-IoT & LoRa | Hitelecom',
      desc: 'Indoor and outdoor IoT gateways with 4G LTE, NB-IoT and Ethernet uplink; selected models add LoRa/LoRaWAN for private networks and edge computing.',
    },
    '272': {
      title: 'Indoor IoT Gateways | 4G, NB-IoT & LoRa | Hitelecom',
      desc: 'H66 indoor gateways with plug-and-play setup, 8-channel full-duplex LoRa and 4G/NB-IoT/Ethernet uplink for factories, parks and campuses.',
    },
    '273': {
      title: 'Outdoor IoT Gateways | IP68, 4G & LoRa | Hitelecom',
      desc: 'H68 outdoor gateways with IP68 enclosures, up to 10 km LoRa range in open areas and 4G/NB-IoT/Ethernet uplink for long-term field deployments.',
    },
    '257': {
      title: 'Weather & Hydrology Stations | 4G/NB-IoT | Hitelecom',
      desc: 'Modular weather and hydrology stations with 2–12 sensor channels for rainfall, level, flow and climate monitoring, reporting to Hitelecom Cloud.',
    },
    '274': {
      title: 'Hydrology Monitoring Stations | Smart Water | Hitelecom',
      desc: 'Hydrology stations combining water level, rainfall and flow-related channels for rivers, reservoirs and flood warning, with solar power options.',
    },
    '275': {
      title: 'Automatic Weather Stations | 4G & NB-IoT | Hitelecom',
      desc: 'Automatic weather stations with 2–12 sensors for temperature, humidity, wind, rainfall and pressure, solar-powered with 4G/NB-IoT transmission.',
    },
    '256': {
      title: 'Custom IoT Products & OEM/ODM Development | Hitelecom',
      desc: 'Custom IoT development across sensors, gateways, embedded software, cloud platforms and enclosures — from prototype to production with Hitelecom OEM/ODM.',
    },
    '278': {
      title: 'Custom IoT Software | Cloud & Embedded | Hitelecom',
      desc: 'Custom IoT software development: cloud platforms, digital-twin dashboards, GIS visualization and embedded firmware for sensors, gateways and controllers.',
    },
    '279': {
      title: 'Custom IoT Hardware | Explosion-Proof | Hitelecom',
      desc: 'Custom IoT hardware and accessories, including explosion-proof sensors, coupling isolators and enclosures, engineered and manufactured by Hitelecom.',
    },
    '306': {
      title: 'Asset Tracking Sensors | GPS & BeiDou | Hitelecom',
      desc: 'Asset tracking terminals with GPS/BeiDou positioning, 4G reporting, geofence alerts and multi-year battery life for pallets, tools and returnable crates.',
    },
  },
  zh: {
    '261': {
      title: '工业物联网传感器 | 户外4G/NB-IoT传感终端 - 宏太通信',
      desc: '宏太通信工业物联网传感器：50余种户外4G传感器与NB-IoT传感终端配置，涵盖温度、压力、土壤水分、倾角、振动、投入式液位、雷达测距与空气质量/TVOC监测，支持宏太云接入与OEM/ODM定制。',
    },
    '263': {
      title: '工业温度传感器 | 户外4G/NB-IoT - 宏太通信',
      desc: '宏太通信工业温度传感器：户外4G与NB-IoT传感终端，支持远程监测、告警预警与高精度测量，接入宏太云平台，支持OEM/ODM定制。',
    },
    '262': {
      title: '无线压力传感器 | 户外4G/NB-IoT - 宏太通信',
      desc: '宏太通信无线压力传感器：户外4G/NB-IoT压力监测终端，精准上报云平台，适用于复杂工业环境，支持OEM/ODM定制。',
    },
    '269': {
      title: '土壤水分传感器 | 户外4G/NB-IoT - 宏太通信',
      desc: '宏太通信土壤水分传感器：水分、温度、电导率、氮磷钾多参数监测，4G/NB-IoT接入宏太云，服务智慧农业，支持OEM/ODM定制。',
    },
    '268': {
      title: '投入式液位传感器 | 户外4G/NB-IoT - 宏太通信',
      desc: '宏太通信投入式液位传感器：精准稳定的液位监测终端，4G/NB-IoT通信，适用于智慧水务与工业液位监测，支持OEM/ODM定制。',
    },
    '267': {
      title: '倾角传感器 | 户外4G/NB-IoT - 宏太通信',
      desc: '宏太通信倾角传感器：超高精度倾斜监测与实时告警，服务结构健康监测，4G/NB-IoT通信，支持OEM/ODM定制。',
    },
    '266': {
      title: '雷达测距传感器 | 户外4G/NB-IoT - 宏太通信',
      desc: '宏太通信雷达测距传感器：毫米级精度、强抗干扰，4G/NB-IoT远程传输并接入宏太云，支持OEM/ODM定制。',
    },
    '271': {
      title: '振动传感器 | 户外4G/NB-IoT - 宏太通信',
      desc: '宏太通信振动传感器：机械设备振动监测与分析，服务工业4.0预测性维护，4G/NB-IoT通信与云端上报，支持OEM/ODM定制。',
    },
    '265': {
      title: '空气质量/TVOC传感器 | 户外4G/NB-IoT - 宏太通信',
      desc: '宏太通信空气质量传感器与TVOC传感器：多种空气污染物检测分析，数据上报云平台，维护简便，4G/NB-IoT通信，支持OEM/ODM定制。',
    },
    '258': {
      title: '物联网网关 | 户外4G/NB-IoT/LoRa - 宏太通信',
      desc: '宏太通信物联网网关：室内与户外型号，支持4G LTE、NB-IoT与以太网上行，部分型号支持LoRa/LoRaWAN私有化部署，IP68防护可选，接入宏太云，支持OEM/ODM。',
    },
    '272': {
      title: '室内物联网网关 | 4G/NB-IoT/LoRa - 宏太通信',
      desc: '宏太通信室内物联网网关：即插即用，支持4G LTE、NB-IoT与以太网上行，可选LoRa私有组网，接入宏太云，支持OEM/ODM。',
    },
    '273': {
      title: '户外4G物联网网关 | IP68防护 - 宏太通信',
      desc: '宏太通信户外4G物联网网关：IP68防水防尘，面向长期户外运行设计，4G LTE/NB-IoT/以太网上行，可选LoRa/LoRaWAN私有化部署。',
    },
    '257': {
      title: '气象站 | 户外4G/NB-IoT监测 - 宏太通信',
      desc: '宏太通信气象站与水文监测站：多参数环境监测，数据经4G/NB-IoT实时传输至宏太云，服务智慧农业、智慧水务与远程液位监测。',
    },
    '274': {
      title: '水文监测站 | 智慧水务 - 宏太通信',
      desc: '宏太通信水文监测站：2-12路传感通道，服务智慧水务与远程液位监测，数据经4G/NB-IoT实时传输至宏太云平台。',
    },
    '275': {
      title: '气象站 | 户外4G/NB-IoT - 宏太通信',
      desc: '宏太通信气象站：集成2-12个传感器进行环境监测，数据经4G/NB-IoT实时传输至宏太云，服务智慧农业与智慧城市。',
    },
    '256': {
      title: '定制品 | 物联网OEM/ODM开发 - 宏太通信',
      desc: '宏太通信物联网定制品与OEM/ODM开发：数字大屏、GIS与云平台定制、嵌入式软件、硬件定制、防爆传感器与物联配件，覆盖传感、无线通信、结构工程到量产。',
    },
    '278': {
      title: '定制物联网软件 | 云平台与嵌入式 - 宏太通信',
      desc: '宏太通信定制物联网软件开发：数字大屏、GIS与云平台定制，以及各类传感器、控制器嵌入式软件开发。',
    },
    '279': {
      title: '定制物联网硬件 | OEM/ODM - 宏太通信',
      desc: '宏太通信定制物联网硬件与OEM/ODM开发：各类传感器、控制器硬件与智能终端定制，防爆设备与物联配件。',
    },
    '306': {
      title: '资产定位终端 | 户外4G/NB-IoT - 宏太通信',
      desc: '宏太资产定位终端：GPS/北斗双模定位，4G/NB-IoT上报，多年续航，支持电子围栏、移动告警与轨迹回放，让托盘、工具与周转箱跨园区全程可视。',
    },
  },
};

const detailSeoBase: Record<'en' | 'zh', Record<string, PageSeo>> = {
  en: {
    '270': {
      title: 'Industrial Temperature Sensor | H Series | Hitelecom',
      desc: 'Wireless temperature sensor for remote monitoring from -200°C to +800°C at ±0.5°C (±0.1°C optional), with 4G, NB-IoT or LoRa and Hitelecom Cloud integration.',
    },
    '274': {
      title: 'Wireless Pressure Sensor | H Series | Hitelecom',
      desc: 'Wireless pressure sensor for pipelines, pumps and tanks, with ranges from 0–1 to 20 MPa at ±0.5% FS and 4G/NB-IoT reporting to Hitelecom Cloud.',
    },
    '280': {
      title: 'Multi-Parameter Soil Sensor | H Series | Hitelecom',
      desc: 'Soil sensor for moisture, temperature, EC, pH and NPK in one probe, with an IP68 enclosure designed for burial and 4G/NB-IoT reporting to Hitelecom Cloud.',
    },
    '281': {
      title: 'Submersible Level Sensor | Up to 200 m | Hitelecom',
      desc: 'Submersible level sensor for rivers, reservoirs and tanks, with a 0–200 m range and ±0.5% FS accuracy, with 4G/NB-IoT reporting and Hitelecom Cloud integration.',
    },
    '282': {
      title: 'Tilt Sensor (Inclinometer) | H Series | Hitelecom',
      desc: 'Wireless tilt sensor (inclinometer) for structural health monitoring of buildings, bridges and towers, with remote alerts and 4G/NB-IoT connectivity.',
    },
    '283': {
      title: 'Radar Distance Sensor | 0.3–50 m | Hitelecom',
      desc: 'Radar distance sensor for silos, bunkers and manholes, with a 0.3–50 m range and ±1 mm accuracy, reporting over 4G or NB-IoT to Hitelecom Cloud.',
    },
    '284': {
      title: 'Wireless Vibration Sensor | H Series | Hitelecom',
      desc: 'Vibration sensor for rotating machinery, measuring velocity 0–100 mm/s and displacement amplitude 0–1,000 µm at ±1% (80 Hz), with 4G/NB-IoT reporting.',
    },
    '285': {
      title: '6-in-1 Air Quality Sensor | H Series | Hitelecom',
      desc: '6-in-1 air quality sensor for CO₂, PM2.5, TVOC, temperature, humidity and air pressure, with optional gas channels and 4G/NB-IoT reporting to Hitelecom Cloud.',
    },
    '275': {
      title: 'Outdoor 4G IoT Gateway | H68 Series | Hitelecom',
      desc: 'H68 outdoor gateway with an IP68 enclosure and up to 10 km LoRa range in open areas, with 4G/NB-IoT/Ethernet uplink for long-term industrial deployments.',
    },
    '276': {
      title: 'Indoor IoT Gateway | H66 Series | Hitelecom',
      desc: 'H66 indoor gateway with 8-channel full-duplex LoRa and up to 5 km range in open areas, plus 4G/NB-IoT/Ethernet uplink and edge computing features.',
    },
    '277': {
      title: 'Hydrology Monitoring Station | H Series | Hitelecom',
      desc: 'Hydrology station with 2–12 channels for water level, rainfall and flow-related monitoring, solar-powered with 4G/NB-IoT transmission to Hitelecom Cloud.',
    },
    '278': {
      title: 'Automatic Weather Station | H Series | Hitelecom',
      desc: 'Weather station with 2–12 sensors for temperature, humidity, wind, pressure and rainfall, solar-powered with 4G/NB-IoT transmission to Hitelecom Cloud.',
    },
    '286': {
      title: 'Explosion-Proof Temperature & Pressure Sensor | Hitelecom',
      desc: 'Monitor temperature and pressure in hazardous-area projects with configurable 4G or NB-IoT reporting; confirm certification before selection.',
    },
    '287': {
      title: 'Explosion-Proof Coupling Isolator | H100 | Hitelecom',
      desc: 'H100 coupling isolator carries 2.4/5.8 GHz wireless sensor signals across hazardous-area boundaries, with an IP68 enclosure and -40°C to +125°C operation.',
    },
    '301': {
      title: 'Temperature and Humidity Sensor | Hitelecom',
      desc: 'Temperature and humidity sensor with ±0.2°C and ±2% RH typical accuracy, NFC activation and an IP65 enclosure, with 4G/NB-IoT reporting to Hitelecom Cloud.',
    },
    '302': {
      title: 'Temperature and Humidity Data Logger | Hitelecom',
      desc: 'Temperature and humidity data logger storing 80,000 readings, with NFC configuration and USB export of PDF/CSV reports for cold chain and pharma logistics.',
    },
    '303': {
      title: 'TVOC Sensor | 0–100,000 ppb Range | Hitelecom',
      desc: 'TVOC sensor for paint shops, chemical storage and laboratories, with a 0–100,000 ppb range at 1 ppb resolution and remote alarms over 4G or NB-IoT.',
    },
    '304': {
      title: 'Asset Tracking Sensor | GPS & BeiDou | Hitelecom',
      desc: 'Track pallets, tools and returnable assets with GPS/BeiDou positioning, geofences, movement history and 4G or NB-IoT reporting.',
    },
    '305': {
      title: 'Custom Gas Sensor | H Series | Hitelecom',
      desc: 'Custom gas sensor built around your target gas — CO, H₂S, NH₃, O₃, CH₄ and 100+ more — with electrochemical, NDIR or PID principles and 4G/NB-IoT uplink.',
    },
  },
  zh: {
    '270': {
      title: '工业温度传感器 | H系列 - 宏太通信',
      desc: '宏太工业温度传感器具备远程监测、告警预警及高精度测量，支持户外4G/NB-IoT/LoRa通信，按1小时上报间隔设计续航超10年，确保温度数据及时可靠，适用于多种应用场景。',
    },
    '274': {
      title: '无线压力传感器 | H系列 - 宏太通信',
      desc: '宏太无线压力传感器持续精准测量，支持4G/NB-IoT精准上报云平台，集成通信与传感技术及嵌入式节能算法，适用于复杂工业环境。',
    },
    '280': {
      title: '土壤水分传感器 | H系列 - 宏太通信',
      desc: '宏太土壤水分传感器集成水分、温度、电导率、氮磷钾多参数监测，定时同步、精准测量，支持4G/NB-IoT接入宏太云，服务智慧农业。',
    },
    '281': {
      title: '投入式液位传感器 | H系列 - 宏太通信',
      desc: '宏太投入式液位传感器精准监测、及时反馈、高稳定性，保障液位数据准确连续，支持户外4G/NB-IoT通信，适用于智慧水务与工业液位监测。',
    },
    '282': {
      title: '倾角传感器 | H系列 - 宏太通信',
      desc: '宏太倾角传感器集成超高精度传感，支持远程监测与实时告警，服务结构健康监测，户外4G/NB-IoT通信，支持OEM/ODM定制。',
    },
    '283': {
      title: '雷达测距传感器 | H系列 - 宏太通信',
      desc: '宏太雷达测距传感器具备毫米级精度、定时采集与强抗干扰能力，支持4G/NB-IoT远程传输与宏太云接入。',
    },
    '284': {
      title: '振动传感器 | H系列 - 宏太通信',
      desc: '宏太振动传感器用于机械设备振动监测与分析，是工业4.0预测性维护的关键组件，支持4G/NB-IoT通信与云端上报。',
    },
    '285': {
      title: '空气质量/TVOC传感器 | H系列 - 宏太通信',
      desc: '宏太空气质量传感器与TVOC传感器可检测分析多种空气污染物，数据上报云平台，维护简便，支持4G/NB-IoT通信。',
    },
    '275': {
      title: '户外4G物联网网关 | H68系列 - 宏太通信',
      desc: '宏太H68户外网关面向长期户外运行设计，IP68防水防尘，支持4G/NB-IoT/以太网上行，可选LoRa/LoRaWAN用于私有化部署。',
    },
    '276': {
      title: '室内物联网网关 | H66系列 - 宏太通信',
      desc: '宏太H66室内网关即插即用，适应多变工业环境稳定运行，支持4G/NB-IoT/以太网上行，可选LoRa组网。',
    },
    '277': {
      title: '水文监测站 | H系列 - 宏太通信',
      desc: '宏太水文监测站集成2-12路传感通道，服务智慧水务与远程液位监测，数据经4G/NB-IoT实时传输至宏太云平台。',
    },
    '278': {
      title: '气象站 | H系列 - 宏太通信',
      desc: '宏太气象站集成2-12个传感器进行环境监测，数据经4G/NB-IoT实时传输至宏太云，服务智慧农业与智慧城市。',
    },
    '286': {
      title: '防爆温压传感器 | H系列 - 宏太通信',
      desc: '宏太防爆温压一体监测设备适用于石油天然气开采、化工等易燃易爆环境的温度与压力控制监测。',
    },
    '287': {
      title: '耦合隔离器 | H系列 - 宏太通信',
      desc: '宏太耦合隔离器用于石油天然气开采、化工厂等防爆场景，保障无线高频信号安全传输。',
    },
    '301': {
      title: '温湿度传感器 | H系列 - 宏太通信',
      desc: '宏太温湿度传感器典型精度±0.2°C/±2% RH，支持户外4G/NB-IoT，可选LoRa，NFC激活，按1小时上报间隔设计续航超10年，适用于洁净室、机柜与博物馆环境监测。',
    },
    '302': {
      title: '温湿度记录仪 | H系列 - 宏太通信',
      desc: '宏太温湿度记录仪支持NFC贴近配置与USB导出，机内存储80,000条读数，为冷链、医药与食品物流提供可审计的温湿度记录。',
    },
    '303': {
      title: 'TVOC传感器 | H系列 - 宏太通信',
      desc: '宏太TVOC传感器监测总挥发性有机物，量程0-100,000 ppb、分辨率1 ppb，支持户外4G/NB-IoT与远程告警，适用于喷漆房、化学品仓库与实验室。',
    },
    '304': {
      title: '资产定位终端 | H系列 - 宏太通信',
      desc: '宏太资产定位终端融合GPS与北斗双模定位，4G/NB-IoT上报，多年续航，支持电子围栏与轨迹回放，让托盘、工具与周转箱全程可视。',
    },
    '305': {
      title: '定制气体传感器 | H系列 - 宏太通信',
      desc: '宏太定制气体传感器支持CO、H₂S、NH₃、O₃、CH₄等100余种气体，电化学/NDIR/PID原理，固定或管道安装，支持户外4G/NB-IoT，可选LoRa。',
    },
  },
};

/* ------------------------------------------------------------------ *
 * CMS 新品合并（src/content/products/{en,zh}/<slug>.md）
 * 编辑在 /admin 后台发布新品后，构建期自动合并进列表与详情：
 * - 详情页 /product/<slug>.html（文件名即 slug）
 * - 列表卡片进入 listCid 指定的产品列表（默认 261 IoT Sensors）
 * - 站内搜索、sitemap、GEO 结构化数据自动覆盖
 * ------------------------------------------------------------------ */

export const listSeo: Record<Locale, Record<string, PageSeo>> =
{ ...listSeoBase, de: {
 "256": {
  "title": "Kundenspezifische IoT-Entwicklung und OEM/ODM | Hitelecom",
  "desc": "Kundenspezifische IoT-Entwicklung von Sensoren, Gateways, Firmware, Cloud-Plattformen und Gehäusen, vom Prototyp bis zur OEM/ODM-Produktion."
 },
 "257": {
  "title": "Wetter- und Hydrologie-Stationen | Hitelecom",
  "desc": "Wetter- und Hydrologie-Stationen mit 2–12 konfigurierbaren Kanälen, Solar- oder Netzstromversorgung und Datenübertragung an die Cloud."
 },
 "258": {
  "title": "Industrielle IoT-Gateways | 4G, NB-IoT und LoRa | Hitelecom",
  "desc": "Industrielle IoT-Gateways für Innen- und Außenbereich mit LoRa, 4G- oder Ethernet-Backhaul und Optionen für die lokale Bereitstellung."
 },
 "261": {
  "title": "Industrielle IoT-Sensoren | 4G, NB-IoT und LoRa | Hitelecom",
  "desc": "Entdecken Sie Hitelecom-Sensoren für Temperatur, Druck, Füllstand, Neigung, Vibration und Luftqualität, mit Optionen 4G, NB-IoT und LoRa je nach Modell."
 },
 "262": {
  "title": "Drahtlose Drucksensoren | 4G und NB-IoT | Hitelecom",
  "desc": "Drahtlose Drucksensoren für Rohrleitungen, Pumpen und Tanks, mit Messbereichen bis 20 MPa und 4G/NB-IoT-Übertragung."
 },
 "263": {
  "title": "Industrielle Temperatursensoren | Hitelecom",
  "desc": "Industrielle Temperatursensoren von −200 °C bis +800 °C, mit Optionen 4G, NB-IoT oder LoRa und Batterieversorgung je nach Modell."
 },
 "265": {
  "title": "Luftqualitäts- und TVOC-Sensoren | Hitelecom",
  "desc": "Luftqualitäts-, TVOC- und konfigurierbare Gassensoren für die städtische und industrielle Überwachung, mit Optionen 4G, NB-IoT oder LoRa."
 },
 "266": {
  "title": "Radar-Abstandssensoren | 4G und NB-IoT | Hitelecom",
  "desc": "Radar-Abstandssensoren von 0,3 bis 50 m für Silos, Bunker, Kontrollschächte und Füllstandskontrolle, mit 4G- oder NB-IoT-Konnektivität."
 },
 "267": {
  "title": "Präzisions-Neigungssensoren | Hitelecom",
  "desc": "Neigungssensoren für Gebäude, Brücken und Türme, mit einer Auflösung von 0,001°, Remote-Alarmen und Optionen 4G, NB-IoT oder LoRa."
 },
 "268": {
  "title": "Tauch-Füllstandssensoren | Bis zu 200 m | Hitelecom",
  "desc": "Tauch-Füllstandssensoren für Flüsse, Reservoirs und Tanks, mit konfigurierbaren Messbereichen, Alarmen und 4G- oder NB-IoT-Übertragung."
 },
 "269": {
  "title": "Bodenfeuchte- und NPK-Sensoren | Hitelecom",
  "desc": "Multiparameter-Bodensensoren für Feuchte, Temperatur, EC, pH und NPK, mit IP68-Gehäuse für die Vergrabung und 4G/NB-IoT-Übertragung für die Bewässerung."
 },
 "271": {
  "title": "Industrielle Vibrationssensoren | 4G und NB-IoT | Hitelecom",
  "desc": "Vibrationssensoren für rotierende Maschinen und Bauwerke, mit Messung von Geschwindigkeit und Verschiebung sowie 4G- oder NB-IoT-Konnektivität."
 },
 "272": {
  "title": "IoT-Gateways für Innenräume | 4G, NB-IoT und LoRa | Hitelecom",
  "desc": "LoRa-Gateways H66 für Innenräume mit acht Kanälen, bis zu 5 km Reichweite im freien Feld und 4G-, Ethernet- oder Wi-Fi-Backhaul."
 },
 "273": {
  "title": "IoT-Gateways für den Außenbereich | IP68, 4G und LoRa | Hitelecom",
  "desc": "LoRa-Gateways H68 für den Außenbereich, mit Schutzart IP68, bis zu 10 km Reichweite im freien Feld und 4G- oder Ethernet-Backhaul."
 },
 "274": {
  "title": "Hydrologie-Stationen | Hitelecom",
  "desc": "Hydrologie-Stationen mit Kanälen für Wasserstand, Niederschlag und Durchfluss für Flüsse, Reservoirs und Hochwasserwarnung, mit Solarstromoptionen."
 },
 "275": {
  "title": "Automatische Wetterstationen | Hitelecom",
  "desc": "Wetterstationen H600 mit 2–12 konfigurierbaren Kanälen für Temperatur, Feuchtigkeit, Wind, Niederschlag, Druck und Sonneneinstrahlung."
 },
 "278": {
  "title": "Kundenspezifische IoT-Software | Cloud & Embedded | Hitelecom",
  "desc": "Kundenspezifische IoT-Software: Cloud-Plattformen, Digital-Zwilling-Dashboards, GIS-Visualisierung und Firmware für Sensoren, Gateways und Controller."
 },
 "279": {
  "title": "Kundenspezifische IoT-Hardware | Gefahrenbereiche | Hitelecom",
  "desc": "Kundenspezifische IoT-Hardware und -Zubehör: Sensoren für Gefahrenbereiche, Kopplungsisolatoren und Gehäuse, entwickelt und gefertigt von Hitelecom."
 },
 "306": {
  "title": "Asset-Tracking-Sensoren | GPS & BeiDou | Hitelecom",
  "desc": "Geräte für die Verfolgung von Assets mit GPS- und BeiDou-Ortung, Geofences, Standortverlauf und 4G- oder NB-IoT-Übertragung."
 }
}, ja: {
 "256": {
  "title": "カスタムIoT開発とOEM/ODM | Hitelecom",
  "desc": "センサー、ゲートウェイ、ファームウェア、クラウドプラットフォーム、筐体のカスタムIoT開発。プロトタイプからOEM/ODM生産まで。"
 },
 "257": {
  "title": "気象・水文ステーション | Hitelecom",
  "desc": "2〜12の構成可能なチャンネル、ソーラーまたは系統電源、クラウドへのデータ送信を備えた気象・水文ステーション。"
 },
 "258": {
  "title": "産業用IoTゲートウェイ | 4G、NB-IoT、LoRa | Hitelecom",
  "desc": "屋内・屋外向けの産業用IoTゲートウェイ。LoRa、4GまたはEthernetバックホール、ローカルデプロイオプション。"
 },
 "261": {
  "title": "産業用IoTセンサー | 4G、NB-IoT、LoRa | Hitelecom",
  "desc": "温度、圧力、レベル、傾斜、振動、空気質向けのHitelecomセンサー。モデルに応じて4G、NB-IoT、LoRaオプション。"
 },
 "262": {
  "title": "ワイヤレス圧力センサー | 4G・NB-IoT | Hitelecom",
  "desc": "パイプライン、ポンプ、タンク向けのワイヤレス圧力センサー。最大20 MPaの範囲、4G/NB-IoT送信。"
 },
 "263": {
  "title": "産業用温度センサー | Hitelecom",
  "desc": "−200 °C〜+800 °Cの産業用温度センサー。4G・NB-IoT・LoRaオプション、モデルに応じたバッテリー給電。"
 },
 "265": {
  "title": "空気質・TVOCセンサー | Hitelecom",
  "desc": "都市および産業モニタリング向けの空気質、TVOC、構成可能なガスセンサー。4G・NB-IoT・LoRaオプション。"
 },
 "266": {
  "title": "レーダー距離センサー | 4G・NB-IoT | Hitelecom",
  "desc": "サイロ、バンカー、マンホール、レベル制御向けの0.3〜50 mレーダー距離センサー。4GまたはNB-IoT接続。"
 },
 "267": {
  "title": "高精度傾斜センサー | Hitelecom",
  "desc": "建物、橋梁、タワー向けの傾斜センサー。分解能0.001°、リモートアラート、4G・NB-IoT・LoRaオプション。"
 },
 "268": {
  "title": "投入式レベルセンサー一覧 | 最長200 m | Hitelecom",
  "desc": "河川、貯水池、タンク向けの測定範囲0〜200 mの投入式レベルセンサー。4G/NB-IoT送信、しきい値アラート、Hitelecom Cloud連携対応。"
 },
 "269": {
  "title": "土壌水分・NPKセンサー | Hitelecom",
  "desc": "水分、温度、EC、pH、NPK向けのマルチパラメーター土壌センサー。埋設向けIP68筐体、灌漑向け4G/NB-IoT送信。"
 },
 "271": {
  "title": "産業用振動センサー | 4G・NB-IoT | Hitelecom",
  "desc": "回転機械および構造物向けの振動センサー。速度と変位を測定し、4GまたはNB-IoT接続。"
 },
 "272": {
  "title": "屋内向けIoTゲートウェイ | 4G、NB-IoT、LoRa | Hitelecom",
  "desc": "屋内向けLoRaゲートウェイH66。8チャンネル、開放地で最長5 kmの範囲、4G・Ethernet・Wi-Fiバックホール。"
 },
 "273": {
  "title": "屋外向けIoTゲートウェイ | IP68、4G、LoRa | Hitelecom",
  "desc": "屋外向けLoRaゲートウェイH68。IP68保護、開放地で最長10 kmの範囲、4GまたはEthernetバックホール。"
 },
 "274": {
  "title": "水文ステーション | Hitelecom",
  "desc": "河川、貯水池、洪水警報向けの水位・雨量・流量チャンネルを備えた水文ステーション。ソーラー電源オプション。"
 },
 "275": {
  "title": "自動気象ステーション | Hitelecom",
  "desc": "気象ステーションH600。温度、湿度、風、雨量、圧力、日射量向けの2〜12の構成可能なチャンネル。"
 },
 "278": {
  "title": "カスタムIoTソフトウェア | クラウド＆組込み | Hitelecom",
  "desc": "カスタムIoTソフトウェア：クラウドプラットフォーム、デジタルツインダッシュボード、GIS可視化、センサー・ゲートウェイ・コントローラー向けファームウェア。"
 },
 "279": {
  "title": "カスタムIoTハードウェア | 危険区域 | Hitelecom",
  "desc": "カスタムIoTハードウェアとアクセサリー：危険区域向けセンサー、カップリングアイソレーター、筐体。Hitelecomが設計・製造。"
 },
 "306": {
  "title": "資産追跡センサー一覧 | GPS & BeiDou | Hitelecom",
  "desc": "GPS/BeiDou測位、4G送信、ジオフェンスアラート、長年のバッテリー寿命を備えた資産追跡ターミナル。パレット、工具、リターナブル容器向け。"
 }
}, es: {
 "256": {
  "title": "Desarrollo IoT a medida y OEM/ODM | Hitelecom",
  "desc": "Desarrollo IoT a medida de sensores, gateways, firmware, plataformas en la nube y carcasas, desde el prototipo hasta la producción OEM/ODM."
 },
 "257": {
  "title": "Estaciones meteorológicas e hidrológicas | Hitelecom",
  "desc": "Estaciones meteorológicas e hidrológicas con 2–12 canales configurables, alimentación solar o de red y transmisión de datos a la nube."
 },
 "258": {
  "title": "Gateways IoT industriales | 4G, NB-IoT y LoRa | Hitelecom",
  "desc": "Gateways IoT industriales de interior y exterior con LoRa, enlace de retorno 4G o Ethernet y opciones de despliegue local."
 },
 "261": {
  "title": "Sensores IoT industriales | 4G, NB-IoT y LoRa | Hitelecom",
  "desc": "Explore los sensores de Hitelecom para temperatura, presión, nivel, inclinación, vibración y calidad del aire, con opciones 4G, NB-IoT y LoRa según el modelo."
 },
 "262": {
  "title": "Sensores de presión inalámbricos | 4G y NB-IoT | Hitelecom",
  "desc": "Sensores de presión inalámbricos para tuberías, bombas y tanques, con rangos de hasta 20 MPa y transmisión 4G/NB-IoT."
 },
 "263": {
  "title": "Sensores industriales de temperatura | Hitelecom",
  "desc": "Sensores industriales de temperatura de −200 °C a +800 °C, con opciones 4G, NB-IoT o LoRa y alimentación por batería según el modelo."
 },
 "265": {
  "title": "Sensores de calidad del aire y TVOC | Hitelecom",
  "desc": "Sensores de calidad del aire, TVOC y gases configurables para monitoreo urbano e industrial, con opciones 4G, NB-IoT o LoRa."
 },
 "266": {
  "title": "Sensores de distancia por radar | 4G y NB-IoT | Hitelecom",
  "desc": "Sensores de distancia por radar de 0,3 a 50 m para silos, tolvas, pozos de registro y control de nivel, con conectividad 4G o NB-IoT."
 },
 "267": {
  "title": "Sensores de inclinación de precisión | Hitelecom",
  "desc": "Sensores de inclinación para edificios, puentes y torres, con resolución de 0,001°, alertas remotas y opciones 4G, NB-IoT o LoRa."
 },
 "268": {
  "title": "Sensores de nivel sumergibles | Hasta 200 m | Hitelecom",
  "desc": "Sensores sumergibles de nivel para ríos, embalses y tanques, con rangos configurables, alertas y transmisión 4G o NB-IoT."
 },
 "269": {
  "title": "Sensores de humedad del suelo y NPK | Hitelecom",
  "desc": "Sensores de suelo multiparámetro para humedad, temperatura, CE, pH y NPK, con carcasa IP68 para enterramiento y transmisión 4G/NB-IoT para el riego."
 },
 "271": {
  "title": "Sensores de vibración industriales | 4G y NB-IoT | Hitelecom",
  "desc": "Sensores de vibración para maquinaria rotativa y estructuras, con medición de velocidad y desplazamiento y conectividad 4G o NB-IoT."
 },
 "272": {
  "title": "Gateways IoT de interior | 4G, NB-IoT y LoRa | Hitelecom",
  "desc": "Gateways LoRa H66 de interior con ocho canales, alcance de hasta 5 km en campo abierto y enlace de retorno 4G, Ethernet o Wi-Fi."
 },
 "273": {
  "title": "Gateways IoT de exterior | IP68, 4G y LoRa | Hitelecom",
  "desc": "Gateways LoRa H68 para exteriores, con protección IP68, alcance de hasta 10 km en campo abierto y enlace de retorno 4G o Ethernet."
 },
 "274": {
  "title": "Estaciones hidrológicas | Hitelecom",
  "desc": "Estaciones hidrológicas que combinan canales de nivel de agua, lluvia y caudal para ríos, embalses y alerta de inundaciones, con opciones de energía solar."
 },
 "275": {
  "title": "Estaciones meteorológicas automáticas | Hitelecom",
  "desc": "Estaciones meteorológicas H600 con 2–12 canales configurables para temperatura, humedad, viento, lluvia, presión y radiación solar."
 },
 "278": {
  "title": "Software IoT a medida | Nube y embebido | Hitelecom",
  "desc": "Software IoT a medida: plataformas en la nube, paneles de gemelo digital, visualización GIS y firmware para sensores, gateways y controladores."
 },
 "279": {
  "title": "Hardware IoT personalizado | Áreas peligrosas | Hitelecom",
  "desc": "Hardware IoT a medida: sensores para áreas peligrosas, aisladores de acoplamiento y carcasas, fabricados por Hitelecom."
 },
 "306": {
  "title": "Sensores de rastreo de activos | GPS y BeiDou | Hitelecom",
  "desc": "Dispositivos para el rastreo de activos con GPS y BeiDou, geocercas, historial de ubicaciones y transmisión 4G o NB-IoT."
 }
}
};
export const detailSeo: Record<Locale, Record<string, PageSeo>> =
{ ...detailSeoBase, de: {
 "270": {
  "title": "Industrieller Temperatursensor | H-Serie | Hitelecom",
  "desc": "Industrieller Temperatursensor von −200 °C bis +800 °C, mit konfigurierbarer Genauigkeit, Konnektivität 4G, NB-IoT oder LoRa und MQTT-Integration."
 },
 "274": {
  "title": "Drahtloser Drucksensor | H-Serie | Hitelecom",
  "desc": "Drahtloser Drucksensor für Rohrleitungen, Pumpen und Tanks, mit Messbereichen von 0–1 bis 20 MPa bei ±0,5 % FS und 4G/NB-IoT-Übertragung an Hitelecom Cloud."
 },
 "280": {
  "title": "Multiparameter-Bodensensor | H-Serie | Hitelecom",
  "desc": "Bodensensor für Feuchte, Temperatur, EC, pH und NPK in einer Sonde, mit IP68-Gehäuse für die Vergrabung und 4G/NB-IoT-Übertragung an Hitelecom Cloud."
 },
 "281": {
  "title": "Tauch-Füllstandssensor | Bis zu 200 m | Hitelecom",
  "desc": "Tauch-Füllstandssensor für Flüsse, Reservoirs und Tanks, mit konfigurierbarem Messbereich bis 200 m, 4G- oder NB-IoT-Konnektivität und MQTT-Integration."
 },
 "282": {
  "title": "Neigungssensor (Inklinometer) | H-Serie | Hitelecom",
  "desc": "Drahtloser Neigungssensor für die Bauwerksüberwachung, mit einer Auflösung von 0,001°, Schutzart IP68 und Optionen 4G, NB-IoT oder LoRa."
 },
 "283": {
  "title": "Radar-Abstandssensor | 0,3–50 m | Hitelecom",
  "desc": "Radar-Abstandssensor für Silos, Bunker und Kontrollschächte, mit 0,3–50 m Messbereich und 4G- oder NB-IoT-Übertragung."
 },
 "284": {
  "title": "Drahtloser Vibrationssensor | H-Serie | Hitelecom",
  "desc": "Vibrationssensor für Maschinen und Bauwerke, mit Messung von Geschwindigkeit und Verschiebung, Alarmen und Konnektivität 4G oder NB-IoT."
 },
 "285": {
  "title": "6-in-1-Luftqualitätssensor | H-Serie | Hitelecom",
  "desc": "6-in-1-Luftqualitätssensor für CO₂, PM2,5, TVOC, Temperatur, Feuchtigkeit und Luftdruck, mit optionalen Kanälen und Konnektivität 4G oder NB-IoT."
 },
 "275": {
  "title": "4G-IoT-Gateway für den Außenbereich | H68-Serie | Hitelecom",
  "desc": "LoRa-Gateway H68 für den Außenbereich, mit Schutzart IP68, bis zu 10 km Reichweite im freien Feld und 4G- oder Ethernet-Backhaul."
 },
 "276": {
  "title": "IoT-Gateway für Innenräume | H66-Serie | Hitelecom",
  "desc": "LoRa-Gateway H66 für Innenräume, mit acht Kanälen, bis zu 5 km Reichweite im freien Feld und 4G-, Ethernet- oder Wi-Fi-Backhaul."
 },
 "277": {
  "title": "Hydrologie-Überwachungsstation | H-Serie | Hitelecom",
  "desc": "Hydrologie-Station H700 mit 2–12 konfigurierbaren Kanälen, Solar- oder Netzstromversorgung und 4G-Übertragung für die Fernüberwachung des Wassers."
 },
 "278": {
  "title": "Automatische Wetterstation | H-Serie | Hitelecom",
  "desc": "Wetterstation H600 mit 2–12 konfigurierbaren Kanälen, Solar- oder Netzstromversorgung und 4G-Übertragung für die Fernüberwachung."
 },
 "286": {
  "title": "Temperatur- und Drucksensor für Gefahrenbereiche | Hitelecom",
  "desc": "Kombinierter Temperatur- und Drucksensor für Projekte in Gefahrenbereichen, mit 4G- oder NB-IoT-Übertragung; bestätigen Sie das geltende Zertifikat."
 },
 "287": {
  "title": "Kopplungsisolator für Gefahrenbereiche | H100 | Hitelecom",
  "desc": "Signalkoppler H100 für Verbindungen von 2,4 und 5,8 GHz in Projekten in Gefahrenbereichen; bestätigen Sie das geltende Zertifikat vor der Spezifizierung."
 },
 "301": {
  "title": "Temperatur- und Feuchtigkeitssensor | Hitelecom",
  "desc": "Temperatur- und Feuchtigkeitssensor mit ±0,2 °C und ±2 % RH, NFC-Aktivierung, IP65-Gehäuse und 4G/NB-IoT-Übertragung."
 },
 "302": {
  "title": "Datenlogger für Temperatur und Feuchtigkeit | Hitelecom",
  "desc": "Datenlogger für Temperatur und Feuchtigkeit mit 80 000 Messwerten, NFC-Konfiguration und USB-Export von PDF- oder CSV-Berichten für die Kühlkette."
 },
 "303": {
  "title": "TVOC-Sensor | Messbereich 0–100 000 ppb | Hitelecom",
  "desc": "TVOC-Sensor von 0 bis 100 000 ppb für Werkstätten, Chemikallenlager und Labore, mit Remote-Alarmen über 4G oder NB-IoT."
 },
 "304": {
  "title": "Asset-Tracking-Sensor | GPS & BeiDou | Hitelecom",
  "desc": "Geräte für die Verfolgung von Assets mit GPS- und BeiDou-Ortung, Geofences, Standortverlauf und 4G- oder NB-IoT-Übertragung."
 },
 "305": {
  "title": "Kundenspezifischer Gassensor | H-Serie | Hitelecom",
  "desc": "Konfigurierbarer Sensor für mehr als 100 Gase, mit elektrochemischer, NDIR- oder PID-Technologie, Fest- oder Kanalmontage und 4G- oder NB-IoT-Konnektivität."
 }
}, ja: {
 "270": {
  "title": "産業用温度センサー | Hシリーズ | Hitelecom",
  "desc": "−200 °C〜+800 °Cの産業用温度センサー。精度は構成可能、4G・NB-IoT・LoRa接続、MQTT統合に対応。"
 },
 "274": {
  "title": "ワイヤレス圧力センサー | Hシリーズ | Hitelecom",
  "desc": "パイプライン、ポンプ、タンク向けのワイヤレス圧力センサー。0–1〜20 MPaの範囲、±0.5 % FS、4G/NB-IoTでHitelecom Cloudに送信。"
 },
 "280": {
  "title": "マルチパラメーター土壌センサー | Hシリーズ | Hitelecom",
  "desc": "水分、温度、EC、pH、NPKを1つのプローブで測定する土壌センサー。埋設向けIP68筐体、4G/NB-IoTでHitelecom Cloudに送信。"
 },
 "281": {
  "title": "投入式レベルセンサー | 最長200 m | Hitelecom",
  "desc": "河川、貯水池、タンク向けの投入式レベルセンサー。0〜200 mの範囲、±0.5 % FSの精度、4G/NB-IoT送信、Hitelecom Cloud統合。"
 },
 "282": {
  "title": "傾斜センサー（傾斜計） | Hシリーズ | Hitelecom",
  "desc": "構造物健全性モニタリング向けのワイヤレス傾斜センサー。分解能0.001°、IP68保護、4G・NB-IoT・LoRaオプション。"
 },
 "283": {
  "title": "レーダー距離センサー | 0.3〜50 m | Hitelecom",
  "desc": "サイロ、バンカー、マンホール向けのレーダー距離センサー。0.3〜50 mの範囲、±1 mmの精度、4GまたはNB-IoTでHitelecom Cloudに送信。"
 },
 "284": {
  "title": "ワイヤレス振動センサー | Hシリーズ | Hitelecom",
  "desc": "機械および構造物向けの振動センサー。速度と変位を測定し、アラームと4GまたはNB-IoT接続を備えます。"
 },
 "285": {
  "title": "6-in-1空気質センサー | Hシリーズ | Hitelecom",
  "desc": "CO₂、PM2.5、TVOC、温度、湿度、気圧向けの6-in-1空気質センサー。オプションチャンネルと4GまたはNB-IoT接続。"
 },
 "275": {
  "title": "屋外向け4G IoTゲートウェイ | H68シリーズ | Hitelecom",
  "desc": "屋外向けLoRaゲートウェイH68。IP68保護、開放地で最長10 kmの範囲、4GまたはEthernetバックホール。"
 },
 "276": {
  "title": "屋内向けIoTゲートウェイ | H66シリーズ | Hitelecom",
  "desc": "屋内向けLoRaゲートウェイH66。8チャンネル、開放地で最長5 kmの範囲、4G・Ethernet・Wi-Fiバックホール。"
 },
 "277": {
  "title": "水文モニタリングステーション | Hシリーズ | Hitelecom",
  "desc": "水文ステーションH700。2〜12の構成可能なチャンネル、ソーラーまたは系統電源、水の遠隔モニタリング向け4G送信。"
 },
 "278": {
  "title": "自動気象ステーション | Hシリーズ | Hitelecom",
  "desc": "気象ステーションH600。2〜12の構成可能なチャンネル、ソーラーまたは系統電源、遠隔モニタリング向け4G送信。"
 },
 "286": {
  "title": "危険区域向け温度・圧力センサー | Hitelecom",
  "desc": "危険区域プロジェクト向けの温度・圧力複合センサー。4GまたはNB-IoT送信；該当認証はご確認ください。"
 },
 "287": {
  "title": "危険区域向けカップリングアイソレーター | H100 | Hitelecom",
  "desc": "危険区域プロジェクトで2.4および5.8 GHzリンク向けの信号カプラーH100。仕様化前に該当認証をご確認ください。"
 },
 "301": {
  "title": "温度・湿度センサー | Hitelecom",
  "desc": "温度・湿度センサー。典型精度±0.2 °C・±2 % RH、NFCアクティベーション、IP65筐体、4G/NB-IoT送信。"
 },
 "302": {
  "title": "温度・湿度データロガー | Hitelecom",
  "desc": "温度・湿度データロガー。80,000読数、NFC設定、コールドチェーン向けPDF/CSVレポートのUSBエクスポート。"
 },
 "303": {
  "title": "TVOCセンサー | 範囲0〜100,000 ppb | Hitelecom",
  "desc": "工場、化学品倉庫、実験室向けのTVOCセンサー。0〜100,000 ppb、4GまたはNB-IoTでのリモートアラーム。"
 },
 "304": {
  "title": "資産追跡センサー | GPS & BeiDou | Hitelecom",
  "desc": "GPS・BeiDou測位、ジオフェンス、位置履歴、4GまたはNB-IoT送信による資産追跡デバイス。"
 },
 "305": {
  "title": "カスタムガスセンサー | Hシリーズ | Hitelecom",
  "desc": "100種類以上のガス向けの構成可能なセンサー。電気化学式・NDIR・PID技術、固定式またはダクト取付、4GまたはNB-IoT接続。"
 }
}, es: {
 "270": {
  "title": "Sensor de temperatura industrial | Serie H | Hitelecom",
  "desc": "Sensor industrial de temperatura de −200 °C a +800 °C, con precisión configurable, conectividad 4G, NB-IoT o LoRa e integración MQTT."
 },
 "274": {
  "title": "Sensor de presión inalámbrico | Serie H | Hitelecom",
  "desc": "Sensor de presión inalámbrico para tuberías, bombas y tanques, con rangos de 0–1 a 20 MPa con ±0,5 % FS y transmisión 4G/NB-IoT a Hitelecom Cloud."
 },
 "280": {
  "title": "Sensor de suelo multiparámetro | Serie H | Hitelecom",
  "desc": "Sensor de suelo para humedad, temperatura, CE, pH y NPK en una sola sonda, con carcasa IP68 para enterramiento y transmisión 4G/NB-IoT a Hitelecom Cloud."
 },
 "281": {
  "title": "Sensor de nivel sumergible | Hasta 200 m | Hitelecom",
  "desc": "Sensor sumergible de nivel para ríos, embalses y tanques, con rango configurable de hasta 200 m, conectividad 4G o NB-IoT e integración MQTT."
 },
 "282": {
  "title": "Sensor de inclinación (inclinómetro) | Serie H | Hitelecom",
  "desc": "Sensor inalámbrico de inclinación para monitoreo estructural, con resolución de 0,001°, protección IP68 y opciones 4G, NB-IoT o LoRa."
 },
 "283": {
  "title": "Sensor de distancia por radar | 0,3–50 m | Hitelecom",
  "desc": "Sensor de distancia por radar para silos, tolvas y pozos de registro, con rango de 0,3–50 m y transmisión 4G o NB-IoT."
 },
 "284": {
  "title": "Sensor de vibración inalámbrico | Serie H | Hitelecom",
  "desc": "Sensor de vibración para maquinaria y estructuras, con medición de velocidad y desplazamiento, alarmas y conectividad 4G o NB-IoT."
 },
 "285": {
  "title": "Sensor de calidad del aire 6 en 1 | Serie H | Hitelecom",
  "desc": "Sensor de calidad del aire 6 en 1 para CO₂, PM2,5, TVOC, temperatura, humedad y presión, con canales opcionales y conectividad 4G o NB-IoT."
 },
 "275": {
  "title": "Gateway IoT 4G de exterior | Serie H68 | Hitelecom",
  "desc": "Gateway LoRa H68 para exteriores, con protección IP68, alcance de hasta 10 km en campo abierto y enlace de retorno 4G o Ethernet."
 },
 "276": {
  "title": "Gateway IoT de interior | Serie H66 | Hitelecom",
  "desc": "Gateway LoRa H66 de interior, con ocho canales, alcance de hasta 5 km en campo abierto y enlace de retorno 4G, Ethernet o Wi-Fi."
 },
 "277": {
  "title": "Estación de monitoreo hidrológico | Serie H | Hitelecom",
  "desc": "Estación hidrológica H700 con 2–12 canales configurables, alimentación solar o de red y transmisión 4G para monitoreo remoto del agua."
 },
 "278": {
  "title": "Estación meteorológica automática | Serie H | Hitelecom",
  "desc": "Estación meteorológica H600 con 2–12 canales configurables, alimentación solar o de red y transmisión 4G para monitoreo remoto."
 },
 "286": {
  "title": "Sensor de temperatura y presión para áreas peligrosas | Hitelecom",
  "desc": "Sensor combinado de temperatura y presión para proyectos en áreas peligrosas, con transmisión 4G o NB-IoT; confirme la certificación aplicable."
 },
 "287": {
  "title": "Aislador de acoplamiento para áreas peligrosas | H100 | Hitelecom",
  "desc": "Acoplador de señal H100 para enlaces de 2,4 y 5,8 GHz en proyectos de áreas peligrosas; confirme la certificación aplicable antes de especificarlo."
 },
 "301": {
  "title": "Sensor de temperatura y humedad | Hitelecom",
  "desc": "Sensor de temperatura y humedad con precisión típica de ±0,2 °C y ±2 % HR, activación por NFC y carcasa IP65, con transmisión 4G/NB-IoT a Hitelecom Cloud."
 },
 "302": {
  "title": "Registrador de datos de temperatura y humedad | Hitelecom",
  "desc": "Registrador de temperatura y humedad con 80 000 lecturas, configuración NFC y exportación USB de informes PDF o CSV para cadena de frío."
 },
 "303": {
  "title": "Sensor de TVOC | Rango 0–100 000 ppb | Hitelecom",
  "desc": "Sensor de TVOC de 0 a 100 000 ppb para talleres, almacenes químicos y laboratorios, con alarmas remotas por 4G o NB-IoT."
 },
 "304": {
  "title": "Sensor de rastreo de activos | GPS y BeiDou | Hitelecom",
  "desc": "Dispositivos para el rastreo de activos con GPS/BeiDou, geocercas, historial de ubicaciones y transmisión 4G o NB-IoT."
 },
 "305": {
  "title": "Sensor de gas personalizado | Serie H | Hitelecom",
  "desc": "Sensor configurable para más de 100 gases, con tecnologías electroquímica, NDIR o PID, montaje fijo o en conducto y conectividad 4G o NB-IoT."
 }
} };

export interface MergedProductContent {
  lists: Record<string, ListPage>;
  details: Record<string, DetailPage>;
}

/** 读取某语言的 CMS 新品，装配为 DetailPage（键 = slug） */
export async function getCmsProductDetails(locale: Locale): Promise<Record<string, DetailPage>> {
  const entries = await getCollection('products', ({ id }) => id.startsWith(locale + '/'));
  const out: Record<string, DetailPage> = {};
  for (const e of entries) {
    const slug = e.id.split('/')[1].replace(/\.md$/, '');
    const f = e.data;
    const norm = (p: string | undefined) => (p ?? '').replace(/^\/images\//, '');
    out[slug] = {
      id: slug,
      series: f.series,
      tagline: f.tagline,
      desc: f.desc,
      heroImg: norm(f.heroImg) || norm(f.cardImg),
      pdf: f.pdf,
      crumbCat: f.crumbCat,
      returnCid: f.returnCid,
      features: f.features.map((x) => ({ icon: norm(x.icon), text: x.text })),
      specsTitle: f.specsTitle,
      specsDesc: f.specsDesc,
      specs: f.specs.map((x) => [x.name, x.value]),
      scenariosHeading: f.scenariosHeading,
      scenarios: f.scenarios.map((x) => ({ img: norm(x.img), label: x.label })),
      related: f.related,
      summary: f.summary,
      sku: f.sku,
      specsStructured: f.specsStructured,
      applications: f.applications?.map((a) => ({ ...a, img: a.img ? norm(a.img) : undefined })),
      certifications: f.certifications,
      faqs: f.faqs,
      dateModified: f.dateModified,
      body: e.body?.trim() ? e.body : undefined,
    };
  }
  return out;
}

/** 合并后的产品内容（内置 19 系列 + CMS 新品），列表/详情/搜索统一走这里 */
export async function getMergedProducts(locale: Locale): Promise<MergedProductContent> {
  const base = productContent[locale];
  const cmsDetails = await getCmsProductDetails(locale);
  const lists: Record<string, ListPage> = {};
  for (const [cid, lp] of Object.entries(base.lists)) {
    lists[cid] = { ...lp, products: [...lp.products] };
  }
  const entries = await getCollection('products', ({ id }) => id.startsWith(locale + '/'));
  for (const e of entries) {
    const slug = e.id.split('/')[1].replace(/\.md$/, '');
    const cid = e.data.listCid;
    if (!lists[cid]) continue; // 指向不存在的列表时跳过（后台选型错误不至于构建失败）
    lists[cid].products.push({ id: slug, name: e.data.cardName, conn: e.data.cardConn, img: e.data.cardImg.replace(/^\/images\//, '') });
  }
  return { lists, details: { ...base.details, ...cmsDetails } };
}
