# Visual Asset Contract V1

Status: **extension rules for existing runtime Asset Contract 2.4.0; no replacement of existing IDs**

## Existing contract is authoritative
The exact patch-15 runtime declares:
- contract version `2.4.0`,
- legacy UI root `assets/v1`,
- entity root `assets/v2/entities`,
- stable hero/map/item/reward IDs,
- stable entity registry IDs,
- thumbnail/large size classes,
- deterministic entity paths.

Visual V1 builds on this. Save compatibility and entity identity must not depend on filenames changing.

## Existing canonical entity sizes
- character thumbnail: 64x64; large: 128x128,
- item thumbnail: 32x32; large: 64x64,
- scene thumbnail: 64x48; large: 192x128,
- symbolic thumbnail: 32x32; large: 64x64.

These remain compatibility targets for existing entity art.

## New presentation-only room art
Room art is not an entity and must never be stored as a story prerequisite. Proposed root after integration:

`assets/v3/rooms/<family>/<variant>.webp`

Recommended exports:
- node thumbnail: 320x220 WebP,
- room hero: 960x640 WebP,
- optional 2x source retained outside runtime bundle if needed.

Required metadata lives in code/data, not embedded image text:

```js
{
  visualId: 'ROOM_ART_CRYSTAL_CAVERN_01',
  family: 'CRYSTAL_CAVERN',
  node: 'assets/v3/rooms/crystal_cavern/01_node.webp',
  hero: 'assets/v3/rooms/crystal_cavern/01_hero.webp',
  toneAllow: ['LYS','BLANDET','RAR'],
  features: ['STONE','REFLECTIVE_WATER','CRYSTAL'],
  implies: []
}
```

`implies` must remain empty for ordinary decorative art. Art must not visually promise a locked door, crystal socket, NPC, treasure, bridge, clue or other interactive truth unless materialized state declares it.

## Composition rules for generated/exported art
- no baked-in Norwegian/English text,
- no room names,
- no UI buttons,
- no map arrows,
- no fake interaction icons,
- no mandatory story resource unless scene state owns that resource,
- safe crop around important subject,
- readable at tablet and mobile sizes,
- child-friendly silhouettes,
- no gore/horror,
- strong light/dark separation but avoid crushed black detail.

## Entity art framing
Keep current `visualKind` semantics:
- `character`
- `item`
- `scene`
- `symbolic`

Visual frame comes from category (`monster`, `npc`, `ambient_friend`, `trap`, `mystery`, etc.), not from changing the underlying entity ID.

## UI icons
Use SVG/CSS where possible for generic interface concepts (close, back, expand, settings). Use canonical bitmap/entity assets for in-world objects and characters.

No icon may become the only way to understand an action; include visible text for child-facing primary actions.

## Crystal Machine
The three story crystals must be distinct tracked resources if/when NG implements them. A generic `ITEM_CRYSTAL_01` icon may not silently stand in for red/blue/yellow critical resources unless the future graph explicitly maps that visual to those stable resource IDs.

The gate illustration must not show filled sockets until canonical target-bound placement state says they are filled.

## Naming
Presentation IDs use `ROOM_ART_*` / `UI_ART_*` and do not collide with entity IDs. Canonical entities retain current IDs unchanged.
