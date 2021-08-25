import { FluencePeer } from '@fluencelabs/fluence';
import { parFunc } from '../compiled/examples/par';
import { registerCoService } from '../compiled/examples/co';

export async function coCall(peer: FluencePeer): Promise<string[]> {
    const relayPeerId = peer.connectionInfo.connectedRelays[0];

    registerCoService(peer, {
        call: async () => {
            return 'hello';
        },
    });

    return new Promise<string[]>((resolve, reject) => {
        parFunc(peer, relayPeerId, async (c) => {
            resolve(c.external_addresses);
        });
    });
}
