import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {use_name2} from "../compiled/examples/streamResults";

export async function streamResultsCall(client: FluenceClient) {
    registerServiceFunction(client, "get-dt", "get_dt", (args: any[], _) => {
        return {
            field: args[0]
        }
    })

    return await use_name2(client, "new_name")
}