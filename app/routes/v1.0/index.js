const router = require("express").Router();

router.use("/words", require("./words.routes"));

module.exports = router;
