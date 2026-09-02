/**
 * 解决方案全部内容（中英双语，由 www.hitelecom.com 原站 1:1 提取）
 * 改文案只需改这里：index 为列表页（横幅 + 6 张卡片），details 为 8 个方案详情页。
 * 图片路径相对 src/assets/images/，同名覆盖即可换图。
 * related 中 290/291 为原站定制卡（无详情页），模板里映射为定制品列表的 nbd 卡片。
 */

export interface SolutionCard { id: string; img: string; title: string; desc: string }
export interface SolutionSection { img: string; h: string; p: string }
export interface SolutionDetail {
  id: string;
  banner: string;
  intro: SolutionSection[];
  archHeading: string;
  archImgs: string[];
  featHeading: string;
  features: { h: string; p: string }[];
  sysHeading: string;
  system: SolutionSection[];
  relHeading: string;
  related: string[];
  scenHeading: string;
  scenarios: SolutionSection[];
}

export const solutionIndex: Record<'en' | 'zh', { bannerImg: string; bannerSub: string; bannerTitle: string; cards: SolutionCard[] }> = {
  en: {
    bannerImg: 'solution/index-banner.jpg',
    bannerSub: '',
    bannerTitle: 'SOLUTION',
    cards: [
            {
                  "id": "58",
                  "img": "solution/card-58.jpg",
                  "title": "Industrial IoT",
                  "desc": "Connect temperature, pressure, vibration, air-quality, and other field sensors to cloud dashboards for remote condition monitoring, alerts, and maintenance planning."
            },
            {
                  "id": "65",
                  "img": "solution/card-65.jpg",
                  "title": "Smart Agriculture",
                  "desc": "Monitor soil moisture, temperature, EC, NPK, weather, and irrigation conditions to support data-driven water and crop management."
            },
            {
                  "id": "64",
                  "img": "solution/card-64.png",
                  "title": "Smart Campus",
                  "desc": "Monitor indoor air, temperature, humidity, energy use, and critical facilities from a centralized platform with configurable alerts."
            },
            {
                  "id": "60",
                  "img": "solution/card-60.jpg",
                  "title": "Smart Industrial Parks",
                  "desc": "Connect environmental, energy, security, and equipment data across multi-building sites for centralized monitoring and operations."
            },
            {
                  "id": "59",
                  "img": "solution/card-59.png",
                  "title": "Smart Energy",
                  "desc": "Monitor temperature, pressure, vibration, and level across energy assets to support condition-based maintenance and reduce field visits."
            },
            {
                  "id": "57",
                  "img": "solution/card-57.jpg",
                  "title": "Smart City",
                  "desc": "Monitor structural tilt, environmental conditions, utility assets, and public infrastructure through outdoor sensor terminals and cloud-based alerts."
            },
            {
                  "id": "66",
                  "img": "solution/card-66b.jpg",
                  "title": "Tourism and Heritage Sites",
                  "desc": "Monitor structural tilt, environmental conditions, smoke, visitor flow, and selected assets to support conservation and site operations."
            },
            {
                  "id": "67",
                  "img": "solution/card-67.jpg",
                  "title": "Smart Water",
                  "desc": "Monitor water level, pressure, flow, leakage, and environmental conditions across reservoirs, pumping stations, pipelines, and drainage networks."
            }
      ],
  },
  zh: {
    bannerImg: 'solution/index-banner.jpg',
    bannerSub: '解决方案',
    bannerTitle: 'SOLUTION',
    cards: [
            {
                  "id": "58",
                  "img": "solution/card-58.jpg",
                  "title": "智慧工业解决方案",
                  "desc": "通过在工业生产设备机器上安装传感器和智能通信设备，实现数据的实时采集和交换。这些数据经过分析和处理，可以优化生产流程，提高效率，减少故障时间，实现预测性维护。"
            },
            {
                  "id": "65",
                  "img": "solution/card-65.jpg",
                  "title": "智慧农业解决方案",
                  "desc": "智慧农业解决方案通过整合物联网、人工智能和大数据技术，实现作物生长监控、资源优化配置和精准控制操作。该方案提升农业生产效率，降低资源浪费，同时促进可持续农业发展，增强农业竞争力。"
            },
            {
                  "id": "64",
                  "img": "solution/card-64.png",
                  "title": "智慧校园解决方案",
                  "desc": "通过部署传感器实时监控与智能管理，提高教学与行政效率，优化资源配置，强化安全系统，极大提升教育质量和校园运营效能，确保教育环境的持续优化和发展。"
            },
            {
                  "id": "60",
                  "img": "solution/card-60.jpg",
                  "title": "智慧园区解决方案",
                  "desc": "智慧园区，引领未来工作与生活方式。集成最新的物联和传感技术，实现环境、能源与安全的智能管理，打造高效、舒适、安全的工作与生活环境"
            },
            {
                  "id": "59",
                  "img": "solution/card-59.png",
                  "title": "智慧能源解决方案",
                  "desc": "智慧能源解决方案通过先进的传感技术和智能数据分析，实时数据监控和预测性维护提升能效，开启高效、可持续的未来。"
            },
            {
                  "id": "57",
                  "img": "solution/card-57.jpg",
                  "title": "智慧城市解决方案",
                  "desc": "智慧城市解决方案结合了云计算、大数据及物联传感技术，旨在提升城市运营效率，实现城市基础设施和服务的智能化管理，改善生活体验并促进环境可持续发展。"
            },
            {
                  "id": "66",
                  "img": "solution/card-66b.jpg",
                  "title": "智慧景区解决方案",
                  "desc": "通过布置传感器在景区各个角落，实现重点文物姿态监测，烟雾感知告警，人员流动分析，增强安全监控，提升运营效率和景区管理水平。"
            },
            {
                  "id": "67",
                  "img": "solution/card-67.jpg",
                  "title": "智慧水务解决方案",
                  "desc": "智慧水务解决方案通过整合物联网、云计算和数据分析技术，实现水资源的高效管理和监控。这些技术优化了水位监测、泄漏检测和水质安全，提升了水务系统的可靠性和经济效益。"
            }
      ],
  },
};

export const solutionDetails: Record<'en' | 'zh', Record<string, SolutionDetail>> = 
{
  "en": {
    "58": {
      "id": "58",
      "banner": "solution/58-banner-0.jpg",
      "intro": [
        {
          "img": "solution/58-intro-0.jpg",
          "h": "Industry Challenges",
          "p": "Manufacturers face cost pressure, unplanned downtime, and limited visibility into equipment condition. Industrial IoT addresses this by connecting field sensors to cloud dashboards for continuous monitoring, faster response, and data-driven decisions."
        },
        {
          "img": "solution/58-intro-1.jpg",
          "h": "Solution Overview",
          "p": "Hitelecom's industrial monitoring solution connects temperature, humidity, pressure, vibration, and air-quality sensors on production equipment to Hitelecom Cloud. Teams see equipment status in real time from a monitoring center or mobile app, receive alerts on anomalies, and plan maintenance by condition rather than calendar."
        }
      ],
      "archHeading": "Solution Architecture",
      "archImgs": [
        "solution/58-arch-0.png"
      ],
      "featHeading": "Key Advantages",
      "features": [
        {
          "h": "Low-Power Design",
          "p": "Selected sensor terminals use low-power processors, optimized power management, and configurable reporting intervals to extend field battery life."
        },
        {
          "h": "Outdoor-Ready Options",
          "p": "Selected models are available with IP-rated enclosures for industrial and outdoor environments. Confirm the required ingress-protection rating for each configuration."
        },
        {
          "h": "Flexible Connectivity",
          "p": "Choose 4G LTE or NB-IoT for direct cellular uplink, or LoRa/LoRaWAN for private gateway-based networks, depending on the model and site."
        },
        {
          "h": "NFC Setup",
          "p": "Selected devices support NFC activation and local configuration for faster deployment and maintenance."
        }
      ],
      "sysHeading": "System Capabilities",
      "system": [
        {
          "img": "solution/58-sys-0.png",
          "h": "Remote Configuration",
          "p": "Offers highly customizable batch configuration capabilities, supporting various formats and parameters to streamline remote device setup and enhance deployment efficiency."
        },
        {
          "img": "solution/58-sys-1.png",
          "h": "Real-time Monitoring",
          "p": "Hitelecom collects data via sensors and transmits it to the cloud platform for analysis. The platform analyzes trends and flags abnormal readings, helping teams plan maintenance and reduce downtime."
        },
        {
          "img": "solution/58-sys-2.png",
          "h": "Rule-Based Automation",
          "p": "Controllers act on sensor data through configured rules, enabling automated responses across devices and sites."
        },
        {
          "img": "solution/58-sys-3.png",
          "h": "Remote Firmware Updates",
          "p": "Supports remote batch OTA firmware updates for supported devices, keeping deployments current and reducing site visits."
        }
      ],
      "relHeading": "Related Products",
      "related": [
        "270",
        "274",
        "280",
        "281"
      ],
      "scenHeading": "Applications",
      "scenarios": [
        {
          "img": "solution/58-scen-0.jpg",
          "h": "Industry 4.0",
          "p": "Data-driven production management and automation support"
        },
        {
          "img": "solution/58-scen-1.jpg",
          "h": "Process Monitoring",
          "p": "Real-time Monitoring, Precise Control, Enhanced Automation"
        },
        {
          "img": "solution/58-scen-2.jpg",
          "h": "Oil and Gas Industry",
          "p": "Remote Monitoring and Intelligent Management of Oilfield Production"
        },
        {
          "img": "solution/58-scen-3.jpg",
          "h": "Waste Incineration",
          "p": "Optimize incineration process control, enhance energy efficiency, and reduce environmental pollution."
        },
        {
          "img": "solution/58-scen-4.jpg",
          "h": "Large Machinery",
          "p": "Condition monitoring improves maintenance efficiency and resource utilization"
        },
        {
          "img": "solution/58-scen-5.jpg",
          "h": "Industrial Plants",
          "p": "Centralized monitoring reduces failures and unplanned downtime"
        }
      ]
    },
    "65": {
      "id": "65",
      "banner": "solution/65-banner-0.jpg",
      "intro": [
        {
          "img": "solution/65-intro-0.jpg",
          "h": "Industry Challenges",
          "p": "Smart agriculture leverages modern IT and intelligent technologies to enhance agricultural productivity and sustainability. Addressing challenges like limited land, climate change, and pest control, it integrates IoT, big data, AI, and cloud computing for precision farming, boosting crop yield and quality. By marrying agriculture with IT, smart agriculture enhances efficiency and sustainability, playing a pivotal role in future agricultural evolution."
        },
        {
          "img": "solution/65-intro-1.jpg",
          "h": "Solution Overview",
          "p": "Smart Agriculture System leverages IoT, AI, and Big Data technologies, integrating soil sensors, weather stations, and temperature-humidity sensors through IoT to upload data to the cloud for centralized management and analysis. This real-time monitoring of farm environments and crop growth enables intelligent, digital comprehensive management of agricultural production, aiming to enhance efficiency, reduce resource waste, improve product quality and safety, and achieve sustainable development."
        }
      ],
      "archHeading": "Solution Architecture",
      "archImgs": [
        "solution/65-arch-0.png"
      ],
      "featHeading": "Key Advantages",
      "features": [
        {
          "h": "NFC Setup",
          "p": "Selected devices support NFC activation and local configuration for faster deployment and maintenance."
        },
        {
          "h": "Flexible Connectivity",
          "p": "Choose 4G LTE or NB-IoT for direct cellular uplink, or LoRa/LoRaWAN for private gateway-based networks, depending on the model and site."
        },
        {
          "h": "Outdoor-Ready Options",
          "p": "Selected models are available with IP-rated enclosures for industrial and outdoor environments. Confirm the required ingress-protection rating for each configuration."
        },
        {
          "h": "Low-Power Design",
          "p": "Selected sensor terminals use low-power processors, optimized power management, and configurable reporting intervals to extend field battery life."
        }
      ],
      "sysHeading": "System Capabilities",
      "system": [
        {
          "img": "solution/65-sys-0.png",
          "h": "Precision Irrigation",
          "p": "Real-time monitoring of soil moisture and crop water demand through advanced sensors and IoT technology enables precise control of water quantity and irrigation timing, optimizing water resource utilization, enhancing crop yield and quality, and promoting sustainable agricultural development."
        },
        {
          "img": "solution/65-sys-1.png",
          "h": "Threshold Alerts",
          "p": "Alerts trigger when configured thresholds are exceeded — for example soil moisture or temperature — so teams can respond before crops are stressed."
        },
        {
          "img": "solution/65-sys-2.png",
          "h": "Real-time Monitoring",
          "p": "Hitelecom collects data via sensors and transmits it to the cloud platform for analysis. The platform analyzes trends and flags abnormal readings, helping teams plan maintenance and reduce downtime."
        },
        {
          "img": "solution/65-sys-3.png",
          "h": "Remote Firmware Updates",
          "p": "Supports remote batch OTA firmware updates for supported devices, keeping deployments current and reducing site visits."
        }
      ],
      "relHeading": "Related Products",
      "related": [
        "275",
        "276",
        "280",
        "281"
      ],
      "scenHeading": "Applications",
      "scenarios": [
        {
          "img": "solution/65-scen-0.jpg",
          "h": "Greenhouse Cultivation",
          "p": "Implementing Smart Management for Greenhouse Crops"
        },
        {
          "img": "solution/65-scen-1.jpg",
          "h": "Smart Ranch",
          "p": "Real-time Monitoring and Management of Livestock Health and Behavior"
        },
        {
          "img": "solution/65-scen-2.jpg",
          "h": "Connected Farm",
          "p": "Connected sensors and data analysis support precision irrigation and crop management"
        },
        {
          "img": "solution/65-scen-3.jpg",
          "h": "Poultry Farming",
          "p": "Monitoring Poultry Health and Behavior to Enhance Farming Efficiency and Quality"
        },
        {
          "img": "solution/65-scen-4.jpg",
          "h": "Marine Aquaculture",
          "p": "Environmental Monitoring and Management for Marine Aquaculture"
        }
      ]
    },
    "64": {
      "id": "64",
      "banner": "solution/64-banner-0.jpg",
      "intro": [
        {
          "img": "solution/64-intro-0.png",
          "h": "Industry Challenges",
          "p": "Smart Campus refers to leveraging modern IT, especially the Internet, big data, AI, and IoT technologies, to interconnect various campus facilities (e.g., classrooms, labs, libraries) for real-time data transmission, enhancing management efficiency. With continuous advancements in IT and evolving educational philosophies, smart education is set to expand further, injecting new vitality into innovative educational development."
        },
        {
          "img": "solution/64-intro-1.jpg",
          "h": "Solution Overview",
          "p": "The Smart Education Solution System, designed to ensure campus safety and protect the well-being and assets of students and faculty, integrates advanced technologies and management philosophies into a comprehensive management system. Leveraging modern information technologies such as IoT, AI, and big data analytics, it provides a suite of safety management practices and technical solutions aimed at creating a secure and harmonious learning and living environment on campus. With ongoing technological advancements, Smart Education Solutions are set to expand and evolve across a broader spectrum of applications."
        }
      ],
      "archHeading": "Solution Architecture",
      "archImgs": [
        "solution/64-arch-0.png"
      ],
      "featHeading": "Key Advantages",
      "features": [
        {
          "h": "Flexible Connectivity",
          "p": "Choose 4G LTE or NB-IoT for direct cellular uplink, or LoRa/LoRaWAN for private gateway-based networks, depending on the model and site."
        },
        {
          "h": "NFC Setup",
          "p": "Selected devices support NFC activation and local configuration for faster deployment and maintenance."
        },
        {
          "h": "Outdoor-Ready Options",
          "p": "Selected models are available with IP-rated enclosures for industrial and outdoor environments. Confirm the required ingress-protection rating for each configuration."
        },
        {
          "h": "Low-Power Design",
          "p": "Selected sensor terminals use low-power processors, optimized power management, and configurable reporting intervals to extend field battery life."
        }
      ],
      "sysHeading": "System Capabilities",
      "system": [
        {
          "img": "solution/64-sys-0.png",
          "h": "Automated Control Rules",
          "p": "Rules adjust connected equipment — for example cooling — when sensor readings cross configured thresholds, without manual intervention."
        },
        {
          "img": "solution/64-sys-1.png",
          "h": "Rule-Based Automation",
          "p": "Controllers act on sensor data through configured rules, enabling automated responses across devices and sites."
        },
        {
          "img": "solution/64-sys-2.png",
          "h": "Real-time Monitoring",
          "p": "Hitelecom collects data via sensors and transmits it to the cloud platform for analysis. The platform analyzes trends and flags abnormal readings, helping teams plan maintenance and reduce downtime."
        },
        {
          "img": "solution/64-sys-3.png",
          "h": "Alarm Notification",
          "p": "Enables bulk configuration of alerts, centralized management, and automated alarm resolution. Supports multi-condition trigger alerts with timely notifications to relevant personnel, ensuring comprehensive monitoring of equipment operational status."
        }
      ],
      "relHeading": "Related Products",
      "related": [
        "284",
        "283",
        "274",
        "270",
        "285"
      ],
      "scenHeading": "Applications",
      "scenarios": [
        {
          "img": "solution/64-scen-0.jpg",
          "h": "Campus Operations",
          "p": "Monitor energy use, indoor air quality, and facility status across campus buildings"
        },
        {
          "img": "solution/64-scen-1.jpg",
          "h": "Campus Safety",
          "p": "Real-time monitoring strengthens campus safety and emergency response"
        },
        {
          "img": "solution/64-scen-2.jpg",
          "h": "Training and Lab Rooms",
          "p": "Monitor lab and workshop environmental conditions and equipment with configurable alerts"
        }
      ]
    },
    "60": {
      "id": "60",
      "banner": "solution/60-banner-0.jpg",
      "intro": [
        {
          "img": "solution/60-intro-0.jpg",
          "h": "Industry Challenges",
          "p": "A smart park utilizes advanced information and internet technologies for intelligent management and optimization of resources, facilities, and services, enhancing operational efficiency, service quality, and sustainability. By integrating IoT, big data, cloud computing, and AI, it forms a smart, digital ecosystem. Beyond technology application, smart park construction explores and practices future urban living, enabling more efficient resource allocation, eco-friendly lifestyles, and intelligent service experiences."
        },
        {
          "img": "solution/60-intro-1.jpg",
          "h": "Solution Overview",
          "p": "The Smart Industrial Park System is an integrated information management platform designed to enhance operational efficiency, service quality, and sustainability of campuses through cutting-edge technologies. It integrates IoT, cloud computing, big data, and AI into various aspects of campus management for intelligent, digital management and services. As technology advances and its application deepens, the system will become more intelligent, interconnected, and focused on ecological balance and sustainable development. The development of smart industrial park systems not only improves management efficiency but also creates better living and working environments for businesses and residents, offering broad application prospects and social value."
        }
      ],
      "archHeading": "Solution Architecture",
      "archImgs": [
        "solution/60-arch-0.png"
      ],
      "featHeading": "Key Advantages",
      "features": [
        {
          "h": "Low-Power Design",
          "p": "Selected sensor terminals use low-power processors, optimized power management, and configurable reporting intervals to extend field battery life."
        },
        {
          "h": "NFC Setup",
          "p": "Selected devices support NFC activation and local configuration for faster deployment and maintenance."
        },
        {
          "h": "Outdoor-Ready Options",
          "p": "Selected models are available with IP-rated enclosures for industrial and outdoor environments. Confirm the required ingress-protection rating for each configuration."
        },
        {
          "h": "Flexible Connectivity",
          "p": "Choose 4G LTE or NB-IoT for direct cellular uplink, or LoRa/LoRaWAN for private gateway-based networks, depending on the model and site."
        }
      ],
      "sysHeading": "System Capabilities",
      "system": [
        {
          "img": "solution/60-sys-0.png",
          "h": "Remote Configuration",
          "p": "Offers highly customizable batch configuration capabilities, supporting various formats and parameters to streamline remote device setup and enhance deployment efficiency."
        },
        {
          "img": "solution/60-sys-1.png",
          "h": "Fault Localization",
          "p": "Diagnostics help locate faulty devices quickly, reducing repair time; supports device status monitoring and map-based views."
        },
        {
          "img": "solution/60-sys-2.png",
          "h": "Rule-Based Automation",
          "p": "Controllers act on sensor data through configured rules, enabling automated responses across devices and sites."
        },
        {
          "img": "solution/60-sys-3.png",
          "h": "Remote Firmware Updates",
          "p": "Supports remote batch OTA firmware updates for supported devices, keeping deployments current and reducing site visits."
        }
      ],
      "relHeading": "Related Products",
      "related": [
        "280",
        "281",
        "291",
        "290"
      ],
      "scenHeading": "Applications",
      "scenarios": [
        {
          "img": "solution/60-scen-0.jpg",
          "h": "Industrial Park",
          "p": "Enhancing Production Efficiency and Precision Management of Facilities and Equipment"
        },
        {
          "img": "solution/60-scen-1.jpg",
          "h": "Commercial Buildings",
          "p": "Implementing Building Automation and Energy Efficiency Optimization"
        },
        {
          "img": "solution/60-scen-2.jpg",
          "h": "Office Buildings",
          "p": "Intelligent management and operations for modern office environments"
        }
      ]
    },
    "59": {
      "id": "59",
      "banner": "solution/59-banner-0.jpg",
      "intro": [
        {
          "img": "solution/59-intro-0.png",
          "h": "Industry Challenges",
          "p": "With the rapid development of the global economy and increasing population, the demand for energy continues to rise. Traditional energy management models struggle to meet this growing demand. Smart energy, enhanced by IoT technology, improves the efficiency of energy management and utilization. The decreasing cost of IoT devices, along with advancements in sensors, communication technologies, and data processing capabilities, make IoT applications in smart energy more feasible and cost-effective. The development of smart energy not only helps increase energy efficiency and reduce costs but also supports sustainable development goals, driving society towards a low-carbon, green future."
        },
        {
          "img": "solution/59-intro-1.jpg",
          "h": "Solution Overview",
          "p": "A Smart Energy System is an integrated framework combining information, communication, automation, and energy management technologies to enable efficient, intelligent, and sustainable energy use. It optimizes energy production, transmission, distribution, and consumption through real-time monitoring, data analytics, and smart decision-making, facilitating an intelligent transformation of energy systems. By integrating advanced technologies and management philosophies, it not only enhances energy efficiency and reduces costs but also supports sustainable development goals, steering society towards a low-carbon, green future. As technology evolves and its applications deepen, Smart Energy Systems are set to play an increasingly crucial role in future energy management."
        }
      ],
      "archHeading": "Solution Architecture",
      "archImgs": [
        "solution/59-arch-0.png"
      ],
      "featHeading": "Key Advantages",
      "features": [
        {
          "h": "NFC Setup",
          "p": "Selected devices support NFC activation and local configuration for faster deployment and maintenance."
        },
        {
          "h": "Flexible Connectivity",
          "p": "Choose 4G LTE or NB-IoT for direct cellular uplink, or LoRa/LoRaWAN for private gateway-based networks, depending on the model and site."
        },
        {
          "h": "Outdoor-Ready Options",
          "p": "Selected models are available with IP-rated enclosures for industrial and outdoor environments. Confirm the required ingress-protection rating for each configuration."
        },
        {
          "h": "Low-Power Design",
          "p": "Selected sensor terminals use low-power processors, optimized power management, and configurable reporting intervals to extend field battery life."
        }
      ],
      "sysHeading": "System Capabilities",
      "system": [
        {
          "img": "solution/59-sys-0.png",
          "h": "Remote Configuration",
          "p": "Offers highly customizable batch configuration capabilities, supporting various formats and parameters to streamline remote device setup and enhance deployment efficiency."
        },
        {
          "img": "solution/59-sys-1.png",
          "h": "Automated Control Rules",
          "p": "Rules adjust connected equipment — for example cooling — when sensor readings cross configured thresholds, without manual intervention."
        },
        {
          "img": "solution/59-sys-2.png",
          "h": "Rule-Based Automation",
          "p": "Controllers act on sensor data through configured rules, enabling automated responses across devices and sites."
        },
        {
          "img": "solution/59-sys-3.png",
          "h": "Remote Firmware Updates",
          "p": "Supports remote batch OTA firmware updates for supported devices, keeping deployments current and reducing site visits."
        }
      ],
      "relHeading": "Related Products",
      "related": [
        "280",
        "281",
        "291",
        "290",
        "282"
      ],
      "scenHeading": "Applications",
      "scenarios": [
        {
          "img": "solution/59-scen-0.jpg",
          "h": "Wind Power and Energy Storage",
          "p": "Condition monitoring for turbines and storage systems supports maintenance planning"
        },
        {
          "img": "solution/59-scen-1.jpg",
          "h": "New Energy Installations",
          "p": "Real-time monitoring and control for renewable energy installations"
        },
        {
          "img": "solution/59-scen-2.jpg",
          "h": "Power Plants",
          "p": "Monitor temperature, pressure, vibration, and equipment condition to support maintenance planning."
        }
      ]
    },
    "57": {
      "id": "57",
      "banner": "solution/57-banner-0.jpg",
      "intro": [
        {
          "img": "solution/57-intro-0.jpg",
          "h": "Industry Challenges",
          "p": "The global economic growth and urbanization have led to challenges such as traffic congestion, environmental pollution, and resource scarcity. Smart cities, supported by advancements in IoT, big data, cloud computing, and AI, aim to address these challenges by enhancing sustainable urban development. These technologies enable real-time data collection and analysis, facilitating more scientific and efficient decision-making. Smart cities improve urban management and quality of life, promoting sustainable development."
        },
        {
          "img": "solution/57-intro-1.jpg",
          "h": "Solution Overview",
          "p": "Smart city systems leverage modern information technology and data analytics to enhance urban management efficiency, improve citizens' quality of life, and promote sustainable development. These systems utilize intelligent infrastructure, data-driven decision support, and efficient service systems for smart urban management and services. By enhancing the intelligence level of city management through IT, smart city systems effectively address urbanization challenges, improve residents' quality of life, and foster sustainable development. With ongoing technological advancements, smart city systems are set to play an increasingly vital role in future urban development."
        }
      ],
      "archHeading": "Solution Architecture",
      "archImgs": [
        "solution/57-arch-0.png"
      ],
      "featHeading": "Key Advantages",
      "features": [
        {
          "h": "Outdoor-Ready Options",
          "p": "Selected models are available with IP-rated enclosures for industrial and outdoor environments. Confirm the required ingress-protection rating for each configuration."
        },
        {
          "h": "Low-Power Design",
          "p": "Selected sensor terminals use low-power processors, optimized power management, and configurable reporting intervals to extend field battery life."
        },
        {
          "h": "Flexible Connectivity",
          "p": "Choose 4G LTE or NB-IoT for direct cellular uplink, or LoRa/LoRaWAN for private gateway-based networks, depending on the model and site."
        },
        {
          "h": "NFC Setup",
          "p": "Selected devices support NFC activation and local configuration for faster deployment and maintenance."
        }
      ],
      "sysHeading": "System Capabilities",
      "system": [
        {
          "img": "solution/57-sys-0.png",
          "h": "Remote Configuration",
          "p": "Offers highly customizable batch configuration capabilities, supporting various formats and parameters to streamline remote device setup and enhance deployment efficiency."
        },
        {
          "img": "solution/57-sys-1.png",
          "h": "Real-time Monitoring",
          "p": "Hitelecom collects data via sensors and transmits it to the cloud platform for analysis. The platform analyzes trends and flags abnormal readings, helping teams plan maintenance and reduce downtime."
        },
        {
          "img": "solution/57-sys-2.png",
          "h": "Rule-Based Automation",
          "p": "Controllers act on sensor data through configured rules, enabling automated responses across devices and sites."
        },
        {
          "img": "solution/57-sys-3.png",
          "h": "Remote Firmware Updates",
          "p": "Supports remote batch OTA firmware updates for supported devices, keeping deployments current and reducing site visits."
        }
      ],
      "relHeading": "Related Products",
      "related": [
        "286",
        "287",
        "270",
        "274",
        "281",
        "282",
        "283",
        "284"
      ],
      "scenHeading": "Applications",
      "scenarios": [
        {
          "img": "solution/57-scen-0.jpg",
          "h": "Connected Vehicle Infrastructure",
          "p": "Monitor roadside and depot infrastructure conditions with outdoor sensor terminals"
        },
        {
          "img": "solution/57-scen-1.jpg",
          "h": "Logistics and Supply Chain",
          "p": "Track assets and monitor warehouse conditions across sites"
        },
        {
          "img": "solution/57-scen-2.jpg",
          "h": "Urban Pipelines",
          "p": "Monitor pressure, leakage, level, and operating conditions."
        },
        {
          "img": "solution/57-scen-3.jpg",
          "h": "Hydropower Facilities",
          "p": "Monitor water level and equipment conditions."
        },
        {
          "img": "solution/57-scen-4.jpg",
          "h": "Residential Communities",
          "p": "Monitor environmental conditions and utility assets in residential areas"
        }
      ]
    },
    "66": {
      "id": "66",
      "banner": "solution/66-banner-0.jpg",
      "intro": [
        {
          "img": "solution/66-intro-0.jpg",
          "h": "Industry Challenges",
          "p": "In recent years, the global tourism industry has flourished, making travel an indispensable part of many people's lives. According to the World Tourism Organization (UNWTO), the continuous increase in international tourists has spurred the development and construction of various tourist attractions. This rapid growth demands higher standards for the management and services of these attractions. Smart tourism destinations utilize modern information technology, the Internet of Things (IoT), big data, and artificial intelligence to achieve comprehensive digital and intelligent management and services. Emerging in response to the swift expansion of the tourism industry and the diversification of tourist demands, smart destinations aim to enhance visitor experiences, improve management efficiency, and promote sustainable development. By applying modern information technology, smart destinations elevate the level of intelligence in tourism management, better meeting tourists' needs, optimizing resource allocation, and fostering the sustainable growth of the tourism sector."
        },
        {
          "img": "solution/66-intro-1.jpg",
          "h": "Solution Overview",
          "p": "The Smart Scenic Area System, leveraging modern IT, IoT, big data, and AI, aims to enhance management efficiency and visitor experiences in tourist spots. It enables comprehensive monitoring and management of scenic resources through digital and intelligent means, meeting the growing demand for personalized and high-quality tourism. By applying modern IT, the system enhances the intelligence of tourism management, better meets visitor needs, optimizes resource allocation, and promotes sustainable tourism development. With ongoing technological advancements, the Smart Scenic Area System is set to play an increasingly vital role in the future tourism industry."
        }
      ],
      "archHeading": "Solution Architecture",
      "archImgs": [
        "solution/66-arch-0.png"
      ],
      "featHeading": "Key Advantages",
      "features": [
        {
          "h": "Low-Power Design",
          "p": "Selected sensor terminals use low-power processors, optimized power management, and configurable reporting intervals to extend field battery life."
        },
        {
          "h": "Flexible Connectivity",
          "p": "Choose 4G LTE or NB-IoT for direct cellular uplink, or LoRa/LoRaWAN for private gateway-based networks, depending on the model and site."
        },
        {
          "h": "NFC Setup",
          "p": "Selected devices support NFC activation and local configuration for faster deployment and maintenance."
        },
        {
          "h": "Outdoor-Ready Options",
          "p": "Selected models are available with IP-rated enclosures for industrial and outdoor environments. Confirm the required ingress-protection rating for each configuration."
        }
      ],
      "sysHeading": "System Capabilities",
      "system": [
        {
          "img": "solution/66-sys-0.png",
          "h": "Fault Localization",
          "p": "Diagnostics help locate faulty devices quickly, reducing repair time; supports device status monitoring and map-based views."
        },
        {
          "img": "solution/66-sys-1.png",
          "h": "Rule-Based Automation",
          "p": "Controllers act on sensor data through configured rules, enabling automated responses across devices and sites."
        },
        {
          "img": "solution/66-sys-2.png",
          "h": "Alarm Notification",
          "p": "Enables bulk configuration of alerts, centralized management, and automated alarm resolution. Supports multi-condition trigger alerts with timely notifications to relevant personnel, ensuring comprehensive monitoring of equipment operational status."
        },
        {
          "img": "solution/66-sys-3.png",
          "h": "Remote Firmware Updates",
          "p": "Supports remote batch OTA firmware updates for supported devices, keeping deployments current and reducing site visits."
        }
      ],
      "relHeading": "Related Products",
      "related": [
        "283",
        "282",
        "290",
        "291",
        "281"
      ],
      "scenHeading": "Applications",
      "scenarios": [
        {
          "img": "solution/66-scen-0.jpg",
          "h": "Historic Buildings",
          "p": "Monitor temperature, humidity, and structural tilt to support conservation."
        },
        {
          "img": "solution/66-scen-1.jpg",
          "h": "Museums and Collections",
          "p": "Track temperature, humidity, and smoke to protect exhibits and collections."
        },
        {
          "img": "solution/66-scen-2.jpg",
          "h": "Archaeological Sites",
          "p": "Monitor environmental conditions and structural movement at exposed sites."
        },
        {
          "img": "solution/66-scen-3.jpg",
          "h": "Visitor Areas",
          "p": "Monitor visitor flow and environmental conditions to support site operations."
        }
      ]
    },
    "67": {
      "id": "67",
      "banner": "solution/67-banner-0.jpg",
      "intro": [
        {
          "img": "solution/67-intro-0.jpg",
          "h": "Industry Challenges",
          "p": "Global water scarcity, intensified by population growth, urbanization, climate change, pollution, and overuse, demands efficient management. Traditional methods, limited by delayed data and inadequate decision-making support, falter in efficiency and emergency responsiveness, such as leak or pollution detection. Smart water management, pivotal in smart city strategies, employs advanced technology and analytics for effective resource stewardship and monitoring. Addressing the challenges of traditional systems, including safety and supply risks, smart solutions facilitate real-time monitoring and analysis, improving risk management and ensuring water service safety and reliability."
        },
        {
          "img": "solution/67-intro-1.jpg",
          "h": "Solution Overview",
          "p": "Smart water management systems, leveraging IT and intelligent technologies like IoT, big data, cloud computing, and AI, are crucial for efficient water resource management in urban and regional areas. These systems aim to optimize water usage, ensure quality, minimize costs, and enhance user satisfaction by offering comprehensive monitoring and management solutions. They cover all aspects of water resource utilization, from development to protection, including reservoirs, rivers, and irrigation systems, to secure water supply, support agriculture and industry, and mitigate flood risks. With the integration of advanced technologies, these systems are set to play a pivotal role in sustainable water management, improving efficiency and safety while addressing future challenges."
        }
      ],
      "archHeading": "Solution Architecture",
      "archImgs": [
        "solution/67-arch-0.png"
      ],
      "featHeading": "Key Advantages",
      "features": [
        {
          "h": "Low-Power Design",
          "p": "Selected sensor terminals use low-power processors, optimized power management, and configurable reporting intervals to extend field battery life."
        },
        {
          "h": "Outdoor-Ready Options",
          "p": "Selected models are available with IP-rated enclosures for industrial and outdoor environments. Confirm the required ingress-protection rating for each configuration."
        },
        {
          "h": "Flexible Connectivity",
          "p": "Choose 4G LTE or NB-IoT for direct cellular uplink, or LoRa/LoRaWAN for private gateway-based networks, depending on the model and site."
        },
        {
          "h": "NFC Setup",
          "p": "Selected devices support NFC activation and local configuration for faster deployment and maintenance."
        }
      ],
      "sysHeading": "System Capabilities",
      "system": [
        {
          "img": "solution/67-sys-0.png",
          "h": "Remote Configuration",
          "p": "Offers highly customizable batch configuration capabilities, supporting various formats and parameters to streamline remote device setup and enhance deployment efficiency."
        },
        {
          "img": "solution/67-sys-1.png",
          "h": "Real-time Monitoring",
          "p": "Hitelecom collects data via sensors and transmits it to the cloud platform for analysis. The platform analyzes trends and flags abnormal readings, helping teams plan maintenance and reduce downtime."
        },
        {
          "img": "solution/67-sys-2.png",
          "h": "Rule-Based Automation",
          "p": "Controllers act on sensor data through configured rules, enabling automated responses across devices and sites."
        },
        {
          "img": "solution/67-sys-3.png",
          "h": "Alarm Notification",
          "p": "Enables bulk configuration of alerts, centralized management, and automated alarm resolution. Supports multi-condition trigger alerts with timely notifications to relevant personnel, ensuring comprehensive monitoring of equipment operational status."
        }
      ],
      "relHeading": "Related Products",
      "related": [
        "270",
        "274",
        "280",
        "281",
        "291"
      ],
      "scenHeading": "Applications",
      "scenarios": [
        {
          "img": "solution/67-scen-0.jpg",
          "h": "Hydropower Dams",
          "p": "Monitor water level, displacement and tilt, and environmental conditions at dams."
        },
        {
          "img": "solution/67-scen-1.jpg",
          "h": "Industrial Water Plants",
          "p": "Monitor process conditions and equipment status to support maintenance planning."
        },
        {
          "img": "solution/67-scen-2.jpg",
          "h": "Aquaculture",
          "p": "Monitor water and environmental conditions for aquaculture operations."
        }
      ]
    }
  },
  "zh": {
    "58": {
      "id": "58",
      "banner": "solution/58-banner-0.jpg",
      "intro": [
        {
          "img": "solution/58-intro-0.jpg",
          "h": "行业挑战",
          "p": "智慧工业方案是基于工业互联网、物联网、大数据、人工智能等先进技术，旨在提升传统制造业的智能化水平和生产效率的一种综合解决方案。随着全球制造业的转型升级，企业面临着成本压力、市场需求变化、资源利用效率低下等挑战，智慧工业方案应运而生。"
        },
        {
          "img": "solution/58-intro-1.jpg",
          "h": "方案概述",
          "p": "智慧工业实时监测系统适用于生产企业对设备的在线监测，通过在设备端安装温湿度传感器、压力传感器、能耗传感器、空气质量传感器和气象站等物联网智能终端。可实现在企业监控中心或手机客户端实时查看整个企业设备运行情况。及时发现故障并进行维护。提升企业生产效率、降低成本、提高产品质量和增强企业竞争力。"
        }
      ],
      "archHeading": "方案拓扑图",
      "archImgs": [
        "solution/58-arch-0.png"
      ],
      "featHeading": "核心优势",
      "features": [
        {
          "h": "低功耗设计",
          "p": "部分传感终端采用低功耗处理器、优化的电源管理与可配置上报间隔，延长现场电池续航。"
        },
        {
          "h": "户外防护选项",
          "p": "部分型号可选 IP 防护等级外壳，适用于工业与户外环境；请按具体配置确认所需防护等级。"
        },
        {
          "h": "灵活通信",
          "p": "按型号与现场条件选择 4G LTE 或 NB-IoT 蜂窝直连，或 LoRa/LoRaWAN 私有网关组网。"
        },
        {
          "h": "NFC 配置",
          "p": "部分设备支持 NFC 激活与本地配置，加快部署与维护。"
        }
      ],
      "sysHeading": "系统能力",
      "system": [
        {
          "img": "solution/58-sys-0.png",
          "h": "远程配置",
          "p": "提供高度定制化的批量配置能力，支持多种格式和参数，简化远程设备配置流程，提升部署效率"
        },
        {
          "img": "solution/58-sys-1.png",
          "h": "实时监测",
          "p": "宏太通过传感器采集数据并传输至云平台分析，平台分析趋势并标记异常读数，帮助团队安排维护、减少停机。"
        },
        {
          "img": "solution/58-sys-2.png",
          "h": "规则联动",
          "p": "控制器按配置的规则响应传感数据变化，实现跨设备、跨站点的自动化响应"
        },
        {
          "img": "solution/58-sys-3.png",
          "h": "远程固件升级",
          "p": "支持对设备进行远程批量 OTA 固件升级，保持版本最新并减少现场维护"
        }
      ],
      "relHeading": "相关产品",
      "related": [
        "270",
        "274",
        "280",
        "281"
      ],
      "scenHeading": "应用场景",
      "scenarios": [
        {
          "img": "solution/58-scen-0.jpg",
          "h": "工业4.0",
          "p": "生产自动化与数据驱动的智能管理"
        },
        {
          "img": "solution/58-scen-1.jpg",
          "h": "过程控制",
          "p": "实时监控，精确控制，提高自动化水平"
        },
        {
          "img": "solution/58-scen-2.jpg",
          "h": "油气工业",
          "p": "监控设备、优化生产流程，提升开采效率"
        },
        {
          "img": "solution/58-scen-3.jpg",
          "h": "垃圾焚烧",
          "p": "优化焚烧过程控制，提高能效，降低环境污染"
        },
        {
          "img": "solution/58-scen-4.jpg",
          "h": "大型机器",
          "p": "提升设备维护效率，优化资源利用"
        },
        {
          "img": "solution/58-scen-5.jpg",
          "h": "工业工厂",
          "p": "实现智能化管理，减少故障增强竞争力"
        }
      ]
    },
    "65": {
      "id": "65",
      "banner": "solution/65-banner-0.jpg",
      "intro": [
        {
          "img": "solution/65-intro-0.jpg",
          "h": "行业挑战",
          "p": "智慧农业是利用现代信息技术和智能化手段来提升农业生产效率和可持续发展的新型农业模式。随着全球人口的不断增长和资源的日益紧张，传统农业面临着诸多挑战，如土地资源有限、气候变化、病虫害防治等。智慧农业应运而生，它通过整合物联网、大数据、人工智能、云计算等技术，帮助农民实现精准农业管理，提高作物产量和质量。 智慧农业不仅提升了农业生产的效率和可持续性，还促进了农业与信息技术的深度融合。随着技术的不断进步和应用的普及，智慧农业将在未来的农业发展中扮演越来越重要的角色。"
        },
        {
          "img": "solution/65-intro-1.jpg",
          "h": "方案概述",
          "p": "智慧农业系统是利用物联网、人工智能、大数据等先进技术手段，通过土壤传感器、气象站、温湿度传感器等设备，利用物联网技术，将各类传感器采集的数据上传至云平台，实现数据的集中管理和分析，实时监测农田环境和作物生长状况。对农业生产、管理和服务进行智能化、数字化的综合管理系统。其目标是提高农业生产效率、减少资源浪费、提升产品质量和安全性，实现可持续发展。"
        }
      ],
      "archHeading": "方案拓扑图",
      "archImgs": [
        "solution/65-arch-0.png"
      ],
      "featHeading": "核心优势",
      "features": [
        {
          "h": "NFC 配置",
          "p": "部分设备支持 NFC 激活与本地配置，加快部署与维护。"
        },
        {
          "h": "灵活通信",
          "p": "按型号与现场条件选择 4G LTE 或 NB-IoT 蜂窝直连，或 LoRa/LoRaWAN 私有网关组网。"
        },
        {
          "h": "户外防护选项",
          "p": "部分型号可选 IP 防护等级外壳，适用于工业与户外环境；请按具体配置确认所需防护等级。"
        },
        {
          "h": "低功耗设计",
          "p": "部分传感终端采用低功耗处理器、优化的电源管理与可配置上报间隔，延长现场电池续航。"
        }
      ],
      "sysHeading": "系统能力",
      "system": [
        {
          "img": "solution/65-sys-0.png",
          "h": "精准灌溉",
          "p": "通过先进的传感器和物联网技术实时监测土壤湿度与作物需水量，精确控制水量和灌溉时间，以优化水资源利用，提高作物产量与质量，实现农业可持续发展。"
        },
        {
          "img": "solution/65-sys-1.png",
          "h": "阈值告警",
          "p": "当土壤水分、温度等参数越过配置阈值时触发告警，帮助团队在作物受影响前响应。"
        },
        {
          "img": "solution/65-sys-2.png",
          "h": "实时监测",
          "p": "宏太通过传感器采集数据并传输至云平台分析，平台分析趋势并标记异常读数，帮助团队安排维护、减少停机。"
        },
        {
          "img": "solution/65-sys-3.png",
          "h": "远程固件升级",
          "p": "支持对设备进行远程批量 OTA 固件升级，保持版本最新并减少现场维护"
        }
      ],
      "relHeading": "相关产品",
      "related": [
        "275",
        "276",
        "280",
        "281"
      ],
      "scenHeading": "应用场景",
      "scenarios": [
        {
          "img": "solution/65-scen-0.jpg",
          "h": "大棚种植",
          "p": "实现温室作物智能化管理"
        },
        {
          "img": "solution/65-scen-1.jpg",
          "h": "智慧牧场",
          "p": "实现对牲畜健康与行为的实时监控和管理"
        },
        {
          "img": "solution/65-scen-2.jpg",
          "h": "互联农场",
          "p": "互联传感与数据分析支持精准灌溉与作物管理"
        },
        {
          "img": "solution/65-scen-3.jpg",
          "h": "家禽养殖",
          "p": "监控家禽健康、行为，提升养殖效率和质量"
        },
        {
          "img": "solution/65-scen-4.jpg",
          "h": "海水养殖",
          "p": "实现海洋生物养殖的环境监控与管理"
        }
      ]
    },
    "64": {
      "id": "64",
      "banner": "solution/64-banner-0.jpg",
      "intro": [
        {
          "img": "solution/64-intro-0.png",
          "h": "行业挑战",
          "p": "智慧校园是指利用现代信息技术，特别是互联网、大数据、人工智能等技术手段，需求的变化以及社会对教育质量的不断追求，物联网技术的发展使得校园内的各类设备（如教室、实验室、图书馆等）能够互联互通，实时传输数据，提高管理效率。随着信息技术的不断进步和教育理念的不断更新，智慧教育会在更大范围内推广和应用，为教育的创新发展注入新的活力。"
        },
        {
          "img": "solution/64-intro-1.jpg",
          "h": "方案概述",
          "p": "智慧教育解决方案系统通过整合先进的技术手段和管理理念，为保障校园安全、维护师生人身和财产安全而设计的一套综合性管理系统。它结合现代信息技术，如物联网、人工智能、大数据分析等，提供了一系列安全管理措施和技术手段。系统方案致力于为校园提供一个安全、和谐的学习和生活环境。随着科技的不断进步，智慧教育解决方案将会在更广泛的领域得到应用和发展。"
        }
      ],
      "archHeading": "方案拓扑图",
      "archImgs": [
        "solution/64-arch-0.png"
      ],
      "featHeading": "核心优势",
      "features": [
        {
          "h": "灵活通信",
          "p": "按型号与现场条件选择 4G LTE 或 NB-IoT 蜂窝直连，或 LoRa/LoRaWAN 私有网关组网。"
        },
        {
          "h": "NFC 配置",
          "p": "部分设备支持 NFC 激活与本地配置，加快部署与维护。"
        },
        {
          "h": "户外防护选项",
          "p": "部分型号可选 IP 防护等级外壳，适用于工业与户外环境；请按具体配置确认所需防护等级。"
        },
        {
          "h": "低功耗设计",
          "p": "部分传感终端采用低功耗处理器、优化的电源管理与可配置上报间隔，延长现场电池续航。"
        }
      ],
      "sysHeading": "系统能力",
      "system": [
        {
          "img": "solution/64-sys-0.png",
          "h": "自动化控制规则",
          "p": "当传感读数越过配置阈值时，规则自动调节相连设备（如制冷），无需人工干预。"
        },
        {
          "img": "solution/64-sys-1.png",
          "h": "规则联动",
          "p": "控制器按配置的规则响应传感数据变化，实现跨设备、跨站点的自动化响应"
        },
        {
          "img": "solution/64-sys-2.png",
          "h": "实时监测",
          "p": "宏太通过传感器采集数据并传输至云平台分析，平台分析趋势并标记异常读数，帮助团队安排维护、减少停机。"
        },
        {
          "img": "solution/64-sys-3.png",
          "h": "告警通知",
          "p": "实现批量配置告警，统管理，自动化消警流程支持多条件触发告警并及时通知相关人员，全方位监控设备运行状态"
        }
      ],
      "relHeading": "相关产品",
      "related": [
        "284",
        "283",
        "274",
        "270",
        "285"
      ],
      "scenHeading": "应用场景",
      "scenarios": [
        {
          "img": "solution/64-scen-0.jpg",
          "h": "校园运营",
          "p": "监测各楼宇能耗、室内空气质量与设施状态"
        },
        {
          "img": "solution/64-scen-1.jpg",
          "h": "平安校园",
          "p": "实时监控，强化校园安全与应急管理"
        },
        {
          "img": "solution/64-scen-2.jpg",
          "h": "实训与实验室",
          "p": "以可配置告警监测实验室与实训车间的环境条件和设备状态"
        }
      ]
    },
    "60": {
      "id": "60",
      "banner": "solution/60-banner-0.jpg",
      "intro": [
        {
          "img": "solution/60-intro-0.jpg",
          "h": "行业挑战",
          "p": "智慧园区是指利用先进的信息技术和互联网技术，对园区内的资源、设施和服务进行智能化管理和优化配置，从而提升园区的运营效率、服务质量和可持续发展能力。智慧园区通常结合物联网（IoT）、大数据、云计算、人工智能等技术，构建一个智能化、数字化的生态系统。智慧园区的建设不仅是技术的应用，更是对未来城市生活方式的一种探索和实践。通过智慧园区的建设，可以实现更高效的资源配置，更环保的生活方式，以及更智能的服务体验。"
        },
        {
          "img": "solution/60-intro-1.jpg",
          "h": "方案概述",
          "p": "智慧园区系统是一个综合性的信息化管理平台，旨在通过先进的技术手段提升园区的运营效率、服务质量和可持续发展能力。其核心在于将物联网、云计算、大数据、人工智能等技术集成应用于园区管理的各个方面，实现智能化、数字化的管理和服务。随着技术的不断进步和应用的深入，智慧园区系统将更加智能化、更广泛的互联互通、更加注重生态平衡和可持续发展。智慧园区系统的建设与发展，不仅提升了园区的管理效率，也为企业和居民创造了更好的生活和工作环境，具有广阔的应用前景和社会价值。"
        }
      ],
      "archHeading": "方案拓扑图",
      "archImgs": [
        "solution/60-arch-0.png"
      ],
      "featHeading": "核心优势",
      "features": [
        {
          "h": "低功耗设计",
          "p": "部分传感终端采用低功耗处理器、优化的电源管理与可配置上报间隔，延长现场电池续航。"
        },
        {
          "h": "NFC 配置",
          "p": "部分设备支持 NFC 激活与本地配置，加快部署与维护。"
        },
        {
          "h": "户外防护选项",
          "p": "部分型号可选 IP 防护等级外壳，适用于工业与户外环境；请按具体配置确认所需防护等级。"
        },
        {
          "h": "灵活通信",
          "p": "按型号与现场条件选择 4G LTE 或 NB-IoT 蜂窝直连，或 LoRa/LoRaWAN 私有网关组网。"
        }
      ],
      "sysHeading": "系统能力",
      "system": [
        {
          "img": "solution/60-sys-0.png",
          "h": "远程配置",
          "p": "提供高度定制化的批量配置能力，支持多种格式和参数，简化远程设备配置流程，提升部署效率"
        },
        {
          "img": "solution/60-sys-1.png",
          "h": "故障定位",
          "p": "诊断功能帮助快速定位故障设备，降低维修时间与运维成本；支持设备状态监测与地图视图。"
        },
        {
          "img": "solution/60-sys-2.png",
          "h": "规则联动",
          "p": "控制器按配置的规则响应传感数据变化，实现跨设备、跨站点的自动化响应"
        },
        {
          "img": "solution/60-sys-3.png",
          "h": "远程固件升级",
          "p": "支持对设备进行远程批量 OTA 固件升级，保持版本最新并减少现场维护"
        }
      ],
      "relHeading": "相关产品",
      "related": [
        "280",
        "281",
        "291",
        "290"
      ],
      "scenHeading": "应用场景",
      "scenarios": [
        {
          "img": "solution/60-scen-0.jpg",
          "h": "工业园区",
          "p": "提升生产效率与设施设备精细化管理"
        },
        {
          "img": "solution/60-scen-1.jpg",
          "h": "商业楼宇",
          "p": "实现楼宇自动化管理与能源效率优化"
        },
        {
          "img": "solution/60-scen-2.jpg",
          "h": "办公楼",
          "p": "实现智能化管理与运营的现代化办公环境"
        }
      ]
    },
    "59": {
      "id": "59",
      "banner": "solution/59-banner-0.jpg",
      "intro": [
        {
          "img": "solution/59-intro-0.png",
          "h": "行业挑战",
          "p": "随着全球经济的快速发展和人口的增加，能源需求持续上升。传统的能源管理模式已难以满足日益增长的需求。智慧能源是通过物联网技术提升能源的管理和利用效率。物联网设备的成本持续下降，传感器、通信技术和数据处理能力的提升，使得物联网在智慧能源领域的应用变得更加可行和经济。智慧能源的发展不仅有助于提高能源利用效率，降低能源成本，还有助于实现可持续发展目标，推动社会向低碳、绿色的方向发展。"
        },
        {
          "img": "solution/59-intro-1.jpg",
          "h": "方案概述",
          "p": "智慧能源系统是一个集成了信息技术、通信技术、自动化技术和能源管理技术的综合性系统，旨在实现对能源的高效利用、智能管理和可持续发展。它通过实时监测、数据分析和智能决策，优化能源的生产、传输、分配和消费，推动能源系统的智能化转型。智慧能源系统通过集成先进的技术和管理理念，不仅能够提高能源的利用效率，降低能源成本，还有助于实现可持续发展目标，推动社会向低碳、绿色的方向发展。随着技术的不断进步和应用的深入，智慧能源系统将在未来的能源管理中发挥越来越重要的作用。"
        }
      ],
      "archHeading": "方案拓扑图",
      "archImgs": [
        "solution/59-arch-0.png"
      ],
      "featHeading": "核心优势",
      "features": [
        {
          "h": "NFC 配置",
          "p": "部分设备支持 NFC 激活与本地配置，加快部署与维护。"
        },
        {
          "h": "灵活通信",
          "p": "按型号与现场条件选择 4G LTE 或 NB-IoT 蜂窝直连，或 LoRa/LoRaWAN 私有网关组网。"
        },
        {
          "h": "户外防护选项",
          "p": "部分型号可选 IP 防护等级外壳，适用于工业与户外环境；请按具体配置确认所需防护等级。"
        },
        {
          "h": "低功耗设计",
          "p": "部分传感终端采用低功耗处理器、优化的电源管理与可配置上报间隔，延长现场电池续航。"
        }
      ],
      "sysHeading": "系统能力",
      "system": [
        {
          "img": "solution/59-sys-0.png",
          "h": "远程配置",
          "p": "提供高度定制化的批量配置能力，支持多种格式和参数，简化远程设备配置流程，提升部署效率"
        },
        {
          "img": "solution/59-sys-1.png",
          "h": "自动化控制规则",
          "p": "当传感读数越过配置阈值时，规则自动调节相连设备（如制冷），无需人工干预。"
        },
        {
          "img": "solution/59-sys-2.png",
          "h": "规则联动",
          "p": "控制器按配置的规则响应传感数据变化，实现跨设备、跨站点的自动化响应"
        },
        {
          "img": "solution/59-sys-3.png",
          "h": "远程固件升级",
          "p": "支持对设备进行远程批量 OTA 固件升级，保持版本最新并减少现场维护"
        }
      ],
      "relHeading": "相关产品",
      "related": [
        "280",
        "281",
        "291",
        "290",
        "282"
      ],
      "scenHeading": "应用场景",
      "scenarios": [
        {
          "img": "solution/59-scen-0.jpg",
          "h": "风电与储能",
          "p": "对风机与储能系统进行状态监测，支持维护计划制定。"
        },
        {
          "img": "solution/59-scen-1.jpg",
          "h": "新能源场站",
          "p": "对新能源设施进行实时监测与控制。"
        },
        {
          "img": "solution/59-scen-2.jpg",
          "h": "发电厂",
          "p": "监测温度、压力、振动与设备状态，支持维护计划制定。"
        }
      ]
    },
    "57": {
      "id": "57",
      "banner": "solution/57-banner-0.jpg",
      "intro": [
        {
          "img": "solution/57-intro-0.jpg",
          "h": "行业挑战",
          "p": "随着全球经济的发展，越来越多的人口涌入城市，城市化率不断提高。这一过程带来了经济增长的同时，也伴随着交通拥堵、环境污染、资源短缺等一系列城市管理和服务的挑战。智慧城市的构建旨在应对这些挑战，以提高城市的可持续发展能力。信息技术的快速发展，尤其是物联网、大数据、云计算、人工智能等技术的成熟，为智慧城市的建设提供了强有力的支持。这些技术的应用使得城市管理者能够实时收集和分析大量数据，从而做出更加科学和高效的决策。智慧城市通过信息技术的应用，提升了城市管理的智能化水平，能够更好地应对城市化带来的挑战，改善市民的生活质量，促进可持续发展。"
        },
        {
          "img": "solution/57-intro-1.jpg",
          "h": "方案概述",
          "p": "智慧城市系统是利用现代信息技术和数据分析手段，提升城市管理效率、改善市民生活质量、促进可持续发展的综合性系统。它通过智能化的基础设施、数据驱动的决策支持和高效的服务体系，实现城市的智能管理与服务。智慧城市系统通过信息技术的应用，提升了城市管理的智能化水平，能够更好地应对城市化带来的挑战，改善市民的生活质量，促进可持续发展。随着技术的不断进步和应用的深入，智慧城市系统将在未来城市发展中发挥越来越重要的作用。"
        }
      ],
      "archHeading": "方案拓扑图",
      "archImgs": [
        "solution/57-arch-0.png"
      ],
      "featHeading": "核心优势",
      "features": [
        {
          "h": "户外防护选项",
          "p": "部分型号可选 IP 防护等级外壳，适用于工业与户外环境；请按具体配置确认所需防护等级。"
        },
        {
          "h": "低功耗设计",
          "p": "部分传感终端采用低功耗处理器、优化的电源管理与可配置上报间隔，延长现场电池续航。"
        },
        {
          "h": "灵活通信",
          "p": "按型号与现场条件选择 4G LTE 或 NB-IoT 蜂窝直连，或 LoRa/LoRaWAN 私有网关组网。"
        },
        {
          "h": "NFC 配置",
          "p": "部分设备支持 NFC 激活与本地配置，加快部署与维护。"
        }
      ],
      "sysHeading": "系统能力",
      "system": [
        {
          "img": "solution/57-sys-0.png",
          "h": "远程配置",
          "p": "提供高度定制化的批量配置能力，支持多种格式和参数，简化远程设备配置流程，提升部署效率"
        },
        {
          "img": "solution/57-sys-1.png",
          "h": "实时监测",
          "p": "宏太通过传感器采集数据并传输至云平台分析，平台分析趋势并标记异常读数，帮助团队安排维护、减少停机。"
        },
        {
          "img": "solution/57-sys-2.png",
          "h": "规则联动",
          "p": "控制器按配置的规则响应传感数据变化，实现跨设备、跨站点的自动化响应"
        },
        {
          "img": "solution/57-sys-3.png",
          "h": "远程固件升级",
          "p": "支持对设备进行远程批量 OTA 固件升级，保持版本最新并减少现场维护"
        }
      ],
      "relHeading": "相关产品",
      "related": [
        "286",
        "287",
        "270",
        "274",
        "281",
        "282",
        "283",
        "284"
      ],
      "scenHeading": "应用场景",
      "scenarios": [
        {
          "img": "solution/57-scen-0.jpg",
          "h": "车联网基础设施",
          "p": "以户外传感终端监测路侧与场站基础设施状态"
        },
        {
          "img": "solution/57-scen-1.jpg",
          "h": "物流与供应链",
          "p": "跨站点跟踪资产并监测仓储环境条件"
        },
        {
          "img": "solution/57-scen-2.jpg",
          "h": "城市管网",
          "p": "监测压力、泄漏、液位与运行工况。"
        },
        {
          "img": "solution/57-scen-3.jpg",
          "h": "水电设施",
          "p": "监测水位与设备状态。"
        },
        {
          "img": "solution/57-scen-4.jpg",
          "h": "住宅小区",
          "p": "监测住宅小区的环境条件与公共设施。"
        }
      ]
    },
    "66": {
      "id": "66",
      "banner": "solution/66-banner-0.jpg",
      "intro": [
        {
          "img": "solution/66-intro-0.jpg",
          "h": "行业挑战",
          "p": "近年来，全球旅游业蓬勃发展，旅游成为许多人生活中不可或缺的一部分。根据世界旅游组织（UNWTO）的数据，国际旅游人数持续增长，带动了各类旅游景区的建设和发展。这种快速增长对景区的管理和服务提出了更高的要求。智慧景区是利用现代信息技术、物联网、大数据、人工智能等手段，对旅游景区进行全面数字化、智能化管理和服务的综合性系统。随着旅游业的迅速发展和游客需求的多样化，智慧景区应运而生，旨在提升游客体验、提高管理效率和促进可持续发展。智慧景区通过现代信息技术的应用，提升了旅游管理的智能化水平，能够更好地满足游客的需求，优化资源配置，促进旅游业的可持续发展。"
        },
        {
          "img": "solution/66-intro-1.jpg",
          "h": "方案概述",
          "p": "智慧景区系统是基于现代信息技术、物联网、大数据、人工智能等手段，旨在提升旅游景区的管理效率和游客体验的综合性系统。它通过数字化、智能化的手段，实现对景区资源的全面监控和管理，满足游客日益增长的个性化和高质量的旅游需求智慧景区系统通过现代信息技术的应用，提升了旅游管理的智能化水平，能够更好地满足游客的需求，优化资源配置，促进旅游业的可持续发展。随着技术的不断进步和应用的深入，智慧景区系统将在未来的旅游行业中发挥越来越重要的作用。"
        }
      ],
      "archHeading": "方案拓扑图",
      "archImgs": [
        "solution/66-arch-0.png"
      ],
      "featHeading": "核心优势",
      "features": [
        {
          "h": "低功耗设计",
          "p": "部分传感终端采用低功耗处理器、优化的电源管理与可配置上报间隔，延长现场电池续航。"
        },
        {
          "h": "灵活通信",
          "p": "按型号与现场条件选择 4G LTE 或 NB-IoT 蜂窝直连，或 LoRa/LoRaWAN 私有网关组网。"
        },
        {
          "h": "NFC 配置",
          "p": "部分设备支持 NFC 激活与本地配置，加快部署与维护。"
        },
        {
          "h": "户外防护选项",
          "p": "部分型号可选 IP 防护等级外壳，适用于工业与户外环境；请按具体配置确认所需防护等级。"
        }
      ],
      "sysHeading": "系统能力",
      "system": [
        {
          "img": "solution/66-sys-0.png",
          "h": "故障定位",
          "p": "诊断功能帮助快速定位故障设备，降低维修时间与运维成本；支持设备状态监测与地图视图。"
        },
        {
          "img": "solution/66-sys-1.png",
          "h": "规则联动",
          "p": "控制器按配置的规则响应传感数据变化，实现跨设备、跨站点的自动化响应"
        },
        {
          "img": "solution/66-sys-2.png",
          "h": "告警通知",
          "p": "实现批量配置告警，统管理，自动化消警流程支持多条件触发告警并及时通知相关人员，全方位监控设备运行状态"
        },
        {
          "img": "solution/66-sys-3.png",
          "h": "远程固件升级",
          "p": "支持对设备进行远程批量 OTA 固件升级，保持版本最新并减少现场维护"
        }
      ],
      "relHeading": "相关产品",
      "related": [
        "283",
        "282",
        "290",
        "291",
        "281"
      ],
      "scenHeading": "应用场景",
      "scenarios": [
        {
          "img": "solution/66-scen-0.jpg",
          "h": "历史建筑",
          "p": "监测温湿度与结构倾角，支持保护性维护。"
        },
        {
          "img": "solution/66-scen-1.jpg",
          "h": "博物馆与馆藏",
          "p": "跟踪温湿度与烟雾，保护展品与馆藏。"
        },
        {
          "img": "solution/66-scen-2.jpg",
          "h": "考古遗址",
          "p": "监测露天遗址的环境条件与结构位移。"
        },
        {
          "img": "solution/66-scen-3.jpg",
          "h": "游客区域",
          "p": "监测客流与环境条件，支持景区运营。"
        }
      ]
    },
    "67": {
      "id": "67",
      "banner": "solution/67-banner-0.jpg",
      "intro": [
        {
          "img": "solution/67-intro-0.jpg",
          "h": "行业挑战",
          "p": "全球范围内，水资源的短缺已成为一个严重问题。随着人口增长和城市化进程的加速，水需求不断增加，而水资源的供给却受到气候变化、污染和过度开发等因素的影响，导致水资源的紧张。在这种背景下，如何有效管理和利用水资源成为各国政府和城市管理者面临的重要课题。传统的水务管理方式往往依赖人工监测和管理，信息传递不及时，决策依据不足，导致水资源的浪费和管理效率低下。此外，传统系统难以实时响应突发事件，如水管漏水、污染事件等，影响了水务服务的质量和安全性。智慧水务、水利是智慧城市建设的重要组成部分，旨在通过现代信息技术与数据分析手段，实现对水资源的高效管理、监测与服务。随着全球水资源短缺、污染加剧和城市化进程加速，传统水务管理面临诸多挑战，智慧水务应运而生。随着城市化进程的加快，水务系统面临的安全风险也在增加，如水污染、供水中断、自然灾害等。智慧水务、水利通过实时监测和数据分析，可以提高对潜在风险的识别和响应能力，保障水务、水利系统的安全和稳定运行"
        },
        {
          "img": "solution/67-intro-1.jpg",
          "h": "方案概述",
          "p": "智慧水务和水利系统是现代城市和区域水资源管理的重要组成部分，旨在通过信息技术和智能化手段，实现对水资源的高效管理、监测和利用。 智慧水务是利用现代信息技术（如物联网、大数据、云计算和人工智能等）对水资源进行全面监测、管理和服务的系统。其目标是提高水资源的利用效率、确保水质安全、降低水务管理成本，并提升用户的服务体验。 水利系统是指对水资源进行开发、利用、管理和保护的综合性工程和管理体系，包括水库、河流、灌溉系统、排水系统等。水利系统的目标是保障水安全、促进农业和工业用水、预防洪涝灾害等。 智慧水务和水利系统通过现代信息技术的应用，能够有效应对水资源管理中的挑战，提高水务服务的效率和安全性，促进可持续发展。随着技术的不断进步和应用的深入，这些系统将在未来的水资源管理中发挥越来越重要的作用。"
        }
      ],
      "archHeading": "方案拓扑图",
      "archImgs": [
        "solution/67-arch-0.png"
      ],
      "featHeading": "核心优势",
      "features": [
        {
          "h": "低功耗设计",
          "p": "部分传感终端采用低功耗处理器、优化的电源管理与可配置上报间隔，延长现场电池续航。"
        },
        {
          "h": "户外防护选项",
          "p": "部分型号可选 IP 防护等级外壳，适用于工业与户外环境；请按具体配置确认所需防护等级。"
        },
        {
          "h": "灵活通信",
          "p": "按型号与现场条件选择 4G LTE 或 NB-IoT 蜂窝直连，或 LoRa/LoRaWAN 私有网关组网。"
        },
        {
          "h": "NFC 配置",
          "p": "部分设备支持 NFC 激活与本地配置，加快部署与维护。"
        }
      ],
      "sysHeading": "系统能力",
      "system": [
        {
          "img": "solution/67-sys-0.png",
          "h": "远程配置",
          "p": "提供高度定制化的批量配置能力，支持多种格式和参数，简化远程设备配置流程，提升部署效率"
        },
        {
          "img": "solution/67-sys-1.png",
          "h": "实时监测",
          "p": "宏太通过传感器采集数据并传输至云平台分析，平台分析趋势并标记异常读数，帮助团队安排维护、减少停机。"
        },
        {
          "img": "solution/67-sys-2.png",
          "h": "规则联动",
          "p": "控制器按配置的规则响应传感数据变化，实现跨设备、跨站点的自动化响应"
        },
        {
          "img": "solution/67-sys-3.png",
          "h": "告警通知",
          "p": "实现批量配置告警，统管理，自动化消警流程支持多条件触发告警并及时通知相关人员，全方位监控设备运行状态"
        }
      ],
      "relHeading": "相关产品",
      "related": [
        "270",
        "274",
        "280",
        "281",
        "291"
      ],
      "scenHeading": "应用场景",
      "scenarios": [
        {
          "img": "solution/67-scen-0.jpg",
          "h": "水电大坝",
          "p": "监测大坝水位、位移/倾角与环境条件。"
        },
        {
          "img": "solution/67-scen-1.jpg",
          "h": "工业水厂",
          "p": "监测工艺参数与设备状态，支持维护计划制定。"
        },
        {
          "img": "solution/67-scen-2.jpg",
          "h": "水产养殖",
          "p": "监测水质与环境条件，支持养殖管理。"
        }
      ]
    }
  }
};
/** 方案详情页 SEO（标题/描述含核心关键词：outdoor 4G、NB-IoT、industrial IoT sensors 等） */
export const solutionSeo: Record<'en' | 'zh', Record<string, { name: string; title: string; desc: string }>> = {
 en: {
  "57": { name: "Smart City", title: "Smart City IoT Solution | Infrastructure | Hitelecom", desc: "Hitelecom smart city IoT solution: outdoor 4G and NB-IoT sensors for structural health monitoring, environmental monitoring and urban infrastructure management with IoT cloud integration." },
  "58": { name: "Industrial IoT", title: "Industrial IoT Solution | Equipment Monitoring | Hitelecom", desc: "Hitelecom smart industrial IoT solution: industrial IoT sensors and outdoor 4G sensor terminals for real-time equipment monitoring, predictive maintenance and smart factory management." },
  "59": { name: "Smart Energy", title: "Smart Energy IoT Solution | Condition Monitoring | Hitelecom", desc: "Hitelecom smart energy IoT solution: wireless pressure, temperature and radar level sensors with 4G/NB-IoT connectivity for remote energy monitoring and management." },
  "60": { name: "Smart Industrial Parks", title: "Smart Industrial Park IoT Solution | Hitelecom", desc: "Hitelecom smart park IoT solution: NB-IoT sensors and IoT cloud integration for park security, environmental monitoring and intelligent facility management." },
  "64": { name: "Smart Campus", title: "Smart Campus IoT Solution | Air Quality | Hitelecom", desc: "Hitelecom smart campus IoT solution: air quality sensors, temperature and humidity sensors with IoT cloud platform for safe, efficient campus management." },
  "65": { name: "Smart Agriculture", title: "Smart Agriculture IoT Solution | Soil Monitoring | Hitelecom", desc: "Hitelecom smart agriculture IoT solution: soil moisture sensors and outdoor 4G sensor terminals for precision agriculture and environmental monitoring." },
  "66": { name: "Tourism and Heritage Sites", title: "Tourism & Heritage Site IoT Monitoring | Hitelecom", desc: "Hitelecom smart scenic area IoT solution: outdoor 4G and NB-IoT wireless sensors with IoT cloud integration for visitor safety, environment and facility monitoring." },
  "67": { name: "Smart Water", title: "Smart Water IoT Solution | Level & Pressure | Hitelecom", desc: "Hitelecom smart water IoT solution: radar level sensors, wireless pressure sensors and NB-IoT terminals for remote water level, pressure and quality monitoring." }
 },
 zh: {
  "57": { name: "智慧城市解决方案", title: "智慧城市物联网解决方案 | 结构健康与环境监测 - 宏太智慧", desc: "宏太智慧城市物联网解决方案：基于户外4G传感器与NB-IoT传感器，实现结构健康监测、环境监测与城市基础设施智能化管理，支持IoT云平台集成。" },
  "58": { name: "智慧工业解决方案", title: "智慧工业物联网解决方案 | 工厂设备实时监测 - 宏太智慧", desc: "宏太智慧工业物联网解决方案：工业物联网传感器与户外4G传感终端，实现设备实时在线监测、预测性维护与智能工厂管理。" },
  "59": { name: "智慧能源解决方案", title: "智慧能源物联网解决方案 | 无线传感监测 - 宏太智慧", desc: "宏太智慧能源物联网解决方案：无线压力传感器、温度传感器与雷达液位传感器，通过4G/NB-IoT实现能源远程监测与管理。" },
  "60": { name: "智慧园区解决方案", title: "智慧园区物联网解决方案 | NB-IoT传感器与云平台 - 宏太智慧", desc: "宏太智慧园区物联网解决方案：NB-IoT传感器与IoT云平台集成，实现园区安防、环境监测与设施智能化管理。" },
  "64": { name: "智慧校园解决方案", title: "智慧校园物联网解决方案 | 空气质量与环境传感器 - 宏太智慧", desc: "宏太智慧校园物联网解决方案：空气质量传感器、温湿度传感器结合IoT云平台，打造安全高效的智慧校园管理。" },
  "65": { name: "智慧农业解决方案", title: "智慧农业物联网解决方案 | 土壤水分监测 - 宏太智慧", desc: "宏太智慧农业物联网解决方案：土壤水分传感器与户外4G传感终端，实现精准农业与环境监测。" },
  "66": { name: "智慧景区解决方案", title: "智慧景区物联网解决方案 | 宏太智慧工业物联网传感器", desc: "宏太智慧景区物联网解决方案：户外4G与NB-IoT无线传感器结合IoT云平台，实现游客安全、环境与设施监测。" },
  "67": { name: "智慧水务解决方案", title: "智慧水务物联网解决方案 | 雷达液位与压力监测 - 宏太智慧", desc: "宏太智慧水务物联网解决方案：雷达液位传感器、无线压力传感器与NB-IoT终端，实现水位、压力与水质远程监测。" }
 }
};
