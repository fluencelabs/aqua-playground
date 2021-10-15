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

export interface Op2Def {
    identity: (s: number, callParams: CallParams<'s'>) => void;
}
export function registerOp2(service: Op2Def): void;
export function registerOp2(serviceId: string, service: Op2Def): void;
export function registerOp2(peer: FluencePeer, service: Op2Def): void;
export function registerOp2(peer: FluencePeer, serviceId: string, service: Op2Def): void;

export function registerOp2(...args: any) {
    let serviceDefinition = {
        defaultServiceId: 'op',
        functions: [
            {
                functionName: 'identity',
                argDefs: [
                    {
                        name: 's',
                        isOptional: false,
                        callbackDef: null,
                    },
                ],
                returnType: {
                    isVoid: true,
                    isOptional: false,
                },
            },
        ],
    };
    registerService(args, serviceDefinition);
}

// Functions

export function getTwoResults(relay: string, config?: { ttl?: number }): Promise<number[]>;
export function getTwoResults(peer: FluencePeer, relay: string, config?: { ttl?: number }): Promise<number[]>;
export function getTwoResults(...args: any) {
    let script = `
                        (xor
                     (seq
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
                          (seq
                           (seq
                            (seq
                             (seq
                              (call relay ("op" "string_to_b58") [%init_peer_id%] k)
                              (call relay ("kad" "neighborhood") [k [] []] nodes)
                             )
                             (fold nodes n
                              (par
                               (seq
                                (xor
                                 (call n ("peer" "timestamp_sec") [] $res)
                                 (null)
                                )
                                (call relay ("op" "noop") [])
                               )
                               (next n)
                              )
                             )
                            )
                            (call relay ("op" "identity") [$res.$.[0]!])
                           )
                           (call relay ("op" "identity") [$res.$.[1]!])
                          )
                          (call relay ("op" "identity") [$res.$.[2]!])
                         )
                         (seq
                          (call -relay- ("op" "noop") [])
                          (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                         )
                        )
                       )
                       (call -relay- ("op" "noop") [])
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [$res])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `;
    return callFunction(
        args,
        {
            functionName: 'getTwoResults',
            returnType: {
                isVoid: false,
                isOptional: false,
            },
            argDefs: [
                {
                    name: 'relay',
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
