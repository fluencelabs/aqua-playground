/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.5.3-SNAPSHOT
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
 

export function getTwoResults(
    node: string,
    config?: {ttl?: number}
): Promise<number[]>;

export function getTwoResults(
    peer: FluencePeer,
    node: string,
    config?: {ttl?: number}
): Promise<number[]>;

export function getTwoResults(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (call %init_peer_id% ("getDataSrv" "node") [] node)
                       )
                       (new $res
                        (seq
                         (seq
                          (call -relay- ("op" "noop") [])
                          (xor
                           (seq
                            (seq
                             (seq
                              (seq
                               (seq
                                (call node ("kad" "neighborhood") [%init_peer_id% [] []] nodes)
                                (par
                                 (fold nodes n
                                  (par
                                   (seq
                                    (xor
                                     (call n ("peer" "timestamp_sec") [] $res)
                                     (null)
                                    )
                                    (call node ("op" "noop") [])
                                   )
                                   (next n)
                                  )
                                 )
                                 (null)
                                )
                               )
                               (call node ("op" "identity") [$res.$.[0]!])
                              )
                              (call node ("op" "identity") [$res.$.[1]!])
                             )
                             (call node ("op" "identity") [$res.$.[2]!])
                            )
                            (call -relay- ("op" "noop") [])
                           )
                           (seq
                            (call -relay- ("op" "noop") [])
                            (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                           )
                          )
                         )
                         (call %init_peer_id% ("op" "identity") [$res] res-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "getTwoResults",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "node",
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
