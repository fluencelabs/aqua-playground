#!/usr/bin/env node

import {createClient, registerServiceFunction, setLogLevel} from "@fluencelabs/fluence";
import {krasnodar, testNet, stage} from "@fluencelabs/fluence-network-environment";
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
import {returnNull, returnOptionalCall, useOptionalCall} from "./examples/useOptionalCall";
import {viaCall} from "./examples/viaCall";
import {nestedFuncsCall} from "./examples/nestedFuncsCall";
import {assignmentCall} from "./examples/assignment";
import {tryCatchCall} from "./examples/tryCatchCall";
import {tryOtherwiseCall} from "./examples/tryOtherwiseCall";
import {coCall} from "./examples/coCall";
import {passArgsCall} from "./examples/passArgsCall";
import {streamArgsCall} from "./examples/streamArgsCall";
import {streamResultsCall} from "./examples/streamResultsCall";
import {pushToStreamCall} from "./examples/pushToStreamCall";
import {literalCall} from "./examples/returnLiteralCall";
import {multiReturnCall} from "./examples/multiReturnCall";
import {declareCall} from "./examples/declareCall";
import {subImportCall} from "./examples/subImportUsageCall";
import {import2Call} from "./examples/import2Call";
let deepEqual = require('deep-equal')

function checkCall(name: string, actual: any, expected: any, callBackOnError: () => void) {
  if (!deepEqual(expected, actual)) {
    console.error(`${name} call has the wrong result`)
    console.error("actual: ")
    console.dir(actual)
    console.error("expected: ")
    console.dir(expected)
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
  const client = await createClient(stage[0]);
  const client2 = await createClient(stage[1]);

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
  let optionalResult = await returnOptionalCall(client)
  let noneResult = await returnNull(client)

  // via.aqua
  let viaResult = await viaCall(client)

  // nestedFuncs.aqua
  let nestedFuncsResult = await nestedFuncsCall(client)

  // assignment.aqua
  let assignmentResult = await assignmentCall(client)

  // tryOtherwise.aqua
  let tryOtherwiseResult = await tryOtherwiseCall(client)

  // tryCatch.aqua
  let tryCatchResult = await tryCatchCall(client)

  // coCall.aqua
  let coCallResult = await coCall(client)

  // passArgsCall.aqua
  let passArgsResult = await passArgsCall(client)

  // streamArgs.aqua
  let streamArgsResult = await streamArgsCall(client)

  // streamResults.aqua
  let streamResultsResult = await streamResultsCall(client)

  // pushToStream.aqua
  let pushToStreamResult = await pushToStreamCall(client)

  // literalCall.aqua
  let literalCallResult = await literalCall(client)

  // multiReturn.aqua
  let multiReturnResult = await multiReturnCall(client)

  // declare.aqua
  let declareResult = await declareCall(client)

  // subImport.aqua and subImportUsage.aqua
  let subImportResult = await subImportCall(client)

  // import2.aqua, export2.aqua, OneMore.aqua
  let import2Result = await import2Call(client)

  await client.disconnect();

  let success = true;
  let cb: () => void = () => {
    success = false;
  }

  checkCall("callArrow", callArrowResult, "Hello, callArrow call!", cb)

  checkCall("foldCall", foldCallResult, ['/ip4/134.209.186.43/tcp/7001', '/ip4/134.209.186.43/tcp/9001/ws'], cb)

  checkCall("onCall", onCallResult, ['/ip4/134.209.186.43/tcp/7001', '/ip4/134.209.186.43/tcp/9001/ws'], cb)

  checkCall("parArrow", parCallResult, "hello", cb)

  checkCall("helloWorldCall", helloWorldResult, "Hello, NAME!", cb)

  checkCall("funcCall", funcCallResult, "some str", cb)

  checkCall("dataAliasCall", dataAliasResult, "peer id str", cb)

  checkCall("complexCall", complexCallResult, ["some str", "3", "1", "4", "1", "1", "3", "2", "4", "2", "2", client.selfPeerId], cb)

  checkCall("constantCall", constantCallResult, ['1', 'ab'], cb)

  checkCall("streamCall", streamResult, ["first updated", "second updated", "third updated", "fourth updated"], cb)

  checkCall("topologyCall", topologyResult, "finish", cb)

  checkCallBy("foldJoinCall", foldJoinResult, (res) => res.length == 3, cb)

  checkCall("useOptional", optionResult, "hello", cb)
  checkCall("returnOptional", optionalResult, "optional", cb)
  checkCall("returnNone", noneResult, null, cb)

  checkCallBy("via", viaResult, (res) => res.every( (val, i, arr) => deepEqual(val, arr[0]) ), cb)

  checkCall("nestedFuncsCall", nestedFuncsResult, "some-str", cb)

  checkCall("assignmentCall", assignmentResult, ["abc", "hello"], cb)

  checkCall("tryOtherwiseCall", tryOtherwiseResult, "error", cb)

  checkCall("coCall", coCallResult, [ '/ip4/134.209.186.43/tcp/7001', '/ip4/134.209.186.43/tcp/9001/ws' ], cb)

  checkCall("passArgsCall", passArgsResult, "client-utilsid", cb)

  checkCall("streamArgsCall", streamArgsResult, [["peer_id", "peer_id"]], cb)

  checkCall("streamResultsCall", streamResultsResult, ["new_name", "new_name", "new_name"], cb)

  checkCall("pushToStreamCall", pushToStreamResult, ["hello", "get_string"], cb)

  checkCall("literalCall", literalCallResult, "some literal", cb)

  checkCall("multiReturnResult", multiReturnResult, [ [ 'some-str', 'random-str', 'some-str' ], 5, 'some-str', [ 1, 2 ], null, 10], cb)

  checkCall("declareResult", declareResult, 'declare all foodeclare all barsmall_fooexport_const', cb)

  checkCall("subImportResult", subImportResult, { one: "random_string", two: 42 }, cb)

  checkCall("import2Result", import2Result, { first: 'I am MyFooBar foo', second: [ 'I am MyFooBar foo', ' I am MyFooBar bar' ] }, cb)

  checkCallBy("tryCatchCall", tryCatchResult, (res) => {
    return (res[0] as string).includes("Error: Service with id 'unex' not found") && res[1] === '/ip4/134.209.186.43/tcp/7001'
  }, cb)

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
