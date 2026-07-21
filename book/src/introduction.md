# Introduction

This book teaches software planning by doing one, end to end: a **BitTorrent client** written in **Rust**.

Scope is fixed up front so it doesn't creep as we go:

- We write the **client only**. Trackers (HTTP/UDP tracker servers) already exist and are treated as an external dependency we talk to over the wire.
- The client can read a `.torrent` file, talk to a tracker, talk to peers, download a file, verify it, and (later) seed it back.
- Language is Rust. That choice affects the plan — ownership, `async`, channels — so it's not incidental, it's a planning input.

The book has three parts:

1. **Part I** is the general method — the steps and artifacts you'd use to plan *any* non-trivial application, independent of what it does.
2. **Part II** applies that method to the torrent client, chapter by chapter, with diagrams for every major decision.
3. **Part III** shows how the plan becomes two living documents — `CLAUDE.md` and `PROGRESS.md` — that keep an AI assistant (or a teammate) aligned with the project as it's built, and how to repeat this whole process on your *next* app.

## How to read this

Don't just read — extract the pattern. Every time you see a decision made for the torrent client (e.g. "use one Tokio task per peer connection"), ask "what's the *general question* this answers?" ("how much concurrency, and at what granularity?"). Part III makes those general questions explicit again so you can reuse them.

## Diagrams

All diagrams are [Mermaid](https://mermaid.js.org/), rendered by [mdbook-mermaid](https://github.com/badboy/mdbook-mermaid). If you're reading the raw Markdown instead of the built book, the fenced ` ```mermaid ` blocks are still readable as text — they're diagrams-as-code, which is itself a planning technique: diagrams that live in version control and get reviewed in pull requests like everything else.
