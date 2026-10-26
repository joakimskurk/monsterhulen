# START HERE - MONSTERHULEN

Updated: 2026-10-26
Branch: `narrative/story-graph-v1-prep`

## Important: this is a PREP branch
This branch exists so the next major architecture change is fully documented while UX5A physical playtest is still running.

**Do not implement Narrative Graph runtime code from this branch yet.**

The active runtime branch is still:
`ux5/searchable-rooms-encounter-tracks`

UX5A remains unmerged because physical iPad/mobile playtest is not green yet.

## Read in this order
1. `PROJECT_STATE.md`
2. `ROADMAP.md`
3. `DECISIONS.md`
4. `TESTING.md`
5. `PLAYTEST_FINDINGS.md`
6. `docs/NARRATIVE_GRAPH_V1.md`
7. `docs/STORYLET_MATRIX_V1.md`
8. `docs/CRYSTAL_MACHINE_REFERENCE_V1.md`
9. `docs/CRYSTAL_STORYLET_BANK_V1.md`
10. `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`
11. `docs/UX5A_DEVICE_FINDINGS_2026-10-26.md`

Repository is source of truth. Do not reconstruct architecture from old chat context if it conflicts with these files.

## Why the next plan changed
Live playtest of `CRYSTAL_MACHINE` showed that the current collect planner is structurally safe but narratively weak. It places three required parts into three reachable critical rooms. Critical rooms are excluded from ambient encounters, so the three parts become isolated pickups rather than connected mini-stories.

A later playtest exposed the temporal version of the same problem: `SKYGGEHEKSA`, whose dramatic purpose was to make an active objective harder, could still first appear after that objective had already been completed. Content can therefore be individually valid while still being dramatically obsolete.

The intended replacement is a hybrid Narrative Graph + curated Storylet Matrix:
- humans curate strong small narrative modules and compatibility rules,
- the generator chooses only compatible modules and places them on a procedural map,
- critical story causality is validated before ambient content is added,
- story beats also have explicit dramatic timing and may expire when their purpose is gone.

## Reference target
`CRYSTAL_MACHINE` is the first and only blueprint to convert initially.

Target structure:
1. machine/gate visibly reveals three colored missing sockets,
2. one crystal comes from a signalled hidden search,
3. one crystal comes from a small NPC favor with a real map dependency,
4. one crystal is controlled by a guardian with non-combat possibilities,
5. child returns and deliberately places/activates the three crystals,
6. only then does the gate/climax open.

The exact content may vary. The causal structure and quality bar may not.

## Dramatic timing rule
Narrative Graph V1 uses explicit dramatic phases:
`INTRO -> QUEST_ACTIVE -> RETURN -> CLIMAX -> AFTERMATH`.

Story-critical nodes/storylets may define `validPhases`, activation dependencies and expiry conditions.

Example:
- a complication whose purpose is to hinder crystal collection may be valid during `QUEST_ACTIVE`,
- it must expire when the crystal objective is completed/assembled,
- if the same antagonist appears later, that later appearance must be a separately authored `CLIMAX` or `AFTERMATH` beat with a new dramatic purpose.

The validator must reject stale critical complications that first activate after the objective they exist to obstruct is already resolved.

## Exact sequencing from here
### While UX5A physical test is still open
- collect playtest findings only,
- patch UX5A defects on `ux5/searchable-rooms-encounter-tracks`,
- keep Narrative Graph work documentation-only on this prep branch,
- do not merge UX5A,
- do not start UX5B,
- do not implement Narrative Graph runtime.

### When user reports UX5A physical GREEN
1. record physical evidence in repo,
2. rerun/confirm relevant automated + browser regressions after any final patch,
3. merge UX5A to `main`,
4. verify `main` head and docs,
5. create real branch `narrative/story-graph-v1` from merged `main`,
6. carry/merge the approved prep docs onto it,
7. begin `WP-NG1` exactly as defined in `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`.

### If physical UX5A is YELLOW/RED
Stay on UX5A. Fix, regress, and physically retest. Narrative Graph implementation remains blocked.

## Critical architecture decisions
- Story quality beats combinatorial volume.
- A smaller bank of coherent adventures with controlled variation is preferred to many disconnected combinations.
- Critical nodes use `SETUP -> SIGNAL -> ACTION -> PAYOFF`.
- Critical beats have valid dramatic time windows; obsolete complications expire.
- Truth and player knowledge are separate state.
- Generic UX5A optional finds never satisfy story-critical requirements.
- A required hidden object always has clue + fail-forward.
- A guardian always has at least one authored non-combat affordance.
- Three-part collect defaults to three different play families.
- Physical dice report uncertainty and never substitute for unmet story prerequisites.
- Free child solutions remain valid; authored approaches are not a closed answer list.
- If this hybrid system still needs frequent narrator repair in manual playtest, prefer a more hand-authored scenario bank rather than forcing procedural generation.

## Next runtime work after gate
`WP-NG1 - graph data model + validator`.

Do not jump directly to storylet content, UI polish, UX5B, more blueprints or visual redesign before the graph validator and Crystal Machine experiment are complete.