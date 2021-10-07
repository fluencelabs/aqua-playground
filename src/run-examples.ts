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

export const runExamples = async () => {
    // stop the currently running peer to start with the clean state
    await Fluence.stop();

    await Fluence.start({ connectTo: relays[0] });

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
    let returnNilResult = await returnNilCall();
    let returnNoneResult = await returnNoneCall();

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

    // option_gen.aqua
    let optionGenResult = await genOptions();

    await Fluence.stop();
    await peer2.stop();
};
