import { FluencePeer } from '@fluencelabs/fluence';
import { create_client_util, registerAquaDHT } from '../compiled/examples/passArgs';

export async function passArgsCall(peer: FluencePeer) {
    registerAquaDHT(peer, {
        put_host_value: (args0, args1) => {
            return args0 + args1;
        },
    });

    return await create_client_util(peer, 'sid');
}
