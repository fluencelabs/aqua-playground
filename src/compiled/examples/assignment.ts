/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.4.0-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


// Services

export interface OpHaDef {
    array: (a: string, b: string, callParams: CallParams<'a' | 'b'>) => string[] | Promise<string[]>;
identity: (a: string, callParams: CallParams<'a'>) => string | Promise<string>;
}
export function registerOpHa(service: OpHaDef): void;
export function registerOpHa(serviceId: string, service: OpHaDef): void;
export function registerOpHa(peer: FluencePeer, service: OpHaDef): void;
export function registerOpHa(peer: FluencePeer, serviceId: string, service: OpHaDef): void;
       

export function registerOpHa(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "op",
    "functions" : [
        {
            "functionName" : "array",
            "argDefs" : [
                {
                    "name" : "a",
                    "argType" : {
                        "tag" : "primitive"
                    }
                },
                {
                    "name" : "b",
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
                {
                    "name" : "a",
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
export type DoSmthArgArg = { value: string; } 

export function doSmth(arg: DoSmthArgArg, config?: {ttl?: number}): Promise<string[]>;
export function doSmth(peer: FluencePeer, arg: DoSmthArgArg, config?: {ttl?: number}): Promise<string[]>;
export function doSmth(...args: any) {

    let script = `
                        (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                         (call %init_peer_id% ("getDataSrv" "arg") [] arg)
                        )
                        (call %init_peer_id% ("op" "identity") [arg.$.value!] a)
                       )
                       (call %init_peer_id% ("op" "array") [a "hello"] res)
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
    "functionName" : "doSmth",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "arg",
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
