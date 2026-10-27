# Monsterhulen — Tileset V2 visual review

Updated: 2026-10-27
Branch: `visual/visual-system-v1-prep`
Status: **CURRENT V2 ART DIRECTION REJECTED; TECHNICAL GRID CONTRACT RETAINED**

## Summary
The 32x32 grid contract, deterministic generation, transparency rules, stable IDs and runtime geometry mapping are useful and remain valid.

The current room/connection artwork and map presentation are **not visually acceptable** and must not be treated as approved art direction.

## What works
- 13x13 logical grid and 32x32 source-cell model.
- Multi-cell rooms are derived from canonical join geometry rather than bespoke room images.
- Individual PNG assets are deterministic and reproducible.
- Walls/connections use transparent overlays.
- Runtime state, topology and gameplay remain canonical.
- Locked and blocked connections can be mapped from real runtime state without inventing story facts.

## What fails visually
### 1. Map hierarchy / scale
The dungeon is much too small relative to the available map panel. It reads as a technical minimap floating inside dead black space rather than the main play surface.

The 32x32 source size should be treated as **logical source resolution**, not necessarily the final CSS display size. Integer display scaling is already allowed by the contract and should be used deliberately. Tablet should likely render the map at 2x (64 CSS px per logical cell) or use an explored-bounds viewport that makes the dungeon occupy most of the available map surface. Mobile needs the same logical scale in a panning/focus viewport rather than simply showing a tiny entire map.

### 2. Floors make cells more visible than rooms
The current floor art has strong per-tile internal structure. Adjacent cells read as separate squares, so a 2x3 or irregular physical room looks like a matrix of compartments instead of one room.

Future floor art must be lower-contrast at cell edges and visually blend across neighbouring cells. Variation belongs inside the tile, not at the perimeter.

### 3. Walls look like a grid cage
The current wall language is too thin/repetitive and follows individual cell boundaries too mechanically. Even when geometry is technically correct, the room silhouette does not dominate.

Future walls should visually establish a strong outer room perimeter while same-room joins disappear. The viewer should perceive one room shape first and the underlying 32px construction only on close inspection.

### 4. Connections are authored at the wrong visual level
Current connection sprites look like small symbols attached to one cell edge rather than architectural openings between two spaces.

Specific failures:
- `DOOR_OPEN` reads like loose wooden bars/planks rather than a doorway.
- `PASSAGE_OPEN` is too subtle and resembles a thin grey line.
- `DOOR_LOCKED` looks icon-like rather than integrated into the wall opening.
- orientation variants do not consistently read as the same architectural object.
- a connection belongs conceptually to the **shared boundary between two cells/rooms**, not visually to one cell interior.

The next design should still use 32x32 source pieces, but compose a doorway as a boundary treatment: both adjoining wall edges/opening state must agree, with the visible object centred on the shared edge.

### 5. Locked-state presentation is duplicated / detached
In the locked screenshot, the large lock indicator is visually detached from the actual connection. The map therefore communicates “some lock exists” rather than “this exact doorway is locked.”

There must be one clear lock identity located on the boundary it affects. Existing runtime marker/fallback and V2 connection art must not compete.

### 6. Blocked route is too small and abstract in the map
The red X technically maps the state but is difficult to parse at the current map scale. It reads like a tiny symbol inside a cell rather than a blocked threshold.

A blocked state should span or sit directly on the shared opening boundary and remain legible at the chosen integer map scale. It should stay semantically abstract about the physical cause.

### 7. Unknown-room markers overpower structural art
Large yellow `?` markers dominate the tiny dungeon. This is partly a state-language problem rather than a room-asset problem, but it exposes the same scale mismatch.

Unknown/fog/reachable/current styling must be redesigned only after the structural room silhouette is strong enough.

### 8. Desktop/tablet composition gives the map too little visual authority
The surrounding UI panels, text and controls are visually much larger than the dungeon. The map should be one of the primary play surfaces, not a small diagnostic widget.

### 9. Mobile is vertically usable but not spatially satisfying
The mobile screenshot preserves functionality, but the dungeon is still tiny. The correct solution is a focused/pannable map viewport at integer scale, not shrinking the dungeon until all explored geometry fits at once.

## Decisions retained
Do **not** throw away:
- 32x32 logical source cell,
- 6px structural anchor contract as a technical starting point,
- 20px connection-opening contract as a logical opening coordinate,
- deterministic manifest/atlas build,
- individual source assets,
- canonical DOM/state mapping,
- stable IDs,
- nearest-neighbour integer scaling only.

These are engineering constraints, not art direction.

## Art direction reset for structural map
Next structural iteration must optimize for these perceptual goals:
1. **ROOM FIRST, GRID SECOND** — physical room silhouette must dominate the cell construction.
2. **BOUNDARY FIRST CONNECTIONS** — doors/passages live visually on the shared room boundary.
3. **BIGGER PLAY SURFACE** — use integer zoom/focus so the map occupies meaningful screen area.
4. **QUIET FLOOR, STRONG PERIMETER** — floor variation should not create cell seams; perimeter walls should define the room.
5. **ONE STATE SIGNAL PER FACT** — no duplicated/floating lock or blocker identities.
6. **NO CONTENT YET** — still no heroes, items, monsters, furniture or scene decoration.

## Next work package
Do not proceed to actor/item/monster production and do not polish fog/current state yet.

First create a **Structural Map V3 visual prototype** using the same technical grid contract but redesigned room art:
- new quiet floor family,
- stronger room perimeter system,
- boundary-centred doorway/passages,
- integer 2x presentation on tablet where space permits,
- pannable/focused 2x map on mobile,
- test only empty rooms + connections.

Acceptance requires manual screenshot review before any wider asset production.
