# MONSTERHULEN - DECISIONS

Only durable decisions that would be costly or confusing to lose belong here.

## 2026-10-26 - Critical stories use Narrative Graph + curated Storylets
Live playtest of `CRYSTAL_MACHINE` showed that structurally valid placement is not enough. Three required parts placed safely in three rooms can still feel like unrelated pickups with no causal story.

Critical story generation will therefore move to a hybrid model:
- Adventure Blueprints define the large dramatic structure,
- a Narrative Graph defines causal story functions, dependencies, player knowledge and payoff,
- humans curate small Storylets and compatibility rules,
- seeded generation may choose and place only compatible Storylets,
- ambient procedural content is added only after the critical graph is valid.

Every critical objective must have `SETUP -> SIGNAL -> ACTION -> PAYOFF`. Truth and player knowledge are separate. Generic UX5A optional finds may never satisfy story-critical requirements. Critical hidden/search content must have explicit clues and fail-forward. Guardians must have at least one authored non-combat affordance. Three-part collect scenarios default to different play families rather than three copies of the same acquisition pattern.

Live playtest also showed the temporal version of the same problem: `SKYGGEHEKSA`, whose purpose was to make the task harder, could be encountered after the task was already complete. Narrative Graph therefore has explicit dramatic phases and validity/expiry windows. A complication or antagonist may not first activate after the objective it exists to obstruct is resolved. Completing an objective expires or transforms dependent pre-resolution beats. A later appearance of the same character is allowed only as a separately authored `CLIMAX` or `AFTERMATH` beat with a new purpose.

`CRYSTAL_MACHINE` is the first reference experiment. The initial target is one signalled hidden crystal, one NPC-favor crystal with a real reachable dependency and one guardian crystal with non-combat possibilities, followed by deliberate return/assembly before the gate opens.

This is intentionally not pure procedural generation. If manual playtest still requires frequent narrator repair after the Storylet Matrix is implemented, prefer a more hand-authored scenario bank rather than preserving procedural variation at the cost of story quality.

Implementation is blocked until UX5A physical device testing is green and UX5A has been merged to `main`. The previously planned UX5B map-aware solution graph is deferred until Narrative Graph V1 is proven, then should consume the explicit graph instead of inferring story logic after generation.

## 2026-10-26 - Dice report uncertainty; encounter state resolves encounters
A physical die result may suggest a consequence, but may not automatically remove a normal encounter or fill its progress track. Normal generated encounters use explicit narrator-controlled progress, while monster combat uses explicit hearts only after the child chooses combat.

New normal monster encounters use 3 hearts; `SPENNING` encounters use 4. Non-treasure generated encounters use 3 progress steps; `SPENNING` uses 4. The narrator records progress only when the child's action meaningfully changes the situation. A genuinely decisive plan may resolve the whole encounter directly through an explicit narrator action.

This preserves free-form play: a clever solution is allowed to be decisive, but a lucky 5/6 is not itself a universal one-roll victory.

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

Critical story elements must therefore be bundled in curated Adventure Blueprints. The seed may vary safe details such as layout, valid placement and side content, but must not randomly remix the critical premise, clues, key/target/parts, world route and payoff. New blueprints are added only after the existing bank has been manually playtested.

## 2026-10-26 - Adventure Code is offline-first and versioned
Adventure Code V1 uses protocol tag `MH1`. The child device can export a code and a second device can reconstruct the same curated adventure plan without network synchronization. The code carries the exact successful layout seed as well as the blueprint ID. Live synchronization of current room/inventory/dice is deliberately deferred until offline two-device play has been validated.

## 2026-10-23 - GitHub is the permanent source of truth
The connected `joakimskurk/monsterhulen` repository is the durable project workspace. Chat is temporary. No critical state, decision, test status or continuation point may exist only in chat.

Rationale: long chats have previously lost continuity. A fresh chat must be able to resume from repository state alone.

## 2026-10-22 - Product name is Monsterhulen
Visible product name is **Monsterhulen**. Core framing: the same cave is a little different every time, and each adventure becomes its own story.

Internal Eventyr*/HulerCharacterSystem names are intentionally retained unless a future migration provides concrete value.

## 2026-10-22 - Save migration remains backward compatible
Canonical storage key is `monsterhulen_v120`; `eventyrkryper_v100` is the first legacy key. State schema remains 12. Legacy saves are normalized and copied forward; legacy storage is not silently destroyed.

UX5A does not bump the schema. Untouched legacy monster encounters may be normalized to the new 3/4-heart defaults, but an already-started legacy fight must not be healed during migration.

## 2026-10-21 - Physical dice are core interaction
The app never rolls dice digitally. Uncertain action uses physical 1D6. Relevant `EKSTRA GOD PÅ` uses physical 2D6 and highest die. The playtest UI records the exact physical die face; internal consequence compatibility remains low/mid/high.

## 2026-10-21 - Identity and mechanics stay separate
Hero type/species, selected trait and equipped start item are independent choices. Base hero art is state-neutral. Functional equipment is not baked into hero mechanics or inferred from species/archetype.

## 2026-10-21 - Items and companions are affordances, not bonuses
Start items, lasting TING, friends and pets can make a plan possible/easy and can inspire narrator cues. They do not grant generic +1/+2 or extra dice. Only the selected trait can trigger 2D6.

## 2026-10-21 - Puzzle solving is not a die check
Puzzle/logic content is part of the fictional world. Thinking/answering does not require D6. A later risky execution can use the normal physical dice rule.

## 2026-10-23 - Project-memory workflow is mandatory for now
At the start of a chat, read `PROJECT_STATE.md`, `ROADMAP.md`, `DECISIONS.md`, `TESTING.md`, then relevant source and recent history. After meaningful milestones, keep these files synchronized with reality before moving on.
