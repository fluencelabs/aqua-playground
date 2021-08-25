import { FluencePeer } from '@fluencelabs/fluence';
import { iterateAndPrint, iterateAndPrintParallel } from '../compiled/examples/fold';

export async function foldCall() {
    const relayPeerId = FluencePeer.default.connectionInfo.connectedRelays[0];

    await iterateAndPrint([relayPeerId]);

    return new Promise<string[]>((resolve, reject) => {
        iterateAndPrintParallel([relayPeerId], async (c) => {
            console.log('iterateAndPrintParallel. external addresses: ' + c.external_addresses);
            resolve(c.external_addresses);
        });
    });
}
