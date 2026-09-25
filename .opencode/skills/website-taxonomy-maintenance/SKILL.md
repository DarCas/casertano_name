---
name: website-taxonomy-maintenance
description: Mantiene allineata la tassonomia skills/tags del sito tra Strapi, hero, skills.ts e artefatti derivati. Use when aggiungi, rimuovi o rinomini skill, tag progetto o categorie.
---

# Website Taxonomy Maintenance

Mantieni allineata la tassonomia skills/tags su 4 livelli: Strapi → hero → `lib/skills.ts` → artefatti derivati.

## Process

1. Normalizza le skill Strapi secondo `REFERENCE.md` §1. Mai versioni salvo arch-change.
2. Allinea `../../../www/components/hero.tsx` (`heroSkills`, 4 blocchi curati) — v. `REFERENCE.md` §2.
3. Allinea `../../../www/lib/skills.ts` (10 categorie fisse) — v. `REFERENCE.md` §3.
4. Rigenera i derivati — v. `REFERENCE.md` §4:
   - aggiorna le liste hardcoded in `../../../www/scripts/generate-llms.mjs` (`Core stack` + `FULL_HEADER`)
   - da `../../../www`: `node scripts/fetch-projects.mjs`, poi `node scripts/generate-llms.mjs`
   - se la build mostra progetti stantii: `rm -rf out/ .next/cache/fetch-cache` prima di rebuild; se `next dev` è attivo, riavvialo per ricalcolare `generateStaticParams`
5. Regole repo: niente `npm run build` se non richiesta, niente commenti nel codice salvo header licenza, niente commit senza permesso.

Vedi `REFERENCE.md` per tabelle di normalizzazione, blocchi hero, categorie e gotcha cache/env.
