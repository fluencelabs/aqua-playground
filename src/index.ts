#!/usr/bin/env node

import {createClient, registerServiceFunction, SecurityTetraplet} from "@fluencelabs/fluence";
import { testNet } from "@fluencelabs/fluence-network-environment";
import {helloWorld} from "./compiled/helloWorld";
import {testFunc} from "./compiled/func";
import {getPeerExternalAddresses} from "./compiled/some";
import {dataAliasFunc} from "./compiled/dataAlias";
import {callArrowFunc} from "./compiled/callArrow";
import {callArrowCall} from "./callArrowCall";
import {dataAliasCall} from "./dataAliasCall";
import {onCall} from "./onCall";
import {funcCall} from "./funcCall";
import {helloWorldCall} from "./helloWorldCall";

const main = async () => {
  const client = await createClient(testNet[0]);

  registerServiceFunction(client, "println", "print", (args: any[], _) => {
    console.log("println:   " + args[0])
    return {}
  })

  await helloWorldCall(client)
  await funcCall(client)
  await onCall(client)
  await dataAliasCall(client)
  callArrowCall(client)

  client.disconnect();
  process.exit(0)
};

main();
