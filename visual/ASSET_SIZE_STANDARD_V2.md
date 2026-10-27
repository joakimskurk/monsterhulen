# Monsterhulen — Asset Size Standard V2

Updated: 2026-10-27
Branch: `visual/visual-system-v1-prep`
Status: **BINDING VISUAL-PRODUCTION CONTRACT**

This file is the canonical size reference for visual asset production. If another visual-prep document disagrees about dimensions, this file wins for new V2 production unless the existing runtime Asset Contract 2.4.0 explicitly requires a legacy compatibility size.

Machine-readable mirror: `visual/asset-size-standard-v2.json`.

## 1. Global pixel/grid contract

| Property | Canonical value |
| --- | ---: |
| Runtime map grid | 13 x 13 cells |
| Logical map cell | 32 x 32 px |
| Full map art space at 1x | 416 x 416 px |
| Runtime atlas | 512 x 512 px RGBA |
| Atlas slot | 32 x 32 px |
| Atlas grid | 16 x 16 slots |
| Runtime atlas gutter | 0 px |
| Pixel interpolation | nearest-neighbour / `image-rendering: pixelated` |
| Normal map scale | integer only: 1x, 2x, 3x, 4x |
| Fractional tile scaling | forbidden |
| Runtime source format | PNG, 8-bit RGBA |

The page may be responsive around the map. Individual map cells are never stretched independently. On small screens, pan/clip/focus the 416x416 logical map instead of fractionally resizing its tile grid.

## 2. Generation master vs normalized runtime source

Image-generation output is a **working master**, not a runtime file.

For isolated square sprites/segments, the preferred generation canvas is 1024 x 1024 RGBA with a single centred subject and no labels, neighbouring sprites, frame or sheet background.

After generation:
1. isolate/clean the subject,
2. normalize to the exact class canvas below,
3. enforce the safe box / anchor below,
4. pixel-quantize and clean alpha,
5. save the normalized PNG as the canonical source asset,
6. validate before atlas packing.

Never compensate for a badly generated source by using hand-tuned crop coordinates in the atlas.

## 3. Structural map assets

### 3.1 Floor tiles

| Field | Value |
| --- | ---: |
| Canvas | 32 x 32 px |
| Visible area | full 32 x 32 |
| Alpha | may be fully opaque |
| Anchor | full cell |
| Rotation | allowed only when `rotationSafe:true` |
| Runtime render | 32 x 32 CSS px at 1x |

First bank: exactly 9 semantic-neutral stone variants, `MAP_FLOOR_STONE_01` through `MAP_FLOOR_STONE_09`.

No moss, water, lava, rune, blood, footprint, key, clue-shaped crack, furniture or other semantic content.

### 3.2 Straight room-wall overlays

Each orientation has its own authored sprite.

| Field | Value |
| --- | ---: |
| Canvas | 32 x 32 px RGBA |
| Structural wall depth | 6 px |
| Transparent remainder | 26 px inward from that edge |
| Runtime render | 32 x 32 CSS px |
| Rotation | false by default |

Anchors:
- north wall: rows y=0..5,
- south wall: rows y=26..31,
- west wall: columns x=0..5,
- east wall: columns x=26..31.

Required IDs:
- `MAP_WALL_N_01`
- `MAP_WALL_E_01`
- `MAP_WALL_S_01`
- `MAP_WALL_W_01`

Structural stone pixels use hard alpha (0 or 255). No fuzzy antialiased exterior edge.

### 3.3 Outer/convex corner overlays

| Field | Value |
| --- | ---: |
| Canvas | 32 x 32 px RGBA |
| Edge depth | 6 px on both participating edges |
| Runtime render | 32 x 32 CSS px |
| Rotation | false by default |

Required IDs:
- `MAP_CORNER_OUTER_NW_01`
- `MAP_CORNER_OUTER_NE_01`
- `MAP_CORNER_OUTER_SE_01`
- `MAP_CORNER_OUTER_SW_01`

Every corner must join the corresponding straight wall at the exact 6 px boundary.

### 3.4 Inner/concave corner overlays

| Field | Value |
| --- | ---: |
| Canvas | 32 x 32 px RGBA |
| Edge depth | 6 px on participating interior edges |
| Runtime render | 32 x 32 CSS px |
| Rotation | false by default |

Required IDs:
- `MAP_CORNER_INNER_NW_01`
- `MAP_CORNER_INNER_NE_01`
- `MAP_CORNER_INNER_SE_01`
- `MAP_CORNER_INNER_SW_01`

Concave-corner art must not extend into a neighbouring logical cell.

## 4. Connections / doors

Connections are a separate layer. They are never painted into floor or generic wall files.

All connection sprites use a 32 x 32 RGBA canvas.

### North/south connection
- opening span: 20 px centred horizontally (`x=6..25`),
- structural band: aligned to the same 6 px north/south wall depth,
- visual art may extend inward but must remain inside 32 x 32.

### East/west connection
- opening span: 20 px centred vertically (`y=6..25`),
- structural band: aligned to the same 6 px east/west wall depth,
- visual art may extend inward but must remain inside 32 x 32.

Future state variants use the same canvas:
- open passage,
- closed door,
- locked door,
- blocked route.

Unknown/hidden connections are not represented by a visible art asset until canonical runtime knowledge allows them to be shown.

## 5. Map markers and actors

All map markers occupy one 32 x 32 logical cell. Their visible art uses a smaller safe box so nearby wall/connection pixels remain readable.

### Hero / NPC / monster map sprite

| Field | Value |
| --- | ---: |
| Canvas | 32 x 32 px RGBA |
| Visible safe box | max 24 x 28 px |
| Safe-box x range | 4..27 |
| Safe-box y range | 2..29 |
| Baseline | y=30 |
| Rotation | false |

Feet/shadow must visually settle on the baseline. No art may spill outside the 32 x 32 canvas.

### Generic map icon / question / lock / encounter marker

| Field | Value |
| --- | ---: |
| Canvas | 32 x 32 px RGBA |
| Visible safe box | max 24 x 24 px |
| Alignment | centred |
| Rotation | false unless explicitly declared |

### Small item marker on map

| Field | Value |
| --- | ---: |
| Canvas | 32 x 32 px RGBA |
| Visible safe box | max 22 x 22 px |
| Alignment | centred |

### Map effect

| Field | Value |
| --- | ---: |
| Canvas | 32 x 32 px RGBA |
| Visible safe box | max 32 x 32 px |
| Semi-transparent pixels | allowed when intentional |

Effects may animate later, but each frame remains 32 x 32.

## 6. Inventory and UI icon production

### Inventory slot art
Canonical item compatibility remains aligned with Asset Contract 2.4.0:
- item thumbnail: **32 x 32 px**,
- item large: **64 x 64 px**.

For map/HUD slot use, the 32 x 32 item file should keep its main silhouette within max **24 x 24 px**, centred. Critical importance, selection, count and usability are browser state and are never baked into the item illustration.

### Generic UI icons

| Field | Value |
| --- | ---: |
| Canvas | 24 x 24 px RGBA or SVG viewBox 0 0 24 24 |
| Visible safe box | max 20 x 20 px |
| Alignment | centred |
| Standard button display | 24 x 24 CSS px |
| Large accessible display | 32 x 32 CSS px, integer-nearest scaling for bitmap |

Examples: search, backpack, narrator/book, map, settings, back, close.

Primary child-facing actions always retain visible DOM text. An icon is never the only label.

## 7. Existing Asset Contract 2.4.0 compatibility sizes

These existing sizes remain authoritative for canonical entity art and are not replaced by the 32 x 32 map tileset:

| Visual kind | Thumbnail | Large |
| --- | ---: | ---: |
| character | 64 x 64 | 128 x 128 |
| item | 32 x 32 | 64 x 64 |
| scene | 64 x 48 | 192 x 128 |
| symbolic | 32 x 32 | 64 x 64 |

A character can therefore have:
- a 32 x 32 **map sprite** for grid presence, and
- a 64 x 64 / 128 x 128 **entity portrait** for UI presentation.

They are different visual roles tied to the same stable entity ID.

## 8. UI chrome sizes

V2 does **not** generate stretched bitmap buttons or full-panel bitmaps.

Default UI chrome is CSS/DOM.

If small pixel ornaments are introduced later, use only repeatable fixed-size components:
- panel corner ornament: 16 x 16 px,
- horizontal edge repeat tile: 16 x 16 px,
- vertical edge repeat tile: 16 x 16 px,
- divider ornament: 16 x 16 px.

These ornaments must tile/repeat; they may never be arbitrarily stretched.

Button backgrounds remain CSS. Only the 24 x 24 icon is an asset.

## 9. Room/scene illustration status

Room-content illustration is intentionally **deferred** during structural Tileset V2 production.

If/when scene/entity art is resumed, existing Asset Contract 2.4.0 `scene` sizes remain the compatibility baseline (64 x 48 thumb, 192 x 128 large) until a later explicitly approved contract replaces them.

Do not create a new room-scene size ad hoc during floor/wall production.

## 10. Atlas rules

Normalized source PNGs are source of truth. Atlas PNGs are generated output.

Initial structural atlas:
- 512 x 512 RGBA,
- 16 columns x 16 rows,
- each slot exactly 32 x 32,
- no runtime gutter,
- no labels/grid/guides,
- unused slots transparent,
- manifest owns slot coordinates.

A development guide atlas may contain guides and labels but is never shipped as runtime art.

## 11. File naming

Use lower-case deterministic files underneath stable uppercase asset IDs.

Examples:
- `MAP_FLOOR_STONE_01` -> `assets/v3/map/floor/stone_01.png`
- `MAP_WALL_N_01` -> `assets/v3/map/border/wall_n_01.png`
- `MAP_CORNER_OUTER_NW_01` -> `assets/v3/map/border/corner_outer_nw_01.png`
- `MAP_DOOR_LOCKED_N_01` -> `assets/v3/map/connection/door_locked_n_01.png`
- `MAP_MARKER_QUESTION_01` -> `assets/v3/map/marker/question_01.png`

Never encode runtime state that is not actually represented by the asset role into a filename.

## 12. Acceptance checklist for every new asset

An asset is rejected unless all applicable checks pass:
- exact canonical canvas dimensions,
- correct RGBA/transparency policy,
- subject stays inside its safe box,
- structural anchors align to exact pixel rows/columns,
- no antialiased fuzzy structural edge,
- no semantic/story detail in neutral structural assets,
- no fractional runtime scaling required,
- no manual crop coordinates required,
- correct stable ID / role mapping,
- visually inspected at 1x, 2x and 4x nearest-neighbour,
- deterministic manifest entry before atlas packing.

## 13. Current production order

1. 9 x floor 32x32.
2. 4 x straight wall 32x32.
3. 4 x outer corner 32x32.
4. 4 x inner corner 32x32.
5. synthetic 1x1, rectangular, L-shaped and irregular room tests.
6. connection/door overlays 32x32.
7. map markers/actors 32x32.
8. UI icons 24x24 and existing entity compatibility sizes only after structural map art is accepted.

Do not produce room contents before the structural dungeon kit passes visual review.