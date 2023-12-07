import {readExample} from "../common/importer.js";

const parseLine = line => {
    const [hand, bid] = line.split(' ');
    return {hand, bid: parseInt(bid.match(/\d+/)[0])};
};

export const parse = () => readExample()
    .map(parseLine)
    .reduce(
        (acc, {hand, bid}) => {
            acc.hands.push(hand);
            acc.bids.push(bid);
            return acc;
        },
        {hands: [], bids: []}
    );
