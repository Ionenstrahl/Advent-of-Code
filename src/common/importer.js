import * as fs from 'fs';

const INPUT_PATH = 'input';
const EXAMPLE_PATH = 'example';

export function readFile() {
    const fileContent = fs.readFileSync(INPUT_PATH, 'utf-8');
    const lines = fileContent.split('\n');
    return lines.filter(line => line.length > 0);
}

export function readExample() {
    const fileContent = fs.readFileSync(EXAMPLE_PATH, 'utf-8');
    const lines = fileContent.split('\n');
    return lines.filter(line => line.length > 0);
}
