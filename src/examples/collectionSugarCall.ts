import {arraySugar, bugLNG59, emptySugar, optionSugar, streamSugar} from "../compiled/examples/collectionSugar";

export async function arraySugarCall(): Promise<[number[], number[]]> {
    return await arraySugar(3, 6)
}

export async function streamSugarCall(): Promise<[number[], number[]]> {
    return await streamSugar(3, 6)
}

export async function optionSugarCall(): Promise<[number[], string[], string[]]> {
    return await optionSugar(1, "some", null, null)
}

export async function allEmptySugarCall(): Promise<[number[], string[], string[], string[], number | null, number[], string | null]> {
    return await emptySugar()
}

export async function bugLNG59Call(): Promise<string> {
    return bugLNG59()
}