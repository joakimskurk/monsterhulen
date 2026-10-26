# MONSTERHULEN - DECISIONS

Only durable decisions that would be costly or confusing to lose belong here.

## 2026-10-26 - Intentional narrator improvisation is an explicit authored mode
Improvisation is allowed and useful, but it must be declared rather than inferred from missing content.

If a scene intentionally leaves a detail open, narrator mode must tell Forteller:
- there is no hidden app answer or larger predetermined plan for that detail,
- what kind of thing they are invited to invent,
- what boundaries protect tracked story logic.

Ambient improvisation may add atmosphere, a side discovery or an optional hint. It may not create a new mandatory prerequisite, contradict known state or silently become critical causal logic.

This rule carries into Narrative Graph V1. Storylets may include bounded narrator-improvisation fields for color/detail, but critical `requires`, `completion`, `payoff` and `worldEffects` must remain authored and tracked. The player-facing fiction does not need meta language; the explicit handoff is for Forteller.

`BOKA SOM SKRIVER TILBAKE` is the UX5A reference: there is intentionally no hidden sentence; Forteller invents it within a safe frame.

## 2026-10-26 - Encounter mechanics require a fictional purpose contract
An encounter may not receive mechanics merely because its type supports them. Before a generated non-treasure encounter is usable it must state:
- `purpose`: what role this scene serves,
- `stakes`: what is actually affected while unresolved,
- `resolvedWhen`: the fictional condition that counts as resolution,
- `payoff`: what changes when resolution happens.

A progress track is allowed only when the content explicitly authors meaningful `progressStages`. Generic 3/4-step duration is forbidden. The narrator must never be asked to invent filler actions just to fill boxes.

Obstacles must have real world-state consequences. A generated trap may block the route onward while active, but must allow retreat; resolving it must visibly restore access. `REGNBUENETTET` is the reference case: it blocks forward travel, one credible plan may be enough, and resolution frees the route.

Ambient puzzles are subject to the same rule. A random puzzle may not be attached to a generic `MYSTISK` encounter merely because both content types exist. A puzzle needs an authored contextual role; solving it changes only the state the fiction says it changes.

This supersedes the earlier UX5A assumption that all generated non-treasure encounters should have generic 3/4 progress steps. The goal of avoiding one-roll scene deletion remains, but the replacement is authored semantics rather than arbitrary duration.

This rule also applies to Narrative Graph V1: storylets and encounter-like nodes must expose purpose, stakes, resolution condition and payoff/world effect. Graph validity alone is not enough if a node has no meaningful function in play.

## 2026-10-26 - One visible location identity per room
Generated rooms may retain internal zone/biome metadata for deterministic generation, tone and authoring, but player-facing UI must not present room name and zone name as competing location names. The canonical visible place identity is the room name.

## 2026-10-26 - Obstacles present problems before the app applies possessed solutions
Possessing the authored solution does not mean the app should automatically use it when the obstacle is tapped.

For a keyed story door:
- tapping only establishes that it is locked,
- app does not announce the matching key as the answer,
- child proposes an action,
- scenario key is protected but has explicit `BRUK`,
- matching key beside door opens but does not traverse,
- narrator may give an open backpack hint if needed.

This is a child-agency rule. Authored solutions are not a closed answer list. Hard story gates still cannot be bypassed by lucky dice or accidental navigation, but a plausible free-form solution may be accepted when fiction supports it.

## 2026-10-26 - Critical stories use Narrative Graph + curated Storylets
Live playtest of `CRYSTAL_MACHINE` showed structurally valid placement is not enough. Three required parts can still feel like unrelated pickups.

Critical story generation will use a hybrid model:
- Adventure Blueprints define large dramatic structure,
- Narrative Graph defines causal story functions, dependencies, player knowledge and payoff,
- humans curate Storylets and compatibility rules,
- seed chooses/places only compatible Storylets,
- ambient procedural content is added only after critical graph validity.

Every critical objective uses `SETUP -> SIGNAL -> ACTION -> PAYOFF`. Truth and player knowledge are separate. Generic UX5A optional finds cannot satisfy critical requirements. Required hidden/search content has clue + fail-forward. Guardians have authored non-combat affordances. Three-part collect defaults to varied acquisition families.

`SKYGGEHEKSA` exposed the temporal form: a beat may not first activate after the objective it exists to affect is already resolved. Narrative Graph therefore uses explicit phases and expiry/transform rules.

`CRYSTAL_MACHINE` is the first reference experiment: signalled hidden crystal, NPC-favor crystal with real dependency, guardian crystal with non-combat possibilities, then deliberate return/assembly before gate.

If manual playtest still requires frequent narrator repair, prefer a more hand-authored scenario bank rather than preserving procedural variation at story-quality cost.

Implementation is blocked until UX5A physical device testing is green and UX5A is merged to `main`. UX5B is deferred until Narrative Graph V1 is proven.

## 2026-10-26 - Dice report uncertainty; fiction resolves encounters
A physical die result reports the uncertain outcome of the child's current attempt. It may not automatically remove a normal encounter, satisfy an unmet prerequisite, advance a generic duration meter or remove a monster heart.

Monster combat uses explicit hearts only after the child chooses combat: fresh normal monsters use 3 hearts and `SPENNING` monsters use 4. Outside combat, resolution is determined by the encounter's authored `resolvedWhen`. If an encounter has authored stages, UI may track them; otherwise one genuinely sufficient plan may resolve it directly.

A clever solution may be decisive, but a lucky 5/6 is not itself a universal one-roll victory.

## 2026-10-26 - Searchable-room finds are optional affordances
Room search may reveal curated useful objects, but these are side resources, never hidden mandatory scenario keys. UI must not reveal loot rooms in advance. Uncertain search uses physical D6; low results fail forward with stronger information. A full backpack may not destroy a revealed find.

## 2026-10-26 - Finales must be earned
Every curated Adventure Blueprint has an explicit progression gate. Prerequisites must be reachable, cannot be permanently lost, and high die results cannot bypass unmet gates. Failure remains fail-forward and may not softlock the blueprint.

## 2026-10-26 - Secret doors are discoveries, not free map exits
Secret doors are hidden until discovered. Uncertain investigation uses physical D6 and stronger low-result clues. Secret doors and shortcuts may never bypass critical progression.

## 2026-10-26 - Story quality beats combinatorial volume
Monsterhulen optimizes for coherent, memorable adventures. A few strong curated adventures are preferable to thousands of merely valid combinations. Seed variation is allowed only where it cannot break critical premise, dependencies, timing or payoff. Do not expand the blueprint bank before manual quality review.

## 2026-10-26 - Adventure Code is offline-first and versioned
Adventure Code V1 uses protocol tag `MH1` and carries successful layout seed + blueprint ID so another device can reconstruct the same curated plan without live network sync.

## 2026-10-23 - GitHub is the permanent source of truth
`joakimskurk/monsterhulen` is the durable project workspace. Chat is temporary. Critical state, decisions, tests and continuation points must exist in repo.

## 2026-10-22 - Product name is Monsterhulen
Visible product name is **Monsterhulen**. Internal Eventyr*/HulerCharacterSystem names remain unless migration has concrete value.

## 2026-10-22 - Save migration remains backward compatible
Canonical storage key is `monsterhulen_v120`; `eventyrkryper_v100` is first legacy key. State schema remains 12. Legacy storage is normalized/copied forward rather than silently destroyed. Active legacy combat must not be healed during migration.

## 2026-10-21 - Physical dice are core interaction
App never rolls dice digitally. Uncertain action uses physical 1D6. Relevant `EKSTRA GOD PÅ` uses physical 2D6, highest die. Exact physical face is recorded.

## 2026-10-21 - Identity and mechanics stay separate
Hero type/species, trait and start item are independent choices. Base hero art is state-neutral.

## 2026-10-21 - Items and companions are affordances, not bonuses
Items, lasting things, friends and pets open possibilities and narrator cues; they do not grant generic numeric bonuses or extra dice.

## 2026-10-21 - Puzzle solving is not a die check
Thinking/answering puzzle content does not require D6. A later risky execution may use normal physical dice rules.

## 2026-10-23 - Project-memory workflow is mandatory for now
At chat start, read canonical handoff files in repo order. After meaningful milestones, synchronize them before moving on.
