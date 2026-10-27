# MONSTERHULEN - PROJECT STATE (VISUAL PREP)

Updated: 2026-10-27
Current branch: `visual/visual-system-v1-prep`
Status: **PARALLEL VISUAL PREP ONLY**
Runtime branch: `ux5/searchable-rooms-encounter-tracks`
Runtime baseline used to create this branch: `b84ebe410679773e6833bf06fcd75bca449a5b89`
Architecture prep branch: `narrative/story-graph-v1-prep`
Current visual work item: **Visual System V1.1 detail refinement + small asset-prep batch**

## Runtime gate is unchanged
UX5A patch 15 is still waiting for physical iPad/mobile certification.

Exact tested patch-15 candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Do not merge visual work into active runtime or `main` before that gate is green.

Do not implement Narrative Graph runtime, UX5B or Multiscreen from this branch.

## Why this branch exists
Physical playtest is temporarily unavailable, so visual work is being prepared without invalidating the exact UX5A candidate that still needs certification.

The strategy is deliberately split:
1. safe CSS-only visual layers against current DOM,
2. separate future-layout prototype for a richer illustrated node map,
3. production art contract tied to stable IDs and knowledge-safe rendering,
4. staged integration only after UX5A merge.

## Implemented Visual V1 baseline
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

V1 verification:
- static contract **14/0**,
- Chromium node-map prototype **10/0**,
- exact patch-15 DOM + V1 skin **13/0**.

## Visual V1.1 detail checkpoint
New V1.1 artifacts:
- `visual/VISUAL_DETAILS_V1_1.md`
- `visual/COMPONENT_STATE_MATRIX_V1_1.md`
- `visual/ART_PRODUCTION_SPEC_V1_1.md`
- `visual/UI_SYMBOLS_V1_1.md`
- `visual/ui-symbols-v1_1.svg`
- `visual/runtime-detail-v1_1.css`
- `visual/VISUAL_QA_V1_1_2026-10-27.md`
- `tests/QA_VISUAL_DETAILS_V1_1.js`
- `tests/QA_VISUAL_SYMBOLS_V1_1.js`
- `prototypes/visual-system-v1_1/index.html`
- `prototypes/visual-system-v1_1/style-map.css`
- `prototypes/visual-system-v1_1/style-ui.css`
- `prototypes/visual-system-v1_1/prototype.js`

V1.1 verification:
- static detail contract **32 PASS / 0 FAIL**,
- Chromium node-map/detail prototype **20 PASS / 0 FAIL**,
- exact patch-15 DOM + V1 skin + V1.1 detail CSS **13 PASS / 0 FAIL**,
- SVG symbol contract **8 PASS / 0 FAIL**.

Verified browser-tested V1.1 Git blobs:
- prototype index `356a1d1fb20f092ae7110d9e7beb7e16b5f3494b`
- map/chrome CSS `047b238d0504892f7fb8c17067da445e0302ef62`
- room/HUD/overlay CSS `e7fdbc0d6788b1040a50e5f658d5978d5258ec5a`
- prototype interaction JS `6ce3264a3f867f4bcff5a2ea45cc81475186dbce`
- runtime detail CSS `099c874a52a813435fdc49dd8d5bb473ffa0cc16`
- SVG symbol sprite `037fe96a3be8047bea9556db3c33659d6b7a9b33`

Harness caveat: CDP-injected runtime uses an in-memory localStorage shim. Native persistence and clipboard are still physical-gate items.

## V1.1 interaction model
### Inspecting the map is not movement
Map-node selection is inspection only. It never changes canonical location.

Visual state vocabulary:
- current,
- selected,
- visited,
- reachable,
- locked,
- blocked,
- unknown.

Travel is an explicit separate action such as `GÅ HIT`, enabled only when canonical movement state permits it.

### Knowledge-safe map
- hidden rooms/edges do not appear merely to tease the player,
- known-but-unresolved locks/blocks may be shown without leaking their solution,
- unknown room presentation remains generic,
- one physical room gets one current treatment; never per-cell duplicated markers.

### Room panel
Hierarchy:
1. `DU ER HER` / `VALGT PÅ KARTET`,
2. one room title,
3. art,
4. description,
5. sensory/signalling chips,
6. visible encounter card,
7. travel state/action.

Sensory chips are observations, not a closed solution list.

### Backpack
Backpack explains affordances but does not auto-use items. Critical-known resources can be marked as important, but possession never equals placement/use.

### Story progress
Small indicators are allowed only after the underlying requirement is player-known. No generic hidden quest checklist.

### Forteller
Stable hierarchy:
- `HVA ER SKREVET?`
- `HVA KAN JEG IMPROVISERE?`
- `NÅR ER DET LØST?`
- `TERNING?`

Semantic controls are conditional. `START KAMP` appears only where combat is actually allowed.

## Existing asset contract discovered and preserved
The exact runtime already contains **Asset Contract 2.4.0** with:
- `assets/v1` legacy UI registry,
- `assets/v2/entities` entity registry,
- stable hero/map/item/reward IDs,
- stable entity IDs,
- deterministic thumbnail/large paths,
- visual kinds `character`, `item`, `scene`, `symbolic`.

Visual V1/V1.1 does **not** create parallel hero/monster/NPC/item IDs.

Examples retained:
- `CHAR_HERO_14`,
- `NPC_OWL_LIBRARIAN`,
- `MONSTER_TRADER_CRAB`,
- `MONSTER_STONE_GOLEM`,
- `TRAP_RAINBOW_NET`,
- `MYSTERY_WRITING_BOOK`,
- `TREASURE_GLASS_MARBLE`.

## Production art direction
Canonical prep spec:
`visual/ART_PRODUCTION_SPEC_V1_1.md`

Presentation-only room families may later include:
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

These are not story entities. Art may not invent connections, locks, keys, characters, clues, treasure, sockets or resources absent from canonical state.

Do not mass-produce the full art bank yet. First safe asset batch:
1. generic cave,
2. START,
3. BRIDGE,
4. MUSHROOM,
5. UNDERGROUND_LAKE,
6. one representative subject portrait,
7. a few inventory objects.

Browser-test crop, readability, performance and hidden-state safety before expanding.

Crystal Machine visual phase variants wait until canonical story/state can drive them.

## Functional SVG symbols
`visual/ui-symbols-v1_1.svg` contains 14 text-free functional symbols using `currentColor`:
- map,
- inspect/eye,
- backpack,
- narrator,
- lock,
- blocked,
- current,
- visited,
- travel,
- clue,
- trade,
- friend,
- guardian,
- reward.

These are UI affordances, not story content. Icons supplement labels and may not leak hidden state.

## Visual layout direction
Tablet landscape remains primary shared-tabletop presentation:
- top chrome,
- map/world surface ~60%,
- current-room parchment surface ~40%,
- bottom hero/inventory/actions HUD,
- Forteller visible but subordinate.

Mobile keeps one main surface at a time with tabs and >=48px primary touch targets.

## Safe skin vs future renderer
`visual/runtime-skin-v1.css` + `visual/runtime-detail-v1_1.css` demonstrate that a substantial visual upgrade can be layered over the current DOM without gameplay/state rewrite.

The richer node-map prototype is **not production logic**. A future renderer must consume canonical rooms/connections and preserve fog/reveal/lock/block/secret/movement semantics exactly.

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

## Exact next safe actions
While physical UX5A test remains unavailable:
1. produce only the small first presentation-art batch described above,
2. integrate those assets into the V1.1 prep prototype only,
3. browser-test crop/readability/mobile/performance and state-safety,
4. revise art contract before any larger batch,
5. continue repo-health/provenance work if a byte-safe asset path is available.

When physical UX5A becomes GREEN, return to the runtime branch transition sequence. Do not merge this visual branch wholesale into runtime/main. Carry visual changes selectively after runtime merge and re-test them as a separate visual package.
