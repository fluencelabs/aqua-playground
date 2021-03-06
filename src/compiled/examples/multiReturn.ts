/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.7.4-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v3';


// Services

export interface GetStrDef {
    retStr: (arg0: string, callParams: CallParams<'arg0'>) => string | Promise<string>;
}
export function registerGetStr(service: GetStrDef): void;
export function registerGetStr(serviceId: string, service: GetStrDef): void;
export function registerGetStr(peer: FluencePeer, service: GetStrDef): void;
export function registerGetStr(peer: FluencePeer, serviceId: string, service: GetStrDef): void;
       

export function registerGetStr(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "multiret-test",
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "retStr" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "unlabeledProduct",
                    "items" : [
                        {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    ]
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
      


export interface GetNumDef {
    retNum: (callParams: CallParams<null>) => number | Promise<number>;
}
export function registerGetNum(service: GetNumDef): void;
export function registerGetNum(serviceId: string, service: GetNumDef): void;
export function registerGetNum(peer: FluencePeer, service: GetNumDef): void;
export function registerGetNum(peer: FluencePeer, serviceId: string, service: GetNumDef): void;
       

export function registerGetNum(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "multiret-num",
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "retNum" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "nil"
                },
                "codomain" : {
                    "tag" : "unlabeledProduct",
                    "items" : [
                        {
                            "tag" : "scalar",
                            "name" : "u8"
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
 
export type MultiReturnFuncResult = [string[], number, string, number[], string | null, number]
export function multiReturnFunc(
    somethingToReturn: number[],
    smthOption: string | null,
    config?: {ttl?: number}
): Promise<MultiReturnFuncResult>;

export function multiReturnFunc(
    peer: FluencePeer,
    somethingToReturn: number[],
    smthOption: string | null,
    config?: {ttl?: number}
): Promise<MultiReturnFuncResult>;

export function multiReturnFunc(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                         (call %init_peer_id% ("getDataSrv" "somethingToReturn") [] somethingToReturn)
                        )
                        (call %init_peer_id% ("getDataSrv" "smthOption") [] smthOption)
                       )
                       (new $res
                        (seq
                         (seq
                          (seq
                           (seq
                            (seq
                             (call %init_peer_id% ("multiret-test" "retStr") ["some-str"] $res)
                             (call %init_peer_id% ("multiret-test" "retStr") ["random-str"] $res)
                            )
                            (call %init_peer_id% ("multiret-test" "retStr") ["some-str"] str)
                           )
                           (call %init_peer_id% ("multiret-num" "retNum") [] n)
                          )
                          (ap str $res)
                         )
                         (call %init_peer_id% ("op" "identity") [$res] res-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res-fix 5 "some-str" somethingToReturn smthOption n])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "multiReturnFunc",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "somethingToReturn" : {
                    "tag" : "array",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "u8"
                    }
                },
                "smthOption" : {
                    "tag" : "option",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "string"
                    }
                }
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
                    "tag" : "scalar",
                    "name" : "u8"
                },
                {
                    "tag" : "scalar",
                    "name" : "string"
                },
                {
                    "tag" : "array",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "u8"
                    }
                },
                {
                    "tag" : "option",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "string"
                    }
                },
                {
                    "tag" : "scalar",
                    "name" : "u8"
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

 
export type TupleFuncResult = [string, number]
export function tupleFunc(
    config?: {ttl?: number}
): Promise<TupleFuncResult>;

export function tupleFunc(
    peer: FluencePeer,
    config?: {ttl?: number}
): Promise<TupleFuncResult>;

export function tupleFunc(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (call %init_peer_id% ("multiret-test" "retStr") ["some-str"] str)
                       )
                       (call %init_peer_id% ("multiret-num" "retNum") [] n)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [str n])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "tupleFunc",
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
                },
                {
                    "tag" : "scalar",
                    "name" : "u8"
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
