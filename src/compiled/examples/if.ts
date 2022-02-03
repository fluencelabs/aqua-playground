/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.6.0-263
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


// Services

export interface OpRDef {
    identity: (s: string, callParams: CallParams<'s'>) => string | Promise<string>;
}
export function registerOpR(service: OpRDef): void;
export function registerOpR(serviceId: string, service: OpRDef): void;
export function registerOpR(peer: FluencePeer, service: OpRDef): void;
export function registerOpR(peer: FluencePeer, serviceId: string, service: OpRDef): void;
       

export function registerOpR(...args: any) {
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
                "tag" : "primitive"
            }
        }
    ]
}
    );
}
      
// Functions
 

export function ifElseCall(
    condition: boolean,
    config?: {ttl?: number}
): Promise<void>;

export function ifElseCall(
    peer: FluencePeer,
    condition: boolean,
    config?: {ttl?: number}
): Promise<void>;

export function ifElseCall(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (call %init_peer_id% ("getDataSrv" "condition") [] condition)
                      )
                      (xor
                       (match condition true
                        (xor
                         (call %init_peer_id% ("println-service-id" "print") ["it is true"])
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                        )
                       )
                       (call %init_peer_id% ("println-service-id" "print") ["it is false"])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "ifElseCall",
    "returnType" : {
        "tag" : "void"
    },
    "argDefs" : [
        {
            "name" : "condition",
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

 

export function ifElseNumCall(
    condition: number,
    config?: {ttl?: number}
): Promise<void>;

export function ifElseNumCall(
    peer: FluencePeer,
    condition: number,
    config?: {ttl?: number}
): Promise<void>;

export function ifElseNumCall(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (call %init_peer_id% ("getDataSrv" "condition") [] condition)
                      )
                      (xor
                       (match condition 1
                        (xor
                         (call %init_peer_id% ("println-service-id" "print") ["it is 1"])
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                        )
                       )
                       (call %init_peer_id% ("println-service-id" "print") ["it is not 1"])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "ifElseNumCall",
    "returnType" : {
        "tag" : "void"
    },
    "argDefs" : [
        {
            "name" : "condition",
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

 

export function ifCorrectXorWrap(
    node: string,
    config?: {ttl?: number}
): Promise<string>;

export function ifCorrectXorWrap(
    peer: FluencePeer,
    node: string,
    config?: {ttl?: number}
): Promise<string>;

export function ifCorrectXorWrap(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (call %init_peer_id% ("getDataSrv" "node") [] node)
                       )
                       (new $service_id
                        (seq
                         (seq
                          (call -relay- ("op" "noop") [])
                          (xor
                           (seq
                            (call node ("op" "identity") ["1234"] res)
                            (xor
                             (match res ""
                              (xor
                               (seq
                                (ap "0x" $service_id)
                                (call -relay- ("op" "noop") [])
                               )
                               (seq
                                (call -relay- ("op" "noop") [])
                                (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                               )
                              )
                             )
                             (seq
                              (seq
                               (call -relay- ("op" "noop") [])
                               (ap "1x" $service_id)
                              )
                              (call -relay- ("op" "noop") [])
                             )
                            )
                           )
                           (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                          )
                         )
                         (call %init_peer_id% ("op" "identity") [$service_id.$.[0]!] service_id-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [service_id-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "ifCorrectXorWrap",
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
