# MONSTERHULEN - DECISIONS

Only durable decisions that would be costly or confusing to lose belong here.

Canonical V2 design: `docs/v2/SYSTEM_DESIGN_V2.md`. Content matrix draft: `docs/v2/CONTENT_MATRIX_V2.md`. Background analysis: `docs/reviews/2026-10-27_*`.

## 2026-10-28 - End of the run and Helteboka (M5 in the prototype)
Discussed in a simulated workshop (`docs/v2/workshops/2026-10-28_helteboka.md`, decisions B1–B6; roles simulated by Claude, not real people).

- A run ends when the goal is reached, and for REDD and LEVER when the child is also back at the entrance. Both screens show a short child-facing summary; GI LIKEVEL is never mentioned.
- Friends who joined go into Helteboka automatically. After each finished run the child chooses one of two lasting TING she does not have yet.
- Before a run the child may bring at most one friend and one TING. The generator ignores them: the run is still proven solvable without them, and what is brought is an extra way. The DM card shows where it fits. A lasting TING is never used up.
- No unlocking for now; the collection is the progression.
- In the prototype the book lives on the DM device; the iPad shows it and sends requests, never changes it.

Rationale: M5's exit is that the child wants another run and the book shows what she did. Limiting what is brought keeps the challenge; keeping the proof independent of it keeps every run solvable.

## 2026-10-28 - Missions are composed from parts; classics keep a fixed theme
Owner concern: fixed mission names feel repetitive; wanted variations such as glass, gold or bone keys, magic objects, or a rhyme ("mellon"). Discussed in a simulated workshop (`docs/v2/workshops/2026-10-28_sammensatte_oppdrag.md`, decisions A1–A8; the participants are roles Claude simulated, not real people).

- A composed mission is *type × goal × what closes × what opens × route*, built from `content/themes.json`. The theme depends only on mission type and code (seed), not on attempt or length, so the same code shows the same title on every device.
- FINN has four openers with different play: **key** (material weighted towards zones on the route), **magic object** (fits a shape in the door), **rhyme** (three rhyming lines found separately and said aloud at the door; on short runs the first line is over the door), **element** (a carry tag such as music, light, warmth, water).
- Chests hold the treasure in the goal room and are the goal; the last gate is then a normal blocker.
- Every goal may get a need from its part (A9): a creature may need freeing before calming (never with a calm tag), a machine may lack a named part, a delivery place may need something to reach, an exit may need something to work. About half of the parts have no such need. The DM can accept needs one at a time; the iPad shows only how many are met.
- Word forms are written out in data; code only capitalises.
- The DM device avoids the goal and opener of the last three runs when choosing a new code.
- The existing five missions stay as classics with fixed themes. The ten fixed missions added earlier on 2026-10-28 were removed; their content became parts.

Rationale: the name is the first thing the child meets, so a fixed name makes every run feel alike even when the chain underneath differs. Composition also changes *what you do* (find one thing, collect lines and speak, bring an element), not only the words. Every composed run is still proven by the playthrough automaton.

## 2026-10-27 - Direction: Monsterhulen is a systemic kids' roguelike, not an authored-story engine
Monsterhulen V2 generates each run from a bank of figures, obstacles, items, sources and companions that connect through a shared tag vocabulary. Variety comes from combining good building blocks; coherence comes from the connections being meaningful (water cools lava, food satisfies hunger) and from every run being proven solvable.

Narrative Graph V1 (`narrative/story-graph-v1-prep`) is **superseded as runtime architecture**. Its editorial subject reviews remain valuable source material for V2 cards. The four Adventure Blueprints become themed mission cards.

Rationale: all four V1 blueprints compiled to the same structure (place N things in spread rooms -> `FOUND_ALL` gate), and the Narrative Graph plan improved the inside of each fetch while growing a large rule set (30 invariants, matrix rules A–L) for one blueprint. Owner direction 2026-10-27: a dungeon-crawler/roguelike for children with a large compatible matrix, where the DM narrates and improvises.

## 2026-10-27 - The matrix is a shared tag vocabulary, not a pair table
Every card describes itself: figures have `wants`, `weakness` (with a perceivable sign), `gives` and optional companion abilities; items carry tags; room sources give tags (often requiring a container); a few recipes combine tags. Cards connect when tags match. Explicit pair rules exist only for exceptions (forbidden combinations, special reactions).

Monsters, people, friends and pets are one figure bank with a `disposition` field (friendly/neutral/hostile).

Acquisition source types are the main gameplay variation axis: lying, hidden, trade, reward, companion ability, environment+container, recipe. A chain should not repeat the same source type.

## 2026-10-27 - Generation order: chain first, zones second, automated playthrough decides
Runs are generated as: mission -> dependency chain backwards from goal -> map with obstacle cut-edges forming zones -> placement so everything needed to open zone N lies in zone < N -> merchant stock from chain needs -> optional alternatives and ambient content -> **automated playthrough** using only guaranteed sources -> bypass check with all secrets/shortcuts open and obstacles closed. A run that fails is regenerated.

The playthrough automaton is the primary structural test (>=1000 seeds per mission type). It replaces placement-by-spread-rooms and most V1 structural validators. It must use the same `apply(state, action)` as runtime.

Rationale: V1 placed content without knowing its dependencies, so an NPC could end up behind the door it was meant to help open.

## 2026-10-27 - The DM can always resolve; the app records what became true
LØS, GI LIKEVEL, KORT NED, LEGG TIL and ANGRE are always available. Any figure, obstacle or mission requirement can be resolved by the DM with an improvised reason. These are recorded as normal typed actions so state stays true.

This revises "critical state never depends on untracked improv": improvisation decides *how*; the app records *what*. The generator still guarantees one solvable route so the DM never *has* to rescue a run.

## 2026-10-27 - Two devices are a core requirement
Play uses a DM device (authoritative state, DM cards, dice entry, overrides) and the child's iPad in a fullscreen browser (map, room, search/take, give/use, choices). The child surface never receives DM-only data; its payload is built by an explicit filter.

Transport: internet relay is acceptable (owner: internet is always available). Recommended: Firebase Realtime Database with anonymous auth, per-session code, 24 h expiry; requests carry unique `actionId` for idempotency. Supabase Realtime is the alternative. Without network the DM device continues in single-device mode.

This moves the 2026-10-26 "Shared sessions are DM-hosted" decision from a late platform package to the core roadmap. The host/client model in that decision stands.

## 2026-10-27 - One runtime state and typed actions before new mechanics
All state changes go through `apply(state, action) -> {state, effects}` with six effect types (REVEAL, OPEN/CLOSE edge, TRANSFER item, DISPOSITION, MOVE figure, RESOLVE). Two devices, undo, DM overrides and the playthrough automaton all depend on it. Existing click handlers that mutate state directly are refactored first, with unchanged behaviour.

## 2026-10-27 - Runtime source lives in the repository as ordinary files
`index.html` and runtime assets must be committed as normal files and verified by hash from repository bytes. New work is ordinary commits, not patch files against an unavailable baseline. Until then repository health remains open and tests cannot be run from the repo.

## 2026-10-26 - Required resources use explicit provider routes, not hopeful random spawning
> **REFINED 2026-10-27:** still valid for the one guaranteed route. In V2 any item/companion/source with a matching tag may also solve the need; the generator guarantees one route and the playthrough automaton proves it. See V2 decisions above.
A Storylet requirement and the way that requirement can be obtained are separate graph concepts.

Initial provider families include:
- `ROOM_FIND`,
- `MERCHANT_PURCHASE`,
- `TRADE`,
- `SOCIAL_BARGAIN`,
- `NPC_REWARD`,
- `PUZZLE_REWARD`,
- `SEARCH_SECRET`,
- `STARTING_OR_OWNED_RESOURCE` only when explicitly allowed.

Food and ordinary items may appear semi-randomly in rooms when the location/scene makes thematic sense. Optional resources may be genuinely random. If a resource is required for critical progression, at least one acquisition route must instead be reserved/validated as reachable before the requirement. It may still *look* like a natural random room find to the player, but the story cannot depend on lucky spawning.

A merchant is a provider Storylet, not necessarily a separate abstract economy. A merchant may accept concrete coins, treasures, trade goods, favors or other authored values, and may also support conversation, clues or recurring-character roles.

`SOCIAL_BARGAIN` preserves free-form play: the child first says what they try; the DM may trigger a physical die interaction only if the negotiation outcome is genuinely uncertain. A low result should fail forward to another price, favor, trade or route. A critical resource may never be permanently locked behind one persuasion roll.

Example: if a `SUMPTROLLET` Storylet requires `FOOD`, generation must bind and validate at least one reachable food-provider route before placing/activating the troll gate. `BROTROLLET` may choose among authored desired-object variants, but the chosen request fixes its dependency and requires an earlier reachable provider.

## 2026-10-26 - DM controls resolve authored state; optional combat is a module
The narrator/DM surface must operate on story semantics rather than internal flags.

For authored encounters the DM should be able to see what the scene is, what it requires, where a requirement can be acquired, what counts as resolution, and what outcome/world effect follows. If the child proposes a plausible unlisted solution, the DM may explicitly accept it (`GODTA LØSNING` / equivalent); the Storylet's authored world effects are then applied so canonical graph state remains coherent.

Negotiation may expose a DM-triggered `FORHANDLE / USIKKERT FORSØK` action that records the real physical die only when uncertainty exists.

Combat is an optional resolution module, not the default meaning of a monster/guard/guardian. The child may propose fighting, but the DM explicitly starts combat only for Storylets marked `combatAllowed`. Critical guardians normally retain a non-combat authored route. Combat presentation is child-friendly and may end through surrender, retreat, distraction, friendship or another fictionally valid resolution rather than requiring a kill state.

This DM action model is also the basis for later action history/undo and shared-session synchronization.

## 2026-10-26 - Shared sessions are DM-hosted with one authoritative state
> **TIMING SUPERSEDED 2026-10-27:** the host/client model stands, but two devices are now a core requirement, not a late platform package. See "Two devices are a core requirement".
Future multiscreen/live play uses a **DM Host / Player Client** model.

- DM always starts the adventure/session.
- The DM host owns the authoritative live story/world/session state.
- A detached player surface may run as a touch client or display-only screen.
- Player clients request allowed actions; the host validates/applies them and broadcasts the resulting state.
- Same-Wi-Fi/LAN-first operation is the target so live family play does not require internet.
- Reconnect must restore current authoritative state without replaying actions.
- Stable action/event IDs are required so double taps/reconnect do not duplicate effects.
- Narrator-only information must never be sent/rendered as player-visible state.
- Adventure Code remains offline reconstruction/sharing; it is not the live-sync protocol.

The DM panel will also need explicit undo/action-history. Undo must operate on reversible state transitions/events/snapshots rather than ad hoc field edits, and corrected state must immediately synchronize to every player/display surface. Save compatibility and stable content/story IDs remain binding.

This is a future platform package, not the current work package. It must not jump ahead of UX5A or Narrative Graph V1; shared-session implementation should wait until the underlying story/world-state transitions are explicit and stable enough to synchronize and reverse safely.

## 2026-10-26 - Encounter subject and narrative role are separate
A memorable fictional subject is not permanently tied to one encounter function. The **subject** answers “what is this?”; the **role/storylet** answers “what does it do in this adventure?”.

Example: `BOKA SOM SKRIVER TILBAKE` may, in different authored appearances, be:
- an optional narrator-improvisation mystery,
- an NPC-like conversational figure with a want/motive,
- a source of a tracked clue,
- the carrier of an authored puzzle that opens a gate,
- the guardian/reward wrapper for an item.

The same principle may apply to compatible magical subjects such as a talking doll, living portrait, whispering statue, enchanted mirror or similar figures. This is a controlled variation mechanism, not permission to assign arbitrary roles randomly.

Rules:
- role must be fictionally compatible with the subject,
- critical roles are authored/tracked Storylets, never accidental ambient promotion,
- if a subject carries a puzzle, clue, item or gate function, the payload and payoff must be explicit,
- open narrator improvisation remains explicitly labelled and cannot create mandatory state,
- generator should penalize repeating the same subject within one adventure/recent play when other compatible subjects exist,
- stable subject identity and storylet/role identity remain separate so saves and authored logic can stay stable.

This separation is intended to create more variety from a curated bank without multiplying shallow content. Story quality and causal coherence still outrank combinatorial volume.

## 2026-10-26 - Intentional narrator improvisation must be explicit
> **REVISED 2026-10-27:** explicit improv labelling stands. The rule that critical state may never depend on improvisation is replaced by "The DM can always resolve; the app records what became true".
Improvisation is allowed and can be desirable, but it must be an authored mode rather than an accidental gap in the content.

If a scene intentionally leaves a detail for Forteller to invent, narrator mode must:
- clearly label that detail as Forteller-improvisation,
- state that the app has no hidden answer or larger predetermined plan for that detail,
- say what kind of thing Forteller should invent,
- give enough boundaries that the improvisation cannot silently rewrite the adventure's required logic.

Ambient improvisation may add atmosphere, a funny or mysterious side discovery, or an optional hint tied to facts already established in the adventure. It may **not** create a new mandatory story key, introduce an untracked prerequisite, contradict known app state, or pretend that the app has authored causal logic it does not actually have.

The child-facing view does not need meta text saying that something is improvised. This contract is for the narrator so the fiction can remain immersive while the DM knows what responsibility is theirs.

`BOKA SOM SKRIVER TILBAKE` is the reference case. There is intentionally no hidden sentence in the app. Forteller invents what the repeated words become, and the narrator panel explicitly says so.

Critical Storylets may contain bounded improvisational color, but critical prerequisites, completion conditions, payoff and world effects must remain explicit and tracked.

## 2026-10-26 - Encounter mechanics require a fictional purpose contract
An encounter may not receive mechanics merely because its type supports them. Before a generated non-treasure encounter is considered usable it must state:
- `purpose`: what role this scene serves,
- `stakes`: what is actually affected while unresolved,
- `resolvedWhen`: the fictional condition that counts as resolution,
- `payoff`: what changes when resolution happens.

A progress track is allowed only when the content explicitly authors meaningful `progressStages`. A generic 3/4-step duration track is forbidden. The narrator must never be asked to invent filler actions just to fill boxes.

Obstacles must have real world-state consequences. A generated trap may block the route onward while active, but must allow a safe retreat path; resolving it must visibly restore access. `REGNBUENETTET` is the first reference case: the net blocks forward travel, one credible plan may be enough to deal with it, and `HINDRINGEN ER LØST` actually frees the route.

Ambient puzzles are also subject to this rule. A random puzzle may not be attached to a generic `MYSTISK` encounter merely because both exist in the content bank. A puzzle needs an authored contextual role; solving it changes only the state the fiction says it changes.

This decision supersedes the earlier UX5A assumption that all generated non-treasure encounters should have generic 3/4 progress steps. The underlying goal remains: one lucky die result must not automatically erase a substantial encounter. The replacement is authored encounter semantics, not arbitrary duration.

## 2026-10-26 - One visible location identity per room
Generated rooms may retain internal zone/biome metadata for deterministic generation, tone and authoring, but the player-facing app must not present both the room name and zone name as competing location names.

The canonical visible place identity is the room name. Zone names remain internal metadata unless a future feature has a clearly labeled, non-competing use for them.

## 2026-10-26 - Obstacles present problems before the app applies possessed solutions
Possessing the authored solution to an obstacle does not mean the app should automatically use it when the obstacle is tapped.

For a keyed story door:
- tapping the locked door only establishes that it is locked,
- the app does not announce that the matching key in the backpack is the answer,
- the child gets to propose an action,
- the scenario key is protected from accidental disposal but has an explicit `BRUK` action,
- using the matching key beside the door opens it but does not traverse it,
- the narrator may give an open hint such as `KANSKJE DU HAR NOE I SEKKEN?` if the child is stuck.

This is a child-agency rule. The app presents constraints, clues and affordances; the child chooses what to try. Authored solutions are not a closed answer list. A hard story gate still cannot be bypassed by a lucky die roll or accidental navigation, but a genuinely plausible free-form solution may be accepted explicitly by the narrator when the fiction supports it.

## 2026-10-26 - Critical stories use Narrative Graph + curated Storylets
> **SUPERSEDED 2026-10-27** by "Direction: Monsterhulen is a systemic kids' roguelike". The playtest findings it records (causal disconnect, timing, availability is not action) remain valid and are addressed by tag connections, zone ordering and the playthrough automaton.
Live playtest of `CRYSTAL_MACHINE` showed that structurally valid placement is not enough. Three required parts placed safely in three rooms can still feel like unrelated pickups with no causal story.

Critical story generation will therefore move to a hybrid model:
- Adventure Blueprints define the large dramatic structure,
- a Narrative Graph defines causal story functions, dependencies, player knowledge and payoff,
- humans curate small Storylets and compatibility rules,
- seeded generation may choose and place only compatible Storylets,
- ambient procedural content is added only after the critical graph is valid.

Every critical objective must have `SETUP -> SIGNAL -> ACTION -> PAYOFF`. Truth and player knowledge are separate. Generic UX5A optional finds may never satisfy story-critical requirements. Critical hidden/search content must have explicit clues and fail-forward. Guardians must have at least one authored non-combat affordance. Three-part collect scenarios default to different play families rather than three copies of the same acquisition pattern.

Live playtest also showed the temporal version of the same problem: `SKYGGEHEKSA`, whose purpose was to make the main task harder, could be encountered after the task was already complete. Narrative Graph therefore has explicit dramatic phases and validity/expiry windows. A complication or antagonist may not first activate after the objective it exists to obstruct is resolved. Later reuse requires a separately authored role with new purpose.

The encounter-purpose finding generalizes the same architecture rule downward: Storylets and encounter-like graph nodes also need explicit purpose, stakes, resolution condition and payoff. Graph validity alone is not enough if a node does nothing meaningful in play.

`CRYSTAL_MACHINE` is the first reference experiment. The initial target is one signalled hidden crystal, one NPC-favor crystal with a real reachable dependency and one guardian crystal with non-combat possibilities, followed by deliberate return/assembly before the gate opens.

If manual playtest still requires frequent narrator repair after the Storylet Matrix is implemented, prefer a more hand-authored scenario bank rather than preserving procedural variation at the cost of story quality.

Implementation is blocked until UX5A physical device testing is green and UX5A has been merged to `main`. UX5B is deferred until Narrative Graph V1 is proven.

## 2026-10-26 - Dice report uncertainty; fiction resolves encounters
A physical die result reports the uncertain outcome of the child's current attempt. It may not automatically remove a normal encounter, satisfy an unmet story prerequisite, advance a generic duration meter or remove a monster heart.

Monster combat still uses explicit hearts only after the child chooses combat: fresh normal monsters use 3 hearts and `SPENNING` monsters use 4. Outside combat, resolution is determined by the encounter's authored `resolvedWhen` condition. If an encounter has explicit authored stages, the UI may track those stages; otherwise a genuinely sufficient single plan may resolve it directly.

This preserves free-form play: a clever solution may be decisive, but a lucky 5/6 is not itself a universal one-roll victory.

## 2026-10-26 - Searchable-room finds are optional affordances
Room search may reveal curated useful objects, but these finds are side resources, never hidden mandatory scenario keys. The UI must not reveal in advance which rooms contain loot. Uncertain search uses the physical D6 rule; low results fail forward with stronger information.

A revealed find is part of the room until collected. A full backpack may not destroy or silently consume it.

## 2026-10-26 - Finales must be earned
A story-critical finale may never be freely reachable just because the generated map places it nearby. Every curated Adventure Blueprint must have an explicit progression gate. The prerequisite must be reachable before the gate, cannot be permanently lost, and a high die result may never bypass an unmet gate.

The gate may be a scenario key, completed NPC task, solved puzzle, collected parts, clue chain, rescue or another explicit story flag. Failure must remain fail-forward and may not softlock the blueprint.

## 2026-10-26 - Secret doors are discoveries, not free map exits
A secret door is hidden until discovered. The child may investigate a clue in the fiction. If discovery is uncertain, use the normal physical D6 rule and record the actual die face. A low result gives a stronger clue but does not reveal the door; a successful discovery reveals the connection. Secret doors and shortcuts must never bypass a story-critical progression gate.

## 2026-10-26 - Story quality beats combinatorial volume
> **REVISED 2026-10-27:** coherence still beats volume, but coherence is now achieved through meaningful tag connections and proven solvability rather than few hand-authored blueprints.
Monsterhulen optimizes for coherent, memorable adventures, not for the largest possible number of procedural combinations. A few curated adventures that work very well are preferable to thousands of merely valid combinations.

Critical story elements must therefore be bundled in curated Adventure Blueprints. Seed variation is allowed only where it cannot break critical premise, clues, dependencies, world route or payoff. New blueprints are added only after the existing bank has been manually playtested.

## 2026-10-26 - Adventure Code is offline-first and versioned
Adventure Code V1 uses protocol tag `MH1`. The child device can export a code and a second device can reconstruct the same curated adventure plan without network synchronization. The code carries the exact successful layout seed as well as the blueprint ID.

## 2026-10-23 - GitHub is the permanent source of truth
The connected `joakimskurk/monsterhulen` repository is the durable project workspace. Chat is temporary. No critical state, decision, test status or continuation point may exist only in chat.

## 2026-10-22 - Product name is Monsterhulen
Visible product name is **Monsterhulen**. Internal Eventyr*/HulerCharacterSystem names are intentionally retained unless a future migration provides concrete value.

## 2026-10-22 - Save migration remains backward compatible
Canonical storage key is `monsterhulen_v120`; `eventyrkryper_v100` is the first legacy key. State schema remains 12. Legacy saves are normalized and copied forward; legacy storage is not silently destroyed.

UX5A does not bump the schema. Untouched legacy monster encounters may be normalized to current encounter defaults, but an already-started legacy fight must not be healed during migration.

## 2026-10-21 - Physical dice are core interaction
The app never rolls dice digitally. Uncertain action uses physical 1D6. Relevant `EKSTRA GOD PÅ` uses physical 2D6 and highest die. The playtest UI records the exact physical die face; internal consequence compatibility remains low/mid/high.

## 2026-10-21 - Identity and mechanics stay separate
Hero type/species, selected trait and equipped start item are independent choices. Base hero art is state-neutral.

## 2026-10-21 - Items and companions are affordances, not bonuses
Start items, lasting TING, friends and pets can make a plan possible/easy and inspire narrator cues. They do not grant generic numeric bonuses or extra dice. Only the selected trait can trigger 2D6.

## 2026-10-21 - Puzzle solving is not a die check
Puzzle/logic content is part of the fictional world. Thinking/answering does not require D6. A later risky execution can use the normal physical dice rule.

## 2026-10-23 - Project-memory workflow is mandatory for now
At chat start, read the canonical handoff files in repo order. After meaningful milestones, keep them synchronized with reality before moving on.
