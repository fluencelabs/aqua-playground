/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.7.3-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v3';


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
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "get_str" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "nil"
                },
                "codomain" : {
                    "tag" : "unlabeledProduct",
                    "items" : [
                        {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    ]
                }
            }
        }
    }
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
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                
            }
        },
        "codomain" : {
            "tag" : "unlabeledProduct",
            "items" : [
                {
                    "tag" : "array",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "string"
                    }
                }
            ]
        }
    },
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
