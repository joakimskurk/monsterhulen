# MONSTERHULEN - CURRENT STATUS

DATO: 2026-10-26
STATUS: UX5A DEVICE HOTFIX RETEST PENDING + NARRATIVE GRAPH V1 PREPARED + REPOSITORY HEALTH ÅPEN

> `PROJECT_STATE.md` er kanonisk handoff. `START_HERE.md` på prep-branchen peker til riktig leserekkefølge.

## BASELINE
- Produkt: Monsterhulen
- Release-baseline: V0.12.3 Lasting Thing Identity Pass
- State schema: 12
- Storage: `monsterhulen_v120`
- Aktiv runtime-branch: `ux5/searchable-rooms-encounter-tracks`
- Prep-branch: `narrative/story-graph-v1-prep`
- UX5A er ikke merget til `main`.

## UX5A STATUS
Broad automated/browser verification before latest physical hotfix:
- UX5A search/encounter QA: **2216 / 0**
- Adventure Code: **405 / 0**
- UX4 progression/secret-door: **1797 / 0**
- content regression: **5960 / 0**
- 11 inline scripts: **0 syntax errors**
- Chromium UX5A smoke: **23 / 0**

Physical playtest found two concrete issues:
1. ready story gate unlocked + traversed in one tap and key looked unused,
2. embedded puzzle could be logical but fictionally disconnected/unclear for narrator.

Hotfix automated/browser verification:
- targeted Node: **19 / 0**
- targeted Chromium: **15 / 0**

Physical retest remains required before merge.

## NEW ARCHITECTURE FINDING
Live `CRYSTAL_MACHINE` playtest exposed that the current collect planner is narratively too loose:
- three required parts are placed as three critical `DEL` events,
- those critical rooms are deliberately skipped by ambient encounter generation,
- therefore the system cannot reliably create one hidden part, one NPC-favor part and one guardian part with coherent dependencies.

This is now treated as an architecture limitation, not a text polish issue.

## NEXT ARCHITECTURE
After UX5A physical green and merge to `main`, begin **Narrative Graph V1** before UX5B.

Reference first experiment: `CRYSTAL_MACHINE` only.

Target:
- visible reveal of three missing colored sockets,
- one `SEARCH_SECRET` crystal with clue + fail-forward,
- one `NPC_FAVOR` crystal with real reachable dependency,
- one `GUARDIAN` crystal with motive + non-combat route,
- return + deliberate assembly,
- gate/climax only after assembly.

Canonical prep docs:
- `docs/NARRATIVE_GRAPH_V1.md`
- `docs/STORYLET_MATRIX_V1.md`
- `docs/CRYSTAL_MACHINE_REFERENCE_V1.md`
- `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`

Old UX5B is deferred until this architecture is proven and should then consume the explicit story graph.

## GITHUB / REPOSITORY HEALTH
`joakimskurk/monsterhulen` remains permanent source of truth. Complete runtime/source/assets baseline is still not directly reconstructable byte-identically from ordinary repo files, so repository-health remains open before a future release checkpoint can be called locked.

## EXACT NEXT
While physical playtest continues:
- fix only UX5A runtime defects on `ux5/searchable-rooms-encounter-tracks`,
- keep Narrative Graph prep documentation-only.

When UX5A is physically green:
1. record pass and rerun relevant regressions if needed,
2. merge UX5A to `main`,
3. verify `main`,
4. create `narrative/story-graph-v1` from merged `main`,
5. bring approved prep docs over,
6. start `WP-NG1` graph data model + validator,
7. do not start UX5B first.
