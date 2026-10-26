# START HERE - MONSTERHULEN

Updated: 2026-10-26
Branch: `narrative/story-graph-v1-prep`

## IMPORTANT: PREP BRANCH ONLY
This branch documents the next architecture while UX5A physical playtest remains open.

**Do not implement Narrative Graph runtime here.**

Active runtime branch:
`ux5/searchable-rooms-encounter-tracks`

UX5A is still unmerged because physical iPad/mobile verification is not green yet.

`main` must remain untouched until UX5A gate is complete.

## Read in this order
1. `PROJECT_STATE.md`
2. `ROADMAP.md`
3. `DECISIONS.md`
4. `TESTING.md`
5. `PLAYTEST_FINDINGS.md`
6. `docs/ENCOUNTER_STORY_SYSTEM_PLAN_V1.md` **<- consolidated latest plan**
7. `docs/NARRATIVE_GRAPH_V1.md`
8. `docs/STORYLET_MATRIX_V1.md`
9. `docs/INTERACTION_SHELLS_V1.md`
10. `docs/CONTENT_REVIEW_HANDOFF_2026-10-26.md`
11. `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`
12. `docs/CRYSTAL_MACHINE_REFERENCE_V1.md`
13. `docs/CRYSTAL_STORYLET_BANK_V1.md`
14. `docs/OPEN_SOURCE_SURVEY_2026-10-26.md`
15. `docs/UX5A_DEVICE_FINDINGS_2026-10-26.md`

Repository is source of truth. Do not reconstruct project state from old chat if repo differs.

## Current runtime gate
Latest UX5A runtime follow-ups:
- patch 11: explicit story-key use,
- patch 12: one visible location identity,
- patch 13: encounter purpose/world-effect contract,
- patch 14: explicit narrator-improvisation guidance.

Patch 14 automated runtime is green; fresh current browser certification and physical target-device retest remain open.

Do not merge UX5A until physical gate is green.

## Latest architecture model
Recent content/editorial review established:

`SUBJECT -> STORYLET ROLE -> REQUIREMENTS + PROVIDERS -> PLAYER ACTION / DM RESOLUTION -> OUTCOME + WORLD EFFECT`

Supporting layers:
- player knowledge/reveal state,
- dramatic phases/expiry,
- interaction shell/popup,
- typed canonical state transitions,
- later action history/undo/shared-session sync.

### Subject != role
A recognizable subject can have several curated compatible roles.

Examples:
- Pannekakezombien may block route, give item, reveal clue, trade, etc.,
- Boka som skriver tilbake may be open improv, NPC-like, clue source, puzzle/gate or item wrapper,
- candidate sibling subjects include Den snakkende dukken / Det levende bildet, but they are **not active-bank additions yet**.

No unrestricted random role assignment.

### Requirements need providers
A required item/state is separate from the way it can be obtained.

Initial provider families:
- `ROOM_FIND`
- `MERCHANT_PURCHASE`
- `TRADE`
- `SOCIAL_BARGAIN`
- `NPC_REWARD`
- `PUZZLE_REWARD`
- `SEARCH_SECRET`
- explicit allowed starting/owned resource.

Optional resources can be truly variable when thematic.

Critical resource needs at least one **reserved, reachable, validator-proven** route before it is required. It may still feel random/natural to player.

Critical progression cannot depend on one persuasion roll.

### Merchant/social play
Merchant is a Storylet/provider, not automatically a numerical economy.

Prefer concrete valuables/trades/favors.

Child speaks/acts first. DM triggers `FORHANDLE / USIKKERT FORSØK` only if outcome is genuinely uncertain, using physical dice. Low social results fail forward.

### DM control direction
DM needs semantic controls:
- `HVA ER GREIA?`
- `HVA KREVES?`
- `HVOR KAN DET SKAFFES?`
- `HVA KAN SKJE?`
- `NÅR ER DET LØST?`
- `HVA ENDRES DA?`
- authored vs improv boundary,
- `GODTA LØSNING`,
- negotiation uncertainty,
- optional `START KAMP`,
- authored outcome application,
- later action history/undo.

### Optional combat
Combat is a Storylet capability, not default monster behavior.

Child may propose fighting; DM explicitly starts combat only if `combatAllowed=true`. Critical guardians normally have non-combat route. Child-friendly/non-graphic; surrender/retreat/friendship etc. are valid endings.

## Planned interaction shells/popups
Some actions should be tangible player interactions without becoming auto-solvers.

Reference: three colored stones/crystals in a gate/machine.

Flow:
1. story reveals sockets,
2. child taps target,
3. popup shows slots,
4. owned items do not auto-fill,
5. child places items explicitly,
6. wrong item is not consumed,
7. partial placement persists,
8. all slots either complete or enable separate activation according to authored rule,
9. world effect opens/activates target,
10. later undo restores inventory + target atomically.

Canonical spec: `docs/INTERACTION_SHELLS_V1.md`.

## Canonical action direction
Narrative Graph, DM controls, undo and future shared session should converge on typed validated state transitions with stable action IDs.

No raw UI field mutation.

This is why full multiscreen must wait until story/world action model is stable.

## Future multiscreen / shared session
Recorded, not active:
- DM always hosts authoritative state,
- player view detachable to touch client or display-only screen,
- same-Wi-Fi/LAN-first join via simple code/QR,
- client requests action; host validates/broadcasts,
- reconnect/idempotency,
- narrator-only info never leaks,
- DM player-view preview,
- undo/action history syncs corrected state.

Adventure Code remains offline reconstruction/sharing, not live sync.

## Open-source survey result
No dependency adopted now.

Study-only candidates:
- `boardgame.io`: reducer/log/undo/state patterns,
- `Colyseus`: authoritative sync/reconnect patterns,
- `rot.js`: roguelike algorithms,
- `Epoch Mapper`: structured dungeon events/quests/interaction/standalone patterns.

See `docs/OPEN_SOURCE_SURVEY_2026-10-26.md`.

Do not pull in a generic dungeon engine while current story/state architecture is unsettled.

## Updated implementation sequence
### While UX5A is open
- patch UX5A defects only on runtime branch,
- physical retest patch-14 candidate,
- editorial content review may continue as docs,
- prep branch remains docs/spec only,
- no Narrative Graph runtime,
- no DM Control Surface runtime,
- no UX5B,
- no Multiscreen implementation.

### When UX5A is physically GREEN
1. record physical evidence,
2. confirm relevant automated + browser regressions,
3. merge UX5A to `main`,
4. verify `main`,
5. create `narrative/story-graph-v1`,
6. carry approved prep docs,
7. start WP-NG1.

### Narrative Graph packages
- NG1 graph + provider + transition model/validator,
- NG2 Storylet Matrix/provider engine,
- NG3 Crystal Machine planner,
- NG4 materialization + minimal semantic DM controls + required interaction shells,
- NG5 >=1000 automated structural/state cases,
- NG6 browser/touch interaction QA,
- NG7 10-20 manual editorial/family playtests,
- NG8 accept/revise/abandon.

Do not convert another blueprint before NG8.

### After NG8 if accepted
Current preferred order:
1. **DM Control Surface V1** polish + action history/undo foundation,
2. **UX5B** map-aware dependency/solution UI,
3. convert blueprints one at a time,
4. **Multiscreen / Shared Session V1** when action/state model is stable.

## Content review continuation
Review has progressed through:
- Pannekakezombien,
- Den bortkomne zombien,
- Skjelettdanseren,
- Skjelettvakten,
- Sumptrollet,
- Brotrollet.

Exact next subject in a new chat:

**DEN LEVENDE RUSTNINGEN**

Use `docs/CONTENT_REVIEW_HANDOFF_2026-10-26.md`.

Do not expand Adventure Blueprint bank during review.

## Reference target remains CRYSTAL_MACHINE
First/only blueprint converted before NG8:

`SETUP -> QUEST_REVEAL -> 3 parallel acquisitions -> RETURN -> ASSEMBLE -> GATE -> CLIMAX`

Preferred initial acquisition mix:
- `SEARCH_SECRET`
- `NPC_FAVOR`
- `GUARDIAN`

The machine reveals three colored missing sockets before player UI assumes knowledge. Child deliberately places/activates crystals. Ownership alone never assembles machine.

## Stop condition
If procedural architecture needs growing special-case rules or frequent narrator repair, prefer more hand-authored scenario skeletons.

Story quality and child-led play outrank combinatorial volume.
