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

export interface StringerDef {
    returnString: (arg0: string, callParams: CallParams<'arg0'>) => string;
}

export function registerStringer(service: StringerDef): void;
export function registerStringer(serviceId: string, service: StringerDef): void;
export function registerStringer(peer: FluencePeer, service: StringerDef): void;
export function registerStringer(peer: FluencePeer, serviceId: string, service: StringerDef): void;
export function registerStringer(...args) {
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
        serviceId = 'stringer-id';
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

        if (req.fnName === 'returnString') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    arg0: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.returnString(req.args[0], callParams);
        }

        next();
    });
}

// Functions

export function checkStreams(ch: string[], config?: { ttl?: number }): Promise<string[]>;
export function checkStreams(peer: FluencePeer, ch: string[], config?: { ttl?: number }): Promise<string[]>;
export function checkStreams(...args) {
    let peer: FluencePeer;
    let ch;
    let config;
    if (args[0] instanceof FluencePeer) {
        peer = args[0];
        ch = args[1];
        config = args[2];
    } else {
        peer = FluencePeer.default;
        ch = args[0];
        config = args[1];
    }

    let request: RequestFlow;
    const promise = new Promise<string[]>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
     (xor
 (seq
  (seq
   (seq
    (seq
     (seq
      (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
      (call %init_peer_id% ("getDataSrv" "ch") [] ch)
     )
     (call %init_peer_id% ("stringer-id" "returnString") ["first"] $stream)
    )
    (call %init_peer_id% ("stringer-id" "returnString") ["second"] $stream)
   )
   (fold ch b
    (seq
     (call %init_peer_id% ("stringer-id" "returnString") [b] $stream)
     (next b)
    )
   )
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [$stream])
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
                h.on('getDataSrv', 'ch', () => {
                    return ch;
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
                reject('Request timed out for checkStreams');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}
