import { FluencePeer } from '@fluencelabs/fluence';
import { getPeerExternalAddresses } from '../compiled/examples/on';

export async function onCall(peer: FluencePeer): Promise<string[]> {
    const relayPeerId = peer.connectionInfo.connectedRelays[0];
    return await getPeerExternalAddresses(peer, relayPeerId);
}
