import {readFile} from "../common/importer.js";
import {waysToBeat} from "./part1.js";

const [timesRaw, distancesRaw] = readFile();
const time = parseValues(timesRaw);
const distance = parseValues(distancesRaw);

function parseValues(input) {
    const stringValue = input.slice(10).replaceAll(' ', '');
    return parseInt(stringValue);
}

const result = waysToBeat(time, distance)
console.log(result)
