import { FluencePeer } from '@fluencelabs/fluence';
import { returnLiteral } from '../compiled/examples/returnLiteral';

export async function literalCall() {
    return returnLiteral();
}
