import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {helloWorld} from "../compiled/examples/helloWorld";

export async function helloWorldCall(client: FluenceClient) {
    // helloWorld.aqua
    registerServiceFunction(client, "service-id", "addNameToHello", (args: any[], _) => {
        return `Hello, ${args[0]}!`
    })

    return await helloWorld(client, "NAME");
}
