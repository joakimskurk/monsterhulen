# START HERE - MONSTERHULEN

Updated: 2026-10-27
Branch: `narrative/story-graph-v1-prep`

## IMPORTANT: PREP BRANCH ONLY
This branch documents the next architecture while UX5A physical playtest remains open.

**Do not implement Narrative Graph runtime here.**

Active runtime branch:
`ux5/searchable-rooms-encounter-tracks`

Current runtime candidate: **UX5A patch 15**.

UX5A is machine/browser green but still unmerged because physical iPad/mobile verification, native persistence and real clipboard/paste are not green yet.

`main` must remain untouched until UX5A gate is complete.

Repository is source of truth. Do not reconstruct current state from old chat if repo differs.

## Read in this order
1. `PROJECT_STATE.md`
2. `ROADMAP.md`
3. `DECISIONS.md`
4. `TESTING.md`
5. `PLAYTEST_FINDINGS.md`
6. `docs/ENCOUNTER_STORY_SYSTEM_PLAN_V1.md`
7. `docs/NARRATIVE_GRAPH_V1.md`
8. `docs/STORYLET_MATRIX_V1.md`
9. `docs/INTERACTION_SHELLS_V1.md`
10. `docs/CONTENT_REVIEW_HANDOFF_2026-10-26.md`
11. `docs/MONSTER_SUBJECT_REVIEW_V1.md`
12. `docs/PEOPLE_SUBJECT_REVIEW_V1.md`
13. `docs/FRIEND_SUBJECT_REVIEW_V1.md`
14. `docs/TRAP_SUBJECT_REVIEW_V1.md`
15. `docs/MYSTERY_SUBJECT_REVIEW_V1.md`
16. `docs/TREASURE_AFFORDANCE_REVIEW_V1.md`
17. `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`
18. `docs/CRYSTAL_MACHINE_REFERENCE_V1.md`
19. `docs/CRYSTAL_STORYLET_BANK_V1.md`
20. `docs/CRYSTAL_STORYLET_AUDIT_2026-10-27.md`
21. `docs/OPEN_SOURCE_SURVEY_2026-10-26.md`
22. runtime branch `docs/UX5A_GATE_REVIEW_2026-10-27.md`
23. runtime branch `docs/UX5A_BROWSER_QA_2026-10-27.md`

## Current runtime gate
Latest UX5A runtime layers:
- patch 11 explicit story-key use,
- patch 12 one visible location identity,
- patch 13 encounter purpose/world-effect contract,
- patch 14 explicit narrator-improvisation guidance,
- patch 15 removes remaining visible zone-name leak from room description.

Patch-15 machine evidence on runtime branch:
- 21/0 single-location,
- 20/0 improv,
- 5136/0 authored mysteries,
- 4337/0 encounter purpose,
- 27/0 device findings,
- 2328/0 search/encounter,
- 405/0 Adventure Code,
- 1797/0 UX4,
- 5830/0 content regression,
- 6844/0 focused patch-15 gate,
- 0 syntax errors across 11 inline scripts.

Fresh Chromium interaction smoke: **22/0**, with in-memory localStorage harness caveat.

Remaining merge gate:
- real iPad/mobile touch/usability/comprehension,
- native save/reload/resume,
- real Adventure Code copy/paste.

**Do not merge UX5A until physical gate is green.**

## Current architecture model

`SUBJECT -> STORYLET ROLE -> REQUIREMENTS + PROVIDERS -> PLAYER ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

Supporting layers:
- player knowledge/reveal,
- phases/expiry,
- interaction shell,
- typed validated state transitions,
- later action history/undo/shared-session sync.

### Subject != role
A recognizable subject may support several curated authored roles. No unrestricted random role assignment.

### Requirement != provider
Critical resource needs at least one reserved reachable validator-proven provider route before it is required.

Initial provider families:
- `ROOM_FIND`
- `MERCHANT_PURCHASE`
- `TRADE`
- `SOCIAL_BARGAIN`
- `NPC_REWARD`
- `PUZZLE_REWARD`
- `SEARCH_SECRET`
- explicit allowed starting/owned resource.

### Full-bank editorial constraints now locked
The complete existing MONSTERS/PEOPLE/FRIENDS/TRAPS/MYSTERIES/TREASURES banks are reviewed.

Key consequences now in `STORYLET_MATRIX_V1.md` and `DECISIONS.md`:
- provider truth is explicit graph binding, never noun/theme matching,
- incidental optional loot != planned critical provider,
- trade cannot consume the only still-required unique critical resource,
- knowledge reveal cannot create topology/truth,
- critical puzzles/mysteries need authored truth/rule/cause,
- ambient improv cannot carry critical state,
- phase/expiry applies to friendly clue/delivery content,
- MONSTER category does not imply combat,
- mechanic/solution family repetition is tracked separately from subject/role,
- repeated use of the same versatile prop is also repetition,
- item use/transfer/consumption/placement is explicit action.

Do **not** expand the content bank now.

## CRYSTAL_MACHINE remains the only pre-NG8 blueprint target
The nine initial Crystal Storylets have been audited and revised in-place.

Canonical bank:
`docs/CRYSTAL_STORYLET_BANK_V1.md`

Audit:
`docs/CRYSTAL_STORYLET_AUDIT_2026-10-27.md`

Important constraints:
- main three-color requirement is revealed before acquisition branches,
- three branches remain reachable in any order,
- generic UX5A loot cannot satisfy machine crystals accidentally,
- secondary favor dependencies are real graph nodes/features,
- Search Reflection + Light Slime is rejected in initial V1 due mechanic overlap,
- Search Light Crack + Light Slime gets strong repetition penalty,
- Light Slime and Trader Crab initial candidates use `combatAllowed=false`,
- Golem may allow optional DM-started combat but noncombat remains primary.

Controlled first manual baseline when runtime eventually reaches this stage:
- `CRYSTAL_SEARCH_CHIME`
- `CRYSTAL_NPC_OWL_PAGE`
- `CRYSTAL_GUARDIAN_LIGHT_SLIME`

This is not a new blueprint.

## Interaction-shell direction
Canonical spec: `docs/INTERACTION_SHELLS_V1.md`.

For machine slots:
1. story reveals sockets,
2. child taps target,
3. slots become visible,
4. owned crystals do not auto-fill,
5. child explicitly places,
6. wrong resource not consumed,
7. partial placement persists,
8. full placement either completes or enables authored activation,
9. world effect occurs,
10. later undo restores inventory + target atomically.

## Optional combat
Combat is Storylet-specific, never inferred from MONSTER category.

Child proposes; DM explicitly starts only when `combatAllowed=true`. Critical guardians retain non-combat route.

## Future multiscreen
Recorded only, not active. DM-hosted authoritative state; LAN-first player/display clients; typed actions; reconnect/idempotency; no narrator leakage; action history/undo foundation.

Adventure Code remains offline reconstruction, not live sync.

## Implementation sequence
### While UX5A is open
Allowed:
- patch UX5A defects on runtime branch,
- physical test patch 15,
- repo-health/provenance improvements that do not change gameplay,
- docs/spec refinement only.

Blocked:
- Narrative Graph runtime,
- full DM Control Surface runtime,
- UX5B,
- Multiscreen,
- new subjects/blueprints.

### When UX5A is physically GREEN
1. record physical evidence,
2. confirm final regressions,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1`,
6. carry approved prep docs,
7. start WP-NG1.

### Narrative Graph packages
- NG1 graph + provider + typed transition model/validator,
- NG2 small audited Storylet Matrix/provider engine,
- NG3 Crystal Machine planner,
- NG4 materialization + minimal semantic DM controls + required shells,
- NG5 >=1000 automated graph/state cases,
- NG6 browser/touch QA,
- NG7 10-20 manual editorial/family playtests,
- NG8 accept/revise/abandon.

Do not convert a second blueprint before NG8.

## Content review status
**Existing content-bank review is complete.**

There is no “next subject” now.

Do not expand the bank. Next content work after Narrative Graph is unblocked is to use the small audited Crystal bank and manually judge story quality.

## Stop condition
If procedural architecture needs growing special-case rules or frequent narrator repair, prefer more hand-authored scenario skeletons.

Story quality and child-led play outrank combinatorial volume.
