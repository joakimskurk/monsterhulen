# Monsterhulen V2 – innholdsdata

Status: **UTKAST 1** (2026-10-28). Tekst og klassifisering er første forslag og må gås gjennom av eier.

Designet bak dataene: `docs/v2/SYSTEM_DESIGN_V2.md` §3 (matrisen).
Bakgrunn for klassifiseringen: `docs/v2/CONTENT_MATRIX_V2.md`.

## Filer

| Fil | Innhold |
|---|---|
| `vocabulary.json` | merker, ønsketyper, kildetyper, roller, kampnivå, soner |
| `figures.json` | alle vesener: monstre, folk, venner (én bank) |
| `obstacles.json` | feller og miljøhindre |
| `items.json` | ting som kan ligge i hulen + varige TING fra Helteboka |
| `sources.json` | steder i rom som gir et merke (brønn, ildsted …) |
| `recipes.json` | få kombinasjoner (A + B → C) |
| `missions.json` | klassikere: oppdrag med fast tema |
| `themes.json` | deler til sammensatte oppdrag (nytt tema for hver kode) |

Sjekk dataene med:

```bash
node tools/validate-content.mjs
```

## Bilder

Alle kort barnet kan se, har et `icon` (emoji nå, tegning senere): ting, figurer, hinder, kilder, oppskrifter (`output.icon`), merker (reserve for ting som lages, som «beholder med vann») og delene i `themes.json`. Validatoren krever det. Bakgrunn: `docs/v2/workshops/2026-10-28_ipad_for_ikke-lesere.md`.

## Grunnregel

Kort kobles **bare** gjennom merker i `vocabulary.json`. En figur som vil ha `MAT` passer med alle ting, kilder, selgere og venner som gir `MAT`. Ingen par skrives eksplisitt.

Merker med `"carry": false` (STILLHET, ROS, MOT, MORKE, SOVN) er handlinger barnet gjør. De trenger ingen kilde og løses lokalt.

## Figur

```json
{
  "id": "LAVAMONSTERET",
  "name": "Lavamonsteret",
  "origin": "new",
  "disposition": "hostile",
  "roles": ["blocker"],
  "combat": "strong",
  "wants":    [ { "type": "SORT", "tags": ["VARME"], "sign": "Monsteret gløder svakere og svakere og kryper mot alt som er varmt." } ],
  "weakness": [ { "tag": "VANN", "result": "blir til en stein du kan gå over", "sign": "Det freser når det drypper fra taket." } ],
  "gives":    { "opens": true, "rewards": [], "sells": [], "ability": [] },
  "intro": "En glødende klump står i gangen og bobler."
}
```

| Felt | Betydning |
|---|---|
| `origin` | `monster-review`, `people-review`, `friend-review`, `handoff` (zombie, skjelett, troll), `new` |
| `disposition` | `friendly` / `neutral` / `hostile` (i veien, ikke ond) |
| `roles` | `blocker`, `trader`, `quest`, `companion` |
| `combat` | `none`, `ok`, `strong` (kan bare vinnes med svakhet), `wants` (vil sloss eller konkurrere) |
| `wants[]` | `SORT` (`tags`), `BYTTE` (`accepts`), `MISTET` (`what`), `GJORE` (`task`, valgfri `needs`), `VITE` (`task`), `KAMP` (`task`). Alle har `sign` (påkrevd): det barnet ser som viser hva figuren vil. Det er første trinn i hjelpestigen. |
| `weakness[]` | `tag`, `result`, `sign` (tegnet barnet kan legge merke til, påkrevd) |
| `gives.opens` | figuren slipper deg forbi når den er fornøyd |
| `gives.rewards` | merker figuren kan gi som belønning |
| `gives.sells` | merker figuren kan ha på lager (handel) |
| `gives.ability` | merker figuren kan gi gjentatte ganger som venn |

## Hinder

```json
{ "id": "REGNBUENETTET", "name": "Regnbuenettet", "origin": "trap-review",
  "solvedBy": [ { "tag": "LYS", "sign": "Trådene blir gjennomsiktige i farget lys." } ],
  "intro": "Et klissete nett i alle regnbuens farger." }
```

## Ting

```json
{ "id": "BOTTE", "name": "Bøtte", "origin": "new", "tags": ["BEHOLDER"], "consumable": false }
```

- `consumable: true`: brukes opp når den gis eller brukes.
- `container: true`: kan fylles ved en kilde (se under).
- `persistent: true`: varig TING fra Helteboka. Legges ikke ut i hulen.

## Kilde

```json
{ "id": "BRONN", "name": "Brønn", "gives": "VANN", "requires": "BEHOLDER", "sign": "Vannet er langt nede. Det renner rett gjennom fingrene.", "zones": ["TÅKESUMPEN"] }
```

`requires: "BEHOLDER"` gir en fylt beholder («Bøtte med vann», merke `VANN`, brukes opp). `requires: null` gir merket direkte. Et annet merke (f.eks. `GRAVE`) må barnet ha for å bruke kilden. En kilde med `requires` må ha `sign`: det som viser at hendene ikke er nok.

## Oppskrift

```json
{ "id": "DUFTSPRAY", "inputs": ["TOM_FLASKE", "DUFTBLOMST"], "output": { "name": "Duftspray", "tags": ["DUFT"], "consumable": true },
  "hint": "En tom flaske og en blomst … kanskje de kan bli noe sammen?" }
```

`hint` er påkrevd og brukes som tegn for ingrediensene. Maks én oppskrift per løp.

## Oppdrag

Typene er `FINN`, `REDD`, `SAMLE`, `LEVER` og `KOM_UT`. Det finnes to slags oppdrag:

- **Sammensatte** (`NY_FINN`, `NY_REDD`, `NY_SAMLE`, `NY_LEVER`, `NY_KOM_UT`): tema settes sammen fra `themes.json` ut fra koden. Se under.
- **Klassikere** i `missions.json`: de fire fra V1 (med `legacyBlueprint`) og «Ut på andre siden». Fast tema.

| Felt | Betydning |
|---|---|
| `route` | valgfri: fire soner (start, bak hinder 1, bak hinder 2, bak hinder 3+). Uten `route` trekkes en rute fra koden. |
| `goal.name` | det som står i siste rom |
| `goal.lock` | FINN: `name` (døra) og `key` (nøkkelen) |
| `goal.calm` | REDD: merker som roer figuren. Ett velges per løp. |
| `goal.count`, `goal.pool` | SAMLE: så mange ulike merker trekkes fra listen |
| `goal.item` | LEVER: tingen som hentes i siste rom og bæres tilbake til inngangen |

Et nytt oppdrag trenger bare data. `npm run check` beviser det over 200 seeds per lengde, og `npm run sim:batch` over 1000.

## Tema (sammensatte oppdrag)

`themes.json` holder delene. Bakgrunn og avgjørelser: `docs/v2/workshops/2026-10-28_sammensatte_oppdrag.md`.

- **Alle ordformer skrives ferdig** (ubestemt, bestemt, genitiv). Koden setter bare stor forbokstav.
- **Temaet avhenger bare av oppdragstype og kode.** Det er likt på alle lengder, i alle forsøk og på begge skjermer.
- `routes`: rutene (fire soner) et løp kan få.
- `FINN`: `treasures`, `locks` (med `short`, `prep` `bak`/`i` og hvilke `openers` de tar), `keys` og `magic` (med `zones`, vektet ×3 når et sted i ruten passer), `rhymes` (tre rimende linjer) og `titles` per åpner. Kister (`prep: "i"`) står i målrommet.
- `REDD`: `creatures` med `pron` (den/det), `calm` og `problems` (`text`, valgfri `free`: det som får figuren løs før den kan roes). `calmSigns` gir tegnet per merke.
- `SAMLE`: `devices` med `titles`, `socket` (brukes i tegnet), `pool` og valgfri `part` (en bestemt del som mangler; da trengs én del og to merker).
- `LEVER`: `owners` (med hvilke `things` de kan eie), `things` (med `pron` den/det/dem) og `places` (med `where` og valgfri `guard`: det som trengs for å komme til tingen).
- `KOM_UT`: `exits` med `titles` og valgfri `need`: et merke (`tag`) eller en bestemt del (`part`), alltid med `sign`.
- Omtrent halvparten av delene skal ha et slikt behov (workshop A9).

Merkene i `vocabulary.json` har en ferdig `phrase` for løpende tekst i tegn («venter på å bli reparert»).

Validatoren sjekker at hver del har det den trenger.

## Kobling til `index.html`

Figurene i appen har egne `entityId`-er som ikke er kjent i repoet ennå. Når `index.html` er committet, legges `entityId` til på hvert kort, slik at bilder og eksisterende lagringer beholdes.
