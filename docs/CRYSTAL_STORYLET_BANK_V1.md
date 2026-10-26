# CRYSTAL_MACHINE - Initial Storylet Bank V1

Status: **EDITORIAL PREP - candidates for WP-NG2, no runtime implementation yet**

Purpose: start NG2 with a small bank of strong, concrete modules rather than generic procedural text. These candidates intentionally reuse existing Monsterhulen NPC/monster entities where possible.

The target is 3 `SEARCH_SECRET`, 3 `NPC_FAVOR` and 3 `GUARDIAN` storylets. A generated Crystal Machine adventure should normally use one from each family.

Color is a parameter (`RØD`, `BLÅ`, `GUL`) unless a variant says otherwise.

---

## SEARCH_SECRET 1 - LYSET I SPREKKEN

**id:** `CRYSTAL_SEARCH_LIGHT_CRACK`

**Provides:** one crystal

**Room needs:** ordinary stone room; searchable wall/floor edge

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

**Payoff:**
> Bak den løse steinen ligger en [FARGE] krystall som lyser med samme farge som festet ved maskinen.

**Knowledge reveal:** crystal identity only on reveal.

**Compatibility:** all tones except scenes where the room presentation has no plausible stone surface.

---

## SEARCH_SECRET 2 - KRYSTALLKLANGEN

**id:** `CRYSTAL_SEARCH_CHIME`

**Provides:** one crystal

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

**Special quality:** good contrast with visual `LYSET I SPREKKEN`; supports listening-focused child play.

---

## SEARCH_SECRET 3 - FARGEN SOM IKKE HØRER HJEMME

**id:** `CRYSTAL_SEARCH_REFLECTION`

**Provides:** one crystal

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

**Hard compatibility rule:** reject if room materialization cannot honestly show a reflective feature.

---

# NPC_FAVOR

## NPC_FAVOR 1 - UGLEBIBLIOTEKAREN OG DEN BORTBLÅSTE SIDEN

**id:** `CRYSTAL_NPC_OWL_PAGE`

**NPC:** `NPC_OWL_LIBRARIAN` / UGLEBIBLIOTEKAREN

**Provides:** one crystal

**Requires secondary node:** `LOST_PAGE`

**Setup / child-facing scene:**
> Uglebibliotekaren har en [FARGE] krystall liggende som bokmerke på pulten. Men ugla leter fortvilet gjennom en bok med én revet side.

**NPC motive:** the missing page contains the end of a map/catalog entry the owl promised to finish.

**Quest reveal:**
> «Den dumme trekken tok siden min gjennom døra. Hvis dere ser et ark med en stor måne tegnet på, er det mitt!»

**Secondary dependency:** place the page in a reachable pre-gate room. It may be caught under a stone, behind a barrel, on a branch, etc. It is scenario-specific and guaranteed, not generic UX5A loot.

**Approaches at dependency:** spot, reach, retrieve, secure, use tool/companion/free-form. Do not require a specific item.

**Payoff:**
> Ugla setter siden tilbake på plass. «Der! Nå kan jeg endelig levere boka. Denne krystallen fant jeg mellom hyllene. Kanskje dere trenger den mer enn jeg gjør.»

**Why it works:** crystal is visible early, favor has a reason, dependency creates a small excursion and the reward is explicitly transferred.

---

## NPC_FAVOR 2 - DVERGSMEDEN OG DEN MANGLENDE FJÆRA

**id:** `CRYSTAL_NPC_SMITH_SPRING`

**NPC:** `NPC_DWARF_SMITH` / DVERGSMEDEN

**Provides:** one crystal

**Requires secondary node:** `LOCK_SPRING`

**Setup / child-facing scene:**
> En [FARGE] krystall ligger på smedens arbeidsbenk og holder noen tegninger nede. Dvergsmeden rister på en halvferdig lås.

**NPC motive:** a tiny metal spring bounced away while the smith tested the lock.

**Quest reveal:**
> «Jeg hørte den sprette gjennom åpningen der. Finn den lille sølvfjæra, så kan jeg få denne låsen ferdig.»

**Secondary dependency:** guaranteed reachable nearby room with an authored signal such as tiny metallic `ting` sound or a glint near rubble.

**Approaches:** observe, listen, magnet if available, careful search, tool, magic, free-form.

**Fail-forward:** the spring cannot be permanently lost; low uncertainty makes the metallic clue more obvious.

**Payoff:**
> Låsen klikker perfekt. Smeden skyver den [FARGE] krystallen over bordet. «Denne har bare holdt tegningene mine på plass. Dere ser ut som dere har et bedre sted til den.»

**Why it works:** reuses the smith's established lock/mechanism identity and gives the crystal a believable incidental history.

---

## NPC_FAVOR 3 - ALVEKARTOGRAFEN OG DET MANGLENDE LANDMERKET

**id:** `CRYSTAL_NPC_CARTOGRAPHER_MARKER`

**NPC:** `NPC_ELF_CARTOGRAPHER` / ALVEKARTOGRAFEN

**Provides:** one crystal

**Requires secondary observation node:** `MAP_LANDMARK`

**Setup / child-facing scene:**
> En [FARGE] krystall ligger på et hjørne av kartet for å holde det flatt. Midt på kartet er det et stort tomt spørsmålstegn.

**NPC motive:** needs to know which symbol/landmark belongs at one missing junction.

**Quest reveal:**
> «Jeg vet gangen fortsetter, men jeg mangler det viktigste merket. Ser dere en statue, klokke, gammel brønn eller noe annet veldig tydelig, kom tilbake og fortell meg hva dere så.»

**Secondary dependency:** one reachable room is given a clear authored landmark. It cannot be the final room and cannot be hidden behind the gate.

**Approaches:** observe, describe, draw, remember, use chalk, companion, free-form. No die needed for simply noticing an obvious landmark.

**Payoff:**
> Kartografen tegner inn merket og smiler. «Nå stemmer kartet. Ta krystallen. Den er en elendig kartvekt, men kanskje en god eventyrting.»

**Why it works:** creates a quest based on noticing/exploration rather than another object pickup.

---

# GUARDIAN

## GUARDIAN 1 - LYSSLIMET

**id:** `CRYSTAL_GUARDIAN_LIGHT_SLIME`

**Monster family:** `SLIME`

**Provides:** one crystal

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

**Combat:** only if child chooses it or fiction escalates naturally.

**Fail-forward:** failed lure gives stronger evidence about exactly what kind of light/movement attracts it.

**Payoff:** when slime moves/releases/expels the crystal, it remains a creature rather than disappearing as a defeated HP container.

**Why it works:** crystal is physically and visibly tied to the guardian, and the clue itself suggests a child-readable nonviolent solution.

---

## GUARDIAN 2 - BYTTEKRABBENS FINN

**id:** `CRYSTAL_GUARDIAN_TRADER_CRAB`

**Monster family:** `TRADER_CRAB`

**Provides:** one crystal

**Setup / child-facing scene:**
> Byttekrabben sitter foran en liten samling blanke ting. Midt i haugen ligger en [FARGE] krystall. Krabben løfter den opp, ser på dere og peker så nysgjerrig på sekken deres.

**Motive:** collector/trader, not a villain.

**Signal:** wants an interesting fair exchange or story, not necessarily a valuable item.

**Authored non-combat affordances:**
- propose a trade,
- tell the story of an object,
- show something odd,
- perform a small service,
- distract with another shiny object,
- negotiate/refuse and find another plan.

**Hard rule:** never require consumption of a unique story-critical resource from another branch.

**Combat:** possible only if the child deliberately turns the interaction hostile.

**Payoff:** krabben willingly hands over the crystal when satisfied or when the child finds another plausible resolution.

**Why it works:** uses an existing monster identity that already supports exchange and social play.

---

## GUARDIAN 3 - STEINGOLEMMEN SOM HOLDER VAKT

**id:** `CRYSTAL_GUARDIAN_GOLEM`

**Monster family:** `STONE_GOLEM`

**Provides:** one crystal

**Setup / child-facing scene:**
> En [FARGE] krystall sitter i en liten skål bak en tung steingolem. Hver gang noen nærmer seg skålen, flytter golemen seg rolig foran den igjen.

**Motive:** following an old instruction: protect the bowl until someone demonstrates they are there to repair/wake the crystal machine, not steal from the cave.

**Signal:** golem blocks, but does not attack first. Nearby marks repeat the same three colors as the machine sockets.

**Authored non-combat affordances:**
- show already-found crystal(s),
- copy/match the three-color symbol,
- explain/act out the intended repair,
- distract/move around it,
- use strength/tool/magic creatively,
- discover a simple old command through observation.

**Hard rule:** if this variant is selected before the main requirement reveal, its color-symbol clue may hint at a larger connection but must not expose hidden knowledge the child has not earned.

**Combat:** allowed if chosen, but not required and not presented as default.

**Fail-forward:** low-risk failed attempts reveal another piece of the golem's instruction or make its protective pattern clearer.

**Payoff:** golem deliberately steps aside or allows the crystal to be taken; this is a resolution, not necessarily a defeat.

**Why it works:** strong visual guardian, but its behavior has a reason and observable logic.

---

# Selection rules for this bank

For the first implementation experiment:
1. choose exactly one `SEARCH_SECRET`, one `NPC_FAVOR`, one `GUARDIAN`,
2. assign RØD/BLÅ/GUL deterministically by adventure seed,
3. do not repeat NPC or monster family within the three critical branches,
4. secondary NPC dependencies must be generated explicitly and reachable before the final gate,
5. generic UX5A hidden finds cannot satisfy them,
6. all critical search/dependency failure paths are fail-forward,
7. the child may solve any scene in an unlisted plausible way,
8. authored text must be adjusted if room/tone incompatibility would make it nonsensical.

# Editorial review questions
Before these become code/data, review each candidate against:
- Is the important thing visible or signalled before action?
- Can a five-year-old understand what is interesting here?
- Does the narrator know what the character/creature wants?
- Is there a concrete reason the crystal is here?
- Are non-combat ideas visible without becoming a closed answer list?
- Does failure reveal more rather than stall?
- Does the reward feel caused by what the child did?

These are candidate V1 modules. Manual playtest may reject or rewrite any of them even if the future schema validator accepts them.