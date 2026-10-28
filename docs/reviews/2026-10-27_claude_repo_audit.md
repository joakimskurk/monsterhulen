# Monsterhulen – kritisk repo-wide audit

Dato: 2026-10-27 · Modell: Claude Opus 5.5 · Ingen kode eller repo endret.

## 0. Grunnlag og begrensninger

**Branch og git-status (verifisert):**
- Aktiv branch ifølge `START_HERE.md`: `ux5/searchable-rooms-encounter-tracks` (HEAD `2b1ea5b`, ren, synket med origin, 136 commits foran `main`).
- `main` (`6308af6`, 2026-10-26) har ingen `START_HERE.md` og er utdatert.
- `narrative/story-graph-v1-prep` har divergert: 82/88 commits hver vei mot ux5.
- `visual/visual-system-v1-prep` er parkert.

**Lest:** hele leserekkefølgen fra `START_HERE.md`, alle docs, alle 15 patcher (inkludert de to gz/b64-komprimerte) og testfilene på aktiv branch. På prep-branchen: kjernespesifikasjonene (`NARRATIVE_GRAPH_V1`, `NARRATIVE_GRAPH_WORK_PACKAGE`, `CRYSTAL_MACHINE_REFERENCE_V1`, `CRYSTAL_STORYLET_BANK_V1` (delvis)) og strukturen til matrix, plan, audit og subject reviews.

**Ikke gjort:** Jeg har ikke kjørt en eneste test eller selve appen. Det har to grunner:
1. Runtime (`index.html` og assets) finnes ikke i repoet og kan ikke gjenskapes fra det (se F1).
2. Kjøring av repoets eget restore-skript ble blokkert av sikkerhetsreglene i miljøet mitt.

Alle tall som «6844/0» er derfor **påstander i dokumentasjonen, ikke noe jeg har verifisert**. Kodevurderingene bygger på patch-diffene, som viser rundt 10–15 % av den antatt ~3500 linjer lange `index.html`.

Kunnskapsnivåer: **CONFIRMED** · **STRONG HYPOTHESIS** · **PLAYTEST REQUIRED** · **DESIGN OPINION**.

---

## 1. Executive assessment

Monsterhulen har en **uvanlig god produktsans** og et **uvanlig skjørt ingeniørfundament**.

Designprinsippene er gode, og flere er genuint originale for en barne-TTRPG-app:
- fysisk terning,
- «availability is not action»,
- barnet foreslår, appen tolker,
- fail-forward,
- eksplisitt improvisasjonskontrakt,
- én synlig stedsidentitet.

Playtest-funnene er skarpe og ærlig dokumentert. Prosjektet har selv sett mange av sine egne risikoer, blant annet stoppbetingelsen «hvis reglene blir mer komplekse enn en kuratert scenariobank».

Tre strukturelle problemer dominerer likevel:

1. **Repoet er ikke source of truth for det som faktisk kjøres.** Runtime lever i ChatGPT-prosjektfiler og «rekonstrueres». Alle baseline-snapshots i repoet er ufullstendige. Det undergraver testpåstandene, den fysiske gaten og kontinuiteten mellom chatter. *(CONFIRMED, Critical)*
2. **Prosjektet behandler symptomer på ett rotproblem med stadig flere regler.** Rotproblemet: innhold genereres fra løse deler, og sammenhengen blir deretter reparert med kontrakter og validatorer. Narrative Graph V1 (30 invarianter, 23 validator-avvisninger, matrix-regler A–L, 8 provider-familier, 8 shell-familier, typed transitions) er den mest ambisiøse versjonen av den samme strategien. Alt dette skal tjene én blueprint med 9 storylets. *(DESIGN OPINION med sterk evidens)*
3. **Evidensen er strukturell, ikke opplevd.** Tusenvis av grønne assertions måler at felt finnes og at strenger står i kildekoden. Svært lite måler om et barn har det gøy eller om Forteller klarer seg. Den fysiske gaten, som skulle levere slik evidens, har stått åpen mens ~300 KB arkitekturspesifikasjon er skrevet. *(CONFIRMED / STRONG HYPOTHESIS)*

**Hovedanbefaling:**
1. Gjør repoet kjørbart (`index.html` og assets som vanlige filer, GitHub Pages).
2. Kjør gaten som en kort familie-playtest.
3. Bytt neste steg fra «NG1 generell graf/validator» til **et håndskrevet Crystal Machine-vertikalsnitt som spilles med barn før noe generaliseres**.

---

## 2. Top findings (prioritert)

### F1 – Runtime finnes ikke i repoet; «GitHub er source of truth» er i praksis usant
- **Kunnskapsnivå:** CONFIRMED · **Alvorlighet:** Critical · **Confidence:** High

**Evidens**
- Aktiv branch har ingen `index.html` eller assets, bare docs, 15 patcher og 11 testfiler. Alle testene leser `path.join(root,'index.html')`.
- `repo-baseline-v0.12.3`: `source_manifest.json` lister 18 deler (`part000–017`, 192 581 byte), men branchen har bare `part000–014`. Det gir ca. 163 KB, og `part010` er avkortet (7540 tegn). `thumb_manifest.json` refererer deler som ikke finnes.
- `repo-health-baseline-v0.12.3`: `source_docs` manifest 4 deler, bare 1 finnes. `runtime_entities` manifest 14+ deler, ingen finnes.
- Kandidaten er «reconstructed using line-segmented Project/Library materialization» (`UX5A_GATE_REVIEW`), og eldre patcher har «abbreviated `@@` separator hunks» (`patches/README.md`).

**Konsekvens i faktisk spill**
- Ingen kan uten ChatGPT-prosjektet laste nøyaktig patch-15 på en iPad.
- Ingen kan kjøre testene.
- Hver ny chat må rekonstruere fra fragmenter.
- Den fysiske gaten blir trolig delvis blokkert av logistikk, ikke av design. *(Siste punkt: STRONG HYPOTHESIS.)*

**Rotårsak:** Arbeidsflyten går gjennom ChatGPT sin GitHub-connector. Den håndterer ikke store eller binære filer pålitelig, så prosjektet har kompensert med base85-splitting, gz/b64-patcher og patch-kjeder over en baseline som ikke er committet. Det er regelakkumulering på infrastrukturnivå.

**Forslag**
1. Fra en vanlig maskin: `git add index.html assets/` og `git push`. Det er ~200 KB tekst og ~1 MB binærfiler, som er trivielt for git.
2. Verifiser SHA-256 mot `f8e9998f…` direkte fra repo-bytes.
3. Slå på GitHub Pages og lag `npm test` / `node run-all.js` som kjører alle QA-filene.
4. Fremtidige endringer gjøres som vanlige commits, ikke som patchfiler.

**Alternativer:** Last opp en release-zip som GitHub Release asset med hash i repoet. Det er dårligere, men byte-sikkert.

**Kostnad/risiko:** Svært lav. Krever én økt på en lokal maskin. Eneste risiko er feil fil, men hash-sjekken fanger det.

**Timing:** **Gjør nå.** Repoet tillater eksplisitt repo-health-arbeid mens gaten er åpen.

### F2 – Grønne tester beviser mest at feltene finnes og at tekst står i kildekoden
- **Kunnskapsnivå:** CONFIRMED · **Alvorlighet:** High · **Confidence:** High

**Evidens**
- `QA_ENCOUNTER_PURPOSE_UX5A.js` kjører 5 typer × 120 seeds og sjekker `!!ev.purpose`, `!!ev.stakes` osv. Men `encounterContract()` fyller **alltid** disse feltene med faste standardtekster per type. Testen kan ikke feile så lenge funksjonen finnes.
- Mange assertions er strengsøk i kildekoden, for eksempel `html.includes("toast(\`${blocker.name} SPERRER VEIEN VIDERE\`)")`, `html.includes('DU SKAL IKKE FINNE PÅ TOMME FYLLSTEG')` og `html.includes('target.id!==state.previousRoomId')`. De låser implementasjonstekst, ikke oppførsel.
- Harnesset deler appskriptet på `'function freshState'` og stubber DOM. Det er skjørt.
- «6844/0» består hovedsakelig av samme få fakta gjentatt over 200 seeds.

**Konsekvens:** Headline-tallene gir et inntrykk av dekning som ikke finnes. En reell regresjon i hvordan Forteller opplever et møte fanges ikke. En refaktorering som bevarer oppførselen, men endrer tekst, vil feile.

**Rotårsak:** Testene skrives for å «bevise» hver patch med samme chat-agent som skrev patchen, og antall assertions brukes som evidensvaluta.

**Forslag**
- Rapporter **antall distinkte invarianter** (sannsynligvis noen titalls), ikke antall assertions.
- Erstatt strengsøk med oppførselstester gjennom `move()` og handlers.
- Legg til 3–5 **skriptede gjennomspillinger** per blueprint (start → gate → finale) som kjører på faktiske handlers.

**Alternativer:** Behold testene, men slutt å bruke tallene i statusdokumentene.

**Kostnad/risiko:** Moderat arbeid. Ingen risiko for spillet.

**Timing:** Etter F1 og før NG-arbeid. QA/harness-arbeid er tillatt under gaten.

### F3 – Mulig softlock: story-nøkkel kan gå tapt ved full ryggsekk
- **Kunnskapsnivå:** STRONG HYPOTHESIS, må sjekkes i full kilde · **Alvorlighet:** High (Critical hvis bekreftet) · **Confidence:** Medium

**Evidens**
- Baseline har `addQuestItem(item){if(!state.inventory.includes(item)&&state.inventory.length<6)state.inventory.push(item)}` (synlig i patch 13-kontekst). Ved 6 ting legges nøkkelen ikke i sekken, uten varsel.
- Gate-readiness bruker `p.found.includes(c.keyItem)` (progression-patch), altså funnlisten.
- Etter patch 11 kan døren bare åpnes via `tryUseStoryKey(item,index)` fra et inventory-slot. Dørtrykk sier bare «LÅST».
- Hvis funnet av nøkkelen går via `addQuestItem` med full sekk, er gaten «ready», men nøkkelen kan ikke brukes.

**Konsekvens:** Barnet sitter fast foran finaledøren med «riktig» nøkkel «funnet».

**Rotårsak:** To sannhetskilder for samme ressurs (`scenario.found` og `inventory`). Patch 11 endret hvilken av dem som styrer handlingen.

**Forslag**
1. Sjekk funn-pathen i full kilde.
2. Hvis bekreftet: story-ressurser må aldri avvises av sekk-kapasitet (egen plass eller unntak fra grensen), eller dør-BRUK må lese fra `found`.
3. Legg til en regresjonstest.

**Kostnad/risiko:** Lav. Dette er en UX5A-defekt og innenfor tillatt patch-scope.

**Timing:** **Gjør nå**, før den fysiske gaten.

### F4 – «Purpose-kontrakten» for ambiente møter er boilerplate; de fleste møter har ingen stakes
- **Kunnskapsnivå:** CONFIRMED (kode) + PLAYTEST REQUIRED (opplevelse) · **Alvorlighet:** High · **Confidence:** High på kode, Medium på effekt

**Evidens**
- `encounterContract(type, entry)` returnerer samme `purpose/stakes/resolvedWhen` for alle møter av samme type, for eksempel MONSTER: «BARNET KAN SNAKKE, LURE, UNNGÅ ELLER VELGE KAMP …».
- `payoff` faller tilbake til `entry.high`, altså terningteksten for 5–6. Det blander en terningkonsekvens med en historiebelønning.
- Alle ikke-feller har `blocksForward:false`. Løsning betyr bare `events.splice` pluss en logglinje.
- `DECISIONS.md` (2026-10-26) sier at et møte ikke skal få mekanikk «merely because its type supports them». Kontrakten gjenskaper nettopp det på tekstnivå.

**Konsekvens i faktisk spill**
- Barnet kan gå forbi nesten alt. Monstre, personer, venner og mysterier er valgfri stemning uten konsekvens eller belønning (unntatt feller og story-noder).
- Forteller må selv finne på hvorfor møtet betyr noe, altså reparere manglende narrativ logikk. Det er nettopp det prosjektet sier Forteller ikke skal gjøre.

**Rotårsak:** Ambiente møter velges etter type og tone, ikke etter en rolle i *dette* eventyret. Kontrakten la til felt uten å legge til mening.

**Forslag:** Gi hvert ambient møte ett konkret, lite *hook* knyttet til blueprinten:
- et hint om gate-objektet,
- en snarvei,
- en ting,
- en venn som blir med,
- informasjon om finalen.

Eller: **færre ambiente møter** (2–3 per eventyr i stedet for mange), slik at hvert betyr noe.

**Alternativer:** Behold boilerplate-teksten, men vis den ikke. Den gir Forteller lite når den er identisk hver gang.

**Kostnad/risiko:** Innholdsarbeid. Krever forfatterskap, ikke arkitektur.

**Timing:** Etter aktiv gate. Hypotesen bør testes i gaten (se H1).

### F5 – Regelakkumulering: ett rotproblem behandlet med mange lokale regler
- **Kunnskapsnivå:** CONFIRMED (mønster) / DESIGN OPINION (remedy) · **Alvorlighet:** High · **Confidence:** Medium-High

**Evidens på akkumulering**
- Patch 10–15 legger hver til en regel:
  - ikke auto-bruk nøkkel,
  - én stedsidentitet (og så et lekk til i patch 15),
  - purpose-kontrakt,
  - improv-kontrakt,
  - `useRandomPuzzle===true`,
  - `previousRoomId`-retrett.
- Den samme legacy-oppgraderingen (`if(typeof ev==='string')ev=r.events[i]=E.makeEncounter(...)`) er kopiert inn i minst 5 click-handlere.
- Fortellertekst får stadig flere ansvarsfraskrivelser, som «KONSEKVENSENE ER FORSLAG, IKKE FASIT», «ET TERNINGKAST … FJERNER ALDRI ET MONSTERHJERTE» og «DU SKAL IKKE FINNE PÅ TOMME FYLLSTEG».
- `STORYLET_MATRIX_V1` har regler A–L, blant annet «Repeating the same prop is also repetition» og «Knowledge provider cannot create topology or truth».
- `NARRATIVE_GRAPH_V1` har 30 hard invariants, og NG1-validatoren skal avvise 23 feilklasser. Alt dette for **ett** blueprint med 9 storylets (3×3×3 = 27 kombinasjoner).

**Rotårsak:** Systemet prøver å *generere* fortellinger fra løse deler og deretter *validere* seg til sammenheng. Hver playtest avdekker en ny måte delene kan kombineres meningsløst på, og svaret blir en ny regel.

**Testspørsmålet:** «Ville vi designet det slik i dag?» Mitt svar er nei. Med 4 blueprints og et eksplisitt prinsipp om at fortellingskvalitet slår kombinasjonsmengde, er et **håndskrevet scenarioskjelett** det naturlige designet. Det består av:
- faste beats,
- hvert beat med 2–3 håndskrevne varianter,
- noen få eksplisitte «ikke sammen med»-par,
- prosedyre bare for kartlayout, ambient farge og fargeparametre.

Med 27 kombinasjoner kan en voksen lese alle. En generell provider-planner med asyklisitetsbevis er overkill.

**Forslag:**
- Behold prinsippene (`SETUP→SIGNAL→ACTION→PAYOFF`, availability≠action, truth≠knowledge) som **forfatter-sjekkliste og per-scenario-tester**, ikke som runtime-motor.
- Utsett provider-system, phase/expiry-motor og generell validator til et konkret behov oppstår (for eksempel blueprint nr. 3 som ikke passer skjelettet).

**Alternativer:** Implementer NG, men bare NG3 (Crystal-planner) med hardkodet trio og ingen generell provider-graf.

**Kostnad/risiko:**
- Mindre variasjon per blueprint. Det er sannsynligvis uproblematisk for 5–8-åringer, som ofte *vil* spille samme historie igjen (H7).
- Risiko: hvis prosjektet senere vil ha mange blueprints, kan noe av NG-arbeidet trengs. Men da med evidens.

**Timing:** Beslutning nå, implementering etter aktiv gate.

### F6 – Statusdokumentasjon er duplisert og selvmotsigende
- **Kunnskapsnivå:** CONFIRMED · **Alvorlighet:** Medium-High · **Confidence:** High

**Evidens**
- Samme status og testtall-liste står i minst 8 filer: `START_HERE`, `PROJECT_STATE`, `CURRENT_STATUS`, `ROADMAP`, `TESTING`, `PLAYTEST_FINDINGS`, `patches/README`, `UX5A_GATE_REVIEW` og `BROWSER_QA`.
- Selvmotsigelser:
  - `UX5A_SEARCH_PROGRESS_SPEC.md` (rot) beskriver fortsatt generiske 3/4-stegs progress tracks. Den refererer også `QA_SEARCH_PROGRESS_UX5A.js` og en patchfil som ikke finnes.
  - `docs/UX5A_WORK_PACKAGE.md`: «If green, merge UX5A to main and begin UX5B». Det motsier roadmapen (NG før UX5B).
  - `PLAYTEST_FINDINGS.md` slutter med «next subject DEN LEVENDE RUSTNINGEN». Det samme gjør `NARRATIVE_GRAPH_WORK_PACKAGE.md`. `START_HERE`: «There is no next subject review».
  - `README.md`: appen «registrerer bare 1-2, 3-4, 5-6» (nå eksakte terningflater). README omtaler også `main` som hjem.
- Siste ~15 commits på ux5 er status- og handoff-oppdateringer, flere med nesten identisk melding («park visual work»).

**Konsekvens:** Hver ny chat bruker kontekst og tid på å lese repetisjoner, og kan handle på utdaterte dokumenter. Dokumentasjonsvedlikehold har blitt en egen arbeidsstrøm.

**Rotårsak:** `ChatGPT_GitHub_Project_Workflow.md` krever oppdatering av mange memory-filer etter hver milepæl, uten regel om én kanonisk kilde.

**Forslag:**
- Ett `STATUS.md` (≤1 side) er kanonisk. Andre filer lenker dit i stedet for å gjenta.
- Flytt supersedede specs til `docs/archive/` med «SUPERSEDED BY …»-header.
- Testtall står bare i én fil.

**Timing:** Nå. Dette er tillatt dokumentasjonsarbeid.

### F7 – Den fysiske gaten er en «big-bang»-sertifisering som har stoppet fremdrift
- **Kunnskapsnivå:** STRONG HYPOTHESIS · **Alvorlighet:** Medium-High · **Confidence:** Medium

**Evidens**
- Gaten har 14 punkter. Den har vært åpen siden patch 10 (2026-10-26) gjennom patch 11–15.
- I samme periode ble visual V1/V2/V3, hele content-reviewen og ~300 KB NG-spesifikasjon produsert.
- Flere gate-punkter er tekniske (localStorage, clipboard) og trenger én voksen i 10 minutter. Andre er subjektive («feels exploratory») og trenger barn.

**Konsekvens:** Alt nytt runtime-arbeid står stille. Spesifikasjoner vokser uten tilbakemelding fra spill.

**Forslag:** Del gaten i to:
- **G-tech:** voksen, 15 min, sjekkliste.
- **G-play:** én familieøkt, 30–45 min, 5 observasjonsspørsmål.

Definer på forhånd hva som blokkerer merge og hva som bare noteres. Med F1 løst blir det trivielt å åpne riktig build på iPad.

**Timing:** Nå.

### F8 – Forteller-kortene er for tunge
- **Kunnskapsnivå:** CONFIRMED (innhold) / PLAYTEST REQUIRED (alvorlighet) · **Alvorlighet:** Medium · **Confidence:** Medium

**Evidens:** `gmSummary()` (patch 13/14) stabler for hvert møte:
- kontrakt (3 avsnitt),
- typeguide,
- VIL, HINT I VERDEN, KAN LØSES MED,
- utstyr, matchende ting,
- skrevne steg,
- monsterregel, puzzle,
- TERNING,
- ansvarsfraskrivelse,
- konsekvenser.

Alt står i store bokstaver, og mye er formulert som forbud.

**Konsekvens:** Forteller må lese en side midt i leken. Generelle regler («kast bare ved usikkerhet») gjentas på hvert kort i stedet for å læres én gang.

**Forslag:**
- 3-linjers kort: *Hva er det? · Hva vil det? · Hva skjer når det er løst?* Pluss én konkret åpningsreplikk. Resten bak «mer».
- Flytt generelle regler til en engangs «Slik er du Forteller»-intro.
- Bruk vanlig skrift for Forteller. Store bokstaver beholdes for barnetekst.

**Timing:** Etter gate (UX-polish). Ta det med som observasjonspunkt i G-play.

### F9 – Terningregistrering i appen er ofte ren seremoni
- **Kunnskapsnivå:** STRONG HYPOTHESIS · **Alvorlighet:** Medium · **Confidence:** Medium

**Evidens**
- `DECISIONS`: terning endrer aldri hjerter, progress eller løsning. `registerEncounterDice` setter bare `diceBand` slik at et *forslag* vises.
- Seks flater kollapses til tre bånd.
- Unntak der registreringen faktisk betyr noe: skjult funn og hemmelig dør (low gir sterkere hint).

**Konsekvens:** Kast → finn knappen → trykk → les forslag → overstyr kanskje. Ett ekstra UI-steg per kast uten state-effekt. Det er appen som administrerer i stedet for å støtte. Kastet på bordet er det magiske. Trykket er ikke det.

**Forslag:**
- I møter: gjør terningknappene valgfrie, eller fjern dem, og vis tre forslag samtidig.
- Behold registrering der state avhenger av resultatet.

**Alternativer:** Behold, men mål om Forteller faktisk trykker (H3).

**Timing:** Etter gate. Test i G-play.

### F10 – Kodearkitektur: monolitt med direkte state-mutasjon i handlers
- **Kunnskapsnivå:** CONFIRMED (fra diffs) · **Alvorlighet:** Medium · **Confidence:** Medium (ser bare utdrag)

**Evidens**
- Én `index.html` med 11 inline-skript, linjenummer over 3400.
- Click-handlere på én linje som muterer `state`, kaller `splice`, logger, lagrer og rendrer.
- Sannheten er duplisert (`scenario.found` og `inventory`, se F3).
- Lazy legacy-oppgradering ligger i handlers.

**Konsekvens:** Hver feature berører mange steder. Undo og shared session blir vanskelig. Bugs av F3-typen oppstår lett.

**Vurdering av NG-planen:** «Typed transition boundary» i NG1 er riktig instinkt, men er buntet inn i en stor graf- og validatorpakke.

**Forslag:** Etter F1, lag en liten `apply(state, action)` for **eksisterende** handlinger (MOVE, USE_ITEM, RESOLVE_ENCOUNTER, START_COMBAT, HIT, SEARCH, TAKE) med uendret oppførsel. Det er en ren refaktor, fanget av gjennomspillingstestene fra F2. Gi den gjerne egen WP mellom merge og nytt gameplay.

**Kostnad/risiko:** Moderat. Regresjonsrisiko dekkes av F2-tester.

**Timing:** Etter merge og før nye mekanikker.

### F11 – Én skjerm, to publikum
- **Kunnskapsnivå:** DESIGN OPINION / PLAYTEST REQUIRED · **Alvorlighet:** Medium · **Confidence:** Medium

**Evidens**
- Barnevendte kort inneholder fortellerspråk og fortellerknapper: «BARNET VELGER KAMP», «LØST UTEN KAMP», terningregistrering, «HINDRINGEN ER LØST».
- Det er ikke dokumentert *hvem som holder iPaden* i normal lek.
- Multiscreen er parkert som stor plattformpakke.

**Konsekvens:**
- Et 5-åring kan ikke lese kortene.
- Et 11-åring leser fortellerhint og «fasit-nære» tekster.
- Forteller må navigere UI mens barnet ser på.

**Forslag:** Bestem eksplisitt én primær driftsmodus, for eksempel «Forteller styrer, barnet ser bildet og kartet». Vurder en billig **«vis barnet»-fullskjerm** (bilde, navn, én setning) lenge før Multiscreen.

**Timing:** Avklar i G-play, implementer senere.

### F12 – Mindre: retrett-logikk avhenger av `previousRoomId`
- **Kunnskapsnivå:** CONFIRMED (kode) · **Alvorlighet:** Low · **Confidence:** High

**Evidens:** `blockedByEncounter = blocker && state.previousRoomId && target.id !== state.previousRoomId`. Uten `previousRoomId` blokkerer fellen ingenting. Det gjelder:
- startrom,
- legacy-save lastet midt i et rom,
- felle lagt til av DM før første forflytning.

**Forslag:** Fall tilbake til «blokker alt unntatt én vei». Legg til test.

**Timing:** Kan tas sammen med F3 hvis det er billig, ellers senere.

---

## 3. Keep

- **Fysisk terning, og appen ruller aldri.** Kjernen i identiteten og riktig for barn og bord.
- **«Availability is not action» / barnet bruker selv nøkkelen** (patch 11). Gir reell agency.
- **Eksplisitt improvisasjonskontrakt for Forteller** (patch 14, «INGEN SKJULT FASIT»). Original og nyttig.
- **Fjerning av generiske 3/4-progress-bokser og tilfeldige puzzles** (patch 13). Riktig diagnose.
- **Feller som faktisk sperrer, med retrett.** Ekte konsekvens, ingen softlock.
- **Én synlig stedsidentitet.**
- **Fail-forward på søk og hemmelige dører**, og at søk aldri avslører loot på forhånd.
- **Ting og venner er affordances, ikke tallbonuser.**
- **Prinsippet «Story quality beats combinatorial volume»** og de fire kuraterte blueprints. Ta det enda mer på alvor (F5).
- **Adventure Code `MH1`** (offline, versjonert). Billig og nyttig.
- **Save-kompatibilitet og stable IDs.**
- **Subject ≠ role** som *forfatterverktøy*.
- **De konkrete Crystal-storylets** (LYSET I SPREKKEN, KRYSTALLKLANGEN osv.). Godt innhold.
- **`SETUP → SIGNAL → ACTION → PAYOFF`** som forfatter-sjekkliste. Tilstrekkelig for kritiske mål.
- **Ærlig skille mellom verifikasjonsnivåer** i `TESTING.md`. Det er en god kultur. Problemet er hvilke nivåer som faktisk nås.
- **Parkering av visual-sporet.** Riktig beslutning.

## 4. Challenge

- **Narrative Graph V1 som generell motor** (provider-graf, asyklisitet, phase/expiry-motor, 30 invarianter) *før* ett håndskrevet scenario er spilt. Bytt rekkefølge (se §7).
- **Provider-systemet med 8 familier.** På dagens nivå er det 3 familier i 1 blueprint. Hardkod dem.
- **Phase/expiry-modell.** SKYGGEHEKSA-problemet løses enklere ved at complications plasseres av skjelettet etter faste beats, ikke via en generell gyldighetsvindu-motor.
- **NG5 «≥1000 graph cases»** som målepunkt. Med 27 kombinasjoner: test alle 27 eksplisitt, ferdig.
- **Patch-kjede som utviklingsmodell.** Slutt med patchfiler når kilden er committet.
- **Testtall som evidensvaluta.**
- **14-punkts gate som én blokk.**
- **Purpose-kontrakt på typenivå** (F4). Enten ekte per-møte-innhold, eller ikke vis den.
- **Terningregistrering i møter** (F9).
- **Mengde ambiente møter per eventyr.** Færre og mer meningsfulle.
- **Det generelle «interaction shell»-rammeverket** (8 familier). Bygg bare SLOT/ASSEMBLY når Crystal trenger det. Planen sier dette selv, men det står 8 familier i specen.

## 5. Stop doing

- Stoppe å skrive nye arkitekturspesifikasjoner før noe av det eksisterende er spilt.
- Stoppe å oppdatere samme status i 8 filer.
- Stoppe å transportere runtime via base85-splitting, gz/b64 og «rekonstruksjon».
- Stoppe å rapportere assertion-tall som kvalitetsmål.
- Stoppe å legge til nye regler og ansvarsfraskrivelser i fortellertekst for hvert funn. Fiks innholdet eller strukturen i stedet.
- Stoppe planleggingen av Multiscreen, shared session, undo-sync og open-source-survey nå. Det er riktig parkert, men det tar fortsatt plass i hver statusfil.
- Visual-arbeid er allerede stoppet. Fortsett med det.

## 6. Missing opportunities

1. **Sesjonslengde som designmål.** Ingen dokument sier hvor lang en økt er. For 5–8 år er 20–40 min realistisk. 13 rom med møter kan være for langt. Mål det og gjør KORT til standard for de yngste.
2. **Repetisjon som feature.** Små barn elsker å spille samme historie igjen. Det reduserer behovet for prosedural variasjon og styrker case for håndskrevne skjeletter (H7).
3. **Aldersmodus utover puzzle-nivå.** 5–7 vs 9–12 skiller seg mer i lesing, lengde, kamplyst og humor enn i puzzle-vanskelighet. En enkel «Lille helt / Stor helt»-profil kan styre lengde, tekst og antall møter.
4. **Barnets egne bidrag lagres.** Helteboka kan huske *barnets* oppfinnelser: navnet barnet ga en venn, løsningen barnet fant. Det gir sterk eierskapsfølelse og motivasjon til neste økt. Det er billig, og passer med improv-kontrakten («ting Forteller fant på kan bli kanon hvis barnet vil»).
5. **Forteller-onboarding.** En 2-minutters «første gang som Forteller» med ett eksempelmøte erstatter mye gjentatt kort-tekst (F8).
6. **«Stuck»-knapp for barnet** (eller Forteller) som gir et graderingshint fra blueprinten, slik `CRYSTAL_MACHINE_REFERENCE` beskriver hinting. Det trenger ikke hele UX5B.
7. **Deploybar URL** (GitHub Pages). Gjør playtesting med andre familier mulig, også uten utviklertilgang.
8. **Belønningsøyeblikket på slutten.** Finale-payoff og «hva du gjorde i dag»-oppsummering, basert på loggen, høyt lest av Forteller. Billig, og sannsynligvis en av de mest verdifulle opplevelsene for barnet. *(DESIGN OPINION)*

## 7. Recommended next gameplay work package

**Respekt for aktiv gate:** UX5A er ikke grønn og ikke merget. Det som er tillatt nå er bekreftede UX5A-defekter, repo-health og QA/harness. Rekkefølgen under følger det.

**Nå (innenfor gaten)**
1. **R0 – Runnable repo** (repo-health, F1). Commit `index.html` og assets byte-sikkert, verifiser hash, slå på GitHub Pages og lag én kommando som kjører alle tester.
2. **UX5A-defektsjekk** (F3, og eventuelt F12). Bekreft eller avkreft softlock ved full sekk. Hvis bekreftet: patch 16 og test.
3. **Konsolider status** (F6).
4. **Gate som G-tech + G-play** (F7) på den deployede builden. Bruk G-play også til å samle evidens for H1–H6 nedenfor.

**Etter UX5A grønn og merget: anbefalt neste gameplay-WP**

**WP-CM1 «Crystal Machine authored vertical slice»**, i stedet for NG1 som generell graf, provider og validator.

Innhold:
- **Én** fast trio, den anbefalte fra `CRYSTAL_STORYLET_AUDIT` (§6 «Recommended first-manual-story trio»): én søk, én NPC-tjeneste, én vokter.
- Skrevet som eksplisitt beat-data:
  - reveal-scenen ved maskinen,
  - tre greiner med setup, signal, action og payoff,
  - retur,
  - **SLOT/ASSEMBLY-popup** (eneste nye shell),
  - gate,
  - finale.
- Minimal Forteller-visning per beat: *hva er det / hva vil det / når er det løst / hva skjer da*.
- Pluss «GODTA LØSNING». Ingen provider-motor, ingen phase-motor.
- Tester: 3–5 skriptede gjennomspillinger pluss eksplisitte invarianter:
  - tre krystaller betyr ikke montert,
  - feil krystall forbrukes ikke,
  - delvis plassering overlever reload,
  - gaten åpner bare etter montering.
- Spill med barn etter 1–2 uker. **Først da** besluttes om generalisering (variant-utvalg, provider-planner) trengs.

Det gjenbruker NG-specens beste ideer, men flytter NG7 (familie-playtest) foran NG1, NG2 og NG5.

**Om små WPs vs store milepæler:** Behold små work packages for implementering. Organiser dem under **få designmilepæler med spillbar evidens som exit-kriterium**, for eksempel:
- M1 «spillbart repo + gate»,
- M2 «Crystal Machine er gøy»,
- M3 «Forteller klarer seg uten forklaring».

Dagens WPs har tekniske exit-kriterier og samler seg opp foran én fysisk gate.

## 8. Suggested validation (ekte barn og Forteller, før større arkitekturendringer)

| # | Hypotese | Hvordan teste (én økt) | Beslutning den påvirker |
|---|---|---|---|
| H1 | Barn går forbi ambiente møter fordi de ikke betyr noe | Tell møter engasjert vs. forbigått. Spør «hvorfor gikk du videre?» | F4: færre og meningsfulle møter vs. dagens volum |
| H2 | Forteller leser ikke fortellerkortene midt i leken | Observer: åpnes «mer», leses det høyt, hvor lenge stopper leken? | F8: kortstørrelse |
| H3 | Forteller dropper å trykke inn terningresultatet i møter | Tell kast på bordet vs. registrerte kast | F9 |
| H4 | Håndskrevet Crystal-trio gir måls- og payoff-forståelse uten generell graf | Etter CM1: kan barnet gjenfortelle målet? Ble monteringen et høydepunkt? | F5: om NG-generalisering trengs |
| H5 | 5–7 og 9–12 trenger ulik lengde og tekstmengde | Én økt per aldersgruppe. Mål lengde, avbrudd og lesing | Aldersprofil |
| H6 | En vanlig økt er for lang for de yngste | Klokke. Hvor mange rom før oppmerksomheten faller? | Standardlengde |
| H7 | Barnet vil spille samme eventyr igjen | Spør etter økten. Tilby samme vs. nytt | Verdien av prosedural variasjon |
| H8 | Hvem holder iPaden, og ser barnet tekst det ikke skal se? | Observer | F11: driftsmodus og «vis barnet»-skjerm |

## 9. Model recommendation revisited

- **Ville jeg valgt samme modell?** For selve analysen: ja, Opus 5.5 var tilstrekkelig. Begrensningen i denne auditen var **evidens**, ikke modell. Runtime finnes ikke i repoet og tester kunne ikke kjøres. En sterkere modell hadde ikke kompensert for det.
- **Ville Fable 5.1 gitt bedre audit?** Trolig noe dypere på lange tverrdokument-resonnementer, særlig hvis den får hele prep-branchen (~300 KB) og full `index.html` i kontekst. Gevinsten er størst når runtime er committet.
- **Adversarial second opinion?** Ja, men med et smalt mandat: utfordre de konklusjonene her som har størst konsekvens (F5 og §7). Ikke gjør en ny full audit.
- **Anbefalt:** Claude Fable 5.1 (eventuelt Opus 5.5 med høy effort hvis Fable ikke er tilgjengelig), *etter* at F1 er løst, med denne prompten:

> Du får (1) repoet `joakimskurk/monsterhulen` på branch `ux5/searchable-rooms-encounter-tracks` med full `index.html`, (2) branch `narrative/story-graph-v1-prep`, og (3) vedlagte audit `Monsterhulen_audit_2026-10-27.md`. Din rolle er adversarial reviewer av auditen, ikke av prosjektet. For hver av F1–F12 og anbefalingen i §7: forsøk aktivt å motbevise den med konkret evidens fra kode, docs eller playtest-funn. Spesielt: (a) Finn de sterkeste argumentene *for* å implementere Narrative Graph V1 som planlagt i stedet for et håndskrevet Crystal Machine-vertikalsnitt. Hvilke playtest-funn ville et håndskrevet skjelett *ikke* løse? (b) Verifiser eller avkreft F3 (softlock ved full ryggsekk) i faktisk kilde. (c) Er F4 feil fordi ambiente møter har verdi som ren stemning for barn 5–8? (d) Hvilke viktige problemer har auditen oversett? Merk hvert svar CONFIRMED / STRONG HYPOTHESIS / PLAYTEST REQUIRED / DESIGN OPINION. Ikke gjenta funn du er enig i, bare oppgi «agree» med én setning. Ikke endre repoet.

Det er også verdifullt at prosjektet utvikles med ChatGPT, mens denne gjennomgangen er gjort av Claude. Det er allerede en leverandøruavhengig second opinion. En Claude-til-Claude-review deler flere blindsoner enn den gjør.
