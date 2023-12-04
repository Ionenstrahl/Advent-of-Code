import {readFile} from "../common/importer.js";

const RED = 'red';
const GREEN = 'green';
const BLUE = 'blue';

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

function isPossibleColor(targetColor, line) {
    const regex = new RegExp(`(\\d+)\\s${targetColor}`, 'g');
    return line
        .match(regex)
        .map(numberAndColor => numberAndColor.split(' ')[0])
        .every(number => isWithingMaxRange(number, targetColor));
}

function isPossibleGame(line) {
    return isPossibleColor(RED, line) &&
        isPossibleColor(GREEN, line) &&
        isPossibleColor(BLUE, line);
}

function isWithingMaxRange(number, color) {
    if (color === RED) {
        return number <= MAX_RED;
    }
    if (color === GREEN) {
        return number <= MAX_GREEN;
    }
    if (color === BLUE) {
        return number <= MAX_BLUE;
    }
}

function gameId(line) {
    const splice = line.slice(5,8);
    splice.replace(' ', '');
    splice.replace(':', '');
    return parseInt(splice);
}

const result = readFile()
    .filter(line => isPossibleGame(line))
    .map(line => gameId(line))
    .reduce((a, b) => a + b, 0);

console.log(result);
