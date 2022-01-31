const request = require("../fixture/request.fixture");

const endpoint = "/v1.0/words";

describe("/v1.0/words", () => {
    it("should return list of words", async () => {
        const res = await request.get(endpoint);

        expect(res.status).toBe(200);
        expect(res.body.items).toBeDefined();
        expect(res.body.page).toBeDefined();
        expect(res.body.items.length).toBe(50);
        expect(res.body.items[0]).toBeInstanceOf(String);
    });

    it("should return only first 10 words", async () => {
        const res = await request.get(endpoint + "?pageSize=10");

        expect(res.status).toBe(200);
        expect(res.body.items).toBeDefined();
        expect(res.body.page).toBeDefined();
        expect(res.body.items.length).toBe(10);
        expect(res.body.items[0]).toBeInstanceOf(String);
        expect(res.body.page.hasNext).toBe(true);
    });
});
