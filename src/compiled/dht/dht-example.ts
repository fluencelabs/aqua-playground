/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.5.0-SNAPSHOT
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
 

export function put_value(
    initial_peer: string,
    value: string,
    config?: {ttl?: number}
): Promise<string>;

export function put_value(
    peer: FluencePeer,
    initial_peer: string,
    value: string,
    config?: {ttl?: number}
): Promise<string>;

export function put_value(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                         (call %init_peer_id% ("getDataSrv" "initial_peer") [] initial_peer)
                        )
                        (call %init_peer_id% ("getDataSrv" "value") [] value)
                       )
                       (xor
                        (par
                         (seq
                          (seq
                           (call -relay- ("op" "string_to_b58") [initial_peer] k)
                           (call -relay- ("kad" "neighborhood") [k [] []] nodes)
                          )
                          (call %init_peer_id% ("op" "noop") [])
                         )
                         (fold nodes n
                          (par
                           (seq
                            (call -relay- ("op" "noop") [])
                            (xor
                             (seq
                              (seq
                               (call n ("peer" "timestamp_sec") [] t)
                               (call n ("aqua-dht" "register_key") [initial_peer t false 0])
                              )
                              (call n ("aqua-dht" "put_value") [initial_peer value t [] [] 0])
                             )
                             (null)
                            )
                           )
                           (next n)
                          )
                         )
                        )
                        (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") ["OK"])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "put_value",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "initial_peer",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "value",
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

 

export function registerKeyPutValue(
    node_id: string,
    key: string,
    value: string,
    relay_id: string | null,
    service_id: string | null,
    config?: {ttl?: number}
): Promise<string[]>;

export function registerKeyPutValue(
    peer: FluencePeer,
    node_id: string,
    key: string,
    value: string,
    relay_id: string | null,
    service_id: string | null,
    config?: {ttl?: number}
): Promise<string[]>;

export function registerKeyPutValue(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (seq
                            (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                            (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
                           )
                           (call %init_peer_id% ("getDataSrv" "key") [] key)
                          )
                          (call %init_peer_id% ("getDataSrv" "value") [] value)
                         )
                         (call %init_peer_id% ("getDataSrv" "relay_id") [] relay_id)
                        )
                        (call %init_peer_id% ("getDataSrv" "service_id") [] service_id)
                       )
                       (par
                        (seq
                         (seq
                          (call %init_peer_id% ("op" "string_to_b58") [key] k)
                          (call %init_peer_id% ("kad" "neighborhood") [k [] []] nodes)
                         )
                         (call %init_peer_id% ("op" "noop") [])
                        )
                        (fold nodes n
                         (par
                          (seq
                           (call -relay- ("op" "noop") [])
                           (xor
                            (call n ("peer" "timestamp_sec") [] t)
                            (seq
                             (call -relay- ("op" "noop") [])
                             (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                            )
                           )
                          )
                          (next n)
                         )
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [nodes])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "registerKeyPutValue",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "node_id",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "key",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "value",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "relay_id",
            "argType" : {
                "tag" : "optional"
            }
        },
        {
            "name" : "service_id",
            "argType" : {
                "tag" : "optional"
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

 

export function getNeighbours(
    topic: string,
    config?: {ttl?: number}
): Promise<string[]>;

export function getNeighbours(
    peer: FluencePeer,
    topic: string,
    config?: {ttl?: number}
): Promise<string[]>;

export function getNeighbours(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                         (call %init_peer_id% ("getDataSrv" "topic") [] topic)
                        )
                        (call %init_peer_id% ("op" "string_to_b58") [topic] k)
                       )
                       (call %init_peer_id% ("kad" "neighborhood") [k [] []] nodes)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [nodes])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "getNeighbours",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "topic",
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

 

export function findSubscribers(
    topic: string,
    config?: {ttl?: number}
): Promise<{ peer_id: string; relay_id: string[]; service_id: string[]; set_by: string; timestamp_created: number; value: string; weight: number; }[]>;

export function findSubscribers(
    peer: FluencePeer,
    topic: string,
    config?: {ttl?: number}
): Promise<{ peer_id: string; relay_id: string[]; service_id: string[]; set_by: string; timestamp_created: number; value: string; weight: number; }[]>;

export function findSubscribers(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (call %init_peer_id% ("getDataSrv" "topic") [] topic)
                       )
                       (new $res
                        (xor
                         (seq
                          (seq
                           (seq
                            (call -relay- ("op" "string_to_b58") [topic] k)
                            (call -relay- ("kad" "neighborhood") [k [] []] nodes)
                           )
                           (par
                            (seq
                             (fold nodes n
                              (par
                               (seq
                                (xor
                                 (seq
                                  (call n ("peer" "timestamp_sec") [] t)
                                  (call n ("aqua-dht" "get_values") [topic t] $res)
                                 )
                                 (null)
                                )
                                (call -relay- ("op" "noop") [])
                               )
                               (next n)
                              )
                             )
                             (call -relay- ("op" "noop") [])
                            )
                            (null)
                           )
                          )
                          (call -relay- ("aqua-dht" "merge_two") [$res.$.[0].result! $res.$.[1].result!] v)
                         )
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [v.$.result!])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "findSubscribers",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "topic",
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

 

export function initTopicAndSubscribe(
    topic: string,
    value: string,
    relay_id: string | null,
    service_id: string | null,
    config?: {ttl?: number}
): Promise<void>;

export function initTopicAndSubscribe(
    peer: FluencePeer,
    topic: string,
    value: string,
    relay_id: string | null,
    service_id: string | null,
    config?: {ttl?: number}
): Promise<void>;

export function initTopicAndSubscribe(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                          (call %init_peer_id% ("getDataSrv" "topic") [] topic)
                         )
                         (call %init_peer_id% ("getDataSrv" "value") [] value)
                        )
                        (call %init_peer_id% ("getDataSrv" "relay_id") [] relay_id)
                       )
                       (call %init_peer_id% ("getDataSrv" "service_id") [] service_id)
                      )
                      (xor
                       (par
                        (seq
                         (seq
                          (call -relay- ("op" "string_to_b58") [topic] k)
                          (call -relay- ("kad" "neighborhood") [k [] []] nodes)
                         )
                         (call %init_peer_id% ("op" "noop") [])
                        )
                        (fold nodes n
                         (par
                          (seq
                           (call -relay- ("op" "noop") [])
                           (xor
                            (seq
                             (seq
                              (call n ("peer" "timestamp_sec") [] t)
                              (call n ("aqua-dht" "register_key") [topic t false 0])
                             )
                             (call n ("aqua-dht" "put_value") [topic value t relay_id service_id 0])
                            )
                            (null)
                           )
                          )
                          (next n)
                         )
                        )
                       )
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "initTopicAndSubscribe",
    "returnType" : {
        "tag" : "void"
    },
    "argDefs" : [
        {
            "name" : "topic",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "value",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "relay_id",
            "argType" : {
                "tag" : "optional"
            }
        },
        {
            "name" : "service_id",
            "argType" : {
                "tag" : "optional"
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
