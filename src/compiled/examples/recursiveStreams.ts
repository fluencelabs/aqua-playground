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

export interface YesNoServiceDef {
    get: (callParams: CallParams<null>) => string | Promise<string>;
}
export function registerYesNoService(service: YesNoServiceDef): void;
export function registerYesNoService(serviceId: string, service: YesNoServiceDef): void;
export function registerYesNoService(peer: FluencePeer, service: YesNoServiceDef): void;
export function registerYesNoService(peer: FluencePeer, serviceId: string, service: YesNoServiceDef): void;
       

export function registerYesNoService(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "yesno",
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "get" : {
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
 
export type RecursiveStreamResult = [string[], string[]]
export function recursiveStream(
    config?: {ttl?: number}
): Promise<RecursiveStreamResult>;

export function recursiveStream(
    peer: FluencePeer,
    config?: {ttl?: number}
): Promise<RecursiveStreamResult>;

export function recursiveStream(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (new $loop
                        (seq
                         (new $result
                          (seq
                           (seq
                            (ap "yes" $loop)
                            (fold $loop l-0
                             (seq
                              (seq
                               (xor
                                (match l-0 "yes"
                                 (xor
                                  (call %init_peer_id% ("yesno" "get") [] $loop)
                                  (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                                 )
                                )
                                (null)
                               )
                               (ap "success" $result)
                              )
                              (next l-0)
                             )
                            )
                           )
                           (call %init_peer_id% ("op" "identity") [$result] $result-fix-0)
                          )
                         )
                         (call %init_peer_id% ("op" "identity") [$loop] $loop-fix-1)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [$result-fix-0 $loop-fix-1])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "recursiveStream",
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
                },
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
