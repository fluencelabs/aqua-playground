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

export interface GetStrDef {
    retStr: (arg0: string, callParams: CallParams<'arg0'>) => string;
}
export function registerGetStr(service: GetStrDef): void;
export function registerGetStr(serviceId: string, service: GetStrDef): void;
export function registerGetStr(peer: FluencePeer, service: GetStrDef): void;
export function registerGetStr(peer: FluencePeer, serviceId: string, service: GetStrDef): void;

export function registerGetStr(...args: any) {
    let serviceDefinition = {
        defaultServiceId: 'multiret-test',
        functions: [
            {
                functionName: 'retStr',
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
    };
    registerService(args, serviceDefinition);
}

export interface GetNumDef {
    retNum: (callParams: CallParams<null>) => number;
}
export function registerGetNum(service: GetNumDef): void;
export function registerGetNum(serviceId: string, service: GetNumDef): void;
export function registerGetNum(peer: FluencePeer, service: GetNumDef): void;
export function registerGetNum(peer: FluencePeer, serviceId: string, service: GetNumDef): void;

export function registerGetNum(...args: any) {
    let serviceDefinition = {
        defaultServiceId: 'multiret-num',
        functions: [
            {
                functionName: 'retNum',
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

export type TupleFuncResult = [string, number];
export function tupleFunc(config?: { ttl?: number }): Promise<TupleFuncResult>;
export function tupleFunc(peer: FluencePeer, config?: { ttl?: number }): Promise<TupleFuncResult>;
export function tupleFunc(...args: any) {
    let script = `
                        (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (call %init_peer_id% ("multiret-test" "retStr") ["some-str"] str)
                       )
                       (call %init_peer_id% ("multiret-num" "retNum") [] n)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [str n])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `;
    return callFunction(
        args,
        {
            functionName: 'tupleFunc',
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

export type MultiReturnFuncResult = [string[], number, string, number[], string | null, number];
export function multiReturnFunc(
    somethingToReturn: number[],
    smthOption: string | null,
    config?: { ttl?: number },
): Promise<MultiReturnFuncResult>;
export function multiReturnFunc(
    peer: FluencePeer,
    somethingToReturn: number[],
    smthOption: string | null,
    config?: { ttl?: number },
): Promise<MultiReturnFuncResult>;
export function multiReturnFunc(...args: any) {
    let script = `
                        (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (seq
                            (seq
                             (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                             (call %init_peer_id% ("getDataSrv" "somethingToReturn") [] somethingToReturn)
                            )
                            (call %init_peer_id% ("getDataSrv" "smthOption") [] smthOption)
                           )
                           (call %init_peer_id% ("multiret-test" "retStr") ["some-str"] $res)
                          )
                          (call %init_peer_id% ("multiret-test" "retStr") ["random-str"] $res)
                         )
                         (call %init_peer_id% ("multiret-test" "retStr") ["some-str"] str)
                        )
                        (call %init_peer_id% ("multiret-num" "retNum") [] n)
                       )
                       (ap str $res)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [$res 5 "some-str" somethingToReturn smthOption n])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `;
    return callFunction(
        args,
        {
            functionName: 'multiReturnFunc',
            returnType: {
                isVoid: false,
                isOptional: false,
            },
            argDefs: [
                {
                    name: 'somethingToReturn',
                    isOptional: false,
                    callbackDef: null,
                },
                {
                    name: 'smthOption',
                    isOptional: true,
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
