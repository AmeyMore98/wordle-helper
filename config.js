const _ = require("lodash");
const convict = require("convict");

const conf = convict({
    // Server Configuration
    env: {
        doc: "env",
        format: String,
        default: "development",
        env: "ENV",
        arg: "env",
    },
    port: {
        doc: "The port to bind",
        format: "port",
        default: 9090,
        env: "PORT",
        arg: "port",
    },
    postgres: {
        doc: "DB connection string",
        format: String,
        default: "postgresql://root:root@localhost:5432/wordle-helper",
        env: "DATABASE_URL",
        arg: "database_url",
    },
});

// Perform validation
conf.validate({
    allowed: "strict",
});

_.extend(conf, conf.get());

module.exports = conf;
