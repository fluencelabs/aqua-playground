/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.7.3-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v3';


// Services

export interface TestServiceDef {
    get_records: (key: string, callParams: CallParams<'key'>) => string[] | Promise<string[]>;
}
export function registerTestService(service: TestServiceDef): void;
export function registerTestService(serviceId: string, service: TestServiceDef): void;
export function registerTestService(peer: FluencePeer, service: TestServiceDef): void;
export function registerTestService(peer: FluencePeer, serviceId: string, service: TestServiceDef): void;
       

export function registerTestService(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "test-service",
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "get_records" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "labeledProduct",
                    "fields" : {
                        "key" : {
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
                                "name" : "string"
                            }
                        }
                    ]
                }
            }
        }
    }
}
    );
}
      
// Functions
 

export function append_records(
    peer_: string,
    srum: string[][],
    config?: {ttl?: number}
): Promise<void>;

export function append_records(
    peer: FluencePeer,
    peer_: string,
    srum: string[][],
    config?: {ttl?: number}
): Promise<void>;

export function append_records(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                         (call %init_peer_id% ("getDataSrv" "peer") [] peer)
                        )
                        (call %init_peer_id% ("getDataSrv" "srum") [] srum-iter)
                       )
                       (fold srum-iter srum-item-0
                        (seq
                         (ap srum-item-0 $srum)
                         (next srum-item-0)
                        )
                       )
                      )
                      (call %init_peer_id% ("test-service" "get_records") [peer] $srum)
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "append_records",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "peer" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "srum" : {
                    "tag" : "array",
                    "type" : {
                        "tag" : "array",
                        "type" : {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    }
                }
            }
        },
        "codomain" : {
            "tag" : "nil"
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

 

export function retrieve_records(
    peer_: string,
    config?: {ttl?: number}
): Promise<string[][]>;

export function retrieve_records(
    peer: FluencePeer,
    peer_: string,
    config?: {ttl?: number}
): Promise<string[][]>;

export function retrieve_records(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (call %init_peer_id% ("getDataSrv" "peer") [] peer)
                       )
                       (new $records
                        (seq
                         (call %init_peer_id% ("test-service" "get_records") [peer] $records)
                         (call %init_peer_id% ("op" "identity") [$records] records-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [records-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "retrieve_records",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "peer" : {
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
                        "tag" : "array",
                        "type" : {
                            "tag" : "scalar",
                            "name" : "string"
                        }
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
