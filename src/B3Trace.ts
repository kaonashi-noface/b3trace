import { B3TraceOptions, B3TraceJson, IB3Trace } from '@types';

class B3Trace implements IB3Trace {
    private static readonly HEXADECIMALS: string = '0123456789abcdef';

    private readonly is128BitId: boolean;
    private readonly isPropagated: boolean;

    private parentSpan: B3Trace;

    private traceId: string;
    private spanId: string;

    constructor(args: Partial<B3TraceOptions> = { is128BitId: true, isPropagated: true }) {
        this.is128BitId = args.is128BitId;
        this.isPropagated = args.isPropagated;

        /**
         * TODO:
         * 1) validate identifiers are hexadecimal
         * 2)   if is128BitId == true:
         *          validate traceid length 16
         *      else:
         *          validate traceid length 32
         */

        /* PSEUDOCODE:
        IF (traceId == null && spanId == null): // construct trace root
            construct new root trace;
            generate new traceId
            generate new spanId
        ELSE IF (traceId != null && spanId != null): // construct trace subtree
            construct new subtree trace;
                IF (isPropagated == true):
                    construct new span
                    copy incoming traceId to traceId
                    copy incoming spanId to spanId
                    copy incoming parentSpanId to parentSpanId
                ELSE:
                    construct new span
                    copy incoming traceId to traceId
                    copy incoming spanId to parentSpanId
                    generate new parentSpanId
        ELSE:
            throw some Error();
        */
        if (!args.traceId && !args.spanId) {
            this.constructTraceRoot();
        } else if (args.traceId && args.spanId) {
            //
        }
    }

    getRootSpan(): B3Trace {
        throw new Error('Method not implemented.');
    }

    getParentSpan(): B3Trace {
        return this.parentSpan;
    }

    getTraceId(): string {
        return this.traceId;
    }

    getParentSpanId(): string {
        throw new Error('Method not implemented.');
    }

    getSpanId(): string {
        return this.spanId;
    }

    toHeaderString(): string {
        throw new Error('Method not implemented.');
    }

    toJson(): B3TraceJson {
        throw new Error('Method not implemented.');
    }

    toString(): string {
        throw new Error('Method not implemented.');
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

    private constructTraceRoot() {
        this.traceId = this.generateId(this.is128BitId);
        this.spanId = this.generateId();
    }
}

export { B3TraceOptions, B3TraceJson, IB3Trace, B3Trace };
