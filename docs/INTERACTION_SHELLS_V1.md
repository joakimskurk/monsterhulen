# Monsterhulen - Interaction Shells V1

Status: **design/spec only; no runtime implementation before UX5A physical green**
Updated: 2026-10-26

## Purpose
Interaction shells are focused player-facing overlays/popups for actions that benefit from being tangible: placing items, trading, solving a puzzle, starting combat, choosing a reward, etc.

They are **not** story logic. Storylets/Narrative Graph determine requirements, completion and world effects. The shell only presents and submits explicit actions against that state.

Core rule:

**Possessing a solution never silently performs the solution.**

## Shared shell contract
A shell declaration should conceptually include:

```text
shellId
shellType
targetId
playerVisibleTitle
playerVisiblePrompt
knowledgeRequirements[]
actions[]
slots[]? 
closePolicy
completionBehavior
```

Runtime interaction state should be saveable/reloadable and safe to undo where applicable.

Player shell must never expose narrator-only facts, hidden answers, unrevealed provider locations or future story-state.

## 1. SLOT_GATE / ASSEMBLY
Reference case: three colored stones/crystals open a door or activate a machine.

### Player flow
1. Story reveal establishes that the target has three sockets/slots.
2. Child taps target.
3. Shell opens with three visible slots.
4. Inventory resources remain unplaced until child chooses one.
5. Child selects/drags/taps an item into a slot.
6. Host/state validates the action.
7. Correct placement becomes persistent target state.
8. Wrong item is returned/not consumed; feedback is fictional rather than debug-like.
9. Child can close shell and return later; partial progress persists.
10. When all required slots are satisfied, either:
   - Storylet completes immediately **only if explicitly authored**, or
   - a separate `AKTIVER`, `DREI`, `ÅPNE`, `TRYKK` etc. action becomes available.

### State example

```text
slot:red = EMPTY | CRYSTAL_RED
slot:blue = EMPTY | CRYSTAL_BLUE
slot:yellow = EMPTY | CRYSTAL_YELLOW
assemblyState = PENDING | READY | ACTIVATED
```

### Important rules
- owning all resources never auto-fills slots,
- slot visibility follows knowledge state,
- placed critical items may move from inventory into target-bound state rather than disappear generically,
- undo restores both target and inventory state atomically,
- save/reload preserves partial placement,
- Adventure Code / deterministic reconstruction should recreate initial slot requirements, not current session progress unless save-state carries it,
- a plausible alternate solution may be accepted by DM if Storylet permits it; canonical world effect still applies.

## 2. LOCKED_OBJECT / EXPLICIT ITEM USE
Reference case: keyed door.

Player sees locked target first. Owned key/resource is an affordance, not auto-use.

Possible actions:
- inspect target,
- close popup,
- choose inventory item to use,
- child proposes another plan and DM handles it semantically.

Successful item use changes lock state but should not automatically traverse unless Storylet explicitly says the action itself includes traversal.

## 3. NPC_DIALOGUE_FAVOR
Use when a character has a concrete want/task or authored dialogue state.

Player-facing shell may show:
- character portrait/name,
- current visible request,
- child-facing prompt such as `HVA VIL DU SI ELLER GJØRE?`,
- explicit hand-over/offer actions for known relevant resources **without making them the only allowed answer**,
- close/return later.

DM companion view shows:
- motive,
- actual requirements,
- provider context,
- open hints,
- `GODTA LØSNING`,
- uncertain-attempt trigger if needed,
- authored outcomes.

## 4. MERCHANT_TRADE
A focused exchange shell, not necessarily a full RPG shop.

Player may see:
- small curated stock,
- concrete asking price/trade,
- owned relevant valuables,
- `BYTT / KJØP / TILBY` actions,
- opportunity to speak instead of clicking a fixed purchase route.

DM view may expose:
- authored alternatives,
- acceptable trade categories,
- social bargain availability,
- fail-forward outcome on low negotiation result.

Critical goods require at least one guaranteed acquisition route independent of a single persuasion roll.

## 5. PUZZLE
Only for puzzle Storylets with actual causal purpose.

Shell can present:
- visual puzzle pieces,
- sequence buttons,
- slots,
- symbols,
- simple input,
- narrator hint controls.

Thinking itself does not trigger D6. A later risky execution may.

Puzzle completion applies only the authored result: open gate, reveal clue, free item, help NPC, etc. No generic progress reward.

## 6. COMBAT
Combat is opened only by DM from a Storylet with `combatAllowed=true` after fiction/child choice supports it.

Shell goals:
- clear child-friendly stakes,
- physical die input only,
- explicit enemy/encounter state,
- no graphic injury/death language,
- allow non-lethal resolution: surrender, flee, calm, distract, befriend, etc.

Do not show combat as the default answer just because it is available.

## 7. REWARD_CHOICE
Use only when the Storylet genuinely offers a choice.

Examples:
- choose one of two optional rewards,
- choose relationship payoff vs object,
- choose which clue to ask about.

Do not manufacture choices where there is one canonical critical resource.

## 8. SEARCH_INSPECT
Focused local inspection where a room/prop has a meaningful search state.

Must preserve:
- no loot detector UI,
- clues before hidden critical content,
- fail-forward,
- full-backpack preservation,
- critical find provider guarantee when relevant.

## Player vs DM presentation
Each shell has two conceptual views:

### Player
Only currently known fiction and permitted direct interactions.

### DM
Narrative semantics:
- why this shell exists,
- what is required,
- what is hidden/authored,
- what can be improvised,
- when dice are appropriate,
- what outcome/world effect follows,
- semantic override/accept controls.

## Display-only mode later
For detached non-touch screen:
- shell may display current player interaction,
- input can come from DM device or paired touch client,
- display surface remains read-only,
- no narrator metadata is serialized/rendered there.

## Action model
Shells submit typed actions rather than mutating state directly.

Examples:
- `PLACE_RESOURCE(target, slot, item)`
- `USE_ITEM(target, item)`
- `BUY_ITEM(merchant, offer)`
- `TRADE_ITEM(merchant, offer)`
- `SUBMIT_PUZZLE_ACTION(...)`
- `START_COMBAT(encounter)`
- `ACCEPT_REWARD(choice)`

Host/state layer validates preconditions and applies authored effects.

## Testing requirements
Automated:
- unrevealed slots not exposed,
- wrong item not consumed,
- correct item placement atomic,
- partial state persists save/reload,
- possession does not auto-place,
- full assembly does not skip separate activation if authored,
- undo restores both item and target state,
- repeated action ID is idempotent,
- player payload contains no narrator-only data.

Browser/touch:
- popup readable on iPad/mobile,
- close/reopen natural,
- accidental double tap safe,
- inventory-to-slot interaction understandable,
- partial progress obvious,
- DM can follow same scene state.

Physical/editorial:
- interaction feels like supporting tabletop play rather than forcing a videogame solution,
- child still proposes unlisted plans,
- DM understands when shell is a convenience vs hard story rule.
