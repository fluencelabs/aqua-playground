import { Fluence } from '@fluencelabs/fluence';
import { doStuff, registerTestS } from '../compiled/examples/complex';

export async function complexCall() {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;
    const selfPeerId = Fluence.getPeer().getStatus().peerId;

    registerTestS({
        t: (arg0) => {
            return arg0;
        },
        multiline: (a, b, c) => {
            return b;
        },
    });

    return await doStuff(relayPeerId, selfPeerId, true, true, ['1', '2'], ['3', '4'], 'some str');
}
