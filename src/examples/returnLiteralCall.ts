import {FluenceClient} from "@fluencelabs/fluence";
import {returnLiteral} from "../compiled/examples/returnLiteral";

export async function literalCall(client: FluenceClient) {
    return returnLiteral(client)
}