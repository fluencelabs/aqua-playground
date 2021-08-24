import { FluencePeer } from '@fluencelabs/fluence';
import { returnLiteral } from '../compiled/examples/returnLiteral';

export async function literalCall(peer: FluencePeer) {
    return returnLiteral(peer);
}
