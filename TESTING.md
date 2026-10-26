# MONSTERHULEN - TESTING

## Verification levels
Never conflate:
- implemented,
- static/source verified,
- automated runtime tests passed,
- browser tested,
- physical device tested,
- editorial/manual narrative quality accepted.

Structural green never proves narrative quality.

## Current UX5A runtime evidence
Runtime branch: `ux5/searchable-rooms-encounter-tracks`.

Patch-14 automated evidence:
- explicit-improv **20/0**
- encounter-purpose **4337/0**
- authored-mysteries-only **3075/0**
- single-location **19/0**
- targeted device **27/0**
- search/encounter **2328/0**
- Adventure Code **405/0**
- UX4 **1797/0**
- content regression **5830/0**
- 11 inline scripts **0 syntax errors**

Historical browser results do not certify patches 11-14. Fresh current browser QA and physical target-device retest remain open.

Do not implement Narrative Graph runtime until UX5A physical gate is green and merged.

## Narrative Graph V1 validator contract
Must reject:
- missing setup/signal,
- unavailable critical requirement,
- provider behind consuming gate,
- provider dependency cycle,
- critical dependency on lucky optional spawn,
- merchant price/trade dependency with no reachable source,
- critical acquisition relying only on one mandatory persuasion roll,
- required hidden resource without clue/fail-forward,
- guardian without required non-combat route,
- premature knowledge reveal,
- stale/expired complication,
- action completion caused merely by owning requirement,
- auto-use of possessed solution,
- missing purpose/stakes/resolvedWhen/payoff,
- payoff with no coherent world effect,
- generic progress count/filler stages,
- unrelated puzzle/mechanic,
- missing narrator-improv contract for intentionally open payload,
- critical state depending on untracked narrator invention,
- incompatible subject/role,
- interaction shell revealing unrevealed requirement,
- interaction shell allowing undeclared critical state mutation,
- critical slot/gate auto-filled from inventory.

## Provider-system tests
For critical resource plans verify:
- at least one reachable provider before consumption,
- nested provider dependencies reachable,
- no circular provider chain,
- no provider hidden behind target gate,
- optional providers may vary without breaking guaranteed route,
- thematic critical room-find reservation deterministic,
- optional room finds may vary,
- critical merchant offer has obtainable price/trade or alternate/fail-forward,
- low social roll never removes all critical acquisition paths.

Reference cases:
- `SUMPTROLLET requires FOOD`,
- `BROTROLLET` selected request binds provider plan before map materialization.

## Subject/role/outcome tests
Verify:
- only approved subject/role combinations selected,
- subject ID stable/separate from Storylet ID,
- outcome compatible with role,
- critical outcome tracked + world effect applied,
- ambient subject cannot silently become critical,
- repetition penalties never override hard validity.

## Interaction shell / popup tests
Canonical spec: `docs/INTERACTION_SHELLS_V1.md`.

### SLOT_GATE / ASSEMBLY
Automated:
- slots hidden until knowledge reveal,
- owning resources does not auto-place,
- explicit `PLACE_RESOURCE` required,
- wrong item not consumed,
- correct placement target/inventory atomic,
- partial placement persists save/reload,
- full slots do not skip separate activation if authored,
- activation applies exact gate/machine world effect,
- repeated action ID cannot duplicate effect when idempotency layer exists,
- undo restores target + inventory atomically when undo exists.

Browser/touch:
- popup readable on iPad/mobile,
- open/close/reopen preserves state,
- placement understandable,
- accidental double tap safe,
- partial progress clear,
- child still free to propose unlisted solution.

### Player-data isolation
Player-visible shell/state must not contain:
- narrator-only answer,
- hidden provider location,
- future phase state,
- unrevealed slot identity,
- narrator improv guardrails,
- secret map/story facts.

## DM semantic-control tests
When NG4 begins verify DM can understand/control scene without raw edits:
- purpose,
- requirements,
- provider context,
- outcomes,
- resolvedWhen,
- world effects,
- authored vs improv boundary.

Actions:
- `GODTA LØSNING` applies canonical effects,
- `FORHANDLE / USIKKERT FORSØK` triggers physical die only by DM choice,
- low negotiation follows authored fail-forward,
- `START KAMP` unavailable when `combatAllowed=false`,
- `START KAMP` not presented as default child answer,
- authored outcome controls cannot create impossible state.

## Optional combat tests
- no auto-start from subject category,
- DM explicit start required,
- physical dice only,
- non-combat route preserved for critical guardians where required,
- surrender/retreat/distraction/friendship/etc. can resolve,
- no required kill semantics,
- child-friendly presentation physically/editorially reviewed.

## Typed transition/action tests
Once implemented:
- preconditions validated before effects,
- failed action causes no partial mutation,
- composite effect atomic,
- stable action ID,
- duplicate request idempotent where applicable,
- save/reload does not replay committed effect,
- Adventure Code reconstructs deterministic initial graph/provider plan,
- session progress remains save-state responsibility.

## NG5 structural volume
Generate >=1000 `CRYSTAL_MACHINE` adventures across seeds/lengths.

Check:
- graph validity,
- provider validity,
- knowledge timing,
- acquisition-family diversity,
- all crystals can be owned while assembly pending,
- slot state does not auto-fill,
- gate remains closed until authored assembly/activation,
- no stale complication,
- deterministic reconstruction,
- world effects/payoff consistency,
- existing UX regressions remain green.

1000/0 does not prove narrative quality.

## NG6 browser/touch QA
Test actual flows:
- quest reveal before slot knowledge,
- provider acquisition,
- NPC favor,
- guardian non-combat,
- merchant/social bargain if selected,
- deliberate slot placement,
- partial assembly,
- return/activation/gate,
- DM alternate-solution acceptance,
- optional combat if selected,
- no narrator-data leak.

## NG7 manual editorial/family playtest
10-20 generated Crystal Machine adventures.

Record:
- goal clarity,
- causal/temporal coherence,
- provider naturalness,
- DM cognitive load,
- child agency/free solutions,
- whether popups feel tangible/supportive vs overly videogame-like,
- repetition,
- payoff quality,
- whether narrator repairs missing logic.

## NG8 decision gate
Accept / revise / abandon architecture.

Do not convert another blueprint before NG8.

## Future DM Control Surface verification
If NG accepted:
- novice-DM scene summary clarity,
- player-view preview accuracy,
- action history completeness,
- undo movement/resolve/item placement-use/die face/encounter transition,
- undo cannot duplicate rewards/items/payoffs,
- corrected state remains save-compatible.

## Future Multiscreen / Shared Session verification
Only after canonical action/state model is stable:
- DM host authoritative,
- iPad touch client,
- display-only external screen,
- same-Wi-Fi join,
- reconnect,
- duplicate requests no duplicate effect,
- narrator-only data never transmitted/rendered to player surface,
- DM player preview correct,
- undo re-syncs all clients,
- save/reload mid-session,
- physical family playtest without network administration burden.

## Repository verification
Repository-health remains open. Full active source/assets/tests must eventually reconstruct without chat or external release ZIP.
