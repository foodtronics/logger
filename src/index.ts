import pino from "pino";
import { v4 as uuid } from "uuid";

type Config = {
    level: string;
    module: string;
    pretty: boolean;
}

const formatters = {
    level: (label: string) => ({ level: label }),
};

export const create = ({ level, module, pretty = false }: Config) => {
    const logger = pino({ nestedKey: "payload", messageKey: "message", prettyPrint: pretty, level, formatters }, pino.destination(1)).child({ module });

    const checkout = (traceId?: string) => {
        const _traceId = traceId || uuid();
        const tracer = logger.child({ traceId: _traceId });

        tracer.traceId = _traceId;

        return tracer;
    }

    return {
        checkout,
    };
}
