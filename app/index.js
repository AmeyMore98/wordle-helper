const express = require("express");
const createError = require("http-errors");

const config = require("../config");
const v1Router = require("./routes/v1.0");

const app = express();

app.get("/ping", (req, res) => res.json({ "pong": "ok" }));

app.use((req, res, next) => {
    let err = createError(404);
    err.message = `Not Found: ${req.originalUrl}`;
    next(err);
});

console.log(v1Router);
app.use("/v1.0", v1Router);

app.use((error, req, res, next) => {
    error = error || {};
    const status = error.status || 500;
    res.status(status);

    let errorResponse = {
        message: error.message || "Internal Server Error",
        status: status,
        exception: error.name,
    };
    if (config.get("env") === "development") {
        errorResponse.stackTrace = error.stack || "";
    }

    if (errorResponse.status === 500) {
        console.log(error);
    }

    res.json(errorResponse);
});

module.exports = app;
