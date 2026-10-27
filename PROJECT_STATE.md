# MONSTERHULEN - PROJECT STATE (VISUAL PREP)

Updated: 2026-10-27
Current branch: `visual/visual-system-v1-prep`
Status: **PARALLEL VISUAL PREP ONLY**
Runtime branch: `ux5/searchable-rooms-encounter-tracks`
Runtime baseline used to create this branch: `b84ebe410679773e6833bf06fcd75bca449a5b89`
Architecture prep branch: `narrative/story-graph-v1-prep`
Current visual work item: **Visual Direction V1.2 — fit concept-art feel to actual Monsterhulen runtime**

## Runtime gate is unchanged
UX5A patch 15 is still waiting for physical iPad/mobile certification.

Exact tested patch-15 candidate SHA-256:
`f8e9998fc9085741e1032b4347d4a75a3e792c57ebd64552fe93c2ee87ae1466`

Do not merge visual work into active runtime or `main` before that gate is green.
Do not implement Narrative Graph runtime, UX5B or Multiscreen from this branch.

## Direction correction — V1.2
User review on 2026-10-27 identified a real art-direction problem: V1/V1.1 had begun using generated concept images too literally as layout templates.

Canonical V1.2 correction:

**Concept images are mood/material references, not composition references.**

The actual Monsterhulen runtime remains the visual substrate.

Keep:
- warm torchlight vs cool cave darkness,
- friendly saturated fantasy accents,
- tactile depth/material feel,
- child-safe wonder,
- richer illustrations where they map safely to canonical state.

Do not copy:
- fixed illustrated diorama-node map,
- parchment as default gameplay panel material,
- concept-image header/navigation/bottom-HUD composition,
- ornamental banner structure,
- Crystal Machine imagery as generic product identity,
- art-defined topology or hidden story facts.

Canonical direction doc:
`visual/VISUAL_DIRECTION_V1_2.md`

## V1.2 runtime-first proof
New artifacts:
- `visual/runtime-skin-v1_2.css`
- `visual/VISUAL_DIRECTION_V1_2.md`
- `visual/VISUAL_QA_V1_2_2026-10-27.md`
- `visual/INTEGRATION_PLAN_V1_2.md`
- `visual/ASSET_BATCH_01_V1_2.md`
- `tests/QA_VISUAL_DIRECTION_V1_2.js`

Verification:
- static direction contract **16 PASS / 0 FAIL**,
- exact patch-15 + V1.2 Chromium **14 PASS / 0 FAIL**.

Browser verification confirms:
- adventure still starts,
- canonical generated map remains present,
- current-room highlight remains,
- one canonical room badge remains,
- search and Forteller controls remain,
- default gameplay cards use dark cave/stone surfaces rather than parchment,
- tablet/mobile have no horizontal overflow,
- mobile tabs remain,
- Forteller target remains >=48 CSS px.

Harness caveat remains: CDP runtime uses in-memory localStorage, so native persistence/clipboard and physical touch remain UX5A physical-gate items.

## V1.1 retained as interaction research, not target composition
V1.1 remains useful for:
- selected != current,
- map inspection != movement,
- explicit travel/action,
- locked/blocked/unknown state language,
- hidden-state protection,
- inventory affordance != auto-use,
- narrator authored/improv/state separation,
- conditional combat presentation,
- multi-cell room warning,
- component-state matrix,
- SVG functional symbols.

The V1.1 node-map/diorama composition is **not production direction**.

## Material hierarchy V1.2
### Default gameplay
Dark blue/charcoal cave stone with restrained texture and warm local edge-light.

### Accents
Wood/bronze used sparingly for room identity, selected state and tactile controls.

### Parchment
Reserved for setup/resume/story inserts or fictionally appropriate letters/books/clues. Not the default gameplay shell.

## Map direction
The current generated map stays authoritative.

Near-term refinement:
- current-room area glow,
- calmer visited treatment,
- clearer fog/unknown state,
- lock/block connection treatment derived from canonical state,
- subtle cave-depth/material styling.

Do not turn all rooms into pre-authored illustrated nodes.

## Art placement V1.2
Art is layered into existing runtime surfaces instead of defining layout.

Priority:
1. existing entity/encounter portraits,
2. existing inventory slots,
3. optional current-room sceneplate when canonical state can choose a safe family,
4. small decorative ambience that cannot be mistaken for state.

New first-batch spec:
`visual/ASSET_BATCH_01_V1_2.md`

Batch 01 now excludes map-room dioramas.
Proof assets:
- `CAVE_GENERIC` current-room sceneplate,
- `MUSHROOM` current-room sceneplate,
- `UNDERGROUND_LAKE` current-room sceneplate,
- `NPC_OWL_LIBRARIAN` portrait,
- key, rope, lantern and generic non-story crystal inventory icons.

No full bank before this proof batch is manually/browser accepted.

## Integration sequence after UX5A merge
Canonical V1.2 integration plan:
`visual/INTEGRATION_PLAN_V1_2.md`

Order:
1. safe tokens + cave/stone shell + accessibility/touch refinements,
2. existing entity/item art surfaces,
3. optional current-room sceneplates,
4. map renderer refinement only if manual testing shows a real need,
5. story-specific interaction shells only after Narrative Graph provides canonical state.

Do not merge the visual branch wholesale.

## Stable IDs / asset contract
Existing runtime Asset Contract 2.4.0 remains authoritative. No parallel IDs.

Examples preserved:
- `CHAR_HERO_14`
- `NPC_OWL_LIBRARIAN`
- `MONSTER_TRADER_CRAB`
- `MONSTER_STONE_GOLEM`
- `TRAP_RAINBOW_NET`
- `MYSTERY_WRITING_BOOK`
- `TREASURE_GLASS_MARBLE`

## Binding visual constraints
- concept art = art direction, not UI bitmap/layout,
- runtime interaction model stays recognizable,
- browser owns text and interactive controls,
- no baked-in UI text in world art,
- one visible room identity per room,
- art cannot invent exits, locks, keys, NPCs, clues, resources or rewards,
- icons supplement labels,
- no hidden-knowledge leak,
- no auto-use of possessed resources,
- primary touch target >=48 CSS px,
- physical/editorial review remains necessary even with green browser QA.

## Repository health
Still open: exact release/runtime/assets are not yet byte-reconstructable from ordinary repo files alone.

## Exact next safe visual action
Do **not** return to the old node-map composition.

Next safe visual work is to create and test the small `ASSET_BATCH_01_V1_2` against the real runtime-style surfaces, then revise before any larger art production.

When physical UX5A becomes GREEN, return to the runtime transition sequence first. Visual integration remains a separate later package.
