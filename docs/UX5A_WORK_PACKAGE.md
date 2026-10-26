# UX5A - Room investigation + encounter tracks

Status: **AUTOMATED RUNTIME + CHROMIUM VERIFIED; PHYSICAL RETEST PENDING AFTER DEVICE HOTFIX**
Branch: `ux5/searchable-rooms-encounter-tracks`
Baseline: V0.12.3 + active UX1-UX4 playtest patch chain.

## Goal
Make exploration and encounters stateful enough that play develops over several meaningful beats instead of one button or one lucky die result.

## Scope
1. Every room can be deliberately investigated without revealing beforehand whether an optional find exists there.
2. KORT/VANLIG/STORT target 1/2/3 deterministic curated optional finds in eligible rooms.
3. Empty-room investigation does not require a meaningless die roll.
4. If investigation reveals signs of a hidden find and finding it remains uncertain, use the same physical D6 input model as the rest of Monsterhulen. The app never rolls.
5. A low first hidden-find search gives a stronger in-fiction clue and keeps the find hidden; continued searching remains fail-forward and cannot softlock the optional find.
6. Room finds are optional affordances only. They may never be story prerequisites or hidden mandatory keys.
7. Ordinary monsters use 3 hearts, or 4 in `SPENNING`, once the child explicitly chooses combat.
8. Generated non-treasure encounters use a parallel 3-step progress track, or 4 in `SPENNING`.
9. Dice results never automatically remove monster hearts, advance the progress track, or complete an encounter. The narrator marks state after what actually happened in the fiction.
10. Filling the explicit progress track resolves the encounter; reducing explicit combat hearts to zero resolves combat.
11. A genuinely decisive free-form solution may end an encounter directly through `LØST MED GOD IDÉ`.
12. Legacy migration is idempotent and may not heal an already-started fight.
13. A ready locked story gate must have a distinct opening beat before traversal. A scenario key used on that gate leaves the backpack with explicit fiction feedback.
14. Generated mystery puzzles must tell a novice narrator what to read, where hint/fasit are, and what solving the puzzle changes. Solving the puzzle gives exactly one encounter-progress step.

## Out of scope for UX5A
The map-aware solution graph is UX5B. It will derive actual cross-room resources, items/NPCs/rooms/companions and attempted approaches for the current encounter after the physical UX5A device gate is green.

## Acceptance status
Automated/runtime/browser verified:
- all rooms expose the same initial investigation affordance,
- UI does not identify hidden-find rooms before investigation,
- deterministic hidden-find placement for the same reconstructed adventure,
- target 1/2/3 optional finds in KORT/VANLIG/STORT when enough eligible rooms exist,
- no hidden find overlaps start/finale/story-critical/ambient-treasure placement,
- physical D6 hidden-find UI only; no digital RNG,
- low first hidden-find result does not reveal the item,
- repeated low searching fail-forwards rather than permanently hiding the find,
- full backpack preserves a revealed room find,
- monster encounters have 3-4 hearts,
- generated non-treasure encounters have a 3-4-step non-combat track,
- encounter dice input changes only die/consequence state and never automatically changes hearts/progress,
- final explicit progress and final explicit combat heart each resolve through their own state path,
- `LØST MED GOD IDÉ` remains available for genuinely decisive solutions,
- active legacy combat does not regain hearts during migration,
- existing UX4 progression gates and secret-door rules remain unchanged,
- ready story gates open on the first tap without moving the hero through,
- used scenario keys leave inventory and are explained in the event log,
- the next tap traverses the opened gate,
- mystery puzzle cards expose narrator help, hint and answer,
- solving a mystery puzzle advances exactly one progress step.

Evidence before physical-device findings:
- UX5A QA: **2216 / 0**
- Adventure Code: **405 / 0**
- UX4 progression: **1797 / 0**
- combined content regression: **5960 / 0**
- 11 inline scripts: **0 syntax errors**
- Chromium interaction smoke: **23 / 0**

Device-findings hotfix evidence:
- `tests/QA_DEVICE_FINDINGS_UX5A.js`: **19 / 0**
- focused Chromium interaction smoke: **15 / 0**
- hotfixed runtime SHA-256: `fc1bf19ba8a95ccc25b7735a7da0cbc2f52187a37f0fdb357f043695377d72ca`
- details: `docs/UX5A_DEVICE_FINDINGS_2026-10-26.md`

## Implementation
UX5A is split into four ordered primary patches after UX4:
1. engine/migration,
2. narrator guidance,
3. investigation + encounter-card UI helpers,
4. render/state handlers.

A fifth UX5A hotfix patch follows those after physical-device findings:
5. locked-gate interaction + mystery-puzzle narrator clarity/progress.

`patches/README.md` is the canonical ordered patch list and verification note.

## Remaining acceptance gate
Physical iPad/mobile retesting must confirm:
- the corrected locked-door interaction feels explicit rather than cosmetic,
- a used scenario key leaving the backpack is understandable,
- mystery-puzzle narrator help makes the intended play obvious without requiring the DM to invent missing glue,
- `SE DEG RUNDT` feels like exploration rather than compulsory bookkeeping,
- 3-4 encounter steps feel satisfying for the target age,
- touch targets and layout work on the real device,
- hidden-find fail-forward and full-backpack behavior are understandable,
- 3-heart normal / 4-heart `SPENNING` combat is easy to operate.

Repository-health remains a parallel release blocker because the complete source/assets baseline is not yet directly reconstructable from ordinary repo files with byte-identical V0.12.3 provenance.

## Exact next action
Retest the two corrected interactions on physical iPad/mobile, then continue the rest of the UX5A device smoke. If green, merge UX5A to `main` and begin UX5B. Do not expand the blueprint bank yet.
