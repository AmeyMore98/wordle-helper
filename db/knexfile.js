const path = require("path");
const config = require("../config");

module.exports = {
    client: "pg",
    connection: config.get("postgres"),
    migrations: {
        directory: path.join(__dirname, "./migrations"),
    },
};
