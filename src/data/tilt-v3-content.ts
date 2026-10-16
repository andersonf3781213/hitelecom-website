/** Public content is based on the live Hitelecom tilt page and the approved 48-scene brief.
 * Configuration values are model-specific. Do not propagate them to every H Series model.
 */
export const page = {
 title: 'Wireless Tilt Sensor & Inclinometer | Hitelecom H Series',
 description: 'Wireless tilt sensors for structures, poles, towers and racks. Compare H310-TS180C specifications, connectivity and platform integration. Request a quote.',
 hero: 'The Hitelecom H Series wireless tilt sensor is an inclinometer that measures changes in angle at its mounting point. It is designed for monitoring poles, towers, bridge elements and warehouse rack uprights. Depending on the model, readings are transmitted over 4G, NB-IoT or LoRa for remote monitoring and configured alerts. Choose the model by measurement performance, reporting requirements, installation conditions and platform compatibility.',
 model: 'H310-TS180C',
 canonical: 'https://www.hitelecom.com/product/tilt-sensor',
 email: 'sales@hitelecom.cn',
 datasheet: 'https://www.hitelecom.com/downloads/h310-ts180c-tilt-sensor-datasheet.pdf',
};
export const features = [
 { icon: 'angle', title: 'Choose your measurement grade', text: 'H310-TS180C accuracy grades: 0.1°, 0.01° or 0.001°. Select the configuration for your working range and site conditions.' },
 { icon: 'shield', title: 'Match the outdoor enclosure', text: 'Metal IP68 or plastic IP66 enclosure options, selected with the mounting arrangement and installation environment.' },
 { icon: 'signal', title: 'Connect across your sites', text: '4G, NB-IoT and LoRa configurations provide different routes from the measurement point to your monitoring platform.' },
 { icon: 'nfc', title: 'Configure locally with NFC', text: 'NFC activation and local device configuration support installation and commissioning.' },
 { icon: 'update', title: 'Update firmware remotely', text: 'OTA firmware updates support device maintenance after installation.' },
 { icon: 'bell', title: 'Plan the alert workflow', text: 'Define the angle reference, threshold and required notification time for the selected device and platform configuration.' },
];
export const specifications = [
 ['Tilt range', '−90° to +90°'],
 ['Accuracy', '0.1° / 0.01° / 0.001° — grades per configuration'],
 ['Resolution', '0.01° / 0.001° / 0.0005° — grades per configuration'],
 ['Protocol', 'MQTT — selected configuration'],
 ['Operating temperature', '−40°C to +85°C'],
 ['Storage temperature', '−40°C to +85°C'],
 ['Battery capacity', '19,000 mAh; 38,000 mAh option'],
 ['Ingress protection', 'Metal: IP68 · Plastic: IP66'],
 ['Installation', 'Mounting lugs · Pole clamp · Slotted mount'],
 ['Configuration', 'NFC activation; OTA firmware upgrade'],
];
export const projectSteps = [
 { title: 'What you need to observe', text: 'Asset type, measurement points, expected angle range and the smallest change your project needs to assess.' },
 { title: 'Where it will operate', text: 'Country, site temperatures, mounting surface, weather exposure and available network coverage.' },
 { title: 'How data should reach you', text: 'Measurement interval, reporting schedule, required notification time and destination platform.' },
 { title: 'What you plan to deploy', text: 'Estimated quantity, sample needs, OEM or branding requirements and deployment schedule.' },
];
export const faqs = [
  {
    "question": "What accuracy and resolution do I need for tilt monitoring?",
    "answer": [
      "Choose the accuracy grade around the smallest angle change your project needs to assess, the working range and the site temperature. Accuracy describes agreement with a reference; resolution is the smallest reported increment.",
      "H310-TS180C offers accuracy grades of 0.1°, 0.01° or 0.001° and resolution grades of 0.01°, 0.001° or 0.0005°, depending on configuration. Specify accuracy and resolution separately, and request the measurement conditions for the selected grade. This gives you a clear basis for model selection and commissioning."
    ],
    "link": "#specifications"
  },
  {
    "question": "How do I mount the sensor and establish a baseline?",
    "answer": [
      "Secure the sensor to the element whose angle you want to track, using a mounting method suited to that location. H310-TS180C lists mounting lugs, pole clamps and slotted mounting options. Record the sensor ID, location, axis orientation and initial angle after installation.",
      "Compare later readings with that reference. For example, 0.30° followed by 0.45° represents a +0.15° change on the same axis. Keep a new reference record whenever a sensor is repositioned, and include site conditions when reviewing the trend."
    ],
    "link": "#overview"
  },
  {
    "question": "Should I choose 4G, NB-IoT or LoRa?",
    "answer": [
      "Choose the radio around coverage, site layout and reporting requirements. Cellular configurations suit locations served by a compatible operator; check regional bands and signal at the mounting point. For NB-IoT, also evaluate operator availability, reporting frequency and the required power profile.",
      "A LoRa configuration needs a compatible receiver or gateway and an onward connection to the platform. Confirm the actual protocol and regional settings, including any LoRaWAN requirement. Share your installation country, number of points and site layout so the complete data route can be specified."
    ],
    "link": "#integration"
  },
  {
    "question": "Can readings connect to our own monitoring platform?",
    "answer": [
      "H310-TS180C lists MQTT support. For the selected configuration, agree the broker endpoint, supported authentication, topic structure and device identifiers with your platform team. Check a sample payload for angle fields, axis labels, units and timestamps.",
      "A LoRa deployment also needs a compatible receiver or gateway and an agreed onward interface. During commissioning, verify that a reading reaches your platform with the correct device and time, then test the intended notification workflow. Include device-management requirements in the integration brief."
    ],
    "link": "#integration"
  },
  {
    "question": "How do the 1-minute measurement and 4-hour reporting intervals work?",
    "answer": [
      "In the H310-TS180C operating profile stated by Hitelecom, the sensor measures once per minute and reports on a four-hour schedule: 240 measurement cycles between scheduled reports. Measurement and reporting are separate parts of the operating profile.",
      "Agree the required report content—such as the latest reading, a summary or individual readings—and confirm the format and retention supported by the selected configuration. If your project needs notifications between scheduled reports, specify that response time and confirm the supported event-reporting behaviour during configuration and commissioning."
    ],
    "link": "#operating-profile"
  },
  {
    "question": "What supports the typical 10-year service-life figure?",
    "answer": [
      "Hitelecom states a typical 10-year service life for the H310-TS180C profile using one-minute measurements and four-hour reporting. Evaluate that figure with the supplied battery capacity, enabled functions, expected signal conditions and site temperature.",
      "Hitelecom also reports laboratory capability exceeding five million measurement cycles. This laboratory statement describes measurement-cycle capability separately from the service-life estimate. For project planning, request the battery configuration and operating assumptions that match your measurement, reporting and notification requirements."
    ],
    "link": "#operating-profile"
  },
  {
    "question": "Which enclosure and mounting details should I specify for an outdoor site?",
    "answer": [
      "H310-TS180C lists metal IP68 and plastic IP66 enclosure options, with an operating temperature range of −40°C to +85°C. Select the supplied assembly around the actual installation, including water exposure, temperature and mounting access.",
      "For poles or tower members, provide dimensions and the intended fixing position. For walls or equipment frames, a surface photo helps define the bracket arrangement. Include local coverage and any corrosive exposure in the brief so the enclosure, fixing method and wireless position can be reviewed together."
    ],
    "link": "#specifications"
  },
  {
    "question": "How should project alert thresholds and notification times be defined?",
    "answer": [
      "Start with the monitoring plan for the asset. The responsible engineer defines the angle reference and change that should trigger a review; the device and platform configuration determine how the rule and notification are implemented.",
      "Record the measurement point, axis, reference reading, trigger condition, recipient and intended response. Specify the required time from detection to notification, then confirm whether scheduled reporting or a supported event-reporting configuration meets it. Test the complete path during commissioning so the site team knows which asset requires attention and when."
    ],
    "link": "#project-enquiry"
  }
] as const;
export const legacyApplicationLinks: Record<string, string> = {
 'warehouse-racking': 'warehouse-racking',
 'street-light-poles': 'street-light-poles',
 'transmission-towers': 'transmission-towers',
 'telecom-towers': 'telecom-towers',
 'billboard-support-poles': 'billboard-support-poles',
 'bridge-elements': 'bridge-elements',
 'railway-infrastructure': 'railway-infrastructure',
 'tunnel-monitoring': 'tunnel-monitoring',
 'metro-and-subway-structures': 'metro-and-subway-structures',
 'slopes-and-embankments': 'engineered-cut-slopes',
 'sea-dikes-dams-and-reservoir-slopes': 'sea-dike-facing-elements',
 'construction-and-temporary-structures': 'construction-and-temporary-structures',
 'heritage-buildings-and-ancient-pagodas': 'heritage-buildings-and-ancient-pagodas',
 'structurally-distressed-buildings': 'structurally-distressed-buildings',
 'urban-trees': 'urban-trees',
 'large-equipment-and-injection-moulding-machines': 'large-equipment-and-injection-moulding-machines',
};

export const faqItems = faqs.map(item => ({ question: item.question, answer: item.answer.join("\n\n") }));
