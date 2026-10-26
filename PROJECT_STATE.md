# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-26
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Active runtime branch: **`ux5/searchable-rooms-encounter-tracks`**
Current runtime work item: **UX5A patch 13 encounter-purpose follow-up + physical iPad/mobile retest before merge**
Next architecture work after green device gate: **Narrative Graph V1 + curated Storylet Matrix, starting only with `CRYSTAL_MACHINE`**
Prep branch: `narrative/story-graph-v1-prep`

## Product direction now locked
Monsterhulen prioritizes a small number of coherent, memorable adventures over combinatorial volume.

The child proposes actions. The app presents problems, signals, constraints and affordances, but should not silently apply a possessed solution. A keyed story door stays locked when tapped even if the correct key is owned; the child deliberately chooses what to try.

A physical place has one clear visible identity: the room name. Zone/biome metadata may remain internal for generation/tone but may not compete as a second place name.

An encounter must have a **fictional purpose contract** before it earns mechanics. Generated non-treasure encounters must state:
- `purpose` - what role this scene serves,
- `stakes` - what is actually affected while it is unresolved,
- `resolvedWhen` - the fictional condition for resolution,
- `payoff` - what changes when it is resolved.

A progress track is allowed only when the encounter has authored `progressStages`. Empty 3/4-box tracks may not be used as generic duration. The narrator must never be asked to invent filler actions merely to fill UI boxes.

Physical dice report uncertainty about an attempted action. A die result never substitutes for an unmet story prerequisite, automatically resolves a whole encounter or automatically removes a monster heart.

Critical story contract remains **SETUP -> SIGNAL -> ACTION -> PAYOFF**. Narrative Graph V1 will add explicit story beats, resources, prerequisites, player-knowledge state and dramatic timing.

## Active UX5A patch chain
Canonical order: `patches/README.md`.

Latest layers:
- patches 6-9: searchable rooms + encounter state,
- patch 10: first device findings,
- patch 11: explicit story-key use,
- patch 12: single visible location identity,
- patch 13: `v0.12.3_playtest_encounter_purpose_contract_ux5a.patch`.

### Patch 11 - explicit key use
- keyed door tap only establishes `DØREN ER LÅST`,
- no automatic key use/unlock/traversal,
- protected scenario key exposes explicit `BRUK`,
- matching adjacent key use opens/removes key but does not traverse,
- later door tap traverses.

### Patch 12 - one visible place name
- room name is the single visible location identity,
- separate `OMRÅDE` identity is removed from normal player/narrator location presentation,
- internal zone metadata remains intact.

### Patch 13 - encounter purpose contract
Physical review of `REGNBUENETTET` exposed that the generic `ANNEN LØSNING` 3/4-box track had no authored meaning. The DM could reasonably interpret it as “invent four things”, and resolving the track changed nothing in the world.

Patch 13 therefore:
- removes generic ambient 3/4-box progress,
- renders progress only for encounters with authored `progressStages`,
- adds purpose/stakes/solve/payoff guidance to narrator mode,
- makes generated traps real forward obstacles while active,
- preserves retreat to the room the party came from,
- restores forward movement when the trap is resolved,
- gives purpose-specific resolution actions such as `HINDRINGEN ER LØST`,
- makes ambient `MYSTISK` puzzles opt-in instead of automatically attaching a random puzzle,
- makes solving a puzzle a clue-state action rather than an automatic generic `+1 FREMGANG`.

`REGNBUENETTET` is now the reference example: it blocks the route onward, does not prevent retreat, one credible plan may solve it, and resolution explicitly frees the route. No four invented sub-actions are required.

## UX5A verification after patch 13
Automated evidence against reconstructed patch-13 runtime:
- encounter-purpose QA: **4337 PASS / 0 FAIL**,
- single-location QA: **19 / 0**,
- targeted device QA: **27 / 0**,
- searchable-room/encounter QA: **2295 / 0**,
- Adventure Code: **405 / 0**,
- UX4 progression: **1797 / 0**,
- combined content regression: **5809 / 0**,
- 11 inline scripts: **0 syntax errors**.

Patch-13 behavioral reconstruction SHA-256:
`e00ba3c6f3ff1511be32e04e1de7f46ffc0404aa012e2b2600c05ace50fd3db8`

Patch-13 SHA-256:
`74499137374e50bbf0f9d6385e23073bd7e51e7744b3488f5ade085860f27437`

The content-regression pass count is lower than patch 12 intentionally because random ambient mystery puzzles were removed; fewer generated-puzzle assertions execute. These hashes are behavioral reconstruction artifacts, not byte-identical release-baseline claims.

Browser distinction:
- broad pre-patch-11 Chromium: **23 / 0**,
- patch-10 focused Chromium: **15 / 0**,
- these are historical only,
- fresh current-browser QA remains pending because the local harness hit a browser/localStorage failure before interaction QA,
- patch 13 is **not browser-certified yet**.

## Physical UX5A gate now
At minimum verify on target device:
1. `REGNBUENETTET` has no generic four-box `ANNEN LØSNING` track,
2. narrator can immediately understand `HVA ER GREIA?`, `NÅR ER DET LØST?` and `HVA ENDRES DA?`,
3. an active net/trap blocks travel onward but allows retreat,
4. child proposes a solution; one genuinely sufficient plan may solve it,
5. after `HINDRINGEN ER LØST`, the trap disappears and route onward is actually available,
6. newly generated ambient `MYSTISK` scenes do not receive unrelated random puzzles,
7. each room has one clear visible location name,
8. `GLASS_HEART` explicit-key flow remains natural,
9. search/full-backpack/combat/device ergonomics remain green.

Do not merge UX5A until this physical gate is green.

## Narrative architecture finding
`CRYSTAL_MACHINE` exposed causal weakness in critical content; `SKYGGEHEKSA` exposed temporal invalidity; `REGNBUENETTET` exposed the same principle at encounter scale: a scene can be structurally present and mechanically interactive while still having no meaningful role or payoff.

Narrative Graph V1 therefore requires not only dependencies and phases but explicit purpose/stakes/resolution/payoff semantics for storylets and encounter-like nodes. Mechanics must follow authored fictional state, not create arbitrary work for the narrator.

## CRYSTAL_MACHINE reference experiment
Target:
`SETUP -> QUEST_REVEAL -> three parallel acquisitions -> RETURN -> ASSEMBLE -> GATE -> CLIMAX`

Reference acquisition diversity:
- `SEARCH_SECRET`,
- `NPC_FAVOR`,
- `GUARDIAN`.

The machine/gate must reveal the three colored missing sockets before UI assumes the child knows what to seek. Return/assembly must be deliberate, not automatic inventory completion.

Do not convert another blueprint until Narrative Graph passes structural/browser/manual editorial gates.

## UX5B is deferred
UX5B is **not** next. After Narrative Graph V1 is proven, UX5B should consume explicit graph state rather than infer story logic from loose room events.

## Repository health
Repository-health remains open. Complete runtime/source/assets are not yet directly reconstructable byte-identically from ordinary repo files. Library-materialized source is behaviorally useful but not byte-proven identical to the V0.12.3 manifest baseline.

## Do not regress
- Child proposes actions; app does not silently choose an obvious solution.
- One physical location has one visible canonical name.
- Every encounter mechanic has an authored fictional purpose.
- No generic progress count without authored stages.
- Resolving an obstacle changes the world in a way the player can perceive/use.
- Ambient puzzles require an authored contextual role; do not attach them randomly.
- No digital die roller.
- Relevant `EKSTRA GOD PÅ` is the only source of 2D6.
- Items/friends/pets are affordances, not numeric bonuses.
- Stable IDs and save compatibility remain important.
- Story quality beats procedural quantity.
- Finale gates are story prerequisites, not dice difficulty checks.
- Secret paths never bypass story-critical progression.
- Optional room finds never become hidden mandatory keys.
- A lucky die result never auto-finishes a whole encounter.

## Exact next action
Stay on UX5A while physical testing is open:
- physically retest patch-13 build, especially `REGNBUENETTET` block/retreat/resolve/payoff semantics,
- continue remaining device smoke,
- run fresh browser QA when the Chromium harness is usable,
- record/fix any new UX5A findings on `ux5/searchable-rooms-encounter-tracks`,
- keep Narrative Graph runtime blocked; prep branch remains documentation-only.

When user reports UX5A physical GREEN:
1. record physical evidence,
2. rerun/confirm relevant regressions after final runtime patch,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1` from merged `main`,
6. carry approved prep docs onto it,
7. begin `WP-NG1` graph data model + validator.

Do not start UX5B first.
