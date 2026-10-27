# Monsterhulen - Friend Subject Review V1

Status: **EDITORIAL PREP ONLY - NO RUNTIME IMPLEMENTATION**
Updated: 2026-10-27
Branch: `narrative/story-graph-v1-prep`

Purpose: review the complete existing `FRIENDS` bank using the same subject/role/provider model as MONSTERS and PEOPLE.

No new subjects or blueprints are added. UX5A physical gate remains binding.

## Shared FRIEND principles
A `VENN` subject is friendly in fiction. It is not a hidden combat encounter and should not become a generic numerical bonus.

A friend may:
- help with one concrete scene,
- reveal authored information,
- become a recurring known figure,
- travel with the hero when explicitly authored,
- create future affordances.

A friend does **not** automatically:
- solve future gates,
- grant +1 / bonus dice,
- reveal unknown rooms,
- act as a second player character with its own turn/stats.

Recurring relationship state should be semantic and explicit.

---

## DEN SVARTE KATTEN
**Identity:** observant, slightly impatient black cat that notices small openings and wants the hero to notice them too.

**Allowed roles:** `CLUE_SOURCE`, `FOLLOW_CLUE`, `NPC_FAVOR`, `REVEAL_LOCATION`, `PAYOFF_CHARACTER`, optional recurring friend.

**Incompatible roles:** omniscient secret detector, automatic hidden-door opener, combat, arbitrary critical-route creation.

**Requirements/providers:** child follows/inspects the cat’s physical cue: loose stone, airflow, whisker reaction. Lantern/chalk/wind-up mouse/rope are affordances. If the opening is critical, the graph must already contain that opening/edge and its reveal condition.

**Outcomes/world effects:** `REVEAL_LOCATION`, reveal hidden opening, mark a known place, establish cat relationship, optionally enable later recognition/follow behavior.

**Knowledge rule:** the cat can signal something is interesting, but player knowledge should update only when the opening/detail is actually revealed.

**Combat:** **NO**.

**Interaction shell:** friend/follow-clue + explicit reveal action when relevant.

**Critical safety:** **YES**, if it reveals existing authored topology rather than inventing it.

**Repetition:** do not let the cat become a universal secret-finder across the whole adventure.

---

## SKJELETTMUSIKEREN
**Identity:** friendly musician trying to finish a song with one broken/missing tone or string.

**Allowed roles:** `NPC_FAVOR`, `CLUE_SOURCE`, `NPC_REWARD`, `PUZZLE_CARRIER`, `PAYOFF_CHARACTER`.

**Incompatible roles:** combat, mandatory exact instrument item, generic rhythm minigame disconnected from story.

**Requirements/providers:** repair, replacement string, singing, playing along or another musical substitute. Gold thread/repair kit/flute are affordances only unless explicitly provider-planned.

**Outcomes/world effects:** song completes, musician reveals/plays a useful authored signal, becomes recurring friend, grants small item/clue.

**Critical clue rule:** if the completed song is a key clue/rule, the signal must already exist in authored truth. The narrator cannot improvise a new critical melody after the fact.

**Combat:** **NO**.

**Interaction shell:** NPC favor; optional contextual music/rhythm puzzle only if the story actually uses one.

**Critical safety:** **YES**, especially as `NPC_FAVOR -> CLUE_SOURCE` when the clue is authored.

**Repetition:** avoid with Skjelettdanseren in the same short adventure unless one is explicitly dance/social and the other clue/music.

---

## SOPPPRINSEN
**Identity:** tiny formal mushroom prince trying to orient a damp map using real landmarks.

**Allowed roles:** `NPC_FAVOR`, `FOLLOW_CLUE`, `REVEAL_LOCATION`, `CLUE_SOURCE`, recurring friendly character.

**Incompatible roles:** omniscient route guide, random future-room reveal, combat.

**Requirements/providers:** identify real landmark, orient map, mark direction. Spyglass/chalk are affordances. If the route is critical, the landmark/location must exist and be revealable at the current phase.

**Outcomes/world effects:** `REVEAL_LOCATION`, reveal direction, prince safely leaves/follows route, relationship state established.

**Knowledge/topology rule:** the prince can change what the player knows, not create new map topology.

**Combat:** **NO**.

**Interaction shell:** friend/follow-clue, map knowledge reveal.

**Critical safety:** **YES** with authored location truth.

**Repetition:** avoid pairing with Alvekartografen/Sneglebudet if all three only solve navigation.

---

## BOKBILLEN
**Identity:** book-carrying beetle trying to understand a strange mirrored-looking symbol without damaging the book.

**Allowed roles:** `PUZZLE_CARRIER`, `NPC_FAVOR`, `CLUE_SOURCE`, `PAYOFF_CHARACTER`.

**Incompatible roles:** random generic puzzle, critical symbol with no authored meaning, combat.

**Requirements/providers:** mirror/trace/compare/read the symbol. Mirror/chalk are affordances, but the symbol’s rule/meaning must exist in the Storylet if critical.

**Outcomes/world effects:** `REVEAL_CLUE`, reveal symbol meaning/rule, point to an authored detail, establish friend relation.

**Puzzle rule:** the puzzle should be directly about the symbol/book/story context. No disconnected worksheet logic.

**Combat:** **NO**.

**Interaction shell:** contextual puzzle/friend interaction.

**Critical safety:** **YES**, if the symbol meaning is authored and phase-correct.

**Repetition:** avoid another book/symbol puzzle nearby unless part of the same coherent clue chain.

---

## SEKKEGREVLINGEN
**Identity:** determined pack badger refusing to abandon belongings, needing help repacking a stuck oversized bag.

**Allowed roles:** `NPC_FAVOR`, `BLOCK_PATH` in a friendly/physical sense, `PAYOFF_CHARACTER`, optional `ITEM_HOLDER`/provider after help.

**Incompatible roles:** forced inventory sacrifice, generic backpack management tutorial, combat.

**Requirements/providers:** repack, bind, temporarily carry, adjust frame, creative packing. Rope/tools are affordances. The child must never be forced to discard their own critical item to progress.

**Outcomes/world effects:** badger passes/clears route, becomes known friend, may give a small authored optional item or later packing-related affordance.

**Inventory rule:** this subject should not mutate the player inventory invisibly. If the child temporarily carries something, that state/action must be explicit and reversible/clear.

**Combat:** **NO**.

**Interaction shell:** NPC favor; no generic inventory optimization subsystem.

**Critical safety:** **YES** as a flexible physical favor/blocker.

**Repetition:** avoid another “bag/packing” problem in same adventure.

---

## PAPIRFUGLEN
**Identity:** fragile paper messenger trying to land safely long enough for a message to be read and then continue.

**Allowed roles:** `CLUE_SOURCE`, `FOLLOW_CLUE`, `RETURN`, `NPC_FAVOR`, `REVEAL_LOCATION`, `PAYOFF_CHARACTER`.

**Incompatible roles:** random message generator, future-phase clue after its purpose expires, combat, generic “hint bird” appearing whenever player is stuck.

**Requirements/providers:** shelter from wind, landing spot, careful holding, copy/read message. Umbrella/shield/chalk/cape are affordances.

**Outcomes/world effects:** `REVEAL_CLUE`, deliver/copy message, enable next objective/location, bird departs to an authored next destination.

**Temporal rule:** this is one of the strongest examples of phase-sensitive Storylets. A message intended as setup must expire after its setup function is obsolete unless the bird receives a newly authored later role.

**Knowledge rule:** message content must be authored before reveal. The narrator may add flavor but not invent new critical requirements in the message.

**Combat:** **NO**.

**Interaction shell:** favor + explicit message reveal/delivery state.

**Critical safety:** **YES**, strong critical clue messenger when phase/knowledge is modeled.

**Repetition:** normally one paper-message delivery chain per adventure.

---

# Cross-bank findings from FRIEND review

## 1. Friend recurrence must be semantic, not statistical
If a friend returns later, persistence should record things such as:
- known/friendly,
- following or not,
- current authored role,
- already-resolved favor,
- allowed later affordance.

It should not become a generic bonus source.

## 2. Several friends are knowledge revealers, not topology generators
Especially:
- Den svarte katten,
- Soppprinsen,
- Papirfuglen.

They can reveal or point toward existing authored state. They cannot invent a hidden door, route or objective that the graph did not contain.

## 3. Friend-provided critical clues need authored truth
Especially:
- Skjelettmusikeren,
- Bokbillen,
- Papirfuglen.

Their performance/symbol/message can deliver a critical clue only when that clue exists and its reveal is phase-valid.

## 4. FRIEND should not mean “cannot block route”
A friendly figure can physically occupy/complicate a route, but the scene’s tone and solution remain cooperative. Resolution should apply a concrete world effect if progression depends on it.

## 5. Phase/expiry applies to friendly content too
Papirfuglen makes this explicit: friendly content can become narratively stale just like threats/complications.

---

# Category checkpoint
The complete existing **FRIENDS** bank is now editorially reviewed.

No subjects were added. No Adventure Blueprint was added. No runtime was implemented.

## Exact editorial continuation
Next category: existing `TRAPS` bank.

Next subject:

**DET KILENDE GULVET**

Then continue in source order:
- Beinfellen,
- Bobleporten,
- Skyg gulvet,
- Den sovende trappa,
- Regnbuenettet.

After TRAPS: MYSTERIES -> TREASURES.
