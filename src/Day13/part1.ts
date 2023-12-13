import { readFile} from "../common/importer";

export const file: string[] = readFile();

const result = file
    .reduce(formatPatterns(), [])
    .map(pattern => findMirror(pattern))
    .reduce((a, b) => a + b, 0)
console.log(result);

export function formatPatterns() {
    return (patternArray: string[][][], newLine: string) => {
        const line: string[] = newLine.trim().split('')

        if (patternArray.length == 0) {
            return patternArray.concat([[line]])
        }

        if (line.length == 0) {
            return patternArray.concat([[]])
        }

        patternArray[patternArray.length - 1].push(line)
        return patternArray
    }
}

function findMirror(pattern: string[][]): number {
    return findVerticalMirror(pattern) + findHorizontalMirror(pattern);

}

function findVerticalMirror(pattern: string[][]): number {
    const row: string[] = pattern[0];
    return row
        .map((_, index) => index)
        .filter(index => index < row.length - 1)
        .filter(index => areMirrorColumns(pattern, index, index + 1))
        .filter(index => isVerticalMirror(index, pattern))
        .map(index => index + 1)
        .reduce((a, b) => a + b, 0);

}

function areMirrorColumns(pattern: string[][], index1: number, index2: number) {
    const columnLength: number = pattern.length;

    for (let i = 0; i < columnLength; i++) {
        const columnElement = pattern[i][index1];
        const mirrorElement = pattern[i][index2];

        if (columnElement !== mirrorElement) {
            return false;
        }
    }
    return true;
}

function isVerticalMirror(index: number, pattern: string[][]): boolean {
    const columnNumber = index + 1;
    const relevantColumns: number = Math.min(columnNumber, pattern[0].length  - columnNumber);

    for (let i = index; i > index - relevantColumns; i--) {
        const columnIndex = i;
        const mirrorColumnIndex: number = index + 1 + (index - i);

        if (!areMirrorColumns(pattern, columnIndex, mirrorColumnIndex)) {
            return false;
        }
    }

    return true;
}


function findHorizontalMirror(pattern: string[][]): number {
    return pattern
        .map((row, index) => ({row, index}))
        .filter(({index}) => index < pattern.length - 1)
        .filter(({row, index}) => JSON.stringify(row) === JSON.stringify(pattern[index + 1]))
        .filter(({row, index}) => isHorizontalMirror(index, pattern))
        .map(({index}) => (index + 1) * 100)
        .reduce((a, b) => a + b, 0)

}
function isHorizontalMirror(index: number, pattern: string[][]): boolean {
    const rowNumber = index + 1;
    const relevantRows: number = Math.min(rowNumber, pattern.length - rowNumber);

    for (let i = index; i > index - relevantRows; i--) {
        const row = pattern[i];
        const mirror = pattern[index + 1 + (index - i)];

        if (JSON.stringify(row) !== JSON.stringify(mirror)) {
            return false;
        }
    }

    return true;
}
