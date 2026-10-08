/**
 * 温度传感器页 · UI 文案词典（GPT6 五语翻译包附录 A，Kimi 审核集成 2026-10-08）
 * en 基线 = 线上 TemperaturePage 硬编码原文逐字收录（与翻译包英文源列 145/145 一致）。
 * es/de/ja/fr/ru 来自 GPT6 五语包；shell.*（页首/页尾）与 contact.*（QuickContact）
 * 为预览壳文案，官网由 BaseLayout Header/Footer/Sidebar 既有组件覆盖，不收入本词典。
 * 约定：heading 类多行值以 \n 分段，页内按既有结构补 <br>/<span>；
 * page.heroH1.leadRest 仅 EN 非空（" temperature sensor."，前置空格），渲染
 * temperature-title-break 响应式断行；其余语言整段 lead + <br>。
 * applications.monitoringTasks：ru 为 {one,few,many}（构建端 Intl.PluralRules 选形，
 * 如 4 задачи / 5·6·40 задач），其余语言为静态后缀；ja 无前导空格（8つの…／40の…）。
 * form.directAfter：无脚本邮件句句末标点（ja「。」，其余「.」）。
 * js.* 由 temperature-interactions.js 经根节点 data-i18n 读取（EN 回落内置）。
 */
export const TEMPERATURE_DICTS = {
  "en": {
    "page": {
      "breadcrumbAria": "Breadcrumb",
      "home": "Home",
      "iotSensors": "IoT sensors",
      "temperatureSensor": "Temperature sensor",
      "heroH1": {
        "lead": "Wireless",
        "leadRest": " temperature sensor.",
        "spanA": "The right reading.",
        "spanB": "From the right point."
      },
      "heroProductAlt": "Hitelecom H Series temperature transmitter with red probe cable and metal probe, official product image",
      "heroCaption": "Example configuration · External probe",
      "discussProject": "Discuss your project",
      "downloadDatasheet": "Download datasheet"
    },
    "proof": [
      {
        "strong": "Custom design",
        "span": "Form and sensing arrangement",
        "small": "Matched to your installation"
      },
      {
        "strong": "IP68 option",
        "span": "Enclosure protection",
        "small": "Selected with the final configuration"
      },
      {
        "strong": "Your platform",
        "span": "Remote temperature data",
        "small": "Hitelecom Cloud or compatible integration"
      }
    ],
    "nav": {
      "aria": "On this page",
      "measurement": "Measurement",
      "applications": "Applications",
      "specifications": "Specifications",
      "integration": "Integration",
      "faq": "FAQ",
      "quote": "Request a quote"
    },
    "features": {
      "kicker": "KEY FEATURES",
      "heading": "Temperature data.\nReady for your operation.",
      "intro": "Match the product design, sensing point and data connection to the way your team works."
    },
    "measurement": {
      "kicker": "MEASURE THE RIGHT TEMPERATURE",
      "heading": "Start with\nthe measurement point.",
      "define": "Define your measurement",
      "discuss": "Discuss this measurement",
      "probeTransmitter": "SENSING & INSTALLATION",
      "installationHeading": "Plan the sensing point.\nMatch the device to the site."
    },
    "workflow": {
      "kicker": "FROM READING TO RESPONSE",
      "heading": "Know the temperature.\nGive your team a clear next step.",
      "batteryKicker": "PUBLISHED BATTERY-LIFE DESIGN",
      "batteryHeading": "Over 10 years.\nAt one-hour reporting."
    },
    "applications": {
      "kicker": "APPLICATIONS",
      "industryCategories": "industry categories",
      "monitoringTasks": "monitoring tasks",
      "aria": "Browse temperature applications",
      "temperature": "Temperature to measure",
      "point": "Measurement point",
      "plan": "Plan your installation",
      "discuss": "Discuss this application"
    },
    "series": {
      "kicker": "SERIES & CONFIGURATIONS",
      "heading": "The right design.\nThe right configuration.",
      "modelKicker": "PUBLISHED MODEL FAMILY",
      "modelDescription": "Product form, sensing arrangement and operating profile selected for your project.",
      "discuss": "Discuss this configuration"
    },
    "spec": {
      "familyReference": "FAMILY REFERENCE",
      "heading": "Specify the complete\nmeasurement point.",
      "download": "Download family datasheet",
      "proposal": "Get a configuration proposal",
      "caption": "H Series wireless temperature sensors — published family reference",
      "selectionHeading": "Bring the specification back to your project."
    },
    "integration": {
      "kicker": "CONNECTIVITY & INTEGRATION",
      "distributed": "For distributed locations",
      "point": "Temperature point",
      "mobileNetwork": "Mobile network",
      "platform": "Your platform",
      "cellularDescription": "Select the modem and regional bands around operator availability and coverage at the transmitter position. Agree the reporting profile, power arrangement and notification workflow.",
      "countryOperator": "Installation country and operator",
      "signal": "Signal at the actual mounting position",
      "intervals": "Sampling, reporting and required alert response",
      "site": "For points across one site",
      "points": "Temperature points",
      "gateway": "Receiver / gateway",
      "loraDescription": "Match the supplied radio protocol, regional settings and receiver or gateway. Specify any LoRaWAN requirement with the model and complete onward connection.",
      "protocol": "Device protocol and gateway compatibility",
      "layout": "Site layout and radio coverage",
      "gatewayPower": "Gateway power and onward data connection",
      "firstReading": "Make the first reading useful.",
      "handover": "Agree device identity, sensing point or channel, temperature units and timestamps in a sample message. Check the endpoint and supported authentication, then test the complete path to the intended platform and recipients.",
      "discuss": "Discuss platform integration",
      "heading": "Your site.\nYour data destination."
    },
    "faq": {
      "kicker": "ANSWERS FOR YOUR PROJECT",
      "heading": "Frequently\nasked questions.",
      "ask": "Ask about your project"
    },
    "enquiry": {
      "kicker": "LET'S TALK ABOUT YOUR PROJECT",
      "heading": "Your temperature point.\nOur next conversation.",
      "intro": "Tell us what you need to measure and where. We’ll help match the product form, sensing arrangement, wireless connection and installation to your project.",
      "start": "Start with the point and the range.",
      "supporting": "A site photo, drawing or storage procedure helps us understand the measurement point. Add the required accuracy and response time when available."
    },
    "form": {
      "kicker": "PROJECT ENQUIRY",
      "heading": "Let’s find your configuration.",
      "subtitle": "H Series wireless temperature monitoring",
      "application": "Application",
      "chooseApplication": "Choose your application",
      "other": "Other / project-specific",
      "country": "Country / region",
      "countryExample": "e.g. United Kingdom",
      "quantity": "Estimated quantity",
      "quantityExample": "e.g. 20",
      "measurement": "Measurement type",
      "pleaseAdvise": "Please advise",
      "temperatureRange": "Normal & peak temperatures",
      "rangeExample": "e.g. 2–8°C / peak 12°C",
      "connectivity": "Preferred connectivity",
      "requirements": "What would you like to monitor?",
      "requirementsPlaceholder": "Measurement point, preferred product form, accuracy, installation, reporting or platform requirements",
      "submit": "Prepare my enquiry",
      "reviewNote": "Review your brief, then send it with your email app.",
      "projectBrief": "Your project brief",
      "openEmail": "Open email",
      "copy": "Copy brief",
      "ready": "Your brief is ready to review.",
      "directBefore": "You can also",
      "directEmail": "email your project details directly",
      "directAfter": "."
    },
    "related": {
      "kicker": "CONTINUE YOUR MONITORING PROJECT",
      "all": "Explore all sensors",
      "air": "Air quality monitoring",
      "tilt": "Tilt monitoring"
    },
    "image": {
      "creditLabel": "Photo:",
      "creditChanges": "Resized, cropped and converted to WebP"
    },
    "schema": {
      "home": "Home",
      "sensors": "IoT Sensors",
      "temperature": "Wireless Temperature Sensor",
      "productGroup": "Hitelecom H Series wireless temperature sensors",
      "productVariant": "Hitelecom {model} Temperature Sensor",
      "variantDescription": "Published H Series model family. Product form, sensing arrangement and operating profile selected for the project."
    },
    "js": {
      "modelPrefix": "Model of interest: {model}",
      "subject": "H Series wireless temperature sensor — project enquiry",
      "greeting": "Hello Hitelecom,",
      "intro": "I would like to discuss a wireless temperature monitoring project.",
      "application": "Application",
      "country": "Country",
      "quantity": "Quantity",
      "measurement": "Measurement",
      "temperatureRange": "Temperature range",
      "connectivity": "Connectivity",
      "requirements": "Requirements",
      "pleaseAdvise": "Please advise",
      "request": "Please advise on a suitable model, configuration, supporting datasheet and quotation.",
      "thanks": "Thank you.",
      "directSubject": "Wireless temperature sensor project",
      "ready": "Your brief is ready. Review it and open your email app to send.",
      "copied": "Project brief copied.",
      "select": "Your brief is selected. Use your device’s copy command.",
      "wechatCopied": "WeChat ID copied.",
      "wechatSelected": "ID selected. Use your device’s copy command."
    }
  },
  "es": {
    "page": {
      "breadcrumbAria": "Ruta de navegación",
      "home": "Inicio",
      "iotSensors": "Sensores IoT",
      "temperatureSensor": "Sensor de temperatura",
      "heroH1": {
        "lead": "Sensor de temperatura inalámbrico.",
        "leadRest": null,
        "spanA": "La lectura adecuada.",
        "spanB": "Desde el punto adecuado."
      },
      "heroProductAlt": "Transmisor de temperatura Hitelecom de la serie H con cable rojo y sonda metálica; imagen oficial del producto",
      "heroCaption": "Ejemplo de configuración · Sonda externa",
      "discussProject": "Hablemos de su proyecto",
      "downloadDatasheet": "Descargar ficha técnica"
    },
    "proof": [
      {
        "strong": "Diseño a medida",
        "span": "Formato y configuración de medición",
        "small": "Adaptado a su instalación"
      },
      {
        "strong": "Opción IP68",
        "span": "Protección de la carcasa",
        "small": "Seleccionada con la configuración final"
      },
      {
        "strong": "Su plataforma",
        "span": "Datos remotos de temperatura",
        "small": "Hitelecom Cloud o integración compatible"
      }
    ],
    "nav": {
      "aria": "En esta página",
      "measurement": "Medición",
      "applications": "Aplicaciones",
      "specifications": "Especificaciones",
      "integration": "Integración",
      "faq": "Preguntas frecuentes",
      "quote": "Solicitar presupuesto"
    },
    "features": {
      "kicker": "CARACTERÍSTICAS PRINCIPALES",
      "heading": "Datos de temperatura.\nListos para su operación.",
      "intro": "Adapte el diseño del producto, el punto de medición y la conexión de datos a la forma de trabajar de su equipo."
    },
    "measurement": {
      "kicker": "MIDA LA TEMPERATURA QUE NECESITA",
      "heading": "Empiece por\nel punto de medición.",
      "define": "Defina su medición",
      "discuss": "Hablemos de esta medición",
      "probeTransmitter": "MEDICIÓN E INSTALACIÓN",
      "installationHeading": "Planifique el punto de medición.\nAdapte el dispositivo a la instalación."
    },
    "workflow": {
      "kicker": "DE LA LECTURA A LA RESPUESTA",
      "heading": "Conozca la temperatura.\nDé a su equipo un siguiente paso claro.",
      "batteryKicker": "AUTONOMÍA DE BATERÍA DE DISEÑO PUBLICADA",
      "batteryHeading": "Más de 10 años.\nCon envío de datos cada hora."
    },
    "applications": {
      "kicker": "APLICACIONES",
      "industryCategories": "sectores de aplicación",
      "monitoringTasks": "tareas de monitorización",
      "aria": "Explore las aplicaciones de temperatura",
      "temperature": "Temperatura que se desea medir",
      "point": "Punto de medición",
      "plan": "Planifique su instalación",
      "discuss": "Hablemos de esta aplicación"
    },
    "series": {
      "kicker": "SERIE Y CONFIGURACIONES",
      "heading": "El diseño adecuado.\nLa configuración adecuada.",
      "modelKicker": "FAMILIA DE MODELOS PUBLICADA",
      "modelDescription": "Formato del producto, configuración de medición y perfil operativo seleccionados para su proyecto.",
      "discuss": "Hablemos de esta configuración"
    },
    "spec": {
      "familyReference": "REFERENCIA DE LA FAMILIA",
      "heading": "Defina el punto de medición\ncon todos sus requisitos.",
      "download": "Descargar ficha técnica de la familia",
      "proposal": "Solicitar una propuesta de configuración",
      "caption": "Sensores de temperatura inalámbricos de la serie H — referencia publicada de la familia",
      "selectionHeading": "Adapte las especificaciones a su proyecto."
    },
    "integration": {
      "kicker": "CONECTIVIDAD E INTEGRACIÓN",
      "distributed": "Para ubicaciones distribuidas",
      "point": "Punto de temperatura",
      "mobileNetwork": "Red móvil",
      "platform": "Su plataforma",
      "cellularDescription": "Seleccione el módem y las bandas regionales según la disponibilidad del operador y la cobertura en la ubicación del transmisor. Acuerde el perfil de envío de datos, la alimentación y el flujo de notificaciones.",
      "countryOperator": "País de instalación y operador",
      "signal": "Señal en la posición real de montaje",
      "intervals": "Muestreo, envío de datos y respuesta requerida a las alertas",
      "site": "Para puntos de una misma instalación",
      "points": "Puntos de temperatura",
      "gateway": "Receptor / pasarela",
      "loraDescription": "Coordine el protocolo de radio suministrado, la configuración regional y el receptor o la pasarela. Especifique cualquier requisito LoRaWAN junto con el modelo y la conexión completa hasta el destino de los datos.",
      "protocol": "Protocolo del dispositivo y compatibilidad de la pasarela",
      "layout": "Distribución de la instalación y cobertura de radio",
      "gatewayPower": "Alimentación de la pasarela y conexión posterior de datos",
      "firstReading": "Haga útil la primera lectura.",
      "handover": "Acuerde la identidad del dispositivo, el punto o canal de medición, las unidades de temperatura y las marcas de tiempo en un mensaje de ejemplo. Compruebe el destino de conexión y la autenticación admitida y, a continuación, pruebe el recorrido completo hasta la plataforma y los destinatarios previstos.",
      "discuss": "Hablemos de la integración con su plataforma",
      "heading": "Su instalación.\nEl destino de sus datos."
    },
    "faq": {
      "kicker": "RESPUESTAS PARA SU PROYECTO",
      "heading": "Preguntas\nfrecuentes.",
      "ask": "Consulte sobre su proyecto"
    },
    "enquiry": {
      "kicker": "HABLEMOS DE SU PROYECTO",
      "heading": "Su punto de temperatura.\nNuestra próxima conversación.",
      "intro": "Cuéntenos lo que necesita medir y dónde. Le ayudaremos a adaptar el formato del producto, la configuración de medición, la conexión inalámbrica y la instalación a su proyecto.",
      "start": "Empiece por el punto y el rango.",
      "supporting": "Una foto del lugar, un plano o un procedimiento de almacenamiento nos ayudan a comprender el punto de medición. Añada la exactitud y el tiempo de respuesta requeridos cuando disponga de esa información."
    },
    "form": {
      "kicker": "CONSULTA DEL PROYECTO",
      "heading": "Encontremos su configuración.",
      "subtitle": "Monitorización inalámbrica de temperatura de la serie H",
      "application": "Aplicación",
      "chooseApplication": "Elija su aplicación",
      "other": "Otra / específica del proyecto",
      "country": "País / región",
      "countryExample": "p. ej., Reino Unido",
      "quantity": "Cantidad estimada",
      "quantityExample": "p. ej., 20",
      "measurement": "Tipo de medición",
      "pleaseAdvise": "Solicito asesoramiento",
      "temperatureRange": "Temperaturas normales y máximas",
      "rangeExample": "p. ej., 2–8°C / máxima 12°C",
      "connectivity": "Conectividad preferida",
      "requirements": "¿Qué desea monitorizar?",
      "requirementsPlaceholder": "Punto de medición, formato de producto preferido, exactitud, instalación, envío de datos o requisitos de la plataforma",
      "submit": "Preparar mi consulta",
      "reviewNote": "Revise los requisitos y envíelos con su aplicación de correo electrónico.",
      "projectBrief": "Los requisitos de su proyecto",
      "openEmail": "Abrir correo electrónico",
      "copy": "Copiar requisitos",
      "ready": "Los requisitos están listos para revisar.",
      "directBefore": "También puede",
      "directEmail": "enviar los detalles de su proyecto directamente por correo electrónico",
      "directAfter": "."
    },
    "related": {
      "kicker": "CONTINÚE SU PROYECTO DE MONITORIZACIÓN",
      "all": "Explore todos los sensores",
      "air": "Monitorización de la calidad del aire",
      "tilt": "Monitorización de inclinación"
    },
    "image": {
      "creditLabel": "Foto:",
      "creditChanges": "Redimensionada, recortada y convertida a WebP"
    },
    "schema": {
      "home": "Inicio",
      "sensors": "Sensores IoT",
      "temperature": "Sensor de temperatura inalámbrico",
      "productGroup": "Sensores de temperatura inalámbricos Hitelecom de la serie H",
      "productVariant": "Sensor de temperatura Hitelecom {model}",
      "variantDescription": "Familia de modelos de la serie H publicada. Formato del producto, configuración de medición y perfil operativo seleccionados para el proyecto."
    },
    "js": {
      "modelPrefix": "Modelo de interés: {model}",
      "subject": "Sensor de temperatura inalámbrico de la serie H — consulta del proyecto",
      "greeting": "Hola, Hitelecom:",
      "intro": "Me gustaría consultar sobre un proyecto de monitorización inalámbrica de temperatura.",
      "application": "Aplicación",
      "country": "País",
      "quantity": "Cantidad",
      "measurement": "Medición",
      "temperatureRange": "Rango de temperatura",
      "connectivity": "Conectividad",
      "requirements": "Requisitos",
      "pleaseAdvise": "Solicito asesoramiento",
      "request": "Les agradecería asesoramiento sobre un modelo adecuado, su configuración, la ficha técnica correspondiente y el presupuesto.",
      "thanks": "Gracias.",
      "directSubject": "Proyecto de sensor de temperatura inalámbrico",
      "ready": "Los requisitos están listos. Revíselos y abra su aplicación de correo electrónico para enviarlos.",
      "copied": "Requisitos del proyecto copiados.",
      "select": "Los requisitos están seleccionados. Utilice el comando de copia de su dispositivo.",
      "wechatCopied": "ID de WeChat copiado.",
      "wechatSelected": "ID seleccionado. Utilice el comando de copia de su dispositivo."
    }
  },
  "de": {
    "page": {
      "breadcrumbAria": "Navigationspfad",
      "home": "Startseite",
      "iotSensors": "IoT-Sensoren",
      "temperatureSensor": "Temperatursensor",
      "heroH1": {
        "lead": "Drahtloser Temperatursensor.",
        "leadRest": null,
        "spanA": "Der richtige Messwert.",
        "spanB": "Am richtigen Messpunkt."
      },
      "heroProductAlt": "Temperatursender der Hitelecom H Series mit rotem Fühlerkabel und Metallfühler, offizielles Produktbild",
      "heroCaption": "Beispielkonfiguration · Externer Fühler",
      "discussProject": "Ihr Projekt besprechen",
      "downloadDatasheet": "Datenblatt herunterladen"
    },
    "proof": [
      {
        "strong": "Design nach Maß",
        "span": "Bauform und Messanordnung",
        "small": "Passend zu Ihrer Installation"
      },
      {
        "strong": "IP68-Option",
        "span": "Gehäuseschutz",
        "small": "Mit der endgültigen Konfiguration ausgewählt"
      },
      {
        "strong": "Ihre Plattform",
        "span": "Temperaturdaten aus der Ferne",
        "small": "Hitelecom Cloud oder kompatible Integration"
      }
    ],
    "nav": {
      "aria": "Auf dieser Seite",
      "measurement": "Messung",
      "applications": "Anwendungen",
      "specifications": "Technische Daten",
      "integration": "Integration",
      "faq": "FAQ",
      "quote": "Angebot anfragen"
    },
    "features": {
      "kicker": "WESENTLICHE MERKMALE",
      "heading": "Temperaturdaten.\nBereit für Ihren Betrieb.",
      "intro": "Stimmen Sie Geräteausführung, Messpunkt und Datenanbindung auf die Arbeitsweise Ihres Teams ab."
    },
    "measurement": {
      "kicker": "DIE RICHTIGE TEMPERATUR MESSEN",
      "heading": "Beginnen Sie\nam Messpunkt.",
      "define": "Ihre Messung definieren",
      "discuss": "Diese Messung besprechen",
      "probeTransmitter": "MESSUNG UND INSTALLATION",
      "installationHeading": "Den Messpunkt planen.\nDas Gerät auf den Standort abstimmen."
    },
    "workflow": {
      "kicker": "VOM MESSWERT ZUR REAKTION",
      "heading": "Die Temperatur kennen.\nDen nächsten Schritt klar definieren.",
      "batteryKicker": "VERÖFFENTLICHTE AUSLEGUNG DER BATTERIELEBENSDAUER",
      "batteryHeading": "Über 10 Jahre.\nBei stündlicher Datenübertragung."
    },
    "applications": {
      "kicker": "ANWENDUNGEN",
      "industryCategories": "Branchenkategorien",
      "monitoringTasks": "Überwachungsaufgaben",
      "aria": "Temperaturanwendungen durchsuchen",
      "temperature": "Zu messende Temperatur",
      "point": "Messpunkt",
      "plan": "Ihre Installation planen",
      "discuss": "Diese Anwendung besprechen"
    },
    "series": {
      "kicker": "SERIE & KONFIGURATIONEN",
      "heading": "Die richtige Ausführung.\nDie richtige Konfiguration.",
      "modelKicker": "VERÖFFENTLICHTE MODELLFAMILIE",
      "modelDescription": "Bauform, Messanordnung und Betriebsprofil passend zu Ihrem Projekt.",
      "discuss": "Diese Konfiguration besprechen"
    },
    "spec": {
      "familyReference": "REFERENZ DER PRODUKTFAMILIE",
      "heading": "Den vollständigen\nMesspunkt spezifizieren.",
      "download": "Datenblatt der Produktfamilie herunterladen",
      "proposal": "Konfigurationsvorschlag anfordern",
      "caption": "Drahtlose Temperatursensoren der H Series – veröffentlichte Referenz der Produktfamilie",
      "selectionHeading": "Die Spezifikation auf Ihr Projekt abstimmen."
    },
    "integration": {
      "kicker": "ANBINDUNG & INTEGRATION",
      "distributed": "Für verteilte Standorte",
      "point": "Temperaturmesspunkt",
      "mobileNetwork": "Mobilfunknetz",
      "platform": "Ihre Plattform",
      "cellularDescription": "Wählen Sie Modem und regionale Frequenzbänder passend zur Betreiberverfügbarkeit und Netzabdeckung an der Senderposition. Vereinbaren Sie Übertragungsprofil, Stromversorgung und Benachrichtigungsablauf.",
      "countryOperator": "Installationsland und Netzbetreiber",
      "signal": "Signal an der tatsächlichen Montageposition",
      "intervals": "Messung, Datenübertragung und erforderliche Alarmreaktion",
      "site": "Für Messpunkte an einem Standort",
      "points": "Temperaturmesspunkte",
      "gateway": "Empfänger / Gateway",
      "loraDescription": "Stimmen Sie das gelieferte Funkprotokoll, die regionalen Einstellungen und den Empfänger oder das Gateway aufeinander ab. Geben Sie einen möglichen LoRaWAN-Bedarf zusammen mit dem Modell und der vollständigen weiterführenden Anbindung an.",
      "protocol": "Geräteprotokoll und Gateway-Kompatibilität",
      "layout": "Standortlayout und Funkabdeckung",
      "gatewayPower": "Gateway-Stromversorgung und weiterführende Datenanbindung",
      "firstReading": "Den ersten Messwert nutzbar machen.",
      "handover": "Stimmen Sie Geräteidentität, Messpunkt oder Kanal, Temperatureinheiten und Zeitstempel anhand einer Beispielnachricht ab. Prüfen Sie den Endpunkt und die unterstützte Authentifizierung. Testen Sie anschließend den vollständigen Übertragungsweg zur vorgesehenen Plattform und zu den Empfängern.",
      "discuss": "Plattformintegration besprechen",
      "heading": "Ihr Standort.\nIhr Datenziel."
    },
    "faq": {
      "kicker": "ANTWORTEN FÜR IHR PROJEKT",
      "heading": "Häufig\ngestellte Fragen.",
      "ask": "Fragen zu Ihrem Projekt stellen"
    },
    "enquiry": {
      "kicker": "SPRECHEN WIR ÜBER IHR PROJEKT",
      "heading": "Ihr Temperaturmesspunkt.\nUnser nächstes Gespräch.",
      "intro": "Teilen Sie uns mit, was Sie messen möchten und wo. Wir helfen Ihnen, Bauform, Messanordnung, Funkverbindung und Installation auf Ihr Projekt abzustimmen.",
      "start": "Beginnen Sie mit Messpunkt und Messbereich.",
      "supporting": "Ein Standortfoto, eine Zeichnung oder ein Lagerverfahren hilft uns, den Messpunkt zu verstehen. Ergänzen Sie die erforderliche Genauigkeit und Ansprechzeit, sofern bekannt."
    },
    "form": {
      "kicker": "PROJEKTANFRAGE",
      "heading": "Finden wir Ihre Konfiguration.",
      "subtitle": "Drahtlose Temperaturüberwachung mit der H Series",
      "application": "Anwendung",
      "chooseApplication": "Ihre Anwendung auswählen",
      "other": "Andere / projektspezifisch",
      "country": "Land / Region",
      "countryExample": "z. B. Vereinigtes Königreich",
      "quantity": "Geschätzte Stückzahl",
      "quantityExample": "z. B. 20",
      "measurement": "Messart",
      "pleaseAdvise": "Bitte beraten Sie mich",
      "temperatureRange": "Normal- & Spitzentemperaturen",
      "rangeExample": "z. B. 2–8°C / Spitze 12°C",
      "connectivity": "Bevorzugte Anbindung",
      "requirements": "Was möchten Sie überwachen?",
      "requirementsPlaceholder": "Messpunkt, bevorzugte Bauform, Genauigkeit, Installation, Übertragungs- oder Plattformanforderungen",
      "submit": "Meine Anfrage vorbereiten",
      "reviewNote": "Prüfen Sie Ihre Projektbeschreibung und senden Sie sie anschließend mit Ihrem E-Mail-Programm.",
      "projectBrief": "Ihre Projektbeschreibung",
      "openEmail": "E-Mail öffnen",
      "copy": "Projektbeschreibung kopieren",
      "ready": "Ihre Projektbeschreibung ist zur Prüfung bereit.",
      "directBefore": "Sie können auch",
      "directEmail": "Ihre Projektdetails direkt per E-Mail senden",
      "directAfter": "."
    },
    "related": {
      "kicker": "IHR ÜBERWACHUNGSPROJEKT WEITER PLANEN",
      "all": "Alle Sensoren entdecken",
      "air": "Luftqualitätsüberwachung",
      "tilt": "Neigungsüberwachung"
    },
    "image": {
      "creditLabel": "Foto:",
      "creditChanges": "Verkleinert, zugeschnitten und in WebP konvertiert"
    },
    "schema": {
      "home": "Startseite",
      "sensors": "IoT-Sensoren",
      "temperature": "Drahtloser Temperatursensor",
      "productGroup": "Drahtlose Temperatursensoren der Hitelecom H Series",
      "productVariant": "Hitelecom {model} Temperatursensor",
      "variantDescription": "Veröffentlichte Modellfamilie der H Series. Bauform, Messanordnung und Betriebsprofil passend zum Projekt."
    },
    "js": {
      "modelPrefix": "Gewünschtes Modell: {model}",
      "subject": "Drahtloser Temperatursensor der H Series – Projektanfrage",
      "greeting": "Guten Tag Hitelecom,",
      "intro": "ich möchte ein Projekt zur drahtlosen Temperaturüberwachung mit Ihnen besprechen.",
      "application": "Anwendung",
      "country": "Land",
      "quantity": "Stückzahl",
      "measurement": "Messung",
      "temperatureRange": "Temperaturbereich",
      "connectivity": "Anbindung",
      "requirements": "Anforderungen",
      "pleaseAdvise": "Bitte beraten Sie mich",
      "request": "Bitte empfehlen Sie ein geeignetes Modell und eine passende Konfiguration und stellen Sie das zugehörige Datenblatt sowie ein Angebot bereit.",
      "thanks": "Vielen Dank.",
      "directSubject": "Projekt mit drahtlosen Temperatursensoren",
      "ready": "Ihre Projektbeschreibung ist bereit. Prüfen Sie sie und öffnen Sie Ihr E-Mail-Programm zum Senden.",
      "copied": "Projektbeschreibung kopiert.",
      "select": "Ihre Projektbeschreibung ist markiert. Verwenden Sie den Kopierbefehl Ihres Geräts.",
      "wechatCopied": "WeChat-ID kopiert.",
      "wechatSelected": "ID markiert. Verwenden Sie den Kopierbefehl Ihres Geräts."
    }
  },
  "ja": {
    "page": {
      "breadcrumbAria": "パンくずリスト",
      "home": "ホーム",
      "iotSensors": "IoTセンサー",
      "temperatureSensor": "温度センサー",
      "heroH1": {
        "lead": "ワイヤレス温度センサー。",
        "leadRest": null,
        "spanA": "必要な温度を。",
        "spanB": "適切な測定点から。"
      },
      "heroProductAlt": "赤いプローブケーブルと金属製プローブを備えたHitelecom H Series温度送信器の公式製品画像",
      "heroCaption": "構成例 · 外部プローブ型",
      "discussProject": "プロジェクトについて相談する",
      "downloadDatasheet": "データシートをダウンロード"
    },
    "proof": [
      {
        "strong": "カスタム設計",
        "span": "製品形態とセンシング構成",
        "small": "設置条件に合わせて選定"
      },
      {
        "strong": "IP68対応オプション",
        "span": "筐体の保護性能",
        "small": "最終構成に合わせて選択"
      },
      {
        "strong": "ご利用のプラットフォーム",
        "span": "遠隔で温度データを取得",
        "small": "Hitelecom Cloudまたは互換性のあるシステム連携"
      }
    ],
    "nav": {
      "aria": "このページの内容",
      "measurement": "測定",
      "applications": "用途",
      "specifications": "仕様",
      "integration": "システム連携",
      "faq": "よくあるご質問",
      "quote": "見積もりを依頼する"
    },
    "features": {
      "kicker": "主な特長",
      "heading": "温度データを。\n現場の運用に。",
      "intro": "チームの運用に合わせて、製品設計、測定点、データ接続を選択してください。"
    },
    "measurement": {
      "kicker": "必要な温度を正しく測る",
      "heading": "測定点から\n選びましょう。",
      "define": "測定要件を明確に",
      "discuss": "この測定について相談する",
      "probeTransmitter": "センシングと設置",
      "installationHeading": "測定点を計画。\n現場に合う機器を選択。"
    },
    "workflow": {
      "kicker": "測定から対応まで",
      "heading": "温度を把握。\n次の対応をチームで明確に。",
      "batteryKicker": "公表されている電池寿命の設計値",
      "batteryHeading": "10年超。\n1時間ごとのデータ送信で。"
    },
    "applications": {
      "kicker": "用途",
      "industryCategories": "つの業種カテゴリ",
      "monitoringTasks": "の監視用途",
      "aria": "温度監視の用途を見る",
      "temperature": "測定する温度",
      "point": "測定点",
      "plan": "設置計画の確認事項",
      "discuss": "この用途について相談する"
    },
    "series": {
      "kicker": "シリーズと構成",
      "heading": "適した設計。\n適した構成。",
      "modelKicker": "公表されているモデルファミリー",
      "modelDescription": "プロジェクトに合わせて製品形態、センシング構成、動作設定を選定します。",
      "discuss": "この構成について相談する"
    },
    "spec": {
      "familyReference": "製品ファミリーの参考仕様",
      "heading": "測定点全体の\n仕様を明確に。",
      "download": "製品ファミリーのデータシートをダウンロード",
      "proposal": "構成提案を依頼する",
      "caption": "H Seriesワイヤレス温度センサー — 公表されている製品ファミリーの参考仕様",
      "selectionHeading": "仕様をプロジェクトの要件に照らして確認。"
    },
    "integration": {
      "kicker": "通信接続とシステム連携",
      "distributed": "分散した拠点に",
      "point": "温度測定点",
      "mobileNetwork": "モバイルネットワーク",
      "platform": "ご利用のプラットフォーム",
      "cellularDescription": "利用できる通信事業者と送信器の設置位置でのカバレッジに合わせて、モデムと地域対応バンドを選択してください。データ送信設定、電源構成、通知の運用手順を確認します。",
      "countryOperator": "設置国と通信事業者",
      "signal": "実際の設置位置での電波状況",
      "intervals": "サンプリング、データ送信、必要なアラート対応",
      "site": "同じ敷地内の複数の測定点に",
      "points": "温度測定点",
      "gateway": "受信機 / ゲートウェイ",
      "loraDescription": "納入機器の無線プロトコル、地域設定、受信機またはゲートウェイを適合させてください。LoRaWANが必要な場合は、モデルと、その先のデータ接続全体を含めて要件を指定してください。",
      "protocol": "機器のプロトコルとゲートウェイの互換性",
      "layout": "現場の配置と無線カバレッジ",
      "gatewayPower": "ゲートウェイの電源と、その先のデータ接続",
      "firstReading": "最初の測定値から、活用できるデータに。",
      "handover": "サンプルメッセージで、機器識別情報、測定点またはチャンネル、温度単位、タイムスタンプを確認してください。接続先と対応する認証方式を確認し、目的のプラットフォームと受信者に届くまでの経路全体をテストします。",
      "discuss": "プラットフォーム連携について相談する",
      "heading": "現場に合う接続。\n選べるデータの送信先。"
    },
    "faq": {
      "kicker": "プロジェクトの疑問にお答えします",
      "heading": "よくある\nご質問。",
      "ask": "プロジェクトについて質問する"
    },
    "enquiry": {
      "kicker": "プロジェクトについてご相談ください",
      "heading": "測定点を起点に。\n次のご相談へ。",
      "intro": "何を、どこで測定したいかをお知らせください。プロジェクトに合う製品形態、センシング構成、無線通信、設置方法の選定をお手伝いします。",
      "start": "まず、測定点と温度範囲から。",
      "supporting": "現場写真、図面、保管手順があると、測定点を理解するうえで役立ちます。必要な精度と応答時間が分かる場合は、併せてお知らせください。"
    },
    "form": {
      "kicker": "プロジェクトのお問い合わせ",
      "heading": "適した構成を一緒に選びましょう。",
      "subtitle": "H Seriesワイヤレス温度監視",
      "application": "用途",
      "chooseApplication": "用途を選択してください",
      "other": "その他 / 個別プロジェクト",
      "country": "国 / 地域",
      "countryExample": "例：英国",
      "quantity": "予定数量",
      "quantityExample": "例：20",
      "measurement": "測定の種類",
      "pleaseAdvise": "選定を相談したい",
      "temperatureRange": "通常時と最高温度",
      "rangeExample": "例：2–8°C / 最高12°C",
      "connectivity": "希望する通信方式",
      "requirements": "何を監視したいですか？",
      "requirementsPlaceholder": "測定点、希望する製品形態、精度、設置条件、データ送信またはプラットフォームの要件",
      "submit": "お問い合わせ内容を作成",
      "reviewNote": "要件をご確認のうえ、メールアプリで送信してください。",
      "projectBrief": "プロジェクトの要件",
      "openEmail": "メールアプリを開く",
      "copy": "要件をコピー",
      "ready": "要件を作成しました。内容をご確認ください。",
      "directBefore": "また、",
      "directEmail": "プロジェクトの詳細を直接メールで送ることもできます",
      "directAfter": "。"
    },
    "related": {
      "kicker": "監視プロジェクトをさらに具体化",
      "all": "すべてのセンサーを見る",
      "air": "空気質監視",
      "tilt": "傾斜監視"
    },
    "image": {
      "creditLabel": "写真：",
      "creditChanges": "サイズ変更・トリミング・WebP形式への変換を実施"
    },
    "schema": {
      "home": "ホーム",
      "sensors": "IoTセンサー",
      "temperature": "ワイヤレス温度センサー",
      "productGroup": "Hitelecom H Seriesワイヤレス温度センサー",
      "productVariant": "Hitelecom {model}温度センサー",
      "variantDescription": "公表されているH Seriesのモデルファミリー。プロジェクトに合わせて製品形態、センシング構成、動作設定を選定します。"
    },
    "js": {
      "modelPrefix": "希望モデル：{model}",
      "subject": "H Seriesワイヤレス温度センサー — プロジェクトのお問い合わせ",
      "greeting": "Hitelecomご担当者様",
      "intro": "ワイヤレス温度監視のプロジェクトについて相談したく、ご連絡いたしました。",
      "application": "用途",
      "country": "国",
      "quantity": "数量",
      "measurement": "測定対象",
      "temperatureRange": "温度範囲",
      "connectivity": "通信方式",
      "requirements": "要件",
      "pleaseAdvise": "選定をご相談させてください",
      "request": "適したモデルと構成、関連するデータシート、お見積もりをご案内いただけますでしょうか。",
      "thanks": "よろしくお願いいたします。",
      "directSubject": "ワイヤレス温度センサーのプロジェクト",
      "ready": "要件を作成しました。内容をご確認のうえ、メールアプリを開いて送信してください。",
      "copied": "プロジェクトの要件をコピーしました。",
      "select": "要件を選択しました。お使いの端末のコピー操作を行ってください。",
      "wechatCopied": "WeChat IDをコピーしました。",
      "wechatSelected": "IDを選択しました。お使いの端末のコピー操作を行ってください。"
    }
  },
  "fr": {
    "page": {
      "breadcrumbAria": "Fil d’Ariane",
      "home": "Accueil",
      "iotSensors": "Capteurs IoT",
      "temperatureSensor": "Capteur de température",
      "heroH1": {
        "lead": "Capteur de température sans fil.",
        "leadRest": null,
        "spanA": "La bonne mesure.",
        "spanB": "Au bon endroit."
      },
      "heroProductAlt": "Émetteur de température Hitelecom H Series avec câble de sonde rouge et sonde métallique, image officielle du produit",
      "heroCaption": "Exemple de configuration · Sonde externe",
      "discussProject": "Parlons de votre projet",
      "downloadDatasheet": "Télécharger la fiche technique"
    },
    "proof": [
      {
        "strong": "Sur mesure",
        "span": "Format et configuration de mesure",
        "small": "Adaptés à votre installation"
      },
      {
        "strong": "Option IP68",
        "span": "Protection du boîtier",
        "small": "Choisie avec la configuration finale"
      },
      {
        "strong": "Votre plateforme",
        "span": "Données de température à distance",
        "small": "Hitelecom Cloud ou intégration compatible"
      }
    ],
    "nav": {
      "aria": "Sur cette page",
      "measurement": "Mesure",
      "applications": "Applications",
      "specifications": "Caractéristiques",
      "integration": "Intégration",
      "faq": "FAQ",
      "quote": "Demander un devis"
    },
    "features": {
      "kicker": "CARACTÉRISTIQUES CLÉS",
      "heading": "Des données de température.\nPrêtes pour votre activité.",
      "intro": "Adaptez la conception du produit, le point de mesure et la connexion de données à la façon dont votre équipe travaille."
    },
    "measurement": {
      "kicker": "MESURER LA BONNE TEMPÉRATURE",
      "heading": "Commencez par\nle point de mesure.",
      "define": "Définir votre mesure",
      "discuss": "Discuter de cette mesure",
      "probeTransmitter": "MESURE ET INSTALLATION",
      "installationHeading": "Planifiez le point de mesure.\nAdaptez l’appareil au site."
    },
    "workflow": {
      "kicker": "DE LA MESURE À L’ACTION",
      "heading": "Connaître la température.\nDonner à votre équipe une marche à suivre.",
      "batteryKicker": "AUTONOMIE DE CONCEPTION PUBLIÉE",
      "batteryHeading": "Plus de 10 ans.\nAvec une transmission toutes les heures."
    },
    "applications": {
      "kicker": "APPLICATIONS",
      "industryCategories": "catégories sectorielles",
      "monitoringTasks": "tâches de surveillance",
      "aria": "Parcourir les applications de mesure de température",
      "temperature": "Température à mesurer",
      "point": "Point de mesure",
      "plan": "Planifier votre installation",
      "discuss": "Discuter de cette application"
    },
    "series": {
      "kicker": "GAMME ET CONFIGURATIONS",
      "heading": "La bonne conception.\nLa bonne configuration.",
      "modelKicker": "FAMILLE DE MODÈLES PUBLIÉE",
      "modelDescription": "Format de l’appareil, configuration de mesure et profil de fonctionnement choisis pour votre projet.",
      "discuss": "Discuter de cette configuration"
    },
    "spec": {
      "familyReference": "RÉFÉRENCE DE LA GAMME",
      "heading": "Définir l’ensemble\ndu point de mesure.",
      "download": "Télécharger la fiche technique de la gamme",
      "proposal": "Obtenir une proposition de configuration",
      "caption": "Capteurs de température sans fil H Series — référence publiée de la gamme",
      "selectionHeading": "Adaptez les spécifications à votre projet."
    },
    "integration": {
      "kicker": "CONNECTIVITÉ ET INTÉGRATION",
      "distributed": "Pour des sites répartis",
      "point": "Point de mesure de température",
      "mobileNetwork": "Réseau mobile",
      "platform": "Votre plateforme",
      "cellularDescription": "Choisissez le modem et les bandes régionales selon les opérateurs disponibles et la couverture à l’emplacement de l’émetteur. Convenez du profil de transmission, de l’alimentation et du processus de notification.",
      "countryOperator": "Pays d’installation et opérateur",
      "signal": "Signal à l’emplacement réel de fixation",
      "intervals": "Échantillonnage, transmission et réponse aux alertes requise",
      "site": "Pour des points répartis sur un même site",
      "points": "Points de mesure de température",
      "gateway": "Récepteur / passerelle",
      "loraDescription": "Adaptez le protocole radio fourni, les paramètres régionaux et le récepteur ou la passerelle. Précisez toute exigence LoRaWAN en indiquant le modèle et la connexion complète vers le système destinataire.",
      "protocol": "Protocole de l’appareil et compatibilité de la passerelle",
      "layout": "Agencement du site et couverture radio",
      "gatewayPower": "Alimentation de la passerelle et connexion des données en aval",
      "firstReading": "Rendez la première mesure utile.",
      "handover": "Convenez de l’identifiant de l’appareil, du point ou du canal de mesure, des unités de température et des horodatages dans un message d’exemple. Vérifiez le point de terminaison et l’authentification prise en charge, puis testez le chemin complet vers la plateforme et les destinataires prévus.",
      "discuss": "Discuter de l’intégration à la plateforme",
      "heading": "Votre site.\nLa destination de vos données."
    },
    "faq": {
      "kicker": "DES RÉPONSES POUR VOTRE PROJET",
      "heading": "Questions\nfréquentes.",
      "ask": "Poser une question sur votre projet"
    },
    "enquiry": {
      "kicker": "PARLONS DE VOTRE PROJET",
      "heading": "Votre point de mesure de température.\nLe point de départ de notre échange.",
      "intro": "Dites-nous ce que vous devez mesurer et où. Nous vous aiderons à adapter le format de l’appareil, la configuration de mesure, la connexion sans fil et l’installation à votre projet.",
      "start": "Commencez par le point et la plage de mesure.",
      "supporting": "Une photo du site, un plan ou une procédure de stockage nous aide à comprendre le point de mesure. Ajoutez la précision et le temps de réponse requis lorsque ces informations sont disponibles."
    },
    "form": {
      "kicker": "DEMANDE POUR VOTRE PROJET",
      "heading": "Trouvons votre configuration.",
      "subtitle": "Surveillance sans fil de la température H Series",
      "application": "Application",
      "chooseApplication": "Choisir votre application",
      "other": "Autre / spécifique au projet",
      "country": "Pays / région",
      "countryExample": "p. ex. Royaume-Uni",
      "quantity": "Quantité estimée",
      "quantityExample": "p. ex. 20",
      "measurement": "Type de mesure",
      "pleaseAdvise": "J’ai besoin de votre conseil",
      "temperatureRange": "Températures normales et maximales",
      "rangeExample": "p. ex. 2–8 °C / maximum 12 °C",
      "connectivity": "Connectivité souhaitée",
      "requirements": "Que souhaitez-vous surveiller ?",
      "requirementsPlaceholder": "Point de mesure, format d’appareil souhaité, précision, installation, besoins de transmission ou exigences de la plateforme",
      "submit": "Préparer ma demande",
      "reviewNote": "Vérifiez votre cahier des charges, puis envoyez-le avec votre application de messagerie.",
      "projectBrief": "Votre cahier des charges",
      "openEmail": "Ouvrir la messagerie",
      "copy": "Copier le cahier des charges",
      "ready": "Votre cahier des charges est prêt à être vérifié.",
      "directBefore": "Vous pouvez aussi",
      "directEmail": "envoyer directement les détails de votre projet par e-mail",
      "directAfter": "."
    },
    "related": {
      "kicker": "POURSUIVRE VOTRE PROJET DE SURVEILLANCE",
      "all": "Découvrir tous les capteurs",
      "air": "Surveillance de la qualité de l’air",
      "tilt": "Surveillance de l’inclinaison"
    },
    "image": {
      "creditLabel": "Photo :",
      "creditChanges": "Redimensionnement, recadrage et conversion au format WebP"
    },
    "schema": {
      "home": "Accueil",
      "sensors": "Capteurs IoT",
      "temperature": "Capteur de température sans fil",
      "productGroup": "Capteurs de température sans fil Hitelecom H Series",
      "productVariant": "Capteur de température Hitelecom {model}",
      "variantDescription": "Famille de modèles H Series publiée. Format de l’appareil, configuration de mesure et profil de fonctionnement choisis pour le projet."
    },
    "js": {
      "modelPrefix": "Modèle souhaité : {model}",
      "subject": "Capteur de température sans fil H Series — demande pour un projet",
      "greeting": "Bonjour Hitelecom,",
      "intro": "Je souhaite discuter d’un projet de surveillance sans fil de la température.",
      "application": "Application",
      "country": "Pays",
      "quantity": "Quantité",
      "measurement": "Mesure",
      "temperatureRange": "Plage de température",
      "connectivity": "Connectivité",
      "requirements": "Exigences",
      "pleaseAdvise": "Merci de me conseiller",
      "request": "Merci de me proposer un modèle et une configuration adaptés, la fiche technique correspondante ainsi qu’un devis.",
      "thanks": "Merci.",
      "directSubject": "Projet de capteur de température sans fil",
      "ready": "Votre cahier des charges est prêt. Vérifiez-le, puis ouvrez votre application de messagerie pour l’envoyer.",
      "copied": "Cahier des charges copié.",
      "select": "Votre cahier des charges est sélectionné. Utilisez la commande de copie de votre appareil.",
      "wechatCopied": "Identifiant WeChat copié.",
      "wechatSelected": "Identifiant sélectionné. Utilisez la commande de copie de votre appareil."
    }
  },
  "ru": {
    "page": {
      "breadcrumbAria": "Навигационная цепочка",
      "home": "Главная",
      "iotSensors": "Датчики IoT",
      "temperatureSensor": "Датчик температуры",
      "heroH1": {
        "lead": "Беспроводной датчик температуры.",
        "leadRest": null,
        "spanA": "Нужные показания.",
        "spanB": "Из нужной точки."
      },
      "heroProductAlt": "Передатчик температуры Hitelecom H Series с красным кабелем зонда и металлическим зондом, официальное изображение продукта",
      "heroCaption": "Пример конфигурации · Выносной зонд",
      "discussProject": "Обсудить проект",
      "downloadDatasheet": "Скачать техническое описание"
    },
    "proof": [
      {
        "strong": "На заказ",
        "span": "Конструкция и измерительная часть",
        "small": "Подбираются под условия установки"
      },
      {
        "strong": "Вариант IP68",
        "span": "Защита корпуса",
        "small": "Выбирается для итоговой конфигурации"
      },
      {
        "strong": "Ваша платформа",
        "span": "Удалённые данные о температуре",
        "small": "Hitelecom Cloud или совместимая интеграция"
      }
    ],
    "nav": {
      "aria": "На этой странице",
      "measurement": "Измерение",
      "applications": "Применение",
      "specifications": "Характеристики",
      "integration": "Интеграция",
      "faq": "Вопросы и ответы",
      "quote": "Запросить расчёт стоимости"
    },
    "features": {
      "kicker": "ОСНОВНЫЕ ВОЗМОЖНОСТИ",
      "heading": "Данные о температуре.\nДля вашей работы.",
      "intro": "Подберите конструкцию устройства, точку измерения и подключение данных с учётом работы вашей команды."
    },
    "measurement": {
      "kicker": "ИЗМЕРЯЙТЕ НУЖНУЮ ТЕМПЕРАТУРУ",
      "heading": "Начните\nс точки измерения.",
      "define": "Определите измеряемую величину",
      "discuss": "Обсудить это измерение",
      "probeTransmitter": "ИЗМЕРЕНИЕ И УСТАНОВКА",
      "installationHeading": "Спланируйте точку измерения.\nПодберите устройство для объекта."
    },
    "workflow": {
      "kicker": "ОТ ПОКАЗАНИЙ К ДЕЙСТВИЯМ",
      "heading": "Знайте температуру.\nОпределите следующие действия команды.",
      "batteryKicker": "ОПУБЛИКОВАННЫЙ РАСЧЁТНЫЙ СРОК РАБОТЫ БАТАРЕИ",
      "batteryHeading": "Более 10 лет.\nПри передаче данных раз в час."
    },
    "applications": {
      "kicker": "ПРИМЕНЕНИЕ",
      "industryCategories": "отраслевых категорий",
      "monitoringTasks": {
        "one": "задача мониторинга",
        "few": "задачи мониторинга",
        "many": "задач мониторинга"
      },
      "aria": "Обзор применений температурного мониторинга",
      "temperature": "Измеряемая температура",
      "point": "Точка измерения",
      "plan": "План установки",
      "discuss": "Обсудить это применение"
    },
    "series": {
      "kicker": "СЕРИЯ И КОНФИГУРАЦИИ",
      "heading": "Подходящая конструкция.\nПодходящая конфигурация.",
      "modelKicker": "ОПУБЛИКОВАННОЕ СЕМЕЙСТВО МОДЕЛЕЙ",
      "modelDescription": "Исполнение устройства, измерительная часть и режим работы подбираются для вашего проекта.",
      "discuss": "Обсудить эту конфигурацию"
    },
    "spec": {
      "familyReference": "ХАРАКТЕРИСТИКИ СЕМЕЙСТВА",
      "heading": "Определите параметры\nвсей точки измерения.",
      "download": "Скачать техническое описание семейства",
      "proposal": "Получить предложение по конфигурации",
      "caption": "Беспроводные датчики температуры H Series — опубликованные характеристики семейства",
      "selectionHeading": "Уточните характеристики для вашего проекта."
    },
    "integration": {
      "kicker": "СВЯЗЬ И ИНТЕГРАЦИЯ",
      "distributed": "Для распределённых объектов",
      "point": "Точка измерения температуры",
      "mobileNetwork": "Сотовая сеть",
      "platform": "Ваша платформа",
      "cellularDescription": "Выберите модем и региональные диапазоны с учётом доступности оператора и покрытия в месте передатчика. Согласуйте режим передачи данных, схему питания и порядок уведомлений.",
      "countryOperator": "Страна установки и оператор",
      "signal": "Сигнал в фактическом месте установки",
      "intervals": "Опрос, передача данных и требуемое реагирование на оповещения",
      "site": "Для точек на одном объекте",
      "points": "Точки измерения температуры",
      "gateway": "Приёмник / шлюз",
      "loraDescription": "Согласуйте радиопротокол поставляемого устройства, региональные настройки и приёмник либо шлюз. Если требуется LoRaWAN, укажите это вместе с моделью и полной схемой дальнейшей передачи данных.",
      "protocol": "Протокол устройства и совместимость шлюза",
      "layout": "План объекта и радиопокрытие",
      "gatewayPower": "Питание шлюза и дальнейшее подключение данных",
      "firstReading": "Пусть первое показание приносит пользу.",
      "handover": "На примере сообщения согласуйте идентификатор устройства, точку или канал измерения, единицы температуры и временные метки. Проверьте адрес конечной точки и поддерживаемый способ аутентификации, затем протестируйте полный путь передачи данных на нужную платформу и получателям.",
      "discuss": "Обсудить интеграцию с платформой",
      "heading": "Ваш объект.\nВаша платформа данных."
    },
    "faq": {
      "kicker": "ОТВЕТЫ ДЛЯ ВАШЕГО ПРОЕКТА",
      "heading": "Часто задаваемые\nвопросы.",
      "ask": "Задать вопрос о проекте"
    },
    "enquiry": {
      "kicker": "ОБСУДИМ ВАШ ПРОЕКТ",
      "heading": "Ваша точка измерения.\nНачало нашего диалога.",
      "intro": "Расскажите, что и где нужно измерять. Мы поможем подобрать исполнение устройства, измерительную часть, беспроводную связь и схему установки для вашего проекта.",
      "start": "Начните с точки и диапазона.",
      "supporting": "Фотография объекта, чертёж или процедура хранения помогут нам понять точку измерения. Если известно, добавьте требуемую точность и время отклика."
    },
    "form": {
      "kicker": "ЗАПРОС ПО ПРОЕКТУ",
      "heading": "Подберём вашу конфигурацию.",
      "subtitle": "Беспроводной мониторинг температуры H Series",
      "application": "Область применения",
      "chooseApplication": "Выберите область применения",
      "other": "Другое / индивидуальная задача",
      "country": "Страна / регион",
      "countryExample": "например, Великобритания",
      "quantity": "Предполагаемое количество",
      "quantityExample": "например, 20",
      "measurement": "Тип измерения",
      "pleaseAdvise": "Нужна рекомендация",
      "temperatureRange": "Нормальная и пиковая температура",
      "rangeExample": "например, 2–8°C / пиковая 12°C",
      "connectivity": "Предпочтительная связь",
      "requirements": "Что вы хотите контролировать?",
      "requirementsPlaceholder": "Точка измерения, предпочтительное исполнение устройства, точность, установка, требования к передаче данных или платформе",
      "submit": "Подготовить запрос",
      "reviewNote": "Проверьте заявку, затем отправьте её через почтовое приложение.",
      "projectBrief": "Ваша заявка на проект",
      "openEmail": "Открыть почту",
      "copy": "Скопировать заявку",
      "ready": "Заявка готова к проверке.",
      "directBefore": "Вы также можете",
      "directEmail": "отправить информацию о проекте напрямую по электронной почте",
      "directAfter": "."
    },
    "related": {
      "kicker": "ПРОДОЛЖИТЕ ВАШ ПРОЕКТ МОНИТОРИНГА",
      "all": "Все датчики",
      "air": "Мониторинг качества воздуха",
      "tilt": "Мониторинг наклона"
    },
    "image": {
      "creditLabel": "Фото:",
      "creditChanges": "Изменён размер, выполнена обрезка и преобразование в WebP"
    },
    "schema": {
      "home": "Главная",
      "sensors": "Датчики IoT",
      "temperature": "Беспроводной датчик температуры",
      "productGroup": "Беспроводные датчики температуры Hitelecom H Series",
      "productVariant": "Датчик температуры Hitelecom {model}",
      "variantDescription": "Опубликованное семейство моделей H Series. Исполнение устройства, измерительная часть и режим работы подбираются для проекта."
    },
    "js": {
      "modelPrefix": "Интересующая модель: {model}",
      "subject": "Беспроводной датчик температуры H Series — запрос по проекту",
      "greeting": "Здравствуйте, Hitelecom!",
      "intro": "Хочу обсудить проект беспроводного мониторинга температуры.",
      "application": "Область применения",
      "country": "Страна",
      "quantity": "Количество",
      "measurement": "Измерение",
      "temperatureRange": "Диапазон температуры",
      "connectivity": "Связь",
      "requirements": "Требования",
      "pleaseAdvise": "Нужна рекомендация",
      "request": "Пожалуйста, порекомендуйте подходящие модель и конфигурацию, предоставьте соответствующее техническое описание и расчёт стоимости.",
      "thanks": "Спасибо.",
      "directSubject": "Проект с беспроводным датчиком температуры",
      "ready": "Заявка готова. Проверьте её и откройте почтовое приложение для отправки.",
      "copied": "Заявка на проект скопирована.",
      "select": "Заявка выделена. Используйте команду копирования вашего устройства.",
      "wechatCopied": "ID WeChat скопирован.",
      "wechatSelected": "ID выделен. Используйте команду копирования вашего устройства."
    }
  }
};

export default TEMPERATURE_DICTS;
