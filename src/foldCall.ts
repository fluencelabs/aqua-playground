import {FluenceClient} from "@fluencelabs/fluence";
import {foldFunc, parFoldFunc} from "./compiled/fold";

export async function foldCall(client: FluenceClient) {
    foldFunc(client, ["1", "2", "3"])
    parFoldFunc(client, ["4", "5", "6"])
}