# Monsterhulen — Visual Direction V1.2

Status: **VISUAL PREP ONLY — supersedes V1.1 as visual target**
Updated: 2026-10-27
Branch target: `visual/visual-system-v1-prep`

## Why V1.2 exists
V1/V1.1 correctly extracted several useful interaction and state rules, but the prototype became too literal an interpretation of the generated concept art. It treated the concept image as a page/layout template instead of treating it as an art-direction reference.

That is now corrected.

**The concept images are mood references, not composition references.**

Monsterhulen's real runtime, interaction model and map semantics remain the design substrate.

## What we keep from the concept art
- warm torchlight against cool cave darkness,
- friendly, saturated fantasy accents,
- tactile materials and soft depth,
- illustrated characters/items/rooms where they add wonder,
- a safe, adventurous tone for children,
- clear visual hierarchy,
- distinct accent families for exploration, backpack and narrator surfaces.

## What we explicitly do NOT copy
- fixed diorama-node map layout,
- large parchment page as the default gameplay surface,
- top navigation copied from the concept image,
- bottom HUD copied as a fixed composition,
- ornamental logo/banner as structural chrome,
- one illustration per room node regardless of actual runtime geometry,
- crystal-machine imagery as generic Monsterhulen identity,
- decorative room art that invents exits, characters, rewards or story facts.

## Runtime-first composition
The current UX5A structure remains primary:
- generated tile/room map,
- current-room information,
- hero state,
- backpack,
- log,
- narrator overlay,
- existing mobile tabs.

V1.2 improves this structure instead of replacing it.

## Material hierarchy
### Cave stone — default gameplay shell
Most gameplay panels use dark blue/charcoal stone surfaces with restrained texture and warm edge lighting.

### Warm wood / bronze — small framing accents
Use for dividers, selected room identity and important tactile controls. It is an accent, not a full dashboard skin.

### Parchment — rare narrative insert
Reserve parchment/cream surfaces for:
- setup/resume story moments,
- letters/books/clues when fiction calls for it,
- occasional narrator reference cards.

Do not use parchment as the default room/map/card background.

## Color semantics
- amber/gold: current location, primary exploration attention, important known state,
- blue: backpack/information/supporting action,
- violet: Forteller/narrator-only surface,
- red: danger/destructive/reset state,
- green: positive confirmation only where semantically useful; not every primary action,
- cyan/teal: magical/cave ambience and selected inspection accents.

## Illustration strategy
Illustration is layered into the runtime rather than defining the layout.

Priority placements:
1. entity portrait/art already supported by Asset Contract 2.4.0,
2. optional room-scene art inside the room-information surface,
3. item art inside inventory slots,
4. small atmospheric decorative accents that cannot be mistaken for state.

Map topology remains generated from canonical room data. Room art never defines topology.

## Map direction
Keep the actual generated map representation as the source of truth.

Improve it with:
- stronger current-room area glow,
- calmer visited-room treatment,
- clearer unknown/fog treatment,
- legible connection/block/lock states,
- subtle cave-depth texture,
- optional room-category visual accents only when derived from canonical state.

Do not turn every map room into a fixed illustrated diorama node.

## Player hierarchy
The player should first see:
1. where they are,
2. what the room feels like / what is visibly happening,
3. what actions are currently available,
4. hero/backpack state only as supporting context.

The interface must not look like a quest-management dashboard.

## Narrator hierarchy
Narrator remains visually distinct and subordinate on the player surface. The deeper narrator overlay may be denser, but must preserve the authored/improv/state separation from V1.1.

## Mobile
Keep the real UX5A mobile model: one main surface at a time, explicit tabs, large touch targets. Do not force the tablet composition into a narrow viewport.

## V1.1 status
Retain V1.1 learnings:
- selected != current,
- explicit travel/action,
- hidden-state protection,
- item affordance not auto-use,
- narrator semantic separation,
- multi-cell room warning.

But the V1.1 node-map composition is **not the visual target**.

## Acceptance question
A future visual change is on-direction only if the answer to both questions is yes:
1. Does this still feel unmistakably like the existing Monsterhulen game and interaction model?
2. Does it gain warmth, wonder, clarity or tactile quality from the art direction without copying the reference composition?
