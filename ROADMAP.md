# MONSTERHULEN - ROADMAP

DATO: 2026-10-27
STATUS: V0.12.3 BASELINE + UX5A PATCH 15 MACHINE GREEN + FRESH CHROMIUM INTERACTION 22/0 + PHYSICAL IPAD/MOBILE GATE PENDING + NARRATIVE GRAPH V1 PREP UPDATED

## LÅSTE PRODUKTPRINSIPPER
- Fortellingskvalitet slår kombinasjonsmengde.
- Barnet foreslår handlinger; appen støtter og tolker, men velger ikke løsningen automatisk.
- Ett fysisk sted har ett synlig kanonisk navn.
- Encounter-mekanikk krever `purpose`, `stakes`, `resolvedWhen`, `payoff` og reelle world effects.
- Ingen generiske fremgangsruter uten skrevne meningsfulle steg.
- Puzzles må ha skrevet funksjon i scenen.
- Forteller-improvisasjon er lov, men må være eksplisitt merket/scopet.
- Critical story-state kan ikke avhenge av untracked improvisasjon.
- Subject, Storylet-role, requirements, provider routes, outcomes og interaction shell er separate lag.
- Kritisk historie bygges fra Adventure Blueprint + Narrative Graph + kuraterte Storylets.
- Kritiske mål bruker `SETUP -> SIGNAL -> ACTION -> PAYOFF`.
- Sannhet og spillerkunnskap er separate state.
- Story-critical beats har timing/expiry.
- Fysisk terning brukes ved reell usikkerhet; appen ruller aldri digitalt.
- Terningresultat erstatter aldri unmet prerequisite.
- Ting/venner/kjæledyr er affordances, ikke tallbonuser.
- Stable IDs/save compatibility beholdes.
- GitHub er permanent source of truth.

## CURRENT ACTIVE GATE - UX5A
Current patch chain ends at patch 15:
- patch 11 explicit story-key use,
- patch 12 one visible location identity,
- patch 13 encounter purpose/world-effect contract,
- patch 14 explicit narrator improvisation,
- patch 15 remove remaining zone-name leak from player-visible `room.desc`.

### Patch 15 finding/fix
The 2026-10-27 full gate review found that the room banner used the canonical room name but the visible description still began with `${zone.name}. ${room.name}.`.

Patch 15 changes the player description to `${room.name}.` while retaining zone metadata internally.

### Patch-15 machine verification - GREEN
- single location **21/0**
- explicit improv **20/0**
- authored mysteries only **5136/0**
- encounter purpose **4337/0**
- device findings **27/0**
- search/encounter **2328/0**
- Adventure Code **405/0**
- UX4 progression **1797/0**
- content regression **5830/0**
- focused patch-15 runtime gate **6844/0**
- 11 inline scripts **0 syntax errors**

Patch-15 reconstructed candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

The previously referenced authored-mysteries-only test file was missing from the repository and has now been restored; current result is **5136/0**.

### Fresh Chromium interaction QA
Exact patch-15 HTML: **22/0** browser interaction smoke.

Caveat: the container blocks Chromium from local navigation and injected `about:blank` denies native localStorage, so the harness used DevTools document injection plus an in-memory localStorage shim. DOM/click/mobile viewport behavior is fresh-current; native persistence and clipboard remain target-device checks.

See:
- `docs/UX5A_GATE_REVIEW_2026-10-27.md`
- `docs/UX5A_BROWSER_QA_2026-10-27.md`

**Do not merge UX5A until the physical iPad/mobile gate is green.**

While UX5A is open:
- patch UX5A defects only on this branch,
- content/editorial review may continue as documentation,
- do not implement Narrative Graph runtime,
- do not implement full DM Control Surface, UX5B or Multiscreen.

## CANONICAL NEXT ARCHITECTURE
Detailed prep lives on `narrative/story-graph-v1-prep`.

Target model:

`SUBJECT -> STORYLET ROLE -> REQUIREMENTS + PROVIDERS -> PLAYER ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

Supporting layers:
- knowledge/reveal,
- dramatic phase/expiry,
- interaction shell/popup,
- typed canonical state transition,
- later action history/undo/shared-session sync.

## RESOURCE PROVIDER SYSTEM
Initial providers:
- `ROOM_FIND`
- `MERCHANT_PURCHASE`
- `TRADE`
- `SOCIAL_BARGAIN`
- `NPC_REWARD`
- `PUZZLE_REWARD`
- `SEARCH_SECRET`
- explicitly allowed `STARTING_OR_OWNED_RESOURCE`.

Critical resources need at least one reserved, reachable, non-circular route before consumption and may not depend permanently on one uncertain roll.

## CHILD AGENCY / DM SEMANTICS
Authored approaches are affordances, not a closed answer list.

Future graph-aware DM controls include:
- `GODTA LØSNING`,
- `FORHANDLE / USIKKERT FORSØK`,
- physical die recording,
- `START KAMP` only where allowed,
- authored outcome/world-effect application.

Combat is an optional Storylet capability, never automatic from monster/vakt identity.

## INTERACTION SHELLS
Initial shell families:
- `SLOT_GATE / ASSEMBLY`
- `LOCKED_OBJECT`
- `NPC_DIALOGUE_FAVOR`
- `MERCHANT_TRADE`
- `PUZZLE`
- `COMBAT`
- `REWARD_CHOICE`
- `SEARCH_INSPECT`

Reference rule: owning a solution never performs the action.

## CANONICAL ACTION/STATE DIRECTION
Narrative Graph, DM controls, undo and future Shared Session converge on typed validated transitions with stable action IDs.

Conceptual fields:
```text
actionId
sequence
actor
type
targetId
payload
preconditions[]
effects[]
undoPolicy
resultRevision
```

## UPDATED PLAYTEST / ARCHITECTURE SEQUENCE
1. Kartnavigasjon.
2. FRITT KAST + narrator freedom + item-use semantics.
3. DM-guide + physical D6 input.
4. Adventure Code + curated blueprints.
5. UX4 hard finale progression + secret doors.
6. **UX5A room investigation + encounter/world state + physical findings. CURRENT: MACHINE/BROWSER INTERACTION GREEN, PHYSICAL OPEN.**
7. Narrative Graph V1 only after UX5A physical green + merge.
8. If NG accepted: DM Control Surface V1 polish + action history/undo foundation.
9. UX5B consuming accepted graph state.
10. Convert additional blueprints one at a time after NG8/editorial gate.
11. Multiscreen / Shared Session V1 once action/state model is stable.

## NARRATIVE GRAPH V1 WORK PACKAGES
- NG0 specs/docs - complete/updated on prep.
- NG1 graph + provider + typed transition model/validator.
- NG2 Storylet Matrix/provider engine.
- NG3 Crystal Machine planner.
- NG4 runtime materialization + narrator knowledge + minimal DM controls + required interaction shells.
- NG5 >=1000 automated graph/state cases.
- NG6 real browser/touch QA.
- NG7 10-20 manual editorial/family playtests.
- NG8 accept/revise/abandon.

No second blueprint before NG8.

## ADVENTURE BLUEPRINT BANK
Only:
- `GLASS_HEART`
- `WITCH_CAT`
- `CRYSTAL_MACHINE`
- `ZOMBIE_DELIVERY`

Do not expand now.

## CONTENT REVIEW TRACK
Reviewed through `BROTROLLET`. Next: **DEN LEVENDE RUSTNINGEN**.

## REPOSITORY HEALTH
Still open. Full active runtime/source/assets are not yet byte-reconstructable from ordinary repo files alone.

## EXACT NEXT
**Physical-test the exact patch-15 candidate on iPad/mobile using `docs/UX5A_GATE_REVIEW_2026-10-27.md`.**

When physical gate is green:
1. document physical evidence,
2. confirm final automated/browser evidence,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1`,
6. carry approved prep docs,
7. start NG1.
