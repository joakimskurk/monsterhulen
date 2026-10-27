# Monsterhulen — Connection Runtime Proof V2

Updated: 2026-10-27
Branch: `visual/visual-system-v1-prep`
Status: **PATCH-15 VISUAL PROOF ONLY — ACTIVE UX5A RUNTIME UNCHANGED**

## Purpose
Apply Empty Rooms V2 plus canonical connection visuals to the exact patch-15 DOM without changing dungeon generation, movement rules, story state or save semantics.

Exact patch-15 base SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

## Runtime composition
Implementation files:
- `visual/tileset-connections-v2.css`
- `visual/tileset-connections-v2.js`
- `tests/QA_CONNECTION_RUNTIME_INTEGRATION_V2.js`

For each visible runtime cell the layer:
1. composes deterministic floor,
2. reads same-room join geometry,
3. reads canonical `i.doorN/E/S/W` elements already rendered by patch 15,
4. suppresses the generic wall on a connection edge,
5. places the matching connection sprite,
6. keeps canonical map buttons/markers above structural layers.

The old 4px yellow door line remains in DOM as a state sensor but is visually hidden.

## Canonical mapping
- `.locked` -> `door_locked`
- `.shortcut` or `.secret` -> `passage_open`
- ordinary traversable connection -> `door_open`
- current-room direction whose canonical movement control begins with `×` -> `route_blocked`

The integration does not access hidden runtime `state` bindings, does not call gameplay `move()` and does not mutate `revealed`, `unlocked`, inventory, encounters or topology.

## Verification
Connection binary/geometry: **16 / 16 PASS**.

Connection asset static contract: **18 PASS / 0 FAIL**.

Runtime static contract `tests/QA_CONNECTION_RUNTIME_INTEGRATION_V2.js`: **17 PASS / 0 FAIL**.

Fresh Chromium exact patch-15 + room/connection V2: **17 PASS / 0 FAIL**.

Browser coverage includes adventure start, room/connection layer application, exact 32px PNGs and CSS cells, canonical door-state mapping, old-line replacement without deleting canonical DOM, normal legal exploration/rerenders and tablet/mobile overflow checks.

A legal UI exploration run reached a real locked story connection. A separate legal UI run reached an actual `blocksForward` trap state and displayed the abstract blocked-route X without debug game-state mutation.

CDP still uses the established in-memory localStorage shim. Native persistence/clipboard and physical touch are not certified by this visual proof.

## Tested local deliverables
Standalone HTML SHA-256:
`3ca61d5cb668a889c85c3397a5f69d208086d4923c322a6512d962863a03c7fb`

Split implementation ZIP SHA-256:
`73a2d1e0e97093e3f3e5a70d6441ab46b5ccb746684c7689df6900f9bbb2ad08`

Representative tablet capture SHA-256:
`3b292ddbf10de8fca6d205ef55d008558a82f73249563c17c6c1cae91f556fe1`

Representative mobile capture SHA-256:
`70f18e2d80c20d87e2018c4da6ada8d9ce1b4db7076470a73edb024143846273`

Actual locked-state capture SHA-256:
`4340df08f69a01a256504490b33214f5bcce240350c8b254d598791899709541`

Actual blocked-route capture SHA-256:
`111b758100a71dfe1207862849ac57cbb645cceaa901a373c80366fd08b15389`

## Boundary / next step
This completes the first empty dungeon structural renderer:

`floor -> room border/corners -> canonical connection state -> runtime fog/interaction state`

No content assets have been added.

Next action is editorial review of the combined empty-dungeon renderer. If accepted, refine existing fog/current/reachable/unknown presentation from runtime/CSS state before producing heroes/items/monsters.
