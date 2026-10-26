# MONSTERHULEN - DECISIONS

Only durable decisions that would be costly or confusing to lose belong here.

## 2026-10-26 - Interaction shells present explicit actions; they do not own story logic
Some story actions should use focused player-facing popups/overlays (“interaction shells”), but the shell is presentation + action submission, not a source of hidden requirements or completion rules.

Reference: a gate/machine requiring red, blue and yellow stones/crystals.
- required slots become visible only after the story reveals them,
- owning the matching resources never auto-fills the slots,
- child explicitly places resources one at a time,
- wrong resource is not silently consumed,
- partial placement persists when fiction supports it,
- all slots filled either completes the Storylet or enables a separate authored activation action,
- the promised world effect must actually open/activate/change the target,
- future undo must restore target state and inventory atomically.

This generalizes the existing child-agency rule: **possessing a solution is not performing the action.**

Initial shell families may include slot/assembly, locked-object item use, NPC favor/dialogue, merchant/trade, puzzle, combat, reward choice and search/inspect. Player shells may expose only currently known player-visible state and must never leak narrator-only facts or hidden answers.

## 2026-10-26 - No external game/dungeon framework is adopted during current architecture transition
A limited open-source survey identified useful reference projects, but no dependency is adopted now.

Study-only candidates:
- `boardgame.io` for move/state-transition, logs, time-travel/undo and multiplayer patterns,
- `Colyseus` for authoritative state sync/reconnect patterns,
- `rot.js` for classic roguelike generation/pathfinding/RNG algorithms,
- `Epoch Mapper` for structured dungeon events/quests/interactions and standalone-player patterns.

Current bottleneck is story/state semantics, not missing generic dungeon technology. Importing or replacing frameworks before Narrative Graph and the canonical action model are proven would add migration risk.

Any future adoption requires an explicit ADR/spike covering exact value, license, maintenance, bundle/offline impact, save compatibility, Adventure Code determinism, LAN/shared-session implications and an exit strategy.

## 2026-10-26 - Critical requirements have explicit reachable provider routes
A requirement and its acquisition path are separate graph concepts. Storylets may consume or require resources/states, while provider Storylets supply them.

Initial provider families: `ROOM_FIND`, `MERCHANT_PURCHASE`, `TRADE`, `SOCIAL_BARGAIN`, `NPC_REWARD`, `PUZZLE_REWARD`, `SEARCH_SECRET`, and explicitly allowed starting/owned resources.

Optional items may be seeded/random when thematically plausible. Critical resources may still appear as natural room finds, but at least one provider route must be reserved and validator-proven reachable before the consuming Storylet. Critical progression may not rely on lucky spawn, an unreachable merchant price, a circular favor, or one persuasion roll.

Merchants may trade concrete coins/treasures/items/favors rather than requiring a large abstract currency system. `SOCIAL_BARGAIN` is free-form: child proposes the argument, DM triggers physical dice only if outcome is genuinely uncertain, and low results fail forward rather than permanently removing a required resource.

`SUMPTROLLET requires FOOD` and variable `BROTROLLET` requests are reference examples: request is bound before map materialization, and at least one compatible provider is guaranteed earlier/reachable.

## 2026-10-26 - DM resolves authored state; combat is optional capability
Narrator/DM UI must expose semantic state: purpose, requirement, provider route, solve condition and outcome. A plausible child solution may be explicitly accepted by DM while applying the same authored world effects, avoiding manual flag/inventory edits.

Negotiation can use a DM-triggered physical uncertainty action. Combat is not automatic for monsters/guards/guardians: only compatible Storylets expose `combatAllowed`, and DM explicitly starts combat after the child proposes it or the fiction supports it. Critical guardians normally retain a non-combat route. Combat presentation remains child-friendly and can resolve through surrender, retreat, distraction, friendship or similar non-lethal states.

This action model is intended to support later undo/action history and shared-session sync.

## 2026-10-26 - Shared sessions are DM-hosted with one authoritative state
Future multiscreen/live play uses a **DM Host / Player Client** model. DM starts the session and owns authoritative story/world state. Detached player surfaces may be touch clients or display-only screens. Same-Wi-Fi/LAN-first is the target; player clients request actions and host validates/broadcasts canonical state. Reconnect must be idempotent and narrator-only information must never leak to player view.

DM undo uses reversible action/event history or state snapshots rather than ad hoc field edits. Adventure Code remains offline reconstruction/sharing, not live sync. This is a future package and must not jump ahead of UX5A/Narrative Graph.

## 2026-10-26 - Encounter subject and narrative role are separate
A memorable fictional subject is not permanently tied to one encounter function. The **subject** answers “what is this?”; the **Storylet role** answers “what does it do in this adventure?”.

`BOKA SOM SKRIVER TILBAKE` may support authored roles such as optional narrator-improv, NPC-like dialogue, tracked clue source, puzzle/gate carrier or item/reward wrapper. Compatible magical subjects such as talking dolls, living portraits, enchanted mirrors or statues may use the same pattern.

This is controlled variation, not random role assignment. Subject/role combinations must pass compatibility and purpose checks. Critical roles remain authored/tracked, subject and Storylet IDs remain separate/stable, and repeated use of the same subject should be penalized unless repetition itself is meaningful.

## 2026-10-26 - Intentional narrator improvisation is an explicit authored mode
Improvisation is allowed and useful, but must be declared rather than inferred from missing content. Narrator mode says there is no hidden app answer for open details, states what Forteller may invent, and protects tracked critical logic. Ambient improv may add atmosphere, side discovery or optional hint; it may not create mandatory prerequisites or contradict state.

`BOKA SOM SKRIVER TILBAKE` is the reference case.

## 2026-10-26 - Encounter mechanics require a fictional purpose contract
Interactive encounters/storylets need `purpose`, `stakes`, `resolvedWhen`, `payoff` and coherent world effects. Progress tracks require authored meaningful stages. Blocking obstacles must actually block relevant state and resolution must release/change that state. Random puzzle attachment without contextual role is invalid.

## 2026-10-26 - One visible location identity per room
Generated rooms may retain internal zone/biome metadata, but player-facing UI uses one canonical visible room name.

## 2026-10-26 - Obstacles present problems before the app applies possessed solutions
Possessing a solution makes an action possible; it does not perform it. Keyed gates remain locked until the child explicitly chooses key use. Authored approaches are affordances, not a closed answer list.

## 2026-10-26 - Critical stories use Narrative Graph + curated Storylets
Critical story generation uses Adventure Blueprints + Narrative Graph + curated Storylet Matrix. Required beats have setup/signal/action/payoff, truth and player knowledge are separate, critical hidden content has clues/fail-forward, guardians have non-combat affordances, and dramatic phases/expiry prevent obsolete complications.

`CRYSTAL_MACHINE` is the first reference experiment. Do not implement runtime until UX5A is physically green and merged. Do not convert another blueprint before the experiment passes its gates.

## 2026-10-26 - Dice report uncertainty; fiction resolves encounters
A physical die reports uncertainty in the current attempt. It does not automatically satisfy unmet requirements, resolve whole encounters, advance generic duration meters or remove monster hearts. Monster combat uses explicit state only after combat is chosen.

## 2026-10-26 - Searchable-room finds are optional affordances
Generic UX5A search finds are side resources and never hidden mandatory scenario keys. Full backpack must not destroy revealed finds. Critical provider routes are modeled separately in Narrative Graph.

## 2026-10-26 - Finales must be earned
Finale access requires explicit reachable prerequisites; dice and secret shortcuts cannot bypass unmet gates. Failure is fail-forward.

## 2026-10-26 - Secret doors are discoveries, not free map exits
Secret doors are hidden until discovered and may never bypass critical progression.

## 2026-10-26 - Story quality beats combinatorial volume
Coherent curated adventures outrank combinatorial count. Do not expand blueprint bank before manual review.

## 2026-10-26 - Adventure Code is offline-first and versioned
Adventure Code V1 uses `MH1` and reconstructs the same curated adventure plan; it is not live synchronization.

## 2026-10-23 - GitHub is the permanent source of truth
`joakimskurk/monsterhulen` is durable project state; chat is temporary.

## 2026-10-22 - Product name is Monsterhulen
Visible product name is Monsterhulen.

## 2026-10-22 - Save migration remains backward compatible
Canonical storage key remains `monsterhulen_v120`; schema 12 and stable IDs remain binding until an intentional migration.

## 2026-10-21 - Physical dice are core interaction
App never rolls digitally. 1D6/trait-enabled 2D6 are physical.

## 2026-10-21 - Identity and mechanics stay separate
Hero type/species, trait and start item are independent.

## 2026-10-21 - Items and companions are affordances, not bonuses
Items/friends/pets create possibilities, not generic numeric bonuses.

## 2026-10-21 - Puzzle solving is not a die check
Thinking/answering puzzles needs no die; risky execution may.

## 2026-10-23 - Project-memory workflow is mandatory for now
Read canonical handoff files at chat start and synchronize them at meaningful checkpoints.
