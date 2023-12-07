import {parse} from "./parser.js";
import {compareHands} from "./comparer.js";

const {hands, bids} = parse()

const sortedHands = hands.sort(compareHands);


console.log(sortedHands);

