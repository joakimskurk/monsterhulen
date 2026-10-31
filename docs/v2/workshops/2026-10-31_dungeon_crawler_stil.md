# Workshop: iPaden skal se ut som en skikkelig dungeon crawler (2026-10-31)

**Status:** SIMULERT WORKSHOP, som de andre i denne mappen. Deltakerne er roller Claude har simulert, ikke ekte personer. Avgjørelsene er forslag til eieren og står i `DECISIONS.md`.

**Bakgrunn:** Eieren: «Vi må forbedre designet, så det ser ut som en skikkelig dungeon crawler.» I dag er iPad-siden flate, mørke bokser med systemskrift og et lite kart midt i et svart felt. Det virker, men ser ut som et skjema. Grafikken (figurer, ting, symboler) kommer senere og bestilles fra `content/assets.json`. Spørsmålet er hva som kan gjøres **nå**, med CSS alene, slik at det kjennes som et spill, og slik at grafikken som kommer senere passer inn.

## Deltakere (simulert)

| Rolle | Ser etter |
|---|---|
| **Eier og forteller** | At det kjennes som en hule og et eventyr, med en gang. |
| **Barnehagelærer** (5–7 år) | At det ikke blir skummelt, og at alt fortsatt er lett å lese og treffe. |
| **Spilldesigner** | De kjennetegnene som gjør at noe leses som «dungeon crawler». |
| **Systemutvikler** | At utseendet ligger for seg selv, ikke blander seg med oppsettet, og tåler at bildene kommer senere. |

## Økt 1: Hva er det som gjør at det ser ut som en dungeon crawler?

**Spilldesigner:** Fem ting, i rekkefølge etter hvor mye de betyr:

1. **Mørke og lys.** Hulen er mørk, og det er lys rundt spilleren. Tåka er fjell, ikke svart.
2. **Materialer.** Stein, tre, messing, lær og pergament, ikke flate farger. Panelene er steinheller med kant; kortene er pergament; knappene er tre; sekken er lær.
3. **Skrift.** Overskrifter og knapper i en eventyrskrift. Løpende tekst i vanlig, lesbar skrift.
4. **Kartet lever.** Rommet hun er i, er opplyst som av en fakkel. Rom hun har vært i, ligger i halvmørke. Ukjente rom er fjell.
5. **Varme.** Gull og rav som aksent, ikke lilla og cyan.

**Barnehagelærer:** Mørkt er greit, skummelt er ikke. Lyset må være varmt, som et bål, og alt hun skal trykke på må være like stort som nå. Det som skal leses, må stå på lys bakgrunn (pergament) med mørk skrift, eller lys skrift på mørkt, aldri gult på gult.

**Eier:** Og det skal passe med billedbokstilen i `art-style.json`, som er varm og myk.

**Spilldesigner:** Da er det ikke «Diablo», det er «koselig hule»: gouache-stein, varmt fakkellys, treknapper med litt glans. Ingen hodeskaller, ingen blod, ingen kalde blå skygger.

> **Avgjørelse S1:** Hulen er **varm og mørk, ikke skummel**: stein, tre, messing, lær og pergament, med gull og rav som aksent. Fakkellys er varmt (rav), aldri hvitt eller blått.

## Økt 2: Hva gjøres nå, med CSS

**Systemutvikler:** Alt dette kan gjøres med CSS, uten et eneste bilde:

- Stein og fjell: en tekstur generert i SVG (`feTurbulence`), som en data-URI. Ingen fil å laste.
- Fakkellys: en radiell gradient over rommet hun står i, lagt oppå kartet og blandet med lyset.
- Steinheller, pergament, lær og tre: gradienter, kanter og skygger.
- Skrift: en nettskrift til overskrifter og knapper, med vanlig serif som reserve hvis iPaden er uten nett.

Utseendet legges i en egen fil, `prototype/dungeon.css`, etter `child.css`. `child.css` eier oppsettet (hva som står hvor, hvor stort), `dungeon.css` eier bare utseendet. Da kan det byttes ut når grafikken kommer, uten å røre oppsettet. Kartets tåke og fakkellys ligger i `map-view.mjs`, som tegner kartet for både Forteller og iPaden.

**Barnehagelærer:** Og skriften?

**Spilldesigner:** «MedievalSharp» er en eventyrskrift som fortsatt er lett å lese, også for den som så vidt leser. Bare til overskrifter og knapper. Tekst hun eller den voksne skal lese, står i systemskriften som før.

> **Avgjørelse S2:** Utseendet ligger i `prototype/dungeon.css` (iPaden) og i kartstilen i `map-view.mjs`. Oppsettet i `child.css` er uendret. Eventyrskriften «MedievalSharp» brukes til overskrifter og knapper, lastet fra Google Fonts, med serif som reserve uten nett. Løpende tekst beholder systemskriften.

## Økt 3: Kartet

**Spilldesigner:** Tåka er det viktigste. I dag er den svart. Den skal være fjell: mørk, grov stein, så hulen kjennes som noe hun graver seg inn i. Rommet hun står i, får et varmt lysskjær som også lyser litt ut i fjellet rundt. Rom hun har vært i, er mørkere og varmere i fargen (steinen i originalens fliser er blågrå; et lett sepia-filter gjør den til hulestein).

**Systemutvikler:** «?» og 🔒 bak dørene beholdes som de er: gule lapper. De er målene hun trykker på, og de må lyse opp.

**Barnehagelærer:** Og rammen rundt rommet hun kan gå til, er cyan i dag. Det er kaldt. En lys, varm kant er nok.

> **Avgjørelse S3:** Tåka på kartet er fjell (steintekstur), ikke svart. Rommet hun står i, lyses opp som av en fakkel, med et varmt skjær som når litt ut i fjellet. Rom hun har vært i, ligger i halvmørke. Rammen rundt rom hun kan gå til, er varm, ikke cyan. «?» og 🔒 er som før.

## Økt 4: Grafikken som kommer senere

**Eier:** Alt som skal genereres, skal ha en post i `assets.json`.

**Systemutvikler:** Ja. Det som nå er CSS, og som kan bli bilder senere, får hver sin `ui:`-post: steinrammen rundt panelene, pergamentkortet, fjellteksturen, lærreima til sekken, treknappen og fakkelskjæret. Alle er «placeholder». Når et bilde er laget og godkjent, byttes CSS-en ut med det, bit for bit.

> **Avgjørelse S4:** Seks nye `ui:`-poster i `content/assets.json`: `ui:frame-stone`, `ui:parchment`, `ui:rock`, `ui:leather`, `ui:button-wood` og `ui:torch`. CSS er plassholderen til bildene finnes.

## Etter workshopen

`prototype/dungeon.css` er laget, kartstilen i `map-view.mjs` er endret, og `child.html` laster skriften og den nye stilen. Forteller-siden har samme kart (fjell og fakkellys) men ellers samme utseende som før; den er et verktøy for den voksne. `npm run check` er grønn.
