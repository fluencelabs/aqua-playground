#!/usr/bin/env node

import {createClient, registerServiceFunction, setLogLevel} from "@fluencelabs/fluence";

import {krasnodar} from "@fluencelabs/fluence-network-environment";
import {setKeyPutValue, getValues, putHostValue, clearHostValue} from "./compiled/dht";


const main = async () => {
    setLogLevel("warn")
    // each compiled aqua function require a connected client
    const client = await createClient(krasnodar[0]);


    console.log("SET KEY")
    await setKeyPutValue(client, krasnodar[0].peerId, "Test Hello3", "some value4", client.relayPeerId!, 0);
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
