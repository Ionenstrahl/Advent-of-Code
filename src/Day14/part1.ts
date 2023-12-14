import { readExample } from "../common/importer";

function parseColumns(file: string[]): string[] {
    return file[0].trim().split('')
        .map((_, index: number) =>
            file.map((row: string) => row[index])
                .reduce((a: string, b: string) => a + b, '')
        );
}

function tiltNorth(column: string): string {
    const tiltedColumn: string = column.replace('.O', 'O.');

    if (tiltedColumn.includes('.O')) {
        return tiltNorth(tiltedColumn);
    }

    return tiltedColumn;
}

function torque(column: string): number {
    const leverLength: number = column.length;

    return column.split('')
        .map((rock: string, index: number) => ({ rock, index }))
        .filter(({ rock }: { rock: string }) => rock === 'O')
        .map(({ index }: { index: number }) => leverLength - index)
        .reduce((a: number, b: number) => a + b, 0);
}


function totalTorque(): number {
    const file: string[] = readExample();

    return parseColumns(file)
        .map((column: string) => tiltNorth(column))
        .map((column: string) => torque(column))
        .reduce((a: number, b: number) => a + b, 0)
}

console.log(totalTorque());
