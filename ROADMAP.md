# MONSTERHULEN - ROADMAP

DATO: 2026-10-26
STATUS: V0.12.3 BASELINE + UX5A PATCH 14 AUTOMATED GREEN + FRESH BROWSER/PHYSICAL RETEST PENDING + NARRATIVE GRAPH V1 PREPARED

## LÅSTE PRINSIPPER
- Fortellingskvalitet slår kombinasjonsmengde.
- Barnet foreslår handlinger; appen støtter og presenterer affordances, men velger ikke løsningen automatisk.
- Ett fysisk sted har ett synlig kanonisk navn.
- Encounter-mekanikk krever `purpose`, `stakes`, `resolvedWhen` og `payoff`.
- Generiske fremgangsruter uten skrevne fiction-steg er ikke tillatt.
- Hindringer må faktisk påvirke verden; løsning må faktisk endre world state.
- Puzzles må ha en skrevet rolle i scenen; de kobles ikke tilfeldig på et `MYSTISK` encounter.
- Forteller-improvisasjon er tillatt, men må være eksplisitt merket/scopet når appen med vilje ikke har en skjult fasit.
- Kritisk story-state kan aldri være avhengig av untracked improvisasjon.
- **Subjekt, narrativ rolle og utfall er separate lag.** En kjent figur/ting kan brukes i flere forhåndsskrevne kompatible Storylets uten at alle kombinasjoner er lov.
- Kritiske historier bygges fra Adventure Blueprints + Narrative Graph + kuraterte Storylets.
- Hvert kritisk mål må ha `SETUP -> SIGNAL -> ACTION -> PAYOFF`.
- Sannhet og spillerkunnskap er separate state.
- Kritiske beats har timing/expiry.
- Finaler må opptjenes gjennom eksplisitte story prerequisites.
- Hemmelige dører kan aldri omgå story-gates.
- Fysisk 1D6/2D6 brukes ved reell usikkerhet; appen ruller aldri digitalt.
- Et terningresultat alene løser aldri et helt encounter eller erstatter et unmet prerequisite.
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
2. FRITT KAST, narrator freedom og item-use semantics.
3. Nybegynner-DM-guide + seks faktiske D6-flater.
4. Adventure Code V1 + kuraterte blueprint-eventyr.
5. **UX4:** hard finale-progresjon + hemmelige dører.
6. **UX5A:** romundersøkelse + encounter/world-state + fysiske UX-funn.
7. **Narrative Graph V1:** causal/timed critical story + Storylet Matrix. Start kun med `CRYSTAL_MACHINE` etter grønn UX5A-device gate.
8. **UX5B:** kartbevisst løsningsgraf. Utsatt til Narrative Graph V1 er bevist.
9. **DM CONTROL SURFACE V1:** samlet DM-styring for scene-state, alternative løsninger, valgfri kamp, outcomes, action history og senere multiscreen-kontroll. Deler av kontrollmodellen må allerede materialiseres i NG4 for å kunne playteste Narrative Graph ordentlig.
10. **MULTISCREEN / SHARED SESSION V1:** DM-hostet sesjon med detached spillerflate, lokal Wi-Fi-sync og DM undo. Bygges på stabil story/world-state og DM action model.

## NY ARKITEKTURREGEL - SUBJECT -> ROLE -> REQUIREMENTS -> OUTCOME
Den redaksjonelle gjennomgangen av Pannekakezombien, Den bortkomne zombien, Skjelettdanseren, Skjelettvakten, Sumptrollet og Brotrollet gir en konkret modell for hele encounter-systemet.

### 1. Subject
`subjectId` er den gjenkjennelige figuren/tingen: f.eks. `PANNEKAKEZOMBIEN`, `SUMPTROLLET`, `BOKA_SOM_SKRIVER_TILBAKE`.

Subject bestemmer identitet, tone og hvilke rollefamilier som er fictionally plausible. Subject bestemmer **ikke** alene hva scenen gjør i eventyret.

### 2. Storylet role
Samme subject kan ha flere kuraterte roller, f.eks.:
- `BLOCK_PATH`
- `NPC_FAVOR`
- `TRADE`
- `GUARDIAN`
- `CLUE_SOURCE`
- `PUZZLE_CARRIER`
- `ITEM_HOLDER`
- `OPTIONAL_IMPROV`
- `RESCUE`
- `PAYOFF_CHARACTER`

Generatoren velger bare en forhåndsgodkjent subject/role-kombinasjon. Dette er kontrollert variasjon, ikke fri tilfeldig miksing.

### 3. Requirements / dependency contract
En Storylet som krever noe må deklarere det som faktisk dependency i grafen.

Eksempel `SUMPTROLLET`:
- hvis valgt Storylet er «finn mat til meg, så slipper jeg deg forbi», må Storylet kreve `FOOD` eller en eksplisitt kompatibel matressurs,
- Narrative Graph/Storylet Matrix må da plassere minst én gyldig provider **før** trollscenen og på en rute som kan nås uten å passere troll-gaten,
- validator må avvise generering der nødvendig mat bare finnes etter trollscenen eller bak gaten trollscenen selv kontrollerer.

Eksempel `BROTROLLET`:
- ønsket objekt kan variere mellom forhåndsskrevne kompatible requests,
- valgt request bestemmer `requires[]`,
- nødvendig objekt/provider må materialiseres tidligere/reachable,
- randomisering kan velge mellom gyldige dependencies, men kan ikke velge en request først og håpe at DM finner opp objektet senere.

Dette generaliserer til NPC-favors, handel, guardians, reparasjoner, riddles og story-items.

### 4. Outcomes
En løst Storylet kan ha ett eksplisitt skrevet outcome eller velge mellom et lite sett kuraterte outcomes som passer rollen. Eksempler:
- `UNBLOCK_PATH`
- `GRANT_OPTIONAL_ITEM`
- `GRANT_CRITICAL_RESOURCE`
- `REVEAL_CLUE`
- `REVEAL_PUZZLE_ANSWER_OR_RULE`
- `REVEAL_LOCATION`
- `BECOME_FRIEND`
- `OPEN_GATE`
- `SET_RELATIONSHIP_STATE`

Pannekakezombien kan derfor i forskjellige Storylets:
- blokkere en dør til den blir fornøyd,
- gi et valgfritt item,
- gi en nødvendig story-resource,
- fortelle et konkret spor,
- kjenne løsningen/reglen til en gåte et annet sted.

Den bortkomne zombien og Skjelettdanseren kan følge samme system med andre kompatible role/outcome-sett.

Kritiske outcomes må være tracked state og må ha setup/payoff. Ambient outcomes kan være valgfrie, men skal fortsatt være tydelige for DM.

### 5. Alternative child solutions + DM resolution
Authored approach er aldri en lukket fasitliste.

- Barnet kan foreslå en annen plausibel løsning enn Storylettens forventede affordances.
- DM må kunne godta løsningen gjennom en tydelig scene-action i DM UI, f.eks. `OPPGAVEN ER LØST` / `GODTA LØSNING`.
- Fysisk terning brukes bare når utfallet av den konkrete handlingen faktisk er usikkert; ikke som obligatorisk seremoni for alle alternative løsninger.
- Når DM markerer løsningen, brukes Storylettens samme eksplisitte outcome/worldEffects slik at graph state fortsatt er konsistent.
- DM skal ikke måtte håndredigere flags, inventory eller kart for å representere en legitim improvisert løsning.

## VALGFRI KAMP SOM DM-STARTET MODUL
`SKJELETTVAKTEN` synliggjør behovet for en egen kampmodul som kan aktiveres for kompatible encounters.

Regler:
- kamp er **ikke** automatisk fordi subject er et monster, vakt eller guardian,
- barnet kan foreslå å slåss, men **DM velger eksplisitt `START KAMP`** når det passer scenen,
- bare Storylets/subjects merket `combatAllowed` kan starte kamp,
- kritiske guardians må fortsatt ha minst én skrevet non-combat route med mindre blueprint uttrykkelig sier noe annet,
- kampmodulen bruker den etablerte fysiske-terning-modellen og eksplisitt encounter/combat-state,
- kampens språk/visuelle uttrykk skal være barnevennlig, lite skummelt og unngå grafisk skade,
- `SLÅSS` skal ikke presenteres som default eller «riktig svar» bare fordi muligheten finnes,
- DM kan avslutte kamp gjennom fictionally valid resolution (gir seg, blir venn, flykter, blir distrahert osv.) uten å måtte «drepe» noe.

Kamp er dermed en løsningsmodul som kan kobles på kompatible Storylets, ikke en egen monster-identitet.

## DM CONTROL SURFACE V1
Den nye modellen forsterker behovet for et ordentlig DM-UI. DM skal forstå og styre state gjennom story-semantikk, ikke internkode.

Minimumsmål:
- tydelig **HVA ER GREIA? / HVA KREVES? / HVA KAN SKJE? / NÅR ER DET LØST? / HVA ENDRES DA?**,
- vise hvilke dependencies som er authored/tracked og hvilke detaljer som er fri improvisasjon,
- `GODTA LØSNING` / `OPPGAVEN ER LØST` for plausibel alternativ child action,
- `START KAMP` bare når Storylet tillater det,
- kampmodul med barnevennlige controls,
- tydelig valg av eventuelle authored outcomes når Storylet faktisk tillater flere,
- grant/reveal/open actions skal følge Storylet worldEffects, ikke frie debug-knapper,
- preview av player-visible state,
- action history og senere `ANGRE SISTE HANDLING`,
- DM skal kunne følge hele causal chain uten å måtte huske hva generatoren «mente».

NG4 (`room materialization + narrator knowledge`) må derfor også materialisere nødvendig narrator/DM metadata og state transitions, selv om full DM Control Surface ferdigstilles senere.

## FREMTIDIG PLATTFORMPAKKE - MULTISCREEN / SHARED SESSION V1
Mål: ett eventyr kjøres fra DM-ens browser med separat spillerflate uten to konkurrerende sannheter om state.

### Detached player view
- `SPILLERDEL` kan løsnes til annen skjerm/enhet.
- **TOUCH CLIENT** for barnets iPad/annen touch-enhet.
- **DISPLAY ONLY** for TV/projektor/non-touch.
- Player view får bare player-visible state; narrator-only info, løsninger, skjult kart/story-state og improv-guidance må aldri lekke.
- DM-panelet viser preview/status av hva spilleren ser.

### DM Host / Player Client
- DM starter alltid eventyret/sesjonen.
- DM-enheten er autoritativ host.
- Barnets klient joiner eksisterende sesjon over lokal Wi-Fi.
- LAN-first/offline-friendly: samme Wi-Fi skal være nok for live-spill.
- Join bør være enkel via kort kode og/eller QR.
- Player client sender forespurte handlinger; host validerer og broadcaster ny autoritativ state.
- Reconnect/refresh henter nåværende state uten dobbel handling eller restart.
- Tapt player-client ødelegger ikke DM-sesjonen.

### Sync invariants
- Én autoritativ state; ingen last-write-wins mellom DM og spiller.
- Handlinger har stabile action/event-ID-er for idempotency.
- Save compatibility og stabile content/story IDs beholdes.
- Shared-session layer ligger over kanonisk adventure state.
- Adventure Code er offline reconstruction/sharing, ikke live-sync-protokoll.

### DM undo
- `ANGRE SISTE HANDLING` bygger på reversible events/state snapshots.
- Typiske feil: feil romflytting, resolve, item-use, die face, combat/encounter transition.
- Undo må rulle tilbake world/story/resource state uten dupliserte rewards/payoffs.
- Korrigert state broadcastes umiddelbart til player client/display.

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

## UX5A GATE
Patch 11: explicit story-key use.
Patch 12: one visible location identity.
Patch 13: encounter-purpose contract, authored-progress-only, real trap world effect, no random ambient puzzle attachment.
Patch 14: explicit narrator improvisation with `INGEN SKJULT FASIT` and bounded prompts.

Automated after patch 14:
- explicit-improv **20/0**,
- encounter-purpose **4337/0**,
- authored-mysteries-only **3075/0**,
- single-location **19/0**,
- targeted device **27/0**,
- search/encounter **2328/0**,
- Adventure Code **405/0**,
- UX4 **1797/0**,
- content **5830/0**,
- 11 scripts: **0 syntax errors**.

Fresh current browser QA og fysisk retest er fortsatt pending. UX5A merges ikke før fysisk gate er grønn.

## NARRATIVE GRAPH V1
Funnene fra `CRYSTAL_MACHINE`, `SKYGGEHEKSA`, `REGNBUENETTET`, `BOKA SOM SKRIVER TILBAKE` og nå zombie/skjelett/troll-gjennomgangen peker på samme arkitektur:
- Storylet må ha subject + role + purpose + stakes + completion + outcomes + world effects,
- Storylets kan kreve resources/knowledge/state,
- alle critical dependencies må ha reachable providers tidligere i grafen,
- valgt variant/request må bindes før map materialization slik at nødvendige providers kan plasseres korrekt,
- alternative child solutions kan godtas av DM uten å bryte canonical state,
- combat er optional authored capability, ikke default monster-flow,
- DM UI må materialisere graph semantics i menneskelig språk.

Reference `CRYSTAL_MACHINE` forblir første og eneste blueprint som konverteres før NG8.

Work packages:
- NG0 architecture/spec freeze - docs/prep,
- NG1 graph data model + validator,
- NG2 Storylet Matrix engine, inkludert subject/role/requirements/outcome compatibility,
- NG3 Crystal Machine graph planner,
- NG4 room materialization + narrator/DM knowledge/actions,
- NG5 >=1000 structural generated QA cases,
- NG6 real browser interaction QA,
- NG7 10-20 manual editorial playtests,
- NG8 accept/revise/abandon architecture gate.

Do not convert another blueprint before NG8.

## Adventure Blueprint bank
Kun fire aktive: `GLASS_HEART`, `WITCH_CAT`, `CRYSTAL_MACHINE`, `ZOMBIE_DELIVERY`. Ikke utvid banken nå.

## REPOSITORY HEALTH GATE
Behavioral reconstruction fungerer, men original V0.12.3 baseline er ikke byte-reprodusert fra Library-representasjonen og komplett runtime asset-tree mangler som ordinære repo-filer.

## EXACT NEXT
Mens fysisk UX5A-test er åpen:
- patch kun UX5A-defekter på `ux5/searchable-rooms-encounter-tracks`,
- fysisk test patch-14-kandidaten,
- fortsett redaksjonell subject/role/outcome-gjennomgang,
- hold Narrative Graph runtime blokkert,
- ikke implementer DM Control Surface, UX5B eller Multiscreen ennå.

Når UX5A er fysisk GREEN:
1. dokumenter fysisk evidens,
2. rerun/confirm relevant automated + browser regression,
3. merge UX5A til `main`,
4. verifiser `main`,
5. opprett `narrative/story-graph-v1` fra merged `main`,
6. før approved prep-docs over,
7. start `WP-NG1`.
