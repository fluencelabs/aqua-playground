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

export interface UnexistedDef {
    getStr: (callParams: CallParams<null>) => string | Promise<string>;
}
export function registerUnexisted(service: UnexistedDef): void;
export function registerUnexisted(serviceId: string, service: UnexistedDef): void;
export function registerUnexisted(peer: FluencePeer, service: UnexistedDef): void;
export function registerUnexisted(peer: FluencePeer, serviceId: string, service: UnexistedDef): void;
       

export function registerUnexisted(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "unex",
    "functions" : [
        {
            "functionName" : "getStr",
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
      


export interface OpEDef {
    identity: (s: string, callParams: CallParams<'s'>) => string | Promise<string>;
}
export function registerOpE(service: OpEDef): void;
export function registerOpE(serviceId: string, service: OpEDef): void;
export function registerOpE(peer: FluencePeer, service: OpEDef): void;
export function registerOpE(peer: FluencePeer, serviceId: string, service: OpEDef): void;
       

export function registerOpE(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "op",
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
 

export function tryOtherwiseTest(
    node_id: string,
    config?: {ttl?: number}
): Promise<string>;

export function tryOtherwiseTest(
    peer: FluencePeer,
    node_id: string,
    config?: {ttl?: number}
): Promise<string>;

export function tryOtherwiseTest(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
                       )
                       (new $f
                        (seq
                         (seq
                          (call -relay- ("op" "noop") [])
                          (xor
                           (xor
                            (seq
                             (call node_id ("unex" "getStr") [] $f)
                             (call -relay- ("op" "noop") [])
                            )
                            (seq
                             (call node_id ("op" "identity") ["error"] $f)
                             (call -relay- ("op" "noop") [])
                            )
                           )
                           (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                          )
                         )
                         (call %init_peer_id% ("op" "identity") [$f.$.[0]!] f-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [f-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "tryOtherwiseTest",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "node_id",
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
