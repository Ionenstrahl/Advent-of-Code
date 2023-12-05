import {readFile} from "../common/importer.js";
import {winningNumbers, yourNumbers} from "./part1.js";

function calculateExtraCards(yourNumbers, winningNumbers) {
    return yourNumbers.filter(number => winningNumbers.includes(number)).length;
}

const extraCards = readFile()
    .map(line => calculateExtraCards(yourNumbers(line), winningNumbers(line)))

const scoreNextCard = (cardNumber, total) => {
    let newTotal = total + 1;

    const firstCopyCardNumber = cardNumber + 1;
    const lastCopyCardNumber = cardNumber + 1 + extraCards[cardNumber - 1];
    for (let i = firstCopyCardNumber; i < lastCopyCardNumber; i++) {
        newTotal = scoreNextCard(i, newTotal);
    }

    return newTotal;
}

const originalAndCopies = extraCards
    .map((extraCards, index) => scoreNextCard(index, 0))
    .reduce((a, b) => a + b, 0);

console.log(originalAndCopies)
