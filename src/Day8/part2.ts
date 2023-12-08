import {node} from "./parser";
import {Condition, getSteps, nodes} from "./part1";

let startingNodes: node[] = nodes.filter(node => node.name.endsWith('A'));
const endCondition: Condition = (node) => node.name.endsWith('Z');

const steps = startingNodes
    .map(node => getSteps(node, endCondition))
    .reduce((a, b) => lcm(a, b), 1)

function gcd(a, b) {
    // Euclidean algorithm to find GCD
    return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
    // LCM formula
    return Math.abs(a * b) / gcd(a, b);
}

console.log(steps);