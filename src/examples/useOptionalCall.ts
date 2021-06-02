import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {getTwoResults} from "../compiled/examples/foldJoin";
import {useOptional} from "../compiled/examples/option";

export async function useOptionalCall(client: FluenceClient): Promise<string> {
    registerServiceFunction(client, "test2", "getStr", (args: any[], _) => {
        console.log("getStr:")
        console.log(args)
        return args[0]
    })

    registerServiceFunction(client, "test2", "getStr2", (args: any[], _) => {
        console.log("getStr2:")
        console.log(args)
        return args[0]
    })

    let cbEm = (str: string) => console.log(str)
    let cb = (str: string, arg: any) => console.log(str, arg)
    return await useOptional(client, "hello", cbEm, cb, cb)
}
