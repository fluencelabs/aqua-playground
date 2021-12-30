/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.5.2-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


// Services

export interface TestSrvDef {
    str: (callParams: CallParams<null>) => string | Promise<string>;
}
export function registerTestSrv(service: TestSrvDef): void;
export function registerTestSrv(serviceId: string, service: TestSrvDef): void;
export function registerTestSrv(peer: FluencePeer, service: TestSrvDef): void;
export function registerTestSrv(peer: FluencePeer, serviceId: string, service: TestSrvDef): void;
       

export function registerTestSrv(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "test-service-id",
    "functions" : [
        {
            "functionName" : "str",
            "argDefs" : [
            ],
            "returnType" : {
                "tag" : "primitive"
            }
        }
    ]
}
    );
}
      
// Functions
 

export function testFunc(
    config?: {ttl?: number}
): Promise<string>;

export function testFunc(
    peer: FluencePeer,
    config?: {ttl?: number}
): Promise<string>;

export function testFunc(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (call %init_peer_id% ("test-service-id" "str") [] res)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "testFunc",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
    ],
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}
