/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.5.2-257
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
    "returnType" : {
        "tag" : "void"
    },
    "argDefs" : [
        {
            "name" : "node",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "str",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "c",
            "argType" : {
                "tag" : "callback",
                "callback" : {
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
