#!/usr/bin/env node

import {createClient, registerServiceFunction, setLogLevel} from "@fluencelabs/fluence";
import {testNet} from "@fluencelabs/fluence-network-environment";
import {callArrowCall} from "./examples/callArrowCall";
import {dataAliasCall} from "./examples/dataAliasCall";
import {onCall} from "./examples/onCall";
import {funcCall} from "./examples/funcCall";
import {helloWorldCall} from "./examples/helloWorldCall";
import {foldCall} from "./examples/foldCall";
import {ifCall} from "./examples/if";
import {parCall} from "./examples/parCall";
import {complexCall} from "./examples/complex";
import {constantsCall} from "./examples/constantsCall";
import {streamCall} from "./examples/streamCall";
import {topologyCall} from "./examples/topologyCall";
import {foldJoinCall} from "./examples/foldJoinCall";
import {useOptionalCall} from "./examples/useOptionalCall";
import {viaCall} from "./examples/viaCall";
let deepEqual = require('deep-equal')

function checkCall(name: string, expected: any, actual: any, callBackOnError: () => void) {
  if (!deepEqual(actual, expected)) {
    console.error(`${name} call has the wrong result`)
    console.error("expected: ")
    console.dir(expected)
    console.error("actual: ")
    console.dir(actual)
    callBackOnError()
  }
}

function checkCallBy(name: string, actual: any, by: (res: any) => boolean, callBackOnError: () => void) {
  if (!by(actual)) {
    console.error(`${name} call has the wrong result`)
    console.error("actual: " + actual)
    callBackOnError()
  }
}

const main = async () => {
  // setLogLevel("trace")
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

  // foldJoin.aqua
  let foldJoinResult = await foldJoinCall(client)

  // option.aqua
  let optionResult = await useOptionalCall(client)

  // via.aqua
  let viaResult = await viaCall(client)

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

  checkCall("complexCall", complexCallResult, ["some str", "3", "1", "4", "1", "1", "3", "2", "4", "2", "2"], cb)

  checkCall("constantCall", constantCallResult, "non-default string", cb)

  checkCall("streamCall", streamResult, ["first updated", "second updated", "third updated", "fourth updated"], cb)

  checkCall("topologyCall", topologyResult, "finish", cb)

  checkCallBy("foldJoinCall", foldJoinResult, (res) => res.length == 3, cb)

  checkCall("useOptional", optionResult, "hello", cb)

  checkCallBy("via", viaResult, (res) => res.every( (val, i, arr) => deepEqual(val, arr[0]) ), cb)

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
