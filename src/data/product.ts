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
      "text": "Displacement Amplitude: 0–1,000 µm (Customizable)"
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
export const productContent = { ...productContentBase, es: {
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
     "-de 200 °C a 800 °C"
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
     "value": "-de 200 °C a 800 °C",
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
     "-de 20 °C a +80 °C"
    ],
    [
     "Temperatura de almacenamiento",
     "-de 20 °C a +85 °C"
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
     "value": "-de 20 °C a +80 °C",
     "unitText": "grado Celsius",
     "minValue": -20.0,
     "maxValue": 80.0
    },
    {
     "name": "Temperatura de almacenamiento",
     "value": "-de 20 °C a +85 °C",
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
     "-de 20 °C a +70 °C"
    ],
    [
     "Temperatura de almacenamiento",
     "-de 20 °C a +80 °C"
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
     "value": "-de 20 °C a +70 °C",
     "unitText": "grado Celsius",
     "minValue": -20.0,
     "maxValue": 70.0
    },
    {
     "name": "Temperatura de almacenamiento",
     "value": "-de 20 °C a +80 °C",
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
     "text": "Precisión: ±0 005° (configurable)"
    },
    {
     "icon": "product/details/282-f2.png",
     "text": "Carcasa con clasificación IP68"
    },
    {
     "icon": "product/details/282-f3.png",
     "text": "Resolución: 0 001°"
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
     "±0 005° (configurable)"
    ],
    [
     "Resolución",
     "0 001°"
    ],
    [
     "Protocolo",
     "MQTT"
    ],
    [
     "Temperatura de operación",
     "-de 20 °C a +70 °C"
    ],
    [
     "Temperatura de almacenamiento",
     "-de 20 °C a +80 °C"
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
   "summary": "El sensor de inclinación Serie H de Hitelecom es un inclinómetro IoT inalámbrico para el monitoreo de la integridad estructural. Mide la inclinación en los ejes X e Y (tres ejes opcional) con una precisión de ±0 005° y una resolución de 0 001°, está diseñado para más de 10 años de duración de la batería con reportes cada hora en condiciones de prueba especificadas, y cuenta con clasificación IP68 para implementación en exteriores a largo plazo. Las opciones de conectividad son 4G, NB-IoT y LoRa.",
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
     "value": "±0 005°",
     "unitText": "grado"
    },
    {
     "name": "Resolución",
     "value": "0 001°",
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
     "value": "-de 20 °C a 70 °C",
     "unitText": "grado Celsius",
     "minValue": -20,
     "maxValue": 70
    },
    {
     "name": "Temperatura de almacenamiento",
     "value": "-de 20 °C a 80 °C",
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
     "a": "La precisión estándar es de ±0 005° con una resolución de 0 001° en los ejes X e Y. Hay una configuración de tres ejes disponible bajo pedido, y la precisión puede personalizarse para aplicaciones que requieran una tolerancia más estricta."
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
     "-de 20 °C a +70 °C"
    ],
    [
     "Temperatura de almacenamiento",
     "-de 20 °C a +80 °C"
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
     "value": "-de 20 °C a +70 °C",
     "unitText": "grado Celsius",
     "minValue": -20.0,
     "maxValue": 70.0
    },
    {
     "name": "Temperatura de almacenamiento",
     "value": "-de 20 °C a +80 °C",
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
     "-de 20 °C a +70 °C"
    ],
    [
     "Temperatura de almacenamiento",
     "-de 20 °C a +80 °C"
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
     "value": "-de 20 °C a +70 °C",
     "unitText": "grado Celsius",
     "minValue": -20.0,
     "maxValue": 70.0
    },
    {
     "name": "Temperatura de almacenamiento",
     "value": "-de 20 °C a +80 °C",
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
     "-de 40 °C a +85 °C (±0,2 °C)"
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
     "value": "-de 40 °C a +85 °C (±0,2 °C)",
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
     "value": "de −40 °C a +85 °C",
     "unitText": "grado",
     "minValue": -40.0,
     "maxValue": 85.0
    },
    {
     "name": "Temperatura de almacenamiento",
     "value": "de −40 °C a +85 °C",
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
     "-de 20 °C a +70 °C"
    ],
    [
     "Temperatura de almacenamiento",
     "-de 20 °C a +80 °C"
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
     "value": "-de 20 °C a +70 °C",
     "unitText": "grado Celsius",
     "minValue": -20.0,
     "maxValue": 70.0
    },
    {
     "name": "Temperatura de almacenamiento",
     "value": "-de 20 °C a +80 °C",
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
     "-de 200 °C a +800 °C"
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
     "-de 40 °C a +125 °C"
    ],
    [
     "Temperatura de almacenamiento",
     "-de 40 °C a +125 °C"
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
     "value": "-de 200 °C a +800 °C",
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
     "value": "-de 40 °C a +125 °C",
     "unitText": "grado",
     "minValue": -40.0,
     "maxValue": 125.0
    },
    {
     "name": "Temperatura de almacenamiento",
     "value": "-de 40 °C a +125 °C",
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
     "-de 40 °C a +125 °C"
    ],
    [
     "Temperatura de almacenamiento",
     "-de 40 °C a +125 °C"
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
     "value": "-de 40 °C a +125 °C",
     "unitText": "grado",
     "minValue": -40.0,
     "maxValue": 125.0
    },
    {
     "name": "Temperatura de almacenamiento",
     "value": "-de 40 °C a +125 °C",
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
     "-de 20 °C a +70 °C"
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
     "value": "-de 20 °C a +70 °C",
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
      desc: 'Wireless temperature sensors from de -200°C a +800°C with ±0.5°C accuracy (±0.1°C optional), 4G/NB-IoT reporting and long battery life at hourly reporting.',
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
      desc: 'Wireless temperature sensor for remote monitoring from de -200°C a +800°C at ±0.5°C (±0.1°C optional), with 4G, NB-IoT or LoRa and Hitelecom Cloud integration.',
    },
    '274': {
      title: 'Wireless Pressure Sensor | H Series | Hitelecom',
      desc: 'Wireless pressure sensor for pipelines, pumps and tanks, with ranges from 0–de 1 a 20 MPa at ±0.5% FS and 4G/NB-IoT reporting to Hitelecom Cloud.',
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
      desc: 'Vibration sensor for rotating machinery, measuring velocity 0–100 mm/s and displacement amplitude 0–1 000 µm at ±1% (80 Hz), with 4G/NB-IoT reporting.',
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
      desc: 'H100 coupling isolator carries 2.4/5.8 GHz wireless sensor signals across hazardous-area boundaries, with an IP68 enclosure and de -40°C a +125°C operation.',
    },
    '301': {
      title: 'Temperature and Humidity Sensor | Hitelecom',
      desc: 'Temperature and humidity sensor with ±0.2°C and ±2% RH typical accuracy, NFC activation and an IP65 enclosure, with 4G/NB-IoT reporting to Hitelecom Cloud.',
    },
    '302': {
      title: 'Temperature and Humidity Data Logger | Hitelecom',
      desc: 'Temperature and humidity data logger storing 80 000 readings, with NFC configuration and USB export of PDF/CSV reports for cold chain and pharma logistics.',
    },
    '303': {
      title: 'TVOC Sensor | 0–100 000 ppb Range | Hitelecom',
      desc: 'TVOC sensor for paint shops, chemical storage and laboratories, with a 0–100 000 ppb range at 1 ppb resolution and remote alarms over 4G or NB-IoT.',
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
      desc: '宏太温湿度记录仪支持NFC贴近配置与USB导出，机内存储80 000条读数，为冷链、医药与食品物流提供可审计的温湿度记录。',
    },
    '303': {
      title: 'TVOC传感器 | H系列 - 宏太通信',
      desc: '宏太TVOC传感器监测总挥发性有机物，量程0-100 000 ppb、分辨率1 ppb，支持户外4G/NB-IoT与远程告警，适用于喷漆房、化学品仓库与实验室。',
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
{ ...listSeoBase, es: {
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
  "desc": "Dispositivos para seguimiento de activos con GPS y BeiDou, geocercas, historial de ubicaciones y transmisión 4G o NB-IoT."
 }
}
};
export const detailSeo: Record<Locale, Record<string, PageSeo>> =
{ ...detailSeoBase, es: {
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
  "desc": "Dispositivos para seguimiento de activos con GPS/BeiDou, geocercas, historial de ubicaciones y transmisión 4G o NB-IoT."
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
