import { ESampledState } from "@src/SampledState";
import * as SampledState from "@src/SampledState";

export enum EB3Headers {
    X_B3_TRACEID = "X-B3-TraceId",
    X_B3_PARENTSPANID = "X-B3-ParentSpanId",
    X_B3_SPANID = "X-B3-SpanId",
    X_B3_SAMPLED = "X-B3-Sampled",
};

/**
 * The type that represents a single TraceContext slice within an entire Trace.
 * 
 * Properties:
 * * traceId -      represents the lifecycle of a user request. The trace identifier 
 *                  is passed downstream to all systems when a client initiates a 
 *                  request regardless of the propagation flag. This allows tracer 
 *                  systems to instrument the entire lifecycle of the request.
 * * spanId -       represents a "slice" of a trace. Spans correlate to nodes within 
 *                  the lifecycle of a request.
 * * parentSpanId - represents the previous "slice" that the current span originated from.
 * * parent -       represents a pointer to the in-memory object representation of
 *                  a parent span. A TraceContext is the `local head` of the Trace if 
 *                  the `parent` property is `null`. Note: A head TraceContext is not 
 *                  guaranteed to be the true `root` or beginning of an entire Trace. 
 *                  This is because information can be lost as data flows through a 
 *                  distributed system.
 * * sampled -      represents the sampling state that notifies the tracing systems 
 *                  whether or not the current TraceContext should be logged and instrumented.
 */
export type TraceContext = {
    parent?: TraceContext,
    traceId: string,
    parentSpanId?: string,
    spanId: string,
    sampled?: ESampledState,
};

export type TraceContextJson = {
    traceId: string,
    parentSpanId?: string,
    spanId: string,
    sampled?: string,
};

const HEXADECIMALS: string = "0123456789abcdef";

/**
 * Generates a hexadecimal identifier that is of length 32 or 16.
 * 
 * @param is128Bit 
 * The flag that determines if the identifer should be length 32 or 16.
 * If `true`, the trace identifier will be a 32 length hexadecimal string.
 * If `false`, the trace identifier will be a 16 length hexadecimal string.
 * 
 * @returns a hexadecimal identifier of length 32 or 16.
 */
export function generateId(is128Bit: boolean = false): string {
    let id = "";
    const idLength: number = is128Bit ? 32 : 16;
    for (let i = 0; i < idLength; ++i) {
        id += HEXADECIMALS[Math.floor(Math.random() * 16)];
    }
    return id;
}
/**
 * Constructs a child TraceContext from a given TraceContext.
 * 
 * @param parentCtx
 * The trace context to construct the child from.
 * @returns a TraceContext that is a child of the provided trace context.
 */
export function child(parentCtx: TraceContext): TraceContext {
    const childCtx: TraceContext = {
        parent: parentCtx,
        traceId: parentCtx.traceId,
        parentSpanId: parentCtx.spanId,
        spanId: generateId(),
        sampled: parentCtx.sampled,
    };
    if (parentCtx.sampled != null && parentCtx.sampled !== ESampledState.DEFER) {
        childCtx.sampled = parentCtx.sampled;
    }
    return childCtx;
}

/**
 * Retrieves the local head of the provided trace context. The tract context 
 * is considered a local head of a trace when the `parent` property is `null`.
 * 
 * @param ctx
 * the trace context to get the head from.
 * @returns the local head of the provided trace context.
 */
export function getHead(ctx: TraceContext) {
    if (ctx == null) {
        return null;
    }
    let parentCtx: TraceContext = ctx;
    while (parentCtx.parent != null) {
        parentCtx = parentCtx.parent;
    }
    return parentCtx;
}

/**
 * This function takes a given trace context and returns it as 
 * a simple json object. This trace object is safe to stringify 
 * and log as long as no traces were modified to contain cycles.
 * 
 * @param ctx
 * The trace context to parse to a simple json.
 * @returns the provided trace context as a simple json object.
 */
export function toJson(ctx: TraceContext): TraceContextJson {
    const ctxObj: TraceContextJson = {
        traceId: ctx.traceId,
        spanId:ctx.spanId,
    };
    if (ctx.parentSpanId) {
        ctxObj.parentSpanId = ctx.parentSpanId;
    }
    if (ctx.sampled != null && ctx.sampled !== ESampledState.DEFER) {
        ctxObj.sampled = SampledState.toString(ctx.sampled);
    }
    return ctxObj;
}

/**
 * This function takes a given trace context and returns it as 
 * a json string.
 * 
 * @param ctx
 * The trace context to serialize to a string.
 * @returns the provided trace context as a json string.
 */
export function toString(ctx: TraceContext) : string {
    return JSON.stringify(toJson(ctx));
}

/**
 * This function takes a given trace context and returns it as 
 * a compressed header string. Compressed single headers are 
 * meant to be encoded to the `b3` HTTP header.
 * 
 * Please visit the following page for more information:
 * 
 * https://github.com/openzipkin/b3-propagation?tab=readme-ov-file#single-header
 * 
 * @param ctx
 * The trace context to serialize to a compressed header string.
 * @returns the provided trace context as a compressed header string.
 */
export function toHeaderString(ctx: TraceContext): string {
    const fields = [
        ctx.traceId,
        ctx.spanId
    ];
    if (ctx.sampled != null && ctx.sampled !== ESampledState.DEFER) {
        fields.push(SampledState.toString(ctx.sampled));
    }
    if (ctx.parentSpanId) {
        fields.push(ctx.parentSpanId);
    }
    return fields.join("-");
}