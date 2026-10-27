# Monsterhulen - People Subject Review V1

Status: **EDITORIAL PREP ONLY - NO RUNTIME IMPLEMENTATION**
Updated: 2026-10-27
Branch: `narrative/story-graph-v1-prep`

Purpose: review the complete existing `PEOPLE` bank using the subject/role/provider framework. No new subjects or blueprints are added.

The UX5A physical gate remains binding. This is documentation/prep only.

## Shared PEOPLE principles
People are not generic quest dispensers. Each person needs:
- a recognizable personal situation,
- a reason the child can understand,
- authored outcomes that fit that person,
- no universal dialogue menu that tells the child the “correct” social action,
- no critical persuasion softlock,
- explicit tracked truth when they provide story-critical information.

People are especially useful for provider roles because `NPC_REWARD`, `TRADE`, `MERCHANT_PURCHASE` and `SOCIAL_BARGAIN` can feel natural in fiction.

---

## LANTERNEVAKTEN
**Identity:** conscientious small gatekeeper whose oversized lantern physically prevents them from operating the gate properly.

**Allowed roles:** `NPC_FAVOR`, `BLOCK_PATH`, `GUARDIAN` in a non-hostile form, `CLUE_SOURCE`, `REWARD`/provider after help.

**Incompatible roles:** combat encounter, arbitrary merchant, secret-answer social gate.

**Requirements/providers:** repair/support/holding solutions. Rope/tool/staff are affordances, but the visible broken strap + overhead hook must make non-item solutions plausible. If the gate is critical, the scene itself provides enough environmental information to solve it without requiring an exact owned object.

**Outcomes/world effects:** gate opens, lantern becomes stable, route becomes usable, guard reveals a direction or grants a small authored reward.

**Combat:** **NO**.

**Interaction shell:** `NPC_DIALOGUE_FAVOR`; if the gate is critical, apply explicit `OPEN_GATE` world effect after resolution.

**Critical safety:** **YES**, strong critical blocker/favor because cause and payoff are concrete.

**Repetition:** avoid another repair-the-door/repair-the-tool favor on the same short route.

---

## FROSKEKONGEN
**Identity:** proud but harmless royal frog whose oversized crown undermines the dignity he wants to project.

**Allowed roles:** `NPC_FAVOR`, `REWARD`, `CLUE_SOURCE`, social `GUARDIAN`, `PAYOFF_CHARACTER`.

**Incompatible roles:** villain, combat gate, exact-item-only fetch quest.

**Requirements/providers:** padding, tying, resizing, balancing, substitution or another child-designed “royal” solution. If a specific decorative material is authored as a critical requirement, it needs a reachable provider route, but a critical story should usually accept several semantic ways to fit the crown.

**Outcomes/world effects:** king grants permission, clue, social favor, optional item or route access; relationship state can persist.

**Combat:** **NO**.

**Interaction shell:** NPC favor/social interaction; reward choice only if there is a real authored choice.

**Critical safety:** **YES**, especially as social permission/reward, provided no fixed “say/do exactly this” answer exists.

**Repetition:** preserve the vanity/royal comedy; avoid pairing with Surmulesoppen or Den tomme rustningen if all three become appearance-favor scenes.

---

## DVERGSMEDEN
**Identity:** careful craftsperson solving a delicate mechanical problem rather than brute-forcing it.

**Allowed roles:** `NPC_FAVOR`, `NPC_REWARD`, `ITEM_HOLDER`, `MERCHANT`/provider, `CLUE_SOURCE`, `PUZZLE_CARRIER` for a real mechanism.

**Incompatible roles:** random item vending with no exchange/favor fiction, combat, arbitrary riddle.

**Requirements/providers:** inspect/extract the stuck spring using tools, magnetism, careful movement or free-form engineering. If the smith is a critical resource provider, the resource/reward must be bound to this Storylet before placement and cannot be narrator-invented afterward.

**Outcomes/world effects:** repaired mechanism, `GRANT_CRITICAL_RESOURCE`, `GRANT_OPTIONAL_ITEM`, reveal how another mechanism works, establish smith relationship.

**Combat:** **NO**.

**Interaction shell:** NPC favor; focused repair/object shell if selected; provider/reward control for DM.

**Critical safety:** **YES**, excellent `NPC_REWARD` provider subject when the reward is authored and the favor has fail-forward.

**Repetition:** avoid another delicate repair task nearby unless the second serves a clearly different story function.

---

## REVEHANDLEREN
**Identity:** clever but fair trader who values the story/meaning of an object more than abstract price.

**Allowed roles:** `TRADE`, `MERCHANT` provider, `SOCIAL_BARGAIN`, `ITEM_HOLDER`, `CLUE_SOURCE`, `NPC_FAVOR`.

**Incompatible roles:** large numerical shop economy, compulsory theft, single-roll persuasion gate.

**Requirements/providers:** concrete trade object, story about an object, favor, or another fair exchange. For a critical resource, at least one acceptable reachable offer/favor route must be planned. Child proposes the offer first. DM decides whether the offer simply works or is uncertain.

**Uncertain social rule:** physical die may resolve whether the current offer is accepted on current terms, but a low result cannot remove the critical resource from the adventure. It can lead to a counteroffer, favor, extra clue or alternate provider.

**Outcomes/world effects:** `GRANT_CRITICAL_RESOURCE`, `GRANT_OPTIONAL_ITEM`, reveal information, establish trader relationship, or complete a concrete exchange atomically.

**Combat:** **NO**.

**Interaction shell:** canonical focused `MERCHANT_TRADE` shell; inventory is shown as possible offers, not as an answer list.

**Critical safety:** **YES**, one of the strongest existing canonical critical provider subjects.

**Repetition:** normally one primary trader/merchant scene per adventure. If Byttekrabben also appears, give them different functions or reject the combination.

---

## ALVEKARTOGRAFEN
**Identity:** mapmaker trying to record unstable-looking geography accurately.

**Allowed roles:** `NPC_FAVOR`, `CLUE_SOURCE`, `FOLLOW_CLUE`, `REVEAL_LOCATION`, `PUZZLE_CARRIER` for real spatial observation.

**Incompatible roles:** narrator-invented secret route, random map that changes canonical topology, omniscient future-room spoiler.

**Requirements/providers:** hold/flatten/copy/read the map. Chalk/rope/mirror etc. are affordances. If the copied route is critical, the route/location must already exist in the graph; the cartographer reveals knowledge, not new topology.

**Outcomes/world effects:** `REVEAL_LOCATION`, `REVEAL_CLUE`, enable a known route/action, establish map annotation knowledge.

**Combat:** **NO**.

**Interaction shell:** NPC favor + map/clue reveal. Avoid exposing unrevealed narrator-only graph data to player UI.

**Critical safety:** **YES**, strong knowledge-provider subject when truth/knowledge separation is respected.

**Repetition:** do not use multiple map/navigation NPCs to reveal the same route.

---

## MULDVARPGRAVEREN
**Identity:** safety-minded tunnel worker using sound/cracks to find a safe seam in stone.

**Allowed roles:** `NPC_FAVOR`, `PUZZLE_CARRIER`, `OPEN_GATE`, `REVEAL_LOCATION`, `CLUE_SOURCE`.

**Incompatible roles:** spontaneous new secret tunnel invented by narrator, reckless demolition combat, arbitrary exact tool gate.

**Requirements/providers:** listening, tapping, inspecting, careful digging or testing. Tools help but are not automatically required. If successful digging opens a critical passage, that passage must already be represented as an authored graph edge/gate target.

**Outcomes/world effects:** `OPEN_GATE`, reveal safe seam/location, make route traversable, share geological clue.

**Combat:** **NO**.

**Interaction shell:** NPC favor / environmental puzzle. Opening route must be an explicit world effect.

**Critical safety:** **YES**, provided the route exists in authored world state before the scene.

**Repetition:** avoid another “listen for hollow wall/open secret route” beat on same route.

---

## UGLEBIBLIOTEKAREN
**Identity:** careful librarian needing help retrieving a specific inaccessible book without toppling the stack.

**Allowed roles:** `NPC_FAVOR`, `CLUE_SOURCE`, `NPC_REWARD`, `ITEM_HOLDER`, `PUZZLE_CARRIER`, `FOLLOW_CLUE` through books/pages.

**Incompatible roles:** generic exposition dump, random critical page with no prior need, exact-tool-only fetch.

**Requirements/providers:** reach/support/pull the book safely. Ladder/rope/staff/grabber are affordances; environmental creativity remains valid.

**Outcomes/world effects:** retrieve book/page, `REVEAL_CLUE`, `GRANT_CRITICAL_RESOURCE`, point to a location, establish librarian relationship.

**Critical safety:** **YES**. This is a strong canonical `NPC_FAVOR -> NPC_REWARD` subject and already fits the prepared CRYSTAL_MACHINE storylet candidate `CRYSTAL_NPC_OWL_PAGE`.

**Critical resource rule:** if a missing page is required to earn the reward, that page must have a reachable provider plan and cannot be placed behind the reward it unlocks.

**Combat:** **NO**.

**Interaction shell:** NPC favor; book/page target if the Storylet uses a concrete retrieval interaction.

**Repetition:** avoid multiple library/book clue providers in one short adventure unless they form one coherent investigation.

---

## GOBLINKOKKEN
**Identity:** frantic but competent cook trying to control an overflowing pot.

**Allowed roles:** `NPC_FAVOR`, `NPC_REWARD`, food `PROVIDER`, `MERCHANT`-lite exchange, `PUZZLE_CARRIER` for a real cooking/environment problem.

**Incompatible roles:** combat, arbitrary recipe riddle, critical food reward that is not declared before generation.

**Requirements/providers:** cover/stir/reduce heat/divide contents. Equipment is affordance. The child should not need to guess a hidden recipe unless a specific recipe clue Storylet was authored.

**Outcomes/world effects:** pot stabilizes, cook grants food/item/clue, cooking station becomes usable.

**Provider importance:** strong natural provider for `FOOD` required by subjects such as Sumptrollet or Den sultne krokodillen. If food is critical, bind the food reward/provider relation before map placement.

**Combat:** **NO**.

**Interaction shell:** NPC favor; provider/reward action after resolution.

**Critical safety:** **YES**, especially as an authored food provider.

**Repetition:** do not combine with another food provider if both exist only to solve the same hungry blocker unless offering genuine route choice.

---

## SNEGLEBUDET
**Identity:** earnest slow courier racing weather rather than enemies, carrying a specific message/map.

**Allowed roles:** `NPC_FAVOR`, `FOLLOW_CLUE`, `RETURN`, `CLUE_SOURCE`, `REVEAL_LOCATION`, `ITEM_HOLDER` for an authored message.

**Incompatible roles:** random message content, future-phase clue arriving after its dramatic function has expired, omniscient navigation.

**Requirements/providers:** route-finding, landmark identification, weather protection, map handling. Spyglass/chalk/umbrella etc. help but are optional unless explicitly provider-planned.

**Outcomes/world effects:** courier reaches next point, message becomes delivered/revealed, route/landmark knowledge changes, return beat becomes enabled.

**Temporal rule:** message/clue Storylets need `validPhases`/expiry. A delivery meant to set up an objective must not appear after the objective is already resolved unless rewritten as a new explicit role.

**Combat:** **NO**.

**Interaction shell:** NPC favor + delivery/reveal state; explicit `DELIVER`/`REVEAL_CLUE` semantic action if critical.

**Critical safety:** **YES**, strong for phase-sensitive clue delivery when message content is authored.

**Repetition:** one courier/delivery chain per adventure normally.

---

## BEVERBYGGMESTEREN
**Identity:** practical builder trying to make a stable bridge using imperfect available materials.

**Allowed roles:** `NPC_FAVOR`, `ASSEMBLE`, `BLOCK_PATH`, `OPEN_GATE`, `PUZZLE_CARRIER`, `NPC_REWARD`.

**Incompatible roles:** abstract crafting system, hidden exact construction recipe, combat.

**Requirements/providers:** the two planks and gap are already visible scene resources. Rope/tools may improve options but should not be mandatory for critical progression unless guaranteed. The child can propose alternate structural solutions.

**Outcomes/world effects:** bridge becomes stable/traversable, route opens, builder gives advice/reward.

**Interaction shell:** strong candidate for a small assembly/placement shell only if selected Storylet benefits from tangible construction. Do not build a generic crafting subsystem around it.

**Critical safety:** **YES**, excellent concrete `ASSEMBLE -> OPEN_GATE` subject because setup and world effect are physically legible.

**Combat:** **NO**.

**Repetition:** avoid another bridge-building/assembly gate on same route.

---

## DEN GAMLE HEKSA
**Identity:** experienced witch experimenting with a three-step repeating color/sound pattern in a cauldron.

**Allowed roles:** `PUZZLE_CARRIER`, `NPC_FAVOR`, `CLUE_SOURCE`, `NPC_REWARD`, occasional provider/mentor.

**Incompatible roles:** random unrelated puzzle, hidden answer only narrator knows, mandatory die roll for solving the pattern.

**Requirements/providers:** visible/audible sequence. If critical, the exact rule/sequence belongs to authored Storylet data. The child observes/thinks/records it; physical die is not used for cognition.

**Outcomes/world effects:** cauldron stabilizes/activates, `REVEAL_CLUE`, `GRANT_RESOURCE`, witch teaches/gives something.

**Combat:** **NO** by default. This subject is mentor/puzzle, not “evil witch”.

**Interaction shell:** `PUZZLE` when the sequence is actually represented; otherwise NPC favor. Puzzle completion and whole-scene resolution remain separate if fiction requires another action.

**Critical safety:** **YES**, strong contextual puzzle carrier when the pattern is authored and signaled.

**Repetition:** avoid another three-step sequence puzzle in same adventure.

---

## KRÅKEFORSKEREN
**Identity:** curious researcher comparing four physical findings and looking for the one that differs for a reason.

**Allowed roles:** `PUZZLE_CARRIER`, `NPC_FAVOR`, `CLUE_SOURCE`, `NPC_REWARD`, investigation Storylet.

**Incompatible roles:** random “odd one out” worksheet disconnected from story, hidden property with no observable test, combat.

**Requirements/providers:** the four findings and their relevant properties must exist in the Storylet. Tests can involve marks, movement, material, magnetism, weight, reflection, etc. Tools are affordances, not automatic answers.

**Outcomes/world effects:** identifies the anomalous object, `REVEAL_CLUE`, identifies material/origin, grants an authored research conclusion.

**Puzzle rule:** if used critically, the anomaly must matter to the current story or clue chain. Do not attach the same logic template to unrelated content merely because it validates structurally.

**Combat:** **NO**.

**Interaction shell:** puzzle/investigation shell; allow comparison actions without presenting a closed answer list where possible.

**Critical safety:** **YES** when the actual anomaly and consequence are authored.

**Repetition:** one explicit classification/odd-one-out puzzle per adventure.

---

# Cross-bank findings from PEOPLE review

## 1. People are strong provider subjects, but provider role must be authored
Best existing examples:
- `REVEHANDLEREN` -> `TRADE` / merchant-style critical resource provider,
- `DVERGSMEDEN` -> `NPC_FAVOR -> NPC_REWARD`,
- `UGLEBIBLIOTEKAREN` -> `NPC_FAVOR -> CLUE/RESOURCE`,
- `GOBLINKOKKEN` -> concrete `FOOD` provider,
- `FROSKEKONGEN` -> social permission/reward,
- `LANTERNEVAKTEN` -> gate access after favor.

The generator must choose the provider role first and then bind concrete reward/requirement. A person does not become a provider just because the narrator could plausibly give them something.

## 2. Knowledge providers must obey truth/knowledge separation
`ALVEKARTOGRAFEN`, `SNEGLEBUDET`, `UGLEBIBLIOTEKAREN`, `DEN GAMLE HEKSA` and `KRÅKEFORSKEREN` can reveal critical knowledge.

Their clues must:
- exist in graph truth before reveal,
- respect dramatic phase,
- reveal only the intended knowledge,
- never create new topology/requirements through narrator improvisation.

## 3. Several PEOPLE subjects are excellent contextual puzzle carriers
Strong candidates:
- Dvergsmeden: mechanism inspection,
- Alvekartografen: spatial recording,
- Muldvarpgraveren: sound/crack observation,
- Den gamle heksa: authored sequence,
- Kråkeforskeren: authored comparison/anomaly,
- Beverb yggmesteren: concrete construction.

These should replace generic disconnected puzzles, not multiply them.

## 4. Route-changing people need explicit world effects
When a subject opens a port, tunnel or bridge, resolution must apply the corresponding gate/route state change. Narrator prose alone is insufficient.

Applies especially to:
- Lanternevakten,
- Muldvarpgraveren,
- Beverb yggmesteren.

## 5. Temporal delivery is a first-class narrative constraint
`SNEGLEBUDET` makes the phase/expiry requirement concrete: a delivery that no longer serves its authored dramatic purpose must expire or receive a newly authored role.

---

# Category checkpoint
The complete existing **PEOPLE** bank is now editorially reviewed.

No subjects were added. No Adventure Blueprint was added. No runtime was implemented.

## Exact editorial continuation
Next category: existing `FRIENDS` bank.

Next subject:

**DEN SVARTE KATTEN**

Then continue in source order:
- Skjelettmusikeren,
- Soppprinsen,
- Bokbillen,
- Sekkegrevlingen,
- Papirfuglen.

After FRIENDS: TRAPS -> MYSTERIES -> TREASURES.
