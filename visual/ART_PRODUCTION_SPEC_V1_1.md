# Monsterhulen — Art Production Spec V1.1

Status: **VISUAL PREP ONLY — no production assets committed by this document**
Updated: 2026-10-27

## Purpose
Turn the approved visual direction into repeatable asset production without baking gameplay truth into illustrations.

The concept boards are art direction references. Production UI remains DOM/CSS/SVG plus separately loaded art assets.

## 1. Style anchor
Target feeling:
- warm, tactile, hand-painted fantasy,
- adventurous rather than frightening,
- strong cave silhouettes,
- warm torchlight against cool cave blues,
- readable at tablet distance,
- friendly shapes and facial expressions,
- enough texture to feel premium without visual noise.

Avoid:
- photorealism,
- grimdark/horror,
- gore,
- tiny high-frequency detail,
- embedded UI text,
- fake interface controls inside world art.

## 2. Palette families
Core:
- cave navy / blue-gray,
- parchment cream / beige,
- dark warm wood,
- torch gold / amber,
- moss green.

Story accents:
- crystal blue,
- crystal red,
- crystal yellow,
- narrator purple.

Color is never the sole state signal.

## 3. Production asset families

### A. Room-node art
Purpose: compact map identity.

Recommended source ratio: **4:3**.

Composition:
- one strong silhouette/read,
- central focal feature,
- dark cave edge suitable for masking into irregular node shape,
- no text,
- no state-specific border baked in,
- no exits unless the art variant is explicitly tied to canonical visible topology.

Initial presentation families:
- `START`
- `CAVE_GENERIC`
- `BRIDGE`
- `MUSHROOM`
- `UNDERGROUND_LAKE`
- `MINE`
- `GUARDIAN`
- `TREASURE`
- `PUZZLE`
- `TRAP`
- `FINALE_GATE`
- `CRYSTAL_CAVERN`

These are visual families, not story entities.

### B. Room hero art
Purpose: right-side/current-room illustration.

Recommended source ratio: **16:9** or **3:2**, cropped responsively.

Rules:
- room atmosphere can be specific,
- story-critical props/creatures require canonical state or an explicit art variant,
- reserve quiet negative space for DOM overlays if needed,
- no visible written room name.

### C. Subject portrait
Purpose: encounter card / narrator reference.

Recommended source ratio: **1:1**.

Composition:
- head/body read at 64–96 CSS px,
- clean silhouette,
- readable expression,
- child-friendly even for spooky subjects,
- transparent or simple neutral cave background.

Entity identity follows existing Asset Contract IDs. Visual V1 does not create replacement subject IDs.

### D. Item art
Purpose: inventory slot and interaction shells.

Recommended source: square transparent PNG/WebP or SVG where appropriate.

Rules:
- one object per asset,
- no baked rarity color frame,
- readable at 48–72 CSS px,
- affordance comes from recognizable object shape, not stat text.

### E. Symbols/UI icons
Prefer SVG/CSS for:
- lock,
- blocked route,
- search,
- clue,
- friend,
- trade,
- guardian,
- backpack,
- narrator,
- known/unknown state.

Do not use generated raster art for simple functional UI symbols when vector geometry is sufficient.

## 4. State must be layered, not baked into art
The same base room image should normally work for multiple states.

Renderer/UI layers own:
- current glow,
- selected outline,
- lock badge,
- blocked indicator,
- visited mark,
- quest-known marker,
- accessibility labels.

This avoids multiplying art variants and prevents image files from becoming hidden game state.

## 5. When art variants ARE justified
Create a distinct art variant only when the fictional world itself visibly changes, for example:
- intact gate vs physically opened gate,
- unlit machine vs awakened machine,
- chest closed vs visibly opened if that state matters,
- room before vs after a major authored world effect.

Each such variant must map to a canonical tracked state. Never switch it based on narrator inference.

## 6. Knowledge-safe composition
Before approving an asset ask:
- Does it reveal an NPC that may not be present?
- Does it show a door/bridge/path that may not exist?
- Does it show a required item before reveal?
- Does it show the answer to a puzzle?
- Does it imply a lock requires a particular key?
- Does it show three sockets before the story reveals them?

If yes, either:
1. make the art more generic, or
2. define a reveal-gated variant tied to canonical knowledge/state.

## 7. Crystal Machine special rule
Do not use one universal Crystal Machine image for all phases.

Potential presentation variants after Narrative Graph state exists:
- machine discovered, requirements not yet fully known,
- three sockets revealed,
- partial explicit placement,
- fully assembled but not activated (only if authored),
- activated/open world-effect state.

Possession of crystals alone never selects a placed/assembled variant.

## 8. Text safety
No production world/subject/item image contains baked Norwegian UI text.

Forbidden inside art:
- room names,
- button labels,
- quest counts,
- `LÅST`, `FUNNET`, `VIKTIG`,
- narrator instructions.

Those remain real DOM text for accessibility, localization and state correctness.

## 9. Export targets
Preferred browser delivery after a byte-safe asset pipeline exists:
- WebP for painted opaque scenes,
- PNG/WebP alpha for portraits/items,
- SVG for simple UI symbols,
- no external CDN dependency for core offline play.

Generate source masters larger than delivery resolution. Downscale intentionally; do not rely on browser loading giant source images.

Suggested delivery targets:
- room node: ~320–480 px wide,
- room hero: ~960–1280 px wide,
- subject portrait: ~256–384 px,
- item: ~128–256 px.

Actual compression budget must be measured in browser before integration.

## 10. Naming / registry
Room presentation art should use a visual registry rather than scattered file strings.

Illustrative future mapping:

```js
ROOM_ART = {
  START: { node: '...', hero: '...' },
  BRIDGE: { node: '...', hero: '...' },
  MUSHROOM: { node: '...', hero: '...' },
  UNDERGROUND_LAKE: { node: '...', hero: '...' }
};
```

This registry is presentation-only. Existing stable entity IDs remain authoritative for subjects/items/heroes.

Proposed room-art root remains `assets/v3/rooms/` only after an intentional integration package and byte-safe asset provenance are available.

## 11. Production priority
Do not generate the entire art bank at once.

Recommended sequence:
1. generic cave + START + BRIDGE + MUSHROOM + UNDERGROUND_LAKE,
2. one representative subject portrait and 4 inventory items,
3. browser-integrate into visual prototype,
4. verify readability/crop/performance on tablet + mobile,
5. revise style contract,
6. then produce remaining room families in small batches.

Crystal Machine state variants wait until the canonical story/state contract can drive them.

## 12. Acceptance checklist per asset
An asset is not approved merely because it looks good.

Check:
- style consistency,
- clear silhouette at target size,
- no baked text,
- no hidden-state leak,
- no accidental closed-answer implication,
- child-friendly tone,
- stable-ID/registry compatibility,
- crop works on tablet/mobile,
- file size/performance acceptable,
- provenance/hash recorded once assets enter repository.
