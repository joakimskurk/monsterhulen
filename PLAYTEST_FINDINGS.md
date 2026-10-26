# MONSTERHULEN - PLAYTEST FINDINGS

Updated: 2026-10-26
Status: active UX findings from live child/DM playtest. These are not locked until manually playtested.

## 1. Encounters are too ambiguous for the DM
Observed:
- It is not always clear whether the app's listed consequences are mandatory, suggestions, or whether the DM should invent consequences freely.
- The child may propose actions that are not represented by the generated encounter.
- Items can feel like they are "used up" even when they should remain available narratively.
- A DM may want to know important later dependencies, clues and scenario keys before improvising away something useful.

Implemented for playtest in `patches/v0.12.3_playtest_dm_free_roll_inventory.patch`:
- Encounter and climax consequences are explicitly labelled as narrator suggestions, not fixed outcomes.
- `FRITT KAST` is available in the narrator panel for any uncertain action the child invents.
- FRITT KAST keeps the physical dice rule: easy/safe just works, uncertain = 1D6, relevant EKSTRA GOD PÅ = 2D6 highest.
- FRITT KAST contains no digital RNG.
- Inventory `BRUK` no longer removes an item.
- `BRUK OPP / LEGG FRA` is the explicit removal action for ordinary bag items.
- Scenario-critical items remain protected from removal.

Still to design/test:
- Expanded DM adventure plan/spoiler overview with important dependencies, clues, keys and useful callbacks.
- Deterministic adventure code/seed contract so a second device can reconstruct the same DM plan.

## 2. Map navigation is not child-intuitive enough
Observed:
- Arrow controls are not the first thing a child tries.
- The immediate instinct is to tap directly on the map where the next room should be.

Implemented for playtest in `patches/v0.12.3_playtest_map_navigation.patch`:
- The map is now the primary navigation surface.
- Reachable unexplored exits show a tappable `?` on the fog cell immediately beyond the door.
- Locked exits show a tappable lock state instead of `?`.
- Revealed adjacent rooms are tappable directly on the map.
- Non-adjacent rooms are not made tappable.
- Existing direction arrows remain as secondary fallback controls.
- Existing `move()` logic is unchanged, so keys, locks, scenario progression and save behavior still use the known code path.

## Verification so far
- 11 inline JavaScript blocks: 0 syntax errors.
- Targeted map navigation logic: 3/3 PASS (`?`, lock, known adjacent room all route to the expected existing move direction).
- Existing `move()` function is byte-identical to V0.12.3.
- FRITT KAST uses the existing three physical result bands and no digital die/RNG.
- `BRUK` handler does not splice/remove inventory; only the explicit drop/consume handler does.
- Browser/mobile interaction is NOT certified by automation in this environment because browser navigation is blocked by environment policy. Manual child/DM playtest is required before lock.

## Priority
These UX changes now take priority over locking additional content/art. Repository-health remains an independent technical gate, but the playtest patches are stored in GitHub so the implementation is not chat-only.
