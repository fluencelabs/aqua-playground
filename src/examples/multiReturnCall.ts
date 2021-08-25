import { FluencePeer } from '@fluencelabs/fluence';
import { multiReturnFunc, registerGetStr, registerGetNum } from '../compiled/examples/multiReturn';

export async function multiReturnCall(
    peer: FluencePeer,
): Promise<[string[], number, string, number[], string | null, number]> {
    registerGetStr(peer, {
        retStr: async (args0) => {
            return args0;
        },
    });

    registerGetNum(peer, {
        retNum: async () => {
            return 10;
        },
    });

    return await multiReturnFunc(peer, [1, 2], null);
}
