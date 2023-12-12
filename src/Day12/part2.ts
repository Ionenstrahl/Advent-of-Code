import {readExample} from "../common/importer";

function result() {
    return readExample()
        .map(line => line.trim().split(' '))
        .map(([plan, listing]) => ({plan, listing: listing.replaceAll(',', '')}))
        .map(({plan, listing}) => ({plan: unfoldPlan(plan), listing: unfoldListing(listing)}))
        .map(({plan, listing}) => count(plan, listing))
        .reduce((a, b) => a + b, 0);
}

function unfoldPlan(plan: string): string {
    return plan + '?' + plan + '?' + plan + '?' + plan + '?' + plan;
}

function unfoldListing(listing: string): string {
    return listing + listing + listing + listing + listing
}

    function count(plan: string, listing: string, buffer: number = 0): number {
        if (plan.length == 0) {
            if (listing.length == 0 && buffer == 0 || listing.length == 1 && parseInt(listing[0]) == buffer) {
                return 1;
            }
            return 0;
        }

        let result = 0;

        if (['#', '?'].includes(plan[0])) {
            result += count(plan.slice(1), listing, buffer + 1)
        }

        if ((['.', '?'].includes(plan[0])) && (listing.length > 0 && parseInt(listing[0]) == buffer || buffer == 0)) {
            const newListing: string = buffer > 0 ? listing.slice(1) : listing;
            result += count(plan.slice(1), newListing)
        }

        return result;
    }

    console.log(result())