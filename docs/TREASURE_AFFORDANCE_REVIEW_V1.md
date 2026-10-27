# Monsterhulen - Treasure Affordance Review V1

Status: **EDITORIAL PREP ONLY - NO RUNTIME IMPLEMENTATION**
Updated: 2026-10-27
Branch: `narrative/story-graph-v1-prep`

Purpose: review the complete existing `TREASURES` bank as affordances and provider resources. No new treasures or blueprints are added.

UX5A physical gate remains binding.

## Shared TREASURE principles
Treasures/items are affordances, not generic bonuses.

An item can:
- suggest a new action,
- satisfy an authored resource requirement,
- be traded,
- be placed/used explicitly on a target,
- become a story clue or concrete prop.

An item does not automatically:
- grant +1,
- grant extra dice,
- solve a gate merely because it is owned,
- satisfy a requirement through loose noun/theme matching,
- disappear/consume itself without an explicit player/DM action.

### Critical-provider rule
The current room-search treasure pool is optional. An optional random find must **not** accidentally become the only critical provider merely because it has the same display name or seems thematically suitable.

If a treasure is story-critical:
- the graph binds the required resource identity,
- at least one provider route is reserved/reachable before the requirement,
- the planned resource instance is distinguishable semantically from incidental optional loot when needed,
- consumption/placement/use is explicit,
- save compatibility/stable IDs remain preserved.

---

## RØD FJÆR
**Core affordances:** shows airflow/trekk, soft padding, decoration, light exchange object, tickling/play.

**Strong Storylet uses:**
- environmental clue for airflow,
- soft padding/fitting (e.g. crown),
- trade/collector object,
- lightweight test object.

**Bad uses:** universal feather-key, numerical agility bonus, mandatory exact item where airflow itself could be observed another way.

**Critical use:** **YES**, but only when explicitly bound as a provided resource. If used to reveal airflow, the causal rule should remain discoverable without assuming the player already knows the feather’s “correct” use.

**Consumption:** normally not consumed; if given away in a trade, exchange must be explicit.

**Repetition:** avoid making it the answer to several nearby problems just because it is versatile.

---

## SPØKELSESGLASS
**Core affordances:** reacts with condensation/cold to nearby ghostly presence; can compare relative direction/proximity.

**Strong Storylet uses:**
- detect/compare ghost presence,
- follow an authored ghost trail,
- verify a supernatural clue,
- support a ghost-related investigation.

**Bad uses:** universal magic detector, exact GPS for unknown rooms, automatic revelation of every ghost/secret.

**Knowledge rule:** the glass can reveal only what the relevant authored rule permits. It must not leak narrator-only knowledge or generate topology.

**Critical use:** **YES**, strong investigation resource when provider + reveal semantics are authored.

**Consumption:** not consumed.

**Repetition:** do not turn every ghost encounter into “check the glass”.

---

## TROLLMYNT
**Core affordances:** recognizable troll symbol, heavy known comparison object, trade/collector object.

**Strong Storylet uses:**
- social symbol/recognition with troll-related subject,
- concrete trade value,
- known small weight for comparison/balance,
- historical clue if the specific symbol is authored.

**Bad uses:** generic currency system, automatic authority badge for every troll, numerical wealth stat.

**Critical use:** **YES** as a bound token/trade resource or clue, but recognition must be authored per Storylet. “Troll” noun/theme matching alone is insufficient.

**Consumption:** only if deliberately traded/spent in a concrete exchange; otherwise persists.

**Repetition:** avoid using the same coin as both critical payment and later required proof unless the graph explicitly supports that sequence.

---

## HONNINGKJEKS
**Core affordances:** edible food, strong smell/duftagn, shareable gift.

**Strong Storylet uses:**
- `FOOD` provider,
- lure hungry/curious creature,
- social gift/trade,
- divide/share as child-led solution.

**Bad uses:** generic healing item, automatic monster pacifier, hidden universal food-key.

**Critical use:** **YES**, particularly as one concrete `FOOD` provider for Sumptrollet/Den sultne krokodillen/Den kjøttetende planten variants. The provider route must be reserved if required.

**Consumption:** potentially consumable, but only through explicit use/give/trade action. A failed uncertain attempt must not silently destroy the only critical food route.

**Repetition:** one critical food beat should not make every hungry subject reuse the same cookie logic.

---

## GLASSKULE
**Core affordances:** rolls to show slope, simple lens/magnifier, shiny trade object, known round shape.

**Strong Storylet uses:**
- slope/tilt observation,
- magnify small marks,
- roll as a nonliving test object,
- trade/collector object,
- compare rolling behavior.

**Bad uses:** magical crystal substitute by visual similarity, automatic CRYSTAL_MACHINE part, generic luck bonus.

**Critical CRYSTAL_MACHINE rule:** **GLASSKULE is not a colored machine crystal unless an explicit authored resource identity says so.** Visual/material similarity is not provider truth.

**Critical use:** **YES** for authored observation/trade/resource roles, not by noun matching.

**Consumption:** normally persists; explicit trade may transfer it.

**Repetition:** versatile item; planner should penalize repeated “glasskule solves it” use in one adventure.

---

## GULLTRÅD
**Core affordances:** fine thread for precise repair, stitching/knotting small parts, tracing a fine crack, string replacement, shiny trade.

**Strong Storylet uses:**
- repair instrument/string,
- delicate mechanical/costume repair,
- small binding/measurement,
- trade/collector resource.

**Bad uses:** substitute for full rope in every context, generic magical gold key, invisible auto-repair.

**Critical use:** **YES**, strong precise-repair resource if provider-planned.

**Consumption:** context-dependent. If a piece is cut/used permanently, the semantic action should record that; do not silently delete whole item unless the authored fiction requires it.

**Repetition:** distinguish “fine thread” from rope mechanically/fictionally so both retain identity.

---

## BÅTEN I FLASKA
**Core affordances:** model for explaining routes/boats, sealed floating test object, story-rich trade object.

**Strong Storylet uses:**
- model a water route,
- test current/flow safely,
- communicate a route to an NPC,
- trade based on story/oddity.

**Bad uses:** real transport, automatic boat summon, universal navigation clue.

**Critical use:** **YES** as an authored model/test/trade resource, but it does not create a water route that graph truth lacks.

**Consumption:** normally persists; may be explicitly traded.

**Repetition:** keep rare enough that its oddity remains memorable.

---

## MESSINGKNAPP
**Core affordances:** old emblem/mark, small metal repair piece, magnet test object, trade/collector item.

**Strong Storylet uses:**
- recognition/proof with a subject that genuinely knows the emblem,
- replace/fix a small button-like metal piece,
- material/magnetism test,
- collector trade.

**Bad uses:** universal pass/badge, arbitrary key, automatic proof of authority.

**Critical use:** **YES** when the specific emblem relationship is authored. For example, Den levende rustningen or Skjelettvakten may recognize it in one curated Storylet, but that does not make every guard recognize it.

**Consumption:** explicit if traded/installed; otherwise persists.

**Repetition:** recognition should be subject/story-specific to avoid turning the button into a master key.

---

# Cross-bank findings from TREASURE review

## 1. Affordance tags are useful, but tags are not answers
Existing roles such as:
- airflow,
- food/scent,
- fine repair,
- lens/rolling,
- symbol/recognition,
- supernatural detection
can help Storylet compatibility scoring.

But compatibility is not sufficient for critical use. Storylet + graph provider plan still decide whether an item is a real requirement/provider.

## 2. Incidental loot and planned critical resource must be distinguishable
The system should not infer critical satisfaction from display-name coincidence.

Conceptually:
- optional room find = incidental resource instance,
- planned critical provider = resource instance bound to provider plan/requirement.

They may share a canonical item type, but the graph decides critical semantics.

## 3. Consumption is an action, not a side effect
Giving, trading, placing or using a consumable resource should be represented explicitly and validated before mutation.

This supports later undo/sync and prevents accidental loss of critical resources.

## 4. Items can solve by changing fiction, not statistics
Examples:
- feather reveals airflow,
- glass marble reveals slope,
- ghost jar reveals supernatural proximity,
- thread repairs a string,
- cookie lures a hungry creature.

These are stronger than generic numeric bonuses and align with the product direction.

## 5. Versatile items need anti-repetition scoring
Rød fjær, Glasskule, Gulltråd and Messingknapp can fit many scenes. Selection should penalize repeated use of the same item/affordance so an adventure does not feel like one prop repeatedly unlocking everything.

---

# Category checkpoint
The complete existing **TREASURES** bank is now editorially reviewed.

No treasure was added. No Adventure Blueprint was added. No runtime was implemented.

# Full existing-content review checkpoint
With this document, the current source categories have now been reviewed through:
- MONSTERS,
- PEOPLE,
- FRIENDS,
- TRAPS,
- MYSTERIES,
- TREASURES.

This is an editorial/architecture checkpoint, not proof that every current runtime adventure is narratively strong.

The next editorial task should **not** be to expand the content bank. Instead:
1. consolidate compatibility/repetition/provider findings into Storylet Matrix constraints,
2. keep CRYSTAL_MACHINE as the only pre-NG8 blueprint target,
3. use the reviewed bank to author/curate the small NG2 storylet set when runtime work is eventually unblocked,
4. manually judge generated story quality before any bank expansion.
