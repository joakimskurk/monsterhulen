# MONSTERHULEN - DECISIONS

Only durable decisions that would be costly or confusing to lose belong here.

## 2026-10-23 - GitHub is the permanent source of truth
The connected `joakimskurk/monsterhulen` repository is the durable project workspace. Chat is temporary. No critical state, decision, test status or continuation point may exist only in chat.

Rationale: long chats have previously lost continuity. A fresh chat must be able to resume from repository state alone.

## 2026-10-22 - Product name is Monsterhulen
Visible product name is **Monsterhulen**. Core framing: the same cave is a little different every time, and each adventure becomes its own story.

Internal Eventyr*/HulerCharacterSystem names are intentionally retained unless a future migration provides concrete value.

## 2026-10-22 - Save migration remains backward compatible
Canonical storage key is `monsterhulen_v120`; `eventyrkryper_v100` is the first legacy key. State schema remains 12. Legacy saves are normalized and copied forward; legacy storage is not silently destroyed.

## 2026-10-21 - Physical dice are core interaction
The app never rolls dice digitally. Uncertain action uses physical 1D6. Relevant `EKSTRA GOD PÅ` uses physical 2D6 and highest die. Screen input records only `1-2`, `3-4`, or `5-6` and never auto-completes the scene.

## 2026-10-21 - Identity and mechanics stay separate
Hero type/species, selected trait and equipped start item are independent choices. Base hero art is state-neutral. Functional equipment is not baked into hero mechanics or inferred from species/archetype.

## 2026-10-21 - Items and companions are affordances, not bonuses
Start items, lasting TING, friends and pets can make a plan possible/easy and can inspire narrator cues. They do not grant generic +1/+2 or extra dice. Only the selected trait can trigger 2D6.

## 2026-10-21 - Puzzle solving is not a die check
Puzzle/logic content is part of the fictional world. Thinking/answering does not require D6. A later risky execution can use the normal physical dice rule.

## 2026-10-23 - Project-memory workflow is mandatory for now
At the start of a chat, read `PROJECT_STATE.md`, `ROADMAP.md`, `DECISIONS.md`, `TESTING.md`, then relevant source and recent history. After meaningful milestones, keep these files synchronized with reality before moving on.
