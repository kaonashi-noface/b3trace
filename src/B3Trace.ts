import { B3TraceOptions, B3TraceJson, IB3Trace } from '@types';

class B3Trace implements IB3Trace {
    private static readonly HEXADECIMALS: string = '0123456789abcdef';

    private readonly is128BitId: boolean;
    private readonly isPropagated: boolean;

    private parentSpanId: string;
    private traceId: string;
    private spanId: string;

    constructor({ is128BitId = true, isPropagated = true, ...args }: Partial<B3TraceOptions> = {}) {
        this.is128BitId = is128BitId;
        this.isPropagated = isPropagated;

        /**
         * TODO:
         * 1) validate identifiers are hexadecimal
         * 2)   if is128BitId == true:
         *          validate traceid length 16
         *      else:
         *          validate traceid length 32
         */
        if (!args.traceId && !args.spanId) {
            this.initializeRootTraceContext();
        } else if (args.traceId && args.spanId) {
            this.initializeSubTreeTraceContext(args.traceId, args.spanId, args.parentSpanId);
        } else {
            throw new Error('TODO: implement error scenario');
        }
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

    toHeaderString(): string {
        throw new Error('Method not implemented.');
    }

    toJson(): B3TraceJson {
        return {
            traceId: this.getTraceId(),
            spanId: this.getSpanId(),
            parentSpanId: this.getParentSpanId(),
            sampled: false, // TODO: implement sampled propagation
            debug: false, // TODO: implement debug propagation
        };
    }

    toString(): string {
        return JSON.stringify(this.toJson());
    }

    /**
     * Generates a hexadecimal identifier that is of length 32 or 16 depending on the B3Trace root's configuration.
     *
     * @param is128BitId flags that determines if the identifer should be length 32 or 16. If `is128BitId` is `true`, the identifer length is 32.
     * If `is128BitId` is `false`, the identifer length is 16.
     * @returns a hexadecimal identifier of length 32 or 16.
     */
    private generateId(is128BitId: boolean = false) {
        let id = '';
        const idLength: number = is128BitId ? 32 : 16;
        for (let i = 0; i < idLength; ++i) {
            id += B3Trace.HEXADECIMALS[Math.floor(Math.random() * 16)];
        }
        return id;
    }

    /**
     *
     */
    private initializeRootTraceContext() {
        this.traceId = this.generateId(this.is128BitId);
        this.spanId = this.generateId();
    }

    /**
     * Visit this link for more information about the propagation prperty: https://github.com/openzipkin/b3-propagation#why-is-parentspanid-propagated
     *
     * @param traceId
     * @param spanId
     * @param parentSpanId
     */
    private initializeSubTreeTraceContext(traceId: string, spanId: string, parentSpanId?: string) {
        this.traceId = traceId;
        if (this.isPropagated) {
            this.parentSpanId = parentSpanId;
            this.spanId = spanId;
        } else {
            this.parentSpanId = spanId;
            this.spanId = this.generateId();
        }
    }
}

export { B3TraceOptions, B3TraceJson, IB3Trace, B3Trace };
