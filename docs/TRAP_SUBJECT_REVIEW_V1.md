# Monsterhulen - Trap Subject Review V1

Status: **EDITORIAL PREP ONLY - NO RUNTIME IMPLEMENTATION**
Updated: 2026-10-27
Branch: `narrative/story-graph-v1-prep`

Purpose: review the complete existing `TRAPS` bank as authored environmental blockers.

No new traps or blueprints are added. UX5A physical gate remains binding.

## Shared TRAP principles
A trap/hindrance is not just flavor text plus a resolve button. If it is active and story-relevant it needs:
- visible setup/signal,
- concrete stakes,
- a child-proposed action,
- physical die only when execution is uncertain,
- explicit `resolvedWhen`,
- concrete world effect/payoff,
- fail-forward,
- retreat when fiction allows,
- no arbitrary generic progress boxes.

A low die result changes the attempt; it does not automatically satisfy the obstacle.

---

## DET KILENDE GULVET
**Identity:** comic floor hazard that triggers laughter and makes ordinary crossing difficult.

**Allowed roles:** `BLOCK_PATH`, `COMPLICATION`, contextual `PUZZLE_CARRIER` for route observation.

**Incompatible roles:** damage trap, combat, critical clue source, exact-item gate.

**Requirements/providers:** observe quiet tiles, jump/list/balance, rope, magic or another route. The quiet-tile signal must be present before expecting a route solution.

**Outcomes/world effects:** safe route established, character reaches other side, or floor is temporarily neutralized.

**Uncertainty:** die only for a risky crossing attempt. A low result can create noise, delay or comic repositioning, but must not create an untracked permanent loss of a critical item.

**Interaction shell:** environmental blocker; no bespoke minigame required.

**Critical safety:** **YES**, as a short blocker with clear signal and fail-forward.

**Repetition:** one slapstick traversal hazard per short adventure.

---

## BEINFELLEN
**Identity:** unstable bone fall above/near a doorway, held by a visible support point.

**Allowed roles:** `BLOCK_PATH`, `COMPLICATION`, environmental `PUZZLE_CARRIER`.

**Incompatible roles:** invisible surprise damage, permanent route deletion after one failed roll, combat.

**Requirements/providers:** notice support rope/stone, brace, duck/crawl, secure, trigger safely or bypass. Exact gear cannot be mandatory unless provider-planned.

**Outcomes/world effects:** trap secured, debris settles into a traversable state, or safe route becomes available.

**Failure/temporal rule:** if bones fall, resulting obstruction must have an explicit temporary/new role and a way forward. Do not leave a stale complication hanging after its dramatic function is over.

**Interaction shell:** environmental blocker.

**Critical safety:** **YES** if a low roll cannot permanently sever the only route.

**Repetition:** avoid another falling-ceiling/doorway trap in same route.

---

## BOBLEPORTEN
**Identity:** doorway physically filled by elastic bubbles that react to stillness.

**Allowed roles:** `BLOCK_PATH`, `GATE`, `PUZZLE_CARRIER`, `COMPLICATION`.

**Incompatible roles:** combat, hidden exact-item lock, unrelated logic puzzle.

**Requirements/providers:** stillness is a built-in environmental affordance; puncturing, redirecting, magic or bubble testing may also work. `THING_BUBBLE_BOTTLE` can provide information but is not the sole answer.

**Outcomes/world effects:** bubbles shrink/disperse/open a stable passage.

**Interaction shell:** optional environmental gate shell if a selected Storylet wants explicit testing/activation; otherwise standard blocker controls.

**Critical safety:** **YES**, because the scene carries its own observable solution family.

**Repetition:** avoid paired bubble mechanics unless one later uses a clearly different role.

---

## SKYGGEGULVET
**Identity:** moving shadow hazard that visibly retreats from light.

**Allowed roles:** `BLOCK_PATH`, `PUZZLE_CARRIER`, `COMPLICATION`, environmental `GATE`.

**Incompatible roles:** random darkness debuff, combat, exact-lantern requirement without environmental light.

**Requirements/providers:** light can come from carried gear, environment, reflection, magic or another child idea. A critical version must provide reachable light affordance even when hero lacks a lantern.

**Outcomes/world effects:** safe illuminated route becomes available, shadows relocate, crossing is completed.

**Knowledge rule:** light behavior is signaled before it becomes a required causal rule.

**Critical safety:** **YES** with provider-independent environmental affordance.

**Repetition:** do not stack with Krystallslimet/Solslukeren/Lysslukeren if the same “move light” mechanic already carried a major beat.

---

## DEN SOVENDE TRAPPA
**Identity:** animate staircase whose steps sleep at different depths and can wake/move.

**Allowed roles:** `BLOCK_PATH`, `PUZZLE_CARRIER`, `COMPLICATION`.

**Incompatible roles:** combat, hidden pattern with no signal, arbitrary rhythm minigame.

**Requirements/providers:** quiet movement, choosing deeper-sleeping light steps, rhythm or another traversal plan. No exact item requirement.

**Outcomes/world effects:** hero reaches top, staircase settles, route becomes stable/usable.

**Uncertainty:** die may resolve risky execution after the child chooses a route; it should not decide which steps are “correct” instead of observation.

**Critical safety:** **YES**, if low results create changed traversal conditions rather than a softlock.

**Repetition:** avoid another sleep/quiet traversal on the same chain.

---

## REGNBUENETTET
**Identity:** colored-thread web/net whose strands become transparent/less obstructive under matching color.

**Allowed roles:** `BLOCK_PATH`, `PUZZLE_CARRIER`, `GATE`, `COMPLICATION`.

**Incompatible roles:** generic progress track, hidden exact-color inventory lock, unrelated random puzzle.

**Requirements/providers:** color matching is a visible rule, but solutions can include crawling, cutting a credible route, magic, environmental colors or other plausible plans. If an authored critical variant requires a particular colored resource, that resource needs a validated provider route before the net.

**Outcomes/world effects:** net opens/parts, safe passage becomes available.

**Current UX5A contract remains binding:** no generic progress boxes; one good plan can be sufficient; active trap blocks onward, allows retreat, and resolution frees the route.

**Interaction shell:** environmental gate; a tangible color-target shell is optional only if later Storylet design genuinely benefits from explicit placement/selection.

**Critical safety:** **YES**, strong blocker when color cause/effect is signaled and not reduced to inventory auto-use.

**Repetition:** avoid another color-matching gate unless it belongs to one coherent color motif.

---

# Cross-bank findings from TRAPS review

## 1. Every critical trap is a world-state transition
The important state is not “trap encounter complete”. It is a concrete transition such as:
- route blocked -> route open,
- unstable -> secured,
- opaque/obstructing -> passable,
- moving/unsafe -> stable/safe.

## 2. Environmental affordance must exist before item dependency
A carried item can improve or simplify a solution, but critical traps should not quietly become exact inventory locks unless the graph deliberately plans a provider.

## 3. Observation and execution must remain separate
For puzzle-like traps:
- child observes/infer rule without dice,
- physical die is only for uncertain execution,
- die result cannot replace missing story prerequisite or causal understanding.

## 4. Low results need explicit fail-forward states
A failed attempt may create:
- stronger signal,
- changed obstacle position,
- temporary complication,
- new safe information.

It must not destroy the only critical route.

---

# Category checkpoint
The complete existing **TRAPS** bank is now editorially reviewed.

No traps were added. No Adventure Blueprint was added. No runtime was implemented.

## Exact editorial continuation
Next category: existing `MYSTERIES` bank.

Next subject:

**DEN HVISKENDE VEGGEN**

Then continue in source order through Boka som skriver tilbake, Den sovende døren, Speilet som lyver, Den flyvende skoen and Stjernene i taket.
