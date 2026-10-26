# UX5A - Room investigation + encounter tracks

Status: **AUTOMATED RUNTIME + CHROMIUM VERIFIED; PHYSICAL DEVICE GATE PENDING**
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
- existing UX4 progression gates and secret-door rules remain unchanged.

Evidence:
- UX5A QA: **2216 / 0**
- Adventure Code: **405 / 0**
- UX4 progression: **1797 / 0**
- combined content regression: **5960 / 0**
- 11 inline scripts: **0 syntax errors**
- Chromium interaction smoke: **23 / 0**

## Implementation
UX5A is split into four ordered patches after UX4:
1. engine/migration,
2. narrator guidance,
3. investigation + encounter-card UI helpers,
4. render/state handlers.

`patches/README.md` is the canonical ordered list and verification note.

## Remaining acceptance gate
Physical iPad/mobile testing must confirm:
- `SE DEG RUNDT` feels like exploration rather than compulsory bookkeeping,
- 3-4 encounter steps feel satisfying for the target age,
- touch targets and layout work on the real device,
- hidden-find fail-forward and full-backpack behavior are understandable,
- 3-heart normal / 4-heart `SPENNING` combat is easy to operate.

Repository-health remains a parallel release blocker because the complete source/assets baseline is not yet directly reconstructable from ordinary repo files with byte-identical V0.12.3 provenance.

## Exact next action
Run the physical UX5A smoke on iPad/mobile and record findings. If green, merge UX5A to `main` and begin UX5B. Do not expand the blueprint bank yet.
