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
    "functions" : [
        {
            "functionName" : "createStr",
            "argDefs" : [
                {
                    "name" : "arg0",
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
    "functions" : [
        {
            "functionName" : "identity",
            "argDefs" : [
                {
                    "name" : "arg0",
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
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
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
