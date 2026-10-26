# MONSTERHULEN - ROADMAP

DATO: 2026-10-26
STATUS: V0.12.3 BASELINE + UX5A PATCH 13 AUTOMATED GREEN + FRESH BROWSER/PHYSICAL RETEST PENDING + NARRATIVE GRAPH V1 PREPARED

## LÅSTE PRINSIPPER
- Fortellingskvalitet slår kombinasjonsmengde.
- Barnet foreslår handlinger; appen støtter og presenterer affordances, men velger ikke løsningen automatisk.
- Å eie riktig nøkkel betyr ikke at et trykk på en låst dør automatisk bruker nøkkelen.
- Ett fysisk sted har ett synlig kanonisk navn. Zone/biome-metadata kan være intern.
- Et encounter får mekanikk først når det har et tydelig `purpose`, `stakes`, `resolvedWhen` og `payoff`.
- Generiske 3/4-ruters fremgangsspor uten skrevne steg er ikke tillatt.
- En hindring som påstås å sperre veien må faktisk påvirke ferdsel, og løsning må faktisk endre verden.
- Puzzles må ha en skrevet rolle i scenen; de skal ikke kobles tilfeldig på et `MYSTISK` encounter.
- Kritiske historier bygges fra kuraterte Adventure Blueprints og etter UX5A fra eksplisitt Narrative Graph + kuraterte Storylets.
- Hvert kritisk mål må ha `SETUP -> SIGNAL -> ACTION -> PAYOFF`.
- Sannhet og spillerkunnskap er separate state.
- Kritiske beats har dramatisk timing; obsolete komplikasjoner må utløpe eller transformeres.
- Finaler må opptjenes gjennom eksplisitte story prerequisites.
- Hemmelige dører kan aldri omgå story-gates.
- Fysisk 1D6/2D6 brukes ved reell usikkerhet; appen genererer aldri terningresultat.
- Et terningresultat alene løser aldri et helt encounter eller erstatter et story prerequisite.
- Ting, venner og kjæledyr er affordances, ikke tallbonuser.
- Generiske UX5A-romfunn er valgfrie og kan aldri bli story-critical requirements.
- GitHub-repoet er permanent source of truth.

## FERDIG BASELINE
- V0.11.0-V0.11.4: helter, start-item art og 20 monsterfamilier / 40 varianter
- V0.11.5: 12 standard-NPC-er
- V0.11.6: 6 ambient venner + 10 varige venner
- V0.11.7: 10 varige kjæledyr
- V0.11.8: 5 redningsmål
- V0.11.9: Physical Dice Result UX
- V0.12.0: 36 puzzles / 9 kategorier / 3 nivåer
- V0.12.1: 14 skatter og hemmelige funn
- V0.12.2: Monsterhulen rename + bakoverkompatibel storage migration
- V0.12.3: 12 varige TING, identity/affordance pass

## PLAYTEST- OG ARKITEKTURREKKEFØLGE
1. Kartnavigasjon via tappbare `?` / lås / kjente nabrom.
2. FRITT KAST, tydelig narrator-frihet og ikke-forbrukende `BRUK`.
3. Nybegynner-DM-guide + seks faktiske D6-flater.
4. Adventure Code V1 + kuraterte blueprint-eventyr.
5. **UX4:** hard finale-progresjon + oppdagelse av hemmelige dører.
6. **UX5A:** romundersøkelse + encounter-/world-state + fysiske UX-funn.
7. **Narrative Graph V1:** sammenhengende kritisk story + Storylet Matrix. Neste arkitekturpakke etter grønn UX5A-device gate. Start kun med `CRYSTAL_MACHINE`.
8. **UX5B:** kartbevisst løsningsgraf. Utsatt til Narrative Graph V1 er bevist.

## UX5A acceptance og gate
Fysiske/UX-funn så langt:
1. ready key gate kunne unlock + traverse i ett trykk,
2. mystery puzzle kunne være fictionally disconnected/DM-uklar,
3. patch-10 brukte fortsatt nøkkelen automatisk og tok dermed barnets løsningsvalg,
4. romnavn + områdenavn ga ett fysisk sted to identiteter,
5. `REGNBUENETTET` viste at generiske fire fremgangsruter kunne ha null narrativ mening og null payoff.

Patch 11: eksplisitt key use.

Patch 12: én synlig location identity.

Patch 13: encounter purpose contract:
- hver generert non-treasure scene må ha purpose/stakes/resolution/payoff,
- generisk `ANNEN LØSNING`-track fjernes,
- progress vises bare for skrevne `progressStages`,
- traps blokkerer faktisk ferdsel fremover mens de er aktive, men tillater retrett,
- løsning frigjør faktisk veien,
- ambient random mystery puzzles fjernes med mindre innholdet eksplisitt opt-er inn,
- puzzle solve gir ikke automatisk generisk fremgang.

Automated after patch 13:
- encounter-purpose QA: **4337/0**,
- single-location QA: **19/0**,
- targeted device QA: **27/0**,
- searchable-room/encounter: **2295/0**,
- Adventure Code: **405/0**,
- UX4 progression: **1797/0**,
- combined content: **5809/0**,
- 11 scripts: **0 syntax errors**.

Historiske Chromium-resultater (23/0 broad, 15/0 patch-10 focused) kan ikke sertifisere dagens kandidat. Fresh current browser QA er pending.

Før UX5A kan merges:
- `REGNBUENETTET`/trap-flow må føles logisk fysisk: hinder -> barnets plan -> evt. usikkerhet -> løst -> faktisk fri vei,
- Forteller må forstå formålet uten å lære interne systemregler først,
- single-location + explicit-key må fortsatt føles riktig,
- ambient mystery må ikke produsere meningsløse tilfeldige puzzles,
- resten av device smoke må være grønn,
- nye funn må fikses eller eksplisitt klassifiseres.

## Narrative Graph V1 - hvorfor før UX5B
`CRYSTAL_MACHINE` viste strukturelt sikre men potensielt isolerte critical pickups. `SKYGGEHEKSA` viste dramatisk timing-feil. `REGNBUENETTET` viste at selv små encounters må ha en faktisk funksjon og payoff.

Target architecture:
- Adventure Blueprint = overordnet premiss/struktur,
- Narrative Graph = beats, resources, prerequisites, knowledge-state, phases og payoff,
- Storylet Matrix = hard compatibility mellom kuraterte moduler,
- hver Storylet/node som skaper en scene må uttrykke purpose/stakes/resolvedWhen/payoff,
- progress er authored semantics, aldri et default tall,
- map generator plasserer kun validert critical story,
- ambient/optional content legges på etterpå.

Reference `CRYSTAL_MACHINE`:
- tre synlige fargede tomme fester,
- `SEARCH_SECRET` med clue + fail-forward,
- `NPC_FAVOR` med faktisk reachable dependency,
- `GUARDIAN` med motive + non-combat route,
- retur + bevisst assembly,
- gate/climax først etter assembly.

Work packages:
- NG0 architecture/spec freeze - complete on prep branch, but patch-13 encounter-purpose contract must be folded into specs before runtime implementation,
- NG1 graph data model + validator,
- NG2 Storylet Matrix engine,
- NG3 Crystal Machine graph planner,
- NG4 room materialization + narrator knowledge,
- NG5 >=1000 structural generated QA cases,
- NG6 real browser interaction QA,
- NG7 10-20 manual editorial playtests,
- NG8 accept/revise/abandon architecture gate.

Do not convert another blueprint before NG8.

## Adventure Blueprint bank
Kun fire aktive: `GLASS_HEART`, `WITCH_CAT`, `CRYSTAL_MACHINE`, `ZOMBIE_DELIVERY`. Ikke utvid banken nå.

## REPOSITORY HEALTH GATE
Repo-health er fortsatt åpen. Behavioral reconstruction fungerer, men original V0.12.3 baseline er ikke byte-reprodusert fra Library-representasjonen og komplett runtime asset-tree mangler som ordinære repo-filer.

## EXACT NEXT
Mens fysisk UX5A-test er åpen:
- patch kun UX5A-defekter på `ux5/searchable-rooms-encounter-tracks`,
- fysisk test patch-13-kandidaten,
- hold Narrative Graph runtime blokkert,
- ikke start UX5B.

Når UX5A er fysisk GREEN:
1. dokumenter fysisk evidens,
2. rerun/confirm relevant automated + browser regression,
3. merge UX5A til `main`,
4. verifiser `main`,
5. opprett `narrative/story-graph-v1` fra merged `main`,
6. før approved prep-docs over,
7. start `WP-NG1`.
