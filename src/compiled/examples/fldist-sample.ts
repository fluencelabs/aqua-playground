/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.6.4-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


// Services

export interface ReturnDef {
    run: (arg0: { air_version: string; external_addresses: string[]; node_version: string; }, callParams: CallParams<'arg0'>) => void | Promise<void>;
}
export function registerReturn(service: ReturnDef): void;
export function registerReturn(serviceId: string, service: ReturnDef): void;
export function registerReturn(peer: FluencePeer, service: ReturnDef): void;
export function registerReturn(peer: FluencePeer, serviceId: string, service: ReturnDef): void;
       

export function registerReturn(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "returnService",
    "functions" : [
        {
            "functionName" : "run",
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
 

export function test(
    node: string,
    config?: {ttl?: number}
): Promise<void>;

export function test(
    peer: FluencePeer,
    node: string,
    config?: {ttl?: number}
): Promise<void>;

export function test(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                         (call %init_peer_id% ("getDataSrv" "node") [] node)
                        )
                        (call -relay- ("op" "noop") [])
                       )
                       (xor
                        (seq
                         (call node ("peer" "identify") [] res)
                         (call -relay- ("op" "noop") [])
                        )
                        (seq
                         (call -relay- ("op" "noop") [])
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                        )
                       )
                      )
                      (call %init_peer_id% ("returnService" "run") [res])
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "test",
    "returnType" : {
        "tag" : "void"
    },
    "argDefs" : [
        {
            "name" : "node",
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
