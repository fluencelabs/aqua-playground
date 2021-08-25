#!/usr/bin/env node

import { FluencePeer } from '@fluencelabs/fluence';
import { krasnodar, testNet } from '@fluencelabs/fluence-network-environment';
import { registerPrintln } from './compiled/examples/println';
import { callArrowCall } from './examples/callArrowCall';
import { dataAliasCall } from './examples/dataAliasCall';
import { onCall } from './examples/onCall';
import { funcCall } from './examples/funcCall';
import { helloWorldCall } from './examples/helloWorldCall';
import { foldCall } from './examples/foldCall';
import { ifCall } from './examples/if';
import { parCall } from './examples/parCall';
import { complexCall } from './examples/complex';
import { constantsCall } from './examples/constantsCall';
import { streamCall } from './examples/streamCall';
import { topologyCall } from './examples/topologyCall';
import { foldJoinCall } from './examples/foldJoinCall';
import { registerHandlers, returnNull, returnOptionalCall, useOptionalCall } from './examples/useOptionalCall';
import { viaCall } from './examples/viaCall';
import { nestedFuncsCall } from './examples/nestedFuncsCall';
import { assignmentCall } from './examples/assignment';
import { tryCatchCall } from './examples/tryCatchCall';
import { tryOtherwiseCall } from './examples/tryOtherwiseCall';
import { coCall } from './examples/coCall';
import { passArgsCall } from './examples/passArgsCall';
import { streamArgsCall } from './examples/streamArgsCall';
import { streamResultsCall } from './examples/streamResultsCall';
import { pushToStreamCall } from './examples/pushToStreamCall';
import { literalCall } from './examples/returnLiteralCall';
import { multiReturnCall } from './examples/multiReturnCall';
import { declareCall } from './examples/declareCall';
let deepEqual = require('deep-equal');

function checkCall(name: string, actual: any, expected: any, callBackOnError: () => void) {
    console.log('-- checking ' + name + ' --');
    if (!deepEqual(expected, actual)) {
        console.error(`${name} call has the wrong result`);
        console.error('actual: ');
        console.dir(actual);
        console.error('expected: ');
        console.dir(expected);
        callBackOnError();
    }
}

function checkCallBy(name: string, actual: any, by: (res: any) => boolean, callBackOnError: () => void) {
    console.log('-- checking ' + name + ' --');
    if (!by(actual)) {
        console.error(`${name} call has the wrong result`);
        console.error('actual: ' + actual);
        callBackOnError();
    }
}

const main = async () => {
    // setLogLevel("trace")

    await FluencePeer.default.init({ connectTo: krasnodar[0] });
    const selfPeerId = FluencePeer.default.connectionInfo.selfPeerId;

    const peer2 = new FluencePeer();
    await peer2.init({ connectTo: krasnodar[1] });

    // this could be called from `println.aqua`
    registerPrintln({
        print: async (arg0) => {
            console.log('println:   ' + arg0);
        },
    });

    // these is only list of calls. Take a look into functions to see what's going on

    // these calls return void, so they could be executed at any time,
    // because promise waits only a fact that particle was sent

    // callArrow.aqua
    let callArrowResult = await callArrowCall();

    // fold.aqua
    let foldCallResult = await foldCall();

    //if.aqua
    await ifCall();

    // par.aqua
    let parCallResult = await parCall();

    // these calls waiting for a result, so it will be called sequentially
    // helloWorld.aqua
    let helloWorldResult = await helloWorldCall();

    // func.aqua
    let funcCallResult = await funcCall();

    // on.aqua
    let onCallResult = await onCall();

    // dataAlias.aqua
    let dataAliasResult = await dataAliasCall();

    // complex.aqua
    let complexCallResult = await complexCall();

    // constants.aqua
    let constantCallResult = await constantsCall();

    // stream.aqua
    let streamResult = await streamCall();

    // topology.aqua
    let topologyResult = await topologyCall(peer2);

    // foldJoin.aqua
    let foldJoinResult = await foldJoinCall();

    // option.aqua
    registerHandlers();
    let optionResult = await useOptionalCall();
    let optionalResult = await returnOptionalCall();
    let noneResult = await returnNull();

    // via.aqua
    let viaResult = await viaCall();

    // nestedFuncs.aqua
    let nestedFuncsResult = await nestedFuncsCall();

    // assignment.aqua
    let assignmentResult = await assignmentCall();

    // tryOtherwise.aqua
    let tryOtherwiseResult = await tryOtherwiseCall();

    // tryCatch.aqua
    let tryCatchResult = await tryCatchCall();

    // coCall.aqua
    let coCallResult = await coCall();

    // passArgsCall.aqua
    let passArgsResult = await passArgsCall();

    // streamArgs.aqua
    let streamArgsResult = await streamArgsCall();

    // streamResults.aqua
    let streamResultsResult = await streamResultsCall();

    // pushToStream.aqua
    let pushToStreamResult = await pushToStreamCall();

    // literalCall.aqua
    let literalCallResult = await literalCall();

    // multiReturn.aqua
    let multiReturnResult = await multiReturnCall();

    // declare.aqua
    let declareResult = await declareCall();

    await FluencePeer.default.uninit();
    await peer2.uninit();

    let success = true;
    let cb: () => void = () => {
        success = false;
    };

    checkCall('callArrow', callArrowResult, 'Hello, callArrow call!', cb);

    checkCall('foldCall', foldCallResult, ['/ip4/164.90.171.139/tcp/7770', '/ip4/164.90.171.139/tcp/9990/ws'], cb);

    checkCall('onCall', onCallResult, ['/ip4/164.90.171.139/tcp/7770', '/ip4/164.90.171.139/tcp/9990/ws'], cb);

    checkCall('parArrow', parCallResult, 'hello', cb);

    checkCall('helloWorldCall', helloWorldResult, 'Hello, NAME!', cb);

    checkCall('funcCall', funcCallResult, 'some str', cb);

    checkCall('dataAliasCall', dataAliasResult, 'peer id str', cb);

    checkCall(
        'complexCall',
        complexCallResult,
        ['some str', '3', '1', '4', '1', '1', '3', '2', '4', '2', '2', selfPeerId],
        cb,
    );

    checkCall('constantCall', constantCallResult, ['1', 'ab'], cb);

    checkCall('streamCall', streamResult, ['first updated', 'second updated', 'third updated', 'fourth updated'], cb);

    checkCall('topologyCall', topologyResult, 'finish', cb);

    checkCallBy('foldJoinCall', foldJoinResult, (res) => res.length == 3, cb);

    checkCall('useOptional', optionResult, 'hello', cb);
    checkCall('returnOptional', optionalResult, 'optional', cb);
    checkCall('returnNone', noneResult, null, cb);

    checkCallBy('via', viaResult, (res) => res.every((val, i, arr) => deepEqual(val, arr[0])), cb);

    checkCall('nestedFuncsCall', nestedFuncsResult, 'some-str', cb);

    checkCall('assignmentCall', assignmentResult, ['abc', 'hello'], cb);

    checkCall('tryOtherwiseCall', tryOtherwiseResult, 'error', cb);

    checkCall('coCall', coCallResult, ['/ip4/164.90.171.139/tcp/7770', '/ip4/164.90.171.139/tcp/9990/ws'], cb);

    checkCall('passArgsCall', passArgsResult, 'client-utilsid', cb);

    checkCall('streamArgsCall', streamArgsResult, [['peer_id', 'peer_id']], cb);

    checkCall('streamResultsCall', streamResultsResult, ['new_name', 'new_name', 'new_name'], cb);

    checkCall('pushToStreamCall', pushToStreamResult, ['hello', 'get_string'], cb);

    checkCall('literalCall', literalCallResult, 'some literal', cb);

    checkCall(
        'multiReturnResult',
        multiReturnResult,
        [['some-str', 'random-str', 'some-str'], 5, 'some-str', [1, 2], null, 10],
        cb,
    );

    checkCall('declareResult', declareResult, 'declare all foodeclare all barsmall_foo', cb);

    checkCallBy(
        'tryCatchCall',
        tryCatchResult,
        (res) => {
            return (
                (res[0] as string).includes("Error: Service with id 'unex' not found") &&
                res[1] === '/ip4/164.90.171.139/tcp/7770'
            );
        },
        cb,
    );

    if (success) {
        process.exit(0);
    } else {
        process.exit(1);
    }
};

main().catch((err) => {
    console.log(err);
    process.exit(1);
});
