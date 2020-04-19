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

    return {
        checkout: () => logger.child({ traceId: uuid() }),
        restore: ({ traceId }: { traceId: string }) => logger.child({ traceId }),
    };
}
