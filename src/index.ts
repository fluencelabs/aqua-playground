#!/usr/bin/env node

import {createClient, registerServiceFunction, setLogLevel} from "@fluencelabs/fluence";

import {krasnodar} from "@fluencelabs/fluence-network-environment";
import {registerKeyPutValue, getValues, putHostValue, clearHostValue} from "./compiled/dht";
import {replicate_check} from "./compiled/dht-storage-script";


const main = async () => {
    setLogLevel("info")
    // each compiled aqua function require a connected client
    const client = await createClient(krasnodar[0]);


    console.log("SET KEY")
    // await registerKeyPutValue(client, krasnodar[0].peerId, "Test Hello3", "some value21", null, null);
    // await clearHostValue(client, "Test Hello2", krasnodar[0].peerId);
    // console.log(nodes.length)
    console.log("GET VALUES")

    console.time("ack")
    // let values = await getValues(client, krasnodar[0].peerId, "Test Hello3");
    console.timeEnd("ack")
    // console.dir(values)

    await replicate_check(client, client.relayPeerId!, (x: any) => console.log("ack str: ", x), (x: any) => console.log("ack: ", x), (n: string, x: any) => console.log("ack: ", n, x), (n: string, x: any) => console.log("ack: ", n, x))
    console.log("end")

    // process.exit(0)
};

main().catch((err) => {
    console.log(err)
    process.exit(1)
})
