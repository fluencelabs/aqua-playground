import { Fluence } from '@fluencelabs/fluence';
import { parFunc } from '../compiled/examples/par';
import { registerCoService } from '../compiled/examples/co';

export async function coCall(): Promise<string[]> {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;

    registerCoService({
        call: () => {
            return 'hello';
        },
    });

    return new Promise<string[]>((resolve, reject) => {
        parFunc(relayPeerId, (c) => {
            resolve(c.external_addresses);
        }, {ttl: 15000});
    });
}
