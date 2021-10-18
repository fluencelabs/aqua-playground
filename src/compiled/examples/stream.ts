/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.3.2-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import { CallParams, callFunction, registerService } from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';

function missingFields(obj: any, fields: string[]): string[] {
    return fields.filter((f) => !(f in obj));
}

// Services

export interface StringerDef {
    returnString: (arg0: string, callParams: CallParams<'arg0'>) => string;
}
export function registerStringer(service: StringerDef): void;
export function registerStringer(serviceId: string, service: StringerDef): void;
export function registerStringer(peer: FluencePeer, service: StringerDef): void;
export function registerStringer(peer: FluencePeer, serviceId: string, service: StringerDef): void;

export function registerStringer(...args: any) {
    registerService(args, {
        defaultServiceId: 'stringer-id',
        functions: [
            {
                functionName: 'returnString',
                argDefs: [
                    {
                        name: 'arg0',
                        argType: {
                            tag: 'primitive',
                        },
                    },
                ],
                returnType: {
                    tag: 'primitive',
                },
            },
        ],
    });
}

// Functions

export function returnNone(config?: { ttl?: number }): Promise<string | null>;
export function returnNone(peer: FluencePeer, config?: { ttl?: number }): Promise<string | null>;
export function returnNone(...args: any) {
    let script = `
                        (xor
                     (seq
                      (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [$valueNone])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `;
    return callFunction(
        args,
        {
            functionName: 'returnNone',
            returnType: {
                tag: 'optional',
            },
            argDefs: [],
            names: {
                relay: '-relay-',
                getDataSrv: 'getDataSrv',
                callbackSrv: 'callbackSrv',
                responseSrv: 'callbackSrv',
                responseFnName: 'response',
                errorHandlingSrv: 'errorHandlingSrv',
                errorFnName: 'error',
            },
        },
        script,
    );
}

export function stringNone(config?: { ttl?: number }): Promise<string | null>;
export function stringNone(peer: FluencePeer, config?: { ttl?: number }): Promise<string | null>;
export function stringNone(...args: any) {
    let script = `
                        (xor
                     (seq
                      (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [$valueNone])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `;
    return callFunction(
        args,
        {
            functionName: 'stringNone',
            returnType: {
                tag: 'optional',
            },
            argDefs: [],
            names: {
                relay: '-relay-',
                getDataSrv: 'getDataSrv',
                callbackSrv: 'callbackSrv',
                responseSrv: 'callbackSrv',
                responseFnName: 'response',
                errorHandlingSrv: 'errorHandlingSrv',
                errorFnName: 'error',
            },
        },
        script,
    );
}

export function returnNil(config?: { ttl?: number }): Promise<string[]>;
export function returnNil(peer: FluencePeer, config?: { ttl?: number }): Promise<string[]>;
export function returnNil(...args: any) {
    let script = `
                        (xor
                     (seq
                      (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [$valueNil])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `;
    return callFunction(
        args,
        {
            functionName: 'returnNil',
            returnType: {
                tag: 'primitive',
            },
            argDefs: [],
            names: {
                relay: '-relay-',
                getDataSrv: 'getDataSrv',
                callbackSrv: 'callbackSrv',
                responseSrv: 'callbackSrv',
                responseFnName: 'response',
                errorHandlingSrv: 'errorHandlingSrv',
                errorFnName: 'error',
            },
        },
        script,
    );
}

export function stringNil(config?: { ttl?: number }): Promise<string[]>;
export function stringNil(peer: FluencePeer, config?: { ttl?: number }): Promise<string[]>;
export function stringNil(...args: any) {
    let script = `
                        (xor
                     (seq
                      (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [$valueNil])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `;
    return callFunction(
        args,
        {
            functionName: 'stringNil',
            returnType: {
                tag: 'primitive',
            },
            argDefs: [],
            names: {
                relay: '-relay-',
                getDataSrv: 'getDataSrv',
                callbackSrv: 'callbackSrv',
                responseSrv: 'callbackSrv',
                responseFnName: 'response',
                errorHandlingSrv: 'errorHandlingSrv',
                errorFnName: 'error',
            },
        },
        script,
    );
}

export function checkStreams(ch: string[], config?: { ttl?: number }): Promise<string[]>;
export function checkStreams(peer: FluencePeer, ch: string[], config?: { ttl?: number }): Promise<string[]>;
export function checkStreams(...args: any) {
    let script = `
                        (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                          (call %init_peer_id% ("getDataSrv" "ch") [] ch)
                         )
                         (call %init_peer_id% ("stringer-id" "returnString") ["first"] $stream)
                        )
                        (call %init_peer_id% ("stringer-id" "returnString") ["second"] $stream)
                       )
                       (fold ch b
                        (seq
                         (call %init_peer_id% ("stringer-id" "returnString") [b] $stream)
                         (next b)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [$stream])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `;
    return callFunction(
        args,
        {
            functionName: 'checkStreams',
            returnType: {
                tag: 'primitive',
            },
            argDefs: [
                {
                    name: 'ch',
                    argType: {
                        tag: 'primitive',
                    },
                },
            ],
            names: {
                relay: '-relay-',
                getDataSrv: 'getDataSrv',
                callbackSrv: 'callbackSrv',
                responseSrv: 'callbackSrv',
                responseFnName: 'response',
                errorHandlingSrv: 'errorHandlingSrv',
                errorFnName: 'error',
            },
        },
        script,
    );
}
