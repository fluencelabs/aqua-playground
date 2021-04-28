#!/usr/bin/env node

import {createClient, registerServiceFunction} from "@fluencelabs/fluence";
import {testNet} from "@fluencelabs/fluence-network-environment";
import {callArrowCall} from "./callArrowCall";
import {dataAliasCall} from "./dataAliasCall";
import {onCall} from "./onCall";
import {funcCall} from "./funcCall";
import {helloWorldCall} from "./helloWorldCall";
import {foldCall} from "./foldCall";
import {ifCall} from "./if";
import {parCall} from "./parCall";
import {complexCall} from "./complex";
import {constantsCall} from "./constantsCall";
import {streamCall} from "./streamCall";
import {topologyCall} from "./topologyCall";
let deepEqual = require('deep-equal')

function checkCall(name: string, expected: any, actual: any, callBackOnError: () => void) {
  if (!deepEqual(actual, expected)) {
    console.error(`${name} call has the wrong result`)
    console.error("expected: " + expected)
    console.error("actual: " + actual)
    callBackOnError()
  }
}

const main = async () => {
  const client = await createClient(testNet[0]);
  const client2 = await createClient(testNet[1]);

  // this could be called from `println.aqua`
  registerServiceFunction(client, "println-service-id", "print", (args: any[], _) => {
    console.log("println:   " + args[0])
    return {}
  })

  // these is only list of calls. Take a look into functions to see what's going on

  // these calls return void, so they could be executed at any time,
  // because promise waits only a fact that particle was sent

  // callArrow.aqua
  let callArrowResult = await callArrowCall(client)

  // fold.aqua
  let foldCallResult = await foldCall(client)

  //if.aqua
  await ifCall(client)

  // par.aqua
  let parCallResult = await parCall(client)

  // these calls waiting for a result, so it will be called sequentially
  // helloWorld.aqua
  let helloWorldResult = await helloWorldCall(client)

  // func.aqua
  let funcCallResult = await funcCall(client)

  // on.aqua
  let onCallResult = await onCall(client)

  // dataAlias.aqua
  let dataAliasResult = await dataAliasCall(client)

  // complex.aqua
  let complexCallResult = await complexCall(client)

  // constants.aqua
  let constantCallResult = await constantsCall(client)

  // stream.aqua
  let streamResult = await streamCall(client)

  // topology.aqua
  let topologyResult = await topologyCall(client, client2)

  await client.disconnect();

  let success = true;
  let cb: () => void = () => {
    success = false;
  }

  checkCall("callArrow", callArrowResult, "Hello, callArrow call!", cb)

  checkCall("foldCall", foldCallResult, ["/ip4/165.227.164.206/tcp/7001", "/ip4/165.227.164.206/tcp/9001/ws"], cb)

  checkCall("onCall", onCallResult, ["/ip4/165.227.164.206/tcp/7001", "/ip4/165.227.164.206/tcp/9001/ws"], cb)

  checkCall("parArrow", parCallResult, "hello", cb)

  checkCall("helloWorldCall", helloWorldResult, "Hello, NAME!", cb)

  checkCall("funcCall", funcCallResult, "some str", cb)

  checkCall("dataAliasCall", dataAliasResult, "peer id str", cb)

  checkCall("complexCall", complexCallResult, "some str", cb)

  checkCall("constantCall", constantCallResult, "non-default string", cb)

  checkCall("streamCall", streamResult, ["first updated", "second updated", "third updated", "fourth updated"], cb)

  checkCall("topologyCall", topologyResult, "finish", cb)

  if (success) {
    process.exit(0)
  } else {
    process.exit(1)
  }

};

main().catch((err) => {
  console.log(err)
  process.exit(1)
})
