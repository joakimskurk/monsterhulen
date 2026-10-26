# MONSTERHULEN - ROADMAP

DATO: 2026-10-26
STATUS: V0.12.3 BASELINE + UX5A PATCH 14 AUTOMATED GREEN + FRESH BROWSER/PHYSICAL RETEST PENDING + NARRATIVE GRAPH V1 PREPARED

## LÅSTE PRINSIPPER
- Fortellingskvalitet slår kombinasjonsmengde.
- Barnet foreslår handlinger; appen støtter/presenterer affordances, men velger ikke løsningen automatisk.
- Ett fysisk sted har ett synlig kanonisk navn.
- Et encounter får mekanikk først når det har tydelig `purpose`, `stakes`, `resolvedWhen` og `payoff`.
- Generiske 3/4-ruters fremgangsspor uten skrevne steg er ikke tillatt.
- Hindringer må faktisk påvirke verden; løsning må gi observerbar endring.
- Puzzles må ha en skrevet rolle i scenen, ikke kobles tilfeldig på `MYSTISK`.
- Forteller-improvisasjon er et eksplisitt authored mode; critical story-state kan ikke avhenge av untracked improv.
- Kritisk historie bygges fra Adventure Blueprints og etter UX5A fra Narrative Graph + kuraterte Storylets.
- Kritiske mål bruker `SETUP -> SIGNAL -> ACTION -> PAYOFF`.
- Sannhet og spillerkunnskap er separate state.
- Kritiske beats har dramatisk timing/expiry.
- Finaler må opptjenes gjennom story prerequisites.
- Fysisk terning brukes kun ved reell usikkerhet; appen ruller aldri digitalt.
- Terningresultat alene løser aldri et helt encounter eller unmet prerequisite.
- Ting/venner/kjæledyr er affordances, ikke tallbonuser.
- GitHub er permanent source of truth.

## PLAYTEST- OG ARKITEKTURREKKEFØLGE
1. Kartnavigasjon.
2. FRITT KAST + narrator freedom + item-use semantics.
3. DM-guide + fysisk D6-input.
4. Adventure Code + kuraterte blueprints.
5. **UX4:** hard finale-progresjon + hemmelige dører.
6. **UX5A:** romundersøkelse + encounter/world state + device findings.
7. **Narrative Graph V1:** causal/timed critical story + Storylet Matrix. Start kun med `CRYSTAL_MACHINE` etter grønn UX5A-device gate.
8. **UX5B:** kartbevisst løsningsgraf, utsatt til Narrative Graph V1 er bevist.
9. **MULTISCREEN / SHARED SESSION V1:** framtidig DM-hostet sesjon med detached spillerflate, lokal Wi-Fi-sync og DM undo. Skal bygge på stabil story/world-state, ikke komme foran UX5A eller Narrative Graph.

## FREMTIDIG PLATTFORMPAKKE - MULTISCREEN / SHARED SESSION V1
Dette er en registrert framtidig capability, ikke aktiv work package.

### Detached player view
- Spillerflaten kan løsnes fra DM-panelet og åpnes på egen skjerm/enhet.
- Støtt både **touch client** og **display-only** for TV/projektor/non-touch.
- Player view får bare player-visible state; narrator-only info, løsninger, skjult kart/story-state og improv-guidance må aldri lekke.
- DM-panelet bør kunne se preview/status av hva spilleren ser.

### DM Host / Player Client
- DM starter alltid eventyret og live-sesjonen.
- DM-enheten er autoritativ host for session/story/world state.
- Barnets iPad/annen klient joiner eksisterende sesjon over lokal Wi-Fi i stedet for å starte en parallell autoritativ kopi.
- LAN-first/offline-friendly er mål: samme Wi-Fi skal være nok for live-spill; internett skal ikke være et krav for selve syncen.
- Join bør være familievennlig, for eksempel kort kode og/eller QR.
- Player client sender forespurte handlinger; host validerer og broadcaster ny autoritativ state.
- Reconnect/refresh må hente nåværende state uten dobbel handling eller restart.
- Tapt player-client skal ikke ødelegge DM-sesjonen.

### Sync invariants
- Én autoritativ state; ingen last-write-wins mellom DM og spiller.
- Handlinger trenger stabile action/event-ID-er for idempotency ved dobbelttrykk/reconnect.
- Save compatibility og stabile content/story IDs beholdes.
- Shared-session layer ligger over den kanoniske adventure state-modellen; det lager ikke en separat konkurrerende save-modell.
- Adventure Code er fortsatt offline reconstruction/sharing, ikke live-sync-protokollen.

### DM undo
- DM-panelet skal ha **ANGRE SISTE HANDLING** eller tilsvarende action history.
- Undo må bruke reversible events/state snapshots, ikke ad hoc field edits.
- Typiske feiltrykk som skal kunne håndteres: feil romflytting, feil resolve, feil item-use, feil registrert die face, feil encounter transition.
- Undo må rulle tilbake world/story/resource state uten dupliserte rewards/items/payoffs.
- Korrigert state broadcastes umiddelbart til player client/display.
- Før implementasjon defineres reversible vs eventuelt irreversible handlinger og nødvendig confirmation-policy.

### Senere acceptance
- iPad touch client,
- display-only ekstern skjerm,
- join/rejoin på samme Wi-Fi,
- reconnect etter refresh/kort nettverksbrudd,
- dobbelttrykk uten dobbel effekt,
- DM preview av player view,
- null narrator-only data leakage,
- undo synket på alle flater,
- save/reload midt i delt sesjon,
- fysisk familie-playtest uten nettverksadministrasjon under spill.

## UX5A acceptance og gate
Device/UX-funn inkluderer:
1. key gate kunne unlock + traverse i ett trykk,
2. random mystery puzzle kunne være fictionally disconnected,
3. patch-10 auto-brukte fortsatt key og tok barnets løsningsvalg,
4. room + zone ga ett sted to identiteter,
5. `REGNBUENETTET` viste at generisk fire-ruters progress kunne være uten mening, konsekvens og payoff,
6. `BOKA SOM SKRIVER TILBAKE` viste at intentional narrator-improv må merkes som sådan i stedet for å ligne skjult/manglende app-logikk.

Patch 11: eksplisitt key use.
Patch 12: én synlig location identity.
Patch 13: encounter-purpose contract + authored-progress-only + real trap world effect + no random ambient puzzle attachment.
Patch 14: explicit narrator improvisation + `INGEN SKJULT FASIT` + bounded per-scene improv prompt.

Automated after patch 14:
- explicit-improv **20/0**,
- encounter-purpose **4337/0**,
- authored-mysteries-only **3075/0**,
- single-location **19/0**,
- device **27/0**,
- search/encounter **2328/0**,
- Adventure Code **405/0**,
- UX4 **1797/0**,
- content **5830/0**,
- scripts **0 syntax errors**.

Fresh current browser QA og fysisk retest er fortsatt pending.

## Narrative Graph V1 - hvorfor før UX5B
Funn peker på samme arkitekturbehov:
- `CRYSTAL_MACHINE`: causal disconnect,
- `SKYGGEHEKSA`: temporal invalidity,
- `REGNBUENETTET`: interactive beat without purpose/payoff,
- `BOKA SOM SKRIVER TILBAKE`: authored logic vs explicit narrator-improv responsibility.

Target architecture:
- Adventure Blueprint = overordnet premiss/struktur,
- Narrative Graph = beats/resources/prerequisites/knowledge/phases/payoff,
- Storylet Matrix = curated hard compatibility,
- interactive Storylets/nodes declare purpose/stakes/resolvedWhen/payoff/world effect,
- progress is authored semantics, never default counter,
- bounded narrator-improv is allowed but cannot determine critical state,
- validated critical story before ambient content.

Reference `CRYSTAL_MACHINE`:
- machine reveals three colored missing sockets,
- `SEARCH_SECRET` with clue + fail-forward,
- `NPC_FAVOR` with reachable dependency,
- `GUARDIAN` with motive + non-combat route,
- deliberate return/assembly,
- gate/climax only after assembly.

Work packages:
- NG0 architecture/spec freeze - documentation exists; patch-13/14 lessons are folded into specs,
- NG1 graph data model + validator,
- NG2 Storylet Matrix,
- NG3 Crystal Machine planner,
- NG4 room materialization + knowledge,
- NG5 >=1000 structural cases,
- NG6 browser QA,
- NG7 10-20 manual editorial playtests,
- NG8 accept/revise/abandon.

Do not convert another blueprint before NG8.

## Adventure Blueprint bank
Only `GLASS_HEART`, `WITCH_CAT`, `CRYSTAL_MACHINE`, `ZOMBIE_DELIVERY`. Do not expand now.

## REPOSITORY HEALTH GATE
Behavioral reconstruction works, but original V0.12.3 is not byte-reproduced from Library representation and complete runtime asset tree is not ordinary repo state.

## EXACT NEXT
While physical UX5A is open:
- patch only UX5A defects on runtime branch,
- physically test patch-14 candidate,
- Narrative Graph prep remains documentation-only,
- do not merge UX5A,
- do not implement Narrative Graph runtime,
- do not start UX5B or Multiscreen/Shared Session implementation.

When UX5A is physical GREEN:
1. document evidence,
2. rerun/confirm automated + browser regression,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1` from merged main,
6. carry approved prep docs,
7. start WP-NG1.
