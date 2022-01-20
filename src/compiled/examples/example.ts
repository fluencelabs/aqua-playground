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

export interface PeerDef {
    is_connected: (arg0: string, callParams: CallParams<'arg0'>) => boolean | Promise<boolean>;
}
export function registerPeer(service: PeerDef): void;
export function registerPeer(serviceId: string, service: PeerDef): void;
export function registerPeer(peer: FluencePeer, service: PeerDef): void;
export function registerPeer(peer: FluencePeer, serviceId: string, service: PeerDef): void;
       

export function registerPeer(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "peer",
    "functions" : [
        {
            "functionName" : "is_connected",
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
      


export interface OpDef {
    identity: (callParams: CallParams<null>) => void | Promise<void>;
}
export function registerOp(service: OpDef): void;
export function registerOp(serviceId: string, service: OpDef): void;
export function registerOp(peer: FluencePeer, service: OpDef): void;
export function registerOp(peer: FluencePeer, serviceId: string, service: OpDef): void;
       

export function registerOp(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "op",
    "functions" : [
        {
            "functionName" : "identity",
            "argDefs" : [
            ],
            "returnType" : {
                "tag" : "void"
            }
        }
    ]
}
    );
}
      


export interface TestDef {
    doSomething: (callParams: CallParams<null>) => boolean | Promise<boolean>;
    getUserList: (callParams: CallParams<null>) => { name: string; peer_id: string; relay_id: string; }[] | Promise<{ name: string; peer_id: string; relay_id: string; }[]>;
}
export function registerTest(service: TestDef): void;
export function registerTest(serviceId: string, service: TestDef): void;
export function registerTest(peer: FluencePeer, service: TestDef): void;
export function registerTest(peer: FluencePeer, serviceId: string, service: TestDef): void;
       

export function registerTest(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "test",
    "functions" : [
        {
            "functionName" : "doSomething",
            "argDefs" : [
            ],
            "returnType" : {
                "tag" : "primitive"
            }
        },
        {
            "functionName" : "getUserList",
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
 

export function betterMessage(
    relay: string,
    config?: {ttl?: number}
): Promise<void>;

export function betterMessage(
    peer: FluencePeer,
    relay: string,
    config?: {ttl?: number}
): Promise<void>;

export function betterMessage(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                         (call %init_peer_id% ("getDataSrv" "relay") [] relay)
                        )
                        (call -relay- ("op" "noop") [])
                       )
                       (xor
                        (seq
                         (call relay ("peer" "is_connected") [relay] isOnline)
                         (call -relay- ("op" "noop") [])
                        )
                        (seq
                         (call -relay- ("op" "noop") [])
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                        )
                       )
                      )
                      (xor
                       (match isOnline true
                        (xor
                         (call %init_peer_id% ("test" "doSomething") [])
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                        )
                       )
                       (null)
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "betterMessage",
    "returnType" : {
        "tag" : "void"
    },
    "argDefs" : [
        {
            "name" : "relay",
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
