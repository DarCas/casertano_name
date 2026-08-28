/*
 * Dario Casertano <dario@casertano.name>
 * Copyright (c) 2026 Casertano Dario – All rights reserved.
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
 */

import type { Project } from "./projects"

export const projectsData: Project[] = [
    {
        "description": "Piattaforma end-to-end per l'industria manifatturiera che copre l'intero ciclo produttivo — gestionale, monitoraggio IoT e acquisti — con un backend REST da 196 endpoint su 18 domini, una PWA Vue 3 con Gantt Syncfusion per la pianificazione a ore e una dashboard telemetria real-time via MQTT. L'ERP Dolibarr containerizzato gestisce il flusso acquisti, mentre l'infrastruttura Docker su Ubuntu con Apache e monitoring Sentry garantisce affidabilità su scala industriale.",
        "features": [
            "Backend REST con 196 endpoint su 18 domini (ordini, preventivi, progetti, commesse, macchine), validati con Joi e documentati da una Postman collection autogenerata dagli schemi",
            "Monitoraggio IoT real-time: broker MQTT Mosquitto con 8 worker per macchina che ingeriscono telemetria, calcolano report e inviano alert push via Firebase Cloud Messaging",
            "PWA gestionale Vue 3 con Gantt Syncfusion EJ2 per pianificare task a ore con dipendenze e lag in minuti, state Pinia e storage offline IndexedDB",
            "Dashboard IoT PWA con telemetria real-time, tachimetri, Chart.js e statistiche per reparto",
            "Processi automatizzati: sincronizzazione CNC via FTP, report periodici e notifiche push; documenti DOCX, PDF ed export XLSX generati programmaticamente",
            "Infrastruttura Docker Compose (MariaDB, Mosquitto, worker LibreOffice) su Ubuntu con Apache e Let's Encrypt, monitoring Sentry/GlitchTip ed ERP Dolibarr per gli acquisti"
        ],
        "media": [
            {
                "src": "https://casertano.name/images/projects/falco-ws-environment.webp?1787223940267",
                "type": "image"
            }
        ],
        "short": "Piattaforma integrata per la manifattura: gestionale PWA con Gantt, monitoraggio IoT via MQTT e acquisti ERP Dolibarr.",
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
        "slug": "falco-ws-environment",
        "tags": [
            "Node.js",
            "Vue 3",
            "MQTT",
            "Docker",
            "Dolibarr"
        ],
        "title": "Piattaforma integrata per l'industria manifatturiera — gestionale, IoT e acquisti"
    },
    {
        "description": "Agente AI autonomo che legge, analizza e gestisce la posta elettronica in linguaggio naturale, combinando i modelli OpenAI con un design transport-agnostic: Gmail API via OAuth2 e qualsiasi mailbox IMAP. Il backend Node.js/TypeScript usa DeepAgents e LangChain per il tool-calling su Express.js, TypeORM e MariaDB; il frontend è una SPA Vue 3/Vuetify che riproduce in streaming le risposte dell'agente via SSE. Credenziali protette con cifratura AES-256-GCM e key encapsulation RSA, stack orchestrato con Docker per sviluppo e produzione.",
        "features": [
            "Agente AI autonomo con DeepAgents e LangChain: tramite tool-calling cerca, legge e analizza conversazioni email in linguaggio naturale",
            "Doppio transport email — Gmail API via OAuth2 e IMAP (imapflow) — con credenziali cifrate AES-256-GCM e key encapsulation RSA",
            "Parser allegati interamente JavaScript per PDF, DOCX, XLSX, PPTX e immagini, analizzate con OpenAI Vision API",
            "Rilevamento automatico delle cartelle della mailbox e ricostruzione dei thread via header In-Reply-To e References",
            "HTTP API Express con risposte firmate JWT, validazione Zod e middleware di autenticazione centralizzati",
            "SPA Vue 3 e Vuetify con login, gestione mailbox e chat in streaming SSE, i18n IT/EN e installabile come PWA"
        ],
        "media": [
            {
                "src": "https://casertano.name/images/projects/mail-thinker-ai.webp?1787223941069",
                "type": "image"
            }
        ],
        "short": "Agente AI autonomo che legge, analizza e gestisce la posta in linguaggio naturale su Gmail e mailbox IMAP.",
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
        "slug": "mail-thinker-ai",
        "tags": [
            "LangChain",
            "OpenAI",
            "Vue 3",
            "Docker",
            "Gmail API"
        ],
        "title": "Agente AI autonomo per la gestione intelligente della posta"
    },
    {
        "description": "Piattaforma end-to-end per la tokenizzazione di diamanti virtuali in NFT ERC-721 su Polygon. Combina smart contract Solidity con marketplace on-chain, back-office PWA in Vue 2 per gestione token e artworks, e un ecosistema di backend distribuiti (PHP Zend Framework 3 per sito pubblico con Nexi/PayPal, Node.js/Express per daemon blockchain, rendering texture 3D e code di processing). L'infrastruttura PM2 in cluster mode orchestra tutti i servizi su MariaDB multi-database con storage IPFS per metadati e asset digitali.",
        "features": [
            "Smart contract ERC-721 con marketplace on-chain, royalties EIP-2981 e minting/drop/burn su Polygon per tokenizzare diamanti virtuali in NFT",
            "Back-office PWA con MetaMask e Firebase: gestione catalogo token, artworks e operazioni on-chain tramite smart contract",
            "Sito e-commerce PHP Zend Framework 3: catalogo diamanti, pagamenti Nexi/PayPal, KYC e voucher",
            "Daemon blockchain Node.js per mirroring e caching dello stato on-chain con drops schedulati e queue processing",
            "Logistics V3: suite backend Node.js con Renderer Bot per texture 3D, Viewer NFT interattivo e API client/admin",
            "Infrastruttura PM2 cluster mode su MariaDB multi-database con storage IPFS/Filebase per metadati e asset"
        ],
        "media": [
            {
                "src": "https://casertano.name/images/projects/bitmonds.webp?1787223939107",
                "type": "image"
            }
        ],
        "short": "Diamanti virtuali tokenizzati in NFT ERC-721 su Polygon: marketplace on-chain, back-office PWA e rendering 3D automatico.",
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
        "slug": "bitmonds",
        "tags": [
            "Solidity",
            "Polygon",
            "ERC-721",
            "Vue",
            "Node.js"
        ],
        "title": "NFT Marketplace per diamanti virtuali collezionabili tokenizzati su Polygon"
    },
    {
        "description": "Piattaforma backend TypeScript/Node.js che automatizza l'intero flusso di monitoraggio e distribuzione near-realtime delle allerte della Protezione Civile e dei dati sismici di INGV, USGS ed EMSC/CSEM su tutto il territorio italiano. Converte i dati grezzi in GeoJSON/KML, li persiste su SQLite e notifica in tempo reale via Telegram Bot e Firebase Storage, orchestrando tutto su tre servizi Docker con tracciamento errori via Sentry.",
        "features": [
            "Ingestion real-time via WebSocket di EMSC SeismicPortal: deduplicazione, filtro geografico sul bounding box italiano e riconnessione con backoff esponenziale",
            "Cronjob idempotenti (DPC ogni 2 min, INGV/USGS ogni 5 min) con lock file-based e tracciamento SHA per un'acquisizione affidabile",
            "Pipeline geospaziale TopoJSON → GeoJSON → KML con riproiezione EPSG:4326 e classificazione automatica in livelli GIALLA, ARANCIONE e ROSSA",
            "Classificazione delle zone di allerta assistita da OpenAI come fallback, con cache su file per le regioni già risolte",
            "Telegram Bot (grammY) con registrazione approvata da admin, controllo accessi e notifiche push in base alla severità",
            "Infrastruttura Docker Compose su tre servizi (cronjob, telegram-bot, seismic) con build tipizzato e deploy remoto via rsync"
        ],
        "media": [
            {
                "src": "https://casertano.name/images/projects/disaster-relief-department.webp?1787223939648",
                "type": "image"
            }
        ],
        "short": "Piattaforma TypeScript/Node.js che raccoglie, processa e distribuisce in near-realtime allerte meteo-idrogeologiche e sismiche su tutto il territorio italiano.",
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
        "slug": "disaster-relief-department",
        "tags": [
            "Telegram Bot",
            "GIS",
            "OpenAI",
            "Docker",
            "WebSocket"
        ],
        "title": "Monitoraggio e distribuzione near-realtime di allerte meteo e sismiche"
    },
    {
        "description": "PWA che mappa la copertura territoriale di una rete di sedi calcolando isocrone in auto, bici e a piedi su OpenStreetMap. Il backend REST Fastify 5 orchestra Valhalla per generare 10 bande da 3 a 30 minuti, confrontare più origini e individuare con point-in-polygon quali sedi ricadono dentro ogni fascia. L'architettura con marker sincronizzati via coda di retry e TTL di 100 giorni, rende lo strumento affidabile, su deploy Docker multi-stage con hardening di produzione.",
        "features": [
            "Isocrone real-time in auto, bici e a piedi, calcolate da un'API REST Fastify 5 che orchestra Valhalla su OpenStreetMap",
            "Analisi di copertura con motore point-in-polygon (ray casting) puro e unit-testato: individua automaticamente le sedi dentro le isocrone attive",
            "Confronto multi-origine, ricerca e filtri sulla mappa, con import sedi da CSV e basemap CARTO Voyager",
            "Sincronizzazione offline dei marker con Dexie/IndexedDB e coda di retry, con TTL di 100 giorni lato server",
            "Deploy Docker multi-stage con nginx e supervisord, healthcheck e reverse proxy Apache con TLS",
            "Hardening con Helmet, CORS, compressione e rate limiting, API documentata in OpenAPI su Swagger UI"
        ],
        "media": [
            {
                "src": "https://casertano.name/images/projects/mappa-interattiva-di-copertura-territoriale.webp?1787223944948",
                "type": "image"
            }
        ],
        "short": "Isocrone real-time in auto, bici e a piedi per la copertura territoriale delle sedi.",
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
        "slug": "mappa-interattiva-di-copertura-territoriale",
        "tags": [
            "Node.js",
            "Vue 3",
            "Valhalla",
            "Leaflet",
            "Docker"
        ],
        "title": "Mappa interattiva di copertura territoriale con isocrone di raggiungibilità"
    },
    {
        "description": "PWA che unifica più domini di ricerca in un'unica interfaccia, ciascuno servito da un Google Custom Search Engine profilato per lingua (EN, IT, FR). La sincronizzazione P2P end-to-end cifrata via WebRTC — con discovery su Firebase Realtime Database e server TURN autogestito — consente la condivisione di cronologia e segnalibri tra dispositivi senza backend tradizionale. L'architettura offline-first con Dexie/IndexedDB e Workbox garantisce funzionalità completa anche in assenza di connessione.",
        "features": [
            "Ricerca multi-contesto con CSE dedicati per lingua (EN, IT, FR), tab switching immediato e persistenza dello stato in sessione",
            "Sincronizzazione P2P end-to-end cifrata via WebRTC con discovery su Firebase, trasferimento a chunk su DataChannel e server TURN autogestito per NAT traversal",
            "Server TURN coturn containerizzato con autenticazione HMAC-SHA1, Apache reverse proxy, Let's Encrypt e rate limiting",
            "Persistenza offline con Dexie (IndexedDB): cronologia, segnalibri, backup cifrato e merge bidirezionale tra dispositivi",
            "PWA installabile con Workbox Service Worker, caching strategico, wake lock e supporto Android/iOS",
            "Deploy automation con Vite + Firebase Hosting + Docker Compose, monitoring Sentry e SRI a build"
        ],
        "media": [
            {
                "src": "https://casertano.name/images/projects/motore-di-ricerca-multi-contesto.webp?1787223941770",
                "type": "image"
            }
        ],
        "short": "PWA offline-first che unifica motori di ricerca con CSE dedicati e sincronizza dispositivi in tempo reale via WebRTC P2P.",
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
        "slug": "motore-di-ricerca-multi-contesto",
        "tags": [
            "Vue",
            "WebRTC",
            "PWA",
            "Docker",
            "Firebase"
        ],
        "title": "Motore di ricerca multi-contesto con sincronizzazione P2P"
    },
    {
        "description": "PWA che automatizza l'intero onboarding clienti di un ISP: dalla verifica della copertura fibra alla generazione e all'invio del contratto firmato digitalmente. Un frontend Vue 3 con form multi-step e validazione avanzata (codice fiscale, partita IVA, IBAN) alimenta un backend REST Laravel 12 con matching automatico offerta-tecnologia-carrier via Tools4Isp, mentre la generazione PDF e l'invio email sono gestiti da una pipeline asincrona Artisan containerizzata. Il risultato è un percorso di attivazione rapido e senza carta, tracciato end-to-end.",
        "features": [
            "Verifica copertura fibra da indirizzo civico via Tools4Isp con matching automatico offerta-tecnologia-carrier per FTTH, FTTC e Wireless",
            "Form multi-step reattivo (anagrafica, azienda, documenti, pagamento, numerazione VoIP) con validazione Zod + Vee-Validate e stato persistito in session storage",
            "Generazione automatica dei contratti PDF via Adobe PDF Services API e PhpWord, con supporto privati/business e allegato VoIP",
            "Invio contratti via email con sistema di retry e tracciamento errori su database, messaggi differenziati per cliente e back-office",
            "Address autocomplete con database comuni/province italiani integrato lato frontend e telemetria errori Sentry",
            "Backend Laravel containerizzato con MariaDB e pipeline asincrona orchestrata via cron per generazione e invio documenti"
        ],
        "media": [
            {
                "src": "https://casertano.name/images/projects/piattaforma-onboarding-clienti-isp.webp?1787223947875",
                "type": "image"
            }
        ],
        "short": "Onboarding ISP end-to-end: dalla verifica copertura fibra al contratto firmato digitalmente, tutto automatizzato su PWA.",
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
        "slug": "piattaforma-onboarding-clienti-isp",
        "tags": [
            "Laravel 12",
            "Vue 3",
            "TypeScript",
            "PWA",
            "Docker"
        ],
        "title": "Piattaforma di onboarding clienti per ISP"
    },
    {
        "description": "Sistema end-to-end per organizzazioni con sedi operative, turnistica, risorse umane, manutenzione e reportistica su scala territoriale. Due PWA (admin backoffice + client operativo) e bot Telegram coprono l'intero flusso: gestione turni e sostituzioni, notifiche push, code messaggi dual-channel e generazione documenti. Infrastruttura containerizzata con backend REST su MariaDB e CMS Strapi 5 per guide multilingua.",
        "features": [
            "Due PWA (admin + operativo) con routing lazy-loaded, Vuex e service worker per installazione e utilizzo offline",
            "Backend REST con 19 entità su MariaDB, autenticazione JWT per ruolo e validazione Joi",
            "Bot Telegram per gestione turni, candidature e notifiche push con conversazioni interattive",
            "Sistema code messaggi dual-channel (in-app + email) con priorità, template DOCX e tracciamento consegna",
            "9 cronjob per attivazione turni, reminder report, notifiche manutenzione e sync CMS",
            "Infrastruttura containerizzata Docker Compose (5 servizi) con Apache reverse proxy"
        ],
        "media": [
            {
                "src": "https://casertano.name/images/projects/piattaforma-gestione-territoriale.webp?1787223942556",
                "type": "image"
            }
        ],
        "short": "Sistema per organizzazioni con sedi, turni e risorse: due PWA, bot Telegram, reportistica e manutenzione su backend MariaDB containerizzato.",
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
        "slug": "piattaforma-gestione-territoriale",
        "tags": [
            "Vue",
            "Node.js",
            "Docker",
            "Strapi 5"
        ],
        "title": "Piattaforma di gestione territoriale"
    },
    {
        "description": "Piattaforma e-learning basata su Moodle con moduli personalizzati per la formazione in ambito sanitario. Risorse multimediali avanzate — video, slide e PDF — e una v-classroom su misura con interfaccia moderna rendono l'apprendimento interattivo e immersivo, mentre l'infrastruttura MySQLi e il sistema di backup moodledata garantiscono una gestione sicura di utenti, corsi e progressi.",
        "features": [
            "Modulo v-classroom personalizzato con interfaccia moderna per una visualizzazione immersiva dei contenuti",
            "Corsi strutturati in moduli multimediali con video, slide e PDF scaricabili",
            "Gestione efficace di utenti, corsi e progressi di apprendimento su database MySQLi",
            "Pipeline di build frontend con webpack-encore, autoprefixer e sass-loader per risorse statiche ottimizzate",
            "Backup e gestione dei contenuti con directory moodledata dedicata per la sicurezza dei dati"
        ],
        "media": [
            {
                "src": "https://casertano.name/images/projects/piattaforma-e-learning-moodle.webp?1787223947212",
                "type": "image"
            }
        ],
        "short": "Formazione sanitaria su Moodle: v-classroom immersiva con video, slide e PDF in moduli multimediali strutturati.",
        "skills": [
            "PHP",
            "MySQL",
            "Moodle",
            "Composer",
            "PHPUnit",
            "JavaScript",
            "CSS",
            "Sass",
            "Webpack Encore",
            "jQuery",
            "PostCSS",
            "Node.js"
        ],
        "slug": "piattaforma-e-learning-moodle",
        "tags": [
            "Moodle",
            "PHP",
            "MySQL",
            "Webpack",
            "JavaScript"
        ],
        "title": "Piattaforma E-Learning Moodle — Soluzione educativa per sanità"
    },
    {
        "description": "Piattaforma che gestisce l'intero ciclo di vendita di camicie su misura, consentendo agli agenti di operare anche senza connessione: ordini configurabili (tessuti, colletti, tasche, polsi, contrasti) creati in PWA e sincronizzati automaticamente con il gestionale aziendale alla riconnessione. La sincronizzazione a hash differenziali riduce del 70% i tempi di aggiornamento, mentre l'integrazione con i sistemi legacy passa da una sincronizzazione incrementale tra MySQL e Microsoft SQL Server. Un pannello amministrativo dedicato completa il flusso con tracciabilità dei colli via scanner barcode.",
        "features": [
            "Sincronizzazione a hash differenziali tra PWA e API REST che riduce del 70% i tempi di aggiornamento rispetto al download completo",
            "Operatività offline-first con Dexie/IndexedDB: ordini configurabili creati anche senza rete, con coda messaggi persistente, retry automatico e notifiche",
            "Backend REST in Zend Framework 3 con Doctrine ORM per ordini, anagrafiche, magazzino, listini, PDF e fatture, con autenticazione token-based",
            "Modulo CLI per la sincronizzazione incrementale tra MySQL e Microsoft SQL Server legacy (agenti, fornitori, clienti e destinazioni di fatturazione)",
            "Amministrazione Vue 2/Vuetify con scanner barcode per la tracciabilità dei colli",
            "Generazione PDF via mPDF e CDN interno per la distribuzione delle immagini prodotto"
        ],
        "media": [
            {
                "src": "https://casertano.name/images/projects/ordini-su-misura-agenti-vendita.webp?1787223946433",
                "type": "image"
            }
        ],
        "short": "Ordini di camicie su misura offline-first per agenti di vendita, con sincronizzazione automatica al gestionale.",
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
        "tags": [
            "Angular",
            "PHP",
            "Vue 2",
            "PWA",
            "Microsoft SQL Server"
        ],
        "title": "Gestione ordini su misura offline-first per agenti di vendita"
    },
    {
        "description": "Libreria TypeScript open source per lo storage key-value namespaced: isola i dati in namespace derivati dal dominio, eliminando le collisioni tra chiavi nelle applicazioni web complesse. L'abstract class KeyPlex con pattern Strategy astrae il backend di storage (localStorage e sessionStorage con serializzazione JSON), mentre la cancellazione wildcard consente pulizie batch su dataset strutturati. Distribuita su npm con bundle ottimizzato, declaration files e documentazione completa.",
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
                "src": "https://casertano.name/images/projects/keyplex.webp?1787223943225",
                "type": "image"
            }
        ],
        "short": "Pacchetto npm open source che isola le chiavi di storage in namespace, con cancellazione wildcard e bundle TypeScript minimale.",
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
        "slug": "keyplex",
        "tags": [
            "TypeScript",
            "npm",
            "Strategy Pattern",
            "Terser"
        ],
        "title": "KeyPlex — Libreria TypeScript per lo storage namespaced key-value"
    },
    {
        "description": "Libreria TypeScript leggera che organizza i dati in namespace isolati all'interno della sessione browser, eliminando le collisioni tra chiavi nelle applicazioni web. Espone un'API CRUD completa sostenuta dalle utility lodash e un sistema statico per la gestione degli spazi attivi. Distribuita su npm come @darcas/memoryx con tipi TypeScript e documentazione integrale.",
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
                "src": "https://casertano.name/images/projects/memoryx.webp?1787223945696",
                "type": "image"
            }
        ],
        "short": "Storage in-memory key-value con namespace isolati nella sessione browser, distribuito su npm con tipi TypeScript e bundle minificato.",
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
        "slug": "memoryx",
        "tags": [
            "TypeScript",
            "npm",
            "Key-Value Store",
            "Lodash"
        ],
        "title": "MemoryX — Libreria di storage in-memory per browser"
    },
    {
        "description": "Plugin Vite/Rollup che automatizza la generazione di report JSON con le licenze delle dipendenze, semplificando la compliance open source nei progetti JavaScript. Estrae e normalizza i metadati di licenza in un formato strutturato e leggibile, integrandosi nel build con opzioni di filtraggio per dipendenze private, inclusione del pacchetto stesso e tracciamento di versioni multiple.",
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
                "src": "https://casertano.name/images/projects/rollup-plugin-license-json.webp?1787223944044",
                "type": "image"
            }
        ],
        "short": "Plugin Vite/Rollup che genera report JSON delle licenze delle dipendenze per compliance open source automatizzata.",
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
        "slug": "rollup-plugin-license-json",
        "tags": [
            "Vite",
            "TypeScript",
            "Rollup",
            "GitHub Actions",
            "Open Source"
        ],
        "title": "Rollup License JSON — Generatore di licenze JSON per progetti JavaScript"
    },
    {
        "description": "Plugin Rollup/Vite che automatizza la generazione di hash Subresource Integrity per tutti gli asset emessi dal build. Alla compilazione calcola l'hash crittografico di ogni file referenziato nell'HTML e inietta gli attributi integrity e crossorigin sui tag <script> e <link>, eliminando la gestione manuale degli hash e garantendo che il browser verifichi l'integrità di ogni risorsa prima di eseguirla. Compatibile con Rollup 2/3/4, Vite, code splitting e build multi-pagina, senza dipendenze runtime.",
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
                "src": "https://casertano.name/images/projects/rollup-subresource-integrity.webp?1787909889596",
                "type": "image"
            }
        ],
        "short": "Plugin Rollup che genera automaticamente hash Subresource Integrity (SHA-256/384/512) per ogni asset del build, iniettando integrity e crossorigin nel markup HTML.",
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
        "slug": "rollup-subresource-integrity",
        "tags": [
            "Rollup",
            "Vite",
            "SRI",
            "TypeScript",
            "Open Source"
        ],
        "title": "Rollup Subresource Integrity — Automated SRI for Rollup"
    }
]
