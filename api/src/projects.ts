export interface Project {
  slug: string
  title: string
  short: string
  tags: string[]
  description: string
  features: string[]
  skills: string[]
  media?: Array<{ type: "image" | "video"; src: string; alt?: string }>
}

export const projects: Project[] = [
  {
    slug: "falco-ws-environment",
    title: "Falco WS Environment",
    short: "Piattaforma modulare IoT per monitoraggio industriale: PWA officina, dashboard telemetria CNC, backend REST con MQTT.",
    tags: ["Vue 2/3", "Node.js", "Docker", "Firebase"],
    description: "Sistema full-stack composto da tre software interconnessi per la gestione e il monitoraggio industriale.",
    features: [
      "PWA officina con 28+ viste: Gantt Syncfusion, commesse, preventivi, chat realtime, mappe Google",
      "PWA IoT per monitoraggio real-time torni CNC via MQTT con dashboard telemetria e Chart.js",
      "Backend Logistic: REST API, 10 cron job, generazione documenti DOCX/PDF/XLSX, sync FTP con macchinari",
    ],
    skills: [
      "Vue 2/3", "Vuetify", "TypeScript", "PWA", "MQTT", "Mosquitto",
      "Node.js", "Express", "TypeORM", "MariaDB", "Docker", "Chart.js",
      "Syncfusion", "Firebase",
    ],
    media: [],
  },
  {
    slug: "mail-thinker-ai",
    title: "Mail Thinker AI",
    short: "Agente AI autonomo per email: analizza caselle Gmail/IMAP, estrae allegati multi-formato, risponde con reasoning stateful.",
    tags: ["LangChain", "OpenAI", "Vue 3", "Docker"],
    description: "Agente AI con orchestration tool per la gestione autonoma della posta elettronica.",
    features: [
      "Agente AI con orchestration tool (deepagents/LangChain) e function calling OpenAI",
      "Reasoning effort configurabile, retry con exponential backoff",
      "Servizio email astratto: Gmail OAuth2 e IMAP via imapflow, decrittazione AES-256-GCM",
      "Pipeline parsing allegati multi-formato (PDF, DOCX, XLSX, PPTX, immagini via Vision API), conversione HTML→MarkDown",
      "Dashboard Vue 3 PWA con login OAuth2, chat interattiva con agente, i18n IT/EN",
    ],
    skills: [
      "Agentic AI", "LangChain", "OpenAI API", "ReAct Pattern", "Node.js",
      "TypeScript", "Express.js", "TypeORM", "MariaDB", "Gmail API",
      "OAuth2", "IMAP", "Vue 3", "Vuetify 4", "Docker",
    ],
    media: [],
  },
  {
    slug: "disaster-relief-department",
    title: "Disaster Relief Department",
    short: "Piattaforma di machine monitoring per allerte meteo-idrologiche e sismiche su tutto il territorio italiano.",
    tags: ["Telegram Bot", "GIS", "OpenAI", "Docker"],
    description: "Sistema end-to-end che acquisisce, elabora e distribuisce bollettini ufficiali di Protezione Civile e eventi sismici.",
    features: [
      "Pipeline ETL: acquisizione bollettini DPC e eventi sismici INGV/USGS",
      "Conversione geospaziale TopoJSON → GeoJSON → KML",
      "Bot Telegram con notifiche push real-time e tastiera interattiva",
      "Classificazione AI con OpenAI API per zone di allerta sconosciute",
      "Stima intensità Mercalli con modello GMPE (Boore-Atkinson)",
    ],
    skills: [
      "Geospatial ETL", "GDAL", "grammy", "Telegram API", "OpenAI API",
      "Sentry", "Firebase", "Docker", "TypeORM", "SQLite",
    ],
    media: [],
  },
  {
    slug: "piattaforma-gestione-territoriale",
    title: "Piattaforma Gestione Territoriale",
    short: "Sistema per gestione sedi operative, turni, risorse umane, manutenzione e reportistica. Due PWA + bot Telegram + CMS.",
    tags: ["Vue 2", "Node.js", "Strapi 5", "Docker"],
    description: "Sistema integrato per la gestione di sedi operative, turni e risorse umane su scala territoriale.",
    features: [
      "Due PWA: admin backoffice + client operativo",
      "Backend REST con TypeORM su MariaDB (19 entità)",
      "CMS Strapi 5 per guide multilingua",
      "Bot Telegram (grammy) per gestione turni e candidature",
      "9 cronjob per attivazione turni, reminder, notifiche manutenzione e sync CMS",
      "Reportistica configurabile con generazione automatica DOCX",
    ],
    skills: [
      "Node.js", "Express", "TypeORM", "MariaDB", "Vue 2", "Vuetify",
      "PWA", "grammy", "Docker Compose", "Apache", "Strapi 5", "Sentry",
    ],
    media: [],
  },
]
