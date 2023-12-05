import {readFile} from "../common/importer.js";

function numbers(line, winningNumbersRegex) {
    return line
        .match(winningNumbersRegex)[1]
        .trim()
        .replaceAll('  ', ' ')
        .split(' ')
        .map(number => parseInt(number));
}

const winningNumbers = (line) => {
    const winningNumbersRegex = /:([^|]+)/

    return numbers(line, winningNumbersRegex);
}

const yourNumbers = (line) => {
    const yourNumbersRegex = /\|([^]+)/

    return numbers(line, yourNumbersRegex);
}

const points = () => (a, b) => {
    if (b.length === 0) {
        return a;
    }
    return a + Math.pow(2, b.length - 1)
}

const result = readFile()
    .map(line => [winningNumbers(line), yourNumbers(line)])
    .map(([winningNumbers, yourNumbers]) => yourNumbers.filter(number => winningNumbers.includes(number)))
    .reduce(points(), 0);

console.log(result)
