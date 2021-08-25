import { FluencePeer } from '@fluencelabs/fluence';
import { get_results, registerOpA } from '../compiled/examples/pushToStream';

export async function pushToStreamCall(peer: FluencePeer) {
    registerOpA(peer, {
        get_str: async () => {
            return 'get_string';
        },
    });

    return await get_results(peer);
}
