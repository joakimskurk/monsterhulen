# Monsterhulen: innholdsinventar, vil-ha/gir-matrise og rekkefølge

Dato: 2026-10-27 · Bygger på samtalen om en generativ «alt-passer-sammen»-modell.

**Kilder:**
- Gjennomgangsdokumentene på `narrative/story-graph-v1-prep`:
  - MONSTER, PEOPLE, FRIEND, TRAP, MYSTERY, TREASURE,
  - `CONTENT_REVIEW_HANDOFF` (zombie, skjelett, troll),
  - `THING_SPEC.md`.
- Patcher og tester på aktiv branch.

**Forbehold:** Selve innholdsdataene (tekst, `want`, `itemHooks` per figur) ligger i `index.html`, som ikke finnes i repoet. Klassifiseringen under bygger på hvordan gjennomgangene beskriver hver figur. Det er et **første utkast** som må justeres mot dataene og mot hva du ser for deg.

---

## Del 1 – Rekkefølge: hvordan vi garanterer at det aldri blir feil

### 1.1 Hvorfor det har gått galt

Slik generatoren virker i dag *(CONFIRMED fra patchene)*:

1. Kartet lages først (`generateDungeon`).
2. Generatoren velger selv gate-kant, nøkkelrom og målrom (`d.lockConnectionId`, `d.keyRoomId`, `d.goalRoomId`).
3. Historiens ting plasseres i «spredte rom» (`chooseSpreadRooms`).
4. Vanlige møter strøs ut etterpå.

UX4 la til én garanti: nøkkel og deler havner foran *den ene* gaten til finalen. Men alt annet plasseres uten å vite hva det er avhengig av. Med en enkel kjede (nøkkel → dør) går det stort sett bra. Med kjeder som *selger → hent noe → bytt → åpne* finnes det ingenting som hindrer at selgeren havner bak døra hun skal hjelpe deg gjennom.

Rotårsaken er at **plasseringen ikke vet om avhengighetene, og ingen sjekker hele løpet i etterkant.**

### 1.2 Prinsippet: lag kjeden først, plasser etter soner, og spill gjennom før du godtar

**Steg 1 – Lag kjeden baklengs fra målet** (bare data, ikke kart ennå):

```
MÅL: krystallhjertet bak glassdøra
  krever GLASSNØKKEL                     ← garantert ting
    GLASSNØKKEL ligger bak BROA
      BROA sperres av Brotrollet (vil ha: GLITTER)
        GLITTER: Revehandleren har glassperle (vil bytte: MAT)
          MAT: honningkjeks i et rom
```

**Steg 2 – Del kartet i soner med hinder mellom:**

- **Sone 0:** alt du når fra start uten å passere noe hinder.
- **Sone 1:** det du når etter at hinder 1 (broa) er åpnet.
- **Sone 2:** etter hinder 2 (glassdøra), altså finalen.

Hinder plasseres på kanter som faktisk deler kartet («cut-edge»). Generatoren finner slike kanter allerede i dag.

**Steg 3 – Plasser etter regelen «det som trengs for å åpne sone N, ligger i sone < N»:**

| Ting i kjeden | Må ligge i |
|---|---|
| Brotrollet (sperrer broa) | på kanten mellom sone 0 og 1 |
| Revehandleren | sone 0 |
| Honningkjeksen | sone 0, helst i en *annen grein* enn Revehandleren (da blir det en tur) |
| Glassnøkkelen | sone 1 (bak broa) |
| Glassdøra | på kanten mellom sone 1 og 2 |

**Steg 4 – Gjennomspilling (den viktigste delen).** Før eventyret godtas, spiller en enkel automat gjennom det. Bare de *garanterte* rutene brukes, ingen flaks og ingen DM-overstyring:

```
start med: åpne kanter fra start, tom sekk
gjenta:
  gå til alle rom du kan nå
  plukk opp alle ting som ligger åpent
  hvis du har noe en figur vil ha → gi det (trekk fra sekken om det brukes opp)
       → figuren gir det den gir / åpner det den åpner
  hvis ingenting nytt skjer → stopp
GODKJENT hvis målet er nådd, ellers: lag nytt kart / ny kjede og prøv igjen
```

Gjennomspillingen fanger alle typene feil du har opplevd, uten en egen regel for hver:
- NPC bak døra den skal åpne,
- ting som trengs to ganger, men brukes opp første gang,
- bytte som tar fra deg noe du trenger senere,
- kjeder som går i ring,
- et sted ingen kan nå.

**Steg 5 – Sjekk av snarveier.** Spill gjennom én gang til med alle hemmelige dører og snarveier *åpne*, men med hindrene *lukket*. Hvis målet kan nås, finnes det en vei rundt et hinder, og kartet forkastes. Dette gjør UX4-koden allerede for den ene gaten. Det utvides til alle hinder.

**Steg 6 – Først nå legges vanlige møter og ekstra ting ut.** De kan gi ekstra løsninger, men gjennomspillingen bruker dem aldri. Eventyret skal kunne fullføres uten dem.

### 1.3 Hvorfor dette er bedre enn regler

I stedet for 30 regler som prøver å forutse hver feil, er det **én test som spiller eventyret**. Kommer det nye typer innhold senere (eskorte, ting som flytter seg), utvides automaten litt, og alle eksisterende garantier gjelder fortsatt. Samme automat kjøres i testene over for eksempel 1000 seeds. Da vet vi at generatoren aldri lager et eventyr som ikke går an.

### 1.4 Det gjennomspillingen ikke tar ansvar for

- **Om rekkefølgen føles god:** for eksempel at målet bør *ses* tidlig. Det er en plasseringspreferanse (glassdøra nær start), ikke en garanti.
- **Hva barnet finner på:** din overstyring kan bare gjøre ting lettere, aldri umulige. Derfor trenger den ikke sjekkes.

---

## Del 2 – Innholdet som finnes i repoet

| Kategori | Antall | Hvor | Status |
|---|---|---|---|
| Monstre | 20 familier × 2 = **40** | `index.html` (data), MONSTER-review + handoff (zombie, skjelett, troll) | gjennomgått |
| Personer (NPC) | **12** | PEOPLE-review | gjennomgått |
| Venner | **6** | FRIEND-review | gjennomgått |
| Feller | **6** | TRAP-review | gjennomgått |
| Mysterier | **6** | MYSTERY-review, patch 14 | bevisst improvisasjon |
| Skatter (valgfrie ting) | **8** | TREASURE-review | gjennomgått |
| Varige TING (Helteboka) | **12** | `THING_SPEC.md` | spesifisert |
| Puzzlemaler | **36** | `index.html` (test sjekker antall) | ikke gjennomgått |
| Eventyr (blueprints) | **4** | Adventure Code-patch | i drift |
| Soner | **12** | Adventure Code-spec (4 ruter × 3) | i drift |
| Nøkler, mål, deler, alter, redningsmål | flere kataloger | `index.html` | i drift |
| Heltetyper, egenskaper, startutstyr | ukjent antall | `index.html` (`HulerCharacterSystem`) | ikke gjennomgått |

---

## Del 3 – Første utkast: alt innhold sortert etter vil-ha / gir

### 3.1 Vokabularet

**Seks ønsketyper:**

| Kode | Ønsketype | Spilles som |
|---|---|---|
| **SORT** | vil ha noe av en sort | finn, kjøp eller bytt til deg noe med riktig merke |
| **MISTET** | har mistet noe bestemt | hent-oppdrag |
| **BYTTE** | vil bytte | gi noe for å få noe (selger, handler) |
| **GJØRE** | vil at du gjør noe | hjelp, reparer, flytt, følg, eskorter |
| **VITE** | vil vite noe | finn ut og kom tilbake (passord, landemerke, mønster) |
| **KAMP** | vil sloss eller konkurrere | kamp eller en lek/utfordring i stedet |

**Merker (utkast, 16):**
- MAT, GLITTER, LYS, VARME, MUSIKK, STILLHET, LATTER, MYK, LY (tak/skjerm), LUFT,
- REPARASJON (tråd/verktøy), METALL, HØYDE (stige/tau), GRIPE, LUKT, MYNT.

**Hva figuren kan gjøre på kartet:**
- **SPERRER:** står på en kant og kan være et hinder.
- **SELGER:** bytter eller selger.
- **OPPDRAG:** sender deg avgårde.
- **VENN:** kan følge med eller bli med i Helteboka.
- **KAMP OK:** kan sloss hvis barnet vil.

### 3.2 Monstre (40)

| Figur | Ønsketype | Vil ha | Kan gi / gjøre | Kart |
|---|---|---|---|---|
| Den levende rustningen | VITE | riktig tegn eller bevis | slipper deg forbi | SPERRER, KAMP OK |
| Den tomme rustningen | GJØRE | REPARASJON, puss (MYK) | takk, ting den vokter | |
| Krystallslimet | SORT | LYS, GLITTER | slipper det den har i seg | SPERRER |
| Gjørmeslimet | SORT? | uklart (jord? vann?) | ren vei | SPERRER (miljø) |
| Den lille vampyren | GJØRE | følge eller trøste (LYS, mot) | blir VENN, følger med | VENN |
| Tårnvampyren | GJØRE | hjelp med kappa (HØYDE, REPARASJON) | gave | |
| Prompemonsteret | SORT | LUFT (vifte bort) | ren luft, vei | SPERRER (miljø) |
| Bobleprømperen | SORT | LUFT, trekk | bobler som kan bære | |
| Beinhunden | SORT | noe å kaste (pinne, bein) | blir VENN, kan hente ting | VENN |
| Knokkelhunden | MISTET | sporet (LUKT) | snuser frem noe skjult | VENN |
| Fnisespøkelset | SORT | LATTER | gave eller hint | |
| Tåkespøkelset | SORT | STILLHET | tåka letter, vei synlig | SPERRER (miljø) |
| Den kjøttetende planten | SORT | MAT, LUKT | slipper deg forbi | SPERRER |
| Solslukeren | SORT | LYS (flytte lyset) | vei | SPERRER (miljø) |
| Den sultne krokodillen | SORT | MAT | slipper deg over vannet | SPERRER, KAMP OK |
| Krokodillen med tannpine | GJØRE | hjelp (REPARASJON, MYK) | VENN, bærer deg over | SPERRER, VENN |
| Kjempeedderkoppen | BYTTE | GLITTER | ting fra nettet | SPERRER, SELGER, KAMP OK |
| Sølvveveren | GJØRE/VITE | fullføre mønsteret | tråd eller vei | |
| Kistemonsteret | BYTTE | tyggbare småting | **MYNT** | SELGER, KAMP OK |
| Den søvnige kista | SORT | STILLHET | det den ligger på | SPERRER |
| Steingolemen | VITE | glemt passord | slipper deg forbi | SPERRER, KAMP OK |
| Mosegolemen | GJØRE | vær forsiktig med mosen | vei, kanskje VENN | SPERRER |
| Surmulesoppen | GJØRE | ros (bare SNAKKE, ingen ting) | gave | |
| Sporsoppen | VITE | sortere fargemønster | spor eller hint | |
| Lysslukeren | SORT | LYS (varmt) | slipper det den holder | SPERRER |
| Glimtmøllen | GJØRE | samle lysprikker | LYS-ting | OPPDRAG |
| Byttekrabben | BYTTE | rare småting | det du trenger | SELGER |
| Samlerkrabben | MISTET | én bestemt skatt | ting eller hint | OPPDRAG |
| Ildsalamanderen | SORT | VARME (annet varmt sted) | flytter seg | SPERRER |
| Glødesalamanderen | GJØRE | VARME til steinene | VARME-ting | |
| Sovesoppen | SORT | lyd for å vekke (MUSIKK) | flytter seg fra døra | SPERRER |
| Gjespesoppen | GJØRE | mørkt, stille sted (STILLHET) | rommet blir trygt | |
| Takgargoilen | VITE | forklaring på merkene | hint, vei | |
| Regngargoilen | SORT | LY | VENN, hint | |
| Pannekakezombien | SORT/BYTTE | MAT | ting, flytter seg | SPERRER, SELGER |
| Den bortkomne zombien | GJØRE | følge den hjem | VENN, gave | OPPDRAG |
| Skjelettdanseren | SORT | MUSIKK | rytme, flytter seg | SPERRER |
| Skjelettvakten | VITE/KAMP | bevis eller tillatelse; kan sloss | slipper deg forbi | SPERRER, KAMP OK |
| Sumptrollet | SORT | MAT | slipper deg over | SPERRER |
| Brotrollet | SORT/BYTTE | GLITTER (varierer) | slipper deg over | SPERRER, SELGER |

### 3.3 Personer (12)

| Person | Ønsketype | Vil ha | Kan gi | Kart |
|---|---|---|---|---|
| Lanternevakten | GJØRE | hjelp med lykta og porten (HØYDE, GRIPE) | **åpner en port** | SPERRER |
| Froskekongen | SORT | MYK (polstring til krona) | tillatelse, gave | |
| Dvergsmeden | MISTET | liten fjær (METALL, REPARASJON) | **verktøy eller nøkkel** | OPPDRAG |
| Revehandleren | BYTTE | ting med en historie | det du trenger | **SELGER** |
| Alvekartografen | VITE | landemerke | **kart: viser rom** | OPPDRAG |
| Muldvarpgraveren | GJØRE/VITE | finne trygg søm (lyd) | **viser hemmelig gang** | |
| Uglebibliotekaren | GJØRE/MISTET | hente bok eller side (HØYDE, GRIPE) | hint eller ting | OPPDRAG |
| Goblinkokken | GJØRE | kontrollere gryta | **MAT** | |
| Sneglebudet | GJØRE | LY, eskorte | melding, kart | OPPDRAG |
| Beverbyggmesteren | SORT | materialer (TAU, planker) | **bygger bro** | |
| Den gamle heksa | VITE | mønster i gryta | magisk ting | |
| Kråkeforskeren | VITE | finne den som skiller seg ut | GLITTER, hint | |

### 3.4 Venner (6)

| Venn | Vil ha (for å bli med) | Evne når den er med |
|---|---|---|
| Den svarte katten | at du legger merke til ting | finner åpninger og hemmeligheter |
| Skjelettmusikeren | GULLTRÅD / streng (MISTET) | **MUSIKK** |
| Soppprinsen | landemerker (VITE) | viser vei |
| Bokbillen | forstå speilsymbolet (lommespeil) | leser tegn |
| Sekkegrevlingen | hjelp med å pakke | **bærer ekstra ting** |
| Papirfuglen | myk landing (MYK, LY) | bærer beskjeder |

### 3.5 Feller (6), som hindre som «vil ha» noe

| Felle | Løses med |
|---|---|
| Det kilende gulvet | LATTER / å krype, MYK |
| Beinfellen | støtte (TAU, VERKTØY) |
| Bobleporten | STILLHET (stå helt stille) |
| Skyggegulvet | LYS |
| Den sovende trappa | STILLHET eller MUSIKK |
| Regnbuenettet | LYS i riktig farge |

### 3.6 Ting (8 skatter + 12 varige TING)

| Ting | Merker |
|---|---|
| Rød fjær | LUFT, MYK, LATTER, GLITTER (pynt) |
| Spøkelsesglass | finner spøkelser |
| Trollmynt | MYNT, METALL |
| Honningkjeks | **MAT**, LUKT |
| Glasskule | **GLITTER**, LYS (linse) |
| Gulltråd | REPARASJON, GLITTER |
| Båten i flaska | historie (bytte), flyter |
| Messingknapp | METALL, REPARASJON, MYNT-aktig |
| Foldespaden | grave |
| Tauet som aldri floker seg | **TAU**, HØYDE |
| Lommespeilet | **LYS** (refleks) |
| Bobleflaska | bære, skjerme |
| Lommeparaplyen | **LY** |
| Stjernekikkerten | se langt, lyspunkter |
| Krittetuiet | merke, farge |
| Gripekloa | **GRIPE** |
| Magnetsteinen | METALL |
| Foldestigen | **HØYDE** |
| Lappesettet | **REPARASJON**, MYK |
| Opptrekksmusa | lokke, distrahere |

### 3.7 Dekning: hvor mange som vil ha og hvor mange som gir hvert merke

| Merke | Vil ha (ca.) | Ting som gir det | Vurdering |
|---|---|---|---|
| MAT | 6 | 1 (honningkjeks) + Goblinkokken | **for få ting** |
| GLITTER | 4 | 3–4 | ok, men tynt |
| LYS | 5 | 2 (speil, glasskule) | **for få** |
| MUSIKK | 3 | 0 ting (bare venn) | **mangler ting** |
| STILLHET | 5 | 0 (handling, ikke ting) | ok, det er en handling |
| LATTER | 2 | 1 | ok |
| MYK | 4 | 3 | ok |
| REPARASJON | 4 | 4 | ok |
| HØYDE / GRIPE | 3 | 3 | ok |
| VARME | 2 | 0 | **mangler ting** |
| LY | 2 | 1 | ok |
| LUFT | 2 | 1 | ok |
| MYNT | (selgere) | 1 + Kistemonsteret | tynt |

---

## Del 4 – Det jeg ikke finner, eller ikke kjenner igjen fra det du beskriver

### 4.1 Finnes ikke i spillet i dag (bare i planer, eller ikke i det hele tatt)

1. **Handel og salg.** Revehandleren, Byttekrabben og Kistemonsteret finnes som figurer, men appen kan ikke kjøpe, selge eller bytte. «BRUK» på en ting logger bare at den ble brukt. Det finnes ingen penger utover Trollmynten.
2. **Hent-oppdrag.** Ingen figur kan «ha mistet» noe som appen plasserer et annet sted og husker. Ingen figur gir deg noe tilbake når oppdraget er løst. I dag forsvinner møtet bare og får en logglinje.
3. **Figurer som gir ting.** Ingen NPC gir nøkkel, verktøy eller mat i dag. Nøkler og deler ligger alltid i rom. Den NPC-en du husker som skulle gi deg nøkkelen, finner jeg ikke i koden. Den kan ha vært i en eldre versjon, eller noe du improviserte.
4. **Følgere.** Det finnes «gjensyn med venn fra Helteboka», og redningsmålet følger deg hjem. Men en figur kan ikke bli med deg og hjelpe resten av løpet.
5. **Ønsker som data.** Hver figur har `want`, `clue` og `ways` som fritekst for deg. Delvis finnes `itemHooks` (hvilke ting som passer). Det er nærmest merker i dag, men ikke et felles vokabular som generatoren bruker.

### 4.2 Mangler i innholdet sett opp mot visjonen din

6. **Monstre som *vil* sloss.** Du sier at noen vil sloss. I banken er kamp alltid et valg barnet tar, og ingen figur har kamp som sitt ønske. Seks figurer *tåler* kamp (rustning, skjelettvakt, krokodille, edderkopp, kistemonster, golem). Det trengs noen figurer der en kamp eller konkurranse er selve ønsket: bryting, kappløp, «vis at du er modig».
7. **Kjæledyr.** Beslutningene nevner «ting, venner og kjæledyr», men jeg finner ingen kjæledyr i noen innholdsliste.
8. **For få ting.** 8 valgfrie skatter er for lite for en matrise. Spesielt mangler MAT, LYS, MUSIKK og VARME. Jeg vil anslå at det trengs 30–40 vanlige ting (mange av dem enkle forbruksting).
9. **Heltetyper, egenskaper og startutstyr** er ikke gjennomgått noe sted i prep-dokumentene. Jeg vet ikke hvor mange det er eller hvordan de passer inn i merkene.
10. **36 puzzlemaler** er heller ikke gjennomgått. De kan bli innholdet i VITE-ønskene (passord, mønster, landemerke).

### 4.3 Ting i repoet som passer dårlig med retningen vi nå har valgt

11. **Narrative Graph, faser og storylet-roller** er laget for skrevne historier. Gjennomspillingsautomaten (Del 1) og vil-ha/gir-kjedene erstatter det meste.
12. **De fire blueprints** blir i den nye modellen *mål* for et løp, ikke eventyr med fast innhold.
13. **De seks mysteriene** er bevisst løsrevne og improviserte. De fungerer som stemning, men ikke som deler av kjeder før de får et ønske (for eksempel VITE).
14. **Regelen om at valgfrie funn aldri kan løse noe viktig** (matrise-regel B/C) står i motsetning til tanken om at alt med riktig merke passer. Forslaget er at alt med riktig merke kan *løse*, men generatoren *garanterer* bare én rute.

### 4.4 Ting jeg er usikker på at jeg har forstått riktig

- **Skal en selger alltid sende deg på oppdrag først**, eller bare noen ganger? Jeg har antatt «noen ganger, valgt av generatoren».
- **Skal figurer kunne ha flere ønsker** («vil ha MAT *eller* MUSIKK»)? Jeg anbefaler ja: det gir flere løsninger og mer frihet for barnet.
- **Skal mynter/penger finnes**, eller bare bytte av ting? Repoet har hittil sagt «konkrete ting fremfor abstrakt valuta».

---

## Del 5 – Forslag til neste steg

1. **Du justerer vokabularet:** de seks ønsketypene og merkene. Er det noe som mangler, eller noe som er feil?
2. **Jeg lager kortene** for alt eksisterende innhold i et enkelt dataformat (vil ha / har / gir / kart / tekst), basert på tabellene over og rettet etter dine kommentarer.
3. **Jeg skriver ned gjennomspillingsautomaten og kjedegeneratoren som spesifikasjon**, slik at den kan bygges når appen er i repoet.
4. **Vi fyller hullene i innholdet:** flere ting (særlig MAT, LYS, MUSIKK, VARME), noen monstre som vil sloss, og kjæledyr.
