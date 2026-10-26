# START HERE - MONSTERHULEN

Updated: 2026-10-26
Branch: `narrative/story-graph-v1-prep`

## Important: this is a PREP branch
This branch exists so the next architecture change is documented while UX5A physical playtest is still running.

**Do not implement Narrative Graph runtime code from this branch yet.**

The active runtime branch is:
`ux5/searchable-rooms-encounter-tracks`

UX5A remains unmerged because physical iPad/mobile playtest is not green yet.

Latest UX5A runtime follow-ups:
- patch 11: explicit story-key use,
- patch 12: single visible location identity,
- patch 13: encounter purpose contract,
- patch 14: `patches/v0.12.3_playtest_explicit_improv_guidance_ux5a.patch`.

Patch 13 replaces generic non-combat duration with a durable purpose/stakes/resolution/payoff contract and authored-progress-only rule.

Patch 14 adds another durable distinction: **intentional narrator improvisation is allowed, but it must be explicitly declared in Forteller view.** If the app has no hidden answer for an ambient detail, narrator mode says so, tells Forteller what to invent, and gives boundaries. Improvisation may add atmosphere/optional hints/side discoveries but may not create new mandatory story state.

Patch 14 is automated-runtime green, but fresh browser interaction QA and physical device retest remain open.

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
Live playtest has exposed the same weakness at several scales:
- `CRYSTAL_MACHINE`: structurally valid critical pickups can still be causally weak,
- `SKYGGEHEKSA`: individually valid content can arrive after its dramatic purpose is gone,
- keyed door: system can know a solution and still wrongly take child's action away,
- room + zone labels: valid internal metadata can create confusing player identity,
- `REGNBUENETTET`: mechanically interactive encounter can have no meaningful obstacle, solve condition or payoff,
- `BOKA SOM SKRIVER TILBAKE`: intentionally open content can look like the app has a hidden answer unless narrator responsibility is explicitly declared.

The architecture lesson is consistent: **valid data is not enough; every critical/interactive beat needs an authored fictional function, observable consequence and an explicit boundary between tracked story logic and narrator creativity.**

The intended critical-story replacement remains Narrative Graph + curated Storylet Matrix:
- humans curate strong narrative modules and compatibility rules,
- generator chooses only compatible modules and places them on a procedural map,
- critical story causality is validated before ambient content,
- story beats have explicit timing/expiry,
- UI preserves child agency,
- storylet/encounter nodes declare purpose, stakes, resolution condition and payoff,
- progress is authored semantics, never default boxes,
- intentionally open narrator details are explicitly marked/scoped,
- critical prerequisites/completion/world effects are never delegated to untracked improvisation.

## Reference target
`CRYSTAL_MACHINE` is the first and only blueprint to convert initially.

Target:
1. machine/gate visibly reveals three colored missing sockets,
2. one crystal comes from a signalled hidden search,
3. one crystal comes from an NPC favor with a real map dependency,
4. one crystal is controlled by a guardian with non-combat possibilities,
5. child returns and deliberately places/activates crystals,
6. only then does gate/climax open.

## Dramatic timing rule
Narrative Graph V1 phases:
`INTRO -> QUEST_ACTIVE -> RETURN -> CLIMAX -> AFTERMATH`.

Story-critical nodes/storylets declare valid phases/activation/expiry where relevant. A beat whose purpose has expired cannot first surface later unless separately authored with a new role.

## Exact sequencing from here
### While UX5A physical test is still open
- patch UX5A defects only on `ux5/searchable-rooms-encounter-tracks`,
- keep Narrative Graph work documentation-only here,
- do not merge UX5A,
- do not start UX5B,
- do not implement Narrative Graph runtime.

Current device retest must include:
- `BOKA SOM SKRIVER TILBAKE` clearly tells Forteller that the missing message is intentional improvisation and not hidden app content,
- improvisation prompt is helpful and bounded without becoming a closed answer,
- `REGNBUENETTET`/trap has no generic 4-box track,
- narrator understands what encounter does, when solved and what changes,
- active trap blocks onward travel but permits retreat,
- resolving it actually frees route,
- ambient mysteries do not receive disconnected random puzzles,
- one visible room name remains clear,
- explicit key use remains child-driven,
- rest of UX5A smoke remains green.

### When user reports UX5A physical GREEN
1. record physical evidence in repo,
2. rerun/confirm relevant automated + browser regressions after final patch,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1` from merged `main`,
6. carry approved prep docs onto it,
7. begin `WP-NG1`.

### If physical UX5A is YELLOW/RED
Stay on UX5A. Fix, regress and physically retest. Narrative Graph runtime stays blocked.

## Critical architecture/product decisions
- Story quality beats combinatorial volume.
- Child proposes actions; app does not silently apply a possessed solution.
- One physical location has one visible canonical name.
- Every encounter/storylet mechanic needs fictional purpose, stakes, resolution condition and payoff.
- Progress tracks require authored meaningful stages; no generic duration boxes.
- Resolving an obstacle produces observable world-state change.
- Random puzzle attachment without contextual role is forbidden.
- Intentional narrator improvisation is explicitly labeled/scoped; missing story logic is not disguised as improv.
- Critical causal state cannot depend on untracked improvised facts.
- Critical nodes use `SETUP -> SIGNAL -> ACTION -> PAYOFF`.
- Critical beats have valid dramatic windows; obsolete complications expire.
- Truth and player knowledge are separate state.
- Generic UX5A optional finds never satisfy story-critical requirements.
- Required hidden content has clue + fail-forward.
- Guardians have at least one authored non-combat affordance.
- Physical dice report uncertainty and never substitute for unmet prerequisites.
- Free child solutions remain valid; authored approaches are not a closed answer list.
- If hybrid system still needs frequent narrator repair, prefer more hand-authored scenarios.

## Next runtime work after gate
`WP-NG1 - graph data model + validator`.

Do not jump to storylet volume, UI polish, UX5B, more blueprints or visual redesign before the graph validator and Crystal Machine experiment are complete.
