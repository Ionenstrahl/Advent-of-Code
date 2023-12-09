import {readExample, readFile} from "../common/importer";

const file: string[] = readFile();
export const sequences = file
    .map(line => line.split(' ').map(Number));

const result = sequences
    .map(sequence => getSequences(sequence))
    .map(sequences => addLastNumber(sequences))
    .map(sequences => sequences[0][sequences[0].length - 1])
    .reduce((a, b) => a + b, 0);

export function getSequences(sequence: number[]):number[][] {
    return getNextSequences([sequence]);
}

function getNextSequences(sequences: number[][]) {
    const lastSequence = sequences[sequences.length - 1];

    if (lastSequence.every(number => number == 0)) {
        return sequences;
    }

    let newSequence: number[] = [];
    for(let i = 1; i < lastSequence.length; i++){
        newSequence.push(lastSequence[i] - lastSequence[i - 1])
    }

    sequences.push(newSequence);
    return getNextSequences(sequences);
}

function addLastNumber(sequences: number[][]): number[][] {
    const lastSequence = sequences[sequences.length - 1];
    lastSequence.push(0);

    for(let i = sequences.length - 2; i >= 0; i--){
        const currentSequence = sequences[i];
        const lastElement = currentSequence[currentSequence.length - 1];

        const previousSequence = sequences[i + 1];
        const delta = previousSequence[previousSequence.length - 1];

        currentSequence.push(lastElement + delta);

    }

    return sequences;
}

console.log(result);