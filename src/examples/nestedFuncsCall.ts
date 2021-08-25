import { FluencePeer } from '@fluencelabs/fluence';
import { d, registerOpH } from '../compiled/examples/nestedFuncs';

export async function nestedFuncsCall(peer: FluencePeer): Promise<string> {
    registerOpH(peer, {
        identity: async (args0) => {
            return args0;
        },
    });

    return await d(peer, 'some-str');
}
