# MONSTERHULEN - ROADMAP

DATO: 2026-10-23
STATUS: KANONISK ETTER V0.12.3, REPO-HEALTH GATE AKTIV

## LÅSTE PRINSIPPER
- Den samme Monsterhulen er litt annerledes hver gang man går inn.
- Barnet foreslår handlinger; appen støtter, den bestemmer ikke fasiten.
- Fysisk 1D6 ved usikker handling; relevant EKSTRA GOD PÅ gir fysisk 2D6, bruk høyeste.
- Appen registrerer bare `1-2`, `3-4`, `5-6`.
- Puzzle/gjetning trenger ikke terning i seg selv.
- Ting, venner og kjæledyr åpner muligheter, men gir ikke bonusdie.
- Ingen innholdsobjekter skal bli skjulte obligatoriske nøkler med mindre de eksplisitt er scenario-nøkler.
- GitHub-repoet er permanent source of truth. Kritisk prosjektstatus skal ikke finnes bare i chat.

## FERDIG
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
- Repo-memory: `PROJECT_STATE.md`, `DECISIONS.md`, `TESTING.md` og arbeidsworkflow etablert.

## NÅVÆRENDE ARBEIDSPAKKE: REPOSITORY HEALTH BASELINE
Etter dette steget skal en ny ChatGPT-chat kunne fortsette fra repoet alene.

Acceptance gate:
1. kanonisk V0.12.3 runtime/source finnes i repoet eller kan rekonstrueres derfra uten chat/ZIP,
2. assetarkiv og hashes kan verifiseres,
3. `scripts/verify_repo.py` passerer,
4. prosjektminnefilene samsvarer med faktisk repo,
5. browser/device-verifisering beskrives ærlig.

## DERETTER
1. **V0.12.4: resterende start-/fortellerutstyr + scenario-nøkler - 7**
   - `ITEM_WITCH_BROOM`
   - `ITEM_SHOVEL`
   - `SCENARIO_KEY_BONE`
   - `SCENARIO_KEY_RUST`
   - `SCENARIO_KEY_GLASS`
   - `SCENARIO_KEY_FEATHER`
   - `SCENARIO_KEY_ROOT`
2. **Samledel-familier + EVNER - 15**
3. **Feller + mysterier - 12**
4. **Scenario-mål / samlingssteder / finale - 10**

## V0.12.4 VERIFISERING
De sju entity-ID-ene og resolver-pathene skal bevares. Kun art/content identity-pass, ingen gameplay- eller save-schemaendring. Asset Contract 2.4.0 gjelder. Full repo-verifikasjon kjøres før milepælen lukkes.
