// 工程概念图：展示测量对象及其关系。非施工图；辅助测量及外部接口按项目选配。
const escape=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const text=(x:number,y:number,s:string,extra='')=>`<text x="${x}" y="${y}" ${extra}>${escape(s)}</text>`;
const line=(x1:number,y1:number,x2:number,y2:number,cls='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
const rect=(x:number,y:number,w:number,h:number,cls='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" class="${cls}"/>`;
const dot=(x:number,y:number,n:string)=>`<circle cx="${x}" cy="${y}" r="17" class="point"/><text x="${x}" y="${y+5}" text-anchor="middle" class="point-label">${escape(n)}</text>`;
const path=(d:string,cls='')=>`<path d="${d}" class="${cls}"/>`;
const label=(x:number,s:string)=>text(x,326,s,'style="font-size:17px;font-weight:600"');
const note=(s:string)=>text(340,351,s,'text-anchor="middle" class="annotation"');
const ground=line(35,284,645,284,'ground');
export const diagrams:Record<string,{title:string;description:string;markup:string}>={
 structure:{
  title:'Structure, movement and environmental context',
  description:'A tower tilt point, bridge vibration instrument, reference-to-target distance point and ambient temperature channel. Structural vibration instruments and radar measurement arrangements are specified and validated for the project; a machine vibration sensor is not assumed suitable.',
  markup:ground+
   path('M65 284 L145 57 L225 284 M86 225 H204 M107 166 H184 M126 111 H164 M86 225 L184 166 M107 166 L164 111 M204 225 L107 166 M184 166 L126 111')+
   line(145,35,145,284,'reference')+
   rect(355,145,260,24)+rect(400,169,30,115)+rect(548,169,30,115)+path('M355 145 Q485 46 615 145')+
   dot(122,184,'1')+dot(483,145,'2')+
   rect(291,235,30,22,'device')+line(306,257,306,284)+line(321,246,400,246,'beam')+line(400,230,400,262,'reference')+dot(354,246,'3')+
   rect(558,67,35,39,'device')+dot(576,87,'4')+
   label(34,'1  Tilt')+label(161,'2  Vibration*')+label(332,'3  Distance*')+label(501,'4  Temperature')+
   note('*Project-specific instrument selection and site validation.')
 },
 equipment:{
  title:'Relate machine condition to the way it is operating',
  description:'Motor and pump with vibration, temperature and pressure measurements, plus water detection beneath a likely escape point. Run state, load and flow come from selected instruments or equipment interfaces. Water detection is not assumed suitable for oil or other liquids.',
  markup:ground+
   rect(67,167,183,100)+[88,113,138,163,188,213].map(x=>line(x,181,x,252)).join('')+
   rect(254,204,75,25)+`<circle cx="379" cy="217" r="57"/>`+path('M379 160 V101 H586 V196')+rect(359,86,40,25)+
   line(490,101,490,57)+`<circle cx="490" cy="44" r="20"/>`+line(490,44,501,36)+
   dot(98,171,'1')+dot(225,207,'2')+dot(550,101,'3')+
   rect(74,52,190,48)+text(169,81,'Run · load · flow*','text-anchor="middle"')+line(151,100,151,144,'leader')+
   path('M410 279 Q440 262 480 279','water')+rect(424,263,38,13,'device')+dot(443,262,'4')+
   label(34,'1  Vibration')+label(189,'2  Temperature')+label(391,'3  Pressure')+label(548,'4  Water')+
   note('*Selected instruments and equipment-state interfaces.')
 },
 building:{
  title:'Air, water and room activity in the same location context',
  description:'Occupied room with representative air-quality and temperature/humidity points, local water detection and selected light or motion sensing. Motion provides room-use context, not a headcount or a personnel-protection function.',
  markup:rect(62,56,555,228)+rect(91,96,102,88)+line(142,96,142,184)+line(91,140,193,140)+
   rect(422,56,100,15)+rect(345,69,43,13,'device')+dot(367,81,'4')+
   path('M384 81 H501 V107','leader')+rect(442,107,130,38)+text(507,132,'Light / motion*','text-anchor="middle"')+
   rect(511,160,65,124)+line(278,222,417,222)+line(293,222,293,284)+line(402,222,402,284)+
   `<circle cx="342" cy="181" r="18"/>`+path('M342 200 V246 M321 219 H363')+
   dot(239,140,'1')+dot(239,210,'2')+rect(508,268,42,12,'device')+dot(529,268,'3')+
   label(34,'1  Air quality')+label(212,'2  T / RH')+label(354,'3  Water')+label(485,'4  Light / motion*')+
   note('*Selected room channels; motion does not establish occupancy count.')
 },
 soil:{
  title:'Measure the need. Command the zone. Verify water delivery.',
  description:'Root-zone moisture and selected flow or pressure measurements inform an irrigation task. A Hitelecom HD20 controller sends a permitted valve or pump command through compatible circuits. Valve position, pump state and flow or pressure provide separate feedback; output status alone does not prove watering.',
  markup:rect(39,173,335,111,'soil')+line(39,232,374,232,'reference')+
   [88,237].map(x=>path(`M${x} 173 V120 M${x} 137 Q${x-26} 107 ${x-30} 130 M${x} 146 Q${x+28} 111 ${x+32} 132`,'plant')+path(`M${x} 179 L${x-18} 219 M${x} 179 L${x+20} 225`,'root')).join('')+
   path('M54 159 H392 M101 159 V173 M249 159 V173','flow')+
   line(164,132,164,264)+dot(164,211,'1')+dot(164,260,'1')+
   line(309,159,309,107)+`<circle cx="309" cy="88" r="18"/>`+dot(309,88,'2')+
   rect(443,47,191,77,'device')+text(538,76,'HD20 controller','text-anchor="middle" style="font-size:18px;font-weight:600"')+text(538,103,'DO command · DI state','text-anchor="middle" class="annotation"')+dot(422,65,'3')+
   path('M535 124 V159 H391 M403 151 L391 159 L403 167','flow')+
   path('M354 148 L379 170 V148 L354 170 Z')+text(445,185,'Valve / pump circuit','text-anchor="middle" class="annotation"')+
   rect(421,220,213,64)+text(527,246,'Confirm actual response','text-anchor="middle" style="font-size:16px;font-weight:600"')+text(527,270,'Position · run state · flow','text-anchor="middle" class="annotation"')+dot(400,241,'4')+
   path('M367 172 V206 H527 V220 M527 220 V206 H607 V124','leader')+
   label(34,'1  Moisture')+label(195,'2  Flow / pressure')+label(405,'3  Control*')+label(543,'4  Feedback')+
   note('*Compatible control circuits; local interlocks and override retained.')
 },
 tvoc:{
  title:'Air around the pipe. Conditions inside the process.',
  description:'Pipework with a nearby ambient TVOC point, pipe surface-temperature point, line-pressure point and a separate airflow-context input. Ambient TVOC does not identify a leaking joint or certify explosive-atmosphere safety.',
  markup:path('M60 190 H618 M60 234 H618')+
   rect(267,177,28,70)+rect(306,177,28,70)+[188,211,236].map(y=>line(267,y,334,y)).join('')+
   rect(420,81,67,63,'device')+line(453,144,453,284)+dot(453,110,'1')+
   path('M354 148 C388 144 402 118 426 119 M350 128 C377 122 391 99 420 91','air')+
   rect(157,182,31,16,'device')+dot(173,190,'2')+line(554,190,554,132)+`<circle cx="554" cy="116" r="19"/>`+dot(554,116,'3')+
   path('M72 79 H244 M225 67 L244 79 L225 91','flow')+dot(112,79,'4')+
   label(34,'1  Ambient TVOC')+label(243,'2  Pipe temp.')+label(415,'3  Pressure')+label(571,'4  Airflow*')+
   note('*Ventilation context; flow and valve / pump states use agreed interfaces.')
 },
 shipment:{
  title:'Keep each shipment event with the correct record',
  description:'A local H100 temperature and humidity logger is placed with the consignment. Its data is retrieved by USB after arrival. A separate optional asset tracker has its own location reporting route. Shock, tilt and door or seal evidence require separately selected instruments or records; none is a default H100 feature.',
  markup:rect(70,105,178,173)+path('M70 146 H248 M159 105 V278')+
   rect(70,38,178,42)+text(159,64,'Shock / door records*','text-anchor="middle" style="font-size:16px"')+path('M159 80 V105','leader')+
   rect(102,163,43,69,'device')+dot(123,181,'1')+rect(198,118,32,38,'device')+dot(214,130,'2')+
   rect(468,170,141,85)+path('M453 266 H624 L610 279 H467 Z')+path('M487 228 L507 215 L527 226 L548 196 L589 211','signal')+
   path('M264 217 H440 M425 207 L440 217 L425 227','flow')+text(349,192,'USB at receipt','text-anchor="middle" style="font-size:17px"')+
   path('M247 130 H343 V66 H465 M451 56 L465 66 L451 76','air')+
   rect(476,41,141,50)+text(547,72,'Location report','text-anchor="middle" style="font-size:17px"')+
   label(62,'1  Local T / RH record')+label(358,'2  Independent tracker*')+
   note('*Separate tracker; shock / door evidence uses selected instruments or records.')
 },
 leak:{
  title:'Detect the water. Verify the permitted response.',
  description:'Local water sensing below a likely escape point and a selected sump-level instrument identify different water conditions. A separately commissioned Hitelecom controller can request an allowed valve or drainage-pump action. Actual valve position or pump status is checked separately; isolation is not a default detector function.',
  markup:ground+rect(63,66,137,183)+path('M200 109 H287 V176')+
   path('M281 186 C267 208 269 221 284 221 C300 221 302 208 287 186','water')+
   path('M224 280 Q266 257 333 280','water')+rect(263,263,48,15,'device')+dot(288,258,'1')+
   path('M392 235 V281 H478 V235')+path('M393 260 Q415 252 437 260 T477 260','water')+line(449,209,449,263,'reference')+dot(449,221,'2')+
   rect(510,154,91,126)+path('M524 177 H586 M524 196 H586 M524 215 H586')+dot(552,255,'4')+
   rect(382,52,217,68,'device')+text(490,79,'HD20 controller','text-anchor="middle" style="font-size:18px;font-weight:600"')+text(490,104,'Permitted command*','text-anchor="middle" class="annotation"')+dot(361,74,'3')+
   path('M552 120 V150 M544 140 L552 150 L560 140','flow')+path('M609 245 H630 V86 H600','leader')+
   label(34,'1  Wet / dry')+label(199,'2  Sump level')+label(383,'3  Control*')+label(525,'4  Feedback')+
   note('*Verify valve or pump response separately from the output command.')
 },
 radar:{
  title:'Read level with network and equipment context',
  description:'Radar reads the water surface in a chamber, with optional pressure and local water-presence points. A Hitelecom controller can integrate permitted pump or valve commands and independently acquired run, position or flow feedback. Rainfall and adjacent levels inform review. A level rise alone does not prove blockage.',
  markup:path('M142 110 V283 H545 V110')+rect(269,54,70,35,'device')+
   path('M304 89 L250 241 M304 89 L358 241','beam')+
   path('M143 240 Q193 231 244 240 T345 240 T446 240 T544 240','water')+
   dot(304,72,'1')+path('M43 175 H141 M43 205 H141')+line(78,175,78,135)+`<circle cx="78" cy="119" r="18"/>`+dot(78,119,'2')+
   rect(512,171,23,16,'device')+dot(523,177,'3')+
   line(590,111,590,240,'dimension')+path('M583 119 L590 111 L597 119 M583 232 L590 240 L597 232')+
   rect(398,37,174,49)+text(485,58,'HD20 controller*','text-anchor="middle" style="font-size:16px;font-weight:600"')+text(485,77,'Command + feedback','text-anchor="middle" class="annotation"')+dot(595,62,'4')+
   text(433,105,'Pump · valve · flow','text-anchor="middle" class="annotation"')+
   label(34,'1  Radar level')+label(220,'2  Pressure')+label(382,'3  Water')+label(522,'4  Control*')+
   note('*Commissioned control and independent feedback; retain local protection.')
 },
 tracking:{
  title:'Locate the asset. Check the age and condition of the record.',
  description:'Outdoor asset with an independent position tracker and separately selected condition logger. The position record is paired with fix time, receipt time and device state. Condition and separately selected door or tamper data are associated by asset ID and availability; no sensor combination is assumed built in.',
  markup:path('M49 93 H206 V50 H399 V141 H631 M49 266 H260 V194 H477 V270 H631','road')+
   rect(85,150,143,89)+line(120,150,120,239)+line(156,150,156,239)+line(192,150,192,239)+
   dot(200,166,'1')+dot(112,210,'2')+
   path('M227 167 H337 V124 H440','route')+`<circle cx="275" cy="167" r="7" class="history"/><circle cx="337" cy="124" r="7" class="history"/>`+
   rect(455,58,167,180,'device')+text(475,93,'Asset record','style="font-size:18px;font-weight:600"')+line(474,107,603,107,'reference')+
   text(475,135,'Position + fix time')+text(475,163,'Report age + status')+text(475,191,'Condition / tamper*')+text(475,217,'Shared asset ID','class="annotation"')+
   label(42,'1  Position tracker')+label(341,'2  Condition device*')+
   note('*Dedicated condition, door or tamper inputs; not assumed built in.')
 },
 greenhouse:{
  title:'Measure the growing zone. Verify the climate response.',
  description:'Greenhouse canopy temperature, humidity and selected carbon dioxide measurements are combined with root-zone moisture. A Hitelecom controller can send permitted commands to compatible fan, vent, shade or irrigation circuits. Independent equipment feedback verifies the action; crop-specific PAR, leaf wetness or nutrient-solution instruments are separately selected.',
  markup:path('M44 282 V135 L222 61 L401 135 V282 M44 135 H401 M222 61 V282')+
   line(134,98,134,282)+line(312,98,312,282)+rect(68,232,308,50,'soil')+
   [92,157,286,351].map(x=>path(`M${x} 232 V185 M${x} 203 Q${x-17} 180 ${x-19} 195 M${x} 213 Q${x+16} 184 ${x+19} 199`,'plant')).join('')+
   dot(216,167,'1')+dot(280,255,'2')+
   rect(439,52,195,75,'device')+text(536,79,'IoT controller','text-anchor="middle" style="font-size:18px;font-weight:600"')+text(536,105,'Permitted commands*','text-anchor="middle" class="annotation"')+dot(419,72,'3')+
   rect(448,184,177,94)+text(536,209,'Fan · vent · irrigation','text-anchor="middle" style="font-size:15px;font-weight:600"')+text(536,236,'Run / position state','text-anchor="middle" class="annotation"')+text(536,260,'Flow / pressure','text-anchor="middle" class="annotation"')+dot(428,250,'4')+
   path('M512 127 V177 M504 167 L512 177 L520 167','flow')+path('M581 184 V136 H606 V127','leader')+
   path('M401 151 H439 V90','air')+text(212,36,'Selected CO₂ · air T / RH','text-anchor="middle" class="annotation"')+
   label(34,'1  Climate')+label(190,'2  Root zone')+label(372,'3  Control*')+label(534,'4  Feedback')+
   note('*Compatible circuits and local protection; specialist crop inputs selected.')
 },
 museum:{
  title:'Protect the object, the enclosure and the collection store',
  description:'Museum display case and collection store with case and room temperature/humidity, selected light monitoring and water sensing. Environmental targets and any specialist UV measurement follow the conservation plan.',
  markup:rect(57,69,555,213)+rect(99,116,179,166)+rect(117,135,143,108)+
   rect(394,27,218,31)+text(503,48,'Collection environment','text-anchor="middle" class="annotation"')+
   path('M171 230 L158 191 Q151 168 171 166 H206 Q226 169 217 192 L206 230 Z')+dot(246,154,'1')+
   rect(390,110,148,172)+[156,200,244].map(y=>line(390,y,538,y)).join('')+
   [123,166,210].map(y=>[405,447,489].map(x=>rect(x,y,31,24)).join('')).join('')+dot(568,145,'2')+
   line(182,69,182,93)+path('M171 93 H193 L205 109 H159 Z')+path('M170 115 L156 135 M194 115 L207 135','beam')+dot(296,108,'3')+
   rect(539,267,39,12,'device')+dot(557,267,'4')+
   label(34,'1  Case T / RH')+label(228,'2  Room T / RH')+label(430,'3  Light*')+label(559,'4  Water')+
   note('*Select light channels and any specialist UV instrument for the collection.')
 }
};
