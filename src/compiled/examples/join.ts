/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.6.1-279
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
 

export function joinIdxLocal(
    idx: number,
    nodes: string[],
    config?: {ttl?: number}
): Promise<string[]>;

export function joinIdxLocal(
    peer: FluencePeer,
    idx: number,
    nodes: string[],
    config?: {ttl?: number}
): Promise<string[]>;

export function joinIdxLocal(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                         (call %init_peer_id% ("getDataSrv" "idx") [] idx)
                        )
                        (call %init_peer_id% ("getDataSrv" "nodes") [] nodes)
                       )
                       (new $nodes2
                        (seq
                         (seq
                          (par
                           (fold nodes node
                            (par
                             (ap node $nodes2)
                             (next node)
                            )
                           )
                           (null)
                          )
                          (call %init_peer_id% ("op" "noop") [$nodes2.$.[idx]! nodes])
                         )
                         (call %init_peer_id% ("op" "identity") [$nodes2] nodes2-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [nodes2-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "joinIdxLocal",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "idx",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "nodes",
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

 

export function joinIdxRelay(
    idx: number,
    nodes: string[],
    config?: {ttl?: number}
): Promise<string[]>;

export function joinIdxRelay(
    peer: FluencePeer,
    idx: number,
    nodes: string[],
    config?: {ttl?: number}
): Promise<string[]>;

export function joinIdxRelay(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                         (call %init_peer_id% ("getDataSrv" "idx") [] idx)
                        )
                        (call %init_peer_id% ("getDataSrv" "nodes") [] nodes)
                       )
                       (new $nodes2
                        (seq
                         (xor
                          (seq
                           (par
                            (fold nodes node
                             (par
                              (ap node $nodes2)
                              (next node)
                             )
                            )
                            (null)
                           )
                           (call -relay- ("op" "noop") [$nodes2.$.[idx]! nodes])
                          )
                          (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                         )
                         (call %init_peer_id% ("op" "identity") [$nodes2] nodes2-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [nodes2-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "joinIdxRelay",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "idx",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "nodes",
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

 

export function joinIdx(
    idx: number,
    nodes: string[],
    config?: {ttl?: number}
): Promise<{ air_version: string; external_addresses: string[]; node_version: string; }[]>;

export function joinIdx(
    peer: FluencePeer,
    idx: number,
    nodes: string[],
    config?: {ttl?: number}
): Promise<{ air_version: string; external_addresses: string[]; node_version: string; }[]>;

export function joinIdx(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                         (call %init_peer_id% ("getDataSrv" "idx") [] idx)
                        )
                        (call %init_peer_id% ("getDataSrv" "nodes") [] nodes)
                       )
                       (new $nodes2
                        (new $infos
                         (seq
                          (seq
                           (par
                            (fold nodes node
                             (par
                              (seq
                               (seq
                                (seq
                                 (call -relay- ("op" "noop") [])
                                 (xor
                                  (seq
                                   (call node ("peer" "identify") [] $infos)
                                   (ap node $nodes2)
                                  )
                                  (seq
                                   (call -relay- ("op" "noop") [])
                                   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                                  )
                                 )
                                )
                                (call -relay- ("op" "noop") [])
                               )
                               (call %init_peer_id% ("op" "noop") [])
                              )
                              (next node)
                             )
                            )
                            (null)
                           )
                           (call %init_peer_id% ("op" "noop") [$infos.$.[idx]! $nodes2.$.[idx]!])
                          )
                          (call %init_peer_id% ("op" "identity") [$infos] infos-fix)
                         )
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [infos-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "joinIdx",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "idx",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "nodes",
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
