import { FluencePeer } from '@fluencelabs/fluence';
import { parFunc, registerParService } from '../compiled/examples/par';

export async function parCall() {
    const relayPeerId = FluencePeer.default.connectionInfo.connectedRelay;

    let promise = new Promise<string>((resolve, reject) => {
        registerParService({
            call: () => {
                console.log('hello from parservice-id');
                let result = 'hello';
                resolve(result);
                return result;
            },
        });
    });

    await parFunc(relayPeerId, (c) => {
        console.log('parFunc. external addresses par: ' + c.external_addresses);
    });

    return promise;
}
