import { Fluence } from '@fluencelabs/fluence';
import {passFunctionAsArg, reproArgsBug426} from '../compiled/examples/callArrow';

export async function callArrowCall(): Promise<string> {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;
    return new Promise<string>((resolve, reject) => {
        passFunctionAsArg(relayPeerId, 'callArrow call', (a: string) => {
            let result = 'Hello, ' + a + '!';
            resolve(result);
            return result;
        },  {ttl: 10000});
    });
}

export async function reproArgsBug426Call(): Promise<string> {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;
    return new Promise<string>((resolve, reject) => {
        reproArgsBug426((a: string) => {
            resolve(a);
        }, "privet");
    });
}
