# MONSTERHULEN - CURRENT STATUS

DATO: 2026-10-26
STATUS: UX5A PATCH 11 AUTOMATED GREEN + FRESH BROWSER/PHYSICAL RETEST PENDING + NARRATIVE GRAPH V1 PREPARED + REPOSITORY HEALTH ÅPEN

> `PROJECT_STATE.md` er kanonisk handoff. `START_HERE.md` på `narrative/story-graph-v1-prep` peker til riktig leserekkefølge.

## BASELINE
- Produkt: Monsterhulen
- Release-baseline: V0.12.3 Lasting Thing Identity Pass
- State schema: 12
- Storage: `monsterhulen_v120`
- Aktiv runtime-branch: `ux5/searchable-rooms-encounter-tracks`
- Prep-branch: `narrative/story-graph-v1-prep`
- UX5A er ikke merget til `main`.

## NYESTE UX5A-FUNN
En låst story-dør skal presentere problemet, ikke automatisk bruke en nøkkel barnet allerede eier.

Patch 11 gjør derfor keyed gates eksplisitte:
- trykk på låst dør -> bare `DØREN ER LÅST`,
- ingen automatisk key-use/unlock/traversal,
- scenario-nøkkel er fortsatt beskyttet, men har `BRUK`,
- barnet/Forteller velger aktivt å bruke nøkkelen,
- nøkkelbruk åpner uten traversal,
- neste trykk går gjennom,
- Forteller kan gi et åpent hint: `KANSKJE DU HAR NOE I SEKKEN?`.

Dette er en varig child-agency-regel: appen viser hinder og affordances; barnet foreslår handlingen.

## VERIFISERING ETTER PATCH 11
Automated runtime:
- targeted device QA: **27 / 0**
- UX5A search/encounter: **2216 / 0**
- Adventure Code: **405 / 0**
- UX4 progression: **1797 / 0**
- content regression: **5960 / 0**
- 11 inline scripts: **0 syntax errors**

Fresh reconstructed runtime SHA-256:
`038cee162e33290019b332957b15e42e1a79bdae8fe109010cc60deda5429710`

Dette er behavioral reconstruction, ikke byte-identisk release-provenance.

Patch 10 hadde Chromium **15 / 0**, men den gamle key-door-forventningen er nå erstattet. Patch 11 trenger derfor en **ny** browser interaction smoke. Fysisk iPad/mobile-retest er fortsatt påkrevd.

## NESTE ARKITEKTUR
Etter UX5A fysisk grønn + merge til `main`: **Narrative Graph V1** før UX5B.

Reference først: `CRYSTAL_MACHINE` med synlig krav-reveal, `SEARCH_SECRET`, `NPC_FAVOR`, `GUARDIAN`, retur/assembly og gate først etter assembly. Temporal story coherence/expiry er også obligatorisk.

## GITHUB / REPOSITORY HEALTH
GitHub-repoet er permanent source of truth. Komplett byte-identisk runtime/source/assets baseline er fortsatt ikke direkte rekonstruerbar fra ordinære repo-filer, så repository-health er åpen.

## EXACT NEXT
1. browser-test patch 11 når real browser-harness er tilgjengelig,
2. fysisk test explicit key flow + puzzle flow + resten av UX5A-smoken,
3. ved nye funn: klassifiser som UX/story-coherence/arkitektur før patch,
4. hvis fysisk GREEN: dokumenter evidens, regress, merge UX5A, verifiser `main`, opprett `narrative/story-graph-v1`, flytt godkjente prep-docs, start `WP-NG1`,
5. ikke start UX5B først.
