/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.3.0-SNAPSHOT
 *
 */
import Fluence, { FluencePeer } from '@fluencelabs/fluence';
import {
    ResultCodes,
    RequestFlow,
    RequestFlowBuilder,
    CallParams,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v1';

// Services

export interface OptionStringDef {
    checkOption: (str: string | null, callParams: CallParams<'str'>) => string;
}

export function registerOptionString(service: OptionStringDef): void;
export function registerOptionString(serviceId: string, service: OptionStringDef): void;
export function registerOptionString(peer: FluencePeer, service: OptionStringDef): void;
export function registerOptionString(peer: FluencePeer, serviceId: string, service: OptionStringDef): void;
export function registerOptionString(...args: any) {
    let peer: FluencePeer;
    let serviceId: any;
    let service: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
    } else {
        peer = Fluence.getPeer();
    }

    if (typeof args[0] === 'string') {
        serviceId = args[0];
    } else if (typeof args[1] === 'string') {
        serviceId = args[1];
    } else {
        serviceId = 'opt_str';
    }

    if (!FluencePeer.isInstance(args[0]) && typeof args[0] === 'object') {
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

        if (req.fnName === 'checkOption') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    str: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.checkOption(req.args[0].length === 0 ? null : req.args[0][0], callParams);
        }

        next();
    });
}

// Functions

export function emptyString(config?: { ttl?: number }): Promise<string | null>;
export function emptyString(peer: FluencePeer, config?: { ttl?: number }): Promise<string | null>;
export function emptyString(...args: any) {
    let peer: FluencePeer;

    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        config = args[1];
    } else {
        peer = Fluence.getPeer();
        config = args[0];
    }

    let request: RequestFlow;
    const promise = new Promise<string | null>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
     (xor
 (seq
  (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [$valueEmpty])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
)

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.getStatus().relayPeerId;
                });

                h.onEvent('callbackSrv', 'response', (args) => {
                    let [opt] = args;
                    if (Array.isArray(opt)) {
                        if (opt.length === 0) {
                            resolve(null);
                        }
                        opt = opt[0];
                    }
                    return resolve(opt);
                });

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for emptyString');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}

export function checkEmpty(config?: { ttl?: number }): Promise<string>;
export function checkEmpty(peer: FluencePeer, config?: { ttl?: number }): Promise<string>;
export function checkEmpty(...args: any) {
    let peer: FluencePeer;

    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        config = args[1];
    } else {
        peer = Fluence.getPeer();
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
   (call %init_peer_id% ("opt_str" "checkOption") [$valueEmpty] res)
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [res])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
)

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.getStatus().relayPeerId;
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
                reject('Request timed out for checkEmpty');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}

export function stringAsOption(str: string, config?: { ttl?: number }): Promise<string | null>;
export function stringAsOption(peer: FluencePeer, str: string, config?: { ttl?: number }): Promise<string | null>;
export function stringAsOption(...args: any) {
    let peer: FluencePeer;
    let str: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        str = args[1];
        config = args[2];
    } else {
        peer = Fluence.getPeer();
        str = args[0];
        config = args[1];
    }

    let request: RequestFlow;
    const promise = new Promise<string | null>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
     (xor
 (seq
  (seq
   (seq
    (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
    (call %init_peer_id% ("getDataSrv" "str") [] str)
   )
   (ap str $valueEmpty)
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [$valueEmpty])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
)

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.getStatus().relayPeerId;
                });
                h.on('getDataSrv', 'str', () => {
                    return str;
                });
                h.onEvent('callbackSrv', 'response', (args) => {
                    let [opt] = args;
                    if (Array.isArray(opt)) {
                        if (opt.length === 0) {
                            resolve(null);
                        }
                        opt = opt[0];
                    }
                    return resolve(opt);
                });

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for stringAsOption');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}

export function checkNoneEmpty(str: string, config?: { ttl?: number }): Promise<string>;
export function checkNoneEmpty(peer: FluencePeer, str: string, config?: { ttl?: number }): Promise<string>;
export function checkNoneEmpty(...args: any) {
    let peer: FluencePeer;
    let str: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        str = args[1];
        config = args[2];
    } else {
        peer = Fluence.getPeer();
        str = args[0];
        config = args[1];
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
    (seq
     (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
     (call %init_peer_id% ("getDataSrv" "str") [] str)
    )
    (ap str $valueEmpty)
   )
   (call %init_peer_id% ("opt_str" "checkOption") [$valueEmpty] res)
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [res])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
)

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.getStatus().relayPeerId;
                });
                h.on('getDataSrv', 'str', () => {
                    return str;
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
                reject('Request timed out for checkNoneEmpty');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}
