/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.6.0-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


// Services

export interface OptionStringDef {
    checkOption: (str: string | null, callParams: CallParams<'str'>) => string | Promise<string>;
}
export function registerOptionString(service: OptionStringDef): void;
export function registerOptionString(serviceId: string, service: OptionStringDef): void;
export function registerOptionString(peer: FluencePeer, service: OptionStringDef): void;
export function registerOptionString(peer: FluencePeer, serviceId: string, service: OptionStringDef): void;
       

export function registerOptionString(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "opt_str",
    "functions" : [
        {
            "functionName" : "checkOption",
            "argDefs" : [
                {
                    "name" : "str",
                    "argType" : {
                        "tag" : "optional"
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
 

export function checkEmpty(
    config?: {ttl?: number}
): Promise<string>;

export function checkEmpty(
    peer: FluencePeer,
    config?: {ttl?: number}
): Promise<string>;

export function checkEmpty(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (new $valueEmpty
                         (call %init_peer_id% ("op" "identity") [$valueEmpty] valueEmpty-fix)
                        )
                       )
                       (call %init_peer_id% ("opt_str" "checkOption") [valueEmpty-fix] res)
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
    "functionName" : "checkEmpty",
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

 

export function emptyString(
    config?: {ttl?: number}
): Promise<string | null>;

export function emptyString(
    peer: FluencePeer,
    config?: {ttl?: number}
): Promise<string | null>;

export function emptyString(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (new $valueEmpty
                        (call %init_peer_id% ("op" "identity") [$valueEmpty] valueEmpty-fix)
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [valueEmpty-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "emptyString",
    "returnType" : {
        "tag" : "optional"
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

 

export function checkNoneEmpty(
    str: string,
    config?: {ttl?: number}
): Promise<string>;

export function checkNoneEmpty(
    peer: FluencePeer,
    str: string,
    config?: {ttl?: number}
): Promise<string>;

export function checkNoneEmpty(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                         (call %init_peer_id% ("getDataSrv" "str") [] str)
                        )
                        (new $valueEmpty
                         (seq
                          (ap str $valueEmpty)
                          (call %init_peer_id% ("op" "identity") [$valueEmpty] valueEmpty-fix)
                         )
                        )
                       )
                       (call %init_peer_id% ("opt_str" "checkOption") [valueEmpty-fix] res)
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
    "functionName" : "checkNoneEmpty",
    "returnType" : {
        "tag" : "primitive"
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

 

export function stringAsOption(
    str: string,
    config?: {ttl?: number}
): Promise<string | null>;

export function stringAsOption(
    peer: FluencePeer,
    str: string,
    config?: {ttl?: number}
): Promise<string | null>;

export function stringAsOption(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (call %init_peer_id% ("getDataSrv" "str") [] str)
                       )
                       (new $valueEmpty
                        (seq
                         (ap str $valueEmpty)
                         (call %init_peer_id% ("op" "identity") [$valueEmpty] valueEmpty-fix)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [valueEmpty-fix])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "stringAsOption",
    "returnType" : {
        "tag" : "optional"
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
