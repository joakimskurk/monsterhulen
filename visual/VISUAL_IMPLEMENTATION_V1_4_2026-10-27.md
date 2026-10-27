# Monsterhulen — Visual V1.4 corrected asset integration

Updated: 2026-10-27
Branch: `visual/visual-system-v1-prep`
Status: **VISUAL PREP ONLY — NOT ACTIVE UX5A RUNTIME**

## Why V1.4 exists
V1.3 was structurally green but failed manual product review. The screenshots showed that the asset sheet had been integrated at the wrong visual level.

V1.3 is therefore **visually rejected/superseded**, even though its structural tests remain useful historical evidence.

Observed V1.3 problems:
- the generated dungeon occupied a small cluster inside a large dead map surface,
- current-room treatment repeated per grid cell instead of reading as one physical room,
- full button/panel crops were stretched and produced ugly seams/distortion,
- generic scene art invented objects/content not guaranteed by canonical state,
- `BLANDET` tone was mapped to moss, incorrectly turning tone metadata into environment truth,
- mobile header/map/panel composition was too tall and dumped too much content vertically,
- mobile navigation could overlay game controls,
- some standalone asset hooks had weak/missing visual fallbacks.

## V1.4 correction
The integration rule is now:

**Use sheet art as discrete sprites and repeatable textures. Build layout, panels, buttons, focus and state with browser/CSS components.**

### UI shell
- no stretched sheet bitmap for button chrome,
- no stretched sheet bitmap for panel chrome,
- square pixel-component borders/shadows are CSS,
- split asset icons supplement real DOM labels,
- header contains only `MONSTERHULEN`; utility controls live outside it.

### Generated map
Runtime topology remains canonical.

V1.4:
- wraps the real map in a focused scrollable viewport,
- centers the viewport on the current physical room,
- reads actual CSS padding when calculating centering,
- uses neutral stone tile textures,
- keeps fog dark and visually quiet,
- draws current state around the exterior edges of the joined physical room,
- removes repeated per-cell current outlines,
- uses split `?` and lock sprites for known canonical map states,
- replaces only already-visible encounter marker letters with equivalent sprites.

`BLANDET` uses neutral stone. Moss/water art is not inferred from tone.

### Room scene art
Generic scene art is disabled.

A sceneplate is shown only if **visible current-room name/description** explicitly identifies a safe family:
- mushroom/spore/mycelium -> mushroom scene,
- lake/water/fall/river -> water scene.

If visible room text does not justify a scene family, no sceneplate is shown. This avoids decorative art inventing story facts.

### Hero / inventory
Recognizable sheet sprites are mapped only to matching stable Asset Contract hero IDs. Unmatched heroes retain runtime fallback.

Inventory sprites replace only presentation inside existing slots. No auto-use, consumption or state mutation is introduced.

### Mobile
V1.4 adds an explicit surface switch:
- `KART`
- `ROM`
- `SEKK`
- `FORTELLER`

The navigation is in normal document flow, not a fixed overlay. The map is bounded to a mobile viewport rather than forcing every gameplay surface into one long vertical dashboard.

## Exact local binary package
The tested local package contains **31 PNG assets** under `assets/v14/`.

Hash/size provenance:
`visual/asset-manifest-v1_4.json`

Binary PNG files are not committed through the GitHub connector because previous binary/base64 transport was demonstrated not to be byte-safe. The local ZIP remains the exact binary source for this checkpoint.

## Verification
### Static V1.4 contract
`node tests/QA_VISUAL_ASSET_IMPLEMENTATION_V1_4.js`

Result: **20 PASS / 0 FAIL**.

Coverage includes:
- 31 manifest assets with hashes,
- no stretched button/panel sheet bitmaps,
- CSS pixel component geometry,
- physical-room current outline,
- focused map viewport,
- non-overlay mobile surface navigation,
- generic scene suppression,
- visible-text-only scene selection,
- dynamic map-centering padding,
- stable hero IDs,
- sprite event markers,
- visual-only inventory,
- no new gameplay `move()` call,
- no direct runtime state mutation.

### Chromium exact patch-15 + V1.4
Result: **24 PASS / 0 FAIL**.

Verified:
- adventure starts,
- canonical map is generated,
- focused map viewport exists,
- current room is highlighted as a joined room,
- no per-cell current outline,
- generic scene art remains hidden,
- header contains no runtime status controls,
- utility controls move below header,
- buttons use CSS components rather than stretched bitmaps,
- split search icon renders,
- hero sprite renders,
- current room is near viewport center,
- tablet has no horizontal overflow,
- narrator control works and opens,
- mobile header is compact,
- mobile surface navigation is visible,
- old mobile tabs are hidden,
- mobile map is focused,
- mobile has no horizontal overflow,
- room/bag/map surface switching works.

Browser screenshot state is produced by making a few legal canonical moves after start so the map is representative of play rather than only the first room.

Harness caveat remains: CDP-injected runtime uses an in-memory localStorage shim. Native persistence/clipboard and physical touch are not certified by this visual checkpoint.

## Manual visual review
Unlike V1.3, V1.4 acceptance requires manual screenshot review in addition to structural green.

Manual review confirmed that the specific V1.3 defects above are removed or materially corrected. This does **not** claim the full visual direction is finally editorially approved; further visual refinement may still be required.

## Tested local deliverables
Standalone corrected HTML SHA-256:
`80d411f80bc199d488766dd54329757c2e18204dde63b1fa0ea4d017c2559b82`

Corrected split-asset ZIP SHA-256:
`78a695421189b3c07ef689c3d14343f6ee500c9d7fe07bacab0b049044d4e48b`

Latest tablet capture SHA-256:
`4f01a08117f88d1ef6bac96f714e60afc47574f758b3616e1ff050b479b03e07`

Latest mobile capture SHA-256:
`dc6d0bd87a57c1e666690b8e82afa672af52fc814c1b869c1c6716d3ee6ce9e8`

Local V1.4 manifest SHA-256:
`a0f23ca68cafa104e550fd0d2f7445708a73e1e9e86ca0da0cdc9c7c074cf34a`

## Runtime boundary
Active UX5A runtime and `main` remain untouched by V1.4.

Do not merge the visual-prep branch wholesale. UX5A still requires physical target-device certification first.
