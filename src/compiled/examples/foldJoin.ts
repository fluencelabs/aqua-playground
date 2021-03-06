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
                                 (fold nodes n-0
                                  (par
                                   (seq
                                    (xor
                                     (xor
                                      (call n-0 ("peer" "timestamp_sec") [] $res)
                                      (null)
                                     )
                                     (seq
                                      (call -relay- ("op" "noop") [])
                                      (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                                     )
                                    )
                                    (call node ("op" "noop") [])
                                   )
                                   (next n-0)
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
                            (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                           )
                          )
                         )
                         (call %init_peer_id% ("op" "identity") [$res] res-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "getTwoResults",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "node" : {
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
                        "name" : "u64"
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
