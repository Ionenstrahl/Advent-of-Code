import {type} from "./handType.js";

const cardRanks = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'T': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14,
};

export function compareHands(hand1, hand2) {

    // Compare Types
    const rank1 = type(hand1).rank;
    const rank2 = type(hand2).rank;

    if (rank1 !== rank2) {
        return (rank2 - rank1) * 100; // Higher rank comes first
    }

    // Compare Card by Card
    for (let i = 0; i < hand1.length; i++) {
        const card1 = hand1[i];
        const card2 = hand2[i];

        if (card1 !== card2) {
            return cardRanks[card2] - cardRanks[card1]; // Higher character value comes first
        }
    }

    return 0;
}