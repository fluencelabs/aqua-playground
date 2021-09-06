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

export interface OpADef {
    get_str: (callParams: CallParams<null>) => Promise<string> | string;
}

export function registerOpA(service: OpADef): void;
export function registerOpA(serviceId: string, service: OpADef): void;
export function registerOpA(peer: FluencePeer, service: OpADef): void;
export function registerOpA(peer: FluencePeer, serviceId: string, service: OpADef): void;
export function registerOpA(...args) {
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
        serviceId = 'pop';
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

        if (req.fnName === 'get_str') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {},
            };
            resp.retCode = ResultCodes.success;
            resp.result = await service.get_str(callParams);
        }

        await next();
    });
}

// Functions

export async function get_results(config?: { ttl?: number }): Promise<string[]>;
export async function get_results(peer: FluencePeer, config?: { ttl?: number }): Promise<string[]>;
export async function get_results(...args) {
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
     (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
     (ap "hello" $results)
    )
    (call %init_peer_id% ("pop" "get_str") [] str)
   )
   (ap str $results)
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [$results])
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
                reject('Request timed out for get_results');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    await peer.internals.initiateFlow(request!);
    return promise;
}
