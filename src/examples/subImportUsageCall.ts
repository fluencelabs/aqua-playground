import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {subImportUsage} from "../compiled/examples/subImportUsage";

export async function subImportCall(client: FluenceClient) {
    // helloWorld.aqua
    registerServiceFunction(client, "sub_service", "sub", (args: any[], _) => {
        return {
            one: args[0],
            two: 42
        }
    })

    registerServiceFunction(client, "concat_subs", "get_some", (args: any[], _) => {
        return {
            one: args[0],
            two: args[1].two
        }
    })

    return await subImportUsage(client, "random_string");
}
