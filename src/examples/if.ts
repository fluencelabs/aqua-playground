import { FluencePeer } from '@fluencelabs/fluence';
import { ifElseCall, ifElseNumCall } from '../compiled/examples/if';

export async function ifCall(peer: FluencePeer) {
    await ifElseCall(peer, false);
    await ifElseCall(peer, true);

    await ifElseNumCall(peer, 1);
    await ifElseNumCall(peer, 5);
}
