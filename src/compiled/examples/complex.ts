/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.4.1-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


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
    "functions" : [
        {
            "functionName" : "multiline",
            "argDefs" : [
                {
                    "name" : "a",
                    "argType" : {
                        "tag" : "primitive"
                    }
                },
                {
                    "name" : "b",
                    "argType" : {
                        "tag" : "primitive"
                    }
                },
                {
                    "name" : "c",
                    "argType" : {
                        "tag" : "primitive"
                    }
                }
            ],
            "returnType" : {
                "tag" : "primitive"
            }
        },
        {
            "functionName" : "t",
            "argDefs" : [
                {
                    "name" : "arg0",
                    "argType" : {
                        "tag" : "primitive"
                    }
                }
            ],
            "returnType" : {
                "tag" : "primitive"
            }
        }
    ]
}
    );
}
      
// Functions
 

export function doStuff(a: string, b: string, c: boolean, d: boolean, e: string[], g: string[], str: string, config?: {ttl?: number}): Promise<string[]>;
export function doStuff(peer: FluencePeer, a: string, b: string, c: boolean, d: boolean, e: string[], g: string[], str: string, config?: {ttl?: number}): Promise<string[]>;
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
                           (par
                            (par
                             (seq
                              (call %init_peer_id% ("some-id" "t") [str] $stream)
                              (call b ("op" "noop") [])
                             )
                             (call %init_peer_id% ("println-service-id" "print") [a])
                            )
                            (seq
                             (call -relay- ("op" "noop") [])
                             (xor
                              (call a ("peer" "identify") [])
                              (seq
                               (call -relay- ("op" "noop") [])
                               (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                              )
                             )
                            )
                           )
                          )
                          (call -relay- ("op" "noop") [])
                         )
                         (xor
                          (seq
                           (call -relay- ("op" "noop") [])
                           (xor
                            (match c true
                             (xor
                              (match d true
                               (xor
                                (fold e eEl
                                 (seq
                                  (seq
                                   (fold g gEl
                                    (seq
                                     (seq
                                      (call b ("some-id" "t") [gEl] $stream)
                                      (call b ("some-id" "t") [eEl] $stream)
                                     )
                                     (next gEl)
                                    )
                                   )
                                   (call b ("some-id" "t") [eEl] $stream)
                                  )
                                  (next eEl)
                                 )
                                )
                                (seq
                                 (call -relay- ("op" "noop") [])
                                 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                                )
                               )
                              )
                              (null)
                             )
                            )
                            (null)
                           )
                          )
                          (seq
                           (call -relay- ("op" "noop") [])
                           (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                          )
                         )
                        )
                        (call -relay- ("op" "noop") [])
                       )
                       (call %init_peer_id% ("some-id" "multiline") [a b c] $stream)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [$stream])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 5])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "doStuff",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "a",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "b",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "c",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "d",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "e",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "g",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "str",
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
