import { FluencePeer } from '@fluencelabs/fluence';
import { checkStreams, registerStringer } from '../compiled/examples/stream';

export async function streamCall() {
    registerStringer({
        returnString: async (args0) => {
            return args0 + ' updated';
        },
    });

    return checkStreams(['third', 'fourth']);
}
