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

export interface StringServiceDef {
    concat: (a: string, b: string, callParams: CallParams<'a' | 'b'>) => string | Promise<string>;
}
export function registerStringService(service: StringServiceDef): void;
export function registerStringService(serviceId: string, service: StringServiceDef): void;
export function registerStringService(peer: FluencePeer, service: StringServiceDef): void;
export function registerStringService(peer: FluencePeer, serviceId: string, service: StringServiceDef): void;
       

export function registerStringService(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "string_service",
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "concat" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "labeledProduct",
                    "fields" : {
                        "a" : {
                            "tag" : "scalar",
                            "name" : "string"
                        },
                        "b" : {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    }
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
 

export function concat_foobars(
    config?: {ttl?: number}
): Promise<string>;

export function concat_foobars(
    peer: FluencePeer,
    config?: {ttl?: number}
): Promise<string>;

export function concat_foobars(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (seq
                            (seq
                             (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                             (call %init_peer_id% ("super_foo" "small_foo") [] res1)
                            )
                            (call %init_peer_id% ("string_service" "concat") [res1 "declare all bar"] res3)
                           )
                           (call %init_peer_id% ("super_foo" "small_foo") [] res4)
                          )
                          (call %init_peer_id% ("string_service" "concat") [res3 res4] res5)
                         )
                         (call %init_peer_id% ("string_service" "concat") [res5 "export_const"] res6)
                        )
                        (call %init_peer_id% ("string_service" "concat") [res6 "declare_const"] res7)
                       )
                       (call %init_peer_id% ("string_service" "concat") [res7 "declare_const2"] res8)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res8])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "concat_foobars",
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
                    "tag" : "scalar",
                    "name" : "string"
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
