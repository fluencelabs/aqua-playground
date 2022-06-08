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

export interface OpODef {
    identity: (arg0: string, callParams: CallParams<'arg0'>) => string | Promise<string>;
}
export function registerOpO(service: OpODef): void;
export function registerOpO(serviceId: string, service: OpODef): void;
export function registerOpO(peer: FluencePeer, service: OpODef): void;
export function registerOpO(peer: FluencePeer, serviceId: string, service: OpODef): void;
       

export function registerOpO(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "op",
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "identity" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "unlabeledProduct",
                    "items" : [
                        {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    ]
                },
                "codomain" : {
                    "tag" : "unlabeledProduct",
                    "items" : [
                        {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    ]
                }
            }
        }
    }
}
    );
}
      


export interface GetterDef {
    createStr: (arg0: number, callParams: CallParams<'arg0'>) => string | Promise<string>;
}
export function registerGetter(service: GetterDef): void;
export function registerGetter(serviceId: string, service: GetterDef): void;
export function registerGetter(peer: FluencePeer, service: GetterDef): void;
export function registerGetter(peer: FluencePeer, serviceId: string, service: GetterDef): void;
       

export function registerGetter(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "test",
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "createStr" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "unlabeledProduct",
                    "items" : [
                        {
                            "tag" : "scalar",
                            "name" : "u32"
                        }
                    ]
                },
                "codomain" : {
                    "tag" : "unlabeledProduct",
                    "items" : [
                        {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    ]
                }
            }
        }
    }
}
    );
}
      


export interface OpNDef {
    identity: (arg0: number, callParams: CallParams<'arg0'>) => number | Promise<number>;
}
export function registerOpN(service: OpNDef): void;
export function registerOpN(serviceId: string, service: OpNDef): void;
export function registerOpN(peer: FluencePeer, service: OpNDef): void;
export function registerOpN(peer: FluencePeer, serviceId: string, service: OpNDef): void;
       

export function registerOpN(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "op",
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "identity" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "unlabeledProduct",
                    "items" : [
                        {
                            "tag" : "scalar",
                            "name" : "i32"
                        }
                    ]
                },
                "codomain" : {
                    "tag" : "unlabeledProduct",
                    "items" : [
                        {
                            "tag" : "scalar",
                            "name" : "i32"
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
 

export function compareConstants(
    config?: {ttl?: number}
): Promise<void>;

export function compareConstants(
    peer: FluencePeer,
    config?: {ttl?: number}
): Promise<void>;

export function compareConstants(...args: any) {

    let script = `
                    (xor
                     (seq
                      (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                      (xor
                       (match 2 -3
                        (xor
                         (call %init_peer_id% ("op" "identity") [2])
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                        )
                       )
                       (call %init_peer_id% ("op" "identity") [-3])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "compareConstants",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                
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

 

export function callConstant(
    config?: {ttl?: number}
): Promise<string[]>;

export function callConstant(
    peer: FluencePeer,
    config?: {ttl?: number}
): Promise<string[]>;

export function callConstant(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (new $res
                        (seq
                         (seq
                          (call %init_peer_id% ("test" "createStr") [5] $res)
                          (call %init_peer_id% ("op" "identity") ["default-str"] $res)
                         )
                         (call %init_peer_id% ("op" "identity") [$res] res-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "callConstant",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                
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

 
export type TimestampAndTtlResult = [number, number]
export function timestampAndTtl(
    config?: {ttl?: number}
): Promise<TimestampAndTtlResult>;

export function timestampAndTtl(
    peer: FluencePeer,
    config?: {ttl?: number}
): Promise<TimestampAndTtlResult>;

export function timestampAndTtl(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (call %init_peer_id% ("op" "noop") [])
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [%ttl% %timestamp%])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "timestampAndTtl",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                
            }
        },
        "codomain" : {
            "tag" : "unlabeledProduct",
            "items" : [
                {
                    "tag" : "scalar",
                    "name" : "u32"
                },
                {
                    "tag" : "scalar",
                    "name" : "u64"
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
