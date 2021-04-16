import { FluenceClient, registerServiceFunction } from "@fluencelabs/fluence";
import { getPeerExternalAddresses } from "./compiled/on";

export async function onCall(client: FluenceClient) {
    const addresses = await getPeerExternalAddresses(client, client.relayPeerId!)
    console.log("Addresses: ", addresses);
}
