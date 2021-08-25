import { FluencePeer } from '@fluencelabs/fluence';
import { ifElseCall, ifElseNumCall } from '../compiled/examples/if';

export async function ifCall() {
    await ifElseCall(false);
    await ifElseCall(true);

    await ifElseNumCall(1);
    await ifElseNumCall(5);
}
