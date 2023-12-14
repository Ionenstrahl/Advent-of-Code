import {readExample} from "../common/importer";

const file = readExample();


function parseColumns(file: string[]) {
    return file[0].trim().split('')
        .map((_, index: number) =>
            file.map((row: string) => row[index])
                .reduce((a: string, b: string) => a + b, '')
        );
}

function tiltNorth(column: string): string {
    const tiltedColumn = column.replace('.O', 'O.');

    if (tiltedColumn.includes('.O')) {
        return tiltNorth(tiltedColumn)
    }

    return tiltedColumn;
}

function torque(column: string){
    const leverLength = column.length;

    return column.split('')
        .map((rock, index) => ({rock, index}))
        .filter(({rock}) => rock === 'O')
        .map(({index}) => leverLength - index)
        .reduce((a, b) => a + b, 0);
}


const columns =
    parseColumns(readExample())
        .map(column => tiltNorth(column))
        .map(column => torque(column))
        .reduce((a, b) => a + b, 0);


console.log(columns);