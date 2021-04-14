import {FluenceClient} from "@fluencelabs/fluence";
import {ifElseCall} from "./compiled/if";

export async function ifCall(client: FluenceClient) {
    await ifElseCall(client, false)
    await ifElseCall(client, true)
}