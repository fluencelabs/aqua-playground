import { FluencePeer } from '@fluencelabs/fluence';
import { tryCatchTest } from '../compiled/examples/tryCatch';

export async function tryCatchCall(): Promise<string[]> {
    const relayPeerId = FluencePeer.default.connectionInfo.connectedRelays[0];
    return await tryCatchTest(relayPeerId);
}
