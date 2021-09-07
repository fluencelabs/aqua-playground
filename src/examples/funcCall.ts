import { testFunc, registerTestSrv } from '../compiled/examples/func';

export async function funcCall() {
    registerTestSrv({
        str: () => {
            return `some str`;
        },
    });

    return await testFunc();
}
