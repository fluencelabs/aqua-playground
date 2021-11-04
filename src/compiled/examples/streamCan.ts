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

// Functions
 

export function toOpt(s: string, config?: {ttl?: number}): Promise<string | null>;
export function toOpt(peer: FluencePeer, s: string, config?: {ttl?: number}): Promise<string | null>;
export function toOpt(...args: any) {

    let script = `
                        (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (call %init_peer_id% ("getDataSrv" "s") [] s)
                       )
                       (ap s $str)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [$str])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "toOpt",
    "returnType" : {
        "tag" : "optional"
    },
    "argDefs" : [
        {
            "name" : "s",
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

 

export function accumRes(config?: {ttl?: number}): Promise<string | null[]>;
export function accumRes(peer: FluencePeer, config?: {ttl?: number}): Promise<string | null[]>;
export function accumRes(...args: any) {

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
                              (ap "a" $str)
                             )
                             (call %init_peer_id% ("op" "identity") [$str] push-to-stream-10)
                            )
                            (ap push-to-stream-10 $res_accum)
                           )
                           (ap "b" $str0)
                          )
                          (call %init_peer_id% ("op" "identity") [$str0] push-to-stream-20)
                         )
                         (ap push-to-stream-20 $res_accum)
                        )
                        (call %init_peer_id% ("op" "identity") [[]] push-to-stream-12)
                       )
                       (ap push-to-stream-12 $res_accum)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [$res_accum])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "accumRes",
    "returnType" : {
        "tag" : "primitive"
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