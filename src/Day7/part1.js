import {parse} from "./parser.js";
import {compareHands} from "./comparer.js";

const handsAndBids = parse()

// const sortedHands = hands.sort(compareHands);
//
// function findBid(hand){
//     console.log(hand)
//     const index = hands.indexOf(hand);
//     console.log(index)
//     console.log(bids[index])
//     console.log('')
//     return bids[index];
// }
//
// const winnings = sortedHands
//     .map((hand, index) => findBid(hand) * (index + 1))
//     .reduce((a, b) => a + b, 0);

console.log(handsAndBids);

