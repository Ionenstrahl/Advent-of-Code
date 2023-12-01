import * as fs from 'fs';

const filePath = 'input';
const fileContent = fs.readFileSync(filePath, 'utf-8');
const lines = fileContent.split('\n');

function useFirstAndLast(numbers) {
    return numbers[0] + numbers[numbers.length - 1];
}

function filterAllNumbers(line) {
    return line.match(/[1234567890]/g);
}

let streamResult = lines
    .filter(line => line.length > 0)
    .map(line => filterAllNumbers(line))
    .map(numbers => useFirstAndLast(numbers))
    .map(number=>  parseInt(number))
    .reduce((a, b) => a + b, 0);

console.log(streamResult);

