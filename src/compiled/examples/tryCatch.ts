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

export interface UnexistedDef {
    getStr: (callParams: CallParams<null>) => string;
}
export function registerUnexisted(service: UnexistedDef): void;
export function registerUnexisted(serviceId: string, service: UnexistedDef): void;
export function registerUnexisted(peer: FluencePeer, service: UnexistedDef): void;
export function registerUnexisted(peer: FluencePeer, serviceId: string, service: UnexistedDef): void;

export function registerUnexisted(...args: any) {
    let serviceDefinition = {
        defaultServiceId: 'unex',
        functions: [
            {
                functionName: 'getStr',
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

export interface OpADef {
    identity: (s: string, callParams: CallParams<'s'>) => string;
}
export function registerOpA(service: OpADef): void;
export function registerOpA(serviceId: string, service: OpADef): void;
export function registerOpA(peer: FluencePeer, service: OpADef): void;
export function registerOpA(peer: FluencePeer, serviceId: string, service: OpADef): void;

export function registerOpA(...args: any) {
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
                    isVoid: false,
                    isOptional: false,
                },
            },
        ],
    };
    registerService(args, serviceDefinition);
}

// Functions

export function tryCatchTest(node_id: string, config?: { ttl?: number }): Promise<string[]>;
export function tryCatchTest(peer: FluencePeer, node_id: string, config?: { ttl?: number }): Promise<string[]>;
export function tryCatchTest(...args: any) {
    let script = `
                        (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                          (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (xor
                         (xor
                          (call node_id ("unex" "getStr") [] $f)
                          (seq
                           (seq
                            (call node_id ("op" "identity") [%last_error%.$.msg!] $f)
                            (call node_id ("peer" "identify") [] i)
                           )
                           (call node_id ("op" "identity") [i.$.external_addresses.[0]!] $f)
                          )
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
                       (call %init_peer_id% ("callbackSrv" "response") [$f])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `;
    return callFunction(
        args,
        {
            functionName: 'tryCatchTest',
            returnType: {
                isVoid: false,
                isOptional: false,
            },
            argDefs: [
                {
                    name: 'node_id',
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
