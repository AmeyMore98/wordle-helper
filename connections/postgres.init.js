"use strict";

const knex_configuration = require("../db/knexfile");

const DB = require("knex")(knex_configuration);

function disconnect() {
    DB.destroy((err) => {
        if (err) console.log(err);
    });
}

module.exports = {
    DB,
    disconnect,
};
