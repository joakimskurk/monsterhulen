# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-26
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Active runtime branch: **`ux5/searchable-rooms-encounter-tracks`**
Current runtime work item: **UX5A patch 11 explicit story-key flow + fresh browser/physical retest before merge**
Next architecture work after green device gate: **Narrative Graph V1 + curated Storylet Matrix, starting only with `CRYSTAL_MACHINE`**
Prep branch: `narrative/story-graph-v1-prep`

## Product direction now locked
Monsterhulen prioritizes a small number of coherent, memorable adventures over combinatorial volume.

The child proposes actions. The app presents problems, signals, constraints and affordances, but should not silently apply a possessed solution. For a keyed story door, tapping the lock only establishes that it is locked even when the correct key is in the backpack. The child must deliberately choose what to try. The narrator may give an open hint such as `KANSKJE DU HAR NOE I SEKKEN?` when needed.

Critical story contract: **SETUP -> SIGNAL -> ACTION -> PAYOFF**.

Adventure Blueprints remain the large-scale curated frame. Narrative Graph V1 will add explicit story beats, resources, prerequisites, player-knowledge state and dramatic timing. Humans curate Storylets and compatibility rules; the generator may choose and place only compatible Storylets.

Physical dice report uncertainty. A die result never substitutes for an unmet story prerequisite, automatically finishes a normal encounter, advances encounter progress or removes a monster heart.

## UX5A current runtime state
Latest runtime follow-up on `ux5/searchable-rooms-encounter-tracks`:
`patches/v0.12.3_playtest_explicit_story_key_use_ux5a.patch` (patch 11).

Patch 11 keyed-door contract:
- tapping the locked door only reports `DØREN ER LÅST`,
- no automatic key use/unlock/traversal,
- scenario key remains protected from disposal but exposes explicit `BRUK`,
- `BRUK` only opens an adjacent matching keyed story door,
- successful key use removes/archives the key with fiction feedback,
- key use opens but does not traverse,
- a later tap traverses.

This supersedes the patch-10 key interaction. Patch 10 puzzle changes remain active.

## UX5A verification after patch 11
Automated runtime:
- targeted device QA: **27 / 0**,
- searchable-room/encounter QA: **2216 / 0**,
- Adventure Code: **405 / 0**,
- UX4 progression: **1797 / 0**,
- combined content regression: **5960 / 0**,
- 11 inline scripts: **0 syntax errors**.

Fresh behavioral reconstruction SHA-256:
`038cee162e33290019b332957b15e42e1a79bdae8fe109010cc60deda5429710`

This is not a byte-identical release-baseline claim. Repository-health/provenance remains open.

Browser distinction:
- pre-patch-11 broad Chromium: **23 / 0**,
- patch-10 focused Chromium: **15 / 0**,
- patch 11 explicit-key interaction still needs fresh browser smoke,
- physical iPad/mobile retest still required.

Do not merge UX5A yet.

## Physical UX5A gate now
At minimum verify:
1. `GLASS_HEART` door does not auto-use `GLASSNØKKEL`,
2. child gets time to propose a solution,
3. key is protected but has explicit `BRUK`,
4. key use opens/removes key without moving hero,
5. later door tap traverses,
6. mystery puzzle narrator flow remains clear and solve gives exactly one progress,
7. rest of UX5A device smoke remains green.

## Narrative architecture finding
`CRYSTAL_MACHINE` showed the legacy collect planner can produce three safe but narratively disconnected pickups. `SKYGGEHEKSA` showed content can also be dramatically obsolete if first encountered after the objective it should hinder is complete.

Narrative Graph V1 therefore requires:
- explicit causal nodes/resources/prerequisites,
- truth separate from player knowledge,
- dramatic phases and expiry,
- critical graph before ambient content,
- optional UX5A finds never satisfying critical requirements,
- required hidden/search beats with clue + fail-forward,
- guardians with authored non-combat affordances.

## CRYSTAL_MACHINE reference experiment
Target:
`SETUP -> QUEST_REVEAL -> three parallel acquisitions -> RETURN -> ASSEMBLE -> GATE -> CLIMAX`

Default acquisition mix:
- `SEARCH_SECRET`,
- `NPC_FAVOR`,
- `GUARDIAN`.

The machine must reveal three colored missing sockets in fiction before UI assumes the child knows what to seek. Assembly must be deliberate, not automatic inventory completion.

Do not convert another blueprint until this experiment passes structural, browser and manual editorial gates.

## UX5B is deferred
UX5B is not next. After Narrative Graph V1 is proven, UX5B should consume the explicit graph instead of inferring story logic from loose room events.

## Repository health
Repository-health remains open. Complete runtime/source/assets are not yet directly reconstructable byte-identically from ordinary repo files.

## Exact next action
While physical UX5A playtest continues:
- fix UX5A defects only on `ux5/searchable-rooms-encounter-tracks`,
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
