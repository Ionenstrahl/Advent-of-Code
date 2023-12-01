import * as fs from 'fs';

const filePath = 'input';
const fileContent = fs.readFileSync(filePath, 'utf-8');
const lines = fileContent.split('\n');

let total = 0;

lines.forEach((line) => {

    const numbers = line.match(/[1234567890]/g);

    if (numbers) {
        const firstDigit = numbers[0];
        const lastDigit = numbers[numbers.length - 1];
        const combinedDigit = parseInt(firstDigit + lastDigit);

        total += combinedDigit;
        console.log(`${firstDigit} + ${lastDigit} = ${combinedDigit} -> Total: ${total}    from line ${line}`);
    }

});
