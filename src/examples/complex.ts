import { FluencePeer } from '@fluencelabs/fluence';
import { doStuff, registerTestS } from '../compiled/examples/complex';

export async function complexCall(peer: FluencePeer) {
    const relayPeerId = peer.connectionInfo.connectedRelays[0];
    const selfPeerId = peer.connectionInfo.selfPeerId;

    registerTestS(peer, {
        t: (arg0) => {
            return arg0;
        },
        multiline: (a, b, c) => {
            return b;
        },
    });

    return await doStuff(peer, relayPeerId, selfPeerId, true, true, ['1', '2'], ['3', '4'], 'some str');
}
