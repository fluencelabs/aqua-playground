/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.3.2-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


function missingFields(obj: any, fields: string[]): string[] {
    return fields.filter(f => !(f in obj))
}

// Services

export interface DTGetterDef {
    get_dt: (s: string, callParams: CallParams<'s'>) => { field: string; };
}
export function registerDTGetter(service: DTGetterDef): void;
export function registerDTGetter(serviceId: string, service: DTGetterDef): void;
export function registerDTGetter(peer: FluencePeer, service: DTGetterDef): void;
export function registerDTGetter(peer: FluencePeer, serviceId: string, service: DTGetterDef): void;
       

export function registerDTGetter(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "get-dt",
    "functions" : [
        {
            "functionName" : "get_dt",
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
 

export function use_name1(name: string, config?: {ttl?: number}): Promise<string>;
export function use_name1(peer: FluencePeer, name: string, config?: {ttl?: number}): Promise<string>;
export function use_name1(...args: any) {

    let script = `
                        (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (call %init_peer_id% ("getDataSrv" "name") [] name)
                       )
                       (call %init_peer_id% ("get-dt" "get_dt") [name] results)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [results.$.field!])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "use_name1",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "name",
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

 

export function use_name2(name: string, config?: {ttl?: number}): Promise<string[]>;
export function use_name2(peer: FluencePeer, name: string, config?: {ttl?: number}): Promise<string[]>;
export function use_name2(...args: any) {

    let script = `
                        (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (seq
                            (seq
                             (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                             (call %init_peer_id% ("getDataSrv" "name") [] name)
                            )
                            (call %init_peer_id% ("get-dt" "get_dt") [name] results0)
                           )
                           (ap results0.$.field! $results)
                          )
                          (call %init_peer_id% ("get-dt" "get_dt") [name] results1)
                         )
                         (ap results1.$.field! $results)
                        )
                        (call %init_peer_id% ("get-dt" "get_dt") [name] results2)
                       )
                       (ap results2.$.field! $results)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [$results])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "use_name2",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "name",
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
