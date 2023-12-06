import {readFile} from "../common/importer.js";

const file = readFile();
const times = file[0].slice(10).trim().match(/(\d+)/g).map(Number);
const distances = file[1].slice(10).trim().match(/(\d+)/g).map(Number);

const waysToBeat = (index) => {
    let wins = 0;
    const timeAvailable = times[index];
    const distanceToBeat = distances[index];

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

const result = Array.from(times.keys())
    .map(index => waysToBeat(index))
    .reduce((a,b) => a * b, 1)

console.log(result);