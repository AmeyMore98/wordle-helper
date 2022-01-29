const { DB } = require("../connections/postgres.init");

beforeAll(async () => {
    await DB.migrate.rollback();
    await DB.migrate.latest();
    await DB.seed.run({ directory: "./db/seeds" });
    console.log("beforeAll started\n");
});

afterAll(async () => {
    await DB.migrate.rollback();
    console.log("\nafterAll completed");
});
