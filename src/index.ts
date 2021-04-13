#!/usr/bin/env node

import {createClient, registerServiceFunction, SecurityTetraplet} from "@fluencelabs/fluence";
import { testNet } from "@fluencelabs/fluence-network-environment";
import {helloWorld} from "./compiled/helloWorld";
import {testFunc} from "./compiled/func";
import {getPeerExternalAddresses} from "./compiled/some";
import {dataAliasFunc} from "./compiled/dataAlias";
import {callArrowFunc} from "./compiled/callArrow";

const main = async () => {
  const client = await createClient(testNet[0]);

  registerServiceFunction(client, "DataAlias", "get", (args: any[], _) => {
    return {
      peerId: "peer id str",
      name: "name str"
    }
  })

  registerServiceFunction(client, "srv", "str", (args: any[], _) => {
    return `some str` as unknown as object
  })

  registerServiceFunction(client, "StringExtra", "addNameToHello", (args: any[], _) => {
    return `Hello, ${args[0]}!` as unknown as object
  })

  registerServiceFunction(client, "println", "print", (args: any[], _) => {
    console.log("println:   " + args[0])
    return {}
  })

  const hello = await helloWorld(client, "NAME");
  console.log("Message: ", hello);

  const res = await testFunc(client);
  console.log("Message: ", res);

  const addresses = await getPeerExternalAddresses(client, client.relayPeerId!)
  console.log("Addresses: ", addresses);

  const peerId = await dataAliasFunc(client)
  console.log("PeerId: ", addresses);

  await callArrowFunc(client, (a: string) => {
    return "Hello, " + a + "!"
  })

  await client.disconnect();
  process.exit(0)
};

main();
