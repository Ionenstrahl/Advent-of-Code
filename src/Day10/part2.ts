import {file, isPipeAtPosition, loopPipes, pipes} from "./part1";
import {Pipe} from "./pipes";

let enclosedTiles: number = 0;

for (let y = 0; y < file.length; y++) {
    let enclosingPipes = 0;
    let lastSymbol = '.';

    for (let x = 0; x < file[0].trim().length; x++) {
        const tile = pipes.find(isPipeAtPosition({x, y}));

        if (isLoopPipe(tile)) {
            if (isEnclosingPipe(tile, lastSymbol)){
                enclosingPipes++;
            }

            if (tile.symbol === 'F' || tile.symbol ===  'L') {
                lastSymbol = tile.symbol;
            }
            if (tile.symbol === 'S') {
                lastSymbol = 'L';
            }

            continue;
        }

        if (isEnclosedByLoop(enclosingPipes)) {
            enclosedTiles++;
        }
    }

}

function isLoopPipe(tile) {
    return loopPipes.some(isPipeAtPosition(tile.position))
}

function isEnclosingPipe(tile: Pipe, lastSymbol: string) {
    if (tile.symbol === '|') {
        return true;
    }
    if (tile.symbol === 'J' && lastSymbol === 'F') {
        return true;
    }
    if (tile.symbol === '7' && lastSymbol === 'L') {
        return true;
    }
    return false;
}

function isEnclosedByLoop(loopPipeTiles: number) {
    return loopPipeTiles % 2 == 1;
}

console.log(enclosedTiles)
