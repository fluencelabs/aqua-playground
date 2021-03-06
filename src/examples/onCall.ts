import { Fluence } from '@fluencelabs/fluence';
import { getPeerExternalAddresses } from '../compiled/examples/on';

export async function onCall(): Promise<string[]> {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;
    return await getPeerExternalAddresses(relayPeerId);
}
