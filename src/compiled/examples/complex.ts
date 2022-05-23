/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.7.2-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v3';


// Services

export interface TestSDef {
    multiline: (a: string, b: string, c: boolean, callParams: CallParams<'a' | 'b' | 'c'>) => string | Promise<string>;
    t: (arg0: string, callParams: CallParams<'arg0'>) => string | Promise<string>;
}
export function registerTestS(service: TestSDef): void;
export function registerTestS(serviceId: string, service: TestSDef): void;
export function registerTestS(peer: FluencePeer, service: TestSDef): void;
export function registerTestS(peer: FluencePeer, serviceId: string, service: TestSDef): void;
       

export function registerTestS(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "some-id",
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "multiline" : {
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
                        },
                        "c" : {
                            "tag" : "scalar",
                            "name" : "bool"
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
            },
            "t" : {
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
 

export function doStuff(
    a: string,
    b: string,
    c: boolean,
    d: boolean,
    e: string[],
    g: string[],
    str: string,
    config?: {ttl?: number}
): Promise<string[]>;

export function doStuff(
    peer: FluencePeer,
    a: string,
    b: string,
    c: boolean,
    d: boolean,
    e: string[],
    g: string[],
    str: string,
    config?: {ttl?: number}
): Promise<string[]>;

export function doStuff(...args: any) {

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
                             (seq
                              (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                              (call %init_peer_id% ("getDataSrv" "a") [] a)
                             )
                             (call %init_peer_id% ("getDataSrv" "b") [] b)
                            )
                            (call %init_peer_id% ("getDataSrv" "c") [] c)
                           )
                           (call %init_peer_id% ("getDataSrv" "d") [] d)
                          )
                          (call %init_peer_id% ("getDataSrv" "e") [] e)
                         )
                         (call %init_peer_id% ("getDataSrv" "g") [] g)
                        )
                        (call %init_peer_id% ("getDataSrv" "str") [] str)
                       )
                       (new $stream
                        (seq
                         (seq
                          (seq
                           (par
                            (par
                             (seq
                              (seq
                               (call %init_peer_id% ("some-id" "t") [str] $stream)
                               (call -relay- ("op" "noop") [])
                              )
                              (call a ("op" "noop") [])
                             )
                             (call %init_peer_id% ("println-service-id" "print") [a])
                            )
                            (seq
                             (call -relay- ("op" "noop") [])
                             (xor
                              (call a ("peer" "identify") [])
                              (seq
                               (seq
                                (call -relay- ("op" "noop") [])
                                (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                               )
                               (call -relay- ("op" "noop") [])
                              )
                             )
                            )
                           )
                           (xor
                            (xor
                             (xor
                              (match c true
                               (xor
                                (xor
                                 (match d true
                                  (xor
                                   (seq
                                    (fold e eEl-0
                                     (seq
                                      (seq
                                       (fold g gEl-0
                                        (seq
                                         (seq
                                          (call b ("some-id" "t") [gEl-0] $stream)
                                          (call b ("some-id" "t") [eEl-0] $stream)
                                         )
                                         (next gEl-0)
                                        )
                                       )
                                       (call b ("some-id" "t") [eEl-0] $stream)
                                      )
                                      (next eEl-0)
                                     )
                                    )
                                    (call -relay- ("op" "noop") [])
                                   )
                                   (seq
                                    (call -relay- ("op" "noop") [])
                                    (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                                   )
                                  )
                                 )
                                 (null)
                                )
                                (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                               )
                              )
                              (null)
                             )
                             (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
                            )
                            (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 5])
                           )
                          )
                          (call %init_peer_id% ("some-id" "multiline") [a b c] $stream)
                         )
                         (call %init_peer_id% ("op" "identity") [$stream] stream-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [stream-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 6])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 7])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "doStuff",
    "arrow" : {
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
                },
                "c" : {
                    "tag" : "scalar",
                    "name" : "bool"
                },
                "d" : {
                    "tag" : "scalar",
                    "name" : "bool"
                },
                "e" : {
                    "tag" : "array",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "string"
                    }
                },
                "g" : {
                    "tag" : "array",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "string"
                    }
                },
                "str" : {
                    "tag" : "scalar",
                    "name" : "string"
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
