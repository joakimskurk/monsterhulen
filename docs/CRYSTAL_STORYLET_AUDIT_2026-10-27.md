# CRYSTAL_MACHINE - Storylet Editorial Audit 2026-10-27

Status: **EDITORIAL PREP ONLY - NO RUNTIME IMPLEMENTATION**
Branch: `narrative/story-graph-v1-prep`

Purpose: audit the nine candidates in `docs/CRYSTAL_STORYLET_BANK_V1.md` against the completed full-bank subject review and updated Storylet Matrix constraints.

This audit does not start NG2 runtime. UX5A physical gate remains binding.

## Verdict vocabulary
- **APPROVE**: suitable as an NG2 candidate without structural rewrite.
- **APPROVE WITH REVISIONS**: core scene is strong, but listed constraints must be incorporated before coding/data authoring.
- **REJECT**: not suitable for the initial bank without redesign.

No candidate is “playtest proven” by this audit.

---

# SEARCH_SECRET

## `CRYSTAL_SEARCH_LIGHT_CRACK` - LYSET I SPREKKEN
**Verdict: APPROVE WITH MINOR REVISIONS**

Strengths:
- setup visibly signals the hidden source before search,
- crystal identity is not revealed until discovery,
- fail-forward strengthens evidence rather than blocking,
- no exact item requirement,
- reward is causally tied to the observed colored light.

Required revisions/constraints:
1. Add `mechanicFamilies: [SEARCH_SECRET, LIGHT_OBSERVATION]`.
2. Materialization must guarantee a plausible crack/stone seam rather than attaching the copy to a room where no such feature can be described honestly.
3. Do not combine in the first V1 adventure with `CRYSTAL_GUARDIAN_LIGHT_SLIME` unless scoring finds no stronger combination; both make colored light the central critical signal.
4. The small shard on first low result is a **signal**, not an additional resource instance and cannot satisfy a crystal requirement.

Critical safety: **YES**.

---

## `CRYSTAL_SEARCH_CHIME` - KRYSTALLKLANGEN
**Verdict: APPROVE**

Strengths:
- strongest sensory contrast in the search set,
- room signal is repeatable and causal,
- no item dependency,
- low results naturally fail forward,
- child can solve through listening/testing rather than “search button luck”.

Constraints:
1. Add `mechanicFamilies: [SEARCH_SECRET, SOUND_LOCALIZATION]`.
2. Room materialization must contain plausible floor/rubble/hollow feature.
3. Tapping/testing must remain child-proposed; app should not present “hit these three stones” as a closed answer sequence.

Critical safety: **YES**.

Editorial note: this is the best default SEARCH_SECRET candidate for the first manual Crystal Machine story because it contrasts well with both NPC favor and most guardians.

---

## `CRYSTAL_SEARCH_REFLECTION` - FARGEN SOM IKKE HØRER HJEMME
**Verdict: APPROVE WITH HARD MATERIALIZATION RULE**

Strengths:
- good observation/triangulation play,
- signal appears before action,
- fail-forward adds angles/seam evidence,
- reflection is story-causal rather than generic puzzle.

Required constraints:
1. Existing hard reflective-surface requirement remains a **generation rejection rule**, not a narrator repair instruction.
2. Add `mechanicFamilies: [SEARCH_SECRET, LIGHT_REFLECTION]`.
3. **Reject pairing with `CRYSTAL_GUARDIAN_LIGHT_SLIME` for initial V1 selection.** Both would make reflection/moving light central to two of three critical branches.
4. Crystal source/direction must be physically coherent with the provided reflective feature.

Critical safety: **YES**.

---

# NPC_FAVOR

## `CRYSTAL_NPC_OWL_PAGE` - UGLEBIBLIOTEKAREN OG DEN BORTBLÅSTE SIDEN
**Verdict: APPROVE WITH PROVIDER-BINDING CLARIFICATION**

Strengths:
- existing subject identity strongly supports careful book/page retrieval,
- crystal is visible before task and reward transfer is explicit,
- secondary dependency creates a small meaningful excursion,
- free-form retrieval solutions remain open.

Required constraints:
1. This is a **separate authored Storylet variant** of Uglebibliotekaren, not a mutation of the current ambient “stuck book” scene.
2. `LOST_PAGE` is a scenario-specific critical resource/provider node, not generic room loot.
3. Page provider is bound and reachable before owl placement/favor completion; never behind the machine gate.
4. Page cannot be silently auto-returned because it is owned. Child/DM explicitly returns/transfers it.
5. Add `mechanicFamilies: [NPC_FAVOR, FETCH_RETURN]`.

Critical safety: **YES**.

---

## `CRYSTAL_NPC_SMITH_SPRING` - DVERGSMEDEN OG DEN MANGLENDE FJÆRA
**Verdict: APPROVE WITH PROVIDER-BINDING CLARIFICATION**

Strengths:
- excellent fit with Dvergsmeden’s established mechanism identity,
- metallic sound/glint gives concrete fail-forward signal,
- crystal as incidental workshop object is believable,
- no exact tool required.

Required constraints:
1. This is a distinct authored variant: current source has a spring stuck *inside* a lock; this candidate has a spring that bounced *away*. Keep Storylet identity separate so the subject remains consistent but logic is not conflated.
2. `LOCK_SPRING` is a scenario-specific critical resource/provider node, never generic optional loot.
3. Explicit return/repair action is required before reward transfer.
4. Add `mechanicFamilies: [NPC_FAVOR, SMALL_OBJECT_RECOVERY, PRECISE_REPAIR]`.
5. Do not pair with another precise-repair critical beat in the same generated adventure.

Critical safety: **YES**.

---

## `CRYSTAL_NPC_CARTOGRAPHER_MARKER` - ALVEKARTOGRAFEN OG DET MANGLENDE LANDMERKET
**Verdict: APPROVE WITH TOPOLOGY/KNOWLEDGE REVISION**

Strengths:
- avoids another object fetch,
- child succeeds by noticing and describing the world,
- no die for obvious observation,
- good fit with cartographer identity.

Required revision:
The current quest line says:
> «Jeg vet gangen fortsetter ...»

This must not imply that the cartographer creates/reveals topology not already known/authorized by the graph.

Preferred framing:
- the cartographer is documenting a **reachable already-authored junction/landmark**, or
- needs confirmation of which visible landmark belongs at a known map position.

Hard constraints:
1. `MAP_LANDMARK` is a pre-authored room feature and graph truth.
2. The landmark room is reachable before the machine gate and is not final/hidden behind critical progression.
3. Returning the observation changes knowledge/favor state; it does not create a new edge.
4. Add `mechanicFamilies: [NPC_FAVOR, OBSERVATION_RETURN, MAP_KNOWLEDGE]`.

Critical safety: **YES after wording/topology revision**.

---

# GUARDIAN

## `CRYSTAL_GUARDIAN_LIGHT_SLIME` - LYSSLIMET
**Verdict: APPROVE WITH SUBJECT/COMBAT/PAIRING CLARIFICATION**

Strengths:
- crystal is visibly bound to guardian,
- nonviolent solution is directly signaled by behavior,
- strong cause/effect,
- guardian remains a creature after resolution rather than HP container.

Required constraints:
1. Bind to the existing SLIME subject/approved variant explicitly. The provider relationship exists because **this Storylet says the crystal is inside the slime**, not because “Krystallslimet” sounds crystal-like.
2. Add `mechanicFamilies: [GUARDIAN, LIGHT_LURE]`.
3. Initial V1 should set `combatAllowed=false` **or** explicitly justify why combat is needed for this candidate. Editorial preference: `false`; the scene is strongest as environmental/social luring and this preserves combat sparsity.
4. Reject pairing with `CRYSTAL_SEARCH_REFLECTION`; strongly penalize pairing with `CRYSTAL_SEARCH_LIGHT_CRACK`.
5. Resolution must explicitly transfer/release the crystal; moving the slime alone does not automatically add it to inventory.

Critical safety: **YES**.

---

## `CRYSTAL_GUARDIAN_TRADER_CRAB` - BYTTEKRABBENS FINN
**Verdict: APPROVE WITH CRITICAL-TRADE GUARANTEE**

Strengths:
- strongest existing canonical trade subject,
- crystal is visible and desired outcome clear,
- child proposes an offer rather than choosing “persuade”,
- supports object story/favor/free-form routes,
- excellent test of provider semantics without abstract currency.

Required constraints:
1. Keep existing rule forbidding trade of another branch’s unique critical resource.
2. At least one critical-safe route must exist even if the hero has no attractive optional loot. Acceptable routes include story/service/favor/alternate non-resource solution.
3. One failed uncertain negotiation cannot permanently remove the crystal; low result produces counteroffer/favor/stronger signal.
4. Set `combatAllowed=false` for initial V1. Full-bank review identifies Byttekrabben as a trade subject, not a combat subject.
5. Transfer is explicit/atomic: offered item leaves inventory only when trade commits; crystal enters inventory in the same authored transition.
6. Add `mechanicFamilies: [GUARDIAN, TRADE_NEGOTIATION]`.

Critical safety: **YES**.

Editorial note: this is the strongest candidate for testing `TRADE` semantics later, but the first Crystal Machine manual story may prefer Light Slime or Golem if the goal is to keep the three acquisition families maximally distinct from provider/economy concerns.

---

## `CRYSTAL_GUARDIAN_GOLEM` - STEINGOLEMMEN SOM HOLDER VAKT
**Verdict: APPROVE WITH PARALLEL-BRANCH AND AUTHORED-TRUTH REVISION**

Strengths:
- guardian motive directly connects to machine repair,
- strong visual relationship between golem, bowl and machine colors,
- explicit noncombat logic,
- resolution is permission/stand-down rather than defeat.

Required constraints:
1. This Storylet is valid only **after the main machine requirement reveal** in the reference graph. This avoids leaking the three-color requirement before the child has earned it.
2. “Show already-found crystal(s)” may be an optional approach only. It must **never be a prerequisite**, because the three acquisition branches are designed to remain parallel/reachable in any order.
3. If an old command/instruction is usable, its content is authored truth with an observable clue; narrator cannot invent the critical command.
4. Add `mechanicFamilies: [GUARDIAN, PERMISSION_PROOF]`.
5. Strongly penalize/reject this guardian if another selected critical branch already uses permission/proof as its main mechanic.
6. `combatAllowed=true` may remain for this candidate, but UI presents noncombat logic first and DM must explicitly start combat.
7. Crystal transfer remains explicit after golem yields permission.

Critical safety: **YES after revision**.

---

# Cross-candidate selection constraints

## 1. Three branches must differ in play, not merely role labels
The intended family mix `SEARCH_SECRET + NPC_FAVOR + GUARDIAN` is necessary but not sufficient.

Also avoid mechanic duplication across the chosen three.

### Initial hard/strong pair constraints
- `SEARCH_REFLECTION` + `GUARDIAN_LIGHT_SLIME`: **reject** for initial V1 due strong reflection/light overlap.
- `SEARCH_LIGHT_CRACK` + `GUARDIAN_LIGHT_SLIME`: **strong repetition penalty**.
- any future precise-repair NPC favor + another precise-repair guardian/search: penalize.

## 2. Main requirement reveal occurs before all three acquisitions
Reference flow remains:
`QUEST_REVEAL -> three parallel acquisition branches -> RETURN -> ASSEMBLE`

This means:
- colored crystal need is known before branch-specific player UI assumes it,
- Golem’s three-color symbol no longer leaks hidden requirement,
- branch order remains free.

## 3. Each crystal is a planned critical resource instance
Generic UX5A treasure/search items cannot accidentally satisfy `CRYSTAL_RED/BLUE/YELLOW`.

The provider Storylet explicitly owns the critical crystal resource instance until an authored transfer/reveal action occurs.

## 4. Possession does not equal branch completion or assembly
Branch provider resolution grants/transfers crystal.

Later:
- three crystals owned -> ASSEMBLE becomes available,
- child explicitly places crystals,
- machine is not assembled until authored assembly/activation completes.

## 5. Secondary favor dependencies are real graph nodes
`LOST_PAGE`, `LOCK_SPRING`, `MAP_LANDMARK` are not flavor strings. They need:
- stable node/resource/feature IDs,
- reachability validation,
- knowledge/reveal state,
- phase validity,
- fail-forward where uncertainty exists.

## 6. Recommended first-manual-story trio
For the first human/editorial Crystal Machine story, use a deliberately high-contrast trio rather than random selection:

- `CRYSTAL_SEARCH_CHIME`
- `CRYSTAL_NPC_OWL_PAGE`
- `CRYSTAL_GUARDIAN_LIGHT_SLIME`

Why:
- listening/search,
- favor + explicit secondary dependency/return,
- environmental guardian/lure,
- no repeated core mechanic,
- no abstract merchant/economy concern in the first baseline story.

This recommendation is **not** a new blueprint and does not remove seeded variation later. It is a controlled editorial baseline for validating story quality before combinatorial selection is trusted.

A later manual variant should deliberately test `CRYSTAL_GUARDIAN_TRADER_CRAB` to exercise trade/provider semantics.

---

# Audit checkpoint
Nine candidates audited:
- **APPROVE:** 1
- **APPROVE WITH REVISIONS:** 8
- **REJECT:** 0

The high revision count does not mean the bank is weak. Most revisions are architecture guards exposed by the full-bank review: explicit provider binding, topology/knowledge separation, mechanic-family diversity, combat sparsity and parallel-branch independence.

Before NG2 coding eventually begins, incorporate the listed revisions into the canonical Storylet data/spec. Then manual editorial review remains required; structural validator green is not sufficient proof of narrative quality.
