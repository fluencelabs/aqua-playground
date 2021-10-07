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

// Functions

export function getPeerExternalAddresses(otherNodePeerId: string, config?: { ttl?: number }): Promise<string[]>;
export function getPeerExternalAddresses(
    peer: FluencePeer,
    otherNodePeerId: string,
    config?: { ttl?: number },
): Promise<string[]>;
export function getPeerExternalAddresses(...args: any) {
    let peer: FluencePeer;
    let otherNodePeerId: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        otherNodePeerId = args[1];
        config = args[2];
    } else {
        peer = Fluence.getPeer();
        otherNodePeerId = args[0];
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
                          (call %init_peer_id% ("getDataSrv" "otherNodePeerId") [] otherNodePeerId)
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (xor
                         (call otherNodePeerId ("peer" "identify") [] res)
                         (seq
                          (call -relay- ("op" "noop") [])
                          (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                         )
                        )
                       )
                       (call -relay- ("op" "noop") [])
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res.$.external_addresses!])
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
                h.on('getDataSrv', 'otherNodePeerId', () => {
                    return otherNodePeerId;
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
                reject('Request timed out for getPeerExternalAddresses');
            });

        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }

        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}

export function getDistantAddresses(target: string, viaNode: string, config?: { ttl?: number }): Promise<string[]>;
export function getDistantAddresses(
    peer: FluencePeer,
    target: string,
    viaNode: string,
    config?: { ttl?: number },
): Promise<string[]>;
export function getDistantAddresses(...args: any) {
    let peer: FluencePeer;
    let target: any;
    let viaNode: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        target = args[1];
        viaNode = args[2];
        config = args[3];
    } else {
        peer = Fluence.getPeer();
        target = args[0];
        viaNode = args[1];
        config = args[2];
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
                          (seq
                           (seq
                            (seq
                             (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                             (call %init_peer_id% ("getDataSrv" "target") [] target)
                            )
                            (call %init_peer_id% ("getDataSrv" "viaNode") [] viaNode)
                           )
                           (call -relay- ("op" "noop") [])
                          )
                          (call viaNode ("op" "noop") [])
                         )
                         (xor
                          (call target ("peer" "identify") [] res)
                          (seq
                           (seq
                            (seq
                             (call viaNode ("op" "noop") [])
                             (call -relay- ("op" "noop") [])
                            )
                            (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                           )
                           (call -relay- ("op" "noop") [])
                          )
                         )
                        )
                        (call viaNode ("op" "noop") [])
                       )
                       (call -relay- ("op" "noop") [])
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res.$.external_addresses!])
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
                h.on('getDataSrv', 'target', () => {
                    return target;
                });
                h.on('getDataSrv', 'viaNode', () => {
                    return viaNode;
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
                reject('Request timed out for getDistantAddresses');
            });

        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }

        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}
