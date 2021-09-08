import { FluencePeer } from '@fluencelabs/fluence';
import { helloWorld, registerStringExtra } from '../compiled/examples/helloWorld';

export async function helloWorldCall() {
    // helloWorld.aqua
    registerStringExtra({
        addNameToHello: (args0) => {
            return `Hello, ${args0}!`;
        },
    });

    return await helloWorld('NAME');
}
