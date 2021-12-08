import { Fluence } from '@fluencelabs/fluence';
import { iterateAndPrint, iterateAndPrintParallel } from '../compiled/examples/fold';
import { registerStringer} from '../compiled/examples/stream';


export async function foldCall() {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;
    registerStringer({
        returnString: (args0) => {
            return args0;
        },
    });

    await iterateAndPrint([relayPeerId],  {ttl: 1000000});

    return new Promise<string[]>((resolve, reject) => {
        iterateAndPrintParallel([relayPeerId, relayPeerId], (c) => {
            console.log('iterateAndPrintParallel. external addresses: ' + c.external_addresses);
            resolve(c.external_addresses);
        },  {ttl: 1000000});
    });
}
