import { FluencePeer } from '@fluencelabs/fluence';
import { checkStreams, registerStringer } from '../compiled/examples/stream';

export async function streamCall(peer: FluencePeer) {
    registerStringer(peer, {
        returnString: async (args0) => {
            return args0 + ' updated';
        },
    });

    return checkStreams(peer, ['third', 'fourth']);
}
