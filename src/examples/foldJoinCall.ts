import { FluencePeer } from '@fluencelabs/fluence';
import { getTwoResults } from '../compiled/examples/foldJoin';

export async function foldJoinCall(): Promise<number[]> {
    const relayPeerId = FluencePeer.default.connectionInfo.connectedRelay;
    return await getTwoResults(relayPeerId);
}
