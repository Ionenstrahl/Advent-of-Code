import {readExample} from "../common/importer";
import {generateVariations, validVariations, variationList} from "./part1";

function result() {
    return readExample()
        .map(line => line.trim().split(' '))
        .map(([plan, listing]) => ({plan, listing: listing.split(',').map(Number)}))
        .map(({plan, listing}) => ({plan: unfoldPlan(plan), listing: unfoldListing(listing)}))
        .map(({plan, listing}) => ({variations: generateVariations(plan, 0, []), listing}))
        .map(({variations, listing}) => ({variationLists: variationList(variations), listing}))
        .map(({variationLists: variationLists, listing}) => validVariations(variationLists, listing))
        .map(validVariationLists => validVariationLists.length)
        .reduce((a, b) => a + b, 0);

}

function unfoldPlan(plan: string):string{
    return plan + '?' + plan + '?' + plan + '?' + plan + '?' + plan;
}

function unfoldListing(listing: number[]):number[]{
    return [].concat(listing).concat(listing).concat(listing).concat(listing).concat(listing)
}

console.log(result())