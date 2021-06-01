#!/usr/bin/env node

import {createClient, registerServiceFunction, setLogLevel} from "@fluencelabs/fluence";

import {krasnodar} from "@fluencelabs/fluence-network-environment";
import {setKeyPutValue, getValues, putHostValue, clearHostValue} from "./compiled/dht";


const main = async () => {
    setLogLevel("error")
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

    console.log("SET KEY")
    // await putHostValue(client, krasnodar[0].peerId, "Test Hello2", "some value2", [client.relayPeerId!], [], 0);
    await clearHostValue(client, "Test Hello2", krasnodar[0].peerId);
    // console.log(nodes.length)
    console.log("GET VALUES")


    let values = await getValues(client, krasnodar[0].peerId, "Test Hello2");
    console.dir(values)
    console.log(values.length)


    process.exit(0)
};

main().catch((err) => {
    console.log(err)
    process.exit(1)
})
