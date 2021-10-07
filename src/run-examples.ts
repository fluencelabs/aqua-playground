#!/usr/bin/env node

import { Fluence, FluencePeer } from '@fluencelabs/fluence';
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
import { returnNilCall, returnNoneCall, streamCall } from './examples/streamCall';
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
import { genOptions } from './examples/optionsCall';
import { relays } from './config';

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

    await Fluence.start({ connectTo: relays[0] });
    const selfPeerId = Fluence.getStatus().peerId;

    const peer2 = new FluencePeer();
    await peer2.start({ connectTo: relays[1] });

    // this could be called from `println.aqua`
    registerPrintln({
        print: (arg0) => {
            console.log('println:   ' + arg0);
        },
    });

    // these is only list of calls. Take a look into functions to see what's going on

    // these calls return void, so they could be executed at any time,
    // because promise waits only a fact that particle was sent

    let success = true;
    let cb: () => void = () => {
        success = false;
    };

    // callArrow.aqua
    let callArrowResult = await callArrowCall();
    checkCall('callArrow', callArrowResult, 'Hello, callArrow call!', cb);

    // fold.aqua
    let foldCallResult = await foldCall();
    checkCall('foldCall', foldCallResult, ['/ip4/164.90.171.139/tcp/7770', '/ip4/164.90.171.139/tcp/9990/ws'], cb);

    //if.aqua
    await ifCall();

    // par.aqua
    let parCallResult = await parCall();
    checkCall('parArrow', parCallResult, 'hello', cb);

    // these calls waiting for a result, so it will be called sequentially
    // helloWorld.aqua
    let helloWorldResult = await helloWorldCall();
    checkCall('helloWorldCall', helloWorldResult, 'Hello, NAME!', cb);

    // func.aqua
    let funcCallResult = await funcCall();
    checkCall('funcCall', funcCallResult, 'some str', cb);

    // on.aqua
    let onCallResult = await onCall();
    checkCall('onCall', onCallResult, ['/ip4/164.90.171.139/tcp/7770', '/ip4/164.90.171.139/tcp/9990/ws'], cb);

    // dataAlias.aqua
    let dataAliasResult = await dataAliasCall();
    checkCall('dataAliasCall', dataAliasResult, 'peer id str', cb);

    // complex.aqua
    let complexCallResult = await complexCall();
    checkCall(
        'complexCall',
        complexCallResult,
        ['some str', '3', '1', '4', '1', '1', '3', '2', '4', '2', '2', selfPeerId],
        cb,
    );

    // constants.aqua
    let constantCallResult = await constantsCall();
    checkCall('constantCall', constantCallResult, ['1', 'ab'], cb);

    // stream.aqua
    let streamResult = await streamCall();
    checkCall('streamCall', streamResult, ['first updated', 'second updated', 'third updated', 'fourth updated'], cb);
    let returnNilResult = await returnNilCall();
    checkCall('returnNilCall', returnNilResult, [], cb);
    let returnNoneResult = await returnNoneCall();
    checkCall('returnNoneCall', returnNoneResult, null, cb);

    // topology.aqua
    let topologyResult = await topologyCall(peer2);
    checkCall('topologyCall', topologyResult, 'finish', cb);

    // foldJoin.aqua
    let foldJoinResult = await foldJoinCall();
    checkCallBy('foldJoinCall', foldJoinResult, (res) => res.length == 3, cb);

    // option.aqua
    registerHandlers();
    let optionResult = await useOptionalCall();
    let optionalResult = await returnOptionalCall();
    let noneResult = await returnNull();
    checkCall('useOptional', optionResult, 'hello', cb);
    checkCall('returnOptional', optionalResult, 'optional', cb);
    checkCall('returnNone', noneResult, null, cb);

    // via.aqua
    let viaResult = await viaCall();
    checkCallBy('via', viaResult, (res) => res.every((val, i, arr) => deepEqual(val, arr[0])), cb);

    // nestedFuncs.aqua
    let nestedFuncsResult = await nestedFuncsCall();
    checkCall('nestedFuncsCall', nestedFuncsResult, 'some-str', cb);

    // assignment.aqua
    let assignmentResult = await assignmentCall();
    checkCall('assignmentCall', assignmentResult, ['abc', 'hello'], cb);

    // tryOtherwise.aqua
    let tryOtherwiseResult = await tryOtherwiseCall();
    checkCall('tryOtherwiseCall', tryOtherwiseResult, 'error', cb);

    // tryCatch.aqua
    let tryCatchResult = await tryCatchCall();
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

    // coCall.aqua
    let coCallResult = await coCall();
    checkCall('coCall', coCallResult, ['/ip4/164.90.171.139/tcp/7770', '/ip4/164.90.171.139/tcp/9990/ws'], cb);

    // passArgsCall.aqua
    let passArgsResult = await passArgsCall();
    checkCall('passArgsCall', passArgsResult, 'client-utilsid', cb);

    // streamArgs.aqua
    let streamArgsResult = await streamArgsCall();
    checkCall('streamArgsCall', streamArgsResult, [['peer_id', 'peer_id']], cb);

    // streamResults.aqua
    let streamResultsResult = await streamResultsCall();
    checkCall('streamResultsCall', streamResultsResult, ['new_name', 'new_name', 'new_name'], cb);

    // pushToStream.aqua
    let pushToStreamResult = await pushToStreamCall();
    checkCall('pushToStreamCall', pushToStreamResult, ['hello', 'get_string'], cb);

    // literalCall.aqua
    let literalCallResult = await literalCall();
    checkCall('literalCall', literalCallResult, 'some literal', cb);

    // multiReturn.aqua
    let multiReturnResult = await multiReturnCall();
    checkCall(
        'multiReturnResult',
        multiReturnResult,
        [['some-str', 'random-str', 'some-str'], 5, 'some-str', [1, 2], null, 10],
        cb,
    );

    // declare.aqua
    let declareResult = await declareCall();
    checkCall(
        'declareResult',
        declareResult,
        'small_foodeclare all barsmall_fooexport_constdeclare_constdeclare_const2',
        cb,
    );

    // option_gen.aqua
    let optionGenResult = await genOptions();
    checkCall('optionGenResult', optionGenResult, ['none', 'some'], cb);

    await Fluence.stop();
    await peer2.stop();

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
