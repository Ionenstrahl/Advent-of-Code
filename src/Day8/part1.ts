import {readExample, readFile} from "../common/importer.js";
import {parseInstructions, parseNodes} from "./parser";

const file: string[] = readExample();
const instructions: string = parseInstructions(file);
const nodes = parseNodes(file);

console.log(nodes);