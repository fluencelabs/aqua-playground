/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.6.1-279
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


// Services

export interface NodeIdGetterDef {
    get: (callParams: CallParams<null>) => { name: string; peerId: string; } | Promise<{ name: string; peerId: string; }>;
}
export function registerNodeIdGetter(service: NodeIdGetterDef): void;
export function registerNodeIdGetter(serviceId: string, service: NodeIdGetterDef): void;
export function registerNodeIdGetter(peer: FluencePeer, service: NodeIdGetterDef): void;
export function registerNodeIdGetter(peer: FluencePeer, serviceId: string, service: NodeIdGetterDef): void;
       

export function registerNodeIdGetter(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "somesrv",
    "functions" : [
        {
            "functionName" : "get",
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
 

export function getAliasedData(
    config?: {ttl?: number}
): Promise<string>;

export function getAliasedData(
    peer: FluencePeer,
    config?: {ttl?: number}
): Promise<string>;

export function getAliasedData(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (call %init_peer_id% ("somesrv" "get") [] res)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res.$.peerId!])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "getAliasedData",
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
