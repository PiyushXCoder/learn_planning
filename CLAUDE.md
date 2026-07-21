# learn_planning

## What this repo is

An mdBook teaching software planning method, using a Rust BitTorrent **client** (no tracker — trackers already exist, treated as external) as the worked example.

Book source: `book/src/`. Built with `mdbook` + `mdbook-mermaid` (already installed via `cargo install mdbook-mermaid`; `mdbook-mermaid install book` already run, config lives in `book/book.toml`).

## Structure

- Part I (`book/src/part1/`) — general 11-step planning method, domain-independent.
- Part II (`book/src/part2/`) — the method applied to the torrent client, one chapter per step, each with Mermaid diagrams.
- Part III (`book/src/part3/`) — how the plan becomes `CLAUDE.md`/`PROGRESS.md`, and how to reuse the method elsewhere.

## Non-goals

- This repo does not contain the actual torrent client implementation — it's the *planning book only*. If asked to implement the client, that's a new, separate project (the book's own Part III explains why implementation should follow the plan, not replace it).
- Don't add a tracker implementation — explicitly out of scope per the book's own scope chapter.

## Conventions when editing the book

- Every new chapter goes in `book/src/partN/` and must be added to `book/src/SUMMARY.md` or mdbook won't include it.
- Diagrams are Mermaid, fenced with ` ```mermaid `, rendered by the `mdbook-mermaid` preprocessor already configured in `book.toml`. Don't add other diagram tooling.
- Keep chapters cross-linked with relative Markdown links (e.g. `[Requirements & Scope](./02-requirements.md)`) — the book leans on this to show how decisions trace through the pipeline.
- Prose style: teach the *general question* behind every specific decision, not just the decision itself (see Part III, "Applying This Method To Your Own App").

## Build

```
cd book && mdbook build      # output in book/book/
cd book && mdbook serve      # live preview
```
