import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {multiReturnFunc} from "../compiled/examples/multiReturn";

export async function multiReturnCall(client: FluenceClient): Promise<[string[], number, number, string, number[]]> {
    registerServiceFunction(client, "multiret-test", "retStr", (args: any[], _) => {
        return args[0]
    })

    return await multiReturnFunc(client, [1, 2])
}