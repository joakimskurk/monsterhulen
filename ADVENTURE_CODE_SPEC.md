# MONSTERHULEN - ADVENTURE CODE V1

Status: PLAYTEST, not release-locked
Version tag: `MH1`

## Product principle
Monsterhulen optimizes for coherent, memorable adventures rather than combinatorial volume. A small bank of curated adventures that work well is preferable to thousands of merely valid combinations.

## Architecture
Adventure Code V1 separates two layers:

1. **Curated blueprint** locks the story-critical pairing: premise, scenario type, important key/target/parts/truth, curated world route, foreshadowing and payoff guidance.
2. **Seeded variation** may vary layout, valid placement, side content and other non-critical details without changing the blueprint's story logic.

The same code must reconstruct the same critical adventure plan on another device without network synchronization.

## Initial blueprint bank
Only four blueprints are active for the first playtest:

- `GLASS_HEART`: GLASSNØKKELEN OG KRYSTALLHJERTET. LOCK. Route: MÅNESKOGEN -> KRYSTALLGROTTEN -> BEINKATAKOMBENE.
- `WITCH_CAT`: HEKSEKATTEN SOM FORSVANT. RESCUE. Route: SOPPSKOGEN -> GRAVPLASSEN -> HEKSETÅRNET.
- `CRYSTAL_MACHINE`: DE TRE KRYSTALLENE. COLLECT. Route: REGNBUEDALEN -> SKYGGEGANGENE -> KLOKKETÅRNET.
- `ZOMBIE_DELIVERY`: ZOMBIEN SOM IKKE STJAL NOE. MYSTERY with three curated clues. Route: LANTERNEHAGEN -> TÅKESUMPEN -> ZOMBIESLOTTET.

Do not add more blueprints until these have been manually playtested for narrative coherence.

## Progression gate contract
A curated finale must be **earned**, not merely discovered.

Rules:
- The finale/last encounter may never be freely enterable from the early map simply because layout adjacency allows it.
- Every blueprint must define at least one explicit `finaleGate` prerequisite.
- Valid gate types include: scenario key, completed NPC quest, solved puzzle, collected required parts, rescued target, discovered truth/clues, or another explicit story flag.
- The map may visually reveal a locked/blocked finale entrance before the prerequisite is met, but traversal must be denied with a clear in-fiction reason.
- The prerequisite itself must be reachable without entering the finale.
- A critical prerequisite may not be accidentally consumed or permanently lost.
- A high die result can resolve the current uncertain action well, but can never bypass an unmet story gate.
- Failure must remain fail-forward: a bad roll may change the situation or require another route, but must not permanently softlock the blueprint.
- Every story-critical finale must have at least one non-combat route available somewhere in the blueprint.

Preferred blueprint shape:
1. Hook / discovery.
2. At least one meaningful middle objective.
3. Obtain/earn the gate condition through exploration, NPC help, puzzle, clue chain or collection.
4. Open the finale route.
5. Resolve the finale.

The narrator view must show:
- what currently gates the finale,
- where/how that prerequisite can be obtained,
- which NPC/room/object can help,
- which alternative non-combat approaches are actually supported by the generated map,
- consequences that change encounter state without skipping the blueprint.

## Code payload
The current `MH1.<base64url-json>` playtest code carries:

- protocol version
- adventure seed
- exact successful layout seed
- blueprint ID
- adventure length
- puzzle level
- hero identity/trait/start item needed for narrator advice
- selected persistent companion links when present

The exact layout seed is included so a second device reproduces the same valid dungeon even if the original build needed a later layout attempt.

## Two-device flow
Child device:
1. Start an adventure normally.
2. Open FORTELLER.
3. Copy FORTELLERKODE.

Narrator device:
1. Open the same Monsterhulen build.
2. Choose ÅPNE FORTELLERKODE.
3. Paste the code.
4. The app reconstructs the same adventure and opens narrator/spoiler mode.

V1 is intentionally offline and does not live-sync current room, inventory or dice results. Live state synchronization is a later, separate feature if playtesting proves it valuable.

## Narrator plan
The narrator view exposes:

- blueprint premise
- what to plant/foreshadow early
- what payoff to preserve for later
- critical plan
- finale gate and prerequisite path
- supported encounter solutions that actually exist in this adventure
- all rooms with spoiler labels and critical markers

This is support for the DM, not a mandatory script.

## Compatibility
- State schema remains 12.
- Main storage key remains `monsterhulen_v120`.
- Existing V0.12.3 saves without blueprint metadata remain loadable, but cannot generate a valid MH1 code until a new blueprint-based adventure is started.
- Physical dice rules are unchanged.
- Adventure Code does not create digital dice or automate child choices.

## Acceptance before lock
- all four blueprints manually played through at least once,
- narrator device reconstructs the same map and critical plan for each,
- no story-critical object can be accidentally consumed,
- no blueprint can reach/finish its finale before its explicit `finaleGate` is satisfied,
- each finale has a reachable prerequisite path and at least one non-combat route,
- high die results never bypass unmet story gates,
- DM can understand premise, NPC/encounter role, available map-supported solutions and later payoff before improvising,
- code generation remains deterministic across repeated runs,
- current automated regressions remain green.
