const conf = require("./config");
const app = require("./app");

const PORT = conf.get("port");

const onStartup = function () {
    console.log("Server started at http://localhost:" + PORT);
};

const server = app.listen(PORT, onStartup);

const onShutdown = function () {
    server.close(() => {
        console.log("Server closed");
    });
};

module.exports = {
    shutdown: onShutdown,
};
