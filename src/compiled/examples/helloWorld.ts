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

export function registerStringExtra(service: {
    addNameToHello: (arg0: string, callParams: CallParams<'arg0'>) => Promise<string>;
}): void;
export function registerStringExtra(
    serviceId: string,
    service: {
        addNameToHello: (arg0: string, callParams: CallParams<'arg0'>) => Promise<string>;
    },
): void;
export function registerStringExtra(
    peer: FluencePeer,
    service: {
        addNameToHello: (arg0: string, callParams: CallParams<'arg0'>) => Promise<string>;
    },
): void;
export function registerStringExtra(
    peer: FluencePeer,
    serviceId: string,
    service: {
        addNameToHello: (arg0: string, callParams: CallParams<'arg0'>) => Promise<string>;
    },
): void;
export function registerStringExtra(...args) {
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
        serviceId = 'service-id';
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

        if (req.fnName === 'addNameToHello') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    arg0: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = await service.addNameToHello(req.args[0], callParams);
        }

        await next();
    });
}

// Functions

export async function helloWorld(name: string, config?: { ttl?: number }): Promise<string>;
export async function helloWorld(peer: FluencePeer, name: string, config?: { ttl?: number }): Promise<string>;
export async function helloWorld(...args) {
    let peer: FluencePeer;
    let name;
    let config;
    if (args[0] instanceof FluencePeer) {
        peer = args[0];
        name = args[1];
        config = args[2];
    } else {
        peer = FluencePeer.default;
        name = args[0];
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
    (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
    (call %init_peer_id% ("getDataSrv" "name") [] name)
   )
   (call %init_peer_id% ("service-id" "addNameToHello") [name] res)
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
                h.on('getDataSrv', '-relay-', async () => {
                    return peer.connectionInfo.connectedRelays[0];
                });
                h.on('getDataSrv', 'name', async () => {
                    return name;
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
                reject('Request timed out for helloWorld');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    await peer.initiateFlow(request!);
    return promise;
}
