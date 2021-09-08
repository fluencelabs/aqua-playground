import { FluencePeer } from '@fluencelabs/fluence';
import { callConstant, registerGetter } from '../compiled/examples/constants';

export async function constantsCall(): Promise<string[]> {
    registerGetter({
        createStr: (arg0) => {
            return '' + arg0;
        },
    });

    return await callConstant();
}
