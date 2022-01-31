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

    static async getWords(pageNo = 0, pageSize = 50) {
        return this.query().page(pageNo, pageSize);
    }
}

module.exports = WordsModel;
