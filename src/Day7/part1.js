import {parse} from "./parser.js";

const parseLine = line => {
    const [hand, bid] = line.split(' ');
    return { hand, bid: parseInt(bid.match(/\d+/)[0]) };
};

const { hands, bids } = parse()

console.log("Hands:", hands);
console.log("Bids:", bids);
