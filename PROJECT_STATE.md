# MONSTERHULEN - PROJECT STATE (VISUAL PREP)

Updated: 2026-10-27
Current branch: `visual/visual-system-v1-prep`
Status: **PARALLEL VISUAL PREP ONLY**
Runtime branch: `ux5/searchable-rooms-encounter-tracks`
Runtime baseline used to create this branch: `b84ebe410679773e6833bf06fcd75bca449a5b89`
Architecture prep branch: `narrative/story-graph-v1-prep`
Current visual work item: **Visual V1.3 asset-sheet implementation — static/browser green, physical/editorial integration review pending**

## Runtime gate is unchanged
UX5A patch 15 is still waiting for physical iPad/mobile certification.

Exact tested patch-15 candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Do not merge visual work into active runtime or `main` before that gate is green.
Do not implement Narrative Graph runtime, UX5B or Multiscreen from this branch.

## Canonical visual direction — V1.2
User review identified that V1/V1.1 had begun using generated concept images too literally as layout templates.

Binding correction:

**Concept images are mood/material references, not composition references.**

The actual Monsterhulen runtime remains the visual substrate.

Keep:
- warm torchlight vs cool cave darkness,
- friendly saturated fantasy accents,
- tactile depth/material feel,
- child-safe wonder,
- richer illustrations where they map safely to canonical state.

Do not copy:
- fixed illustrated diorama-node map,
- parchment as default gameplay panel material,
- concept-image header/navigation/bottom-HUD composition,
- ornamental banner structure,
- art-defined topology or hidden story facts.

## Visual V1.3 — IMPLEMENTED ASSET-SHEET LAYER
V1.3 is the first checkpoint where the generated pixel-art sheets are split into reusable assets and actually applied to the exact patch-15 web interface.

This is not a layout mockup.

Repo implementation files:
- `visual/runtime-assets-v1_3.css`
- `visual/runtime-assets-v1_3.js`
- `visual/asset-manifest-v1_3.json`
- `visual/VISUAL_IMPLEMENTATION_V1_3_2026-10-27.md`
- `tests/QA_VISUAL_ASSET_IMPLEMENTATION_V1_3.js`

### Implemented UI shell
- pixel-art frame asset applied via `border-image`,
- square/pixel geometry,
- atlas-derived green/blue/orange/purple control backgrounds,
- browser/DOM still owns action text, focus, disabled and press state.

### Canonical generated map
The real runtime map remains authoritative.

V1.3 presentation now adds:
- atlas stone textures to existing room cells by current tone,
- canonical current-room highlight,
- atlas `?` sprite for unknown/reachable map probe,
- atlas lock sprite for known locked probe,
- transparent room hit-targets so button chrome cannot cover the map.

No authored/static dungeon map replaces runtime topology.

### Current-room scene art
Presentation-only sceneplate is inserted into the existing room surface.

Current proof families:
- generic cave,
- mushroom cave,
- underground water/lake.

Selection reads only visible current-room name/description. It does not inspect hidden topology, rewards, future subjects or prerequisites.

### Hero sprites
Sheet sprites are mapped only where a recognizable match exists for stable Asset Contract IDs:
- `CHAR_HERO_14` human,
- `CHAR_HERO_15` panda,
- `CHAR_HERO_19` cat,
- `CHAR_HERO_01` witch,
- `CHAR_HERO_06` wizard,
- `CHAR_HERO_09` elf,
- `CHAR_HERO_20` forest elf,
- `CHAR_HERO_11` dwarf.

Unmatched heroes retain the existing runtime fallback. Do not falsely substitute identities.

### Inventory sprites
Current visual mappings:
- key,
- rope,
- lantern,
- generic crystal/rune/stone family.

These only replace presentation inside the existing inventory slot. No item is auto-used, consumed or applied.

## V1.3 split asset package
The exact local test package contains **29 PNG assets** under `assets/v13/`.

Hash/size provenance is recorded in:
`visual/asset-manifest-v1_3.json`

The package includes:
- four semantic button backgrounds,
- eight matching hero sprites,
- four inventory sprites,
- four map-state sprites,
- three room sceneplates,
- five map tile textures,
- one pixel UI-frame asset.

## V1.3 verification — GREEN WITH EXISTING HARNESS CAVEAT
Static asset/state contract:
- **15 PASS / 0 FAIL**.

Chromium exact patch-15 + V1.3:
- **17 PASS / 0 FAIL**.

Verified:
- adventure starts,
- canonical generated map remains,
- current room remains highlighted,
- one canonical room identity remains,
- room sceneplate renders,
- atlas panel/frame is active,
- semantic atlas button skins are active,
- search and Forteller controls remain functional,
- narrator overlay opens,
- square/pixel geometry is active,
- tablet has no horizontal overflow,
- mobile tabs remain,
- mobile has no horizontal overflow,
- sceneplate remains in mobile viewport,
- narrator target remains >=48 CSS px.

Static contract additionally proves:
- no gameplay `move()` call introduced,
- no direct runtime state mutation introduced,
- scene art reads only visible current-room text,
- all manifest entries have SHA-256 provenance.

Harness caveat: CDP-injected runtime still uses in-memory localStorage. Native persistence/clipboard and physical touch remain outside this certification.

## Tested V1.3 local deliverables
Standalone asset-integrated HTML SHA-256:
`fe270477f4030ebcd76339c7c95d4e489085aa6630b93fa1658af8a2fcc373f4`

Split-asset package ZIP SHA-256:
`183bfcce70e9b3af315e09a2c7318fbbffe3f455f8caca97bd2c2dac7d6797da`

Tablet capture SHA-256:
`a7e9c13811eb7058f00dabb8b72b55dc2d887ab3d996e4b2fb02a3712b25fb77`

Mobile capture SHA-256:
`99ce259116fd72906eb672daa4121c40fd00a1739945294a70826415f4c87fdb`

Local asset manifest SHA-256:
`bcb0e49f603635b497d1456bf29398639a3c7f8f4e37f06863b8e0830abb6723`

## Binary provenance limitation
CSS/JS/spec/tests/manifest are committed to GitHub.

The exact PNG binaries are not committed through the GitHub connector because earlier large binary/base64 transport was proven non-byte-safe. The local split-package ZIP is therefore the exact tested binary source for this checkpoint.

Do not claim repository byte-provenance is closed until a byte-safe binary upload path exists and repository copies are hash-verified.

## V1.1 retained only as interaction research
Useful decisions remain:
- selected != current,
- map inspection != movement,
- explicit action remains separate,
- hidden-state protection,
- inventory affordance != auto-use,
- narrator authored/improv/state separation,
- conditional combat presentation,
- multi-cell room warning,
- component-state matrix and functional symbols.

The V1.1 node-map/diorama composition is **not production direction**.

## Stable IDs / asset contract
Existing runtime Asset Contract 2.4.0 remains authoritative. No parallel entity IDs.

Examples preserved:
- `CHAR_HERO_14`
- `NPC_OWL_LIBRARIAN`
- `MONSTER_TRADER_CRAB`
- `MONSTER_STONE_GOLEM`
- `TRAP_RAINBOW_NET`
- `MYSTERY_WRITING_BOOK`
- `TREASURE_GLASS_MARBLE`

## Binding visual constraints
- concept art = art direction, not UI bitmap/layout,
- runtime interaction model remains recognizable,
- generated map/topology remains canonical,
- browser owns text and interactive controls,
- one visible place identity per room,
- art cannot invent exits, locks, keys, NPCs, clues, resources or rewards,
- no hidden-knowledge leak,
- no auto-use of possessed resources,
- primary touch target >=48 CSS px,
- physical/editorial review remains necessary even when browser QA is green.

## Existing architecture/content state
The existing content bank is already editorially reviewed on `narrative/story-graph-v1-prep`, and the nine `CRYSTAL_MACHINE` candidates are audited/revised. Do not expand the content bank while current gates are open.

Narrative Graph runtime remains blocked until UX5A is physically green and merged.

## Exact next safe visual work
Continue from V1.3 implementation, not from new UI mockups:
1. inspect/refine weak sheet crops and sprite matches,
2. expand assets in controlled batches against existing runtime surfaces,
3. add only correct stable-ID entity/hero/item mappings,
4. keep map topology/state generated by runtime,
5. rerun V1.3 static and browser QA after each batch,
6. keep runtime/main untouched until UX5A physical gate is green.

When physical UX5A becomes GREEN, return to the runtime transition sequence first. Visual integration remains a separate controlled package and must be carried selectively, not merged wholesale.
