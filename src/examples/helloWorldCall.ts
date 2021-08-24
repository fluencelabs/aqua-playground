import { FluencePeer } from '@fluencelabs/fluence';
import { helloWorld, registerStringExtra } from '../compiled/examples/helloWorld';

export async function helloWorldCall(peer: FluencePeer) {
    // helloWorld.aqua
    registerStringExtra(peer, {
        addNameToHello: (args0) => {
            return `Hello, ${args0}!`;
        },
    });

    return await helloWorld(peer, 'NAME');
}
