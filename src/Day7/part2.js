import {parse} from "./parser.js";
import {compareHands, compareHandsWithJokerRule} from "./comparer.js";

const handsAndBids = parse()

const winnings = handsAndBids
    .sort(compareHandsWithJokerRule)
    .map((handsAndBid, index) => handsAndBid.bid * (index + 1))
    .reduce((a, b) => a + b, 0);

console.log(winnings);
