const router = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const { query, body } = require("express-validator");
const _ = require("lodash");

const WordsModel = require("../../models/words.model");
const { getEntropies } = require("../../utils.js/entropy.utils");
const routeUtils = require("../../utils.js/route.utils");

function paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

router.post(
    "/",
    body("green")
        .optional()
        .isObject()
        .bail()
        .customSanitizer((value) => {
            Object.keys(value).forEach((key) => {
                value[key] = value[key].map((ele) => ele.toString());
            });
            return value;
        })
        .withMessage("Must be a JSON"),
    body("yellow")
        .optional()
        .isObject()
        .bail()
        .customSanitizer((value) => {
            Object.keys(value).forEach((key) => {
                value[key] = value[key].map((ele) => ele.toString());
            });
            return value;
        })
        .withMessage("Must be a JSON"),
    body("grey").optional().isArray().withMessage("Must be an Array"),
    body("grey.*").isString().notEmpty().withMessage("Must be a string"),
    query("pageNo")
        .optional()
        .isNumeric()
        .toInt()
        .withMessage("Must be a number"),
    query("pageSize")
        .optional()
        .isNumeric()
        .toInt()
        .withMessage("Must be a number"),
    routeUtils.validate,
    expressAsyncHandler(async (req, res) => {
        const { pageNo = 1, pageSize = 50 } = req.query;
        const { green = {}, yellow = {}, grey = [] } = req.body;
        let totalWords = await WordsModel.getWords(green, yellow, grey);
        if (grey.length || !_.isEmpty(green) || !_.isEmpty(yellow)) {
            totalWords = totalWords.map((item) => {
                return {
                    word: item.word,
                    entropy: getEntropies(totalWords)(item.word),
                };
            });
            totalWords = _.sortBy(totalWords, ["entropy"]);
        }

        const page = {};
        let words = [];
        if (totalWords.length) {
            words = paginate(totalWords, pageSize, pageNo);
            page.type = "number";
            page.size = totalWords.length;
            page.current = pageNo;
            // If total possible pages is greater than current page
            // Then more pages are left
            page.hasNext = Math.ceil(totalWords.length / pageSize) > pageNo;
            page.itemTotal = totalWords.length;
        }

        return res.json({
            items: words,
            page,
        });
    })
);

module.exports = router;
