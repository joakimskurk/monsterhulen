# Monsterhulen - Content Review Handoff 2026-10-26

Updated: 2026-10-27
Status: editorial planning only.

Purpose: preserve exactly where the subject/role review reached and what rules were inferred, so a new chat can continue without reconstructing recent conversation.

## General review frame
For each subject, review:
1. identity/personality,
2. allowed Storylet roles,
3. incompatible roles,
4. plausible requirements,
5. valid provider families,
6. possible outcomes/world effects,
7. combat capability yes/no,
8. interaction-shell needs,
9. critical-safe vs ambient-only,
10. repetition limits.

Do not add combinations merely for volume. Story quality and thematic fit first.

## Reviewed subjects / explicit user input

### Pannekakezombien
Current fiction works.

User direction:
- in one adventure it may block a door,
- in another it may give an item,
- item may be optional or progression-critical,
- it may reveal an answer/rule/clue needed somewhere else.

System consequence:
- subject identity is stable,
- Storylet role/outcome varies among authored compatible variants,
- critical reward/clue is tracked and causally connected,
- if it blocks path, world state actually blocks/unblocks path.

### Den bortkomne zombien
User direction: same general flexibility as Pannekakezombien, with fiction appropriate to its identity.

Potential roles:
- NPC help/favor,
- follow-clue,
- route blocker,
- clue source,
- item/reward source,
- `ZOMBIE_DELIVERY`-style story participant.

### Skjelettdanseren
Current behavior is acceptable.

User direction: remember that NPC-like figures can have different authored outcomes.

Possible outcomes:
- moves aside,
- teaches/reveals a rhythm,
- gives clue,
- becomes friendly/recurring,
- enables later music interaction.

### Skjelettvakten
User direction:
- this is first strong example where child may choose to fight,
- combat should be its own module/popup,
- DM explicitly chooses/starts that module,
- presentation must stay child-friendly/not scary.

System consequence:
- combat is `combatAllowed` capability, not default monster state,
- child may propose fight,
- DM triggers `START KAMP`,
- non-combat route normally remains for critical guardian,
- resolution need not mean death/kill.

### Sumptrollet
User direction:
- archetypal “find me food and I let you pass”,
- if that Storylet is selected, food must exist before the troll,
- child may also make troll happy another plausible way,
- DM needs good control UI to mark task solved / trigger uncertainty.

Later clarification:
- food may be a thematically plausible random/semi-random room find,
- or offered by a seller,
- seller may accept valuables found on route,
- child may try to talk their way to food/item,
- DM triggers physical die interaction if negotiation is genuinely uncertain.

System consequence:
- `requires FOOD` is separate from provider plan,
- critical food needs at least one guaranteed reachable route,
- route may be `ROOM_FIND`, `MERCHANT_PURCHASE`, `TRADE`, `SOCIAL_BARGAIN`, `NPC_REWARD`, etc.,
- critical progression cannot depend on one persuasion roll,
- alternate free-form solution can resolve same authored outcome.

### Brotrollet
User direction:
- same system principle as Sumptrollet,
- but request is different objects rather than food,
- exact wanted object can vary with randomization,
- selected object must be spawned/provided earlier in map.

System consequence:
- choose among pre-authored request variants,
- selected request fixes `requires[]`,
- provider plan is validated before map placement,
- no arbitrary noun generation.

## Monster-category checkpoint - 2026-10-27
The remainder of the existing `MONSTERS` bank has now been editorially reviewed, from **DEN LEVENDE RUSTNINGEN** through **REGNGARGOILEN**.

Canonical detailed review:
`docs/MONSTER_SUBJECT_REVIEW_V1.md`

This completes the existing monster category without adding subjects or blueprints.

Important cross-bank findings captured there:
- similar solution mechanics need anti-repetition scoring/constraints,
- `KRYSTALLSLIMET` must not become a CRYSTAL_MACHINE provider by noun/theme matching alone,
- critical password/mystery subjects need real authored truth and clue chains,
- `BYTTEKRABBEN` is a strong concrete `TRADE` / merchant-style critical provider subject,
- monster category does not imply combat; combat capability should remain sparse,
- critical blockers must create concrete world-state effects, not merely a “completed encounter” flag.

The monster review established compatibility directions only. It does **not** approve arbitrary subject-role combinations.

## Earlier subject/role finding that remains binding

### Boka som skriver tilbake
Can have different compatible authored variants:
- open Forteller-improv with explicit `INGEN SKJULT FASIT`,
- NPC-like conversation,
- tracked clue source,
- riddle/puzzle opening gate,
- puzzle releasing item,
- lore/history source,
- one-use helper.

Do not use frequently.

### Candidate sibling subjects
User suggested same functional pattern may work for:
- Den snakkende dukken,
- Det levende bildet.

These are candidates, not active-bank additions yet.

## Provider principles established during review
- optional items may be genuinely random when thematically sensible,
- critical items may appear natural/random to player but at least one route is reserved and proven reachable,
- sellers can use concrete valuables/trades/favors rather than requiring a big numerical currency system,
- social bargaining is child-led; app does not show a universal “persuade” answer button,
- DM determines whether an attempt is uncertain before requesting physical die,
- low social result fails forward,
- no critical single-roll softlock.

Additional monster-review provider constraints:
- provider truth comes from the graph, never noun matching,
- a trade subject cannot consume a unique resource that is still required elsewhere,
- a critical fetch/favor subject must bind its requested resource/provider before map placement,
- environmental critical blockers need at least one reachable environmental/provider affordance but should still accept plausible free child solutions.

## DM UI direction established during review
DM needs semantic controls rather than raw state editing:
- what is this scene,
- what does it need,
- where can it be acquired,
- what can happen,
- what counts as resolved,
- what changes after resolution,
- what is authored vs improvisable,
- `GODTA LØSNING`,
- `FORHANDLE / USIKKERT FORSØK`,
- `START KAMP` when allowed,
- authored outcome application,
- later action history/undo.

## Interaction popup direction added at checkpoint
Some interactions need tangible player-facing shells.

Reference: a gate/machine requiring three colored stones.
- tapping target opens three visible boxes/sockets only after reveal,
- child explicitly places items,
- owning items does not auto-place,
- partial placement persists,
- wrong item is not consumed,
- full slots may enable separate activation if authored,
- undo must restore inventory + target state atomically.

See `docs/INTERACTION_SHELLS_V1.md`.

## Exact editorial continuation point
The existing **MONSTER** category is complete.

Next category: `PEOPLE`.

Next original-list subject to review:

**LANTERNEVAKTEN**

Then continue through the existing PEOPLE list in source order before moving to FRIENDS, TRAPS, MYSTERIES and TREASURES.

Do not expand Adventure Blueprint bank during this review.
