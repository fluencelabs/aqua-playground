import { FluencePeer } from '@fluencelabs/fluence';
import { multiReturnFunc, registerGetStr, registerGetNum, registerGetMulti } from '../compiled/examples/multiReturn';

export async function multiReturnCall(): Promise<
    [string[], number, string, number[], string | null, number, string, number, string, number | null, number | null]
> {
    registerGetStr({
        retStr: (args0) => {
            return args0;
        },
    });

    registerGetNum({
        retNum: () => {
            return 10;
        },
    });

    registerGetMulti({
        ret: () => {
            return ['non-opt', 1];
        },
        retOpt: () => {
            return ['opt', 1, null];
        },
    });

    return await multiReturnFunc([1, 2], null);
}
