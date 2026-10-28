# Flissett: steinvegger og gulv (fra originalen)

37 PNG-bilder på 32×32 piksler, hentet uendret ut av eierens original V0.12.3 (`docs/reference/original-v0.12.3/`, tileset-skriptet nederst i fila, `ROOT='assets/v3/map/'`). Der lå de innebygd som data-URI-er.

`tileset.json` viser hvilken fil som er hva:

- `floors`: 9 gulvvarianter. Hver rute får én, valgt fast ut fra posisjonen, og rotert.
- `wall`: vegg mot N, Ø, S og V. Brukes der ruten ikke har rom eller dør på den siden.
- `outer`: ytre hjørner, der to vegger møtes.
- `inner`: indre hjørner i rom som er større enn én rute.
- `connection`: dører per retning: `door_open`, `door_locked`, `passage_open` (åpning uten dør) og `route_blocked`.

Tegnes av `prototype/map-view.mjs` på samme måte som i originalen. Bildene er eierens og er ikke generert her, så de står ikke i `content/assets.json`.
