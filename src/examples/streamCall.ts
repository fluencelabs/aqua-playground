import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {checkStreams} from "../compiled/examples/stream";

export async function streamCall(client: FluenceClient) {
    registerServiceFunction(client, "stringer-id", "returnString", (args: any[], _) => {
        return args[0] + " updated"
    })

    return checkStreams(client, ["third", "fourth"])
}