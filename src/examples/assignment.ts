import { FluencePeer } from '@fluencelabs/fluence';
import { doSmth } from '../compiled/examples/assignment';

export async function assignmentCall(peer: FluencePeer): Promise<string[]> {
    return await doSmth(peer, { value: 'abc' }, { ttl: 6000 });
}
