import { FluencePeer } from '@fluencelabs/fluence';
import { tryCatchTest } from '../compiled/examples/tryCatch';

export async function tryCatchCall(peer: FluencePeer): Promise<string[]> {
    const relayPeerId = peer.connectionInfo.connectedRelays[0];
    return await tryCatchTest(peer, relayPeerId);
}
