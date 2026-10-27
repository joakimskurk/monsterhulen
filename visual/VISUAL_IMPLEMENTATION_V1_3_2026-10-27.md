# Monsterhulen — Visual V1.3 asset-sheet implementation

Updated: 2026-10-27
Branch: `visual/visual-system-v1-prep`
Status: **VISUAL PREP ONLY — NOT ACTIVE UX5A RUNTIME**

## Purpose
V1.3 is the first implementation checkpoint where the generated pixel-art sheets are actually split into reusable assets and applied to the real patch-15 interface.

This is not a mockup.

The exact patch-15 DOM/gameplay remains the functional base. V1.3 adds a presentation layer only.

Exact base runtime SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

## What is implemented
### Atlas-derived shell
- pixel panel/frame asset via `border-image`
- square/pixel geometry instead of rounded dashboard cards
- green/blue/orange/purple button skins from the asset sheet
- button labels remain real DOM text
- disabled/hover/pressed state remains browser-controlled

### Canonical generated map
The runtime map is still authoritative.

V1.3 applies atlas assets to it without changing topology/state:
- stone floor textures by existing room tone
- current-room frame/highlight
- `?` map probe sprite for unknown reachable state
- lock map probe sprite for known locked state
- transparent known-room tap target so generic button chrome does not cover the map

No pre-authored diorama map replaces the generated grid.

### Current-room presentation
A presentation-only sceneplate is inserted in the existing room panel.

Current proof families:
- generic cave
- mushroom cave
- underground water/lake

The scene selector only reads current visible room name/description. It does not inspect hidden topology, future encounters, rewards or story prerequisites.

### Hero sprites
Sheet sprites are mapped to stable Asset Contract hero entity IDs where the atlas contains a recognizable match:
- `CHAR_HERO_14` human
- `CHAR_HERO_15` panda
- `CHAR_HERO_19` cat
- `CHAR_HERO_01` witch
- `CHAR_HERO_06` wizard
- `CHAR_HERO_09` elf
- `CHAR_HERO_20` forest elf
- `CHAR_HERO_11` dwarf

Other hero IDs keep the existing runtime fallback until a matching authored sprite exists. No false identity substitution is allowed.

### Backpack sprites
Current proof mappings:
- key
- rope
- lantern
- generic crystal/rune/stone family

The browser only replaces the visual inside the existing slot. It does not auto-use, consume or alter the item.

## Split asset package
Local V1.3 package contains **29 PNG assets** under `assets/v13/`.

Canonical hash/size list:
`visual/asset-manifest-v1_3.json`

Repo implementation files:
- `visual/runtime-assets-v1_3.css`
- `visual/runtime-assets-v1_3.js`
- `visual/asset-manifest-v1_3.json`
- `tests/QA_VISUAL_ASSET_IMPLEMENTATION_V1_3.js`

Binary PNGs are not committed through the GitHub connector because previous connector binary/base64 transport was proven non-byte-safe. The local ZIP contains the exact tested binaries; do not claim repository binary provenance is closed.

## Verification
### Static asset/state contract
`QA_VISUAL_ASSET_IMPLEMENTATION_V1_3.js`: **15 PASS / 0 FAIL**.

Checks include:
- >=20 split assets
- panel and semantic button sprites referenced
- map `?` and lock sprites referenced
- canonical map tap stays transparent
- tile textures present
- room, item and stable hero mappings present
- no call to gameplay `move()` introduced
- no direct state mutation introduced
- room scene art depends only on visible current-room text
- every manifest entry has a SHA-256

### Chromium exact patch-15 + V1.3
Result: **17 PASS / 0 FAIL**.

Verified:
- adventure starts
- canonical generated map remains
- current room remains highlighted
- room sceneplate renders
- one canonical room identity remains
- atlas panel border is active
- semantic button sprite skins are active
- search and narrator controls remain functional
- square/pixel geometry is active
- narrator overlay opens
- tablet has no horizontal overflow
- mobile tabs remain
- mobile has no horizontal overflow
- mobile sceneplate stays within viewport
- narrator target remains >=48 CSS px

Runtime browser harness still uses the existing in-memory localStorage shim. Native persistence/clipboard and physical touch remain outside this visual certification.

## Tested local artifact hashes
Standalone V1.3 HTML:
`fe270477f4030ebcd76339c7c95d4e489085aa6630b93fa1658af8a2fcc373f4`

V1.3 split-asset ZIP:
`183bfcce70e9b3af315e09a2c7318fbbffe3f455f8caca97bd2c2dac7d6797da`

Latest tablet capture:
`b557cc3caddeaa256f0e98aeb1b68ede07dbcd6309519ff3eb45f715397c4bd2`

Latest mobile capture:
`ed702e16a20000933897ff647d605a656ea08ad5cf7e7dcf7bdd5201e414d862`

## Boundary
This checkpoint does not merge visual changes into `ux5/searchable-rooms-encounter-tracks` or `main`.

UX5A still requires its physical iPad/mobile gate on the exact patch-15 candidate.

V1.3 proves that the approved 16-bit asset-sheet direction can be implemented as real web assets over the actual Monsterhulen interface while preserving gameplay/state semantics.
