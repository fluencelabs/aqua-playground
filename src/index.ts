#!/usr/bin/env node

import {createClient, registerServiceFunction} from "@fluencelabs/fluence";
import {krasnodar} from "@fluencelabs/fluence-network-environment";
import {helloWorld} from "./compiled/examples/helloWorld";

const main = async () => {
    // each compiled aqua function require a connected client
    const client = await createClient(krasnodar[0]);

    // example to how register a local service
    // it could be used in aqua code as follows
    // service StringExtra("service-id"):
    //     addNameToHello: string -> string
    // see more in helloWorld.aqua
    registerServiceFunction(client, "service-id", "addNameToHello", (args: any[], _) => {
        return `Hello, ${args[0]}!`
    })

    // call an aqua function thet presented in ../aqua/helloWorld.aqua
    const result = await helloWorld(client, "NAME");
    console.log(result)

    process.exit(0)
};

main().catch((err) => {
    console.log(err)
    process.exit(1)
})
