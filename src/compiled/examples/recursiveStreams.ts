/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.6.2-281
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


// Services

export interface YesNoServiceDef {
    get: (callParams: CallParams<null>) => string | Promise<string>;
}
export function registerYesNoService(service: YesNoServiceDef): void;
export function registerYesNoService(serviceId: string, service: YesNoServiceDef): void;
export function registerYesNoService(peer: FluencePeer, service: YesNoServiceDef): void;
export function registerYesNoService(peer: FluencePeer, serviceId: string, service: YesNoServiceDef): void;
       

export function registerYesNoService(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "yesno",
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
 

export function recursiveStream(
    config?: {ttl?: number}
): Promise<string[]>;

export function recursiveStream(
    peer: FluencePeer,
    config?: {ttl?: number}
): Promise<string[]>;

export function recursiveStream(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (new $loop
                        (new $result
                         (seq
                          (seq
                           (ap "yes" $loop)
                           (fold $loop l
                            (seq
                             (seq
                              (xor
                               (match l "yes"
                                (xor
                                 (call %init_peer_id% ("yesno" "get") [] $loop)
                                 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                                )
                               )
                               (call %init_peer_id% ("yesno" "get") [] $loop)
                              )
                              (ap "success" $result)
                             )
                             (next l)
                            )
                           )
                          )
                          (call %init_peer_id% ("op" "identity") [$result] result-fix)
                         )
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [result-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "recursiveStream",
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