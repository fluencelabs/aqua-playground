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

export interface SubServiceDef {
    sub: (s: string, callParams: CallParams<'s'>) => { one: string; two: number };
}
export function registerSubService(service: SubServiceDef): void;
export function registerSubService(serviceId: string, service: SubServiceDef): void;
export function registerSubService(peer: FluencePeer, service: SubServiceDef): void;
export function registerSubService(peer: FluencePeer, serviceId: string, service: SubServiceDef): void;

export function registerSubService(...args: any) {
    let serviceDefinition = {
        defaultServiceId: 'sub_service',
        functions: [
            {
                functionName: 'sub',
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

export type SubImportResult = { one: string; two: number };
export function subImport(config?: { ttl?: number }): Promise<SubImportResult>;
export function subImport(peer: FluencePeer, config?: { ttl?: number }): Promise<SubImportResult>;
export function subImport(...args: any) {
    let script = `
                        (xor
                     (seq
                      (seq
                       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                       (call %init_peer_id% ("sub_service" "sub") ["some thing"] res)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `;
    return callFunction(
        args,
        {
            functionName: 'subImport',
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
