const { create } = require('../build');

const logger = create({ level: "debug" });

const tracer = logger.checkout();

tracer.info("ABC");
tracer.info("ABC");
tracer.info("ABC");
tracer.info("ABC");
tracer.info("ABC");

const trace = logger.checkout();

trace.info({ name: "abc" }, "hello world");
trace.info({ name: "abc" }, "hello world");
trace.info({ name: "abc" }, "hello world");
trace.info({ name: "abc" }, "hello world");

const traceId = "two-three";

const r = logger.restore({ traceId });

r.info({ message: "name" }, "restored");
r.info({ message: "name" }, "restored");
r.info({ message: "name" }, "restored");
r.info({ message: "name" }, "restored");
r.info({ message: "name" }, "restored");
