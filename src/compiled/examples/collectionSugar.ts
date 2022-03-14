/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.6.4-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


// Services

// Functions
 
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
                           (new $array-sugar
                            (seq
                             (seq
                              (seq
                               (ap 1 $array-sugar)
                               (ap 2 $array-sugar)
                              )
                              (ap n $array-sugar)
                             )
                             (call %init_peer_id% ("op" "identity") [$array-sugar] array-sugar-0)
                            )
                           )
                           (new $array-sugar-1
                            (seq
                             (seq
                              (seq
                               (ap 4 $array-sugar-1)
                               (ap 5 $array-sugar-1)
                              )
                              (ap m $array-sugar-1)
                             )
                             (call %init_peer_id% ("op" "identity") [$array-sugar-1] array-sugar-1-0)
                            )
                           )
                          )
                          (fold array-sugar-1-0 i
                           (seq
                            (ap i $str)
                            (next i)
                           )
                          )
                         )
                         (call %init_peer_id% ("op" "identity") [$str] str-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [array-sugar-0 str-fix])
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
    "returnType" : {
        "tag" : "multiReturn",
        "returnItems" : [
            {
                "tag" : "primitive"
            },
            {
                "tag" : "primitive"
            }
        ]
    },
    "argDefs" : [
        {
            "name" : "n",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "m",
            "argType" : {
                "tag" : "primitive"
            }
        }
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
                                 (ap 1 $stream-sugar)
                                 (ap 2 $stream-sugar)
                                )
                                (ap n $stream-sugar)
                               )
                               (ap 4 $stream-sugar-0)
                              )
                              (ap 5 $stream-sugar-0)
                             )
                             (ap m $stream-sugar-0)
                            )
                            (fold $stream-sugar-0 i
                             (seq
                              (ap i $str)
                              (next i)
                             )
                            )
                           )
                           (call %init_peer_id% ("op" "identity") [$stream-sugar] arr-fix)
                          )
                         )
                         (call %init_peer_id% ("op" "identity") [$str] str-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [arr-fix str-fix])
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
    "returnType" : {
        "tag" : "multiReturn",
        "returnItems" : [
            {
                "tag" : "primitive"
            },
            {
                "tag" : "primitive"
            }
        ]
    },
    "argDefs" : [
        {
            "name" : "n",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "m",
            "argType" : {
                "tag" : "primitive"
            }
        }
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
                              (new $option-sugar
                               (seq
                                (xor
                                 (xor
                                  (ap numNone.$.[0]! $option-sugar)
                                  (ap numSome.$.[0]! $option-sugar)
                                 )
                                 (null)
                                )
                                (call %init_peer_id% ("op" "identity") [$option-sugar] option-sugar-0)
                               )
                              )
                              (new $option-sugar-1
                               (seq
                                (xor
                                 (xor
                                  (xor
                                   (xor
                                    (xor
                                     (ap strNone.$.[0]! $option-sugar-1)
                                     (ap strNone.$.[0]! $option-sugar-1)
                                    )
                                    (ap strNone.$.[0]! $option-sugar-1)
                                   )
                                   (ap strNone.$.[0]! $option-sugar-1)
                                  )
                                  (ap strNone.$.[0]! $option-sugar-1)
                                 )
                                 (null)
                                )
                                (call %init_peer_id% ("op" "identity") [$option-sugar-1] option-sugar-1-0)
                               )
                              )
                             )
                             (new $option-sugar-2
                              (seq
                               (xor
                                (xor
                                 (xor
                                  (ap strSome.$.[0]! $option-sugar-2)
                                  (ap strNone.$.[0]! $option-sugar-2)
                                 )
                                 (ap "random string" $option-sugar-2)
                                )
                                (null)
                               )
                               (call %init_peer_id% ("op" "identity") [$option-sugar-2] option-sugar-2-0)
                              )
                             )
                            )
                            (fold option-sugar-2-0 i
                             (seq
                              (ap i $str)
                              (next i)
                             )
                            )
                           )
                           (new $option-sugar-3
                            (seq
                             (xor
                              (xor
                               (ap strNone.$.[0]! $option-sugar-3)
                               (ap strNone.$.[0]! $option-sugar-3)
                              )
                              (null)
                             )
                             (call %init_peer_id% ("op" "identity") [$option-sugar-3] option-sugar-3-0)
                            )
                           )
                          )
                          (fold option-sugar-3-0 i
                           (seq
                            (ap i $str)
                            (next i)
                           )
                          )
                         )
                         (call %init_peer_id% ("op" "identity") [$str] str-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [option-sugar-0 str-fix option-sugar-1-0])
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
    "returnType" : {
        "tag" : "multiReturn",
        "returnItems" : [
            {
                "tag" : "primitive"
            },
            {
                "tag" : "primitive"
            },
            {
                "tag" : "primitive"
            }
        ]
    },
    "argDefs" : [
        {
            "name" : "numSome",
            "argType" : {
                "tag" : "optional"
            }
        },
        {
            "name" : "strSome",
            "argType" : {
                "tag" : "optional"
            }
        },
        {
            "name" : "numNone",
            "argType" : {
                "tag" : "optional"
            }
        },
        {
            "name" : "strNone",
            "argType" : {
                "tag" : "optional"
            }
        }
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
                       (call %init_peer_id% ("callbackSrv" "response") [numOp-fix strArr-fix strStream-fix $strEmptyStream [] [] []])
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
    "returnType" : {
        "tag" : "multiReturn",
        "returnItems" : [
            {
                "tag" : "primitive"
            },
            {
                "tag" : "primitive"
            },
            {
                "tag" : "primitive"
            },
            {
                "tag" : "primitive"
            },
            {
                "tag" : "optional"
            },
            {
                "tag" : "primitive"
            },
            {
                "tag" : "optional"
            }
        ]
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
