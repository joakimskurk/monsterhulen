# MONSTERHULEN - PLAYTEST FINDINGS

Updated: 2026-10-26
Status: UX5A physical device retest remains open. Narrative Graph V1 is next only after UX5A is physically green and merged.

## 1. DM ambiguity exposed need for explicit scene semantics
Successive UX layers established:
- child actions may not match generated buttons,
- narrator needs to know what a scene is for,
- items should not be silently consumed/auto-used,
- dice are only for genuine uncertainty,
- scene needs purpose/stakes/resolution/payoff.

Patch 13/14 address current runtime symptoms; graph-aware narrator remains future work.

## 2. Map navigation should follow child instinct
Map-primary tappable navigation implemented; arrows remain fallback.

## 3. Physical dice are core interaction
Six visible D6 faces record real die result; no digital RNG.

## 4. Structural finale gating is necessary but not sufficient
UX4 prevents early finale/bypass, but later playtest proved structurally valid dependencies can still be narratively weak.

## 5. Secret doors need discovery play
Clue/investigation/fail-forward implemented; secrets cannot bypass critical gates.

## 6. Search should invite exploration without becoming a loot detector
UX5A room search uses hidden deterministic optional finds/fail-forward/full-backpack preservation. Manual question remains whether search feels voluntary.

## 7. Generic encounter duration is not meaningful story
Patch 13 removed arbitrary non-combat 3/4-box progress. Progress exists only for authored fictional stages.

## 8. `CRYSTAL_MACHINE` exposed causal disconnect
Three reachable parts can still be three unrelated pickups. Decision: Narrative Graph + curated Storylet Matrix + deliberate return/assembly.

## 9. Ready key gate felt cosmetic
Auto unlock/traverse made key invisible as player action.

## 10. Random puzzle can be fictionally irrelevant
Ambient puzzles now require authored contextual role rather than category match.

## 11. `SKYGGEHEKSA` exposed timing/expiry problem
A complication may not first appear after its purpose has expired. Narrative Graph needs phases/expiry/new later role.

## 12. Possessing solution must not choose action
Patch 11: keyed door remains locked until child deliberately uses key. General principle applies to all action-bearing resources.

## 13. One physical room should have one visible identity
Patch 12: room name is canonical visible location; zone remains internal.

## 14. `REGNBUENETTET` exposed purpose/payoff failure
Four boxes had no fiction, net did not block anything, completion changed nothing.

Patch 13 established purpose/stakes/resolvedWhen/payoff + real obstacle world effect + authored-progress-only.

## 15. `BOKA SOM SKRIVER TILBAKE` exposed authored-vs-improv ambiguity
Intentional narrator improvisation is valid, but app must explicitly say when no hidden answer exists and bound what may be invented.

Patch 14 implements current ambient reference.

## 16. Subject identity should not be locked to one narrative function
Editorial review showed a stronger variation model:
- Pannekakezombien may block route, grant item, reveal clue or puzzle-rule,
- Den bortkomne zombien may support route/help/follow-clue/reward roles,
- Skjelettdanseren may remain music/social with different payoffs,
- Boka som skriver tilbake may be open improv, NPC-like, tracked clue, puzzle/gate or item wrapper.

Decision:
- stable subject ID separate from Storylet ID,
- only pre-authored compatible roles,
- no unrestricted combinatorial role mixing,
- repetition penalty rather than shallow volume.

Candidate sibling subjects such as Den snakkende dukken / Det levende bildet remain ideas, not active-bank additions.

## 17. Required resources need provider planning
`SUMPTROLLET` / `BROTROLLET` review established that requirements cannot rely on lucky random loot.

Initial provider families:
- thematic `ROOM_FIND`,
- `MERCHANT_PURCHASE`,
- `TRADE`,
- `SOCIAL_BARGAIN`,
- `NPC_REWARD`,
- `PUZZLE_REWARD`,
- `SEARCH_SECRET`,
- explicitly allowed starting/owned resource.

Optional resources may be genuinely random when thematic.

Critical resources need at least one reserved/validator-proven reachable route before consumption; nested provider dependencies must also be reachable/non-circular.

Critical progression cannot depend on one mandatory persuasion roll.

## 18. DM needs semantic scene control
DM must be able to:
- understand what scene requires and what it changes,
- see where required resource can be obtained,
- accept plausible unlisted solution,
- trigger uncertainty/die only when needed,
- start optional combat only when authored,
- apply canonical outcome/world effect,
- avoid raw state editing.

This creates DM Control Surface direction and NG4 semantic-control requirement.

## 19. Combat should be optional and DM-started
Skjelettvakten is reference.

Combat is a Storylet capability (`combatAllowed`), not default monster identity. Child may propose; DM explicitly starts. Critical guardians normally keep non-combat route. Child-friendly/non-graphic; surrender/retreat/friendship/etc. are valid outcomes.

## 20. Some story actions need tangible interaction shells/popups
Reference: gate/machine requiring red/blue/yellow resources.

Desired flow:
- reveal sockets first,
- player taps target,
- popup shows slots,
- owned resources do not auto-fill,
- child places explicitly,
- wrong item not consumed,
- partial placement persists,
- full slots resolve or enable authored activation,
- world effect opens/activates target,
- later undo restores inventory + target atomically.

This generalizes “possession != action”.

Planned shell families: slot/assembly, locked item-use, NPC favor/dialogue, merchant/trade, puzzle, combat, reward choice, search/inspect.

Player shell must never leak unrevealed/narrator-only information.

## 21. Undo and Shared Session should reuse canonical action transitions
Future DM-host/player-client sync, reconnect and undo all benefit from stable typed action IDs and one authoritative state transition boundary.

Future only; do not implement before story/world state transitions are stable.

## 22. Open source should inform patterns, not replace architecture now
Limited survey candidates:
- boardgame.io - state/log/undo patterns,
- Colyseus - authoritative sync/reconnect,
- rot.js - roguelike algorithms,
- Epoch Mapper - structured dungeon events/quests/interactions.

Decision: adopt nothing now. Current bottleneck is story/state semantics.

## Current runtime verification
Patch-14 automated evidence remains:
- explicit-improv **20/0**
- encounter-purpose **4337/0**
- authored-mysteries-only **3075/0**
- single-location **19/0**
- targeted device **27/0**
- search/encounter **2328/0**
- Adventure Code **405/0**
- UX4 **1797/0**
- content regression **5830/0**
- scripts **0 syntax errors**

Fresh browser certification and physical retest remain open.

## Priority / continuation
1. Finish UX5A physical patch-14 retest.
2. Fix UX5A defects only until green.
3. Editorial review may continue as docs; current reviewed range ends after `BROTROLLET`.
4. Next subject: **DEN LEVENDE RUSTNINGEN**.
5. Do not expand Adventure Blueprint bank.
6. When UX5A green: record -> regress -> merge -> verify -> create real Narrative Graph runtime branch -> start NG1.
