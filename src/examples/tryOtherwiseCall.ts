import { FluencePeer } from '@fluencelabs/fluence';
import { tryOtherwiseTest } from '../compiled/examples/tryOtherwise';

export async function tryOtherwiseCall(): Promise<string> {
    const relayPeerId = FluencePeer.default.connectionInfo.connectedRelay;
    return await tryOtherwiseTest(relayPeerId);
}
