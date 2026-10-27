# Monsterhulen - Content Review Handoff

Updated: 2026-10-27
Status: **EXISTING CONTENT-BANK EDITORIAL REVIEW COMPLETE; PREP ONLY**

Purpose: preserve the editorial checkpoint and the user-driven rules inferred during subject/role review, so a new chat does not restart the list or expand the bank prematurely.

## General review frame
Each subject was reviewed for:
1. identity/personality,
2. allowed Storylet roles,
3. incompatible roles,
4. plausible requirements,
5. valid provider families,
6. outcomes/world effects,
7. combat capability yes/no,
8. interaction-shell needs,
9. critical-safe vs ambient-only,
10. repetition limits.

Story quality and thematic fit outrank combinatorial volume.

## Earlier explicit user-driven reference findings

### Pannekakezombien
Stable subject identity may support several authored roles:
- block a door,
- give optional/critical item,
- reveal clue/rule,
- social/trade/favor variants.

Critical reward/clue remains tracked and causally connected. Blocking actually changes route state.

### Den bortkomne zombien
Compatible directions include help/favor, follow-clue, route blocker, clue source, item/reward source and `ZOMBIE_DELIVERY`-style participant.

### Skjelettdanseren
Can move aside, teach/reveal rhythm, give clue, become friendly/recurring or enable later music interaction.

### Skjelettvakten
Reference optional-combat subject:
- child may propose fight,
- DM explicitly starts combat,
- critical guardian retains non-combat route,
- resolution need not mean death/kill.

### Sumptrollet
Reference `requires FOOD` blocker:
- food/provider must exist before troll,
- resource route may be room find, seller, trade, social bargain, NPC reward, etc.,
- child may solve another plausible way,
- no critical single-roll persuasion softlock.

### Brotrollet
Wanted object may vary among authored variants, but chosen requirement/provider plan is fixed and validated before map placement. No arbitrary noun generation.

### Boka som skriver tilbake
Subject may support separate curated variants:
- open `INGEN SKJULT FASIT` improv,
- NPC-like dialogue,
- tracked clue,
- contextual puzzle/gate,
- item/reward wrapper,
- lore/history,
- one-use helper.

Current ambient improv instance remains non-critical; a critical variant needs separate authored truth.

### Candidate sibling subjects
`DEN SNAKKENDE DUKKEN` and `DET LEVENDE BILDET` remain candidates only. They were **not** added.

## Existing content categories - COMPLETE
Detailed review docs:
- `docs/MONSTER_SUBJECT_REVIEW_V1.md`
- `docs/PEOPLE_SUBJECT_REVIEW_V1.md`
- `docs/FRIEND_SUBJECT_REVIEW_V1.md`
- `docs/TRAP_SUBJECT_REVIEW_V1.md`
- `docs/MYSTERY_SUBJECT_REVIEW_V1.md`
- `docs/TREASURE_AFFORDANCE_REVIEW_V1.md`

This covers the existing source categories:
- MONSTERS,
- PEOPLE,
- FRIENDS,
- TRAPS,
- MYSTERIES,
- TREASURES.

No subject was added. No Adventure Blueprint was added.

## Cross-bank rules now binding
Integrated into `docs/STORYLET_MATRIX_V1.md` and `DECISIONS.md`:

### Provider semantics
- critical provider truth comes from graph/provider binding, never noun/theme matching,
- optional/incidental loot is not automatically a planned critical provider,
- critical trade cannot consume the only still-required unique critical resource,
- critical fetch/favor requests bind provider before map placement,
- critical environmental blockers expose a scene affordance or have a validated resource provider.

Examples:
- Krystallslimet/Glasskule are not CRYSTAL_MACHINE providers by similarity,
- Trollmynt/Messingknapp are not universal permission tokens,
- optional Honningkjeks does not become the only FOOD route unless explicitly provider-bound.

### Truth / knowledge / topology
- critical puzzle/mystery needs authored truth/rule/cause,
- `truthMode=IMPROV` cannot supply critical requirements/completion/world effects,
- knowledge reveal cannot invent graph topology,
- `REVEAL_LOCATION` reveals existing authored state,
- `OPEN_GATE` changes an existing authored gate/edge,
- phase/expiry applies to friendly clue/delivery content too.

### Repetition
Selection must consider:
- subject repetition,
- role repetition,
- mechanic-family repetition,
- solution-family repetition,
- repeated use of the same versatile prop/affordance.

Important overlap families include light redirection, permission/proof, food/hunger, trade/collector, quiet/sleep, route/map reveal, precise repair and pattern observation.

### Combat
`MONSTER` category does not imply combat.

`combatAllowed` is Storylet-specific and should remain sparse. Many monster subjects are editorially better with combat disabled.

### Items
Items/friends/pets remain affordances, not generic bonuses.

Possession never performs trade, feeding, placement, repair, gate opening or assembly. Transfer/use/consumption/placement is an explicit typed action.

## Provider principles
Initial families remain:
- `ROOM_FIND`
- `MERCHANT_PURCHASE`
- `TRADE`
- `SOCIAL_BARGAIN`
- `NPC_REWARD`
- `PUZZLE_REWARD`
- `SEARCH_SECRET`
- explicitly allowed starting/owned resource.

Child speaks/acts first. DM requests physical die only when genuinely uncertain. Low social result fails forward.

## DM UI direction
DM needs semantic controls instead of raw state editing:
- what is this scene,
- what does it need,
- where can it be acquired,
- what can happen,
- what counts as resolved,
- what changes,
- authored vs improvisable,
- `GODTA LØSNING`,
- `FORHANDLE / USIKKERT FORSØK`,
- `START KAMP` when allowed,
- authored outcome application,
- later action history/undo.

## Interaction-shell direction
Focused shells present actions but do not own story logic.

Reference machine flow:
- reveal slots first,
- explicit child placement,
- possession does not auto-fill,
- wrong resource not silently consumed,
- partial state persists,
- authored activation/world effect,
- later atomic undo.

See `docs/INTERACTION_SHELLS_V1.md`.

## CRYSTAL_MACHINE candidate-bank checkpoint
The only pre-NG8 blueprint target remains `CRYSTAL_MACHINE`.

Nine initial Storylets were audited and revised:
- `docs/CRYSTAL_STORYLET_AUDIT_2026-10-27.md`
- canonical revised `docs/CRYSTAL_STORYLET_BANK_V1.md`

Controlled first manual baseline after runtime is eventually unblocked:
- `CRYSTAL_SEARCH_CHIME`
- `CRYSTAL_NPC_OWL_PAGE`
- `CRYSTAL_GUARDIAN_LIGHT_SLIME`

This is not a new blueprint.

## Exact editorial continuation point
**There is no next subject in the existing list. The review is complete.**

Do not continue by inventing more subjects or expanding Adventure Blueprints.

Next content work after Narrative Graph runtime is unblocked:
1. use the small audited Crystal Storylet bank,
2. build/test only CRYSTAL_MACHINE through NG1-NG8,
3. manually judge story quality,
4. only after NG8 acceptance consider another blueprint or bank expansion.
