import {FluenceClient} from "@fluencelabs/fluence";
import {getPeerExternalAddresses} from "./compiled/on";

export async function onCall(client: FluenceClient): Promise<string[]> {
    return await getPeerExternalAddresses(client, client.relayPeerId!)
}
