import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {get_results} from "../compiled/examples/pushToStream";

export async function pushToStreamCall(client: FluenceClient) {
    registerServiceFunction(client, "pop", "get_str", (args: any[], _) => {
        return "get_string"
    })

    return await get_results(client)
}