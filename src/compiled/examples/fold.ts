/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.7.1-SNAPSHOT
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
 

export function iterateAndPrint(
    strings: string[],
    config?: {ttl?: number}
): Promise<void>;

export function iterateAndPrint(
    peer: FluencePeer,
    strings: string[],
    config?: {ttl?: number}
): Promise<void>;

export function iterateAndPrint(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (call %init_peer_id% ("getDataSrv" "strings") [] strings)
                      )
                      (fold strings s
                       (seq
                        (call %init_peer_id% ("println-service-id" "print") [s])
                        (next s)
                       )
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "iterateAndPrint",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "strings" : {
                    "tag" : "array",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "string"
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

 

export function iterateAndPrintParallel(
    nodes: string[],
    c: (arg0: { air_version: string; external_addresses: string[]; node_version: string; }, callParams: CallParams<'arg0'>) => void | Promise<void>,
    config?: {ttl?: number}
): Promise<void>;

export function iterateAndPrintParallel(
    peer: FluencePeer,
    nodes: string[],
    c: (arg0: { air_version: string; external_addresses: string[]; node_version: string; }, callParams: CallParams<'arg0'>) => void | Promise<void>,
    config?: {ttl?: number}
): Promise<void>;

export function iterateAndPrintParallel(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (call %init_peer_id% ("getDataSrv" "nodes") [] nodes)
                      )
                      (par
                       (fold nodes s
                        (par
                         (seq
                          (call -relay- ("op" "noop") [])
                          (xor
                           (seq
                            (seq
                             (call s ("peer" "identify") [] ads)
                             (call -relay- ("op" "noop") [])
                            )
                            (xor
                             (seq
                              (call %init_peer_id% ("callbackSrv" "c") [ads])
                              (call -relay- ("op" "noop") [])
                             )
                             (seq
                              (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                              (call -relay- ("op" "noop") [])
                             )
                            )
                           )
                           (seq
                            (call -relay- ("op" "noop") [])
                            (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                           )
                          )
                         )
                         (next s)
                        )
                       )
                       (null)
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "iterateAndPrintParallel",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "nodes" : {
                    "tag" : "array",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "string"
                    }
                },
                "c" : {
                    "tag" : "arrow",
                    "domain" : {
                        "tag" : "unlabeledProduct",
                        "items" : [
                            {
                                "tag" : "struct",
                                "name" : "Info",
                                "fields" : {
                                    "air_version" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    },
                                    "external_addresses" : {
                                        "tag" : "array",
                                        "type" : {
                                            "tag" : "scalar",
                                            "name" : "string"
                                        }
                                    },
                                    "node_version" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    }
                                }
                            }
                        ]
                    },
                    "codomain" : {
                        "tag" : "nil"
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
