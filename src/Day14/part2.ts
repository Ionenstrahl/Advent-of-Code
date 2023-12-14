import {readFile} from "../common/importer";
import {parseColumns, tiltNorth, torque} from "./part1";

function rotateClockwise(columns: string[]): string[] {
    const amountOfNewColumns: number = columns[0].length;

    const rows: string[] = []
    for (let i = 0; i < amountOfNewColumns; i++) {
        const row: string = columns
            .map((column: string) => column[amountOfNewColumns - 1 - i])
            .reduce((a: string, b: string) => a + b, '')
        rows.push(row);
    }

    return rows;
}

function cycle(columnsFacingNorthButNotTilted: string[]) {
    const colN = columnsFacingNorthButNotTilted.map((column: string) => tiltNorth(column))
    const colW = rotateClockwise(colN).map(column => tiltNorth(column))
    const colS = rotateClockwise(colW).map(column => tiltNorth(column))
    const colE = rotateClockwise(colS).map(column => tiltNorth(column))
    return rotateClockwise(colE);

}

function allCycles(lastFormation: string[]) {
    const rockFormations = [];

    let currentCycle = 0;
    const cycles = 1000000000;
    let period = 0;

    while (currentCycle < cycles) {
        lastFormation = cycle(lastFormation);
        currentCycle++;

        const jsonFormation = JSON.stringify(lastFormation);
        if (period == 0 && rockFormations.includes(jsonFormation)) {
            period = rockFormations.length - rockFormations.indexOf(jsonFormation);
            currentCycle += redundantCycles(cycles, currentCycle, period);
        }

        rockFormations.push(JSON.stringify(lastFormation));
    }


    return lastFormation;
}

function redundantCycles(cycles: number, currentCycle: number, period: number) {
    return Math.floor((cycles - currentCycle) / period) * period;
}

function totalTorque(): number {
    const file: string[] = readFile();
    const columns = parseColumns(file);

    return allCycles(columns)
        .map((column: string) => torque(column))
        .reduce((a: number, b: number) => a + b, 0)
}

console.log(totalTorque());