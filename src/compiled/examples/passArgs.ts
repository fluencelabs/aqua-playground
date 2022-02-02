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

export interface AquaDHTDef {
    put_host_value: (key: string, value: string, service_id: string[], callParams: CallParams<'key' | 'value' | 'service_id'>) => string | Promise<string>;
}
export function registerAquaDHT(service: AquaDHTDef): void;
export function registerAquaDHT(serviceId: string, service: AquaDHTDef): void;
export function registerAquaDHT(peer: FluencePeer, service: AquaDHTDef): void;
export function registerAquaDHT(peer: FluencePeer, serviceId: string, service: AquaDHTDef): void;
       

export function registerAquaDHT(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "test-dht",
    "functions" : [
        {
            "functionName" : "put_host_value",
            "argDefs" : [
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
                    "name" : "service_id",
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
 

export function putHostValue(
    key: string,
    value: string,
    service_id: string | null,
    config?: {ttl?: number}
): Promise<string>;

export function putHostValue(
    peer: FluencePeer,
    key: string,
    value: string,
    service_id: string | null,
    config?: {ttl?: number}
): Promise<string>;

export function putHostValue(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                          (call %init_peer_id% ("getDataSrv" "key") [] key)
                         )
                         (call %init_peer_id% ("getDataSrv" "value") [] value)
                        )
                        (call %init_peer_id% ("getDataSrv" "service_id") [] service_id)
                       )
                       (call %init_peer_id% ("test-dht" "put_host_value") [key value service_id] res)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "putHostValue",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
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

 

export function create_client_util(
    service_id: string,
    config?: {ttl?: number}
): Promise<string>;

export function create_client_util(
    peer: FluencePeer,
    service_id: string,
    config?: {ttl?: number}
): Promise<string>;

export function create_client_util(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (call %init_peer_id% ("getDataSrv" "service_id") [] service_id)
                       )
                       (call %init_peer_id% ("test-dht" "put_host_value") ["client-util" service_id []] res)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "create_client_util",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "service_id",
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
