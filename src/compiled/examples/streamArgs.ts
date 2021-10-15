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

export interface TestServiceDef {
    get_records: (key: string, callParams: CallParams<'key'>) => string[];
}
export function registerTestService(service: TestServiceDef): void;
export function registerTestService(serviceId: string, service: TestServiceDef): void;
export function registerTestService(peer: FluencePeer, service: TestServiceDef): void;
export function registerTestService(peer: FluencePeer, serviceId: string, service: TestServiceDef): void;

export function registerTestService(...args: any) {
    registerService(args, {
        defaultServiceId: 'test-service',
        functions: [
            {
                functionName: 'get_records',
                argDefs: [
                    {
                        name: 'arg0',
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
    });
}

// Functions

export function append_records(peer_: string, srum: string[][], config?: { ttl?: number }): Promise<void>;
export function append_records(
    peer: FluencePeer,
    peer_: string,
    srum: string[][],
    config?: { ttl?: number },
): Promise<void>;
export function append_records(...args: any) {
    let script = `
                        (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                         (call %init_peer_id% ("getDataSrv" "peer") [] peer)
                        )
                        (call %init_peer_id% ("getDataSrv" "srum") [] srum-iter)
                       )
                       (fold srum-iter srum-item
                        (seq
                         (ap srum-item $srum)
                         (next srum-item)
                        )
                       )
                      )
                      (call %init_peer_id% ("test-service" "get_records") [peer] $srum)
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                    )
    `;
    return callFunction(
        args,
        {
            functionName: 'append_records',
            returnType: {
                isVoid: true,
                isOptional: false,
            },
            argDefs: [
                {
                    name: 'peer',
                    isOptional: false,
                    callbackDef: null,
                },
                {
                    name: 'srum',
                    isOptional: false,
                    callbackDef: null,
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

export function retrieve_records(peer_: string, config?: { ttl?: number }): Promise<string[][]>;
export function retrieve_records(peer: FluencePeer, peer_: string, config?: { ttl?: number }): Promise<string[][]>;
export function retrieve_records(...args: any) {
    let script = `
                        (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (call %init_peer_id% ("getDataSrv" "peer") [] peer)
                       )
                       (call %init_peer_id% ("test-service" "get_records") [peer] $records)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [$records])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `;
    return callFunction(
        args,
        {
            functionName: 'retrieve_records',
            returnType: {
                isVoid: false,
                isOptional: false,
            },
            argDefs: [
                {
                    name: 'peer',
                    isOptional: false,
                    callbackDef: null,
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
