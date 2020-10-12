import pino from "pino";
export declare type Level = pino.Level;
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
export declare const DEFAULT_LEVEL = "debug";
export declare const createLogger: ({ level, module }: ILoggerParams) => ILogger;
export declare const createMeta: (traceId?: string) => IMeta;
