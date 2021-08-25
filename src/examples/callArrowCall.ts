import { FluencePeer } from '@fluencelabs/fluence';
import { passFunctionAsArg } from '../compiled/examples/callArrow';

export async function callArrowCall(): Promise<string> {
    const relayPeerId = FluencePeer.default.connectionInfo.connectedRelays[0];
    return new Promise<string>((resolve, reject) => {
        passFunctionAsArg(relayPeerId, 'callArrow call', async (a: string) => {
            let result = 'Hello, ' + a + '!';
            resolve(result);
            return result;
        });
    });
}
