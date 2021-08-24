import { FluencePeer } from '@fluencelabs/fluence';
import { retrieve_records, registerTestService } from '../compiled/examples/streamArgs';

export async function streamArgsCall(peer: FluencePeer) {
    registerTestService(peer, {
        get_records: (key) => {
            return [key, key];
        },
    });

    return await retrieve_records(peer, 'peer_id');
}
