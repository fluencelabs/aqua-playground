import { FluencePeer } from '@fluencelabs/fluence';
import { streamRes } from '../compiled/examples/streamRestriction';

export async function streamResCall(): Promise<any> {
    return await streamRes(["a", "b", "c"]);
}
