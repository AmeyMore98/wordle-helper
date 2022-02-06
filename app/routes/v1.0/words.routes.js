const router = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const { query, body } = require("express-validator");
const _ = require("lodash");

const WordsModel = require("../../models/words.model");
const routeUtils = require("../../utils.js/route.utils");

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
        let { results: items, total } = await WordsModel.getWords(
            green,
            yellow,
            grey,
            pageNo - 1, // ObjectionJs pages are 0-indexed
            pageSize
        );

        const page = {};
        if (items.length) {
            page.type = "number";
            page.size = items.length;
            page.current = pageNo;
            // If total possible pages is greater than current page
            // Then more pages are left
            page.hasNext = Math.ceil(total / pageSize) > pageNo;
            page.itemTotal = total;
        }

        items = items.map((item) => item.word);

        return res.json({
            items,
            page,
        });
    })
);

module.exports = router;
