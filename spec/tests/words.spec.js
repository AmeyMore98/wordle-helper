const request = require("../fixture/request.fixture");

const endpoint = "/v1.0/words";

describe("/v1.0/words", () => {
    it("should return all words", async () => {
        const res = await request.get(endpoint);

        expect(res.status).toBe(200);
        expect(res.body.items).toBeDefined();
    });
});
