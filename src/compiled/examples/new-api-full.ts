/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.2.2-SNAPSHOT
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

export interface ServiceWithDefaultIdDef {
    hello: (s: string, callParams: CallParams<'s'>) => Promise<void> | void;
}

export function registerServiceWithDefaultId(service: ServiceWithDefaultIdDef): void;
export function registerServiceWithDefaultId(serviceId: string, service: ServiceWithDefaultIdDef): void;
export function registerServiceWithDefaultId(peer: FluencePeer, service: ServiceWithDefaultIdDef): void;
export function registerServiceWithDefaultId(
    peer: FluencePeer,
    serviceId: string,
    service: ServiceWithDefaultIdDef,
): void;
export function registerServiceWithDefaultId(...args) {
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
        serviceId = 'defaultId';
    }

    if (!(args[0] instanceof FluencePeer) && typeof args[0] === 'object') {
        service = args[0];
    } else if (typeof args[1] === 'object') {
        service = args[1];
    } else {
        service = args[2];
    }

    peer.internals.callServiceHandler.use(async (req, resp, next) => {
        if (req.serviceId !== serviceId) {
            await next();
            return;
        }

        if (req.fnName === 'hello') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    s: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            await service.hello(req.args[0], callParams);
            resp.result = {};
        }

        await next();
    });
}

export interface ServiceWithOUTDefaultIdDef {
    hello: (s: string, callParams: CallParams<'s'>) => Promise<void> | void;
}

export function registerServiceWithOUTDefaultId(serviceId: string, service: ServiceWithOUTDefaultIdDef): void;
export function registerServiceWithOUTDefaultId(
    peer: FluencePeer,
    serviceId: string,
    service: ServiceWithOUTDefaultIdDef,
): void;
export function registerServiceWithOUTDefaultId(...args) {
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
    }

    if (!(args[0] instanceof FluencePeer) && typeof args[0] === 'object') {
        service = args[0];
    } else if (typeof args[1] === 'object') {
        service = args[1];
    } else {
        service = args[2];
    }

    peer.internals.callServiceHandler.use(async (req, resp, next) => {
        if (req.serviceId !== serviceId) {
            await next();
            return;
        }

        if (req.fnName === 'hello') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    s: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            await service.hello(req.args[0], callParams);
            resp.result = {};
        }

        await next();
    });
}

export interface MoreMembersDef {
    member1: (callParams: CallParams<null>) => Promise<void> | void;
    member2: (s1: string, callParams: CallParams<'s1'>) => Promise<void> | void;
    member3: (s1: string, s2: string, callParams: CallParams<'s1' | 's2'>) => Promise<void> | void;
    member4: (s1: string, s2: string, i: number, callParams: CallParams<'s1' | 's2' | 'i'>) => Promise<number> | number;
    member5: (s1: string, s2: string, i: number, callParams: CallParams<'s1' | 's2' | 'i'>) => Promise<number> | number;
}

export function registerMoreMembers(serviceId: string, service: MoreMembersDef): void;
export function registerMoreMembers(peer: FluencePeer, serviceId: string, service: MoreMembersDef): void;
export function registerMoreMembers(...args) {
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
    }

    if (!(args[0] instanceof FluencePeer) && typeof args[0] === 'object') {
        service = args[0];
    } else if (typeof args[1] === 'object') {
        service = args[1];
    } else {
        service = args[2];
    }

    peer.internals.callServiceHandler.use(async (req, resp, next) => {
        if (req.serviceId !== serviceId) {
            await next();
            return;
        }

        if (req.fnName === 'member1') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {},
            };
            resp.retCode = ResultCodes.success;
            await service.member1(callParams);
            resp.result = {};
        }

        if (req.fnName === 'member2') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    s1: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            await service.member2(req.args[0], callParams);
            resp.result = {};
        }

        if (req.fnName === 'member3') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    s1: req.tetraplets[0],
                    s2: req.tetraplets[1],
                },
            };
            resp.retCode = ResultCodes.success;
            await service.member3(req.args[0], req.args[1], callParams);
            resp.result = {};
        }

        if (req.fnName === 'member4') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    s1: req.tetraplets[0],
                    s2: req.tetraplets[1],
                    i: req.tetraplets[2],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = await service.member4(req.args[0], req.args[1], req.args[2], callParams);
        }

        if (req.fnName === 'member5') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    s1: req.tetraplets[0],
                    s2: req.tetraplets[1],
                    i: req.tetraplets[2],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = await service.member5(req.args[0], req.args[1], req.args[2], callParams);
        }

        await next();
    });
}

// Functions

export async function f1(
    callback: (arg0: string, arg1: number, callParams: CallParams<'arg0' | 'arg1'>) => Promise<void> | void,
    config?: { ttl?: number },
): Promise<void>;
export async function f1(
    peer: FluencePeer,
    callback: (arg0: string, arg1: number, callParams: CallParams<'arg0' | 'arg1'>) => Promise<void> | void,
    config?: { ttl?: number },
): Promise<void>;
export async function f1(...args) {
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
                    return peer.connectionInfo.connectedRelays[0] || null;
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
                reject('Request timed out for f1');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    await peer.internals.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}

export async function f2(
    num: number,
    callback: (arg0: string, arg1: number, callParams: CallParams<'arg0' | 'arg1'>) => Promise<void> | void,
    config?: { ttl?: number },
): Promise<void>;
export async function f2(
    peer: FluencePeer,
    num: number,
    callback: (arg0: string, arg1: number, callParams: CallParams<'arg0' | 'arg1'>) => Promise<void> | void,
    config?: { ttl?: number },
): Promise<void>;
export async function f2(...args) {
    let peer: FluencePeer;
    let num;
    let callback;
    let config;
    if (args[0] instanceof FluencePeer) {
        peer = args[0];
        num = args[1];
        callback = args[2];
        config = args[3];
    } else {
        peer = FluencePeer.default;
        num = args[0];
        callback = args[1];
        config = args[2];
    }

    let request: RequestFlow;
    const promise = new Promise<void>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
     (xor
 (seq
  (seq
   (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
   (call %init_peer_id% ("getDataSrv" "num") [] num)
  )
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
                    return peer.connectionInfo.connectedRelays[0] || null;
                });
                h.on('getDataSrv', 'num', async () => {
                    return num;
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
                reject('Request timed out for f2');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    await peer.internals.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}

export async function f3(
    num: number,
    callback: (arg0: string, arg1: number, callParams: CallParams<'arg0' | 'arg1'>) => Promise<void> | void,
    config?: { ttl?: number },
): Promise<string>;
export async function f3(
    peer: FluencePeer,
    num: number,
    callback: (arg0: string, arg1: number, callParams: CallParams<'arg0' | 'arg1'>) => Promise<void> | void,
    config?: { ttl?: number },
): Promise<string>;
export async function f3(...args) {
    let peer: FluencePeer;
    let num;
    let callback;
    let config;
    if (args[0] instanceof FluencePeer) {
        peer = args[0];
        num = args[1];
        callback = args[2];
        config = args[3];
    } else {
        peer = FluencePeer.default;
        num = args[0];
        callback = args[1];
        config = args[2];
    }

    let request: RequestFlow;
    const promise = new Promise<string>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
     (xor
 (seq
  (seq
   (seq
    (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
    (call %init_peer_id% ("getDataSrv" "num") [] num)
   )
   (xor
    (call %init_peer_id% ("callbackSrv" "callback") ["hello, world" 42])
    (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
   )
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") ["hello world"])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
)

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', async () => {
                    return peer.connectionInfo.connectedRelays[0] || null;
                });
                h.on('getDataSrv', 'num', async () => {
                    return num;
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

                h.onEvent('callbackSrv', 'response', async (args) => {
                    const [res] = args;
                    resolve(res);
                });

                h.onEvent('errorHandlingSrv', 'error', async (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for f3');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    await peer.internals.initiateFlow(request!);
    return promise;
}

export async function callBackZeroArgs(
    callback: (callParams: CallParams<null>) => Promise<void> | void,
    config?: { ttl?: number },
): Promise<void>;
export async function callBackZeroArgs(
    peer: FluencePeer,
    callback: (callParams: CallParams<null>) => Promise<void> | void,
    config?: { ttl?: number },
): Promise<void>;
export async function callBackZeroArgs(...args) {
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
   (call %init_peer_id% ("callbackSrv" "callback") [])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
)

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', async () => {
                    return peer.connectionInfo.connectedRelays[0] || null;
                });

                h.use(async (req, resp, next) => {
                    if (req.serviceId === 'callbackSrv' && req.fnName === 'callback') {
                        const callParams = {
                            ...req.particleContext,
                            tetraplets: {},
                        };
                        resp.retCode = ResultCodes.success;
                        await callback(callParams);
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
                reject('Request timed out for callBackZeroArgs');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    await peer.internals.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}
