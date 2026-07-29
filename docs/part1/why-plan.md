# Why Plan At All

Code you write without a plan still embodies a plan — it's just implicit, in your head, and it evaporates the moment you forget it or hand the project to someone else (including a future version of you, or an AI assistant with no memory between sessions).

Planning is the act of making that implicit plan **explicit, written, and checkable** before it's expensive to change.

## What planning actually buys you

- **Cheap changes get made early.** A wrong module boundary costs one Markdown edit before code exists. It costs a multi-file refactor after. Diagrams and docs are the cheapest place to be wrong.
- **Shared mental model.** Two engineers (or an engineer and an AI agent) working from the same written architecture will make compatible decisions independently. Working from "what's in my head" they won't.
- **A definition of done.** Without a written scope, "done" drifts. With one, you can point at the doc and say "that, not more."
- **A place to put "no."** Every project accumulates feature requests and scope creep mid-build. A written scope document is what you point to when saying no.

## What planning is *not*

- It's not writing exhaustive specs for every function before touching a keyboard. That's waterfall, and it fails because you learn things by building that you couldn't have known up front.
- It's not a one-time step. Plans are revised as you learn — the point is that revisions are visible (a diff to a doc) instead of invisible (a decision that only lives in someone's head).
- It's not bureaucracy for its own sake. Every artifact in this book earns its place by answering a question you'd otherwise re-answer inconsistently later.

## The core idea of this book

Planning a system is answering a fixed sequence of questions, each producing one artifact:

```mermaid
flowchart LR
    Q1["What problem?"] --> A1[Problem framing]
    Q2["What must it do?<br/>What won't it do?"] --> A2[Requirements & scope]
    Q3["What are the nouns?"] --> A3[Domain model]
    Q4["What are the boxes<br/>and arrows?"] --> A4[Architecture]
    Q5["What runs concurrently?"] --> A5[Concurrency model]
    Q6["What changes state,<br/>and how?"] --> A6[State machines]
    Q7["How does data move<br/>end to end?"] --> A7[Data flow]
    Q8["How is code organized?"] --> A8[Module layout]
    Q9["In what order<br/>do we build it?"] --> A9[Milestones]
    Q10["What could go wrong?"] --> A10[Risk analysis]
    Q11["How do we know<br/>it works?"] --> A11[Testing strategy]

    A1 --> Q2
    A2 --> Q3
    A3 --> Q4
    A4 --> Q5
    A5 --> Q6
    A6 --> Q7
    A7 --> Q8
    A8 --> Q9
    A9 --> Q10
    A10 --> Q11
```

Part II walks this exact sequence for the torrent client. Keep this diagram in mind — it's the skeleton the rest of the book hangs on.
