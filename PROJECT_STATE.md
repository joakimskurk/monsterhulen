# MONSTERHULEN - PROJECT STATE

Updated: 2026-10-26
Current baseline: **V0.12.3 Lasting Thing Identity Pass**
Last automated/browser-verified playtest layer: **UX5A searchable rooms + encounter state + device-findings hotfix**
Current runtime work item: **UX5A physical iPad/mobile hotfix retest before merge**
Next architecture work after green device gate: **Narrative Graph V1 + curated Storylet Matrix, starting only with CRYSTAL_MACHINE**
Prep branch: `narrative/story-graph-v1-prep`

## Product direction now locked
Monsterhulen prioritizes a small number of coherent, memorable adventures over combinatorial volume.

A story is not considered strong merely because all required rooms/items exist and the finale is structurally gated. Critical beats must have understandable causal relationships in the fiction.

New critical-story contract:
**SETUP -> SIGNAL -> ACTION -> PAYOFF**.

Adventure Blueprints remain the large-scale curated frame. Narrative Graph V1 will add explicit story beats, resources, prerequisites and player-knowledge state. Humans curate Storylets and compatibility rules; the generator may choose and place only compatible Storylets.

Physical dice report uncertainty. A die result never substitutes for an unmet story prerequisite, automatically finishes a normal encounter, advances encounter progress or removes a monster heart.

## Active runtime branch
`ux5/searchable-rooms-encounter-tracks`

Do not merge it yet. Physical target-device testing is still open after a live playtest hotfix.

The UX5A patch chain includes the earlier UX1-UX4 layers, the four UX5A layers and the device-findings hotfix. `patches/README.md` on the runtime branch is canonical for reconstruction.

## UX5A implemented
### Room investigation
- Every generated room gets the same initial investigation affordance so the UI does not reveal hidden-find rooms in advance.
- KORT/VANLIG/STORT target 1/2/3 deterministic optional finds when enough rooms are eligible.
- Optional finds never overlap story-critical rooms and never become story prerequisites.
- Hidden-find search uses physical D6 only when uncertainty remains.
- First low result strengthens the clue; repeated low searching fail-forwards.
- Full backpack preserves the revealed find in the room.

### Encounter state
- normal fresh monsters: 3 hearts,
- `SPENNING`: 4 hearts,
- generated non-treasure encounters: 3 progress steps, 4 in `SPENNING`,
- dice input records die/consequence state only,
- narrator explicitly marks progress,
- combat begins only if child chooses combat,
- `LØST MED GOD IDÉ` remains available for genuinely decisive free-form solutions.

### Device-findings hotfix
Live playtest found:
1. a ready story gate unlocked and traversed in one tap, making the lock feel cosmetic; used quest key also appeared unchanged in inventory,
2. a generic puzzle could be logically valid but fictionally disconnected and unclear for a novice narrator.

Hotfix now:
- first gate tap opens but does not traverse,
- used scenario key leaves inventory with explicit fiction log,
- second tap traverses,
- puzzle card contains Fortellerhjelp, hint/fasit and explicit `PUZZLET ER LØST`,
- solving the embedded puzzle advances exactly one encounter progress step.

Targeted verification:
- Node hotfix QA: **19 / 0**,
- Chromium hotfix interaction smoke: **15 / 0**.

Physical retest remains required.

## Existing broad verification evidence
Before the device hotfix:
- UX5A search/encounter QA: **2216 / 0**,
- Adventure Code: **405 / 0**,
- UX4 progression: **1797 / 0**,
- combined content regression: **5960 / 0**,
- 11 inline scripts: **0 syntax errors**,
- Chromium UX5A smoke: **23 / 0**.

## New playtest finding: story structure is still too loose
`CRYSTAL_MACHINE` exposed a deeper architecture problem.

Current planner behavior:
- chooses three reachable pre-gate rooms,
- places one required `DEL` event in each,
- marks those rooms critical,
- world/ambient generation then skips those critical rooms.

This is safe against softlocks and random overwrites, but it means required parts can become three isolated pickups. The current architecture cannot reliably produce a desired structure such as:
- one crystal hidden through signalled exploration,
- one crystal earned from an NPC favor,
- one crystal controlled by a guardian with several solution types.

This is now treated as an architecture limitation, not a text-polish issue.

## Narrative Graph V1 prep
Canonical prep docs on `narrative/story-graph-v1-prep`:
- `START_HERE.md`
- `docs/NARRATIVE_GRAPH_V1.md`
- `docs/STORYLET_MATRIX_V1.md`
- `docs/CRYSTAL_MACHINE_REFERENCE_V1.md`
- `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`

### Locked principles
- humans curate small Storylets and compatibility rules,
- generator combines only compatible Storylets,
- critical graph is validated before ambient content,
- truth and player knowledge are separate,
- generic UX5A optional finds never satisfy critical requirements,
- required hidden/search beats always have clue + fail-forward,
- guardians have at least one authored non-combat affordance,
- three-part collect defaults to three different play families,
- free child solutions remain valid,
- if this still needs frequent human repair in manual playtest, prefer more hand-authored full scenarios rather than forcing procedural generation.

## CRYSTAL_MACHINE is the reference experiment
Initial desired graph:

`SETUP -> QUEST_REVEAL -> three parallel acquisitions -> RETURN -> ASSEMBLE -> GATE -> CLIMAX`

Reference diversity:
- `SEARCH_SECRET`
- `NPC_FAVOR`
- `GUARDIAN`

The machine/gate must reveal the three colored missing sockets in fiction before the UI assumes the child knows what to search for. Return/assembly must be a deliberate story beat, not automatic inventory completion.

Do not convert another blueprint until at least 1000 generated structural cases pass and 10-20 generated Crystal Machine adventures have been manually judged for actual narrative quality.

## UX5B is deferred
The previous next package, map-aware solution graph, is no longer immediate next work.

After Narrative Graph V1 is proven, UX5B should consume the explicit graph so it can distinguish:
- known vs unknown facts,
- owned vs discoverable resources,
- actual NPC/guardian dependencies,
- map-supported non-combat affordances,
- attempted approaches.

This is more reliable than inferring story logic from loose room events after generation.

## Initial Adventure Blueprint bank
Only four remain active:
- `GLASS_HEART`
- `WITCH_CAT`
- `CRYSTAL_MACHINE`
- `ZOMBIE_DELIVERY`

Do not expand the bank.

## Repository reality
Repository-health remains open. The complete active runtime/source/assets baseline is not present as ordinary directly usable files on `main` and the Library-materialized V0.12.3 source is not byte-proven identical to the original manifest baseline.

Do not call the next release checkpoint locked until repository-health is closed.

## Do not regress
- Child proposes actions.
- No digital die roller.
- Relevant EKSTRA GOD PÅ is the only source of 2D6.
- Items/friends/pets are affordances, not numeric bonuses.
- Stable IDs and save compatibility remain important.
- Story quality beats procedural quantity.
- Finale gates are story prerequisites, not dice difficulty checks.
- Secret paths never bypass story-critical progression.
- Optional room finds never become hidden mandatory keys.
- The UI must not reveal optional find contents before investigation.
- A lucky physical die result never auto-finishes a normal encounter.
- Critical story content may not degrade silently into a bare pickup when a richer Storylet fails to fit.

## Exact next action
While physical UX5A playtest continues:
- record/fix UX5A defects only on `ux5/searchable-rooms-encounter-tracks`,
- keep Narrative Graph work documentation-only on `narrative/story-graph-v1-prep`.

When user reports UX5A physical GREEN:
1. record physical pass,
2. rerun relevant regressions if the runtime changed,
3. merge UX5A to `main`,
4. verify main,
5. create `narrative/story-graph-v1` from merged main,
6. carry approved prep docs over,
7. start `WP-NG1` graph data model + validator.

Do not start UX5B first.