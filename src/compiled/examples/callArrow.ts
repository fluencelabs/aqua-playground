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

// Functions
 

export function passFunctionAsArg(
    node: string,
    str: string,
    c: (arg0: string, callParams: CallParams<'arg0'>) => string | Promise<string>,
    config?: {ttl?: number}
): Promise<void>;

export function passFunctionAsArg(
    peer: FluencePeer,
    node: string,
    str: string,
    c: (arg0: string, callParams: CallParams<'arg0'>) => string | Promise<string>,
    config?: {ttl?: number}
): Promise<void>;

export function passFunctionAsArg(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                          (call %init_peer_id% ("getDataSrv" "node") [] node)
                         )
                         (call %init_peer_id% ("getDataSrv" "str") [] str)
                        )
                        (call -relay- ("op" "noop") [])
                       )
                       (xor
                        (seq
                         (seq
                          (seq
                           (seq
                            (call node ("peer" "identify") [])
                            (call -relay- ("op" "noop") [])
                           )
                           (xor
                            (seq
                             (call %init_peer_id% ("callbackSrv" "c") [str] init_call_res0)
                             (call -relay- ("op" "noop") [])
                            )
                            (seq
                             (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                             (call -relay- ("op" "noop") [])
                            )
                           )
                          )
                          (call node ("peer" "identify") [])
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (seq
                         (call -relay- ("op" "noop") [])
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                        )
                       )
                      )
                      (call %init_peer_id% ("println-service-id" "print") [init_call_res0])
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "passFunctionAsArg",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "node" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "str" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "c" : {
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
        },
        "codomain" : {
            "tag" : "nil"
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

 

export function reproArgsBug426(
    log: (arg0: string, callParams: CallParams<'arg0'>) => void | Promise<void>,
    arg: string,
    config?: {ttl?: number}
): Promise<void>;

export function reproArgsBug426(
    peer: FluencePeer,
    log: (arg0: string, callParams: CallParams<'arg0'>) => void | Promise<void>,
    arg: string,
    config?: {ttl?: number}
): Promise<void>;

export function reproArgsBug426(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (call %init_peer_id% ("getDataSrv" "arg") [] arg)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "log") [arg])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "reproArgsBug426",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "log" : {
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
                        "tag" : "nil"
                    }
                },
                "arg" : {
                    "tag" : "scalar",
                    "name" : "string"
                }
            }
        },
        "codomain" : {
            "tag" : "nil"
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
