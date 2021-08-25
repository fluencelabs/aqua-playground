import { FluencePeer } from '@fluencelabs/fluence';
import { passFunctionAsArg } from '../compiled/examples/callArrow';

export async function callArrowCall(peer: FluencePeer): Promise<string> {
    const relayPeerId = peer.connectionInfo.connectedRelays[0];
    return new Promise<string>((resolve, reject) => {
        passFunctionAsArg(peer, relayPeerId, 'callArrow call', async (a: string) => {
            let result = 'Hello, ' + a + '!';
            resolve(result);
            return result;
        });
    });
}
