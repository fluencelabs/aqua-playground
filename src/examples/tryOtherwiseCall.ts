import { FluencePeer } from '@fluencelabs/fluence';
import { tryOtherwiseTest } from '../compiled/examples/tryOtherwise';

export async function tryOtherwiseCall(peer: FluencePeer): Promise<string> {
    const relayPeerId = peer.connectionInfo.connectedRelays[0];
    return await tryOtherwiseTest(peer, relayPeerId);
}
