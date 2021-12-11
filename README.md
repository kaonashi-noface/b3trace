<p align="center">
    <a href="https://app.circleci.com/pipelines/github/kaonashi-noface/b3trace?branch=main&filter=all"><img src="https://circleci.com/gh/kaonashi-noface/b3trace.svg?style=svg" alt="GitHub CircleCI Build"></a>
    <a href="https://github.com/mochajs/mocha#sponsors"><img src="https://img.shields.io/gitlab/coverage/no_face/b3trace/main" alt="GitHub Jest Coverage"></a>
</p>
<p align="center">
    <a href="https://github.com/mochajs/mocha/actions?query=workflow%3ATests+branch%3Amaster"><img src="https://img.shields.io/npm/v/b3trace" alt="npm version"></a>
    <a href="https://coveralls.io/github/mochajs/mocha"><img src="https://img.shields.io/npm/l/b3trace" alt="npm license"></a>
    <a href="https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fmochajs%2Fmocha?ref=badge_shield"><img src="https://img.shields.io/npm/dm/b3trace" alt="npm downloads"></a>
</p>

# Description

This module provides an Object representation of a B3 TraceContext based on the [OpenZipkin specifications](https://github.com/openzipkin/b3-propagation).
B3Trace lets you construct new Traces or a TraceContext from a parent TraceContext. It also provides simple functions

# Installation

```bash
npm i b3trace
```

# Usage

## New Trace

To construct a TraceContext of a brand new Trace:

```ts
const {initializeTrace} from 'b3trace';

const traceCtx = initializeTrace();
```

## TraceContext from an Existing Trace

To construct a TraceContext of an existing Trace, from an incoming TraceContext:

```ts
const {initializeTraceContext} from 'b3trace';

const b3 = '80f198ee56343ba864fe8b2a57d3eff7-e457b5a2e4d86bd1-1-05e3ac9a4f6e3b90;
const traceCtx = initializeTraceContext(b3);
```

### propagation

When the `propagation` flag is `true`, `initializeTraceContext` copies the incoming TraceContext. This means that the incoming
TraceContext and the current TraceContext will share the same node on a TraceContext tree.

When `propagation=true`:

```
   Client Tracer                                                  Server Tracer
┌───────────────────────┐                                       ┌───────────────────────┐
│                       │                                       │                       │
│   TraceContext        │          Http Request Headers         │   TraceContext        │
│ ┌───────────────────┐ │         ┌───────────────────┐         │ ┌───────────────────┐ │
│ │ TraceId           │ │         │ X-B3-TraceId      │         │ │ TraceId           │ │
│ │                   │ │         │                   │         │ │                   │ │
│ │ ParentSpanId      │ │ Inject  │ X-B3-ParentSpanId │ Extract │ │ ParentSpanId      │ │
│ │                   ├─┼────────>│                   ├─────────┼>│                   │ │
│ │ SpanId            │ │         │ X-B3-SpanId       │         │ │ SpanId            │ │
│ │                   │ │         │                   │         │ │                   │ │
│ │ Sampling decision │ │         │ X-B3-Sampled      │         │ │ Sampling decision │ │
│ └───────────────────┘ │         └───────────────────┘         │ └───────────────────┘ │
│                       │                                       │                       │
└───────────────────────┘                                       └───────────────────────┘
```

When `propagation=true`:

```
                           ┌───────────────────┐
 Incoming Headers          │   TraceContext    │
┌───────────────────┐      │ ┌───────────────┐ │
│ XXXX-TraceId      │──────┼─┼> TraceId      │ │
│                   │      │ │               │ │
│ XXXX-SpanId       │──────┼─┼> ParentSpanId │ │
└───────────────────┘      │ │               │ │      ┌──────────────┐
                           │ │  SpanId      <┼─┼──────│ ID Generator │
                           │ └───────────────┘ │      └──────────────┘
                           └───────────────────┘
```

When the `propagation` flag is `false`, `initializeTraceContext` will construct the new TraceContext similar to how a child span is constructed.
This means that the current TraceContext will:

-   share the trace identifier with the incoming TraceContext
-   have a parent span identifier with incoming TraceContext's span identifier
-   have a new, 16 hexadecimal length span identifier

# Upcoming Features

## TraceContext - getTraceContext(spanId: string): TraceContext

This method will retrieve a reference to a TraceContext with a given span identifier.
The intent will be to restructure the TraceContext as a recursive tree of TraceContext(s)
with referneces to parent and child TraceContext(s).

## TraceContext - constructor(traceContext: TraceContext): TraceContext

This constructor will deep copy an existing TraceContext Object.

## index - initializeTraceContext(b3Header: string, isPropagated = true): TraceContext

This constructor will construct a TraceContext from an existing TraceContext given a single
b3 header string.

For example:

```ts
const {initializeTraceContext} from 'b3trace';

const b3 = '80f198ee56343ba864fe8b2a57d3eff7-e457b5a2e4d86bd1-1-05e3ac9a4f6e3b90;
const traceCtx = initializeTraceContext(b3);
```

# License

Copyright 2021. Licensed [MIT](https://github.com/kaonashi-noface/b3trace/blob/main/LICENSE).
