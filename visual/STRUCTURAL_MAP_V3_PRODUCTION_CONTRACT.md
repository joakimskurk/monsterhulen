# Monsterhulen — Structural Map V3 Production Contract

Updated: 2026-10-27
Branch: `visual/visual-system-v1-prep`
Status: **BINDING VISUAL-PRODUCTION CONTRACT FOR STRUCTURAL MAP V3**

This contract supersedes V2 **visual** assumptions for structural map production. V2 engineering rules remain valid where explicitly retained below.

The purpose of V3 is not merely to produce technically valid 32x32 assets. The purpose is to make the generated dungeon read immediately as **physical rooms connected by architectural thresholds**.

Core perceptual rule:

> **ROOM FIRST, GRID SECOND.**

A successful V3 screenshot should make a viewer notice room shapes and connections before noticing 32px construction cells.

---

## 1. Retained engineering contract

The following remain canonical:
- runtime topology is the existing 13 x 13 logical grid,
- logical source cell remains 32 x 32 px,
- rooms may contain multiple joined cells,
- stable runtime IDs remain unchanged,
- source assets remain individually inspectable PNGs,
- transparent overlays remain separate from floor art,
- atlas packing remains deterministic,
- runtime DOM/state remains authoritative,
- nearest-neighbour integer display scaling only,
- art may not invent topology, locks, blockers, items, actors or story state.

V3 is allowed to replace visual parameters that V2 locked too early, including wall depth, floor edge treatment, connection composition and display scale.

---

## 2. Map presentation contract

32 x 32 is **source resolution**, not the default on-screen size.

### Tablet / desktop
- preferred structural-map display scale: **2x**,
- one logical cell therefore renders at **64 x 64 CSS px**,
- do not shrink below 2x merely to fit all revealed geometry,
- use a clipped/pannable/focused viewport instead,
- viewport should normally be at least **320 x 320 CSS px** and may be larger when layout permits,
- the currently explored bounds should occupy a meaningful part of the viewport rather than floating as a tiny minimap.

### Mobile
- preferred structural-map display scale: **2x**,
- cell remains **64 x 64 CSS px**,
- use a focused/pannable viewport,
- never fit-all shrink below 2x,
- current room must remain fully visible after focus unless the room itself is larger than the viewport.

### Camera/focus rule
The map camera may pan to the current room or explored bounds. It may not change topology or cell dimensions.

### Screenshot occupancy target
For editorial acceptance screenshots with at least 3 revealed rooms:
- explored structural geometry should occupy roughly **55–85%** of the map viewport in at least one axis,
- dead background must not dominate the map panel,
- no accepted screenshot may present the dungeon as a tiny diagnostic/minimap object inside a much larger empty surface.

This is an editorial acceptance target, not hidden gameplay logic.

---

## 3. Floor family — quiet edges, variation inside

V3 floor tiles remain 32 x 32 opaque RGBA sources.

### Required perceptual behaviour
Adjacent tiles must visually merge into one room surface. The viewer should not see an obvious 32px checkerboard.

### Hard source rules
- outer **4 px quiet edge zone** on all four sides,
- no high-contrast seams, grout lines or stone outlines may run along the tile perimeter,
- strongest variation must stay inside x=4..27 and y=4..27,
- no full-width/full-height line may touch an outer tile edge,
- no border frame,
- no corner ornament,
- no directional lighting cue strong enough to reveal rotation,
- no semantic content.

### Palette rule
All floor variants share the same edge-zone base palette. Variant identity comes from low/medium-contrast internal stone shapes, chips and value changes.

### Rotation
Only floor variants explicitly validated as rotation-safe may rotate.

### Floor acceptance
At 2x nearest-neighbour scale, a 4 x 3 room must read as one surface before the viewer can identify where individual source tiles meet.

---

## 4. Room perimeter — strong silhouette

The perimeter exists to define the **physical room**, not to decorate every cell.

### V3 wall depth
V3 structural perimeter target is **8 logical px** from the outer room edge.

This supersedes the V2 6px visual target for the V3 art family.

### Hard wall rules
- straight wall source canvas: 32 x 32 RGBA,
- authored per orientation,
- hard structural alpha unless an explicitly approved effect requires otherwise,
- same-room joins render **no wall at all**,
- wall texture may vary internally but the perimeter silhouette must remain continuous,
- wall inner edge may be irregular by at most **2 px** to avoid a sterile ruler line,
- no decorative protrusion may spill into a neighbouring logical cell,
- no repeated motif every 32 px that exposes the construction grid.

### Contrast rule
The outer perimeter must be visibly stronger than the floor at 2x display. Floor variation should be subordinate to the wall silhouette.

### Corner rules
Convex and concave corners are authored to continue the same 8px perimeter language. Corners may not look like separate badges placed on top of two walls.

### Room silhouette acceptance
For rectangle, L-shape and irregular multi-cell examples:
- a viewer must be able to trace the physical room outline continuously,
- no interior same-room cell boundary may visually resemble an outer wall,
- room shape must be identifiable without relying on current/selected highlight.

---

## 5. Connections — shared-boundary architecture

Connections no longer visually belong to one cell interior.

They belong to the **shared boundary between two spaces**.

### Source canvas
Connection art may remain on a 32 x 32 transparent source canvas for atlas compatibility, but its runtime anchor is the shared boundary midpoint.

### Boundary anchor
For a horizontal shared boundary:
- connection overlay centreline sits exactly on the shared north/south boundary,
- the 32px source may extend up to 16 logical px into each side.

For a vertical shared boundary:
- connection overlay centreline sits exactly on the shared east/west boundary,
- the 32px source may extend up to 16 logical px into each side.

The overlay is therefore positioned from the boundary coordinate, **not from one tile's top-left corner**.

### Opening geometry
V3 doorway/passage aperture target:
- clear opening: **18 logical px**,
- centred on the boundary,
- remaining width belongs to jamb/frame/stone transition,
- opening must visually interrupt the perimeter wall.

The V2 20px opening remains historical; V3 uses 18px unless a later reviewed prototype proves another value necessary.

### `PASSAGE_OPEN`
- must read as a genuine gap/tunnel opening in the perimeter,
- no thin grey line,
- floor continuity should visually pass through the threshold.

### `DOOR_OPEN`
- must read as an architectural doorway,
- visible frame/jamb attached to wall,
- open leaf may be shown only if it clearly reads as hinged/open and does not resemble loose planks,
- doorway opening itself remains readable.

### `DOOR_LOCKED`
- lock identity belongs **on the actual door/threshold**,
- no detached floating lock icon may compete with it,
- locked state may add a compact lock plate/symbol integrated into the door,
- only one visible lock signal per connection fact.

### `ROUTE_BLOCKED`
- blocker presentation sits across the threshold aperture,
- must remain readable at 2x,
- it may be abstract about physical cause,
- do not place a tiny X in the middle of a room cell,
- use one boundary-spanning blocker signal.

### Connection acceptance
A viewer should be able to point to the exact shared boundary affected by a connection state without reading text.

---

## 6. State signals — one fact, one signal

Structural V3 is still not the state-polish package, but existing runtime markers may not sabotage structural evaluation.

Rules:
- no duplicate lock identity,
- no duplicate blocker identity,
- current/selected/fog/reachable stay runtime/CSS state,
- structural screenshots must be reviewed with legacy fallback symbols suppressed when the V3 structural equivalent is active,
- unknown-room marker may remain for runtime testing but may not cover more than half of the visible cell at 2x display,
- structural acceptance must not depend on a bright current-room outline to make room geometry understandable.

---

## 7. Asset-generation brief requirements

Every generated structural source must be prompted and reviewed as a **single functional asset**, not as a concept-art crop.

Required brief for each asset family must state:
- exact 32 x 32 normalized source target,
- true transparency requirement where applicable,
- intended layer,
- intended anchor,
- forbidden semantic content,
- quiet-edge/perimeter requirement,
- exact connection boundary role when applicable,
- pixel-art / 16-bit visual language,
- no labels, neighbouring sprites, UI frame or decorative sheet background.

A visually attractive source that fails the functional brief is rejected.

---

## 8. Mandatory prototype shapes before runtime integration

A structural asset family may not enter the runtime proof until it has been rendered into all of these synthetic shapes:

1. 1 x 1 room,
2. 4 x 3 rectangle,
3. 1 x 5 corridor-like room,
4. L-shaped room,
5. concave irregular room,
6. two rooms separated by one open passage,
7. two rooms separated by one open door,
8. two rooms separated by one locked door,
9. one blocked threshold.

All previews must be rendered at **2x nearest-neighbour** in addition to 1x source inspection.

---

## 9. Mandatory visual acceptance questions

No structural batch is accepted until a human screenshot review answers **YES** to all applicable questions:

### Room reading
- Do multi-cell rooms read as one physical room before the grid is noticed?
- Are source-tile seams difficult to spot at normal 2x viewing distance?
- Can the room outline be traced continuously?
- Are interior same-room joins visually absent?

### Connection reading
- Does each doorway/passsage sit on the exact shared boundary?
- Does an open door look like a doorway rather than loose planks?
- Does a passage look like a real opening rather than a line/icon?
- Is a lock visually attached to the affected doorway?
- Does a blocked state span the actual threshold?

### Composition
- Is the dungeon one of the dominant surfaces in the map panel?
- Is dead black space subordinate to explored geometry?
- Does mobile preserve a useful 2x spatial view through panning/focus rather than shrinking everything?

Any `NO` rejects the batch regardless of automated QA.

---

## 10. Automated checks are necessary but insufficient

Automated V3 QA must verify at minimum:
- source dimensions,
- alpha policy,
- quiet-edge floor rule,
- wall depth/anchor geometry,
- no same-room wall overlays in synthetic composition,
- connection anchor on shared boundary,
- 18px aperture geometry,
- unique IDs/atlas slots,
- deterministic source generation,
- integer display scale,
- no direct gameplay-state mutation.

Automated green means **structurally valid**, never **visually approved**.

---

## 11. V3 production order

Do not produce the full bank at once.

### Gate A — one-floor / one-wall proof
Produce only:
- 1 quiet floor tile,
- 1 north wall,
- required matching corners for a 1x1 and 4x3 rectangle.

Render synthetic 2x previews. If rooms still read as cells, stop and revise before making variants.

### Gate B — floor family / full perimeter
Only after Gate A visual acceptance:
- expand to floor variants,
- complete N/E/S/W walls,
- complete convex/concave corners,
- test rectangle/L/concave shapes.

### Gate C — one shared-boundary connection
Only after Gate B acceptance:
- create one open passage on a shared boundary,
- prove correct architectural composition.

### Gate D — connection family
Only after Gate C acceptance:
- open door,
- locked door,
- blocked threshold,
- orientation variants.

### Gate E — real runtime screenshots
Only after synthetic acceptance:
- patch-15 runtime proof,
- tablet 2x viewport screenshot,
- mobile focused/pannable 2x screenshot,
- manual visual approval.

No actors/items/monsters/content before Gate E is explicitly accepted.

---

## 12. Current next action

Start Structural Map V3 at **Gate A only**.

Do not regenerate 9 floors or 16 connections yet.

The next accepted artifact should prove one thing first:

> A multi-cell empty room can look like **one dungeon room**, not a grid of tiles.
