#!/usr/bin/env node

import {createClient, registerServiceFunction} from "@fluencelabs/fluence";

import {krasnodar} from "@fluencelabs/fluence-network-environment";
import {setKey, getValues} from "./compiled/dht";


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
    await setKey(client, krasnodar[0].peerId, "Test Hello2", "some value2", client.relayPeerId!, (x, y) => console.log("Ack: ", x, y));
    let values = await getValues(client, krasnodar[0].peerId, "Test Hello2", (x, y) => console.log("Ack: ", x, y));
    console.log(values)
    

    process.exit(0)
};

main().catch((err) => {
    console.log(err)
    process.exit(1)
})
