import pino from "pino";
import os from "os";
import { ulid } from "ulid";
import { defaultTo, curry, mergeRight } from "ramda";

export type Level = pino.Level;

export interface ILogger {
    trace(meta: IMeta, message: string, data?: object): void;
    debug(meta: IMeta, message: string, data?: object): void;
    info(meta: IMeta, message: string, data?: object): void;
    warn(meta: IMeta, message: string, data?: object): void;
    error(meta: IMeta, message: string, data?: object): void;
    fatal(meta: IMeta, message: string, data?: object): void;

    tracer(meta: IMeta): ITracer;
}

export interface ITracer {
    trace(message: string, data?: object): void;
    debug(message: string, data?: object): void;
    info(message: string, data?: object): void;
    warn(message: string, data?: object): void;
    error(message: string, data?: object): void;
    fatal(message: string, data?: object): void;
}

export interface ILoggerParams {
    level: pino.Level;
    module: string;
}

export interface IMeta {
    traceId?: string;
}

export const DEFAULT_LEVEL = "debug";

export const createLogger = ({ level = DEFAULT_LEVEL, module }: ILoggerParams): ILogger => {
    const logger = pino({
        nestedKey: "payload",
        messageKey: "message",
        level: defaultTo(DEFAULT_LEVEL, level),
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

    const trace = curry(_log('trace'));

    const debug = curry(_log('debug'));

    const info = curry(_log('info'));

    const warn = curry(_log('warn'));

    const error = curry(_log('error'));

    const fatal = curry(_log('fatal'));

    const tracer = (meta: IMeta): ITracer => {
        return {
            trace: trace(meta),
            debug: debug(meta),
            info: info(meta),
            warn: warn(meta),
            error: error(meta),
            fatal: fatal(meta),
        }
    }

    return {
        trace,
        debug,
        info,
        warn,
        error,
        fatal,

        tracer,
    };
}

export const createMeta = (traceId: string = ulid()): IMeta => {
    const _traceId = traceId.toLowerCase();

    return {
        traceId: _traceId,
    };
}
