import {readExample} from "../common/importer.js";

const symbolPositions = (line, y) => {
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/

    return line.split('')
        .map((character, x) => [x, y, character])
        .filter(([x, y, character]) => specialCharRegex.test(character))
        .map(([x, y, symbol]) => [x, y])
}

const positionsAroundSymbol = (x, y) => {
    return [
        [x - 1, y - 1],
        [x - 1, y],
        [x - 1, y + 1],
        [x, y - 1],
        [x, y + 1],
        [x + 1, y - 1],
        [x + 1, y],
        [x + 1, y + 1]
    ]
}

function positionToNumber() {
    return (posNums, [x, y, number]) => {
        if (posNums.length == 0) {
            return posNums.concat([[x, y, number]])
        }

        const previousX = posNums[posNums.length - 1][0];
        const previousY = posNums[posNums.length - 1][1];
        const previousNumber = posNums[posNums.length - 1][2];

        if (previousX == x - 1 && previousY == y) {
            let composedNumber = previousNumber + number;
            posNums[posNums.length - 1][2] = composedNumber;

            if (posNums.length == 1) {
                return posNums.concat([[x, y, composedNumber]])
            }

            const prepreviousX = posNums[posNums.length - 2][0];
            const prepreviousY = posNums[posNums.length - 2][1];
            const prepreviousNumber = posNums[posNums.length - 2][2];

            if (prepreviousX == x- 2 && prepreviousY == y) {
                composedNumber = prepreviousNumber + number;
                posNums[posNums.length - 1][2] = composedNumber;
                posNums[posNums.length - 2][2] = composedNumber;
            }

            return posNums.concat([[x, y, composedNumber]])
        } else {
            return posNums.concat([[x, y, number]])
        }
    };
}

const numbers = (line, y) => {
    const digitRegex = /[1234567890]/;
    const numbers = line.split('')
        .map((character, x) => [x, y, character])
        .filter(([x, y, character]) => digitRegex.test(character))
        .reduce(positionToNumber(), [])
    console.log(numbers)
}

const validPositions = readExample()
    .map((line, index) => symbolPositions(line, index))
    .reduce((a, b) => a.concat(b), [])
    .map(([x, y]) => positionsAroundSymbol(x, y))
    .reduce((a, b) => a.concat(b), [])

const sumOfValidNumbers = readExample()
    .map((line, index) => numbers(line, index))
    .reduce((a, b) => a.concat(b), [])
//     .forEach
//     .filter('numbers that have at least on valid position')
//     .map(line => 'array of valid numbers')
//     .reduce((a, b) => a + b, 0);

//console.log(validPositions);
//console.log(sumOfValidNumbers);
