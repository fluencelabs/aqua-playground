import { FluencePeer } from '@fluencelabs/fluence';
import { d, registerOpH } from '../compiled/examples/nestedFuncs';

export async function nestedFuncsCall(): Promise<string> {
    registerOpH({
        identity: async (args0) => {
            return args0;
        },
    });

    return await d('some-str');
}
