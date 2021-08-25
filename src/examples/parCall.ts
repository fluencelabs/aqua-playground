import { FluencePeer } from '@fluencelabs/fluence';
import { parFunc, registerParService } from '../compiled/examples/par';

export async function parCall(peer: FluencePeer) {
    const relayPeerId = peer.connectionInfo.connectedRelays[0];

    let promise = new Promise<string>((resolve, reject) => {
        registerParService(peer, {
            call: async () => {
                console.log('hello from parservice-id');
                let result = 'hello';
                resolve(result);
                return result;
            },
        });
    });

    await parFunc(peer, relayPeerId, async (c) => {
        console.log('parFunc. external addresses par: ' + c.external_addresses);
    });

    return promise;
}
