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

Patch 11 exists because possessing a matching key must not make a locked door solve itself. Door tap presents the lock; child deliberately chooses `BRUK` on the story key.

## Automated evidence after patch 11 - GREEN
Executed against the fresh reconstructed patch-11 runtime:
- `tests/QA_DEVICE_FINDINGS_UX5A.js`: **27 PASS / 0 FAIL**
- `tests/QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js`: **2216 PASS / 0 FAIL**
- `tests/QA_ADVENTURE_CODE_V1.js`: **405 PASS / 0 FAIL**
- `tests/QA_PROGRESSION_GATES_UX4.js`: **1797 PASS / 0 FAIL**
- `tests/QA_CONTENT_REGRESSION.js`: **5960 PASS / 0 FAIL**
- 11 inline JavaScript blocks: **0 syntax errors**

Fresh patch-11 behavioral reconstruction SHA-256:
`038cee162e33290019b332957b15e42e1a79bdae8fe109010cc60deda5429710`

This hash is not a byte-identical release-baseline claim. Library text provenance remains repository-health debt.

### Targeted patch-11 QA covers
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
Before patch 11:
- broad Chromium UX5A smoke: **23 PASS / 0 FAIL**,
- patch-10 focused Chromium smoke: **15 PASS / 0 FAIL**.

The patch-10 key-door expectation (`first gate tap opens`) is now intentionally superseded. Therefore those results remain historical regression evidence but **do not certify the patch-11 explicit-key interaction**.

A fresh real-browser patch-11 interaction smoke is still required. In the current execution environment, local Chromium could not load the local test runtime and ended at `chrome-error://chromewebdata/`, so no new browser claim was recorded. This is a test-harness limitation, not evidence of an app failure.

## Required physical-device gate before UX5A merge
On actual iPad/mobile verify:
1. `GLASS_HEART` locked door remains locked when tapped even with `GLASSNØKKEL` owned,
2. app does not reveal the key as the answer,
3. child has space to propose a plan; narrator may optionally hint about the backpack,
4. `GLASSNØKKEL` is protected but has `BRUK`,
5. `BRUK` beside matching door opens and removes/archives key without moving hero,
6. later door tap traverses,
7. mystery puzzle help is immediately understandable and solve gives exactly one progress,
8. `SE DEG RUNDT` feels exploratory rather than mandatory,
9. 3-4 progress steps do not feel like excessive bookkeeping,
10. hidden-find fail-forward and full-backpack flow work by touch,
11. 3-heart normal / 4-heart `SPENNING` combat controls are comfortable,
12. final `+ FREMGANG`, final heart and `LØST MED GOD IDÉ` interaction costs are acceptable,
13. if possible, representative legacy active-combat save behaves correctly,
14. Adventure Code copy/paste flow still works.

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
