# MONSTERHULEN - CURRENT STATUS

DATO: 2026-10-26
STATUS: UX5A PATCH 14 AUTOMATED GREEN + FRESH BROWSER/PHYSICAL RETEST PENDING + NARRATIVE GRAPH V1 PREP UPDATED + REPOSITORY HEALTH ÅPEN

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
`BOKA SOM SKRIVER TILBAKE` er et ambient mysterium hvor den manglende beskjeden med vilje er åpen for Forteller-improvisasjon. Problemet var at UI-en fikk det til å se ut som om appen satt på en skjult fasit eller større plan.

Patch 14 gjør improvisasjon eksplisitt i narrator view:
- `FORTELLER-IMPROVISASJON`,
- `INGEN SKJULT FASIT`,
- eksplisitt beskjed om at ingen større forhåndsbestemt plan finnes for den åpne detaljen,
- per-scene prompt for hva Forteller kan finne på,
- guardrails: optional atmosphere/hint/side discovery er lov; ny mandatory story-state eller motsigelse av tracked state er ikke lov.

Dette korrigerer ikke bort improvisasjon. Det gjør ansvarsfordelingen tydelig. Player view forblir in-world/immersive.

Patch 13-reglene består: encounter purpose/stakes/resolution/payoff, ingen generic 3/4-box progress, real obstacle world effects, ingen tilfeldig ambient puzzle attachment.

## VERIFISERING ETTER PATCH 14
- explicit-improv QA: **20 / 0**
- encounter-purpose QA: **4337 / 0**
- authored-mysteries-only QA: **3075 / 0**
- single-location QA: **19 / 0**
- targeted device QA: **27 / 0**
- UX5A search/encounter: **2328 / 0**
- Adventure Code: **405 / 0**
- UX4 progression: **1797 / 0**
- content regression: **5830 / 0**
- 11 inline scripts: **0 syntax errors**

Runtime SHA-256:
`7e9f9ba1d80aed2fe55865dbca860e2754d706b7cd89266dd2007d25fd4e0737`

Patch SHA-256:
`123daf1a12fc4f6a38d5d3dc401b7403c21005263c32811e0c0eeac24877fd2c`

Dette er behavioral reconstruction, ikke byte-identisk release provenance. Historical Chromium 23/0 og 15/0 sertifiserer ikke dagens kandidat. Fresh browser QA er pending; fysisk device-retest er påkrevd.

## NESTE ARKITEKTUR
Etter UX5A fysisk grønn + merge: Narrative Graph V1 før UX5B.

Prep-specene krever nå purpose/stakes/resolution/payoff/world effects, authored-progress-only og eksplisitt bounded narrator-improvisation. Critical causal state kan ikke avhenge av untracked improvised facts. `CRYSTAL_MACHINE` forblir eneste første reference.

## GITHUB / REPOSITORY HEALTH
GitHub-repoet er permanent source of truth. Komplett byte-identisk runtime/source/assets baseline er fortsatt ikke direkte rekonstruerbar fra ordinære repo-filer, så repository-health er åpen.

## EXACT NEXT
1. fysisk test patch-14 build, særlig `BOKA SOM SKRIVER TILBAKE`: er det umiddelbart tydelig hva appen vet og hva Forteller skal finne på?
2. fortsett `REGNBUENETTET`, explicit key, single-location, room search, combat og Adventure Code smoke,
3. fresh browser QA når harness fungerer,
4. ved nye funn: behandle dem som mulig UX/story/architecture issue før copy polish,
5. hvis fysisk GREEN: dokumenter evidens, regress, merge UX5A, verifiser `main`, opprett `narrative/story-graph-v1`, carry approved prep docs, start `WP-NG1`,
6. ikke start UX5B først.
