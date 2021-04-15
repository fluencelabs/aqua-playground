import {testFunc} from "./compiled/func";
import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";

export async function funcCall(client: FluenceClient) {
    registerServiceFunction(client, "test-service-id", "str", (args: any[], _) => {
        return `some str`
    })

    const res = await testFunc(client);
    console.log("Message: ", res);
}
