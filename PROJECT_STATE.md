# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-26
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Active runtime branch: **`ux5/searchable-rooms-encounter-tracks`**
Current runtime work item: **UX5A physical iPad/mobile retest after explicit-key + single-location follow-ups**
Next architecture work after green device gate: **Narrative Graph V1 + curated Storylet Matrix, starting only with `CRYSTAL_MACHINE`**
Prep branch: `narrative/story-graph-v1-prep`

## Product direction now locked
Monsterhulen prioritizes a small number of coherent, memorable adventures over combinatorial volume.

The child proposes actions. The app presents problems, signals, constraints and affordances, but should not silently apply a possessed solution. A keyed story door therefore stays locked when tapped even if the correct key is already in the backpack; the child must deliberately choose an action such as using the key. Forteller may give an open hint such as `KANSKJE DU HAR NOE I SEKKEN?` when needed.

A physical place should also have one clear visible identity. Generated zone/biome metadata may remain internal for generation and tone, but the player-facing location name is the room name. Do not show room name + zone name as two competing names for one location.

Critical story contract: **SETUP -> SIGNAL -> ACTION -> PAYOFF**. Narrative Graph V1 will add explicit story beats, resources, prerequisites, player-knowledge state and dramatic timing. Humans curate Storylets and compatibility rules; generator may choose/place only compatible Storylets.

Physical dice report uncertainty. A die result never substitutes for an unmet story prerequisite, automatically finishes a normal encounter, advances encounter progress or removes a monster heart.

## Active UX5A runtime state
Canonical patch order is on `ux5/searchable-rooms-encounter-tracks` in `patches/README.md`.

Latest layers:
- patch 10: device findings hotfix for puzzle clarity and gate behavior,
- patch 11: `v0.12.3_playtest_explicit_story_key_use_ux5a.patch`,
- patch 12: `v0.12.3_playtest_single_location_name_ux5a.patch`.

Patch 11:
- keyed door tap only establishes `DØREN ER LÅST`,
- no automatic key use/unlock/traversal,
- protected scenario key exposes explicit `BRUK`,
- matching adjacent key use opens/removes key but does not traverse,
- later door tap traverses.

Patch 12:
- room name is single visible location identity,
- separate `OMRÅDE` badge removed,
- public continue/resume text uses room name only,
- current narrator location uses room name,
- narrator room list no longer presents zone as second location name,
- internal zone metadata remains intact for deterministic generation/tone.

## UX5A verification after patch 12
Automated evidence:
- single-location-name QA: **19 PASS / 0 FAIL**,
- targeted device QA: **27 PASS / 0 FAIL**,
- searchable-room/encounter QA: **2216 PASS / 0 FAIL**,
- Adventure Code: **405 PASS / 0 FAIL**,
- UX4 progression: **1797 PASS / 0 FAIL**,
- combined content regression: **5960 PASS / 0 FAIL**,
- 11 inline scripts: **0 syntax errors**.

Patch-12 behavioral reconstruction SHA-256:
`79bea4f4b608c34ac6189aec6fcadbcd09978814625e94dc74e3654a58d9cd42`

Patch-12 patch SHA-256:
`0cd1e2b43f9e1add7d53bf188ed9688ca0694be4d45b35dda941fb3c18ca7f58`

These are behavioral reconstruction hashes, not byte-identical release-baseline claims. Repository-health/provenance remains open.

Browser distinction:
- broad pre-patch-11 Chromium: **23 / 0**,
- patch-10 focused Chromium: **15 / 0**,
- both are historical only for the current candidate,
- fresh local Chromium attempt for patch 12 hit a browser/localStorage harness error before current interaction QA could run,
- therefore patch 12 is **not browser-certified yet**.

## Physical UX5A gate now
At minimum verify:
1. each room has one clear visible location name,
2. `GLASS_HEART`: locked door does not auto-use `GLASSNØKKEL`,
3. child has space to propose what to do,
4. `GLASSNØKKEL` has protected explicit `BRUK`,
5. using it beside the door opens/removes key but does not move hero,
6. later tap traverses,
7. mystery puzzle narrator flow is understandable and `PUZZLET ER LØST` gives exactly one progress step,
8. rest of UX5A device smoke remains green.

Do not merge UX5A until this physical gate is green.

## Narrative architecture finding
`CRYSTAL_MACHINE` exposed a deeper architecture problem: legacy collect placement can produce three structurally valid but causally weak pickups. Later playtest exposed the temporal version when `SKYGGEHEKSA` could first appear after the objective she was meant to obstruct was already complete.

Narrative Graph V1 therefore requires:
- explicit causal nodes/resources/prerequisites,
- truth separate from player knowledge,
- dramatic phases and expiry,
- critical graph validated before ambient content,
- generic UX5A optional finds never satisfying critical requirements,
- required hidden/search beats with clue + fail-forward,
- guardians with authored non-combat affordances,
- possessing a resource must not be conflated with having deliberately performed the action that uses it.

## CRYSTAL_MACHINE reference experiment
Initial target:
`SETUP -> QUEST_REVEAL -> three parallel acquisitions -> RETURN -> ASSEMBLE -> GATE -> CLIMAX`

Reference acquisition diversity:
- `SEARCH_SECRET`,
- `NPC_FAVOR`,
- `GUARDIAN`.

The machine/gate must reveal three colored missing sockets in fiction before UI assumes the child knows what to seek. Return/assembly must be deliberate, not automatic inventory completion.

Do not convert another blueprint until Narrative Graph passes structural/browser/manual editorial gates.

## UX5B is deferred
UX5B is **not** next. After Narrative Graph V1 is proven, UX5B should consume explicit graph state rather than infer story logic from loose room events.

## Repository health
Repository-health remains open. Complete runtime/source/assets are not yet directly reconstructable byte-identically from ordinary repo files.

## Exact next action
While physical UX5A playtest continues:
- fix UX5A defects only on `ux5/searchable-rooms-encounter-tracks`,
- physically retest patch-12 build,
- keep Narrative Graph work documentation-only on this prep branch,
- do not merge UX5A,
- do not implement Narrative Graph runtime,
- do not start UX5B.

When user reports UX5A physical GREEN:
1. record physical pass,
2. rerun/confirm relevant regressions,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1` from merged `main`,
6. carry approved prep docs over,
7. start `WP-NG1` graph data model + validator.
