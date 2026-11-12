// V8 文案：以测量对象、输出数据和运营用途解释方案；量程与功能按型号确认。
export const taskRows = [
  { programId:'rack-tilt', name:'Warehouse rack tilt', measurement:'Local inclination relative to the installation baseline.', product:{name:'Wireless tilt sensors',url:'https://www.hitelecom.com/product/tilt-sensor'}, response:'Locate rack bays requiring inspection.' },
  { programId:'pole-tower', name:'Pole & tower inclination', measurement:'Tilt trends at fixed points on structural members.', product:{name:'Wireless tilt sensors',url:'https://www.hitelecom.com/product/tilt-sensor'}, response:'Prioritize inspection of identified structures.' },
  { programId:'pump-condition', name:'Pump & motor condition', measurement:'Periodic RMS vibration velocity; temperature and pressure options.', product:{name:'Vibration sensors',url:'https://www.hitelecom.com/product/vibration-sensor'}, response:'Compare condition trends under equivalent operating loads.' },
  { programId:'cold-storage', name:'Cold storage conditions', measurement:'Storage temperature and relative humidity.', product:{name:'Temperature & humidity',url:'https://www.hitelecom.com/product/temperature-humidity-sensor'}, response:'Investigate excursions and document corrective action.' },
  { programId:'pipe-temperature', name:'Pipe surface temperature', measurement:'Contact temperature at defined pipe-wall locations.', product:{name:'Temperature sensors',url:'https://www.hitelecom.com/product/temperature-sensor'}, response:'Investigate thermal deviations on utility and process lines.' },
  { programId:'tank-level', name:'Tank & sump levels', measurement:'Liquid level trends and high/low threshold events.', product:{name:'Level sensors',url:'https://www.hitelecom.com/product/liquid-level-sensor'}, response:'Support filling, drainage and supply inspections.' },
  // radar-distance:start
  { programId:'radar-distance', name:'Radar distance monitoring', measurement:'Non-contact distance to a selected surface or target.', product:{name:'Radar distance sensors',url:'https://www.hitelecom.com/product/radar-distance-sensor'}, response:'Follow surface-level or target-position changes from an agreed reference.' },
  // radar-distance:end
  { programId:'room-air', name:'Indoor air quality', measurement:'CO₂, particulate matter, VOC and comfort measurements.', product:{name:'Air quality sensors',url:'https://www.hitelecom.com/product/air-quality-sensor'}, response:'Review ventilation and indoor pollutant conditions.' },
  { programId:'asset-tracking', name:'Outdoor asset tracking', measurement:'GNSS position and reported location history.', product:{name:'Asset tracking sensors',url:'https://www.hitelecom.com/product/asset-tracking-sensor'}, response:'Coordinate equipment collection, recovery and site verification.' },
  { programId:'soil-irrigation', name:'Soil moisture monitoring', measurement:'Root-zone moisture through irrigation cycles.', product:{name:'Soil sensors',url:'https://www.hitelecom.com/product/soil-moisture-sensor'}, response:'Adjust irrigation decisions to measured soil conditions.' },
] as const;

