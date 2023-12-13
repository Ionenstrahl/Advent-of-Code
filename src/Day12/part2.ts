import {readExample, readFile} from "../common/importer";

// Memoization cache
let memo: Record<string, number> = {};


function result() {
    return readFile()
        .map(line => line.trim().split(' '))
        .map(([plan, listing]) => ({plan, listing: listing.replaceAll(',', '')}))
        .map(({plan, listing}) => ({plan: unfoldPlan(plan), listing: unfoldListing(listing)}))
        .map(({plan, listing}) => {memo = {};return count(plan, listing)})
        .reduce((a, b) => a + b, 0);
}

function unfoldPlan(plan: string): string {
    return plan + '?' + plan + '?' + plan + '?' + plan + '?' + plan;
}

function unfoldListing(listing: string): string {
    return listing + listing + listing + listing + listing
}

    function count(plan: string, listing: string, buffer: number = 0): number {
    const key = plan + "," + listing + "," + buffer;
        if (key in memo) {
            return memo[key];
        }


        if (plan.length == 0) {
            if (listing.length == 0 && buffer == 0 || listing.length == 1 && Number(listing[0]) == buffer) {
                return 1;
            }
            return 0;
        }

        let result = 0;

        if (['#', '?'].includes(plan[0])) {
            result += count(plan.slice(1), listing, buffer + 1)
        }

        if ((['.', '?'].includes(plan[0])) && (listing.length > 0 && Number(listing[0]) == buffer || buffer == 0)) {
            const newListing: string = buffer > 0 ? listing.slice(1) : listing;
            result += count(plan.slice(1), newListing)
        }

        memo[key] = result;

        return result;
    }

    console.log(result())
//console.log(memo)