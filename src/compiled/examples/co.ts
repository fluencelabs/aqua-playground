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

export interface CoServiceDef {
    call: (callParams: CallParams<null>) => string | Promise<string>;
}
export function registerCoService(service: CoServiceDef): void;
export function registerCoService(serviceId: string, service: CoServiceDef): void;
export function registerCoService(peer: FluencePeer, service: CoServiceDef): void;
export function registerCoService(peer: FluencePeer, serviceId: string, service: CoServiceDef): void;
       

export function registerCoService(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "coservice-id",
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
 

export function coFunc(
    node: string,
    c: (arg0: { external_addresses: string[]; }, callParams: CallParams<'arg0'>) => void | Promise<void>,
    config?: {ttl?: number}
): Promise<void>;

export function coFunc(
    peer: FluencePeer,
    node: string,
    c: (arg0: { external_addresses: string[]; }, callParams: CallParams<'arg0'>) => void | Promise<void>,
    config?: {ttl?: number}
): Promise<void>;

export function coFunc(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                          (call %init_peer_id% ("getDataSrv" "node") [] node)
                         )
                         (call %init_peer_id% ("coservice-id" "call") [] y)
                        )
                        (call -relay- ("op" "noop") [])
                       )
                       (xor
                        (seq
                         (seq
                          (call node ("peer" "identify") [] t)
                          (par
                           (seq
                            (call -relay- ("op" "noop") [])
                            (xor
                             (call %init_peer_id% ("callbackSrv" "c") [t])
                             (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                            )
                           )
                           (null)
                          )
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (seq
                         (call -relay- ("op" "noop") [])
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                        )
                       )
                      )
                      (call %init_peer_id% ("coservice-id" "call") [] x)
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "coFunc",
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
