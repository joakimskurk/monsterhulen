# MONSTERHULEN - DECISIONS

Only durable decisions that would be costly or confusing to lose belong here.

Canonical V2 design: `docs/v2/SYSTEM_DESIGN_V2.md`. Content matrix draft: `docs/v2/CONTENT_MATRIX_V2.md`. Background analysis: `docs/reviews/2026-10-27_*`.

## 2026-10-28 - The treasure is a thing, and nobody in the cave wants what it is

The owner's playtest of «Finn skatten» nearly reached the end and then stalled. The music box looked like a figure asking for something, and the skeleton dancer wanted music, so the natural move was to give it the music box.

- The treasure is never shown as a figure. Behind a door it lies there with TA, and the child takes it herself («Du fant spilledåsen! 🎉»). In a chest, the card is the chest («Gullkista: Kista er låst. Inni ligger …»), and she gives the key to the chest.
- Each treasure in `content/themes.json` has `tags`, meaning what it plainly is (the music box is MUSIKK, the crystal heart is LYS, and so on). A run where any figure, door or ambient figure wants one of those is regenerated, and a door that opens for that same kind is never picked. This is tested in `tests/v2/table-play.test.mjs`.
- **The matrix check** (owner: «Sjekk matrisen om det er flere slike feil»). The same trap was everywhere. In 30–60 % of runs, depending on the mission, a planned thing also obviously fitted another figure, for example the brass button meant for the dwarf smith also fitting the empty armour. Giving it there used it up and left the child stuck. Rule: a thing that is still planned for someone else, with no spare in the backpack, is **lent and given back** («Rustningen får låne messingknapp og gir den tilbake»). The wrong figure is still helped, because the child's guess was a good one and is rewarded, and the planned one can still get it. The same holds for wandering figures when the DM says yes. Checked in `tests/v2/matrix.test.mjs` across every mission, length and 25 codes.
