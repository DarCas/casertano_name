/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type { Project } from "./projects"

export const projectsData: Project[] = [
    {
        "description": "Agente AI autonomo per la gestione intelligente della posta elettronica in linguaggio naturale, combinando i modelli OpenAI con un design transport-agnostic: Gmail API via OAuth2 e qualsiasi mailbox IMAP. Il backend Node.js/TypeScript usa DeepAgents e LangChain per il tool-calling su Express.js, TypeORM e MariaDB; il frontend è una SPA Vue 3/Vuetify che riproduce in streaming le risposte dell'agente via SSE. Credenziali protette con cifratura AES-256-GCM e key encapsulation RSA, stack orchestrato con Docker per sviluppo e produzione.",
        "features": [
            "Agente AI autonomo con DeepAgents e LangChain: tramite tool-calling cerca, legge e analizza conversazioni email in linguaggio naturale",
            "Doppio transport email — Gmail API via OAuth2 e IMAP (imapflow) — con credenziali cifrate AES-256-GCM e key encapsulation RSA",
            "Parser allegati interamente JavaScript per PDF, DOCX, XLSX, PPTX e immagini, analizzate con OpenAI Vision API",
            "Rilevamento automatico delle cartelle della mailbox e ricostruzione dei thread via header In-Reply-To e References",
            "HTTP API Express con risposte firmate JWT, validazione Zod e middleware di autenticazione centralizzati",
            "SPA Vue 3 e Vuetify con login, gestione mailbox e chat in streaming SSE, i18n IT/EN e installabile come PWA"
        ],
        "lib": false,
        "media": [
            {
                "src": "https://cms.casertano.name/uploads/agente_ai_autonomo_gestione_posta_d6ea8a3ef9.png",
                "type": "image",
                "alt": "Agente AI autonomo per la gestione della posta",
                "formats": {
                    "thumbnail": "https://cms.casertano.name/uploads/thumbnail_agente_ai_autonomo_gestione_posta_d6ea8a3ef9.png",
                    "small": "https://cms.casertano.name/uploads/small_agente_ai_autonomo_gestione_posta_d6ea8a3ef9.png",
                    "medium": "https://cms.casertano.name/uploads/medium_agente_ai_autonomo_gestione_posta_d6ea8a3ef9.png",
                    "large": "https://cms.casertano.name/uploads/large_agente_ai_autonomo_gestione_posta_d6ea8a3ef9.png"
                }
            }
        ],
        "short": "Agente AI autonomo che legge, analizza e gestisce la posta elettronica in linguaggio naturale su Gmail e IMAP, con allegati analizzati e risposte in streaming.",
        "skills": [
            "TypeScript",
            "Node.js",
            "Express.js",
            "TypeORM",
            "MariaDB",
            "DeepAgents",
            "LangChain",
            "OpenAI",
            "OpenAI Vision",
            "Gmail API",
            "IMAP",
            "OAuth2",
            "Vue 3",
            "Vuetify",
            "Docker"
        ],
        "slug": "agente-ai-autonomo-gestione-posta",
        "sort_order": 20,
        "tags": [
            "LangChain",
            "OpenAI",
            "Vue 3",
            "Docker",
            "Gmail API"
        ],
        "title": "Agente AI autonomo per la gestione della posta"
    },
    {
        "description": "Piattaforma backend TypeScript/Node.js che automatizza l'intero flusso di monitoraggio e distribuzione near-realtime delle allerte meteo della Protezione Civile e dei dati sismici di INGV, USGS ed EMSC/CSEM su tutto il territorio italiano. Converte i dati grezzi in GeoJSON/KML, li persiste su SQLite e notifica in tempo reale via Telegram Bot e Firebase Storage, orchestrando tutto su tre servizi Docker con tracciamento errori via Sentry.",
        "features": [
            "Ingestion real-time via WebSocket di EMSC SeismicPortal: deduplicazione, filtro geografico sul bounding box italiano e riconnessione con backoff esponenziale",
            "Cronjob idempotenti (DPC ogni 2 min, INGV/USGS ogni 5 min) con lock file-based e tracciamento SHA per un'acquisizione affidabile",
            "Pipeline geospaziale TopoJSON → GeoJSON → KML con riproiezione EPSG:4326 e classificazione automatica in livelli GIALLA, ARANCIONE e ROSSA",
            "Classificazione delle zone di allerta assistita da OpenAI come fallback, con cache su file per le regioni già risolte",
            "Telegram Bot (grammY) con registrazione approvata da admin, controllo accessi e notifiche push in base alla severità",
            "Infrastruttura Docker Compose su tre servizi (cronjob, telegram-bot, seismic) con build tipizzato e deploy remoto via rsync"
        ],
        "lib": false,
        "media": [
            {
                "src": "https://cms.casertano.name/uploads/allerte_meteo_sismiche_near_realtime_e0965370ac.png",
                "type": "image",
                "alt": "Allerte meteo e sismiche in near-realtime",
                "formats": {
                    "thumbnail": "https://cms.casertano.name/uploads/thumbnail_allerte_meteo_sismiche_near_realtime_e0965370ac.png",
                    "small": "https://cms.casertano.name/uploads/small_allerte_meteo_sismiche_near_realtime_e0965370ac.png",
                    "medium": "https://cms.casertano.name/uploads/medium_allerte_meteo_sismiche_near_realtime_e0965370ac.png",
                    "large": "https://cms.casertano.name/uploads/large_allerte_meteo_sismiche_near_realtime_e0965370ac.png"
                }
            }
        ],
        "short": "Allerte meteo-idrogeologiche e sismiche: piattaforma TypeScript/Node.js che raccoglie, processa e distribuisce in near-realtime su tutto il territorio italiano.",
        "skills": [
            "TypeScript",
            "Node.js 22",
            "yargs",
            "grammY",
            "Telegram API",
            "OpenAI API",
            "Firebase",
            "WebSocket",
            "EMSC/CSEM",
            "DPC",
            "INGV",
            "USGS",
            "SQLite",
            "TypeORM",
            "Migrazioni",
            "GeoJSON",
            "KML",
            "ogr2ogr",
            "TopoJSON",
            "Docker",
            "Docker Compose",
            "rsync",
            "Sentry"
        ],
        "slug": "allerte-meteo-sismiche-near-realtime",
        "sort_order": 40,
        "tags": [
            "Telegram Bot",
            "GIS",
            "OpenAI",
            "Docker",
            "WebSocket"
        ],
        "title": "Allerte meteo e sismiche in near-realtime"
    },
    {
        "description": "Aula virtuale per l'e-learning: componente Moodle personalizzato che riproduce la video lezione affiancata alle slide in perfetto sincrono, mostrando i capitoli del video per navigare i contenuti della lezione e offrendo il download delle dispense a corredo. L'interfaccia moderna rende l'esperienza immersiva e coinvolgente. Il modulo è sviluppato su misura all'interno della piattaforma e-learning Moodle per la formazione in ambito sanitario.",
        "features": [
            "Riproduzione sincronizzata di video lezione e slide affiancate nella stessa vista",
            "Capitoli del video per navigare rapidamente i contenuti della lezione",
            "Download delle dispense a corredo della video lezione",
            "Modulo Moodle personalizzato con interfaccia moderna per un'apprendimento immersivo"
        ],
        "lib": false,
        "media": [
            {
                "src": "https://cms.casertano.name/uploads/aula_virtuale_moodle_16eb2e067d.jpeg",
                "type": "image",
                "alt": "Aula virtuale Moodle: video e slide sincronizzate",
                "formats": {
                    "thumbnail": "https://cms.casertano.name/uploads/thumbnail_aula_virtuale_moodle_16eb2e067d.jpeg",
                    "small": "https://cms.casertano.name/uploads/small_aula_virtuale_moodle_16eb2e067d.jpeg",
                    "large": "https://cms.casertano.name/uploads/large_aula_virtuale_moodle_16eb2e067d.jpeg",
                    "medium": "https://cms.casertano.name/uploads/medium_aula_virtuale_moodle_16eb2e067d.jpeg"
                }
            }
        ],
        "short": "Aula virtuale per Moodle che riproduce video lezione e slide sincronizzate affiancate, con capitoli del video per navigare i contenuti e dispense scaricabili.",
        "skills": [
            "PHP",
            "Moodle",
            "JavaScript",
            "CSS",
            "Sass",
            "jQuery"
        ],
        "slug": "aula-virtuale-moodle",
        "sort_order": 90,
        "tags": [
            "Moodle",
            "PHP",
            "JavaScript"
        ],
        "title": "Aula virtuale Moodle: video e slide sincronizzate"
    },
    {
        "description": "Piattaforma gestionale end-to-end per l'industria manifatturiera che copre l'intero ciclo produttivo — gestionale, monitoraggio IoT e acquisti — con un backend REST da 196 endpoint su 18 domini, una PWA Vue 3 con Gantt Syncfusion per la pianificazione a ore e una dashboard di telemetria real-time via MQTT. L'ERP Dolibarr containerizzato gestisce il flusso acquisti, mentre l'infrastruttura Docker su Ubuntu con Apache e monitoring Sentry garantisce affidabilità su scala industriale.",
        "features": [
            "Backend REST con 196 endpoint su 18 domini (ordini, preventivi, progetti, commesse, macchine), validati con Joi e documentati da una Postman collection autogenerata dagli schemi",
            "Monitoraggio IoT real-time: broker MQTT Mosquitto con 8 worker per macchina che ingeriscono telemetria, calcolano report e inviano alert push via Firebase Cloud Messaging",
            "PWA gestionale Vue 3 con Gantt Syncfusion EJ2 per pianificare task a ore con dipendenze e lag in minuti, state Pinia e storage offline IndexedDB",
            "Dashboard IoT PWA con telemetria real-time, tachimetri, Chart.js e statistiche per reparto",
            "Processi automatizzati: sincronizzazione CNC via FTP, report periodici e notifiche push; documenti DOCX, PDF ed export XLSX generati programmaticamente",
            "Infrastruttura Docker Compose (MariaDB, Mosquitto, worker LibreOffice) su Ubuntu con Apache e Let's Encrypt, monitoring Sentry/GlitchTip ed ERP Dolibarr per gli acquisti"
        ],
        "lib": false,
        "media": [
            {
                "src": "https://cms.casertano.name/uploads/gestionale_manifatturiero_iot_acquisti_16389f8701.png",
                "type": "image",
                "alt": "Gestionale manifatturiero con IoT e acquisti",
                "formats": {
                    "thumbnail": "https://cms.casertano.name/uploads/thumbnail_gestionale_manifatturiero_iot_acquisti_16389f8701.png",
                    "small": "https://cms.casertano.name/uploads/small_gestionale_manifatturiero_iot_acquisti_16389f8701.png",
                    "medium": "https://cms.casertano.name/uploads/medium_gestionale_manifatturiero_iot_acquisti_16389f8701.png",
                    "large": "https://cms.casertano.name/uploads/large_gestionale_manifatturiero_iot_acquisti_16389f8701.png"
                }
            }
        ],
        "short": "Piattaforma manifatturiera: gestionale PWA con Gantt, monitoraggio IoT via MQTT, acquisti ERP Dolibarr e backend REST con 196 endpoint su 18 domini applicativi.",
        "skills": [
            "Node.js 22",
            "TypeScript",
            "Express",
            "TypeORM",
            "Joi",
            "Vue",
            "Vuetify 4",
            "PWA",
            "IndexedDB",
            "MariaDB",
            "MQTT",
            "Mosquitto",
            "Firebase Cloud Messaging",
            "Docker",
            "Dolibarr"
        ],
        "slug": "gestionale-manifatturiero-iot-acquisti",
        "sort_order": 10,
        "tags": [
            "Node.js",
            "Vue 3",
            "MQTT",
            "Docker",
            "Dolibarr"
        ],
        "title": "Gestionale manifatturiero con IoT e acquisti"
    },
    {
        "description": "Sistema di gestione territoriale end-to-end per organizzazioni con sedi operative: turnistica, risorse umane, manutenzione e reportistica su scala territoriale. Due PWA (admin backoffice + client operativo) e bot Telegram coprono l'intero flusso: gestione turni e sostituzioni, notifiche push, code messaggi dual-channel e generazione documenti. Infrastruttura containerizzata con backend REST su MariaDB e CMS Strapi 5 per guide multilingua.",
        "features": [
            "Due PWA (admin + operativo) con routing lazy-loaded, Vuex e service worker per installazione e utilizzo offline",
            "Backend REST con 19 entità su MariaDB, autenticazione JWT per ruolo e validazione Joi",
            "Bot Telegram per gestione turni, candidature e notifiche push con conversazioni interattive",
            "Sistema code messaggi dual-channel (in-app + email) con priorità, template DOCX e tracciamento consegna",
            "9 cronjob per attivazione turni, reminder report, notifiche manutenzione e sync CMS",
            "Infrastruttura containerizzata Docker Compose (5 servizi) con Apache reverse proxy"
        ],
        "lib": false,
        "media": [
            {
                "src": "https://cms.casertano.name/uploads/gestione_territoriale_sedi_turni_risorse_ee2e065cdc.png",
                "type": "image",
                "alt": "Gestione territoriale di sedi, turni e risorse",
                "formats": {
                    "thumbnail": "https://cms.casertano.name/uploads/thumbnail_gestione_territoriale_sedi_turni_risorse_ee2e065cdc.png",
                    "small": "https://cms.casertano.name/uploads/small_gestione_territoriale_sedi_turni_risorse_ee2e065cdc.png",
                    "medium": "https://cms.casertano.name/uploads/medium_gestione_territoriale_sedi_turni_risorse_ee2e065cdc.png",
                    "large": "https://cms.casertano.name/uploads/large_gestione_territoriale_sedi_turni_risorse_ee2e065cdc.png"
                }
            }
        ],
        "short": "Piattaforma di gestione territoriale per sedi, turni e risorse: due PWA, bot Telegram, reportistica e manutenzione su backend MariaDB containerizzato.",
        "skills": [
            "Node.js",
            "Express",
            "TypeORM",
            "MariaDB",
            "JWT",
            "Joi",
            "Vue",
            "Vuetify",
            "PWA",
            "TypeScript",
            "Vuex",
            "Service Worker",
            "grammy",
            "Docker",
            "Docker Compose",
            "Apache",
            "Strapi 5",
            "Sentry",
            "Docxtemplater"
        ],
        "slug": "gestione-territoriale-sedi-turni-risorse",
        "sort_order": 80,
        "tags": [
            "Vue",
            "Node.js",
            "Docker",
            "Strapi 5"
        ],
        "title": "Gestione territoriale di sedi, turni e risorse"
    },
    {
        "description": "KeyPlex è una libreria TypeScript open source per lo storage key-value namespaced: isola i dati in namespace derivati dal dominio, eliminando le collisioni tra chiavi nelle applicazioni web complesse. L'abstract class KeyPlex con pattern Strategy astrae il backend di storage (localStorage e sessionStorage con serializzazione JSON), mentre la cancellazione wildcard consente pulizie batch su dataset strutturati. Distribuita su npm con bundle ottimizzato, declaration files e documentazione completa.",
        "features": [
            "Storage namespaced che elimina le collisioni tra chiavi: namespace derivati automaticamente dal dominio corrente o personalizzabili",
            "Architettura Strategy con abstract class KeyPlex estendibile tramite quattro metodi (keys, getItem, setItem, removeItem)",
            "Implementazioni pronte LocalPlex e SessionPlex per localStorage e sessionStorage con serializzazione JSON generica",
            "Cancellazione wildcard con il simbolo % per eliminare in batch tutte le chiavi con lo stesso prefisso",
            "Bundle ottimizzato con TypeScript strict, ES6 modules e minificazione terser con source map per dimensioni ridotte",
            "Pacchetto npm pubblico con semantic versioning, documentazione e badge automatici per versione, license e downloads"
        ],
        "github": "https://github.com/DarCas/keyplex",
        "lib": true,
        "media": [
            {
                "src": "https://cms.casertano.name/uploads/keyplex_key_value_namespaced_typescript_aff4333b58.jpeg",
                "type": "image",
                "alt": "KeyPlex: key-value namespaced in TypeScript",
                "formats": {
                    "thumbnail": "https://cms.casertano.name/uploads/thumbnail_keyplex_key_value_namespaced_typescript_aff4333b58.jpeg",
                    "small": "https://cms.casertano.name/uploads/small_keyplex_key_value_namespaced_typescript_aff4333b58.jpeg",
                    "large": "https://cms.casertano.name/uploads/large_keyplex_key_value_namespaced_typescript_aff4333b58.jpeg",
                    "medium": "https://cms.casertano.name/uploads/medium_keyplex_key_value_namespaced_typescript_aff4333b58.jpeg"
                }
            }
        ],
        "short": "Libreria TypeScript open source su npm che isola le chiavi di storage in namespace per evitare collisioni, con cancellazione wildcard e bundle minimale.",
        "skills": [
            "TypeScript",
            "ES2015",
            "Strict Typing",
            "Abstract Class",
            "Strategy Pattern",
            "Lodash",
            "localStorage",
            "sessionStorage",
            "JSON",
            "Terser",
            "Source Map",
            "ES6 Modules",
            "npm",
            "Semantic Versioning",
            "Open Source"
        ],
        "slug": "keyplex-key-value-namespaced-typescript",
        "sort_order": 0,
        "tags": [
            "TypeScript",
            "npm",
            "Strategy Pattern",
            "Terser"
        ],
        "title": "KeyPlex: key-value namespaced in TypeScript",
        "website": "https://keyplex.os.darcas.app/"
    },
    {
        "description": "PWA che mappa la copertura territoriale di una rete di sedi calcolando isocrone di raggiungibilità in auto, bici e a piedi su OpenStreetMap. Il backend REST Fastify 5 orchestra Valhalla per generare 10 bande da 3 a 30 minuti, confrontare più origini e individuare con point-in-polygon quali sedi ricadono dentro ogni fascia. La sincronizzazione offline dei marker con coda di retry e TTL di 100 giorni rende lo strumento affidabile, su deploy Docker multi-stage con hardening di produzione.",
        "features": [
            "Isocrone real-time in auto, bici e a piedi, calcolate da un'API REST Fastify 5 che orchestra Valhalla su OpenStreetMap",
            "Analisi di copertura con motore point-in-polygon (ray casting) puro e unit-testato: individua automaticamente le sedi dentro le isocrone attive",
            "Confronto multi-origine, ricerca e filtri sulla mappa, con import sedi da CSV e basemap CARTO Voyager",
            "Sincronizzazione offline dei marker con Dexie/IndexedDB e coda di retry, con TTL di 100 giorni lato server",
            "Deploy Docker multi-stage con nginx e supervisord, healthcheck e reverse proxy Apache con TLS",
            "Hardening con Helmet, CORS, compressione e rate limiting, API documentata in OpenAPI su Swagger UI"
        ],
        "lib": false,
        "media": [
            {
                "src": "https://cms.casertano.name/uploads/mappa_copertura_territoriale_isocrone_94a1947556.jpeg",
                "type": "image",
                "alt": "Mappa di copertura territoriale con isocrone",
                "formats": {
                    "thumbnail": "https://cms.casertano.name/uploads/thumbnail_mappa_copertura_territoriale_isocrone_94a1947556.jpeg",
                    "small": "https://cms.casertano.name/uploads/small_mappa_copertura_territoriale_isocrone_94a1947556.jpeg",
                    "medium": "https://cms.casertano.name/uploads/medium_mappa_copertura_territoriale_isocrone_94a1947556.jpeg",
                    "large": "https://cms.casertano.name/uploads/large_mappa_copertura_territoriale_isocrone_94a1947556.jpeg"
                }
            }
        ],
        "short": "Isocrone real-time in auto, bici e a piedi per mappare la copertura territoriale di una rete di sedi, con analisi point-in-polygon e confronto multi-origine.",
        "skills": [
            "Node.js 22",
            "TypeScript strict",
            "Fastify 5",
            "TypeBox",
            "Valhalla",
            "Vue 3",
            "Vuetify 4",
            "Leaflet",
            "PWA",
            "Docker",
            "SQLite",
            "Drizzle ORM",
            "Dexie",
            "OpenStreetMap",
            "Vitest"
        ],
        "slug": "mappa-copertura-territoriale-isocrone",
        "sort_order": 50,
        "tags": [
            "Node.js",
            "Vue 3",
            "Valhalla",
            "Leaflet",
            "Docker"
        ],
        "title": "Mappa di copertura territoriale con isocrone"
    },
    {
        "description": "MemoryX è una libreria TypeScript leggera di storage in-memory che organizza i dati in namespace isolati all'interno della sessione browser, eliminando le collisioni tra chiavi nelle applicazioni web. Espone un'API CRUD completa sostenuta dalle utility lodash e un sistema statico per la gestione degli spazi attivi. Distribuita su npm come @darcas/memoryx con tipi TypeScript e documentazione integrale.",
        "features": [
            "Namespace che isolano i dati in aree separate della sessione browser, eliminando le collisioni tra chiavi",
            "API CRUD completa (get, set, del, has) con utility lodash per la manipolazione sicura dei dati",
            "Gestione statica degli spazi attivi: il metodo namespaces() restituisce tutti i namespace istanziati",
            "Build TypeScript con minificazione terser per bundle ottimizzati in produzione",
            "Pubblicazione su npm come @darcas/memoryx con declaration types e documentazione completa"
        ],
        "github": "https://github.com/DarCas/memoryx",
        "lib": true,
        "media": [
            {
                "src": "https://cms.casertano.name/uploads/memoryx_storage_in_memory_browser_8b927378c2.jpeg",
                "type": "image",
                "alt": "MemoryX: storage in-memory per il browser",
                "formats": {
                    "thumbnail": "https://cms.casertano.name/uploads/thumbnail_memoryx_storage_in_memory_browser_8b927378c2.jpeg",
                    "small": "https://cms.casertano.name/uploads/small_memoryx_storage_in_memory_browser_8b927378c2.jpeg",
                    "medium": "https://cms.casertano.name/uploads/medium_memoryx_storage_in_memory_browser_8b927378c2.jpeg",
                    "large": "https://cms.casertano.name/uploads/large_memoryx_storage_in_memory_browser_8b927378c2.jpeg"
                }
            }
        ],
        "short": "Libreria di storage in-memory key-value con namespace isolati nella sessione browser, distribuita su npm con tipi TypeScript, API CRUD e bundle minificato.",
        "skills": [
            "TypeScript",
            "JavaScript",
            "Node.js",
            "Browser API",
            "Lodash",
            "Key-Value Store",
            "npm",
            "Terser",
            "Build Automation"
        ],
        "slug": "memoryx-storage-in-memory-browser",
        "sort_order": 0,
        "tags": [
            "TypeScript",
            "npm",
            "Key-Value Store",
            "Lodash"
        ],
        "title": "MemoryX: storage in-memory per il browser",
        "website": "https://memoryx.os.darcas.app/"
    },
    {
        "description": "Motore di ricerca multi-contesto che unifica più domini di ricerca in un'unica interfaccia, ciascuno servito da un Google Custom Search Engine profilato per lingua (EN, IT, FR). La sincronizzazione P2P end-to-end cifrata via WebRTC — con discovery su Firebase Realtime Database e server TURN autogestito — consente la condivisione di cronologia e segnalibri tra dispositivi senza backend tradizionale. L'architettura offline-first con Dexie/IndexedDB e Workbox garantisce funzionalità completa anche in assenza di connessione.",
        "features": [
            "Ricerca multi-contesto con CSE dedicati per lingua (EN, IT, FR), tab switching immediato e persistenza dello stato in sessione",
            "Sincronizzazione P2P end-to-end cifrata via WebRTC con discovery su Firebase, trasferimento a chunk su DataChannel e server TURN autogestito per NAT traversal",
            "Server TURN coturn containerizzato con autenticazione HMAC-SHA1, Apache reverse proxy, Let's Encrypt e rate limiting",
            "Persistenza offline con Dexie (IndexedDB): cronologia, segnalibri, backup cifrato e merge bidirezionale tra dispositivi",
            "PWA installabile con Workbox Service Worker, caching strategico, wake lock e supporto Android/iOS",
            "Deploy automation con Vite + Firebase Hosting + Docker Compose, monitoring Sentry e SRI a build"
        ],
        "lib": false,
        "media": [
            {
                "src": "https://cms.casertano.name/uploads/motore_ricerca_multi_contesto_sync_p2p_60e48b4c0e.png",
                "type": "image",
                "alt": "Motore di ricerca multi-contesto con sync P2P",
                "formats": {
                    "thumbnail": "https://cms.casertano.name/uploads/thumbnail_motore_ricerca_multi_contesto_sync_p2p_60e48b4c0e.png",
                    "small": "https://cms.casertano.name/uploads/small_motore_ricerca_multi_contesto_sync_p2p_60e48b4c0e.png",
                    "medium": "https://cms.casertano.name/uploads/medium_motore_ricerca_multi_contesto_sync_p2p_60e48b4c0e.png",
                    "large": "https://cms.casertano.name/uploads/large_motore_ricerca_multi_contesto_sync_p2p_60e48b4c0e.png"
                }
            }
        ],
        "short": "PWA offline-first che unifica motori di ricerca con CSE dedicati per lingua e sincronizza cronologia e segnalibri tra dispositivi via WebRTC P2P cifrato.",
        "skills": [
            "Vue",
            "TypeScript",
            "Vuetify 3",
            "Composition API",
            "Vite",
            "Pinia",
            "WebRTC",
            "TURN/STUN",
            "coturn",
            "Node.js",
            "Firebase Realtime DB",
            "Docker",
            "Docker Compose",
            "Workbox",
            "Dexie.js",
            "Sentry"
        ],
        "slug": "motore-ricerca-multi-contesto-sync-p2p",
        "sort_order": 60,
        "tags": [
            "Vue",
            "WebRTC",
            "PWA",
            "Docker",
            "Firebase"
        ],
        "title": "Motore di ricerca multi-contesto con sync P2P"
    },
    {
        "description": "Piattaforma end-to-end per la tokenizzazione di diamanti virtuali in NFT ERC-721 su Polygon: smart contract Solidity, marketplace on-chain e back-office PWA in Vue 2 per gestione token e artworks, affiancati a un ecosistema di backend distribuiti (PHP Zend Framework 3 per sito pubblico con Nexi/PayPal, Node.js/Express per daemon blockchain, rendering texture 3D e code di processing). L'infrastruttura PM2 in cluster mode orchestra tutti i servizi su MariaDB multi-database con storage IPFS per metadati e asset digitali.",
        "features": [
            "Smart contract ERC-721 con marketplace on-chain, royalties EIP-2981 e minting/drop/burn su Polygon per tokenizzare diamanti virtuali in NFT",
            "Back-office PWA con MetaMask e Firebase: gestione catalogo token, artworks e operazioni on-chain tramite smart contract",
            "Sito e-commerce PHP Zend Framework 3: catalogo diamanti, pagamenti Nexi/PayPal, KYC e voucher",
            "Daemon blockchain Node.js per mirroring e caching dello stato on-chain con drops schedulati e queue processing",
            "Logistics V3: suite backend Node.js con Renderer Bot per texture 3D, Viewer NFT interattivo e API client/admin",
            "Infrastruttura PM2 cluster mode su MariaDB multi-database con storage IPFS/Filebase per metadati e asset"
        ],
        "lib": false,
        "media": [
            {
                "src": "https://cms.casertano.name/uploads/nft_marketplace_diamanti_virtuali_polygon_8757361e7b.png",
                "type": "image",
                "alt": "NFT Marketplace di diamanti virtuali su Polygon",
                "formats": {
                    "thumbnail": "https://cms.casertano.name/uploads/thumbnail_nft_marketplace_diamanti_virtuali_polygon_8757361e7b.png",
                    "small": "https://cms.casertano.name/uploads/small_nft_marketplace_diamanti_virtuali_polygon_8757361e7b.png",
                    "medium": "https://cms.casertano.name/uploads/medium_nft_marketplace_diamanti_virtuali_polygon_8757361e7b.png",
                    "large": "https://cms.casertano.name/uploads/large_nft_marketplace_diamanti_virtuali_polygon_8757361e7b.png"
                }
            }
        ],
        "short": "Diamanti virtuali tokenizzati in NFT ERC-721 su Polygon: marketplace on-chain, back-office PWA, rendering 3D automatico e backend distribuiti su IPFS.",
        "skills": [
            "Solidity",
            "Ethers.js",
            "Polygon",
            "ERC-721",
            "PHP",
            "Zend Framework 3",
            "Node.js",
            "Express",
            "TypeORM",
            "MariaDB",
            "Vue",
            "Vuetify",
            "PWA",
            "Firebase",
            "MetaMask",
            "IPFS",
            "PM2",
            "Filebase"
        ],
        "slug": "nft-marketplace-diamanti-virtuali-polygon",
        "sort_order": 30,
        "tags": [
            "Solidity",
            "Polygon",
            "ERC-721",
            "Vue",
            "Node.js"
        ],
        "title": "NFT Marketplace di diamanti virtuali su Polygon"
    },
    {
        "description": "PWA che automatizza l'intero processo di onboarding clienti di un ISP, dalla verifica della copertura fibra alla generazione e all'invio del contratto firmato digitalmente. Un frontend Vue 3 con form multi-step e validazione avanzata (codice fiscale, partita IVA, IBAN) alimenta un backend REST Laravel 12 con matching automatico offerta-tecnologia-carrier via Tools4Isp, mentre la generazione PDF e l'invio email sono gestiti da una pipeline asincrona Artisan containerizzata. Il risultato è un percorso di attivazione rapido e senza carta, tracciato end-to-end.",
        "features": [
            "Verifica copertura fibra da indirizzo civico via Tools4Isp con matching automatico offerta-tecnologia-carrier per FTTH, FTTC e Wireless",
            "Form multi-step reattivo (anagrafica, azienda, documenti, pagamento, numerazione VoIP) con validazione Zod + Vee-Validate e stato persistito in session storage",
            "Generazione automatica dei contratti PDF via Adobe PDF Services API e PhpWord, con supporto privati/business e allegato VoIP",
            "Invio contratti via email con sistema di retry e tracciamento errori su database, messaggi differenziati per cliente e back-office",
            "Address autocomplete con database comuni/province italiani integrato lato frontend e telemetria errori Sentry",
            "Backend Laravel containerizzato con MariaDB e pipeline asincrona orchestrata via cron per generazione e invio documenti"
        ],
        "lib": false,
        "media": [
            {
                "src": "https://cms.casertano.name/uploads/onboarding_clienti_isp_contratti_digitali_de92f3911e.jpeg",
                "type": "image",
                "alt": "Onboarding clienti ISP con contratti digitali",
                "formats": {
                    "thumbnail": "https://cms.casertano.name/uploads/thumbnail_onboarding_clienti_isp_contratti_digitali_de92f3911e.jpeg",
                    "small": "https://cms.casertano.name/uploads/small_onboarding_clienti_isp_contratti_digitali_de92f3911e.jpeg",
                    "large": "https://cms.casertano.name/uploads/large_onboarding_clienti_isp_contratti_digitali_de92f3911e.jpeg",
                    "medium": "https://cms.casertano.name/uploads/medium_onboarding_clienti_isp_contratti_digitali_de92f3911e.jpeg"
                }
            }
        ],
        "short": "Onboarding clienti ISP end-to-end: dalla verifica della copertura fibra al contratto PDF firmato digitalmente, un percorso automatizzato e tracciato su PWA.",
        "skills": [
            "PHP",
            "Laravel 12",
            "REST API",
            "Eloquent",
            "MariaDB",
            "PhpWord",
            "Vue 3",
            "Vuetify 3",
            "TypeScript",
            "Vee-Validate",
            "Zod",
            "PWA",
            "Adobe PDF Services API",
            "Tools4Isp API",
            "Docker"
        ],
        "slug": "onboarding-clienti-isp-contratti-digitali",
        "sort_order": 70,
        "tags": [
            "Laravel 12",
            "Vue 3",
            "TypeScript",
            "PWA",
            "Docker"
        ],
        "title": "Onboarding clienti ISP con contratti digitali"
    },
    {
        "description": "Piattaforma per la gestione di ordini su misura che copre l'intero ciclo di vendita di camicie, consentendo agli agenti di operare anche senza connessione: ordini configurabili (tessuti, colletti, tasche, polsi, contrasti) creati in PWA e sincronizzati automaticamente con il gestionale aziendale alla riconnessione. La sincronizzazione a hash differenziali riduce del 70% i tempi di aggiornamento, mentre l'integrazione con i sistemi legacy passa da una sincronizzazione incrementale tra MySQL e Microsoft SQL Server. Un pannello amministrativo dedicato completa il flusso con tracciabilità dei colli via scanner barcode.",
        "features": [
            "Sincronizzazione a hash differenziali tra PWA e API REST che riduce del 70% i tempi di aggiornamento rispetto al download completo",
            "Operatività offline-first con Dexie/IndexedDB: ordini configurabili creati anche senza rete, con coda messaggi persistente, retry automatico e notifiche",
            "Backend REST in Zend Framework 3 con Doctrine ORM per ordini, anagrafiche, magazzino, listini, PDF e fatture, con autenticazione token-based",
            "Modulo CLI per la sincronizzazione incrementale tra MySQL e Microsoft SQL Server legacy (agenti, fornitori, clienti e destinazioni di fatturazione)",
            "Amministrazione Vue 2/Vuetify con scanner barcode per la tracciabilità dei colli",
            "Generazione PDF via mPDF e CDN interno per la distribuzione delle immagini prodotto"
        ],
        "lib": false,
        "media": [
            {
                "src": "https://cms.casertano.name/uploads/ordini_su_misura_agenti_vendita_0036a976a8.jpeg",
                "type": "image",
                "alt": "Ordini su misura per agenti di vendita",
                "formats": {
                    "thumbnail": "https://cms.casertano.name/uploads/thumbnail_ordini_su_misura_agenti_vendita_0036a976a8.jpeg",
                    "small": "https://cms.casertano.name/uploads/small_ordini_su_misura_agenti_vendita_0036a976a8.jpeg",
                    "large": "https://cms.casertano.name/uploads/large_ordini_su_misura_agenti_vendita_0036a976a8.jpeg",
                    "medium": "https://cms.casertano.name/uploads/medium_ordini_su_misura_agenti_vendita_0036a976a8.jpeg"
                }
            }
        ],
        "short": "Ordini di camicie su misura offline-first per agenti di vendita, configurabili in ogni dettaglio e sincronizzati automaticamente con il gestionale aziendale.",
        "skills": [
            "Angular 7",
            "TypeScript",
            "RxJS",
            "Service Worker",
            "Dexie/IndexedDB",
            "PHP 7.2",
            "Zend Framework 3",
            "Doctrine ORM",
            "MySQL",
            "Microsoft SQL Server",
            "REST API",
            "JWT",
            "Vue 2",
            "Vuetify",
            "mPDF"
        ],
        "slug": "ordini-su-misura-agenti-vendita",
        "sort_order": 100,
        "tags": [
            "Angular",
            "PHP",
            "Vue 2",
            "PWA",
            "Microsoft SQL Server"
        ],
        "title": "Ordini su misura per agenti di vendita"
    },
    {
        "description": "Plugin Vite/Rollup che automatizza la generazione di report JSON con le licenze delle dipendenze nei progetti JavaScript, semplificando la compliance open source. Estrae e normalizza i metadati di licenza in un formato strutturato e leggibile, integrandosi nel build con opzioni di filtraggio per dipendenze private, inclusione del pacchetto stesso e tracciamento di versioni multiple.",
        "features": [
            "Genera automaticamente un report JSON strutturato con licenze e metadati delle dipendenze a ogni build",
            "Integrazione nativa nel pipeline Vite/Rollup con minificazione terser per un output di produzione ottimizzato",
            "Normalizzazione dei testi di licenza: rimozione HTML e formattazione con tag <br> per una lettura pulita",
            "Opzioni avanzate: filtraggio delle dipendenze private, inclusione del proprio pacchetto e tracciamento di versioni multiple",
            "Distribuzione automatizzata del pacchetto su npm tramite GitHub Actions"
        ],
        "github": "https://github.com/DarCas/rollup-plugin-license-json",
        "lib": true,
        "media": [
            {
                "src": "https://cms.casertano.name/uploads/plugin_rollup_report_json_licenze_c83321d925.jpeg",
                "type": "image",
                "alt": "Plugin Rollup per i report JSON delle licenze",
                "formats": {
                    "thumbnail": "https://cms.casertano.name/uploads/thumbnail_plugin_rollup_report_json_licenze_c83321d925.jpeg",
                    "small": "https://cms.casertano.name/uploads/small_plugin_rollup_report_json_licenze_c83321d925.jpeg",
                    "medium": "https://cms.casertano.name/uploads/medium_plugin_rollup_report_json_licenze_c83321d925.jpeg",
                    "large": "https://cms.casertano.name/uploads/large_plugin_rollup_report_json_licenze_c83321d925.jpeg"
                }
            }
        ],
        "short": "Plugin Vite/Rollup che genera a ogni build un report JSON con le licenze delle dipendenze, semplificando la compliance open source nei progetti JavaScript.",
        "skills": [
            "TypeScript",
            "Vite",
            "Rollup",
            "JavaScript",
            "rollup-plugin-license",
            "terser",
            "GitHub Actions",
            "npm",
            "Node.js",
            "JSON",
            "Compliance licenze"
        ],
        "slug": "plugin-rollup-report-json-licenze",
        "sort_order": 0,
        "tags": [
            "Vite",
            "TypeScript",
            "Rollup",
            "GitHub Actions",
            "Open Source"
        ],
        "title": "Plugin Rollup per i report JSON delle licenze",
        "website": "https://rollup-license.os.darcas.app/"
    },
    {
        "description": "Plugin Rollup/Vite che automatizza la generazione di hash Subresource Integrity (SRI) per tutti gli asset emessi dal build. Alla compilazione calcola l'hash crittografico di ogni file referenziato nell'HTML e inietta gli attributi integrity e crossorigin sui tag <script> e <link>, eliminando la gestione manuale degli hash e garantendo che il browser verifichi l'integrità di ogni risorsa prima di eseguirla. Compatibile con Rollup 2/3/4, Vite, code splitting e build multi-pagina, senza dipendenze runtime.",
        "features": [
            "Hash automatico SHA-256, SHA-384 (default) o SHA-512 per ogni asset referenziato dall'HTML",
            "Iniezione nativa degli attributi integrity e crossorigin sui tag script/link a build time",
            "Zero manutenzione manuale: gli hash si ricalcolano a ogni build e non possono mai divergere dagli asset",
            "Supporto nativo per filename hashati, code splitting e configurazioni multi-pagina",
            "Plugin Rollup standard che aggancia generateBundle — nessun wrapper o step extra",
            "Compatibile con Rollup ^2/^3/^4, Vite (che usa Rollup in produzione) e Node.js ≥ 18"
        ],
        "github": "https://github.com/DarCas/rollup-sub-resource-integrity",
        "lib": true,
        "media": [
            {
                "src": "https://cms.casertano.name/uploads/subresource_integrity_automatica_rollup_42a1c04970.jpeg",
                "type": "image",
                "alt": "Subresource Integrity automatica per Rollup",
                "formats": {
                    "thumbnail": "https://cms.casertano.name/uploads/thumbnail_subresource_integrity_automatica_rollup_42a1c04970.jpeg",
                    "small": "https://cms.casertano.name/uploads/small_subresource_integrity_automatica_rollup_42a1c04970.jpeg",
                    "large": "https://cms.casertano.name/uploads/large_subresource_integrity_automatica_rollup_42a1c04970.jpeg",
                    "medium": "https://cms.casertano.name/uploads/medium_subresource_integrity_automatica_rollup_42a1c04970.jpeg"
                }
            }
        ],
        "short": "Plugin Rollup che genera automaticamente hash Subresource Integrity (SHA-256/384/512) per ogni asset del build, iniettando integrity e crossorigin nell'HTML.",
        "skills": [
            "TypeScript",
            "Rollup",
            "Vite",
            "Subresource Integrity",
            "SHA-256",
            "SHA-384",
            "SHA-512",
            "npm",
            "MIT License",
            "GitHub Actions",
            "Build Tooling",
            "Security"
        ],
        "slug": "subresource-integrity-automatica-rollup",
        "sort_order": 0,
        "tags": [
            "Rollup",
            "Vite",
            "SRI",
            "TypeScript",
            "Open Source"
        ],
        "title": "Subresource Integrity automatica per Rollup",
        "website": "https://sri.os.darcas.app/"
    }
]
