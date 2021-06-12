import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {tryOtherwiseTest} from "../compiled/examples/tryOtherwise";

export async function tryOtherwiseCall(client: FluenceClient): Promise<string> {

    return await tryOtherwiseTest(client, client.relayPeerId!)
}