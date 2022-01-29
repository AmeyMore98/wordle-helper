const fs = require("fs");
const data = require("../../data/words.json");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("words")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex.batchInsert("words", data);
        });
};
