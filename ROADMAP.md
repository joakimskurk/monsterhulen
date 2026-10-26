# MONSTERHULEN - ROADMAP

DATO: 2026-10-26
STATUS: V0.12.3 BASELINE + UX5A SEARCH / ENCOUNTER-STATE CANDIDATE ON BRANCH

## LÅSTE PRINSIPPER
- Fortellingskvalitet slår kombinasjonsmengde. Få gode eventyr er bedre enn tusen middelmådige.
- Kritisk historie bygges fra kuraterte Adventure Blueprints. Seed varierer bare trygge detaljer.
- Finaler må opptjenes gjennom en eksplisitt story prerequisite.
- Hemmelige dører må oppdages og kan aldri omgå story-gates.
- Den samme Monsterhulen er litt annerledes hver gang man går inn.
- Barnet foreslår handlinger; appen støtter, den bestemmer ikke fasiten.
- Fysisk 1D6 ved usikker handling; relevant EKSTRA GOD PÅ gir fysisk 2D6, bruk høyeste.
- Appen genererer aldri terningresultat.
- Puzzle/gjetning trenger ikke terning i seg selv.
- Ting, venner og kjæledyr åpner muligheter, men gir ikke bonusdie.
- Ingen innholdsobjekter skal bli skjulte obligatoriske nøkler med mindre de eksplisitt er scenario-nøkler.
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

## PLAYTEST-REKKEFØLGE
1. Kartnavigasjon via tappbare `?` / lås / kjente nabrom.
2. FRITT KAST, tydelig narrator-frihet og ikke-forbrukende `BRUK`.
3. Nybegynner-DM-guide + seks faktiske D6-flater som input.
4. Adventure Code V1 + kuraterte blueprint-eventyr + separat fortellervisning.
5. **UX4: hard finale-progresjon + terningbasert oppdagelse av hemmelige dører.** Runtime-verifisert.
6. **UX5A: romundersøkelse + valgfrie skjulte funn + eksplisitt encounter-state.** Implementert som firepatch-kandidat; full runtime-QA gjenstår.
7. **UX5B: kartbevisst løsningsgraf i Forteller-visningen.** Blokkert til UX5A er runtime-verifisert.

### UX5A acceptance
Før UX5A kan markeres ferdig:
- alle rom kan undersøkes uten at UI røper hvilke rom som har skjulte funn,
- KORT/VANLIG/STORT får henholdsvis minst 2/3/4 deterministiske valgfrie funn når nok rom er egnet,
- funn ligger aldri i start/finale/story-critical/ambient-treasure-rom og kan aldri være story prerequisites,
- første 1-2 på usikkert hidden-find-søk gir sterkere hint; gjentatt lavt resultat fail-forwarder og kan ikke softlocke funnet,
- full sekk kan aldri slette et avslørt funn,
- nye normale monster har 3 hjerter, `SPENNING` 4,
- normale genererte ikke-skatt-encounters har 3 steg fremgang, `SPENNING` 4,
- registrering av fysisk terning kan ikke automatisk fylle fremgang eller fjerne monsterhjerter/encounter,
- siste eksplisitte fremgangssteg løser møtet,
- siste eksplisitte monsterhjerte løser kamp etter at barnet har valgt kamp,
- en virkelig avgjørende fri løsning kan markeres eksplisitt som `LØST MED GOD IDÉ`,
- urørte legacy-monstre oppgraderes fullt, mens en allerede-startet legacy-kamp ikke får tilbake hjerter,
- UX4/Adventure Code og eksisterende innholds-QA forblir grønne,
- iPad-smoke-test bekrefter at undersøkelse og progress ikke føles som tvungen bookkeeping.

### UX5B scope
Når UX5A er grønn skal Forteller-visningen bli løsningsbevisst:
- vis reelle ikke-voldelige muligheter som faktisk støttes av akkurat dette kartet,
- vis items/NPC-er/rom/companions som kan hjelpe et senere encounter,
- skill mellom ressurser helten har og ressurser som finnes et annet sted,
- vis forsøkte/feilede tilnærminger når encounter-state gjør det nyttig,
- behold barnets frie løsninger via FRITT KAST,
- aldri presenter en lukket fasitliste.

### Adventure Code V1 - første bank
Kun fire eventyr er aktive før videre utvidelse:
- `GLASS_HEART`
- `WITCH_CAT`
- `CRYSTAL_MACHINE`
- `ZOMBIE_DELIVERY`

Gate før flere blueprints:
- spill alle fire manuelt,
- bekreft at finalen ikke kan nås før prerequisite,
- vurder om prerequisite faktisk føles som et meningsfullt midtpunkt,
- oppgrader enkle funn til NPC-quest/puzzle der historien trenger mer tyngde,
- bekreft minst én reell ikke-voldelig vei gjennom story-kritiske encounters,
- bekreft samme kode på iPad/mobil gir samme kart og kritiske plan,
- dokumenter konkrete svakheter før flere eventyr legges til.

## REPOSITORY HEALTH GATE
Repo-health-reparasjonen er fortsatt åpen parallelt. UX5A kan ikke runtime-sertifiseres eller merges før den kanoniske runtime-baselinen kan rekonstrueres som faktiske filer og patchkjeden kan kjøres mot den.

## ETTER UX / ADVENTURE CODE-GATEN
1. **V0.12.4: resterende start-/fortellerutstyr + scenario-nøkler - 7**
   - `ITEM_WITCH_BROOM`
   - `ITEM_SHOVEL`
   - `SCENARIO_KEY_BONE`
   - `SCENARIO_KEY_RUST`
   - `SCENARIO_KEY_GLASS`
   - `SCENARIO_KEY_FEATHER`
   - `SCENARIO_KEY_ROOT`
2. Samledel-familier + EVNER - 15
3. Feller + mysterier - 12
4. Scenario-mål / samlingssteder / finale - 10
