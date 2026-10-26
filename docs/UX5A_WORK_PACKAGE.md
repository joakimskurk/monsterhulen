# UX5A — Searchable rooms + encounter tracks

Status: ACTIVE WORK PACKAGE
Branch: `ux5/searchable-rooms-encounter-tracks`
Baseline: V0.12.3 + active UX1–UX4 playtest patch chain.

## Goal
Make room exploration and encounters stateful enough that play develops over several meaningful beats instead of one button or one lucky die result.

## Scope
1. Searchable rooms with optional curated finds.
2. Search uses the same physical D6 input model as the rest of Monsterhulen. The app never rolls.
3. A low first search result gives a stronger in-fiction clue and keeps the find hidden; continued searching must remain fail-forward and cannot softlock the optional find.
4. Search finds are optional affordances only. They may never be story prerequisites or hidden mandatory keys.
5. Ordinary monsters use 3–4 hearts when the child explicitly chooses combat.
6. Non-combat handling gets a parallel 3–4-step progress track.
7. Dice results never automatically remove monster hearts, advance the progress track, or complete an encounter. The narrator marks state after what actually happened in the fiction.
8. A genuinely strong or obvious solution may still end an encounter directly via the existing narrator-controlled completion action.

## Out of scope for UX5A
The map-aware solution graph is UX5B. It will derive actual cross-room resources, items/NPCs/rooms and attempted approaches for the current encounter after UX5A is stable.

## Acceptance
- deterministic searchable-room placement for the same reconstructed adventure,
- at least 2 optional searchable finds in KORT, 3 in VANLIG and 4 in STORT when enough eligible rooms exist,
- no searchable find overlaps a story-critical room contract,
- physical D6 search UI only; no digital RNG,
- low first search result does not reveal the item,
- repeated low searching remains fail-forward rather than permanently hiding the find,
- monster encounters have 3–4 hearts,
- generated non-treasure encounters have a 3–4-step non-combat track,
- encounter dice input changes prose/result state only and never automatically changes hearts/progress,
- existing UX4 progression gates and secret-door rules remain unchanged,
- new QA plus full existing regression pass before merge.

## Exact next implementation step
Add the runtime patch and `QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js`, apply them after UX4, then run UX4 + Adventure Code + UX5A QA against the reconstructed playtest runtime.
