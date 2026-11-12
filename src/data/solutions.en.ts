// 中文维护说明：正文在构建时输出为HTML；修改这里即可同步页面和结构化数据。
export const site = {
  "canonical": "https://www.hitelecom.com/solution",
  "title": "Wireless Industrial Monitoring Solutions | Hitelecom",
  "description": "Wireless monitoring for rack tilt, pump condition, cold storage, tank levels and environmental data. Sensors, gateways, cloud software and OEM/ODM integration.",
  "ogImage": "https://www.hitelecom.com/assets/solutions/og-solutions.webp",
  "email": "sales@hitelecom.cn"
} as const;

export const industries = [
  {
    "name": "Smart Warehousing",
    "description": "Rack inclination, storage conditions, water presence and selected asset locations.",
    "url": "#warehousing",
    "category": [
      "built",
      "industrial"
    ],
    "icon": "warehouse",
    "featured": true
  },
  {
    "name": "Industrial Equipment & Process Monitoring",
    "description": "Temperature, pressure and vibration across equipment and plant utilities.",
    "url": "https://www.hitelecom.com/solution/show/id/58",
    "category": [
      "industrial"
    ],
    "icon": "factory",
    "featured": false
  },
  {
    "name": "Water & Pump Stations",
    "description": "Pressure, level and equipment conditions across distributed water assets.",
    "url": "https://www.hitelecom.com/solution/show/id/67",
    "category": [
      "industrial",
      "environment"
    ],
    "icon": "water",
    "featured": false
  },
  {
    "name": "Urban Infrastructure",
    "description": "Tilt and environmental monitoring for poles, structures and roadside assets.",
    "url": "https://www.hitelecom.com/solution/show/id/57",
    "category": [
      "built"
    ],
    "icon": "tower",
    "featured": false
  },
  {
    "name": "Energy Assets",
    "description": "Selected structural, thermal and equipment conditions around energy facilities.",
    "url": "https://www.hitelecom.com/solution/show/id/59",
    "category": [
      "industrial"
    ],
    "icon": "energy",
    "featured": false
  },
  {
    "name": "Buildings & Campuses",
    "description": "Indoor air, temperature, humidity and water presence in facility areas.",
    "url": "https://www.hitelecom.com/solution/show/id/64",
    "category": [
      "built"
    ],
    "icon": "building",
    "featured": false
  },
  {
    "name": "Heritage & Visitor Sites",
    "description": "Microclimate and local structural monitoring for collections and historic settings.",
    "url": "https://www.hitelecom.com/solution/show/id/66",
    "category": [
      "built",
      "environment"
    ],
    "icon": "heritage",
    "featured": false
  },
  {
    "name": "Agriculture & Irrigation",
    "description": "Soil, weather and water-level measurements to inform field management.",
    "url": "https://www.hitelecom.com/solution/show/id/65",
    "category": [
      "environment"
    ],
    "icon": "leaf",
    "featured": false
  },
  {
    "name": "Industrial Parks & Sites",
    "description": "Environmental and supported facility data from multiple buildings and remote points.",
    "url": "https://www.hitelecom.com/solution/show/id/60",
    "category": [
      "industrial",
      "built"
    ],
    "icon": "park",
    "featured": false
  }
] as const;

export const featuredApplications = [
  {
    "name": "Warehouse Rack Monitoring",
    "description": "Follow inclination at selected rack uprights. Add storage-condition monitoring where the environment matters.",
    "url": "#warehousing",
    "imageKey": "warehouse-hero",
    "alt": "Application illustration of pallet racks along a warehouse aisle",
    "label": "01 / WAREHOUSING",
    "tags": [
      "Tilt",
      "Temperature & humidity",
      "Water presence"
    ],
    "cta": "Explore warehouse monitoring"
  },
  {
    "name": "Pole & Tower Tilt Monitoring",
    "description": "Track local inclination against an installation baseline. Use trends to help prioritize inspections across sites.",
    "url": "https://www.hitelecom.com/solution/show/id/57",
    "imageKey": "tower-card",
    "alt": "Application illustration of a telecom tower and service buildings",
    "label": "02 / INFRASTRUCTURE",
    "tags": [
      "Poles",
      "Towers",
      "Support structures"
    ],
    "cta": "Explore infrastructure monitoring"
  },
  {
    "name": "Water & Pump Station Monitoring",
    "description": "Connect pressure, level and selected equipment-condition measurements to a shared monitoring view.",
    "url": "https://www.hitelecom.com/solution/show/id/67",
    "imageKey": "pump-card",
    "alt": "Application illustration of an industrial pump room with motors and pipework",
    "label": "03 / WATER SYSTEMS",
    "tags": [
      "Pressure & level",
      "Vibration",
      "Temperature"
    ],
    "cta": "Explore water monitoring"
  }
] as const;

export const warehouseTasks = [
  {
    "name": "Rack inclination",
    "icon": "tilt",
    "text": "Follow local angle changes at selected rack uprights against the commissioning baseline to support inspection review. Mounting points and review thresholds are defined for the site.",
    "links": [
      {
        "name": "Explore wireless tilt sensors",
        "url": "https://www.hitelecom.com/product/tilt-sensor"
      }
    ]
  },
  {
    "name": "Storage & cold chain conditions",
    "icon": "temperature",
    "text": "Monitor temperature and humidity with wireless terminals for remote reporting, or local data loggers for offline records, according to the selected model.",
    "links": [
      {
        "name": "Explore temperature & humidity sensors",
        "url": "https://www.hitelecom.com/product/temperature-humidity-sensor"
      },
      {
        "name": "Explore local data loggers",
        "url": "https://www.hitelecom.com/product/temperature-humidity-data-logger"
      }
    ]
  },
  {
    "name": "Water presence",
    "icon": "water",
    "text": "As a custom project, detect water at selected vulnerable locations and use configured alerts to help direct inspection. Select detection points and mounting arrangements for the locations at risk.",
    "links": [
      {
        "name": "Explore water leak sensors",
        "url": "https://www.hitelecom.com/product/water-leakage-sensor"
      }
    ]
  },
  {
    "name": "Asset location",
    "icon": "pin",
    "text": "Review reported locations for selected mobile assets using a tracker and positioning method suited to the route, coverage and installation. Indoor positioning capability is assessed for the project.",
    "links": [
      {
        "name": "Explore asset tracking",
        "url": "https://www.hitelecom.com/product/asset-tracking-sensor"
      }
    ]
  }
] as const;

export const monitoringTopics = [
  {
    "name": "Tilt & local rotation",
    "icon": "tilt",
    "text": "Observe angle changes at defined mounting points.",
    "links": [
      {
        "name": "Wireless tilt sensors",
        "url": "https://www.hitelecom.com/product/tilt-sensor"
      }
    ]
  },
  {
    "name": "Vibration & equipment condition",
    "icon": "chart",
    "text": "Match the frequency range and measurement to the asset.",
    "links": [
      {
        "name": "Vibration sensors",
        "url": "https://www.hitelecom.com/product/vibration-sensor"
      }
    ]
  },
  {
    "name": "Temperature, humidity & air",
    "icon": "temperature",
    "text": "Track the environmental conditions your site needs.",
    "links": [
      {
        "name": "Temperature & humidity",
        "url": "https://www.hitelecom.com/product/temperature-humidity-sensor"
      },
      {
        "name": "Air quality",
        "url": "https://www.hitelecom.com/product/air-quality-sensor"
      }
    ]
  },
  {
    "name": "Pressure, distance & level",
    "icon": "water",
    "text": "Connect measurements across pipes, tanks and open channels.",
    "links": [
      {
        "name": "Pressure",
        "url": "https://www.hitelecom.com/product/pressure-sensor"
      },
      {
        "name": "Radar distance",
        "url": "https://www.hitelecom.com/product/radar-distance-sensor"
      },
      {
        "name": "Level",
        "url": "https://www.hitelecom.com/product/liquid-level-sensor"
      }
    ]
  },
  {
    "name": "Asset location",
    "icon": "pin",
    "text": "Review reported positions using a suitable tracking configuration.",
    "links": [
      {
        "name": "Asset tracking",
        "url": "https://www.hitelecom.com/product/asset-tracking-sensor"
      }
    ]
  },
  {
    "name": "VOCs & selected gases",
    "icon": "sensor",
    "text": "Specify the target gas, range and operating environment.",
    "links": [
      {
        "name": "TVOC",
        "url": "https://www.hitelecom.com/product/tvoc-sensor"
      },
      {
        "name": "Custom gases",
        "url": "https://www.hitelecom.com/product/custom-gas-sensor"
      }
    ]
  }
] as const;

export const faqs = [
  {
    question: 'Does every monitoring point need a gateway?',
    answer: '4G LTE and NB-IoT terminals use a supported operator network and do not normally need a local LoRa gateway. A LoRa installation uses a compatible receiver or gateway. Gateway backhaul and any network-server role depend on the supplied device protocol and platform architecture.'
  },
  {
    question: 'How should we choose cellular or LoRa connectivity?',
    answer: 'Cellular suits dispersed assets where direct operator-network access is available. A local LoRa network can serve grouped points around a gateway. The decision depends on regional radio support, site coverage, obstructions, gateway power, backhaul and the required reporting profile.'
  },
  {
    question: 'Can field data be integrated with our platform?',
    answer: 'Hitelecom supports MQTT and API integration routes for compatible devices and systems. An interface review defines authentication, device IDs, payload fields, units, timestamps and destination behavior. Public or private Hitelecom Cloud deployment is another option; each project uses the supported architecture.'
  },
  {
    question: 'How do measurement, reporting and alert intervals differ?',
    answer: 'The measurement interval determines when the device takes a reading; the reporting interval determines scheduled transmission. A configured threshold can trigger an event report. Notification delivery also depends on network availability and the platform rule, so these timings are specified separately.'
  },
  {
    question: 'What can be customized through OEM / ODM?',
    answer: 'Development can cover sensing elements, external probes, radio modules, power design, enclosures, mounting, firmware, branding and platform interfaces. Technical review establishes feasibility, prototype requirements and validation scope before production. Device, software and engineering-service scope is defined in the proposal.'
  },
  {
    question: 'What information is needed for a solution proposal?',
    answer: 'Provide the asset or environment, measurement range, installation country, approximate point count and preferred data destination. Site photographs, available power and connectivity help define the configuration. For acceptance planning, include the intended operating decision and the proposed verification criteria.'
  }
] as const;

export const projectSteps = [
  { title: 'Map the measurement points', text: 'Assign asset and point IDs, define the quantities and ranges, and link each measurement to its operating purpose.' },
  { title: 'Install sensors and connectivity', text: 'Fit probes and terminals, establish the power supply and configure the cellular connection or compatible gateway.' },
  { title: 'Commission data and alerts', text: 'Compare reference readings, check units and timestamps, and test communication and configured notifications at the installation points.' },
  { title: 'Handover for operation', text: 'Document point locations, device settings and checks, with clear inspection responsibilities and maintenance access.' }
] as const;
