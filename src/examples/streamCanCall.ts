import {accumRes, bugLNG63, bugLNG63_2} from "../compiled/examples/streamCan";

export async function streamCanCall() {
    return await accumRes();
}

export async function bugLNG63Call() {
    return await bugLNG63();
}

export async function bugLNG63_2Call() {
    return await bugLNG63_2();
}
