import { Fluence } from '@fluencelabs/fluence';
import { tryOtherwiseTest } from '../compiled/examples/tryOtherwise';

export async function tryOtherwiseCall(): Promise<string> {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;
    return await tryOtherwiseTest(relayPeerId, {ttl: 10000});
}
