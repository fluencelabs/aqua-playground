import { FluencePeer } from '@fluencelabs/fluence';
import { multiReturnFunc, registerGetStr, registerGetNum } from '../compiled/examples/multiReturn';

export async function multiReturnCall(): Promise<[string[], number, string, number[], string | null, number]> {
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

    return await multiReturnFunc([1, 2], null);
}
