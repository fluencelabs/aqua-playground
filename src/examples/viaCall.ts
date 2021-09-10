import Fluence from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import { viaArr, viaOpt, viaStream, registerCustomId } from '../compiled/examples/via';

export async function viaCall(): Promise<string[][]> {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;

    registerCustomId({
        id: (args0) => {
            return args0;
        },
    });

    let res = await viaArr(krasnodar[3].peerId, [krasnodar[2].peerId, krasnodar[1].peerId]);
    let res2 = await viaOpt(relayPeerId, krasnodar[3].peerId, krasnodar[2].peerId);
    let res3 = await viaOpt(relayPeerId, krasnodar[3].peerId, krasnodar[2].peerId || null);
    let res4 = await viaStream(krasnodar[3].peerId, [krasnodar[2].peerId, krasnodar[1].peerId]);

    return [res.external_addresses, res2.external_addresses, res3.external_addresses, res4.external_addresses];
}
