const config = require("../config");
const knex_configuration = require("../db/knexfile")[config.env];

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
