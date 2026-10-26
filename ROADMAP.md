# MONSTERHULEN - ROADMAP

DATO: 2026-10-26
STATUS: V0.12.3 BASELINE + ACTIVE UX / ADVENTURE CODE PLAYTEST

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

## AKTIV PLAYTEST-REKKEFØLGE
1. Kartnavigasjon via tappbare `?` / lås / kjente nabrom.
2. FRITT KAST, tydelig narrator-frihet og ikke-forbrukende `BRUK`.
3. Nybegynner-DM-guide + seks faktiske D6-flater som input.
4. Adventure Code V1 + kuraterte blueprint-eventyr + separat fortellervisning.
5. **UX4: hard finale-progresjon + terningbasert oppdagelse av hemmelige dører.**

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

## NESTE UX-PASS ETTER UX4-MANUELLTEST
Forteller-visningen skal bli løsningsbevisst:
- vis reelle ikke-voldelige løsninger som faktisk finnes i akkurat dette kartet,
- vis items/NPC-er/rom som kan hjelpe et senere encounter,
- vis hvilke tilnærminger som er forsøkt/feilet når encounter-state innføres,
- behold barnets frie løsninger via FRITT KAST.

## REPOSITORY HEALTH GATE
Repo-health-reparasjonen er fortsatt åpen parallelt. Neste release checkpoint skal ikke låses før repoet kan rekonstruere hele aktive baseline uten chat/ekstern ZIP.

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
