const path = require("path");
const config = require("../config");

module.exports = {
    development: {
        client: "pg",
        connection: config.postgres,
        useNullAsDefault: true,
        migrations: {
            directory: path.join(__dirname, "./migrations"),
        },
        seeds: {
            directory: path.join(__dirname, "./seeds"),
        },
    },
    test: {
        client: "pg",
        connection: config.postgres,
        useNullAsDefault: true,
        migrations: {
            directory: path.join(__dirname, "./migrations"),
        },
        seeds: {
            directory: path.join(__dirname, "./seeds"),
        },
    },
    production: {
        client: "pg",
        connection: {
            connectionString: config.postgres,
            ssl: { rejectUnauthorized: false },
        },
        useNullAsDefault: true,
        migrations: {
            directory: path.join(__dirname, "./migrations"),
        },
        seeds: {
            directory: path.join(__dirname, "./seeds"),
        },
    },
};
