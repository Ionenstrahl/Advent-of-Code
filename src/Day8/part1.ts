import {readFile} from "../common/importer.js";
import {node, parseInstructions, parseNodes} from "./parser";

const file: string[] = readFile();
const instructions: string = parseInstructions(file);
export const nodes: node[] = parseNodes(file);

let startingNode: node = nodes.find(node => node.name === 'AAA');

export type Condition = (node: node) => boolean;
const endCondition: Condition = (node) => node.name === 'ZZZ';

export function getSteps(node: node, endCondition: Condition) {
    let steps: number = 0;

    while (!endCondition(node)) {
        const instruction: string = getInfiniteInstructions(steps);

        let nextNodeName: string = getNextNodeName(instruction, node);

        node = nodes.find(node => node.name === nextNodeName);

        steps++;
    }
    return steps;
}

function getInfiniteInstructions(stepsTaken: number): string {
    return instructions[stepsTaken % (instructions.length - 1) ];
}

function getNextNodeName(instruction: string, currentNode: node): string {

    if (instruction === 'R') {
        return currentNode.right;
    }
    return currentNode.left;
}

console.log(getSteps(startingNode, endCondition));