# UX5A runtime status

Status: **AUTOMATED RUNTIME + CHROMIUM BROWSER VERIFIED; PHYSICAL IPAD/MOBILE PLAYTEST PENDING.**
Branch: `ux5/searchable-rooms-encounter-tracks`.
Do not merge to `main` yet.

## Implemented
- all-room investigation without pre-spoiling hidden-find rooms,
- deterministic 1/2/3 optional hidden-find targets for KORT/VANLIG/STORT,
- physical-D6 hidden-find search with repeated-low fail-forward behavior,
- full-backpack preservation of revealed finds,
- 3-heart normal monsters and 4-heart `SPENNING` monsters after combat is chosen,
- 3/4-step non-combat progress tracks,
- explicit resolution from full progress, zero combat hearts, or `LØST MED GOD IDÉ`,
- encounter dice separated from heart/progress mutation,
- idempotent search-state re-enrichment,
- legacy migration that upgrades untouched monsters but does not heal an active old fight.

## Runtime reconstruction used for verification
The indexed Library `index.html` was successfully materialized as text. It already contained the first two playtest layers (map navigation + free-roll/inventory). Repo patches 3-9 were then applied sequentially to reconstruct the active UX5A runtime.

The historical Adventure Code and UX4 compressed patches were recovered directly from their Git blobs and decoded. Patch application completed without rejected hunks.

Reconstructed UX5A runtime SHA-256:
`289e8c4194217b723ee8595635e147647a5853e8bc990f2037716f566b2659ca`

Important provenance caveat: the Library text representation is not byte-identical to the original V0.12.3 release manifest hash, so repository-health / byte-level baseline provenance remains open. Behavioral regression nevertheless reproduces the historical UX4 evidence exactly.

## Automated verification now green
- `tests/QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js`: **2216 PASS / 0 FAIL**.
- `tests/QA_ADVENTURE_CODE_V1.js`: **405 PASS / 0 FAIL**.
- `tests/QA_PROGRESSION_GATES_UX4.js`: **1797 PASS / 0 FAIL**.
- `tests/QA_CONTENT_REGRESSION.js`: **5960 PASS / 0 FAIL**.
- 11 inline JavaScript blocks: **0 syntax errors**.

`QA_CONTENT_REGRESSION.js` is now a durable repo test covering character builds, puzzle catalogue, encounter banks, reward offers, entity resolution, all four blueprints across lengths/age bands, world/scenario/encounter/climax validation and companion placement.

## Chromium browser smoke
Headless Chromium executed the real app DOM using deterministic adventure seed `10` (`CRYSTAL_MACHINE`). Result: **23 PASS / 0 FAIL**.

Verified in-browser:
- generic investigation in an empty room,
- no hidden-item name leak before investigation,
- six physical D6 faces for hidden search,
- first low roll gives hint only,
- repeated low roll reveals the optional find,
- full backpack leaves the revealed find in the room,
- physical 6 records the exact face but changes neither HP nor encounter progress,
- full explicit `+ FREMGANG` resolves the encounter,
- `LØST MED GOD IDÉ` resolves through its own explicit path,
- `SPENNING` monster uses 4 hearts,
- final explicit heart removal resolves combat,
- manually added normal monster in a `PUSTEROM` uses 3 hearts and renders three hearts.

## Still required before merge / UX5B
- physical iPad/mobile smoke test for interaction cost and layout,
- manual judgement of whether `SE DEG RUNDT` feels exploratory rather than mandatory,
- manual judgement of whether 3-4 progress steps feel satisfying rather than bookkeeping,
- old-save migration smoke on a real browser/device if a representative legacy save is available,
- repository-health repair so full source/assets can be reconstructed directly from Git without Library/chat context.

## Exact next action
Run the UX5A candidate on iPad/mobile and record the manual findings. If that gate is green, merge UX5A to `main`, then begin UX5B map-aware narrator solution graph. Repository-health remains a parallel release blocker.
