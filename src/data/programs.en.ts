// 中文维护说明：十项监测任务在构建时完整输出为静态 HTML，名称同步用于询盘与结构化数据。
// 介绍先说明测量机制和运营用途；安装、验证及工程边界保留在各自字段，型号与服务范围按项目确定。
export const programs = [
  {
    id: 'rack-tilt',
    name: 'Warehouse Rack Tilt Monitoring',
    category: ['built', 'industrial'],
    icon: 'warehouse',
    object: 'Monitor changes in warehouse rack inclination with wireless sensors on rack uprights. Baseline comparisons and threshold notifications help warehouse teams identify the rack bay that needs inspection.',
    measure: 'Local inclination and change from the installation baseline at each numbered rack point.',
    kit: 'Wireless tilt terminals, cellular or compatible LoRa connectivity, and the monitoring platform. Complementary temperature/humidity terminals cover designated storage zones.',
    placement: 'Fasten sensors to rack uprights with stable brackets; record orientation, point ID and baseline after installation.',
    action: 'Use point-linked alerts to inspect the relevant rack bay and log findings with the maintenance team.',
    pilot: 'Check mounting rigidity, baseline repeatability, coverage and notification delivery in one representative aisle.',
    boundary: 'Combine local tilt trends with engineering inspection when assessing rack loading or structural condition.',
    products: [
      { name: 'Wireless Tilt Sensors', url: 'https://www.hitelecom.com/product/tilt-sensor' }
    ]
  },
  {
    id: 'pole-tower',
    name: 'Pole & Tower Tilt Monitoring',
    category: ['built', 'industrial'],
    icon: 'tower',
    object: 'Track local inclination on lighting poles, sign supports and communication towers. A baseline for each monitoring point gives infrastructure teams a consistent record for reviewing tilt changes and prioritizing inspections.',
    measure: 'Local inclination, threshold events and changes over time at identified structural members.',
    kit: 'Outdoor wireless tilt sensors, cellular terminals or a compatible LoRa gateway, and trend and notification software.',
    placement: 'Mount on approved members using rigid brackets; document sensor orientation, location and initial readings.',
    action: 'Review the point history and dispatch inspection to the structure associated with a threshold event.',
    pilot: 'Compare sensor trends with site observations and reference checks; test mounting stability and outdoor communication coverage.',
    boundary: 'Assess foundations and overall structural condition through engineering inspection alongside local inclination records.',
    products: [
      { name: 'Wireless Tilt Sensors', url: 'https://www.hitelecom.com/product/tilt-sensor' }
    ]
  },
  {
    id: 'pump-condition',
    name: 'Pump & Motor Condition Monitoring',
    category: ['industrial'],
    icon: 'chart',
    object: 'Bring periodic vibration, temperature and pressure measurements from pumps and motors into a common monitoring view. Maintenance teams can compare trends under documented operating conditions and investigate departures from the baseline.',
    measure: 'Periodic RMS vibration velocity, with temperature and pressure measurements at the relevant pump-system points.',
    kit: 'External vibration probes, wireless terminals and condition trend views; temperature and pressure sensors extend the measurement scope.',
    placement: 'Use rigid vibration mounting points, stable probe contact and pressure connections rated for the pipework.',
    action: 'Review trend changes against load and operating records, then target maintenance inspection to the affected equipment.',
    pilot: 'Compare measurements with reference instruments across representative operating states and record the maintenance observations.',
    boundary: 'Use targeted inspections or diagnostic measurements to determine the cause of a condition trend change.',
    products: [
      { name: 'Vibration Sensors', url: 'https://www.hitelecom.com/product/vibration-sensor' },
      { name: 'Temperature Sensors', url: 'https://www.hitelecom.com/product/temperature-sensor' },
      { name: 'Pressure Sensors', url: 'https://www.hitelecom.com/product/pressure-sensor' }
    ]
  },
  {
    id: 'cold-storage',
    name: 'Cold Storage Temperature Monitoring',
    category: ['built', 'industrial'],
    icon: 'temperature',
    object: 'Monitor temperature in cold rooms and temperature-sensitive storage zones, with humidity where required. Point-based histories and threshold notifications help storage teams investigate excursions and document their response.',
    measure: 'Timestamped temperature histories and excursion events at each storage point; relative humidity where fitted.',
    kit: 'Wireless temperature or temperature-humidity terminals, suitable probes, connectivity, history views and threshold notifications.',
    placement: 'Position probes around the storage layout and temperature mapping findings, away from unrepresentative local influences.',
    action: 'Review the excursion record, inspect refrigeration and doors, and follow the procedure for affected stock.',
    pilot: 'Compare readings with a reference instrument and test notification delivery and the storage team response.',
    boundary: 'Specify probe range, calibration and data retention to suit the stored goods and operating procedure.',
    products: [
      { name: 'Temperature Sensors', url: 'https://www.hitelecom.com/product/temperature-sensor' },
      { name: 'Temperature & Humidity Sensors', url: 'https://www.hitelecom.com/product/temperature-humidity-sensor' }
    ]
  },
  {
    id: 'pipe-temperature',
    name: 'Pipe Surface Temperature Monitoring',
    category: ['industrial'],
    icon: 'temperature',
    object: 'Measure the outer surface temperature of utility and process pipework using contact probes and wireless terminals. Trends and threshold events direct attention to temperature deviations at identifiable line sections.',
    measure: 'Contact surface temperature and changes at numbered measurement points along the pipework.',
    kit: 'Contact temperature probes, wireless terminals, mounting clamps and temperature trend and notification software.',
    placement: 'Clamp probes against prepared pipe surfaces with stable contact and an insulation arrangement suited to the application.',
    action: 'Inspect the associated line section, probe contact, insulation and operating conditions when readings depart from expected trends.',
    pilot: 'Compare representative pipe sections with a reference method through normal operating temperatures.',
    boundary: 'Surface temperature differs from fluid temperature; contact quality, pipe material and insulation influence the reading.',
    products: [
      { name: 'Temperature Sensors', url: 'https://www.hitelecom.com/product/temperature-sensor' }
    ]
  },
  {
    id: 'tank-level',
    name: 'Tank & Sump Level Monitoring',
    category: ['industrial', 'environment'],
    icon: 'water',
    object: 'Monitor liquid levels in tanks, sumps and storage vessels using a sensor matched to the installation. Level histories and high or low threshold notifications help operators review filling, drainage and supply.',
    measure: 'Liquid level trends and high or low threshold events at individual vessels.',
    kit: 'Liquid level or radar distance sensors, wireless connectivity and vessel-based history and notifications.',
    placement: 'Use a suitable immersion point or unobstructed top mounting position, accounting for vessel geometry and internal equipment.',
    action: 'Inspect filling, drainage or supply at the identified vessel and coordinate the appropriate site response.',
    pilot: 'Compare readings with known levels across the operating range; test threshold notifications and communication coverage.',
    boundary: 'Liquid properties, foam and obstructions determine sensor suitability; pump or valve control requires its own design.',
    products: [
      { name: 'Liquid Level Sensors', url: 'https://www.hitelecom.com/product/liquid-level-sensor' },
      { name: 'Radar Distance Sensors', url: 'https://www.hitelecom.com/product/radar-distance-sensor' }
    ]
  },
  // radar-distance:start
  {
    "id": "radar-distance",
    "name": "Radar Distance Monitoring",
    "category": [
      "industrial",
      "environment"
    ],
    "icon": "sensor",
    "object": "Measure non-contact distance to a selected surface or target. Defined references let teams review surface levels or target positions from the reported readings.",
    "measure": "Distance along the radar measuring axis; derived level where a fixed installation datum is defined.",
    "kit": "Wireless radar distance terminal, rigid mounting bracket, supported connectivity and distance or level trend views.",
    "placement": "Use a rigid mount with a clear view of the selected surface or target; define the measurement axis, datum and expected distance span.",
    "action": "Review distance or derived level trends, identify threshold events and inspect the associated target and installation.",
    "pilot": "Compare readings with known distances across the operating span; check target return, repeatability, timestamps and notification delivery.",
    "boundary": "Derived level requires a defined datum. Movement observations require a suitable reference; range, target suitability and measurement performance depend on the selected configuration.",
    "products": [
      {
        "name": "Radar Distance Sensors",
        "url": "https://www.hitelecom.com/product/radar-distance-sensor"
      }
    ]
  },
  // radar-distance:end
  {
    id: 'room-air',
    name: 'Indoor Air Quality Monitoring',
    category: ['built'],
    icon: 'building',
    object: 'Monitor air quality and comfort conditions across offices, classrooms and shared indoor spaces. Room-level trends from the device measurement channels help facility teams assess ventilation and investigate changing indoor conditions.',
    measure: 'Pollutant and comfort measurements available in the device, grouped by room and reporting time.',
    kit: 'Indoor air quality sensors, cellular or compatible gateway connectivity, room dashboards and threshold notifications.',
    placement: 'Mount within representative occupied zones, away from supply vents, direct sunlight and localized emission sources.',
    action: 'Review room trends and occupancy context before checking ventilation and possible pollutant sources.',
    pilot: 'Compare occupied and unoccupied periods, check representative readings and test the facilities notification workflow.',
    boundary: 'Measurement channels depend on the model; building controls and HVAC integration require interface assessment.',
    products: [
      { name: 'Indoor Air Quality Sensors', url: 'https://www.hitelecom.com/product/air-quality-sensor' },
      { name: 'Temperature & Humidity Sensors', url: 'https://www.hitelecom.com/product/temperature-humidity-sensor' }
    ]
  },
  {
    id: 'asset-tracking',
    name: 'Outdoor Asset Tracking',
    category: ['industrial', 'environment'],
    icon: 'pin',
    object: 'Locate mobile equipment and reusable outdoor assets using GNSS tracking terminals. Reported positions and location history help operations teams coordinate collection, recovery and verification across yards, work sites and operating areas.',
    measure: 'Reported GNSS positions and location history across outdoor operating areas.',
    kit: 'GNSS tracking terminals, supported cellular connectivity and map-based location history software.',
    placement: 'Secure trackers with adequate antenna sky view and protection from handling damage.',
    action: 'Use the latest reported position and timestamp to coordinate collection, recovery or site verification.',
    pilot: 'Follow representative routes and check position availability, reporting intervals and mobile network coverage.',
    boundary: 'Location availability depends on sky view and connectivity; indoor or rack-level positioning uses different technology.',
    products: [
      { name: 'Asset Tracking Sensors', url: 'https://www.hitelecom.com/product/asset-tracking-sensor' }
    ]
  },
  {
    id: 'soil-irrigation',
    name: 'Soil Moisture Monitoring for Irrigation',
    category: ['environment'],
    icon: 'leaf',
    object: 'Follow soil moisture in representative crop root zones through rainfall and irrigation cycles. Field readings give growers a site-specific basis for reviewing watering schedules alongside crop needs and local conditions.',
    measure: 'Soil moisture trends, plus additional soil measurements supported by the probe configuration.',
    kit: 'Soil probes, wireless terminals, field connectivity and monitoring views organized by management zone.',
    placement: 'Place probes at representative root-zone depths with good soil contact; record depth and soil conditions.',
    action: 'Review moisture response after watering and rainfall before adjusting the irrigation schedule.',
    pilot: 'Compare readings with a field reference through irrigation cycles across representative management zones.',
    boundary: 'Interpret readings for soil type, salinity and installation conditions; irrigation control requires separate equipment and validation.',
    products: [
      { name: 'Soil Sensors', url: 'https://www.hitelecom.com/product/soil-moisture-sensor' }
    ]
  }
] as const;
