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

// Functions

export function ifElseCall(condition: boolean, config?: { ttl?: number }): Promise<void>;
export function ifElseCall(peer: FluencePeer, condition: boolean, config?: { ttl?: number }): Promise<void>;
export function ifElseCall(...args: any) {
    let script = `
                        (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (call %init_peer_id% ("getDataSrv" "condition") [] condition)
                      )
                      (xor
                       (match condition true
                        (xor
                         (call %init_peer_id% ("println-service-id" "print") ["it is true"])
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                        )
                       )
                       (call %init_peer_id% ("println-service-id" "print") ["it is false"])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `;
    return callFunction(
        args,
        {
            functionName: 'ifElseCall',
            returnType: {
                isVoid: true,
                isOptional: false,
            },
            argDefs: [
                {
                    name: 'condition',
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

export function ifElseNumCall(condition: number, config?: { ttl?: number }): Promise<void>;
export function ifElseNumCall(peer: FluencePeer, condition: number, config?: { ttl?: number }): Promise<void>;
export function ifElseNumCall(...args: any) {
    let script = `
                        (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (call %init_peer_id% ("getDataSrv" "condition") [] condition)
                      )
                      (xor
                       (match condition 1
                        (xor
                         (call %init_peer_id% ("println-service-id" "print") ["it is 1"])
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                        )
                       )
                       (call %init_peer_id% ("println-service-id" "print") ["it is not 1"])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `;
    return callFunction(
        args,
        {
            functionName: 'ifElseNumCall',
            returnType: {
                isVoid: true,
                isOptional: false,
            },
            argDefs: [
                {
                    name: 'condition',
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
