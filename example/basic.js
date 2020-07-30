const { ulid } = require('ulid');

const { createLogger } = require('../build');

const logger = createLogger({ level: "debug", module: "complexos" });

const META_ONE = { traceId: ulid() };

logger.debug(META_ONE, { one: "one", two: "two" }, 'msg');
logger.debug(META_ONE, { one: "one", two: "two" });
logger.debug(META_ONE, 'msg24');
logger.debug({}, 'msg24');
