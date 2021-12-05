import { B3TraceOptions, B3TraceJson, IB3Trace } from '@types';

const HEXADECIMALS: string = '0123456789abcdef';

class B3Trace implements IB3Trace {
    private readonly is128BitId: boolean;
    private readonly isPropagated: boolean;

    private parentSpan: B3Trace;

    private traceId: string;
    private spanId: string;

    constructor(args: Partial<B3TraceOptions> = { is128BitId: true, isPropagated: true }) {
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
    }
    getRootSpan(): B3Trace {
        throw new Error('Method not implemented.');
    }

    getParentSpan(): B3Trace {
        throw new Error('Method not implemented.');
    }

    getTraceId(): string {
        throw new Error('Method not implemented.');
    }

    getParentSpanId(): string {
        throw new Error('Method not implemented.');
    }

    getSpanId(): string {
        throw new Error('Method not implemented.');
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

    private generateId() {
        let id = '';
        const idLength: number = this.is128BitId ? 32 : 16;
        for (let i = 0; i < idLength; ++i) {
            id += HEXADECIMALS[Math.floor(Math.random() * 16)];
        }
        return id;
    }
}

export { B3TraceOptions, B3TraceJson, IB3Trace, B3Trace };
