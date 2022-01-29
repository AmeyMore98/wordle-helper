/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .dropTableIfExists("words")
        .createTable("words", function (table) {
            table.string("1", 1).notNullable();
            table.string("2", 1).notNullable();
            table.string("3", 1).notNullable();
            table.string("4", 1).notNullable();
            table.string("5", 1).notNullable();
            table.string("6", 1).notNullable();

            // Uniqe word Index
            table.unique(["1", "2", "3", "4", "5", "6"], "1_2_3_4_5_6");
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("words");
};
