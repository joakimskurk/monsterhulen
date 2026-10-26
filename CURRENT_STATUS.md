# MONSTERHULEN - CURRENT STATUS

DATO: 2026-10-26
STATUS: UX5A PATCH 13 AUTOMATED GREEN + FRESH BROWSER/PHYSICAL RETEST PENDING + NARRATIVE GRAPH V1 PREP UPDATED + REPOSITORY HEALTH ÅPEN

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
Fysisk playtest med `REGNBUENETTET` viste at generisk `ANNEN LØSNING` med fire ruter ikke hadde noen skrevet betydning. Nettet sperret ikke faktisk veien, og ferdig progress ga ingen reell payoff.

Patch 13 erstatter derfor generic encounter duration med et purpose contract:
- `purpose`,
- `stakes`,
- `resolvedWhen`,
- `payoff`,
- coherent world effect.

Generic 3/4-box progress er fjernet. Progress kan bare vises når konkrete `progressStages` er skrevet. Traps blokkerer faktisk onward movement mens de er aktive, men retrett er mulig; løsning frigjør faktisk veien. Ambient random `MYSTISK` puzzles er ikke lenger automatisk generert.

Dette er en varig regel: en scene får ikke mekanikk før vi kan forklare hvorfor den finnes og hva løsning forandrer.

## VERIFISERING ETTER PATCH 13
- encounter-purpose QA: **4337 / 0**
- single-location QA: **19 / 0**
- targeted device QA: **27 / 0**
- UX5A search/encounter: **2295 / 0**
- Adventure Code: **405 / 0**
- UX4 progression: **1797 / 0**
- content regression: **5809 / 0**
- 11 inline scripts: **0 syntax errors**

Runtime SHA-256:
`e00ba3c6f3ff1511be32e04e1de7f46ffc0404aa012e2b2600c05ace50fd3db8`

Patch SHA-256:
`74499137374e50bbf0f9d6385e23073bd7e51e7744b3488f5ade085860f27437`

Dette er behavioral reconstruction, ikke byte-identisk release provenance. Historical Chromium 23/0 og 15/0 sertifiserer ikke dagens kandidat. Fresh browser QA er pending; fysisk device-retest er påkrevd.

## NESTE ARKITEKTUR
Etter UX5A fysisk grønn + merge: Narrative Graph V1 før UX5B.

Prep-specene krever nå også purpose/stakes/resolution/payoff/world effects og authored-progress-only for interactive Storylets/nodes. `CRYSTAL_MACHINE` forblir eneste første reference.

## GITHUB / REPOSITORY HEALTH
GitHub-repoet er permanent source of truth. Komplett byte-identisk runtime/source/assets baseline er fortsatt ikke direkte rekonstruerbar fra ordinære repo-filer, så repository-health er åpen.

## EXACT NEXT
1. fysisk test patch-13 build, særlig `REGNBUENETTET` block -> retreat -> child plan -> resolve -> free route,
2. fortsett explicit key, single-location, room search, combat og Adventure Code smoke,
3. fresh browser QA når harness fungerer,
4. ved nye funn: behandle dem som mulig UX/story/architecture issue før copy polish,
5. hvis fysisk GREEN: dokumenter evidens, regress, merge UX5A, verifiser `main`, opprett `narrative/story-graph-v1`, carry approved prep docs, start `WP-NG1`,
6. ikke start UX5B først.
