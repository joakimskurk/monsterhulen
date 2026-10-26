# MONSTERHULEN - PLAYTEST FINDINGS

Updated: 2026-10-27
Status: **UX5A patch 15 machine/browser interaction green; physical iPad/mobile gate remains open. Narrative Graph V1 is next only after UX5A is physically green and merged.**

## 1. Encounters are too ambiguous for the DM
Observed: child actions may not match generated buttons, dice relevance can be unclear, and narrator needs to know scene purpose.

Implemented across UX layers:
- `FRITT KAST`,
- ordinary item use does not consume,
- beginner narrator guidance,
- exact physical D6 input,
- patch 13 purpose/stakes/resolution/payoff,
- patch 14 explicit narrator-improvisation.

Future graph-aware narrator remains part of Narrative Graph/DM semantic work.

## 2. Map navigation should follow child instinct
Map-primary tappable navigation implemented; arrows remain fallback.

## 3. Physical dice are core interaction
Six D6 faces record real die result; no digital RNG.

## 4. Structural finale gating is necessary but not sufficient
UX4 prevents early finale/bypass, but later playtest proved structurally valid dependencies can still be narratively weak.

## 5. Secret doors need discovery play
Clue/investigation/fail-forward implemented; secrets cannot bypass critical gates.

## 6. Search should invite exploration without becoming a loot detector
UX5A room search hides whether a room contains a find, uses fail-forward and preserves finds with full backpack. Physical question remains whether `SE DEG RUNDT` feels voluntary rather than compulsory.

## 7. Generic encounter duration is not meaningful story
Patch 13 removed arbitrary non-combat 3/4-box progress. Progress exists only for authored fictional stages.

## 8. `CRYSTAL_MACHINE` exposed causal disconnect
Three reachable parts can still be unrelated pickups. Decision: Narrative Graph + curated Storylet Matrix + provider planning + deliberate return/assembly.

## 9. Ready key gate felt cosmetic
Auto unlock/traverse made key invisible as player action.

## 10. Random puzzle can be fictionally irrelevant
Ambient mysteries now require explicit authored puzzle opt-in/context rather than category match.

## 11. `SKYGGEHEKSA` exposed timing/expiry problem
A complication may not first appear after its purpose has expired. Narrative Graph needs phases/expiry/new later role.

## 12. Possessing solution must not choose action
Patch 11: keyed door remains locked until child deliberately uses key. General principle applies to all action-bearing resources.

## 13. One physical room should have one visible identity
Patch 12 removed competing area badge/status/narrator location identity and kept room name canonical.

See finding 23 for the remaining room-description leak discovered later.

## 14. `REGNBUENETTET` exposed purpose/payoff failure
Four generic boxes had no fiction, net did not block anything, completion changed nothing.

Patch 13 established:
- purpose/stakes/resolvedWhen/payoff,
- real trap world effect,
- authored-progress-only,
- forward block + retreat + route release.

Current patch-15 machine verification: encounter-purpose **4337/0** + focused gate runtime **6844/0**.

## 15. `BOKA SOM SKRIVER TILBAKE` exposed authored-vs-improv ambiguity
Intentional narrator improvisation is valid, but app must explicitly say when no hidden answer exists and bound what may be invented.

Patch 14 implements:
- `FORTELLER-IMPROVISASJON`,
- `INGEN SKJULT FASIT`,
- concrete per-scene prompt,
- no larger predetermined hidden plan,
- no invented mandatory story keys/contradictory state.

Current patch-15 verification: explicit-improv **20/0**.

## 16. Subject identity should not be locked to one narrative function
Editorial review established stable subject ID separate from Storylet role/logic. Only curated compatible role/outcome pairings are allowed; repetition is penalized rather than inflating shallow variation.

## 17. Required resources need provider planning
`SUMPTROLLET` / `BROTROLLET` review established requirement/provider separation.

Initial providers:
- `ROOM_FIND`,
- `MERCHANT_PURCHASE`,
- `TRADE`,
- `SOCIAL_BARGAIN`,
- `NPC_REWARD`,
- `PUZZLE_REWARD`,
- `SEARCH_SECRET`,
- explicitly allowed starting/owned resource.

Critical resource needs at least one reserved/reachable/non-circular route and cannot depend permanently on one persuasion roll.

## 18. DM needs semantic scene control
DM must understand purpose, requirements, providers, solve condition, outcome/world effect and authored-vs-improv boundary.

Future semantic actions include `GODTA LØSNING`, uncertainty/die, optional `START KAMP`, and authored outcome application rather than raw state editing.

## 19. Combat should be optional and DM-started
Combat is a Storylet capability (`combatAllowed`), not default monster identity. Critical guardians normally keep a non-combat route; child-friendly non-lethal outcomes remain valid.

## 20. Some story actions need tangible interaction shells/popups
Reference: red/blue/yellow resource gate.

Reveal slots first, explicit child placement, no auto-fill from inventory, wrong item not consumed, partial placement persists, authored activation/world effect, later atomic undo.

## 21. Undo and Shared Session should reuse canonical action transitions
Future DM-host/player-client sync, reconnect and undo should use stable typed action IDs and one authoritative transition boundary. Future only.

## 22. Open source should inform patterns, not replace architecture now
Study-only: boardgame.io, Colyseus, rot.js, Epoch Mapper. Adopt nothing now; current bottleneck is story/state semantics.

## 23. Patch 12 still leaked the internal zone name through the room description
Full UX5A gate review on 2026-10-27 found a remaining violation of finding 13:

- visible badge: `ROM: <room name>`
- visible description still began: `<zone name>. <room name>. ...`

The separate area badge was gone, but the internal zone identity was still visible in prose, so one physical place could still read as two named places.

### Patch 15
`patches/v0.12.3_playtest_room_description_location_identity_ux5a.patch`

Changes `room.desc` from `${zone.name}. ${room.name}.` to `${room.name}.` while retaining zone metadata internally.

The single-location regression now covers this exact path.

### Patch-15 verification
Machine:
- single location **21/0**
- explicit improv **20/0**
- restored authored mysteries only **5136/0**
- encounter purpose **4337/0**
- device findings **27/0**
- search/encounter **2328/0**
- Adventure Code **405/0**
- UX4 **1797/0**
- content regression **5830/0**
- focused patch-15 runtime **6844/0**
- 11 scripts **0 syntax errors**

Fresh headless Chromium interaction smoke on exact patch-15 HTML: **22/0**.

Browser caveat: container-local navigation/native localStorage could not be used, so DevTools document injection + in-memory localStorage shim was used. This proves current DOM/click/mobile-view behavior, not native persistence/clipboard.

Detailed evidence:
- `docs/UX5A_GATE_REVIEW_2026-10-27.md`
- `docs/UX5A_BROWSER_QA_2026-10-27.md`

## Test-repository finding
The project status previously referenced `tests/QA_AUTHORED_MYSTERIES_ONLY_UX5A.js`, but that file was absent from the runtime branch at the start of the 2026-10-27 review.

The test has now been restored and passes **5136/0**, covering all six current mystery subjects and explicit no-random-puzzle behavior. The old 3075/0 value remains historical evidence only.

## Current priority / continuation
1. **Physical-test patch 15 on actual iPad/mobile.**
2. Confirm narrator comprehension for Boka + purpose/solve/payoff.
3. Confirm trap block/retreat/resolve feels clear by touch.
4. Confirm one location identity visually after patch 15.
5. Confirm `SE DEG RUNDT`, full-backpack flow, combat and non-combat controls by touch.
6. Confirm native save/reload/resume and Adventure Code copy/paste.
7. Representative legacy active-combat save if available.
8. Fix UX5A defects only if anything fails.
9. When physical gate is green: record evidence -> confirm final regression -> merge UX5A to `main` -> verify -> create `narrative/story-graph-v1` -> carry approved prep docs -> start NG1.

Do not expand Adventure Blueprint bank. Do not start full DM Control Surface, UX5B or Multiscreen first.

Content review may continue as documentation; reviewed through `BROTROLLET`, next subject **DEN LEVENDE RUSTNINGEN**.
