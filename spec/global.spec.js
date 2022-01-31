const { DB } = require("../connections/postgres.init");

beforeAll(async () => {
    console.log("beforeAll started\n");
    await DB.migrate.rollback();
    await DB.migrate.latest();
    await DB.seed.run({ directory: "./db/seeds" });
});

afterAll(async () => {
    await DB.migrate.rollback();
    console.log("\nafterAll completed");
});
