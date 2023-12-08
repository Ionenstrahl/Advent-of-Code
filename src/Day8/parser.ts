export function parseInstructions(file: string[]) {
    return file[0];
}

export function parseNodes(file: string[]) {
    return file
        .filter((line, index) => index >= 2)
        .map(line => toNode(line))
        .reduce((a,b) => a.concat(b), [])
}

function toNode(line: string):node {
    return{
        name: line.slice(0,3),
        left: line.slice(7,10),
        right: line.slice(12,15)
    }
}


export type node = {
    name: string,
    left: string,
    right: string
}