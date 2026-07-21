# Progress

## Milestones

- [x] Scaffold mdbook project (`book/`) + install mdbook-mermaid
- [x] Write SUMMARY.md structure (3 parts, 16 chapters)
- [x] Part I — general planning method (why-plan, toolkit, pipeline)
- [x] Part II — torrent client case study (11 chapters: problem framing through testing strategy)
- [x] Part III — CLAUDE.md/PROGRESS.md explanation + generalizing chapter
- [x] Root CLAUDE.md and PROGRESS.md for this repo
- [ ] `mdbook build` verified clean, mermaid diagrams confirmed rendering

## Log

- 2026-07-21: Full book written end-to-end covering the 11-step planning
  pipeline (problem framing → requirements/scope → domain model →
  architecture → concurrency → state machines → data flow → module layout
  → milestones → risk analysis → testing strategy), applied throughout to
  a Rust BitTorrent client (client-only, tracker out of scope). All
  diagrams as Mermaid (flowchart, sequenceDiagram, stateDiagram-v2,
  erDiagram, gantt). Next: build the book and spot-check rendering.

## Open questions

- None yet — book content is a first complete draft; revise chapters if
  gaps are found on build/read-through.
