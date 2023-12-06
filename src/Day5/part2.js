import {lines, maps, mapSeedsToLocations} from "./part1.js";

const seedRanges = lines[0].trim().slice(7).split(' ').map(Number);

// Function to generate an array of seeds from a range
function generateSeedsFromRange(start, length) {
    return Array.from({ length }, (_, index) => start + index);
}

// Generate the array of seeds from the seed ranges
const seeds = [];
for (let i = 0; i < seedRanges.length; i += 2) {
    console.log(i)
    console.log(seedRanges[i])
    const start = seedRanges[i];
    const length = seedRanges[i + 1];
    seeds.push(...generateSeedsFromRange(start, length));
}

const min = mapSeedsToLocations(seeds, maps)
    .reduce((a, b) => Math.min(a, b), 9999999999999)

console.log(min)