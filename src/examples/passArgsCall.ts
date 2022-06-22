import { Fluence } from '@fluencelabs/fluence';
import {bugLNG60, create_client_util, registerAquaDHT} from '../compiled/examples/passArgs';

export async function passArgsCall() {
    registerAquaDHT({
        put_host_value: (args0, args1) => {
            return args0 + args1;
        },
    });

    return await create_client_util('sid');
}

export async function bugLNG60Call(): Promise<boolean> {
    return bugLNG60(Fluence.getPeer().getStatus().relayPeerId, {ttl: 10000})
}
