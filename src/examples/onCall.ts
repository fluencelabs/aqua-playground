import { FluencePeer } from '@fluencelabs/fluence';
import { getPeerExternalAddresses } from '../compiled/examples/on';

export async function onCall(): Promise<string[]> {
    const relayPeerId = FluencePeer.default.connectionInfo.connectedRelay;
    return await getPeerExternalAddresses(relayPeerId);
}
