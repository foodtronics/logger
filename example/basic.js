const { v4: uuid } = require('uuid');

const { create } = require('../build');

const logger = create({ level: "debug", module: "complexos" });

let tracer = logger.checkout();

tracer.info("ABC");
tracer.info("ABC");
tracer.info("ABC");
tracer.info("ABC");
tracer.info("ABC");

tracer = logger.checkout();

tracer.info({ name: "abc" }, "hello world");
tracer.info({ name: "abc" }, "hello world");
tracer.info({ name: "abc" }, "hello world");
tracer.info({ name: "abc" }, "hello world");

tracer = logger.checkout(uuid());

tracer.warn({ field: "one", abc: "bca" });

console.log(tracer.traceId);
