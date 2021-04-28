import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {callConstant} from "./compiled/constants";

export async function constantsCall(client: FluenceClient) {
    registerServiceFunction(client, "test", "getNum", (args: any[], _) => {
        return 1
    })

    return new Promise<string>(async (resolve, reject) => {
        await callConstant(client, (a: string) => {
                resolve(a)
        });
    })
}