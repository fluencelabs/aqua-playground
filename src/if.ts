import {FluenceClient} from "@fluencelabs/fluence";
import {ifElseCall} from "./compiled/if";

export async function ifCall(client: FluenceClient) {
    ifElseCall(client, false)
    ifElseCall(client, true)
}