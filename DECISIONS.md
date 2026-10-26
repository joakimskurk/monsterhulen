# MONSTERHULEN - DECISIONS

Only durable decisions that would be costly or confusing to lose belong here.

## 2026-10-26 - Required resources use explicit provider routes, not hopeful random spawning
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
