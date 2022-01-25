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

export interface OpHDef {
    identity: (s: string, callParams: CallParams<'s'>) => string | Promise<string>;
}
export function registerOpH(service: OpHDef): void;
export function registerOpH(serviceId: string, service: OpHDef): void;
export function registerOpH(peer: FluencePeer, service: OpHDef): void;
export function registerOpH(peer: FluencePeer, serviceId: string, service: OpHDef): void;
       

export function registerOpH(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "opa",
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
 

export function a(
    b: string,
    config?: {ttl?: number}
): Promise<string>;

export function a(
    peer: FluencePeer,
    b: string,
    config?: {ttl?: number}
): Promise<string>;

export function a(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (call %init_peer_id% ("getDataSrv" "b") [] b)
                       )
                       (call %init_peer_id% ("opa" "identity") [b] c)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [c])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "a",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "b",
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

 

export function d(
    e: string,
    config?: {ttl?: number}
): Promise<string>;

export function d(
    peer: FluencePeer,
    e: string,
    config?: {ttl?: number}
): Promise<string>;

export function d(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (call %init_peer_id% ("getDataSrv" "e") [] e)
                       )
                       (call %init_peer_id% ("opa" "identity") [e] c)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [c])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "d",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "e",
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
