import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    topologyTest,
    registerTesto,
    registerLocalPrint,
    topologyBug205,
    topologyBug394
} from '../compiled/examples/topology';

export async function topologyBug394Call(peer2: FluencePeer): Promise<string> {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;
    const selfPeerId = Fluence.getPeer().getStatus().peerId;

    const relayPeerId2 = peer2.getStatus().relayPeerId;
    const selfPeerId2 = peer2.getStatus().peerId;

    return topologyBug394(relayPeerId, selfPeerId2, relayPeerId2)
}

export async function topologyBug205Call(peer2: FluencePeer): Promise<string[]> {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;
    const selfPeerId = Fluence.getPeer().getStatus().peerId;

    const relayPeerId2 = peer2.getStatus().relayPeerId;
    const selfPeerId2 = peer2.getStatus().peerId;

    return topologyBug205(relayPeerId, relayPeerId2)
}

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
