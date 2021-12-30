/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.5.2-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


// Services

export interface ParServiceDef {
    call: (callParams: CallParams<null>) => string | Promise<string>;
}
export function registerParService(service: ParServiceDef): void;
export function registerParService(serviceId: string, service: ParServiceDef): void;
export function registerParService(peer: FluencePeer, service: ParServiceDef): void;
export function registerParService(peer: FluencePeer, serviceId: string, service: ParServiceDef): void;
       

export function registerParService(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "parservice-id",
    "functions" : [
        {
            "functionName" : "call",
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
 

export function parFunc(
    node: string,
    c: (arg0: { external_addresses: string[]; }, callParams: CallParams<'arg0'>) => void | Promise<void>,
    config?: {ttl?: number}
): Promise<void>;

export function parFunc(
    peer: FluencePeer,
    node: string,
    c: (arg0: { external_addresses: string[]; }, callParams: CallParams<'arg0'>) => void | Promise<void>,
    config?: {ttl?: number}
): Promise<void>;

export function parFunc(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (call %init_peer_id% ("getDataSrv" "node") [] node)
                      )
                      (par
                       (par
                        (call %init_peer_id% ("parservice-id" "call") [] y)
                        (seq
                         (call -relay- ("op" "noop") [])
                         (xor
                          (seq
                           (seq
                            (call node ("peer" "identify") [] t)
                            (call -relay- ("op" "noop") [])
                           )
                           (xor
                            (call %init_peer_id% ("callbackSrv" "c") [t])
                            (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                           )
                          )
                          (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                         )
                        )
                       )
                       (call %init_peer_id% ("parservice-id" "call") [] x)
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "parFunc",
    "returnType" : {
        "tag" : "void"
    },
    "argDefs" : [
        {
            "name" : "node",
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
                        }
                    ],
                    "returnType" : {
                        "tag" : "void"
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
