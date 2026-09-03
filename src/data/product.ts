import { getCollection } from 'astro:content';

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

export const productTabs: Record<'en' | 'zh', ProductTab[]> = {
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

export const productContent ={
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
      "name": "Radar Level Sensor",
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
      "name": "Indoor",
      "on": false
     },
     {
      "cid": "273",
      "name": "Outdoor",
      "on": false
     }
    ],
    "products": [
     {
      "id": "276",
      "img": "product/products/276.png",
      "name": "Indoor",
      "conn": "LoRa | 4G LTE | Ethernet"
     },
     {
      "id": "275",
      "img": "product/products/275.png",
      "name": "Outdoor",
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
      "conn": "Customized Digital Twin and dynamic data visualization"
     },
     {
      "id": "",
      "img": "product/products/custom-2.png",
      "name": "GIS Dashboard",
      "conn": "Customized GIS and multidimensional data visualization"
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
      "name": "Radar Level Sensor",
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
      "name": "Indoor",
      "on": true
     },
     {
      "cid": "273",
      "name": "Outdoor",
      "on": false
     }
    ],
    "products": [
     {
      "id": "276",
      "img": "product/products/276.png",
      "name": "Indoor",
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
      "name": "Indoor",
      "on": false
     },
     {
      "cid": "273",
      "name": "Outdoor",
      "on": true
     }
    ],
    "products": [
     {
      "id": "275",
      "img": "product/products/275.png",
      "name": "Outdoor",
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
      "conn": "Customized Digital Twin and dynamic data visualization"
     },
     {
      "id": "",
      "img": "product/products/custom-2.png",
      "name": "GIS Dashboard",
      "conn": "Customized GIS and multidimensional data visualization"
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
      "text": "Accuracy: ±0.5°C (Customizable to ±0.1°C)"
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
      "text": "Energy-Efficient Tech for Long-Lasting Performance"
     },
     {
      "icon": "product/details/270-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/270-f7.png",
      "text": "Remote Temperature Monitoring: Access Data Anywhere"
     },
     {
      "icon": "product/details/270-f8.png",
      "text": "Intelligent Alerts: Automatic alerts when configured thresholds are exceeded."
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
      "±0.5°C (Customizable to ±0.1°C)"
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
      "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "value": "±0.5°C (Customizable to ±0.1°C)",
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
      "value": "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "label": "Medical monitoring"
     },
     {
      "img": "product/details/270-scen5.jpg",
      "label": "Food processing"
     },
     {
      "img": "product/details/270-scen6.jpg",
      "label": "Smart industry"
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
      "desc": "Tracks rack inlet and room temperature, helping operators identify conditions that may lead to thermal shutdown."
     },
     {
      "name": "Cold storage and food processing",
      "desc": "Keeps chillers, freezers and processing lines within safe temperature bands to support HACCP monitoring."
     },
     {
      "name": "Medical and laboratory monitoring",
      "desc": "Watches refrigerators, incubators and clean rooms holding vaccines, blood and reagents."
     },
     {
      "name": "Greenhouse and livestock climate",
      "desc": "Monitors house temperature for crop yield and animal welfare in smart agriculture."
     },
     {
      "name": "Industrial process monitoring",
      "desc": "Measures pipeline, boiler and equipment surface temperature on production lines."
     },
     {
      "name": "Energy facilities",
      "desc": "Monitors transformers, battery rooms and substation cabinets for overheating risks."
     },
     {
      "name": "Public venues",
      "desc": "Watches indoor climate in amusement parks and other high-traffic public buildings."
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
      "a": "The transmitter is designed for more than 10 years of battery life at a one-hour reporting interval — actual life varies with network conditions, temperature, and reporting frequency. The transmitter is fully battery-powered; only the short probe cable to the transmitter is needed."
     },
     {
      "q": "How does the sensor report data?",
      "a": "It transmits over 4G or NB-IoT using MQTT to Hitelecom Cloud, a customer cloud, or a private deployment, and pushes alerts when temperature crosses configured thresholds."
     },
     {
      "q": "Can the sensor be customized for our application?",
      "a": "Yes. Accuracy, probe length and cable, reporting interval and enclosure can be customized under Hitelecom's OEM/ODM program. Contact sales with your working conditions."
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
      "text": "Energy-Efficient Tech for Long-Lasting Performance"
     },
     {
      "icon": "product/details/274-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/274-f7.png",
      "text": "Remote Pressure Monitoring: Access Data Anywhere"
     },
     {
      "icon": "product/details/274-f8.png",
      "text": "Smart Alerts: Automatic alerts when configured thresholds are exceeded."
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
      "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "value": "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "label": "Smart industry"
     },
     {
      "img": "product/details/274-scen5.jpg",
      "label": "Scientific experiment"
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
    "summary": "The Hitelecom H Series pressure sensor is a wireless industrial pressure transmitter for pipelines, pumps and tanks. Ranges span 0–1 MPa up to 20 MPa with ±0.2% FS/year stability and 2× full-scale overload tolerance, reporting over 4G or NB-IoT. The battery is designed for more than 10 years of life at a one-hour reporting interval under specified test conditions.",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "Water supply and pump stations",
      "desc": "Monitors pipeline pressure to catch bursts, leaks and pump faults early."
     },
     {
      "name": "Chemical plants",
      "desc": "Tracks process line pressure where wired transmitters are costly to retrofit."
     },
     {
      "name": "Building water systems",
      "desc": "Watches booster pump and riser pressure in high-rise secondary water supply."
     },
     {
      "name": "Semiconductor fabs",
      "desc": "Monitors specialty gas and utility lines with stable, repeatable readings."
     },
     {
      "name": "Industrial hydraulics",
      "desc": "Follows hydraulic press and equipment pressure curves to support condition-based maintenance."
     },
     {
      "name": "Tank and vessel monitoring",
      "desc": "Combines head pressure with level for inventory and safety control."
     },
     {
      "name": "Geological and exploration sites",
      "desc": "Battery-powered pressure logging at remote boreholes without cabling."
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "What pressure ranges are available?",
      "a": "Standard ranges are 0-1 MPa, 1.6 MPa, 3.5 MPa, 7 MPa, 10 MPa and 20 MPa. The sensor tolerates 2× full-scale overload and holds ±0.2% FS per year long-term stability (a separate metric from measurement accuracy)."
     },
     {
      "q": "Can it measure both gas and liquid pressure?",
      "a": "The standard version suits common gas and liquid media compatible with the process connection; for corrosive or special media, contact Hitelecom to confirm wetted materials."
     },
     {
      "q": "How does it report readings?",
      "a": "Wirelessly over 4G or NB-IoT using MQTT, to Hitelecom Cloud, a customer cloud, or private deployment, with configurable thresholds and alerts."
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
      "text": "Remote Soil Monitoring: Access Data Anywhere"
     },
     {
      "icon": "product/details/280-f8.png",
      "text": "Smart Alerts: Automatic alerts when configured thresholds are exceeded."
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
      "0–14 pH (0.01 pH resolution)"
     ],
     [
      "Soil Moisture",
      "0–100% (±3%; not suitable for permafrost layers)"
     ],
     [
      "NPK",
      "0–1,999 mg/kg (±2% F.S.)"
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
      "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "value": "0–14 pH (0.01 pH resolution)"
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
      "value": "0–1,999 mg/kg (±2% F.S.)",
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
      "value": "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "desc": "Soil moisture trends tell growers exactly when and how much to irrigate, cutting water waste."
     },
     {
      "name": "Greenhouse fertigation",
      "desc": "EC and NPK readings guide fertilizer dosing so nutrients stay in the root zone, not in runoff."
     },
     {
      "name": "Urban parks and landscaping",
      "desc": "Monitors lawn and tree-pit soil moisture for municipal greening maintenance crews."
     },
     {
      "name": "Soil pollution and remediation tracking",
      "desc": "Continuous pH and EC logging flags contamination plumes and verifies remediation progress."
     },
     {
      "name": "Forest and grassland health",
      "desc": "Long-term buried probes track soil drought stress ahead of visible canopy decline."
     },
     {
      "name": "Research and field trials",
      "desc": "Multi-parameter time series support agronomy research and variety trials."
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "Which soil parameters does the H Series measure?",
      "a": "Soil moisture (0–100%, ±3%), temperature, conductivity (0–1,000 µS/cm, ±3%), pH (0–14, 0.01 pH resolution) and NPK nutrients (0–1,999 mg/kg, ±2% F.S.) — all in a single probe."
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
      "a": "The EC channel covers 0–1,000 µS/cm, which suits most farmland; for highly saline soils or special media, contact Hitelecom for a customized range."
     }
    ],
    "dateModified": "2026-09-02"
   },
   "281": {
    "series": "H Series · Radar Level Sensor",
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
      "text": "Remote Level Monitoring: Access Data Anywhere"
     },
     {
      "icon": "product/details/281-f8.png",
      "text": "Smart Alerts: Automatic alerts when configured thresholds are exceeded."
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
      "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "value": "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "label": "Oceans and ships"
     },
     {
      "img": "product/details/281-scen3.jpg",
      "label": "Hydrological"
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
      "label": "Mine"
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
      "desc": "Continuous water-level logging for flood control and dispatch decisions."
     },
     {
      "name": "River and hydrological stations",
      "desc": "Remote stage monitoring along rivers and channels without mains power."
     },
     {
      "name": "Water supply and drainage",
      "desc": "Tank, clear-well and network reservoir levels for utility operation."
     },
     {
      "name": "Industrial tanks",
      "desc": "Inventory level in power-plant and metallurgy process tanks."
     },
     {
      "name": "Mine water management",
      "desc": "Watches sump and shaft water levels for mine safety."
     },
     {
      "name": "Marine and ship applications",
      "desc": "Ballast and bilge level monitoring with battery-powered simplicity."
     },
     {
      "name": "Medical wastewater",
      "desc": "Tracks collection-tank levels at hospital wastewater stations."
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
      "text": "Remote Angle Monitoring: Access Data Anywhere"
     },
     {
      "icon": "product/details/282-f8.png",
      "text": "Smart Alerts: Automatic alerts when configured thresholds are exceeded."
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
      "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "label": "Energy tower tilt"
     },
     {
      "img": "product/details/282-scen7.jpg",
      "label": "Building tilt"
     },
     {
      "img": "product/details/282-scen8.jpg",
      "label": "Amusement park tilt"
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
    "summary": "The Hitelecom H Series tilt sensor is a wireless IoT inclinometer for structural health monitoring. It measures X/Y axis tilt (three-axis optional) at ±0.005° accuracy and 0.001° resolution, is designed for more than 10 years of battery life at hourly reporting under specified test conditions, and carries an IP68 rating for long-term outdoor deployment. Connectivity options are 4G, NB-IoT and LoRa.",
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
      "value": "Designed for > 10 years at a 1-hour reporting interval under specified test conditions"
     },
     {
      "name": "Ingress Protection",
      "value": "IP68"
     },
     {
      "name": "Installation",
      "value": "Ear mount · Pole clamp · Slot"
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
      "desc": "Supports earlier identification of abnormal slope movement on highways, open-pit mines, and cut embankments."
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
      "desc": "Measures pier tilt, girder rotation and bearing displacement for bridge health monitoring."
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
      "desc": "Continuous inclination monitoring of embankment dams, sea walls and reservoir slopes."
     },
     {
      "name": "Heritage buildings and ancient pagodas",
      "desc": "Non-invasive tilt tracking for protected historic structures where drilling is not permitted."
     },
     {
      "name": "Tree tilt monitoring",
      "desc": "Detects root failure and lean progression in urban trees ahead of typhoon season."
     },
     {
      "name": "Street light poles",
      "desc": "Flags pole inclination from vehicle impact or foundation loosening across municipal lighting assets."
     },
     {
      "name": "Transmission towers",
      "desc": "Monitors foundation settlement and tower inclination on power transmission lines."
     },
     {
      "name": "Telecom towers",
      "desc": "Tracks mast verticality and guyed-tower alignment for communication infrastructure."
     },
     {
      "name": "Warehouse racking",
      "desc": "Detects rack upright deflection from forklift impact, supporting earlier intervention before damage escalates."
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
      "a": "Choose 4G where cellular coverage is reliable and higher data rates or firmware updates over the air are needed. Choose NB-IoT for deep-indoor or underground sites such as tunnels and basements where penetration matters more than bandwidth. Choose LoRa when deploying a dense cluster of sensors on one site with a private gateway and no per-device SIM cost."
     },
     {
      "q": "Can it be installed on heritage structures without drilling?",
      "a": "Yes. The sensor supports ear mount, pole clamp and slot installation. For protected structures, clamp and adhesive mounting avoid penetrating the fabric of the building. Contact Hitelecom for site-specific mounting guidance."
     }
    ],
    "dateModified": "2026-09-02"
   },
   "283": {
    "series": "H Series · Radar Distance Sensor",
    "tagline": "Low Power | Precision | Millimeter-Level",
    "desc": "Hitelecom's distance sensors feature millimeter-level precision, scheduled data collection, and strong anti-interference capabilities, delivering accurate distance measurements and timely cloud updates across complex environments",
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
      "text": "Remote Distance Monitoring: Access Data Anywhere"
     },
     {
      "icon": "product/details/283-f8.png",
      "text": "Smart Alerts: Automatic alerts when configured thresholds are exceeded."
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
      "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "value": "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "label": "Smart industry"
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
      "desc": "Detects cover displacement and abnormal distance readings for municipal safety."
     },
     {
      "name": "Grain silo level",
      "desc": "Measures material surface distance to compute fill level in grain silos."
     },
     {
      "name": "Coal mine bunkers",
      "desc": "Monitors coal bunker fill height in dusty, humid underground conditions."
     },
     {
      "name": "Water and wastewater plants",
      "desc": "Open-channel and tank distance measurement for level control."
     },
     {
      "name": "Chemical plant inventory",
      "desc": "Non-contact distance measurement over corrosive or sealed tanks."
     },
     {
      "name": "Smart building and logistics",
      "desc": "Occupancy, dock and pallet-position distance sensing in facilities."
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "What distance range and accuracy does it offer?",
      "a": "0.3–50 m measuring range (customizable) with ±1 mm accuracy and 1 mm resolution — suitable for level-by-distance and displacement monitoring."
     },
     {
      "q": "Does dust or humidity affect the measurement?",
      "a": "The radar-based measurement is designed for strong anti-interference in dusty, humid sites such as coal bunkers and manholes; the IP68 enclosure protects the device itself."
     },
     {
      "q": "How is it powered and connected?",
      "a": "Internal battery designed for more than 10 years of life at a one-hour reporting interval under specified test conditions, with 4G or NB-IoT uplink via MQTT to Hitelecom Cloud or private platforms."
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
      "text": "Remote Vibration Monitoring: Access Data Anywhere"
     },
     {
      "icon": "product/details/284-f8.png",
      "text": "Smart Alerts: Automatic alerts when configured thresholds are exceeded."
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
      "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "value": "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "label": "Harbour"
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
    "summary": "The Hitelecom H Series vibration sensor is a wireless monitor for rotating machinery and structural vibration in Industry 4.0. It measures vibration velocity 0–100 mm/s and displacement amplitude 0–1,000 µm (customizable) at ±1% accuracy (calibrated at 80 Hz), reports over 4G or NB-IoT, and is designed for more than 10 years of battery life at a one-hour reporting interval under specified test conditions.",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "Industrial rotating equipment",
      "desc": "Pumps, fans, motors, and compressors get continuous vibration trending that supports condition-based maintenance."
     },
     {
      "name": "Semiconductor facilities",
      "desc": "Monitors vibration-sensitive process tools and clean-room equipment."
     },
     {
      "name": "Harbor and port machinery",
      "desc": "Tracks crane and conveyor vibration for safe port operation."
     },
     {
      "name": "Building and structural health",
      "desc": "Watches structural response of buildings near construction or heavy traffic."
     },
     {
      "name": "Energy installations",
      "desc": "Monitors turbines, generators and transformers for abnormal vibration signatures."
     },
     {
      "name": "Logistics and transportation",
      "desc": "Shock and vibration recording for sensitive goods in transit."
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
      "a": "Continuous intensity and amplitude trends reveal bearing wear, imbalance and misalignment early, so maintenance can be scheduled by condition rather than calendar."
     },
     {
      "q": "How is the sensor installed and powered?",
      "a": "Magnetic base, threaded, adhesive, or bracket mounting varies by model — confirm the mounting accessory for your configuration. Fully battery-powered, designed for more than 10 years of life at a one-hour reporting interval under specified test conditions, with no signal or power cabling."
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
      "text": "Remote Air Monitoring: Access Data Anywhere"
     },
     {
      "icon": "product/details/285-f8.png",
      "text": "Smart Alerts: Automatic alerts when configured thresholds are exceeded."
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
      "Operating Temperature",
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
      "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "name": "Operating Temperature",
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
      "value": "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "label": "Smart industry"
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
      "desc": "Grid-deployed micro stations track urban air quality trends block by block."
     },
     {
      "name": "Office and school buildings",
      "desc": "CO₂ and humidity readings can inform ventilation decisions when integrated with a supported control system."
     },
     {
      "name": "Hospitals",
      "desc": "Watches ward and clinic air conditions where vulnerable people gather."
     },
     {
      "name": "Data centers",
      "desc": "Combines temperature, humidity and pressure for environmental compliance logging."
     },
     {
      "name": "Industrial parks",
      "desc": "Fence-line monitoring of park air to spot abnormal emissions early."
     },
     {
      "name": "Transportation hubs",
      "desc": "Air quality visibility in stations, tunnels and parking structures."
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
      "a": "Designed for more than 10 years of battery life at a four-hour reporting interval under specified test conditions — actual life varies with sensing configuration, network coverage, and environment — with an IP68 enclosure for outdoor mounting."
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
    "crumbCat": "Outdoor",
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
      "20dBm~27dBm"
     ],
     [
      "Sensitivity",
      "-140dBm@0.292Kbps"
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
      "-40°~ +85°"
     ],
     [
      "Storage Temperature",
      "-40°~ +85°"
     ],
     [
      "Installation",
      "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "value": "20dBm~27dBm",
      "unitText": "decibel-milliwatt",
      "minValue": 20.0,
      "maxValue": 27.0
     },
     {
      "name": "Sensitivity",
      "value": "-140dBm@0.292Kbps",
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
      "value": "-40°~ +85°",
      "unitText": "degree",
      "minValue": -40.0,
      "maxValue": 85.0
     },
     {
      "name": "Storage Temperature",
      "value": "-40°~ +85°",
      "unitText": "degree",
      "minValue": -40.0,
      "maxValue": 85.0
     },
     {
      "name": "Installation",
      "value": "Ear mount, pole clamp, or slot mounting (varies by configuration)"
     }
    ],    "certImgs": [],
    "scenariosHeading": "Application Scenarios",
    "scenarios": [
     {
      "img": "product/details/275-scen1.jpg",
      "label": "New Energy"
     },
     {
      "img": "product/details/275-scen2.jpg",
      "label": "Smart park"
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
      "desc": "One rooftop gateway can collect data from many sensors across a site."
     },
     {
      "name": "Smart water networks",
      "desc": "Aggregates meter and level sensor traffic across a service area."
     },
     {
      "name": "New energy sites",
      "desc": "Covers solar farms and wind sites with long-range sensor backhaul."
     },
     {
      "name": "Industrial automation",
      "desc": "Plant-wide sensor collection without per-sensor SIM cards."
     },
     {
      "name": "Environmental monitoring",
      "desc": "River, air and noise sensor networks over wide rural areas."
     },
     {
      "name": "Smart city lighting and assets",
      "desc": "City-block-scale coverage for municipal sensor networks."
     },
     {
      "name": "Logistics yards",
      "desc": "Yard-wide tracking and condition sensors through a single gateway."
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
      "a": "CN470, EU868, IN865, RU864, US915 and AU915 — covering China, Europe, India, Russia, North America and Australia deployments."
     },
     {
      "q": "How does the gateway backhaul data?",
      "a": "Over 4G cellular (LTE-TDD B34/B38/B39/B40/B41, LTE-FDD B1/B3/B5/B8) with MQTT uplink to Hitelecom Cloud or a private platform."
     },
     {
      "q": "Can it really stay outdoors for years?",
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
    "crumbCat": "Indoor",
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
      "20dBm~27dBm"
     ],
     [
      "Sensitivity",
      "-140dBm@0.292Kbps"
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
      "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "value": "20dBm~27dBm",
      "unitText": "decibel-milliwatt",
      "minValue": 20.0,
      "maxValue": 27.0
     },
     {
      "name": "Sensitivity",
      "value": "-140dBm@0.292Kbps",
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
      "value": "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
    "summary": "The Hitelecom H66 indoor gateway is an industrial full-duplex LoRa gateway for in-building sensor networks: up to 5 km range, -140 dBm sensitivity, regional bands from CN470 to US915, plug-and-play setup with emergency power-off alarm, 4G backhaul and MQTT uplink.",
    "sku": "H66",
    "applications": [
     {
      "name": "Building management",
      "desc": "Collects HVAC, metering and environment sensors across floors from a comms room."
     },
     {
      "name": "Energy management",
      "desc": "Aggregates sub-metering sensor traffic for factory and building energy audits."
     },
     {
      "name": "Logistics and warehousing",
      "desc": "In-warehouse sensor collection for temperature, door and asset beacons."
     },
     {
      "name": "Industrial facilities",
      "desc": "Shop-floor sensor networks without running data cables."
     },
     {
      "name": "Water management",
      "desc": "Pump-room and tank-level sensor aggregation inside utility buildings."
     },
     {
      "name": "Transportation facilities",
      "desc": "Sensor collection inside stations, tunnels and depots."
     }
    ],
    "certifications": [
     "IP67"
    ],
    "faqs": [
     {
      "q": "What is the difference between the H66 and the H68?",
      "a": "The H66 is the indoor model: plug-and-play with an emergency power-off alarm, up to 5 km range and an IP67 enclosure. The H68 is the outdoor model with up to 10 km range, IP68, and a design for long-term outdoor service."
     },
     {
      "q": "Which frequency bands does it support?",
      "a": "CN470, EU868, IN865, RU864, US915 and AU915, matching regional LoRa band plans."
     },
     {
      "q": "What happens if the power fails?",
      "a": "The gateway raises an emergency power-off alarm over its 4G backhaul, so the operations team knows immediately that the sensor network is offline."
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
    "tagline": "Solar | Modular | Millimeter-Level",
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
      "text": "Millimeter-level Detection Accuracy"
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
      "text": "Intelligent Alerts: Automatic alerts when configured thresholds are exceeded."
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
      "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "value": "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "label": "Electric power industry"
     },
     {
      "img": "product/details/277-scen6.jpg",
      "label": "Ocean and Coastal Monitoring"
     },
     {
      "img": "product/details/277-scen7.jpg",
      "label": "Contingency management"
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
    "summary": "The Hitelecom H700 hydrology station is a modular, solar-powered monitoring terminal that integrates 2 to 12 sensor channels for water and environmental data. It transmits in real time to Hitelecom Cloud over 4G, serves urban, rural, plains and mountainous sites, and installs by ear mount, pole clamp or slot.",
    "sku": "H700",
    "applications": [
     {
      "name": "River and stream monitoring",
      "desc": "Water level, rainfall and flow-related channels for hydrological networks."
     },
     {
      "name": "Reservoir and lake management",
      "desc": "Multi-parameter hydrology logging for dispatch and safety."
     },
     {
      "name": "Urban waterlogging watch",
      "desc": "Rainfall plus level monitoring at flood-prone urban points."
     },
     {
      "name": "Smart agriculture",
      "desc": "Irrigation district water and weather channels in one station."
     },
     {
      "name": "Environmental monitoring",
      "desc": "Water quality and meteorological channels for watershed programs."
     },
     {
      "name": "Mountain torrent warning",
      "desc": "Remote solar stations in mountainous catchments feed early-warning systems."
     },
     {
      "name": "Coastal and estuary sites",
      "desc": "Tide and weather channels for coastal management."
     },
     {
      "name": "Emergency management",
      "desc": "Rapidly deployed stations supply data during flood seasons."
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
      "a": "By solar power or grid electricity, so both remote catchments and urban sites are covered."
     },
     {
      "q": "How does data reach the platform?",
      "a": "In real time over 4G with MQTT uplink to Hitelecom Cloud; users read and export data from the web platform or app."
     },
     {
      "q": "Where can it be deployed?",
      "a": "Urban, rural, plains and mountainous areas; ear mount, pole clamp and slot installation options adapt to poles, walls and rails."
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
      "text": "Custom Range, Specifications, and Service Life"
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
      "text": "Intelligent Alerts: Automatic alerts when configured thresholds are exceeded."
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
      "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "value": "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "label": "Contingency management"
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
    "summary": "The Hitelecom H600 weather station is a modular, solar-powered agrometeorological terminal integrating 2 to 12 sensors for air temperature and humidity, rainfall, wind, pressure and radiation channels. It reports in real time over 4G to Hitelecom Cloud for farms, campuses, cities and coastal sites.",
    "sku": "H600",
    "applications": [
     {
      "name": "Smart agriculture",
      "desc": "Field weather drives irrigation, spraying windows and disease-warning models."
     },
     {
      "name": "Environmental monitoring",
      "desc": "Long-term climate series for watershed and ecological programs."
     },
     {
      "name": "Smart campuses and schools",
      "desc": "Campus weather for teaching, safety and facility management."
     },
     {
      "name": "Urban management",
      "desc": "Microclimate monitoring for city services and heat-island studies."
     },
     {
      "name": "Coastal and marine sites",
      "desc": "Wind and pressure channels for coastal operation safety."
     },
     {
      "name": "Transportation and shipping",
      "desc": "Local weather at ports, airports and highway sections."
     },
     {
      "name": "Emergency management",
      "desc": "Deployable stations feed decision systems during severe weather."
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
      "a": "Yes. Solar power plus 4G cellular means no trenching for power or data; the station is installed by ear mount, pole clamp or slot."
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
      "text": "Accuracy: ±0.5°C (Customizable to ±0.1°C)"
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
      "text": "Remote Monitoring: Access Data Anywhere"
     },
     {
      "icon": "product/details/286-f8.png",
      "text": "Smart Alerts: Automatic alerts when configured thresholds are exceeded."
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
      "±0.5%FS"
     ],
     [
      "Measured Temperature",
      "-200°C to +800°C"
     ],
     [
      "Temperature Accuracy",
      "±0.5°C (Customizable to ±0.1°C)"
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
      "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "value": "±0.5%FS",
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
      "value": "±0.5°C (Customizable to ±0.1°C)",
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
      "value": "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
    "summary": "The Hitelecom H Series 2-in-1 transmitter combines temperature and pressure monitoring in one device designed for environments where flammable gas or dust may be present. Pressure ranges cover 0–1 MPa to 20 MPa at ±0.5% FS, temperature spans -200°C to 800°C, and data reports over 4G or NB-IoT. The applicable explosion-proof certificate must be confirmed for the target market and zone before ordering.",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "Petrochemical plants",
      "desc": "One device watches both process temperature and pressure in hazardous areas."
     },
     {
      "name": "Oil and gas extraction",
      "desc": "Wellhead and gathering-line monitoring without cabling in explosive atmospheres."
     },
     {
      "name": "Mining operations",
      "desc": "Temperature and pressure trending in gas-risk underground areas."
     },
     {
      "name": "Chemical storage parks",
      "desc": "Dual-parameter monitoring of storage and transfer equipment."
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
      "text": "High-frequency, low-attenuation, customizable"
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
      "text": "Features strong anti-interference capabilities"
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
      "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "value": "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
    "summary": "The Hitelecom H100 coupling isolator is a high-frequency signal coupler that lets wireless 2.4 GHz / 5.8 GHz sensor signals cross hazardous-area boundaries in oil and gas, chemical, and mining sites. Suitability for a hazardous area depends on the certified configuration required for the target market, zone, gas or dust group, and temperature class — request the applicable certificate before specifying the product. It works from -40°C to +125°C and installs by ear mount, pole clamp, or slot.",
    "sku": "H100",
    "applications": [
     {
      "name": "Oil and gas extraction",
      "desc": "Couples wireless sensor signals out of wellhead hazardous zones."
     },
     {
      "name": "Chemical plants",
      "desc": "Bridges wireless links between hazardous and safe areas without penetrating barriers."
     },
     {
      "name": "Mining",
      "desc": "Signal coupling path for underground wireless sensor networks in hazardous areas."
     },
     {
      "name": "Tank farms and terminals",
      "desc": "Safe signal coupling across dike and zone boundaries."
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
      "a": "Ear mount, pole clamp or slot installation — the same accessory family as other H Series field devices."
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
      "text": "Energy-Efficient Tech for Long-Lasting Performance"
     },
     {
      "icon": "product/details/270-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/270-f7.png",
      "text": "Remote Climate Monitoring: Access Data Anywhere"
     },
     {
      "icon": "product/details/270-f8.png",
      "text": "Intelligent Alerts: Automatic alerts when configured thresholds are exceeded."
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
      "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "value": "Ear mount, pole clamp, or slot mounting (varies by configuration)"
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
      "label": "Medical monitoring"
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
      "label": "Smart industry"
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
    "summary": "The Hitelecom H Series temperature & humidity sensor is a wireless climate monitor for clean rooms, electrical cabinets, museums and production lines. Its slotted sintered probe reads 0-100% RH and -20°C to +80°C at ±0.2°C and ±2% RH typical accuracy, with a battery designed for more than 10 years of life at a one-hour reporting interval under specified test conditions, and 4G/NB-IoT cloud reporting.",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "Data centers and server rooms",
      "desc": "Tracks temperature and humidity at rack level to keep IT equipment within ASHRAE envelopes."
     },
     {
      "name": "Medical and pharmaceutical storage",
      "desc": "Monitors pharmacies, cold storage and wards where humidity affects drug stability."
     },
     {
      "name": "Museums and archives",
      "desc": "Provides continuous climate records that support conservation decisions for paper, textiles, and relics."
     },
     {
      "name": "Food processing and storage",
      "desc": "Tracks humidity in processing halls and warehouses, alerting staff to conditions that can lead to mold and condensation."
     },
     {
      "name": "Electrical cabinets and enclosures",
      "desc": "Cable-mounted probe reaches inside cabinets to warn of condensation before corrosion starts."
     },
     {
      "name": "Greenhouses",
      "desc": "Combines temperature and humidity trends for ventilation and irrigation decisions."
     },
     {
      "name": "Offices and hospitals",
      "desc": "Keeps indoor air comfort and hygiene within target ranges in public buildings."
     }
    ],
    "certifications": [
     "IP65"
    ],
    "faqs": [
     {
      "q": "What are the measuring range and accuracy?",
      "a": "Humidity 0-100% RH, temperature -20°C to +80°C, with ±0.2°C and ±2% RH typical accuracy. The slotted sintered probe is cable-mounted, so it can be placed inside cabinets and ducts."
     },
     {
      "q": "Does it support threshold alarms?",
      "a": "Yes. High and low thresholds for both temperature and humidity are configured remotely, and the sensor pushes alerts through the cloud platform when limits are crossed."
     },
     {
      "q": "How long does the battery last?",
      "a": "Designed for more than 10 years at a one-hour reporting interval under specified test conditions; actual life varies with network coverage, temperature, and reporting frequency. No mains wiring is needed at the installation point."
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
    "desc": "Hitelecom's temperature and humidity data loggers store up to 80,000 readings with NFC tap-to-configure and one-click USB export, producing timestamped records that support audits in cold chain, pharmaceutical and food logistics.",
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
      "text": "Energy-Efficient Tech for Long-Lasting Performance"
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
    "specsDesc": "A micro-power design with NFC tap-to-configure and one-click USB export; the replaceable battery supports multi-year logging between battery changes.",
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
      "label": "Medical monitoring"
     },
     {
      "img": "product/details/285-scen3.jpg",
      "label": "Hospital"
     },
     {
      "img": "product/details/285-scen7.jpg",
      "label": "Smart industry"
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
    "summary": "The Hitelecom H Series temperature & humidity data logger stores up to 80,000 readings with ±0.2°C and ±2% RH typical accuracy. NFC tap-to-configure from Android or iOS, one-click USB export of PDF/CSV reports, free PC curve-analysis software and a replaceable multi-year battery provide records that support audits for cold chain, pharmaceutical and food logistics.",
    "sku": "H200L/H300L",
    "applications": [
     {
      "name": "Cold chain transport",
      "desc": "Trip-level temperature records for refrigerated trucks, reefer containers and last-mile boxes."
     },
     {
      "name": "Pharmaceutical distribution",
      "desc": "Audit-ready PDF/CSV evidence for vaccine, insulin and biologics shipments."
     },
     {
      "name": "Food processing and storage",
      "desc": "HACCP-friendly logging in processing halls, cold stores and display cabinets."
     },
     {
      "name": "Hospitals and laboratories",
      "desc": "Fridge, freezer and incubator logging for compliance checks."
     },
     {
      "name": "Warehousing",
      "desc": "Long-term ambient logging in bonded and general warehouses."
     },
     {
      "name": "Data centers and archives",
      "desc": "Placement logging for rooms where wireless uplink is not required."
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
      "a": "Up to 80,000 readings. At a five-minute interval that covers roughly nine months of continuous logging."
     },
     {
      "q": "Is the battery replaceable?",
      "a": "Yes. The logger uses a replaceable battery with multi-year life, so the same device serves repeated trips for years."
     },
     {
      "q": "Does it upload data over the air?",
      "a": "No — this logger is a local-record device: data stays on the logger until you export it via USB or read it via NFC, which suits cross-border shipments and audited deliveries where a live uplink is unnecessary."
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
      "text": "Energy-Efficient Tech for Long-Lasting Performance"
     },
     {
      "icon": "product/details/270-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/270-f7.png",
      "text": "Remote VOC Monitoring: Access Data Anywhere"
     },
     {
      "icon": "product/details/270-f8.png",
      "text": "Intelligent Alerts: Automatic alerts when configured thresholds are exceeded."
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
      "label": "Smart industry"
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
    "summary": "The Hitelecom H Series TVOC sensor is a wireless monitor for total volatile organic compounds from 0 to 100,000 ppb at 1 ppb resolution. The sensing principle is matched to the target compounds (confirm at ordering), with remote alarms and a battery designed for more than 10 years at a one-hour reporting interval under specified test conditions, supporting continuous monitoring in paint shops, chemical storage, and laboratories.",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "Paint shops and coating lines",
      "desc": "Continuous TVOC tracking where solvents evaporate during spraying and curing."
     },
     {
      "name": "Chemical storage areas",
      "desc": "Early warning of vapor build-up around drums, tanks and cabinets."
     },
     {
      "name": "Laboratories",
      "desc": "Fume-hood and room TVOC monitoring for researcher safety."
     },
     {
      "name": "Printing and packaging plants",
      "desc": "Solvent vapor monitoring near presses and laminators."
     },
     {
      "name": "Indoor air quality programs",
      "desc": "TVOC as the headline indicator for building health audits."
     },
     {
      "name": "Wastewater and refuse facilities",
      "desc": "Odor-related VOC trend monitoring at treatment plants."
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
      "a": "Yes. Thresholds are configured remotely and the sensor pushes alarms through the cloud platform, so teams can start site escalation workflows before concentrations build up."
     },
     {
      "q": "What is the protection rating?",
      "a": "The standard enclosure is rated for demanding industrial sites, and IP68 is available as a customization for permanently exposed outdoor points. Tell Hitelecom your installation environment."
     },
     {
      "q": "How is it powered and connected?",
      "a": "Internal battery designed for more than 10 years of life at a one-hour reporting interval under specified test conditions, uploading over 4G or NB-IoT via MQTT to Hitelecom Cloud or private platforms."
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
      "text": "LBS Fallback for Indoor Areas"
     },
     {
      "icon": "product/details/270-f4.png",
      "text": "Supports NFC activation and local device configuration."
     },
     {
      "icon": "product/details/270-f5.png",
      "text": "Energy-Efficient Tech for Long-Lasting Performance"
     },
     {
      "icon": "product/details/270-f6.png",
      "text": "4G / NB-IoT Position Reporting"
     },
     {
      "icon": "product/details/270-f7.png",
      "text": "Cloud Map & History Track Playback"
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
      "label": "Smart industry"
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
    "summary": "The Hitelecom H Series asset tracking sensor combines GPS and BeiDou positioning (LBS fallback where satellite signal is weak, subject to network availability) with 4G or NB-IoT uplink. A multi-year battery, IP67 housing and magnet, screw or strap mounting keep pallets, tools and returnable crates visible across sites with geofence alerts.",
    "sku": "H200T",
    "applications": [
     {
      "name": "Pallet and crate pooling",
      "desc": "Returnable transport items stay visible across suppliers, plants and warehouses."
     },
     {
      "name": "Tool and equipment tracking",
      "desc": "Find shared tools and portable equipment across large sites."
     },
     {
      "name": "Logistics fleets",
      "desc": "Position and geofence alerts for trailers, containers and dollies."
     },
     {
      "name": "Construction sites",
      "desc": "Track generators, compressors and attachments across changing job sites."
     },
     {
      "name": "Utilities and municipal assets",
      "desc": "Watches mobile pumps, valves and service equipment in the field."
     },
     {
      "name": "Rental equipment",
      "desc": "Locate rented machines and detect unauthorized movement."
     }
    ],
    "certifications": [
     "IP67"
    ],
    "faqs": [
     {
      "q": "How does the tracker position assets?",
      "a": "Outdoors it uses GPS or BeiDou satellite positioning; indoors or in urban canyons it falls back to LBS cell positioning, so assets stay traceable end to end."
     },
     {
      "q": "What is the battery life?",
      "a": "Multi-year, scaled by reporting interval — fewer position updates per day means longer service. The exact profile is configured per deployment."
     },
     {
      "q": "How is it attached to assets?",
      "a": "Three options: magnet for steel surfaces, screws for permanent mounting, or straps for pallets and odd shapes. IP67 protects against rain and dust."
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
    "desc": "Pick the gas — Hitelecom builds the terminal around it. Custom gas sensors can be configured for more than 100 gases including CO, H₂S, NH₃, O₃, and CH₄, in fixed or ducted enclosures for industrial monitoring. Range, accuracy, sensing principle, and battery life depend on the selected gas and configuration",
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
      "text": "Energy-Efficient Tech for Long-Lasting Performance"
     },
     {
      "icon": "product/details/270-f6.png",
      "text": "Wireless options: 4G LTE, NB-IoT, and LoRa."
     },
     {
      "icon": "product/details/270-f7.png",
      "text": "Remote Gas Monitoring: Access Data Anywhere"
     },
     {
      "icon": "product/details/270-f8.png",
      "text": "Intelligent Alerts: Automatic alerts when configured thresholds are exceeded."
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
      "100+ Gases Customizable"
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
      "value": "100+ Gases Customizable"
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
      "label": "Smart industry"
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
      "desc": "CH₄ and CO monitoring underground where wired gas systems are hard to extend."
     },
     {
      "name": "Chemical plants",
      "desc": "Point monitoring of process-specific gases along production and storage areas."
     },
     {
      "name": "Water and wastewater plants",
      "desc": "H₂S detection in wet wells, screens and sludge rooms."
     },
     {
      "name": "Cold storage and refrigeration",
      "desc": "NH₃ leak detection for ammonia refrigeration plants."
     },
     {
      "name": "Manholes and confined spaces",
      "desc": "Pre-entry and continuous gas checks in municipal confined spaces."
     },
     {
      "name": "Semiconductor and labs",
      "desc": "Specialty gas leak monitoring tailored to the exact gas in use."
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "Which gases can be detected?",
      "a": "Over 100 gases including CO, H₂S, NH₃, O₃, CH₄, Cl₂, VOCs and more. Measuring range and principle (electrochemical, NDIR or PID) are matched to the target gas."
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
      "desc": "跟踪机柜进风与室温，防止过热宕机。"
     },
     {
      "name": "冷库与食品加工",
      "desc": "让冷库、速冻与加工线保持在安全温度区间，满足 HACCP 要求。"
     },
     {
      "name": "医药与实验室",
      "desc": "看守存放疫苗、血液与试剂的冰箱、培养箱和洁净室。"
     },
     {
      "name": "大棚与畜禽养殖",
      "desc": "监测棚室温度，服务作物产量与动物福利。"
     },
     {
      "name": "工业过程监测",
      "desc": "测量产线管路、锅炉与设备表面温度。"
     },
     {
      "name": "能源设施",
      "desc": "监测变压器、电池室与变电站机柜的过温风险。"
     },
     {
      "name": "公共场馆",
      "desc": "监测游乐园等人流密集场所的室内温度。"
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
      "text": "±0.5%FS（高精度定制）"
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
      "±0.2%FS/ 年"
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
      "value": "±0.2%FS/ 年",
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
    "summary": "宏太 H 系列压力传感器是面向管路、泵站与储罐的无线压力变送终端：量程 0-1MPa 至 20MPa 多档可选，年稳定性 ±0.2%FS，抗 2 倍过载，4G / NB-IoT 上报，电池续航超 10 年。",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "供水与泵站",
      "desc": "监测管网压力，尽早发现爆管、渗漏与水泵故障。"
     },
     {
      "name": "化工园区",
      "desc": "在改造成本高的场合替代有线变送器，跟踪工艺管线压力。"
     },
     {
      "name": "楼宇二次供水",
      "desc": "监测高层增压泵与立管压力。"
     },
     {
      "name": "半导体工厂",
      "desc": "以稳定低漂移读数监测特气与动力管线。"
     },
     {
      "name": "工业液压",
      "desc": "跟踪液压机与设备压力曲线，服务预测性维护。"
     },
     {
      "name": "储罐容器",
      "desc": "压位结合，服务库存与安全控制。"
     },
     {
      "name": "地质勘探",
      "desc": "电池供电的远程钻孔压力记录，无需布线。"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "有哪些量程可选？",
      "a": "标准量程 0-1MPa、1.6MPa、3.5MPa、7MPa、10MPa、20MPa 多档；可承受 2 倍满量程过载，年稳定性 ±0.2%FS。"
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
      "0–1,999 mg/kg（±2% F.S.）"
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
      "value": "0–1,999 mg/kg（±2% F.S.）",
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
      "desc": "土壤水分趋势指导何时灌、灌多少，减少水资源浪费。"
     },
     {
      "name": "大棚水肥一体化",
      "desc": "EC 与 NPK 读数指导施肥量，让养分留在根区而不是流失。"
     },
     {
      "name": "城市园林",
      "desc": "监测草坪与树坑土壤墒情，服务市政绿化养护。"
     },
     {
      "name": "土壤污染与修复跟踪",
      "desc": "连续 pH 与电导率记录标记污染扩散并验证修复进度。"
     },
     {
      "name": "林草健康",
      "desc": "长期埋设探头在树冠可见衰退前捕捉土壤干旱胁迫。"
     },
     {
      "name": "科研与田间试验",
      "desc": "多参数时间序列支撑农艺研究与品种试验。"
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
      "±0.5%FS（更高精度定制）"
     ],
     [
      "稳定性",
      "±0.2%FS/ 年"
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
      "value": "±0.5%FS（更高精度定制）",
      "unitText": "百分比"
     },
     {
      "name": "稳定性",
      "value": "±0.2%FS/ 年",
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
    "summary": "宏太 H 系列液位传感器是面向水库、河道、储罐与井道的无线液位变送终端：量程 0-200 米可定制，精度 ±0.5%FS，年稳定性 ±0.2%FS，电池续航超 10 年，经 4G / NB-IoT 上报液位数据。",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "水库与大坝",
      "desc": "连续水位记录，服务防汛调度决策。"
     },
     {
      "name": "河道水文站",
      "desc": "无市电的远程河道水位监测。"
     },
     {
      "name": "供排水系统",
      "desc": "水塔、清水池与管网水库液位，服务水务运营。"
     },
     {
      "name": "工业储罐",
      "desc": "电厂、冶金工艺罐的库存液位。"
     },
     {
      "name": "矿山涌水管理",
      "desc": "监测水仓与井下水位，服务矿山安全。"
     },
     {
      "name": "船舶与海洋",
      "desc": "压载舱与舱底液位监测，电池供电免布线。"
     },
     {
      "name": "医疗废水",
      "desc": "跟踪医院废水站集水池液位。"
     }
    ],
    "certifications": [
     "IP68"
    ],
    "faqs": [
     {
      "q": "H 系列液位传感器的量程是多少？",
      "a": "标准 0-200 米，超出可定制；精度 ±0.5%FS，年稳定性 ±0.2%FS，适合长期无人值守监测。"
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
      "desc": "在公路边坡、露天矿山和路堑堤坝失稳前，捕捉早期位移征兆。"
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
      "desc": "测量桥墩倾斜、主梁转角与支座位移，服务桥梁健康监测。"
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
      "desc": "对堤坝、海塘和水库边坡进行连续倾斜监测。"
     },
     {
      "name": "古建筑与古塔",
      "desc": "为禁止钻孔的文物保护建筑提供无损倾斜跟踪。"
     },
     {
      "name": "树木倾斜监测",
      "desc": "台风季前发现城市树木根系失效与倾斜发展趋势。"
     },
     {
      "name": "路灯杆监测",
      "desc": "发现车辆撞击或基础松动导致的市政灯杆倾斜。"
     },
     {
      "name": "输电塔监测",
      "desc": "监测输电线路铁塔的基础沉降与塔身倾斜。"
     },
     {
      "name": "通信塔监测",
      "desc": "跟踪通信桅杆垂直度与拉线塔对准状态。"
     },
     {
      "name": "仓储货架监测",
      "desc": "在叉车撞击导致垮塌前，检测货架立柱的挠度变形。"
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
      "desc": "检测井盖位移与井内深度变化，服务市政安全。"
     },
     {
      "name": "粮仓料位",
      "desc": "测量粮面距离换算料位，掌握库存。"
     },
     {
      "name": "煤矿煤仓",
      "desc": "在粉尘潮湿的井下环境监测煤仓装填高度。"
     },
     {
      "name": "水厂与污水厂",
      "desc": "明渠与水池的距离测量，服务液位控制。"
     },
     {
      "name": "化工罐区",
      "desc": "对腐蚀性或密闭罐体做非接触式测距。"
     },
     {
      "name": "楼宇与物流",
      "desc": "场景占位、月台与托盘位置的测距感知。"
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
      "desc": "为泵、风机、电机与压缩机提供连续振动趋势，服务预测性维护。"
     },
     {
      "name": "半导体设施",
      "desc": "监测对振动敏感的工艺设备与洁净室装置。"
     },
     {
      "name": "港口机械",
      "desc": "跟踪吊机与输送设备振动，保障港口作业安全。"
     },
     {
      "name": "建筑结构健康",
      "desc": "监测邻近施工或重载交通下建筑的结构响应。"
     },
     {
      "name": "能源装置",
      "desc": "监测汽轮机、发电机与变压器的异常振动特征。"
     },
     {
      "name": "物流运输",
      "desc": "为运输中的敏感货物记录冲击与振动。"
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
      "desc": "网格化布点微站，逐街区跟踪城市空气质量趋势。"
     },
     {
      "name": "办公与校园",
      "desc": "CO₂ 与湿度读数联动通风，保障室内空气健康。"
     },
     {
      "name": "医院",
      "desc": "监测人群脆弱区域的空气状况。"
     },
     {
      "name": "数据中心",
      "desc": "温湿度与气压组合，满足环境合规记录。"
     },
     {
      "name": "工业园区",
      "desc": "园区厂界空气监测，尽早发现异常排放。"
     },
     {
      "name": "交通枢纽",
      "desc": "车站、隧道与停车场的空气质量可视。"
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
      "20dBm~27dBm"
     ],
     [
      "接收灵敏度",
      "-140dBm@0.292Kbps"
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
      "-40°~ +85°"
     ],
     [
      "存储温度",
      "-40°~ +85°"
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
      "value": "20dBm~27dBm",
      "minValue": 20.0,
      "maxValue": 27.0
     },
     {
      "name": "接收灵敏度",
      "value": "-140dBm@0.292Kbps",
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
      "value": "-40°~ +85°",
      "minValue": -40.0,
      "maxValue": 85.0
     },
     {
      "name": "存储温度",
      "value": "-40°~ +85°",
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
      "desc": "一面楼顶网关可汇聚园区大量传感器。"
     },
     {
      "name": "智慧水务",
      "desc": "汇聚服务区内的表计与液位传感器流量。"
     },
     {
      "name": "新能源场站",
      "desc": "为光伏与风电场提供长距离传感回传。"
     },
     {
      "name": "工业自动化",
      "desc": "全厂传感器汇聚，无需为每只传感器配 SIM 卡。"
     },
     {
      "name": "环境监测",
      "desc": "覆盖广域农村的河道、空气与噪声传感网络。"
     },
     {
      "name": "智慧城市",
      "desc": "街区级覆盖，服务市政传感网络。"
     },
     {
      "name": "物流场站",
      "desc": "单网关覆盖整场追踪与状态传感。"
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
      "20dBm~27dBm"
     ],
     [
      "接收灵敏度",
      "-140dBm@0.292Kbps"
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
      "value": "20dBm~27dBm",
      "minValue": 20.0,
      "maxValue": 27.0
     },
     {
      "name": "接收灵敏度",
      "value": "-140dBm@0.292Kbps",
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
      "desc": "从弱电间汇聚全楼层的暖通、计量与环境传感器。"
     },
     {
      "name": "能源管理",
      "desc": "汇聚分项计量传感流量，服务工厂与楼宇能耗审计。"
     },
     {
      "name": "仓储物流",
      "desc": "库内温度、门磁与资产信标的传感汇聚。"
     },
     {
      "name": "工业现场",
      "desc": "车间传感网络免布数据线。"
     },
     {
      "name": "水务管理",
      "desc": "泵房与水箱液位传感器在站房内汇聚。"
     },
     {
      "name": "交通设施",
      "desc": "车站、隧道与车辆段内部的传感汇聚。"
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
      "desc": "多参数水文记录，服务调度与安全。"
     },
     {
      "name": "城市内涝监视",
      "desc": "易涝点的雨量加液位组合监测。"
     },
     {
      "name": "智慧农业",
      "desc": "灌区水文与气象通道一体采集。"
     },
     {
      "name": "环境监测",
      "desc": "水质与气象通道服务流域治理项目。"
     },
     {
      "name": "山洪预警",
      "desc": "山区集水区的太阳能远程站点接入预警系统。"
     },
     {
      "name": "沿海与河口",
      "desc": "潮位与气象通道服务海岸管理。"
     },
     {
      "name": "应急管理",
      "desc": "汛期快速部署站点补齐数据。"
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
      "desc": "田间气象驱动灌溉、施药窗口与病害预警模型。"
     },
     {
      "name": "环境监测",
      "desc": "长期气候序列服务流域与生态项目。"
     },
     {
      "name": "智慧校园",
      "desc": "校园气象服务教学、安全与设施管理。"
     },
     {
      "name": "城市管理",
      "desc": "微气候监测服务市政与热岛研究。"
     },
     {
      "name": "沿海与海洋",
      "desc": "风与气压通道保障沿海作业安全。"
     },
     {
      "name": "交通运输",
      "desc": "港口、机场与公路路段的本地气象。"
     },
     {
      "name": "应急管理",
      "desc": "可部署站点在强对流天气期为决策系统供数。"
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
      "text": "±0.5%FS（高精度定制）"
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
      "±0.5%FS"
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
      "value": "±0.5%FS",
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
    "summary": "宏太 H 系列防爆温压一体变送器为易燃易爆环境将温度与压力监测合二为一：压力量程 0-1MPa 至 20MPa（±0.5%FS），温度 -200℃ 至 800℃，数据经 4G / NB-IoT 上报，减少现场设备数量与布线。",
    "sku": "H200/H300/H500",
    "applications": [
     {
      "name": "石油化工",
      "desc": "单台设备在防爆区内同时看守工艺温度与压力。"
     },
     {
      "name": "油气开采",
      "desc": "井口与集输管线的无布线温压监测。"
     },
     {
      "name": "矿山作业",
      "desc": "瓦斯风险井下区域的温压趋势监测。"
     },
     {
      "name": "化工仓储",
      "desc": "储运设备的双参数监测。"
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
      "a": "压力 0-1MPa / 1.6 / 3.5 / 7 / 10 / 20MPa（±0.5%FS）；温度 -200℃ 至 800℃（±0.5℃，可定制 ±0.1℃）。"
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
      "desc": "把无线传感信号安全耦合出井口危险区。"
     },
     {
      "name": "化工装置",
      "desc": "在不穿透防爆隔断的前提下桥接危险区与安全区的无线链路。"
     },
     {
      "name": "矿山井下",
      "desc": "为井下无线传感网络提供防爆信号通道。"
     },
     {
      "name": "罐区与码头",
      "desc": "跨越防火堤与防爆分区的安全信号耦合。"
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
      "desc": "机柜级温湿度跟踪，让 IT 设备保持在安全运行区间。"
     },
     {
      "name": "医药仓储",
      "desc": "监测药房、冷库与病房——湿度直接影响药品稳定性。"
     },
     {
      "name": "博物馆与档案馆",
      "desc": "连续记录气候，防止纸质、织物与文物受潮结露。"
     },
     {
      "name": "食品加工与仓储",
      "desc": "监控加工车间与库房湿度，防霉防结露。"
     },
     {
      "name": "电气柜与箱变",
      "desc": "线缆式探头伸入柜内，在凝露腐蚀发生前预警。"
     },
     {
      "name": "农业大棚",
      "desc": "温湿度趋势联动通风与灌溉决策。"
     },
     {
      "name": "办公楼与医院",
      "desc": "让公共建筑的室内舒适度与卫生指标达标。"
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
      "desc": "为冷藏车、冷藏集装箱与末端保温箱提供行程级温度记录。"
     },
     {
      "name": "医药流通",
      "desc": "为疫苗、胰岛素与生物制品运输提供可审计的 PDF/CSV 凭证。"
     },
     {
      "name": "食品加工与仓储",
      "desc": "契合 HACCP 的加工车间、冷库与陈列柜记录。"
     },
     {
      "name": "医院与实验室",
      "desc": "冰箱、冷柜与培养箱的合规记录。"
     },
     {
      "name": "仓储物流",
      "desc": "保税仓与普通仓库的长期环境记录。"
     },
     {
      "name": "机房与档案库房",
      "desc": "无需无线上联场合的就地记录。"
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
      "desc": "在喷涂与固化溶剂挥发区域连续跟踪 TVOC。"
     },
     {
      "name": "化学品仓储",
      "desc": "对桶装、罐区与储存柜周边蒸气积聚做早期预警。"
     },
     {
      "name": "实验室",
      "desc": "通风橱与室内 TVOC 监测，保障实验人员安全。"
     },
     {
      "name": "印刷包装厂",
      "desc": "印刷机与复合机周边的溶剂蒸气监测。"
     },
     {
      "name": "室内空气质量项目",
      "desc": "TVOC 作为楼宇健康审计的核心指标。"
     },
     {
      "name": "污水与固废设施",
      "desc": "处理厂区异味相关 VOC 趋势监测。"
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
      "desc": "可循环运输器具在供应商、工厂与仓库之间全程可视。"
     },
     {
      "name": "工装与设备追踪",
      "desc": "在大型厂区内快速找到共享工装与便携设备。"
     },
     {
      "name": "物流车队",
      "desc": "挂车、集装箱与牵引器具的位置与围栏告警。"
     },
     {
      "name": "建筑工地",
      "desc": "跟踪流动性大的发电机、空压机与附具。"
     },
     {
      "name": "市政与公用资产",
      "desc": "看守野外作业的移动水泵、阀门与检修设备。"
     },
     {
      "name": "租赁设备",
      "desc": "定位出租机械并发现未经授权的移动。"
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
      "desc": "在有线瓦斯系统难以延伸的点位监测 CH₄ 与 CO。"
     },
     {
      "name": "化工园区",
      "desc": "针对生产与储存区域的特征气体做点式监测。"
     },
     {
      "name": "水厂与污水厂",
      "desc": "进水泵房、格栅间与污泥间的 H₂S 检测。"
     },
     {
      "name": "冷库与制冷",
      "desc": "氨制冷机房的 NH₃ 泄漏检测。"
     },
     {
      "name": "窨井与受限空间",
      "desc": "市政受限空间的进入前与连续气体检测。"
     },
     {
      "name": "半导体与实验室",
      "desc": "按在用气体定制的特种气体泄漏监测。"
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

export const listSeo: Record<'en' | 'zh', Record<string, PageSeo>> = {
  en: {
    '261': {
      title: 'Industrial IoT Sensors | 4G, NB-IoT & LoRa | Hitelecom',
      desc: 'Industrial sensor terminals for temperature, pressure, level, tilt, vibration and air quality, with 4G, NB-IoT and LoRa options and Hitelecom Cloud integration.',
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
      title: 'Radar Level Sensors | Up to 200 m | Hitelecom',
      desc: 'Radar level sensors with a 0–200 m range for rivers, reservoirs and tanks, with 4G/NB-IoT reporting, threshold alerts and Hitelecom Cloud integration.',
    },
    '267': {
      title: 'High-Precision Tilt Sensors | 4G & NB-IoT | Hitelecom',
      desc: 'Wireless tilt sensors (inclinometers) for structural health monitoring of buildings, bridges and towers, with remote alerts and 4G/NB-IoT connectivity.',
    },
    '266': {
      title: 'Radar Distance Sensors | 4G & NB-IoT | Hitelecom',
      desc: 'Radar distance sensors with a 0.3–50 m range and ±1 mm accuracy for silos, bunkers and manholes, with strong anti-interference and 4G/NB-IoT uplink.',
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
      desc: '宏太通信工业物联网传感器：50余种户外4G传感器与NB-IoT传感终端配置，涵盖温度、压力、土壤水分、倾角、振动、雷达液位、雷达测距与空气质量/TVOC监测，支持宏太云接入与OEM/ODM定制。',
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
      title: '雷达液位传感器 | 户外4G/NB-IoT - 宏太通信',
      desc: '宏太通信雷达液位传感器：精准稳定的液位监测终端，4G/NB-IoT通信，适用于智慧水务与工业液位监测，支持OEM/ODM定制。',
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

export const detailSeo: Record<'en' | 'zh', Record<string, PageSeo>> = {
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
      title: 'Radar Level Sensor | Up to 200 m | Hitelecom',
      desc: 'Radar level sensor for rivers, reservoirs and tanks, with a 0–200 m range and ±0.5% FS accuracy, with 4G/NB-IoT reporting and Hitelecom Cloud integration.',
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
      desc: 'Explosion-proof 2-in-1 sensor for temperature (-200°C to +800°C) and pressure (up to 20 MPa) in hazardous areas, with 4G/NB-IoT reporting; certification per market.',
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
      desc: 'Asset tracking sensor with GPS/BeiDou positioning, geofence alerts and movement history, reporting over 4G with multi-year battery life for pallets and crates.',
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
      title: '雷达液位传感器 | H系列 - 宏太通信',
      desc: '宏太雷达液位传感器精准监测、及时反馈、高稳定性，保障液位数据准确连续，支持户外4G/NB-IoT通信，适用于智慧水务与工业液位监测。',
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

export interface MergedProductContent {
  lists: Record<string, ListPage>;
  details: Record<string, DetailPage>;
}

/** 读取某语言的 CMS 新品，装配为 DetailPage（键 = slug） */
export async function getCmsProductDetails(locale: 'en' | 'zh'): Promise<Record<string, DetailPage>> {
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
export async function getMergedProducts(locale: 'en' | 'zh'): Promise<MergedProductContent> {
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
