import {readFile} from "../common/importer.js";

export function numbers(line, winningNumbersRegex) {
    return line
        .match(winningNumbersRegex)[1]
        .trim()
        .replaceAll('  ', ' ')
        .split(' ')
        .map(number => parseInt(number));
}

export const winningNumbers = (line) => {
    const winningNumbersRegex = /:([^|]+)/

    return numbers(line, winningNumbersRegex);
}

export const yourNumbers = (line) => {
    const yourNumbersRegex = /\|([^]+)/

    return numbers(line, yourNumbersRegex);
}

const calculatePoints = () => (a, b) => {
    if (b.length === 0) {
        return a;
    }
    return a + Math.pow(2, b.length - 1)
}

const points = readFile()
    .map(line => [winningNumbers(line), yourNumbers(line)])
    .map(([winningNumbers, yourNumbers]) => yourNumbers.filter(number => winningNumbers.includes(number)))
    .reduce(calculatePoints(), 0);

console.log(points)
