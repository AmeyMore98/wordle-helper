const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { query } = require("express-validator");
const WordsModel = require("../../models/words.model");
const routeUtils = require("../../utils.js/route.utils");

const router = new express.Router();

router.get(
    "/",
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
        const { pageNo, pageSize } = req.query;

        let { result: items, total } = await WordsModel.getAllWords(
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
