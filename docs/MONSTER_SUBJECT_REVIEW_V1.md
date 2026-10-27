# Monsterhulen - Monster Subject Review V1

Status: **EDITORIAL PREP ONLY - NO RUNTIME IMPLEMENTATION**
Updated: 2026-10-27
Branch: `narrative/story-graph-v1-prep`

Purpose: finish the subject/role review for the existing monster bank without expanding it. This document continues after the already-reviewed Zombie, Skeleton and Troll variants in `docs/CONTENT_REVIEW_HANDOFF_2026-10-26.md`.

The runtime UX5A physical gate remains binding. Nothing here authorizes Narrative Graph runtime work before UX5A is physically green and merged.

## Binding review rules
For every subject below:
- subject identity/personality stays recognizable across roles,
- role changes are curated authored variants, not arbitrary recombination,
- critical use requires explicit setup -> signal -> action -> payoff,
- required resources need a validated reachable provider route,
- owning a resource never silently completes an action,
- free child solutions may satisfy the same semantic outcome when plausible,
- a physical die is used only when an attempted action is genuinely uncertain,
- a low roll cannot permanently destroy a critical route,
- combat is a capability only when explicitly allowed; it is never the default solution,
- critical guardians need a credible non-combat route,
- story-critical clues/requirements cannot be invented by narrator improvisation,
- do not consume a unique critical resource as optional payment if it is still required elsewhere,
- stable subject/entity IDs remain unchanged.

Role names below refer to the Storylet role vocabulary in the Narrative Graph prep docs.

---

## LIVING_ARMOR

### DEN LEVENDE RUSTNINGEN
**Identity:** rule-bound old guardian. It is threatening at first glance but comic in logic: it follows obsolete rules more faithfully than it understands them.

**Allowed roles:** `GUARDIAN`, `BLOCK_PATH`, `CLUE_SOURCE`, `PUZZLE_CARRIER`, occasional `ITEM_HOLDER` after resolution.

**Incompatible roles:** generic merchant, random friendly helper with no guarding function, combat-only gate, arbitrary riddle whose rule has not been signaled.

**Requirements/providers:** if an authored variant requires a pass, emblem, phrase fragment or proof, that requirement must be signaled by the armor and provided before the gate. Existing affordances such as a mark, badge-like object or chalk sign may help, but must never become the only possible answer unless explicitly planned as a critical provider route. Polite speech or a clever interpretation of its rule can be a valid semantic solution when the fiction supports it.

**Outcomes/world effects:** `OPEN_GATE`, `ENABLE_ACTION`, `REVEAL_CLUE`, or change the armor to a non-blocking/recognizing state. If it later recognizes the hero, that relationship state should persist.

**Combat:** `combatAllowed=true` is reasonable, but critical use requires a non-combat route. Defeat means disabled, confused, yielding or standing down; no death framing is required.

**Interaction shell:** guardian dialogue/action shell; optional DM-started combat shell; explicit gate state if it physically blocks a route.

**Critical safety:** **YES**, when its rule and at least one credible route to permission are authored and signaled.

**Repetition:** at most one rule-bound armor scene in an adventure. Do not pair with Skjelettvakten if both perform the same “show permission” beat unless their dramatic purposes differ clearly.

### DEN TOMME RUSTNINGEN
**Identity:** vain/ritualistic empty armor obsessed with being polished, repaired or presentable.

**Allowed roles:** `NPC_FAVOR`, `BLOCK_PATH`, `PUZZLE_CARRIER`, `GUARDIAN` in a soft/non-hostile form.

**Incompatible roles:** aggressive combat-first guardian, lore oracle, arbitrary item vendor.

**Requirements/providers:** mirror, repair tool, cloth-like object or environmental reflection can be affordances. A critical variant must provide a reachable way to help it and must also allow a plausible free-form solution such as fixing the loose part, polishing with available material or convincing it that it is presentable.

**Outcomes/world effects:** moves aside, reveals a small compartment/clue, becomes a recurring comic acquaintance, or enables access to a guarded object.

**Combat:** normally **NO**. It is stronger as a favor/environment interaction than as another fightable suit of armor.

**Interaction shell:** `NPC_DIALOGUE_FAVOR` or object/fix interaction; no dedicated combat shell by default.

**Critical safety:** **YES**, if the required condition is visible and solvable without an unprovided exact item.

**Repetition:** avoid in the same adventure as Den levende rustningen unless one is clearly a guardian and the other a repair/favor scene.

---

## SLIME

### KRYSTALLSLIMET
**Identity:** curious light-and-color-following slime.

**Allowed roles:** `BLOCK_PATH`, `GUARDIAN`, `PUZZLE_CARRIER`, optional `CLUE_SOURCE` through light/color behavior.

**Incompatible roles:** automatic crystal-item provider merely because its name contains “krystall”; generic treasure chest; dialogue-heavy NPC role.

**Requirements/providers:** light, reflection, color or a movable glow can be environmental affordances. If critical, at least one usable light/reflection source must exist in the scene or provider plan, but the child may invent another credible way to redirect it.

**Critical CRYSTAL_MACHINE rule:** **Krystallslimet must not imply that it contains or drops one of the three CRYSTAL_MACHINE crystals unless a specific authored Storylet explicitly assigns that provider role.** Name/visual similarity alone is not a provider route.

**Outcomes/world effects:** slime relocates, illuminates a useful feature, reveals a path, or changes the room’s lighting state.

**Combat:** optional but usually unnecessary. `combatAllowed` should be false for most authored variants; if enabled, non-combat remains primary.

**Interaction shell:** environmental/guardian action shell; light-target interactions can use explicit target/action affordances rather than auto-use.

**Critical safety:** **YES** as a blocker if light behavior is clearly signaled and a reachable solution exists.

**Repetition:** avoid placing beside another light-following creature in the same adventure unless the mechanics/purpose differ.

### GJØRMESLIMET
**Identity:** broad environmental slime-puddle that collects earthy material and makes traversal messy.

**Allowed roles:** `BLOCK_PATH`, `COMPLICATION`, `PUZZLE_CARRIER` for traversal, occasionally `GUARDIAN` without social personality.

**Incompatible roles:** clue oracle, merchant, critical item holder.

**Requirements/providers:** bridge/balance/rope/shield affordances may help, but terrain itself should offer readable options. Do not require one exact gear item for critical progression.

**Outcomes/world effects:** safe crossing, slime moved, dry route created, or room traversal state changed.

**Combat:** generally **NO**; treating a puddle obstacle as mandatory combat works against the subject identity.

**Interaction shell:** environmental obstacle / explicit route-resolution shell.

**Critical safety:** **YES** when the child can construct or discover a traversal solution from visible fiction.

**Repetition:** one slime/environment traversal beat per adventure is enough.

---

## VAMPIRE

### DEN LILLE VAMPYREN
**Identity:** small vampire presenting as scary but actually afraid of what lies ahead.

**Allowed roles:** `NPC_FAVOR`, `CLUE_SOURCE`, `FOLLOW_CLUE`, `RESCUE`, optional soft `BLOCK_PATH` if fear physically keeps it in the way.

**Incompatible roles:** cruel predator, mandatory combat gate, omniscient clue dispenser.

**Requirements/providers:** reassurance, light, role-play, escort or information can solve the scene. If its knowledge is critical, the clue it provides must be authored/tracked and revealed only after a meaningful interaction condition.

**Outcomes/world effects:** reveals what it saw, becomes braver, follows/returns to safety, moves aside, or becomes a known friendly figure.

**Combat:** can technically be allowed, but prefer **NO** for critical variants. Fighting a frightened child-scaled vampire clashes with the intended emotional beat.

**Interaction shell:** `NPC_DIALOGUE_FAVOR`; optional follow/escort state.

**Critical safety:** **YES**, especially as a clue/favor subject, provided its critical information is authored rather than narrator-invented.

**Repetition:** rare; preserve the “looks scary, is scared” reversal.

### TÅRNVAMPYREN
**Identity:** elegant vampire preoccupied with protecting an absurdly long cape.

**Allowed roles:** `NPC_FAVOR`, `BLOCK_PATH`, `COMPLICATION`, occasional `REWARD`/friendly payoff after help.

**Incompatible roles:** major villain, combat-only guardian, deep lore source without setup.

**Requirements/providers:** bridge, hook, rope, dry/clean route or free-form help. Critical use cannot depend on owning one exact item.

**Outcomes/world effects:** vampire clears route, returns a favor, gives a small clue or social permission.

**Combat:** optional but normally **NO**; the scene is stronger as situational comedy/problem solving.

**Interaction shell:** favor/action shell.

**Critical safety:** **YES** for a light blocker/favor if the environment supports solutions.

**Repetition:** avoid another clothing/appearance favor in the same adventure.

---

## FART_MONSTER

### PROMPEMONSTERET
**Identity:** silly, energetic creature whose problem is uncontrolled fart-clouds, not aggression.

**Allowed roles:** `OPTIONAL_IMPROV`, `COMPLICATION`, light `BLOCK_PATH`, occasional `NPC_FAVOR`.

**Incompatible roles:** critical clue keeper, solemn guardian, irreplaceable critical-item provider, major climax subject.

**Requirements/providers:** airflow, route choice, shield/fan, music or free-form “prompeplan”. Never require a specific item.

**Outcomes/world effects:** air clears, creature relocates, temporary comic environmental change.

**Combat:** **NO** by default. A fight undercuts the intended joke/problem structure.

**Interaction shell:** simple environmental/favor shell; no complex bespoke UI.

**Critical safety:** **AMBIENT/OPTIONAL PREFERRED**. It may briefly obstruct a route, but important story causality should not hinge on the fart joke.

**Repetition:** maximum one fart-monster beat per adventure.

### BOBLEPROMPEREN
**Identity:** playful experimenter making floating gas bubbles and following airflow.

**Allowed roles:** `OPTIONAL_IMPROV`, `PUZZLE_CARRIER`, `COMPLICATION`, optional light `BLOCK_PATH`.

**Incompatible roles:** critical provider, serious guardian, lore source.

**Requirements/providers:** read airflow, redirect bubbles, protect them or route around them. Environmental observations should be enough.

**Outcomes/world effects:** bubbles relocate, airflow/path becomes visible, passage opens.

**Combat:** **NO**.

**Interaction shell:** environmental puzzle/action shell only if selected; otherwise ordinary encounter controls.

**Critical safety:** **AMBIENT PREFERRED**. If used on a required path, it must resolve from visible airflow without a specific item prerequisite.

**Repetition:** mutually exclusive with Prompemonsteret in normal adventures.

---

## BONE_HOUND

### BEINHUNDEN
**Identity:** skeletal dog that looks spooky but wants to play fetch.

**Allowed roles:** `GUARDIAN`, `NPC_FAVOR`, `BLOCK_PATH`, `FOLLOW_CLUE` after befriending, occasional `PAYOFF_CHARACTER`.

**Incompatible roles:** malicious hunter, arbitrary critical-item eater, merchant.

**Requirements/providers:** any safe throw/fetch object or invented game can work; do not require sacrificing a valuable/critical item.

**Outcomes/world effects:** moves aside, becomes friendly, follows a scent/route later, or retrieves/reveals a reachable optional object.

**Combat:** allowed only in some variants, but non-combat strongly preferred. If critical, `combatAllowed` should not be the only path.

**Interaction shell:** NPC/guardian shell; later friend/follow state if authored.

**Critical safety:** **YES** as a guardian/favor because its motivation is obvious and flexible.

**Repetition:** do not also use another “play with animal to pass” beat nearby.

### KNOKKELHUNDEN
**Identity:** scent-tracking bone hound that has lost a trail.

**Allowed roles:** `FOLLOW_CLUE`, `NPC_FAVOR`, `CLUE_SOURCE`, `GUARDIAN`, `RESCUE` helper.

**Incompatible roles:** answer-button clue machine; critical route where the target scent has never been set up.

**Requirements/providers:** if the lost scent matters to the story, a real earlier scent/object/person must exist. Generic smells can be used for ambient scenes only.

**Outcomes/world effects:** reacquires trail, reveals route/location, becomes temporary tracker/friend, or clears passage.

**Combat:** normally **NO** for clue/helper variants; optional only if used as a non-critical guardian.

**Interaction shell:** follow-clue/NPC favor; tracked clue reveal when story-critical.

**Critical safety:** **YES**, but only with authored scent target and knowledge timing.

**Repetition:** one tracking animal per adventure unless deliberately contrasting two tracks.

---

## GHOST

### FNISESPØKELSET
**Identity:** attention-seeking ghost that wants something funnier or more surprising than itself.

**Allowed roles:** `NPC_FAVOR`, `BLOCK_PATH`, `OPTIONAL_IMPROV`, `PAYOFF_CHARACTER`.

**Incompatible roles:** critical factual clue source based on improvised joke; mandatory exact “tell the right joke” puzzle.

**Requirements/providers:** humor, music, unexpected action or prop are affordances. There is never one authored joke answer.

**Outcomes/world effects:** moves aside, becomes friendly, reveals a small optional detail, or returns later as comic payoff.

**Combat:** **NO** by default.

**Interaction shell:** open NPC interaction; child acts first.

**Critical safety:** **YES as a flexible blocker**, but **NO as a critical clue oracle** unless the actual clue is separately authored and merely delivered after resolution.

**Repetition:** low frequency; comedy loses value when repeated.

### TÅKESPØKELSET
**Identity:** quiet-seeking ghost whose mist obscures navigation.

**Allowed roles:** `BLOCK_PATH`, `GUARDIAN`, `NPC_FAVOR`, `PUZZLE_CARRIER`, `FOLLOW_CLUE` through visibility/quiet cues.

**Incompatible roles:** random teleportation that changes map truth, arbitrary hidden route reveal.

**Requirements/providers:** silence, marks, rope/guide line, calm location or other navigation method. If critical, route truth remains in graph state; fog changes knowledge/visibility, not topology unless explicitly authored.

**Outcomes/world effects:** fog thins, route becomes visible/usable, ghost relocates, or a previously known marker becomes readable.

**Combat:** normally **NO**.

**Interaction shell:** environment/visibility + NPC favor as needed.

**Critical safety:** **YES** if fog is a presentation/route-access condition rather than narrator-defined topology.

**Repetition:** avoid pairing with another visibility-fog scene on the same critical chain.

---

## CARNIVOROUS_PLANT

### DEN KJØTTETENDE PLANTEN
**Identity:** hungry physical plant obstacle that reacts strongly to smell and movement.

**Allowed roles:** `BLOCK_PATH`, `GUARDIAN`, `COMPLICATION`, `PUZZLE_CARRIER`.

**Incompatible roles:** conversational merchant, lore source, irreplaceable item consumer.

**Requirements/providers:** food can be an affordance/provider route, but a critical plant must also admit environmental/free-form solutions such as redirecting, restraining, bypassing or changing the route. Never consume food/item automatically.

**Outcomes/world effects:** passage opens, vines are held/redirected, alternate path becomes usable.

**Combat:** may be allowed in optional variants, but critical path needs non-combat.

**Interaction shell:** environmental guardian; optional combat shell only when DM starts it.

**Critical safety:** **YES** with a visible behavior cue and non-item-exclusive solutions.

**Repetition:** do not combine with another “feed hungry blocker” on the same critical chain unless the second scene serves a different role.

### SOLSLUKEREN
**Identity:** plant that follows light; a spatial/environmental puzzle more than a social encounter.

**Allowed roles:** `BLOCK_PATH`, `PUZZLE_CARRIER`, `GUARDIAN` in environmental form.

**Incompatible roles:** combat-first monster, clue speaker, merchant.

**Requirements/providers:** room must contain or provide reachable light/reflection possibilities if critical. Lantern/mirror/glass are affordances, not mandatory unless explicitly provider-planned.

**Outcomes/world effects:** plant rotates/unfolds, route opens, light reaches a later target.

**Combat:** generally **NO**.

**Interaction shell:** environmental target/action shell; explicit use of light-affecting objects, no auto-use.

**Critical safety:** **YES**, strong candidate for causal visible puzzle if setup and light affordances are clear.

**Repetition:** avoid same adventure as Krystallslimet or Lysslukeren if all three would use identical “move light source” logic.

---

## CROCODILE

### DEN SULTNE KROKODILLEN
**Identity:** dangerous-looking wet-passage obstacle motivated by hunger rather than malice.

**Allowed roles:** `GUARDIAN`, `BLOCK_PATH`, `COMPLICATION`, limited `NPC_FAVOR` via feeding/redirecting.

**Incompatible roles:** dialogue-heavy clue source, mandatory item eater, friendly companion without an authored transition.

**Requirements/providers:** if food is selected as a critical route, the food provider plan must be reachable before the crocodile. Alternative routes such as crossing above, redirecting it or keeping distance must remain semantically valid where fiction allows.

**Outcomes/world effects:** crocodile relocates, safe crossing opens, water route becomes usable.

**Combat:** `combatAllowed=true` can be reasonable, but is never required on a critical path.

**Interaction shell:** guardian/environment + optional DM-started combat.

**Critical safety:** **YES** with explicit wet-passage geometry and at least one guaranteed non-combat solution.

**Repetition:** avoid same critical chain as Sumptrollet/Den kjøttetende planten if all three are just “find food”.

### KROKODILLEN MED TANNPINE
**Identity:** physically intimidating animal in pain; the scene is about cautious help and observation.

**Allowed roles:** `NPC_FAVOR`, `GUARDIAN`, `PUZZLE_CARRIER`, occasional `REWARD` after aid.

**Incompatible roles:** combat-first enemy, arbitrary hidden-item requirement, grotesque medical detail.

**Requirements/providers:** mirror/tool/long object are affordances. Critical use must provide a safe, child-readable way to inspect/help without requiring the child character to do something implausibly dangerous.

**Outcomes/world effects:** pain resolved, crocodile moves aside, reveals/returns an object that was stuck only if that object was authored beforehand.

**Combat:** normally **NO**; fighting an animal because it has tooth pain contradicts the scene.

**Interaction shell:** favor/object interaction; no medical simulation.

**Critical safety:** **YES** if the resolution is simple, safe fiction and not dependent on one exact tool.

**Repetition:** distinctive; keep rare.

---

## GIANT_SPIDER

### KJEMPEEDDERKOPPEN
**Identity:** collector spider guarding its web treasures, attentive to shiny objects.

**Allowed roles:** `GUARDIAN`, `TRADE`, `BLOCK_PATH`, `ITEM_HOLDER`, optional `NPC_FAVOR`.

**Incompatible roles:** compulsory sacrifice of a unique critical item; random treasure provider with no reason; mandatory combat.

**Requirements/providers:** if trade is critical, at least one valid non-critical trade object must be guaranteed reachable. A child can also negotiate, distract, sneak or offer a story-consistent alternative.

**Outcomes/world effects:** spider moves, accepts trade, releases a specifically authored item, or opens web route.

**Combat:** allowed, but non-combat route required for critical use.

**Interaction shell:** trade/guardian shell; optional combat.

**Critical safety:** **YES** if trade inventory is provider-validated and the spider is not allowed to consume a still-needed resource.

**Repetition:** avoid another trade collector in same adventure unless one is provider and the other optional flavor.

### SØLVVEVEREN
**Identity:** craft-focused spider finishing a deliberate web pattern.

**Allowed roles:** `NPC_FAVOR`, `PUZZLE_CARRIER`, `BLOCK_PATH`, `ASSEMBLE`-like micro interaction, occasional `CLUE_SOURCE` through completed pattern.

**Incompatible roles:** arbitrary random puzzle; hidden correct pattern not signaled in the web; mandatory use of unique critical thread from another branch.

**Requirements/providers:** missing-thread/pattern state must be visible. If a specific material is critical, it needs a guaranteed provider; otherwise free-form substitute solutions should be allowed.

**Outcomes/world effects:** web gains an opening, pattern reveals an authored symbol/clue, spider becomes friendly.

**Combat:** normally **NO**.

**Interaction shell:** puzzle/slot-like shell only if the Storylet actually requires placement; otherwise favor dialogue/action.

**Critical safety:** **YES**, strong when the visual missing piece is setup before the action.

**Repetition:** avoid pairing with a second assembly puzzle in the same short route.

---

## MIMIC

### KISTEMONSTERET
**Identity:** chest-creature that wants low-value chewable things and spits out valuable-looking currency.

**Allowed roles:** `GUARDIAN`, `BLOCK_PATH`, `TRADE`-adjacent exchange, `ITEM_HOLDER`, `COMPLICATION`.

**Incompatible roles:** silent normal treasure chest until an unavoidable attack; consuming a unique critical item; generic merchant.

**Requirements/providers:** any expendable low-stakes object can be an affordance, but critical progression must not require sacrificing a specific treasured possession unless the provider plan explicitly supplies a disposable resource.

**Outcomes/world effects:** moves aside, opens, spits/releases a pre-authored object, or becomes temporarily occupied.

**Combat:** may be allowed, never mandatory.

**Interaction shell:** object/guardian exchange + optional combat.

**Critical safety:** **YES** if the child has a non-sacrificial route and the mimic’s state is revealed before irreversible action.

**Repetition:** one mimic surprise is enough; do not train the child that every chest is hostile.

### DEN SØVNIGE KISTA
**Identity:** mimic that primarily wants sleep and is hazardous only when disturbed.

**Allowed roles:** `BLOCK_PATH`, `COMPLICATION`, environmental `GUARDIAN`.

**Incompatible roles:** critical clue source, merchant, mandatory fight.

**Requirements/providers:** quiet route, pulling from distance or bypassing are enough. Rope/grabber are affordances only.

**Outcomes/world effects:** chest relocates, sleeps more deeply, safe passage opens.

**Combat:** normally **NO** unless DM intentionally escalates an optional scene after the child chooses aggression.

**Interaction shell:** environmental obstacle.

**Critical safety:** **YES** as a simple blocker with obvious quiet/distance affordances.

**Repetition:** mutually exclusive with Kistemonsteret in most adventures to preserve mimic surprise.

---

## STONE_GOLEM

### STEINGOLEMEN
**Identity:** literal-minded stone guardian that has forgotten its own password.

**Allowed roles:** `GUARDIAN`, `PUZZLE_CARRIER`, `BLOCK_PATH`, `CLUE_SOURCE`.

**Incompatible roles:** “guess any secret word” gate with no authored answer; narrator-improvised critical password; combat-only gate.

**Requirements/providers:** if the password is critical, the graph must contain the actual authored word/rule and its clue fragments before the golem. The half-word on its back is a signal, not a license for the narrator to invent missing prerequisites. A semantically clever replacement password may be accepted by DM only if the authored outcome remains coherent.

**Outcomes/world effects:** recalls/accepts password, steps aside, reveals historical inscription or recognizes the hero later.

**Combat:** allowed, but critical route needs non-combat.

**Interaction shell:** puzzle/guardian; optional combat.

**Critical safety:** **YES ONLY WITH AUTHORED ANSWER/CLUE PLAN**. Otherwise ambient-only.

**Repetition:** do not pair with Skjelettvakten/Den levende rustningen if all three become “prove permission”.

### MOSEGOLEMEN
**Identity:** gentle heavy golem protecting the living moss/plants growing on it.

**Allowed roles:** `NPC_FAVOR`, `BLOCK_PATH`, `PUZZLE_CARRIER`, environmental `GUARDIAN`.

**Incompatible roles:** hostile brute, combat-first guardian, abstract clue oracle.

**Requirements/providers:** water or a way to redirect water. Critical use needs reachable water/environmental provider; shovel/tool can help but must not be the sole route unless explicitly planned.

**Outcomes/world effects:** golem relocates, water channel opens, plants revive, possibly reveal a natural clue.

**Combat:** **NO** by default.

**Interaction shell:** favor/environment interaction.

**Critical safety:** **YES** with explicit water setup/provider.

**Repetition:** avoid another “bring water” favor in same adventure.

---

## MUSHROOM_MONSTER

### SURMULESOPPEN
**Identity:** proud mushroom wanting recognition for its impressive hat.

**Allowed roles:** `NPC_FAVOR`, `BLOCK_PATH`, `OPTIONAL_IMPROV`, `PAYOFF_CHARACTER`.

**Incompatible roles:** fixed-answer compliment puzzle; critical factual clue based on narrator improvisation; mandatory combat.

**Requirements/providers:** compliment, portrait, mirror, performance or other child-led acknowledgement. No exact wording requirement.

**Outcomes/world effects:** moves aside, becomes friendly, grants a small optional social reward or recurring recognition.

**Combat:** **NO**.

**Interaction shell:** open NPC favor.

**Critical safety:** **YES as a flexible social blocker**, but not as a hidden-answer puzzle.

**Repetition:** avoid multiple vanity/appearance favors in one adventure.

### SPORSOPPEN
**Identity:** organizer sorting spores by visible color/pattern relationships.

**Allowed roles:** `PUZZLE_CARRIER`, `NPC_FAVOR`, `BLOCK_PATH`, `CLUE_SOURCE` if the solved sorting pattern is story-relevant.

**Incompatible roles:** random unrelated puzzle; hidden category rule with no visible signal.

**Requirements/providers:** the actual spores/mushrooms/pattern relation must be present in fiction. A physical die never substitutes for solving the observation/sorting problem.

**Outcomes/world effects:** sorting completes, route opens, an authored symbol/rule/clue becomes readable.

**Combat:** **NO**.

**Interaction shell:** puzzle shell only when a real authored sorting interaction exists; otherwise narrative favor.

**Critical safety:** **YES**, good candidate for an authored contextual puzzle.

**Repetition:** one explicit sorting puzzle per adventure.

---

## LIGHT_EATER

### LYSSLUKEREN
**Identity:** soft dark flying creature attracted to warm/beautiful light.

**Allowed roles:** `BLOCK_PATH`, `GUARDIAN`, `PUZZLE_CARRIER`, `COMPLICATION`.

**Incompatible roles:** critical item provider, combat-only monster, arbitrary darkness effect that changes known map truth.

**Requirements/providers:** movable/reflected light or alternate dark route. Critical variants need environmental light access even if the player lacks a lantern.

**Outcomes/world effects:** creature follows light away, room illumination changes, route becomes visible/usable.

**Combat:** generally **NO**.

**Interaction shell:** light/environment target shell.

**Critical safety:** **YES**, if light cause/effect is visible and provider-independent enough to avoid item softlock.

**Repetition:** do not stack with Solslukeren/Krystallslimet using the same exact mechanic.

### GLIMTMØLLEN
**Identity:** moth-like caretaker trying to gather scattered light motes safely.

**Allowed roles:** `NPC_FAVOR`, `PUZZLE_CARRIER`, `BLOCK_PATH`, optional `CLUE_SOURCE` through light arrangement.

**Incompatible roles:** aggressive enemy, arbitrary item gate.

**Requirements/providers:** mirrors/lights may help, but the room’s motes themselves must communicate the task. A critical clue produced by the final arrangement must be authored.

**Outcomes/world effects:** motes gather, moth moves, light pattern reveals a clue or makes route readable.

**Combat:** **NO**.

**Interaction shell:** puzzle/favor; explicit light routing if mechanically represented.

**Critical safety:** **YES**, particularly as a gentle contextual puzzle.

**Repetition:** keep distinct from Lysslukeren by focusing on gathering/organization rather than luring a creature.

---

## TRADER_CRAB

### BYTTEKRABBEN
**Identity:** enthusiastic collector/trader who wants a fair exchange involving odd small treasures.

**Allowed roles:** `TRADE`, `MERCHANT`-style provider, `GUARDIAN`, `BLOCK_PATH`, `ITEM_HOLDER`, `NPC_FAVOR`.

**Incompatible roles:** large abstract currency shop, compulsory theft, consuming a unique critical resource still needed elsewhere.

**Requirements/providers:** this is a strong canonical provider-family example. For a critical resource, the graph may plan:
- a concrete trade object found earlier,
- a choice among several non-critical valuables,
- a social bargain/favor route,
- another authored free-form solution accepted by DM.

If negotiation is uncertain, the physical die resolves the attempt, not whether the entire critical route continues to exist. A low result must leave another route or revised offer.

**Outcomes/world effects:** `GRANT_CRITICAL_RESOURCE`, `GRANT_OPTIONAL_ITEM`, move aside, set relationship/trade state.

**Combat:** **NO** by default; trade is the identity.

**Interaction shell:** `MERCHANT_TRADE` / focused exchange shell, not a huge shop UI.

**Critical safety:** **YES**, excellent provider subject when the exchange route is validated before placement.

**Repetition:** normally one trader/merchant subject per adventure.

### SAMLERKRABBEN
**Identity:** collector who has lost one small treasure from an overstuffed collection.

**Allowed roles:** `NPC_FAVOR`, `FOLLOW_CLUE`, `TRADE`, `ITEM_HOLDER`, `CLUE_SOURCE`.

**Incompatible roles:** hidden critical lost item with no provider/location plan; arbitrary fetch quest using an item from a future gated branch.

**Requirements/providers:** if the missing object is story-critical, its identity/location must be planned and reachable. A substitute/repair may be accepted only if authored as an alternate outcome.

**Outcomes/world effects:** finds missing object, gives/reveals another item/clue, moves aside, becomes known trader.

**Combat:** **NO**.

**Interaction shell:** NPC favor / trade.

**Critical safety:** **YES** with explicit provider path for the missing object; otherwise ambient-only.

**Repetition:** avoid same adventure as Brotrollet if both become “find one arbitrary pretty object”.

---

## FIRE_SALAMANDER

### ILDSALAMANDEREN
**Identity:** warm-seeking salamander occupying the best heated spot.

**Allowed roles:** `BLOCK_PATH`, `NPC_FAVOR`, environmental `GUARDIAN`, `PUZZLE_CARRIER`.

**Incompatible roles:** malicious fire monster, critical clue oracle.

**Requirements/providers:** heat/cold contrast, alternate warm spot, environmental manipulation. A critical scene must not require an unavailable magical heat item.

**Outcomes/world effects:** salamander relocates, heat source becomes accessible, route opens.

**Combat:** optional but usually **NO**; non-combat is more thematic.

**Interaction shell:** environmental/favor.

**Critical safety:** **YES** if room provides readable temperature affordances.

**Repetition:** one temperature-routing encounter per short adventure.

### GLØDESALAMANDEREN
**Identity:** caretaker warming a clutch/collection of stones that it believes need steady heat.

**Allowed roles:** `NPC_FAVOR`, `PUZZLE_CARRIER`, `GUARDIAN`, potential `CLUE_SOURCE` if hatching/stone state matters later.

**Incompatible roles:** arbitrary critical item provider; combat-first scene.

**Requirements/providers:** identify warmer/cooler stones or help distribute heat. If the stones hatch/reveal something story-critical, that payoff must be authored beforehand.

**Outcomes/world effects:** stones become ready, salamander relaxes/moves, authored hatch/reveal event becomes enabled.

**Combat:** **NO** by default.

**Interaction shell:** favor/puzzle; no real-world heat simulation.

**Critical safety:** **YES** when heat state and payoff are explicit.

**Repetition:** preserve as a caretaking beat, distinct from Ildsalamanderen’s relocation problem.

---

## SLEEP_MUSHROOM

### SOVESOPPEN
**Identity:** large soft sleeping mushroom accidentally blocking a doorway.

**Allowed roles:** `BLOCK_PATH`, `COMPLICATION`, `NPC_FAVOR` in a nonverbal form.

**Incompatible roles:** combat-first enemy, critical clue source, complex multi-step gate.

**Requirements/providers:** quiet sound, waiting, careful movement or routing around. Flute is an affordance, not a required answer.

**Outcomes/world effects:** rolls/moves aside, safe route opens.

**Combat:** **NO**.

**Interaction shell:** simple environmental obstacle.

**Critical safety:** **YES** for a short, low-complexity blocker.

**Repetition:** one sleeping obstacle per adventure.

### GJESPESOPPEN
**Identity:** tired mushroom seeking a dark quiet place while drifting sleepy spores complicate the room.

**Allowed roles:** `NPC_FAVOR`, `COMPLICATION`, `BLOCK_PATH`, environmental `PUZZLE_CARRIER`.

**Incompatible roles:** hard status-effect combat system, mandatory item gate.

**Requirements/providers:** shade/quiet/airflow and positioning. Any “sleepy spores” consequence stays soft and child-friendly; do not introduce hidden numerical debuffs.

**Outcomes/world effects:** mushroom relocates, spores clear, shaded corner becomes occupied/safe.

**Combat:** **NO**.

**Interaction shell:** environmental/favor.

**Critical safety:** **YES**, if spores do not create an untracked failure state.

**Repetition:** avoid with another sleep/fog scene if it would repeat the same “move slowly/quietly” solution.

---

## GARGOYLE

### TAKGARGOILEN
**Identity:** suspicious stone gargoyle investigating unexplained marks in its territory.

**Allowed roles:** `CLUE_SOURCE`, `FOLLOW_CLUE`, `GUARDIAN`, `PUZZLE_CARRIER`, `NPC_FAVOR`.

**Incompatible roles:** critical mystery with no actual authored culprit/cause; narrator-improvised truth presented as app truth; generic combat gate.

**Requirements/providers:** if used critically, the marks must originate from a real authored event/subject and there must be observable evidence. The gargoyle may know only part of the truth until the correct clue is revealed.

**Outcomes/world effects:** identifies cause/direction, reveals a location/clue, stands down, or becomes a later witness.

**Combat:** may be allowed in optional guardian variants, but normally **NO** for clue/investigation variants.

**Interaction shell:** clue/favor/puzzle; optional combat only when explicitly authored.

**Critical safety:** **YES ONLY WITH AUTHORED MYSTERY TRUTH AND CLUE CHAIN**. Otherwise ambient-only.

**Repetition:** do not pair with other investigation subjects unless clues serve the same coherent mystery rather than disconnected mini-mysteries.

### REGNGARGOILEN
**Identity:** wet stone gargoyle seeking shelter before moss overtakes it.

**Allowed roles:** `NPC_FAVOR`, `BLOCK_PATH`, environmental `GUARDIAN`, optional `PAYOFF_CHARACTER`.

**Incompatible roles:** critical clue oracle, combat-first enemy.

**Requirements/providers:** shelter, cover, moving object, dry alcove or magical/weather solution. Critical use requires visible/reachable shelter affordance, not a hidden exact item.

**Outcomes/world effects:** gargoyle moves to shelter, route opens, perhaps later recognizes/helpfully warns the hero.

**Combat:** **NO** by default.

**Interaction shell:** NPC/environment favor.

**Critical safety:** **YES** for a simple favor/blocker.

**Repetition:** avoid same adventure as other “find a better place to stand/sleep” scenes unless tone/solution differs strongly.

---

# Cross-bank findings from the completed monster review

## 1. Similar mechanics need anti-repetition constraints
Several subjects can naturally express the same mechanic. The planner must score down or reject same-adventure repetition when the dramatic function and solution family are also the same.

Examples:
- light redirection: Krystallslimet / Solslukeren / Lysslukeren / Glimtmøllen,
- permission/proof: Skjelettvakten / Den levende rustningen / Steingolemen,
- food/hunger: Sumptrollet / Den sultne krokodillen / Den kjøttetende planten,
- trade/pretty object: Brotrollet / Kjempeedderkoppen / Byttekrabben / Samlerkrabben,
- quiet/sleep: Tåkespøkelset / Den søvnige kista / Sovesoppen / Gjespesoppen.

This is not a reason to delete subjects. It is a reason for Storylet selection to consider **mechanic family and dramatic purpose**, not only subject identity.

## 2. Subject names must not create false provider semantics
The strongest example is `KRYSTALLSLIMET`: it must not satisfy or imply a CRYSTAL_MACHINE crystal requirement merely because it is crystal-themed.

Provider truth must come from the graph, not noun matching.

## 3. Critical mystery-like monsters require authored truth
`STEINGOLEMEN` and `TAKGARGOILEN` expose the same boundary from different sides:
- forgotten password needs a real answer/clue plan,
- mysterious marks need a real cause/clue chain.

If those truths do not exist in the graph, the scene is ambient/improvisational only and cannot carry critical progression.

## 4. Trade subjects validate the provider architecture
`BYTTEKRABBEN` is the clearest existing subject for a focused `TRADE`/merchant-style provider:
- concrete object exchange,
- no giant currency system,
- child proposes offer,
- DM decides uncertainty,
- low roll fails forward,
- critical resource route remains available.

`KJEMPEEDDERKOPPEN` can use the same provider family but with a collector/guardian identity instead of a merchant identity.

## 5. Combat capability should remain sparse
Subjects that naturally support optional combat include:
- Skjelettvakten,
- Den levende rustningen,
- Den sultne krokodillen,
- Kjempeedderkoppen,
- Kistemonsteret,
- Steingolemen,
- selected plant/guardian variants.

Many other “monster” subjects are better explicitly `combatAllowed=false`. Category `MONSTER` must not imply combat capability.

## 6. Environmental blockers need real world effects
For every critical blocker, resolution must mutate something concrete:
- route becomes usable,
- fog/light state changes,
- creature relocates,
- gate/obstacle state changes.

“Encounter marked complete” alone is insufficient.

# Category checkpoint
The existing **MONSTER subject category is now editorially reviewed**:
- Zombie family: reviewed earlier,
- Skeleton family: reviewed earlier,
- Troll family: reviewed earlier,
- Living Armor through Gargoyle: reviewed in this document.

This does **not** mean every possible Storylet combination is approved. It establishes allowed/incompatible semantic directions for later Storylet authoring.

No new subjects were added. No Adventure Blueprint was added.

## Exact editorial continuation
Next category: existing `PEOPLE` bank.

Next subject:

**LANTERNEVAKTEN**

Continue with the same review frame before moving to `FRIENDS`, `TRAPS`, `MYSTERIES` and `TREASURES`.
