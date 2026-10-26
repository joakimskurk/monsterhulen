# MONSTERHULEN - ROADMAP

DATO: 2026-10-26
STATUS: V0.12.3 BASELINE + UX5A PATCH 14 AUTOMATED GREEN + FRESH BROWSER/PHYSICAL RETEST PENDING + NARRATIVE GRAPH V1 PREPARED

## LÅSTE PRINSIPPER
- Fortellingskvalitet slår kombinasjonsmengde.
- Barnet foreslår handlinger; appen støtter og presenterer affordances, men velger ikke løsningen automatisk.
- Å eie riktig nøkkel betyr ikke at et trykk på en låst dør automatisk bruker nøkkelen.
- Ett fysisk sted har ett synlig kanonisk navn. Zone/biome-metadata kan være intern.
- Et encounter får mekanikk først når det har tydelig `purpose`, `stakes`, `resolvedWhen` og `payoff`.
- Generiske 3/4-ruters fremgangsspor uten skrevne steg er ikke tillatt.
- En hindring som påstås å sperre veien må faktisk påvirke ferdsel, og løsning må faktisk endre verden.
- Puzzles må ha en skrevet rolle i scenen; de skal ikke kobles tilfeldig på et `MYSTISK` encounter.
- Forteller-improvisasjon er tillatt, men må være eksplisitt merket/scopet i narrator view når appen med vilje ikke har en skjult fasit.
- Improvisasjon kan ikke skape nye obligatoriske story prerequisites eller motsi tracked state.
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
9. **MULTISCREEN / SHARED SESSION V1:** DM-hostet sesjon med detached spillerflate, lokal Wi-Fi-sync og DM undo. Planlegges etter at story/state-modellen er stabil nok; ikke trekkes foran UX5A/Narrative Graph.

## FREMTIDIG PLATTFORMPAKKE - MULTISCREEN / SHARED SESSION V1
Mål: ett eventyr kan kjøres fra DM-ens browser med en separat spillerflate på ekstern skjerm eller barnets egen enhet, uten at det oppstår to konkurrerende sannheter om state.

### 1. Detached spillerflate
- `SPILLERDEL` skal kunne løsnes fra DM-panelet og vises på en annen skjerm.
- Ekstern skjerm kan være:
  - **TOUCH CLIENT** - barnet kan trykke på tillatte spillerhandlinger,
  - **DISPLAY ONLY** - TV/projektor/non-touch-skjerm viser spillerflaten, mens DM/barn bruker annen input.
- Spillerflaten skal aldri vise narrator-only informasjon, skjulte svar, skjulte rom, improvisasjonsgrenser eller annen DM-state.
- DM-panelet skal kunne vise en liten preview/status av hva spillerflaten ser akkurat nå.

### 2. DM Host / Player Client over lokal Wi-Fi
- DM starter alltid eventyret/sesjonen.
- DM-enheten er **autoritativ host** for live story/world state.
- Barnets iPad/annen enhet kan `JOIN`e en eksisterende DM-sesjon; klienten starter ikke en parallell autoritativ kopi.
- Primær målarkitektur er lokal-nettverk/LAN-first slik at samme Wi-Fi er nok og internett ikke er et krav for selve spilløkten.
- Join-flow bør være enkel for barn/familie, f.eks. kort kode og/eller QR.
- Klienten mottar kun spiller-synlig state og sender tillatte spillerhandlinger tilbake til host for validering.
- Host validerer handlingen, oppdaterer state og broadcaster den nye autoritative state til alle tilkoblede flater.
- Reconnect må returnere klienten til korrekt nåværende state uten å starte eventyret på nytt.
- Tap av spillerklient skal ikke ødelegge eller stoppe DM-sesjonen; DM skal kunne fortsette og klienten kan koble til igjen.

### 3. Sync-kontrakt
- Én autoritativ session-state, ingen last-write-wins mellom DM og spiller.
- Alle viktige handlinger får stabil action/event-ID slik at dobbelttrykk/reconnect ikke utfører samme handling to ganger.
- UI må skille mellom `forespurt handling`, `godkjent/applied state` og eventuelle avviste/stale handlinger.
- Save compatibility og stabile content/story IDs beholdes; multiplayer/session-laget skal ligge over den samme kanoniske eventyrstaten, ikke lage en ny konkurrerende save-modell.
- Adventure Code forblir nyttig for rekonstruksjon/offline deling, men er ikke i seg selv live-sync-protokollen.

### 4. DM angre / action history
- DM-panelet skal ha tydelig **ANGRE SISTE HANDLING** eller tilsvarende.
- Angre skal baseres på en reversibel action/event-logg eller state snapshot-kontrakt, ikke håndredigering av tilfeldige felter.
- Angre må kunne brukes på typiske feiltrykk: feil romflytting, feil `LØST`, feil item-bruk, feil registrert terningresultat, feil encounter-state osv.
- Angre skal ikke skape dupliserte items, dobbelt-payoff eller inkonsistent Narrative Graph-state.
- Når DM angrer, synkes korrigert state umiddelbart til spillerflaten.
- Før implementasjon må vi definere hvilke handlinger som er trygt reversible og om enkelte irreversible/migrerende handlinger trenger bekreftelse i stedet.

### 5. Acceptance senere
Når denne pakken blir aktiv skal den minst testes for:
- touch spillerklient på iPad,
- display-only ekstern skjerm,
- DM + spiller på samme Wi-Fi,
- join/rejoin etter refresh eller kort nettverksbrudd,
- samtidige/doble trykk uten duplisert effekt,
- DM ser korrekt player-view-status,
- narrator-only informasjon lekker aldri til spillerflate,
- undo synkes korrekt på begge skjermer,
- save/reload midt i delt sesjon,
- fysisk familie-playtest der DM ikke må administrere nettverket under spill.

Dette er en framtidig pakke. Den skal ikke implementeres før den underliggende story/world-state-modellen er stabil nok til at sync og undo kan bygges på eksplisitte state transitions.

## UX5A acceptance og gate
Fysiske/UX-funn så langt:
1. ready key gate kunne unlock + traverse i ett trykk,
2. mystery puzzle kunne være fictionally disconnected/DM-uklar,
3. patch-10 brukte fortsatt nøkkelen automatisk og tok dermed barnets løsningsvalg,
4. romnavn + områdenavn ga ett fysisk sted to identiteter,
5. `REGNBUENETTET` viste at generiske fire fremgangsruter kunne ha null narrativ mening og null payoff,
6. `BOKA SOM SKRIVER TILBAKE` så ut til å ha en skjult app-fasit/larger plan selv om den manglende beskjeden egentlig var ment som Forteller-improvisasjon.

Patch 11: eksplisitt key use.

Patch 12: én synlig location identity.

Patch 13: encounter purpose contract:
- purpose/stakes/resolution/payoff,
- ingen generisk `ANNEN LØSNING`-track,
- progress bare for skrevne `progressStages`,
- traps blokkerer faktisk ferdsel fremover mens aktive og tillater retrett,
- løsning frigjør veien,
- ambient random mystery puzzles er ikke automatisk påkoblet.

Patch 14: explicit narrator improvisation:
- intentionally open ambient mysteries får et per-scene improv prompt,
- narrator view sier `FORTELLER-IMPROVISASJON` og `INGEN SKJULT FASIT`,
- det står eksplisitt at ingen større forhåndsbestemt plan finnes for den manglende detaljen,
- Forteller får ramme for hva som kan finnes på,
- improvisasjon kan gi stemning/optional hint/side discovery, men ikke ny mandatory story-state.

Automated after patch 14:
- explicit-improv QA: **20/0**,
- encounter-purpose QA: **4337/0**,
- authored-mysteries-only QA: **3075/0**,
- single-location QA: **19/0**,
- targeted device QA: **27/0**,
- searchable-room/encounter: **2328/0**,
- Adventure Code: **405/0**,
- UX4 progression: **1797/0**,
- combined content: **5830/0**,
- 11 scripts: **0 syntax errors**.

Historiske Chromium-resultater (23/0 broad, 15/0 patch-10 focused) kan ikke sertifisere dagens kandidat. Fresh current browser QA er pending.

Før UX5A kan merges:
- `BOKA SOM SKRIVER TILBAKE` må gjøre narrator responsibility umiddelbart forståelig: authored fiction vs intentional improv,
- improvisasjonsrammen må hjelpe uten å bli en lukket fasit,
- `REGNBUENETTET`/trap-flow må fortsatt føles logisk fysisk,
- single-location + explicit-key må fortsatt føles riktig,
- ambient mystery må ikke produsere meningsløse tilfeldige puzzles,
- resten av device smoke må være grønn,
- nye funn må fikses eller eksplisitt klassifiseres.

## Narrative Graph V1 - hvorfor før UX5B
`CRYSTAL_MACHINE` viste strukturelt sikre men potensielt isolerte critical pickups. `SKYGGEHEKSA` viste dramatisk timing-feil. `REGNBUENETTET` viste at små encounters må ha funksjon/payoff. `BOKA SOM SKRIVER TILBAKE` viste at bevisst åpen improvisasjon må deklareres som sådan i stedet for å ligne manglende logikk.

Target architecture:
- Adventure Blueprint = overordnet premiss/struktur,
- Narrative Graph = beats, resources, prerequisites, knowledge-state, phases og payoff,
- Storylet Matrix = hard compatibility mellom kuraterte moduler,
- interactive Storylet/node uttrykker purpose/stakes/resolvedWhen/payoff,
- progress er authored semantics, aldri default tall,
- Storylets kan ha bounded narrator-improvisation, men critical causal state kan ikke være avhengig av en untracked improvised fact,
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
- NG0 architecture/spec freeze - complete on prep branch; patch-13/14 lessons must remain folded into specs before runtime implementation,
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
- fysisk test patch-14-kandidaten,
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
