/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.7.0-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v3';


// Services

export interface ConcatSubsDef {
    get_some: (s: string, sr: { one: string; two: number; }, callParams: CallParams<'s' | 'sr'>) => { one: string; two: number; } | Promise<{ one: string; two: number; }>;
}
export function registerConcatSubs(service: ConcatSubsDef): void;
export function registerConcatSubs(serviceId: string, service: ConcatSubsDef): void;
export function registerConcatSubs(peer: FluencePeer, service: ConcatSubsDef): void;
export function registerConcatSubs(peer: FluencePeer, serviceId: string, service: ConcatSubsDef): void;
       

export function registerConcatSubs(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "concat_subs",
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "get_some" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "labeledProduct",
                    "fields" : {
                        "s" : {
                            "tag" : "scalar",
                            "name" : "string"
                        },
                        "sr" : {
                            "tag" : "struct",
                            "name" : "SomeResult",
                            "fields" : {
                                "one" : {
                                    "tag" : "scalar",
                                    "name" : "string"
                                },
                                "two" : {
                                    "tag" : "scalar",
                                    "name" : "u32"
                                }
                            }
                        }
                    }
                },
                "codomain" : {
                    "tag" : "unlabeledProduct",
                    "items" : [
                        {
                            "tag" : "struct",
                            "name" : "SomeResult",
                            "fields" : {
                                "one" : {
                                    "tag" : "scalar",
                                    "name" : "string"
                                },
                                "two" : {
                                    "tag" : "scalar",
                                    "name" : "u32"
                                }
                            }
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
 
export type SubImportUsageResult = { one: string; two: number; }
export function subImportUsage(
    s: string,
    config?: {ttl?: number}
): Promise<SubImportUsageResult>;

export function subImportUsage(
    peer: FluencePeer,
    s: string,
    config?: {ttl?: number}
): Promise<SubImportUsageResult>;

export function subImportUsage(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                          (call %init_peer_id% ("getDataSrv" "s") [] s)
                         )
                         (call %init_peer_id% ("sub_service" "sub") [s] sr1)
                        )
                        (call %init_peer_id% ("sub_service" "sub") ["some thing"] res)
                       )
                       (call %init_peer_id% ("concat_subs" "get_some") [sr1.$.one! res] result)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [result])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "subImportUsage",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "s" : {
                    "tag" : "scalar",
                    "name" : "string"
                }
            }
        },
        "codomain" : {
            "tag" : "unlabeledProduct",
            "items" : [
                {
                    "tag" : "struct",
                    "name" : "SomeResult",
                    "fields" : {
                        "one" : {
                            "tag" : "scalar",
                            "name" : "string"
                        },
                        "two" : {
                            "tag" : "scalar",
                            "name" : "u32"
                        }
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
