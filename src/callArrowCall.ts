import {FluenceClient} from "@fluencelabs/fluence";
import {passFunctionAsArg} from "./compiled/callArrow";

export async function callArrowCall(client: FluenceClient) {
    await passFunctionAsArg(client, (a: string) => {
        return "Hello, " + a + "!"
    })
}