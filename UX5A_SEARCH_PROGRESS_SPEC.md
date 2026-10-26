# UX5A - SEARCHABLE ROOMS + ENCOUNTER STATE

Status: candidate authored 2026-10-26. Runtime QA pending.

## Goal
Add enough persistent state that exploration and encounters can develop over several meaningful actions without turning Monsterhulen into a rigid combat game.

## Room search contract
- The child may choose to investigate any room.
- The UI must not reveal which rooms contain hidden optional finds before investigation.
- A standard 13-room dungeon gets two deterministic hidden finds; short gets one, large gets three.
- Finds are drawn from the curated optional treasure bank.
- Start room, finale room, critical story rooms and rooms already containing ambient treasure cannot host a hidden room find.
- Hidden room finds are never added to `scenario.found` and never become progression requirements.
- If a room has no hidden find, investigation simply resolves with a small fictional observation; no pointless die roll is required.
- If a hidden find exists and discovery is uncertain, use the normal physical D6 faces.
- 1-2: fail forward with a stronger clue; the item stays hidden.
- 3-6: reveal the item.
- Revealing and collecting are separate states.
- A full inventory leaves the revealed item in the room.

## Encounter-state contract
- Fresh normal monsters have 3 hearts.
- Fresh `SPENNING` monsters have 4 hearts.
- Generated non-treasure encounters have 3 progress steps; `SPENNING` has 4.
- Physical dice only record uncertainty and proposed consequence.
- Dice do not mutate `progress`, remove an encounter or automatically mark it solved.
- `+ FREMGANG` is a narrator action used when the child's plan materially advances the situation.
- When progress reaches max, the encounter resolves.
- `LØST MED GOD IDÉ` is an explicit narrator judgment for a plan that naturally solves the whole encounter.
- Combat only starts when the child chooses combat.
- Explicit heart loss drives combat; zero hearts resolves the encounter.
- Non-combat remains available after combat starts if the child changes approach.

## Migration
State schema stays 12.
- Existing generated encounters receive progress fields lazily/through enrichment.
- An untouched legacy monster at its old full HP may upgrade to the new 3/4-heart default.
- A legacy fight that has already started or already lost HP must not regain hearts.

## UX boundary
UX5A deliberately does **not** implement the map-aware solution graph. Existing `itemHooks` and inventory matching remain the foundation for UX5B.

UX5B will surface:
- resources already possessed,
- useful resources/NPCs/rooms elsewhere on the actual map,
- relevant companion affordances,
- attempted approaches where useful,
while retaining `FRITT KAST` and open-ended child solutions.

## Verification gate
UX5A cannot be marked complete until:
- `tests/QA_SEARCH_PROGRESS_UX5A.js` passes on reconstructed runtime,
- Adventure Code and UX4 QA remain green,
- existing content regression remains green,
- inline scripts are syntax-clean,
- browser/iPad smoke test covers successful/failed search, full inventory, 3/4-heart combat, progress completion, direct smart resolution, and no one-roll auto victory.

Patch:
`patches/v0.12.3_playtest_search_progress_ux5a.patch.gz.b64`

SHA-256:
- uncompressed patch: `454c0d2f9114ea1029717b3a283fe8729a481b3721c287bf1207d86b7f02ae8f`
- encoded artifact: `a93972a2a99b2a37e6c52ded68160892cb585a8d798a520341452712ebd64e81`
