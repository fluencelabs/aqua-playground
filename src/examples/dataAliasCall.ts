import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {getAliasedData} from "../compiled/examples/dataAlias";

export async function dataAliasCall(client: FluenceClient) {
    registerServiceFunction(client, "somesrv", "get", (args: any[], _) => {
        return {
            peerId: "peer id str",
            name: "name str"
        }
    })

    return await getAliasedData(client)
}
