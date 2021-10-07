import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import { krasnodar, testNet } from '@fluencelabs/fluence-network-environment';
import { registerPrintln } from '../compiled/examples/println';
import { callArrowCall } from '../examples/callArrowCall';
import { dataAliasCall } from '../examples/dataAliasCall';
import { onCall } from '../examples/onCall';
import { funcCall } from '../examples/funcCall';
import { helloWorldCall } from '../examples/helloWorldCall';
import { foldCall } from '../examples/foldCall';
import { ifCall } from '../examples/if';
import { parCall } from '../examples/parCall';
import { complexCall } from '../examples/complex';
import { constantsCall } from '../examples/constantsCall';
import { returnNilCall, returnNoneCall, streamCall } from '../examples/streamCall';
import { topologyCall } from '../examples/topologyCall';
import { foldJoinCall } from '../examples/foldJoinCall';
import { registerHandlers, returnNull, returnOptionalCall, useOptionalCall } from '../examples/useOptionalCall';
import { viaCall } from '../examples/viaCall';
import { nestedFuncsCall } from '../examples/nestedFuncsCall';
import { assignmentCall } from '../examples/assignment';
import { tryCatchCall } from '../examples/tryCatchCall';
import { tryOtherwiseCall } from '../examples/tryOtherwiseCall';
import { coCall } from '../examples/coCall';
import { passArgsCall } from '../examples/passArgsCall';
import { streamArgsCall } from '../examples/streamArgsCall';
import { streamResultsCall } from '../examples/streamResultsCall';
import { pushToStreamCall } from '../examples/pushToStreamCall';
import { literalCall } from '../examples/returnLiteralCall';
import { multiReturnCall } from '../examples/multiReturnCall';
import { declareCall } from '../examples/declareCall';
import { genOptions } from '../examples/optionsCall';

var selfPeerId;
var peer2;

describe('Testing examples', () => {
    beforeAll(async () => {
        await Fluence.start({ connectTo: krasnodar[0] });
        selfPeerId = Fluence.getStatus().peerId;

        peer2 = new FluencePeer();
        await peer2.start({ connectTo: krasnodar[1] });

        // this could be called from `println.aqua`
        registerPrintln({
            print: (arg0) => {
                console.log('println:   ' + arg0);
            },
        });
    });

    afterAll(async () => {
        if (peer2) {
            Fluence.stop();
            await peer2.stop();
        }
    });

    it('callArrow.aqua', async () => {
        let callArrowResult = await callArrowCall();

        expect(callArrowResult).toBe('Hello, callArrow call!');
    });

    it('fold.aqua', async () => {
        let foldCallResult = await foldCall();
        expect(foldCallResult).toBe(['/ip4/164.90.171.139/tcp/7770', '/ip4/164.90.171.139/tcp/9990/ws']);
    });

    it('if.aqua', async () => {
        await ifCall();
    });

    it(' par.aqua', async () => {
        let parCallResult = await parCall();
        expect(parCallResult).toBe('hello');
    });

    it('helloWorld.aqua', async () => {
        let helloWorldResult = await helloWorldCall();
        expect(helloWorldResult).toBe('Hello, NAME!');
    });

    it('func.aqua', async () => {
        let funcCallResult = await funcCall();
        expect(funcCallResult).toBe('some str');
    });

    it('on.aqua', async () => {
        let onCallResult = await onCall();
        expect(onCallResult).toBe(['/ip4/164.90.171.139/tcp/7770', '/ip4/164.90.171.139/tcp/9990/ws']);
    });

    it('dataAlias.aqua', async () => {
        let dataAliasResult = await dataAliasCall();
        expect(dataAliasResult).toBe('peer id str');
    });

    it('complex.aqua', async () => {
        let complexCallResult = await complexCall();
        expect(complexCallResult).toBe(['some str', '3', '1', '4', '1', '1', '3', '2', '4', '2', '2', selfPeerId]);
    });

    it('constants.aqua', async () => {
        let constantCallResult = await constantsCall();
        expect(constantCallResult).toBe(['1', 'ab']);
    });

    it('stream.aqua', async () => {
        let streamResult = await streamCall();
        expect(streamResult).toBe(['first updated', 'second updated', 'third updated', 'fourth updated']);
        let returnNilResult = await returnNilCall();
        expect(returnNilResult).toBe([]);
        let returnNoneResult = await returnNoneCall();
        expect(returnNoneResult).toBe(null);
    });

    it('topology.aqua', async () => {
        let topologyResult = await topologyCall(peer2);
        expect(topologyResult).toBe('finish');
    });

    it('foldJoin.aqua', async () => {
        let foldJoinResult = await foldJoinCall();
        expect(foldJoinResult).toHaveLength(3);
    });

    it('option.aqua', async () => {
        registerHandlers();
        let optionResult = await useOptionalCall();
        let optionalResult = await returnOptionalCall();
        let noneResult = await returnNull();
        expect(optionResult).toBe('hello');
        expect(optionalResult).toBe('optional');
        expect(noneResult).toBe(null);
    });

    it('via.aqua', async () => {
        let viaResult = await viaCall();
        expect(viaResult).toBe('not_correct');
    });

    it('nestedFuncs.aqua', async () => {
        let nestedFuncsResult = await nestedFuncsCall();
        expect(nestedFuncsResult).toBe('some-str');
    });

    it('assignment.aqua', async () => {
        let assignmentResult = await assignmentCall();
        expect(assignmentResult).toBe(['abc', 'hello']);
    });

    it('tryOtherwise.aqua', async () => {
        let tryOtherwiseResult = await tryOtherwiseCall();
        expect(tryOtherwiseResult).toBe('error');
    });

    it('tryCatch.aqua', async () => {
        let tryCatchResult = await tryCatchCall();
        expect(tryCatchResult).toBe(["Error: Service with id 'unex' not found", '/ip4/164.90.171.139/tcp/7770']);
    });

    it('coCall.aqua', async () => {
        let coCallResult = await coCall();
        expect(coCallResult).toBe(['/ip4/164.90.171.139/tcp/7770', '/ip4/164.90.171.139/tcp/9990/ws']);
    });

    it('passArgsCall.aqua', async () => {
        let passArgsResult = await passArgsCall();
        expect(passArgsResult).toBe('client-utilsid');
    });

    it('streamArgs.aqua', async () => {
        let streamArgsResult = await streamArgsCall();
        expect(streamArgsResult).toBe([['peer_id', 'peer_id']]);
    });

    it('streamResults.aqua', async () => {
        let streamResultsResult = await streamResultsCall();
        expect(streamResultsResult).toBe(['new_name', 'new_name', 'new_name']);
    });

    it('pushToStream.aqua', async () => {
        let pushToStreamResult = await pushToStreamCall();
        expect(pushToStreamResult).toBe(['hello', 'get_string']);
    });

    it('literalCall.aqua', async () => {
        let literalCallResult = await literalCall();
        expect(literalCallResult).toBe('some literal');
    });

    it('multiReturn.aqua', async () => {
        let multiReturnResult = await multiReturnCall();
        expect(multiReturnResult).toBe([['some-str', 'random-str', 'some-str'], 5, 'some-str', [1, 2], null, 10]);
    });

    it('declare.aqua', async () => {
        let declareResult = await declareCall();
        expect(declareResult).toBe('small_foodeclare all barsmall_fooexport_constdeclare_constdeclare_const2');
    });

    it('option_gen.aqua', async () => {
        let optionGenResult = await genOptions();
        expect(optionGenResult).toBe(['none', 'some']);
    });
});
