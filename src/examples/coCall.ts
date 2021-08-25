import { FluencePeer } from '@fluencelabs/fluence';
import { parFunc } from '../compiled/examples/par';
import { registerCoService } from '../compiled/examples/co';

export async function coCall(): Promise<string[]> {
    const relayPeerId = FluencePeer.default.connectionInfo.connectedRelays[0];

    registerCoService({
        call: async () => {
            return 'hello';
        },
    });

    return new Promise<string[]>((resolve, reject) => {
        parFunc(relayPeerId, async (c) => {
            resolve(c.external_addresses);
        });
    });
}
