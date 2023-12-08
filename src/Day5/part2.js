import {lines, maps, mapSeedsToLocations} from "./part1.js";

const seedRanges = lines[0].trim().slice(7).split(' ').map(Number);
let min = Infinity;

for (let i = 0; i < seedRanges.length; i += 2) {
    const start = seedRanges[i];
    const length = seedRanges[i + 1];

    for (let j = 0; j < length; j++) {
        const currentSeed = start + j;
        min = Math.min(min, mapSeedsToLocations([currentSeed], maps)[0]);
    }
}

console.log(min)