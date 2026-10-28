# MONSTERHULEN - DECISIONS

Only durable decisions that would be costly or confusing to lose belong here.

Canonical V2 design: `docs/v2/SYSTEM_DESIGN_V2.md`. Content matrix draft: `docs/v2/CONTENT_MATRIX_V2.md`. Background analysis: `docs/reviews/2026-10-27_*`.

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
