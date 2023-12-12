import { readFile} from "../common/importer";
import {Galaxy} from "./galaxy";

const input = readFile();
const expansion = 1000000;

const galaxies: Galaxy[] = input
    .flatMap((line, y) => line.split('').map((skyTile, x) => ({
        skyTile,
        galaxy: {x, y}
    })))
    .filter(({skyTile}) => skyTile === '#')
    .map(({galaxy}) => galaxy)

const emptyColumns: number[] = input[0]
    .trim()
    .split('')
    .map((_, index) => index)
    .filter(index => input.every(line => line[index] === '.'))

const emptyRows: number[] = input
    .map((line, index) => ({line, index}))
    .filter(({line}) => !line.includes('#'))
    .map(({index}) => index)

const correctedGalaxies = galaxies
    .map(galaxy => {
        galaxy.x += xShift(galaxy);
        galaxy.y += yShift(galaxy);
        return galaxy
    })

function xShift(galaxy: Galaxy) {

    return emptyColumns.filter(col => col < galaxy.x).length * (expansion - 1);

}

function yShift(galaxy: Galaxy) {
    return emptyRows.filter(row => row < galaxy.y).length * (expansion - 1);

}

const distanceSum = correctedGalaxies
    .flatMap(g1 => relevantCompareGalaxies(g1).map(g2 => calculateDistance(g1, g2)))
    .reduce((sum, distance) => sum + distance, 0);

function relevantCompareGalaxies(g1: Galaxy): Galaxy[] {
    return correctedGalaxies
        .filter(g2 => g2.y >= g1.y)
        .filter(g2 => !(g2.y == g1.y && g2.x <= g1.x))
}

function calculateDistance(g1: Galaxy, g2: Galaxy): number {
    return Math.abs(g1.x - g2.x) + Math.abs(g1.y - g2.y)
}

console.log(distanceSum)