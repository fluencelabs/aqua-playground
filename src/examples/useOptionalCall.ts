import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {returnNone, returnOptional, useOptional} from "../compiled/examples/option";

export async function useOptionalCall(client: FluenceClient): Promise<string> {
    registerServiceFunction(client, "test2", "getStr", (args: any[], _) => {
        return args[0]
    })

    registerServiceFunction(client, "test2", "getStr2", (args: any[], _) => {
        return args[0]
    })

    return await useOptional(client, "hello")
}

export async function returnOptionalCall(client: FluenceClient): Promise<string | null> {
    registerServiceFunction(client, "test2", "getStr1", (args: any[], _) => {
        return ["optional"]
    })

    return await returnOptional(client)
}

export async function returnNull(client: FluenceClient): Promise<string | null> {

    return await returnNone(client)
}
