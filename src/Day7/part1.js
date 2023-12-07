import {parse} from "./parser.js";
import {compareHands} from "./comparer.js";

const handsAndBids = parse()

const winnings = handsAndBids
    .sort(compareHands)
    .map((handsAndBid, index) => handsAndBid.bid * (index + 1))
    .reduce((a, b) => a + b, 0);

console.log(winnings);

