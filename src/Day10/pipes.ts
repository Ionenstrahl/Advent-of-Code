export type Pipe = {
    position: Position,
    transformations: Transformation[],
    symbol: string
}

export type Position = {
    x: number,
    y: number
}

export type Transformation = {
    input: Direction,
    output: Direction
}

export enum Direction {
    up,
    down,
    left,
    right
}

export const pipeTransformations: Record<string, Transformation[]> = {
    '7': [
        {input: Direction.up, output: Direction.left},
        {input: Direction.right, output: Direction.down},
    ],
    'J': [
        {input: Direction.down, output: Direction.left},
        {input: Direction.right, output: Direction.up},
    ],
    'L': [
        {input: Direction.down, output: Direction.right},
        {input: Direction.left, output: Direction.up},
    ],
    'F': [
        {input: Direction.up, output: Direction.right},
        {input: Direction.left, output: Direction.down},
    ],
    '|': [
        {input: Direction.up, output: Direction.up},
        {input: Direction.down, output: Direction.down},
    ],
    '-': [
        {input: Direction.right, output: Direction.right},
        {input: Direction.left, output: Direction.left},
    ],
    'S': [
        {input: Direction.right, output: Direction.right},
    ]
}