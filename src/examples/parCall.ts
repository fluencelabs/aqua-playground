import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {parFunc} from "../compiled/examples/par";

export async function parCall(client: FluenceClient) {

    let promise = new Promise<string>((resolve, reject) => {
        registerServiceFunction(client, "parservice-id", "call", (args: any[], _) => {
            console.log("hello from parservice-id")
            let result = "hello"
            resolve(result)
            return result
        })
    })

    await parFunc(client, client.relayPeerId!, (c) => {
        console.log("parFunc. external addresses par: " + c.external_addresses)
    })

    return promise
}
