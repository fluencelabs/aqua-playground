import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {retrieve_records} from "../compiled/examples/streamArgs";

export async function streamArgsCall(client: FluenceClient) {
    registerServiceFunction(client, "test-service", "get_records", (args: any[], _) => {
        return [args[0], args[0]]
    })

    return await retrieve_records(client, "peer_id")
}