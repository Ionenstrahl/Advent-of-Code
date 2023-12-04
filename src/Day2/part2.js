import {readFile} from "../common/importer.js";

const RED = 'red';
const GREEN = 'green';
const BLUE = 'blue';

const gamePower = (line) => {
    return [RED, GREEN, BLUE].
    map(color => maximumSeenColor(color, line)).
    reduce((a, b) => a * b, 1);
}

const maximumSeenColor = (color, line) => {
    const numbers = extractNumbers(color, line);

    return Math.max(...numbers);
}

const extractNumbers = (color, line) => {
    const regex = new RegExp(`(\\d+)\\s${color}`, 'g');

    return line.match(regex)
        .map(numberAndColor => numberAndColor.split(' ')[0])
        .map(number => parseInt(number));
};

const result = readFile()
    .map(line => gamePower(line))
    .reduce((a, b) => a + b, 0);

console.log(result);
