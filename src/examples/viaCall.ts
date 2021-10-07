import { Fluence } from '@fluencelabs/fluence';
import { viaArr, viaOpt, viaStream, registerCustomId } from '../compiled/examples/via';
import { relays } from '../config';

export async function viaCall(): Promise<string[][]> {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;

    registerCustomId({
        id: (args0) => {
            return args0;
        },
    });

    let res = await viaArr(relays[4].peerId, [relays[2].peerId, relays[1].peerId]);
    let res2 = await viaOpt(relayPeerId, relays[4].peerId, relays[2].peerId);
    let res3 = await viaOpt(relayPeerId, relays[4].peerId, relays[2].peerId || null);
    let res4 = await viaStream(relays[4].peerId, [relays[2].peerId, relays[1].peerId]);

    return [res.external_addresses, res2.external_addresses, res3.external_addresses, res4.external_addresses];
}
