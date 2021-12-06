import { SampledState, TraceContextOptions, TraceContextJson, ITraceContext } from '@types';

class TraceContext implements ITraceContext {
    private static readonly HEXADECIMALS: string = '0123456789abcdef';

    static generateId(is128BitId: boolean = false) {
        let id = '';
        const idLength: number = is128BitId ? 32 : 16;
        for (let i = 0; i < idLength; ++i) {
            id += TraceContext.HEXADECIMALS[Math.floor(Math.random() * 16)];
        }
        return id;
    }

    private parentContext: TraceContext;

    private traceId: string;
    private parentSpanId: string;
    private spanId: string;
    private sampled: SampledState;

    constructor(args: TraceContextOptions) {
        this.traceId = args.traceId;
        this.parentSpanId = args.parentSpanId;
        this.spanId = args.spanId;
        this.sampled = args.sampled;
    }

    createChildContext(): TraceContext {
        const childContext = new TraceContext({
            traceId: this.traceId,
            parentSpanId: this.spanId,
            spanId: TraceContext.generateId(),
            sampled: this.sampled,
        });
        childContext.setParentContext(this);
        return childContext;
    }

    getParentContext(): TraceContext {
        return this.parentContext;
    }

    private setParentContext(parentTraceContext: TraceContext): TraceContext {
        return (this.parentContext = parentTraceContext);
    }

    getTraceId(): string {
        return this.traceId;
    }

    getParentSpanId(): string {
        return this.parentSpanId;
    }

    getSpanId(): string {
        return this.spanId;
    }

    getSampled() {
        return this.sampled;
    }

    toHeaderString(): string {
        throw new Error('Method not implemented.');
    }

    toJson(): TraceContextJson {
        return {
            traceId: this.getTraceId(),
            spanId: this.getSpanId(),
            parentSpanId: this.getParentSpanId(),
            sampled: this.getSampled(),
        };
    }

    toString(): string {
        return JSON.stringify(this.toJson());
    }
}

export { TraceContextOptions, TraceContextJson, ITraceContext, TraceContext };
