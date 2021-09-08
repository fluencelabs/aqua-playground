import { FluencePeer } from '@fluencelabs/fluence';
import { doSmth } from '../compiled/examples/assignment';

export async function assignmentCall(): Promise<string[]> {
    return await doSmth({ value: 'abc' }, { ttl: 6000 });
}
