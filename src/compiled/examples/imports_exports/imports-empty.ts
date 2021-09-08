/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.3.0-222
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
export function registerNoop(...args) {
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
        serviceId = 'op';
    }

    if (!(args[0] instanceof FluencePeer) && typeof args[0] === 'object') {
        service = args[0];
    } else if (typeof args[1] === 'object') {
        service = args[1];
    } else {
        service = args[2];
    }

    peer.internals.callServiceHandler.use((req, resp, next) => {
        if (req.serviceId !== serviceId) {
            next();
            return;
        }

        if (req.fnName === 'array') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    a: req.tetraplets[0],
                    b: req.tetraplets[1],
                    c: req.tetraplets[2],
                    d: req.tetraplets[3],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.array(req.args[0], req.args[1], req.args[2], req.args[3], callParams);
        }

        if (req.fnName === 'array_length') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    array: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.array_length(req.args[0], callParams);
        }

        if (req.fnName === 'bytes_from_b58') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    b: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.bytes_from_b58(req.args[0], callParams);
        }

        if (req.fnName === 'bytes_to_b58') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    bs: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.bytes_to_b58(req.args[0], callParams);
        }

        if (req.fnName === 'concat') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    a: req.tetraplets[0],
                    b: req.tetraplets[1],
                    c: req.tetraplets[2],
                    d: req.tetraplets[3],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.concat(req.args[0], req.args[1], req.args[2], req.args[3], callParams);
        }

        if (req.fnName === 'concat_strings') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    a: req.tetraplets[0],
                    b: req.tetraplets[1],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.concat_strings(req.args[0], req.args[1], callParams);
        }

        if (req.fnName === 'identity') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    s: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.identity(req.args[0], callParams);
        }

        if (req.fnName === 'noop') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {},
            };
            resp.retCode = ResultCodes.success;
            service.noop(callParams);
            resp.result = {};
        }

        if (req.fnName === 'sha256_string') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    s: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.sha256_string(req.args[0], callParams);
        }

        if (req.fnName === 'string_from_b58') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    b: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.string_from_b58(req.args[0], callParams);
        }

        if (req.fnName === 'string_to_b58') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    s: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.string_to_b58(req.args[0], callParams);
        }

        next();
    });
}

export interface MyExportSrvDef {
    another_str: (callParams: CallParams<null>) => string;
}

export function registerMyExportSrv(service: MyExportSrvDef): void;
export function registerMyExportSrv(serviceId: string, service: MyExportSrvDef): void;
export function registerMyExportSrv(peer: FluencePeer, service: MyExportSrvDef): void;
export function registerMyExportSrv(peer: FluencePeer, serviceId: string, service: MyExportSrvDef): void;
export function registerMyExportSrv(...args) {
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
        serviceId = 'my_export_srv';
    }

    if (!(args[0] instanceof FluencePeer) && typeof args[0] === 'object') {
        service = args[0];
    } else if (typeof args[1] === 'object') {
        service = args[1];
    } else {
        service = args[2];
    }

    peer.internals.callServiceHandler.use((req, resp, next) => {
        if (req.serviceId !== serviceId) {
            next();
            return;
        }

        if (req.fnName === 'another_str') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {},
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.another_str(callParams);
        }

        next();
    });
}

// Functions

export function some_str(config?: { ttl?: number }): Promise<string>;
export function some_str(peer: FluencePeer, config?: { ttl?: number }): Promise<string>;
export function some_str(...args) {
    let peer: FluencePeer;

    let config;
    if (args[0] instanceof FluencePeer) {
        peer = args[0];
        config = args[1];
    } else {
        peer = FluencePeer.default;
        config = args[0];
    }

    let request: RequestFlow;
    const promise = new Promise<string>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
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

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.connectionInfo.connectedRelay;
                });

                h.onEvent('callbackSrv', 'response', (args) => {
                    const [res] = args;
                    resolve(res);
                });

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for some_str');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}

export function some_string(config?: { ttl?: number }): Promise<string>;
export function some_string(peer: FluencePeer, config?: { ttl?: number }): Promise<string>;
export function some_string(...args) {
    let peer: FluencePeer;

    let config;
    if (args[0] instanceof FluencePeer) {
        peer = args[0];
        config = args[1];
    } else {
        peer = FluencePeer.default;
        config = args[0];
    }

    let request: RequestFlow;
    const promise = new Promise<string>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
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

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.connectionInfo.connectedRelay;
                });

                h.onEvent('callbackSrv', 'response', (args) => {
                    const [res] = args;
                    resolve(res);
                });

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for some_string');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}

export function decl_foo(config?: { ttl?: number }): Promise<string>;
export function decl_foo(peer: FluencePeer, config?: { ttl?: number }): Promise<string>;
export function decl_foo(...args) {
    let peer: FluencePeer;

    let config;
    if (args[0] instanceof FluencePeer) {
        peer = args[0];
        config = args[1];
    } else {
        peer = FluencePeer.default;
        config = args[0];
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

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.connectionInfo.connectedRelay;
                });

                h.onEvent('callbackSrv', 'response', (args) => {
                    const [res] = args;
                    resolve(res);
                });

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for decl_foo');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}

export function decl_bar(config?: { ttl?: number }): Promise<string>;
export function decl_bar(peer: FluencePeer, config?: { ttl?: number }): Promise<string>;
export function decl_bar(...args) {
    let peer: FluencePeer;

    let config;
    if (args[0] instanceof FluencePeer) {
        peer = args[0];
        config = args[1];
    } else {
        peer = FluencePeer.default;
        config = args[0];
    }

    let request: RequestFlow;
    const promise = new Promise<string>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
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

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.connectionInfo.connectedRelay;
                });

                h.onEvent('callbackSrv', 'response', (args) => {
                    const [res] = args;
                    resolve(res);
                });

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for decl_bar');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}

export function some_random_func(config?: { ttl?: number }): Promise<string>;
export function some_random_func(peer: FluencePeer, config?: { ttl?: number }): Promise<string>;
export function some_random_func(...args) {
    let peer: FluencePeer;

    let config;
    if (args[0] instanceof FluencePeer) {
        peer = args[0];
        config = args[1];
    } else {
        peer = FluencePeer.default;
        config = args[0];
    }

    let request: RequestFlow;
    const promise = new Promise<string>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
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

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.connectionInfo.connectedRelay;
                });

                h.onEvent('callbackSrv', 'response', (args) => {
                    const [res] = args;
                    resolve(res);
                });

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for some_random_func');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}
