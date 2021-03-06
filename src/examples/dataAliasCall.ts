import { FluencePeer } from '@fluencelabs/fluence';
import { getAliasedData, registerNodeIdGetter } from '../compiled/examples/dataAlias';

export async function dataAliasCall() {
    registerNodeIdGetter({
        get: () => {
            return {
                peerId: 'peer id str',
                name: 'name str',
            };
        },
    });

    return await getAliasedData();
}
