import {readExample} from "../common/importer";
import {validVariations, variationList} from "./part1";

function result() {
    return readExample()
        .map(line => line.trim().split(' '))
        .map(([plan, listing]) => ({plan, listing: listing.split(',').map(Number)}))
       // .map(({plan, listing}) => ({plan: unfoldPlan(plan), listing: unfoldListing(listing)}))
        .map(({plan, listing}) => count(plan, listing, 0));
    // .map(({plan, listing}) => ({variations: generateOnlyValidVariations(plan, 0, [], listing), listing}))
    // .map(validVariationLists => validVariationLists.length)
    // .reduce((a, b) => a + b, 0);
}

function unfoldPlan(plan: string): string {
    return plan + '?' + plan + '?' + plan + '?' + plan + '?' + plan;
}

function unfoldListing(listing: number[]): number[] {
    return [].concat(listing).concat(listing).concat(listing).concat(listing).concat(listing)
}

export function generateOnlyValidVariations(input, index, current, correctListing) {
    if (index === input.length) {
        const currentList = variationList([current]);
        if (validVariations(currentList, correctListing).length > 0) {
            return [current];
        }
        return [];
    }

    if (input[index] === '?') {
        const hashVariation = generateOnlyValidVariations(input, index + 1, current + '#', correctListing);
        const dotVariation = generateOnlyValidVariations(input, index + 1, current + '.', correctListing);
        return hashVariation.concat(dotVariation);
    }

    return generateOnlyValidVariations(input, index + 1, current + input[index], correctListing);
}

function count(plan: string, listing: number[], buffer: number): number {
    if (!plan) {
        return !listing && !buffer ? 1 : 0;
    }


    let result = 0;

    if (['#', '?'].includes(plan[0])) {
        result += count(plan.slice(1), listing, buffer + 1)
    }

    if ((['.', '?'].includes(plan[0])) && (listing && listing[0] === buffer || !buffer) ) {
        const newListing: number[] = buffer > 0 ? listing.slice(1) : listing;
        result += count(plan.slice(1), newListing, buffer + 1)
    }

    return result;
}

console.log(result())