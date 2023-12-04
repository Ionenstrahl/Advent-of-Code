import {readFile} from "../common/importer.js";

function useFirstAndLast(numbers) {
    return numbers[0] + numbers[numbers.length - 1];
}

function filterAllNumbers(line) {
    return line.match(/[1234567890]/g);
}

const lines = readFile();
const result = lines
    .map(line => filterAllNumbers(line))
    .map(numbers => useFirstAndLast(numbers))
    .map(number => parseInt(number))
    .reduce((a, b) => a + b, 0);

console.log(result);

