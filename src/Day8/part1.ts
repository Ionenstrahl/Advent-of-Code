import {readExample, readFile} from "../common/importer.js";
import {node, parseInstructions, parseNodes} from "./parser";

const file: string[] = readExample();
const instructions: string = parseInstructions(file);
const nodes: node[] = parseNodes(file);

let currentNode: node = nodes[0];
let steps = 0;

function getNextNodeName(instruction: string) {
    if (instruction === 'R') {
        return currentNode.right;
    }
    return currentNode.left;
}

while(currentNode.name !== 'ZZZ'){
    const instruction: string = instructions[steps % (instructions.length -1 )]

    let nextNodeName = getNextNodeName(instruction);

    currentNode = nodes.find(node => node.name === nextNodeName);
    steps++;
}

console.log(steps);