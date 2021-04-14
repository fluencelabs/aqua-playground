import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {parFunc} from "./compiled/par";

export async function parCall(client: FluenceClient) {
    registerServiceFunction(client, "parabb", "call", (args: any[], _) => {
        return `hello`
    })

    await parFunc(client, client.relayPeerId!)
}