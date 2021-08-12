import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {d} from "../compiled/examples/nestedFuncs";

export async function nestedFuncsCall(client: FluenceClient): Promise<string> {
    registerServiceFunction(client, "opa", "identity", (args: any[], _) => {
        return args[0]
    })

    return await d(client, "some-str")
}
