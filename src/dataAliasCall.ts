import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {dataAliasFunc} from "./compiled/dataAlias";

export async function dataAliasCall(client: FluenceClient) {
    registerServiceFunction(client, "DataAlias", "get", (args: any[], _) => {
        return {
            peerId: "peer id str",
            name: "name str"
        }
    })

    const peerId = await dataAliasFunc(client)
    console.log("PeerId: ", peerId);
}