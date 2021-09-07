/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.3.0-SNAPSHOT
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

export interface SubServiceDef {
    sub: (s: string, callParams: CallParams<'s'>) => { one: string; two: number };
}

export function registerSubService(service: SubServiceDef): void;
export function registerSubService(serviceId: string, service: SubServiceDef): void;
export function registerSubService(peer: FluencePeer, service: SubServiceDef): void;
export function registerSubService(peer: FluencePeer, serviceId: string, service: SubServiceDef): void;
export function registerSubService(...args) {
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
        serviceId = 'sub_service';
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

        if (req.fnName === 'sub') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    s: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.sub(req.args[0], callParams);
        }

        next();
    });
}

// Functions

export function subImport(config?: { ttl?: number }): Promise<{ one: string; two: number }>;
export function subImport(peer: FluencePeer, config?: { ttl?: number }): Promise<{ one: string; two: number }>;
export function subImport(...args) {
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
    const promise = new Promise<{ one: string; two: number }>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
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
                reject('Request timed out for subImport');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}
