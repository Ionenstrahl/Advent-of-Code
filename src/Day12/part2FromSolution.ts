import { readFile} from "../common/importer";

function solve(input) {
    return [process(parse(input, 5))];
}

function parse(input, m) {
    input = input.map((line) => line.split(" "));
    for (let i = 0; i < input.length; i++) {
        input[i][0] = Array(m).fill(input[i][0]).join("?").split("");
        input[i][1] = Array(m)
            .fill(input[i][1].split(",").map((e) => +e))
            .flat();
    }
    return input;
}

function process(data) {
    return data.map((e) => comb({}, ...e, 0, 0, 0)).reduce((a, c) => a + c, 0);
}

function comb(cache, c, g, ci, gi, ggi) {
    const key = ci + "," + gi + "," + ggi;
    if (key in cache) return cache[key];
    if (ci === c.length) {
        if (gi === g.length && ggi === 0) return 1;
        if (gi === g.length - 1 && g[gi] === ggi) return 1;
        return 0;
    }
    let ans = 0;
    if (c[ci] === "#" || c[ci] === "?")
        ans += comb(cache, c, g, ci + 1, gi, ggi + 1);
    if (c[ci] === "." || c[ci] === "?") {
        if (ggi === 0) ans += comb(cache, c, g, ci + 1, gi, 0);
        if (ggi > 0 && gi < g.length && g[gi] === ggi)
            ans += comb(cache, c, g, ci + 1, gi + 1, 0);
    }
    return (cache[key] = ans);
}

console.log(solve(readFile()))