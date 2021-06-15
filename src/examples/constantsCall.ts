import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {callConstant} from "../compiled/examples/constants";

export async function constantsCall(client: FluenceClient): Promise<string[]> {
    registerServiceFunction(client, "test", "createStr", (args: any[], _) => {
        return "" + args[0]
    })


    return await callConstant(client);
}