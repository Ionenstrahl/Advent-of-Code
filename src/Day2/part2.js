import {readExample, readFile} from "../common/importer.js";

const RED = 'red';
const GREEN = 'green';
const BLUE = 'blue';

function maximumSeenColor(color, line) {
    const regex = new RegExp(`(\\d+)\\s${color}`, 'g');
    const result = line
        .match(regex)
        .map(numberAndColor => numberAndColor.split(' ')[0])
        .map(number => parseInt(number))
        .reduce((a, b) => Math.max(a, b), 0);

    console.log('max ' + color + ' : ' + result)
    return result;
}

function gamePower(line) {
    const result = maximumSeenColor(RED, line) *
        maximumSeenColor(GREEN, line)  *
        maximumSeenColor(BLUE, line) ;
    console.log(result)
    return result;
}

const result = readFile()
    .map(line => gamePower(line))
    .reduce((a, b) => a + b, 0);

console.log(result);
