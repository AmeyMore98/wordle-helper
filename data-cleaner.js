const fs = require("fs");

const run = async () => {
    let words = await fs.promises.readFile("./data/words_2.txt", "utf-8");

    words = words
        .split("\n")
        .map((word) => {
            if (word && word.length === 5) {
                return {
                    1: word[0],
                    2: word[1],
                    3: word[2],
                    4: word[3],
                    5: word[4],
                    // 6: word[5],
                };
            }
        })
        .filter((ele) => !!ele);

    fs.writeFile("./data/words.json", JSON.stringify(words), () => {});
};

run().catch(console.log);
