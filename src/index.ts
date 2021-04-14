#!/usr/bin/env node

import {createClient, registerServiceFunction, SecurityTetraplet} from "@fluencelabs/fluence";
import { testNet } from "@fluencelabs/fluence-network-environment";
import {callArrowCall} from "./callArrowCall";
import {dataAliasCall} from "./dataAliasCall";
import {onCall} from "./onCall";
import {funcCall} from "./funcCall";
import {helloWorldCall} from "./helloWorldCall";
import {foldCall} from "./foldCall";
import {ifCall} from "./if";
import {parCall} from "./parCall";
import {complexCall} from "./complex";

const main = async () => {
  const client = await createClient(testNet[0]);

  registerServiceFunction(client, "println", "print", (args: any[], _) => {
    console.log("println:   " + args[0])
    return {}
  })

  await callArrowCall(client)
  await foldCall(client)
  await ifCall(client)
  await parCall(client)

  await helloWorldCall(client)
  await funcCall(client)
  await onCall(client)
  await dataAliasCall(client)
  await complexCall(client)

  client.disconnect();
  process.exit(0)
};

main();
