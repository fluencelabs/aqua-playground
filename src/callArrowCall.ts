import {FluenceClient} from "@fluencelabs/fluence";
import {callArrowFunc} from "./compiled/callArrow";

export async function callArrowCall(client: FluenceClient) {
    await callArrowFunc(client, (a: string) => {
        return "Hello, " + a + "!"
    })
}