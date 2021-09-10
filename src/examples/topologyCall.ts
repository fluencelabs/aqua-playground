import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import { topologyTest, registerTesto, registerLocalPrint } from '../compiled/examples/topology';

export async function topologyCall(peer2: FluencePeer): Promise<string> {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;
    const selfPeerId = Fluence.getPeer().getStatus().peerId;

    const relayPeerId2 = peer2.getStatus().relayPeerId;
    const selfPeerId2 = peer2.getStatus().peerId;

    registerTesto(peer2, {
        getString: (args0) => {
            console.log('hello from client2: ' + args0);
            return 'hello from client2: ' + args0;
        },
    });

    registerLocalPrint({
        print: (args0) => {
            console.log('print on client1: ' + args0);
        },
    });

    return await topologyTest(selfPeerId, relayPeerId, selfPeerId2, relayPeerId2, {
        ttl: 10000,
    });
}
