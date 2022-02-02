/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.6.0-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


// Services

export interface CustomIdDef {
    id: (s: string, callParams: CallParams<'s'>) => string | Promise<string>;
}
export function registerCustomId(service: CustomIdDef): void;
export function registerCustomId(serviceId: string, service: CustomIdDef): void;
export function registerCustomId(peer: FluencePeer, service: CustomIdDef): void;
export function registerCustomId(peer: FluencePeer, serviceId: string, service: CustomIdDef): void;
       

export function registerCustomId(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "cid",
    "functions" : [
        {
            "functionName" : "id",
            "argDefs" : [
                {
                    "name" : "s",
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
 
export type ViaArrResult = { external_addresses: string[]; }
export function viaArr(
    node_id: string,
    viaAr: string[],
    config?: {ttl?: number}
): Promise<ViaArrResult>;

export function viaArr(
    peer: FluencePeer,
    node_id: string,
    viaAr: string[],
    config?: {ttl?: number}
): Promise<ViaArrResult>;

export function viaArr(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                           (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
                          )
                          (call %init_peer_id% ("getDataSrv" "viaAr") [] viaAr)
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (fold viaAr -via-peer-
                         (seq
                          (call -via-peer- ("op" "noop") [])
                          (next -via-peer-)
                         )
                        )
                       )
                       (xor
                        (seq
                         (seq
                          (call node_id ("peer" "identify") [] p)
                          (fold viaAr -via-peer-
                           (seq
                            (next -via-peer-)
                            (call -via-peer- ("op" "noop") [])
                           )
                          )
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (seq
                         (seq
                          (fold viaAr -via-peer-
                           (seq
                            (call -via-peer- ("op" "noop") [])
                            (next -via-peer-)
                           )
                          )
                          (call -relay- ("op" "noop") [])
                         )
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [p])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "viaArr",
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
            "name" : "viaAr",
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

 
export type ViaStreamResult = { external_addresses: string[]; }
export function viaStream(
    node_id: string,
    viaStr: string[],
    config?: {ttl?: number}
): Promise<ViaStreamResult>;

export function viaStream(
    peer: FluencePeer,
    node_id: string,
    viaStr: string[],
    config?: {ttl?: number}
): Promise<ViaStreamResult>;

export function viaStream(...args: any) {

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
                           (call %init_peer_id% ("getDataSrv" "viaStr") [] viaStr-iter)
                          )
                          (fold viaStr-iter viaStr-item
                           (seq
                            (ap viaStr-item $viaStr)
                            (next viaStr-item)
                           )
                          )
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (fold $viaStr -via-peer-
                         (seq
                          (call -via-peer- ("op" "noop") [])
                          (next -via-peer-)
                         )
                        )
                       )
                       (xor
                        (seq
                         (seq
                          (call node_id ("peer" "identify") [] p)
                          (fold $viaStr -via-peer-
                           (seq
                            (next -via-peer-)
                            (call -via-peer- ("op" "noop") [])
                           )
                          )
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (seq
                         (seq
                          (fold $viaStr -via-peer-
                           (seq
                            (call -via-peer- ("op" "noop") [])
                            (next -via-peer-)
                           )
                          )
                          (call -relay- ("op" "noop") [])
                         )
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [p])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "viaStream",
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
            "name" : "viaStr",
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

 
export type ViaOptResult = { external_addresses: string[]; }
export function viaOpt(
    relay: string,
    node_id: string,
    viaOpt: string | null,
    config?: {ttl?: number}
): Promise<ViaOptResult>;

export function viaOpt(
    peer: FluencePeer,
    relay: string,
    node_id: string,
    viaOpt: string | null,
    config?: {ttl?: number}
): Promise<ViaOptResult>;

export function viaOpt(...args: any) {

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
                            (call %init_peer_id% ("getDataSrv" "relay") [] relay)
                           )
                           (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
                          )
                          (call %init_peer_id% ("getDataSrv" "viaOpt") [] viaOpt)
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (fold viaOpt -via-peer-
                         (seq
                          (call -via-peer- ("op" "noop") [])
                          (next -via-peer-)
                         )
                        )
                       )
                       (xor
                        (seq
                         (seq
                          (call node_id ("peer" "identify") [] p)
                          (fold viaOpt -via-peer-
                           (seq
                            (next -via-peer-)
                            (call -via-peer- ("op" "noop") [])
                           )
                          )
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (seq
                         (seq
                          (fold viaOpt -via-peer-
                           (seq
                            (call -via-peer- ("op" "noop") [])
                            (next -via-peer-)
                           )
                          )
                          (call -relay- ("op" "noop") [])
                         )
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [p])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "viaOpt",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "relay",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "node_id",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "viaOpt",
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
