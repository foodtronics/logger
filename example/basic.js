const { ulid } = require('ulid');

const { createLogger, createMeta } = require('../build');

const logger = createLogger({ level: "debug", module: "complexos" });

const META_ONE = createMeta(ulid());

logger.debug(META_ONE, 'msg', { one: "one", two: "two" });
logger.debug(META_ONE, 'name', { one: "one", two: "two" });
logger.debug(META_ONE, 'msg24');
logger.debug(createMeta(), 'msg24');
logger.debug(undefined, 'msg24', { one: "one", two: "two" });
logger.debug(null, 'msg24');

const tracer = logger.tracer(META_ONE);

tracer.info('msg36', { some: 'value' });
