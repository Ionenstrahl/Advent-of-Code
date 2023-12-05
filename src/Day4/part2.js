import {readExample} from "../common/importer.js";
import {numbers, winningNumbers, yourNumbers} from "./part1.js";

export const cardNumber = (line) => {
    const cardNumberRegex = /([^Card:]+)/

    return numbers(line, cardNumberRegex);
}

function amountOfExtraCards(yourNumbers, winningNumbers) {
    return yourNumbers.filter(number => winningNumbers.includes(number)).length;
}

const cardNumbersAndExtraCards = readExample()
    .map(line => [cardNumber(line), winningNumbers(line), yourNumbers(line)])
    .map(([cardNumber, winningNumbers, yourNumbers]) => [cardNumber[0], amountOfExtraCards(yourNumbers, winningNumbers)])

const copyCard = (cardNumber, total) => {
    console.log('cardNumber: ' + cardNumber);
    const extraCards = cardNumbersAndExtraCards[cardNumber-1][1];
    console.log('extraCards for ' + cardNumber + ' : ' + extraCards);
    let newTotal = total + 1;
    console.log(newTotal);

    for (let i = cardNumber + 1; i < cardNumber + extraCards + 1; i++) {
        newTotal = copyCard(i, newTotal);
    }
    return newTotal;
}

console.log(cardNumbersAndExtraCards);

const originalAndCopies = cardNumbersAndExtraCards
    .map(([cardNumber, extraCards]) => copyCard(cardNumber, 0))
    .reduce((a, b) => a + b, 0);


console.log(originalAndCopies)
