import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {doStuff} from "../compiled/complex";
import {testNet} from "@fluencelabs/fluence-network-environment";

export async function complexCall(client: FluenceClient) {

    registerServiceFunction(client, "some-id", "t", (args: any[], _) => {
        return args[0]
    })

    return await doStuff(client, client.relayPeerId!, client.selfPeerId, true, true, ["1", "2"], ["3", "4"], "some str")
}
