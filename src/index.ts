#!/usr/bin/env node

import {createClient, registerServiceFunction, setLogLevel} from "@fluencelabs/fluence";

import {krasnodar} from "@fluencelabs/fluence-network-environment";
import {getValuesByKey, rkpv, stuffOnProviders} from "./compiled/dht-use";



const main = async () => {
    setLogLevel("info")
    // each compiled aqua function require a connected client
    const client = await createClient(krasnodar[0]);

    let key = "Test Hello3"
    let nodeId = krasnodar[0].peerId
    console.log("SET KEY")
    await rkpv(client, nodeId, key, "some value21", krasnodar[0].peerId, null);
    let recs = getValuesByKey(client, nodeId, key)
    console.log(recs)
    console.log("GET VALUES")

    console.time("ack")
    // let values = await getValues(client, krasnodar[0].peerId, "Test Hello3");
    console.timeEnd("ack")
    // console.dir(values)

    stuffOnProviders(client, nodeId, key, (r: any) => console.log(r))

    console.log("end")

    // process.exit(0)
};

main().catch((err) => {
    console.log(err)
    process.exit(1)
})
