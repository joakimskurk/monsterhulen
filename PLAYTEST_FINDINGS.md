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
- patch 13 now adds explicit purpose/stakes/resolution/payoff semantics to generated ambient encounters.

Still open: eventual narrator mode should use actual graph/map-supported context after Narrative Graph V1.

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
Initial UX5A response to one-roll victories was to give generated non-treasure encounters a generic 3/4-step progress track. This prevented a die result from directly erasing a whole scene, but physical play later showed the model was too abstract.

Patch 13 supersedes the generic progress assumption:
- monster combat keeps explicit 3/4 hearts only after the child chooses combat,
- non-combat encounters resolve through an authored fictional condition,
- progress UI exists only if the content has explicit authored `progressStages`,
- one genuinely sufficient plan may solve a simple encounter directly,
- dice determine uncertainty of an attempted action, not encounter duration.

This preserves durable state without asking the DM to manufacture filler beats.

## 8. Critical prerequisites are structurally valid but narratively disconnected
Observed in `CRYSTAL_MACHINE`: three required crystals could be three isolated `DEL` pickups with no clear fictional requirement reveal, setup or payoff.

Decision: Narrative Graph V1 + curated Storylet Matrix. Critical graph is validated before ambient content. Truth and player knowledge are separate. Initial reference mix: `SEARCH_SECRET`, `NPC_FAVOR`, `GUARDIAN`, followed by deliberate return/assembly.

## 9. Physical device finding: ready story gate felt cosmetic
Observed: hero with `GLASSNØKKEL` could tap a gate and both unlock + traverse; key looked unused.

Patch 10 initially changed this to open-first/traverse-second and explicit key consumption. Continued review found that even this still let the app choose the solution automatically. See finding 12.

## 10. Physical device finding: random puzzle can be logically valid but fictionally irrelevant
Observed example: `DEN HVISKENDE VEGGEN` + unrelated-looking `STEINTRINNENE` puzzle.

Patch 10 improved the narrator presentation, but patch 13 identifies the deeper root cause: a generic `MYSTISK` encounter should not receive a random puzzle merely because the puzzle bank exists.

Current rule after patch 13:
- ambient random puzzles are opt-in, not automatic,
- a puzzle requires an authored contextual role,
- thinking/answering still needs no die,
- solving a puzzle does not automatically award a generic progress point,
- fiction decides whether the puzzle clue also resolves the whole mystery.

## 11. Story complication can arrive after its dramatic purpose is gone
Observed: `SKYGGEHEKSA`, meant to make the main task harder, could appear only after the task was already complete.

Decision for Narrative Graph V1:
- explicit phases `INTRO`, `QUEST_ACTIVE`, `RETURN`, `CLIMAX`, `AFTERMATH`,
- critical complications declare valid phases/expiry,
- a complication cannot first activate after the objective it exists to hinder is resolved,
- later reuse requires a separately authored role,
- ambient text referencing unfinished objectives must also be filtered after resolution.

## 12. Possessing the solution must not make the app choose the action
Continued physical-review judgement:
- patch 10 still auto-used `GLASSNØKKEL` when the locked door was tapped,
- desired interaction is: see lock -> think/propose -> choose item/action -> observe result.

Patch 11:
- keyed locked-door tap only says `DØREN ER LÅST`,
- no auto unlock/traverse/key consumption,
- scenario key remains protected but has explicit `BRUK`,
- matching key use opens but does not traverse,
- Forteller may give an open backpack hint if needed.

General rule: app presents obstacles and affordances before applying possessed solutions.

## 13. Player-facing rooms had two competing names
Observed: room name plus zone/area name made one physical place feel like two places.

Patch 12:
- room name is the single visible location identity,
- separate `OMRÅDE` identity removed,
- narrator/current-room/resume presentation uses room name,
- internal `zoneName` remains for deterministic generation/tone.

## 14. `ANNEN LØSNING` progress boxes had no fictional meaning
Observed during continued physical play with `REGNBUENETTET`:
- the card showed four empty boxes under `ANNEN LØSNING`,
- it was unclear whether Forteller was expected to invent four separate things the child had to do,
- the net did not actually prevent travel,
- completing the track gave no meaningful reward or world-state change,
- therefore the encounter could be ignored with no consequence and “solving” it had no payoff.

This exposed a system-level flaw, not a wording issue. The 3/4-box model was a generic duration mechanic added before each encounter's dramatic function had been authored.

### Patch 13 - encounter purpose contract
`patches/v0.12.3_playtest_encounter_purpose_contract_ux5a.patch` changes the model:
- every generated non-treasure encounter declares `purpose`, `stakes`, `resolvedWhen` and `payoff`,
- generic `ANNEN LØSNING` 3/4 boxes are removed,
- a progress track is rendered only when authored `progressStages` exist,
- narrator mode explicitly answers `HVA ER GREIA?`, `NÅR ER DET LØST?`, `HVA ENDRES DA?`,
- narrator guidance explicitly says not to invent filler steps,
- traps are actual forward obstacles while active,
- retreat to the previous room stays possible,
- resolving the trap removes it and actually frees the route,
- resolve-button text reflects the scene role (`HINDRINGEN ER LØST`, `MYSTERIET ER LØST`, `LØST UTEN KAMP`, etc.),
- ambient `MYSTISK` puzzles are no longer attached randomly.

### `REGNBUENETTET` reference behavior
The intended physical flow now is:
1. party enters the room and sees the net,
2. route onward is genuinely blocked,
3. retreat remains possible,
4. child proposes how to get through/free themselves/make the trap safe,
5. use physical die only if that particular attempt is uncertain,
6. one sufficiently good plan may solve the obstacle; there is no requirement to invent four sub-actions,
7. Forteller presses `HINDRINGEN ER LØST` only when the fiction satisfies the solve condition,
8. the trap disappears and the onward route becomes available.

This is the desired depth: every encounter must have a reason to exist and resolution must cause an observable change.

## Verification after finding 14
Patch-13 reconstructed runtime automated evidence:
- encounter-purpose QA: **4337 / 0**,
- single-location QA: **19 / 0**,
- targeted device QA: **27 / 0**,
- searchable-room/encounter QA: **2295 / 0**,
- Adventure Code: **405 / 0**,
- UX4 progression: **1797 / 0**,
- content regression: **5809 / 0**,
- 11 inline scripts: **0 syntax errors**.

Patch-13 runtime SHA-256:
`e00ba3c6f3ff1511be32e04e1de7f46ffc0404aa012e2b2600c05ace50fd3db8`

Patch-13 SHA-256:
`74499137374e50bbf0f9d6385e23073bd7e51e7744b3488f5ade085860f27437`

The purpose QA executes the actual `move()` implementation in a three-room harness and proves active trap -> forward blocked, retreat allowed, trap absent/resolved -> forward allowed.

Fresh browser certification remains open. Physical retest is required.

## Priority now
1. Physically retest patch-13 build, especially `REGNBUENETTET` as a real obstacle with retreat + payoff.
2. Judge whether narrator purpose/solve/payoff guidance is immediately understandable without knowing the implementation model.
3. Continue remaining UX5A device smoke.
4. Run fresh browser interaction QA when the local Chromium harness is usable.
5. If physical gate is green, record evidence and merge UX5A to `main`.
6. Create real `narrative/story-graph-v1` from merged `main` and start `WP-NG1`.
7. Do not start UX5B or add blueprints first.
