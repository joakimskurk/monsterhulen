# Monsterhulen — Tileset Contract V2

Updated: 2026-10-27
Branch: `visual/visual-system-v1-prep`
Status: **VISUAL PREP ONLY — no gameplay/state changes**

## Why this replaces sheet-first generation
Previous visual attempts asked image generation to produce large composed sheets and then tried to crop useful pieces from them. That is too imprecise for a runtime grid.

V2 reverses the process:

1. define the runtime grid and exact sprite boxes first,
2. generate one isolated sprite/segment at a time on transparent background,
3. normalize every source to an exact logical cell box,
4. validate dimensions/alpha/safe area,
5. pack the validated individual PNG files into deterministic atlases as a build step.

**The individual normalized PNG files are source assets. The atlas is build output.**

## Runtime grid facts
Verified from the current patch-15 runtime:
- map grid: **13 x 13 cells**,
- rooms may contain multiple joined cells,
- room adjacency is already represented by join directions,
- current runtime CSS stretches map columns responsively, but V2 art must not depend on arbitrary responsive cropping.

## Canonical logical cell
V2 map art uses:

- logical tile: **32 x 32 px**,
- canonical full 13 x 13 map art space at 1x: **416 x 416 CSS px**,
- `image-rendering: pixelated`,
- preferred map display: fixed 32 CSS px cells inside a scroll/pan/focus viewport,
- integer zoom only if a future surface uses zoom (`1x`, `2x`),
- never resize one tile independently from another.

The responsive page may resize around the map. The map itself should pan/clip rather than distort the tile grid.

## Layer model
Each map cell is composed from independent layers:

1. `FOG/BACKGROUND` — browser/CSS state, not an art tile.
2. `FLOOR` — one 32x32 base tile.
3. `ROOM BORDER` — transparent wall/corner overlays aligned to the same 32x32 cell.
4. `CONNECTION` — optional door/opening/lock overlay driven by canonical connection state.
5. `CONTENT MARKER` — optional hero/NPC/encounter/item/map marker.
6. `INTERACTION STATE` — current/selected/reachable/focus drawn by CSS/runtime, not baked into art.

This allows 1x1, rectangular, L-shaped and irregular joined rooms to reuse the same assets.

## Transparency rules
### Must use transparent RGBA background
- wall edges,
- outer corners,
- inner corners,
- door/lock/connection overlays,
- heroes,
- NPCs/monsters,
- map markers,
- items,
- UI icons,
- effects.

### Base floor tiles
Floor tiles are also delivered as RGBA PNG but may be fully opaque because they are layer 2 and intentionally fill the complete 32x32 cell.

No sprite may include a fake checkerboard, colored matte or baked sheet background.

## Pixel alignment
Every normalized asset uses integer pixel coordinates.

Rules:
- no anti-aliased outer edge,
- no half-pixel placement,
- no drop shadow outside the declared 32x32 cell unless the manifest explicitly declares overflow,
- nearest-neighbour scaling only,
- alpha should be either clean transparent or intentional semi-transparent effect pixels; structural stone should not have fuzzy alpha.

## Batch A — neutral room floor
Create exactly **9 neutral stone floor variants**:

- `MAP_FLOOR_STONE_01`
- `MAP_FLOOR_STONE_02`
- `MAP_FLOOR_STONE_03`
- `MAP_FLOOR_STONE_04`
- `MAP_FLOOR_STONE_05`
- `MAP_FLOOR_STONE_06`
- `MAP_FLOOR_STONE_07`
- `MAP_FLOOR_STONE_08`
- `MAP_FLOOR_STONE_09`

Contract:
- 32x32,
- fills full tile,
- neutral cool dungeon stone,
- no moss, water, lava, runes, blood, keys, cracks shaped like clues, footprints or other semantic content,
- variation only in stone size, chips, seams and value distribution,
- seamless enough that adjacent variants do not form obvious borders,
- all nine are `rotationSafe: true`.

Runtime may deterministically choose variant + rotation from room/cell seed. Nine tiles x four rotations gives up to 36 visual combinations without adding semantic meaning.

## Batch B — room border overlays
Borders are separate 32x32 transparent overlays. Structural thickness target: **6 px** from the relevant cell edge.

Required explicit orientations:

### Straight edges
- `MAP_WALL_N_01`
- `MAP_WALL_E_01`
- `MAP_WALL_S_01`
- `MAP_WALL_W_01`

### Outer/convex corners
- `MAP_CORNER_OUTER_NW_01`
- `MAP_CORNER_OUTER_NE_01`
- `MAP_CORNER_OUTER_SE_01`
- `MAP_CORNER_OUTER_SW_01`

### Inner/concave corners
- `MAP_CORNER_INNER_NW_01`
- `MAP_CORNER_INNER_NE_01`
- `MAP_CORNER_INNER_SE_01`
- `MAP_CORNER_INNER_SW_01`

Do not rotate a single lit wall sprite at runtime unless that exact asset is marked `rotationSafe`. Directional wall lighting is authored per orientation so torch/highlight logic does not rotate unnaturally.

## Border selection from room geometry
For every canonical room cell:
- if no same-room cell exists north, draw north edge,
- if no same-room cell exists east, draw east edge,
- if no same-room cell exists south, draw south edge,
- if no same-room cell exists west, draw west edge.

Corner overlays are chosen from the four cardinal neighbours plus diagonal occupancy:
- convex corner when two adjacent exterior edges meet,
- concave corner when both cardinal neighbours exist but their diagonal does not.

This is geometry only. It does not inspect encounter/story state.

## Connections and openings
Do not paint doorways into floor/wall source tiles.

Connection layer is separate so canonical runtime state can decide:
- open passage,
- closed door,
- locked door,
- blocked route,
- hidden/unknown connection.

First border batch may leave connection art out entirely; a connection can simply suppress the relevant wall edge until dedicated door assets are accepted.

## Marker safe boxes
All marker PNGs use a 32x32 transparent cell.

Recommended visible boxes:
- hero: 24x28, baseline at y=30,
- monster/NPC: 24x28, baseline at y=30,
- map icon/lock/question: max 24x24 centred,
- small item: max 22x22 centred.

The 32x32 box is stable even when visible art is smaller.

## Generation working files
Image-generation output is **not** used directly as a runtime asset.

For each sprite:
1. generate one isolated asset on true transparent background,
2. no labels, sheet borders, shadows, neighbouring assets or UI frame,
3. keep the object centred and fully inside canvas,
4. post-process into its exact V2 logical box,
5. pixel-quantize and validate,
6. compare visually at 1x, 2x and 4x nearest-neighbour previews.

If a generated sprite cannot survive normalization cleanly, reject/regenerate it. Do not repair the atlas around a bad crop.

## Source asset directory
Proposed source layout after binary provenance is solved:

```text
assets/v3/map/
  floor/
    stone_01.png ... stone_09.png
  border/
    wall_n_01.png
    wall_e_01.png
    wall_s_01.png
    wall_w_01.png
    corner_outer_nw_01.png ...
    corner_inner_nw_01.png ...
  connection/
  marker/
```

Each source PNG is independently inspectable.

## Deterministic atlas build
Runtime atlases are generated by script, never manually cropped.

Initial atlas contract:
- atlas: 512 x 512 RGBA,
- cell: 32 x 32,
- atlas grid: 16 x 16 slots,
- no gutters inside runtime atlas,
- unused slots transparent,
- slot coordinates live in a JSON manifest,
- atlas packing order is stable and deterministic.

A development guide image may show grid lines/labels, but the runtime atlas never contains guides or text.

## Manifest entry
Example:

```json
{
  "id": "MAP_FLOOR_STONE_01",
  "file": "assets/v3/map/floor/stone_01.png",
  "kind": "floor",
  "width": 32,
  "height": 32,
  "rotationSafe": true,
  "semantic": false,
  "atlas": {"col": 0, "row": 0}
}
```

`semantic:false` means the asset may vary without changing game meaning.

## Hard acceptance rules
An asset batch is rejected if:
- any source image has a non-transparent matte/background where transparency is required,
- dimensions differ from the contract,
- sheet extraction needs hand-tuned crop coordinates,
- adjacent floor tiles show obvious seams,
- a floor variation implies story/environment content,
- a wall segment cannot join neighbouring wall assets cleanly,
- corners do not align to the exact 32px cell edges,
- the same physical room receives repeated independent current-room frames,
- fractional scaling is required for normal map presentation,
- generator output must be stretched to fit UI.

## First production sequence
Do not generate characters/room content yet.

1. create 9 floor tiles,
2. validate seams + rotation,
3. create four straight wall orientations,
4. validate edge joins,
5. create four outer corners,
6. create four inner corners,
7. render synthetic rooms of different shapes from those assets,
8. only after that looks correct, add doors/connections,
9. then add markers/icons.

The first visual acceptance target is an empty generated dungeon made entirely from these structural assets. No furniture, encounters or scene illustration is needed yet.
