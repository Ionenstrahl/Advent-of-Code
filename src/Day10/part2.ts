import {file, loopPipes, pipes} from "./part1";

let enclosedTiles: number = 0;

for (let y = 0; y < file.length; y++) {
    let loopPipeTiles = 0;
    let lastSymbol = '.';

    for (let x = 0; x < file[0].trim().length; x++) {
        const tile = pipes.find(pipe => pipe.position.x === x && pipe.position.y === y);

        if (isLoopPipe(tile)) {
            if (tile.symbol === '|') {
                loopPipeTiles++;
            }
            if (tile.symbol === 'J' && lastSymbol === 'F') {
                loopPipeTiles++;
            }
            if (tile.symbol === '7' && lastSymbol === 'L') {
                loopPipeTiles++;
            }

            if (tile.symbol === 'F' || tile.symbol ===  'L') {
                lastSymbol = tile.symbol;
            }
            if (tile.symbol === 'S') {
                lastSymbol = 'L';
            }

            continue;
        }
        if (loopPipeTiles % 2 == 1) {
            enclosedTiles++;
        }
    }

}

function isLoopPipe(tile) {

    return loopPipes.some(pipe => pipe.position.x === tile.position.x && pipe.position.y === tile.position.y)
}

console.log(enclosedTiles)
