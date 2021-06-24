import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {parFunc} from "../compiled/examples/par";

export async function coCall(client: FluenceClient): Promise<string[]> {

    registerServiceFunction(client, "coservice-id", "call", (args: any[], _) => {
        return "hello"
    })

    return new Promise<string[]>((resolve, reject) => {
        parFunc(client, client.relayPeerId!, (c) => {
            resolve(c.external_addresses)
        })
    })
}
