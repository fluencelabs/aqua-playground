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

export interface TestServiceDef {
    get_records: (key: string, callParams: CallParams<'key'>) => string[];
}

export function registerTestService(service: TestServiceDef): void;
export function registerTestService(serviceId: string, service: TestServiceDef): void;
export function registerTestService(peer: FluencePeer, service: TestServiceDef): void;
export function registerTestService(peer: FluencePeer, serviceId: string, service: TestServiceDef): void;
export function registerTestService(...args) {
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
        serviceId = 'test-service';
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

        if (req.fnName === 'get_records') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    key: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.get_records(req.args[0], callParams);
        }

        next();
    });
}

// Functions

export function append_records(peer_: string, srum: string[][], config?: { ttl?: number }): Promise<void>;
export function append_records(
    peer: FluencePeer,
    peer_: string,
    srum: string[][],
    config?: { ttl?: number },
): Promise<void>;
export function append_records(...args) {
    let peer: FluencePeer;
    let peer_;
    let srum;
    let config;
    if (args[0] instanceof FluencePeer) {
        peer = args[0];
        peer_ = args[1];
        srum = args[2];
        config = args[3];
    } else {
        peer = FluencePeer.default;
        peer_ = args[0];
        srum = args[1];
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
   (seq
    (seq
     (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
     (call %init_peer_id% ("getDataSrv" "peer") [] peer)
    )
    (call %init_peer_id% ("getDataSrv" "srum") [] srum-iter)
   )
   (fold srum-iter srum-item
    (seq
     (ap srum-item $srum)
     (next srum-item)
    )
   )
  )
  (call %init_peer_id% ("test-service" "get_records") [peer] $srum)
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
)

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.connectionInfo.connectedRelay;
                });
                h.on('getDataSrv', 'peer', () => {
                    return peer_;
                });
                h.on('getDataSrv', 'srum', () => {
                    return srum;
                });
                h.onEvent('callbackSrv', 'response', (args) => {});

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for append_records');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}

export function retrieve_records(peer_: string, config?: { ttl?: number }): Promise<string[][]>;
export function retrieve_records(peer: FluencePeer, peer_: string, config?: { ttl?: number }): Promise<string[][]>;
export function retrieve_records(...args) {
    let peer: FluencePeer;
    let peer_;
    let config;
    if (args[0] instanceof FluencePeer) {
        peer = args[0];
        peer_ = args[1];
        config = args[2];
    } else {
        peer = FluencePeer.default;
        peer_ = args[0];
        config = args[1];
    }

    let request: RequestFlow;
    const promise = new Promise<string[][]>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
     (xor
 (seq
  (seq
   (seq
    (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
    (call %init_peer_id% ("getDataSrv" "peer") [] peer)
   )
   (call %init_peer_id% ("test-service" "get_records") [peer] $records)
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [$records])
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
                h.on('getDataSrv', 'peer', () => {
                    return peer_;
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
                reject('Request timed out for retrieve_records');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}
