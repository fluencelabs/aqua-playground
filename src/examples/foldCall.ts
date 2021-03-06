import { Fluence } from '@fluencelabs/fluence';
import {forBug499, iterateAndPrint, iterateAndPrintParallel} from '../compiled/examples/fold';

export async function foldCall() {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;

    await iterateAndPrint([relayPeerId],  {ttl: 10000});

    return new Promise<string[]>((resolve, reject) => {
        iterateAndPrintParallel([relayPeerId], (c) => {
            console.log('iterateAndPrintParallel. external addresses: ' + c.external_addresses);
            resolve(c.external_addresses);
        },  {ttl: 10000});
    });
}

export async function foldBug499Call(): Promise<number[]> {
    return forBug499()
}
