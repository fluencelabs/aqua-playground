/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.2.0-SNAPSHOT
 *
 */
import { FluencePeer } from '@fluencelabs/fluence';
import {
    ResultCodes,
    RequestFlow,
    RequestFlowBuilder,
    CallParams,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v1';

// Services

export function registerHelloWorld(service: {
    getNumber: (callParams: CallParams<null>) => Promise<number>;
    sayHello: (s: string, callParams: CallParams<'s'>) => Promise<void>;
}): void;
export function registerHelloWorld(
    serviceId: string,
    service: {
        getNumber: (callParams: CallParams<null>) => Promise<number>;
        sayHello: (s: string, callParams: CallParams<'s'>) => Promise<void>;
    },
): void;
export function registerHelloWorld(
    peer: FluencePeer,
    service: {
        getNumber: (callParams: CallParams<null>) => Promise<number>;
        sayHello: (s: string, callParams: CallParams<'s'>) => Promise<void>;
    },
): void;
export function registerHelloWorld(
    peer: FluencePeer,
    serviceId: string,
    service: {
        getNumber: (callParams: CallParams<null>) => Promise<number>;
        sayHello: (s: string, callParams: CallParams<'s'>) => Promise<void>;
    },
): void;
export function registerHelloWorld(...args) {
    let peer: FluencePeer;
    let serviceId;
    let service;
    if (args[0] instanceof FluencePeer) {
        peer = args[0];
    } else {
        peer = FluencePeer.default;
    }

    if (typeof args[0] === 'string') {
        serviceId = args[0];
    } else if (typeof args[1] === 'string') {
        serviceId = args[1];
    } else {
        serviceId = 'default';
    }

    if (!(args[0] instanceof FluencePeer) && typeof args[0] === 'object') {
        service = args[0];
    } else if (typeof args[1] === 'object') {
        service = args[1];
    } else {
        service = args[2];
    }

    peer.callServiceHandler.use(async (req, resp, next) => {
        if (req.serviceId !== serviceId) {
            await next();
            return;
        }

        if (req.fnName === 'getNumber') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {},
            };
            resp.retCode = ResultCodes.success;
            resp.result = await service.getNumber(callParams);
        }

        if (req.fnName === 'sayHello') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    s: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            await service.sayHello(req.args[0], callParams);
            resp.result = {};
        }

        await next();
    });
}

// Functions

export async function callMeBack(
    callback: (arg0: string, arg1: number, callParams: CallParams<'arg0' | 'arg1'>) => Promise<void>,
    config?: { ttl?: number },
): Promise<void>;
export async function callMeBack(
    peer: FluencePeer,
    callback: (arg0: string, arg1: number, callParams: CallParams<'arg0' | 'arg1'>) => Promise<void>,
    config?: { ttl?: number },
): Promise<void>;
export async function callMeBack(...args) {
    let peer: FluencePeer;
    let callback;
    let config;
    if (args[0] instanceof FluencePeer) {
        peer = args[0];
        callback = args[1];
        config = args[2];
    } else {
        peer = FluencePeer.default;
        callback = args[0];
        config = args[1];
    }

    let request: RequestFlow;
    const promise = new Promise<void>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
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

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', async () => {
                    return peer.connectionInfo.connectedRelays[0];
                });

                h.use(async (req, resp, next) => {
                    if (req.serviceId === 'callbackSrv' && req.fnName === 'callback') {
                        const callParams = {
                            ...req.particleContext,
                            tetraplets: {
                                arg0: req.tetraplets[0],
                                arg1: req.tetraplets[1],
                            },
                        };
                        resp.retCode = ResultCodes.success;
                        await callback(req.args[0], req.args[1], callParams);
                        resp.result = {};
                    }
                    await next();
                });

                h.onEvent('callbackSrv', 'response', async (args) => {});

                h.onEvent('errorHandlingSrv', 'error', async (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for callMeBack');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    await peer.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}
