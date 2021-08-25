#!/usr/bin/env node

import { FluencePeer } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import { helloWorld, registerStringExtra } from './compiled/examples/helloWorld';

const main = async () => {
    // each compiled aqua function require a connected client
    const peer = new FluencePeer();
    await peer.init({ connectTo: krasnodar[0] });

    // example to how register a local service
    // it could be used in aqua code as follows
    // service StringExtra("service-id"):
    //     addNameToHello: string -> string
    // see more in helloWorld.aqua
    registerStringExtra(peer, {
        addNameToHello: async (arg0) => {
            return `Hello, ${arg0}!`;
        },
    });

    // call an aqua function thet presented in ../aqua/helloWorld.aqua
    const result = await helloWorld(peer, 'NAME');
    console.log(result);

    process.exit(0);
};

main().catch((err) => {
    console.log(err);
    process.exit(1);
});
