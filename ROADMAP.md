# MONSTERHULEN - ROADMAP

DATO: 2026-10-26
STATUS: V0.12.3 BASELINE + UX5A AUTOMATED/BROWSER VERIFIED + PHYSICAL DEVICE HOTFIX RETEST PENDING + NARRATIVE GRAPH V1 PREPARED

## LÅSTE PRINSIPPER
- Fortellingskvalitet slår kombinasjonsmengde. Få gode eventyr er bedre enn tusen middelmådige.
- Kritisk historie bygges fra kuraterte Adventure Blueprints.
- Kritiske story-beats skal heretter modelleres som eksplisitt Narrative Graph med kuraterte Storylets og kompatibilitetsregler.
- Hvert kritisk mål må ha `SETUP -> SIGNAL -> ACTION -> PAYOFF`.
- Sannhet og spillerkunnskap er separate state. UI/Forteller kan ikke røpe story facts før de er avslørt i fiksjonen.
- Seed kan variere layout, kompatible Storylets og trygg sidecontent, men ikke bryte årsak/virkning i historien.
- Finaler må opptjenes gjennom en eksplisitt story prerequisite.
- Hemmelige dører må oppdages og kan aldri omgå story-gates.
- Den samme Monsterhulen er litt annerledes hver gang man går inn.
- Barnet foreslår handlinger; appen støtter, den bestemmer ikke fasiten.
- Fysisk 1D6 ved usikker handling; relevant EKSTRA GOD PÅ gir fysisk 2D6, bruk høyeste.
- Appen genererer aldri terningresultat.
- Puzzle/gjetning trenger ikke terning i seg selv.
- Ting, venner og kjæledyr åpner muligheter, men gir ikke bonusdie.
- Generiske UX5A-romfunn er valgfrie affordances og kan aldri bli story-critical requirements.
- Kritisk skjult innhold må ha clue + fail-forward og kan aldri kreve ett vellykket kast for å unngå softlock.
- Guardians må ha minst én skrevet ikke-voldelig affordance.
- Et terningresultat alene avslutter aldri et normalt encounter eller endrer encounter-state automatisk.
- GitHub-repoet er permanent source of truth.

## FERDIG BASELINE
- V0.11.0-V0.11.4: helter, start-item art og 20 monsterfamilier / 40 varianter
- V0.11.5: 12 standard-NPC-er
- V0.11.6: 6 ambient venner + 10 varige venner
- V0.11.7: 10 varige kjæledyr
- V0.11.8: 5 redningsmål
- V0.11.9: Physical Dice Result UX
- V0.12.0: 36 puzzles / 9 kategorier / 3 nivåer
- V0.12.1: 14 skatter og hemmelige funn
- V0.12.2: Monsterhulen rename + bakoverkompatibel storage migration
- V0.12.3: 12 varige TING, identity/affordance pass

## PLAYTEST- OG ARKITEKTURREKKEFØLGE
1. Kartnavigasjon via tappbare `?` / lås / kjente nabrom.
2. FRITT KAST, tydelig narrator-frihet og ikke-forbrukende `BRUK`.
3. Nybegynner-DM-guide + seks faktiske D6-flater som input.
4. Adventure Code V1 + kuraterte blueprint-eventyr + separat fortellervisning.
5. **UX4: hard finale-progresjon + terningbasert oppdagelse av hemmelige dører.** Runtime-verifisert.
6. **UX5A: romundersøkelse + valgfrie skjulte funn + eksplisitt encounter-state.** Automated runtime + Chromium verified. Physical device test fant to konkrete UX-feil; hotfix er automated/Chromium green og fysisk retest pågår.
7. **Narrative Graph V1: sammenhengende kritisk story + Storylet Matrix.** Ny neste arkitekturpakke etter grønn UX5A-device gate. Start kun med `CRYSTAL_MACHINE`.
8. **UX5B: kartbevisst løsningsgraf i Forteller-visningen.** Nå utsatt til Narrative Graph V1 er bevist. UX5B skal lese den eksplisitte story graphen, ikke gjette sammenhenger fra løse rom/events.

## UX5A acceptance og gate
Automatisert/browser-del før device hotfix var grønn:
- searchable-room QA: 2216/0,
- Adventure Code: 405/0,
- UX4 progression: 1797/0,
- combined content regression: 5960/0,
- 11 inline scripts: 0 syntax errors,
- Chromium interaction smoke: 23/0.

Fysisk playtest fant:
1. story-gate med riktig nøkkel ble låst opp og passert i samme trykk, slik at låsen føltes kosmetisk; brukt nøkkel ble dessuten stående i sekken,
2. et generisk puzzle kunne være logisk gyldig, men uten tydelig fiksjonell kobling eller Forteller-instruks.

Hotfix-verifisering:
- targeted Node: 19/0,
- Chromium targeted smoke: 15/0,
- første gate-trykk åpner uten traversal,
- scenario-nøkkel fjernes med eksplisitt fiction-logg,
- andre trykk traverserer,
- puzzle har Fortellerhjelp, hint/fasit og eksplisitt `PUZZLET ER LØST` -> +1 fremgang.

Før UX5A kan merges:
- disse hotfixene må bekreftes fysisk,
- resten av UX5A-device smoke må fortsatt føles grønn,
- eventuelle nye playtest-funn må enten fikses eller eksplisitt klassifiseres som senere scope.

## Narrative Graph V1 - hvorfor den kommer før UX5B
Live playtest av `CRYSTAL_MACHINE` viste en mer fundamental svakhet enn løsningshints: dagens `COLLECT`-planner plasserer bare tre story-critical `DEL`-events i tre reachable rom. Disse rommene ekskluderes fra ambient encounter-generation. Resultatet er korrekt progresjon, men de tre delene kan oppleves som tre isolerte pickups uten setup, motivasjon eller payoff.

Dette kan ikke løses robust med mer tilfeldig ambient content. Kritiske deler trenger egne kuraterte story-funksjoner.

### Locked target architecture
- Adventure Blueprint = overordnet premiss/struktur.
- Narrative Graph = eksplisitte beats, ressurser, prerequisites, knowledge-state og payoff.
- Storylet Matrix = hard compatibility mellom små kuraterte narrative moduler.
- Map generator = plasserer bare allerede-validerte kritiske storylets i egnede rom.
- Ambient/optional content legges på etterpå.

### Reference: CRYSTAL_MACHINE
Første eksperiment skal kunne generere en koherent variant med:
- maskin/port som i fiksjonen viser tre tomme fargede fester,
- én krystall via `SEARCH_SECRET` med clue + fail-forward,
- én via `NPC_FAVOR` med en faktisk reachable avhengighet,
- én via `GUARDIAN` med motivasjon og minst én ikke-voldelig affordance,
- retur til maskinen,
- bevisst innsetting/aktivering av krystallene,
- gate/climax først etter assembly.

Fargene kan roteres mellom acquisition-familiene hvis teksten fortsatt henger sammen.

### Work packages
Canonical plan: `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`.

- NG0: architecture/spec freeze
- NG1: graph data model + validator
- NG2: Storylet Matrix engine
- NG3: Crystal Machine graph planner
- NG4: room materialization + narrator knowledge
- NG5: >=1000 structural generated QA cases
- NG6: real Chromium interaction QA
- NG7: 10-20 manual generated-adventure editorial playtests
- NG8: accept/revise/abandon architecture gate

Do not convert another blueprint before NG8.

## UX5B scope etter Narrative Graph
Når Narrative Graph er bevist skal Forteller-visningen bli løsningsbevisst:
- vis reelle ikke-voldelige muligheter som faktisk støttes av dette kartet og story graphen,
- vis items/NPC-er/rom/companions som faktisk er relevante,
- skill mellom kjent/ukjent, eid/oppdagbart og tilgjengelig/blokkert,
- vis forsøkte/feilede tilnærminger når encounter-state gjør det nyttig,
- behold barnets frie løsninger via FRITT KAST,
- aldri presenter en lukket fasitliste.

## Adventure Code V1 - første bank
Kun fire eventyr er aktive:
- `GLASS_HEART`
- `WITCH_CAT`
- `CRYSTAL_MACHINE`
- `ZOMBIE_DELIVERY`

Ikke legg til flere blueprints nå.

Ny kvalitetsgate:
- `CRYSTAL_MACHINE` må først bevise Narrative Graph-modellen,
- deretter kan eksisterende blueprints konverteres én om gangen,
- alle fire må fortsatt spilles manuelt og vurderes narrativt før banken utvides.

## REPOSITORY HEALTH GATE
Repo-health-reparasjonen er fortsatt åpen parallelt.

UX5A kan rekonstrueres og verifiseres behaviorally fra Library-tekst + repoets patchkjede, men den opprinnelige V0.12.3 baseline-hashen er ikke byte-reprodusert fra Library-representasjonen og komplett runtime asset-tree mangler fortsatt som ordinære repo-filer.

Repository-health må lukkes før neste release checkpoint kan kalles låst.

## ETTER NARRATIVE GRAPH / UX-GATENE
1. **V0.12.4: resterende start-/fortellerutstyr + scenario-nøkler - 7**
2. Samledel-familier + EVNER - 15
3. Feller + mysterier - 12
4. Scenario-mål / samlingssteder / finale - 10

Disse content-utvidelsene skal ikke brukes til å skjule svakheter i Narrative Graph. Først må kritisk story-sammenheng fungere.