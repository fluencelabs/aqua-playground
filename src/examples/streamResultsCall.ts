import { FluencePeer } from '@fluencelabs/fluence';
import { use_name2, registerDTGetter } from '../compiled/examples/streamResults';

export async function streamResultsCall() {
    registerDTGetter({
        get_dt: async (args0) => {
            return {
                field: args0,
            };
        },
    });

    return await use_name2('new_name');
}
