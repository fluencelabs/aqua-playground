/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.5.3-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


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
    "functions" : [
        {
            "functionName" : "call",
            "argDefs" : [
                {
                    "name" : "d",
                    "argType" : {
                        "tag" : "primitive"
                    }
                },
                {
                    "name" : "sd",
                    "argType" : {
                        "tag" : "primitive"
                    }
                }
            ],
            "returnType" : {
                "tag" : "primitive"
            }
        },
        {
            "functionName" : "identity",
            "argDefs" : [
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
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "d",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "d2",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "sd",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "c",
            "argType" : {
                "tag" : "callback",
                "callback" : {
                    "argDefs" : [
                        {
                            "name" : "arg0",
                            "argType" : {
                                "tag" : "primitive"
                            }
                        },
                        {
                            "name" : "arg1",
                            "argType" : {
                                "tag" : "primitive"
                            }
                        }
                    ],
                    "returnType" : {
                        "tag" : "primitive"
                    }
                }
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
