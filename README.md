# B3Trace

<a href="https://app.circleci.com/pipelines/github/kaonashi-noface/b3trace?branch=main&filter=all">
    <img src="https://circleci.com/gh/kaonashi-noface/b3trace.svg?style=svg" alt="CircleCI Build" />
</a>
<a href="https://coveralls.io/github/kaonashi-noface/b3trace?branch=main">
    <img src="https://coveralls.io/repos/github/kaonashi-noface/b3trace/badge.svg?branch=main" alt="Code Coverage" />
</a>
<img alt="npm" src="https://img.shields.io/npm/v/b3trace" />
<img alt="NPM" src="https://img.shields.io/npm/l/b3trace" />
<img alt="npm" src="https://img.shields.io/npm/dm/b3trace" />

# Description

This module provides an Object representation of a B3 TraceContext based on the
[OpenZipkin specifications](https://github.com/openzipkin/b3-propagation).
B3Trace lets you construct new Traces or a TraceContext from a parent
TraceContext.

# Installation

```bash
npm i b3trace
```

# Usage

## New Trace

To construct a TraceContext of a brand new Trace:

```ts
const {initializeTrace} from "b3trace";

const traceCtx = initializeTrace();
```

## TraceContext from an Existing Trace

To construct a TraceContext from an existing Trace given an incoming
TraceContext:

```ts
// ...other imports...
const {initializeTraceContext} from "b3trace";

async function handler(({headers}), context) {
    const traceId = headers["X-B3-TraceId"];
    const parentSpanId = headers["X-B3-ParentSpanId"];
    const spanId = headers["X-B3-SpanId"];
    const sampled = headers["X-B3-Sampled"];

    const traceCtx = initializeTraceContext({ traceId, spanId, parentSpanId, sampled });

    logger.info("Some logger message...", traceCtx.toJson());
    const user = await dynamoDb.getUser(/*...parameters...*/);

    //...some business logic...

    return {
        // ... return Https Response to API Gateway
    }
}

export {
    handler
}
```

### propagation

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

When the `propagation` flag is `true`, `initializeTraceContext` copies the
incoming TraceContext. This means that the incoming TraceContext and the current
TraceContext will share the same node on a TraceContext tree.

When `propagation=false`:

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

When the `propagation` flag is `false`, `initializeTraceContext` will construct
the new TraceContext similar to how a child span is constructed. This means that
the current TraceContext will:

- share the trace identifier with the incoming TraceContext
- have a parent span identifier that matches the incoming TraceContext"s span
  identifier
- have a new, 16 hexadecimal length span identifier

# Upcoming Features

## TraceContext - getTraceContext(spanId: string): TraceContext

This method will retrieve a reference to a TraceContext with a given span
identifier. The intent will be to restructure the TraceContext as a recursive
tree of TraceContext(s) with references to the parent and child TraceContext(s).

```ts
const {initializeTrace} from "b3trace";

// root TraceContext:
const traceCtx = initializeTrace();
// descendents of root TraceContext:
const childCtx1 = traceCtx.createChildContext();
const childCtx2 = traceCtx.createChildContext();
const childCtx3 = traceCtx.createChildContext();
// descendents of childCtx1 TraceContext:
const childCtx1_1 = childCtx1.createChildContext();
const childCtx1_2 = childCtx1.createChildContext();

// Should return direct descendent (childCtx3):
traceCtx.getTraceContext(childCtx3.getSpanId());
// Should return deep descendent (childCtx1_2):
traceCtx.getTraceContext(childCtx1_2.getSpanId());

// Should NOT return because (root TraceContext) is NOT a descendent of childCtx1_2:
childCtx1_2.getTraceContext(childCtx1_2.getSpanId());
```

## TraceContext - constructor(traceContext: TraceContext): TraceContext

This constructor will deep copy an existing TraceContext Object.

```ts
const {TraceContext} from "b3trace";

// assume this TraceContext was constructed from incoming headers:
const traceCtx = initializeTraceContext(/*...assume headers were propagated...*/);
const traceCtxDeepCopy = new TraceContext(traceCtx);
```

## index - initializeTraceContext(b3Header: string, isPropagated = true): TraceContext

This constructor will construct a TraceContext from an existing TraceContext
given a single b3 header string.

For example:

```ts
const {initializeTraceContext} from "b3trace";

const b3 = "80f198ee56343ba864fe8b2a57d3eff7-e457b5a2e4d86bd1-1-05e3ac9a4f6e3b90";
const traceCtx = initializeTraceContext(b3);
```

# License

Copyright 2021. Licensed
[MIT](https://github.com/kaonashi-noface/b3trace/blob/main/LICENSE).
