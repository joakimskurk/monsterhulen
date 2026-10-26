# MONSTERHULEN - PLAYTEST FINDINGS

Updated: 2026-10-26
Status: active UX/story findings. UX5A physical device retest remains open. Narrative Graph V1 is next only after UX5A is physically green and merged.

## 1. Encounters are too ambiguous for the DM
Observed:
- consequences can look mandatory rather than suggestions,
- child actions may not match generated options,
- items can feel consumed when they should remain narratively available,
- novice DM may not understand a figure's role or when dice are relevant.

Implemented:
- `FRITT KAST`,
- ordinary `BRUK` does not consume items,
- beginner narrator guidance,
- six physical D6 faces record exact die input.

Still open: eventual narrator mode should use actual graph/map-supported context. This is deferred until Narrative Graph V1 is proven.

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

## 7. Encounters need durable state, not one-roll victories
UX5A:
- normal monsters 3 hearts, `SPENNING` 4,
- generated non-treasure encounters 3 progress steps, `SPENNING` 4,
- dice never auto-change hearts/progress,
- narrator marks `+ FREMGANG`,
- combat begins only if child chooses combat,
- `LØST MED GOD IDÉ` supports genuinely decisive free-form solutions.

Manual question remains whether 3-4 steps feel satisfying rather than bookkeeping.

## 8. Critical prerequisites are structurally valid but narratively disconnected
Observed in `CRYSTAL_MACHINE`: three required crystals could be three isolated `DEL` pickups with no clear fictional requirement reveal, setup or payoff.

Root cause: legacy `planCollect()` safely chooses reachable critical rooms, then ambient generation skips those rooms. The architecture therefore has no controlled mechanism to make the critical parts one search story, one NPC favor and one guardian story.

Decision: Narrative Graph V1 + curated Storylet Matrix. Critical graph is validated before ambient content. Truth and player knowledge are separate. Initial reference mix: `SEARCH_SECRET`, `NPC_FAVOR`, `GUARDIAN`, followed by deliberate return/assembly.

## 9. Physical device finding: ready story gate felt cosmetic
Observed: hero with `GLASSNØKKEL` could tap a gate and both unlock + traverse; key looked unused.

Patch 10 initially changed this to open-first/traverse-second and explicit key consumption. Continued review found that even this still let the app choose the solution automatically. See finding 12.

## 10. Physical device finding: puzzle can be logical but fictionally unclear
Observed example: `DEN HVISKENDE VEGGEN` + unrelated-looking `STEINTRINNENE` puzzle.

Patch 10:
- puzzle framed as a clue from current mystery,
- `FORTELLERHJELP`, hint and narrator-only answer,
- no die for the puzzle itself,
- `PUZZLET ER LØST` gives exactly +1 progress,
- free-form/direct solutions remain valid.

Physical retest pending.

## 11. Story complication can arrive after its dramatic purpose is gone
Observed: `SKYGGEHEKSA`, meant to make the main task harder, could appear only after the task was already complete.

Decision for Narrative Graph V1:
- explicit phases `INTRO`, `QUEST_ACTIVE`, `RETURN`, `CLIMAX`, `AFTERMATH`,
- critical complications declare valid phases/expiry,
- a complication cannot first activate after the objective it exists to hinder is resolved,
- later reuse of the same character requires a separately authored climax/aftermath role,
- ambient text referencing unfinished objectives must also be filtered after resolution.

## 12. Possessing the solution must not make the app choose the action
Continued physical-review judgement:
- patch 10 still auto-used `GLASSNØKKEL` when the locked door was tapped,
- this removes a valuable child decision,
- desired interaction is: see lock -> think/propose -> choose item/action -> observe result.

This is a child-agency/product-principle issue, not cosmetic copy.

Patch 11 on `ux5/searchable-rooms-encounter-tracks`:
- keyed locked-door tap only says `DØREN ER LÅST`,
- it does not unlock, traverse or consume the key,
- the app does not identify the key as the answer,
- scenario key remains protected but has explicit `BRUK`,
- using the matching key beside the door opens it and removes/archives it with fiction feedback,
- key use does not traverse,
- later door tap traverses,
- Forteller may optionally say `KANSKJE DU HAR NOE I SEKKEN?` without naming a closed solution.

This generalizes beyond keys: the app should present obstacles and affordances before applying possessed solutions. Child suggestions remain primary even when the authored prerequisite is hard.

## Verification after finding 12
Patch-11 reconstructed runtime automated evidence:
- targeted device QA: **27 / 0**,
- UX5A search/encounter: **2216 / 0**,
- Adventure Code: **405 / 0**,
- UX4 progression: **1797 / 0**,
- content regression: **5960 / 0**,
- 11 inline scripts: **0 syntax errors**.

Fresh behavioral reconstruction SHA-256:
`038cee162e33290019b332957b15e42e1a79bdae8fe109010cc60deda5429710`

Patch 10 Chromium 15/0 remains historical evidence only; patch 11 needs fresh browser interaction QA. Physical retest remains required.

## Priority now
1. Browser-test patch 11 when a usable real-browser harness is available.
2. Physically retest explicit key flow + puzzle flow + full UX5A device smoke.
3. If green, record evidence and merge UX5A to `main`.
4. Create real `narrative/story-graph-v1` from merged `main` and start `WP-NG1`.
5. Do not start UX5B first.
6. Do not add more blueprints yet.
