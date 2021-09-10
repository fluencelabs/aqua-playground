import { FluencePeer } from '@fluencelabs/fluence';
import {checkStreams, registerStringer, stringNil, stringNone} from '../compiled/examples/stream';

export async function streamCall() {
    registerStringer({
        returnString: (args0) => {
            return args0 + ' updated';
        },
    });

    return checkStreams(['third', 'fourth']);
}

export async function returnNilCall() {
    return stringNil()
}

export async function returnNoneCall() {
    return stringNone()
}
