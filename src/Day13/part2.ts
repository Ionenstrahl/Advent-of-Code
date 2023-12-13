import {file, formatPatterns} from "./part1";

const result = file
    .reduce(formatPatterns(), [])
    .map(pattern => findSmudgedMirror(pattern))
    .reduce((a, b) => a + b, 0)
console.log(result);

function findSmudgedMirror(pattern: string[][]): number {
    return smudgedVertical(pattern) + smudgedHorizontal(pattern);
}

function smudgedVertical(pattern: string[][]): number {
    const row: string[] = pattern[0];
    return row
        .map((_, index) => index)
        .filter(index => index < row.length - 1)
        .filter(index => [0, 1].includes(countSmudgesFromColumns(pattern, index, index + 1)))
        .filter(index => isVerticalMirror(index, pattern))
        .map(index => index + 1)
        .reduce((a, b) => a + b, 0)

}


function countSmudgesFromColumns(pattern: string[][], index1: number, index2: number) {
    const columnLength: number = pattern.length;

    let smudgeCount = 0;

    for (let i = 0; i < columnLength; i++) {
        const columnElement = pattern[i][index1];
        const mirrorElement = pattern[i][index2];

        if (columnElement !== mirrorElement) {
            smudgeCount++;
        }
    }
    return smudgeCount;
}

function isVerticalMirror(index: number, pattern: string[][]): boolean {
    const columnNumber = index + 1;
    const relevantColumns: number = Math.min(columnNumber, pattern[0].length  - columnNumber);

    let smudgeCount = 0;

    for (let i = index; i > index - relevantColumns; i--) {
        const columnIndex = i;
        const mirrorColumnIndex: number = index + 1 + (index - i);

        smudgeCount += countSmudgesFromColumns(pattern, columnIndex, mirrorColumnIndex);
    }

    return smudgeCount == 1;
}

function smudgedHorizontal(pattern: string[][]): number {
    return pattern
        .map((row, index) => ({row, index}))
        .filter(({index}) => index < pattern.length - 1)
        .filter(({row, index}) => [0, 1].includes(countSmudgesFromRows(row, pattern[index + 1])))
        .filter(({row, index}) => isSmudgedHorizontal(index, pattern))
        .map(({index}) => (index + 1) * 100)
        .reduce((a, b) => a + b, 0)
}

function countSmudgesFromRows(row: string[], mirror: string[]) {
    return row
        .map((_, rowElement) => rowElement)
        .filter(rowElement => row[rowElement] !== mirror[rowElement])
        .reduce((a, b) => a + 1, 0);
}

function isSmudgedHorizontal(index: number, pattern: string[][]): boolean {
    const rowNumber = index + 1;
    const relevantRows: number = Math.min(rowNumber, pattern.length - rowNumber);

    let smudgeCount: number = 0;

    for (let i = index; i > index - relevantRows; i--) {
        const row = pattern[i];
        const mirror = pattern[index + 1 + (index - i)];

        smudgeCount += countSmudgesFromRows(row, mirror);
    }

    return smudgeCount == 1;
}
