# MONSTERHULEN - PLAYTEST FINDINGS

Updated: 2026-10-26
Status: active UX/story findings. UX5A physical device retest remains open. Narrative Graph V1 is next only after UX5A is physically green and merged.

## 1. Encounters are too ambiguous for the DM
Observed:
- consequences can look mandatory rather than suggestions,
- child actions may not match generated options,
- items can feel consumed when they should remain narratively available,
- novice DM may not understand a figure's role or when dice are relevant.

Implemented over successive UX layers:
- `FRITT KAST`,
- ordinary `BRUK` does not consume items,
- beginner narrator guidance,
- six physical D6 faces record exact die input,
- patch 13 adds explicit purpose/stakes/resolution/payoff semantics,
- patch 14 explicitly labels intentional narrator-improvisation.

Still open: eventual narrator mode should use actual graph/map/provider context after Narrative Graph V1.

## 2. Map navigation is not child-intuitive enough
Observed: children try to tap the map before arrow controls.

Implemented: map-primary navigation with tappable `?`, locks and known adjacent rooms; arrows remain fallback.

## 3. Dice input should look like a physical die
Implemented: six D6 faces with pips; exact physical face stored; no digital RNG.

## 4. Finale could be reached too early
UX4 fixed structural progression with explicit story gates, reachable prerequisites and no secret-path/die bypass.

Later playtest showed that a valid prerequisite may still be narratively weak; see findings 8 and 11.

## 5. Secret doors need discovery play
Implemented: clue -> optional investigation -> physical D6 only when uncertain -> stronger low-result clue -> discovery. Secrets cannot bypass story gates.

## 6. Rooms need a reason to be investigated without becoming loot detectors
UX5A:
- every room initially offers `SE DEG RUNDT`,
- UI does not reveal which rooms contain optional finds,
- KORT/VANLIG/STORT target 1/2/3 deterministic optional finds,
- finds avoid critical rooms,
- first low search strengthens clue, repeated low fails forward,
- full backpack preserves revealed find,
- generic finds never become story prerequisites.

Manual question remains whether `SE DEG RUNDT` feels voluntary rather than compulsory.

## 7. Encounters need durable consequences, not generic duration
Initial UX5A response to one-roll victories was generic 3/4-step progress. Physical play showed this was too abstract.

Patch 13 supersedes it:
- monster combat keeps explicit 3/4 hearts only after child chooses combat,
- non-combat resolves through authored fictional condition,
- progress UI only for authored `progressStages`,
- one genuinely sufficient plan may solve simple encounter,
- dice determine uncertainty of attempt, not encounter duration.

## 8. Critical prerequisites can be structurally valid but narratively disconnected
Observed in `CRYSTAL_MACHINE`: three required crystals could be isolated bare pickups.

Decision: Narrative Graph V1 + curated Storylet Matrix. Initial reference mix: `SEARCH_SECRET`, `NPC_FAVOR`, `GUARDIAN`, then deliberate return/assembly.

## 9. Physical device finding: ready story gate felt cosmetic
Observed: hero with `GLASSNØKKEL` could tap a gate and both unlock + traverse; key looked unused.

Patch 10 opened first/traversed second, but still auto-chose solution. See finding 12.

## 10. Random puzzle can be logically valid but fictionally irrelevant
Observed example: `DEN HVISKENDE VEGGEN` + unrelated `STEINTRINNENE` puzzle.

Patch 13:
- ambient random puzzles opt-in only,
- puzzle needs authored contextual role,
- thinking/answering needs no die,
- solving puzzle does not award generic progress,
- fiction decides world effect.

## 11. Story complication can arrive after its dramatic purpose is gone
Observed: `SKYGGEHEKSA`, meant to hinder main task, could appear only after task was complete.

Narrative Graph V1 therefore requires explicit phases/expiry and separately authored later roles.

## 12. Possessing the solution must not make the app choose the action
Observed: patch 10 still auto-used `GLASSNØKKEL` when locked door was tapped.

Patch 11:
- keyed door tap only says `DØREN ER LÅST`,
- no auto unlock/traverse/key consumption,
- scenario key protected but has explicit `BRUK`,
- matching key use opens but does not traverse,
- narrator may give open backpack hint.

General rule: app presents obstacles/affordances before applying possessed solutions.

## 13. Player-facing rooms had two competing names
Observed: room + zone/area name made one physical place feel like two.

Patch 12:
- room name is single visible location identity,
- separate area identity removed,
- internal zone metadata retained for generation/tone.

## 14. `ANNEN LØSNING` progress boxes had no fictional meaning
Observed with `REGNBUENETTET`:
- four boxes looked like DM had to invent four tasks,
- net did not actually prevent travel,
- completing track changed nothing.

Patch 13:
- all generated non-treasure encounters declare purpose/stakes/resolvedWhen/payoff,
- generic boxes removed,
- progress only for authored stages,
- narrator answers what scene is / when solved / what changes,
- traps actually block forward while active but allow retreat,
- resolving trap frees route,
- ambient mystery puzzles not attached randomly.

Reference: obstacle -> child plan -> die only if uncertain -> resolve when fiction supports it -> route becomes available.

## 15. Intentional improvisation looked like missing hidden content
Observed with `BOKA SOM SKRIVER TILBAKE`:
- book implied it was trying to tell party something,
- app contained no hidden authored message/larger plan,
- narrator could not tell whether to discover or invent answer.

User clarified: improvisation is acceptable, but Forteller-delen must explicitly say when responsibility is theirs.

Patch 14:
- per-scene improv prompt,
- `FORTELLER-IMPROVISASJON`,
- `INGEN SKJULT FASIT`,
- says no larger predetermined plan exists for missing detail,
- tells narrator what may be invented,
- allows atmosphere/optional hints/side discoveries,
- forbids new mandatory story keys/contradictory state,
- child-facing fiction stays immersive.

For the book, narrator invents what repeated words become. No hidden sentence exists in this ambient version.

## 16. A memorable subject should not be locked to one narrative function
Editorial review of Pannekakezombien, Den bortkomne zombien, Skjelettdanseren and Boka som skriver tilbake exposed a positive variation model.

A recognizable subject can support several **curated compatible** Storylets.

Examples:
- Pannekakezombien may block a door, give an item, reveal a clue or reveal a puzzle rule elsewhere,
- Den bortkomne zombien may help with route/follow-clue/reward roles,
- Skjelettdanseren may remain music/social but have different authored payoffs,
- Boka som skriver tilbake may be open improv, NPC-like, tracked clue, puzzle/gate or item wrapper.

Decision:
- stable `subjectId` separate from Storylet logic/role ID,
- role/outcome pairing must be pre-authored and fictionally compatible,
- no unrestricted random role assignment,
- subject repetition should be penalized rather than inflated for variety.

Candidate sibling subjects like Den snakkende dukken / Det levende bildet are ideas only, not active-bank additions yet.

## 17. Required resources need provider planning, not hopeful spawning
Editorial review of `SUMPTROLLET` / `BROTROLLET` exposed the next causal layer.

If Sumptrollet says “find food and I let you pass”, story cannot simply hope random loot contains food. If Brotrollet wants a specific authored object, that request must be satisfiable before the troll.

Later user clarification: food/items may be obtained in multiple natural ways:
- thematic room find,
- merchant purchase,
- trade,
- social bargain,
- NPC reward,
- puzzle reward,
- signalled hidden search,
- explicitly allowed starting/owned resource.

Decision:
- requirement and provider are separate graph concepts,
- optional resources may be genuinely random when thematic,
- critical resources require at least one reserved/validator-proven reachable route,
- critical route cannot be behind consuming gate,
- nested provider dependencies must also be reachable/non-circular,
- critical progression cannot depend on one mandatory persuasion roll.

A critical room-find may *feel* random to player while being reserved by graph.

## 18. DM needs semantic scene control, not raw state editing
Content review repeatedly required DM judgement:
- accept a plausible unlisted solution,
- decide whether negotiation is uncertain,
- start optional combat only when fiction supports it,
- apply the authored payoff/outcome.

Decision: future DM surface should show:
- what scene is,
- what it requires,
- where requirement can be acquired,
- possible authored outcomes,
- when it is resolved,
- what changes,
- authored vs narrator-improv responsibility.

Semantic actions:
- `GODTA LØSNING`,
- `FORHANDLE / USIKKERT FORSØK`,
- physical die recording,
- `START KAMP` only when allowed,
- authored outcome application,
- later action history/undo.

DM should not edit raw flags/inventory/map.

## 19. Combat should be optional and DM-started
`SKJELETTVAKTEN` was first clear example where fighting can be a child-proposed solution.

Decision:
- monster/vakt/guardian identity does not auto-start combat,
- Storylet must declare `combatAllowed`,
- child may propose fighting,
- DM explicitly starts combat module,
- critical guardians normally retain non-combat route,
- child-friendly/non-graphic presentation,
- valid endings include surrender, retreat, distraction, friendship, escape etc., not required kill state.

Combat becomes one interaction module among several.

## 20. Some story actions should be tangible interaction shells/popups
New planning example: a door/machine needs three stones/crystals in three colors.

The UI should not collapse this to “you own all three -> gate opens”.

Desired flow:
- reveal the slots in fiction first,
- child taps target,
- popup shows three slots,
- items remain in inventory until child explicitly places them,
- wrong item not consumed,
- partial placement persists,
- full placement either resolves or enables a separate authored activation action,
- actual world effect opens/activates target,
- future undo restores target + inventory together.

This generalizes finding 12: **possessing a solution is not performing the action.**

Planned interaction-shell families include slot/assembly, locked-object item use, NPC favor/dialogue, merchant/trade, puzzle, optional combat, reward choice and search/inspect.

Player shell must never leak unrevealed/narrator-only information.

## 21. Future undo and shared-session sync should use the same canonical action model
Multiscreen planning showed that DM undo, reconnect and two-device sync all become safer if gameplay actions have one validated transition boundary with stable action IDs.

Future direction:
- DM is authoritative host,
- player client requests actions,
- host validates/applies/broadcasts canonical state,
- duplicate/reconnect actions are idempotent,
- undo is reversible event/snapshot state correction, not ad-hoc field edits,
- narrator-only data never goes to player view.

This is future work only; do not implement before story/world state transitions are stable.

## 22. Open source can inform patterns, but should not replace current architecture now
Limited survey identified useful references:
- boardgame.io: state transitions/logs/time-travel/undo/multiplayer patterns,
- Colyseus: authoritative state/reconnect patterns,
- rot.js: roguelike algorithms,
- Epoch Mapper: structured dungeon events/quests/interactions/standalone patterns.

Decision at this checkpoint: **adopt nothing now**.

Current bottleneck is story/state semantics, not lack of a dungeon framework. Any future dependency needs explicit ADR/spike for license, maintenance, offline/bundle impact, save compatibility, deterministic Adventure Code behavior, LAN implications and exit strategy.

## Verification after finding 15 / current runtime status
Patch-14 reconstructed runtime automated evidence:
- explicit-improv **20/0**,
- encounter-purpose **4337/0**,
- authored-mysteries-only **3075/0**,
- single-location **19/0**,
- targeted device **27/0**,
- search/encounter **2328/0**,
- Adventure Code **405/0**,
- UX4 **1797/0**,
- content regression **5830/0**,
- 11 inline scripts **0 syntax errors**.

Fresh browser certification remains open. Physical retest remains required.

## Priority now
1. Finish physical UX5A patch-14 retest.
2. Keep fixing UX5A defects only until gate is green.
3. Content review may continue as documentation; exact reviewed range currently ends after `BROTROLLET`.
4. Next content subject if continuing review: **DEN LEVENDE RUSTNINGEN**.
5. Do not expand Adventure Blueprint bank.
6. When UX5A green, record evidence and merge to `main`.
7. Create real `narrative/story-graph-v1` and start NG1.
8. Do not start full DM Control Surface, UX5B or Multiscreen first.
