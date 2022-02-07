const _ = require("lodash");

function eval_guess(guess, word) {
    const n = word.length;
    const outcome = [0, 0, 0, 0, 0];
    const used = [false, false, false, false, false];
    for (let i = 0; i < n; i++) {
        if (guess[i] === word[i]) {
            outcome[i] = 2;
            used[i] = true;
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (guess[i] == word[j] && !used[j]) {
                outcome[i] = 1;
                used[j] = true;
            }
        }
    }
    return outcome;
}

function getEntropies(solutionWords) {
    function guess_distributions(guess) {
        const distributions = {};
        for (const solution of solutionWords) {
            const key = eval_guess(guess, solution.word).join("-");
            distributions[key] = distributions[key] || 0 + 1;
        }
        return distributions;
    }

    function entropy(guess) {
        const distributions = guess_distributions(guess);
        const n = _.sum(Object.values(distributions));
        let entropy = 0;
        Object.keys(distributions).forEach((outcome) => {
            const p = distributions[outcome] / n;
            entropy += -p * Math.log(p);
        });
        return entropy;
    }
    return entropy;
}

exports.getEntropies = getEntropies;
