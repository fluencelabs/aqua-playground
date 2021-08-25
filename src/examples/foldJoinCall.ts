import { FluencePeer } from '@fluencelabs/fluence';
import { getTwoResults } from '../compiled/examples/foldJoin';

export async function foldJoinCall(): Promise<number[]> {
    const relayPeerId = FluencePeer.default.connectionInfo.connectedRelays[0];
    return await getTwoResults(relayPeerId);
}
