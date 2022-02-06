const { Model } = require("objection");
const _ = require("lodash");

const { DB } = require("../../connections/postgres.init");

Model.knex(DB);

class WordsModel extends Model {
    static get tableName() {
        return "words";
    }

    static get jsonSchema() {
        return {
            type: "object",
            properties: {
                "1": {
                    type: "string",
                },
                "2": {
                    type: "string",
                },
                "3": {
                    type: "string",
                },
                "4": {
                    type: "string",
                },
                "5": {
                    type: "string",
                },
            },
        };
    }

    static get virtualAttributes() {
        return ["word"];
    }

    get word() {
        const word = [
            this["1"],
            this["2"],
            this["3"],
            this["4"],
            this["5"],
        ].join("");
        return word;
    }

    $formatJson(json) {
        json = super.$formatJson(json);
        return _.omit(json, ["1", "2", "3", "4", "5"]);
    }

    static async getWords(green, yellow, grey, pageNo = 0, pageSize = 50) {
        const query = this.query();

        // Eg. green: { "e": 3 } -> Get words with 'e' at index 3
        Object.entries(green).forEach(([letter, index]) => {
            // Only process the index which is a DB column
            if (this.COLUMNS.includes(index)) {
                query.where(index, letter);
            }
        });

        // Eg. yellow: { 't': [1,2] }
        Object.entries(yellow).forEach(([letter, indexes]) => {
            // Get words where 't' is not at index 1 & 2
            indexes.forEach((index) => {
                if (this.COLUMNS.includes(index)) {
                    query.whereNot(index, letter);
                }
            });

            // Get words where 't' could be at any index, other than, [1, 2] and any index in `green`
            query.where((builder) => {
                for (const column of this.COLUMNS) {
                    if (!indexes.includes(column) && !green[column]) {
                        builder.orWhere(column, letter);
                    }
                }
                return builder;
            });
        });

        // Eg. grey: [ "d", "u" ] -> Get words which don't have letters 'd' & 'u'
        if (grey.length) {
            for (const column of this.COLUMNS) {
                query.whereNotIn(column, grey);
            }
        }

        query.page(pageNo, pageSize);
        // console.log(query.toKnexQuery().toQuery());
        return query;
    }
}

WordsModel.COLUMNS = ["1", "2", "3", "4", "5"];
module.exports = WordsModel;
