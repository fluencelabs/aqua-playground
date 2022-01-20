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

export interface MyExportSrvDef {
    another_str: (callParams: CallParams<null>) => string | Promise<string>;
}
export function registerMyExportSrv(service: MyExportSrvDef): void;
export function registerMyExportSrv(serviceId: string, service: MyExportSrvDef): void;
export function registerMyExportSrv(peer: FluencePeer, service: MyExportSrvDef): void;
export function registerMyExportSrv(peer: FluencePeer, serviceId: string, service: MyExportSrvDef): void;
       

export function registerMyExportSrv(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "my_export_srv",
    "functions" : [
        {
            "functionName" : "another_str",
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
 

export function string_from_lib(
    config?: {ttl?: number}
): Promise<string>;

export function string_from_lib(
    peer: FluencePeer,
    config?: {ttl?: number}
): Promise<string>;

export function string_from_lib(...args: any) {

    let script = `
                    (xor
                     (seq
                      (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") ["some_string_func"])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "string_from_lib",
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
