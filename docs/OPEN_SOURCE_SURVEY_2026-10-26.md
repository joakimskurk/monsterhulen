# Monsterhulen - Open Source Survey 2026-10-26

Status: **reference survey only; adopt nothing now**

Purpose: identify useful open-source patterns without destabilizing the current architecture or importing a framework before the story/state model is proven.

Important: licenses/maintenance were checked at this checkpoint, but must be re-verified before any future adoption.

## Decision

**No external framework/library is adopted by this checkpoint.**

Current Monsterhulen bottleneck is story/state semantics, not lack of generic dungeon technology. Replacing working systems now would add migration risk while UX5A and Narrative Graph are still unsettled.

Study patterns only.

---

## 1. boardgame.io

Repository: https://github.com/boardgameio/boardgame.io
License observed: MIT

Relevant ideas:
- explicit move/state-transition functions,
- multiplayer state synchronization,
- game phases,
- logs,
- time-travel / undo-redo concepts,
- view-layer agnostic client model.

Why it is interesting for Monsterhulen:
- close conceptual match to `ActionIntent -> validate -> apply state -> log`,
- useful reference for DM undo/action history,
- useful reference for authoritative shared-state thinking,
- phase model parallels Narrative Graph phases.

Why not adopt now:
- framework assumptions are broader than Monsterhulen needs,
- introduces networking/storage/game-engine architecture before our own state contract is stable,
- Monsterhulen is not primarily a standard turn-based board game,
- migration could distort current offline single-file/playtest workflow.

Recommendation: **study reducer/log/undo patterns later; no dependency now.**

---

## 2. Colyseus

Repository: https://github.com/colyseus/colyseus
License observed: MIT

Relevant ideas:
- authoritative multiplayer server,
- synchronized state,
- room/session model,
- reconnect support,
- client SDKs,
- server-controlled game logic.

Why it is interesting:
- strong conceptual match to future `DM Host / Player Client`,
- reconnect/state replication could inform Shared Session V1,
- reinforces single-authoritative-state design.

Why not adopt now:
- Node/server architecture is a significant platform commitment,
- our target is LAN-first/offline-friendly family play,
- current runtime is not yet built around a long-running local server,
- would be premature before action/state transitions and player-visible projection are stable.

Recommendation: **future transport spike candidate after Narrative Graph + DM action model are stable.** Compare against a much smaller local WebSocket/WebRTC solution before deciding.

---

## 3. rot.js

Repository: https://github.com/ondras/rot.js
License observed: BSD-3-Clause

Relevant ideas:
- classic roguelike map generation,
- seeded RNG,
- pathfinding,
- field of view / line of sight,
- browser-friendly JavaScript/TypeScript tooling.

Why it is interesting:
- mature reference implementation for dungeon algorithms,
- could be useful if future map topology/pathfinding needs exceed current implementation,
- prebuilt/browser-friendly formats exist.

Why not adopt now:
- current bottleneck is not low-level dungeon generation,
- replacing map generation could invalidate seeds/layout assumptions and current tests,
- Narrative Graph needs to constrain map placement rather than be subordinated to a new generator.

Recommendation: **algorithm/reference library only for now.** If a concrete map/pathfinding problem appears later, compare one isolated rot.js capability behind an adapter rather than replacing the map system.

---

## 4. Epoch Mapper

Repository: https://github.com/northbridgetechnology/Epoch-Mapper
License observed: MIT

Relevant ideas observed:
- browser dungeon authoring/player,
- events, quests, NPCs, items, shops, combat and saves,
- locked/keyed doors and switch-sealed interactions,
- deterministic/seeded systems,
- standalone HTML distribution,
- structured content database,
- undo in editor tooling,
- event/effect resolver patterns.

Why it is interesting:
- closest surveyed project to a feature-rich browser dungeon-crawler authoring system,
- useful reference for how quests/events/items/shops are represented,
- useful UX reference for interaction dialogs and standalone packaging.

Why not adopt now:
- it is a large full engine with a very different product goal,
- Next.js/React/Tailwind stack would be a major migration,
- includes many systems Monsterhulen intentionally does not want (traditional stats/equipment/economy/combat complexity),
- importing it would likely make child-led tabletop narration harder rather than easier.

Recommendation: **study selected schema/interaction ideas manually; do not integrate the engine.**

---

## 5. Small JavaScript dungeon generators

Examples seen in survey include repositories such as:
- https://github.com/domasx2/dungeon-generator
- https://github.com/mtancoigne/js-map-generation

Interesting ideas:
- seeded generation,
- tagged/predefined rooms,
- room/corridor topology,
- random object placement.

Why not adopt:
- Monsterhulen already has a working procedural map path,
- these projects do not solve the current causal/story problem,
- replacing map code now risks regression without meaningful product gain.

Recommendation: no action.

---

## Architecture lessons worth borrowing without code

### From boardgame.io
- pure-ish move/state-transition boundary,
- explicit logs,
- undo as a first-class concept,
- phase-aware rules.

### From Colyseus
- one authoritative host,
- clients request rather than directly mutate,
- reconnect from authoritative state,
- stable session semantics.

### From rot.js
- keep procedural algorithms modular and independently testable,
- deterministic RNG is valuable.

### From Epoch Mapper
- separate content schema from runtime presentation,
- explicit event/effect resolution,
- standalone distribution can coexist with structured internal state,
- rich engine features are not automatically appropriate product features.

---

## Future dependency/adoption gate

Before adopting any external library/framework, create a small ADR/spike answering:
1. What exact problem does it solve that current code cannot solve cleanly?
2. Can we use only one isolated capability?
3. License and attribution requirements?
4. Maintenance/activity/security status?
5. Bundle size and offline implications?
6. Impact on single-file/static distribution?
7. Impact on save compatibility and stable IDs?
8. Impact on deterministic Adventure Code behavior?
9. Impact on LAN-first Shared Session requirement?
10. Exit/migration strategy if dependency is abandoned?

Default answer remains **do not adopt** unless concrete evidence shows clear value.
