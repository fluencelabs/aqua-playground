/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.3.1-231
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    ResultCodes,
    RequestFlow,
    RequestFlowBuilder,
    CallParams,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v1';

function missingFields(obj: any, fields: string[]): string[] {
    return fields.filter((f) => !(f in obj));
}

// Services

export interface OpHDef {
    identity: (s: string, callParams: CallParams<'s'>) => string;
}

export function registerOpH(service: OpHDef): void;
export function registerOpH(serviceId: string, service: OpHDef): void;
export function registerOpH(peer: FluencePeer, service: OpHDef): void;
export function registerOpH(peer: FluencePeer, serviceId: string, service: OpHDef): void;
export function registerOpH(...args: any) {
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
        serviceId = 'opa';
    }

    // Figuring out which overload is the service.
    // If the first argument is not Fluence Peer and it is an object, then it can only be the service def
    // If the first argument is peer, we are checking further. The second argument might either be
    // an object, that it must be the service object
    // or a string, which is the service id. In that case the service is the third argument
    if (!FluencePeer.isInstance(args[0]) && typeof args[0] === 'object') {
        service = args[0];
    } else if (typeof args[1] === 'object') {
        service = args[1];
    } else {
        service = args[2];
    }

    const incorrectServiceDefinitions = missingFields(service, ['identity']);
    if (!!incorrectServiceDefinitions.length) {
        throw new Error(
            'Error registering service OpH: missing functions: ' +
                incorrectServiceDefinitions.map((d) => "'" + d + "'").join(', '),
        );
    }

    peer.internals.callServiceHandler.use((req, resp, next) => {
        if (req.serviceId !== serviceId) {
            next();
            return;
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

        next();
    });
}

// Functions

export function a(b: string, config?: { ttl?: number }): Promise<string>;
export function a(peer: FluencePeer, b: string, config?: { ttl?: number }): Promise<string>;
export function a(...args: any) {
    let peer: FluencePeer;
    let b: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        b = args[1];
        config = args[2];
    } else {
        peer = Fluence.getPeer();
        b = args[0];
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
                        (call %init_peer_id% ("getDataSrv" "b") [] b)
                       )
                       (call %init_peer_id% ("opa" "identity") [b] c)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [c])
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
                h.on('getDataSrv', 'b', () => {
                    return b;
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
                reject('Request timed out for a');
            });

        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }

        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}

export function d(e: string, config?: { ttl?: number }): Promise<string>;
export function d(peer: FluencePeer, e: string, config?: { ttl?: number }): Promise<string>;
export function d(...args: any) {
    let peer: FluencePeer;
    let e: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        e = args[1];
        config = args[2];
    } else {
        peer = Fluence.getPeer();
        e = args[0];
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
                        (call %init_peer_id% ("getDataSrv" "e") [] e)
                       )
                       (call %init_peer_id% ("opa" "identity") [e] c)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [c])
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
                h.on('getDataSrv', 'e', () => {
                    return e;
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
                reject('Request timed out for d');
            });

        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }

        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}
