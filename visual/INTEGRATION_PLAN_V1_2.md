# Monsterhulen — Visual Integration Plan V1.2

Status: **PREP ONLY — integration starts only after UX5A physical green + merge**

## Principle
Integrate the **visual language into Monsterhulen**, not Monsterhulen into the concept-image composition.

## Stage 0 — current prep
Complete now on `visual/visual-system-v1-prep`:
- direction correction,
- runtime-first CSS proof,
- state/agency rules from V1.1 retained,
- small runtime-surface asset batch specified,
- browser QA against exact patch-15 candidate.

No production runtime change.

## Stage 1 — safe shell after UX5A merge
Carry selectively:
- tokens,
- V1.2 cave/stone skin,
- accessibility/touch refinements,
- functional SVG symbols where they replace existing generic glyphs without changing actions.

Gate:
- all existing runtime functions unchanged,
- save compatibility unchanged,
- no player knowledge leak,
- browser + physical regression pass.

## Stage 2 — existing entity/item surfaces
Add approved art only to surfaces already supported by canonical IDs:
- encounter/entity portrait,
- inventory item art.

Do not change map topology/render semantics.

## Stage 3 — optional current-room sceneplate
Add sceneplate only when room presentation has enough canonical information to choose a safe family.

Rules:
- art is optional/fallback-safe,
- no art-defined exits or requirements,
- player-visible room identity remains DOM text,
- crop is responsive.

## Stage 4 — map visual refinement only if needed
First preference:
- improve current tile renderer with materials, glow, fog and state cues.

Only consider a new renderer if manual play shows a real usability/clarity problem that the canonical tile renderer cannot solve.

A replacement renderer must consume the same room/connection state and cannot introduce a fixed concept-art node composition by default.

## Stage 5 — story-specific interaction shells
Crystal Machine/gate visuals wait for Narrative Graph and interaction-shell state to exist canonically.

No generic crystal sockets or quest imagery may be added simply because they looked good in concept art.

## Non-goals
- no wholesale visual-branch merge,
- no redraw of the whole app before parity is proven,
- no image-driven navigation,
- no baked-in text UI,
- no hidden state encoded only in decoration,
- no full art-bank production before Batch 01 acceptance.
