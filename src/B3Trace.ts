import { B3TraceOptions, B3TraceJson, IB3Trace } from '@types';

const HEXADECIMALS: string = '0123456789abcdef';

function generateId(is128BitId: boolean = false) {
    let id = '';
    const idLength: number = is128BitId ? 32 : 16;
    for (let i = 0; i < idLength; ++i) {
        id += HEXADECIMALS[Math.floor(Math.random() * 16)];
    }
    return id;
}

class B3Trace implements IB3Trace {
    private parentSpan: B3Trace;

    private traceId: string;
    private spanId: string;

    constructor(args: Partial<B3TraceOptions> = { is128BitId: true }) {
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
        return null; // this.rootSpan;
    }

    getParentSpan(): B3Trace {
        return this.parentSpan;
    }

    getTraceId(): string {
        return '';
    }

    getParentSpanId(): string {
        return '';
    }

    getSpanId(): string {
        return '';
    }

    toHeaderString(): string {
        const fields = [this.traceId, this.spanId, 0];
        if (this.getParentSpan()) {
            fields.push(this.getParentSpan().spanId);
        }
        return fields.join('-');
    }

    toJson(): B3TraceJson {
        const parentSpan = this.getParentSpan();
        return {
            parentSpanId: parentSpan ? parentSpan.spanId : null,
            traceId: this.traceId,
            spanId: this.spanId,
            sampled: false, // TODO: implement samlping flag
            debug: false, // TODO: implement debugging flag
        };
    }

    toString(): string {
        return JSON.stringify(this.toJson());
    }
}

export { B3TraceOptions, B3TraceJson, IB3Trace, B3Trace };
