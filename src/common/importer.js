import * as fs from 'fs';

const path = 'input';

export function readFile() {
    const fileContent = fs.readFileSync(path, 'utf-8');
    const lines = fileContent.split('\n');
    return lines.filter(line => line.length > 0);
}
