import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {multiReturnFunc} from "../compiled/examples/multiReturn";

export async function multiReturnCall(client: FluenceClient): Promise<[string[], number, string, number[], string | null, number]> {
    registerServiceFunction(client, "multiret-test", "retStr", (args: any[], _) => {
        return args[0]
    })

    registerServiceFunction(client, "multiret-num", "retNum", (args: any[], _) => {
        return 10
    })

    return await multiReturnFunc(client, [1, 2], null)
}