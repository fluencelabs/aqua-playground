import { FluencePeer } from '@fluencelabs/fluence';
import { topologyTest, registerTesto, registerLocalPrint } from '../compiled/examples/topology';

export async function topologyCall(peer2: FluencePeer): Promise<string> {
    const relayPeerId = FluencePeer.default.connectionInfo.connectedRelay;
    const selfPeerId = FluencePeer.default.connectionInfo.selfPeerId;

    const relayPeerId2 = peer2.connectionInfo.connectedRelay;
    const selfPeerId2 = peer2.connectionInfo.selfPeerId;

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
