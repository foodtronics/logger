"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const os_1 = __importDefault(require("os"));
const ulid_1 = require("ulid");
const ramda_1 = require("ramda");
exports.createLogger = ({ level = "debug", module }) => {
    const logger = pino_1.default({
        nestedKey: "payload",
        messageKey: "message",
        level,
        base: {
            module,
            pid: process.pid,
            hostname: os_1.default.hostname(),
        },
        formatters: {
            level: (label) => ({ level: label }),
        },
    });
    const _log = (level) => (meta, message, data = {}) => {
        logger[level](ramda_1.mergeRight(data, meta), message);
    };
    const trace = ramda_1.curryN(1, _log('trace'));
    const debug = ramda_1.curryN(1, _log('debug'));
    const info = ramda_1.curryN(1, _log('info'));
    const warn = ramda_1.curryN(1, _log('warn'));
    const error = ramda_1.curryN(1, _log('error'));
    const fatal = ramda_1.curryN(1, _log('fatal'));
    return {
        trace,
        debug,
        info,
        warn,
        error,
        fatal,
    };
};
exports.createMeta = (traceId = ulid_1.ulid()) => {
    const _traceId = traceId.toLowerCase();
    return {
        traceId: _traceId,
    };
};
