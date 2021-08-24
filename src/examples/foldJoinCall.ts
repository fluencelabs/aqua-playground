import { FluencePeer } from '@fluencelabs/fluence';
import { getTwoResults } from '../compiled/examples/foldJoin';

export async function foldJoinCall(peer: FluencePeer): Promise<number[]> {
    const relayPeerId = peer.connectionInfo.connectedRelays[0];
    return await getTwoResults(peer, relayPeerId);
}
