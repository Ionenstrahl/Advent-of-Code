import {readExample, readFile} from "../common/importer.js";
import {node, parseInstructions, parseNodes} from "./parser";

const file: string[] = readExample();
const instructions: string = parseInstructions(file);
const nodes: node[] = parseNodes(file);


let currentNodes: node[] = nodes.filter(node => node.name[2] === 'A');
let steps: number = 0;

while(!allEndWithZ(currentNodes)){
    const instruction: string = getInfiniteInstructions(steps);

    const newNodes= currentNodes
        .map(node => getNextNodeName(node, instruction))
        .map(nodeName => nodes.find(node => node.name === nodeName))
        .reduce((a,b) => a.concat(b), [])

    currentNodes = newNodes;

    steps++;
}

function getInfiniteInstructions(stepsTaken: number): string {
    return instructions[stepsTaken % (instructions.length - 1) ];
}

function getNextNodeName(currentNode: node, instruction: string): string {

    if (instruction === 'R') {
        return currentNode.right;
    }
    return currentNode.left;
}

function allEndWithZ(nodesToCheck: node[]): boolean {
    return nodesToCheck.every(node => node.name[2] === 'Z');
}

console.log(steps);