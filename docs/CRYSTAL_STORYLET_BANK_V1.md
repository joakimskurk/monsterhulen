# CRYSTAL_MACHINE - Initial Storylet Bank V1

Status: **EDITORIAL PREP - AUDITED 2026-10-27 - candidates for WP-NG2, no runtime implementation yet**

Purpose: start NG2 with a small bank of strong, concrete modules rather than generic procedural text. These candidates intentionally reuse existing Monsterhulen NPC/monster entities where possible.

Audit reference:
`docs/CRYSTAL_STORYLET_AUDIT_2026-10-27.md`

The target is 3 `SEARCH_SECRET`, 3 `NPC_FAVOR` and 3 `GUARDIAN` storylets. A generated Crystal Machine adventure should normally use one from each family.

Color is a parameter (`RØD`, `BLÅ`, `GUL`) unless a variant says otherwise.

Main requirement reveal occurs before all three acquisition branches. The branches must remain reachable in any order.

Every crystal here is an explicitly bound critical provider resource instance. Generic UX5A search loot or theme/name similarity never supplies a machine crystal automatically.

---

## SEARCH_SECRET 1 - LYSET I SPREKKEN

**id:** `CRYSTAL_SEARCH_LIGHT_CRACK`

**Provides:** one critical crystal instance

**Mechanic families:** `SEARCH_SECRET`, `LIGHT_OBSERVATION`

**Room needs:** ordinary stone room; searchable wall/floor edge with an honest visible/plausible crack or seam

**Setup / child-facing scene:**
> Når dere går forbi veggen, blinker et lite [FARGE] lys mellom to steiner. Så er det borte igjen.

**Signal:** visible colored flash before any search action.

**Narrator goal:** let the child decide how to inspect the crack. Do not name the crystal yet.

**Useful approaches:**
- look closely,
- shine lantern/light,
- use mirror,
- feel along stones,
- use rope/tool/magic,
- invent another plausible method.

**Fail-forward:**
- first low uncertain search: a tiny matching shard falls out and the glow becomes easier to locate,
- repeated low: a loose stone shifts enough to expose the hiding place.

The tiny shard is a **signal only**, not a resource instance and cannot satisfy any crystal requirement.

**Payoff:**
> Bak den løse steinen ligger en [FARGE] krystall som lyser med samme farge som festet ved maskinen.

**Knowledge reveal:** crystal identity only on reveal.

**Compatibility:** all tones except scenes where room presentation has no plausible stone surface/seam.

**Selection note:** strongly penalize pairing with `CRYSTAL_GUARDIAN_LIGHT_SLIME` because both make colored light a central critical signal.

---

## SEARCH_SECRET 2 - KRYSTALLKLANGEN

**id:** `CRYSTAL_SEARCH_CHIME`

**Provides:** one critical crystal instance

**Mechanic families:** `SEARCH_SECRET`, `SOUND_LOCALIZATION`

**Room needs:** ordinary room with stones/rubble or hollow feature

**Setup / child-facing scene:**
> Hver gang noen tråkker nær den ene siden av rommet, høres et lite «pling» under gulvet.

**Signal:** sound repeats consistently from a location.

**Narrator goal:** establish that the sound has a source, not that a treasure marker exists.

**Useful approaches:**
- listen from different places,
- tap stones,
- move small rubble,
- use staff/hammer carefully,
- ask a companion to listen,
- magic/free-form solution.

**Fail-forward:**
- first low: the sound becomes louder and one floor stone vibrates,
- repeated low: the edge of the loose stone lifts enough to get hold of it.

**Payoff:** a crystal sits in a small hollow beneath the stone.

**Special quality:** strongest sensory contrast in the initial search set; supports listening-focused child play and is the preferred baseline search Storylet for first manual Crystal Machine evaluation.

---

## SEARCH_SECRET 3 - FARGEN SOM IKKE HØRER HJEMME

**id:** `CRYSTAL_SEARCH_REFLECTION`

**Provides:** one critical crystal instance

**Mechanic families:** `SEARCH_SECRET`, `LIGHT_REFLECTION`

**Room needs:** reflective surface such as puddle, shiny wall, glass, polished metal or damp floor. The renderer/story presentation must actually provide one.

**Setup / child-facing scene:**
> I en liten blank flekk på gulvet ser dere et [FARGE] lys. Men når dere ser rett på veggen, er det ingen [FARGE] lampe der.

**Signal:** reflection points toward a hidden source.

**Narrator goal:** invite observation and triangulation.

**Useful approaches:**
- move around and watch reflection,
- use mirror,
- block other light,
- shine lantern,
- trace direction,
- free-form.

**Fail-forward:**
- first low: reflection becomes visible from a second angle,
- repeated low: a narrow seam catches the same colored light and reveals the hiding spot.

**Payoff:** crystal is hidden behind/inside the object producing the reflection.

**Hard compatibility rule:** reject if room materialization cannot honestly show a reflective feature and coherent source direction.

**Hard initial pairing rule:** reject pairing with `CRYSTAL_GUARDIAN_LIGHT_SLIME` in initial V1 because two of three critical branches would revolve around reflected/moving light.

---

# NPC_FAVOR

## NPC_FAVOR 1 - UGLEBIBLIOTEKAREN OG DEN BORTBLÅSTE SIDEN

**id:** `CRYSTAL_NPC_OWL_PAGE`

**NPC:** `NPC_OWL_LIBRARIAN` / UGLEBIBLIOTEKAREN

**Provides:** one critical crystal instance

**Requires secondary node/resource:** `LOST_PAGE`

**Mechanic families:** `NPC_FAVOR`, `FETCH_RETURN`

This is a separate authored Uglebibliotekaren Storylet variant. It does not mutate/conflate the current ambient “stuck book” scene.

**Setup / child-facing scene:**
> Uglebibliotekaren har en [FARGE] krystall liggende som bokmerke på pulten. Men ugla leter fortvilet gjennom en bok med én revet side.

**NPC motive:** the missing page contains the end of a map/catalog entry the owl promised to finish.

**Quest reveal:**
> «Den dumme trekken tok siden min gjennom døra. Hvis dere ser et ark med en stor måne tegnet på, er det mitt!»

**Secondary dependency:** place the page in a reachable pre-gate room. It may be caught under a stone, behind a barrel, on a branch, etc. It is scenario-specific and guaranteed, not generic UX5A loot.

`LOST_PAGE` is a real graph resource/node with stable identity, knowledge state and provider reachability.

**Approaches at dependency:** spot, reach, retrieve, secure, use tool/companion/free-form. Do not require a specific item.

**Payoff:**
> Ugla setter siden tilbake på plass. «Der! Nå kan jeg endelig levere boka. Denne krystallen fant jeg mellom hyllene. Kanskje dere trenger den mer enn jeg gjør.»

The page is not silently returned because it is in inventory. Child/DM explicitly returns/transfers it, then the authored reward transition grants the crystal.

**Why it works:** crystal is visible early, favor has a reason, dependency creates a small excursion and reward is explicitly transferred.

---

## NPC_FAVOR 2 - DVERGSMEDEN OG DEN MANGLENDE FJÆRA

**id:** `CRYSTAL_NPC_SMITH_SPRING`

**NPC:** `NPC_DWARF_SMITH` / DVERGSMEDEN

**Provides:** one critical crystal instance

**Requires secondary node/resource:** `LOCK_SPRING`

**Mechanic families:** `NPC_FAVOR`, `SMALL_OBJECT_RECOVERY`, `PRECISE_REPAIR`

This is a separate authored Dvergsmeden Storylet variant. Current source also contains a different smith scene with a spring stuck inside a lock; the two variants remain distinct.

**Setup / child-facing scene:**
> En [FARGE] krystall ligger på smedens arbeidsbenk og holder noen tegninger nede. Dvergsmeden rister på en halvferdig lås.

**NPC motive:** a tiny metal spring bounced away while the smith tested the lock.

**Quest reveal:**
> «Jeg hørte den sprette gjennom åpningen der. Finn den lille sølvfjæra, så kan jeg få denne låsen ferdig.»

**Secondary dependency:** guaranteed reachable nearby room with an authored signal such as tiny metallic `ting` sound or a glint near rubble.

`LOCK_SPRING` is scenario-specific critical provider state, never generic optional loot.

**Approaches:** observe, listen, magnet if available, careful search, tool, magic, free-form.

**Fail-forward:** the spring cannot be permanently lost; low uncertainty makes the metallic clue more obvious.

**Payoff:**
> Låsen klikker perfekt. Smeden skyver den [FARGE] krystallen over bordet. «Denne har bare holdt tegningene mine på plass. Dere ser ut som dere har et bedre sted til den.»

Finding the spring does not auto-complete the favor. Explicit return/repair resolution precedes reward transfer.

**Selection note:** avoid another precise-repair critical branch in the same adventure.

---

## NPC_FAVOR 3 - ALVEKARTOGRAFEN OG DET MANGLENDE LANDMERKET

**id:** `CRYSTAL_NPC_CARTOGRAPHER_MARKER`

**NPC:** `NPC_ELF_CARTOGRAPHER` / ALVEKARTOGRAFEN

**Provides:** one critical crystal instance

**Requires secondary authored feature:** `MAP_LANDMARK`

**Mechanic families:** `NPC_FAVOR`, `OBSERVATION_RETURN`, `MAP_KNOWLEDGE`

**Setup / child-facing scene:**
> En [FARGE] krystall ligger på et hjørne av kartet for å holde det flatt. Ved et allerede tegnet veikryss er det et stort tomt spørsmålstegn der et landemerke skulle vært.

**NPC motive:** needs to confirm which clear landmark belongs at a known map position, not discover/create a new route.

**Quest reveal:**
> «Jeg har veikrysset her, men mangler merket som gjør at man kjenner stedet igjen. Ser dere en statue, klokke, gammel brønn eller noe annet veldig tydelig i rommene dere kan nå herfra, kom tilbake og fortell meg hva dere så.»

**Secondary dependency:** one reachable pre-gate room is given a clear authored landmark. It cannot be final, hidden behind the gate or invented by narrator improvisation.

`MAP_LANDMARK` is graph truth. Returning the observation changes favor/knowledge state; it does not create topology.

**Approaches:** observe, describe, draw, remember, use chalk, companion, free-form. No die needed for simply noticing an obvious landmark.

**Payoff:**
> Kartografen tegner inn merket og smiler. «Nå stemmer kartet. Ta krystallen. Den er en elendig kartvekt, men kanskje en god eventyrting.»

**Why it works:** creates a quest based on noticing/exploration rather than another object pickup while respecting truth/knowledge separation.

---

# GUARDIAN

## GUARDIAN 1 - LYSSLIMET

**id:** `CRYSTAL_GUARDIAN_LIGHT_SLIME`

**Subject:** existing `SLIME` family, explicitly bound by this Storylet

**Provides:** one critical crystal instance

**Mechanic families:** `GUARDIAN`, `LIGHT_LURE`

**combatAllowed:** `false` for initial V1

Provider truth exists because this Storylet explicitly places the crystal inside the slime. No slime/crystal naming similarity creates provider semantics elsewhere.

**Setup / child-facing scene:**
> Inne i et gjennomsiktig slim gløder en [FARGE] krystall. Slimet glir etter hver lysflekk som beveger seg over veggen.

**Motive:** fascinated by moving light; not evil and does not understand that the crystal is needed elsewhere.

**Signal:** explicitly show that it follows light before asking for a plan.

**Authored non-combat affordances:**
- lure with lantern,
- reflect light with mirror/shiny object,
- make moving shadows,
- offer another glowing curiosity,
- communicate/play,
- magic/free-form.

**Fail-forward:** failed lure gives stronger evidence about exactly what kind of light/movement attracts it.

**Payoff:** the slime deliberately moves/releases/expels the crystal and remains a creature rather than disappearing as a defeated HP container.

Moving the slime alone does not auto-grant the crystal. Crystal transfer/retrieval is explicit.

**Selection rule:** reject with `CRYSTAL_SEARCH_REFLECTION`; strongly penalize with `CRYSTAL_SEARCH_LIGHT_CRACK`.

---

## GUARDIAN 2 - BYTTEKRABBENS FINN

**id:** `CRYSTAL_GUARDIAN_TRADER_CRAB`

**Subject:** `TRADER_CRAB` / BYTTEKRABBEN

**Provides:** one critical crystal instance

**Mechanic families:** `GUARDIAN`, `TRADE_NEGOTIATION`

**combatAllowed:** `false` for initial V1

**Setup / child-facing scene:**
> Byttekrabben sitter foran en liten samling blanke ting. Midt i haugen ligger en [FARGE] krystall. Krabben løfter den opp, ser på dere og peker så nysgjerrig på sekken deres.

**Motive:** collector/trader, not a villain.

**Signal:** wants an interesting fair exchange or story, not necessarily a valuable item.

**Authored non-combat affordances:**
- propose a trade,
- tell the story of an object,
- show something odd,
- perform a small service,
- negotiate/refuse and find another plan,
- another plausible free child solution.

**Hard rules:**
- never require consumption of a unique story-critical resource from another branch,
- at least one critical-safe route exists even if hero has no attractive optional loot,
- one failed uncertain negotiation cannot permanently remove the crystal,
- low result leads to counteroffer/favor/stronger signal/alternate route.

**Payoff:** crab willingly hands over the crystal when satisfied or when child finds another plausible authored resolution.

If a concrete trade commits, offered item transfer and crystal grant happen atomically through explicit semantic action.

**Why it works:** uses an existing identity that naturally supports focused trade without a large economy system.

---

## GUARDIAN 3 - STEINGOLEMMEN SOM HOLDER VAKT

**id:** `CRYSTAL_GUARDIAN_GOLEM`

**Subject:** `STONE_GOLEM`

**Provides:** one critical crystal instance

**Mechanic families:** `GUARDIAN`, `PERMISSION_PROOF`

**combatAllowed:** `true`, but non-combat is presented first and DM must explicitly start combat

**Phase rule:** this Storylet is valid only after the main machine requirement reveal.

**Setup / child-facing scene:**
> En [FARGE] krystall sitter i en liten skål bak en tung steingolem. Hver gang noen nærmer seg skålen, flytter golemen seg rolig foran den igjen.

**Motive:** following an old instruction: protect the bowl until someone demonstrates they are there to repair/wake the crystal machine, not steal from the cave.

**Signal:** golem blocks, but does not attack first. Nearby marks repeat the same three colors as the already-revealed machine sockets.

**Authored non-combat affordances:**
- show already-found crystal(s) as optional supporting evidence,
- copy/match the three-color symbol,
- explain/act out the intended repair,
- distract/move around it,
- use strength/tool/magic creatively,
- discover a simple old command through observation.

**Parallel-branch hard rule:** already-found crystals are never prerequisites. This branch must be independently solvable even if visited first after quest reveal.

If an old command/instruction is usable, its content is authored truth with observable clue; narrator cannot invent a critical command.

**Fail-forward:** low-risk failed attempts reveal another piece of the golem's instruction or make its protective pattern clearer.

**Payoff:** golem deliberately steps aside/allows the crystal to be taken; this is resolution, not necessarily defeat. Crystal transfer remains explicit.

---

# Selection rules for this bank

For the first implementation experiment:
1. choose exactly one `SEARCH_SECRET`, one `NPC_FAVOR`, one `GUARDIAN`,
2. assign RØD/BLÅ/GUL deterministically by adventure seed,
3. main machine requirement reveal happens before branch materialization assumes player knowledge,
4. keep all three branches reachable in any order,
5. do not repeat NPC or monster family within the three critical branches,
6. secondary NPC dependencies are explicit graph nodes/features and reachable before final gate,
7. generic UX5A hidden finds cannot satisfy critical crystal/secondary dependencies by accident,
8. all critical search/dependency failure paths are fail-forward,
9. child may solve any scene in an unlisted plausible way,
10. authored text is rejected/re-authored if room/tone requirements cannot be presented honestly,
11. mechanic-family repetition is scored/filtered in addition to role/subject repetition,
12. critical trade/transfer cannot consume another still-required unique resource,
13. possession never auto-completes branch transfer or later assembly.

## Initial mechanic-pair constraints
- `CRYSTAL_SEARCH_REFLECTION` + `CRYSTAL_GUARDIAN_LIGHT_SLIME`: **reject** in initial V1.
- `CRYSTAL_SEARCH_LIGHT_CRACK` + `CRYSTAL_GUARDIAN_LIGHT_SLIME`: strong repetition penalty.

# Controlled first manual baseline
Before trusting combinatorial selection, first manual/editorial Crystal Machine story should deliberately use a high-contrast trio:

- `CRYSTAL_SEARCH_CHIME`
- `CRYSTAL_NPC_OWL_PAGE`
- `CRYSTAL_GUARDIAN_LIGHT_SLIME`

Reason:
- listening/search,
- favor + secondary dependency + explicit return,
- environmental guardian/lure,
- minimal mechanic overlap,
- avoids adding trade/economy concerns to the first baseline narrative-quality check.

A later manual variant should deliberately use `CRYSTAL_GUARDIAN_TRADER_CRAB` to test trade/provider semantics.

This controlled baseline is not a new Adventure Blueprint and does not authorize runtime implementation before UX5A green.

# Editorial review questions
Before these become code/data, review each candidate against:
- Is the important thing visible or signalled before action?
- Can a five-year-old understand what is interesting here?
- Does narrator know what character/creature wants?
- Is there a concrete reason crystal is here?
- Are non-combat ideas visible without becoming a closed answer list?
- Does failure reveal more rather than stall?
- Does reward feel caused by what child did?
- Is provider truth explicit rather than inferred by name/theme?
- Does this branch remain independently reachable in any branch order?
- Is its core mechanic distinct enough from the other two selected branches?
- Does any clue/location obey truth, knowledge and phase rules?

These are candidate V1 modules. Manual playtest may reject or rewrite any of them even if future schema validator accepts them.
