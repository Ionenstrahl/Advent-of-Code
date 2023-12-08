import {readFile} from "../common/importer.js";
import {node, parseInstructions, parseNodes} from "./parser";

const file: string[] = readFile();
const instructions: string = parseInstructions(file);
const nodes: node[] = parseNodes(file);


let currentNode: node = nodes.find(node => node.name === 'AAA');
let steps: number = 0;

while(currentNode.name !== 'ZZZ'){
    const instruction: string = getInfiniteInstructions(steps);

    let nextNodeName: string = getNextNodeName(instruction);

    currentNode = nodes.find(node => node.name === nextNodeName);

    steps++;
}

function getInfiniteInstructions(stepsTaken: number): string {
    return instructions[stepsTaken % (instructions.length - 1) ];
}

function getNextNodeName(instruction: string): string {

    if (instruction === 'R') {
        return currentNode.right;
    }
    return currentNode.left;
}

console.log(steps);