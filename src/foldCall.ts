    import {FluenceClient} from "@fluencelabs/fluence";
    import {iterateAndPrint, iterateAndPrintParallel} from "./compiled/fold";

    export async function foldCall(client: FluenceClient) {
        await iterateAndPrint(client, [client.relayPeerId!])

        return new Promise<string[]>((resolve, reject) => {
            iterateAndPrintParallel(client, [client.relayPeerId!], (c) => {
                console.log("iterateAndPrintParallel. external addresses: " + c.external_addresses)
                resolve(c.external_addresses)
            })
        })
    }
