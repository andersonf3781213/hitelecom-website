import headTemplate from '../templates/head.html?raw';
import bodyTemplate from '../templates/body.html?raw';
import schemaTemplate from '../templates/schema.json';
import faqKeys from '../templates/faq-keys.json';
import en from '../i18n/en.json';
import zh from '../i18n/zh.json';
import es from '../i18n/es.json';
import de from '../i18n/de.json';
import ja from '../i18n/ja.json';
import fr from '../i18n/fr.json';
import ru from '../i18n/ru.json';
import {renderCore} from './render-core.mjs';
const dictionaries={en,zh,es,de,ja,fr,ru};
export type Locale=keyof typeof dictionaries;
export function renderPage(locale:Locale){return renderCore({locale,dict:dictionaries[locale],headTemplate,bodyTemplate,schemaTemplate,faqKeys});}
