/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.4.0-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


// Services

export interface Op2Def {
    identity: (s: number, callParams: CallParams<'s'>) => void | Promise<void>;
}
export function registerOp2(service: Op2Def): void;
export function registerOp2(serviceId: string, service: Op2Def): void;
export function registerOp2(peer: FluencePeer, service: Op2Def): void;
export function registerOp2(peer: FluencePeer, serviceId: string, service: Op2Def): void;
       

export function registerOp2(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "op",
    "functions" : [
        {
            "functionName" : "identity",
            "argDefs" : [
                {
                    "name" : "s",
                    "argType" : {
                        "tag" : "primitive"
                    }
                }
            ],
            "returnType" : {
                "tag" : "void"
            }
        }
    ]
}
    );
}
      
// Functions
 

export function getTwoResults(relay: string, config?: {ttl?: number}): Promise<number[]>;
export function getTwoResults(peer: FluencePeer, relay: string, config?: {ttl?: number}): Promise<number[]>;
export function getTwoResults(...args: any) {

    let script = `
                        (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                          (call %init_peer_id% ("getDataSrv" "relay") [] relay)
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (xor
                         (seq
                          (seq
                           (seq
                            (seq
                             (seq
                              (call relay ("op" "string_to_b58") [%init_peer_id%] k)
                              (call relay ("kad" "neighborhood") [k [] []] nodes)
                             )
                             (par
                              (seq
                               (fold nodes n
                                (par
                                 (seq
                                  (xor
                                   (call n ("peer" "timestamp_sec") [] $res)
                                   (null)
                                  )
                                  (call relay ("op" "noop") [])
                                 )
                                 (next n)
                                )
                               )
                               (call relay ("op" "noop") [])
                              )
                              (null)
                             )
                            )
                            (call relay ("op" "identity") [$res.$.[0]!])
                           )
                           (call relay ("op" "identity") [$res.$.[1]!])
                          )
                          (call relay ("op" "identity") [$res.$.[2]!])
                         )
                         (seq
                          (call -relay- ("op" "noop") [])
                          (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                         )
                        )
                       )
                       (call -relay- ("op" "noop") [])
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [$res])
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
            "name" : "relay",
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
