import { FluencePeer } from '@fluencelabs/fluence';
import { tryCatchTest } from '../compiled/examples/tryCatch';

export async function tryCatchCall(): Promise<string[]> {
    const relayPeerId = FluencePeer.default.connectionInfo.connectedRelay;
    return await tryCatchTest(relayPeerId);
}
