import {FluenceClient} from "@fluencelabs/fluence";
import {passFunctionAsArg} from "../compiled/callArrow";

export async function callArrowCall(client: FluenceClient): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    passFunctionAsArg(client, client.relayPeerId!, "callArrow call", (a: string) => {
      let result = "Hello, " + a + "!";
      resolve(result)
      return result;
    });
  })
}
