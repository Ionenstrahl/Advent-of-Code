import {readFile} from "../common/importer.js";


export const numbers = (line, y) => {
    const digitRegex = /[1234567890]/;

    return line.split('')
        .map((character, x) => [x, y, character])
        .filter(([x, y, character]) => digitRegex.test(character))
        .reduce(positionToNumber(), [])
}

const positionToNumber = () => {
    return (posNums, [x, y, number]) => {
        if (posNums.length === 0) {
            return posNums.concat([[x, y, number]])
        }

        const previousX = posNums[posNums.length - 1][0];
        const previousY = posNums[posNums.length - 1][1];
        const previousNumber = posNums[posNums.length - 1][2];

        if (previousX === x - 1 && previousY === y) {
            let composedNumber = previousNumber + number;
            posNums[posNums.length - 1][2] = composedNumber;

            if (posNums.length === 1) {
                return posNums.concat([[x, y, composedNumber]])
            }

            const prepreviousX = posNums[posNums.length - 2][0];
            const prepreviousY = posNums[posNums.length - 2][1];
            const prepreviousNumber = posNums[posNums.length - 2][2];

            if (prepreviousX === x - 2 && prepreviousY === y) {
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

export const groupNumbers = () => (result, number) => {
    if (result.length > 0 && result[result.length - 1][0][2] === number[2]) {
        const lastArray = result[result.length - 1];
        return [...result.slice(0, -1), [...lastArray, number]];
    }
    return result.concat([[number]]);
};

const numberHasValidPosition = () => numbers =>
    numbers.some(([x, y, number]) => validPositions.some(([validX, validY]) => x === validX && y === validY))


export const symbolPositions = (line, y) => {
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/

    return line.split('')
        .map((character, x) => [x, y, character])
        .filter(([x, y, character]) => specialCharRegex.test(character))
        .map(([x, y, symbol]) => [x, y])
}

export const positionsAroundSymbol = (x, y) => {
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

const validPositions = readFile()
    .map((line, index) => symbolPositions(line, index))
    .reduce((a, b) => a.concat(b), [])
    .map(([x, y]) => positionsAroundSymbol(x, y))
    .reduce((a, b) => a.concat(b), [])

const sumOfValidNumbers = readFile()
    .map((line, index) => numbers(line, index))
    .reduce((a, b) => a.concat(b), [])
    .reduce(groupNumbers(), [])
    .filter(numberHasValidPosition())
    .map(numbers => numbers[0][2])
    .map(number => parseInt(number))
    .reduce((a, b) => a + b, 0);

console.log(sumOfValidNumbers);
