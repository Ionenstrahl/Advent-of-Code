import {readExample, readFile} from "../common/importer.js";

const lines = readFile()

// Parse seeds from the first line
const seeds = lines[0].trim().slice(7).split(' ').map(Number);

// Initialize the maps object
const maps = {};

// Helper function to parse a map from lines
function parseMap(lines) {
    return lines.map(line => line.trim().split(' ').map(Number));
}

// Iterate through the lines and parse maps based on section headers
let currentMapName = '';
let currentMapLines = [];

for (const line of lines.slice(1)) {
    if (line.trim().endsWith(' map:')) {
        // Save the current map
        if (currentMapName && currentMapLines.length > 0) {
            maps[currentMapName] = parseMap(currentMapLines);
        }

        // Start a new map section
        currentMapName = line.trim().replace(' map:', '');
        currentMapLines = [];
    } else {
        // Collect lines for the current map
        currentMapLines.push(line);
    }
}

// Save the last map
if (currentMapName && currentMapLines.length > 0) {
    maps[currentMapName] = parseMap(currentMapLines);
}

// Function to map value to location based on a given map
function mapValueToLocation(value, map) {
    let result = value;
    for (const mapping of map) {
        if (value >= mapping[1] && value < mapping[1] + mapping[2]) {
            result = mapping[0] + value - mapping[1];
            break;
        }
    }
    return result;
}

// Function to map seeds to locations
function mapSeedsToLocations(seeds, maps) {
    let result = seeds;
    for (const stage in maps) {
        result = result.map(seed => mapValueToLocation(seed, maps[stage]));
    }
    return result;
}

// Map seeds to locations
const locations = mapSeedsToLocations(seeds, maps);

// Display the results
console.log("Seeds:", seeds);
console.log("Locations:", locations);

const min = locations.reduce((a, b) => Math.min(a, b), 9999999999999)


console.log(min)

