import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {topologyTest} from "./compiled/topology";

export async function topologyCall(client: FluenceClient, client2: FluenceClient): Promise<string> {

    registerServiceFunction(client2, "testo", "getString", (args: any[], _) => {
        console.log("hello from client2: " + args[0])
        return "hello from client2: " + args[0]
    })

    registerServiceFunction(client, "lp", "print", (args: any[], _) => {
        console.log("print on client1: " + args[0])
        return {}
    })

    return await topologyTest(client, client.selfPeerId, client.relayPeerId!, client2.selfPeerId, client2.relayPeerId!)
}
