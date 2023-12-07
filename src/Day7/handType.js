const fiveOfAKind = {rank: 7}
const fourOfAKind = {rank: 6}
const fullHouse = {rank: 5}
const threeOfAKind = {rank: 4}
const twoPair = {rank: 3}
const onePair = {rank: 2}
const highCard = {rank: 1}

export function type(hand) {
    const labels = [...new Set(hand)]; // Get unique labels in the hand
    const counts = labels.map(label => hand.split(label).length - 1); // Count occurrences of each label

    const maxCount = Math.max(...counts);

    switch (maxCount) {
        case 5:
            return fiveOfAKind;
        case 4:
            return fourOfAKind;
        case 3:
            if (counts.includes(2)) {
                return fullHouse;
            }
            return threeOfAKind;
        case 2:
            if (counts.filter(count => count === 2).length === 2) {
                return twoPair;
            }
            return onePair;
        default:
            return highCard;
    }
}


