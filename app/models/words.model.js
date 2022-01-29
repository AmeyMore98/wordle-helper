const { Model } = require("objection");
const _ = require("lodash");

const { DB } = require("../../connections/postgres.init");

Model.knex(DB);

class WordsModel extends Model {
    static get tableName() {
        return "assets";
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
                "6": {
                    type: "string",
                },
            },
        };
    }

    $formatJson(json) {
        json = super.$formatJson(json);
        json.word = [
            json["1"],
            json["2"],
            json["3"],
            json["4"],
            json["5"],
            json["6"],
        ].join("");
        return _.omit(json, ["1", "2", "3", "4", "5", "6"]);
    }

    static async getAllWords(pageNo = 0, pageSize = 50) {
        return this.query().select().page(pageNo, pageSize);
    }
}

module.exports = WordsModel;
