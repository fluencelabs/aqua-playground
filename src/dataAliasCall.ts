import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {getAliasedData} from "./compiled/dataAlias";

export async function dataAliasCall(client: FluenceClient) {
    registerServiceFunction(client, "somesrv", "get", (args: any[], _) => {
        return {
            peerId: "peer id str",
            name: "name str"
        }
    })

    const peerId = await getAliasedData(client)
    console.log("PeerId: ", peerId);
}
