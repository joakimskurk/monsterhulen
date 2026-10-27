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
| `missions.json` | oppdragskort (mål for et løp) |

Sjekk dataene med:

```bash
node tools/validate-content.mjs
```

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
  "wants":    [ { "type": "SORT", "tags": ["VARME"] } ],
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
| `wants[]` | `SORT` (`tags`), `BYTTE` (`accepts`), `MISTET` (`what`), `GJORE` (`task`, valgfri `needs`), `VITE` (`task`), `KAMP` (`task`) |
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
{ "id": "BRONN", "name": "Brønn", "gives": "VANN", "requires": "BEHOLDER", "zones": ["TÅKESUMPEN"] }
```

`requires: "BEHOLDER"` gir en fylt beholder («Bøtte med vann», merke `VANN`, brukes opp). `requires: null` gir merket direkte. Et annet merke (f.eks. `GRAVE`) må barnet ha for å bruke kilden.

## Oppskrift

```json
{ "id": "DUFTSPRAY", "inputs": ["TOM_FLASKE", "DUFTBLOMST"], "output": { "name": "Duftspray", "tags": ["DUFT"], "consumable": true } }
```

## Oppdrag

Se `missions.json`. Typene er `FINN`, `REDD`, `SAMLE`, `LEVER` og `KOM_UT`. Dagens fire eventyr er tema på disse.

## Kobling til `index.html`

Figurene i appen har egne `entityId`-er som ikke er kjent i repoet ennå. Når `index.html` er committet, legges `entityId` til på hvert kort, slik at bilder og eksisterende lagringer beholdes.
