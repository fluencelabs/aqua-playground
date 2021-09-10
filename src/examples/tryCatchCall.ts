import { Fluence } from '@fluencelabs/fluence';
import { tryCatchTest } from '../compiled/examples/tryCatch';

export async function tryCatchCall(): Promise<string[]> {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;
    return await tryCatchTest(relayPeerId);
}
