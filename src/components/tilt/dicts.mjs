/**
 * 倾斜传感器页 · UI 文案词典（GPT6 各语稿，Kimi 审核集成 2026-10-07）
 * en 基线 = 线上 TiltPage 硬编码原文逐字收录；fr/de/ja/ru/es 来自 GPT6 翻译包。
 * 审核修正：① 表单占位符去双重“例如”前缀；② 表注模板化（{m}=型号）；
 * ③ 数据表按钮文案以 tilt-content-{lang}.json 的 model.datasheet.label 为准
 *    （GPT6 包残留 mailto 时代“索取”措辞，已弃用）；④ JS 邮件文案按各语习惯组稿。
 * h1: spanB 非空时 spanA/spanB 间渲染 <br class="desktop-break"/>（en/ja）；
 * featH2b 为 null 时特性 H2 单行渲染（fr/de/ru/es）。
 */
export const TILT_DICTS = {
  "en": {
    "bcAria": "Breadcrumb",
    "bc": [
      "Home",
      "IoT Sensors",
      "Wireless tilt sensor"
    ],
    "h1": {
      "main": "Wireless tilt sensor.",
      "spanA": "A clearer view",
      "spanB": " of change."
    },
    "heroAlt": "Hitelecom wireless tilt sensor with mounting lugs and antenna",
    "heroCaption": "Remote inclination monitoring",
    "metrics": [
      {
        "value": "0.001°",
        "label": "Accuracy grade available",
        "note": "H310-TS180C · selected configuration"
      },
      {
        "value": "IP68 / IP66",
        "label": "Enclosure options",
        "note": "Metal / plastic · by configuration"
      },
      {
        "value": "Your platform",
        "label": "Data integration",
        "note": "MQTT-capable model configurations"
      }
    ],
    "navAria": "On this page",
    "nav": [
      "Overview",
      "Applications",
      "Specifications",
      "Integration",
      "FAQ"
    ],
    "navQuote": "Request a quote ↗",
    "featKicker": "KEY FEATURES",
    "featH2a": "Made for the way",
    "featH2b": "you monitor.",
    "featLead": "Match measurement performance, installation and connectivity to the asset you need to observe.",
    "ovCta": "Find your application",
    "read": {
      "label": "FROM READING TO INSIGHT",
      "sample": "Illustrative readings",
      "refLabel": "Installation reference",
      "refVal": "0.30°",
      "laterLabel": "Later reading",
      "laterVal": "0.45°",
      "changeLabel": "Change from reference",
      "changeVal": "+0.15°",
      "note": "A consistent reference makes the angle history easier to interpret at each monitored point."
    },
    "profNoteLabel": "H310-TS180C · OPERATING PROFILE",
    "profNoteStrong": "Frequent sensing. Scheduled reporting.",
    "sceneMpLabel": "Monitoring point",
    "scenePbLabel": "Plan your installation",
    "sceneCta": "Discuss this application",
    "modelLabel": "MODEL REFERENCE",
    "configCta": "Select a configuration ↓",
    "specCaption": "{m} — published technical specifications",
    "handoverCta": "Discuss platform integration ↗",
    "faqCta": "Ask about your project ↗",
    "faqLinkFallback": "Explore the details",
    "benefitsTitle": "Start with three details.",
    "benefitsText": "Your application, installation country and estimated quantity. Add a site photo or platform requirements to your email when available.",
    "formLabel": "PROJECT ENQUIRY",
    "formTitle": "Let’s find your configuration.",
    "formSubtitle": "H Series wireless tilt monitoring",
    "appLabel": "Application",
    "appChoose": "Choose your application",
    "appOther": "Other / project-specific",
    "countryLabel": "Country / region",
    "countryPh": "e.g. United Kingdom",
    "qtyLabel": "Estimated quantity",
    "qtyPh": "e.g. 20",
    "connLabel": "Preferred connectivity",
    "connAdvise": "Please advise",
    "connOptions": [
      "Please advise",
      "4G LTE",
      "NB-IoT",
      "LoRa"
    ],
    "reqLabel": "What would you like to monitor?",
    "reqPh": "Asset, angle performance, reporting needs or platform requirements",
    "submit": "Prepare my enquiry",
    "submitNote": "Review your brief, then send it with your email app.",
    "summaryLabel": "Your project brief",
    "openEmail": "Open email ↗",
    "copyBrief": "Copy brief",
    "statusReady": "Your brief is ready to review.",
    "noscriptPre": "You can also ",
    "noscriptLink": "email your project details directly",
    "noscriptPost": ".",
    "noscriptSubject": "Wireless tilt sensor project",
    "relKicker": "CONTINUE YOUR MONITORING PROJECT",
    "relLinks": [
      {
        "label": "Vibration monitoring ↗",
        "href": "/product/vibration-sensor"
      },
      {
        "label": "Distance monitoring ↗",
        "href": "/product/radar-distance-sensor"
      },
      {
        "label": "Air quality monitoring ↗",
        "href": "/product/air-quality-sensor"
      }
    ],
    "mobileQuote": "Discuss your project",
    "js": {
      "subject": "H Series wireless tilt sensor — project enquiry",
      "greet": "Hello Hitelecom,",
      "intro": "I would like to discuss a wireless tilt monitoring project.",
      "labels": {
        "Application": "Application",
        "Country": "Country",
        "Quantity": "Quantity",
        "Connectivity": "Connectivity",
        "Requirements": "Requirements"
      },
      "fallback": "Please advise",
      "closing": "Please advise on a suitable model, configuration, supporting datasheet and quotation.",
      "thanks": "Thank you.",
      "ready": "Your brief is ready. Review it and open your email app to send.",
      "copied": "Project brief copied.",
      "selected": "Your brief is selected. Use your device’s copy command.",
      "modelPrefix": "Model of interest"
    },
    "bcLd": [
      "Home",
      "IoT Sensors",
      "Wireless Tilt Sensor"
    ],
    "serKicker": "SERIES & CONFIGURATIONS"
  },
  "fr": {
    "bcAria": "Fil d’Ariane",
    "bc": [
      "Accueil",
      "Capteurs IoT",
      "Capteur d’inclinaison sans fil"
    ],
    "h1": {
      "main": "Capteur d’inclinaison sans fil.",
      "spanA": "Une vision plus claire des changements.",
      "spanB": null
    },
    "heroAlt": "Capteur d’inclinaison sans fil Hitelecom avec pattes de fixation et antenne",
    "heroCaption": "Suivi de l’inclinaison à distance",
    "metrics": [
      {
        "value": "0,001°",
        "label": "Exactitude de mesure disponible",
        "note": "H310-TS180C · selon la configuration"
      },
      {
        "value": "IP68 / IP66",
        "label": "Options de boîtier",
        "note": "Métal / plastique · selon la configuration"
      },
      {
        "value": "Votre plateforme",
        "label": "Intégration des données",
        "note": "Configurations compatibles avec MQTT"
      }
    ],
    "navAria": "Sur cette page",
    "nav": [
      "Présentation",
      "Applications",
      "Spécifications",
      "Intégration",
      "Questions"
    ],
    "navQuote": "Demander un devis ↗",
    "featKicker": "PRINCIPALES CARACTÉRISTIQUES",
    "featH2a": "Pensé pour votre mode de surveillance.",
    "featH2b": null,
    "featLead": "Adaptez les performances de mesure, l’installation et la connectivité à l’élément que vous souhaitez surveiller.",
    "ovCta": "Trouvez votre application",
    "read": {
      "label": "DE LA MESURE À L’ANALYSE",
      "sample": "Exemples de mesures",
      "refLabel": "Référence à l’installation",
      "refVal": "0,30°",
      "laterLabel": "Mesure ultérieure",
      "laterVal": "0,45°",
      "changeLabel": "Variation par rapport à la référence",
      "changeVal": "+0,15°",
      "note": "Une référence stable facilite l’interprétation de l’historique d’inclinaison à chaque point surveillé."
    },
    "profNoteLabel": "H310-TS180C · PROFIL DE FONCTIONNEMENT",
    "profNoteStrong": "Mesures fréquentes. Transmission des données planifiée.",
    "sceneMpLabel": "Point de surveillance",
    "scenePbLabel": "Préparez votre installation",
    "sceneCta": "Parlons de cette application",
    "modelLabel": "MODÈLE DE RÉFÉRENCE",
    "configCta": "Choisir une configuration ↓",
    "specCaption": "{m} — spécifications techniques publiées",
    "handoverCta": "Parlons de l’intégration ↗",
    "faqCta": "Parlons de votre projet ↗",
    "faqLinkFallback": "Voir le détail",
    "benefitsTitle": "Trois informations pour commencer.",
    "benefitsText": "Précisez l’application, le pays d’installation et la quantité estimée. Si vous en disposez, joignez à votre e-mail une photo du site ou les exigences de votre plateforme.",
    "formLabel": "DEMANDE POUR VOTRE PROJET",
    "formTitle": "Trouvons votre configuration.",
    "formSubtitle": "Surveillance sans fil de l’inclinaison · série H",
    "appLabel": "Application",
    "appChoose": "Choisissez une application",
    "appOther": "Autre / spécifique au projet",
    "countryLabel": "Pays / région",
    "countryPh": "Ex. : France",
    "qtyLabel": "Quantité estimée",
    "qtyPh": "Ex. : 20",
    "connLabel": "Connectivité souhaitée",
    "connAdvise": "À définir ensemble",
    "connOptions": [
      "À définir ensemble",
      "4G LTE",
      "NB-IoT",
      "LoRa"
    ],
    "reqLabel": "Que souhaitez-vous surveiller ?",
    "reqPh": "Élément à surveiller, performances de mesure angulaire, besoins de transmission des données ou exigences de la plateforme",
    "submit": "Préparer ma demande",
    "submitNote": "Vérifiez le résumé, puis envoyez-le depuis votre application de messagerie.",
    "summaryLabel": "Résumé de votre projet",
    "openEmail": "Ouvrir la messagerie ↗",
    "copyBrief": "Copier le résumé",
    "statusReady": "Votre résumé est prêt. Vous pouvez le vérifier.",
    "noscriptPre": "Vous pouvez aussi",
    "noscriptLink": "nous envoyer directement les détails de votre projet par e-mail",
    "noscriptPost": ".",
    "noscriptSubject": "Projet de capteur d’inclinaison sans fil",
    "relKicker": "POURSUIVEZ VOTRE PROJET DE SURVEILLANCE",
    "relLinks": [
      {
        "label": "Surveillance des vibrations ↗",
        "href": "/fr/product/vibration-sensor"
      },
      {
        "label": "Suivi des distances ↗",
        "href": "/fr/product/radar-distance-sensor"
      },
      {
        "label": "Suivi de la qualité de l’air ↗",
        "href": "/fr/product/air-quality-sensor"
      }
    ],
    "mobileQuote": "Parlons de votre projet",
    "js": {
      "subject": "Capteur d’inclinaison sans fil série H — Demande de projet",
      "greet": "Bonjour Hitelecom,",
      "intro": "Je souhaite discuter d’un projet de surveillance de l’inclinaison sans fil.",
      "labels": {
        "Application": "Application",
        "Country": "Pays / région",
        "Quantity": "Quantité",
        "Connectivity": "Connectivité",
        "Requirements": "Besoins"
      },
      "closing": "Merci de me conseiller sur le modèle approprié, la configuration, la fiche technique et un devis.",
      "thanks": "Merci.",
      "ready": "Votre résumé est prêt. Vérifiez-le puis ouvrez votre messagerie pour l’envoyer.",
      "copied": "Résumé du projet copié.",
      "selected": "Le résumé est sélectionné. Utilisez la commande de copie de votre appareil.",
      "modelPrefix": "Modèle souhaité",
      "fallback": "À définir ensemble"
    },
    "bcLd": [
      "Accueil",
      "Capteurs IoT",
      "Capteur d’inclinaison sans fil"
    ],
    "serKicker": "SÉRIE ET CONFIGURATIONS"
  },
  "de": {
    "bcAria": "Brotkrümelnavigation",
    "bc": [
      "Startseite",
      "IoT-Sensoren",
      "Drahtloser Neigungssensor"
    ],
    "h1": {
      "main": "Drahtloser Neigungssensor.",
      "spanA": "Veränderungen klar erkennen.",
      "spanB": null
    },
    "heroAlt": "Drahtloser Neigungssensor von Hitelecom mit Befestigungslaschen und Antenne",
    "heroCaption": "Neigung aus der Ferne überwachen",
    "metrics": [
      {
        "value": "0,001°",
        "label": "Verfügbare Messgenauigkeit",
        "note": "H310-TS180C · gewählte Konfiguration"
      },
      {
        "value": "IP68 / IP66",
        "label": "Gehäuseoptionen",
        "note": "Metall / Kunststoff · je nach Konfiguration"
      },
      {
        "value": "Ihre Plattform",
        "label": "Datenintegration",
        "note": "Modellkonfigurationen mit MQTT"
      }
    ],
    "navAria": "Auf dieser Seite",
    "nav": [
      "Überblick",
      "Anwendungen",
      "Technische Daten",
      "Integration",
      "Fragen"
    ],
    "navQuote": "Angebot anfordern ↗",
    "featKicker": "WICHTIGE MERKMALE",
    "featH2a": "Auf Ihre Überwachung abgestimmt.",
    "featH2b": null,
    "featLead": "Stimmen Sie Messeigenschaften, Installation und Konnektivität auf das zu überwachende Objekt ab.",
    "ovCta": "Ihre Anwendung finden",
    "read": {
      "label": "VOM MESSWERT ZUR ERKENNTNIS",
      "sample": "Beispielwerte",
      "refLabel": "Referenzwert bei Montage",
      "refVal": "0,30°",
      "laterLabel": "Späterer Messwert",
      "laterVal": "0,45°",
      "changeLabel": "Änderung zum Referenzwert",
      "changeVal": "+0,15°",
      "note": "Eine feste Referenz erleichtert die Auswertung des Neigungsverlaufs an jedem überwachten Messpunkt."
    },
    "profNoteLabel": "H310-TS180C · BETRIEBSPROFIL",
    "profNoteStrong": "Häufige Messungen. Geplante Datenübertragung.",
    "sceneMpLabel": "Messpunkt",
    "scenePbLabel": "Installation planen",
    "sceneCta": "Diese Anwendung besprechen",
    "modelLabel": "REFERENZMODELL",
    "configCta": "Konfiguration wählen ↓",
    "specCaption": "{m} — veröffentlichte technische Daten",
    "handoverCta": "Plattformanbindung besprechen ↗",
    "faqCta": "Fragen zu Ihrem Projekt ↗",
    "faqLinkFallback": "Details ansehen",
    "benefitsTitle": "Drei Angaben zum Einstieg.",
    "benefitsText": "Nennen Sie Ihre Anwendung, das Einsatzland und die voraussichtliche Stückzahl. Ergänzen Sie Ihre E-Mail nach Möglichkeit um ein Foto des Standorts oder die Anforderungen Ihrer Plattform.",
    "formLabel": "PROJEKTANFRAGE",
    "formTitle": "Finden wir Ihre Konfiguration.",
    "formSubtitle": "Drahtlose Neigungsüberwachung · H-Serie",
    "appLabel": "Anwendung",
    "appChoose": "Anwendung auswählen",
    "appOther": "Sonstige / projektspezifisch",
    "countryLabel": "Land / Region",
    "countryPh": "z. B. Deutschland",
    "qtyLabel": "Voraussichtliche Stückzahl",
    "qtyPh": "z. B. 20",
    "connLabel": "Bevorzugte Funkanbindung",
    "connAdvise": "Bitte beraten Sie mich",
    "connOptions": [
      "Bitte beraten Sie mich",
      "4G LTE",
      "NB-IoT",
      "LoRa"
    ],
    "reqLabel": "Was möchten Sie überwachen?",
    "reqPh": "Zu überwachendes Objekt, Anforderungen an die Winkelmessung, Datenübertragung oder Plattform",
    "submit": "Anfrage vorbereiten",
    "submitNote": "Prüfen Sie Ihre Projektübersicht und senden Sie sie über Ihr E-Mail-Programm.",
    "summaryLabel": "Ihre Projektübersicht",
    "openEmail": "E-Mail-Programm öffnen ↗",
    "copyBrief": "Text kopieren",
    "statusReady": "Ihre Projektübersicht ist bereit zur Prüfung.",
    "noscriptPre": "Sie können uns Ihre",
    "noscriptLink": "Projektdetails auch direkt per E-Mail senden",
    "noscriptPost": ".",
    "noscriptSubject": "Drahtloser Neigungssensor — Projekt",
    "relKicker": "ERGÄNZEN SIE IHR ÜBERWACHUNGSPROJEKT",
    "relLinks": [
      {
        "label": "Schwingungsüberwachung ↗",
        "href": "/de/product/vibration-sensor"
      },
      {
        "label": "Abstandsüberwachung ↗",
        "href": "/de/product/radar-distance-sensor"
      },
      {
        "label": "Luftqualität überwachen ↗",
        "href": "/de/product/air-quality-sensor"
      }
    ],
    "mobileQuote": "Projekt besprechen",
    "js": {
      "subject": "Drahtloser Neigungssensor der H-Serie — Projektanfrage",
      "greet": "Guten Tag Hitelecom,",
      "intro": "Ich möchte ein Projekt zur drahtlosen Neigungsüberwachung besprechen.",
      "labels": {
        "Application": "Anwendung",
        "Country": "Land / Region",
        "Quantity": "Stückzahl",
        "Connectivity": "Funkanbindung",
        "Requirements": "Anforderungen"
      },
      "closing": "Bitte beraten Sie mich zu einem geeigneten Modell, der Konfiguration, dem Datenblatt und einem Angebot.",
      "thanks": "Vielen Dank.",
      "ready": "Ihre Projektübersicht ist bereit. Prüfen Sie sie und öffnen Sie Ihr E-Mail-Programm zum Senden.",
      "copied": "Projektübersicht kopiert.",
      "selected": "Ihre Projektübersicht ist markiert. Nutzen Sie den Kopierbefehl Ihres Geräts.",
      "modelPrefix": "Gewünschtes Modell",
      "fallback": "Bitte beraten Sie mich"
    },
    "bcLd": [
      "Startseite",
      "IoT-Sensoren",
      "Drahtloser Neigungssensor"
    ],
    "serKicker": "SERIE UND KONFIGURATIONEN"
  },
  "ja": {
    "bcAria": "パンくずリスト",
    "bc": [
      "ホーム",
      "IoTセンサー",
      "ワイヤレス傾斜センサー"
    ],
    "h1": {
      "main": "ワイヤレス傾斜センサー",
      "spanA": "変化を、",
      "spanB": "より明確に。"
    },
    "heroAlt": "取付ラグとアンテナを備えたHitelecomワイヤレス傾斜センサー",
    "heroCaption": "傾斜を遠隔監視",
    "metrics": [
      {
        "value": "0.001°",
        "label": "選択可能な測定精度",
        "note": "H310-TS180C・選択した構成による"
      },
      {
        "value": "IP68 / IP66",
        "label": "筐体の選択肢",
        "note": "金属／樹脂・構成による"
      },
      {
        "value": "自社システム",
        "label": "データ連携",
        "note": "MQTT対応のモデル構成"
      }
    ],
    "navAria": "このページの内容",
    "nav": [
      "概要",
      "用途",
      "仕様",
      "システム連携",
      "よくあるご質問"
    ],
    "navQuote": "見積もりを依頼する ↗",
    "featKicker": "主な特長",
    "featH2a": "監視の方法に",
    "featH2b": "合わせた構成を。",
    "featLead": "監視する対象に合わせて、測定性能、取付方法、通信方式を選択できます。",
    "ovCta": "用途から探す",
    "read": {
      "label": "測定値から変化を読み取る",
      "sample": "測定値の例",
      "refLabel": "設置時の基準値",
      "refVal": "0.30°",
      "laterLabel": "その後の測定値",
      "laterVal": "0.45°",
      "changeLabel": "基準値からの変化",
      "changeVal": "+0.15°",
      "note": "一定の基準と比較することで、各測定点における傾斜の推移を把握しやすくなります。"
    },
    "profNoteLabel": "H310-TS180C・動作条件",
    "profNoteStrong": "こまめに測定。データ送信は設定した間隔で。",
    "sceneMpLabel": "測定位置",
    "scenePbLabel": "設置計画のポイント",
    "sceneCta": "この用途について相談する",
    "modelLabel": "掲載モデル",
    "configCta": "構成を選ぶ ↓",
    "specCaption": "{m} — 公開技術仕様",
    "handoverCta": "システム連携を相談する ↗",
    "faqCta": "導入について相談する ↗",
    "faqLinkFallback": "詳しく見る",
    "benefitsTitle": "まずは3つの情報から。",
    "benefitsText": "用途、設置する国、導入予定数量をお知らせください。現場写真やプラットフォームの要件があれば、メールに添えてお送りください。",
    "formLabel": "導入相談",
    "formTitle": "適した構成を一緒に検討します。",
    "formSubtitle": "Hシリーズによるワイヤレス傾斜監視",
    "appLabel": "用途",
    "appChoose": "用途を選択してください",
    "appOther": "その他／個別の用途",
    "countryLabel": "国・地域",
    "countryPh": "例：日本",
    "qtyLabel": "導入予定数量",
    "qtyPh": "例：20",
    "connLabel": "ご希望の通信方式",
    "connAdvise": "相談して決めたい",
    "connOptions": [
      "相談して決めたい",
      "4G LTE",
      "NB-IoT",
      "LoRa"
    ],
    "reqLabel": "どのような対象を監視したいですか？",
    "reqPh": "監視対象、角度測定に求める性能、データ送信やプラットフォームの要件など",
    "submit": "相談内容を作成する",
    "submitNote": "内容をご確認のうえ、メールアプリからお送りください。",
    "summaryLabel": "ご相談内容",
    "openEmail": "メールアプリを開く ↗",
    "copyBrief": "内容をコピー",
    "statusReady": "相談内容を作成しました。ご確認ください。",
    "noscriptPre": "ご相談内容を",
    "noscriptLink": "直接メールでお送りいただくこともできます",
    "noscriptPost": "。",
    "noscriptSubject": "ワイヤレス傾斜センサーのご相談",
    "relKicker": "監視計画の次のステップへ",
    "relLinks": [
      {
        "label": "振動監視 ↗",
        "href": "/ja/product/vibration-sensor"
      },
      {
        "label": "距離監視 ↗",
        "href": "/ja/product/radar-distance-sensor"
      },
      {
        "label": "空気質の監視 ↗",
        "href": "/ja/product/air-quality-sensor"
      }
    ],
    "mobileQuote": "導入を相談する",
    "js": {
      "subject": "Hシリーズ ワイヤレス傾斜センサー — 導入のご相談",
      "greet": "Hitelecom ご担当者様",
      "intro": "ワイヤレス傾斜監視のプロジェクトについて相談したいです。",
      "labels": {
        "Application": "用途",
        "Country": "国・地域",
        "Quantity": "数量",
        "Connectivity": "通信方式",
        "Requirements": "ご要件"
      },
      "closing": "適切なモデル、構成、データシート、お見積もりについてご提案ください。",
      "thanks": "よろしくお願いいたします。",
      "ready": "ご相談内容の準備ができました。内容を確認し、メールアプリを開いて送信してください。",
      "copied": "ご相談内容をコピーしました。",
      "selected": "ご相談内容が選択されました。お使いのデバイスのコピー機能をご利用ください。",
      "modelPrefix": "希望モデル",
      "fallback": "相談して決めたい"
    },
    "bcLd": [
      "ホーム",
      "IoTセンサー",
      "ワイヤレス傾斜センサー"
    ],
    "serKicker": "シリーズと構成"
  },
  "ru": {
    "bcAria": "Хлебные крошки",
    "bc": [
      "Главная",
      "Датчики IoT",
      "Беспроводной датчик наклона"
    ],
    "h1": {
      "main": "Беспроводной датчик наклона.",
      "spanA": "Изменения видны яснее.",
      "spanB": null
    },
    "heroAlt": "Беспроводной датчик наклона Hitelecom с монтажными проушинами и антенной",
    "heroCaption": "Дистанционный мониторинг наклона",
    "metrics": [
      {
        "value": "0,001°",
        "label": "Доступная точность измерения",
        "note": "H310-TS180C · в выбранной конфигурации"
      },
      {
        "value": "IP68 / IP66",
        "label": "Варианты корпуса",
        "note": "Металл / пластик · по конфигурации"
      },
      {
        "value": "Ваша платформа",
        "label": "Интеграция данных",
        "note": "Конфигурации моделей с поддержкой MQTT"
      }
    ],
    "navAria": "На этой странице",
    "nav": [
      "Обзор",
      "Применение",
      "Характеристики",
      "Интеграция",
      "Вопросы"
    ],
    "navQuote": "Запросить предложение ↗",
    "featKicker": "ОСНОВНЫЕ ВОЗМОЖНОСТИ",
    "featH2a": "С учётом ваших задач мониторинга.",
    "featH2b": null,
    "featLead": "Выберите параметры измерения, способ монтажа и тип связи с учётом объекта мониторинга.",
    "ovCta": "Выбрать задачу",
    "read": {
      "label": "ОТ ПОКАЗАНИЙ К ПОНИМАНИЮ",
      "sample": "Пример показаний",
      "refLabel": "Исходное значение",
      "refVal": "0,30°",
      "laterLabel": "Последующее значение",
      "laterVal": "0,45°",
      "changeLabel": "Изменение относительно базы",
      "changeVal": "+0,15°",
      "note": "Сравнение с неизменным исходным значением помогает анализировать историю наклона в каждой точке контроля."
    },
    "profNoteLabel": "H310-TS180C · РЕЖИМ РАБОТЫ",
    "profNoteStrong": "Частые измерения. Передача данных по расписанию.",
    "sceneMpLabel": "Точка контроля",
    "scenePbLabel": "Планирование установки",
    "sceneCta": "Обсудить эту задачу",
    "modelLabel": "МОДЕЛЬ",
    "configCta": "Выбрать конфигурацию ↓",
    "specCaption": "{m} — опубликованные технические характеристики",
    "handoverCta": "Обсудить интеграцию ↗",
    "faqCta": "Задать вопрос о проекте ↗",
    "faqLinkFallback": "Подробнее",
    "benefitsTitle": "Для начала — три пункта.",
    "benefitsText": "Укажите задачу, страну установки и примерное количество устройств. Если возможно, приложите к письму фото объекта или требования к платформе.",
    "formLabel": "ЗАПРОС ПО ПРОЕКТУ",
    "formTitle": "Подберём вашу конфигурацию.",
    "formSubtitle": "Беспроводной мониторинг наклона · серия H",
    "appLabel": "Область применения",
    "appChoose": "Выберите область применения",
    "appOther": "Другое / индивидуальный проект",
    "countryLabel": "Страна / регион",
    "countryPh": "Например, Россия",
    "qtyLabel": "Примерное количество",
    "qtyPh": "Например, 20",
    "connLabel": "Предпочтительный тип связи",
    "connAdvise": "Нужна рекомендация",
    "connOptions": [
      "Нужна рекомендация",
      "4G LTE",
      "NB-IoT",
      "LoRa"
    ],
    "reqLabel": "Что вы хотите контролировать?",
    "reqPh": "Объект, требования к измерению угла, передаче данных или платформе",
    "submit": "Подготовить запрос",
    "submitNote": "Проверьте описание проекта и отправьте его через почтовое приложение.",
    "summaryLabel": "Краткое описание проекта",
    "openEmail": "Открыть почту ↗",
    "copyBrief": "Скопировать текст",
    "statusReady": "Описание проекта готово к проверке.",
    "noscriptPre": "Вы также можете",
    "noscriptLink": "отправить сведения о проекте напрямую по электронной почте",
    "noscriptPost": ".",
    "noscriptSubject": "Проект с беспроводным датчиком наклона",
    "relKicker": "ДОПОЛНИТЕ ВАШ ПРОЕКТ МОНИТОРИНГА",
    "relLinks": [
      {
        "label": "Мониторинг вибрации ↗",
        "href": "/ru/product/vibration-sensor"
      },
      {
        "label": "Контроль расстояния ↗",
        "href": "/ru/product/radar-distance-sensor"
      },
      {
        "label": "Контроль качества воздуха ↗",
        "href": "/ru/product/air-quality-sensor"
      }
    ],
    "mobileQuote": "Обсудить проект",
    "js": {
      "subject": "Беспроводной датчик наклона серии H — запрос по проекту",
      "greet": "Здравствуйте, команда Hitelecom!",
      "intro": "Хочу обсудить проект беспроводного мониторинга наклона.",
      "labels": {
        "Application": "Применение",
        "Country": "Страна / регион",
        "Quantity": "Количество",
        "Connectivity": "Связь",
        "Requirements": "Требования"
      },
      "closing": "Прошу посоветовать подходящую модель, конфигурацию, техническое описание и коммерческое предложение.",
      "thanks": "Спасибо.",
      "ready": "Ваш запрос готов. Проверьте его и откройте почтовую программу для отправки.",
      "copied": "Запрос скопирован.",
      "selected": "Текст запроса выделен. Используйте команду копирования на вашем устройстве.",
      "modelPrefix": "Интересующая модель",
      "fallback": "Нужна рекомендация"
    },
    "bcLd": [
      "Главная",
      "Датчики IoT",
      "Беспроводной датчик наклона"
    ],
    "serKicker": "СЕРИЯ И КОНФИГУРАЦИИ"
  },
  "es": {
    "bcAria": "Miga de pan",
    "bc": [
      "Inicio",
      "Sensores IoT",
      "Sensor de inclinación inalámbrico"
    ],
    "h1": {
      "main": "Sensor de inclinación inalámbrico.",
      "spanA": "Una visión clara de los cambios.",
      "spanB": null
    },
    "heroAlt": "Sensor de inclinación inalámbrico Hitelecom con orejetas de montaje y antena",
    "heroCaption": "Monitorización remota de la inclinación",
    "metrics": [
      {
        "value": "0,001°",
        "label": "Grado de exactitud disponible",
        "note": "H310-TS180C · según configuración"
      },
      {
        "value": "IP68 / IP66",
        "label": "Opciones de carcasa",
        "note": "Metal / plástico · según configuración"
      },
      {
        "value": "Su plataforma",
        "label": "Integración de datos",
        "note": "Configuraciones compatibles con MQTT"
      }
    ],
    "navAria": "En esta página",
    "nav": [
      "Resumen",
      "Aplicaciones",
      "Especificaciones",
      "Integración",
      "Preguntas"
    ],
    "navQuote": "Solicitar presupuesto ↗",
    "featKicker": "CARACTERÍSTICAS PRINCIPALES",
    "featH2a": "Diseñado para su forma de medir.",
    "featH2b": null,
    "featLead": "Adapte las prestaciones de medición, la instalación y la conectividad al elemento que necesita supervisar.",
    "ovCta": "Encuentre su aplicación",
    "read": {
      "label": "DE LA LECTURA AL ANÁLISISLecturas de ejemplo",
      "sample": "",
      "refLabel": "Referencia inicial",
      "refVal": "0,30°",
      "laterLabel": "Lectura posterior",
      "laterVal": "0,45°",
      "changeLabel": "Cambio respecto a la referencia",
      "changeVal": "+0,15°",
      "note": "Una referencia estable facilita la interpretación del historial de inclinación de cada punto monitorizado."
    },
    "profNoteLabel": "H310-TS180C · PERFIL DE FUNCIONAMIENTO",
    "profNoteStrong": "Medición frecuente. Envío programado.",
    "sceneMpLabel": "Punto de monitorización",
    "scenePbLabel": "Planifique la instalación",
    "sceneCta": "Consultar esta aplicación",
    "modelLabel": "MODELO DE REFERENCIA",
    "configCta": "Elegir configuración ↓",
    "specCaption": "{m} — especificaciones técnicas publicadas",
    "handoverCta": "Consultar la integración ↗",
    "faqCta": "Consultar su proyecto ↗",
    "faqLinkFallback": "Ver los detalles",
    "benefitsTitle": "Empiece por tres datos.",
    "benefitsText": "Indique la aplicación, el país de instalación y la cantidad estimada. Si dispone de ellos, añada a su correo una foto del lugar o los requisitos de la plataforma.",
    "formLabel": "CONSULTA DE PROYECTO",
    "formTitle": "Definamos su configuración.",
    "formSubtitle": "Monitorización inalámbrica de inclinación · Serie H",
    "appLabel": "Aplicación",
    "appChoose": "Elija una aplicación",
    "appOther": "Otra / específica del proyecto",
    "countryLabel": "País / región",
    "countryPh": "p. ej., España",
    "qtyLabel": "Cantidad estimada",
    "qtyPh": "p. ej., 20",
    "connLabel": "Conectividad preferida",
    "connAdvise": "Necesito asesoramiento",
    "connOptions": [
      "Necesito asesoramiento",
      "4G LTE",
      "NB-IoT",
      "LoRa"
    ],
    "reqLabel": "¿Qué necesita monitorizar?",
    "reqPh": "Elemento que desea monitorizar, prestaciones de medición angular, necesidades de envío o requisitos de la plataforma",
    "submit": "Preparar mi consulta",
    "submitNote": "Revise el resumen y envíelo desde su aplicación de correo.",
    "summaryLabel": "Resumen de su proyecto",
    "openEmail": "Abrir correo ↗",
    "copyBrief": "Copiar resumen",
    "statusReady": "El resumen está listo para su revisión.",
    "noscriptPre": "También puede",
    "noscriptLink": "enviarnos directamente los detalles de su proyecto por correo",
    "noscriptPost": ".",
    "noscriptSubject": "Proyecto de sensor de inclinación inalámbrico",
    "relKicker": "COMPLETE SU PROYECTO DE MONITORIZACIÓN",
    "relLinks": [
      {
        "label": "Monitorización de vibraciones ↗",
        "href": "/es/product/vibration-sensor"
      },
      {
        "label": "Medición de distancias ↗",
        "href": "/es/product/radar-distance-sensor"
      },
      {
        "label": "Monitorización de la calidad del aire ↗",
        "href": "/es/product/air-quality-sensor"
      }
    ],
    "mobileQuote": "Consultar su proyecto",
    "js": {
      "subject": "Sensor de inclinación inalámbrico serie H — Consulta de proyecto",
      "greet": "Estimado equipo de Hitelecom:",
      "intro": "Me gustaría hablar de un proyecto de monitorización de inclinación inalámbrica.",
      "labels": {
        "Application": "Aplicación",
        "Country": "País / región",
        "Quantity": "Cantidad",
        "Connectivity": "Conectividad",
        "Requirements": "Requisitos"
      },
      "closing": "Le agradecería que me asesorara sobre el modelo adecuado, la configuración, la ficha técnica y un presupuesto.",
      "thanks": "Gracias.",
      "ready": "Su resumen está listo. Revíselo y abra su aplicación de correo para enviarlo.",
      "copied": "Resumen del proyecto copiado.",
      "selected": "El resumen está seleccionado. Use el comando de copiar de su dispositivo.",
      "modelPrefix": "Modelo de interés",
      "fallback": "Necesito asesoramiento"
    },
    "bcLd": [
      "Inicio",
      "Sensores IoT",
      "Sensor de inclinación inalámbrico"
    ],
    "serKicker": "SERIE Y CONFIGURACIONES"
  }
};

export default TILT_DICTS;
