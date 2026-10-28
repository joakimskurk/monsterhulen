# MONSTERHULEN - DECISIONS

Only durable decisions that would be costly or confusing to lose belong here.

Canonical V2 design: `docs/v2/SYSTEM_DESIGN_V2.md`. Content matrix draft: `docs/v2/CONTENT_MATRIX_V2.md`. Background analysis: `docs/reviews/2026-10-27_*`.

## 2026-10-28 - When she is stuck, the iPad nudges and the DM gets the answer

Owner's run NY_KOM_UT-VANLIG-6747 («Ønskebrønnen»): the chain began with a troll coin hidden in Kjeksgrotta. Sovesoppen wants music, from the friend Skjelettmusikeren. He needs gold thread, traded from Dvergsmeden, who wants the coin. Nothing on the iPad said to look there, so three figures asked for things and the way on looked locked.

- **Stuck** (`prototype/stuck.mjs`): she has been in every room she can reach, and nothing on the iPad can be used. That means nothing to take, no source, nothing in the backpack or a friend that fits anyone, and nothing to make.
- **When something is hidden,** the iPad shows «Kanskje noe er gjemt et sted? Se deg rundt med lupa i rommene med 🔍». The map already shows which rooms those are, so the nudge gives away nothing. The DM's request area gets «⚠ Barnet står fast. Trollmynt er gjemt i KJEKSGROTTA (rom 5)». When a task is left, the iPad names the task.
- **The deep round is realistic now.** The automaton no longer searches every room by habit. It only looks around when nudged, in the rooms with 🔍, and the nudge must always lead on. This happened 597 times in 750 runs, which shows how often a child could have been stuck before.

## 2026-10-28 - No false leads: everything that asks can be answered from the iPad

Owner's playtest «Ønskebrønnen»: three figures each asked for a thing, the things were out of reach behind a figure, and the only way on was to override the game. «Vi er altså ennå ikke i boks med bulletproof oppsett.»

The checks so far trusted two things a child at the table cannot see, so they did not catch this:

- **Wandering figures asked for things that were not in the run.** This happened in 315 of 750 runs. On the iPad they look like any other figure, with GI and a figure symbol. Now a wandering figure is only placed where something it asks for can be had in the run, from a room it can reach. Otherwise it asks for a task. Figures looking for one lost thing never wander.
- **Some things could only be had by doing a task** (act it out with the DM). This happened in 243 runs. The task was only on the DM page, so the way on looked impossible. Now the figure's card on the iPad shows «OPPGAVE: …» and «✋ GJORT!». The DM gets «Hun sier hun har klart oppgaven …» with «Ja, det stemmer», and the figure gives what it gives.
- **The deep round is strict now.** The automaton may only ask the DM to say yes to a task the iPad showed her. Anything else the DM would have to do fails the test. The matrix test checks that every wandering figure asks for something that can be had where it stands, or shows a task: 754 wandering figures.

## 2026-10-28 - ✓ when she is done looking, and no lost taps on the magnifier

The owner sometimes had to press «se deg rundt» twice before the room got its ✓.

- **✓ means she is done looking:** at once in a room with nothing hidden, or when what was hidden is found. After a low roll the game says «noe er gjemt her, prøv igjen». The map used to show ✓ anyway, so the two contradicted each other. Now the 🔍 stays until she has found it. The DM's own buttons follow the same rule. This is tested in `tests/v2/dice.test.mjs`.
- **A tap on the magnifier while the iPad waits** for an answer is no longer dropped. It is sent as soon as the answer comes. Before, a tap right after another one did nothing, and she had to tap again.

## 2026-10-28 - Walking far: tap a room, and the avatar walks the way

Owner: tapping through every room is clumsy when the way is long. «Kanskje vi kan trykke på rom langt vekk, og avataren vår vandrer da veien … Da skjer det noe visuelt samtidig som DM har tid til å forberede seg på neste replikk.»

- **Tapping a room she has been in** finds the shortest way through what her map shows: rooms she has been in, and doors that are not locked. It never uses a secret door, an unknown room or the fog. This is `walkPath` in `map-view.mjs`, tested in `tests/v2/walk.test.mjs`: 595 walks, always the shortest, never through a locked door or an unknown room.
- **The avatar walks it room by room.** The star glides out to the door and into the next room, about 0.75 s for each room.
- **Every step is an ordinary MOVE.** The DM page takes it by itself through an open door, and the DM sees each room in the log. If a step is refused, the walk stops.
- **Unknown rooms** are still entered one at a time, through «?» next to the room she is in.

## 2026-10-28 - Every story starts with someone who asks, and ends with their thanks

Two playtests from the owner pointed the same way.

- «Den tomme heksegryta»: the goal was the room *behind* the cauldron, which felt like an anticlimax. There should be a witch at the start who has lost her cauldron and needs help to finish the brew, «så har vi hele veien ett mål».
- «Fløyta som ble borte»: the DM's text said a little ghost waits in the first room, but the child could not see it.

Decisions, applied to all mission types where the story has someone at the start:

- **The quest giver** (`run.giver`) stands in the entrance room on both screens and says what is wrong in their own words. On the child's map, their picture marks the entrance. On the DM page there is a card to read aloud, with the ending.
  - Få noe i gang: the one who owns the device (ten givers in `themes.json`).
  - Lever noe hjem: the owner.
  - Redd noen: the mother.
  - Heksekatten: the witch.
  - Finn skatten and Kom deg ut have no one at the start, so no giver.
  - Tested: anyone the DM's text says «venter ved inngangen» is on the child's screen.
- **Få noe i gang:** the device stands in the innermost room and *is* the goal. When it works, its magic happens, for example «Gryta bobler og glitrer …», and the run ends. There is no room behind it. The cave has one gate fewer, because the device is the last challenge, so there is the same amount to do as before.
- **The ending** is the quest giver's thanks (`mission.payoff`), on the end screen after «Du …!».
- **Found in the deep round on the way:** a thing planned for one socket (a torch for warmth) took another socket it also fitted (light). The thing planned for that socket then had nowhere to go. A thing now goes to the need it was planned for first.
- **Packing before the run** has «BEGYNN EVENTYRET», so she can go without bringing anything. The layer had no way out.

## 2026-10-28 - The matrix: every solution must make sense to a five-year-old

Owner's playtest: the crocodile's toothache was solved with a feather, because both were tagged «noe mykt». The simulated workshop is `docs/v2/workshops/2026-10-28_matrisen.md`.

- **M1, the test for every pair:** if the DM says the sign, would a five-year-old see why this thing helps?
- **M2, the fix:**
  - Things only keep the tags they plainly have. Feather: laughter only. Brass button: metal only. Honey cookie and cheese: food only. Glass ball: glitter only. There are also fewer tags on the repair kit, berry pancake, wind chime and little shelter.
  - The crocodile now wants something cold for its swollen cheek, and the mole's sign says it needs something that makes a sound.
  - Pairs that have the right tag but make no sense for one figure are blocked on its card with `rejects` and a reason. Examples: a cat eats no fruit, a bridge is fastened with rope and not a ladder, and a string is fixed with thread and not a hammer.
  - A new thing, Ullnøste (soft), keeps «noe mykt» from having a single answer.
- **M3, how it holds:** one rule in `tools/lib/fits.mjs` is used by the generator, the playthrough automaton, the table rules and the DM overview.
  - `validate-content` checks that every reject names a wanted tag, gives a reason and leaves at least one way to solve it.
  - The matrix test checks that no planned solution is rejected.
  - `npm run matrix` writes the whole matrix with signs to `docs/v2/MATRISE.md` for the owner to read through: 382 pairs.

## 2026-10-28 - The iPad without direction buttons, with room symbols and a big backpack

The owner decided this (E1–E3). How it is done comes from the simulated workshop `docs/v2/workshops/2026-10-28_ipad_kart_og_romsymboler.md`:

- **K1:** No direction buttons. She walks by tapping the room on the map (the whole room, or «?» in the fog), and the map gets the space. «SE DEG RUNDT» is a big round magnifier button 🔍.
- **K2:** Rooms she has been in get at most two symbols: the figure's own picture (someone needs something), ✨ (something to take), and always 🔍 (not looked around yet) or ✓ (looked around), in the middle of the room together with the player's star. They are built only from what she sees there, so nothing hidden shows. This is tested in the leak test. `state.looked` remembers where she has used the magnifier.
- **K3:** The found popup shows the thing big, with a backpack of the same size beside it. Dropped on the backpack, or with the backpack tapped, the thing flies in a small arc up over the backpack, in front of it, then drops into the opening at the top. From there it is behind the front of the backpack, and it shrinks as it goes (owner). The backpack hops, and the popup closes.
- **Hold and drag from the backpack** (owner: «trykk – mer info, hold og dra for å dra en til mottakere»). This is the main way to use something:
  - **Tap** a thing or friend: it is shown big, with «Hold og dra meg til noen som kan bruke meg».
  - **Hold or drag:** the thing follows her finger. The figures and sources in the room that can take it get a dashed yellow frame, and the rest fade. Dropping it on one is the same request as before, and it shrinks into the figure. Dropped elsewhere, it flies back.
  - Friends are dragged to figures the same way.
  - The old buttons are now one small **GI** fallback, with things and friends in one list. **FYLL NOE** stays on sources.
  - While the iPad waits for the DM, a tap still shows the thing, but nothing can be given.
  - Where things are placed on the screen is not settled (owner); this works with the current layout.
- **Pictures:** every new symbol has its own entry in `content/assets.json` (`ui:backpack`, `ui:magnifier`, `ui:player`, `ui:room-thing`, `ui:room-look`, `ui:room-looked`), with emoji as placeholders until the pictures come.

## 2026-10-28 - The iPad plays in landscape, on one screen, like an app

Owner: «horisontal modus på ipad … tilgjengelig som om det var en app. INGEN scrolling.»

- **Layout** (`child.html` / `child.css`):
  - The map is on the left, as large as the height allows. The room is on the right: title, what just happened, what is here, and the direction pad. The backpack and friends run along the bottom.
  - Packing before the run, the end of the run and the hero book (behind a 📖 button) open on top as layers.
  - Sizes follow the screen height (`--u`), so a small iPad gets smaller text, never a scrollbar.
  - Checked at 1180 × 740 (iPad Air with Safari's bars) and 1024 × 660, with three things in the room and eight in the backpack. A thing's name and buttons share one row, and its text is cut to two lines, or one line when there are three or more things.
- **Like an app:**
  - A web app manifest (`manifest.webmanifest`, fullscreen, landscape) and Apple's home-screen meta tags. Added from Safari's share menu («Legg til på Hjem-skjerm»), it opens without the browser bars.
  - The last code is remembered, so the home-screen app reconnects by itself. If nobody answers on the old code within 6 seconds, the code field comes back.
  - No zooming, no text selection, no rubber-band scroll.
- **Upright:** a touch screen held upright shows «SNU IPADEN».
- **Second person:** everything the child can read says «du», for example «Du ser deg rundt, men finner ingenting» (owner). The DM's own cards still say «hun».

## 2026-10-28 - The child's screen is always dark

On a real iPad in light mode the child's page turned white with black text, because the colours followed the device setting. The Mac in dark mode had hidden this. `child.css` now sets the dark cave colours whatever the device says (`color-scheme: dark`, plus the `color-scheme` and `theme-color` meta tags). The DM page still follows the Mac.

## 2026-10-28 - The treasure is a thing, and nobody in the cave wants what it is

The owner's playtest of «Finn skatten» nearly reached the end and then stalled. The music box looked like a figure asking for something, and the skeleton dancer wanted music, so the natural move was to give it the music box.

- The treasure is never shown as a figure. Behind a door it lies there with TA, and the child takes it herself («Du fant spilledåsen! 🎉»). In a chest, the card is the chest («Gullkista: Kista er låst. Inni ligger …»), and she gives the key to the chest.
- Each treasure in `content/themes.json` has `tags`, meaning what it plainly is (the music box is MUSIKK, the crystal heart is LYS, and so on). A run where any figure, door or ambient figure wants one of those is regenerated, and a door that opens for that same kind is never picked. This is tested in `tests/v2/table-play.test.mjs`.
- **The matrix check** (owner: «Sjekk matrisen om det er flere slike feil»). The same trap was everywhere. In 30–60 % of runs, depending on the mission, a planned thing also obviously fitted another figure, for example the brass button meant for the dwarf smith also fitting the empty armour. Giving it there used it up and left the child stuck. Rule: a thing that is still planned for someone else, with no spare in the backpack, is **lent and given back** («Rustningen får låne messingknapp og gir den tilbake»). The wrong figure is still helped, because the child's guess was a good one and is rewarded, and the planned one can still get it. The same holds for wandering figures when the DM says yes. Checked in `tests/v2/matrix.test.mjs` across every mission, length and 25 codes.
- **Sources are on the child's screen** (owner's playtest, «Isnøkkelen og tryllestaven»). A well, a meadow or another source was shown only to the DM, so the child stood with an empty glass and found no water anywhere. Now a source shows in its room. With FYLL NOE she gives the container, which needs no DM when it fits, and gets the filled thing back («beholder med vann»). The container goes into it. A source that needs nothing has HENT. The matrix test now also checks that everything with a room is on her screen when she is there (hidden things are found by searching), and that every source can be filled from the iPad.
- **The deep round** (owner: «La oss ta en dyp runde»). This is a new automaton, `tests/v2/child-play.test.mjs`, that plays all 750 runs using only what the iPad shows and offers. It found three more places where the child had to wait for the DM. They are now hers:
  - KOM FRAM 🎉 at the way out (255 times);
  - TA on the thing to deliver (111);
  - ✨ LAG … next to the backpack when every part of a recipe is in it (158). It shows only then, so nothing is given away early.

  The only DM steps left are tasks to act out, which are DM work by design. Every run finishes.
