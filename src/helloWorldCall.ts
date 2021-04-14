import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {helloWorld} from "./compiled/helloWorld";

export async function helloWorldCall(client: FluenceClient) {
    registerServiceFunction(client, "StringExtra", "addNameToHello", (args: any[], _) => {
        return `Hello, ${args[0]}!`
    })

    const hello = await helloWorld(client, "NAME");
    console.log("Message: ", hello);
}