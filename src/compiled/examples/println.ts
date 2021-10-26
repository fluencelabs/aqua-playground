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

export interface PrintlnDef {
    print: (arg0: string, callParams: CallParams<'arg0'>) => void | Promise<void>;
}
export function registerPrintln(service: PrintlnDef): void;
export function registerPrintln(serviceId: string, service: PrintlnDef): void;
export function registerPrintln(peer: FluencePeer, service: PrintlnDef): void;
export function registerPrintln(peer: FluencePeer, serviceId: string, service: PrintlnDef): void;
       

export function registerPrintln(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "println-service-id",
    "functions" : [
        {
            "functionName" : "print",
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
    ]
}
    );
}
      
// Functions
 

export function print(str: string, config?: {ttl?: number}): Promise<void>;
export function print(peer: FluencePeer, str: string, config?: {ttl?: number}): Promise<void>;
export function print(...args: any) {

    let script = `
                        (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (call %init_peer_id% ("getDataSrv" "str") [] str)
                      )
                      (call %init_peer_id% ("println-service-id" "print") [str])
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "print",
    "returnType" : {
        "tag" : "void"
    },
    "argDefs" : [
        {
            "name" : "str",
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
