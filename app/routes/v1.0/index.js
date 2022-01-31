const router = require("express").Router();

const wordsRouter = require("./words.routes");

router.use("/words", wordsRouter);

module.exports = router;
