# Monsterhulen V2 – innholdsmatrise

Status: **UTKAST 1 – må justeres mot dataene i `index.html` og av eier**
Dato: 2026-10-27
Vokabular og korttyper: `docs/v2/SYSTEM_DESIGN_V2.md` §3.

**Kilder:** gjennomgangene på `narrative/story-graph-v1-prep` (MONSTER, PEOPLE, FRIEND, TRAP, MYSTERY, TREASURE, `CONTENT_REVIEW_HANDOFF`) og `THING_SPEC.md`. Selve teksten og `itemHooks` per figur ligger i `index.html`, som ennå ikke er i repoet.

**Forkortelser**

- **Holdning:** V = vennlig, N = nøytral, F = fiendtlig. Fiendtlig betyr i hinderet, ikke ond.
- **Kan:** SP = kan sperre en kant, SE = selger/bytter, OPP = gir oppdrag, VE = kan bli venn/følge, KA = kamp mulig, KA! = vil sloss.

Kolonnene «vil ha» og «svakhet» er et første forslag. Der gjennomgangen ikke sier noe om svakhet, er feltet tomt eller markert med `?`.

---

## 1. Figurer (én felles bank)

### 1.1 Fra MONSTER-banken (40, 20 familier)

| Figur | H | Vil ha | Svakhet / løses av | Gir | Kan |
|---|---|---|---|---|---|
| Den levende rustningen | F | riktig tegn/bevis (VITE) | – | vei | SP, KA |
| Den tomme rustningen | N | REPARASJON, puss (MYK) | – | ting den vokter | VE |
| Krystallslimet | N | LYS, GLITTER | LYS (følger det bort) | det den har i seg | SP |
| Gjørmeslimet | N | ? | VANN (vaskes ut)? | ren vei | SP |
| Den lille vampyren | N | MOT, LYS (redd) | – | blir venn, følger | VE |
| Tårnvampyren | N | hjelp med kappa (HØYDE, REPARASJON) | – | gave | |
| Prompemonsteret | N | MAT uten bønner | DUFT, LUFT | trygt rom, venn (LATTER) | SP, VE |
| Bobleprømperen | V | LUFT, trekk | – | evne: LUFT | VE |
| Beinhunden | V | noe å kaste | – | evne: HENTE | VE |
| Knokkelhunden | N | sporet (DUFT) | – | evne: SPORE (finne gjemt) | VE, OPP |
| Fnisespøkelset | N | LATTER | – | gave/hint | |
| Tåkespøkelset | N | STILLHET | LYS? (tåka letter) | vei synlig | SP |
| Den kjøttetende planten | F | MAT | – | vei | SP |
| Solslukeren | N | LYS | MØRKE (lukker seg) | vei | SP |
| Den sultne krokodillen | F | MAT | – | vei over vann | SP, KA |
| Krokodillen med tannpine | N | hjelp (REPARASJON, MYK) | – | bærer deg over vann | SP, VE |
| Kjempeedderkoppen | N | GLITTER (bytte) | ILD? | ting fra nettet | SP, SE, KA |
| Sølvveveren | N | fullføre mønster (VITE) | – | TAU/tråd | OPP |
| Kistemonsteret | N | tyggbare småting | – | **MYNT** | SE, KA |
| Den søvnige kista | N | SØVN, STILLHET | MUSIKK (vekker) | det den ligger på | SP |
| Steingolemen | F | glemt passord (VITE) | – | vei | SP, KA |
| Mosegolemen | V | VANN til mosen | – | vei, venn | SP, VE |
| Surmulesoppen | N | ROS | – | gave | |
| Sporsoppen | N | sortere mønster (VITE) | – | hint | |
| Lysslukeren | N | LYS (varmt) | – | det den holder | SP |
| Glimtmøllen | V | samle lysprikker | – | LYS-ting | OPP |
| Byttekrabben | N | bytte (rare småting) | – | det du trenger | **SE** |
| Samlerkrabben | N | én mistet skatt | – | ting/hint | OPP |
| Ildsalamanderen | N | VARME (annen varm plass) | VANN, KULDE | flytter seg; VARME-ting | SP |
| Glødesalamanderen | V | VARME til steinene | – | evne: VARME | VE |
| Sovesoppen | N | SØVN | MUSIKK (vekker) | flytter seg | SP |
| Gjespesoppen | N | MØRKE, STILLHET | – | trygt rom | |
| Takgargoilen | N | forklaring (VITE) | – | hint, vei | SP |
| Regngargoilen | N | LY | – | venn, hint | VE |
| Pannekakezombien | N | MAT (bytte) | – | ting, flytter seg | SP, SE |
| Den bortkomne zombien | V | følge den hjem | – | venn, gave | OPP, VE |
| Skjelettdanseren | N | MUSIKK | – | rytme, flytter seg | SP |
| Skjelettvakten | F | bevis/tillatelse **eller KAMP** | – | vei | SP, **KA!** |
| Sumptrollet | F | MAT | – | vei over sumpen | SP |
| Brotrollet | F | GLITTER (varierer) | – | vei over broa | SP, SE |

### 1.2 Fra PEOPLE-banken (12 NPC-er, ikke helter)

| Figur | H | Vil ha | Gir | Kan |
|---|---|---|---|---|
| Lanternevakten | V | hjelp med lykta (HØYDE, GRIPE) | **åpner port** | SP, OPP |
| Froskekongen | N | MYK (polstring til krona) | tillatelse, gave | |
| Dvergsmeden | V | mistet fjær (METALL) | **verktøy, nøkkel, REPARASJON** | OPP, SE |
| Revehandleren | N | ting med HISTORIE, GLITTER | **det kjeden trenger** | **SE** |
| Alvekartografen | V | landemerke (VITE) | kart (viser rom) | OPP |
| Muldvarpgraveren | V | finne trygg søm (MUSIKK/lyd) | **viser hemmelig gang** | OPP |
| Uglebibliotekaren | V | bok/side (HØYDE, GRIPE) | hint, ting | OPP |
| Goblinkokken | N | hjelp med gryta | **MAT, DUFT** | OPP, SE |
| Sneglebudet | V | LY, eskorte | melding, kart | OPP |
| Beverbyggmesteren | V | materialer (TAU, tre) | **bygger bro** | OPP |
| Den gamle heksa | N | mønster i gryta (VITE) | magisk ting (KULDE? LYS?) | OPP, SE |
| Kråkeforskeren | N | finne avviket (VITE) | GLITTER, hint | OPP |

### 1.3 Fra FRIEND-banken (6)

| Figur | Vil ha (for å bli med) | Evne som venn |
|---|---|---|
| Den svarte katten | at du legger merke til ting | finner åpninger/hemmeligheter |
| Skjelettmusikeren | GULLTRÅD / streng | **MUSIKK** |
| Soppprinsen | landemerker | viser vei |
| Bokbillen | forstå speilsymbol (lommespeil) | leser tegn |
| Sekkegrevlingen | hjelp med å pakke | **bærer ekstra (+2 plasser i sekken)** |
| Papirfuglen | myk landing (MYK, LY) | bærer beskjeder |

---

## 2. Hindre (fra TRAP-banken)

| Hinder | Tilstand | Løses av | Tegn (utkast) |
|---|---|---|---|
| Det kilende gulvet | KILER | MYK, krype, LATTER | «fjær ligger strødd langs kanten» |
| Beinfellen | USTØ | TAU, REPARASJON, støtte | «ett bein holder resten oppe» |
| Bobleporten | ELASTISK | STILLHET | «boblene stopper når ingen rører seg» |
| Skyggegulvet | MØRKT | **LYS** | «skyggene trekker seg fra lykta» |
| Den sovende trappa | SOVER | STILLHET, MUSIKK | «trinnene snorker i takt» |
| Regnbuenettet | KLISTRER | LYS i riktig farge | «trådene blir gjennomsiktige i farget lys» |

---

## 3. Ting

### 3.1 Valgfrie skatter (8)

| Ting | Merker | Brukes opp |
|---|---|---|
| Rød fjær | LUFT, MYK, LATTER | nei |
| Spøkelsesglass | finner spøkelser | nei |
| Trollmynt | MYNT, METALL | ved handel |
| Honningkjeks | **MAT**, DUFT | ja |
| Glasskule | **GLITTER**, LYS (linse) | nei |
| Gulltråd | REPARASJON, GLITTER | ja |
| Båten i flaska | HISTORIE | ved handel |
| Messingknapp | METALL, REPARASJON, MYNT-aktig | ved handel |

### 3.2 Varige TING i Helteboka (12)

| TING | Merker |
|---|---|
| Foldespaden | GRAVE |
| Tauet som aldri floker seg | TAU/HØYDE |
| Lommespeilet | LYS (refleks) |
| Bobleflaska | **BEHOLDER** (liten) |
| Lommeparaplyen | LY |
| Stjernekikkerten | se langt |
| Krittetuiet | merke, farge |
| Gripekloa | GRIPE |
| Magnetsteinen | METALL |
| Foldestigen | TAU/HØYDE |
| Lappesettet | REPARASJON, MYK |
| Opptrekksmusa | lokke, distrahere |

---

## 4. Kilder (nye, foreslått, knyttet til soner)

| Kilde | Gir | Krever | Soner (forslag) |
|---|---|---|---|
| Brønn / bekk / dryppstein | VANN | BEHOLDER | Tåkesumpen, Regnbuedalen, Krystallgrotten |
| Ildsted / glohaug | ILD, VARME | BEHOLDER (glo) eller ingenting (varme seg) | Heksetårnet, Zombieslottet |
| Iskald vegg / snøhjørne | KULDE | BEHOLDER | Krystallgrotten, Skyggegangene |
| Blomstereng / urtebed | DUFT, MAT (bær) | – | Soppskogen, Lanternehagen |
| Vindsprekk | LUFT | GRAVE (åpne den) | Klokketårnet, Måneskogen |
| Lysende sopp / krystaller | LYS | BEHOLDER | Soppskogen, Krystallgrotten |
| Fruktbusk / sopphage | MAT | – | Soppskogen, Måneskogen |

---

## 5. Oppskrifter (få, med vilje)

| Inn | Ut |
|---|---|
| BEHOLDER + kilde | beholder med merket (bøtte med VANN, krukke med LYS) |
| tom flaske + duftblomst | duftspray (DUFT) |
| tau + krok/gripeklo | klatresett (HØYDE+GRIPE) |
| fjær + tråd | fjærvifte (LUFT) |

---

## 6. Dekning og hull

| Merke | Vil ha / svak mot | Gis av i dag | Behov |
|---|---|---|---|
| MAT | ~7 | Honningkjeks, Goblinkokken | **+5 matting** (bær, brød, pannekake, ost, gulrot) |
| VANN | 3–4 | ingen | **bøtte, vannflaske, kilder, vannvenn** |
| ILD/VARME | 3 | ingen | **fakkel, glo-krukke, varmestein** |
| KULDE | 1–2 | ingen | **iskrystall, snøball** |
| LYS | ~6 | speil, glasskule | **lykt, lysstav, lysende sopp** |
| MUSIKK | 3–4 | Skjelettmusikeren | **fløyte, bjelle, tromme** |
| DUFT | 1–2 | Honningkjeks | **duftspray, blomst, urter** |
| LUFT | 2–3 | Rød fjær | **vifte, blåsebelg** |
| GLITTER | ~5 | Glasskule, Gulltråd | +2 (perle, sølvskje) |
| BEHOLDER | (oppskrifter) | Bobleflaska | **bøtte, krukke, tom flaske** |
| MYNT | selgere | Trollmynt, Kistemonsteret | + myntpung som funn |

## 7. Nytt innhold som trengs for at matrisen skal virke

- **Figurer med svakhet** (dagens bank er sterk på «vil ha», svak på «svakhet»): Lavamonsteret (VANN/KULDE), Isvetten (ILD/VARME), Skyggetrollet (LYS), Stinkmonsteret = Prompemonsteret (DUFT/LUFT), Støvstormen (VANN).
- **Vennlige figurer med evner** (vannsprut, lys, varme, musikk, bære, grave): Vannsprutfrosken, Lysbillen, Glødesalamanderen (finnes), Skjelettmusikeren (finnes), Muldvarpen (GRAVE).
- **Figurer som *vil* sloss eller konkurrere (KA!):** Bryte-troll, Kappløps-hare, Stirre-ugle. Konkurranse kan alltid erstatte kamp.
- **Kjæledyr:** bekreftes som egen type eller som venner (åpent spørsmål).
- **Ting:** se tabell §6. Rundt 25–30 nye enkle ting gir god dekning.

## 8. Mysterier (6) og puzzles (36)

- **Mysteriene** (`DEN HVISKENDE VEGGEN` m.fl.) er stemning med improvisasjon. I V2 kan de få et VITE-ønske og gi et hint om kjeden («veggen hvisker hvor brønnen er»). Da blir de en alternativ informasjonskilde.
- **De 36 puzzlemalene** er ikke gjennomgått. De er naturlige som innhold i VITE-ønsker (passord, mønster, landemerke). Gjennomgang trengs.

## 9. Ikke gjennomgått

- heltetyper, egenskaper og startutstyr (`HulerCharacterSystem` i `index.html`),
- nøkkel-, mål-, del- og alterkataloger,
- de 36 puzzlemalene.
