import { FluencePeer } from '@fluencelabs/fluence';
import { callConstant, registerGetter } from '../compiled/examples/constants';

export async function constantsCall(peer: FluencePeer): Promise<string[]> {
    registerGetter(peer, {
        createStr: async (arg0) => {
            return '' + arg0;
        },
    });

    return await callConstant(peer);
}
