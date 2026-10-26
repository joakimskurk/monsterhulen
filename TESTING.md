# MONSTERHULEN - TESTING

## Verification levels
Never conflate these states:
- implemented
- static/source verified
- automated runtime tests passed
- browser tested
- physical device tested
- editorial/manual narrative quality accepted

A future Narrative Graph can be structurally perfect and still fail the last category.

## Historical V0.12.3 release evidence
- Lasting thing 67 / 0
- Treasure 121 / 0
- Puzzle 4665 / 0
- NPC 4935 / 0
- Friend 4104 / 0
- Pet 6069 / 0
- Rescue 5070 / 0
- 11 inline JavaScript blocks, 0 syntax errors

These historical counts remain release evidence. The durable combined regression added during UX5A is listed separately below.

## Active UX5A automated evidence
Executed against the reconstructed active UX5A runtime before the latest device-findings hotfix:

- `tests/QA_SEARCHABLE_ROOMS_ENCOUNTER_TRACKS_UX5A.js`: **2216 PASS / 0 FAIL**
- `tests/QA_ADVENTURE_CODE_V1.js`: **405 PASS / 0 FAIL**
- `tests/QA_PROGRESSION_GATES_UX4.js`: **1797 PASS / 0 FAIL**
- `tests/QA_CONTENT_REGRESSION.js`: **5960 PASS / 0 FAIL**
- 11 inline JavaScript blocks: **0 syntax errors**

Reconstructed pre-hotfix runtime SHA-256:
`289e8c4194217b723ee8595635e147647a5853e8bc990f2037716f566b2659ca`

### UX5A search/encounter QA covers
- generic investigation state without pre-spoiling hidden-find rooms,
- deterministic optional hidden finds,
- 1/2/3 target finds for KORT/VANLIG/STORT where eligible,
- optional finds avoid story-critical rooms,
- search state persistence,
- first-low clue + repeated-low fail-forward,
- full inventory preserves revealed find,
- 3/4-heart monsters,
- 3/4-step encounter progress,
- legacy active combat not healed,
- physical die registration cannot mutate hearts/progress,
- explicit progress/combat/direct-solution resolution,
- save schema remains 12.

### Durable combined content regression
`tests/QA_CONTENT_REGRESSION.js` verifies:
- character trait/start-item build matrix,
- all 36 puzzle templates at all three age bands,
- 20 monster families / two variants each,
- NPC/friend/trap/mystery/treasure content bank integrity,
- generated encounter validation across tones and beats,
- reward offers across histories/scenario contexts,
- entity resolver integrity,
- all four Adventure Blueprints across lengths and puzzle age bands,
- generator/scenario/world/encounter/climax validators,
- companion placement.

## Chromium browser evidence before latest device hotfix
Real headless Chromium smoke against deterministic `CRYSTAL_MACHINE`: **23 PASS / 0 FAIL**.

Covers actual controls for room investigation, hidden-find clue/reveal, full backpack, exact physical die input with state separation, progress resolution, smart solution, 4-heart SPENNING combat, zero-heart resolution and 3-heart normal monster rendering.

## Device-findings hotfix evidence
Live physical playtest found:
1. ready story gate unlocked + traversed in one tap and quest key appeared unused,
2. embedded puzzle could be logically valid but fictionally unclear for a novice narrator.

Hotfix automated evidence:
- targeted Node regression: **19 PASS / 0 FAIL**
- targeted real Chromium smoke: **15 PASS / 0 FAIL**

Verified in Chromium:
- first ready-gate tap opens without movement,
- used scenario key leaves inventory with explicit fiction log,
- second tap traverses,
- puzzle narrator help renders,
- puzzle solve advances exactly one progress step.

Physical retest of these interactions is still required.

## Required physical-device gate before UX5A merge
Still required on actual iPad/mobile:
1. verify gate open-first / traverse-second behavior,
2. verify used quest key state is understandable,
3. verify embedded puzzle narrator help is immediately understandable,
4. confirm `SE DEG RUNDT` feels exploratory rather than mandatory,
5. confirm 3-4 progress steps do not feel like excessive bookkeeping,
6. verify hidden-find fail-forward and full-backpack flow by touch,
7. verify 3-heart normal and 4-heart SPENNING combat tap targets,
8. verify final `+ FREMGANG`, final heart and `LØST MED GOD IDÉ` interaction cost,
9. if possible, check representative legacy active-combat save,
10. recheck Adventure Code copy/paste flow.

Do not merge UX5A or implement Narrative Graph runtime until this gate is green.

## Narrative Graph V1 future verification contract
Canonical implementation plan: `docs/NARRATIVE_GRAPH_WORK_PACKAGE.md`.

### Level 1 - schema/static
Must prove:
- StoryGraph and StoryNode schema valid,
- stable storylet IDs,
- resource edges explicit,
- knowledge reveal rules explicit,
- all critical nodes declare setup/signal/action/payoff metadata.

### Level 2 - graph validator
Must reject:
- cycles in critical dependencies,
- prerequisite behind its own gate,
- story-critical dependency on generic UX5A optional find,
- required hidden node without clue + fail-forward,
- guardian without authored non-combat affordance,
- NPC favor whose requirement does not exist/reach,
- story fact exposed before reveal,
- critical storylet silently degraded into a bare pickup.

### Level 3 - generated structural QA
For `CRYSTAL_MACHINE` generate **at least 1000** valid adventures across seeds/lengths where supported.

Must check:
- three required crystals all reachable before assembly gate,
- all secondary dependencies reachable,
- default acquisition diversity uses three play families,
- no dependency cycles,
- no hidden optional-find dependency,
- gate cannot be bypassed by secrets/shortcuts,
- Adventure Code reconstructs same critical graph,
- seeded storylet selection is deterministic,
- existing UX4/UX5A regression remains green.

**1000/0 does not mean story quality is accepted.**

### Level 4 - real browser interaction QA
Must exercise actual controls for:
- quest requirement reveal,
- knowledge state not leaking before reveal,
- critical signalled search + fail-forward,
- NPC favor reveal/dependency/completion,
- guardian non-combat resolution,
- acquisition of all three resources,
- deliberate return/assembly,
- gate opening only after assembly.

### Level 5 - manual editorial gate
Before converting a second blueprint, manually play **10-20 generated CRYSTAL_MACHINE adventures**.

Record:
- whether the goal is understood from fiction,
- whether each crystal feels like a small story rather than loot,
- whether the three branches feel different in play,
- whether narrator guidance is sufficient without inventing missing causal links,
- whether free child solutions remain natural,
- whether return/assembly pays off setup,
- repeated or absurd combinations.

If manual play still requires frequent narrator repair, structural QA is not enough. Revise Storylet Matrix/storylets or abandon the architecture in favor of more hand-authored full scenarios.

### Level 6 - architecture decision gate
Only after manual evidence choose:
- accept Narrative Graph V1,
- revise and repeat,
- abandon in favor of more hand-authored scenario bank.

Do not port `GLASS_HEART`, `WITCH_CAT` or `ZOMBIE_DELIVERY` before this gate.

## UX5B testing relationship
UX5B is deferred until Narrative Graph V1 is accepted. When implemented, UX5B must consume explicit graph/knowledge/resource state instead of inferring critical story relationships from room placement alone.

## Reconstruction / provenance note
The Library text representation used for reconstructed runtime is behaviorally verified but not byte-identical to the original V0.12.3 manifest hash. This remains repository-health debt.

## Repository verification
Repository-health remains open. Before the next release checkpoint, the repository must reconstruct the full active source/assets/tests without chat or an external release ZIP.

## V0.12.4 acceptance gate
Deferred behind current UX/Narrative Graph work. Content expansion must not be used to mask unresolved story architecture.