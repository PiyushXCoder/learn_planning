# learn_planning

## What this repo is

A VitePress site teaching software planning method, using a Rust BitTorrent **client** (no tracker — trackers already exist, treated as external) as the worked example.

Book source: `docs/`. Built with `vitepress` + `vitepress-plugin-mermaid` (deps in root `package.json`, installed via `pnpm install`). Nav/sidebar config lives in `docs/.vitepress/config.mjs`.

## Structure

- Part I (`docs/part1/`) — general 11-step planning method, domain-independent.
- Part II (`docs/part2/`) — the method applied to the torrent client, one chapter per step, each with Mermaid diagrams.
- Part III (`docs/part3/`) — how the plan becomes `CLAUDE.md`/`PROGRESS.md`, and how to reuse the method elsewhere.

## Non-goals

- This repo does not contain the actual torrent client implementation — it's the *planning book only*. If asked to implement the client, that's a new, separate project (the book's own Part III explains why implementation should follow the plan, not replace it).
- Don't add a tracker implementation — explicitly out of scope per the book's own scope chapter.

## Conventions when editing the book

- Every new chapter goes in `docs/partN/` and must be added to the `sidebar` (and usually `nav`) in `docs/.vitepress/config.mjs` or VitePress won't list it.
- Diagrams are Mermaid, fenced with ` ```mermaid `, rendered by `vitepress-plugin-mermaid` (wired in via `withMermaid()` in `docs/.vitepress/config.mjs`). Don't add other diagram tooling.
- Keep chapters cross-linked with relative Markdown links (e.g. `[Requirements & Scope](./02-requirements.md)`) — the book leans on this to show how decisions trace through the pipeline.
- Prose style: teach the *general question* behind every specific decision, not just the decision itself (see Part III, "Applying This Method To Your Own App").

## Build

```
pnpm install
pnpm docs:dev      # live preview
pnpm docs:build    # output in docs/.vitepress/dist/
```
