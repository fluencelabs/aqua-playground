import {FluenceClient} from "@fluencelabs/fluence";
import {getTwoResults} from "../compiled/examples/foldJoin";

export async function foldJoinCall(client: FluenceClient): Promise<number[]> {
    return await getTwoResults(client, client.relayPeerId!)
}
