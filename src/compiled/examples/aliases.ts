/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.7.1-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v3';


// Services

export interface ComplexServiceDef {
    call: (d: { otherValue: number; value: string; }, sd: { complex: { someNum: number; someStr: string; }; value: string; }, callParams: CallParams<'d' | 'sd'>) => { someNum: number; someStr: string; } | Promise<{ someNum: number; someStr: string; }>;
    identity: (callParams: CallParams<null>) => { complex: { someNum: number; someStr: string; }; value: string; } | Promise<{ complex: { someNum: number; someStr: string; }; value: string; }>;
}
export function registerComplexService(service: ComplexServiceDef): void;
export function registerComplexService(serviceId: string, service: ComplexServiceDef): void;
export function registerComplexService(peer: FluencePeer, service: ComplexServiceDef): void;
export function registerComplexService(peer: FluencePeer, serviceId: string, service: ComplexServiceDef): void;
       

export function registerComplexService(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "op-ha",
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "call" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "labeledProduct",
                    "fields" : {
                        "d" : {
                            "tag" : "struct",
                            "name" : "SomeData",
                            "fields" : {
                                "otherValue" : {
                                    "tag" : "scalar",
                                    "name" : "u64"
                                },
                                "value" : {
                                    "tag" : "scalar",
                                    "name" : "string"
                                }
                            }
                        },
                        "sd" : {
                            "tag" : "struct",
                            "name" : "SecondData",
                            "fields" : {
                                "complex" : {
                                    "tag" : "struct",
                                    "name" : "SubData",
                                    "fields" : {
                                        "someNum" : {
                                            "tag" : "scalar",
                                            "name" : "i32"
                                        },
                                        "someStr" : {
                                            "tag" : "scalar",
                                            "name" : "string"
                                        }
                                    }
                                },
                                "value" : {
                                    "tag" : "scalar",
                                    "name" : "string"
                                }
                            }
                        }
                    }
                },
                "codomain" : {
                    "tag" : "unlabeledProduct",
                    "items" : [
                        {
                            "tag" : "struct",
                            "name" : "SubData",
                            "fields" : {
                                "someNum" : {
                                    "tag" : "scalar",
                                    "name" : "i32"
                                },
                                "someStr" : {
                                    "tag" : "scalar",
                                    "name" : "string"
                                }
                            }
                        }
                    ]
                }
            },
            "identity" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "nil"
                },
                "codomain" : {
                    "tag" : "unlabeledProduct",
                    "items" : [
                        {
                            "tag" : "struct",
                            "name" : "SecondData",
                            "fields" : {
                                "complex" : {
                                    "tag" : "struct",
                                    "name" : "SubData",
                                    "fields" : {
                                        "someNum" : {
                                            "tag" : "scalar",
                                            "name" : "i32"
                                        },
                                        "someStr" : {
                                            "tag" : "scalar",
                                            "name" : "string"
                                        }
                                    }
                                },
                                "value" : {
                                    "tag" : "scalar",
                                    "name" : "string"
                                }
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
export type DoSmthArgD = { otherValue: number; value: string; }
export type DoSmthArgD2 = { otherValue: number; value: string; }
export type DoSmthArgSd = { complex: { someNum: number; someStr: string; }; value: string; } 
export type DoSmthResult = { complex: { otherValue: number; value: string; }; value: string; }
export function doSmth(
    d: DoSmthArgD,
    d2: DoSmthArgD2,
    sd: DoSmthArgSd,
    c: (arg0: { someNum: number; someStr: string; }, arg1: { complex: { someNum: number; someStr: string; }; value: string; }, callParams: CallParams<'arg0' | 'arg1'>) => { complex: { otherValue: number; value: string; }; value: string; } | Promise<{ complex: { otherValue: number; value: string; }; value: string; }>,
    config?: {ttl?: number}
): Promise<DoSmthResult>;

export function doSmth(
    peer: FluencePeer,
    d: DoSmthArgD,
    d2: DoSmthArgD2,
    sd: DoSmthArgSd,
    c: (arg0: { someNum: number; someStr: string; }, arg1: { complex: { someNum: number; someStr: string; }; value: string; }, callParams: CallParams<'arg0' | 'arg1'>) => { complex: { otherValue: number; value: string; }; value: string; } | Promise<{ complex: { otherValue: number; value: string; }; value: string; }>,
    config?: {ttl?: number}
): Promise<DoSmthResult>;

export function doSmth(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                           (call %init_peer_id% ("getDataSrv" "d") [] d)
                          )
                          (call %init_peer_id% ("getDataSrv" "d2") [] d2)
                         )
                         (call %init_peer_id% ("getDataSrv" "sd") [] sd)
                        )
                        (call %init_peer_id% ("op-ha" "call") [d sd] res)
                       )
                       (xor
                        (call %init_peer_id% ("callbackSrv" "c") [res sd] init_call_res0)
                        (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [init_call_res0])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "doSmth",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "d" : {
                    "tag" : "struct",
                    "name" : "SomeData",
                    "fields" : {
                        "otherValue" : {
                            "tag" : "scalar",
                            "name" : "u64"
                        },
                        "value" : {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    }
                },
                "d2" : {
                    "tag" : "struct",
                    "name" : "SomeData",
                    "fields" : {
                        "otherValue" : {
                            "tag" : "scalar",
                            "name" : "u64"
                        },
                        "value" : {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    }
                },
                "sd" : {
                    "tag" : "struct",
                    "name" : "SecondData",
                    "fields" : {
                        "complex" : {
                            "tag" : "struct",
                            "name" : "SubData",
                            "fields" : {
                                "someNum" : {
                                    "tag" : "scalar",
                                    "name" : "i32"
                                },
                                "someStr" : {
                                    "tag" : "scalar",
                                    "name" : "string"
                                }
                            }
                        },
                        "value" : {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    }
                },
                "c" : {
                    "tag" : "arrow",
                    "domain" : {
                        "tag" : "unlabeledProduct",
                        "items" : [
                            {
                                "tag" : "struct",
                                "name" : "SubData",
                                "fields" : {
                                    "someNum" : {
                                        "tag" : "scalar",
                                        "name" : "i32"
                                    },
                                    "someStr" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    }
                                }
                            },
                            {
                                "tag" : "struct",
                                "name" : "SecondData",
                                "fields" : {
                                    "complex" : {
                                        "tag" : "struct",
                                        "name" : "SubData",
                                        "fields" : {
                                            "someNum" : {
                                                "tag" : "scalar",
                                                "name" : "i32"
                                            },
                                            "someStr" : {
                                                "tag" : "scalar",
                                                "name" : "string"
                                            }
                                        }
                                    },
                                    "value" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    }
                                }
                            }
                        ]
                    },
                    "codomain" : {
                        "tag" : "unlabeledProduct",
                        "items" : [
                            {
                                "tag" : "struct",
                                "name" : "ThirdData",
                                "fields" : {
                                    "complex" : {
                                        "tag" : "struct",
                                        "name" : "SomeData",
                                        "fields" : {
                                            "otherValue" : {
                                                "tag" : "scalar",
                                                "name" : "u64"
                                            },
                                            "value" : {
                                                "tag" : "scalar",
                                                "name" : "string"
                                            }
                                        }
                                    },
                                    "value" : {
                                        "tag" : "scalar",
                                        "name" : "string"
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        },
        "codomain" : {
            "tag" : "unlabeledProduct",
            "items" : [
                {
                    "tag" : "struct",
                    "name" : "ThirdData",
                    "fields" : {
                        "complex" : {
                            "tag" : "struct",
                            "name" : "SomeData",
                            "fields" : {
                                "otherValue" : {
                                    "tag" : "scalar",
                                    "name" : "u64"
                                },
                                "value" : {
                                    "tag" : "scalar",
                                    "name" : "string"
                                }
                            }
                        },
                        "value" : {
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
