/**
 * Keep the two precision-variant cards within the official card UI.
 * Match the existing portfolio connectivity line exactly. Accuracy and model
 * remain internal search terms; the cards display no extra precision row.
 * This registry describes display only: catalog locale publication controls
 * whether a card exists, and unknown product IDs/locales are left unchanged.
 */
export const PRECISION_CARD_CONNECTIVITY = 'NB-IoT | 4G LTE | LoRa';

export const precisionCardRegistry = Object.freeze([
  Object.freeze({
    id: 'tilt-medium-precision-sensor',
    name: 'Medium-precision Tilt Sensor',
    accuracy: '±0.1°',
    model: 'H310-TS150M',
    conn: PRECISION_CARD_CONNECTIVITY,
    searchTerms: '±0.1° · H310-TS150M',
    image: '/images/products/tilt-medium-precision-0-1.svg',
    path: '/product/tilt-medium-precision-sensor',
  }),
  Object.freeze({
    id: 'tilt-low-precision-sensor',
    name: 'Low-precision Tilt Sensor',
    accuracy: '±1°',
    model: 'H310-TS100L',
    conn: PRECISION_CARD_CONNECTIVITY,
    searchTerms: '±1° · H310-TS100L',
    image: '/images/products/tilt-low-precision-1.svg',
    path: '/product/tilt-low-precision-sensor',
  }),
]);

// The original high-precision product already has its own card/template. Include
// it in display normalization only, never in the two-card static-additions array.
const highPrecisionDisplay = Object.freeze({
  id: 'tilt-sensor',
  name: 'High-precision Tilt Sensor',
  conn: PRECISION_CARD_CONNECTIVITY,
  searchTerms: '0.01°',
});
// 三轴两款（V122 七语上线）同样只校正标题/副行：可见行无型号与精度，型号保留在搜索词。
const triaxialDisplay = Object.freeze([
  Object.freeze({
    id: 'triaxial-high-precision-tilt-sensor',
    name: 'Triaxial High-precision Tilt Sensor',
    conn: PRECISION_CARD_CONNECTIVITY,
    searchTerms: 'H310-TS380C triaxial three-axis inclinometer tilt ±0.01°',
  }),
  Object.freeze({
    id: 'triaxial-medium-precision-tilt-sensor',
    name: 'Triaxial Medium-precision Tilt Sensor',
    conn: PRECISION_CARD_CONNECTIVITY,
    searchTerms: 'H310-TS350M triaxial three-axis inclinometer tilt ±0.1°',
  }),
]);
const byId = new Map([...precisionCardRegistry, highPrecisionDisplay, ...triaxialDisplay].map(card => [card.id, card]));
const localizedNames = Object.freeze({
  en: Object.freeze({
    'tilt-sensor': 'High-precision Tilt Sensor',
    'tilt-medium-precision-sensor': 'Medium-precision Tilt Sensor',
    'tilt-low-precision-sensor': 'Low-precision Tilt Sensor',
    'triaxial-high-precision-tilt-sensor': 'Triaxial High-precision Tilt Sensor',
    'triaxial-medium-precision-tilt-sensor': 'Triaxial Medium-precision Tilt Sensor',
  }),
  zh: Object.freeze({
    'tilt-sensor': '高精度倾斜传感器',
    'tilt-medium-precision-sensor': '中精度倾斜传感器',
    'tilt-low-precision-sensor': '低精度倾斜传感器',
    'triaxial-high-precision-tilt-sensor': '高精度三轴倾斜传感器',
    'triaxial-medium-precision-tilt-sensor': '中精度三轴倾斜传感器',
  }),
  es: Object.freeze({
    'tilt-sensor': 'Sensor de inclinación de alta precisión',
    'tilt-medium-precision-sensor': 'Sensor de inclinación de precisión media',
    'tilt-low-precision-sensor': 'Sensor de inclinación de baja precisión',
    'triaxial-high-precision-tilt-sensor': 'Sensor triaxial de alta precisión',
    'triaxial-medium-precision-tilt-sensor': 'Sensor triaxial de precisión media',
  }),
  de: Object.freeze({
    'tilt-sensor': 'Neigungssensor mit hoher Genauigkeit',
    'tilt-medium-precision-sensor': 'Neigungssensor mit mittlerer Genauigkeit',
    'tilt-low-precision-sensor': 'Neigungssensor mit niedriger Genauigkeit',
    'triaxial-high-precision-tilt-sensor': 'Dreiachsiger Neigungssensor · hohe Präzision',
    'triaxial-medium-precision-tilt-sensor': 'Dreiachsiger Neigungssensor · mittlere Präzision',
  }),
  ja: Object.freeze({
    'tilt-sensor': '高精度傾斜センサー',
    'tilt-medium-precision-sensor': '中精度傾斜センサー',
    'tilt-low-precision-sensor': '低精度傾斜センサー',
    'triaxial-high-precision-tilt-sensor': '高精度三軸傾斜センサー',
    'triaxial-medium-precision-tilt-sensor': '中精度三軸傾斜センサー',
  }),
  fr: Object.freeze({
    'tilt-sensor': 'Capteur d’inclinaison de haute précision',
    'tilt-medium-precision-sensor': 'Capteur d’inclinaison de précision moyenne',
    'tilt-low-precision-sensor': 'Capteur d’inclinaison de basse précision',
    'triaxial-high-precision-tilt-sensor': 'Capteur triaxial de haute précision',
    'triaxial-medium-precision-tilt-sensor': 'Capteur triaxial de précision moyenne',
  }),
  ru: Object.freeze({
    'tilt-sensor': 'Датчик наклона высокой точности',
    'tilt-medium-precision-sensor': 'Датчик наклона средней точности',
    'tilt-low-precision-sensor': 'Датчик наклона низкой точности',
    'triaxial-high-precision-tilt-sensor': 'Высокоточный трёхосевой датчик наклона',
    'triaxial-medium-precision-tilt-sensor': 'Трёхосевой датчик наклона средней точности',
  }),
});

export function applyPrecisionCardDisplay(item, productId, locale = 'en') {
  const card = byId.get(productId);
  const name = localizedNames[locale]?.[productId];
  if (!card || !name) return item;
  const {precisionMeta, ...rest} = item;
  return {...rest, name, conn: card.conn, searchTerms: card.searchTerms};
}
