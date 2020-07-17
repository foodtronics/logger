"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const uuid_1 = require("uuid");
const formatters = {
    level: (label) => ({ level: label }),
};
exports.create = ({ level, module, pretty = false }) => {
    const logger = pino_1.default({ nestedKey: "payload", messageKey: "message", prettyPrint: pretty, level, formatters }, pino_1.default.destination(1)).child({ module });
    const checkout = (traceId) => {
        const _traceId = traceId || uuid_1.v4();
        const tracer = logger.child({ traceId: _traceId });
        tracer.traceId = _traceId;
        return tracer;
    };
    return {
        checkout,
    };
};
