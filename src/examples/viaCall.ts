import { Fluence } from '@fluencelabs/fluence';
import { viaArr, viaOpt, viaStream } from '../compiled/examples/via';
import { config } from '../config';

const relays = config.relays

export async function viaArrCall(): Promise<string[]> {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;

    let res = await viaArr(relays[4].peerId, [relays[2].peerId, relays[1].peerId]);

    return res.external_addresses;
}

export async function viaOptCall(): Promise<string[]> {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;

    let res2 = await viaOpt(relayPeerId, relays[4].peerId, relays[2].peerId);

    return res2.external_addresses;
}

export async function viaOptNullCall(): Promise<string[]> {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;

    let res3 = await viaOpt(relayPeerId, relays[4].peerId, relays[2].peerId || null);

    return res3.external_addresses;
}

export async function viaStreamCall(): Promise<string[]> {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;

    let res4 = await viaStream(relays[4].peerId, [relays[2].peerId, relays[1].peerId]);

    return res4.external_addresses;
}
