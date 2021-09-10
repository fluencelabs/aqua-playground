import { Fluence } from '@fluencelabs/fluence';
import { getTwoResults } from '../compiled/examples/foldJoin';

export async function foldJoinCall(): Promise<number[]> {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;
    return await getTwoResults(relayPeerId);
}
