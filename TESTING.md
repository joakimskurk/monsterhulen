# MONSTERHULEN - TESTING

## Verification levels
Never conflate these states:
- implemented
- static/source verified
- automated runtime tests passed
- browser tested
- physical device tested
- editorial/manual narrative quality accepted

A future Narrative Graph can be structurally perfect and still fail the last category.

## Historical V0.12.3 release evidence
- Lasting thing 67 / 0
- Treasure 121 / 0
- Puzzle 4665 / 0
- NPC 4935 / 0
- Friend 4104 / 0
- Pet 6069 / 0
- Rescue 5070 / 0
- 11 inline JavaScript blocks, 0 syntax errors

## Active UX5A patch chain
Canonical order: `patches/README.md`.

Latest additions:
- patch 10: `v0.12.3_playtest_device_findings_hotfix_ux5a.patch`
- patch 11: `v0.12.3_playtest_explicit_story_key_use_ux5a.patch`
- patch 12: `v0.12.3_playtest_single_location_name_ux5a.patch`

Patch 11 exists because possessing a matching key must not make a locked door solve itself. Patch 12 exists because room name + zone name looked like two competing names for one physical place.

## Automated evidence after patch 12 - GREEN
Executed against the reconstructed patch-12 runtime:
- `tests/QA_SINGLE_LOCATION_NAME_UX5A.js`: **19 PASS / 0 FAIL**
- `tests/QA_DEVICE_FINDINGS_UX5A.js`: **27 PASS / 0 FAIL**
- `tests/QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js`: **2216 PASS / 0 FAIL**
- `tests/QA_ADVENTURE_CODE_V1.js`: **405 PASS / 0 FAIL**
- `tests/QA_PROGRESSION_GATES_UX4.js`: **1797 PASS / 0 FAIL**
- `tests/QA_CONTENT_REGRESSION.js`: **5960 PASS / 0 FAIL**
- 11 inline JavaScript blocks: **0 syntax errors**

Patch-12 behavioral reconstruction SHA-256:
`79bea4f4b608c34ac6189aec6fcadbcd09978814625e94dc74e3654a58d9cd42`

Patch-12 patch SHA-256:
`0cd1e2b43f9e1add7d53bf188ed9688ca0694be4d45b35dda941fb3c18ca7f58`

These hashes are reconstruction artifacts, not byte-identical release-baseline claims. Library text provenance remains repository-health debt.

### Patch-12 QA covers
- no second `OMRÅDE` location badge in player room banner,
- render metadata does not expose zone as a second place name,
- public continue/resume summary uses room name only,
- current narrator location heading uses room name,
- full narrator room list no longer presents zone name as a competing identity,
- internal zone metadata remains intact and still contributes to deterministic generation.

### Targeted patch-11 QA still covers
- keyed locked door tap has a dedicated non-solving branch,
- door tap only reports `DØREN ER LÅST`,
- first lock log does not name the key solution,
- door tap does not remove key from inventory,
- scenario key remains protected but exposes explicit `BRUK`,
- explicit key use requires an adjacent matching keyed locked connection,
- successful key use removes key with fiction feedback,
- successful key use opens but does not traverse,
- child/narrator can still use ordinary inventory items narratively,
- narrator has optional open hint `KANSKJE DU HAR NOE I SEKKEN?`,
- puzzle `FORTELLERHJELP`, no-die guidance and exactly +1 progress remain intact.

### Existing UX5A search/encounter QA covers
- generic investigation without pre-spoiling find rooms,
- deterministic 1/2/3 optional finds where eligible,
- critical-room exclusion,
- search persistence/fail-forward/full backpack,
- 3/4-heart monsters,
- 3/4-step progress tracks,
- legacy active combat not healed,
- dice cannot mutate hearts/progress,
- explicit progress/combat/direct-solution resolution,
- save schema remains 12.

## Browser evidence
Historical pre-patch-11 evidence:
- broad Chromium UX5A smoke: **23 PASS / 0 FAIL**,
- patch-10 focused Chromium smoke: **15 PASS / 0 FAIL**.

Those results do not certify patch 11 or patch 12 because their interaction/presentation expectations changed afterwards.

A fresh local Chromium attempt for the current build hit a browser/localStorage harness error before interaction QA could run. No fresh browser-green claim is made. This is a test-harness limitation, not evidence of an app failure.

## Required physical-device gate before UX5A merge
On actual iPad/mobile verify:
1. each room has one clear visible location name rather than room + area competing,
2. `GLASS_HEART` locked door remains locked when tapped even with `GLASSNØKKEL` owned,
3. app does not reveal the key as the answer,
4. child has space to propose a plan; narrator may optionally hint about the backpack,
5. `GLASSNØKKEL` is protected but has `BRUK`,
6. `BRUK` beside matching door opens and removes/archives key without moving hero,
7. later door tap traverses,
8. mystery puzzle help is immediately understandable and solve gives exactly one progress,
9. `SE DEG RUNDT` feels exploratory rather than mandatory,
10. 3-4 progress steps do not feel like excessive bookkeeping,
11. hidden-find fail-forward and full-backpack flow work by touch,
12. 3-heart normal / 4-heart `SPENNING` combat controls are comfortable,
13. final `+ FREMGANG`, final heart and `LØST MED GOD IDÉ` interaction costs are acceptable,
14. if possible, representative legacy active-combat save behaves correctly,
15. Adventure Code copy/paste flow still works.

Do not merge UX5A or implement Narrative Graph runtime until this gate is green.

## Narrative Graph V1 future verification contract
Canonical plan lives on `narrative/story-graph-v1-prep` in `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`.

It must separately prove:
- schema/static validity,
- causal/resource/knowledge/phase validator rejection cases,
- >=1000 generated `CRYSTAL_MACHINE` structural cases,
- real browser interaction,
- 10-20 manual editorial generated-adventure reviews,
- final accept/revise/abandon architecture gate.

Structural green never proves narrative quality.

## UX5B relationship
UX5B is deferred until Narrative Graph V1 is accepted. It should consume explicit graph/knowledge/resource state instead of inferring story logic from loose room events.

## Repository verification
Repository-health remains open. Before the next release checkpoint is called locked, the repository must reconstruct the full active source/assets/tests without chat or an external release ZIP.
