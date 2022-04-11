import {Fluence, FluencePeer, setLogLevel} from '@fluencelabs/fluence';
import { registerPrintln } from '../compiled/examples/println';
import {callArrowCall, reproArgsBug426Call} from '../examples/callArrowCall';
import { dataAliasCall } from '../examples/dataAliasCall';
import { onCall } from '../examples/onCall';
import { funcCall } from '../examples/funcCall';
import { helloWorldCall } from '../examples/helloWorldCall';
import { foldCall } from '../examples/foldCall';
import {ifCall, ifWrapCall} from '../examples/if';
import { parCall } from '../examples/parCall';
import { complexCall } from '../examples/complex';
import { constantsCall } from '../examples/constantsCall';
import { returnNilCall, returnNoneCall, streamCall } from '../examples/streamCall';
import {topologyBug205Call, topologyBug394Call, topologyBug427Call, topologyCall} from '../examples/topologyCall';
import { foldJoinCall } from '../examples/foldJoinCall';
import { registerHandlers, returnNull, returnOptionalCall, useOptionalCall } from '../examples/useOptionalCall';
import {viaArrCall, viaOptCall, viaOptNullCall, viaStreamCall} from '../examples/viaCall';
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
import { config } from '../config';
import {closuresCall} from "../examples/closures";
import {streamCanCall} from "../examples/streamCan";
import {streamCallbackCall} from "../examples/streamCallback";
import {streamResCall} from "../examples/streamRestrictionsCall";
import {joinIdxCall, joinIdxLocalCall, joinIdxRelayCall} from "../examples/joinCall";
import {topologyBug427} from "../compiled/examples/topology";
import {recursiveStreamsCall} from "../examples/recursiveStreamsCall";
import {allEmptySugarCall, arraySugarCall, optionSugarCall, streamSugarCall} from "../examples/collectionSugarCall";
import {funcsCall} from "../examples/funcsCall";
import {nestedDataCall} from "../examples/nestedDataCall";
import {ifCalcCall, mathTest1Call, mathTest2Call} from "../examples/mathCall";

var selfPeerId: string;
var peer2: FluencePeer;


const relays = config.relays

// setLogLevel('debug');

describe('Testing examples', () => {
    beforeAll(async () => {
        await Fluence.start({ connectTo: relays[0] });
        selfPeerId = Fluence.getStatus().peerId;

        peer2 = new FluencePeer();
        await peer2.start({ connectTo: relays[1] });

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

    it('callArrow.aqua args bug 426', async () => {
        let argResult = await reproArgsBug426Call();

        expect(argResult).toBe("privet");
    });

    it('streamRestrictions.aqua', async () => {
        let streamResResult = await streamResCall();

        expect(streamResResult).toEqual([[], ["a", "b", "c"]]);
    });

    it('fold.aqua', async () => {
        let foldCallResult = await foldCall();
        expect(foldCallResult).toEqual(config.externalAddressesRelay1);
    });

    it('if.aqua', async () => {
        await ifCall();
    });

    it('if.aqua xor wrap', async () => {
        let res = await ifWrapCall(peer2.getStatus().relayPeerId);
        expect(res).toBe('1x');
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
        expect(onCallResult).toEqual(config.externalAddressesRelay1);
    });

    it('dataAlias.aqua', async () => {
        let dataAliasResult = await dataAliasCall();
        expect(dataAliasResult).toBe('peer id str');
    });

    it('complex.aqua', async () => {
        let complexCallResult = await complexCall();
        expect(complexCallResult).toEqual([
            'some str',
            '3',
            '1',
            '4',
            '1',
            '1',
            '3',
            '2',
            '4',
            '2',
            '2',
            selfPeerId,
        ]);
    });

    it('constants.aqua', async () => {
        let constantCallResult = await constantsCall();
        expect(constantCallResult).toEqual(['1', 'ab']);
    });

    it('stream.aqua', async () => {
        let streamResult = await streamCall();
        expect(streamResult).toEqual(['first updated', 'second updated', 'third updated', 'fourth updated']);
        let returnNilResult = await returnNilCall();
        expect(returnNilResult).toEqual([]);
        let returnNoneResult = await returnNoneCall();
        expect(returnNoneResult).toBe(null);
    });

    it('streamCan.aqua', async () => {
        let streamCanResult = await streamCanCall();
        expect(streamCanResult).toEqual(["a", "b", null]);
    });

    it('collectionSugar array', async () => {
        let result = await arraySugarCall();
        expect(result).toEqual([[1,2,3], [4,5,6]]);
    });

    it('collectionSugar stream', async () => {
        let result = await streamSugarCall();
        expect(result).toEqual([[1,2,3], [4,5,6]]);
    });

    it('collectionSugar option', async () => {
        let result = await optionSugarCall()
        expect(result).toEqual([[1], ["some"], []]);
    });

    it('collectionSugar empty', async () => {
        let result = await allEmptySugarCall()
        expect(result).toEqual([[], [], [], [], null, [], null]);
    });

    it('recursiveStreams.aqua', async () => {

        let [sucList, loopList] = await recursiveStreamsCall();
        console.log(sucList)
        console.log(loopList)
        expect(loopList).toEqual(["yes","yes","yes","yes","no"]);
        expect(sucList.length).toEqual(5);
    });

    it('streamCallback.aqua', async () => {
        let streamCallResult = await streamCallbackCall();
        expect(streamCallResult).toEqual([]);
    });

    it('topology.aqua', async () => {
        let topologyResult = await topologyCall(peer2);
        expect(topologyResult).toBe('finish');
    });

    it('topology.aqua bug 205', async () => {
        let topologyResult = await topologyBug205Call(peer2);
        const peerId2 = peer2.getStatus().relayPeerId
        const res: string[] = [peerId2]
        expect(topologyResult).toEqual(res);
    });

    it('topology.aqua bug 427', async () => {
        let topologyResult = await topologyBug427Call(peer2);

        expect(topologyResult).toEqual(["some string", "some string"]);
    });

    it('topology.aqua bug 394', async () => {
        let topologyResult = await topologyBug394Call(peer2);

        expect(topologyResult).toEqual(selfPeerId);
    });

    it('math.aqua test 1', async () => {
        let res = await mathTest1Call();

        expect(res).toEqual(-10);
    });

    it('math.aqua test 2', async () => {
        let res = await mathTest2Call();

        expect(res).toEqual(3);
    });

    it('math.aqua if test', async () => {
        let res = await ifCalcCall();

        expect(res).toEqual(1);
    });

    it('foldJoin.aqua', async () => {
        let foldJoinResult = await foldJoinCall();
        expect(foldJoinResult.length).toBeGreaterThanOrEqual(3)
    }, 16000);

    it('funcs.aqua', async () => {
        let result = await funcsCall();
        expect(result).toEqual([13, 6, 3]);
    }, 7000);

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
        let res1 = await viaArrCall();
        let res2 = await viaOptCall();
        let res3 = await viaOptNullCall();
        let res4 = await viaStreamCall();
        expect(res1).toEqual(res2);
        expect(res2).toEqual(res3);
        expect(res3).toEqual(res4);
    }, 16000);

    it('nestedFuncs.aqua', async () => {
        let nestedFuncsResult = await nestedFuncsCall();
        expect(nestedFuncsResult).toBe('some-str');
    });

    it('nestedData.aqua', async () => {
        let nestedDataResult = await nestedDataCall();
        expect(nestedDataResult).toEqual({
            one: {
                val: "hellohello"
            }
        });
    });

    it('closures.aqua', async () => {
        let closuresResult = await closuresCall();
        let res1 = config.externalAddressesRelay2
        let res2 = ["in", config.externalAddressesRelay2[0]]
        expect(closuresResult).toEqual(["in", res1, res1, res2]);
    });

    it('assignment.aqua', async () => {
        let assignmentResult = await assignmentCall();
        expect(assignmentResult).toEqual(['abc', 'hello']);
    });

    it('tryOtherwise.aqua', async () => {
        let tryOtherwiseResult = await tryOtherwiseCall();
        expect(tryOtherwiseResult).toBe('error');
    });

    it('tryCatch.aqua', async () => {
        let tryCatchResult = await tryCatchCall();
        expect(tryCatchResult).toHaveLength(2);
        expect(tryCatchResult[0]).toMatch(config.tryCatchError);
        expect(tryCatchResult[1]).toBe(config.externalAddressesRelay1[0]);
    });

    it('coCall.aqua', async () => {
        let coCallResult = await coCall();
        expect(coCallResult).toEqual(config.externalAddressesRelay1);
    });

    it('passArgsCall.aqua', async () => {
        let passArgsResult = await passArgsCall();
        expect(passArgsResult).toBe('client-utilsid');
    });

    it('streamArgs.aqua', async () => {
        let streamArgsResult = await streamArgsCall();
        expect(streamArgsResult).toEqual([['peer_id', 'peer_id']]);
    });

    it('streamResults.aqua', async () => {
        let streamResultsResult = await streamResultsCall();
        expect(streamResultsResult).toEqual(['new_name', 'new_name', 'new_name']);
    });

    it('pushToStream.aqua', async () => {
        let pushToStreamResult = await pushToStreamCall();
        expect(pushToStreamResult).toEqual(['hello', 'get_string']);
    });

    it('literalCall.aqua', async () => {
        let literalCallResult = await literalCall();
        expect(literalCallResult).toBe('some literal');
    });

    it('join.aqua local', async () => {
        let joinLocalCallResult = await joinIdxLocalCall();
        expect(joinLocalCallResult.length).toBeGreaterThanOrEqual(2);
    });

    it('join.aqua relay', async () => {
        let joinRelayCallResult = await joinIdxRelayCall();
        expect(joinRelayCallResult.length).toBeGreaterThanOrEqual(2);
    });

    it('join.aqua network', async () => {
        let joinCallResult = await joinIdxCall();
        expect(joinCallResult.length).toBeGreaterThanOrEqual(2);
    }, 16000);

    it('multiReturn.aqua', async () => {
        let multiReturnResult = await multiReturnCall();
        expect(multiReturnResult).toEqual([
            ['some-str', 'random-str', 'some-str'],
            5,
            'some-str',
            [1, 2],
            null,
            10,
        ]);
    });

    it('declare.aqua', async () => {
        let declareResult = await declareCall();
        expect(declareResult).toBe('small_foodeclare all barsmall_fooexport_constdeclare_constdeclare_const2');
    });

    it('option_gen.aqua', async () => {
        let optionGenResult = await genOptions();
        expect(optionGenResult).toEqual(['none', 'some']);
    });
});
