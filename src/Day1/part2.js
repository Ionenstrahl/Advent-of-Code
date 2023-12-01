import * as fs from 'fs';

const filePath = 'input';
const fileContent = fs.readFileSync(filePath, 'utf-8');
const lines = fileContent.split('\n');

let total = 0;

function findNumbersInString(line) {
    const numberRegex =  /\b(?:one|two|three|four|five|six|seven|eight|nine|[1-9])(?=\b|\w{2})/g;

    return line.match(numberRegex);
}

function convertToDigits(numbers) {
    console.log(numbers)
    return numbers.map(
        (number) => {
            if (number === 'one') {
                return 1;
            }
            if (number === 'two') {
                return 2;
            }
            if (number === 'three') {
                return 3;
            }
            if (number === 'four') {
                return 4;
            }
            if (number === 'five') {
                return 5;
            }
            if (number === 'six') {
                return 6;
            }
            if (number === 'seven') {
                return 7;
            }
            if (number === 'eight') {
                return 8;
            }
            if (number === 'nine') {
                return 9;
            }
            return parseInt(number);
        }
    );
}

function combineFirstAndLastNumber(numbers) {
    const firstDigit = numbers[0];
    const lastDigit = numbers[numbers.length - 1];

    const combinedDigit = firstDigit*10 + lastDigit;

    console.log(`${firstDigit} + ${lastDigit} = ${combinedDigit}`);
    return combinedDigit;
}

lines.forEach((line) => {
    console.log(``);
    const numbers = findNumbersInString(line);
    if (numbers) {
        const digits = convertToDigits(numbers);
        total += combineFirstAndLastNumber(digits);
        console.log(`-> Total: ${total}    from line ${line}`);
    }
});
