import {type, typeWithJokerRule} from "./handType.js";

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

const cardRanksWithJokerRule = {
    ...cardRanks,
    'J': 1
}

export function compareHands(handAndBid1, handAndBid2) {
    const hand1 = handAndBid1.hand;
    const hand2 = handAndBid2.hand;

    // Compare Types
    const rank1 = type(hand1).rank;
    const rank2 = type(hand2).rank;

    if (rank1 !== rank2) {
        return (rank1 - rank2) * 100; // Higher rank comes first
    }

    // Compare Card by Card
    for (let i = 0; i < hand1.length; i++) {
        const card1 = hand1[i];
        const card2 = hand2[i];

        if (card1 !== card2) {
            return cardRanks[card1] - cardRanks[card2]; // Higher character value comes first
        }
    }

    return 0;
}

export function compareHandsWithJokerRule(handAndBid1, handAndBid2) {
    const hand1 = handAndBid1.hand;
    const hand2 = handAndBid2.hand;

    // Compare Types
    const rank1 = typeWithJokerRule(hand1).rank;
    const rank2 = typeWithJokerRule(hand2).rank;

    if (rank1 !== rank2) {
        return (rank1 - rank2) * 100; // Higher rank comes first
    }

    // Compare Card by Card
    for (let i = 0; i < hand1.length; i++) {
        const card1 = hand1[i];
        const card2 = hand2[i];

        if (card1 !== card2) {
            return cardRanksWithJokerRule[card1] - cardRanksWithJokerRule[card2];
        }
    }

    return 0;
}