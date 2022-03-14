/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.6.3-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v3';

import {
    CallParams
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


// Services

export interface StringExtraDef {
    addNameToHello: (arg0: string, callParams: CallParams<'arg0'>) => string | Promise<string>;
}
export function registerStringExtra(service: StringExtraDef): void;
export function registerStringExtra(serviceId: string, service: StringExtraDef): void;
export function registerStringExtra(peer: FluencePeer, service: StringExtraDef): void;
export function registerStringExtra(peer: FluencePeer, serviceId: string, service: StringExtraDef): void;
       

export function registerStringExtra(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "service-id",
    "functions" : {
        "tag" : "labeledProduct",
        "fields" : {
            "addNameToHello" : {
                "tag" : "arrow",
                "domain" : {
                    "tag" : "unlabeledProduct",
                    "items" : [
                        {
                            "tag" : "scalar",
                            "name" : "string"
                        }
                    ]
                },
                "codomain" : {
                    "tag" : "unlabeledProduct",
                    "items" : [
                        {
                            "tag" : "scalar",
                            "name" : "string"
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
 

export function helloWorld(
    name: string,
    config?: {ttl?: number}
): Promise<string>;

export function helloWorld(
    peer: FluencePeer,
    name: string,
    config?: {ttl?: number}
): Promise<string>;

export function helloWorld(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (call %init_peer_id% ("getDataSrv" "name") [] name)
                       )
                       (call %init_peer_id% ("service-id" "addNameToHello") [name] res)
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
    "functionName" : "helloWorld",
    "arrow" : {
        "tag" : "arrow",
        "domain" : {
            "tag" : "labeledProduct",
            "fields" : {
                "name" : {
                    "tag" : "scalar",
                    "name" : "string"
                }
            }
        },
        "codomain" : {
            "tag" : "unlabeledProduct",
            "items" : [
                {
                    "tag" : "scalar",
                    "name" : "string"
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
