import { FluencePeer } from '@fluencelabs/fluence';
import { use_name2, registerDTGetter } from '../compiled/examples/streamResults';

export async function streamResultsCall(peer: FluencePeer) {
    registerDTGetter(peer, {
        get_dt: (args0) => {
            return {
                field: args0,
            };
        },
    });

    return await use_name2(peer, 'new_name');
}
