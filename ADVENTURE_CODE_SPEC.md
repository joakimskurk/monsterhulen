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
- DM can understand premise, NPC/encounter role and later payoff before improvising,
- code generation remains deterministic across repeated runs,
- current automated regressions remain green.
