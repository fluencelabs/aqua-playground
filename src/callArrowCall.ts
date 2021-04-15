import {FluenceClient} from "@fluencelabs/fluence";
import {passFunctionAsArg} from "./compiled/callArrow";

export async function callArrowCall(client: FluenceClient) {
    await passFunctionAsArg(client, client.relayPeerId!, (a: string) => {
        return "Hello, " + a + "!"
    })
}