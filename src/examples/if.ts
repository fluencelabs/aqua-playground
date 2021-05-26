import {FluenceClient} from "@fluencelabs/fluence";
import {ifElseCall, ifElseNumCall} from "../compiled/examples/if";

export async function ifCall(client: FluenceClient) {
    await ifElseCall(client, false)
    await ifElseCall(client, true)

    await ifElseNumCall(client, 1)
    await ifElseNumCall(client, 5)
}
