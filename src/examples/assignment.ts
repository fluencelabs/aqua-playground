import {FluenceClient} from "@fluencelabs/fluence";
import {passFunctionAsArg} from "../compiled/examples/callArrow";
import {doSmth} from "../compiled/examples/assignment";

export async function assignmentCall(client: FluenceClient): Promise<string[]> {
  return await doSmth(client, {value: "abc"})
}
