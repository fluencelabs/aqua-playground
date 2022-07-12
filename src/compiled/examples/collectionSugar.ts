/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.7.4-327
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v3';


// Services

export interface GetArrDef {
    getArr: (callParams: CallParams<null>) => string[] | Promise<string[]>;
}
export function registerGetArr(service: GetArrDef): void;
export function registerGetArr(serviceId: string, service: GetArrDef): void;
export function registerGetArr(peer: FluencePeer, service: GetArrDef): void;
export function registerGetArr(peer: FluencePeer, serviceId: string, service: GetArrDef): void;
       

export function registerGetArr(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "getArr",
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "getArr" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "nil"
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
            }
        }
    }
}
    );
}
      


export interface OpODef {
    identity: (arg0: string, callParams: CallParams<'arg0'>) => string | Promise<string>;
}
export function registerOpO(service: OpODef): void;
export function registerOpO(serviceId: string, service: OpODef): void;
export function registerOpO(peer: FluencePeer, service: OpODef): void;
export function registerOpO(peer: FluencePeer, serviceId: string, service: OpODef): void;
       

export function registerOpO(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "op",
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "identity" : {
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
      
// Functions
 
export type StreamSugarResult = [number[], number[]]
export function streamSugar(
    n: number,
    m: number,
    config?: {ttl?: number}
): Promise<StreamSugarResult>;

export function streamSugar(
    peer: FluencePeer,
    n: number,
    m: number,
    config?: {ttl?: number}
): Promise<StreamSugarResult>;

export function streamSugar(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                         (call %init_peer_id% ("getDataSrv" "n") [] n)
                        )
                        (call %init_peer_id% ("getDataSrv" "m") [] m)
                       )
                       (new $str
                        (seq
                         (new $arr
                          (seq
                           (seq
                            (seq
                             (seq
                              (seq
                               (seq
                                (seq
                                 (ap 1 $stream-inline)
                                 (ap 2 $stream-inline)
                                )
                                (ap n $stream-inline)
                               )
                               (ap 4 $stream-inline-0)
                              )
                              (ap 5 $stream-inline-0)
                             )
                             (ap m $stream-inline-0)
                            )
                            (fold $stream-inline-0 i-0
                             (seq
                              (ap i-0 $str)
                              (next i-0)
                             )
                            )
                           )
                           (call %init_peer_id% ("op" "identity") [$stream-inline] arr-fix)
                          )
                         )
                         (call %init_peer_id% ("op" "identity") [$str] str-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [$stream-inline str-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "streamSugar",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "n" : {
                    "tag" : "scalar",
                    "name" : "u32"
                },
                "m" : {
                    "tag" : "scalar",
                    "name" : "u32"
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
                        "name" : "u32"
                    }
                },
                {
                    "tag" : "array",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "u32"
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

 
export type OptionSugarResult = [number[], string[], string[]]
export function optionSugar(
    numSome: number | null,
    strSome: string | null,
    numNone: number | null,
    strNone: string | null,
    config?: {ttl?: number}
): Promise<OptionSugarResult>;

export function optionSugar(
    peer: FluencePeer,
    numSome: number | null,
    strSome: string | null,
    numNone: number | null,
    strNone: string | null,
    config?: {ttl?: number}
): Promise<OptionSugarResult>;

export function optionSugar(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                           (call %init_peer_id% ("getDataSrv" "numSome") [] numSome)
                          )
                          (call %init_peer_id% ("getDataSrv" "strSome") [] strSome)
                         )
                         (call %init_peer_id% ("getDataSrv" "numNone") [] numNone)
                        )
                        (call %init_peer_id% ("getDataSrv" "strNone") [] strNone)
                       )
                       (new $str
                        (seq
                         (seq
                          (seq
                           (seq
                            (seq
                             (seq
                              (new $option-inline
                               (seq
                                (xor
                                 (xor
                                  (ap numNone.$.[0]! $option-inline)
                                  (ap numSome.$.[0]! $option-inline)
                                 )
                                 (null)
                                )
                                (call %init_peer_id% ("op" "identity") [$option-inline] option-inline-0)
                               )
                              )
                              (new $option-inline-1
                               (seq
                                (xor
                                 (xor
                                  (xor
                                   (xor
                                    (xor
                                     (ap strNone.$.[0]! $option-inline-1)
                                     (ap strNone.$.[0]! $option-inline-1)
                                    )
                                    (ap strNone.$.[0]! $option-inline-1)
                                   )
                                   (ap strNone.$.[0]! $option-inline-1)
                                  )
                                  (ap strNone.$.[0]! $option-inline-1)
                                 )
                                 (null)
                                )
                                (call %init_peer_id% ("op" "identity") [$option-inline-1] option-inline-1-0)
                               )
                              )
                             )
                             (new $option-inline-2
                              (seq
                               (xor
                                (xor
                                 (xor
                                  (ap strSome.$.[0]! $option-inline-2)
                                  (ap strNone.$.[0]! $option-inline-2)
                                 )
                                 (ap "random string" $option-inline-2)
                                )
                                (null)
                               )
                               (call %init_peer_id% ("op" "identity") [$option-inline-2] option-inline-2-0)
                              )
                             )
                            )
                            (fold option-inline-2-0 i-0
                             (seq
                              (ap i-0 $str)
                              (next i-0)
                             )
                            )
                           )
                           (new $option-inline-3
                            (seq
                             (xor
                              (xor
                               (ap strNone.$.[0]! $option-inline-3)
                               (ap strNone.$.[0]! $option-inline-3)
                              )
                              (null)
                             )
                             (call %init_peer_id% ("op" "identity") [$option-inline-3] option-inline-3-0)
                            )
                           )
                          )
                          (fold option-inline-3-0 i-1
                           (seq
                            (ap i-1 $str)
                            (next i-1)
                           )
                          )
                         )
                         (call %init_peer_id% ("op" "identity") [$str] str-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [option-inline-0 str-fix option-inline-1-0])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "optionSugar",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "numSome" : {
                    "tag" : "option",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "u32"
                    }
                },
                "strSome" : {
                    "tag" : "option",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "string"
                    }
                },
                "numNone" : {
                    "tag" : "option",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "u32"
                    }
                },
                "strNone" : {
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
                        "name" : "u32"
                    }
                },
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

 
export type EmptySugarResult = [number[], string[], string[], string[], number | null, number[], string | null]
export function emptySugar(
    config?: {ttl?: number}
): Promise<EmptySugarResult>;

export function emptySugar(
    peer: FluencePeer,
    config?: {ttl?: number}
): Promise<EmptySugarResult>;

export function emptySugar(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (new $strStream
                        (seq
                         (new $strArr
                          (seq
                           (new $numOp
                            (call %init_peer_id% ("op" "identity") [[]] numOp-fix)
                           )
                           (call %init_peer_id% ("op" "identity") [[]] strArr-fix)
                          )
                         )
                         (call %init_peer_id% ("op" "identity") [[]] strStream-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [[] [] [] $strEmptyStream [] [] []])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "emptySugar",
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
                        "name" : "u32"
                    }
                },
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
                },
                {
                    "tag" : "array",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "string"
                    }
                },
                {
                    "tag" : "option",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "u32"
                    }
                },
                {
                    "tag" : "array",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "u32"
                    }
                },
                {
                    "tag" : "option",
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

 

export function getNeighbours(
    config?: {ttl?: number}
): Promise<string[]>;

export function getNeighbours(
    peer: FluencePeer,
    config?: {ttl?: number}
): Promise<string[]>;

export function getNeighbours(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (call %init_peer_id% ("kad" "neighborhood") ["123" [] []] nodes)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [nodes])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "getNeighbours",
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

 

export function bugLNG59(
    config?: {ttl?: number}
): Promise<string>;

export function bugLNG59(
    peer: FluencePeer,
    config?: {ttl?: number}
): Promise<string>;

export function bugLNG59(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (xor
                        (seq
                         (call -relay- ("getArr" "getArr") [] nodes)
                         (xor
                          (seq
                           (call nodes.$.[1]! ("op" "identity") ["some str"] res)
                           (call -relay- ("op" "noop") [])
                          )
                          (seq
                           (call -relay- ("op" "noop") [])
                           (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                          )
                         )
                        )
                        (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "bugLNG59",
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

 
export type ArraySugarResult = [number[], number[]]
export function arraySugar(
    n: number,
    m: number,
    config?: {ttl?: number}
): Promise<ArraySugarResult>;

export function arraySugar(
    peer: FluencePeer,
    n: number,
    m: number,
    config?: {ttl?: number}
): Promise<ArraySugarResult>;

export function arraySugar(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                         (call %init_peer_id% ("getDataSrv" "n") [] n)
                        )
                        (call %init_peer_id% ("getDataSrv" "m") [] m)
                       )
                       (new $str
                        (seq
                         (seq
                          (seq
                           (new $array-inline
                            (seq
                             (seq
                              (seq
                               (ap 1 $array-inline)
                               (ap 2 $array-inline)
                              )
                              (ap n $array-inline)
                             )
                             (call %init_peer_id% ("op" "identity") [$array-inline] array-inline-0)
                            )
                           )
                           (new $array-inline-1
                            (seq
                             (seq
                              (seq
                               (ap 4 $array-inline-1)
                               (ap 5 $array-inline-1)
                              )
                              (ap m $array-inline-1)
                             )
                             (call %init_peer_id% ("op" "identity") [$array-inline-1] array-inline-1-0)
                            )
                           )
                          )
                          (fold array-inline-1-0 i-0
                           (seq
                            (ap i-0 $str)
                            (next i-0)
                           )
                          )
                         )
                         (call %init_peer_id% ("op" "identity") [$str] str-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [array-inline-0 str-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "arraySugar",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "n" : {
                    "tag" : "scalar",
                    "name" : "u32"
                },
                "m" : {
                    "tag" : "scalar",
                    "name" : "u32"
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
                        "name" : "u32"
                    }
                },
                {
                    "tag" : "array",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "u32"
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
