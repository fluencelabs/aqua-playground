import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {krasnodar} from "@fluencelabs/fluence-network-environment";
import {viaArr, viaOpt, viaStream} from "../compiled/examples/via";

export async function viaCall(client: FluenceClient): Promise<string[][]> {

    registerServiceFunction(client, "cid", "id", (args: any[], _) => {
        return args[0]
    })

    let res = await viaArr(client, krasnodar[3].peerId, [krasnodar[2].peerId, krasnodar[1].peerId])
    let res2 = await viaOpt(client, client.relayPeerId!, krasnodar[3].peerId, krasnodar[2].peerId)
    let res3 = await viaOpt(client, client.relayPeerId!, krasnodar[3].peerId, krasnodar[2].peerId || null)
    let res4 = await viaStream(client, krasnodar[3].peerId, [krasnodar[2].peerId, krasnodar[1].peerId])

    return [res.external_addresses, res2.external_addresses, res3.external_addresses, res4.external_addresses]
}
