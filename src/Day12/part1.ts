import {readExample, readFile} from "../common/importer";

function result() {
    return readFile()
        .map(line => line.trim().split(' '))
        .map(([plan, listing]) => ({plan, listing: listing.split(',').map(Number)}))
        .map(({plan, listing}) => ({variations: generateVariations(plan, 0, []), listing}))
        .map(({variations, listing}) => ({variationLists: variationList(variations), listing}))
        .map(({
                  variationLists: variationLists,
                  listing
              }) => variationLists.filter(variationList => JSON.stringify(variationList) == JSON.stringify(listing)))
        .map(validVariationLists => validVariationLists.length)
        .reduce((a, b) => a + b, 0);

}

function generateVariations(input, index, current) {
    if (index === input.length) {
        return [current];
    }

    if (input[index] === '?') {
        const hashVariation = generateVariations(input, index + 1, current + '#');
        const dotVariation = generateVariations(input, index + 1, current + '.');
        return hashVariation.concat(dotVariation);
    }

    return generateVariations(input, index + 1, current + input[index]);
}

function variationList(variations: string[]){
    return variations.map(variation => countConsecutiveHashes(variation))
}

function countConsecutiveHashes(input) {
    let consecutiveCounts = [];
    let currentCount = 0;

    for (let char of input) {
        if (char === '#') {
            currentCount++;
        } else if (currentCount > 0) {
            consecutiveCounts.push(currentCount);
            currentCount = 0;
        }
    }

    // Add the count of consecutive '#' at the end if any
    if (currentCount > 0) {
        consecutiveCounts.push(currentCount);
    }

    return consecutiveCounts;
}


console.log(result());