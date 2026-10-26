# UX5A — Room investigation + encounter tracks

Status: ACTIVE CANDIDATE — IMPLEMENTED ON BRANCH, RUNTIME QA PENDING
Branch: `ux5/searchable-rooms-encounter-tracks`
Baseline: V0.12.3 + active UX1–UX4 playtest patch chain.

## Goal
Make exploration and encounters stateful enough that play develops over several meaningful beats instead of one button or one lucky die result.

## Scope
1. Every room can be deliberately investigated without revealing beforehand whether an optional find exists there.
2. KORT/VANLIG/STORT target 2/3/4 deterministic curated optional finds in eligible rooms.
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
The map-aware solution graph is UX5B. It will derive actual cross-room resources, items/NPCs/rooms/companions and attempted approaches for the current encounter after UX5A is runtime-verified.

## Acceptance
- all rooms expose the same initial investigation affordance,
- UI does not identify hidden-find rooms before investigation,
- deterministic hidden-find placement for the same reconstructed adventure,
- at least 2 optional finds in KORT, 3 in VANLIG and 4 in STORT when enough eligible rooms exist,
- no hidden find overlaps start/finale/story-critical/ambient-treasure placement,
- physical D6 hidden-find UI only; no digital RNG,
- low first hidden-find result does not reveal the item,
- repeated low searching remains fail-forward rather than permanently hiding the find,
- full backpack preserves a revealed room find,
- monster encounters have 3–4 hearts,
- generated non-treasure encounters have a 3–4-step non-combat track,
- encounter dice input changes only die/consequence state and never automatically changes hearts/progress,
- final explicit progress and final explicit combat heart each resolve through their own state path,
- `LØST MED GOD IDÉ` remains available for genuinely decisive solutions,
- active legacy combat does not regain hearts during migration,
- existing UX4 progression gates and secret-door rules remain unchanged,
- new QA plus full existing regression pass before merge.

## Implementation
UX5A is split into four ordered patches after UX4:
1. engine/migration,
2. narrator guidance,
3. investigation + encounter-card UI helpers,
4. render/state handlers.

`patches/README.md` is the canonical ordered list.

## Current verification
Structural patch-chain verification passes on a realistic source reconstruction with GNU `patch` and `git diff --check`. Full canonical-runtime QA and browser/iPad verification are still pending.

## Exact next action
Reconstruct the canonical runtime as raw files, apply the full patch chain through UX5A, run `QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js` plus UX4/Adventure Code/full content regressions, then perform the manual iPad smoke test. Do not begin UX5B or merge to `main` until that gate is green.
