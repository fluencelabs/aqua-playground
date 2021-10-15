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

export interface HelloWorldDef {
    getNumber: (callParams: CallParams<null>) => number;
    sayHello: (s: string, callParams: CallParams<'s'>) => void;
}
export function registerHelloWorld(service: HelloWorldDef): void;
export function registerHelloWorld(serviceId: string, service: HelloWorldDef): void;
export function registerHelloWorld(peer: FluencePeer, service: HelloWorldDef): void;
export function registerHelloWorld(peer: FluencePeer, serviceId: string, service: HelloWorldDef): void;

export function registerHelloWorld(...args: any) {
    let serviceDefinition = {
        defaultServiceId: 'default',
        functions: [
            {
                functionName: 'getNumber',
                argDefs: [],
                returnType: {
                    isVoid: false,
                    isOptional: false,
                },
            },
            {
                functionName: 'sayHello',
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

export function callMeBack(
    callback: (arg0: string, arg1: number, callParams: CallParams<'arg0' | 'arg1'>) => void,
    config?: { ttl?: number },
): Promise<void>;
export function callMeBack(
    peer: FluencePeer,
    callback: (arg0: string, arg1: number, callParams: CallParams<'arg0' | 'arg1'>) => void,
    config?: { ttl?: number },
): Promise<void>;
export function callMeBack(...args: any) {
    let script = `
                        (xor
                     (seq
                      (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                      (xor
                       (call %init_peer_id% ("callbackSrv" "callback") ["hello, world" 42])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `;
    return callFunction(
        args,
        {
            functionName: 'callMeBack',
            returnType: {
                isVoid: true,
                isOptional: false,
            },
            argDefs: [
                {
                    name: 'callback',
                    isOptional: false,
                    callbackDef: {
                        argDefs: [
                            {
                                name: 'arg0',
                                isOptional: false,
                                callbackDef: null,
                            },
                            {
                                name: 'arg1',
                                isOptional: false,
                                callbackDef: null,
                            },
                        ],
                        returnType: {
                            isVoid: true,
                            isOptional: false,
                        },
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
