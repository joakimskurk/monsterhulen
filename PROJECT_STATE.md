# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-26
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Active runtime branch: **`ux5/searchable-rooms-encounter-tracks`**
Current runtime work item: **UX5A patch 14 explicit narrator-improvisation follow-up + physical iPad/mobile retest before merge**
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

**Improvisation is allowed and desirable when it is explicit.** If an ambient scene deliberately leaves a detail for Forteller to invent, narrator mode must say there is no hidden app answer or larger predetermined plan, say what to improvise, and give guardrails. Optional improvisation may add atmosphere, a side discovery or a non-critical hint. It may not silently create a new mandatory story prerequisite or contradict known app state.

**Encounter subject and narrative role are separate.** A recognizable subject such as `BOKA SOM SKRIVER TILBAKE` may support several different *authored compatible* roles across adventures: open mystery/improvisation, NPC-like conversation, tracked clue source, puzzle/gate carrier or item/reward wrapper. Compatible magical subjects such as a talking doll or living portrait can follow the same model. This is curated role reuse, not arbitrary random mixing. Critical roles remain tracked Storylets; subject identity and Storylet identity stay separate/stable; repetition of the same recognizable subject should be penalized when alternatives exist.

Physical dice report uncertainty about an attempted action. A die result never substitutes for an unmet story prerequisite, automatically resolves a whole encounter or automatically removes a monster heart.

Critical story contract remains **SETUP -> SIGNAL -> ACTION -> PAYOFF**. Narrative Graph V1 will add explicit story beats, resources, prerequisites, player-knowledge state and dramatic timing.

## Future platform capability recorded
`ROADMAP.md` now includes **MULTISCREEN / SHARED SESSION V1** as a future package, not current implementation work.

Locked direction for that future package:
- DM always starts the live session and owns the authoritative story/world state,
- player view can detach to another browser/screen,
- external player surface supports both touch-client and display-only modes,
- player iPad/other device can join the DM-hosted session over local Wi-Fi/LAN,
- client requests actions; DM host validates/applies them and broadcasts state,
- reconnect restores current state without replay/duplication,
- narrator-only information never leaks to player view,
- DM panel gets player-view preview/status,
- DM gets `ANGRE SISTE HANDLING`/action history based on reversible events or snapshots,
- undo immediately re-syncs corrected state to every connected player/display surface,
- save compatibility and stable IDs remain binding.

This future package must not jump ahead of UX5A or Narrative Graph V1. It should be implemented only after story/world-state transitions are explicit/stable enough to sync and reverse safely.

## Active UX5A patch chain
Canonical order: `patches/README.md`.

Latest layers:
- patches 6-9: searchable rooms + encounter state,
- patch 10: first device findings,
- patch 11: explicit story-key use,
- patch 12: single visible location identity,
- patch 13: `v0.12.3_playtest_encounter_purpose_contract_ux5a.patch`,
- patch 14: `v0.12.3_playtest_explicit_improv_guidance_ux5a.patch`.

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
Physical review of `REGNBUENETTET` exposed that the generic `ANNEN LØSNING` 3/4-box track had no authored meaning. Patch 13 removes generic ambient progress, renders progress only for authored `progressStages`, adds purpose/stakes/solve/payoff guidance, makes traps real forward obstacles with safe retreat, restores forward travel on resolution, and stops random ambient puzzles from being attached to generic `MYSTISK` scenes.

`REGNBUENETTET` is the reference example: it blocks the route onward, does not prevent retreat, one credible plan may solve it, and resolution explicitly frees the route.

### Patch 14 - explicit narrator improvisation
Physical review of `BOKA SOM SKRIVER TILBAKE` exposed a different ambiguity: the scene sounded as if the app knew a hidden message, but no message or larger plan existed. The desired fix is not to remove improvisation; Forteller is allowed to invent details, but the app must say when that is the contract.

Patch 14 therefore:
- marks open ambient mysteries as intentional narrator-improvisation scenes,
- carries a per-mystery `improvisePrompt`,
- shows narrator-only `FORTELLER-IMPROVISASJON`,
- explicitly says `INGEN SKJULT FASIT` and that no larger predetermined plan exists for that detail,
- tells Forteller what kind of detail may be invented,
- allows ties to already established adventure content,
- forbids improvised details from becoming new mandatory story keys or contradicting known state,
- leaves player-facing mystery fiction intact rather than exposing meta implementation detail to the child.

`BOKA SOM SKRIVER TILBAKE` is the reference case: Forteller invents what the repeated three words become, with no hidden app answer.

## UX5A verification after patch 14
Automated evidence against the reconstructed patch-14 runtime:
- explicit-improvisation QA: **20 PASS / 0 FAIL**,
- encounter-purpose QA: **4337 / 0**,
- authored-mysteries-only QA: **3075 / 0**,
- single-location QA: **19 / 0**,
- targeted device QA: **27 / 0**,
- searchable-room/encounter QA: **2328 / 0**,
- Adventure Code: **405 / 0**,
- UX4 progression: **1797 / 0**,
- combined content regression: **5830 / 0**,
- 11 inline scripts: **0 syntax errors**.

Patch-14 behavioral reconstruction SHA-256:
`7e9f9ba1d80aed2fe55865dbca860e2754d706b7cd89266dd2007d25fd4e0737`

Patch-14 SHA-256:
`123daf1a12fc4f6a38d5d3dc401b7403c21005263c32811e0c0eeac24877fd2c`

These hashes are behavioral reconstruction artifacts, not byte-identical release-baseline claims.

Browser distinction:
- broad pre-patch-11 Chromium: **23 / 0**,
- patch-10 focused Chromium: **15 / 0**,
- these are historical only,
- fresh current-browser QA remains pending because the local harness hit a browser/localStorage failure before interaction QA,
- patch 14 is **not browser-certified yet**.

## Physical UX5A gate now
At minimum verify on target device:
1. `BOKA SOM SKRIVER TILBAKE` narrator view makes it immediately clear that Forteller invents the missing message and there is no hidden larger plan,
2. the improv prompt is useful without becoming a closed answer,
3. improvised details feel optional and do not appear to create mandatory story state,
4. `REGNBUENETTET` has no generic four-box track and its obstacle/payoff behavior remains clear,
5. active trap blocks onward travel but allows retreat; resolution frees the route,
6. ambient `MYSTISK` scenes do not receive unrelated random puzzles,
7. each room has one clear visible location name,
8. `GLASS_HEART` explicit-key flow remains natural,
9. search/full-backpack/combat/device ergonomics remain green.

Do not merge UX5A until this physical gate is green.

## Narrative architecture finding
`CRYSTAL_MACHINE` exposed causal weakness in critical content; `SKYGGEHEKSA` exposed temporal invalidity; `REGNBUENETTET` exposed missing encounter purpose/payoff; `BOKA SOM SKRIVER TILBAKE` exposed both the need to distinguish deliberately open narrator improvisation from missing authored logic and the opportunity to separate a memorable subject from its narrative role.

Narrative Graph V1 therefore requires explicit purpose/stakes/resolution/payoff semantics, explicit authoring mode for intentionally improvised details, and subject/Storylet-role separation. Critical causal state, prerequisites and world effects may not depend on an untracked improvised fact or on an arbitrary presentation skin.

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
- Intentional narrator improvisation is explicitly labeled and scoped.
- Optional improvisation never creates hidden mandatory story state.
- Subject identity is distinct from Storylet role; reuse is curated, not arbitrary.
- Do not repeat a recognizable subject merely to inflate variation.
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
- physically retest the patch-14 build, especially narrator clarity for `BOKA SOM SKRIVER TILBAKE`,
- continue editorial review of current encounter subjects/roles before adding new bank volume,
- continue `REGNBUENETTET`, explicit-key, single-location and remaining device smoke,
- run fresh browser QA when the Chromium harness is usable,
- record/fix any new UX5A findings on `ux5/searchable-rooms-encounter-tracks`,
- keep Narrative Graph runtime blocked; prep branch remains documentation-only,
- do not start Multiscreen/Shared Session implementation yet.

When user reports UX5A physical GREEN:
1. record physical evidence,
2. rerun/confirm relevant regressions after final runtime patch,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1` from merged `main`,
6. carry approved prep docs onto it,
7. begin `WP-NG1` graph data model + validator.

Do not start UX5B first.
