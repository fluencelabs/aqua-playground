import { FluencePeer } from '@fluencelabs/fluence';
import { iterateAndPrint, iterateAndPrintParallel } from '../compiled/examples/fold';

export async function foldCall() {
    const relayPeerId = FluencePeer.default.connectionInfo.connectedRelay;

    await iterateAndPrint([relayPeerId]);

    return new Promise<string[]>((resolve, reject) => {
        iterateAndPrintParallel([relayPeerId], (c) => {
            console.log('iterateAndPrintParallel. external addresses: ' + c.external_addresses);
            resolve(c.external_addresses);
        });
    });
}
