import {readExample, readFile} from "../common/importer.js";

const file = readExample();
const times = file[0].slice(10).trim().match(/(\d+)/g).map(Number);
const distances = file[1].slice(10).trim().match(/(\d+)/g).map(Number);




console.log(distances)
