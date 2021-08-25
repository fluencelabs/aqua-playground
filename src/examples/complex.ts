import { FluencePeer } from '@fluencelabs/fluence';
import { doStuff, registerTestS } from '../compiled/examples/complex';

export async function complexCall() {
    const relayPeerId = FluencePeer.default.connectionInfo.connectedRelays[0];
    const selfPeerId = FluencePeer.default.connectionInfo.selfPeerId;

    registerTestS({
        t: async (arg0) => {
            return arg0;
        },
        multiline: async (a, b, c) => {
            return b;
        },
    });

    return await doStuff(relayPeerId, selfPeerId, true, true, ['1', '2'], ['3', '4'], 'some str');
}
