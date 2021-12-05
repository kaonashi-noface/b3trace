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
        /**
         * 1) construct brand new trace:
         *  * traceId == null, spanId == null
         * 2) construct a subtree trace:
         *  * traceId != null, spanId != null
         *  * you can either propagate the trace or construct a new span...
         * 3) throw an Error:
         *  * traceId == null && spanId == null || traceId == null && spanId == null
         */
        if (args.traceId && args.spanId) {
            this.traceId = args.traceId;
            this.spanId = args.spanId;
        } else if (!args.traceId && !args.spanId) {
            this.traceId = generateId(args.is128BitId);
            this.spanId = generateId();
        } else {
            throw new Error(
                'TODO: implement Error handling for when one is provided but not the other.'
            );
        }
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
