# MONSTERHULEN - ROADMAP

DATO: 2026-10-26
STATUS: UX5A PATCH 14 AUTOMATED GREEN + FRESH BROWSER/PHYSICAL RETEST PENDING + NARRATIVE GRAPH V1 PREP COMPLETE/UPDATED

## LÅSTE PRODUKTPRINSIPPER
- Fortellingskvalitet slår kombinasjonsmengde.
- Barnet foreslår handlinger; appen støtter og tolker, men velger ikke løsningen automatisk.
- Ett fysisk sted har ett synlig kanonisk navn.
- Encounter-mekanikk krever `purpose`, `stakes`, `resolvedWhen`, `payoff` og reelle world effects.
- Ingen generiske fremgangsruter uten skrevne meningsfulle steg.
- Puzzles må ha skrevet funksjon i scenen.
- Forteller-improvisasjon er lov, men må være eksplisitt merket/scopet.
- Critical story-state kan ikke avhenge av untracked improvisasjon.
- Subject, Storylet-role, requirements, provider routes, outcomes og interaction shell er separate lag.
- Kritisk historie bygges fra Adventure Blueprint + Narrative Graph + kuraterte Storylets.
- Kritiske mål bruker `SETUP -> SIGNAL -> ACTION -> PAYOFF`.
- Sannhet og spillerkunnskap er separate state.
- Story-critical beats har timing/expiry.
- Fysisk terning brukes ved reell usikkerhet; appen ruller aldri digitalt.
- Terningresultat erstatter aldri unmet prerequisite.
- Ting/venner/kjæledyr er affordances, ikke tallbonuser.
- Stable IDs/save compatibility beholdes.
- GitHub er permanent source of truth.

## KANONISK ENCOUNTER/STORY-MODELL

`SUBJECT -> STORYLET ROLE -> REQUIREMENTS + PROVIDERS -> PLAYER ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

Supporting layers:
- knowledge/reveal,
- dramatic phase/expiry,
- interaction shell/popup,
- typed canonical state transition,
- senere action history/undo/shared session.

### Subject
Gjenkjennelig identitet/personlighet, f.eks. Pannekakezombien, Sumptrollet, Boka som skriver tilbake.

Samme subject kan ha flere **forhåndsskrevne kompatible** roller. Det er kuratert variasjon, ikke tilfeldig miksing.

### Storylet roles
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
- `FOLLOW_CLUE`
- `RETURN`
- `ASSEMBLE`
- `GATE`
- `COMPLICATION`
- `CLIMAX`

### Outcomes
Eksempler:
- `UNBLOCK_PATH`
- `GRANT_OPTIONAL_ITEM`
- `GRANT_CRITICAL_RESOURCE`
- `REVEAL_CLUE`
- `REVEAL_PUZZLE_ANSWER_OR_RULE`
- `REVEAL_LOCATION`
- `BECOME_FRIEND`
- `OPEN_GATE`
- `SET_RELATIONSHIP_STATE`

Outcome må være authored og worldEffects må faktisk gjøre det sant i state.

## RESOURCE PROVIDER-SYSTEM
En requirement og måten den kan skaffes på er separate graph-konsepter.

Initial provider families:
- `ROOM_FIND`
- `MERCHANT_PURCHASE`
- `TRADE`
- `SOCIAL_BARGAIN`
- `NPC_REWARD`
- `PUZZLE_REWARD`
- `SEARCH_SECRET`
- `STARTING_OR_OWNED_RESOURCE` når blueprint eksplisitt tillater det.

### Optional resources
Kan være genuinely variable/random når placement er tematisk plausibel.

### Critical resources
Minst én provider-route må være:
- reserved,
- reachable før requirement,
- ikke bak gaten ressursen skal åpne,
- uten circular dependency,
- uten single-roll permanent softlock.

En critical room-find kan se tilfeldig ut for spiller, men må være garantert av graph-planen.

### Merchant
Selger er en provider-Storylet, ikke automatisk et stort økonomisystem.

Foretrekk:
- konkrete mynter,
- skatter/verdigjenstander,
- trade goods,
- favors,
- andre authored resources.

### Social bargain
Barnet sier først hva det prøver. DM trigger bare fysisk terning hvis utfallet faktisk er usikkert.

Lavt resultat fail-forward til f.eks.:
- høyere pris,
- liten tjeneste,
- alternativ trade,
- mindre fordel,
- annen provider-route.

Critical resource kan aldri permanent forsvinne bak ett overtalingkast.

## REFERANSE FRA INNHOLDSREVIEW
### Pannekakezombien
Kan i forskjellige Storylets blokkere dør, gi optional/critical item, avsløre clue eller gi puzzle-regel/svar.

### Den bortkomne zombien
Samme fleksible modell med route/help/follow-clue/NPC fiction.

### Skjelettdanseren
Nåværende musikk/social fungerer; authored outcomes kan variere.

### Skjelettvakten
Reference for `combatAllowed` + DM-started combat.

### Sumptrollet
Reference for `requires FOOD` + provider plan before gate.

### Brotrollet
Kan velge mellom authored ønskede objekter; valgt request binder dependency/provider før map materialization.

### Boka som skriver tilbake
Reference for subject/role separation: open improv, NPC-like, tracked clue, puzzle/gate, item wrapper osv. Sparsom bruk.

Candidate sibling subjects: Den snakkende dukken / Det levende bildet. Ikke aktiv-bank additions ennå.

## ALTERNATIVE CHILD SOLUTIONS / DM RESOLUTION
Authored approaches er affordances, ikke fasitliste.

DM skal kunne:
- `GODTA LØSNING` hvis barnets plan plausibelt oppfyller `resolvedWhen`,
- trigge fysisk terning bare ved faktisk usikkerhet,
- anvende canonical Storylet outcomes/worldEffects,
- aldri måtte håndredigere raw flags/inventory/map.

## OPTIONAL COMBAT MODULE
- Combat er capability, ikke default for monster/vakt.
- Krever `combatAllowed=true`.
- Barnet kan foreslå kamp; DM velger eksplisitt `START KAMP`.
- Critical guardians har normalt non-combat route.
- Barnevennlig/non-graphic presentation.
- Surrender, retreat, distraction, friendship, escape osv. kan løse encounter; kill-state er ikke påkrevd.

## INTERACTION SHELLS / PLANLAGTE POPUPS
Canonical spec: `docs/INTERACTION_SHELLS_V1.md`.

Initial shell families:
- `SLOT_GATE / ASSEMBLY`
- `LOCKED_OBJECT`
- `NPC_DIALOGUE_FAVOR`
- `MERCHANT_TRADE`
- `PUZZLE`
- `COMBAT`
- `REWARD_CHOICE`
- `SEARCH_INSPECT`

Shell er presentation + action submission, ikke skjult story logic.

### Three-color slot gate reference
Eksempel dør/maskin med rød, blå, gul stein:
1. story reveal gjør sockets kjent,
2. player tapper target,
3. popup viser tre slots,
4. owned items auto-fylles aldri,
5. child places items explicitly,
6. wrong item is not consumed,
7. partial placement persists,
8. full placement either resolves or enables authored `AKTIVER/ÅPNE`,
9. world effect changes gate/machine state,
10. undo restores target + inventory atomically.

Player shell må aldri lekke unrevealed/narrator-only requirements.

## DM CONTROL SURFACE V1
DM-panelet skal forklare generatorens mening i menneskespråk.

Minimum:
- `HVA ER GREIA?`
- `HVA KREVES?`
- `HVOR KAN DET SKAFFES?`
- `HVA KAN SKJE?`
- `NÅR ER DET LØST?`
- `HVA ENDRES DA?`
- `HVA ER SKREVET?`
- `HVA KAN JEG IMPROVISERE?`

Semantic controls:
- `GODTA LØSNING`
- `FORHANDLE / USIKKERT FORSØK`
- physical die input
- `START KAMP` where allowed
- authored outcome application
- merchant/trade context
- player-view preview
- later action history + `ANGRE SISTE HANDLING`

NG4 skal allerede ha minimal semantic DM control nok til å playteste Narrative Graph.

## CANONICAL ACTION/STATE DIRECTION
Narrative Graph, DM controls, undo og Shared Session bør konvergere på typed validated transitions.

Conceptual event:

```text
actionId
sequence
actor
type
targetId
payload
preconditions[]
effects[]
undoPolicy
resultRevision
```

Dette gir grunnlag for:
- safe undo,
- idempotency,
- reconnect,
- deterministic testing,
- færre ad-hoc mutations.

## MULTISCREEN / SHARED SESSION V1
Future package; ikke aktiv nå.

### Detached player view
- own browser/device,
- touch-client eller display-only,
- narrator-only data never leaks,
- DM sees player-view preview/status.

### DM Host / Player Client
- DM always starts/hosts,
- DM owns authoritative state,
- child joins on same Wi-Fi/LAN via simple code/QR,
- player requests actions,
- host validates/applies/broadcasts,
- reconnect restores current state,
- stable action IDs prevent duplicates.

### Undo
`ANGRE SISTE HANDLING` uses reversible transitions/snapshots and re-syncs corrected state.

Adventure Code remains offline reconstruction/sharing, not live sync.

## OPEN-SOURCE SURVEY
Canonical note: `docs/OPEN_SOURCE_SURVEY_2026-10-26.md`.

No dependency adopted now.

Study-only candidates:
- `boardgame.io` - state reducer/log/undo/phases/multiplayer patterns,
- `Colyseus` - authoritative sync/reconnect patterns,
- `rot.js` - roguelike generation/pathfinding/RNG reference,
- `Epoch Mapper` - event/quest/interaction/standalone dungeon-engine reference.

Any future adoption requires ADR/spike for license, maintenance, bundle/offline, save compatibility, Adventure Code determinism, LAN implications and exit strategy.

## PLAYTEST- OG ARKITEKTURREKKEFØLGE
1. Kartnavigasjon.
2. FRITT KAST + narrator freedom + item-use semantics.
3. DM-guide + fysisk D6-input.
4. Adventure Code + curated blueprints.
5. **UX4:** hard finale-progresjon + secret doors.
6. **UX5A:** room investigation + encounter/world state + physical findings.
7. **NARRATIVE GRAPH V1:** causal/timed critical story + Storylet Matrix + providers + minimal semantic DM controls + required interaction shells. Start only after UX5A physical green.
8. **DM CONTROL SURFACE V1:** polish semantic DM control + player preview + action history/undo foundation, if NG accepted.
9. **UX5B:** map-aware dependency/solution UI consuming accepted graph state.
10. Convert additional blueprints one at a time after NG8/editorial gate.
11. **MULTISCREEN / SHARED SESSION V1:** DM-hosted detached player view + LAN sync + undo, after action/state model stabilizes.

This order supersedes earlier roadmap where UX5B was automatically before DM control. DM comprehension is now a core product need.

## UX5A GATE - CURRENT ACTIVE WORK
Patch 11: explicit key use.
Patch 12: one visible location identity.
Patch 13: purpose contract + authored-progress-only + real trap world effect + no random ambient puzzle attachment.
Patch 14: explicit narrator improvisation.

Automated patch-14 evidence:
- explicit-improv **20/0**
- encounter-purpose **4337/0**
- authored-mysteries-only **3075/0**
- single-location **19/0**
- targeted device **27/0**
- search/encounter **2328/0**
- Adventure Code **405/0**
- UX4 **1797/0**
- content regression **5830/0**
- 11 scripts **0 syntax errors**

Fresh current browser QA and physical target-device retest remain pending.

Do not merge UX5A until physical gate is green.

## NARRATIVE GRAPH V1 WORK PACKAGES
### NG0 - docs/spec
Complete/updated on prep branch.

### NG1 - graph + provider + typed transition data model / validator
No polished UI.

### NG2 - Storylet Matrix + provider engine
Subject/role/provider/outcome compatibility and deterministic selection.

### NG3 - Crystal Machine planner
Only blueprint converted before NG8.

### NG4 - runtime materialization + narrator knowledge + minimal DM controls + interaction shells
Includes explicit three-slot assembly reference.

### NG5 - >=1000 automated graph/state cases
Includes provider reachability, slot state, no auto-use, world effects, save/idempotence.

### NG6 - real browser/touch QA
Includes popup/slot/DM controls and no narrator-data leakage.

### NG7 - 10-20 manual editorial/family playtests
Narrative quality, DM burden, child agency, provider naturalness, interaction-shell feel.

### NG8 - accept/revise/abandon architecture gate
Do not convert another blueprint before NG8.

## ADVENTURE BLUEPRINT BANK
Only:
- `GLASS_HEART`
- `WITCH_CAT`
- `CRYSTAL_MACHINE`
- `ZOMBIE_DELIVERY`

Do not expand now.

## CONTENT REVIEW TRACK
Editorial review may continue as docs while UX5A runtime is blocked.

Reviewed through:
- Pannekakezombien
- Den bortkomne zombien
- Skjelettdanseren
- Skjelettvakten
- Sumptrollet
- Brotrollet

Next subject: **DEN LEVENDE RUSTNINGEN**.

See `docs/CONTENT_REVIEW_HANDOFF_2026-10-26.md`.

## REPOSITORY HEALTH
Still open. Full active runtime/source/assets are not yet byte-reconstructable from ordinary repo files alone. Do not call release checkpoint locked until closed.

## EXACT NEXT
While physical UX5A test is open:
- patch only UX5A defects on runtime branch,
- continue physical patch-14 test,
- continue editorial subject/role/provider/outcome review as docs if desired,
- keep Narrative Graph runtime blocked,
- do not implement full DM Control Surface, UX5B or Multiscreen yet.

When UX5A is physical GREEN:
1. document evidence,
2. confirm automated + fresh browser regression,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1`,
6. carry approved prep docs,
7. start NG1.
