# Data Flow

Pick the scenarios that matter most and trace them end to end through the architecture. This is where architectural gaps get caught — if you can't draw the arrow, the box on either end is wrong or missing.

## Scenario 1: Startup, from `.torrent` file to first peer connection

```mermaid
sequenceDiagram
    actor User
    participant Main as CLI/main
    participant Parser as Torrent Parser
    participant TC as Tracker Client
    participant Tracker as External Tracker
    participant PM as Peer Manager
    participant Conn as PeerConnection task

    User->>Main: run client.torrent
    Main->>Parser: parse(bytes)
    Parser-->>Main: Torrent{info_hash, pieces, files, announce}
    Main->>TC: announce(Torrent)
    TC->>Tracker: GET /announce?info_hash=...&peer_id=...&port=...
    Tracker-->>TC: bencoded {peers: [...], interval: 1800}
    TC-->>Main: Vec<PeerAddr>
    Main->>PM: connect_to(peers)
    loop for each peer (up to max concurrent)
        PM->>Conn: spawn task
        Conn->>Conn: TCP connect + handshake
    end
```

Gap this catches: without drawing this, it's easy to forget that the tracker response's `interval` field means we must **re-announce periodically**, not just once at startup — that requirement wasn't obvious from the architecture diagram alone. A re-announce loop (its own long-lived Tokio task, per [Concurrency Model](./05-concurrency.md)) fires every `interval` seconds and also on completion (`event=completed`) and shutdown (`event=stopped`), per the tracker protocol's `event` field from F2.

## Scenario 2: Downloading and verifying one piece

```mermaid
sequenceDiagram
    participant Conn as PeerConnection (peer A)
    participant PM as PieceManager
    participant Disk as Disk Writer

    Conn->>PM: PeerHasPiece(peer_A, piece_7)   %% from bitfield/have
    PM->>PM: mark piece_7 available from peer_A
    Conn->>PM: ReadyForWork(peer_A)            %% unchoked & interested
    PM-->>Conn: AssignBlock(piece_7, offset=0, len=16KB)
    Conn->>Conn: send `request` message to peer A
    Conn-->>PM: BlockReceived(piece_7, offset=0, bytes)
    PM->>PM: store block, check if piece_7 complete
    PM-->>Conn: AssignBlock(piece_7, offset=16KB, len=16KB)
    Note over PM: ...repeat until all blocks of piece_7 received...
    PM->>PM: SHA-1(piece_7 bytes) == known hash?
    alt hash matches
        PM->>Disk: WritePiece(piece_7, bytes)
        PM->>PM: mark piece_7 Verified
    else hash mismatch
        PM->>PM: mark piece_7 Missing again (see state machine)
    end
```

Gap this catches: `PieceManager` needs to know not just "give me a block" but **which peer is asking**, so that on failure/disconnect it can reassign only that peer's in-flight blocks — this pushes `peer_id` into the channel message shapes decided in [Concurrency Model](./05-concurrency.md).

## Scenario 3: Peer disconnects mid-download

```mermaid
sequenceDiagram
    participant Conn as PeerConnection (peer A)
    participant PM as PieceManager
    participant Other as PeerConnection (peer B)

    Note over Conn: socket read times out
    Conn->>PM: PeerDisconnected(peer_A)
    PM->>PM: find blocks in-flight to peer_A,<br/>mark those pieces Missing/InFlight-elsewhere
    Conn->>Conn: task exits
    Other->>PM: ReadyForWork(peer_B)
    PM-->>Other: AssignBlock(<one of the freed blocks>)
```

This is the data-flow proof that the resilience requirement (NF2) is actually satisfiable with the architecture and state machines as designed — not just asserted in prose.

## Scenario 4: Serving a piece back to a peer (seeding, F11)

Seeding is the *mirror image* of scenario 2 — tracing it catches whether `PeerConnection` and `PieceManager` can handle both directions of the same relationship without a redesign:

```mermaid
sequenceDiagram
    participant Remote as Remote peer (leecher)
    participant Conn as PeerConnection (their socket)
    participant PM as PieceManager
    participant Disk as Disk Reader

    Remote->>Conn: request(piece_3, offset=0, len=16KB)
    Conn->>PM: HaveWeGotPiece(piece_3)?
    PM-->>Conn: yes, Verified
    Conn->>Disk: read_block(piece_3, offset=0, len=16KB)
    Disk-->>Conn: bytes
    Conn->>Remote: piece(piece_3, offset=0, bytes)
```

Gap this catches: the `Disk Writer` box from [System Architecture](./04-architecture.md) needs a *read* path, not just a write path — "Disk Writer" was named for its v1 responsibility, but once F11 is in scope it's really a `Disk` component with both `write_piece` and `read_block`. Renaming it (or explicitly splitting into `DiskWriter`/`DiskReader`) is a small architecture-doc revision surfaced only by tracing this scenario — exactly the "revise" loop described in [The Planning Pipeline](../part1/pipeline.md).

## A gap worth naming without a full diagram: endgame mode

Near the end of a download, only a few pieces remain, each potentially in-flight to a single slow peer — the classic "last piece takes forever" problem. A real client's fix (**endgame mode**: once few enough blocks remain, request the same block from multiple peers simultaneously and cancel the losers) is explicitly **not required for v1** per the non-goals in [Requirements & Scope](./02-requirements.md). It's called out here, in data flow, rather than silently ignored, because tracing scenario 2 is what makes the "last-piece-slow-peer" failure mode visible in the first place — the value of drawing the diagram is noticing the gap, even when the deliberate decision is to defer it.

## What tracing data flow told us that the architecture diagram didn't

Notice `PeerManager` barely appears in these sequences after startup — its job is connection lifecycle, not data flow, which confirms the architecture chapter's claim that it "does not itself speak the wire protocol." If it *had* shown up needing to route piece data, that would be a sign the architecture diagram drew the wrong boundary — this is the "revise" loop from [The Planning Pipeline](../part1/pipeline.md) in action.
