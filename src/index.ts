import pino from "pino";
import os from "os";
import { ulid } from "ulid";

type Config = {
    level: string;
    module: string;
}

interface IMeta {
    traceId?: string;
}

const formatters = {
    level: (label: string) => ({ level: label }),
};

export const createLogger = ({ level, module }: Config) => {
    const logger = pino({
        nestedKey: "payload",
        messageKey: "message",
        level,
        base: {
            module,
            pid: process.pid,
            hostname: os.hostname(),
        },
        formatters,
    }, pino.destination(1));

    const log = (level: pino.Level) => (meta: IMeta = { traceId: ulid() }, arg0: string | object, ...args: any[]) => {
        meta.traceId = (meta.traceId || ulid()).toLowerCase();

        const _logger = logger.child(meta);

        if (typeof(arg0) === 'object') {
            const [msg, ...rest] = args;
            return void _logger[level](arg0, msg, ...rest);
        }

        _logger[level](arg0, ...args);
    }

    const debug = log('debug');
    const trace = log('trace');
    const info = log('info');
    const warn = log('warn');
    const error = log('error');
    const fatal = log('fatal');

    return {
        trace,
        debug,
        info,
        warn,
        error,
        fatal,
    };
}
