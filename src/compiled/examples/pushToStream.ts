/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.6.0-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


// Services

export interface OpADef {
    get_str: (callParams: CallParams<null>) => string | Promise<string>;
}
export function registerOpA(service: OpADef): void;
export function registerOpA(serviceId: string, service: OpADef): void;
export function registerOpA(peer: FluencePeer, service: OpADef): void;
export function registerOpA(peer: FluencePeer, serviceId: string, service: OpADef): void;
       

export function registerOpA(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "pop",
    "functions" : [
        {
            "functionName" : "get_str",
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
 

export function get_results(
    config?: {ttl?: number}
): Promise<string[]>;

export function get_results(
    peer: FluencePeer,
    config?: {ttl?: number}
): Promise<string[]>;

export function get_results(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (new $results
                        (seq
                         (seq
                          (seq
                           (ap "hello" $results)
                           (call %init_peer_id% ("pop" "get_str") [] str)
                          )
                          (ap str $results)
                         )
                         (call %init_peer_id% ("op" "identity") [$results] results-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [results-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "get_results",
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
