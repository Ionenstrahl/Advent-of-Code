const HAND_TYPES = {
    FIVE_OF_A_KIND: {rank: 7},
    FOUR_OF_A_KIND: {rank: 6},
    FULL_HOUSE: {rank: 5},
    THREE_OF_A_KIND: {rank: 4},
    TWO_PAIR: {rank: 3},
    ONE_PAIR: {rank: 2},
    HIGH_CARD: {rank: 1},
};

function getUniqueLabels(hand) {
    return [...new Set(hand)];
}

function getCounts(hand, labels) {
    return labels.map((label) => hand.split(label).length - 1);
}

function hasPair(counts, pairCount) {
    return counts.filter((count) => count === 2).length === pairCount;
}

function type(hand) {
    const labels = getUniqueLabels(hand);
    const counts = getCounts(hand, labels);
    const maxCount = Math.max(...counts);

    switch (maxCount) {
        case 5:
            return HAND_TYPES.FIVE_OF_A_KIND;
        case 4:
            return HAND_TYPES.FOUR_OF_A_KIND;
        case 3:
            return hasPair(counts, 1) ? HAND_TYPES.FULL_HOUSE : HAND_TYPES.THREE_OF_A_KIND;
        case 2:
            return hasPair(counts, 2) ? HAND_TYPES.TWO_PAIR : HAND_TYPES.ONE_PAIR;
        default:
            return HAND_TYPES.HIGH_CARD;
    }
}

function typeWithJokerRule(hand) {
    const labels = getUniqueLabels(hand);

    let jokerCount = 0;

    const counts = labels.map(
        (label) => label === 'J' ? ((jokerCount = hand.split(label).length - 1), 0) : hand.split(label).length - 1
    );

    const maxCount = Math.max(...counts);

    switch (maxCount + jokerCount) {
        case 5:
            return HAND_TYPES.FIVE_OF_A_KIND;
        case 4:
            return HAND_TYPES.FOUR_OF_A_KIND;
        case 3:
            return jokerCount === 0
                ? hasPair(counts, 1)
                    ? HAND_TYPES.FULL_HOUSE
                    : HAND_TYPES.THREE_OF_A_KIND
                : hasPair(counts, 2)
                    ? HAND_TYPES.FULL_HOUSE
                    : HAND_TYPES.THREE_OF_A_KIND;
        case 2:
            return hasPair(counts, 2) ? HAND_TYPES.TWO_PAIR : HAND_TYPES.ONE_PAIR;
        default:
            return HAND_TYPES.HIGH_CARD;
    }
}

export {type, typeWithJokerRule};
