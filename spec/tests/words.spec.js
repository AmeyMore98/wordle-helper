const request = require("../fixture/request.fixture");

const endpoint = "/v1.0/words";

describe("/v1.0/words", () => {
    it("should return list of words", async () => {
        const res = await request.post(endpoint);

        expect(res.status).toBe(200);
        expect(res.body.items).toBeDefined();
        expect(res.body.page).toBeDefined();
        expect(res.body.items.length).toBe(50);
        expect(res.body.items[0].word).toBeInstanceOf(String);
    });

    it("should return only first 10 words", async () => {
        const res = await request.post(endpoint + "?pageSize=10");

        expect(res.status).toBe(200);
        expect(res.body.items).toBeDefined();
        expect(res.body.page).toBeDefined();
        expect(res.body.items.length).toBe(10);
        expect(res.body.items[0].word).toBeInstanceOf(String);
        expect(res.body.page.hasNext).toBe(true);
    });

    it("should return words with 'a' at index:1 and index:5 and 'c' at index:3", async () => {
        const res = await request
            .post(endpoint)
            .send({ "green": { "a": [1, 5], "c": [3] } });

        expect(res.status).toBe(200);
        expect(
            res.body.items.every(
                ({ word }) =>
                    word[0] === "a" && word[4] === "a" && word[2] === "c"
            )
        ).toBeTrue();
    });

    it("should return words with 'a' but not at index:1, and 'c' at index:3", async () => {
        const res = await request
            .post(endpoint)
            .send({ "yellow": { "a": [1] }, "green": { "c": [3] } });

        expect(res.status).toBe(200);
        expect(
            res.body.items.every(
                ({ word }) =>
                    word[0] !== "a" && word[2] === "c" && word.includes("a")
            )
        ).toBeTrue();
    });

    it("should return words with 's' but not at index:3,  and 't' at index: 2, but not 'u' and 'i' in them", async () => {
        const res = await request.post(endpoint).send({
            "yellow": { "s": [3] },
            "green": { "t": [2] },
            "grey": ["u", "i"],
        });

        expect(res.status).toBe(200);
        expect(
            res.body.items.every(
                ({ word }) =>
                    word[2] !== "s" &&
                    word.includes("s") &&
                    word[1] === "t" &&
                    !word.includes("u") &&
                    !word.includes("i")
            )
        ).toBeTrue();
    });

    it("should only accept JSON as 'green'", async () => {
        const res = await request.post(endpoint).send({ "green": [1, 2, 3] });

        expect(res.status).toBe(422);
    });

    it("should only accept JSON as 'yellow'", async () => {
        const res = await request.post(endpoint).send({ "yellow": [1, 2, 3] });

        expect(res.status).toBe(422);
    });

    it("should only accept Array as 'grey'", async () => {
        const res = await request.post(endpoint).send({ "grey": { "a": 1 } });

        expect(res.status).toBe(422);
    });

    it("should only accept strings in 'grey'", async () => {
        const res = await request.post(endpoint).send({ "grey": ["a", 1] });

        expect(res.status).toBe(422);
    });
});
