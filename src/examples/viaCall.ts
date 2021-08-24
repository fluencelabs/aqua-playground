import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {krasnodar, stage} from "@fluencelabs/fluence-network-environment";
import {viaArr, viaOpt, viaStream} from "../compiled/examples/via";

export async function viaCall(client: FluenceClient): Promise<string[][]> {

    registerServiceFunction(client, "cid", "id", (args: any[], _) => {
        return args[0]
    })

    let res = await viaArr(client, stage[3].peerId, [stage[2].peerId, stage[1].peerId])
    let res2 = await viaOpt(client, client.relayPeerId!, stage[3].peerId, stage[2].peerId)
    let res3 = await viaOpt(client, client.relayPeerId!, stage[3].peerId, stage[2].peerId || null)
    let res4 = await viaStream(client, stage[3].peerId, [stage[2].peerId, stage[1].peerId])

    return [res.external_addresses, res2.external_addresses, res3.external_addresses, res4.external_addresses]
}
