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

export interface IOpDef {
    identity: (arg0: string, callParams: CallParams<'arg0'>) => string | Promise<string>;
}
export function registerIOp(service: IOpDef): void;
export function registerIOp(serviceId: string, service: IOpDef): void;
export function registerIOp(peer: FluencePeer, service: IOpDef): void;
export function registerIOp(peer: FluencePeer, serviceId: string, service: IOpDef): void;
       

export function registerIOp(...args: any) {
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
      


export interface OpopDef {
    identity: (s: string, callParams: CallParams<'s'>) => string | Promise<string>;
}
export function registerOpop(service: OpopDef): void;
export function registerOpop(serviceId: string, service: OpopDef): void;
export function registerOpop(peer: FluencePeer, service: OpopDef): void;
export function registerOpop(peer: FluencePeer, serviceId: string, service: OpopDef): void;
       

export function registerOpop(...args: any) {
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
                    "tag" : "labeledProduct",
                    "fields" : {
                        "s" : {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    }
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
      


export interface TestoDef {
    getString: (arg0: string, callParams: CallParams<'arg0'>) => string | Promise<string>;
}
export function registerTesto(service: TestoDef): void;
export function registerTesto(serviceId: string, service: TestoDef): void;
export function registerTesto(peer: FluencePeer, service: TestoDef): void;
export function registerTesto(peer: FluencePeer, serviceId: string, service: TestoDef): void;
       

export function registerTesto(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "testo",
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "getString" : {
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
      


export interface LocalPrintDef {
    print: (arg0: string, callParams: CallParams<'arg0'>) => void | Promise<void>;
}
export function registerLocalPrint(service: LocalPrintDef): void;
export function registerLocalPrint(serviceId: string, service: LocalPrintDef): void;
export function registerLocalPrint(peer: FluencePeer, service: LocalPrintDef): void;
export function registerLocalPrint(peer: FluencePeer, serviceId: string, service: LocalPrintDef): void;
       

export function registerLocalPrint(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "lp",
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "print" : {
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
                    "tag" : "nil"
                }
            }
        }
    }
}
    );
}
      
// Functions
 

export function topologyBug427(
    peers: string[],
    config?: {ttl?: number}
): Promise<string[]>;

export function topologyBug427(
    peer: FluencePeer,
    peers: string[],
    config?: {ttl?: number}
): Promise<string[]>;

export function topologyBug427(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (call %init_peer_id% ("getDataSrv" "peers") [] peers)
                       )
                       (new $results
                        (seq
                         (seq
                          (par
                           (fold peers peer-0
                            (par
                             (seq
                              (seq
                               (seq
                                (call -relay- ("op" "noop") [])
                                (xor
                                 (call peer-0 ("op" "identity") ["some string"] $results)
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
                             (next peer-0)
                            )
                           )
                           (null)
                          )
                          (call %init_peer_id% ("op" "noop") [$results.$.[1]!])
                         )
                         (call %init_peer_id% ("op" "identity") [$results] results-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [results-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "topologyBug427",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "peers" : {
                    "tag" : "array",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "string"
                    }
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

 

export function topologyBug205(
    node_id: string,
    n2: string | null,
    config?: {ttl?: number}
): Promise<string[]>;

export function topologyBug205(
    peer: FluencePeer,
    node_id: string,
    n2: string | null,
    config?: {ttl?: number}
): Promise<string[]>;

export function topologyBug205(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                         (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
                        )
                        (call %init_peer_id% ("getDataSrv" "n2") [] n2)
                       )
                       (new $nodes
                        (seq
                         (seq
                          (seq
                           (call -relay- ("op" "noop") [])
                           (xor
                            (seq
                             (call node_id ("op" "identity") [n2] a)
                             (ap a.$.[0]! $nodes)
                            )
                            (seq
                             (seq
                              (call -relay- ("op" "noop") [])
                              (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                             )
                             (call -relay- ("op" "noop") [])
                            )
                           )
                          )
                          (xor
                           (seq
                            (par
                             (fold $nodes n-0
                              (par
                               (xor
                                (call n-0 ("peer" "identify") [])
                                (seq
                                 (call -relay- ("op" "noop") [])
                                 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                                )
                               )
                               (next n-0)
                              )
                             )
                             (null)
                            )
                            (call -relay- ("op" "noop") [])
                           )
                           (seq
                            (call -relay- ("op" "noop") [])
                            (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                           )
                          )
                         )
                         (call %init_peer_id% ("op" "identity") [$nodes] nodes-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [nodes-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 5])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "topologyBug205",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "node_id" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "n2" : {
                    "tag" : "option",
                    "type" : {
                        "tag" : "scalar",
                        "name" : "string"
                    }
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

 

export function topologyTest(
    me: string,
    myRelay: string,
    friend: string,
    friendRelay: string,
    config?: {ttl?: number}
): Promise<string>;

export function topologyTest(
    peer: FluencePeer,
    me: string,
    myRelay: string,
    friend: string,
    friendRelay: string,
    config?: {ttl?: number}
): Promise<string>;

export function topologyTest(...args: any) {

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
                            (call %init_peer_id% ("getDataSrv" "me") [] me)
                           )
                           (call %init_peer_id% ("getDataSrv" "myRelay") [] myRelay)
                          )
                          (call %init_peer_id% ("getDataSrv" "friend") [] friend)
                         )
                         (call %init_peer_id% ("getDataSrv" "friendRelay") [] friendRelay)
                        )
                        (par
                         (seq
                          (seq
                           (call -relay- ("op" "noop") [])
                           (call friendRelay ("op" "noop") [])
                          )
                          (xor
                           (seq
                            (seq
                             (call friend ("testo" "getString") ["friends string via"] str2)
                             (call friendRelay ("op" "noop") [])
                            )
                            (call -relay- ("op" "noop") [])
                           )
                           (seq
                            (seq
                             (call friendRelay ("op" "noop") [])
                             (call -relay- ("op" "noop") [])
                            )
                            (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                           )
                          )
                         )
                         (call %init_peer_id% ("lp" "print") ["my string in par"])
                        )
                       )
                       (call %init_peer_id% ("lp" "print") [str2])
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") ["finish"])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "topologyTest",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "me" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "myRelay" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "friend" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "friendRelay" : {
                    "tag" : "scalar",
                    "name" : "string"
                }
            }
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

 

export function topologyBug394(
    peer_: string,
    peer2: string,
    peer3: string,
    config?: {ttl?: number}
): Promise<string>;

export function topologyBug394(
    peer: FluencePeer,
    peer_: string,
    peer2: string,
    peer3: string,
    config?: {ttl?: number}
): Promise<string>;

export function topologyBug394(...args: any) {

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
                            (call %init_peer_id% ("getDataSrv" "peer") [] peer)
                           )
                           (call %init_peer_id% ("getDataSrv" "peer2") [] peer2)
                          )
                          (call %init_peer_id% ("getDataSrv" "peer3") [] peer3)
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (xor
                         (seq
                          (call peer ("op" "identity") [%init_peer_id%] comp)
                          (call -relay- ("op" "noop") [])
                         )
                         (seq
                          (call -relay- ("op" "noop") [])
                          (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                         )
                        )
                       )
                       (par
                        (seq
                         (seq
                          (call -relay- ("op" "noop") [])
                          (call peer3 ("op" "noop") [])
                         )
                         (xor
                          (call peer2 ("op" "identity") [%init_peer_id%] res)
                          (seq
                           (seq
                            (call peer3 ("op" "noop") [])
                            (call -relay- ("op" "noop") [])
                           )
                           (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                          )
                         )
                        )
                        (null)
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [comp])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "topologyBug394",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "peer" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "peer2" : {
                    "tag" : "scalar",
                    "name" : "string"
                },
                "peer3" : {
                    "tag" : "scalar",
                    "name" : "string"
                }
            }
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
