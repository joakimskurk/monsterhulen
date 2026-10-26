# MONSTERHULEN - PLAYTEST FINDINGS

Updated: 2026-10-26
Status: active UX findings from live child/DM playtest. These are not yet locked implementation details, but must be addressed before the next major content lock.

## 1. Encounters are too ambiguous for the DM
Observed:
- It is not always clear whether the app's listed consequences are mandatory, suggestions, or whether the DM should invent consequences freely.
- The child may propose actions that are not represented by the generated encounter.
- Items can feel like they are "used up" even when they should remain available narratively.
- A DM may want to know important later dependencies, clues and scenario keys before improvising away something useful.

Direction to implement/test:
- Consequences shown by the app should be clearly labelled as suggestions for the narrator, not closed outcomes.
- A FREE ROLL / FRITT KAST path should always be available for any action the child invents.
- Physical dice rules remain unchanged: easy/safe actions just work; uncertain actions use 1D6; relevant EKSTRA GOD PÅ uses 2D6 and highest die.
- Consider a DM adventure plan/spoiler overview that shows important scenario dependencies, clues, keys and useful callbacks.
- Consider a deterministic adventure code/seed that lets a second device reconstruct the same DM plan.
- Inventory should distinguish using an item in the fiction from actually consuming/removing it.

## 2. Map navigation is not child-intuitive enough
Observed:
- Arrow controls are not the first thing a child tries.
- The immediate instinct is to tap directly on the map where the next room should be.

Direction to implement/test:
- The map itself becomes the primary navigation surface.
- The current room is clearly highlighted.
- Every reachable unexplored exit shows a large tappable `?` directly outside the corresponding door.
- Tapping the `?` moves into that adjacent room.
- A visited reachable room replaces `?` with its known room representation/icon.
- A locked exit shows a lock state, not `?`.
- Non-adjacent/unreachable rooms are not tappable.
- The `?` must reveal only that the exit is traversable, not what content waits beyond it.
- Direction arrows may remain as a secondary/fallback control, but should no longer be the primary navigation model.

## Priority
These findings affect the core table-play UX and should be resolved before additional content/art is treated as locked. Repository-health work remains the current technical gate, but the next implementation package after that should include these UX changes before or together with V0.12.4 content work.
