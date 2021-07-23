import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {create_client_util} from "../compiled/examples/passArgs";

export async function passArgsCall(client: FluenceClient) {
    registerServiceFunction(client, "test-dht", "put_host_value", (args: any[], _) => {
        return args[0] + args[1]
    })

    return await create_client_util(client, "sid")
}