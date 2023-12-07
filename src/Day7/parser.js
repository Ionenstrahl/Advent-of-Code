import {readFile} from "../common/importer.js";

const parseLine = line => {
    const [hand, bid] = line.split(' ');
    return {hand, bid: parseInt(bid.match(/\d+/)[0])};
};

export const parse = () => readFile()
    .map(parseLine)
    .reduce(
        (acc, {hand, bid}) => {
            acc.push({hand: hand, bid: bid});
            return acc;
        },
        []
    );
