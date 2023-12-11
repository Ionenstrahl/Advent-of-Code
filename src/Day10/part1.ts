import {readExample, readFile} from "../common/importer";
import {Direction, Pipe, pipeTransformations} from "./pipes";

const file = readFile();
const pipes: Pipe[] = file.flatMap(
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

const startPipe = pipes.find(pipe => pipe.symbol === 'S');

function nextPipe  (pipe: Pipe, direction: Direction, distance: number) :number{
    const newDirection = pipe.transformations.find(transformation => transformation.input == direction).output;
    const newPosition = move(pipe.position, newDirection);
    const newPipe = pipes.find(pipe => pipe.position.x === newPosition.x && pipe.position.y === newPosition.y);
    distance++;

    console.log(distance +': ' + pipe.symbol +  ' -> ' + newPipe.symbol);
    if (newPipe.symbol == 'S'){
        return distance;
    }

    return nextPipe(newPipe, newDirection, distance);
}

function move(position, direction){
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


const totaldistance = nextPipe(startPipe, Direction.right, 0);
console.log(totaldistance / 2)