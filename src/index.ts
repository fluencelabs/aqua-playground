#!/usr/bin/env node

import {createClient, registerServiceFunction} from "@fluencelabs/fluence";
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

  // this could be called from `println.aqua`
  registerServiceFunction(client, "println", "print", (args: any[], _) => {
    console.log("println:   " + args[0])
    return {}
  })

  // these is only list of calls. Take a look into functions to see what's going on

  // these calls return void, so they could be executed at any time,
  // because promise waits only a fact that particle was sent
  await callArrowCall(client)
  await foldCall(client)
  await ifCall(client)
  await parCall(client)

  // these calls waiting for a result, so it will be called sequentially
  await helloWorldCall(client)
  await funcCall(client)
  await onCall(client)
  await dataAliasCall(client)
  await complexCall(client)

  client.disconnect();
  process.exit(0)
};

main();
