# MONSTERHULEN - PLAYTEST FINDINGS

Updated: 2026-10-26
Status: active UX findings from live child/DM playtest. UX5A physical device retest remains open. Narrative Graph V1 is now the next architecture package after UX5A green.

## 1. Encounters are too ambiguous for the DM
Observed:
- It is not always clear whether the app's listed consequences are mandatory, suggestions, or whether the DM should invent consequences freely.
- The child may propose actions that are not represented by the generated encounter.
- Items can feel like they are "used up" even when they should remain available narratively.
- A DM may want to know important later dependencies, clues and scenario keys before improvising away something useful.
- A novice DM may meet a named figure and still not understand whether it is friendly, hostile or why a die roll is relevant.

Implemented before UX5A:
- `FRITT KAST` for uncertain free-form actions,
- `BRUK` no longer consumes normal inventory items,
- beginner narrator guidance,
- six physical D6 faces record actual die input.

Still open:
- narrator mode eventually needs actual graph/map-supported solution context. This is deferred until Narrative Graph V1 is proven.

## 2. Map navigation is not child-intuitive enough
Observed:
- Arrow controls are not the first thing a child tries.
- The immediate instinct is to tap directly on the map where the next room should be.

Implemented:
- map is primary navigation,
- reachable unexplored exits show tappable `?`,
- locked exits show lock state,
- revealed adjacent rooms are tappable,
- arrows remain fallback.

## 3. Dice input should look like a physical die
Implemented:
- six D6 faces with pips,
- exact die face stored,
- internal low/mid/high compatibility retained,
- animation is feedback only, never digital RNG.

## 4. Finale could be reached too early
Observed in UX3:
- final encounter could be reached almost immediately,
- a high roll then ended the adventure before the story had developed.

Implemented in UX4:
- every current blueprint has a hard structural progression gate,
- finale side is unreachable before prerequisite,
- prerequisites stay on reachable side,
- hidden shortcuts/secret doors cannot bypass gate,
- high rolls cannot skip unmet story gate.

This fixed structural progression, but later playtest shows that a valid prerequisite can still be narratively weak. See findings 8 and 11.

## 5. Secret doors need discovery play
Implemented in UX4:
- hidden connection invisible until discovered,
- in-fiction clue + optional investigation,
- uncertain search uses physical D6,
- low result strengthens clue without revealing,
- successful result reveals connection,
- secret doors are optional and cannot bypass story progression.

## 6. Rooms need a reason to be investigated without becoming loot detectors
UX5A implementation:
- every room gets the same initial `SE DEG RUNDT` affordance,
- UI does not reveal hidden-find rooms in advance,
- KORT/VANLIG/STORT target 1/2/3 deterministic optional finds,
- hidden finds exclude story-critical rooms,
- empty rooms do not force meaningless dice,
- first low hidden-search roll strengthens clue,
- repeated low fails forward,
- full backpack preserves revealed find.

Critical rule retained: generic room finds are optional affordances and may never become hidden mandatory scenario keys.

## 7. Encounters need durable state, not one-roll victories
UX5A implementation:
- normal fresh monsters: 3 hearts,
- `SPENNING`: 4 hearts,
- generated non-treasure encounters: 3 progress steps, 4 in `SPENNING`,
- physical die input never mutates hearts/progress automatically,
- narrator marks `+ FREMGANG` after meaningful fictional change,
- full progress resolves encounter,
- monster hearts appear only after child chooses combat,
- `LØST MED GOD IDÉ` supports genuinely decisive free-form solutions.

Manual question remains whether 3-4 steps feel satisfying rather than bookkeeping.

## 8. Critical prerequisites are structurally valid but narratively disconnected
Observed during live playtest of one random `CRYSTAL_MACHINE` adventure:
- the adventure required three crystals to open progression,
- the narrator had not been clearly told this requirement in fiction before it mattered,
- the gate did not provide a concrete visual clue such as three colored empty sockets,
- the three crystals felt like required objects rather than three small connected story beats,
- desired play would have been something like: one hidden through exploration, one earned through an NPC favor, one controlled by a guardian/monster.

### Root cause confirmed in current runtime
`planCollect()`:
- chooses three reachable pre-gate rooms,
- places one `DEL` event in each,
- requires all three through the story gate.

World pacing marks those rooms story-critical and skips them when adding normal ambient encounters. This protects prerequisites from random overwrites, but also means the generator has no controlled mechanism to turn those critical part rooms into an NPC quest, guardian scene or signalled hidden search.

This is therefore an architecture limitation, not a missing-hint-only bug.

### Decision
Do not solve this by allowing random ambient encounters into critical rooms.

Instead introduce Narrative Graph V1 + curated Storylet Matrix:
- critical story has explicit causal nodes and resource dependencies,
- human-authored storylets define setup/signal/action/payoff and compatible combinations,
- generator chooses only compatible storylets,
- critical graph is validated before ambient content,
- truth and player knowledge are separate.

### CRYSTAL_MACHINE reference quality bar
First experiment should support:
- visible story reveal of three colored missing sockets,
- one signalled hidden crystal with fail-forward,
- one NPC-favor crystal with a real reachable dependency,
- one guardian crystal with motivation and non-combat possibilities,
- return to machine,
- deliberate insertion/activation,
- gate/climax only after assembly.

A three-part collect scenario should default to three different play families, not three equivalent pickups.

### Human-curation boundary
Automated structure cannot guarantee good prose or meaningful motivations. Humans must curate storylet premises, motives, clues, payoff and compatibility rules. The generator may safely vary compatible selection/placement.

If 10-20 manual generated Crystal Machine adventures still require frequent narrator invention to repair logic after this system exists, prefer a more hand-authored scenario bank rather than forcing procedural generation.

Canonical specs are on `narrative/story-graph-v1-prep`:
- `docs/NARRATIVE_GRAPH_V1.md`
- `docs/STORYLET_MATRIX_V1.md`
- `docs/CRYSTAL_MACHINE_REFERENCE_V1.md`
- `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`

## 9. Physical device finding: ready story gate felt cosmetic
Observed:
- hero already had `GLASSNØKKEL`,
- one tap both unlocked and traversed the gate,
- key remained visible in inventory.

Hotfix:
- first tap opens only,
- key is removed with fiction log that it remains in lock,
- second tap traverses.

Targeted Node: 19/0. Targeted Chromium: 15/0. Physical retest pending.

## 10. Physical device finding: puzzle can be logical but fictionally unclear
Observed example:
- `DEN HVISKENDE VEGGEN` encounter,
- unrelated-looking `STEINTRINNENE` sequence puzzle,
- narrator could infer answer `4` but not why puzzle belonged to current mystery or what solving it should do.

Hotfix:
- puzzle framed as clue from current mystery,
- collapsed `FORTELLERHJELP`,
- explicit read-aloud/no-die guidance,
- hint and narrator-only answer,
- `PUZZLET ER LØST` gives exactly +1 progress.

Physical retest pending.

## 11. Story complication can arrive after its dramatic purpose is already gone
Observed in the same live playtest:
- `SKYGGEHEKSA` was presented as a figure that should make the main task more difficult,
- the encounter happened only after the player had already completed the task,
- the encounter therefore had no causal role left and felt like leftover random content rather than part of an adventure.

This is the temporal version of finding 8. A valid encounter is not enough; it must occur while its narrative function still exists.

### Narrative Graph rule added
Narrative Graph V1 now has explicit phases:
- `INTRO`
- `QUEST_ACTIVE`
- `RETURN`
- `CLIMAX`
- `AFTERMATH`

Critical complications/antagonists declare valid phases and expiry conditions.

Hard rule:
- a complication may not first activate after the objective it exists to obstruct has already resolved,
- completion of that objective expires or transforms dependent unresolved beats,
- later reuse of the same character requires a separately authored `CLIMAX` or `AFTERMATH` storylet with a new narrative purpose,
- ambient content whose prose references an unfinished objective must also be filtered after that objective is complete.

Automated NG1/NG5 validation and browser/manual tests must explicitly cover this case.

## Verification evidence
Broad reconstructed UX5A before latest device hotfix:
- search/encounter QA: **2216 / 0**,
- Adventure Code: **405 / 0**,
- UX4 progression: **1797 / 0**,
- combined content regression: **5960 / 0**,
- 11 inline JavaScript blocks: **0 syntax errors**,
- Chromium UX5A smoke: **23 / 0**.

Targeted device hotfix:
- Node: **19 / 0**,
- Chromium: **15 / 0**.

Byte-identical V0.12.3 baseline provenance and complete assets remain a repository-health issue.

## Priority now
1. Finish physical UX5A hotfix/device smoke.
2. If green, merge UX5A to `main`.
3. Create real `narrative/story-graph-v1` branch from merged main.
4. Implement `WP-NG1` graph model + validator, including temporal phase/expiry validation.
5. Convert only `CRYSTAL_MACHINE` through the work package.
6. Do not start old UX5B until Narrative Graph V1 has passed structural, Chromium and manual editorial gates.
7. Do not add more blueprints yet.
