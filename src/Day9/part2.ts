import {getSequences, sequences} from "./part1";


function addFirstNumber(sequences: number[][]): number[][] {
    const lastSequence = sequences[sequences.length - 1];
    lastSequence.unshift(0);

    for(let i = sequences.length - 2; i >= 0; i--){
        const currentSequence = sequences[i];
        const lastElement = currentSequence[0];

        const previousSequence = sequences[i + 1];
        const delta = previousSequence[0];

        currentSequence.unshift(lastElement - delta);
    }

    return sequences;
}

const result = sequences
    .map(sequence => getSequences(sequence))
    .map(sequences => addFirstNumber(sequences))
   .map(sequences => sequences[0][0])
   .reduce((a, b) => a + b, 0);

console.log(result);