#!/usr/bin/env node

import {createClient, registerServiceFunction, setLogLevel} from "@fluencelabs/fluence";

import {krasnodar} from "@fluencelabs/fluence-network-environment";
import {setKeyPutValue, getValues, putHostValue, clearHostValue} from "./compiled/dht";


const main = async () => {
    setLogLevel("warn")
    // each compiled aqua function require a connected client
    const client = await createClient(krasnodar[0]);


    // example to how register a local service
    // it could be used in aqua code as follows
    // service StringExtra("service-id"):
    //     addNameToHello: string -> string
    // see more in helloWorld.aqua
    registerServiceFunction(client, "aqua-dht", "merge_two", (args: any[], _) => {
        console.log("aquadht")
        console.log(args)
        return []
    })

    console.log("SET KEY")
    // await setKeyPutValue(client, krasnodar[0].peerId, "Test Hello3", "some value4", client.relayPeerId!, 0);
    // await clearHostValue(client, "Test Hello2", krasnodar[0].peerId);
    // console.log(nodes.length)
    console.log("GET VALUES")

    console.time("ack")
    let values = await getValues(client, krasnodar[0].peerId, "Test Hello3");
    console.timeEnd("ack")
    console.dir(values)

    process.exit(0)
};

main().catch((err) => {
    console.log(err)
    process.exit(1)
})
