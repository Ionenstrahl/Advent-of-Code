import * as fs from 'fs';

const filePath = 'input';
const fileContent = fs.readFileSync(filePath, 'utf-8');
const lines = fileContent.split('\n');

let total = 0;

function findNumbersInString(line) {
    return line.match(/[1234567890]/g);
}

function combineFirstAndLastNumber(numbers) {
    const firstDigit = numbers[0];
    const lastDigit = numbers[numbers.length - 1];

    const combinedDigit = firstDigit + lastDigit;

    console.log(`${firstDigit} + ${lastDigit} = ${combinedDigit}`);
    return parseInt(combinedDigit);
}

lines.forEach((line) => {
    const numbers = findNumbersInString(line);

    if (numbers) {
        total += combineFirstAndLastNumber(numbers);
        console.log(`-> Total: ${total}    from line ${line}`);
    }
});
