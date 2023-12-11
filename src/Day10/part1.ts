import {readExample, readFile} from "../common/importer";
import {Direction, Pipe, pipeTransformations} from "./pipes";

export const file = readExample();
export const pipes: Pipe[] = file.flatMap(
    (line, index) => createPipes(line, index)
)

function createPipes(line: string, lineNumber: number): Pipe[] {
    return line.trim().split('')
        .map((symbol, index) => {
            return {
                position: {
                    x: index,
                    y: lineNumber,
                },
                transformations: pipeTransformations[symbol],
                symbol: symbol
            };
        });

}

let direction = Direction.right;
let pipe = pipes.find(pipe => pipe.symbol === 'S');
let distance = 0;
export const loopPipes = []

while(distance == 0 || pipe.symbol !== 'S'){
    const oldDirection = direction;
    direction = pipe.transformations.find(transformation => transformation.input == oldDirection).output;

    const newPosition = move(pipe.position, direction);
    pipe = pipes.find(pipe => pipe.position.x === newPosition.x && pipe.position.y === newPosition.y);
    loopPipes.push(pipe);

    distance++;
}

export function move(position, direction){
    if (direction == Direction.right){
        return {
            x: position.x + 1,
            y: position.y
        }
    }
    if (direction == Direction.left){
        return {
            x: position.x - 1,
            y: position.y
        }
    }
    if (direction == Direction.up){
        return {
            x: position.x,
            y: position.y - 1
        }
    }
    if (direction == Direction.down){
        return {
            x: position.x,
            y: position.y + 1
        }
    }
}

console.log(loopPipes.length)