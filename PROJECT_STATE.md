# MONSTERHULEN - PROJECT STATE (VISUAL PREP)

Updated: 2026-10-27
Current branch: `visual/visual-system-v1-prep`
Status: **PARALLEL VISUAL PREP ONLY**
Runtime branch: `ux5/searchable-rooms-encounter-tracks`
Runtime baseline used for this branch: `b84ebe410679773e6833bf06fcd75bca449a5b89`
Architecture prep branch: `narrative/story-graph-v1-prep`

## Runtime gate is unchanged
UX5A patch 15 is still waiting for physical iPad/mobile certification.

Exact tested patch-15 candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Do not merge visual work into active runtime or `main` before that gate is green.

Do not implement Narrative Graph runtime, UX5B or Multiscreen from this branch.

## Why this branch exists
Physical playtest is temporarily unavailable, so visual work is being prepared without invalidating the exact UX5A candidate that still needs certification.

The strategy is deliberately split:
1. safe CSS-only visual skin against current DOM,
2. separate future-layout prototype for a richer illustrated node map,
3. staged integration only after UX5A merge.

## Implemented visual-prep artifacts
- `visual/tokens-v1.css`
- `visual/runtime-skin-v1.css`
- `visual/VISUAL_SYSTEM_V1.md`
- `visual/ASSET_CONTRACT_VISUAL_V1.md`
- `visual/RESPONSIVE_LAYOUT_V1.md`
- `visual/VISUAL_ROADMAP_V1.md`
- `visual/INTEGRATION_PLAN_V1.md`
- `visual/VISUAL_QA_2026-10-27.md`
- `prototypes/visual-system-v1/index.html`
- `tests/QA_VISUAL_SYSTEM_V1.js`

## Visual QA
Static contract QA:
- **14 PASS / 0 FAIL**.

Chromium future-layout prototype:
- **10 PASS / 0 FAIL**,
- 1365x1024 tablet/desktop,
- 390x844 mobile DPR2,
- room-node click updates selected room/panel,
- narrator overlay opens,
- mobile tabs visible,
- no horizontal overflow.

Chromium exact patch-15 DOM + `runtime-skin-v1.css`:
- **13 PASS / 0 FAIL**,
- default setup can start actual eventyr,
- generated map remains present,
- canonical room identity remains,
- Forteller and `SE DEG RUNDT` remain,
- >=48px Forteller target,
- mobile tabs remain visible,
- no 390px horizontal overflow.

Harness caveat: CDP-injected runtime uses an in-memory localStorage shim. Native persistence and clipboard are still physical-gate items.

## Existing asset contract discovered and preserved
The exact runtime already contains **Asset Contract 2.4.0** with:
- `assets/v1` legacy UI registry,
- `assets/v2/entities` entity registry,
- stable hero/map/item/reward IDs,
- stable entity IDs,
- deterministic thumbnail/large paths,
- visual kinds `character`, `item`, `scene`, `symbolic`.

Visual V1 therefore does **not** create parallel hero/monster/NPC/item IDs.

Examples retained:
- `CHAR_HERO_14`,
- `NPC_OWL_LIBRARIAN`,
- `MONSTER_TRADER_CRAB`,
- `MONSTER_STONE_GOLEM`,
- `TRAP_RAINBOW_NET`,
- `MYSTERY_WRITING_BOOK`,
- `TREASURE_GLASS_MARBLE`.

## Room-art direction
Presentation-only room families may be introduced later, e.g.:
- START,
- CAVE_GENERIC,
- BRIDGE,
- MUSHROOM,
- UNDERGROUND_LAKE,
- MINE,
- GUARDIAN,
- TREASURE,
- PUZZLE,
- TRAP,
- FINALE_GATE,
- CRYSTAL_CAVERN.

These are **not story entities**. A room illustration must never invent a connection, lock, key, character, clue, treasure, crystal socket or required resource absent from canonical state.

Proposed future art root: `assets/v3/rooms/...` after an intentional integration package.

## Visual layout direction
Tablet landscape is primary shared-tabletop presentation:
- top chrome,
- map/world surface ~60%,
- current-room parchment surface ~40%,
- bottom hero/inventory/actions HUD,
- Forteller visible but subordinate.

Mobile keeps one main surface at a time with tabs and >=48px primary touch targets.

## Safe skin vs future renderer
`visual/runtime-skin-v1.css` is designed to prove that much of the visual upgrade can land without gameplay/state rewrite.

The richer node-map prototype is **not** production logic. A future node renderer must consume canonical rooms/connections and preserve fog/reveal/lock/block/secret/movement semantics exactly.

## Binding visual constraints
- concept art is art direction, not the UI bitmap,
- browser owns text and interactive controls,
- no baked-in UI text in world art,
- stable IDs remain authoritative,
- one visible place identity per room,
- icons supplement text; they do not replace action labels,
- no hidden-knowledge leak through art,
- no auto-use of possessed resources,
- no visual change may silently alter story/world state,
- physical/editorial review remains necessary even when browser checks are green.

## Existing architecture/content state
The complete existing content bank has already been editorially reviewed on `narrative/story-graph-v1-prep`, and the nine `CRYSTAL_MACHINE` candidates have been audited/revised. Do not expand the bank while current gates are open.

Narrative Graph runtime remains blocked until UX5A is physically green and merged.

## Repository health
Still open: the exact release/runtime/assets are not yet byte-reconstructable from ordinary repo files alone. The failed large binary snapshot attempt was removed and is not valid provenance evidence.

## Exact next actions
While physical UX5A test remains unavailable, safe work on this branch is:
- refine visual prep/prototype,
- specify and produce presentation-only art against stable IDs,
- browser-test visual artifacts,
- repo-health/provenance work that does not change gameplay.

When physical UX5A becomes GREEN, return to the runtime branch transition sequence. Do not merge this visual branch wholesale into runtime/main. Carry visual changes selectively after runtime merge and re-test them as a separate visual package.
