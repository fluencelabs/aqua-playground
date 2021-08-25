import { testFunc } from '../compiled/examples/func';
import { registerTestSrv } from '../compiled/examples/complex';
import { FluencePeer } from '@fluencelabs/fluence';

export async function funcCall() {
    registerTestSrv({
        str: async () => {
            return `some str`;
        },
    });

    return await testFunc();
}
