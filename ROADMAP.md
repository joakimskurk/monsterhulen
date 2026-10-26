# MONSTERHULEN - ROADMAP

DATO: 2026-10-26
STATUS: UX5A PATCH 14 AUTOMATED GREEN + FRESH BROWSER/PHYSICAL RETEST PENDING + NARRATIVE GRAPH V1 PREPARED

## LÅSTE PRINSIPPER
- Fortellingskvalitet slår kombinasjonsmengde.
- Barnet foreslår handlinger; appen støtter/presenterer affordances, men velger ikke løsningen automatisk.
- Ett fysisk sted har ett synlig kanonisk navn.
- Encounter-mekanikk krever `purpose`, `stakes`, `resolvedWhen` og `payoff`.
- Generiske progress-ruter uten skrevne fiction-steg er ikke tillatt.
- Hindringer må faktisk påvirke world state; løsning må gi observerbar endring.
- Puzzles må ha skrevet rolle i scenen, ikke kobles tilfeldig på `MYSTISK`.
- Forteller-improvisasjon er explicit authored mode; critical state kan ikke avhenge av untracked improv.
- **Subject, Storylet-role, requirements/providers og outcomes er separate lag.**
- Kritisk historie bygges fra Adventure Blueprints + Narrative Graph + kuraterte Storylets.
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
9. **DM CONTROL SURFACE V1:** samlet DM-kontroll av scene-state, alternate solutions, negotiation, optional combat, outcomes og action history. Nødvendig DM-metadata begynner i NG4.
10. **MULTISCREEN / SHARED SESSION V1:** DM-hosted detached player view + local Wi-Fi sync + undo. Bygger på stabil canonical state/action model.

## ENCOUNTER / STORYLET MODEL
Retningen fra innholdsreviewen er:

`SUBJECT -> ROLE -> REQUIREMENTS + PROVIDERS -> CHILD ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

### Subject
Eksempler: `PANNEKAKEZOMBIEN`, `BORTKOMNE_ZOMBIEN`, `SKJELETTVAKTEN`, `SUMPTROLLET`, `BROTROLLET`, `BOKA_SOM_SKRIVER_TILBAKE`.

Subject er identitet/presentation. Ett subject kan ha flere forhåndsskrevne kompatible roller uten at alle kombinasjoner er lov.

### Storylet role
Eksempler:
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

Eksempel Pannekakezombien kan i ulike authored Storylets blokkere en dør, gi et optional item, gi en critical resource, avsløre clue eller vite en puzzle-regel et annet sted.

### Requirements
Hvis en Storylet sier «finn mat til meg», er `FOOD` en faktisk dependency. Hvis Brotrollet tilfeldig velger mellom godkjente request-varianter, bindes valgt request før map materialization og bestemmer `requires[]`.

Validatoren må avvise circular/unreachable requirements.

## RESOURCE PROVIDERS
Requirements kobles til en eller flere compatible provider families.

Initial provider families:
- `ROOM_FIND`
- `MERCHANT_PURCHASE`
- `TRADE`
- `SOCIAL_BARGAIN`
- `NPC_REWARD`
- `PUZZLE_REWARD`
- `SEARCH_SECRET`
- `STARTING_OR_OWNED_RESOURCE` når blueprint eksplisitt tillater det.

### ROOM_FIND
Mat og andre gjenstander kan finnes seeded/semi-random i rom når det tematisk passer rom/zone/scene. Det skal føles som del av verden, ikke som loot tabell som ignorerer fiksjonen.

Optional resources kan være ekte tilfeldig variasjon.

Hvis ressursen er story-critical, kan et room-find fortsatt *se* tilfeldig ut for spilleren, men grafen må ha reservert en reachable placement på forhånd. Critical progress kan ikke avhenge av om randomisering tilfeldigvis spawner varen.

### MERCHANT_PURCHASE / TRADE
Selger er en provider-Storylet, ikke nødvendigvis et separat økonomispill.

Selger kan:
- ta konkrete mynter/skatter/verdigjenstander barnet har funnet,
- bytte mot en spesifikk ting,
- be om liten tjeneste,
- tilby flere varer som passer subject/sted,
- være clue-source/favor/recurring NPC i samme authored Storylet-familie.

Foretrekk konkrete verdier/ting fremfor abstrakt stor talløkonomi så lenge det gir god fiction.

Hvis merchant er critical provider, grafen må bevise at pris/byttekrav er obtainable eller at det finnes fail-forward/annen provider.

### SOCIAL_BARGAIN
Barnet kan forsøke å snakke seg til vare, rabatt, lån eller gave.

- Barnet beskriver først hva det prøver; UI skal ikke presentere `OVERTAL` som universell lukket fasit.
- DM kan velge `FORHANDLE / USIKKERT FORSØK` når utfallet faktisk er usikkert.
- Da brukes fysisk D6; relevant `EKSTRA GOD PÅ` følger vanlig 2D6-regel.
- Terningen bestemmer utfallet av samtalen, ikke om story-prerequisite eksisterer.
- Lavt resultat bør fail-forward: høyere pris, liten tjeneste, alternativ handel, delvis rabatt eller annen vei.
- En critical resource kan aldri være permanent låst bak ett enkelt persuasion-roll.

### Critical provider invariant
For hver critical required resource/state:
1. minst én guaranteed reachable acquisition route finnes før requirement,
2. provider ligger ikke bak gaten ressursen skal åpne,
3. hvis provider krever trade/currency/favor, disse dependencies er også reachable,
4. critical success avhenger ikke av ett enkelt terningkast,
5. flere optional provider-ruter kan eksistere samtidig for variasjon og agency.

Eksempel Sumptrollet:
`SUMPTROLLET requires FOOD`
-> generator velger provider-plan før map placement
-> eksempel garantert `ROOM_FIND: HONNINGKJEKS` i tematisk tidligere rom + optional `MERCHANT_PURCHASE: EPLE`
-> trollscenen materialiseres bare hvis minst én route validerer reachable.

## OUTCOMES
Storylets deklarerer eksplisitte outcomes/world effects. Eksempler:
- `UNBLOCK_PATH`
- `GRANT_OPTIONAL_ITEM`
- `GRANT_CRITICAL_RESOURCE`
- `REVEAL_CLUE`
- `REVEAL_PUZZLE_ANSWER_OR_RULE`
- `REVEAL_LOCATION`
- `BECOME_FRIEND`
- `OPEN_GATE`
- `SET_RELATIONSHIP_STATE`

Samme subject kan ha forskjellige outcomes i forskjellige Storylets, men utfallet må være authored og passe rollen.

## ALTERNATIVE CHILD SOLUTIONS / DM RESOLUTION
Authored approaches er affordances, ikke lukket fasit.

DM UI må kunne:
- `GODTA LØSNING` / `OPPGAVEN ER LØST` når barnets alternative plan plausibelt oppfyller `resolvedWhen`,
- trigge fysisk terning bare når den konkrete handlingen er usikker,
- bruke samme authored worldEffects/outcome slik at graph state forblir konsistent,
- unngå at DM må manuelt redigere flags/inventory/map.

## OPTIONAL COMBAT MODULE
Skjelettvakten etablerer behov for kamp som valgfri løsningsmodul.

- Monster/vakt/guardian betyr ikke automatisk kamp.
- Barnet kan foreslå kamp; DM velger eksplisitt `START KAMP` når Storylet har `combatAllowed`.
- Kritiske guardians har minst én non-combat route med mindre blueprint eksplisitt sier noe annet.
- Kamp bruker physical dice + explicit combat state.
- Presentasjon skal være barnevennlig, ikke grafisk/skummel.
- Kamp kan ende i overgivelse, flukt, vennskap, distraksjon osv.; «drepe» er ikke nødvendig state.

## DM CONTROL SURFACE V1
DM-panelet skal gjøre generatorens mening synlig og håndterbar.

Minimum:
- `HVA ER GREIA?`
- `HVA KREVES?`
- `HVOR KAN DET SKAFFES?`
- `HVA KAN SKJE?`
- `NÅR ER DET LØST?`
- `HVA ENDRES DA?`
- authored/tracked vs narrator-improv tydelig skilt,
- `GODTA LØSNING`,
- `FORHANDLE / USIKKERT FORSØK`,
- merchant inventory/trade alternatives i forståelig språk,
- `START KAMP` bare når tillatt,
- authored outcome controls,
- player-view preview,
- action history og senere `ANGRE SISTE HANDLING`.

NG4 materialiserer nødvendig narrator/DM knowledge, provider hints og safe state transitions før full DM Control Surface-polish.

## MULTISCREEN / SHARED SESSION V1
Registrert framtidig capability, ikke aktiv WP.

### Detached player view
- player view kan åpnes på egen enhet/skjerm,
- touch-client og display-only,
- ingen narrator-only data leakage,
- DM ser preview/status av player view.

### DM Host / Player Client
- DM starter og er authoritative host,
- barnet joiner over local Wi-Fi via enkel kode/QR,
- LAN-first/offline-friendly,
- client sender requested actions, host validerer/broadcaster canonical state,
- reconnect henter nåværende state uten restart/double action.

### Sync + undo
- én authoritative state,
- stable action/event IDs for idempotency,
- shared-session layer over canonical adventure state,
- Adventure Code er reconstruction/sharing, ikke live sync,
- `ANGRE SISTE HANDLING` baseres på reversible events/snapshots og syncer korrigert state til player view.

Acceptance senere inkluderer iPad touch, display-only, join/rejoin, reconnect, double-tap safety, no DM-info leakage, synchronized undo, save/reload og fysisk family playtest.

## UX5A GATE
Patch 11 explicit key use.
Patch 12 single visible location.
Patch 13 purpose contract + authored-progress-only + real trap world effect + no random ambient puzzle attachment.
Patch 14 explicit narrator improvisation.

Automated patch-14 evidence remains:
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

Fresh current browser QA + physical retest pending. UX5A merges ikke før physical GREEN.

## NARRATIVE GRAPH V1 WORK PACKAGES
Reference `CRYSTAL_MACHINE` remains first/only conversion before NG8.

- NG0 architecture/spec freeze - prep docs,
- NG1 graph data model + validator, including requirement/provider reachability and no critical single-roll softlocks,
- NG2 Storylet Matrix engine, including subject/role/provider/outcome compatibility,
- NG3 Crystal Machine graph planner,
- NG4 room materialization + narrator/DM knowledge/actions/provider presentation,
- NG5 >=1000 structural generated QA,
- NG6 browser interaction QA,
- NG7 10-20 manual editorial playtests,
- NG8 accept/revise/abandon.

Do not convert another blueprint before NG8.

## Adventure Blueprint bank
Only `GLASS_HEART`, `WITCH_CAT`, `CRYSTAL_MACHINE`, `ZOMBIE_DELIVERY`. Do not expand now.

## REPOSITORY HEALTH GATE
Behavioral reconstruction works, but byte-identical V0.12.3/runtime asset reconstruction from ordinary repo files remains open debt.

## EXACT NEXT
While UX5A physical test remains open:
- patch only UX5A defects on runtime branch,
- continue physical patch-14 test,
- continue editorial subject/role/provider/outcome review,
- keep Narrative Graph implementation blocked,
- do not implement DM Control Surface, UX5B or Multiscreen yet.

When UX5A is physical GREEN:
1. document evidence,
2. confirm automated/browser regressions,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1`,
6. carry approved prep docs,
7. start NG1.
