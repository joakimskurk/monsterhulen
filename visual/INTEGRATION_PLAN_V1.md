# Visual Integration Plan V1

Status: **prepared while UX5A physical gate is open**.

## Why integration is deferred
The exact patch-15 candidate is the artifact that still needs physical iPad/mobile certification. Replacing its renderer/CSS before that test would destroy the meaning of the gate.

Therefore this branch contains visual prep and prototypes only.

## Phase V0 — now
Complete on this branch:
- design tokens,
- runtime-safe CSS override prototype,
- future node-map vertical slice,
- room-art/asset contract,
- responsive rules,
- static QA contract.

## Phase V1 — after UX5A physical GREEN + merge
Create/continue from merged `main`.

1. Apply tokens and surface/button styling without changing state semantics.
2. Browser-test current map/search/encounter/DM/save flows.
3. Physical touch-test visual-only layer.
4. Only then evaluate node-map renderer as a separate change.

## Phase V2 — room art
Introduce deterministic presentation mapping:

`room canonical state -> presentation tags -> room art family -> asset variant`

The mapping must not alter story generation and must not be serialized as required story truth unless needed for deterministic Adventure Code reconstruction.

## Phase V3 — node map renderer experiment
Requirements:
- source still canonical room IDs/connections,
- locked/blocked/secret/revealed states preserved,
- no inaccessible room becomes clickable,
- no visual edge invents a connection,
- active room canonical name appears once,
- fallback renderer remains available until parity tests pass.

## Phase V4 — interaction-shell visual polish
After Narrative Graph reaches the package that implements shells:
- slot gate,
- assembly,
- NPC favor,
- merchant/trade,
- puzzle,
- combat,
- reward choice,
- search/inspect.

Visual shell may present an action but never own hidden story logic.

## Acceptance layers
Separate evidence:
- CSS/HTML static checks,
- browser DOM interaction,
- responsive viewport checks,
- physical iPad/mobile touch/readability,
- editorial visual review with child/narrator,
- gameplay/story regression.

A pretty screenshot is never acceptance evidence by itself.
