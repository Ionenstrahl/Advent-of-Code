import {readFile} from "../common/importer.js";

const [timesRaw, distancesRaw] = readFile();
const times = parseValues(timesRaw);
const distances = parseValues(distancesRaw);

function parseValues(input) {
    return input.slice(10).trim().match(/(\d+)/g).map(Number);
}

export const waysToBeat = (timeAvailable, distanceToBeat) => {
    let wins = 0;

    for (let timeCharging = 0; timeCharging <= timeAvailable; timeCharging++){
        const timeMoving = timeAvailable - timeCharging;    // [ms]
        const velocity = timeCharging                       // [m/s]
        const distanceMoved = timeMoving * velocity;        // [mm]

        if(distanceMoved > distanceToBeat){
            wins++;
        }
    }

    return wins;
}

const result = times
    .map((time, index) => waysToBeat(time, distances[index]))
    .reduce((a,b) => a * b, 1)

console.log(result);