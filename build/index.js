"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const os_1 = __importDefault(require("os"));
const ulid_1 = require("ulid");
const formatters = {
    level: (label) => ({ level: label }),
};
exports.createLogger = ({ level, module }) => {
    const logger = pino_1.default({
        nestedKey: "payload",
        messageKey: "message",
        level,
        base: {
            module,
            pid: process.pid,
            hostname: os_1.default.hostname(),
        },
        formatters,
    }, pino_1.default.destination(1));
    const log = (level) => (meta = { traceId: ulid_1.ulid() }, arg0, ...args) => {
        meta.traceId = (meta.traceId || ulid_1.ulid()).toLowerCase();
        const _logger = logger.child(meta);
        if (typeof (arg0) === 'object') {
            const [msg, ...rest] = args;
            return void _logger[level](arg0, msg, ...rest);
        }
        _logger[level](arg0, ...args);
    };
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
};
