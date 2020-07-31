import pino from "pino";
import os from "os";
import { ulid } from "ulid";
import { mergeRight, curryN } from "ramda";

interface ILogger {
    trace(meta: IMeta, message: string, data?: object): void;
    debug(meta: IMeta, message: string, data?: object): void;
    info(meta: IMeta, message: string, data?: object): void;
    warn(meta: IMeta, message: string, data?: object): void;
    error(meta: IMeta, message: string, data?: object): void;
    fatal(meta: IMeta, message: string, data?: object): void;
}

interface ILoggerParams {
    level: pino.Level;
    module: string;
}

interface IMeta {
    traceId?: string;
}

export const createLogger = ({ level = "debug", module }: ILoggerParams): ILogger => {
    const logger = pino({
        nestedKey: "payload",
        messageKey: "message",
        level,
        base: {
            module,
            pid: process.pid,
            hostname: os.hostname(),
        },
        formatters: {
            level: (label: string) => ({ level: label }),
        },
    });

    const _log = (level: pino.Level) =>
        (meta: IMeta, message: string, data: object = {}) => {
            logger[level](mergeRight(data, meta), message);
        };

    const trace = curryN(1, _log('trace'));

    const debug = curryN(1, _log('debug'));

    const info = curryN(1, _log('info'));

    const warn = curryN(1, _log('warn'));

    const error = curryN(1, _log('error'));

    const fatal = curryN(1, _log('fatal'));

    return {
        trace,
        debug,
        info,
        warn,
        error,
        fatal,
    };
}

export const createMeta = (traceId: string = ulid()): IMeta => {
    const _traceId = traceId.toLowerCase();

    return {
        traceId: _traceId,
    };
}
