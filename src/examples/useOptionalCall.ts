import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {useOptional} from "../compiled/examples/option";

export async function useOptionalCall(client: FluenceClient): Promise<string> {
    registerServiceFunction(client, "test2", "getStr", (args: any[], _) => {
        return args[0]
    })

    registerServiceFunction(client, "test2", "getStr2", (args: any[], _) => {
        return args[0]
    })

    return await useOptional(client, "hello")
}
