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

export interface NoopDef {
    array: (
        a: string,
        b: string | null,
        c: string | null,
        d: string | null,
        callParams: CallParams<'a' | 'b' | 'c' | 'd'>,
    ) => string[];
    array_length: (array: string[], callParams: CallParams<'array'>) => number;
    bytes_from_b58: (b: string, callParams: CallParams<'b'>) => number[];
    bytes_to_b58: (bs: number[], callParams: CallParams<'bs'>) => string;
    concat: (
        a: string[],
        b: string[] | null,
        c: string[] | null,
        d: string[] | null,
        callParams: CallParams<'a' | 'b' | 'c' | 'd'>,
    ) => string[];
    concat_strings: (a: string, b: string, callParams: CallParams<'a' | 'b'>) => string;
    identity: (s: string | null, callParams: CallParams<'s'>) => string | null;
    noop: (callParams: CallParams<null>) => void;
    sha256_string: (s: string, callParams: CallParams<'s'>) => string;
    string_from_b58: (b: string, callParams: CallParams<'b'>) => string;
    string_to_b58: (s: string, callParams: CallParams<'s'>) => string;
}
export function registerNoop(service: NoopDef): void;
export function registerNoop(serviceId: string, service: NoopDef): void;
export function registerNoop(peer: FluencePeer, service: NoopDef): void;
export function registerNoop(peer: FluencePeer, serviceId: string, service: NoopDef): void;

export function registerNoop(...args: any) {
    let serviceDefinition = {
        defaultServiceId: 'op',
        functions: [
            {
                functionName: 'array',
                argDefs: [
                    {
                        name: 'a',
                        isOptional: false,
                        callbackDef: null,
                    },
                    {
                        name: 'b',
                        isOptional: true,
                        callbackDef: null,
                    },
                    {
                        name: 'c',
                        isOptional: true,
                        callbackDef: null,
                    },
                    {
                        name: 'd',
                        isOptional: true,
                        callbackDef: null,
                    },
                ],
                returnType: {
                    isVoid: false,
                    isOptional: false,
                },
            },
            {
                functionName: 'array_length',
                argDefs: [
                    {
                        name: 'array',
                        isOptional: false,
                        callbackDef: null,
                    },
                ],
                returnType: {
                    isVoid: false,
                    isOptional: false,
                },
            },
            {
                functionName: 'bytes_from_b58',
                argDefs: [
                    {
                        name: 'b',
                        isOptional: false,
                        callbackDef: null,
                    },
                ],
                returnType: {
                    isVoid: false,
                    isOptional: false,
                },
            },
            {
                functionName: 'bytes_to_b58',
                argDefs: [
                    {
                        name: 'bs',
                        isOptional: false,
                        callbackDef: null,
                    },
                ],
                returnType: {
                    isVoid: false,
                    isOptional: false,
                },
            },
            {
                functionName: 'concat',
                argDefs: [
                    {
                        name: 'a',
                        isOptional: false,
                        callbackDef: null,
                    },
                    {
                        name: 'b',
                        isOptional: true,
                        callbackDef: null,
                    },
                    {
                        name: 'c',
                        isOptional: true,
                        callbackDef: null,
                    },
                    {
                        name: 'd',
                        isOptional: true,
                        callbackDef: null,
                    },
                ],
                returnType: {
                    isVoid: false,
                    isOptional: false,
                },
            },
            {
                functionName: 'concat_strings',
                argDefs: [
                    {
                        name: 'a',
                        isOptional: false,
                        callbackDef: null,
                    },
                    {
                        name: 'b',
                        isOptional: false,
                        callbackDef: null,
                    },
                ],
                returnType: {
                    isVoid: false,
                    isOptional: false,
                },
            },
            {
                functionName: 'identity',
                argDefs: [
                    {
                        name: 's',
                        isOptional: true,
                        callbackDef: null,
                    },
                ],
                returnType: {
                    isVoid: false,
                    isOptional: true,
                },
            },
            {
                functionName: 'noop',
                argDefs: [],
                returnType: {
                    isVoid: true,
                    isOptional: false,
                },
            },
            {
                functionName: 'sha256_string',
                argDefs: [
                    {
                        name: 's',
                        isOptional: false,
                        callbackDef: null,
                    },
                ],
                returnType: {
                    isVoid: false,
                    isOptional: false,
                },
            },
            {
                functionName: 'string_from_b58',
                argDefs: [
                    {
                        name: 'b',
                        isOptional: false,
                        callbackDef: null,
                    },
                ],
                returnType: {
                    isVoid: false,
                    isOptional: false,
                },
            },
            {
                functionName: 'string_to_b58',
                argDefs: [
                    {
                        name: 's',
                        isOptional: false,
                        callbackDef: null,
                    },
                ],
                returnType: {
                    isVoid: false,
                    isOptional: false,
                },
            },
        ],
    };
    registerService(args, serviceDefinition);
}

export interface MyExportSrvDef {
    another_str: (callParams: CallParams<null>) => string;
}
export function registerMyExportSrv(service: MyExportSrvDef): void;
export function registerMyExportSrv(serviceId: string, service: MyExportSrvDef): void;
export function registerMyExportSrv(peer: FluencePeer, service: MyExportSrvDef): void;
export function registerMyExportSrv(peer: FluencePeer, serviceId: string, service: MyExportSrvDef): void;

export function registerMyExportSrv(...args: any) {
    let serviceDefinition = {
        defaultServiceId: 'my_export_srv',
        functions: [
            {
                functionName: 'another_str',
                argDefs: [],
                returnType: {
                    isVoid: false,
                    isOptional: false,
                },
            },
        ],
    };
    registerService(args, serviceDefinition);
}

// Functions

export function some_str(config?: { ttl?: number }): Promise<string>;
export function some_str(peer: FluencePeer, config?: { ttl?: number }): Promise<string>;
export function some_str(...args: any) {
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
    `;
    return callFunction(
        args,
        {
            functionName: 'some_str',
            returnType: {
                isVoid: false,
                isOptional: false,
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

export function some_string(config?: { ttl?: number }): Promise<string>;
export function some_string(peer: FluencePeer, config?: { ttl?: number }): Promise<string>;
export function some_string(...args: any) {
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
    `;
    return callFunction(
        args,
        {
            functionName: 'some_string',
            returnType: {
                isVoid: false,
                isOptional: false,
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

export function decl_foo(config?: { ttl?: number }): Promise<string>;
export function decl_foo(peer: FluencePeer, config?: { ttl?: number }): Promise<string>;
export function decl_foo(...args: any) {
    let script = `
                        (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (call %init_peer_id% ("super_foo" "small_foo") [] res1)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res1])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `;
    return callFunction(
        args,
        {
            functionName: 'decl_foo',
            returnType: {
                isVoid: false,
                isOptional: false,
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

export function decl_bar(config?: { ttl?: number }): Promise<string>;
export function decl_bar(peer: FluencePeer, config?: { ttl?: number }): Promise<string>;
export function decl_bar(...args: any) {
    let script = `
                        (xor
                     (seq
                      (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") ["declare all bar"])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `;
    return callFunction(
        args,
        {
            functionName: 'decl_bar',
            returnType: {
                isVoid: false,
                isOptional: false,
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

export function some_random_func(config?: { ttl?: number }): Promise<string>;
export function some_random_func(peer: FluencePeer, config?: { ttl?: number }): Promise<string>;
export function some_random_func(...args: any) {
    let script = `
                        (xor
                     (seq
                      (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") ["wow, so random"])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `;
    return callFunction(
        args,
        {
            functionName: 'some_random_func',
            returnType: {
                isVoid: false,
                isOptional: false,
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
