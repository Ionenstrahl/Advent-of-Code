import {readExample} from "../common/importer.js";

const symbolPositions = (line, y) => {
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/

    return line.split('')
        .map((symbol, x) => [x, y, symbol])
        .filter(([x, y, symbol]) => regex.test(symbol))
        .map(([x, y, symbol]) => [x, y])
}

const positionsAroundSymbol = (x, y) => {
    return [[x - 1, y - 1],
        [x - 1, y],
        [x - 1, y + 1],
        [x, y - 1],
        [x, y + 1],
        [x + 1, y - 1],
        [x + 1, y],
        [x + 1, y + 1]]
}

const validPositions = readExample()
    .map((line, index) => symbolPositions(line, index))
    .reduce((a, b) => a.concat(b), [])
    .map(([x, y]) => positionsAroundSymbol(x, y))
    .reduce((a, b) => a.concat(b), [])
//
// const sumOfValidNumbers = readExample()
//     .forEach
//     .filter('numbers that have at least on valid position')
//     .map(line => 'array of valid numbers')
//     .reduce((a, b) => a + b, 0);

console.log(validPositions);
// console.log(sumOfValidNumbers);
