import { FluencePeer } from '@fluencelabs/fluence';
import { iterateAndPrint, iterateAndPrintParallel } from '../compiled/examples/fold';

export async function foldCall(peer: FluencePeer) {
    const relayPeerId = peer.connectionInfo.connectedRelays[0];

    await iterateAndPrint(peer, [relayPeerId]);

    return new Promise<string[]>((resolve, reject) => {
        iterateAndPrintParallel(peer, [relayPeerId], async (c) => {
            console.log('iterateAndPrintParallel. external addresses: ' + c.external_addresses);
            resolve(c.external_addresses);
        });
    });
}
