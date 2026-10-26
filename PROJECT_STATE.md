# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-26
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Active runtime branch: **`ux5/searchable-rooms-encounter-tracks`**
Current runtime work item: **UX5A explicit-story-key follow-up + physical iPad/mobile retest before merge**
Next architecture work after green device gate: **Narrative Graph V1 + curated Storylet Matrix, starting only with `CRYSTAL_MACHINE`**
Prep branch: `narrative/story-graph-v1-prep`

## Product direction now locked
Monsterhulen prioritizes a small number of coherent, memorable adventures over combinatorial volume.

The child proposes actions. The app presents problems, signals, constraints and affordances, but should not silently apply a possessed solution. A keyed story door therefore stays locked when tapped even if the correct key is already in the backpack; the child must deliberately choose an action such as using the key. Forteller may give an open hint such as `KANSKJE DU HAR NOE I SEKKEN?` when needed.

A story is not considered strong merely because all required rooms/items exist and the finale is structurally gated. Critical beats must have understandable causal relationships in the fiction. New critical-story contract: **SETUP -> SIGNAL -> ACTION -> PAYOFF**.

Adventure Blueprints remain the large-scale curated frame. Narrative Graph V1 will add explicit story beats, resources, prerequisites, player-knowledge state and dramatic timing. Humans curate Storylets and compatibility rules; the generator may choose and place only compatible Storylets.

Physical dice report uncertainty. A die result never substitutes for an unmet story prerequisite, automatically finishes a normal encounter, advances encounter progress or removes a monster heart.

## Active UX5A patch chain
Canonical order: `patches/README.md`.

Latest layers:
- patches 6-9: UX5A searchable rooms + encounter state,
- patch 10: device findings hotfix for puzzle clarity and open-before-traverse gate behavior,
- patch 11: `v0.12.3_playtest_explicit_story_key_use_ux5a.patch`.

Patch 11 changes keyed story doors:
- tapping the door only establishes `DØREN ER LÅST`,
- no automatic key use, unlock or traversal,
- scenario key stays protected from disposal but exposes `BRUK`,
- `BRUK` only opens an adjacent matching keyed story door,
- successful key use removes/archives the key with fiction feedback,
- key use opens but does not traverse,
- a later door tap traverses.

This is deliberately different from non-key story gates, which may still open when their authored prerequisite has been explicitly satisfied.

## UX5A verification after patch 11
Fresh reconstructed patch-11 runtime automated evidence:
- targeted device QA: **27 PASS / 0 FAIL**,
- searchable-room/encounter QA: **2216 PASS / 0 FAIL**,
- Adventure Code: **405 PASS / 0 FAIL**,
- UX4 progression: **1797 PASS / 0 FAIL**,
- combined content regression: **5960 PASS / 0 FAIL**,
- 11 inline scripts: **0 syntax errors**.

Fresh patch-11 behavioral reconstruction SHA-256:
`038cee162e33290019b332957b15e42e1a79bdae8fe109010cc60deda5429710`

This is not a byte-identical release-baseline claim; repository-health/provenance remains open.

Browser distinction:
- patch 10 previously had targeted Chromium **15 / 0**,
- that key-door expectation is superseded by patch 11,
- a fresh real-browser smoke for the new explicit-key flow is still required,
- physical iPad/mobile retest is still required.

## Physical UX5A gate now
At minimum verify on target device:
1. `GLASS_HEART`: locked door does not auto-use `GLASSNØKKEL`,
2. child has space to propose what to do,
3. `GLASSNØKKEL` has protected explicit `BRUK`,
4. using it beside the door opens/removes key but does not move hero,
5. later tap traverses,
6. mystery puzzle narrator flow is understandable and `PUZZLET ER LØST` gives exactly one progress step,
7. rest of UX5A device smoke remains green.

Do not merge UX5A until this physical gate is green.

## Narrative architecture finding
`CRYSTAL_MACHINE` exposed a deeper architecture problem: the legacy collect planner safely places three required `DEL` events, but cannot reliably make them three causally meaningful mini-stories. A later playtest exposed the temporal form of the same problem when `SKYGGEHEKSA` could first appear after the objective she was supposed to hinder was already complete.

This is an architecture limitation, not text polish.

Narrative Graph V1 therefore requires:
- explicit causal nodes/resources/prerequisites,
- truth separate from player knowledge,
- dramatic phases and expiry,
- critical graph validated before ambient content,
- generic UX5A optional finds never satisfying critical requirements,
- required hidden/search beats with clue + fail-forward,
- guardians with authored non-combat affordances.

## CRYSTAL_MACHINE reference experiment
Initial target:
`SETUP -> QUEST_REVEAL -> three parallel acquisitions -> RETURN -> ASSEMBLE -> GATE -> CLIMAX`

Reference acquisition diversity:
- `SEARCH_SECRET`,
- `NPC_FAVOR`,
- `GUARDIAN`.

The machine/gate must reveal the three colored missing sockets in fiction before UI assumes the child knows what to seek. Return/assembly must be deliberate, not automatic inventory completion.

Do not convert another blueprint until the Narrative Graph experiment passes structural/browser/manual editorial gates.

## UX5B is deferred
UX5B is **not** next. After Narrative Graph V1 is proven, UX5B should consume the explicit graph so it can distinguish known/unknown facts, owned/discoverable resources, real dependencies and map-supported non-combat affordances.

## Repository health
Repository-health remains open. Complete runtime/source/assets are not yet directly reconstructable byte-identically from ordinary repo files. The Library-materialized source is behaviorally useful but is not byte-proven identical to the original V0.12.3 manifest baseline.

## Do not regress
- Child proposes actions; app does not silently choose the obvious solution.
- No digital die roller.
- Relevant `EKSTRA GOD PÅ` is the only source of 2D6.
- Items/friends/pets are affordances, not numeric bonuses.
- Stable IDs and save compatibility remain important.
- Story quality beats procedural quantity.
- Finale gates are story prerequisites, not dice difficulty checks.
- Secret paths never bypass story-critical progression.
- Optional room finds never become hidden mandatory keys.
- UI must not reveal optional finds before investigation.
- A lucky die result never auto-finishes a normal encounter.
- Critical story content may not degrade silently into a bare pickup.

## Exact next action
Stay on UX5A while physical testing is open:
- browser-test patch 11 when a usable real-browser harness is available,
- physically retest explicit key use + puzzle flow + remaining device smoke,
- record/fix any new UX5A findings on `ux5/searchable-rooms-encounter-tracks`,
- keep Narrative Graph work documentation-only on `narrative/story-graph-v1-prep`.

When user reports UX5A physical GREEN:
1. record physical evidence,
2. rerun/confirm relevant regressions after final runtime patch,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1` from merged `main`,
6. carry approved prep docs onto it,
7. begin `WP-NG1` graph data model + validator.

Do not start UX5B first.
