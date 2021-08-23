import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {concat_foobars} from "../compiled/examples/imports_exports/imports";

export async function declareCall(client: FluenceClient) {
    registerServiceFunction(client, "super_foo", "small_foo", (args: any[], _) => {
        return "small_foo"
    })

    registerServiceFunction(client, "string_service", "concat", (args: any[], _) => {
        return args[0] + args[1]
    })

    registerServiceFunction(client, "my_export_srv", "another_str", (args: any[], _) => {
        return "str_from_my_export_srv"
    })

    return await concat_foobars(client)
}
