import {accumRes} from "../compiled/examples/streamCan";

export async function streamCanCall() {
    return await accumRes("a", "b");
}
