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

export interface UnexistedDef {
    getStr: (callParams: CallParams<null>) => string;
}

export function registerUnexisted(service: UnexistedDef): void;
export function registerUnexisted(serviceId: string, service: UnexistedDef): void;
export function registerUnexisted(peer: FluencePeer, service: UnexistedDef): void;
export function registerUnexisted(peer: FluencePeer, serviceId: string, service: UnexistedDef): void;
export function registerUnexisted(...args: any) {
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
        serviceId = 'unex';
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

    const incorrectServiceDefinitions = missingFields(service, ['getStr']);
    if (!!incorrectServiceDefinitions.length) {
        throw new Error(
            'Error registering service Unexisted: missing functions: ' +
                incorrectServiceDefinitions.map((d) => "'" + d + "'").join(', '),
        );
    }

    peer.internals.callServiceHandler.use((req, resp, next) => {
        if (req.serviceId !== serviceId) {
            next();
            return;
        }

        if (req.fnName === 'getStr') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {},
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.getStr(callParams);
        }

        next();
    });
}

export interface OpEDef {
    identity: (s: string, callParams: CallParams<'s'>) => string;
}

export function registerOpE(service: OpEDef): void;
export function registerOpE(serviceId: string, service: OpEDef): void;
export function registerOpE(peer: FluencePeer, service: OpEDef): void;
export function registerOpE(peer: FluencePeer, serviceId: string, service: OpEDef): void;
export function registerOpE(...args: any) {
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
        serviceId = 'op';
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
            'Error registering service OpE: missing functions: ' +
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

export function tryOtherwiseTest(node_id: string, config?: { ttl?: number }): Promise<string>;
export function tryOtherwiseTest(peer: FluencePeer, node_id: string, config?: { ttl?: number }): Promise<string>;
export function tryOtherwiseTest(...args: any) {
    let peer: FluencePeer;
    let node_id: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        node_id = args[1];
        config = args[2];
    } else {
        peer = Fluence.getPeer();
        node_id = args[0];
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
                         (seq
                          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                          (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (xor
                         (xor
                          (call node_id ("unex" "getStr") [] $f)
                          (call node_id ("op" "identity") ["error"] $f)
                         )
                         (seq
                          (call -relay- ("op" "noop") [])
                          (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                         )
                        )
                       )
                       (call -relay- ("op" "noop") [])
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [$f.$.[0]!])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
                `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.getStatus().relayPeerId;
                });
                h.on('getDataSrv', 'node_id', () => {
                    return node_id;
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
                reject('Request timed out for tryOtherwiseTest');
            });

        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }

        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}
