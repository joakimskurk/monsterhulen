# Monsterhulen - Encounter / Story System Plan V1

Status: **architecture + handoff plan only; runtime implementation blocked on UX5A physical green**
Updated: 2026-10-26

This document consolidates the editorial/system direction discovered during physical UX5A playtest and the subsequent content review. It is the main continuation plan for a fresh chat.

## 0. Gate before implementation

Do **not** implement this runtime architecture yet.

Current active runtime branch: `ux5/searchable-rooms-encounter-tracks`.

Before Narrative Graph runtime work:
1. finish physical UX5A retest,
2. document physical result,
3. rerun relevant automated/browser regressions,
4. merge UX5A to `main`,
5. verify `main`,
6. create `narrative/story-graph-v1` from merged `main`,
7. carry approved prep docs to that branch,
8. start WP-NG1.

If UX5A is not physically green, stay on UX5A.

---

## 1. Product model discovered through playtest

The intended system is no longer “encounter template + random mechanic”.

The target chain is:

`SUBJECT -> STORYLET ROLE -> REQUIREMENTS + PROVIDERS -> PLAYER ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

Supporting layers:

`KNOWLEDGE + DRAMATIC PHASE + INTERACTION SHELL + ACTION HISTORY`

A generated scene is valid only if all of those layers agree.

### 1.1 Subject

The recognizable fictional identity: Pannekakezombien, Sumptrollet, Boka som skriver tilbake, Den snakkende dukken, Det levende bildet, etc.

Subject controls:
- identity/personality,
- presentation/art/text family,
- compatible narrative roles,
- thematic/tone constraints,
- repetition penalty.

Subject does **not** permanently determine gameplay function.

### 1.2 Storylet role

What the subject does in this specific adventure.

Initial role families include:
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
- `FOLLOW_CLUE`
- `RETURN`
- `ASSEMBLE`
- `GATE`
- `COMPLICATION`
- `CLIMAX`

Only pre-authored compatible subject/role combinations are selectable. This is controlled variation, not unrestricted mixing.

### 1.3 Purpose contract

Every interactive Storylet declares:
- `purpose` - why it exists,
- `stakes` - what is affected while unresolved,
- `resolvedWhen` - the fictional condition for completion,
- `payoff` - what the child/narrator experiences after completion,
- `worldEffects[]` - state changes that make that payoff true.

No mechanics merely because a category “supports” them. No generic progress boxes.

### 1.4 Critical story contract

Every critical beat needs:

`SETUP -> SIGNAL -> ACTION -> PAYOFF`

Truth and player knowledge remain separate. A prerequisite becoming available does not mean the action has happened.

Examples:
- key owned != door unlocked,
- three crystals owned != machine assembled,
- food owned != troll satisfied,
- NPC favor condition met != reward transferred unless interaction/acknowledgement is authored,
- guardian motive known != guardian resolved.

---

## 2. Resource/provider model

A requirement and the way it can be obtained are separate graph concepts.

### 2.1 Initial provider families

- `ROOM_FIND`: thematic earlier room find.
- `MERCHANT_PURCHASE`: seller offers resource for authored value.
- `TRADE`: exchange concrete item/category.
- `SOCIAL_BARGAIN`: child negotiates; DM may trigger physical die only if genuinely uncertain.
- `NPC_REWARD`: help/favor yields resource.
- `PUZZLE_REWARD`: contextual puzzle yields resource.
- `SEARCH_SECRET`: signalled hidden resource with fail-forward.
- `STARTING_OR_OWNED_RESOURCE`: only when blueprint explicitly permits.

### 2.2 Random room finds

Food and ordinary objects may appear seeded/semi-randomly when the room/zone/scene tags make fictional sense.

Optional resources may be truly variable.

If a resource is critical, at least one route must be **reserved and validator-proven reachable** before the consuming Storylet. The placement may still feel incidental/random to the player.

Never depend on “hopefully random loot spawned the required object”.

### 2.3 Merchant model

A merchant is a Storylet/provider, not automatically a separate economy system.

Possible prices:
- concrete coins,
- treasure/valuables,
- trade goods,
- a favor,
- another authored resource.

Prefer concrete fiction-rich values over a large abstract gold counter unless later playtest proves a numerical economy useful.

A merchant may simultaneously be a recurring NPC, clue source, favor source or relationship character when explicitly authored.

### 2.4 Social bargaining

Flow:
1. child says what they try or say,
2. DM decides whether outcome is actually uncertain,
3. if uncertain, DM triggers `FORHANDLE / USIKKERT FORSØK`,
4. physical D6 or trait-enabled physical 2D6 is recorded,
5. result changes the negotiation attempt.

Low results should fail forward: higher price, small favor, alternative trade, partial deal, delayed deal, or another route.

A critical resource may never be permanently lost behind a single persuasion roll.

### 2.5 Provider guarantee

For each critical requirement validator proves:
- at least one provider exists before requirement,
- provider is reachable without passing the gate it enables,
- nested provider requirements are reachable,
- no circular dependency exists,
- no mandatory single-roll softlock exists,
- at least one route survives all allowed low-result outcomes.

Multiple optional providers may coexist for replay variety.

---

## 3. Reference subject examples from current editorial review

### 3.1 Pannekakezombien

Compatible direction:
- comic/social encounter,
- `BLOCK_PATH`,
- `ITEM_HOLDER`,
- `CLUE_SOURCE`,
- `TRADE` / food-related favor.

Possible authored outcomes:
- moves away and unblocks door,
- gives optional item,
- gives critical resource,
- reveals concrete clue/location,
- reveals answer/rule needed by a puzzle elsewhere.

### 3.2 Den bortkomne zombien

Same architecture pattern with different fiction:
- needs help with route/symbol,
- can unblock route,
- can reveal clue,
- can participate in follow-clue/delivery story,
- can grant resource or relationship payoff.

### 3.3 Skjelettdanseren

Can remain a music/social scene, but outcome is not fixed:
- move aside,
- teach rhythm used later,
- reveal clue,
- become friendly recurring character,
- unlock music-based interaction.

### 3.4 Skjelettvakten

Reference for optional combat capability.

Potential roles:
- gatekeeper,
- old-rule NPC,
- clue source,
- guardian,
- combat-capable guardian.

Combat is not automatic. Child may suggest fighting; DM explicitly starts combat if `combatAllowed=true`.

### 3.5 Sumptrollet

Reference for provider planning.

Example Storylet:
`SUMPTROLLET requires FOOD -> UNBLOCK_PATH`

Before map materialization, graph chooses/validates one or more food providers, e.g.:
- reserved thematic room find,
- merchant offering food,
- NPC reward,
- trade,
- social bargain.

Alternative plausible child solution may also be accepted by DM. Die only if actual uncertainty exists.

### 3.6 Brotrollet

May ask for different authored object categories across adventures. The selected wanted-object variant fixes requirements before placement; provider(s) are generated earlier/reachable.

Randomization chooses among valid pre-authored requests, not arbitrary nouns.

### 3.7 Boka som skriver tilbake

Reference for subject/role separation.

Compatible authored variants:
- explicit open narrator improvisation,
- NPC-like conversational personality,
- tracked clue source,
- puzzle carrier opening gate,
- puzzle carrier releasing item,
- history/lore source,
- one-use helper.

Do not repeat frequently. Subject repetition is penalized.

### 3.8 Candidate sibling subjects

Not automatically added to active bank; editorial candidates:
- Den snakkende dukken,
- Det levende bildet,
- talking statue,
- enchanted map,
- whispering mask,
- living portrait variants.

These may reuse compatible role families but require explicit subject-role compatibility review.

---

## 4. Alternative child solutions and DM authority

Authored approaches are affordances, not a closed answer list.

If child invents a plausible solution:
- DM evaluates fiction,
- if certain, DM can directly `GODTA LØSNING`,
- if uncertain, DM triggers physical die interaction,
- successful/accepted resolution applies the Storylet's canonical authored outcomes/world effects,
- DM never manually edits raw flags/inventory/map.

The app knows state; DM interprets fiction.

This preserves improvisational tabletop play without sacrificing causal state.

---

## 5. Optional combat module

Combat is a capability attached to compatible Storylets, not the definition of “monster”.

Rules:
- `combatAllowed` must be explicit,
- no automatic combat entry,
- child may propose fighting,
- DM chooses `START KAMP`,
- critical guardians normally have non-combat route,
- physical dice remain core,
- language/visuals child-friendly and non-graphic,
- resolution may be surrender, retreat, distraction, friendship, escape, etc.,
- kill/death is not required system semantics.

The combat module should be an interaction shell/overlay, not a new unrelated state model.

---

## 6. DM Control Surface V1

The DM should never need to infer generator intent.

For current scene, DM view should answer:
- `HVA ER GREIA?`
- `HVA KREVES?`
- `HVOR KAN DET SKAFFES?`
- `HVA KAN SKJE?`
- `NÅR ER DET LØST?`
- `HVA ENDRES DA?`
- `HVA ER SKREVET?`
- `HVA KAN JEG IMPROVISERE?`

Semantic controls may include:
- `GODTA LØSNING`,
- `OPPGAVEN ER LØST`,
- `FORHANDLE / USIKKERT FORSØK`,
- physical die face input,
- `START KAMP` when allowed,
- authored outcome choices where real choice exists,
- explicit reward/grant/reveal actions tied to Storylet effects,
- player-view preview,
- action history,
- later `ANGRE SISTE HANDLING`.

No free-form debug buttons that bypass authored state.

### 6.1 Priority change

After Narrative Graph V1 is accepted, **DM Control Surface V1 should come before UX5B polish** unless playtest shows a stronger reason otherwise. A usable DM model is now core product behavior, not optional admin UI.

NG4 must already provide a minimal semantic DM control layer sufficient to playtest Narrative Graph.

---

## 7. Player interaction shells / planned popups

Interactive popups/overlays are a presentation of explicit state transitions, never a replacement for Storylet logic.

Canonical shell families are detailed in `docs/INTERACTION_SHELLS_V1.md`.

Initial shells:
- `SLOT_GATE` / `ASSEMBLY`,
- `LOCKED_OBJECT` / explicit item use,
- `NPC_DIALOGUE_FAVOR`,
- `MERCHANT_TRADE`,
- `PUZZLE`,
- `COMBAT`,
- `REWARD_CHOICE`,
- `SEARCH_INSPECT`.

### 7.1 Three-color slot gate reference

Example: a door/machine needs red, blue and yellow stones.

Player flow:
1. setup/reveal makes three sockets known,
2. player taps door/machine,
3. popup shows three physical/visual empty slots,
4. owned stones remain in backpack until explicitly selected/placed,
5. player places one stone at a time,
6. wrong item is not consumed and gives fictionally appropriate rejection,
7. partial placement persists visibly,
8. after all required slots are filled, Storylet either resolves immediately **only if authored** or exposes separate `AKTIVER / ÅPNE` action,
9. resulting world effect opens gate/activates machine,
10. DM undo can reverse slot placement/state safely.

Critical rule: inventory possession never auto-fills slots.

### 7.2 Shells must respect player knowledge

Do not show three colored sockets before the story has revealed that information.

A shell can show:
- unknown slots,
- covered mechanisms,
- locked/disabled controls,
- known colors/symbols only after reveal state.

Player UI must not leak narrator-only requirements.

---

## 8. Canonical action/state transition model

Narrative Graph, DM controls, undo and shared sessions should converge on one action contract.

Conceptual action event:

```text
actionId
sequence
actor: PLAYER | DM | SYSTEM
type
targetId
payload
preconditions[]
effects[]
undoPolicy
resultRevision
```

Examples:
- `MOVE_ROOM`
- `PLACE_RESOURCE`
- `USE_ITEM`
- `ACCEPT_SOLUTION`
- `START_UNCERTAIN_ATTEMPT`
- `RECORD_DIE_FACE`
- `START_COMBAT`
- `RESOLVE_COMBAT`
- `BUY_ITEM`
- `TRADE_ITEM`
- `GRANT_REWARD`
- `REVEAL_CLUE`
- `OPEN_GATE`

The user-facing app need not expose event names; they are internal consistency tools.

Benefits:
- deterministic state transitions,
- safe undo,
- idempotent player-client requests,
- reconnect,
- testable story effects,
- fewer ad-hoc mutations.

NG1 should define enough of this transition boundary to prevent new mechanics from bypassing it. Full persistent action history can come with DM Control Surface / Shared Session work.

---

## 9. Multiscreen / Shared Session V1

Future package only.

### DM Host / Player Client
- DM always starts session,
- DM host owns authoritative state,
- player device joins existing session,
- LAN-first / same Wi-Fi target,
- simple short code and/or QR join,
- touch player client or display-only player view,
- client sends action request; host validates/applies,
- host broadcasts resulting state,
- reconnect restores current state,
- stable action IDs prevent duplicates,
- narrator-only data never sent to player view.

### Undo
- based on reversible transition/event history or snapshots,
- not raw field editing,
- correction broadcasts immediately,
- typical reversible mistakes: movement, wrong resolve, wrong item use, wrong die face, wrong encounter/combat transition.

Adventure Code remains offline reconstruction/sharing and is not live-sync protocol.

---

## 10. Updated work-package sequence

### CURRENT: UX5A
Finish physical/browser gate. No architecture runtime yet.

### WP-NG1 - graph + transition data model / validator
Add/validate:
- subject vs Storylet ID,
- roles,
- phases/expiry,
- resources,
- provider plans,
- knowledge,
- explicit completion,
- outcomes/world effects,
- `interactionShell` declaration,
- `combatAllowed`,
- action/state transition boundary,
- critical provider guarantee,
- no single-roll critical softlock.

No polished UI.

### WP-NG2 - Storylet Matrix + providers
Implement compatibility selection:
- subject-role compatibility,
- provider families,
- outcome families,
- merchant/trade/social bargain contracts,
- combat capability,
- diversity/repetition scoring.

Start with few strong Storylets.

### WP-NG3 - Crystal Machine planner
First/only blueprint experiment before NG8.

Required:
`SETUP -> QUEST_REVEAL -> 3 acquisition branches -> RETURN -> ASSEMBLE -> GATE -> CLIMAX`

Use provider validation. Assembly is explicit child action.

### WP-NG4 - runtime materialization + minimal DM controls + interaction shells
Materialize:
- narrator knowledge,
- providers,
- safe semantic DM actions,
- `SLOT_GATE` / assembly popup for Crystal Machine,
- clue/search/favor/guardian interactions,
- optional combat if selected Storylet permits,
- world effects,
- no automatic resource application.

This is the first point where popup UI enters runtime.

### WP-NG5 - automated structural/state QA
>=1000 generated Crystal Machine cases plus transition tests.

Must test:
- provider reachability,
- nested dependency reachability,
- no cycles,
- no single-roll critical softlocks,
- possession != completion,
- partial slot placement persistence,
- wrong slot item non-consumption,
- full slots -> correct authored next state,
- world effects/payoff consistency,
- action idempotence for relevant transitions,
- save/reload idempotence,
- legacy regressions.

### WP-NG6 - browser interaction QA
Test actual flows:
- reveal before slots,
- collect providers,
- merchant/trade/negotiation if used,
- deliberate slot placement,
- partial assembly,
- return/assembly/gate,
- DM accept alternate solution,
- optional combat entry/exit if used,
- touch usability,
- no narrator data leak to player view.

### WP-NG7 - manual editorial / family playtest
10-20 generated Crystal Machine adventures.

Judge:
- story clarity,
- provider naturalness,
- DM cognitive load,
- whether popups make actions tangible rather than videogamey,
- child agency,
- repetition,
- payoff quality,
- whether DM still repairs causality.

### WP-NG8 - architecture decision gate
Accept / revise / abandon.

No second blueprint before this gate.

### After NG8 if accepted
Recommended order:
1. **DM Control Surface V1** - polish semantic scene control, action history, undo foundation.
2. **UX5B** - map-aware solution/dependency UI consuming real graph state.
3. Convert additional blueprints one at a time with editorial review.
4. **Multiscreen / Shared Session V1** when state/action model is stable.

Exact ordering may be revised only from new playtest evidence.

---

## 11. Testing philosophy

Keep these distinct:
- implemented,
- static/source verified,
- automated runtime verified,
- browser verified,
- physical-device verified,
- editorially/narratively accepted.

A validator can prove reachability. It cannot prove a child enjoyed the story or a DM understood it.

Structural green is necessary, never sufficient.

---

## 12. Content review process

Do not expand blueprint bank now.

Continue editorial review subject-by-subject:
1. current identity/personality,
2. allowed roles,
3. incompatible roles,
4. possible requirements,
5. valid provider families,
6. possible outcomes,
7. combat capability yes/no,
8. interaction shell needs,
9. repetition concerns,
10. critical-safe vs ambient-only.

Current reviewed range ends after `BROTROLLET`.

Next subject in the original list for a fresh chat: **DEN LEVENDE RUSTNINGEN**.

See `docs/CONTENT_REVIEW_HANDOFF_2026-10-26.md`.

---

## 13. Open-source policy for this architecture

See `docs/OPEN_SOURCE_SURVEY_2026-10-26.md`.

Current decision: **adopt no external framework now**.

Study patterns only. Any future dependency requires a small explicit spike/ADR covering:
- exact value,
- license,
- maintenance,
- bundle/offline impact,
- save compatibility,
- LAN/offline constraints,
- migration/exit strategy.

Do not replace working Monsterhulen systems merely because a generic dungeon framework already exists.

---

## 14. Stop/reassess conditions

Prefer more hand-authored scenario skeletons if:
- compatibility matrix becomes larger/more fragile than authoring full scenarios,
- DM repeatedly repairs causality,
- provider logic becomes special-case soup,
- interaction shells increasingly reveal closed answers,
- procedural variation weakens setup/payoff,
- same subjects/roles feel repetitive despite scoring,
- sync/undo requirements force unrelated architecture into story logic.

Monsterhulen optimizes for coherent, child-led tabletop play with digital support. Procedural generation is a means, not the product goal.
