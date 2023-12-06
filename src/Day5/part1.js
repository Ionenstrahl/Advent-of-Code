// Input seeds
const seeds = [79, 14, 55, 13];

// Define maps for each stage
const maps = {
    seedToSoil: [
        [50, 98, 2],
        [52, 50, 48]
    ],
    soilToFertilizer: [
        [0, 15, 37],
        [37, 52, 2],
        [39, 0, 15]
    ],
    fertilizerToWater: [
        [49, 53, 8],
        [0, 11, 42],
        [42, 0, 7],
        [57, 7, 4]
    ],
    waterToLight: [
        [88, 18, 7],
        [18, 25, 70]
    ],
    lightToTemperature: [
        [45, 77, 23],
        [81, 45, 19],
        [68, 64, 13]
    ],
    temperatureToHumidity: [
        [0, 69, 1],
        [1, 0, 69]
    ],
    humidityToLocation: [
        [60, 56, 37],
        [56, 93, 4]
    ]
};

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
