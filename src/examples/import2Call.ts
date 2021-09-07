import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {barfoo, wrap} from "../compiled/examples/imports_exports/import2";

export async function import2Call(client: FluenceClient) {

    registerServiceFunction(client, "hello", "more_call", (args: any[], _) => {
        return {}
    })

    registerServiceFunction(client, "ohmygod", "more_call", (args: any[], _) => {
        return {}
    })

    let first = await wrap(client)
    let second = await barfoo(client)

    return { first, second }
}
