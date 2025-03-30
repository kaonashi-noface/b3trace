# B3Trace

<p align="center">
    <a href="https://www.npmjs.com/package/b3trace">
        <img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt="CircleCI Build" />
    </a>
    <a href="https://www.npmjs.com/package/b3trace?activeTab=versions">
        <img alt="npm" src="https://img.shields.io/npm/v/b3trace" alt="NPM Versions" />
    </a>
</p>
<p align="center">
    <a href="https://app.circleci.com/pipelines/github/kaonashi-noface/b3trace?branch=main&filter=all">
        <img src="https://circleci.com/gh/kaonashi-noface/b3trace.svg?style=svg" alt="CircleCI Build" />
    </a>
    <a href="https://coveralls.io/github/kaonashi-noface/b3trace?branch=main">
        <img src="https://coveralls.io/repos/github/kaonashi-noface/b3trace/badge.svg?branch=main" alt="Code Coverage" />
    </a>
</p>

# Description

This module provides an Object representation of a B3 TraceContext based on the
[OpenZipkin specifications](https://github.com/openzipkin/b3-propagation).

B3Trace allows you to construct TraceContext(s) to:

- start a new trace
- continue a trace TraceContext
- parse TraceContext into different types (e.g. string, json, etc.)

# Installation

```bash
npm i b3trace
```

# Usage

## Construct a new Trace

To construct a TraceContext of a brand new Trace:

```ts
import { create } from "b3trace";

const headCtx = create();
```

## Construct a TraceContext from an Existing Trace

To construct a TraceContext from incoming trace headers:

```ts
// ...other imports...
import * as b3 from "b3trace";
import { toJson } from "b3trace/TraceContext";

async function handler(({headers}), context) {
    // Construct trace from incoming HTTP headers
    const traceCtx = b3.from(new Headers(headers));
    // Attach trace information to logger's context
    logger.setContext(toJson(traceCtx));

    logger.info("Some logger message...");
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

## Construct a child TraceContext

To construct a child TraceContext:

```ts
// ...other imports...
import * as b3 from "b3trace";
import { child, toJson } from "b3trace/TraceContext";

async function handler(({headers}), context) {
    // Construct trace from incoming HTTP headers
    const traceCtx = b3.from(new Headers(headers));
    // Attach trace information to logger's context
    logger.setContext(toJson(traceCtx));

    // After scrubbing token...
    const authCtx = child(traceCtx);
    const childLogger = logger.child(authCtx);
    const jwtToken = headers["Authorization"];
    await validateToken(jwtToken, childLogger);

    //...some business logic...
}

export {
    handler
}
```

## Forward Legacy Single B3 Header

Some systems compress all B3 trace information into a single `b3` header value:

https://github.com/openzipkin/b3-propagation?tab=readme-ov-file#single-header

To compress and forward a TraceContext into a single header:

```ts
// Some import...
import * as b3 from "b3trace";
import { toHeaderString } from "b3trace/TraceContext";

// Construct TraceContext...
const traceCtx = b3.from(new Headers(headers));
// Compress TraceContext into single value
const b3 = toHeaderString(traceCtx);
const res = await axios.get(
    "https://some.domain.com/domain/v1/resource",
    {
        headers: {
            Authorization: "Bearer some-jwt-token",
            b3,
        },
    },
);
```

# About

## propagation

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

When the `propagation` flag is `true`, `from` copies the incoming trace headers
into the new TraceContext. This means that the incoming TraceContext and the
current TraceContext will share the same node on a TraceContext tree.

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

When the `propagation` flag is `false`, `from` will construct the new
TraceContext similar to how a child span is constructed. This means that the new
TraceContext will:

- share the same trace identifier with the incoming trace headers
- have a parent span identifier that matches the incoming span identifier
- have a new, 16 hexadecimal length span identifier

# Upcoming Features

## Deno

This package will soon be published to [JSR](https://jsr.io/) with Deno support.

TypeScript cannot transpile to javascript when `allowImportingTsExtensions` is
enabled. This makes serving node and Deno modules from the same repository
difficult given that Deno requires `*.ts` file extension imports, but `tsc`
cannot generate files without `allowImportingTsExtensions`.

# License

Copyright 2021. Licensed MIT.

[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)
