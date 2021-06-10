import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {topologyTest} from "../compiled/examples/topology";
import {tryCatchTest} from "../compiled/examples/tryCatch";

export async function tryCatchCall(client: FluenceClient): Promise<string[]> {

    return await tryCatchTest(client, client.relayPeerId!)
}