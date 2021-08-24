import { FluencePeer } from '@fluencelabs/fluence';
import { topologyTest, registerTesto, registerLocalPrint } from '../compiled/examples/topology';

export async function topologyCall(peer: FluencePeer, peer2: FluencePeer): Promise<string> {
    const relayPeerId = peer.connectionInfo.connectedRelays[0];
    const selfPeerId = peer.connectionInfo.selfPeerId;

    const relayPeerId2 = peer.connectionInfo.connectedRelays[0];
    const selfPeerId2 = peer.connectionInfo.selfPeerId;

    registerTesto(peer2, {
        getString: (args0) => {
            console.log('hello from client2: ' + args0);
            return 'hello from client2: ' + args0;
        },
    });

    registerLocalPrint(peer, {
        print: (args0) => {
            console.log('print on client1: ' + args0);
            return {};
        },
    });

    return await topologyTest(peer, selfPeerId, relayPeerId, selfPeerId2, relayPeerId2, {
        ttl: 10000,
    });
}
