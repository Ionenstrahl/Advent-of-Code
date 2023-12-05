import { readFile} from "../common/importer.js";
import {groupNumbers, numbers, positionsAroundSymbol, symbolPositions} from "./part1.js";

const numbersAroundSymbol = (x, y) => numberPositions
        .filter(numberArray => numberArray.some(([numberX, numberY]) => positionsAroundSymbol(x, y).some(
            ([xAroundSymbol, yAroundSymbol]) => numberX === xAroundSymbol && numberY === yAroundSymbol)))


const numberPositions = readFile()
    .map((line, index) => numbers(line, index))
    .reduce((a, b) => a.concat(b), [])
    .reduce(groupNumbers(), [])

const result = readFile()
    .map((line, index) => symbolPositions(line, index))
    .reduce((a, b) => a.concat(b), [])
    .map(([x, y]) => numbersAroundSymbol(x, y))
    .filter(numbersAroundSymbols => numbersAroundSymbols.length === 2)
    .map(numbersAroundSymbols => parseInt(numbersAroundSymbols[0][0][2]) * parseInt(numbersAroundSymbols[1][0][2] ))
    .reduce((a, b) => a + b, 0);

console.log(result);
