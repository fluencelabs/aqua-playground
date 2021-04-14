import {testFunc} from "./compiled/func";
import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";

export async function funcCall(client: FluenceClient) {
    registerServiceFunction(client, "srv", "str", (args: any[], _) => {
        return `some str`
    })

    const res = await testFunc(client);
    console.log("Message: ", res);
}