# MONSTERHULEN - PLAYTEST FINDINGS

Updated: 2026-10-26
Status: active UX/story findings. UX5A physical device retest remains open. Narrative Graph V1 is next only after UX5A is physically green and merged.

## 1. Encounters are too ambiguous for the DM
Observed: consequences/options can look mandatory, child actions may not match generated choices, and novice narrator may not understand what a scene is for.

Implemented across UX layers: `FRITT KAST`, non-consuming normal item use, beginner narrator guidance, physical D6 faces, and now patch 13 purpose/stakes/resolution/payoff guidance.

## 2. Map navigation is not child-intuitive enough
Implemented map-primary navigation with tappable adjacent state; arrows remain fallback.

## 3. Dice input should look like a physical die
Implemented six D6 faces; no digital RNG.

## 4. Finale could be reached too early
UX4 adds hard story progression gates. Later findings show structural gating alone does not prove narrative strength.

## 5. Secret doors need discovery play
Implemented clues, physical uncertainty when needed, fail-forward and no story-gate bypass.

## 6. Rooms need a reason to be investigated without becoming loot detectors
UX5A provides generic investigation while keeping hidden finds optional, non-critical and fail-forward.

## 7. Encounters need durable consequences, not generic duration
Initial UX5A used generic 3/4-step progress to avoid one-roll victories. Physical play later proved this could become meaningless bookkeeping. Patch 13 supersedes the generic-progress model: non-combat resolution follows authored fiction; progress exists only when explicit meaningful stages are written.

## 8. Critical prerequisites can be structurally valid but narratively disconnected
`CRYSTAL_MACHINE` showed three required crystals could be isolated pickups. Decision: Narrative Graph V1 + curated Storylet Matrix.

## 9. Ready story gate felt cosmetic
Initial key gate could unlock + traverse in one tap. Patch 10 split opening/traversal, then finding 12 exposed remaining auto-solution issue.

## 10. Random puzzle can be logical but fictionally irrelevant
`DEN HVISKENDE VEGGEN` + unrelated `STEINTRINNENE` exposed that random puzzle attachment lacked context. Patch 13 now makes ambient puzzle use opt-in; puzzle must have an authored role and does not automatically grant generic progress.

## 11. Story complication can arrive after its dramatic purpose is gone
`SKYGGEHEKSA` could surface after the objective it should hinder was complete. Narrative Graph requires phases/expiry/transform rules.

## 12. Possessing the solution must not make app choose the action
Patch 11 makes keyed door present the lock first and requires deliberate `BRUK` on the key. General child-agency rule: obstacle/affordance first, child action second.

## 13. Player-facing rooms had two competing names
Patch 12 makes room name the single visible location identity while preserving internal zone metadata.

## 14. `ANNEN LØSNING` progress boxes had no fictional meaning
Observed with `REGNBUENETTET`:
- four boxes appeared with no authored four-step sequence,
- Forteller could reasonably think they had to invent four actions,
- the net did not actually block travel,
- completing the track changed nothing,
- therefore solving the scene had no payoff.

This exposed a system flaw: mechanics existed before the scene's function had been authored.

Patch 13 on runtime branch:
- every generated non-treasure encounter declares `purpose`, `stakes`, `resolvedWhen`, `payoff`,
- generic 3/4-box progress is removed,
- progress exists only for authored `progressStages`,
- narrator gets `HVA ER GREIA?`, `NÅR ER DET LØST?`, `HVA ENDRES DA?`,
- traps block onward travel while active and permit retreat,
- resolving a trap actually frees the route,
- resolution action labels match scene role,
- random ambient mystery puzzles are removed unless explicitly authored.

`REGNBUENETTET` is reference behavior: party can be blocked/stuck, child invents how to escape/get through, die only if that attempt is uncertain, one sufficient plan may solve it, and resolution makes the onward route usable.

This finding must shape Narrative Graph V1. A graph/storylet node that has valid prerequisites but no meaningful purpose/payoff is still narratively invalid.

## Verification after finding 14
Patch-13 runtime evidence:
- encounter-purpose **4337/0**,
- single-location **19/0**,
- device **27/0**,
- search/encounter **2295/0**,
- Adventure Code **405/0**,
- UX4 **1797/0**,
- content **5809/0**,
- 11 scripts **0 syntax errors**.

Patch-13 runtime SHA-256: `e00ba3c6f3ff1511be32e04e1de7f46ffc0404aa012e2b2600c05ace50fd3db8`

Patch-13 SHA-256: `74499137374e50bbf0f9d6385e23073bd7e51e7744b3488f5ade085860f27437`

Fresh browser certification is open. Physical retest is required.

## Priority now
1. Physically retest patch-13, especially `REGNBUENETTET` block/retreat/solve/payoff flow.
2. Judge whether narrator purpose guidance is understandable without prior system knowledge.
3. Continue remaining UX5A smoke.
4. Fresh browser QA when harness is usable.
5. If physical gate is green, merge UX5A, then create real Narrative Graph branch and start WP-NG1.
6. Do not start UX5B or expand blueprints first.
