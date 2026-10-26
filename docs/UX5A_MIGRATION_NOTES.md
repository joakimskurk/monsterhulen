# UX5A migration notes

`migrateState()` calls encounter enrichment when an existing save is loaded. UX5A must therefore be idempotent.

Required behavior:
- every room receives a normalized investigation state, including rooms with no hidden find,
- existing `room.search` state is preserved on reload; investigation/search attempts, reveal state, taken state and the assigned optional item must not reset,
- deterministic hidden-find planning only fills missing optional-find slots; it must not reshuffle already-assigned finds during re-enrichment,
- untouched legacy generated monsters on the old 1–2 heart scale may be upgraded to the new full 3–4 heart scale,
- an already-started legacy fight keeps its actual remaining heart count when max hearts are upgraded; migration must not heal it,
- existing non-treasure encounters receive a progress track only when they do not already have one,
- no state schema bump is needed because the new fields are optional nested runtime fields and state version 12 remains backward compatible.
